"use client"

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import User from "../components/user"
import Waiting from "../components/app/waiting"

import styles from "../components/app/style.module.css"
import Navbar from "../components/app/navbar"
import Messenger from "../components/app/messenger"

interface MessageStruct {
    content : string
    author : string
    special : string
}

export default function App() {
    const router = useRouter()
    const { data: session } = useSession()
    const [user, setUser] = useState<User>()
    const userRef = useRef<User | undefined>(null)
    const [opponent, setOpponent] = useState<User>()
    const opponentRef = useRef<User | undefined>(null)
    const [messages, setMessages] = useState<MessageStruct[]>([])
    const [socket, setSocket] = useState<WebSocket>()

    const get_user = async (email : string) => {
        const data: User = await (await fetch(`./api/get_user?email=${email}`)).json()
        if (!session) router.push("/")
        else {
            return data
        }
    }

    const handleRizz = async (special : string, author : string) => {
        var rizz = 0
        if (special == "brilliant") { rizz = 50}
        if (special == "great") { rizz = 10}
        if (special == "good") { rizz = 5}
        if (special == "mistake") { rizz = -5}
        if (special == "blunder") { rizz = -10}

        const new_rizz = rizz + (author == userRef.current?.email ? userRef.current.elo : opponentRef!.current!.elo)
        const new_user = await (await fetch(`./api/update_rizz?email=${author}&rizz=${new_rizz}`)).json()
        
        if (author == userRef.current?.email) {
            setUser(new_user)
        } else {
            setOpponent(new_user)
        }
    }

    useEffect(() => {
        opponentRef.current = opponent
    }, [opponent])

    useEffect(() => {
        userRef.current = user
    }, [user])
    
    const socketeer = async (user : User) => {
        console.log("Connecting to 8080")
        // const websocket = new WebSocket('wss://matchmaker-y3b8.onrender.com/ws')
        const websocket = new WebSocket('ws://localhost:8080/ws')
        setSocket(websocket)

        websocket!.onopen = () => {
            console.log("Connected to 8080")
            websocket!.send(user?.email!)
            websocket!.send(user?.elo.toString()!)
        }

        websocket!.onmessage = async (event) => {
            if (opponentRef.current == null) {
                var fetched_user = await get_user(event.data)
                setOpponent(fetched_user)
            } else {
                const message_data = event.data.split("~")
                const message = {
                    content : message_data[0],
                    author : message_data[1],
                    special : message_data[2],
                }

                handleRizz(message_data[2], message_data[1])
                setMessages(old_messages => [...old_messages, message])
            }
        }
    }

    useEffect(() => {
        if (!session) {
            return
        }

        const init = async () => {
            var fetched_user = await get_user(session?.user?.email!)
            setUser(fetched_user)
            socketeer(fetched_user!)
        }
        init()
    }, [])

    return <main className={styles.main}>
        {(user && opponent) ? <></> : <Navbar/>}
        {(user && opponent) ? <Messenger socket={socket} messages={messages} opponent={opponent} self={user}/>
        : <Waiting/>}
    </main>
}