import { useState } from "react"
import Message from "./message"
import styles from "./messenger.module.css"
import Bubble from "./bubble"

interface MessageStruct {
    content : string
    author : string
    special : string
}

export default function Messenger(props : any) {
    const messages = props.messages
    const opponent = props.opponent
    const self = props.self 
    const [message, setMessage] = useState("")
    const [speechBubble, setBubble] = useState(false)

    var submit = () => {
        setMessage("")
        setBubble(true)
        props.socket.send(message)
    }

    return <main className={styles.main}>
        <div className={styles.top}>
            <button className="btn btn-ghost mr-auto">
                leave simulator
            </button>
            <h1>
                {opponent.name} <a className={`text-gray-600 text-base`}>[{opponent.elo} rizz]</a>
            </h1>
        </div>
        <div className={styles.content}>
            {messages.map((message: MessageStruct) => (
                <Message author={message.author} value={message.content} ours={message.author == self.email} special={!message.special.includes("nothing") ? message.special : null}/>
            ))}
            {
                speechBubble ? <></> : <></>
            }
        </div>
        <div className={styles.bot}>
            <h1>
                {self.name} <a className={`text-gray-600 text-base`}>[{self.elo} rizz]</a>
            </h1>
        </div>
        <input onKeyDown={event => {
                if (event.key === 'Enter') {
                    submit()
                }}} value={message} onChange={(e) => {setMessage(e.target.value)}} type="text" placeholder="Type here" className="input" />
    </main>
}