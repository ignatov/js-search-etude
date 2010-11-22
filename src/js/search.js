function search(value) {
  var advertisements = $.grep(CATALOGUE, function(adv) { // TODO: extract criteria
    return adv.content.contains(value);
  });

  var categories = $.map(advertisements, function(adv) {
    return adv.category;
  }).unique();
  
  var result = new Object();
  result.advertisements = advertisements;
  result.possibleCategories = categories;
  return result;
}

function filterAdvertisements(advertisements, selectedCategories) {
  return $.grep(advertisements, function(adv) {
    return selectedCategories.contains(adv.category);
  });
}