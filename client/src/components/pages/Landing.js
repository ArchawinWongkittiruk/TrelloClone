import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    document.title = 'WebAppKanban';
  }, []);

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <nav className='top'>
        <h2>WebAppKanban</h2>
        <div>
          <Button color='inherit' href='/login'>
            Login
          </Button>
          <Button variant='contained' href='/register'>
            Cadastre-se
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h1>WebAppKanban</h1>
        <p>
          Aplicação para Gerenciamento de Tarefas Individuais e em Equipe.
        </p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Cadastrar
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Landing;
