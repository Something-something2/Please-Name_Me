const User = require("./User")
const Pin = require("./Pin")

User.hasMany(Pin, {
    foreignKey: "user_id"
});

Pin.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = { User, Pin, }