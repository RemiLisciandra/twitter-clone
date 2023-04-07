import userSWR from 'swr';
import fetcher from "../libs/fetcher";

const useUsers = () => {
    const {data, error, isLoading, mutate} = userSWR('/api/users', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useUsers;