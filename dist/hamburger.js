$(function () {
  $('.c-hamburger').on('click', function () {
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.c-hamburger__bar,.l-Nav,.p-navigation a').addClass('active');
    } else {
      $('.c-hamburger__bar,.l-Nav,.p-navigation a').removeClass('active');
    }
  });
});
