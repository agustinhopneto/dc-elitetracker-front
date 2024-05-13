import { Header } from '../../components/header';
import styles from './styles.module.css';

export function Focus() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Tempo de Foco" />
      </div>
    </div>
  );
}
