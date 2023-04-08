import userSWR from 'swr';
import fetcher from "../libs/fetcher";

const useUserAuth= () => {
    const {data, error, isLoading, mutate} = userSWR('/api/authentication', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useUserAuth;