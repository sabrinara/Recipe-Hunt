export type UserData = {
  name: string;
  email: string;
  password: string;
  phone: number;
  imageUrl: string;
  role: "user" | "admin";
  address: string;
};

export type RecipeData = {
  name: string;
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  image: string;
  cookingTime: number;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  isPublished: boolean;
  isPremium: boolean;
  writer: string; 
};
