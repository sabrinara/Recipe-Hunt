/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { createRecipe } from "@/services/RecipeServices";
import { CreateRecipePayload } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const CreateRecipeForm = () => {
const router  = useRouter();
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

  const imgbbAPIKey =   process.env.NEXT_PUBLIC_IMGBB_API_KEY as string;

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
    } catch (err) {
      toast.error("Failed to create recipe.");
      console.error(err);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-2xl mx-auto">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border" required />
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full p-2 border" required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 border" required />

      <div className="space-y-2">
        <label>Ingredients:</label>
        {formData.ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Name"
              value={ing.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              className="w-1/2 p-2 border"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ing.quantity}
              onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
              className="w-1/2 p-2 border"
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient} className="text-blue-500">
          + Add Ingredient
        </button>
      </div>

      <input type="number" name="cookingTime" placeholder="Cooking Time (mins)" value={formData.cookingTime} onChange={handleChange} className="w-full p-2 border" required />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
        className="w-full p-2 border"
      />

      <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full p-2 border">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} />
          Published
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isPremium" checked={formData.isPremium} onChange={handleChange} />
          Premium
        </label>
      </div>

      <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full" />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Create Recipe"}
      </button>
    </form>
  );
};

export default CreateRecipeForm;
