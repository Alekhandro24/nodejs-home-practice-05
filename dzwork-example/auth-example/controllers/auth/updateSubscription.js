const { User } = require("../../models/user");
// const { requestError } = require("../../utils");
const { NotFound } = require("http-errors");

async function updateUserSubscription(userId, body) {
  return await User.findByIdAndUpdate(userId, body, { new: true });
}

const updateSubscription = async (req, res) => {
  const { _id: id } = req.user;

  const result = await updateUserSubscription(id, req.body);
  if (!result) {
    throw new NotFound(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateSubscription;
