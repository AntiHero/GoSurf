/* Geolocation element */
const city = document.querySelector(".header__location");
/* Date elements */

const day = document.querySelector(".date__day");
const monthAndyear = document.querySelector(".header__date span");
/* Shore dots */

const shoreDots = Array.prototype.slice
  .apply(document.querySelectorAll(".shore-dot"))
  .reverse();
const shoreDotWest = document.querySelector(".shore-dot--west");
const shoreDotEast = document.querySelector(".shore-dot--east");
const shoreDotSouth = document.querySelector(".shore-dot--south");
const shoreDotNorth = document.querySelector(".shore-dot--north");
/* Shore paths */

const shorePaths = Array.prototype.slice
  .apply(document.querySelectorAll(".shore-path"))
  .reverse();
const shorePathEast = document.querySelector(".shore-path-east");
const shorePathWest = document.querySelector(".shore-path-west");
const shorePathSouth = document.querySelector(".shore-path-south");
const shorePathNorth = document.querySelector(".shore-path-north");
let shorePathSelected = document.querySelector(".shore-path--selected");
/* Shore names */

const shoreNames = Array.prototype.slice
  .apply(document.querySelectorAll(".shore-name"))
  .reverse();
const shoreNameWest = document.querySelector(".shore-name--west");
const shoreNameEast = document.querySelector(".shore-name--east");
const shoreNameSouth = document.querySelector(".shore-name--south");
const shoreNameNorth = document.querySelector(".shore-name--north");

const costPerNight = 72;
const costPerGuest = 45;
const nightsByDefault = 1;
const guestsByDefault = 1;

const surfboardShowInfoUrl = "./img/surfboard-minus.png";
const surfboardHideInfoUrl = "./img/surfboard-plus.png";

const slidesTotal = 8;

let prevIndex = 0;

const surfBoardInfoBtn = () => {
  $(".surfboard-box__circle").click(function() {
    $(this).toggleClass("surfboard-box__circle--show");

    if ($(this).hasClass("surfboard-box__circle--show")) {
      $(this)
        .find(".circle-btn")
        .css("background-image", `url(${surfboardHideInfoUrl})`);

      $(this)
        .siblings(".surfboard-box__content")
        .fadeTo(200, 1);
    } else {
      $(this)
        .find(".circle-btn")
        .css("background-image", `url(${surfboardShowInfoUrl})`);
      $(this)
        .siblings(".surfboard-box__content")
        .fadeTo(200, 0);
    }
  });
};

const changeName = el => {
  if ($(el).html() === String(1)) {
    if (
      $(el)
        .attr("class")
        .split(" ")
        .includes("nights-total")
    ) {
      $(".night").html("night");
    }

    if (
      $(el)
        .attr("class")
        .split(" ")
        .includes("guests-total")
    ) {
      $(".guest").html("guest");
    }
  } else {
    if (
      $(el)
        .attr("class")
        .split(" ")
        .includes("nights-total")
    ) {
      $(".night").html("nights");
    }

    if (
      $(el)
        .attr("class")
        .split(" ")
        .includes("guests-total")
    ) {
      $(".guest").html("guests");
    }
  }
};

const changeNum = (num, e) => {
  if (e.target.className.includes("add")) {
    if (num < 9) {
      num++;
    }
  } else {
    if (num >= 2) {
      num--;
    }
  }
  return num;
};

const countTotal = (nights, guests) => {
  return nights * costPerNight + guests * costPerGuest;
};

const calculator = () => {
  let nightsTotal = nightsByDefault;
  let guestsTotal = guestsByDefault;

  $(".total-cost").html(countTotal(nightsTotal, guestsTotal));

  $(".nights-total").html(String(nightsByDefault));
  $(".guests-total").html(String(guestsByDefault));

  changeName(".nights-total");
  changeName(".guests-total");

  $(".nights-buttons").on("click", e => {
    nightsTotal = changeNum(nightsTotal, e);

    $(".nights-total").html(String(nightsTotal));
    changeName(".nights-total");

    $(".total-cost").html(countTotal(nightsTotal, guestsTotal));
  });

  $(".guests-buttons").on("click", e => {
    guestsTotal = changeNum(guestsTotal, e);

    $(".guests-total").html(String(guestsTotal));
    changeName(".guests-total");

    $(".total-cost").html(countTotal(nightsTotal, guestsTotal));
  });
};

$(document).ready(function() {
  //const lazyImages = [].slice.call(document.querySelectorAll('.holder-slider__item-head'));
  const lazyImages = Array.from(
    document.querySelectorAll(".holder-slider__item-head")
  );

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }

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

  let date = new Date(),
    d = String(date.getDate()).padStart(2, "0"),
    m = String(date.getMonth() + 1).padStart(2, "0"),
    y = date.getFullYear();

  day.innerHTML = d;
  monthAndyear.innerHTML = m + " | " + y;
  $(".header__slider").slick({
    infinite: true,
    fade: true,
    speed: 400,
    prevArrow:
      '<img class="header__slider-arrows header__arrow-left" src="img/arrow-left.svg" alt="" />',
    nextArrow:
      '<img class="header__slider-arrows header__arrow-right" src="img/arrow-right.svg" alt="" />',
    asNavFor: ".header__slider-dots"
  });

  $(".header__slider-dots").slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: ".header__slider",
    focusOnSelect: true
  });

  $(".header__slider-arrows")
    .delay(3000)
    .queue(function() {
      $(this)
        .css("visibility", "visible")
        .dequeue();
    })
    .fadeTo(500, 1, "linear");
  $(".header__slider-arrows").hover(function(e) {
    $(this).css("opacity", e.type === "mouseenter" ? ".7" : "1");
  });

  /*--- Surf Slider ---*/

  $(".surf-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    prevArrow:
      '<img class="surf__slider-arrows surf__arrow-left" src="img/arrow-left.svg" alt="" />',
    nextArrow:
      '<img class="surf__slider-arrows surf__arrow-right" src="img/arrow-right.svg" alt="" />',
    asNavFor: ".slider-map",
    responsive: [
      {
        breakpoint: 1441,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          focusOnSelect: true
        }
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          focusOnSelect: true
        }
      },
      {
        breakpoint: 466,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  let slideWidth = $(".surf-slider .slick-slide").width();
  let surfSlides = document.querySelectorAll(".surf-slider .slick-slide");
  document.querySelector(".surf-slider").addEventListener("load", function() {
    surfSlides.forEach(function(el) {
      return el.setAttribute(
        "style",
        "width:".concat(slideWidth + 40 + "px", " !important")
      );
    });
  });
  /*-- Map Slider --*/

  $(".slider-map").slick({
    slidesToShow: 8,
    arrows: false,
    slidesToScroll: 1,
    asNavFor: ".surf-slider",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "40px",
          infinite: true
        }
      },
      {
        breakpoint: 1111,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          infinite: true
        }
      },
      {
        breakpoint: 875,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          infinite: true
        }
      }
    ]
  });
  /* ---Travel Slider--- */

  $(".holder-slider").slick({
    slidesToShow: 1,
    inifinite: true,
    fade: true,
    prevArrow:
      '<img class="holder__slider-arrows holder__arrow-left" src="img/arrow-left.svg" alt="" />',
    nextArrow:
      '<img class="holder__slider-arrows holder__arrow-right" src="img/arrow-right.svg" alt="" />'
  });

  /* ---Shore animation--- */

  $(shorePathSelected)
    .delay(3000)
    .animate(
      {
        "stroke-dashoffset": "0"
      },
      2500
    );
  /* Slide dots */

  /* Header arrows */

  let arrows = document.querySelectorAll(".header__slider-arrows");

  arrows[0].addEventListener("click", selectShore, false);
  arrows[1].addEventListener("click", selectShore, false);

  async function selectShore(e) {
    $(".header__slider-dots");
    e.preventDefault();

    let sliderDots = document.querySelectorAll(
      ".header__slider-dots .slick-slide"
    );

    if ($(e.currentTarget).attr("data-slick-index") !== String(prevIndex)) {
      await $(shorePathSelected)
        .stop()
        .finish()
        .removeAttr("style");

      sliderDots.forEach(function(slide, index) {
        if ($(slide).hasClass("slick-current")) {
          if ($(e.currentTarget).attr("data-slick-index") !== undefined) {
            prevIndex = index;
          }
          shoreDots.forEach(function(dot) {
            dot.classList.remove("shore-dot--selected");
          });

          shoreDots[index].classList.add("shore-dot--selected");
          shoreNames.forEach(function(name) {
            name.classList.remove("shore-name--selected", "fadeIn");
          });

          shoreNames[index];
          shoreNames[index].classList.add("shore-name--selected");
          shorePaths.forEach(function(path) {
            path.classList.remove("shore-path--selected");
          });

          shorePaths[index].classList.add("shore-path--selected");
          shorePathSelected = shorePaths[index];

          $(shorePathSelected)
            .delay(700)
            .animate(
              {
                "stroke-dashoffset": "0"
              },
              2500
            );
        }
      });
    }
  }

  $(".header__slider-dots .slick-slide").on("click", function(e) {
    selectShore(e);
  });

  /* Surf slider arrows */

  let arrowsSurf = document.querySelectorAll(".surf__slider-arrows");
  arrowsSurf[0].addEventListener("click", selectSurfPlace, false);
  arrowsSurf[1].addEventListener("click", selectSurfPlace, false);
  $(".surf .slick-list").on("click touchend mouseup", selectSurfPlace);
  $(".slick-current .surf-box__inner").addClass("transitioned");
  $(".slick-current .surf-box__inner-btn").addClass("transitioned");
  $(".slick-current .slider-dots__circle").addClass("transitioned");
  $(".slick-current .slider-dots__content").addClass("transitioned");
  let currentSurfBox = $(".slick-current .surf-box__inner");
  let currentSurfBoxButton = $(".slick-current .surf-box__inner-btn");
  let currentMapCircle = $(".slick-current .slider-dots__circle");
  let currentSlideContent = $(".slick-current .slider-dots__content");

  function selectSurfPlace(e) {
    e.preventDefault();
    if (!$(".slick-current .surf-box__inner").hasClass("transitioned")) {
      $(".slick-current .surf-box__inner").addClass("transitioned");
      $(".slick-current .surf-box__inner-btn").addClass("transitioned");
      $(".slick-current .slider-dots__circle").addClass("transitioned");
      $(".slick-current .slider-dots__content").addClass("transitioned");

      currentSurfBox.removeClass("transitioned");
      currentSurfBoxButton.removeClass("transitioned");
      currentMapCircle.removeClass("transitioned");
      currentSlideContent.removeClass("transitioned");
      currentMapCircle = $(".slick-current .slider-dots__circle");
      currentSurfBox = $(".slick-current .surf-box__inner");
      currentSurfBoxButton = $(".slick-current .surf-box__inner-btn");
      currentSlideContent = $(".slick-current .slider-dots__content");
    }

    if (!$(".slick-current .slider-dots__content").hasClass("transitioned")) {
      $(".slick-current .slider-dots__circle").addClass("transitioned");
      $(".slick-current .slider-dots__content").addClass("transitioned");
    }
  }

  /* Shop-slider */
  $(".shop__slider").slick({
    slidesToShow: 1,
    inifinite: true,
    fade: true,
    lazyLoad: "ondemand",
    prevArrow:
      '<img class="shop__slider-arrows shop__arrow-left" src="img/arrow-left.svg" alt="" />',
    nextArrow:
      '<img class="shop__slider-arrows shop__arrow-right" src="img/arrow-right.svg" alt="" />'
  });

  $(".menu-btn").on("click", function() {
    $(".header__aside")
      .removeClass("animated fadeInLeft delay-3s")
      .toggleClass("show");
  });

  calculator();

  surfBoardInfoBtn();

  new WOW().init();

  /* Airplane animation */
  const element_position = $(
    ".holder.holder--travel .holder-slider__item-head"
  ).offset().top;

  $(window).on("scroll", function() {
    const offset = -80;
    let y_scroll_pos = window.pageYOffset;
    let scroll_pos_test = element_position + offset;

    if (y_scroll_pos > scroll_pos_test) {
      $(window).off("scroll");
      $(".holder-slider__descr").addClass("transitioned");
    }
  });

  $(".slider-dots__content-link").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".surf-slider").slick("slickNext");
    selectSurfPlace(e);
  });

  $(".slider-item__info-link").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".header__slider").slick("slickNext");
    selectShore(e);
  });

  const currentDate = [y, m, d].join("-");
  const start = (end = currentDate);
  const params = "waveHeight,seaLevel,windSpeed";

  const shoresData = [
    //Malibu
    {
      name: "Malibu",
      lng: -118.7738,
      lat: 34.025
    },

    //Airlie
    {
      name: "Airlie",
      lng: 148.716949,
      lat: -20.2675
    },
    //CloudNine
    {
      name: "Cloud Nine",
      lng: 126.165153,
      lat: 9.813669
    },
    //VieuxBoucau
    {
      name: "Vieux Boucau",
      lng: -1.4,
      lat: 43.7833
    }
  ];

  let surfContentByName = {};

  const surfContent = Array.from($(".surf .slider-dots__content"));
  shoresData.forEach(shore => {
    surfContent.forEach(content => {
      if (
        content.children[0].children[0].children[0].innerHTML
          .toLowerCase()
          .includes(shore.name.toLowerCase())
      ) {
        surfContentByName[shore.name] =
          surfContentByName[shore.name] === undefined
            ? [content]
            : surfContentByName[shore.name].concat(content);
      }
    });
  });

  shoresData.forEach(shore => {
    $.ajax(
      `https://api.stormglass.io/v1/weather/point?lat=${shore.lat}&lng=${shore.lng}&params=${params}&start=${start}&end=${end}`,
      {
        headers: {
          Authorization:
            "28553914-3e24-11ea-acb4-0242ac130002-28553bb2-3e24-11ea-acb4-0242ac130002"
        }
      }
    ).done(function(data) {
      surfContentByName[shore.name].forEach(
        shore =>
          (shore.children[1].children[0].children[1].innerText =
            data.hours[0].waveHeight[0].value)
      );
      surfContentByName[shore.name].forEach(
        shore =>
          (shore.children[1].children[1].children[1].innerText =
            data.hours[0].seaLevel[0].value)
      );
      surfContentByName[shore.name].forEach(
        shore =>
          (shore.children[1].children[2].children[1].innerText =
            data.hours[0].windSpeed[0].value)
      );
    });
  });
});

$(window).on("load", function() {
  $(".main-loader").removeClass("main-loader--visible");
});
