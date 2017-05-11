// Core API

$(document).ready(function(){
	var wow = new WOW(
		{
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: true,
			live: true
		}
	);
	wow.init();
});

$(function () {
	"use strict";

	//accordion function
	$('.investor-content').hide();
	$('.investor-title').click(function () {
		$('.investor-title').removeClass('active');
		$('.investor-content').slideUp('normal');
		if ($(this).next().is(':hidden') == true) {
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
		$('.ft-link-title').click(function () {
			$('.ft-link-title').removeClass('active');
			$('.footer-link-list').slideUp('normal');
			if ($(this).next().is(':hidden') == true) {
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

	//banner action function
	if ($(window).width() > 767) {
		$('.banner-action').click(function () {
			$(this).parents('li').addClass('active');
			$(this).parents('li').siblings().removeClass('active');
			var tab = $(this).attr("href");
			$(".tabcontent").not(tab).css("display", "none");
			$(tab).fadeIn();

			$("body, html").animate({
				scrollTop: $( $(this).attr('href')).offset().top - 200+ "px"
			}, 600);

			wow.init();

			return false;
		});

		$('.close-btn').click(function () {
			$(this).parents('li').removeClass('active');
			$(".tabcontent").fadeOut();
			return false;
		});

	}

	//down action function
	$(".down-arrow .scrolls").on("click", function( e ) {
		e.preventDefault();
		$("body, html").animate({
			scrollTop: $('#scroll-position').offset().top
		}, 600);
	});

	if ($(window).width() < 767) {
		$('.banner-action').click(function () {
			$(this).parents('li').addClass('active');
			$(this).parents('li').siblings().removeClass('active');
			return false;
		});

		$(".ban-cont1").on("click", function(){
			$("#transacts").clone().appendTo(".ban-main-cont1");
			$(".ban-main-cont2 #returns").remove();
			$(".ban-main-cont3 #researchs").remove();
		});
		$(".remove-ban-cont1").on("click", function(){
			$(this).parents('li').removeClass('active');
			$(".ban-main-cont1 #transacts").remove();
		});

		$(".ban-cont2").on("click", function(){
			$('#returns').clone().appendTo(".ban-main-cont2");
			$(".ban-main-cont1 #transacts").remove();
			$(".ban-main-cont3 #researchs").remove();
		});
		$(".remove-ban-cont2").on("click", function(){
			$(this).parents('li').removeClass('active');
			$(".ban-main-cont2 #returns").remove();
		});

		$(".ban-cont3").on("click", function(){
			$('#researchs').clone().appendTo(".ban-main-cont3");
			$(".ban-main-cont1 #transacts").remove();
			$(".ban-main-cont2 #returns").remove();
		});
		$(".remove-ban-cont3").on("click", function(){
			$(this).parents('li').removeClass('active');
			$(".ban-main-cont3 #researchs").remove();
		});

	}



	//Section Close on other side click Script_______________________________________________
	$(document).on("click", function (e) {
		var p = $(e.target).closest('.header-left ').length;
		if (!p) {
			$(".menu-lt-ar").removeClass('active');
			$(".overlay-bg").removeClass('active');
			$("body").removeClass('overflownone');
			$(".hamburger li").removeClass();
			$(".menue").removeClass('active');
		}

		var q = $(e.target).closest('.banner-list li, .banner-main-content').length;
		if (!q) {
			$('.banner-action').parents('li').removeClass('active');
			$('.close-btn').removeClass('active');;
			$('.banner-action').show();
			$(".tabcontent").fadeOut();
		}
	});



	//(Custom) - Hamburger fucntion on the left top side menu
	var breadtop = $(".hamburger li:nth-child(1)"),
		beef = $(".hamburger li:nth-child(2)"),
		breadbottom = $(".hamburger li:nth-child(3)");
	$(".menue").on('click', function () {
		if (beef.hasClass("rot-45deg")) {
			breadtop.removeClass("rot45deg");
			beef.removeClass("rot-45deg");
			breadbottom.removeClass("hidden");
			$(".menu-lt-ar").removeClass('active');
			$("body").removeClass('overflownone');
			$(".overlay-bg").removeClass('active');
			$(this).removeClass('active');
		} else {
			breadbottom.addClass("hidden");
			breadtop.addClass("rot45deg");
			beef.addClass("rot-45deg");
			$(".menu-lt-ar").addClass('active');
			$("body").addClass('overflownone');
			$(".overlay-bg").addClass('active');
			$(this).addClass('active');
		}
	});

	if ($(window).width() < 991) {
		//accordion function
		$('.sub-menu-dt-ar').hide();
		$('.menu-list-dt > li > a').click(function () {
			$('.menu-list-dt > li > a').parent().removeClass('active');
			$('.sub-menu-dt-ar').slideUp('normal');
			if ($(this).next().is(':hidden') == true) {
				//ADD THE ON CLASS TO THE BUTTON
				$(this).parent().addClass('active');
				//OPEN THE SLIDE
				$(this).next().slideDown('normal');
			}
		});
	};


	//for converting tab to accordion
	$(".tab-content .accordion-heading").click(function(){
		if(false == $(this).next().is(':visible')) {
			$('.tab-content .tab-pane').slideUp(600);
			$(".tab-content .accordion-heading span").addClass('plus');
			$(".tab-content .accordion-heading span").removeClass('minus');
		}
		$(this).next().slideToggle(600);
		$(this).children('.plus, .minus').toggleClass("plus minus");
	});
	$('.tab-content .tab-pane:eq(0)').show();



	//heat map page active
	$(".heat-map-list li a").click(function (event) {
		// event.preventDefault();
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
	});
	$(".share-dt-sort li a").click(function (event) {
		// event.preventDefault();
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
	});


	if ($(window).width() < 767){
		//for dropdown toggle on click
		$('button.btn-toggle').on('click', function () {
			$('ul.toggle-list').toggle();
		});
		$('ul.toggle-list li a').on('click', function () {
			var vals = $('ul.toggle-list li.active a').html();
			$('button.btn-toggle span.text').html(vals);
			$('ul.toggle-list').toggle();
			console.log(vals)
		});

		$(window).resize(function () {
			//for dropdown toggle on click
			$('button.btn-toggle').on('click', function () {
				$('ul.toggle-list').toggle();
			});
			$('ul.toggle-list li a').on('click', function () {
				var vals = $('ul.toggle-list li.active a').html();
				$('button.btn-toggle span.text').html(vals);
				$('ul.toggle-list').toggle();
			});
		});
	}

	//datepickers
	var $btn = $('#bt1');
	$('#datetimepicker1').datetimepicker({
		widgetParent: $btn
	});
	$btn.click(function () {
		$('#datetimepicker1').data('DateTimePicker').toggle();
	});

	//for div height calculation
	divheight();

	//select
	if($('.country-select').length) {
		$(".country-select").msDropdown({roundedBorder:false});
	}

	$(".select").select2({
		minimumResultsForSearch: -1
	});

	// Malihu Scroll
	$(".horizontalScroll").mCustomScrollbar({
		axis:"x",
		theme: "dark",
		autoExpandHorizontalScroll: true,
		mouseWheel:{ scrollAmount: 600}
		});


	//for datatable
	$('.data-table').DataTable({
		responsive: true,
		"bPaginate": false,
		"ordering": false,
		"searching": false,
		rowReorder: {
			selector: 'td:nth-child(2)'
		},
	});
});



//for div height calculation
$(window).resize(function(){
	divheight();
});
function divheight() {
	var height = $('.sec-block.sec-l').height();
	$('.sec-r').height(height);
}

//for accordion icon
function toggleIcon(e) {
	$(e.target)
		.prev('.panel-heading')
		.find(".more-less")
		.toggleClass('glyphicon-plus glyphicon-minus');
	$(e.target).prev('.panel-heading').toggleClass('active')
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);