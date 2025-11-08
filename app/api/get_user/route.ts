import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')!

    const user = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    return new Response(JSON.stringify(user))
}