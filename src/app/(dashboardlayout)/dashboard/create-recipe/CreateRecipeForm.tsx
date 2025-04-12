/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { createRecipe } from "@/services/RecipeServices";
import { CreateRecipePayload } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const CreateRecipeForm = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  console.log(user)
  const [formData, setFormData] = useState<CreateRecipePayload>({
    name: "",
    title: "",
    description: "",
    ingredients: [{ name: "", quantity: "" }],
    image: [],
    cookingTime: 0,
    tags: [],
    difficulty: "easy",
    isPublished: false,
    isPremium: false,
    user: user ? user._id : "",
  });


  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    const updatedValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updated = [...formData.ingredients];
    updated[index][field as "name" | "quantity"] = value;
    setFormData(prev => ({ ...prev, ingredients: updated }));
  };

  const handleAddIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };


  const uploadImages = async (): Promise<string[]> => {
    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of images) {
      const form = new FormData();
      form.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (data.success) {
        uploadedUrls.push(data.data.url);
      }
    }

    setUploading(false);
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImages();
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("No access token found.");
        return;
      }

      const payload: CreateRecipePayload = {
        ...formData,
        image: imageUrls,
        cookingTime: Number(formData.cookingTime),
        tags: formData.tags.filter(Boolean),
        user: user?._id || "",
      };

      await createRecipe(payload, token);
      toast.success("Recipe created successfully!");
      router.push("/dashboard/my-recipes");
      toast.success("Need Admin permission to publish!");
    } catch (err) {
      toast.error("Failed to create recipe.");
      console.error(err);
    }
  };


  return (

    <div>
      <div
        className="flex flex-col items-center justify-center md:h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/tTSVg8RC/best-diets-for-women-use-an-app-1580311871.jpg')",
        }}
      >

        <div className="w-full shadow-xl bg-red-50 dark:bg-black/80 bg-opacity-80 dark:bg-opacity-80 rounded-lg font-semibold ">
          
          <form onSubmit={handleSubmit} className="p-2 md:px-20 md:py-11 ">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 my-2">
              <div className="w-full md:w-1/2 flex flex-col">
                <label htmlFor="name" className="my-1">Name</label>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className=" p-2 border rounded-md" required />
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <label htmlFor="title" className="my-1">Title</label>
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className=" p-2 border rounded-md" required />
              </div>
            </div>

            <div className="my-2">
              <label htmlFor="description" className="my-1">Description</label>
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-md" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="ingredients" className="my-1">Ingredients</label>
              {formData.ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={ing.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    className="w-1/2 p-2 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={ing.quantity}
                    onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                    className="w-1/2 p-2 border rounded-md"
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddIngredient} className="text-[#E10101]">
                + Add Ingredient
              </button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2 my-2 ">
              <div className="w-full md:w-1/3 flex flex-col">
                <label htmlFor="cookingTime" className="my-1">CookingTime</label>
                <input type="number" name="cookingTime" placeholder="Cooking Time (mins)" value={formData.cookingTime} onChange={handleChange} className="w-full p-2 border rounded-md" required />

              </div>
              <div className="w-full md:w-1/3 flex flex-col">
                <label htmlFor="tags" className="my-1">Tags</label>
                <input
                  type="text"
                  placeholder="Tags (comma separated)"
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div className="w-full md:w-1/3 flex flex-col">
                <label htmlFor="difficulty" className="my-1">Difficulty</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full p-2 border rounded-md">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>




            {/* <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
          Published
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} />
          Premium
        </label>
      </div> */}

            <div className="flex flex-col justify-between my-2">
              <label htmlFor="image" className="my-1">Upload Recipe Image</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full p-2 border rounded-md mt-1" />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-full bg-[#E10101] text-white px-4 md:px-40 py-2 rounded disabled:opacity-50"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Create Recipe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>




  );
};

export default CreateRecipeForm;
