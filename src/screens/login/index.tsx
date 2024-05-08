import { GithubLogo } from '@phosphor-icons/react';

import { Button } from '../../components/button';
import styles from './styles.module.css';

export function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Entre com</h1>
        <Button>
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
