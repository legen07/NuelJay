document.querySelectorAll("*").forEach((element, index) => {
  element.getAnimations() > 0 && (element.style.animationPlayState = "paused");
});

$(window).on("load", function () {
  document.querySelectorAll("*").forEach((element, index) => {
    element.getAnimations() > 0 &&
      (element.style.animationPlayState = "running");
  });

  toggleHamburger();

  function toggleHamburger() {
    let activePage = $("header li.js").html();

    if (window.innerWidth < 870 && !$("header nav.js")[0]) {
      $("header nav, .book-a-session").addClass('js');
      !$('header > li')[0] && $("header nav").before(`<li> ${activePage} </li>`);
      !$('header .hamburger')[0] && $("header .book-dark .book-a-session").after(
        '<button class="hamburger"> <svg icon="menu-2"></svg></button>'
      );

      $('header.js')[0] && openHamburger(d = $('header .hamburger')) /*$('.head-logo').after($('header nav'))*/;

    } else if (window.innerWidth > 870) {
      $("header nav, header .book-a-session").removeClass("js");
      $("header > li, .hamburger").remove();
    }

    setIcons()
  }

  $(window).on("resize", toggleHamburger);



  function openHamburger(d) {
    d.tagName !== 'button' && (d = $(d).closest('button'))
    $(d).toggleClass('js');
    
    $('header').toggleClass('js');
    $('.book-dark').toggleClass('js')
    
    if ($('header.js')[0]) {
      $('.book-dark').after($('header nav').removeClass('js'));
      $('header').css('height', ($('header')[0].scrollHeight * 1.5))
    } else {
      $('.head-logo').after($('header nav').addClass('js'));
      $('header').css('height', '')
      // $('header > li').remove();
    }
    
  }


  document.addEventListener('click', function(e) {
    let d = e.target;
    d.tagName === "path" && (d = $(d).parent("svg")[0]);
    (d.tagName === "svg" && $(d).parent("button")[0]) && (d = $(d).parent("button")[0]);

    switch (true) {

      case !d:
        break;

      case d.classList.contains('hamburger'):
        openHamburger(d);
        break;

      default : 
        break;
    }

  })

const hireHeadWidth = $('.hire-head').innerWidth();
$('.hire-head')[0]?.style.setProperty('--hire-head-width', `${hireHeadWidth}px`)


/////////////////////////////////////////////
////  ICONS MANIPULATIONS
  function setIcons() {
    !localStorage.icons &&
      fetch(
        "https://cdn.jsdelivr.net/npm/@tabler/icons@3.2.0/tabler-nodes-outline.json"
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
            stroke-linejoin="round"
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

    doIt()
  }
  setIcons();
  /* ...........................................*/

  
  setTimeout(() => {
    $('.recent-shots')[0]?.style.setProperty('--kwasiampanin', `${$('.recent-shots')[0]?.scrollHeight * 2.5}px`)
    
  }, 500);
});
