const {BadRequest} = require('@feathersjs/errors');

module.exports = function() {
  return context => {
    const {data} = context;

    // TODO: Validate email

    if (!data.email || !data.password || !data.rePassword) {
      throw new BadRequest('Please complete form!');
    }

    if (data.password !== data.rePassword) {
      throw new BadRequest('Password does not match!');
    }

    context.data = {
      email: data.email,
      password: data.password,
    };

    return context;
  };
};
