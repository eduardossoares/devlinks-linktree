import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const notify = (msg: string) => toast.warning(msg, {
        pauseOnHover: false,
        closeOnClick: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (userEmail === '' || userPassword === '') {
            notify("Preencha os campos corretamente!");
            return
        }

        signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(() => {
                navigate("/admin", { replace: true })
                console.log("Logado com sucesso!");
            })
            .catch((error) => {
                notify("Email ou senha incorretos!")
                console.log("Erro ao fazer login!");
                console.log(error);
            })
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center gap-6">
            <ToastContainer />
            <h1 className="font-bold text-white text-4xl md:text-5xl">
                Dev
                <span className="bg-gradient-to-r from bg-yellow-500 to-orange-500 
                bg-clip-text text-transparent">
                    Link
                </span>
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2 w-[70%] md:w-[600px]">
                <Input placeholder="Digite seu email"
                    value={userEmail} type="email" onChange={(e) => setUserEmail(e.target.value)} />
                <Input placeholder="********" type="password"
                    value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                <button className="bg-blue-600 mt-2 w-[70%] md:w-[600px] p-2 
                rounded-sm outline-none border-none text-white font-bold hover:bg-blue-800 duration-200">
                    Acessar
                </button>

            </form>
        </div>
    )
}