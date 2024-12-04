export type UserData = {
    name: string;
    email: string;
    password: string;
    phone: number;
    imageUrl: string;
    role: "user" | "admin" ;
    address: string;
  };