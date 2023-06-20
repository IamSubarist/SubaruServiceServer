const express = require("express");
const router = express.Router();
const { News } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

router.post("/add", async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    const { img } = req.files;
    console.log(req.files);

    const fileNames = [];

    if (Array.isArray(img)) {
      for (const image of img) {
        const fileName = uuid.v4() + path.extname(image.name);
        await image.mv(path.resolve(__dirname, "..", "static", fileName));
        fileNames.push(fileName);
      }
    } else {
      const fileName = uuid.v4() + path.extname(img.name);
      await img.mv(path.resolve(__dirname, "..", "static", fileName));
      fileNames.push(fileName);
    }

    const newNews = await News.create({
      img: fileNames,
      title: title,
      subtitle: subtitle,
      description: description,
    });

    res.json(newNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/", async (req, res) => {
  try {
    const news = await News.findAll();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ error: "Новость не найдена" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
