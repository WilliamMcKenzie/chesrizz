import { PrismaClient } from "@prisma/client";
import OpenAi from "openai"
const prisma = new PrismaClient();
const openai = new OpenAi({
        apiKey: process.env.OPEN_API_KEY
    })
export default async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    
    const images = searchParams.get('images')
    const bio = searchParams.get('bio')
    const id = searchParams.get('id')
    const email = searchParams.get('email')
    const name = searchParams.get('fname')
    
   const message = `give me a rating out of 300 based on my profile. this is for a dating app and base me off of
                    how likeable i am and how good of a person i am. this is my description. ${bio}`
    
    const gptElo = await openai.chat.completions.create({
        model: "4",
        messages: [{role : "user", content: message}],
        temperature: 0.3,
    })

    

    const newElo = parseInt(gptElo.choices[0].message.content);
    
    const finalElo = 800 + newElo;


    const uppdatedUser = await prisma.user.update({
        where: {
            email : email
        },
        data: {
            elo : finalElo
        }
    })

    const profile = await prisma.profile.create({
        data : {
            id : id,
            bio : bio,
            images : images? [images] : [],
            user : {
                connect: {
                    email: email,
                }
            }
        }
    })





    console.log("Genrated")

    await prisma.$disconnect()
    return new Response(`/${name}`)
}


