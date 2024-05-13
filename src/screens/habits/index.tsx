import { PaperPlaneRight, Trash } from '@phosphor-icons/react';

import styles from './styles.module.css';

export function Habits() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <h1>Hábitos Diários</h1>
          <span>Hoje, 27 de Fevereiro</span>
        </header>
        <div className={styles.input}>
          <input placeholder="Digite aqui um novo hábito" type="text" />
          <PaperPlaneRight />
        </div>
        <div className={styles.habit}>
          <p>Estudar Espanhol</p>
          <div>
            <input type="checkbox" name="" id="" />
            <Trash />
          </div>
        </div>
      </div>
    </div>
  );
}
