import styles from "../styles/Home.module.css";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInfo}>
                <h2 className={styles.footerTitle}>COD3nigma</h2>
                <div className={styles.footerNav}>
                    <div>
                        <ul className={styles.contactList}>
                            <Link href='/me'>
                                <a>
                                    <li className={styles.contactListItem}>
                                        me
                                    </li>
                                </a>
                            </Link>
                        </ul>
                    </div>
                    <div className={styles.footerNav2}>
                        <p>
                            A migration of scribbles regarding code-- a
                            &apos;note to self&apos; collection.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
