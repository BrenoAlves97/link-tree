import React from 'react';

import { Header } from '../../components/header';
import { Input } from '../../components/input';

import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection.ts';

export const Networks = () => {
  const [facebook, setFacebook] = React.useState('');
  const [instagram, setInstagram] = React.useState('');
  const [github, setGithub] = React.useState('');

  React.useEffect(() => {
    const fetchLinks = async () => {
      try {
        const docRef = doc(db, 'social', 'link');
        const snapshot = await getDoc(docRef);
        if (snapshot.data() === undefined) return;

        setFacebook(snapshot.data()?.facebook);
        setInstagram(snapshot.data()?.instagram);
        setGithub(snapshot.data()?.github);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLinks();
  }, []);

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    setDoc(doc(db, 'social', 'link'), {
      facebook: facebook,
      instagram: instagram,
      github: github,
    })
      .then(() => {
        console.log('Cadastrado com sucesso...');
      })
      .catch((err) => {
        console.log('Houve algum erro ao cadastrar', err);
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white font-medium text-3xl mt-8 mb-4">Minhas Redes Sociais</h1>

      <form className="w-full max-w-xl flex flex-col" onSubmit={handleRegister}>
        <label className="text-white font-medium my-2">Link do Facebook</label>
        <Input
          type="url"
          placeholder="Digite a url do facebook"
          value={facebook}
          onChange={({ target }) => setFacebook(target.value)}
        />

        <label className="text-white font-medium mt-2 mb-1">Link do Instagram</label>
        <Input
          type="url"
          placeholder="Digite a url do instagram"
          value={instagram}
          onChange={({ target }) => setInstagram(target.value)}
        />

        <label className="text-white font-medium my-2">Link do Github</label>
        <Input
          type="url"
          placeholder="Digite a url do github"
          value={github}
          onChange={({ target }) => setGithub(target.value)}
        />

        <button
          className="text-white font-bold bg-blue-600 rounded-md h-9 mt-6 flex items-center justify-center"
          type="submit"
        >
          Salvar Itens
        </button>
      </form>
    </div>
  );
};
