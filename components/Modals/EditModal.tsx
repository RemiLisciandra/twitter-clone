import useUserAuth from "../../hooks/useUserAuth";
import useUser from "../../hooks/useUser";
import useEditModal from "../../hooks/useEditModal";
import {useCallback, useEffect, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Modal from '../Modal'
import Input from "@/components/Input";

const EditModal = () => {
    const {data: userAuth} = useUserAuth();
    const {mutate: userMutateFetched} = useUser(userAuth?.id);
    const editModal = useEditModal();
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [stepLength, setStepLength] = useState(false);

    useEffect(() => {
        setLastname(userAuth?.lastname);
        setFirstname(userAuth?.firstname);
        setUsername(userAuth?.username);
        setBio(userAuth?.bio);
        setProfileImage(userAuth?.profileImage);
        setCoverImage(userAuth?.coverImage);
    }, [userAuth?.lastname, userAuth?.firstname, userAuth?.username, userAuth?.bio, userAuth?.profileImage, userAuth?.coverImage]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        if(!lastname || !firstname || !username) {
            toast.error("Le nom, le prénom et le nom d'utilisateur sont des champs obligatoires");
            return null;
        }
        if (!lastname || lastname !== lastname.toUpperCase()) {
            toast.error("Le nom est manquant ou invalide");
            return null;
        }
        if (!firstname || firstname !== capitalizeFirstLetter(firstname)) {
            toast.error("Le prénom est manquant ou invalide");
            return null;
        }
        if (bio && bio.length > 50) {
            toast.error("La description est trop grande, 50 caractères maximum");
            return null;
        }
        try {
            await axios.patch('/api/edit', {
                lastname,
                firstname,
                username,
                bio,
                profileImage,
                coverImage
            });
            await userMutateFetched();
            toast.success("Informations modifiées");
            editModal.onClose();
        } catch (error) {
            toast.error("Une erreur est survenue");
        } finally {
            setIsLoading(false);
        }
    }, [bio, coverImage, editModal, firstname, lastname, profileImage, userMutateFetched, username]);

    const capitalizeFirstLetter = (value: string) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder="NOM"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                disabled={isLoading}
            />
            <Input
                type="text"
                placeholder="Prénom"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                disabled={isLoading}
            />
            <Input
                type="text"
                placeholder="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                type="text"
                placeholder="Decription"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    );

    return (
        <Modal disabled={isLoading}
               isOpen={editModal.isOpen}
               title={"Modifier votre profil"}
               actionLabel={"Sauvagarder"}
               onClose={editModal.onClose}
               onSubmit={onSubmit}
               body={bodyContent}
        />
    );
};

export default EditModal;