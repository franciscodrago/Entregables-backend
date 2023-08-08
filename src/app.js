import express from "express";
import ProductManager from "./manager/ProductManager.js";

console.clear();

const app = express();
const PORT = 8080;

const producto = new ProductManager();
const todosProductos = await producto.readProduct();

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) {
    return res.send(await todosProductos);
  } else {
    let todosLosProductos = await todosProductos;
    let productosLimit = todosLosProductos.slice(0, limit);
    return res.send(productosLimit);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const idProduct = req.params.id; 
    let todosLosProductos = await todosProductos;

    const existProduct = todosLosProductos.find(product => product.id == idProduct);
    const response = existProduct ? existProduct : { error: `No se encontro ningun producto con el id ${idProduct}` };
    res.status(existProduct ? 200 : 404).send(response);
  }
  catch (error) {
    res.status(500).send('Ha ocurrido un error inesperado en el servidor');
  }
})

app.listen(PORT, () => {
  console.log(`Servidor levantado en el PUERTO ${PORT}`);
});

app.on("error", (error) => console.log(`Error del servidor ${error}`));