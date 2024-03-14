import styles from "../styles/Home.module.css";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInfo}>
                <h2 className={styles.footerTitle}>COD3nigma</h2>
                <div className={styles.footerNav}>
                    <div className={styles.footerNav2}>
                        <p>
                            A migration of scribbles regarding code-- a
                            &apos;note to self&apos; collection.
                        </p>
                        <ul className={styles.contactList}>
                            <Link href='/me' passHref>
                                <li className={styles.contactListItem}>/me</li>
                            </Link>
                            <a href='https://www.rebelcl0ud.xyz/'><li className={styles.contactListItem}>site</li></a>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
