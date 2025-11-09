import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost"
          onClick={() => signIn("google", { callbackUrl: "/app" })}
        >
          login
        </button>
      </div>
    </div>
  );
}
