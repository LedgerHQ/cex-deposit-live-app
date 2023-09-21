"use client";

import { useI18n } from "@/i18n/client";
import styles from "./page.module.css";

export default function Home() {
  const { t } = useI18n();

  return (
    <main className={styles.main}>
      <div>{t("welcome")}</div>
      <br />
      <br />
      <br />
      <div>Maintenance page</div>
    </main>
  );
}
