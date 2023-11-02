import { NextRequest,NextResponse } from "next/server";
import shortid from 'shortid'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export  async function POST(req:NextRequest){
     const {url} = await req.json();
     if(!/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
        return NextResponse.json("enter valid url")
    } 
    const find = await prisma.url.findFirst({
        where:{
            link :url
        }
    })
    if(find ===null){
        const short= shortid.generate();
     const dbdata= await prisma.url.create({
        data:{
            link: url,
            shortlink :short
        }
     });
     const final = process.env.url +'api/resolve/'+ short
     return NextResponse.json(final)
    }
    else {
        const final = process.env.url +'api/resolve/'+ find.shortlink
        return NextResponse.json(final)
    }
     



}