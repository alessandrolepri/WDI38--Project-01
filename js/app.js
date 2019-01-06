document.addEventListener('DOMContentLoaded', () => {
  // const h1 = document.querySelector('h1')
  // h1.textContent = 'Hello World!'


$(document).ready(function() {

  $('.little-grid').find("td:not(.filled)").click(function() {
    if($(this).closest('.play').length === 0) {
      return;
    }
// assign choice blue or red
  const colour =    $('#turn').hasClass('blue') ? 'blue' : 'red'

// declaring objects
  smallgrid    =    $(this).closest('.little-grid');
  smallcolumn  =    $(this).attr('class');
  smallrow     =    $(this).closest('tr').attr('class');

// giving value of single play
  played = '.col-' + smallcolumn + '.row-' + smallrow;

// decide player move on small grid
  $(".play").removeClass('play');
  if($('.smallgrid' + played + ' td').not('.filled').length === 0) {
    $('.big-grid').addClass('play');
  } else {
    $(".smallgrid" + played).addClass('play');
  }


// prevent to play again in the same grid
  let div = $('<div>').addClass('score').addClass(colour).addClass('col-' + smallcolumn).addClass('row-' + smallrow)
  $(this).html(score);
  $(this).addClass('filled')
  $(this).unbind('click')

  score = smallgrid.find('score').filter('.' + colour)

// declaring how is the winner
if(vertical(score) || horizontal(score) || diagonal(score)) {
smallgrid.addClass(colour)
smallgrid.find('td').css('backgroundColor', 'blue')
} else {
  smallgrid.find('td').css('backgroundColor', 'red')
}
















})
