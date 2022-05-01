/* npm package imports */
import 'bootstrap';
import 'bootstrap-slider';
import 'bootstrap-datepicker';

$(function() {
    // navbar toggle behavior
    $('#navbarCollapse').on('click', function() {
      $('#navbar, #content').toggleClass('active');
    });
});

$(function() {
  // from current url deduct which navitem should be active
	var pathname = window.location.pathname;
	$('.nav > li > a[href="'+pathname+'"]').parent().addClass('active');
})

// setup datepicker
$(function() {
  $('.datepicker').datepicker({
    format: 'mm/dd/yyyy',
    startDate: '-3d'
  });
});