module.exports = function(err) {
  const errors = {};
  if (err.name === 'SequelizeValidationError') {
    err.errors.forEach(e => {
      errors[e.path] = e.message;
    });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    err.errors.forEach(e => {
      errors[e.path] = `${e.path} already exist`;
    });
  } else {
    return false;
  }
  return errors;
}