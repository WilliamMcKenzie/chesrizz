import prisma from '@/app/components/prisma'
import { NextRequest } from 'next/server'

export async function GET(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const emails = JSON.parse(searchParams.get('emails')!)!

    const users = await prisma.user.findMany({
        where: {
            email: {
                in: emails
            },
        },
        include: {
            profile: true
        }
    })

    return new Response(JSON.stringify(users))
}