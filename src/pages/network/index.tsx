import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Network() {

    const [facebookURL, setFacebookURL] = useState("");
    const [instagramURL, setInstagramURL] = useState("");
    const [youtubeURL, setYoutubeURL] = useState("");

    useEffect(() => {
      const loadLinks = () => {
            const docRef = doc(db, "social", "link")

            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() === undefined) {
                    return
                }

                setFacebookURL(snapshot.data()?.facebook)
                setInstagramURL(snapshot.data()?.instagram)
                setYoutubeURL(snapshot.data()?.youtube)
            })
      }

      loadLinks();
    }, []);
    
    const handleRegister = (e: FormEvent) => {
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            facebook: facebookURL,
            instagram: instagramURL,
            youtube: youtubeURL,
        })
        .then(() => {
            console.log("Salvos com Sucesso!")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="flex flex-col w items-center justify-center gap-10">
            <Header />
            <div className="space-y-10 w-full">
                <h1 className="text-2xl text-white text-center">Minhas redes sociais</h1>

                <form onSubmit={handleRegister} className="w-[90%] md:w-[600px] flex flex-col m-auto space-y-10">
                    <div className="flex flex-col w-full gap-2">
                        <label className="text-lg text-white">Link do Facebook</label>
                        <Input type="url" placeholder="Ex: https://facebook.com/eduardo"
                        value={facebookURL} onChange={(e) => setFacebookURL(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label className="text-lg text-white">Link do Instagram</label>
                        <Input type="url" placeholder="Ex: https://instagram.com/eduardo"
                        value={instagramURL} onChange={(e) => setInstagramURL(e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <label className="text-lg text-white">Link do YouTube</label>
                        <Input type="url" placeholder="Ex: https://youtube.com/eduardo"
                        value={youtubeURL} onChange={(e) => setYoutubeURL(e.target.value)}  />
                    </div>

                    <button className="bg-blue-600 py-3 p-2 text-white font-bold 
                    hover:bg-blue-700 duration-200 rounded-sm">
                        Salvar
                    </button>
                </form>
            </div>

        </div>
    )
}