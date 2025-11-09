import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')!
    const bio = searchParams.get('bio')!

    const user = await prisma.user.findFirst({
        where: { email: email },
        include: { profile: true }
    })
    const userID = user!.id

    await prisma.profile.upsert({
        where: { userID: userID },
        update: {
            bio: bio,
        },
        create: {
            bio: bio,
            images: [],
            user: { connect: { id: userID } }
        }
    })

    return new Response(JSON.stringify(await prisma.profile.findFirst({ where: { userID: userID }})))
}