module.exports = {
  getValue: function(val) {
    if (typeof val === 'function') {
      return val();
    } else {
      return val;
    }
  }
};
