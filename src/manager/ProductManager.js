import { promises as fs } from "fs";







export default class ProductManager {
  constructor() {
    this.products = [];
    this.patch = "productos.json";
  }

  static nuevoId = 0;

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    // el cual agregará un producto al arreglo de productos inicial.
    // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
    // Al agregarlo, debe crearse con un id autoincrementable

    const productoExiste = this.products.find(
      (producto) => producto.code === code
    );

    if (productoExiste) {
      console.log(
        `El producto ${productoExiste.title} existe, no debes ingresarlo`
      );
      return;
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        `Debes ingresar todos los campos para agregar un producto ${title}`
      );
    } else {
      const producto = {
        id: ++ProductManager.nuevoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(producto);

      await fs.writeFile(this.patch, JSON.stringify(this.products));

      console.log(`El producto ${producto.title} fue agregado correctamente`);
    }
  };

  readProduct = async () => {
    let leerProducto = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(leerProducto);
  };

  getProducts = async () => {
    let verProducto = await this.readProduct();
    console.log(verProducto);

    // el cual debe devolver el arreglo con todos los productos creados hasta ese momento
  };

  getProductById = async (id) => {
    let verProductoId = await this.readProduct();
    const productoIdValidar = verProductoId.find(
      (producto) => producto.id === id
    );
    if (!productoIdValidar) {
      console.log(`"Not found", el ID ${id} de producto no existe`);
    } else {
      console.log(`El producto con el ID ${id} fue encontrado.`);
    }

    return console.log(productoIdValidar);
  };
  // Usar metodo de array, para buscar articulo - Actualizar el parametro recibido y reescribirlo con writeFile
  deleteProductById = async (id) => {
    let deleteProductoId = await this.readProduct();
    const productoIdValidarId = deleteProductoId.filter(
      (producto) => producto.id != id
    );
    await fs.writeFile(this.patch, JSON.stringify(productoIdValidarId));
    // console.log("ProductoEliminado");
    // console.log(productoIdValidarId);
  };

  updateProduct = async ({ id, ...producto }) => {
    await this.deleteProductById(id);
    let productosInicial = await this.readProduct();
    let productoModificado = [{ id, ...producto }, ...productosInicial];
    await fs.writeFile(this.patch, JSON.stringify(productoModificado));
    console.log(productoModificado.sort());
  };
}
// usar metodo de array para buscar producto y borrar el resto.

// // -----------------------------* Proceso de testing *----------------------------
// Se creará una instancia de la clase “ProductManager”
const producto = new ProductManager();

// producto.addProduct('Producto prueba1', 'Este es un producto prueba1', 100, 'Sin imagen', 'abc1234', 25);
// producto.addProduct('Producto prueba2', 'Este es un producto prueba2', 200, 'Sin imagen', 'abc1235', 25);
// producto.addProduct('Producto prueba3', 'Este es un producto prueba3', 300, 'Sin imagen', 'abc1236', 25);
// producto.addProduct('Producto prueba4', 'Este es un producto prueba4', 400, 'Sin imagen', 'abc1237', 25);
// producto.addProduct('Producto prueba5', 'Este es un producto prueba5', 500, 'Sin imagen', 'abc1238', 25);
// producto.addProduct('Producto prueba6', 'Este es un producto prueba6', 600, 'Sin imagen', 'abc1239', 25);
// producto.addProduct('Producto prueba7', 'Este es un producto prueba7', 700, 'Sin imagen', 'abc12310', 25);
// producto.addProduct('Producto prueba8', 'Este es un producto prueba8', 800, 'Sin imagen', 'abc12311', 25);
// producto.addProduct('Producto prueba9', 'Este es un producto prueba9', 900, 'Sin imagen', 'abc12312', 25);
// producto.addProduct('Producto prueba10', 'Este es un producto prueba10', 1000, 'Sin imagen', 'abc12313', 25);


// // -----------------------------* Proceso de testing *----------------------------