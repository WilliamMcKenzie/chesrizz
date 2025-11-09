
import React, { useState } from 'react'

export const ChatForm = ({
    onSendMessage, }: {
        onSendMessage: (message: string) => void;

    }) => {

    

    const [message, setMessage] = useState("");
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (message.trim() !== "") {
            setMessage("");
        }
     }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 mb-25">
        <input type="text"
         placeholder='Start rizzing here' 
         onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 border-2 py-2 rounded-lg focus:outline-none">

        </input>
    <button type="submit" className="px-4 py-2 rounded-lg bg-blue-300 hover:cursor-pointer">Rizzed</button>
    </form>
  );
}
