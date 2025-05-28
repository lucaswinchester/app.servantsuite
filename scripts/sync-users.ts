// scripts/sync-users.ts
import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

interface ClerkUser {
  id: string;
  email_addresses: { email_address: string }[];
  first_name: string | null;
  last_name: string | null;
  image_url: string;
}

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

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

async function fetchClerkUsers(): Promise<ClerkUser[]> {
  const response = await fetch(`${CLERK_API_URL}/users`, {
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

async function syncUsers() {
  try {
    const clerkUsers = await fetchClerkUsers();
    let successCount = 0;

    for (const user of clerkUsers) {
      const { error } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email_addresses[0]?.email_address,
        first_name: user.first_name,
        last_name: user.last_name,
        image_url: user.image_url,
      });

      if (!error) {
        successCount++;
      } else {
        console.error(`Error syncing user ${user.id}:`, error);
      }
    }

    console.log(`Successfully synced ${successCount} out of ${clerkUsers.length} users`);
  } catch (error) {
    console.error("Error syncing users:", error);
  }
}

syncUsers();
