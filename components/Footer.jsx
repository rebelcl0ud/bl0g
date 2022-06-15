import styles from "../styles/Home.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        <h2 className={styles.footerTitle}>test</h2>
        <div className={styles.footerNav}>
          <div className={styles.footerNav1}>
            <ul className={styles.contactList}>
              <Link href="/"><a><li className={styles.contactListItem}>testing 1</li></a></Link>
              <Link href="/"><a><li className={styles.contactListItem}>testing 2</li></a></Link>
            </ul>
          </div>
          <div className={styles.footerNav2}>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;