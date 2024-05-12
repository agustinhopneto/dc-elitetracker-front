import { ListChecks, SignOut } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';

import { useUser } from '../../hooks/use-user';
import styles from './styles.module.css';

export function Sidebar() {
  const { userData, logout } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate('/entrar');
  }

  return (
    <div className={styles.container}>
      <img src={userData.avatarUrl} alt={userData.name} />
      <div className={styles.links}>
        <Link to="/">
          <ListChecks />
        </Link>
      </div>
      <SignOut onClick={handleLogout} className={styles.signout} />
    </div>
  );
}
