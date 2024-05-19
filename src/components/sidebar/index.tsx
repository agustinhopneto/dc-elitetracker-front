import { ListChecks, SignOut } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { useUser } from '../../hooks/use-user';
import styles from './styles.module.css';

export function Sidebar() {
  const { userData } = useUser();

  return (
    <div className={styles.container}>
      <img src={userData.avatarUrl} alt={userData.name} />
      <div className={styles.links}>
        <Link to="/">
          <ListChecks />
        </Link>
      </div>
      <SignOut className={styles.signout} />
    </div>
  );
}
