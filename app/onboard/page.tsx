"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "../components/customize/navbar"
import Edit from "../components/onboard/edit"

interface User {
  id: string
  email: string
  name: string
  profile: Record<string, any> | null
}

export default function Onboard() {
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const init = async () => {
            const data: User = await (await fetch(`./api/get_user?email=${session?.user?.email}`)).json()

            if (!session) router.push("./")
            else if (data.profile) router.push("/app")
        }
        init()
    }, [])

    return <>
        <Navbar back_option={false}/>
        <Edit/>
    </>
}