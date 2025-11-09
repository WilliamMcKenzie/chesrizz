'use client'
import React, { useState } from 'react'
import { ChatForm } from './ChatForm'
import ChatMessages from './ChatMessages'

const Messaging = () => {
    const [room, setRoom] = useState("")
    const [joined, setJoined] = useState(true)
    const [messages,setMessages] = useState<
    {sender: string; messages : string}[]>([]);
    const [name, setName] = useState("")

    const handleSendMessage = (message:string)=> {
        console.log(message)
    }
  return (
    <div className="flex mt-24 justify-center w-full">
        {joined ? (<div className="w-full max-w-3xl mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Room 1</h1>
            <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
                {messages.map((msg, index) => (
                    <ChatMessages
                    key={index}
                    sender={msg.sender}
                    isOwnMessage={msg.sender === name}
                    />
                ))}
            </div>
            <ChatForm/>
        </div>) : (
            <div className="flex flex-col items-center justify-center"> Not joined</div>
        ) }
        
    </div>
  )
}

export default Messaging