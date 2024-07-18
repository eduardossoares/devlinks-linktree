import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

import "./header.css";

export function Header() {

    const handleLogout = async () => {
        await signOut(auth);
    }

    return (
        <header className="bg-zinc-700 m-7 w-[90%] md:w-[600px] rounded-sm">
            <nav className="flex justify-around p-4">
                <div id="text" className="flex items-center space-x-8 font-medium">
                    <Link className="hover:text-zinc-50 duration-200" to={"/"}>
                        Home
                    </Link>
                    <Link className="hover:text-zinc-50 duration-200" to={"/admin"}>
                        Links
                    </Link>
                    <Link className="hover:text-zinc-50 duration-200" to={"/admin/social"}>
                        Sociais
                    </Link>
                </div>

                <button onClick={handleLogout}>
                    <BiLogOut size={24} className="red hover:text-zinc-50 duration-200" />
                </button>
            </nav>
        </header>
    )
}