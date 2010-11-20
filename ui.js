$(document).ready(
    function() {
      $("#search").autocomplete(GLOBAL_POPULAR);
      $("#categories_label").hide();
      $("#result_label").hide();
    });

function cleanupCategories() {
  $("#categories").children().remove();
}

function cleanupResults() {
  $("#result").children().remove();
  $("#result_label").before().hide();
}

function cleanupSearchInput() {
  $("#search").val("");
}

function hideFoundedItems() {
  $(".toggle_container").hide();
}

function toggleFoundedItems() {
  $("li.trigger").click(function() {
    $(this).toggleClass("active").next().slideToggle("fast");
  });
}

$(function() {
  $("#search").keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    var value = $("#search").val();
    if (code == 13 && value.length > 0) {
      cleanupResults();
      cleanupCategories();
      searchCategories(value);
    }
  });
});