"use client"

import { getServerSession } from "next-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  profile: Record<string, any> | null
}

export default function Onboard() {
    const router = useRouter()

    useEffect(() => {
        async () => {
            const session = await getServerSession()
            const data: User = await (await fetch(`./api/get_user?email=${session?.user?.email}`)).json()

            if (!session) router.push("./")
            else if (data.profile) {
                router.push("/app")
            }
        }
    }, [])

    return <></>
}