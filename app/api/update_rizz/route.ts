import prisma from '@/app/components/prisma'
import { NextRequest } from 'next/server'

export async function GET(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')!
    const new_elo = parseInt(searchParams.get('rizz')!)

    const user = await prisma.user.update({
        where: {
            email: email
        },
        data: {
            elo: Math.max(0, new_elo)
        }
    })

    return new Response(JSON.stringify(user))
}