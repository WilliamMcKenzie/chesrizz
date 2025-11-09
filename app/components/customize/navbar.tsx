import { useRouter } from "next/navigation"


export default function Navbar(props : any) {
    const router = useRouter()

    return <div className="navbar bg-base-100">
        <div className="navbar-start">
            {props.back_option ? 
                <button className="btn btn-ghost" onClick={() => router.push("/")}>
                    back
                </button> : <></>
            }
        </div>
        <div className="navbar-center">
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost" onClick={() => router.push("./app")}>
                done
            </button>
        </div>
    </div>
}