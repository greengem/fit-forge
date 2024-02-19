'use client';
import { useModal } from "@/contexts/ModalContext";

export default function ModalTest() {
    const { openModal } = useModal();
    
    return (
        <button onClick={() => openModal('testModal', {
            title: 'Modal Title',
            content: 'Hello, this is modal content!'
        })}>
          Open Modal
        </button>
    );
}
