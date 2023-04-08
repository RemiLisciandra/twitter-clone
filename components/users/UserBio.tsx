import React, {useMemo} from "react";
import {format} from "date-fns";
import useUser from "../../hooks/useUser";
import Button from "../Button";
import useUserAuth from "@/hooks/useUserAuth";

interface UserBioProps {
    userId: string;
}

const UserBio: React.FC<UserBioProps> = ({userId}) => {
    const {data: userAuth} = useUserAuth();
    const {data: userFetched} = useUser(userId);
    const createdAt = useMemo(() => {
        if (!userFetched?.createdAt) {
            return null;
        }
        return format(new Date(userFetched.createdAt), 'MMMM yyyy');
    }, [userFetched?.createdAt])


    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                {userAuth?.id === userId ? (
                    <Button secondary label="Modifier" onClick={() => {} }/>
                ) : (
                    <Button
                        onClick={() => {} }
                        label='Suivre'
                        secondary
                    />
                )}
            </div>
        </div>
    );
}

export default UserBio;