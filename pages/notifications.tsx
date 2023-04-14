import Header from "../components/Header";
import NotificationsFeed from "../components/NotificationsFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            session
        }
    }
}

const Notifications = () => {
    return (
        <>
            <Head>
                <title>Notifications</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header showBackArrow label="Notifications" />
            <NotificationsFeed />
        </>
    );
}

export default Notifications;