const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const userSchema = new  mongoose.Schema({
    fullName: String,
    email: String,
    passwaord:String,
    phone: String,
    status: Boolean,
    roleId: {type: mongoose.Schema.ObjectId, ref:"role"},
    date: {type: Date , default: Date.now}
});

userSchema.methods.generateJWT = function (){
    return jqt.sign({
        _id: this._id,
        name: this.name,
        roleId: this.roleId,
        iat: moment().unix(),
    },process.env.SECRET_KEY_JWT
    );
};

const User = mongoose.model("users", userSchema);

module.exports = User;


