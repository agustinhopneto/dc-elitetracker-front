import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { api } from '../../services/api';
import styles from './styles.module.css';

export function Auth() {
  const [searchParams] = useSearchParams();

  async function getUserInfo() {
    const { data } = await api.get('/auth/callback', {
      params: {
        code: searchParams.get('code'),
      },
    });

    console.log(data);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Carregando...</h1>
    </div>
  );
}
