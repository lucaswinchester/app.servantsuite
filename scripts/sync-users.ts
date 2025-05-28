// scripts/sync-users.ts
import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

interface ClerkUser {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
  image_url: string;
  created_at: number;
  updated_at: number;
}

interface ClerkOrganization {
  id: string;
  name: string;
  slug: string;
  created_at: number;
  updated_at: number;
  public_metadata?: {
    description?: string;
    website?: string;
  };
}

interface ClerkOrganizationMembership {
  id: string;
  organization_id: string;
  public_user_data: {
    user_id: string;
  };
  role: string;
  created_at: number;
}

// Load environment variables
dotenv.config({ path: '.env' });

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.CLERK_SECRET_KEY) {
  throw new Error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and CLERK_SECRET_KEY must be set');
}

// Clerk API configuration
const CLERK_API_URL = 'https://api.clerk.dev/v1';
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

if (!CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY is not set');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchWithAuth(endpoint: string) {
  const response = await fetch(`${CLERK_API_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Clerk API error: ${response.statusText}`);
  }

  return response.json();
}

async function fetchClerkUsers(): Promise<ClerkUser[]> {
  const users = await fetchWithAuth('/users?limit=500');
  return Array.isArray(users) ? users : users.data || [];
}

async function fetchClerkOrganizations(): Promise<ClerkOrganization[]> {
  const orgs = await fetchWithAuth('/organizations?limit=500');
  return Array.isArray(orgs) ? orgs : orgs.data || [];
}

async function fetchClerkOrganizationMembers(orgId: string): Promise<ClerkOrganizationMembership[]> {
  const members = await fetchWithAuth(`/organizations/${orgId}/memberships?limit=500`);
  return Array.isArray(members) ? members : members.data || [];
}

// Create a map to store Clerk ID to UUID mappings
const idMappings = new Map<string, string>();

function getOrCreateUuid(clerkId: string): string {
  if (!idMappings.has(clerkId)) {
    idMappings.set(clerkId, uuidv4());
  }
  return idMappings.get(clerkId)!;
}

async function syncUsers() {
  try {
    // Fetch all data first
    const [clerkUsers, clerkOrgs] = await Promise.all([
      fetchClerkUsers(),
      fetchClerkOrganizations()
    ]);

    // Sync users first
    let userSuccessCount = 0;
    for (const user of clerkUsers) {
      const userId = getOrCreateUuid(user.id);
      const { error } = await supabase.from("users").upsert({
        id: userId,
        email: user.email_addresses[0]?.email_address,
        first_name: user.first_name,
        last_name: user.last_name,
        image_url: user.image_url,
        created_at: new Date(user.created_at).toISOString(),
        updated_at: new Date(user.updated_at).toISOString(),
      });

      if (!error) {
        userSuccessCount++;
      } else {
        console.error(`Error syncing user ${user.id}:`, error);
      }
    }
    console.log(`Synced ${userSuccessCount} out of ${clerkUsers.length} users`);

    // First, try to sync all organizations
    // But don't let failures stop member syncing
    const orgSyncResults = await Promise.allSettled(
      clerkOrgs.map(async (org) => {
        try {
          const orgId = getOrCreateUuid(org.id);
          const { error } = await supabase.from("organizations").upsert({
            id: orgId,
            name: org.name,
            slug: org.slug,
            description: org.public_metadata?.description || null,
            website: org.public_metadata?.website || null,
            created_at: new Date(org.created_at).toISOString(),
            updated_at: new Date(org.updated_at).toISOString(),
            settings: {},
            timezone: "UTC"
          });
          
          if (error) {
            console.error(`Error syncing organization ${org.id}:`, error);
            // Don't throw here, just return null to indicate failure
            return null;
          }
          return { org, orgId };
        } catch (error) {
          console.error(`Unexpected error syncing organization ${org.id}:`, error);
          return null;
        }
      })
    ).then(results => 
      // Filter out null results but maintain the same array structure
      results.map(result => 
        result.status === 'fulfilled' && result.value === null 
          ? { status: 'rejected', reason: 'Organization sync failed' } as PromiseRejectedResult
          : result
      )
    );

    // Process organization sync results
    const successfulOrgs = orgSyncResults
      .filter((result): result is PromiseFulfilledResult<{ org: ClerkOrganization; orgId: string }> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);

    console.log(`Synced ${successfulOrgs.length} out of ${clerkOrgs.length} organizations`);

    // Sync members for all organizations, even if org sync failed
    // First, fetch all existing organizations and users from Supabase to map Clerk IDs to Supabase UUIDs
    const [orgsFromDb, usersFromDb] = await Promise.all([
      supabase.from('organizations').select('id, clerk_id'),
      supabase.from('users').select('*')
    ]);

    // Create maps for quick lookup
    const orgIdMap = new Map(
      orgsFromDb.data?.map(org => [org.clerk_id, org.id]) || []
    );
    
    // Map Clerk IDs to Supabase user IDs
    // Since we don't have clerk_id in users, we'll use the ID directly
    const userIdMap = new Map(
      usersFromDb.data?.map(user => [user.id, user.id]) || []
    );
    
    // Also create a map of email to user ID for lookups
    const userEmailMap = new Map(
      usersFromDb.data?.filter(u => u.email).map(user => [user.email?.toLowerCase(), user.id]) || []
    );

    // Get all unique member user IDs from all organizations
    const allMemberUserIds = new Set<string>();
    for (const org of clerkOrgs) {
      const members = await fetchClerkOrganizationMembers(org.id);
      members.forEach(member => allMemberUserIds.add(member.public_user_data.user_id));
    }

    // Get user details from Clerk to ensure we have emails
    const memberDetails = await Promise.all(
      Array.from(allMemberUserIds).map(async clerkId => {
        try {
          const response = await fetch(`https://api.clerk.com/v1/users/${clerkId}`, {
            headers: {
              'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
              'Content-Type': 'application/json'
            }
          });
          const user = await response.json();
          return {
            clerkId,
            email: user.email_addresses?.[0]?.email_address || '',
            firstName: user.first_name || '',
            lastName: user.last_name || ''
          };
        } catch (error) {
          console.error(`Failed to fetch user ${clerkId} from Clerk:`, error);
          return null;
        }
      })
    );

    // Create any users that don't exist yet
    // Define the MemberDetail type for better type safety
    type MemberDetail = {
      clerkId: string;
      email: string;
      firstName: string;
      lastName: string;
    };

    const usersToCreate = memberDetails
      .filter((user): user is MemberDetail => 
        user !== null && 
        !!user?.email && 
        !userEmailMap.has(user.email.toLowerCase())
      )
      .map(user => ({
        id: getOrCreateUuid(user.clerkId),
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

    if (usersToCreate.length > 0) {
      const { error } = await supabase.from('users').upsert(usersToCreate);
      if (error) {
        console.error('Error creating missing users:', error);
      } else {
        // Update the user ID map with newly created users
        usersToCreate.forEach(user => {
          const clerkId = memberDetails.find(u => u?.email === user.email)?.clerkId;
          if (clerkId) {
            userIdMap.set(clerkId, user.id);
          }
        });
      }
    }
    
    // Update the email map with any new users
    usersToCreate.forEach(user => {
      userEmailMap.set(user.email.toLowerCase(), user.id);
    });

    // Process all organizations for member syncing
    let memberTotal = 0;
    type MemberSyncResult = { success: boolean; error?: any };
    const memberSyncPromises: Array<Promise<MemberSyncResult>> = [];

    for (const org of clerkOrgs) {
      const supabaseOrgId = orgIdMap.get(org.id) || getOrCreateUuid(org.id);
      const members = await fetchClerkOrganizationMembers(org.id);
      memberTotal += members.length;

      for (const member of members) {
        // Try to find the user by Clerk ID first, then by email if available
        let supabaseUserId = userIdMap.get(member.public_user_data.user_id);
        
        // If not found by Clerk ID, try to find by email
        if (!supabaseUserId && member.public_user_data.user_id) {
          try {
            const userResponse = await fetch(`https://api.clerk.com/v1/users/${member.public_user_data.user_id}`, {
              headers: {
                'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
                'Content-Type': 'application/json'
              }
            });
            const userData = await userResponse.json();
            const email = userData.email_addresses?.[0]?.email_address;
            if (email) {
              supabaseUserId = userEmailMap.get(email.toLowerCase());
            }
          } catch (error) {
            console.error('Error fetching user details from Clerk:', error);
          }
        }
        
        if (!supabaseUserId) {
          console.warn(`Skipping member ${member.public_user_data.user_id} - user not found in database`);
          continue;
        }
        
        // Map Clerk role to UserRole enum
        const mapRole = (role: string): string => {
          const roleMap: Record<string, string> = {
            'admin': 'admin',
            'org:admin': 'admin',
            'org:member': 'volunteer',
            'basic_member': 'volunteer',
            'guest_member': 'volunteer',
            'pastor': 'pastor',
            'tech_director': 'tech_director',
            'media_team': 'media_team'
          };
          return roleMap[role.toLowerCase()] || 'volunteer';
        };

        const memberPromise = (async () => {
          try {
            const { error } = await supabase
              .from("organization_members")
              .upsert({
                organization_id: supabaseOrgId,
                user_id: supabaseUserId,
                role: mapRole(member.role),
                joined_at: new Date(member.created_at).toISOString(),
                permissions: {},
                created_at: new Date().toISOString()
              });

            if (error) {
              console.error(`Error syncing member ${member.public_user_data.user_id} for org ${org.id}:`, error);
              return { success: false, error };
            }
            return { success: true };
          } catch (error) {
            console.error(`Unexpected error syncing member ${member.public_user_data.user_id} for org ${org.id}:`, error);
            return { success: false, error };
          }
        })();
        
        memberSyncPromises.push(memberPromise);
      }
    }

    // Wait for all member syncs to complete
    const memberResults = await Promise.allSettled(memberSyncPromises);
    const memberSuccessCount = memberResults.filter(
      result => result.status === 'fulfilled' && result.value.success
    ).length;

    console.log(`Synced ${memberSuccessCount} out of ${memberTotal} organization members`);
    
    // Log a warning if we have members but no successful orgs
    if (memberTotal > 0 && successfulOrgs.length === 0) {
      console.warn('Note: Members were synced but no organizations were successfully synced. Some members may not be properly associated.');
    }

  } catch (error) {
    console.error("Error during sync:", error);
  }
}

syncUsers();