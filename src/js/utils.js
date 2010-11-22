String.prototype.contains = function(str) {
  return this.toUpperCase().indexOf(str.toUpperCase()) != -1;
};

Array.prototype.unique = function() {
  var res = [];
  var len = this.length;
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (this[i] === this[j])
        j = ++i;
    }
    res.push(this[i]);
  }
  return res;
};

Array.prototype.contains = function(what) {
  return $.inArray(what, this) != -1;
};