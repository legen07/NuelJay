import { setIcons } from "./script.js";

let allOther = false;

$(window).on("load", () => {
  function fullGallery(c) {
    if (c.is(".js")) {
      c.removeClass("js");

      $("#full-gallery > *:first").unwrap();
      c.siblings("svg").removeClass("js") || false;
      return;
    }
    c.addClass("js");
    $(".recent-shots").wrapInner("<div id='full-gallery'></div>");
    // $('#gallery')[0].mozRequestFullScreen()
  }

  function gridOthers(c) {
    if (!$("#full-gallery").length) {
      fullGallery(c.siblings("svg"));
    }
    $(".all-other-overlay").addClass("js");
  }

  document.addEventListener("click", function (e) {
    let d = e.target;
    let c = $(d);
    d.tagName === "path" && (d = $(d).parent("svg")[0]);
    d.tagName === "svg" &&
      $(d).parent("button")[0] &&
      (d = $(d).parent("button")[0]);

    let clickCount = 0;

    const clickSwitch = () => {
      clickCount += 1;

      switch (true) {
        case !d:
          break;

        case c.is("[data-js-imgname]"):
          carListSelect(c);
          break;

        case c.hasClass("west"):
          carouselPlace("prev");
          break;

        case c.hasClass("east"):
          carouselPlace("next");
          break;

        case c.is(".full-gallery"):
          fullGallery(c);
          break;

        case c.is(".grid-others"):
          gridOthers(c);
          break;

        case c.is(".scroll-others"):
          scrollOthers(c);
          break;

        default:
          if (clickCount > 1) {
            break;
          }
          c = c.parent();
          clickSwitch();
      }
    };

    clickSwitch();
  });

  $(".recent-shots .recent-head").html(
    '<svg icon="layout-grid" class="grid-others"></svg> <h1 style="text-align: center; width: 100%"> My Gallery</h1><svg icon="arrows-diagonal" class="full-gallery"></svg>'
  );

  ////////////////////
  ///////// Carousel Manipulations //////////////////
  let carSpots = $(".photo-carousel > *");
  let imagesList = $(".car-assets ul");

  let j = 0;

  let proImgs = [];

  function carouselPlace(prev_next) {
    $(".all-other-photos img.js").removeClass("js");

    $("#gallery")[0].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

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

    console.log($(".all-other-photos img.js")[0].getBoundingClientRect().left);

    // $('.all-other-photos').animate({scrollLeft : $('.all-other-photos img.js')[0].getBoundingClientRect().left}, 300)
    $('.all-other-photos img.js')[0].scrollIntoView({behavior: 'smooth', block : 'center'})
  }

  /*        End or Carousel               */

  function galleryThings() {
    proImgs = [];
    $(".recent-photo").after(
      '<div class="all-other-overlay"><svg icon="chevron-left" class="scroll-others"></svg> <div class="all-other-photos"> </div> <svg icon="chevron-right" class="scroll-others"></svg></div>'
    );

    for (let i = 3; i <= 22; i++) {
      $(".all-other-photos").append(
        `<img src="opt-images/gallery/nueljay_photography_${i}.webp" data-js-imgName="nueljay_photography_${i}.webp">`
      );
    }

    let allImages = Object.values($(".all-other-photos img"));
    allImages.splice(allImages.length - 2, Infinity);

    allImages.forEach((each, i, all) => {
      proImgs.unshift($(each).attr("src").replace("opt-images/gallery/", ""));
      $(".car-assets ul").css("display", "none");
    });

    carouselPlace("next");

    allOther = true;
  }

  galleryThings();

  function carListSelect(c) {
    flipThrough(proImgs.indexOf(c.attr("data-js-imgname")));

    function flipThrough(times) {
      times == 0 && carouselPlace("prev");
      for (let i = 0; i <= times - 2; i++) {
        carouselPlace("next");
      }
    }
    c.closest(".all-other-overlay").removeClass("js");
  }

  setIcons();
});

let allOtherPosition = 0;
function scrollOthers(c) {
  const direction = c.is('[icon="chevron-left"]') ? -1 : 1;

  allOtherPosition += $(".all-other-photos").width() * 0.9 * direction;

  $(".all-other-photos").animate({ scrollLeft: allOtherPosition }, 200);

  setTimeout(looseOtherScrollChevrons, 110);
}
function looseOtherScrollChevrons() {
  if (allOtherPosition < 5) {
    console.log("scroling to yella", allOtherPosition);
    $('.scroll-others[icon="chevron-left"]').fadeOut();
  } else {
    $('.scroll-others[icon="chevron-left"]').fadeIn();
  }

  if (allOtherPosition > $(".all-other-overlay").width() - 5) {
    $('.scroll-others[icon="chevron-right"]').fadeOut();
  } else {
    $('.scroll-others[icon="chevron-right"]').fadeIn();
  }
}

const targetElement = $(".recent-shots")[0];

function setCarHeight() {
  $(".recent-shots")[0]?.style.setProperty(
    "--kwasiampanin",
    $(".recent-shots")[0]?.scrollHeight + "px"
  );
  looseOtherScrollChevrons();
}

function setAssetsHeight(height) {
  $(".recent-shots")[0]?.style.setProperty("--active-bottom", height + "px");
}

const sizeObserver = new ResizeObserver((elements) => {
  for (let entry of elements) {
    const { width, height } = entry.contentRect;

    setAssetsHeight(height);
  }
});

sizeObserver.observe($(".photo-carousel div.active")[0]);

const observer = new MutationObserver((mutationList, observer) => {
  for (let mutation of mutationList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      setCarHeight();
    }
  }
});
const observerConfig = { childList: true };

observer.observe(targetElement, observerConfig);
