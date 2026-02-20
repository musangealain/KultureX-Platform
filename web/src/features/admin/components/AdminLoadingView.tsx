"use client";

import styles from "../styles/admin-auth.module.css";

export default function AdminLoadingView() {
  return (
    <main className={styles.authPage}>
      <section className={styles.authCard}>
        <h1>Loading admin session...</h1>
      </section>
    </main>
  );
}
