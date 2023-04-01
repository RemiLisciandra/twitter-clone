import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import {useCallback, useState} from "react";
import Input from '../Input';
import Modal from '../Modal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            registerModal.onClose();
        } catch (error) {
            console.log("Erreur : " + error);
        } finally {
            setIsLoading(false);
        }
    }, [registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Nom"
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                disabled={isLoading}
            />
            <Input
                placeholder="Prénom"
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                disabled={isLoading}
            />
            <Input
                placeholder="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Adresse mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>{"Vous avez déjà un compte ? "}
                <span className="text-white cursor-pointer hover:underline" onClick={onToggle}
                >{"Se connecter"}
                </span>
            </p>
        </div>
    );

    return <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title={"Créer un compte"}
        actionLabel={"Inscription"}
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
}

export default RegisterModal;