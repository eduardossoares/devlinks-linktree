import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebaseConnection";
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    doc,
    deleteDoc
} from "firebase/firestore"

interface LinkProps {
    id: string
    name: string,
    url: string,
    bg: string,
    text: string,
}

export function Admin() {
    const [linkName, setLinkName] = useState("");
    const [linkURL, setLinkURL] = useState("");
    const [textColorInput, setTextColorInput] = useState("#f1f1f1");
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linskRef = collection(db, "links");
        const queryRef = query(linskRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) => {
            let list = [] as LinkProps[];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    text: doc.data().text
                })
            })

            setLinks(list);
        })

        return () => {
            unsub();
        }

    }, []);

    const handleRegister = (e: FormEvent) => {
        e.preventDefault()
        if (linkName === '' || linkURL === '') {
            return
        }

        addDoc(collection(db, "links"), {
            name: linkName,
            url: linkURL,
            bg: backgroundColorInput,
            text: textColorInput,
            created: new Date(),
        })
            .then(() => {
                setLinkName("");
                setLinkURL("");
            })
            .catch((error) => {
                console.log(`Erro: ${error}`)
            })
    }

    const handleDeleteLink = async (id: string) => {
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef);
    }

    return (
        <div className="flex items-center flex-col min-h-screen space-y-10">
            <Header />

            <div className="h-px w-[90%] md:w-[600px] bg-zinc-600 opacity-40"></div>

            <form className="flex flex-col w-full items-center gap-10" onSubmit={handleRegister}>
                <div className="flex flex-col w-[90%] md:w-[600px]">
                    <label className="text-white font-medium text-xl">Nome do link</label>
                    <Input placeholder="Ex: Canal do YouTube" value={linkName}
                        onChange={(e) => setLinkName(e.target.value)} />
                </div>

                <div className="flex flex-col w-[90%] md:w-[600px]">
                    <label className="text-white font-medium text-xl">URL do link</label>
                    <Input placeholder="Ex: https://youtube.com" value={linkURL}
                        onChange={(e) => setLinkURL(e.target.value)} />
                </div>

                <section className="w-[90%] md:w-[600px] flex justify-around">
                    <div className="flex gap-2 items-center">
                        <label className="text-white font-medium">Cor do Texto</label>
                        <input type="color" className="h-12" value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)} />
                    </div>

                    <div className="flex gap-2 items-center">
                        <label className="text-white font-medium">Cor do Fundo</label>
                        <input type="color" className="h-12" value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)} />
                    </div>
                </section>


                {linkName.length >= 1 && (
                    <div className="flex flex-col items-center gap-4 w-[90%]">
                        <div className="h-px w-[90%] md:w-[600px] bg-zinc-600 opacity-40"></div>
                        <label className="text-white text-md md:text-xl">Veja como está ficando:</label>
                        <article style={{
                            backgroundColor: `${backgroundColorInput}`,
                            color: `${textColorInput}`
                        }} className="
                        w-[100%] md:max-w-[600px] py-3 p-2
                        text-center rounded-md font-semibold">{linkName}</article>
                    </div>
                )}

                <div className="h-px w-[90%] md:w-[600px] bg-zinc-600 opacity-40"></div>

                <button type="submit" className="bg-blue-600 text-white font-bold 
                rounded-md py-3 p-2 w-[90%] md:w-[600px]">
                    Registrar
                </button>
            </form>

            <div className="h-px w-[90%] md:w-[600px] bg-zinc-600 opacity-40"></div>

            <div className="flex flex-col items-center gap-4 w-[90%] md:w-[600px]">
                <h2 className="text-white text-xl">Meus links</h2>

                {links.map((link) => (
                    <article key={link.id} style={{ backgroundColor: `${link.bg}`, color: `${link.text}` }} className="flex items-center w-[100%] md:max-w-[600px] py-3 p-2
                    rounded-md font-semibold px-6 select-none">
                        <p className="text-white m-auto">{link.name}</p>
                        <button onClick={() => handleDeleteLink(link.id)}
                        className="border border-zinc-600 p-1 rounded-md bg-zinc-400"><FiTrash size={18} color="white" /> </button>
                    </article>
                ))}
            </div>
        </div>
    )
}