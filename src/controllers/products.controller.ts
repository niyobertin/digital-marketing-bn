import { Request,Response } from "express";
import { getProducts,getProduct,createProducts,deleteProduct} from "../services/products.service";
import { IProduct } from "../../type";
import { uploadMultipleImages } from "../utils/uploadImage";
import { User } from "../database/models/users.model";
import { Product } from "../database/models/products.model";


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await  getProducts();
        if(products){
            return res.status(200).json({
                status:200,
                count:products.length,
                data:products
            })
        }else{
            return res.status(404).json({
                status:404,
                data:'Products not found'
            })
        }
    } catch (err:any) {
        if(err){
            return res.status(500).json({ error: err });
        }
    }
}
export const getSingleProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const products = await  getProduct(id);
        if(products && products.length > 0){
            return res.status(200).json({
                status:200,
                count:products.length,
                data:products
            })
        }else{
            return res.status(404).json({
                status:404,
                data:'Products not found'
            })
        }
    } catch (err:any) {
        if(err){
            return res.status(500).json({ error: err });
        }
    }
}
export const addProducts = async (req: Request, res: Response) => {
    const currentUser = (req as any).user;
    try {
      const uploadedImages = process.env.NODE_ENV === "test" ? ["file1", "file2", "file3", "file4"] : await uploadMultipleImages(req.files);
      if (uploadedImages.length > 0 && (uploadedImages.length < 2 || uploadedImages.length > 8)) {
        return res.status(400).json({
          status: 400,
          message: "Upload at least 2 images and not longer than 8",
        });
      } else if (uploadedImages.length === 0) {
        return res.status(400).json({
          status: 400,
          message: "Images is required",
        });
      }
      let ulr = [];
      for (const imageUrl of uploadedImages) {
        ulr.push(imageUrl);
      }
       //@ts-ignore
    const email  = req.user.email;
    const user: any = await User.findOne({email:email});
      const {  name,images,description,categories,price,createdBy,createdAt}: IProduct = req.body;
      const product = {
        name,
        images:ulr,
        description,
        categories,
        price,
        createdBy:user._id,
        createdAt
      };
      const isCreated = await createProducts(product);
      if (isCreated) {
        res.status(201).json({
          status: 201,
          message: "New product created!",
        });
      } else {
        res.status(409).json({
          status: 409,
          message: `This product, ${product.name} already exist.`,
        });
      }
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };

  export const updateProduct = async (req: Request, res: Response) => {
    try {
      const {name, description, categories, price, imagesToReplace }: IProduct & { imagesToReplace: number[] } = req.body;
      const id = req.params.id;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found.",
        });
      }
      const uploadedImages =
        process.env.NODE_ENV === "test"
          ? ["file1", "file2", "file3", "file4"]
          : await uploadMultipleImages(req.files);

      if (imagesToReplace && uploadedImages.length > 0) {
        if (imagesToReplace.length !== uploadedImages.length) {
          return res.status(400).json({
            status: 400,
            message: "Number of images to replace must match the number of uploaded images.",
          });
        }
  
        imagesToReplace.forEach((index, i) => {
          if (index >= 0 && index < product.images.length) {
            product.images[index] = uploadedImages[i]; 
          }
        });
      }

      if (product.images.length < 2 || product.images.length > 8) {
        return res.status(400).json({
          status: 400,
          message: "Total images must be between 2 and 8.",
        });
      }
      product.name = name || product.name;
      product.description = description || product.description;
      product.categories = categories || product.categories;
      product.price = price || product.price;
      await product.save();
  
      return res.status(200).json({
        status: 200,
        message: "Product updated successfully!",
      });
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };
  
 export const removeProducts  = async(req: Request, res: Response)=>{
  try {
    const id = req.params.id;
    const products = await  deleteProduct(id);
    if(products.deletedCount > 0){
        return res.status(200).json({
            status:200,
            data:'Product Deleted successful !'
        })
    }else{
        return res.status(404).json({
            status:404,
            data:'Products not found'
        })
    }
} catch (err:any) {
    if(err){
        return res.status(500).json({ error: err });
    }
}
 }