import styles from "../styles/Home.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.siteInfo}>
        <Link href="/" className={styles.siteTitle}>COD3nigma</Link>
        <nav className={styles.siteNav}>
          <div className={styles.siteNavLinks}>
            <Link href="/me">me</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;