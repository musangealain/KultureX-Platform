"use client";

import type { FormEvent } from "react";

import styles from "../styles/admin-auth.module.css";

type AdminTwoFactorViewProps = {
  trustDevice: boolean;
  twoFactorMode: "passkey" | "code";
  code: string;
  challengeHint: string;
  verifyReady: boolean;
  saving: boolean;
  error: string;
  success: string;
  onTrustDeviceChange: (value: boolean) => void;
  onSwitchToCode: () => void;
  onSwitchToPasskey: () => void;
  onResetTwoFactor: () => void;
  onGoBackToLogin: () => void;
  onCodeChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
};

export default function AdminTwoFactorView({
  trustDevice,
  twoFactorMode,
  code,
  challengeHint,
  verifyReady,
  saving,
  error,
  success,
  onTrustDeviceChange,
  onSwitchToCode,
  onSwitchToPasskey,
  onResetTwoFactor,
  onGoBackToLogin,
  onCodeChange,
  onSubmit
}: AdminTwoFactorViewProps) {
  return (
    <main className={styles.authPasskeyPage}>
      <div className={styles.authPasskeyWrap}>
        <section className={styles.passkeyCard}>
          <h1>Use a passkey</h1>
          <p className={styles.passkeyIntro}>When you&apos;re ready to authenticate, click the button below.</p>

          <label className={styles.passkeyTrustRow}>
            <input type="checkbox" checked={trustDevice} onChange={(event) => onTrustDeviceChange(event.target.checked)} />
            <span>Trust this device for 30 days</span>
          </label>

          {twoFactorMode === "passkey" ? (
            <>
              <button type="button" className={styles.passkeyPrimaryButton} onClick={onSwitchToCode}>
                Use Passkey
              </button>

              <div className={styles.passkeyActionLinks}>
                <button type="button" onClick={onSwitchToCode}>
                  Use 2FA code instead
                </button>
                <button type="button" onClick={onSwitchToCode}>
                  Use backup code instead
                </button>
                <button type="button" onClick={onResetTwoFactor}>
                  Reset two-factor authentication
                </button>
                <button type="button" onClick={onGoBackToLogin}>
                  Go back to login
                </button>
              </div>
            </>
          ) : (
            <form className={styles.passkeyCodeForm} onSubmit={onSubmit}>
              <label className={styles.field}>
                <span>Verification code</span>
                <input
                  value={code}
                  onChange={(event) => onCodeChange(event.target.value)}
                  placeholder="123456"
                  pattern="\d{6}"
                  maxLength={6}
                  required
                />
              </label>
              {challengeHint ? <p className={styles.noticeInfo}>{challengeHint}</p> : null}
              <button
                type="submit"
                className={`${styles.authCta} ${verifyReady ? styles.authCtaReady : ""}`}
                disabled={!verifyReady || saving}
              >
                {saving ? "Verifying..." : "Verify code"}
              </button>
              <button type="button" className={styles.passkeyBackLink} onClick={onSwitchToPasskey}>
                Use passkey instead
              </button>
              <button type="button" className={styles.passkeyBackLink} onClick={onGoBackToLogin}>
                Go back to login
              </button>
            </form>
          )}

          {error ? <p className={styles.noticeError}>{error}</p> : null}
          {success ? <p className={styles.passkeySuccessText}>{success}</p> : null}
        </section>
      </div>
    </main>
  );
}
