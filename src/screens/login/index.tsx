import { GithubLogo } from '@phosphor-icons/react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/button';
import styles from './styles.module.css';

export function Login() {
  // const navigate = useNavigate();

  async function handleAuth() {
    const { data } = await axios.get('http://localhost:4000/auth');

    window.location.href = data.redirectUrl;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Entre com</h1>
        <Button onClick={handleAuth}>
          <GithubLogo />
          GitHub
        </Button>
        <p>
          Ao entrar, eu concordo com o Termos de Serviço e Política de
          Privacidade.
        </p>
      </div>
    </div>
  );
}
