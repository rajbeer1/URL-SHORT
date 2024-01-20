import { NextRequest, NextResponse } from "next/server";
import { Pool } from 'pg';

// Configure your database connection
const pool = new Pool({
  user: 'oryrlytr',
  host: 'manny.db.elephantsql.com',
  database: 'oryrlytr',
  password: 'yDdO786q2UcGs8eGDRGTAz_vYm3g2gOv',
  port: 5432, // Default port for PostgreSQL, change it if your DB uses a different one
});


export async function GET(req: NextRequest, { params }: { params: { blob: string } }) {
    const link = params.blob;

    try {
        // Execute the SQL query
        const query = 'SELECT link FROM "public"."Url" WHERE shortlink = $1 LIMIT 1';

        const result = await pool.query(query, [link]);

        if (result.rows.length > 0) {
            return NextResponse.redirect(result.rows[0].link);
        } else {
            throw new Error('No matching records found');
            return NextResponse.json({'error':'db error'})
        }
    } catch (error) {
        console.error('Database query failed:', error);
        return NextResponse.json({'error':'server error'})
        // Handle the error appropriately
    }
}
