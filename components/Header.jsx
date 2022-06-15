import styles from "../styles/Home.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.siteInfo}>
        <Link href="/"><a className={styles.siteTitle}>test</a></Link>
        <nav className={styles.siteNav}>
          <div className={styles.siteNavLinks}>
            <Link href="/"><a>test1</a></Link>
            <Link href="/"><a>test2</a></Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header;