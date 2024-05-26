document.querySelectorAll("*").forEach((element, index) => {
  element.getAnimations() > 0 && (element.style.animationPlayState = "paused");
});

window.onload = document.querySelectorAll("*").forEach((element, index) => {
  element.getAnimations() > 0 && (element.style.animationPlayState = "running");
});

document.onload = $("body").addClass("js");
$(window).on('reload', function () {
  $('body').removeClass('js')
})

$("header nav li").each((i, each) => {
  each = $(each);

  window.location.pathname.includes(each.text().toLowerCase().trim())
    ? each.addClass("js")
    : each.removeClass("js");
});

!$("header nav li.js")[0] && $($("header nav li")[0]).addClass("js");

toggleHamburger();

function toggleHamburger() {
  let activePage = $("header li.js").html();

  if (window.innerWidth < 870 && !$("header nav.js")[0]) {
    $("header nav, .book-a-session").addClass("js");
    !$("header > li")[0] && $("header nav").before(`<li> ${activePage} </li>`);
    !$("header .hamburger")[0] &&
      $("header .book-dark .book-a-session").after(
        '<button class="hamburger"> <svg icon="menu-2"></svg></button>'
      );

    $("header.js")[0] && openHamburger((d = $("header .hamburger")));
  } else if (window.innerWidth > 870) {
    $("header nav, header .book-a-session").removeClass("js");
    $("header > li, .hamburger").remove();
  }

  setIcons();
}

$(window).on("resize", toggleHamburger);

function openHamburger(d) {
  d.tagName !== "button" && (d = $(d).closest("button"));
  $(d).toggleClass("js");

  $("header").toggleClass("js");
  $(".book-dark").toggleClass("js");

  if ($("header.js")[0]) {
    $(".book-dark").after($("header nav").removeClass("js"));
    $("header").css("height", $("header")[0].scrollHeight * 1.5);
  } else {
    $(".head-logo").after($("header nav").addClass("js"));
    $("header").css("height", "");
  }
}

let headScrolled = false;

$('.container').on("scroll", (e) => {

  if ($('header')[0].getBoundingClientRect().y < 10) {
    $("header").addClass("scrolled");

    if (!headScrolled && $('.profile')[0].getBoundingClientRect().bottom < 100) {
      $("header .head-logo").append(`<a class="btt"><img src="opt-images/gallery/manuel_himself.webp"><svg icon="chevron-up"></a>`);
      $("header .head-logo > img").addClass('js');
      headScrolled = true;
      setIcons()
    }
    
  } else if ($('header')[0].getBoundingClientRect().y > 10) {
    $("header").removeClass("scrolled");
    
  }
  if (headScrolled && $('.profile')[0].getBoundingClientRect().bottom > 99) {
    $("header .head-logo a").remove()
    $("header .head-logo > img").removeClass('js');
    headScrolled = false;
  }

});

let g;

function openContact(c) {
  g = g || c.closest(".book-contact").find(".js");

  g.find("input").val().length < 1 && g.removeClass("js");
  g?.find("input").val().length > 1 && g.addClass("has-value");

  c.addClass("js");
  g = c;
}

export function addToSelector(c) {
  c.closest(".event-select").find("span").text(c.text());
  c.closest(".event-select").find("li.js").removeClass("js");
  c.addClass("js");

  const newImage = $(
    `<img src="opt-images/stock/services_${c
      .text()
      .toLowerCase()}.webp" width="80">`
  );
  modCloser(c.closest('[modal]').find('.close')[0])
  
  newImage[0].naturalHeight > 1
  ? $(".first-col img").replaceWith(newImage)
    : $(".first-col img").replaceWith(
        `<img src="opt-images/stock/services_studio.webp" width="80">`
      );

}

function addToDate(c) {
  c.closest(".event-select").find("span").text(c.text());
  c.closest(".event-select").find("li.js").removeClass("js");
  c.addClass("js");
  modCloser(c.closest('[modal]').find('.close')[0])
}

function backToTop() {
  $('.container')[0].scrollTo({top: 0, behavior: "smooth" })
}

let modal;
function modOpener(d) {
  $('header.js')[0] && openHamburger($('.hamburger.js'));
  modal = d.getAttribute("modal");
  $(`[close="${modal}"]`).addClass("js");
  $(`#${modal}`)[0].classList.add("js");
}
export function modCloser(d) {
  modal = d.getAttribute("close");
  $(`#${modal}`)[0]?.classList.remove("js");
  $(d).removeClass("js");
}

document.addEventListener("click", function (e) {
  let d = e.target;
  d.tagName === "path" && (d = $(d).parent("svg")[0]);
  d.tagName === "svg" &&
    $(d).parent("button")[0] &&
    (d = $(d).parent("button")[0]);

  d.tagName === "svg" &&
    $(d).parent("label")[0] &&
    (d = $(d).parent("label")[0]);

  let c = $(d);

  let b = $(c);

  switch (true) {
    case !d:
      break;

    case d.hasAttribute(["modal"]):
      modOpener(d);
      break;

    case d.classList.contains("close"):
      modCloser(d);
      break;

    case c.hasClass("ac"):
      openContact(c);
      break;

    case c.hasClass("tc"):
      returnComment(c);
      break;

    case c.hasClass("ats"):
      addToSelector(c);
      break;
    case c.hasClass("atd"):
      addToDate(c);
      break;

    case c.hasClass('btt') || !!c.closest('.btt')[0]:
      backToTop();
      break;

    case d.classList.contains("hamburger"):
      openHamburger(d);
      break;

    default:
      break;
  }
});

const hireHeadWidth = $(".hire-head").innerWidth();
$(".hire-head")[0]?.style.setProperty(
  "--hire-head-width",
  `${hireHeadWidth}px`
);

/////////////////////////////////////////////
////  ICONS MANIPULATIONS
function setIcons() {
  !localStorage.icons &&
    fetch(
      "https://cdn.jsdelivr.net/npm/@tabler/icons@3.2.0/tabler-nodes-outline.json",
      { priority: "high" }
    )
      .then((outJsonUrl) => outJsonUrl.json())
      .then((outJsonUrl) =>
        localStorage.setItem("icons", JSON.stringify(outJsonUrl))
      )
      .then(doIt);

  function doIt() {
    let allIconsObject = JSON.parse(localStorage.getItem("icons"));
    $("[icon]").each((i, ele) => {
      let svgName = $(ele).attr("icon");

      let svgAttrs = $(ele)[0].attributes;
      let svgHeader = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        ></svg>`;

      svgHeader = $(svgHeader);
      Array.from(svgAttrs).forEach((each) => {
        svgHeader.attr(each.name, each.value);
      });
      $(ele).replaceWith(svgHeader);

      allIconsObject[svgName].forEach((each) => {
        let path = `<path d="${each[1].d}"/>`;
        $("svg")[i].insertAdjacentHTML("afterbegin", path);
      });
    });
  }

  !!localStorage.icons && doIt();
}
setIcons();
/* ...........................................*/
