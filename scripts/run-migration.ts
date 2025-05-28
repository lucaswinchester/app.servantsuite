import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const DIRECT_URL = process.env.DIRECT_URL;

if (!DIRECT_URL) {
  throw new Error('DIRECT_URL is not set in environment variables');
}

async function runMigration() {
  const client = new Client({
    connectionString: DIRECT_URL,
    ssl: {
      rejectUnauthorized: false // Only for development
    }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Read the migration file
    const migrationPath = path.join(__dirname, '../prisma/migrations/20240527215800_add_image_url_to_users.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Run the migration
    await client.query(sql);
    console.log('Migration applied successfully');
  } catch (error) {
    console.error('Error running migration:', error);
    throw error;
  } finally {
    await client.end();
  }
}

runMigration().catch(console.error);
