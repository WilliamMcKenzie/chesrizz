import styles from "../onboard/style.module.css"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  elo: number
  bio: string
  profile: Record<string, any> | null
}

export default function Edit() {
    const router = useRouter()
    const { data: session } = useSession()
    const [user, setUser] = useState<User>()
    const [bio, setBio] = useState<string>()

    useEffect(() => {
        const init = async () => {
            const data: User = await (await fetch(`./api/get_user?email=${session?.user?.email}`)).json()
            if (!session) router.push("/")
            else {
                setUser(data)
                setBio(data!.profile!.bio)
            }
        }
        init()
    }, [])

    const bio_change = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(event.target.value)
    }

    const save = () => {
        fetch(`./api/update_bio?bio=${bio}&email=${session?.user?.email}`, { method: "POST" })
    }

    return <main className={styles.main}>
        {
            user ?
            <div className={styles.container}>
                <h1>{user.name} <a className={`text-gray-600 ${styles.elo}`}>[{user.elo} elo]</a></h1>
                <button>
                    <div className={`avatar ${styles.avatar}`}>
                    <div className="w-24 rounded-xl">
                        <Image src={session?.user?.image!} width={96} height={96} alt="profile"></Image>
                    </div>
                </div>
                </button>
                <textarea onBlur={save} onMouseLeave={save} className={`textarea textarea-ghost ${styles.bio}`} onChange={bio_change} value={bio} placeholder="Hobbies, job, background"/>
            </div> : <>{user}</>
        }
    </main>
}