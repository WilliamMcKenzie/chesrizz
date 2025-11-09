import styles from "../app/messenger.module.css"

export default function Bubble() {

    return <div className={`${styles.message} ${styles.ours}`}>
        <span className="loading loading-dots loading-xl"></span>
    </div>
}