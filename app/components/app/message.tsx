import styles from "../app/messenger.module.css"

export default function Message(props: { author: any, ours: any; special: any, value: string }) {

    return <div className={`${styles.message} ${props.ours ? styles.ours : styles.theirs} ${props.special? props.special : ""}`}>
        {props.value}
        {props.special? <img className={styles.special} src={`${props.special}.png`}/> : <></>}
    </div>
}