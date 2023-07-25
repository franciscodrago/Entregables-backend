class ProductManager {
    static nuevoId = 0;

    constructor() {
        this.products = []


    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // el cual agregará un producto al arreglo de productos inicial.
        // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
        // Al agregarlo, debe crearse con un id autoincrementable

        const productoExiste = this.products.find((producto) => producto.code === code)

        if (productoExiste) {
            console.log(`El producto ${productoExiste.title} existe, no debes ingresarlo`);
            return
        }

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log(`Debes ingresar todos los campos para agregar un producto ${title}`)

        } else {

            const producto = {
                id: ++ProductManager.nuevoId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.products.push(producto);
            console.log(`El producto ${producto.title} fue agregado correctamente`);

        }

    }

    getProducts() {
        // el cual debe devolver el arreglo con todos los productos creados hasta ese momento
        return console.log(producto);
    };

    getProductById(id) {

        const productoIdValidar = this.products.find((producto) => producto.id === id)
        // el cual debe buscar en el arreglo el producto que coincida con el id
        // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
        if (!productoIdValidar) {
            console.log(`"Not found", el ID ${id} de producto no existe`);
        } else {
            console.log(`El producto con el ID ${id} fue encontrado.`);
        } return productoIdValidar;

    };
}

// -----------------------------* Proceso de testing *----------------------------
// Se creará una instancia de la clase “ProductManager”
const producto = new ProductManager();

producto.getProducts();

 producto.addProduct('Producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
 producto.addProduct('Producto prueba2', 'Este es un producto prueba', 200, 'Sin imagen', 'abc1234', 25);
 producto.addProduct('Producto prueba3', 'Este es un producto prueba', 200, 'Sin imagen', 'abc12345', 25);
 producto.addProduct('Producto prueba4', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123456', 25);
