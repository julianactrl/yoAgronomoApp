const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  // defino el modelo

  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
          if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
              value
            )
          ) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue("password", hash);
          } else {
            throw new Error("Invalid password");
          }
        } else {
          this.setDataValue("password", null);
        }
      },
    },
    reset_code: {
      type: DataTypes.STRING,
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("reset_code", hash);
        }
      },
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profile_pic:{
      type: DataTypes.STRING
    }
  });
  

  User.prototype.compare = (password, isReset) => {
    //compares resetcode when isReset is true
    if (this.password || this.reset_code)
      return bcrypt.compareSync(
        password.toString(),
        isReset ? this.reset_code : this.password
      );
    else return false;
  };
};
