// document.addEventListener('DOMContentLoaded', () => {
  // const h1 = document.querySelector('h1')
  // h1.textContent = 'Hello World!'


  $(document).ready(function() {

    $(".grid").find("td:not(.filled)").click(function() {
      if($(this).closest('.live').length === 0) {
        return;
      }
      // assign choice blue or red
      let colour = $('#turn').hasClass('red') ? 'red' : 'blue'

      // declaring objects
      little_table  =    $(this).closest('.little-grid');
      little_col    =    $(this).attr('class');
      little_row    =    $(this).closest('tr').attr('class');

      // giving value of single play
      little_pos = '.col-' + little_col + '.row-' + little_row;

      // decide player-next move on small grid
      $(".live").removeClass('live');
      if($('.grid' + little_pos + ' td').not('.filled').length === 0) {
        $('.big').addClass('live');
      } else {
        $(".grid" + little_pos).addClass('live');
      }

      // prevent to play again in the same grid
      let div = $('<div>').addClass('marker').addClass(colour).addClass('col-' + little_col).addClass('row-' + little_row);
      $(this).html(div);
      $(this).addClass('filled');
      $(this).unbind('click');

      markers = little_table.find('.marker').filter('.' + colour);

      // declaring who is the winner on small grid
      if(vertical(markers) || horizontal(markers) || diagonal(markers)) {
        little_table.addClass(colour);
        if(colour === 'red') {
          little_table.find('td').css('backgroundColor', 'blue');
        } else {
          little_table.find('td').css('backgroundColor', 'red');
        }
      }

      // declaring same if for big-grid
      markers = $('.little_table').filter('.' + colour);

      if(vertical(markers) || horizontal(markers) || diagonal(markers)) {
        win();
      } else {
        if($('td').not('.filled').length === 0) {
          $('#turn').fadeOut(200, function() {
            newGame();
          });
        } else {
          $('#turn').removeClass(colour).addClass(colour === 'red' ? 'blue' : 'red');
          $('#turn').html((colour === 'red' ? 'blue' : 'red') + '&rsquo;s turn&hellip;');
        }
      }
    });
  });

  function winner() {
    let right = $('#turn').offset().top;
    let top = $('.big').position().top;
    let left = $('.big').offset().left;

    $('#turn').text('');

    $('#turn').css ({
      position: 'absolute',
      left: left + 'px',
      top: right + 'px'
    });
  }

  function newGame() {
    $('#newGame').css('display', 'block').hide().fadeIn(200);
  }

  function horizontal(markers) {
    return (
      $(markers).filter('.row-1').length === 3 || $(markers).filter('.row-2').length === 3 || $(markers).filter('.row-3').length === 3
    );
  }
  function vertical(markers) {
    return (
      $(markers).filter('.col-1').length === 3 || $(markers).filter('.col-2').length === 3 || $(markers).filter('.col-3').length === 3
    );
  }

  function diagonal(markers) {
    if($(markers).filter('col-2').filter('.row-2').length === 0)
    {
      return false;
    }
    else if($(markers).filter('.col-1').filter('.row-1').length === 1 && $(markers).filter('.col-3').filter('.row-1').length === 1)
    {
      return true;
    } else {
      return false;
    }
  }
