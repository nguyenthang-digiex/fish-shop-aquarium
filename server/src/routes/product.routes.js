const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/products.json");

const getProducts = () => {
    const raw = fs.readFileSync(dataPath);
    return JSON.parse(raw);
};

// GET list
router.get("/", (req, res) => {
    let products = getProducts();

    const { coralType, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Filter coralType
    if (coralType) {
        products = products.filter(p => p.coralType === coralType);
    }

    // Filter price
    if (minPrice) {
        products = products.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
        products = products.filter(p => p.price <= Number(maxPrice));
    }

    // Pagination
    const start = (page - 1) * limit;
    const end = start + Number(limit);

    const paginated = products.slice(start, end);

    res.json({
        total: products.length,
        page: Number(page),
        limit: Number(limit),
        data: paginated
    });
});

// GET detail by slug
router.get("/:slug", (req, res) => {
    const products = getProducts();
    const product = products.find(p => p.slug === req.params.slug);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
});

module.exports = router;
