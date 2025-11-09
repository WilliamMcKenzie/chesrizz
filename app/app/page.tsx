"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import User from "../components/user"

import TinderSwiper from "../components/tinderswiper"
import Navbar from "./navbar"
export default function App() {
    const router = useRouter()
    const { data: session } = useSession()
    const [user, setUser] = useState<User>()

    const get_user = async () => {
        const data: User = await (await fetch(`./api/get_user?email=${session?.user?.email}`)).json()
        if (!session) router.push("/")
        else {
            setUser(data)
            socketeer(data)
        }
    }

    const socketeer = async (user : User) => {
        console.log("Connecting to 8080")
        const ws = new WebSocket('ws://localhost:8080/ws')


        ws.onopen = () => {
            console.log("Connected to 8080")
            console.log(`ELO: ${user?.elo.toString()!}`)
            ws.send(user?.email!)
            ws.send(user?.elo.toString()!)
        }

        ws.onmessage = (event) => {
            console.log(event)
        }

        return () => ws.close();
    }

    useEffect(() => {
        if (!session) {
            return
        }

        const init = async () => {
            await get_user()
        }
        init()
    }, [])

    return <>
        <TinderSwiper/>
    </>
}