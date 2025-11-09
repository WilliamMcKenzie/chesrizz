export default function Navbar(params : any) {

    return <div className="navbar bg-base-100">
    <div className="navbar-start">
    </div>
    <div className="navbar-center">
    </div>
    <div className="navbar-end">
        <button className="btn btn-ghost" onClick={params.login}>
            login
        </button>
    </div>
    </div>
}