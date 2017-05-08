// Core API
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
	}
	;

	//menu black background show function
	if ($(window).width() > 1005) {
		$(".sub-item").hover(
			function () {
				$(".overlay-bg").addClass('active');
			}, function () {
				$(".overlay-bg").removeClass('active');
			}
		);
	}
	;

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
	}
	;

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

	//datepickers
	var $btn = $('#bt1');
	$('#datetimepicker1').datetimepicker({
		widgetParent: $btn
	});
	$btn.click(function () {
		$('#datetimepicker1').data('DateTimePicker').toggle();
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
		});
	}
	// $('#datetimepicker1').datetimepicker();

	//select
	if($('.country-select').length) {
		$(".country-select").msDropdown({roundedBorder:false});
	}
	//select 2
	// function formatState (state) {
	// 	console.log('change')
	// 	if (!state.id) { return state.text; }
	// 	var $state = $(
	// 		'<span><img src="assets/images/market-icon/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
	// 	);
	// 	return $state;
	// };
    //
	// $(".selectImg").select2({
	// 	templateResult: formatState
	// });

	$(".select").select2({
		minimumResultsForSearch: -1
	});

	// Malihu Scroll
	$(window).on("load",function(){
		$(".horizontalScroll").mCustomScrollbar({
			axis:"x",
			theme: "dark",
			autoExpandHorizontalScroll: true
		});
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