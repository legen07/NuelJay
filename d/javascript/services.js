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
    let c = $(d);

    console.log(c.hasClass('tc'))

    switch (!0) {
      case !1:
       break;

      case c.hasClass('tc'):
        console.log('it has class tc');
        returnComment(c);
        break;
      
      default:
        break;
    }
  })
})