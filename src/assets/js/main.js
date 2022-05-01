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