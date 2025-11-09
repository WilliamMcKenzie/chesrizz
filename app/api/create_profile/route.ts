"use server"

import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import prisma from '@/app/components/prisma'

export async function GET(request : NextRequest) {
    const session = await getServerSession()
    const searchParams = request.nextUrl.searchParams
    const bio : string = searchParams.get('bio')!
    const email = session!.user?.email!

    if (session) {
        const result = (await generateText({
            model: groq('llama-3.1-8b-instant'),
            system: "Return a single integer between 1-300, evaluating it based on the social market value conveyed. Return only the number, no additional text.",
            prompt: bio,
        })).text
        const elo = 800 + parseInt(result)
        await prisma.user.update({
            where: { email : email },
            data: { elo : elo }
        })

        const profile = await prisma.profile.create({
            data : {
                bio : bio,
                images : [],
                user : {
                    connect: {
                        email: email,
                    }
                }
            }
        })

        await prisma.$disconnect()
        return new Response(JSON.stringify(profile))
    }
}


