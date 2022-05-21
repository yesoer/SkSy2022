/* npm package imports */
import 'bootstrap';
import 'bootstrap-slider';
window.$ = window.jQuery = require("jquery");
import 'bootstrap-datepicker';
import {todoTableSetup} from './todoTable.js';
import {todoEditSetup} from './editTODO.js';
import './newTODO.js';

// depending on what page is open do different setup stuff
$(function() {
  switch(window.location.pathname) {
    case "/index.html": todoTableSetup(); break;
    case "/editTODO.html": todoEditSetup(); break;
    case "/newTODO.html": break;
    case "/imprint.html": break;
    default: todoTableSetup();
  }
});

// navbar toggle behavior
$(function() {
  $('#navbarCollapse').on('click', function() {
    $('#navbar, #content').toggleClass('active');
  });
});

// from current url deduct which navitem should be active
$(function() {
	var pathname = window.location.pathname;
	$('.nav > li > a[href="'+pathname+'"]').parent().addClass('active');
});

// setup datepicker
$(function() {
  $('.datepicker').datepicker({
    format: 'yyyy/mm/dd',
    autoclose: true,
    startDate: '+0d',
    todayHighlight: true
  });
});