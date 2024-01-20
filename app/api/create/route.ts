import { NextRequest, NextResponse } from "next/server";
import shortid from 'shortid';
import { Pool } from 'pg';

const pool = new Pool({
    user: 'oryrlytr',
  host: 'manny.db.elephantsql.com',
  database: 'oryrlytr',
  password: 'yDdO786q2UcGs8eGDRGTAz_vYm3g2gOv',
  port: 5432,
});

export async function POST(req:NextRequest) {
    const { url } = await req.json();
    if(!/^(http(s)?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
    return NextResponse.json("enter valid url");
}


    try {
        // Check if the URL already exists
        const findResult = await pool.query('SELECT * FROM "public"."Url" WHERE link = $1 LIMIT 1', [url]);
        
        if (findResult.rows.length === 0) {
            // URL not found, create a new shortlink
            const short = shortid.generate();
            const id = shortid.generate();
            await pool.query('INSERT INTO "public"."Url" (id, link, shortlink) VALUES ($1, $2, $3)', [id, url, short]);

            const final = process.env.url + short;
            return NextResponse.json(final);
        } else {
            // URL found, return existing shortlink
            const final = process.env.url + findResult.rows[0].shortlink;
            return NextResponse.json(final);
        }
    } catch (error) {
        console.error('Database query failed:', error);
        // Handle errors appropriately
    }
}
