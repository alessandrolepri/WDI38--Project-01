document.addEventListener('DOMContentLoaded', () => {
  // const h1 = document.querySelector('h1')
  // h1.textContent = 'Hello World!'
$(document).ready(function() {

  $('.little-grid').find("td:not(.filled)").click(function() {
    if($(this).closest('.live').length === 0) {
      return;
    }
// assign choice blue or red
  const colour =    $('#turn').hasClass('blue') ? 'blue' : 'red'

// declaring objects
  smallgrid   =    $(this).closest('.little-grid');
  smallcolumn =    $(this).attr('class');
  smallrow    =    $(this).closest('tr').attr('class');

// giving value of single play
  position = '.col-' + smallcolumn + '.row-' + smallrow;

  










})
