import React from 'react';
import { FiTrash } from 'react-icons/fi';

import { addDoc, collection, query, onSnapshot, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConnection.ts';

import { Header } from '../../components/header';
import { Input } from '../../components/input';

// monitorando banco de dados -> onSnapshot

interface LinkProps {
  id: string;
  name: string;
  bg: string;
  color: string;
  url: string;
}

export const Admin = () => {
  const [nameInput, setNameInput] = React.useState('');
  const [urlInput, setUrlInput] = React.useState('');

  const [textColor, setTextColor] = React.useState('#f3f3f3');
  const [bgColor, setBgColor] = React.useState('#242424');

  const [links, setLinks] = React.useState<LinkProps[]>([]);

  React.useEffect(() => {
    const linksRef = collection(db, 'links');
    // busca personalizada
    const queryRef = query(linksRef, orderBy('created', 'asc'));
    // snapshot seria uma espécie de foto em tempo real do banco.
    const unsub = onSnapshot(queryRef, (snapshot) => {
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
    });

    // cancelar a subscrição, para não ficar monitorando quando não há necessidade.
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    const docRef = doc(db, 'links', id);
    await deleteDoc(docRef)
      .then(() => {
        console.log('Deletado com sucesso');
      })
      .catch((error) => console.log(error));
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const isEmpty = nameInput === '' || urlInput === '';
    if (isEmpty) return console.log('Preencha todos os campos...');

    await addDoc(collection(db, 'links'), {
      name: nameInput,
      url: urlInput,
      bg: bgColor,
      color: textColor,
      created: new Date(),
    })
      .then(() => {
        console.log('Cadastrado com sucesso!!!');
        setNameInput('');
        setUrlInput('');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form className="flex flex-col w-full max-w-xl mt-8 mb-4">
        <label className="text-white font-medium my-2">Nome do Link</label>
        <Input
          value={nameInput}
          onChange={({ target }) => setNameInput(target.value)}
          type="text"
          placeholder="Digite o nome do link..."
        />

        <label className="text-white font-medium my-2">Url</label>
        <Input
          value={urlInput}
          onChange={({ target }) => setUrlInput(target.value)}
          type="url"
          placeholder="Insira a Url..."
        />
      </form>

      <section className="flex gap-4 my-4">
        <div className="flex gap-2 items-center">
          <label className="text-white font-medium my-2">Cor de fonte</label>
          <Input value={textColor} onChange={({ target }) => setTextColor(target.value)} type="color" />
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-white font-medium my-2">Cor do Background</label>
          <Input value={bgColor} onChange={({ target }) => setBgColor(target.value)} type="color" />
        </div>
      </section>

      {nameInput !== '' && (
        <div className="w-full max-w-xl flex flex-col items-center justify-center p-1 mb-7 border-gray-100/25 border rounded-md">
          <label className="text-white font-medium mt-2 mb-3">Veja como está ficando</label>
          <article
            className="w-11/12 max-w-lg flex flex-col justify-between items-center bg-zinc-900 rounded px-1 py-3 h-12"
            style={{ marginBottom: 8, marginTop: 8, backgroundColor: bgColor }}
          >
            <p className="font-medium" style={{ color: textColor }}>
              {nameInput}
            </p>
          </article>
        </div>
      )}

      <button
        onClick={handleRegister}
        type="submit"
        className="mb-7 bg-blue-500 flex items-center justify-center rounded gap-4 text-gray-300 w-full max-w-xl h-9"
      >
        Cadastrar
      </button>

      <h2 className="text-white font-bold text-2xl mb-4">Meus Links</h2>

      {links.length > 0 &&
        links.map((link) => (
          <article
            key={link.id}
            className=" flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
            style={{ backgroundColor: `${link.bg}`, color: `${link.color}` }}
          >
            <p>{link.name}</p>
            <div>
              <button
                onClick={() => handleDelete(link.id)}
                className="border border-dashed p-1 flex items-center justify-center rounded bg-gray-700"
              >
                <FiTrash size={18} color="#FFF" />
              </button>
            </div>
          </article>
        ))}
    </div>
  );
};
