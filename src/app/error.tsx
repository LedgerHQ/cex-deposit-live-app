"use client"; // Error components must be Client Components
import styles from "./page.module.css";

type Props = { error: Error; reset: () => void };

export default function Error({ error, reset }: Props) {
  return (
    <div className={styles.main}>
      <h2 className={styles.text}>Something went wrong!</h2>
      <h2 className={styles.text}>{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
