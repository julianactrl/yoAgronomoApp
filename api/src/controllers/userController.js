const { Empresa, User } = require("../db");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;

//==================================================//

const getEmpresaByUserId = (req, res) => {
  const { userId } = req.params;
  Order.findAll({
    where: {
      id: userId,
    },
    include: [
      {
        model: Empresa,
      },
    ],
  })
    .then(() => {
      res.json({ message: "Empresa encontrada" }).status(200);
    })
    .catch((err) => {
      res.send({ message: err }).status(400);
    });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName } = req.body;
  let userFind = await User.findAll({ where: { id: id } });

  if (req.file) {
    var profile = req.file.filename;
  }
  if (userFind.length > 0) {
    userFind.map(async (user) => {
      await user.update({
        fullName,
        profile_pic: profile,
      });
    });
    return res.json({
      message: "User updated",
      date: userFind,
    });
  }
};
/////////////////////////////////////////

const getImageProfile = (req, res) => {
  let getImage;
  const { name } = req.params;
  let pathImage = path.join(__dirname, "../");
  try {
    getImage = fs.readFileSync(`${pathImage}uploads/${name}`);
  } catch (error) {
    getImage = fs.readFileSync(`${pathImage}uploads/noImage.png`);
  }
  res.set({ "Content-Type": "image/png" });
  res.send(getImage);
};
////////////////////////////////

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.findByPk(id)
    .then((deleteUser) => deleteUser.destroy())
    .then(() => res.send("Usuario eliminado con exito"))
    .catch((err) => res.send(err));
};

//==========================================================================//
//server.post('/reset/password',
const passwordReset = (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Bad request" });

  let reset_code = Math.random().toString().slice(2, 7);

  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
      },
    })
  );

  let mailOptions = {
    from: EMAIL_ACCOUNT,
    to: email,
    subject: "Password Reset",
    text: "Here's your code to reset your password: " + reset_code,
  };

  User.update({ reset_code: reset_code }, { where: { email: email } }).then(
    (resp) => {
      if (!resp[0]) return res.status(404).json({ message: "User not found" });
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(400).json({ message: "Mail could not be sent" });
        } else {
          res.status(200).json({ message: "Code sent", ok: true });
        }
      });
    }
  );
};
//server.post('/reset/verification',

const resetVerificaction = async (req, res) => {
  const { email, reset_code, step, password } = req.body;
  if (!email || !reset_code)
    return res.status(400).json({ message: "Bad request" });

  try {
    var user = await User.findOne({ where: { email } });
    var match = await user.compare(reset_code, true);

    switch (step) {
      case "1":
        if (match) {
          return res.status(200).json({ message: "Code accepted", ok: true });
        } else {
          return res.status(400).json({ message: "Code denied" });
        }
      case "2":
        if (match) {
          if (!password){
            return res.status(400).json({ message: "Bad request" });
          }

          let updateRes = await user.update({ password, reset_code: null });
          if (updateRes) {
            return res
              .status(200)
              .json({ message: "Password changed successfully", ok: true });
          }
        } else {
          return res.status(400).json({ message: "Bad request" });
        }
      default:
        return res.status(400).json({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getEmpresaByUserId,
  updateUser,
  deleteUser,
  getImageProfile,
  passwordReset,
  resetVerificaction,
};
