// Core API
$(function () {
	"use strict";

	//accordion function
	$('.investor-content').hide();
	$('.investor-title').click(function() {
		$('.investor-title').removeClass('active');
		$('.investor-content').slideUp('normal');
		if($(this).next().is(':hidden') == true) {
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('active');
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		}
	});


	//footer links accordion
	if ($(window).width() < 991) {
		//accordion function
		$('.footer-link-list').hide();
		$('.ft-link-title').click(function() {
			$('.ft-link-title').removeClass('active');
			$('.footer-link-list').slideUp('normal');
			if($(this).next().is(':hidden') == true) {
				//ADD THE ON CLASS TO THE BUTTON
				$(this).addClass('active');
				//OPEN THE SLIDE
				$(this).next().slideDown('normal');
			}
		});
	};

	//menu black background show function
	if ($(window).width() > 1005) {
		$(".sub-item").hover(
			function () {
				$(".overlay-bg").addClass('active');
			}, function () {
				$(".overlay-bg").removeClass('active');
			}
		);
	};

	//Section Close on other side click Script_______________________________________________
	$(document).on("click", function (e) {
		var p = $(e.target).closest('.header-left ').length;
		if (!p) {
			$(".menu-lt-ar").removeClass('active');
			$(".overlay-bg").removeClass('active');
			$("body").removeClass('overflownone');
		}
	});

	//menu black background show function
	$('.hamburg-menu-btn').click(function() {
		$('.menu-lt-ar').toggleClass('active');
		$(".overlay-bg").toggleClass('active');
		$("body").toggleClass('overflownone');
	});





	if ($(window).width() < 1005) {
		$('.sub-item').click(function() {
			$(this).children('.sub-menu-ar').toggleClass('active');
		});
	}

	//select
	$("select").msDropdown({roundedBorder:false});
});