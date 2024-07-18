import { useEffect, useState } from "react";

// import { Social } from "../../components/Social";
// import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { db } from "../../services/firebaseConnection";

import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore";

interface LinkProps {
    id: string
    name: string,
    url: string,
    bg: string,
    text: string,
}

/*
interface SocialLinksProps {
    facebook: string,
    youtube: string,
    instagram: string,
}
*/



export function Home() {
    const [links, setLinks] = useState<LinkProps[]>([]);
    // const [socialLinks, setSocialLinks] = useState<SocialLinksProps>(); 

    useEffect(() => {
        const loadLinks = () => {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("created", "asc"));

            getDocs(queryRef)
                .then((snapshot) => {
                    const list = [] as LinkProps[];
                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            text: doc.data().text,
                        })
                    })

                    setLinks(list);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        loadLinks();
    }, []);

    /**useEffect(() => {
        const loadSocial = () => {
            const docRef = doc(db, "social", "link");
            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() === undefined) return

                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        youtube: snapshot.data()?.youtube,
                        instagram: snapshot.data()?.instagram,
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        loadSocial();
    }, []);
    */

    return (
        <div className="flex flex-col text-white text-center justify-center items-center space-y-20">

            <div className="mt-24 md:mt-36">
                <h1 className="text-3xl md:text-4xl font-bold">Eduardo Soares</h1>
                <span className="font-extralight text-sm md:text-base">Veja meus links!</span>
            </div>

            <div className="w-full flex flex-col gap-4">
                {links.map((link) => (
                    <div key={link.id} className="flex flex-col justify-center items-center w-full space-y-4 select-none font-semibold">

                        <a style={{ backgroundColor: `${link.bg}`, color: `${link.text}` }} className="w-[80%] 
                    md:max-w-[600px] text-sm md:text-lg py-3 p-2 rounded-md hover:scale-[1.02] duration-200 
                    cursor-pointer" href={link.url} target="_blank">
                            <span>{link.name}</span>
                        </a>

                    </div>
                ))}
            </div>


            {
                /** 
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                <footer className="flex gap-4 pb-20">
                    <Social url={socialLinks?.facebook}>
                        <FaFacebook size={35} color="#FFF" />
                    </Social>

                    <Social url={socialLinks?.youtube}>
                        <FaYoutube size={35} color="#FFF" />
                    </Social>

                    <Social url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="#FFF" />
                    </Social>
                </footer>
            )}
                */
            }


        </div>
    )
}