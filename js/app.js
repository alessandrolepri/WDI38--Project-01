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
      little_table  =    $(this).closest('.little-grid');
      little_col    =    $(this).attr('class');
      little_row    =    $(this).closest('tr').attr('class');

      // giving value of single play
      little_pos = '.col-' + litte_col + '.row-' + little_row;

      // decide player-next move on small grid
      $(".live").removeClass('live');
      if($('.grid' + little_pos + ' td').not('.filled').length === 0) {
        $('.big').addClass('live');
      } else {
        $(".grid" + little_pos).addClass('live');
      }

      // prevent to play again in the same grid
      let div = $('<div>').addClass('marker').addClass(colour).addClass('col-' + little_col).addClass('row-' + little_row)
      $(this).html(div);
      $(this).addClass('filled');
      $(this).unbind('click');

      markers = little_table.find('.marker').filter('.' + colour)

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
      markers = $('.little_table').filter('.' + colour)

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



      $('#turn').text('');

      function winner () {
        const left = $('.big').offset().left
        const middle = $('.big').position().middle
        const right = $('.#turn').offset().right
      });


      $('#turn').css ({
        "position": "absolute",
        "left": "left" + "px",
        "right": "right" + "px"
        newGame()
      })
    };

    function vertical(markers) {
      return (($(markers).filter('.row-1').length === 3)) || ($(markers).filter('.row-2').length === 3) || (($(markers).filter('.row-3').length === 3))
    }

    function horizontal(markers) {
      return (($(markers).filter('.col-1').length === 3)) || ($(markers).filter('.col-2').length === 3) || (($(markers).filter('.col-3').length === 3))
    }
  })
