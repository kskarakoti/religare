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
		$('.footer-link-list').hide();
	}
	$('.ft-link-title').click(function () {
		if ($(window).width() < 991) {
			$('.ft-link-title').removeClass('active');
			$('.footer-link-list').slideUp('normal');
			if ($(this).next().is(':hidden') == true) {
				//ADD THE ON CLASS TO THE BUTTON
				$(this).addClass('active');
				//OPEN THE SLIDE
				$(this).next().slideDown('normal');
			}
		}
	});

	$(window).resize(function(){
		if ($(window).width() < 991) {
			$('.footer-link-list').hide();
		}else {
			$('.footer-link-list').show();
		}
	});


	//for addclass on page load
	$("ul.menu-list li a").each(function() {
		if (this.href == window.location) {
			$(this).parent().addClass("active");
		};
	});

	//menu black background show function
	if ($(window).width() > 1023) {
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
		var p = $(e.target).closest('.header-left, .dropdown-menu ').length;
		if (!p) {
			$(".menu-lt-ar").removeClass('active');
			$(".overlay-bg").removeClass('active');
			$("body").removeClass('overflownone');
			$(".hamburger li").removeClass();
			$(".menue").removeClass('active');
		}

		if ($(window).width() > 767) {
			var q = $(e.target).closest('.banner-list li, .banner-main-content').length;
			if (!q) {
				$('.banner-action').parents('li').removeClass('active');
				$('.close-btn').removeClass('active');
				$('.banner-action').show();
				$(".tabcontent").fadeOut();
			}
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

	//equity toggle menu
	$(".dropdown-toggle a").click(function () {
		$('.overlay-bg').addClass("active");
	});
	$(".search-dp-list ul li a").click(function () {
		$('.dropdown-frst').hide();
		$('.dropdown-scd').show();
		$('.overlay-bg').removeClass('active');
		var selectData = $(this).html();
		$(this).parents('li').children().find('.title-val').html(selectData);
		console.log(selectData);
	});

	//heat map page active
	$(".heat-map-list li a").click(function () {
		// event.preventDefault();
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
	});
	$(".share-dt-sort li a").click(function () {
		// event.preventDefault();
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
	});

	//list item to replace on select box in mobile
	if ($(window).width() < 767){
		//for dropdown toggle on click
		$('button.btn-toggle').on('click', function () {
			$('ul.toggle-list').toggle();
		});
		$('.share-dt-sort li a').on('click', function () {
			var vals = $(this).html();
			$(this).parents().prev('.btn-wrap').find('button.btn-toggle span.text').html(vals);
			$('ul.toggle-list').toggle();
		});

		$(window).resize(function () {
			//for dropdown toggle on click
			$('button.btn-toggle').on('click', function () {
				$('ul.toggle-list').toggle();
			});
			$('.share-dt-sort li a').on('click', function () {
				var vals = $(this).html();
				$(this).parents().prev('.btn-wrap').find('button.btn-toggle span.text').html(vals);
				$('ul.toggle-list').toggle();
			});
		});
	}

	/*$(document).on('click', function(e) {
		if ( $(e.target).closest('.dropdown-menu-right, .search-drop').length ) {
			$(".overlay-bg").toggleClass('active');
		}else if ( ! $(e.target).closest('.dropdown-menu-right,.search-drop').length ) {
			$('.overlay-bg').removeClass('active');
		}
	});*/

	//datepickers
	$('#datePicker').datepicker({
		format: "mm/dd/yyyy",
		todayHighlight: true,
	}).on('changeDate', function(e) {
		$('.datepicker').hide();
	});

	//for div height calculation
	divheight();
	// footernav();

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

	//DataTable re-adjust on tab Script_______________________________________________
	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
		$($.fn.dataTable.tables(true)).DataTable().columns.adjust().draw( false );
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
	// footernav();
});
function divheight() {
	var maxHeight = -1;
	$('.sec-block').each(function() {
		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	});
	$('.sec-block').each(function() {
		$(this).height(maxHeight);
	});
	var winsize = $(window).width();
	if(winsize <= 767) {
		$('.sec-block .heading-bx').css('margin-top', '20px');
	}else {
		$('.sec-block .heading-bx').css('margin-top', 0);
	}
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


//footer menu toggle
/*function footernav() {
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
	} else if ($(window).width() > 991) {
		$('.footer-link-list').show();
		$('.ft-link-title').unbind('click');
	};
}*/
