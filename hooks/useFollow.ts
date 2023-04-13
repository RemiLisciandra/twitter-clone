import axios from "axios";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useUserAuth from "./useUserAuth";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
    const { data: userAuth, mutate: mutateUserAuth } = useUserAuth();
    const { mutate: mutateUserFetched } = useUser(userId);

    const loginModal = useLoginModal();

    const isFollowing = useMemo(() => {
        const list = userAuth?.followingIds || [];

        return list.includes(userId);
    }, [userAuth, userId]);

    const toggleFollow = useCallback(async () => {
        if (!userAuth) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } });
            } else {
                request = () => axios.post('/api/follow', { userId });
            }

            await request();
            await mutateUserAuth();
            await mutateUserFetched();
        } catch (error) {
            toast.error('Une erreur est survenue');
        }
    }, [userAuth, isFollowing, userId, mutateUserAuth, mutateUserFetched, loginModal]);

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow;