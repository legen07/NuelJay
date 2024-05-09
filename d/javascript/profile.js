document.addEventListener('click', function(e) {
  let d = e.target;
  d.tagName === "path" && (d = $(d).parent("svg")[0]);
  (d.tagName === "svg" && $(d).parent("button")[0]) && (d = $(d).parent("button")[0]);

  switch (true) {

    case !d:
      break;

    case d.classList.contains('west'):
      carouselPlace('next');
      break;

    case d.classList.contains('east'):
      carouselPlace('prev');
      break;

    default : 
      break;
  }
})


///////////////////////////////////////////////////
///////// Carousel Manipulations //////////////////
let carSpots = $(".photo-carousel > *");
let imagesList = $(".car-assets ul");

let j = 0;

let proImgs = ["nueljay_photography_10.jpeg", "nueljay_photography_11.jpeg", "nueljay_photography_13.jpeg", "nueljay_photography_20.jpeg", "nueljay_photography_16.jpeg"];

function carouselPlace(prev_next) {
  let poppedImg = prev_next === "next" ? proImgs.shift() : proImgs.pop();
  prev_next === "next" ? proImgs.push(poppedImg) : proImgs.unshift(poppedImg);/// This is the core of the Code.

  let slicedImgs = proImgs.slice(0, 3);
  for (let i = 0; i < 3; i++) {
    carSpots[i].innerHTML = `<img src="images/gallery/${slicedImgs[i]}">`;
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
}
for (let k = 0; k < proImgs.length; k++) {
  let li = document.createElement("li");
  li.className = k;
  imagesList.append(li);
}
$(".car-assets ul > *")[j].classList.add("active");
carouselPlace('prev');
/*        End or Carousel                                  */
// $('.recent-photo').css('height', $('.profile').height())