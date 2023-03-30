import Header from '../components/Header';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Accueil</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header label="Accueil"></Header>
        </>
    );
}