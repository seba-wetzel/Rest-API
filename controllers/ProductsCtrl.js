const Product = require('../schemas/productsSchema');

const getProducts = (req, res) => {
    //TODO add a req.user (user id) as a parameter in the search
    Product.find({}, (err, Products) => {
        if (err) return res.status(500).send({ message: "Error al buscar los Productos" }).end();
        if (!Products) return res.status(400).send({ message: "No hay elemntos" }).end();
        res.status(200).send({ Products }).end();
    })
};

const getProductById = (req, res) => {
    let ProductId = req.params.ProductId;
    Product.findById(ProductId, (err, Product) => {
        if (err) return res.status(500).send({ message: "Error al buscar el Producto" }).end();
        if (!Product) return res.status(400).send({ message: "Producto no encontrado" }).end();
        res.status(200).send({ Product }).end();
    })
}

const updateProductById = (req, res) => {
    let ProductId = req.params.ProductId;
    let update = req.body;
    console.log(`PUT request on /Product/:${ProductId}`);
    Product.findByIdAndUpdate(ProductId, update, (err, ProductUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el Producto: ${err}` }).end();
        res.status(200).send({ Product: ProductUpdated }).end();
    })
}

const removeProductById = (req, res) => {
    let ProductId = req.params.ProductId;
    console.log(`DELETE request on /Product/:${ProductId}`);
    Product.findById(ProductId, (err, Product) => {
        if (err) return res.status(500).send({ message: `Error al eliminar el Producto: ${err}` }).end();
        if (!Product) return res.status(400).send({ message: `${ProductId}: Producto no encontrado ` }).end();
        Product.remove(err => {
            if (err) return res.status(500).send({ message: `Error al eliminar el Producto: ${err}` }).end();
        })
        res.status(200).send({ Product }).end();
    })
}

const saveProduct = (req, res) => {
    console.log('POST request on /Product');
    console.log(req.body);
    let Product = new Product();
    Product.name = req.body.name;
    Product.type = req.body.type;
    Product.price = req.body.price;
    Product.save((err, Product) => {
        if (err) return res.status(500).send({message: `error al crear el Producto: ${Product}`}).end();
        else res.status(200).send({ Product }).end();
    })
}

module.exports = {
    getProducts,
    getProductById,
    updateProductById,
    removeProductById,
    saveProduct
}

//TODO esta todo copiado, hay que revisar uno por uno que esta bien