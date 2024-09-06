// "use client";

import styles from "./ScaledLayout.module.css";

export default function ScaledLayout({ children }) {
  return (
    <div className={styles.scaleContainer}>
      <div className={styles.scaleWrapper}>{children}</div>
    </div>
  );
}
