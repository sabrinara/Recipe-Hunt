/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteAUser } from "@/services/AdminServics";
import { UserData } from "@/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Image,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteModalUserProps {
    user: UserData;
    isOpen: boolean;
    onClose: () => void;
    onDeleted: (userId: string) => void;
}

const DeleteModalUser = ({ user, isOpen, onClose, onDeleted
}: DeleteModalUserProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) throw new Error("No token found");

            await deleteAUser(user._id, token);
            onDeleted(user._id);
            onClose();
            toast("User Deleted!")
        } catch (error) {
            console.error("Failed to delete User:", error);
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 font-bold text-3xl text-[#E10101] text-center">
                    Confirm Delete
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this user?
                    <div className="flex justify-start items-center gap-4 mt-2">
                        <Image
                            src={user.imageUrl}
                            alt={user.name}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <p className="font-semibold">{user.name}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        className="bg-[#E10101]"
                        isLoading={isDeleting}
                        onPress={handleDelete}
                    >
                        Yes, Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteModalUser;
