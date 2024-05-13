import { Plus } from '@phosphor-icons/react';
import { useRef } from 'react';

import { Header } from '../../components/header';
import styles from './styles.module.css';

export function Focus() {
  const focusInput = useRef<HTMLInputElement>(null);
  const restInput = useRef<HTMLInputElement>(null);

  function handleAddMinutes(type: 'focus' | 'rest') {
    if (type === 'focus') {
      const currentValue = Number(focusInput.current?.value);

      if (focusInput.current) {
        focusInput.current.value = String(currentValue + 5);
      }

      return;
    }

    const currentValue = Number(restInput.current?.value);

    if (restInput.current) {
      restInput.current.value = String(currentValue + 5);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header title="Tempo de Foco" />
        <div className={styles['input-group']}>
          <div className={styles.input}>
            <Plus onClick={() => handleAddMinutes('focus')} />
            <input
              ref={focusInput}
              placeholder="Tempo de foco"
              type="number"
              disabled
            />
          </div>

          <div className={styles.input}>
            <Plus onClick={() => handleAddMinutes('rest')} />
            <input
              ref={restInput}
              placeholder="Tempo de descanso"
              type="number"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
