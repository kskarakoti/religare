// Core API
$(function () {
	"use strict";

	//accordion function
	$('.accordionContent').hide();
	$('.accordionButton').click(function() {
		$('.accordionButton').removeClass('on');
		$('.accordionContent').slideUp('normal');
		if($(this).next().is(':hidden') == true) {
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		}
	});


	$(".sub-item").hover(
		function() {
			$(".overlay-bg").addClass('active');
		}, function() {
			$(".overlay-bg").removeClass('active');
		}
	);

	//select
	$("select").msDropdown({roundedBorder:false});
});