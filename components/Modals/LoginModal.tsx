import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import {useCallback, useState} from "react";
import Input from '../Input';
import Modal from '../Modal'

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return null;
        }
        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            loginModal.onClose();
        } catch (error) {
            console.log("Erreur : " + error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                type="email"
                placeholder="Adresse mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                type="password"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    );

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>{"Vous n'avez pas de compte ? "}
                <span className="text-white cursor-pointer hover:underline" onClick={onToggle}
                >{"S'inscrire"}
                </span>
            </p>
        </div>
    );

    return <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title={"Se connecter"}
        actionLabel={"Connexion"}
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
}

export default LoginModal;