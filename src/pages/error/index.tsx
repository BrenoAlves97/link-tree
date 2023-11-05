import React from 'react';
import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div className="w-full items-center justify-center max-w-xl mx-auto flex flex-col text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Página não encontrada - 404</h1>
      <p className="italic text-base mb-4">Você caiu em uma página que não existe...</p>
      <Link
        to="/"
        className="bg-gray-50/20 hover:bg-gray-50/50 rounded-md py-1 px-3 text-gray-200 font-bold hover:text-gray-950 duration-100 cursor-pointer "
      >
        Voltar á página inicial
      </Link>
    </div>
  );
};
