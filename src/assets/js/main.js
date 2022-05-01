/* npm package imports */
import 'bootstrap';
import 'bootstrap-slider';
window.$ = window.jQuery = require("jquery");
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
    format: 'yyyy/mm/dd',
    autoclose: true,
    startDate: '+0d',
    todayHighlight: true
  });
});

// setup slider
$(".slider").slider({
});