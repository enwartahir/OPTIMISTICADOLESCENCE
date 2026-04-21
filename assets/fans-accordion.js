$(document).on("click", ".acc_ctrl", function (e) {
  e.preventDefault();
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(this).next().stop().slideUp(300);
  } else {
    $(".acc_ctrl").removeClass("active");
    $(".acc_ctrl").next().stop().slideUp(300);
    $(this).addClass("active");
    $(this).next().stop().slideDown(300);
  }
});