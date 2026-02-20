"use client";

import type { FormEvent } from "react";

import styles from "../styles/admin-auth.module.css";

type AdminLoginViewProps = {
  username: string;
  password: string;
  showPassword: boolean;
  loginReady: boolean;
  saving: boolean;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
};

function AuthShowcasePanel() {
  return (
    <aside className={styles.authPaneRight}>
      <h2>Welcome to KultureX Admin</h2>
      <p>Control products, events, creators, publishing workflows, and community operations from one command center.</p>

      <div className={styles.authRewardCard} aria-hidden="true">
        <span>Control content</span>
        <span>Scale operations</span>
      </div>

      <div className={styles.authValueList}>
        {["Unified web + mobile control", "Role-based governance", "Publishing + commerce workflows"].map((item) => (
          <div key={item} className={styles.authValueItem}>
            <span className={styles.authValueDot} />
            <p>{item}</p>
          </div>
        ))}
      </div>

      <button type="button" className={styles.disclosureLink}>
        View platform overview
      </button>
    </aside>
  );
}

export default function AdminLoginView({
  username,
  password,
  showPassword,
  loginReady,
  saving,
  error,
  onUsernameChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit
}: AdminLoginViewProps) {
  return (
    <main className={styles.authPage}>
      <section className={styles.authSplitCard}>
        <div className={styles.authPaneLeft}>
          <div className={styles.authPrimaryBlock}>
            <h1>Log in</h1>
            <form className={styles.authForm} onSubmit={onSubmit}>
              <label className={styles.field}>
                <span>Email</span>
                <input value={username} onChange={(event) => onUsernameChange(event.target.value)} required />
              </label>
              <label className={styles.field}>
                <span>Password</span>
                <div className={styles.passwordFieldShell}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => onPasswordChange(event.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={onTogglePassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <svg viewBox="0 0 24 24" className={styles.authInlineIcon}>
                      <path
                        d="M2 12s3.5-6 10-6s10 6 10 6s-3.5 6-10 6s-10-6-10-6zm10-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </label>
              <button type="button" className={styles.authForgot}>
                Forgot password?
              </button>
              <button
                type="submit"
                className={`${styles.authCta} ${loginReady ? styles.authCtaReady : ""}`}
                disabled={!loginReady || saving}
              >
                {saving ? "Signing in..." : "Log in"}
              </button>
            </form>
          </div>

          <div className={styles.authSecondaryBlock}>
            <button type="button" className={styles.passkeyButton}>
              Continue with passkey
            </button>
            <p>
              Log in securely using one click, your face, or your fingerprint.{" "}
              <a href="#" onClick={(event) => event.preventDefault()}>
                Learn how to set it up
              </a>
            </p>
          </div>

          {error ? <p className={styles.noticeError}>{error}</p> : null}
        </div>
        <AuthShowcasePanel />
      </section>
    </main>
  );
}
