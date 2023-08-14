import express, { json } from "express"
import ProductManager from "./managers/ProductManager.js";
import productsRouter from "./routes/products-router.js";
import CartManager from "./managers/CartManager.js";
import cartsRouter from "./routes/carts-router.js";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views-router.js";

const manager = new ProductManager("./src/jsons/products.json")
const cartManager = new CartManager("./src/jsons/cart.json")

const app = express()
app.use(json())

app.use(express.static(__dirname + '/../public'))

app.set('views', __dirname + '/views');

const httpServer = app.listen(8080, ()=>{
    console.log("Server listening on port 8080.")
})





app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

export {manager, cartManager}