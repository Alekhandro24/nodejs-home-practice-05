const { Product } = require("../../models");
const { NotFound } = require("http-errors");

async function updateStatusContact(contactId, body) {
  return await Product.findByIdAndUpdate(contactId, body, { new: true });
}

const updateFavorite = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateStatusContact(id, req.body);
  if (!result) {
    throw NotFound(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;
