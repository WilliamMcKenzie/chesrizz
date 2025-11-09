"use client"

import { useRouter } from 'next/navigation'
import { signIn, useSession } from "next-auth/react"
import styles from "./components/landing/style.module.css";
import Navbar from "./components/landing/navbar";
import TinderSwiper from './components/tinderswiper';








export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  var test = async () => {
    await fetch(`api/create_profile?bio=${"Im a great person, own a dog, a house, a village, and have a great job."}`)
    await fetch(`api/create_profile?bio=${"Im not a huge fan of sports."}`)
  }



  return (
    <main className={styles.main}>
      <Navbar/>
      <div className={styles.hero}>
        <img className={styles.rizzchess} src={"rizzchess.png"}/>
        <h3>
          if tinder had elo.
        </h3>
        <button className="btn" onClick={() => test()}>
          try it out
        </button>
        <button className="btn">
          see devpost
        </button>
      </div>
      <TinderSwiper/>
    </main>
  )
}