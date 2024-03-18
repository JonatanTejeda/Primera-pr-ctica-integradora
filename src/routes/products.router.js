import {Router} from "express"
import { __dirname } from "../utils.js"
import ProductManager from "../dao/controllers/Mongo/productManagerMongo.js"
const pm=new ProductManager()

// Esto era con FS pero ahora trabajo con MONGO
// import ProductManager from "../Dao/controllers/fs/productsManager.js"
// const manager=new ProductManager(__dirname+'/Dao/database/products.json')

const ProductRouter = Router();

ProductRouter.get("/products",async(req,res)=>{
    const products= await pm.getProducts(req.query)
    res.json({products})
})

ProductRouter.get("/products/:pid", async (req, res) => {
    const productfind = await pm.getProductbyId(req.params);
    res.json({ status: "success", productfind });
  });

  ProductRouter.post("/products", async (req, res) => {
    const newproduct = await pm.addProduct(req.body);
     res.json({ status: "success", newproduct });
  });

  ProductRouter.put("/products/:pid", async (req, res) => {
    const updatedproduct = await pm.updateProduct(req.params,req.body);
     res.json({ status: "success", updatedproduct });
  });

  
  ProductRouter.delete("/products/:pid", async (req, res) => {
    const id=parseInt(req.params.pid)
    const deleteproduct = await pm.deleteProduct(id);
     res.json({ status: "success",deleteproduct });
  });



export default ProductRouter