import {create} from 'zustand'

interface EditModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModal = create<EditModal>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useEditModal;