"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import User from "../components/user"

import TinderSwiper from "../components/tinderswiper"
import Navbar from "./navbar"
import { Sign } from "crypto"

const Signals = {
    EMAIL : "0",
    MATCH : "1",
    MESSAGE : "2",
    SWITCH : "3",
}

export default function App() {
    const router = useRouter()
    const { data: session } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [ws, setWs] = useState<WebSocket>()
    const seenEmails = useRef([])

    const swipe = (match : boolean) => {

    }

    const get_user = async () => {
        const data: User = await (await fetch(`./api/get_user?email=${session?.user?.email}`)).json()
        if (!session) router.push("/")
        else socketeer(data)
    }

    const socketeer = async (user : User) => {
        console.log("Connecting to 8080")
        const ws = new WebSocket('ws://localhost:8080/ws')
        setWs(ws)

        ws!.onopen = () => {
            console.log("Connected to 8080")
            ws!.send(user?.email!)
            ws!.send(user?.elo.toString()!)
        }

        ws!.onmessage = async (event) => {
            const type = event.data.split("~")[0]
            if (type == Signals.EMAIL) {
                const data: User = await (await fetch(`./api/get_user?email=${event.data.split("~")[1]}`)).json()
                setUsers([...users, data])
            }
        }
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
        <TinderSwiper users={users} swipe={swipe}/>
    </>
}