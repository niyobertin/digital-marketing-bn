import { IProduct } from "../../type";
import { Product } from "../database/models/products.model";
export const getProducts = async() => {
    try {
        const products = await Product.find();
        if(!products || products.length < 1){
            return null;
        }else{
            return products;
        }
    } catch (error:any) {
        return error;
    }
}

export const getProduct = async(id:string) => {
    try {
        const products = await Product.find({ _id: id });
        if(!products){
            return null;
        }else{
            return products;
        }
    } catch (error:any) {
        return error;
    }
}

export const createProducts = async (data: IProduct) => {
    try {
      const existingProduct = await Product.findOne({ name: data.name, createdBy: data.createdBy });
      if (existingProduct) {
        return false;
      } else {
        const products = await Product.create(data);
        return products;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
};

export const deleteProduct =async(id:string) =>{
    try {
        const products = await Product.findOne({ _id: id });
        if(products){
            const deleted = await Product.deleteOne({ _id: id })
            return deleted;
        }else{
            return false;
        }
    } catch (error:any) {
        return error;
    }
}