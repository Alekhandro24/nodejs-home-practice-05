const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const { User } = require("../../models");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  //   if (!user) {
  //     throw new Unauthorized(`Email ${email} not found`);
  //   }
  //   const passwordCompare = bcrypt.compareSync(password, user.password);
  //   if (!passwordCompare) {
  //     throw new Unauthorized("Password wrong");
  //   }
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
