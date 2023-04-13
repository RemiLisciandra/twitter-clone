import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useAuthUser from "./useUserAuth";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({ postId, userId }: { postId: string, userId?: string }) => {
    const { data: userAuth } = useAuthUser();
    const { data: postFetched, mutate: mutatePostFetched } = usePost(postId);
    const { mutate: mutatePostsFetched } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = postFetched?.likedIds || [];

        return list.includes(userAuth?.id);
    }, [postFetched, userAuth]);

    const toggleLike = useCallback(async () => {
        if (!userAuth) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasLiked) {
                request = () => axios.delete('/api/like', { data: { postId } });
            } else {
                request = () => axios.post('/api/like', { postId });
            }

            await request();
            await mutatePostFetched();
            await mutatePostsFetched();
        } catch (error) {
            toast.error("Une erreur est survenue");
        }
    }, [userAuth, hasLiked, postId, mutatePostFetched, mutatePostsFetched, loginModal]);

    return {
        hasLiked,
        toggleLike,
    }
}

export default useLike;