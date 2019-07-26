$(function () {
  $('a[href^="#"]').click(function () {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - 70;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    $('.c-hamburger').toggleClass('active');
    if ($('.c-hamburger').hasClass('active')) {
      $('.c-hamburger__bar,.l-Nav,.p-navigation a').addClass('active');
    } else {
      $('.c-hamburger__bar,.l-Nav,.p-navigation a').removeClass('active');
    }
    return false;
  });
});
