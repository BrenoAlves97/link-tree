import React from 'react';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Social } from '../../components/social';
import { Link } from 'react-router-dom';

import { db } from '../../services/firebaseConnection.ts';
import { getDocs, orderBy, getDoc, query, doc, collection } from 'firebase/firestore';

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialProps {
  facebook: string;
  instagram: string;
  github: string;
}

export const Home = () => {
  const [links, setLinks] = React.useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = React.useState<SocialProps | null>(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const loadLinks = async () => {
      const linksRef = collection(db, 'links');
      const queryRef = query(linksRef, orderBy('created', 'asc'));

      getDocs(queryRef)
        .then((snapshot) => {
          const list = [] as LinkProps[];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              bg: doc.data().bg,
              color: doc.data().color,
            });
          });
          setLinks(list);
        })
        .catch((err) => console.log(err));
    };
    loadLinks();
  }, []);

  React.useEffect(() => {
    const fetchSocial = async () => {
      const docRef = doc(db, 'social', 'link');
      await getDoc(docRef).then((snapshot) => {
        if (snapshot.data() === undefined) return;
        setSocialLinks({
          facebook: snapshot.data()?.facebook,
          instagram: snapshot.data()?.instagram,
          github: snapshot.data()?.github,
        });
      });
    };
    fetchSocial();
  }, []);

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold  text-white mt-20">Breno Alves</h1>
      <span className="text-gray-50 mb-5 mt-3 bg-slate-700 p-2 rounded cursor-pointer" onClick={handleClick}>
        Veja meus links ✌️
      </span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            style={{ backgroundColor: link.bg }}
            className={`mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer`}
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.facebook}>
              <FaFacebook size={35} color="#fff" />
            </Social>
            <Social url={socialLinks.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
};
