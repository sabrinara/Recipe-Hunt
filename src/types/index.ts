export type Ingredient = {
  _id: string;
  name: string;
  quantity: string;
  isChecked: boolean;
}


export type RecipeData = {
  _id: string;
  name: string;
  title: string;
  description: string;
  ingredients: Ingredient[];
  image: string[];
  cookingTime: number;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  isPublished: boolean;
  isPremium: boolean;
  user: UserData;
  createdAt: Date;
  ratings: number[];
  upvotes: number;
  downvotes: number;
};


export type UserData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: number;
  imageUrl: string;
  role: "user" | "admin";
  address: string;
  premiumMembership: boolean;
  isBlocked: boolean;
  follow: string[];
  followers: string[];

};

