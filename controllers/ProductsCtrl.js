const Product = require('../schemas/productsSchema');

const getProducts = (req, res) => {
    console.log(req.user)
    Product.find({user:req.user}, (err, Products) => {
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
    update.modificationDate = Date.now();
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

    let ProductNew = new Product();
    ProductNew.name = req.body.name;
    ProductNew.user = req.user;
    ProductNew.elements = req.body.elements;
    // console.log(req.body.elements[2])
    // res.status(200).send(req.body)
    ProductNew.save((err, Product) => {
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