
import { NextRequest,NextResponse } from "next/server";
import shortid from 'shortid'
import { useRouter } from 'next/navigation';
import prisma from "@/prisma/client";


export  async function GET(req:NextRequest,{params}:{params:{blob :string}}){
    const link =params.blob;
    const dbdata = await prisma.url.findFirstOrThrow({
        where:{
            shortlink :link
        }
    })

  return NextResponse.redirect(dbdata.link)

}