const { Device, DeviceInfo } = require("../models/models");
const { Op } = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../errors/ApiError");

class DeviceController {
  async search(req, res, next) {
    const { query } = req.query;

    try {
      const devices = await Device.findAll({
        where: {
          name: {
            [Op.iLike]: `%${query}%`,
          },
        },
      });

      return res.json(devices);
    } catch (error) {
      return next(ApiError.internalServerError("Failed to perform search."));
    }
  }

  async create(req, res, next) {
    try {
      let {
        name,
        description,
        price,
        oldPrice,
        brandId,
        typeId,
        info,
        available,
      } = req.body;
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

      const device = await Device.create({
        name,
        description,
        price,
        oldPrice,
        brandId,
        typeId,
        available,
        img: fileNames,
      });

      if (brandId && info) {
        info = JSON.parse(info);
        info.map((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    let devices;
    limit = limit || 4;
    page = page || 1;
    let offset = page * limit - limit;
    if (!brandId && !typeId) {
      const totalCount = await Device.count();
      const totalPages = Math.ceil(totalCount / limit);
      devices = await Device.findAll({ limit, offset });
      return res.json({ rows: devices, totalPages });
    }
    if (brandId && !typeId) {
      const totalCount = await Device.count({ where: { brandId } });
      const totalPages = Math.ceil(totalCount / limit);
      devices = await Device.findAll({ where: { brandId }, limit, offset });
      return res.json({ rows: devices, totalPages });
    }
    if (!brandId && typeId) {
      const totalCount = await Device.count({ where: { typeId } });
      const totalPages = Math.ceil(totalCount / limit);
      devices = await Device.findAll({ where: { typeId }, limit, offset });
      return res.json({ rows: devices, totalPages });
    }
    if (brandId && typeId) {
      const totalCount = await Device.count({ where: { brandId, typeId } });
      const totalPages = Math.ceil(totalCount / limit);
      devices = await Device.findAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
      return res.json({ rows: devices, totalPages });
    }

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });

    return res.json(device);
  }

  async delete(req, res) {
    const { id } = req.params;
    const device = await Device.destroy({ where: { id } });
    return res.json(device);
  }
}

module.exports = new DeviceController();
