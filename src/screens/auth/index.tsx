import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './styles.module.css';

export function Auth() {
  const [searchParams] = useSearchParams();

  async function getUserInfo() {
    const { data } = await axios.get('http://localhost:4000/auth/callback', {
      params: {
        code: searchParams.get('code'),
      },
    });

    console.log(data);
  }

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div className={styles.container}>
      <h1>Carregando...</h1>
    </div>
  );
}
