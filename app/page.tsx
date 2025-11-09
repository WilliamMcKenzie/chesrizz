"use client"

import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import styles from "./components/landing/style.module.css"
import Navbar from "./components/landing/navbar"
import User from './components/user'
import Messaging from './components/messaging'
export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  var login = async () => {
    const data: User = await (await fetch(`./api/get_user?email=${session?.user?.email}`)).json()
    
    if (!session || !data) signIn('google', { callbackUrl: "/onboard" })
    else if (!data.profile) router.push("/onboard")
    else router.push("/app")
  }

  return (
    <main className={styles.main}>
      <Navbar login={login}/>
      <div className={styles.hero}>
        <img className={styles.rizzchess} src={"rizzchess.png"}/>
        <h3>
          if tinder had elo.
        </h3>
        <button className="btn" onClick={() => login()}>
          try it out
        </button>
        <button className="btn">
          see devpost
        </button>
      </div>
    <Messaging/>
    </main>
  )
}