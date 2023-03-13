// //version 1 LIGHT-VERSION
// const { Conflict } = require("http-errors");
// const { User } = require("../../models");
// const bcrypt = require("bcryptjs");

// const register = async (req, res) => {
//   const { name, email, password, subscription } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Conflict(`User with ${email} already existt`);
//   }
//   const hushPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//   const result = await User.create({ name, email, password: hushPassword,subscription });
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: {
//       user: {
//         email,
//         name,
//         subscription: result.subscription // subscription
//       },
//     },
//   });
// };

// module.exports = register;

//version 2 HARD-VERSION більш незалажна версія
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already existt`);
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ name, email, subscription, avatarURL });
  /* 
  newUser = {
  name,
  email,
  subscription,
  setPassword(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  }
  */
  newUser.setPassword(password);
  /* 
  newUser = {
  name,
  email,
  subscription,
  password,
  setPassword(password){
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }
  }
  */
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        subcription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
