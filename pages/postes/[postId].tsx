import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import usePost from "../../hooks/usePost";
import Header from "../../components/Header";
import Form from "../../components/Form";
import PostItem from "../../components/posts/PostItem";
import CommentFeed from "../../components/posts/CommentFeed";


const PostView = () => {
    const router = useRouter();
    const { postId } = router.query;

    const { data: postFetched, isLoading } = usePost(postId as string);

    if (isLoading || !postFetched) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" />
            </div>
        )
    }

    return (
        <>
            <Header showBackArrow label="Tweet" />
            <PostItem data={postFetched} />
            <Form postId={postId as string} isComment placeholder="Tweeter une réponse" />
            <CommentFeed comments={postFetched?.comments} />
        </>
    );
}

export default PostView;