import { ascImages } from "./script.js";

function scrollReview(param) {
  let reviewWidth = $(".review").width();
  let reviewLeft = $(".reviews").scrollLeft();

  $(".reviews")[0].scrollTo({
    left: reviewLeft + (param === "left" ? -reviewWidth : reviewWidth),
    behavior: "smooth",
  });
}

document.addEventListener("click", (e) => {
  let d = e.target;

  d.tagName === "path" && (d = $(d).parent("svg")[0]);

  let c = $(d);

  switch (!0) {
    case c.hasClass("east"):
      scrollReview("left");
      break;
    case c.hasClass("west"):
      scrollReview("right");
      break;

    default:
      console.log("got to the default");
      break;
  }
});

setTimeout(() => {
  ascImages();
}, 2000)
