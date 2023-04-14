import {BsTwitter} from "react-icons/bs";
import useNotifications from "../hooks/useNotifications";
import useUserAuth from "../hooks/useUserAuth";
import {useEffect} from "react";

const NotificationsFeed = () => {
    const {data: userAuth, mutate: mutateUserAuth} = useUserAuth();
    const {data: notificationsFetched = []} = useNotifications(userAuth?.id);

    useEffect(() => {
        mutateUserAuth();
    }, [mutateUserAuth]);

    if (notificationsFetched.length === 0) {
        return (
            <div className="text-neutral-600 text-center p-6 text-xl">
                Aucune notification
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            {notificationsFetched.map((notification: Record<string, any>) => (
                <div key={notification.id}
                     className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
                    <BsTwitter color="white" size={32}/>
                    <p className="text-white">
                        {notification.body}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default NotificationsFeed;