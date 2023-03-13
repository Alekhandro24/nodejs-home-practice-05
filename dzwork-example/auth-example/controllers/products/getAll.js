// const { Product } = require("../../models");

// const getAll = async (req, res) => {
//   const { _id } = req.user;
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   const products = await Product.find({ owner: _id }, "", {
//     skip,
//     limit: Number(limit),
//   }).populate("owner", "_id name email");
//   console.log(products);
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       results: products,
//     },
//   });
// };
// module.exports = getAll;
const { Product } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let filter;
  favorite
    ? (filter = { owner, favorite })
    : (filter = {
        owner,
      });

  const products = await Product.find(filter, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");
  console.log(products);
  res.json({
    status: "success",
    code: 200,
    data: {
      results: products,
    },
  });
};
module.exports = getAll;
