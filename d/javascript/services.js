$(window).on('load', function () {
  /*$('.QnA .a').each( (i, each) => {
    $(each).next().text($(each).text());
    $(each).html('<a class="tc">...</a>');
  })*/

  function returnComment(c) {

    c.text() === '...' ? c.text(c.parent().next().text()) : c.text('...');
  }

  let g;

  function openContact(c) {
    g = g || c.closest('.book-contact').find('.js');

    g.find('input').val().length < 1 && g.removeClass('js')
    g?.find('input').val().length > 1 && g.addClass('has-value');

    c.addClass('js');

    g = c;
  }

  function addToSelector(c) {
    c.closest('.event-select').find('span').text(c.text());

    c.closest('.event-select').find('li.js').removeClass('js');

    c.addClass('js')
  }

  
  let modal;
  function modOpener(d) {
    modal = d.getAttribute('modal')
    $(`[close="${modal}"]`).addClass('js');
    $(`#${modal}`)[0].classList.add('js')
  }
  function modCloser(d) {
    modal = d.getAttribute('close');
    $(`#${modal}`)[0]?.classList.remove('js')
    $(d).removeClass('js');
  }



  document.addEventListener('click', e => {

    let d = e.target;
    
    d.tagName === "path" && (d = $(d).parent("svg")[0]);
    d.tagName === "svg" &&
    $(d).parent("label")[0] &&
    (d = $(d).parent("label")[0]);
    
    let c = $(d);

    switch (!0) {
      case !1:
       break;

      

      case c.hasClass('ac'):
        openContact(c);
        break;

      case c.hasClass('ats'):
        addToSelector(c);
        break;

      case c.hasClass('y-bso'):
        retractBookSelector();
        break;
      
      default:
        break;
    }
  })
  
})