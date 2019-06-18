const Element = require('../schemas/elementSchema');

const getElements = (req, res) => {
    console.log(req.user);
    Element.find({user:req.user}, (err, elements) => {
        if (err) return res.status(500).send({ message: "Error al buscar los elementos" }).end();
        if (!elements) return res.status(400).send({ message: "No hay elemntos" }).end();
        res.status(200).send({ elements }).end();
    })
};

const getElementById = (req, res) => {
    let elementId = req.params.elementId;
    Element.findById(elementId, (err, element) => {
        if (err) return res.status(500).send({ message: "Error al buscar el elemento" }).end();
        if (!element) return res.status(400).send({ message: "Elemento no encontrado" }).end();
        res.status(200).send({ element }).end();
    })
}

const updateElementById = (req, res) => {
    let elementId = req.params.elementId;
    let update = req.body;
    update.modificationDate = Date.now();
    console.log(`PUT request on /element/:${elementId}`);
    Element.findByIdAndUpdate(elementId, update, (err, elementUpdated) => {
        if (err) return res.status(500).send({ message: `Error al actualizar el elemento: ${err}` }).end();
        res.status(200).send({ element: elementUpdated }).end();
    })
}

const removeElementById = (req, res) => {
    let elementId = req.params.elementId;
    console.log(`DELETE request on /element/:${elementId}`);
    Element.findById(elementId, (err, element) => {
        if (err) return res.status(500).send({ message: `Error al eliminar el elemento: ${err}` }).end();
        if (!element) return res.status(400).send({ message: `${elementId}: Elemento no encontrado ` }).end();
        element.remove(err => {
            if (err) return res.status(500).send({ message: `Error al eliminar el elemento: ${err}` }).end();
        })
        res.status(200).send({ element }).end();
    })
}

const saveElement = (req, res) => {
    console.log('POST request on /element');
    console.log(req.body);
    let element = new Element();
    element.user = req.user;
    element.name = req.body.name;
    element.type = req.body.type;
    element.price = req.body.price;
    element.save((err, element) => {
        if (err) return res.status(500).send({message: `error al crear el elemento: ${element}`}).end();
        else res.status(200).send({ element }).end();
    })
}

module.exports = {
    getElements,
    getElementById,
    updateElementById,
    removeElementById,
    saveElement
}