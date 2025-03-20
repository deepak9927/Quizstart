exports.getCategories = async (req, res) => {
  const categories = ["Geography", "Science", "History", "Technology", "Math"];
  res.json(categories);
};