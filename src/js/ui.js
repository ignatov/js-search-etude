$(document).ready(
    function() {
      $("#search").autocomplete(POPULAR_REQUESTS);
      $("#categories_label").hide();
      $("#result_label").hide();
    });

$(function() {
  $("#search").keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var value = $("#search").val();
    if (code == 13 && value.length > 0) {
      cleanupResults();
      cleanupCategories();
      showCategoriesSearchResult(value);
    }
  });
});

function cleanupSearchInput() {
  $("#search").val("");
}

function cleanupCategories() {
  $("#categories").children().remove();
}

function cleanupResults() {
  $("#result").children().remove();
  $("#result_label").before().hide();
}

function addTogglingToSearchResults() {
  $(".toggle_container").hide();
  $("li.trigger").click(function() {
    $(this).toggleClass("active").next().slideToggle("fast");
  });
}

function selectedCategories() {
  var selectedCategories = new Array();

  $('input:checked').each(function() {
    selectedCategories.push($(this).val());
  });

  return selectedCategories;
}

function showCategoriesSearchResult(value) {
  var searchResult = search(value);
  var possibleCategories = searchResult.possibleCategories;
  var advertisements = searchResult.advertisements;

  $.each(possibleCategories, function(_, key) {
    var name = CATEGORIES[key];
    var checkbox = '<li><input type="checkbox" id="' + key + '" value="' + key + '" /><label for="' + key + '"> ' + name + '</label></li>';
    $("#categories").append($(checkbox));
  });

  if (possibleCategories.length > 0) {
    $("#categories_label").show();
    var button = '<button id="filter">Filter</button>';
    $("#categories").append($(button));

    $("#filter").click(function () {
      cleanupResults();
      showSearchResults(advertisements, selectedCategories());
      addTogglingToSearchResults();
    });
  } else {
    $("#categories_label").hide();
  }
}

function showSearchResults(advertisements, selectedCategories) {
  var searchResults = filterAdvertisements(advertisements, selectedCategories);

  $.each(searchResults, function(intIndex, objValue) {
    $("#result")
        .append($("<li class='trigger'>" + "<span>" + objValue.content + "</span>" + "</li>"))
        .append(
        $("<div class='toggle_container' />")
            .append("<strong>Who: </strong>").append(objValue.author).append("<br />")
            .append("<strong>Phone: </strong>").append(objValue.phone).append("<br />")
            .append("<strong>Content: </strong>").append(objValue.content).append("<br />")
        );
  });

  if (searchResults.length > 0) {
    $("#result_label").show();
  } else {
    $("#result_label").hide();
  }
}