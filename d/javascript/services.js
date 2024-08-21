import { addToSelector } from "./script-min.js";

$(window).on("load", function () {
  /*$('.QnA .a').each( (i, each) => {
    $(each).next().text($(each).text());
    $(each).html('<a class="tc">...</a>');
  })*/

  function returnComment(c) {
    c.text() === "..." ? c.text(c.parent().next().text()) : c.text("...");
  }


  function scrollReview(param) {
    let reviewWidth = $(".review").width();
    let reviewLeft = $(".reviews").scrollLeft();
    console.log(reviewWidth, reviewLeft)

    $(".reviews")[0].scrollTo({
      left:
        reviewLeft + (param === "left"
          ? -reviewWidth
          : reviewWidth),
      behavior: "smooth",
    });
  }

  document.addEventListener("click", (e) => {
    let d = e.target;

    d.tagName === "path" && (d = $(d).parent("svg")[0]);

    let c = $(d);

    switch (!0) {
      case !1:
        break;

      case c.hasClass("y-bso"):
        retractBookSelector();
        break;

      case c.hasClass("east"):
        scrollReview("left");
        break;
      case c.hasClass("west"):
        scrollReview("right");
        break;

      default:
        break;
    }
  });
});
