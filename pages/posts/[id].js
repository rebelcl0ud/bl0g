import Head from 'next/head'
import Link from 'next/link'
import {getPostsID, getPostData} from '../../lib/posts'
import Layout from '../../shared/layout'

export default function Post({postData}) {
    const {id, title, date, contentHTML} = postData
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <h1>{title}</h1>
            <small>{date}</small>
            <br />
            <div dangerouslySetInnerHTML={{__html: contentHTML}}/>
            <br />
            <Link href="/">&larr; go back</Link>
        </Layout>
       
    )
}

export async function getStaticPaths() {
    // https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
    const paths = getPostsID()

    console.log({paths})
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)

    return {
        props: {
            postData
        }
    }
}