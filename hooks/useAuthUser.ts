import userSWR from 'swr';
import fetcher from "../libs/fetcher";

const useAuthUser = () => {
    const {data, error, isLoading, mutate} = userSWR('/api/authentication', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useAuthUser;