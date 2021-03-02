const config = require("../config/dbConfig")
const Sequelize = require("sequelize")
const { dialect } = require("../config/dbConfig")
const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host:config.host,
        dialect:config.dialect
    }
)
const db={}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.user = require("../models/userModel")(sequelize,Sequelize)
db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId"
})

module.exports = db