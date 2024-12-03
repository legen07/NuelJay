document.querySelectorAll("*").forEach((element, index) => {
  element.getAnimations() > 0 && (element.style.animationPlayState = "paused");
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// ! ICONS MANIPULATIONS

!localStorage.icons &&
  fetch(
    "https://cdn.jsdelivr.net/npm/@tabler/icons@3.11.0/tabler-nodes-outline.json",
    { priority: "high" }
  )
    .then((outJsonUrl) => outJsonUrl.json())
    .then((outJsonUrl) =>
      localStorage.setItem("icons", JSON.stringify(outJsonUrl))
    )
    .then(setIcons);

export function setIcons() {
  let allIconsObject = JSON.parse(localStorage.getItem("icons"));
  console.log(allIconsObject, localStorage.getItem("icons"));

  $("[icon]").each((i, each) => {
    if (!$(each).find("path")[0]) {
      console.log(each)
      let notYetSvg = $(each);
      
      let svgName = notYetSvg.attr("icon");

      notYetSvg.attr({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
      });

      allIconsObject[svgName].forEach((each) => {

        notYetSvg[0].insertAdjacentHTML("afterbegin", `<path d="${each[1].d}" />`);
      });
    } else {
      return;
    }
  })
}

!!localStorage.icons && setIcons();

window.onload = document.querySelectorAll("*").forEach((element, index) => {
  element.getAnimations() > 0 && (element.style.animationPlayState = "running");
});

document.onload = $("body").addClass("js");
$(window).on("reload", function () {
  $("body").removeClass("js");
});

$("header nav li").each((i, each) => {
  each = $(each);

  window.location.pathname.includes(each.text().toLowerCase().trim())
    ? each.addClass("js")
    : each.removeClass("js");
});

!$("header nav li.js")[0] && $($("header nav li")[0]).addClass("js");

toggleHamburger();

function toggleHamburger() {
  console.log("This is the hamburger function.")

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
  console.log("This is open hamburger")

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

$(".container").on("scroll", (e) => {
  if ($("header")[0].getBoundingClientRect().y < 10) {
    $("header").addClass("scrolled");

    if (
      !headScrolled &&
      $(".profile")[0].getBoundingClientRect().bottom < 100
    ) {
      $("header .head-logo").append(
        `<a class="btt"><img src="opt-images/gallery/manuel_himself.webp"><svg icon="chevron-up"></a>`
      );
      $("header .head-logo > img").addClass("js");
      headScrolled = true;
      setIcons();
    }
  } else if ($("header")[0].getBoundingClientRect().y > 10) {
    $("header").removeClass("scrolled");
  }
  if (headScrolled && $(".profile")[0].getBoundingClientRect().bottom > 99) {
    $("header .head-logo a").remove();
    $("header .head-logo > img").removeClass("js");
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
  modCloser(c.closest("[modal]").find(".close")[0]);

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
  modCloser(c.closest("[modal]").find(".close")[0]);
}

function backToTop() {
  $(".container")[0].scrollTo({ top: 0, behavior: "smooth" });
}

function bookThisService(c) {
  c = $(`#book-selector .${c.find("img").attr("alt") || c.attr("alt")}`);
  addToSelector(c);
}
function toggleForm(c) {
  let objName = c.attr("modal") || c.attr("close");
  if (c.attr("modal")) {
    c.attr("close", objName);
    c.removeAttr("modal");
  } else {
    c.attr("modal", objName);
    c.removeAttr("close");
  }
}

const bookSession = () => {};

//////////////////////////////////////////////
// Auto modal open and close
let modal;
function modOpener(c) {
  modal = c.attr("modal");
  $(`[close="${modal}"]`).addClass("js");
  $(`#${modal}`)[0].classList.add("js");

  // Same element to toggle if modal also has dp at attribute  property.

  if (c.is("[dp]")) {
    toggleForm(c);
  }

  const modFunc = /^(\b\w+\b).*(\b\w+\b)/m.exec(modal);
  let funcName = !!modFunc[1]
    ? modFunc[1] + modFunc[2][0].toUpperCase() + modFunc[2].slice(1)
    : modal;
  try {
    eval(funcName + "(modal, c)");
  } catch {}
}
function modCloser(c) {
  modal = c.attr("close");
  $(`#${modal}`)[0]?.classList.remove("js");
  c.removeClass("js");

  if (c.is("[dp]")) {
    toggleForm(c);
  }
}

/////////////////////////////////////////
//// UNIVERSAL DOCUMENT EVENT lISTENER //
document.addEventListener("click", (e) => {
  let d = e.target;
  d.tagName === "path" && (d = $(d).parent("svg")[0]);
  d.tagName === "svg" &&
    $(d).parent("button")[0] &&
    (d = $(d).parent("button")[0]);

  d.tagName === "svg" &&
    $(d).parent("label")[0] &&
    (d = $(d).parent("label")[0]);

  let c = $(d);
  let clickCount = 0;

  const clickSwitch = () => {
    clickCount += 1;
    switch (true) {
      case c.is("[modal]"):
        modOpener(c);
        break;

      case c.is("[close]"):
        modCloser(c);
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

      case c.hasClass("btt") || !!c.closest(".btt")[0]:
        backToTop();
        break;

      case c.hasClass("bts"):
        bookThisService(c);
        break;

      case d.classList.contains("hamburger"):
        openHamburger(d);
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

const hireHeadWidth = $(".hire-head").innerWidth();
$(".hire-head")[0]?.style.setProperty(
  "--hire-head-width",
  `${hireHeadWidth}px`
);
