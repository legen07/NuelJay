function toggleHamburger(){let e=$("header li.js").html();window.innerWidth<870&&!$("header nav.js")[0]?($("header nav, .book-a-session").addClass("js"),!$("header > li")[0]&&$("header nav").before(`<li> ${e} </li>`),!$("header .hamburger")[0]&&$("header .book-dark .book-a-session").after('<button class="hamburger"> <svg icon="menu-2"></svg></button>'),$("header.js")[0]&&openHamburger(d=$("header .hamburger"))):window.innerWidth>870&&($("header nav, header .book-a-session").removeClass("js"),$("header > li, .hamburger").remove()),setIcons()}function openHamburger(e){"button"!==e.tagName&&(e=$(e).closest("button")),$(e).toggleClass("js"),$("header").toggleClass("js"),$(".book-dark").toggleClass("js"),$("header.js")[0]?($(".book-dark").after($("header nav").removeClass("js")),$("header").css("height",1.5*$("header")[0].scrollHeight)):($(".head-logo").after($("header nav").addClass("js")),$("header").css("height",""))}document.querySelectorAll("*").forEach(((e,a)=>{e.getAnimations()>0&&(e.style.animationPlayState="paused")})),window.onload=document.querySelectorAll("*").forEach(((e,a)=>{e.getAnimations()>0&&(e.style.animationPlayState="running")})),document.onload=$("body").addClass("js"),$("header nav li").each(((e,a)=>{a=$(a),window.location.pathname.includes(a.text().toLowerCase().trim())?a.addClass("js"):a.removeClass("js")})),!$("header nav li.js")[0]&&$($("header nav li")[0]).addClass("js"),toggleHamburger(),$(window).on("resize",toggleHamburger);let g,modal,headScrolled=!1;function openContact(e){g=g||e.closest(".book-contact").find(".js"),g.find("input").val().length<1&&g.removeClass("js"),g?.find("input").val().length>1&&g.addClass("has-value"),e.addClass("js"),g=e}$(".container").on("scroll",(e=>{$("header")[0].getBoundingClientRect().y<10?($("header").addClass("scrolled"),!headScrolled&&$(".profile")[0].getBoundingClientRect().bottom<100&&($("header .head-logo").append('<a class="btt"><img src="opt-images/gallery/manuel_himself.webp"><svg icon="chevron-up"></a>'),$("header .head-logo > img").addClass("js"),headScrolled=!0,setIcons())):$("header")[0].getBoundingClientRect().y>10&&$("header").removeClass("scrolled"),headScrolled&&$(".profile")[0].getBoundingClientRect().bottom>99&&($("header .head-logo a").remove(),$("header .head-logo > img").removeClass("js"),headScrolled=!1)}));export function addToSelector(e){e.closest(".event-select").find("span").text(e.text()),e.closest(".event-select").find("li.js").removeClass("js"),e.addClass("js");const a=$(`<img src="opt-images/stock/services_${e.text().toLowerCase()}.webp" width="80">`);modCloser(e.closest("[modal]").find(".close")[0]),a[0].naturalHeight>1?$(".first-col img").replaceWith(a):$(".first-col img").replaceWith('<img src="opt-images/stock/services_studio.webp" width="80">')}function addToDate(e){e.closest(".event-select").find("span").text(e.text()),e.closest(".event-select").find("li.js").removeClass("js"),e.addClass("js"),modCloser(e.closest("[modal]").find(".close")[0])}function backToTop(){$(".container")[0].scrollTo({top:0,behavior:"smooth"})}function modOpener(e){$("header.js")[0]&&openHamburger($(".hamburger.js")),modal=e.getAttribute("modal"),$(`[close="${modal}"]`).addClass("js"),$(`#${modal}`)[0].classList.add("js")}export function modCloser(e){modal=e.getAttribute("close"),$(`#${modal}`)[0]?.classList.remove("js"),$(e).removeClass("js")}document.addEventListener("click",(function(e){let a=e.target;"path"===a.tagName&&(a=$(a).parent("svg")[0]),"svg"===a.tagName&&$(a).parent("button")[0]&&(a=$(a).parent("button")[0]),"svg"===a.tagName&&$(a).parent("label")[0]&&(a=$(a).parent("label")[0]);let s=$(a);$(s);switch(!0){case!a:break;case a.hasAttribute(["modal"]):modOpener(a);break;case a.classList.contains("close"):modCloser(a);break;case s.hasClass("ac"):openContact(s);break;case s.hasClass("tc"):returnComment(s);break;case s.hasClass("ats"):addToSelector(s);break;case s.hasClass("atd"):addToDate(s);break;case s.hasClass("btt")||!!s.closest(".btt")[0]:backToTop();break;case a.classList.contains("hamburger"):openHamburger(a)}}));const hireHeadWidth=$(".hire-head").innerWidth();function setIcons(){function e(){let e=JSON.parse(localStorage.getItem("icons"));$("[icon]").each(((a,s)=>{let t=$(s).attr("icon"),o=$(s)[0].attributes,r='\n        <svg\n          xmlns="http://www.w3.org/2000/svg"\n          width="24"\n          height="24"\n          viewBox="0 0 24 24"\n          fill="none"\n          stroke="currentColor"\n          stroke-width="2"\n          stroke-linecap="round"\n        ></svg>';r=$(r),Array.from(o).forEach((e=>{r.attr(e.name,e.value)})),$(s).replaceWith(r),e[t].forEach((e=>{let s=`<path d="${e[1].d}"/>`;$("svg")[a].insertAdjacentHTML("afterbegin",s)}))}))}!localStorage.icons&&fetch("https://cdn.jsdelivr.net/npm/@tabler/icons@3.2.0/tabler-nodes-outline.json",{priority:"high"}).then((e=>e.json())).then((e=>localStorage.setItem("icons",JSON.stringify(e)))).then(e),localStorage.icons&&e()}$(".hire-head")[0]?.style.setProperty("--hire-head-width",`${hireHeadWidth}px`),setIcons();