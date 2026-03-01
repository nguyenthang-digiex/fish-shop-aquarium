const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", require("./routes/product.routes"));

app.get("/", (req, res) => {
    res.json({ message: "🐠 Fish Shop API running..." });
});

module.exports = app;
