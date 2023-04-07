import userSWR from 'swr';
import fetcher from "../libs/fetcher";

const useExistingUser = () => {
    const {data, error, isLoading, mutate} = userSWR('/api/current', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useExistingUser;