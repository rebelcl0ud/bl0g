import styles from "../styles/Home.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.siteInfo}>
        <Link href="/"><a className={styles.siteTitle}>COD3nigma</a></Link>
        <nav className={styles.siteNav}>
          <div className={styles.siteNavLinks}>
            <Link href="/me"><a>me</a></Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;