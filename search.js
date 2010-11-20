function searchCategories(value) {
  var filtered = jQuery.grep(GLOBAL_CATALOG, function(n) {
    return n.content.contains(value);
  });

  var possibleCategories = jQuery.map(filtered, function(n) {
    return n.category;
  }).unique();

  $.each(possibleCategories, function(_, objValue) {
    var name = GLOBAL_CATEGORIES[objValue];
    var html = '<li><input type="checkbox" id="' + objValue + '" value="' + objValue + '" /><label for="' + objValue + '"> ' + name + '</label></li>';
    $("#categories").append($(html));
  });

  if (possibleCategories.length > 0) {
    $("#categories_label").show();
    var html = '<button id="filter">Filter</button>';
    $("#categories").append($(html));

    $("#filter").click(function () {
      cleanupResults();

      selectedCategories = new Array();

      $('input:checked').each(function() {
        selectedCategories.push($(this).val());
      });

      if (search(value, selectedCategories).length <= 0) {
        $("#result_label").hide();
      }

      hideFoundedItems();
      toggleFoundedItems();
    });
  } else {
    $("#categories_label").hide();
  }
}

function search(value, categs) {
  var filtered = jQuery.grep(GLOBAL_CATALOG, function(n) {
    var contains = n.content.contains(value);
    var isCategoryInNeeded = $.inArray(n.category, categs) != -1;
    return contains && isCategoryInNeeded;
  });

  $.each(filtered, function(intIndex, objValue) {
    $("#result")
        .append($("<li class='trigger'>" + "<span>" + objValue.content + "</span>" + "</li>"))
        .append(
        $("<div class='toggle_container' />")
            .append("<strong>Who: </strong>").append(objValue.author).append("<br />")
            .append("<strong>Phone: </strong>").append(objValue.phone).append("<br />")
            .append("<strong>Content: </strong>").append(objValue.content).append("<br />")
        );
  });

  $("#result_label").show();
  return filtered;
}