document.addEventListener("click",(function(e){let s=e.target;switch("path"===s.tagName&&(s=$(s).parent("svg")[0]),"svg"===s.tagName&&$(s).parent("button")[0]&&(s=$(s).parent("button")[0]),!0){case!s:break;case s.classList.contains("west"):carouselPlace("next");break;case s.classList.contains("east"):carouselPlace("prev")}}));let carSpots=$(".photo-carousel > *"),imagesList=$(".car-assets ul"),j=0,proImgs=["nueljay_photography_10.webp","nueljay_photography_11.webp","nueljay_photography_13.webp","nueljay_photography_20.webp","nueljay_photography_16.webp"];function carouselPlace(e){let s="next"===e?proImgs.shift():proImgs.pop();"next"===e?proImgs.push(s):proImgs.unshift(s);let t=proImgs.slice(0,3);for(let e=0;e<3;e++)carSpots[e].innerHTML=`<img src="opt-images/gallery/${t[e]}">`,carSpots[e].firstElementChild.classList.toggle("js");$($(".car-assets ul li")[j]).removeClass("active"),0==j&&"prev"===e&&(j=proImgs.length),j=("prev"===e?j-1:j+1)%("prev"===e?-proImgs.length:proImgs.length),$(".car-assets ul li")[j].classList.add("active")}for(let e=0;e<proImgs.length;e++){let s=document.createElement("li");s.className=e,imagesList.append(s)}$(".car-assets ul > *")[j].classList.add("active"),carouselPlace("prev");