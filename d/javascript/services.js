$(window).on('load', function () {
  /*$('.QnA .a').each( (i, each) => {
    $(each).next().text($(each).text());
    $(each).html('<a class="tc">...</a>');
  })*/

  function returnComment(c) {

    c.text() === '...' ? c.text(c.parent().next().text()) : c.text('...');
  }


  document.addEventListener('click', e => {

    let d = e.target;
    
    d.tagName === "path" && (d = $(d).parent("svg")[0]);

    
    let c = $(d);

    switch (!0) {
      case !1:
       break;

      case c.hasClass('y-bso'):
        retractBookSelector();
        break;
      
      default:
        break;
    }
  })
  
})