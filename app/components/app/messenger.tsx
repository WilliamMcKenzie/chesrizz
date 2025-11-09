import { useState } from "react"
import Message from "./message"
import styles from "./messenger.module.css"

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

    var submit = () => {
        setMessage("")
        props.socket.send(message)
    }

    return <main className={styles.main}>
        <div className={styles.top}>
            <span className="countdown font-mono text-xl">
                <span aria-live="polite">10</span>:
                <span aria-live="polite">24</span>:
                <span aria-live="polite">59</span>
            </span>
            <h1>
                {opponent.name} <a className={`text-gray-600 text-base`}>[{opponent.elo} rizz]</a>
            </h1>
        </div>
        <div className={styles.content}>
            {messages.map((message: MessageStruct) => (
                <Message author={message.author} value={message.content} ours={message.author == self.email} special={message.special != "" ? message.special : null}/>
            ))}
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