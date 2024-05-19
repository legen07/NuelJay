$(window).on("load", () => {
  document.addEventListener("click", function (e) {
    let d = e.target;
    d.tagName === "path" && (d = $(d).parent("svg")[0]);
    d.tagName === "svg" &&
      $(d).parent("button")[0] &&
      (d = $(d).parent("button")[0]);

    switch (true) {
      case !d:
        break;

      case d.hasAttribute("data-js-imgname"):
        carListSelect(d);
        break;

      case d.classList.contains("west"):
        carouselPlace("next");
        break;

      case d.classList.contains("east"):
        carouselPlace("prev");
        break;

      default:
        break;
    }
  });

  ///////////////////////////////////////////////////
  ///////// Carousel Manipulations //////////////////
  let carSpots = $(".photo-carousel > *");
  let imagesList = $(".car-assets ul");

  let j = 0;

  let proImgs = [];

  function carouselPlace(prev_next) {
    $(".all-other-photos img.js").removeClass("js");

    let poppedImg = prev_next === "next" ? proImgs.shift() : proImgs.pop();
    prev_next === "next" ? proImgs.push(poppedImg) : proImgs.unshift(poppedImg); /// This is the core of the Code.

    let slicedImgs = proImgs.slice(0, 3);
    for (let i = 0; i < 3; i++) {
      carSpots[i].innerHTML = `<img src="opt-images/gallery/${slicedImgs[i]}">`;
      carSpots[i].firstElementChild.classList.toggle("js");
    }
    $($(".car-assets ul li")[j]).removeClass("active");
    if (j == 0 && prev_next === "prev") {
      j = proImgs.length;
    }
    j =
      (prev_next === "prev" ? j - 1 : j + 1) %
      (prev_next === "prev" ? -proImgs.length : proImgs.length);

    $(`.all-other-photos [data-js-imgname="${proImgs[1]}"]`).addClass("js");
  }

  /*        End or Carousel                                  */

  function galleryThings() {
    proImgs = [];
    $(".recent-photo").after('<div class="all-other-photos" >');

    for (let i = 3; i <= 22; i++) {
      $(".all-other-photos").append(
        `<img src="opt-images/gallery/nueljay_photography_${i}.webp" data-js-imgName="nueljay_photography_${i}.webp">`
      );
    }

    let allImages = Object.values($(".all-other-photos img"));
    allImages.splice(allImages.length - 2, Infinity);

    allImages.forEach((each, i, all) => {
      proImgs.unshift($(each).attr("src").replace("images/gallery/", ""));
      $(".car-assets ul").css("display", "none");
    });

    carouselPlace("next");
  }

  galleryThings();

  function carListSelect(d) {
    flipThrough(proImgs.indexOf($(d).attr("data-js-imgname")));

    function flipThrough(times) {
      times == 0 && carouselPlace("prev");
      for (let i = 0; i <= times - 2; i++) {
        carouselPlace("next");
      }
    }
  }

  $(".recent-shots .recent-head").html(
    '<h1 style="text-align: center; width: 100%"> My Gallery</h1>'
  );
});
