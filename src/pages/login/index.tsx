import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../components/input';

// firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Método de realizar login
import { auth } from '../../services/firebaseConnection.ts';

export const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isEmpty = email === '' || password === '';
    if (isEmpty) return console.log('Preencha todos os campos...');

    // Realizar login
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Logado com sucesso...');
        navigate('/admin', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <Link to="/">
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev<span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
        </h1>
      </Link>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          placeholder="Digite o seu e-mail..."
        />

        <Input
          type="password"
          placeholder="Digite sua senha..."
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <button type="submit" className="h-9 bg-blue-600 rounded border-0 font-medium text-white">
          Acessar
        </button>
      </form>
    </div>
  );
};
