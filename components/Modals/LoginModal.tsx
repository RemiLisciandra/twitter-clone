import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import {useCallback, useState} from "react";
import Input from '../Input';
import Modal from '../Modal'
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {signIn} from "next-auth/react";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

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
            await signIn('credentials', {
                email,
                password
            });
            loginModal.onClose();
        } catch (error) {
            //console.log("Erreur : " + error);
        } finally {
            setIsLoading(false);
        }
    }, [loginModal, email, password]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                type="email"
                placeholder="Adresse mail"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <div className="relative w-full">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    disabled={isLoading}
                />
                <button
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white cursor-pointer"
                >
                    {passwordVisible ? (
                        <BsFillEyeFill size={20}/>
                    ) : (
                        <BsFillEyeSlashFill size={20}/>
                    )}
                </button>
            </div>
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

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={"Se connecter"}
            actionLabel={"Connexion"}
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;