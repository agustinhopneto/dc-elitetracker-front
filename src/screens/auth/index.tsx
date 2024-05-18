import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUser } from '../../hooks/use-user';
import styles from './styles.module.css';

export function Auth() {
  const [searchParams] = useSearchParams();
  const { userData, getUserInfo } = useUser();

  useEffect(() => {
    getUserInfo(String(searchParams.get('code')));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Carregando...</h1>
      <p>{JSON.stringify(userData, null, 2)}</p>
    </div>
  );
}
