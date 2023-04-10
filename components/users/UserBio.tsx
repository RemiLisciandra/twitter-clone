import React, {useMemo} from "react";
import {format} from "date-fns";
import useUser from "../../hooks/useUser";
import Button from "../Button";
import useUserAuth from "../../hooks/useUserAuth";
import {BiCalendar} from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";

interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({userId}) => {
    const {data: userAuth} = useUserAuth();
    const {data: userFetched} = useUser(userId);
    const editModal = useEditModal();
    const createdAt = useMemo(() => {
        if (!userFetched?.createdAt) {
            return null;
        }
        return format(new Date(userFetched.createdAt), 'MMMM yyyy');
    }, [userFetched?.createdAt]);


    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {userAuth?.id === userId ? (
                    <Button secondary label="Modifier" onClick={editModal.onOpen}/>
                ) : (
                    <Button
                        onClick={() => {
                        }}
                        label='Suivre'
                        secondary
                    />
                )}
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <p className="text-white text-2xl font-semibold">
                        {userFetched?.lastname + ' ' + userFetched?.firstname}
                    </p>
                    <p className="text-md text-neutral-500">
                        @{userFetched?.username}
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {userFetched?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar size={24}/>
                        <p>
                            Rejoins en {createdAt}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-6 mt-4">
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {userFetched?.followingIds?.length}
                        </p>
                        <p className="text-neutral-500">
                            Abonnements
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {userFetched?.followersCount || 0}
                        </p>
                        <p className="text-neutral-500">
                            Abonnés
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBio;