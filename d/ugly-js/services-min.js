import{addToSelector}from"./script-min.js";import{modCloser}from"./script.js";$(window).on("load",(function(){function e(e){let t=$(".review").width(),s=$(".reviews").scrollLeft();console.log(t,s),$(".reviews")[0].scrollTo({left:s+("left"===e?-t:t),behavior:"smooth"})}document.addEventListener("click",(t=>{let s=t.target;"path"===s.tagName&&(s=$(s).parent("svg")[0]);let o=$(s);switch(!0){case o.hasClass("y-bso"):retractBookSelector();break;case o.hasClass("bts"):!function(e){e=$(`#book-selector .${e.find("img").attr("alt")||e.attr("alt")}`),addToSelector(e)}(o);break;case o.hasClass("east"):e("left");break;case o.hasClass("west"):e("right")}}))}));