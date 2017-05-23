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
	$(".menu-list li a, .menu-list-dt li a").each(function() {
		if (this.href == window.location) {
			$(this).parent('li').addClass("active");
		};
	});
	$("ul.sub-menu-list li").each(function() {
		$('ul.sub-menu-list li.active').parents().find('.sub-menu-ar').parent().addClass('active').next().removeClass('active');
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
			scrollTop: $('#scroll-position').offset().top - 70
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

	//hamburgar menu
	if ($(window).width() < 991) {
		$('.sub-menu-dt-ar').hide();
	}
	$('.menu-list-dt > li > a').click(function () {
		if ($(window).width() < 991) {
			$('.menu-list-dt > li > a').parent().removeClass('active');
			$('.sub-menu-dt-ar').slideUp('normal');
			if ($(this).next().is(':hidden') == true) {
				//ADD THE ON CLASS TO THE BUTTON
				$(this).parent().addClass('active');
				//OPEN THE SLIDE
				$(this).next().slideDown('normal');
			}
		}
	});

	$(window).resize(function(){
		if ($(window).width() < 991) {
			$('.sub-menu-dt-ar').hide();
		}else {
			$('.sub-menu-dt-ar').show();
		}
	});

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

	//Qoutes down arrow toggle action
	$(".high-low-sec .down-arrow a").click(function (e) {
		$(this).parents('.high-low-sec').children('.high-low-area').toggleClass("active");
		$(this).parents('.down-arrow').toggleClass("up-arrow");
		// e.stopPropagation();
	});

	//list item to replace on select box in mobile
	if ($(window).width() < 767){
		$('.btn-wrap button.btn-toggle').on('click',function(e){
			e.preventDefault();
			var $list = $(this).parent().next('.share-dt-sort');
			$list.slideToggle();
			$('ul.toggle-list').not($list).slideUp();
		});
		$('ul.toggle-list li a').on('click', function(e){
			e.preventDefault();
			var vals = $(this).html();
			$(this).parents().prev('.btn-wrap').find('button.btn-toggle span.text').html(vals);
			if($('ul.toggle-list').is(':visible')) {
				$('ul.toggle-list').hide();
			}
		});
	}else {
		$('ul.toggle-list').show();
	}

	$(document).on("click", function (e) {
		if ($(window).width() < 767) {
			var p = $(e.target).closest('.btn-wrap button.btn-toggle').length;
			if (!p) {
				var $list = $(this).parent().next('.share-dt-sort');
				$list.slideToggle();
				$('ul.toggle-list').not($list).slideUp();
			}
			var p1 = $(e.target).closest('.btn-wrap button.btn-radio-toggle').length;
			if (!p1) {
				var $list = $(this).parent().next('.toggle-radio');
				$list.slideToggle();
				$('.toggle-radio').not($list).slideUp();
			}
		}
	});

	//radio button covert in select box
	var winwidth = $(window).width();
	if(winwidth <= 767) {
		$('.toggle-radio').hide();
		$('.btn-wrap button.btn-radio-toggle').on('click',function(e){
			e.preventDefault();
			var $list = $(this).parent().next('.toggle-radio');
			$list.slideToggle();
			$('.toggle-radio').not($list).slideUp();
		});
		$('.toggle-radio .css-label').on('click', function(e){
			e.preventDefault();
			$(this).parent().parent().prev().find('span.radio-list').text($(this).text());
			if($('.toggle-radio').is(':visible')) {
				$('.toggle-radio').hide();
			}
		});
	} else {
		$('.toggle-radio').show();
	}

	//for header search 
	$('.search-links i.icon-ic_search, .close-icon a').on('click',function(){
		$('.header-search-wrap').slideToggle('slow');
		$('input.search-nput').focus();
		$('.overlay-bg').toggle();
	});
	$('.search-input').keyup(function () {
		var valThis = this.value.toLowerCase(),
			lenght  = this.value.length;

		$('.search-list-wrap .recent-list>li div.name').each(function () {
			var text  = $(this).text(),
				textL = text.toLowerCase(),
				htmlR = '<b>' + text.substr(0, lenght) + '</b>' + text.substr(lenght);
			(textL.indexOf(valThis) == 0) ? $(this).html(htmlR).parent().show() : $(this).parent().hide();
		});
		$('.search-list-wrap').show();
		$('.recent-search-wrap').hide();
	});
	$('.search-list-wrap .recent-list>li div.name').on('click',function(){
		var content= $(this).text();
		$('.search-input').val(content);
	});

	//star rating
	$('.input-star').rating({displayOnly: true, step: 0.5});

	//datepickers
	$('#datePicker').datepicker({
		format: "mm/dd/yyyy",
		todayHighlight: true,
	}).on('changeDate', function(e) {
		$('.datepicker').hide();
	});

	$('.datePicker').datepicker({
		format: "mm/dd/yyyy",
		todayHighlight: true,
	}).on('changeDate', function(e) {
		$('.datepicker').hide();
	});

	$('.datePickerTab').datepicker({
		format: "MM dd",
		todayHighlight: true,
	}).on('changeDate', function(e) {
		$('.datepicker').hide();
	});
	$('.derivatives-bann .month-time-tx').on('click', function(e){
		e.stopPropagation();
		return false;
	});
	//for div height calculation
	divheight();
	eligheight();
	contheight();
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
	$(".data-table thead tr").append("<th></th>");
	$(".data-table tbody tr").append("<td></td>");
	 $('.data-table').DataTable( {
	 	"bPaginate": false,
	 	"ordering": false,
	 	"searching": false,
        responsive: {
            details: {
                type: 'column',
                target: -1
            }
        },
        columnDefs: [ {
            className: 'control',
            orderable: false,
            targets:   -1
        } ]
    } );


	
});



//for div height calculation
$(window).resize(function(){
	divheight();
	eligheight();
	contheight();
	// footernav();
	var winwidth = $(window).width();
	if(winwidth >= 768) {
		$('.toggle-radio,ul.toggle-list').show();
	} else {
		$('.toggle-radio,ul.toggle-list').hide();
	}
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
		$('.sec-block .heading-bx').css('margin-top', '10px');
	}else {
		$('.sec-block .heading-bx').css('margin-top', 0);
	}
}
function eligheight() {
	var maxHeight = -1;
	$('.eligibility-wrap .media-body').each(function() {
		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	});
	$('.eligibility-wrap .media-body').each(function() {
		$(this).height(maxHeight);
	});
}
function contheight() {
	var maxHeight = -1;
	var maxHeights = -1;
	$('.grid-overlay-wrap .content-wrap').each(function() {
		maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	});
	$('.grid-overlay-wrap .content-wrap').each(function() {
		$(this).height(maxHeight);
	});
	$('.grid-overlay-wrap .content-wrap p').each(function() {
		maxHeights = maxHeights > $(this).height() ? maxHeights : $(this).height();
	});
	$('.grid-overlay-wrap .content-wrap p').each(function() {
		$(this).height(maxHeights);
	});
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

