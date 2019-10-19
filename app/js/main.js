const city = document.querySelector('.header__location');

/* Date elements */
const day = document.querySelector('.date__day');
const monthAndyear = document.querySelector('.header__date span');

$(function() {
  ipLookUp();

  let date = new Date(),
      d = String(date.getDate()).padStart(2, '0'),
      m = String(date.getMonth() + 1).padStart(2, '0'),
      y = date.getFullYear();

  
  day.innerHTML = d;
  monthAndyear.innerHTML = m + ' | ' + y;

  $('.header__slider').slick({
    infinite: false,
    fade: true,
    speed: 400,
    prevArrow:
      '<img class="header__slider-arrows arrow-left" src="img/arrow-left.svg" alt="" />',
    nextArrow:
      '<img class="header__slider-arrows arrow-right" src="img/arrow-right.svg" alt="" />',
    asNavFor: '.header__slider-dots',
  });

  $('.header__slider-dots').slick({
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.header__slider',
    focusOnSelect: true,
  });

  
});

async function ipLookUp() {
  try {
    let response = await $.ajax('http://ip-api.com/json');
    city.innerHTML = response.city;

    $(city).fadeTo(500, 1);
  } catch (err) {
    console.log(err);
  }
}



