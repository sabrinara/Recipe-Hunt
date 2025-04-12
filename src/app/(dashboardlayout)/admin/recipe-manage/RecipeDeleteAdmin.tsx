import { RecipeData } from "@/types";
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
import { deleteRecipeAdmin } from "@/services/AdminServics";

interface DeleteModelProps {
  recipe: RecipeData;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: (id: string) => void; 
}

const RecipeDeleteAdmin = ({ recipe, isOpen, onClose, onDeleted }: DeleteModelProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No token found");

      await deleteRecipeAdmin(recipe._id, token);
      onDeleted(recipe._id);
      onClose();
      toast("Recipe Deleted!")
    } catch (error) {
      console.error("Failed to delete recipe:", error);
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
          Are you sure you want to delete the recipe ?{' '}
          <div className="flex justify-start items-center gap-4">
          <Image src={recipe.image[0]}  alt={recipe.name} className="w-16 h-16 object-cover rounded" />
          <p className="font-semibold">{recipe.name}</p>
          </div>
        </ModalBody>
        <ModalBody>
     
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
           className="bg-[#E10101] text-white"
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

export default RecipeDeleteAdmin;
