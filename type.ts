export interface IUser{
    firstName:string;
    secondName:String;
    gender:string;
    dob:Date;
    email:string;
    role:string;
    password:string;
}

export interface ILogin{
    email:string;
    password:string
}

export interface IProduct {
    name: string;
    images: string[];
    description: string;
    categories: string;
    price: number;
    createdBy: string;
    createdAt: Date;
  }