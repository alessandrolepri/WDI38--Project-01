// document.addEventListener('DOMContentLoaded', () => {
// const h1 = document.querySelector('h1')
// h1.textContent = 'Hello World!'


$().ready(function() {

  $('.grid').find('td:not(.filled)').click(function() {
    if($(this).closest('.live').length === 0) {
      return
    }
    // assign choice blue or red
    const colour = $('#turn').hasClass('red') ? 'red' : 'blue'

    // declaring objects
    const littleTable  =    $(this).closest('.little-grid')
    const littleCol    =    $(this).attr('class')
    const littleRow    =    $(this).closest('tr').attr('class')

    // giving value of single play
    const littlePos = '.col-' + littleCol + '.row-' + littleRow

    // decide player-next move on small grid
    $('.live').removeClass('live')
    if($('.grid' + littlePos + ' td').not('.filled').length === 0) {
      $('.big').addClass('live')
    } else {
      $('.grid' + littlePos).addClass('live')
    }

    // prevent to play again in the same grid
    const div = $('<div>').addClass('marker').addClass(colour).addClass('col-' + littleCol).addClass('row-' + littleRow)
    $(this).html(div)
    $(this).addClass('filled')
    $(this).unbind('click')

    let markers = littleTable.find('.marker').filter('.' + colour)

    // declaring who is the winner on small grid
    if(vertical(markers) || horizontal(markers) || diagonal(markers)) {
      littleTable.addClass(colour)
      if(colour === 'red') {
        littleTable.find('td').css('backgroundColor', 'blue')
      } else {
        littleTable.find('td').css('backgroundColor', 'red')
      }
    }

    // declaring same if for big-grid
    markers = $('.little_table').filter('.' + colour)

    function newGame() {
      $('#newGame').css('display', 'block').hide().fadeIn(900)
    }

    if(vertical(markers) || horizontal(markers) || diagonal(markers)) {
      winner()
    } else {
      if($('td').not('.filled').length === 0) {
        $('#turn').fadeOut(900, function() {
          newGame()
        })
      } else {
        $('#turn').removeClass(colour).addClass(colour === 'red' ? 'blue' : 'red')
        $('#turn').html((colour === 'red' ? 'blue' : 'red') + '&rsquo;s turn&hellip;')
      }
    }
  })
})

function winner() {
  const right = $('#turn').offset().top
  const top = $('.big').position().top
  const left = $('.big').offset().left

  $('#turn').text('You Won!!!')

  $('#turn').css({
    position: 'absolute',
    left: left + 'px',
    top: right + 'px'
  })


  function horizontal(markers) {
    return (
      $(markers).filter('.row-1').length === 3 || $(markers).filter('.row-2').length === 3 || $(markers).filter('.row-3').length === 3
    )
  }
  function vertical(markers) {
    return (
      $(markers).filter('.col-1').length === 3 || $(markers).filter('.col-2').length === 3 || $(markers).filter('.col-3').length === 3
    )
  }

  function diagonal(markers) {
    if($(markers).filter('col-2').filter('.row-2').length === 0)
      return false
  }
  if($(markers).filter('.col-1').filter('.row-1').length === 1 && $(markers).filter('.col-3').filter('.row-1').length === 1) {
    return true
  } else {
    return false
  }
}
