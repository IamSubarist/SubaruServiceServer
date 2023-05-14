const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketDevice = sequelize.define("basket_device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const CarBrand = sequelize.define("car_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const CarModel = sequelize.define("car_model", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Device = sequelize.define("device", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const DeviceInfo = sequelize.define("device_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Car = sequelize.define("car", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  releaseYear: { type: DataTypes.STRING, allowNull: false },
  engineSize: { type: DataTypes.STRING, allowNull: false },
  fuelType: { type: DataTypes.STRING, allowNull: false },
  transmissionType: { type: DataTypes.STRING, allowNull: false },
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Car)
Car.belongsTo(User)

Car.hasOne(User)
User.belongsTo(Car)

// Car.hasOne(CarBrand)
// CarBrand.belongsTo(Car)

// CarBrand.hasMany(Car)
// Car.belongsTo(CarBrand)

// Car.hasOne(CarModel)
// CarModel.belongsTo(Car)

// CarModel.hasMany(Car)
// Car.belongsTo(CarModel)



CarModel.hasMany(Car)
Car.belongsTo(CarModel)

CarBrand.hasMany(Car)
Car.belongsTo(CarBrand)

// CarBrand.hasMany(CarModel)
// CarModel.belongsTo(CarBrand)

// CarModel.hasOne(CarBrand)
// CarBrand.belongsTo(CarModel)

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Device.hasMany(DeviceInfo, { as: "info" });
DeviceInfo.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });



module.exports = {
    User, 
    Device,
    DeviceInfo,
    Basket,
    BasketDevice,
    Type,
    Brand,
    TypeBrand,
    Rating,
    Order,
    Car,
    CarModel,
    CarBrand,
}