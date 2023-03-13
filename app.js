const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const tempDir = path.join(__dirname, "temp");
const productsDir = path.join(__dirname, "public", "products");

//об*єкт налаштування
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    };
    limits: {
      fileSize: 2048;
    }
  },
});

//middleware
const upload = multer({
  storage: multerConfig,
});

const products = [];

app.post("/api/products", upload.single("image"), async (req, res) => {
  //   console.log(req.file);
  //перейменування
  const { path: tempUpload, originalname } = req.file;
  //створюємо куди на зберігання
  const resultUpload = path.join(productsDir, originalname);

  try {
    await fs.rename(tempUpload, resultUpload);
    const image = path.join("products", originalname);
    const newproduct = {
      name: req.body.name,
      id: v4(),
      image,
    };
    products.push(newproduct);

    res.status(201).join(newproduct);
  } catch (error) {
    await fs.unlink(tempUpload);
  }
});

app.get("/api/products", async (req, res) => {
  res.json(products);
});

const { PORT = 3000 } = proces.env;

app.listen(PORT);
