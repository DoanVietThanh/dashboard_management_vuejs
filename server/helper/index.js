const formatedObject = (obj) => {
  return { ...obj.toJSON() };
};

module.exports = { formatedObject };
