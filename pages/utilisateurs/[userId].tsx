import Header from "../../components/Header";
import Head from "next/head";
import {useRouter} from "next/router";
import useUser from "../../hooks/useUser";
import {ClipLoader} from "react-spinners";
import UserHero from "../../components/users/UserHero";
import UserBio from "../../components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";

const UserView = () => {
    const router = useRouter();
    const {userId} = router.query;
    const {data: userFetched, isLoading} = useUser(userId as string);
    if (isLoading || !userFetched) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue"/>
            </div>
        );
    }
    return (
        <>
            <Head>
                <title>Profil - {userFetched?.username}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <Header label={userFetched?.username} showBackArrow/>
            <UserHero userId={userId as string}/>
            <UserBio userId={userId as string}/>
            <PostFeed userId={userId as string} />
        </>
    );
};

export default UserView;