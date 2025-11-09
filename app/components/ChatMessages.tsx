
import React from 'react'

interface ChatMessagePromps {
    sender: string;
    message:  string;
    isOwnMessage: boolean;
    
}

const ChatMessages = ({sender, message, isOwnMessage}) => {
    const isSystemMessage = sender === "system";
    return (
        <div className={`flex ${isSystemMessage 
            ? "justify-center" 
            : isOwnMessage 
            ? "justify-end" 
            : "justify-start"}
        mb-3`}>
            <div className={`max-w-ws px-4 py-2 rounded-lg ${
                isSystemMessage 
                ? "bg-gray-500 text-white text-center text-xs"
                : isOwnMessage
                ? "bg-blue-300 text-white"
                : "bg-white text-black" 
            }`}>
                {!isSystemMessage && <p className="text-sm font-bold">{sender}</p>}
                <p>{message}</p>

            </div>
            
            </div>
    )
}

export default ChatMessages