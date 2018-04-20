module.exports = function() {
  return context => {
    if (!context.params.user) {
      return context;
    }

    const {name, email} = context.params.user;
    context.result.user = {name, email};

    return context;
  };
};
