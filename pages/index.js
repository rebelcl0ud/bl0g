import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getPosts } from "../lib/posts";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ allPosts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          {allPosts.map(({ id, date, title, snippet }) => (
            <div className={styles.card} key={id}>
              <small>{date}</small>
              <h2>
                <Link href={`/posts/${id}`}>{title}</Link>
              </h2>
              {snippet}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getPosts();

  return {
    props: {
      allPosts,
    },
  };
}
