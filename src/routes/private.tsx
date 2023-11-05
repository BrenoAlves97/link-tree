import React from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../services/firebaseConnection.ts';
import { onAuthStateChanged } from 'firebase/auth';

interface PrivateProps {
  children: React.ReactNode;
}

export const Private = ({ children }: PrivateProps): any => {
  const [loading, setLoading] = React.useState(true);
  const [signed, setSigned] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    // observer, verifica se o user está logado, se sim. Retorna algumas informações do usuário.
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };

        localStorage.setItem('@react_links', JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });

    //cancelando o observer, pois verificou se está logado ou não, e setou os states com suas respectivas respostas..
    return () => {
      unsub(); // ganhando performance, encerrando o unsub
    };
  }, []);

  if (loading) return <></>;

  if (!signed) return navigate('/login', { replace: true });

  return children;
};
