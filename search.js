function searchPossibleCategories(value) {
  var advertisements = $.grep(CATALOGUE, function(n) { // TODO: extract criteria
    return n.content.contains(value);
  });

  return $.map(advertisements, function(n) {
    return n.category;
  }).unique();
}

function searchEntries(value, categs) {
  return $.grep(CATALOGUE, function(n) { // TODO: extract criteria
    var contains = n.content.contains(value);
    var isCategoryInNeeded = $.inArray(n.category, categs) != -1;
    return contains && isCategoryInNeeded;
  });
}