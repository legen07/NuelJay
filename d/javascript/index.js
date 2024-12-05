import { ascImages } from "./script.js";

document.addEventListener("click", function (e) {
  let d = e.target;
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

    case d.classList.contains("west"):
      carouselPlace("next");
      break;

    case d.classList.contains("east"):
      carouselPlace("prev");
      break;

    default:
      if (clickCount > 1) {
        break;
      }
      d = $(d).parent()[0];
      clickSwitch();
    }
  };

  clickSwitch();
});

//! /////////////////////////
//! ///Carousel Manipulations
let carSpots = $(".photo-carousel > *");
let imagesList = $(".car-assets ul");

let j = 0;

let proImgs = [
  "nueljay_photography_10_lri.webp",
  "nueljay_photography_11_lri.webp",
  "nueljay_photography_13_lri.webp",
  "nueljay_photography_20_lri.webp",
  "nueljay_photography_16_lri.webp",
];

function carouselPlace(prev_next) {

  /*$(".photo-carousel div.active")[0].scrollIntoView({
    behavior: "smooth",
    block: "center",
  });*/


  let poppedImg = prev_next === "next" ? proImgs.shift() : proImgs.pop();
  prev_next === "next" ? proImgs.push(poppedImg) : proImgs.unshift(poppedImg); /// This is the core of the Code.

  let slicedImgs = proImgs.slice(0, 3);
  for (let i = 0; i < 3; i++) {
    carSpots[
      i
    ].innerHTML = `<img src="opt-images/gallery/${slicedImgs[i]}" width="300">`;
    carSpots[i].firstElementChild.classList.toggle("js");
  }
  $($(".car-assets ul li")[j]).removeClass("active");
  if (j == 0 && prev_next === "prev") {
    j = proImgs.length;
  }
  j =
    (prev_next === "prev" ? j - 1 : j + 1) %
    (prev_next === "prev" ? -proImgs.length : proImgs.length);
  $(".car-assets ul li")[j].classList.add("active");

  ascImages()
}
for (let k = 0; k < proImgs.length; k++) {
  let li = document.createElement("li");
  li.className = k;
  imagesList.append(li);
}
$(".car-assets ul > *")[j].classList.add("active");
carouselPlace("prev");
/*    End or Carousel            */

const targetElement = $(".recent-photo .active")[0];

function setCarHeight(height) {
  $(".recent-shots")[0]?.style.setProperty(
    "--kwasiampanin",
    `${height * 1.4}px`
  );

  $(".car-assets")[0]?.style.setProperty(
    "--active-bottom",
    $(".photo-carousel div.active").height() + "px"
  );
}

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    setCarHeight(height);
  }
});

resizeObserver.observe(targetElement);
