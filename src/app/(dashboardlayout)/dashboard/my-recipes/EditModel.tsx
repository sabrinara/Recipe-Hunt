import { RecipeData } from "@/types";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
  
  interface EditModelProps {
    recipe: RecipeData;
    isOpen: boolean;
    onClose: () => void;
  }
  
  const EditModel = ({ recipe, isOpen, onClose }: EditModelProps) => {
    
    return (
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit Recipe</ModalHeader>
          <ModalBody>
            <form>
              {/* Here you can add form inputs to edit the recipe */}
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label>Name</label>
                <input
                  type="text"
                  value={recipe.name}
                  onChange={() => {}}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
           
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={onClose}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default EditModel;
  