/* Geolocation element */
const city = document.querySelector('.header__location');

/* Date elements */
const day = document.querySelector('.date__day');
const monthAndyear = document.querySelector('.header__date span');

/* Shore dots */
const shoreDots = document.querySelectorAll('.shore-dot');
const shoreDotWest = document.querySelector('.shore-dot--west');
const shoreDotEast = document.querySelector('.shore-dot--east');
const shoreDotSouth = document.querySelector('.shore-dot--south');
const shoreDotNorth = document.querySelector('.shore-dot--north');

/* Shore paths */
const shorePaths = document.querySelectorAll('.shore-path');
const shorePathEast = document.querySelector('.shore-path-east');
const shorePathWest = document.querySelector('.shore-path-west');
const shorePathSouth = document.querySelector('.shore-path-south');
const shorePathNorth = document.querySelector('.shore-path-north');
let shorePathSelected = document.querySelector('.shore-path--selected');

/* Shore names */
const shoreNames = document.querySelectorAll('.shore-name');
const shoreNameWest = document.querySelector('.shore-name--west');
const shoreNameEast = document.querySelector('.shore-name--east');
const shoreNameSouth = document.querySelector('.shore-name--south');
const shoreNameNorth = document.querySelector('.shore-name--north');

$(function() {
  /* Geolocation */
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   let latitude = position.coords.latitude;
  //   let longitude = position.coords.longitude;

  //   let geocoder = new google.maps.Geocoder();
  //   let latlng = new google.maps.LatLng(latitude, longitude);

  //   geocoder.geocode(
  //     {
  //       latLng: latlng,
  //     },
  //     function(results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         if (results[0]) {
  //           let c = results[0].address_components[3].long_name;
  //           city.innerHTML = c;
  //         } else {
  //           city.innerHTML = 'California';
  //         }
  //         $(city).fadeTo(500, 1);
  //       } else {
  //         alert('Sorry, your address not found');
  //       }
  //     }
  //   );
  // });

  //-------------

  let date = new Date(),
    d = String(date.getDate()).padStart(2, '0'),
    m = String(date.getMonth() + 1).padStart(2, '0'),
    y = date.getFullYear();

  day.innerHTML = d;
  monthAndyear.innerHTML = m + ' | ' + y;

  $('.header__slider').slick({
    infinite: true,
    fade: true,
    speed: 400,
    prevArrow:
      '<img class="header__slider-arrows header__arrow-left" src="img/arrow-left.svg" alt="" />',
    nextArrow:
      '<img class="header__slider-arrows header__arrow-right" src="img/arrow-right.svg" alt="" />',
    asNavFor: '.header__slider-dots',
  });

  $('.header__slider-dots').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.header__slider',
    focusOnSelect: true,
  });

  $('.header__slider-arrows')
    .delay(3000)
    .queue(function() {
      $(this)
        .css('visibility', 'visible')
        .dequeue();
    })
    .fadeTo(500, 1, 'linear');

  $('.header__slider-arrows').hover(function(e) {
    $(this).css('opacity', e.type === 'mouseenter' ? '.7' : '1');
  });

  /* ---Shore animation--- */
  $(shorePathSelected)
    .delay(3000)
    .animate(
      {
        'stroke-dashoffset': '0',
      },
      2500
    );

  /* Slide dots */
  const sliderDots = document.querySelectorAll(
    '.header__slider-dots .slick-slide'
  );

  /* Header arrows */
  const arrows = document.querySelectorAll('.header__slider-arrows');
  arrows[0].addEventListener('click', selectShore, false);
  arrows[1].addEventListener('click', selectShore, false);

  function selectShore(e) {
    e.preventDefault();
    $(shorePathSelected).stop().removeAttr('style');
    sliderDots.forEach((slide, index) => {
      if ($(slide).hasClass('slick-current')) {
        shoreDots.forEach(dot => {
          dot.classList.remove('shore-dot--selected');
        });
        shoreDots[index].classList.add('shore-dot--selected');

        shoreNames.forEach(name => {
          name.classList.remove('shore-name--selected', 'fadeIn');
        });
        shoreNames[index].classList.add('shore-name--selected');

        shorePaths.forEach(path => {
          path.classList.remove('shore-path--selected');
        });

        shorePaths[index].classList.add('shore-path--selected');
        shorePathSelected = shorePaths[index];
        $(shorePathSelected).delay(700).animate(
          {
            'stroke-dashoffset': '0',
          },
          2500
        );
      }
    });
  }
});
