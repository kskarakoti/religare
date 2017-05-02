// Core API
$(function () {
	"use strict";

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

	//convert
	$("select").msDropdown({roundedBorder:false});
});