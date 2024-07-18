import { Link } from "react-router-dom";

export function Error() {
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-white text-2xl">Página não encontrada!</h1>
            <Link className="text-zinc-500 underline"
             to={"/"}>Voltar para a página de links</Link>
        </div>
    )
}