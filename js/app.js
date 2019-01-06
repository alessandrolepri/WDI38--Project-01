// document.addEventListener('DOMContentLoaded', () => {
  // const h1 = document.querySelector('h1')
  // h1.textContent = 'Hello World!'


$().ready(function() {

  $(".grid").find("td:not(.filled)").click(function() {
    if($(this).closest('.live').length === 0) {
      return;
    }
// assign choice blue or red
  let colour = $("#turn").hasClass("red") ? "red" : "blue";

// declaring objects
  little_table    =    $(this).closest('.little-grid');
  little_col  =    $(this).attr('class');
  little_row     =    $(this).closest('tr').attr('class');

// giving value of single play
  little_pos = '.col-' + litte_col + '.row-' + little_row;

// decide player move on small grid
  $(".live").removeClass('live');
  if($('.little_table' + little_pos + ' td').not('.filled').length === 0) {
    $('.big').addClass('live');
  } else {
    $(".little_table" + little_pos).addClass('play');
  }


// prevent to play again in the same grid
  let div = $('<div>').addClass('marker').addClass(colour).addClass('col-' + smallcolumn).addClass('row-' + smallrow)
  $(this).html(score);
  $(this).addClass('filled')
  $(this).unbind('click')

  score = smallgrid.find('.score').filter('.' + colour)

// declaring who is the winner on small grid
if(vertical(score) || horizontal(score) || diagonal(score)) {
smallgrid.addClass(colour)
smallgrid.find('td').css('backgroundColor', 'blue')
} else {
  smallgrid.find('td').css('backgroundColor', 'red')
}

// declaring same if for big-grid
score = $('.smallgrid').filter('.' + colour)

if(vertical(score) || horizontal(score) || diagonal(score)) {
  win();
} else {
  ($('td').not('.filled').length === 0) {
    $('#turn').fadeOut(500, function() {
      newGame();
    }
  } else {
    $('#turn').removeClass(colour).addClass((colour === 'red') ? 'blue' : 'red');
    $('turn').html((colour === 'red') ? 'blue' : 'red')
  }
  }
});

function winner () {
  const left = $('.big-grid').offset().left
  const middle = $('.big-grid').position().middle
  const right = $('.#turn').offset().right
});

$('#turn').text('');

$('#turn').css ({
  "position": "absolute",
  "left": "left" + "px",
  "right": "right" + "px"
  newGame()
})
};

function vertical(score) {
  return (($(score).filter('.row-1').length === 3)) || ($(score).filter('.row-2').length === 3) || (($(score).filter('.row-3').length === 3))
}

function horizontal(score) {
  return (($(score).filter('.col-1').length === 3)) || ($(score).filter('.col-2').length === 3) || (($(score).filter('.col-3').length === 3))
}





})
