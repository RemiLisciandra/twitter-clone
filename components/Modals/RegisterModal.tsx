import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import {useCallback, useState} from "react";
import Input from '../Input';
import Modal from '../Modal';
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {BsFillEyeFill} from 'react-icons/bs';
import {BsFillEyeSlashFill} from 'react-icons/bs';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [stepLength, setStepLength] = useState(false);
    const [stepDigit, setStepDigit] = useState(false);
    const [stepUpper, setStepUpper] = useState(false);
    const [stepLower, setStepLower] = useState(false);
    const [stepSpecial, setStepSpecial] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return null;
        }
        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        if (!validatePassword(password)) {
            return;
        }
        try {
            setIsLoading(true);
            await axios.post('/api/register', {
                lastname,
                firstname,
                username,
                email,
                password
            });
            toast.success('Votre compte a été créé !');
            await signIn('credentials', {
                email,
                password
            });
            registerModal.onClose();
        } catch (error) {
            //console.log("Erreur : " + error);
            toast.error("Une erreur s'est produite lors de la création de votre compte");
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, lastname, firstname, username, email, password]);

    const capitalizeFirstLetter = (value: string) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasLength = password.length >= 8;

        setStepDigit(hasDigit);
        setStepUpper(hasUpperCase);
        setStepLower(hasLowerCase);
        setStepSpecial(hasSpecialChar);
        setStepLength(hasLength);

        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar && hasLength;
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                type="text"
                placeholder="NOM"
                onChange={(e) => setLastname(e.target.value.toUpperCase())}
                value={lastname}
                disabled={isLoading}
            />
            <Input
                type="text"
                placeholder="Prénom"
                onChange={(e) => setFirstname(capitalizeFirstLetter(e.target.value))}
                value={firstname}
                disabled={isLoading}
            />
            <Input
                type='text'
                placeholder="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
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
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                    }}
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
            <div className="flex flex-col items-center gap-4">
                <h3 className="text-white font-semibold mb-2">Critères du mot de passe :</h3>
                <div className="flex items-center gap-5 mt-2 justify-center">
                    <div className="flex flex-col items-center">
                        <div className={`w-11 h-3 ${stepUpper ? "bg-green-500" : "bg-red-500"} rounded`}></div>
                        <p className={stepUpper ? "text-green-500" : "text-red-500"}>Majuscule</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-11 h-3 ${stepLower ? "bg-green-500" : "bg-red-500"} rounded`}></div>
                        <p className={stepLower ? "text-green-500" : "text-red-500"}>Minuscule</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-11 h-3 ${stepDigit ? "bg-green-500" : "bg-red-500"} rounded`}></div>
                        <p className={stepDigit ? "text-green-500" : "text-red-500"}>Chiffre</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-11 h-3 ${stepSpecial ? "bg-green-500" : "bg-red-500"} rounded`}></div>
                        <p className={stepSpecial ? "text-green-500" : "text-red-500"}>Spécial</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className={`w-11 h-3 ${stepLength ? "bg-green-500" : "bg-red-500"} rounded`}></div>
                        <p className={stepLength ? "text-green-500" : "text-red-500"}>8 caractères</p>
                    </div>
                </div>
            </div>
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

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title={"Créer un compte"}
            actionLabel={"Inscription"}
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;