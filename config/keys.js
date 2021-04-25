module.exports = {
  MongoURI:
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    process.env.ACCESS_MONGODB,
};
