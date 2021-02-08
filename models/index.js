const Group = require("./Group");
const Hole = require("./Hole");
const User = require("./User");


Hole.hasMany(Group, {
    foreignKey: 'role_id'
});

Group.belongsTo(Hole, {
    foreignKey: "role_id"
});

Group.hasMany(User, {
    foreignKey: "hole_id"
});

User.belongsTo(Group, {
    foreignKey: "hole_id"
});



module.exports = {
    Group,
    Hole,
    User
};

