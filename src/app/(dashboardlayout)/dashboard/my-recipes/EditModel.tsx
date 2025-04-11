import { updateRecipeById } from "@/services/RecipeServices";
import { RecipeData } from "@/types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { toast } from "sonner";

interface EditModelProps {
  recipe: RecipeData;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void; // optional callback to refresh data
}

const EditModel = ({ recipe, isOpen, onClose, onUpdateSuccess }: EditModelProps) => {
  const [formData, setFormData] = useState({
    name: recipe.name,
    title: recipe.title,
    description: recipe.description,
    cookingTime: recipe.cookingTime,
    difficulty: recipe.difficulty,
    ingredients: recipe.ingredients,
    image: recipe.image,
    tags: recipe.tags,
    isPublished: recipe.isPublished,
    isPremium: recipe.isPremium,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("accessToken");

      if (!token || !user._id) {
        throw new Error("User not authenticated");
      }

      const updatedPayload = {
        ...formData,
        user: user._id,
      };

      await updateRecipeById(recipe._id, updatedPayload, token);
      onUpdateSuccess?.(); 
      toast("Recipe Update Done")
      onClose(); // close modal
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="text-center text-[#E10101] text-2xl font-bold">Edit Recipe</ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label>Cooking Time (minutes)</label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-3">
              <label>Difficulty</label>
              <input
                type="text"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Add more fields (e.g. ingredients, image, tags) as needed */}
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
          <Button className="bg-[#E10101]" onPress={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModel;
