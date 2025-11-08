"use client"

import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import styles from "./components/landing/style.module.css";
import Navbar from "./components/landing/navbar";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <main className={styles.main}>
      <Navbar/>
      <div className={styles.hero}>
        <img className={styles.rizzchess} src={"rizzchess.png"}/>
        <h3>
          if tinder had elo.
        </h3>
        <button className="btn" onClick={() => signIn('google', { callbackUrl: "/onboard" })}>
          try it out
        </button>
        <button className="btn">
          see devpost
        </button>
      </div>
    </main>
  )
}