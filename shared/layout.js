import styles from "./layout.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <div className={styles.container}>{children}</div>
            <Footer />
        </>
    );
}
