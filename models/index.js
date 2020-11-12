const User = require("./User")
const Pin = require("./Pin")
const Comment = require('./Comment')
//const Picture = require('./Picture')

User.hasMany(Pin, {
    foreignKey: "user_id"
});

Pin.belongsTo(User, {
    foreignKey: "user_id",
});

Pin.hasOne(Comment, {
    foreignKey: "pin_id"
});

Comment.belongsTo(Pin, {
    foreignKey: 'pin_id'
})

module.exports = { User, Pin, Comment, }
