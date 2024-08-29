'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function addToBlacklist(url: string) {
  if (!url) {
    throw new Error('URL is required');
  }

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    const { rows } = await sql`
      SELECT * FROM blacklist WHERE full_url = ${url}
    `;

    if (rows.length > 0) {
      await sql`
        UPDATE blacklist 
        SET date = CURRENT_TIMESTAMP
        WHERE full_url = ${url}
      `;
      revalidatePath('/blacklist');
      return { message: 'Website already in blacklist, date updated' };
    } else {
      await sql`
        INSERT INTO blacklist (hostname, full_url, works)
        VALUES (${hostname}, ${url}, 0)
      `;

      revalidatePath('/blacklist');
      return { message: 'Website added to blacklist successfully' };
    }
  } catch (error) {
    console.error('Error adding to blacklist:', error);
    if (error instanceof TypeError && error.message.includes('Invalid URL')) {
      throw new Error('Invalid URL provided');
    }
    throw new Error('Failed to add website to blacklist');
  }
}

export async function updateBlacklistWorks(url: string) {
  try {
    await sql`
        UPDATE blacklist 
        SET works = 0
        WHERE full_url = ${url}
      `;

    revalidatePath('/blacklist');
    return { message: 'Blacklist entry updated successfully' };
  } catch (error) {
    console.error('Error updating blacklist works:', error);
    throw new Error('Failed to update blacklist entry');
  }
}
