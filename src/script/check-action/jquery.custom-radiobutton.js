/*! custom-radiobutton - v1.0.1 - 2015-06-14
* http://www.binarystash.net/jquery-custom-radiobutton/
* Copyright (c) 2015 BinaryStash; Licensed MIT */
(function ($) {

	$.fn.customRadiobutton = function() {

		return this.each( function(i,v) {

			$(v).addClass("custom-radiobutton");

			//Ensure that a radio-button element was passed
			if ( !$(v).is(':radio') ) {
				return false;         
			}

			//Add classes
			$(v).addClass("custom-radiobutton");

			//If not wrapped within label tags, wrap it
			var parentLabel = $(v).parent("label");
			var withinLabel = parentLabel.length;

			if ( !withinLabel ){
				$(v).wrap("<label>");      
			} 

			//Create dummy radio-button
			var dummy = $("<span class='custom-radiobutton-display'></span>");
			$(v).after(dummy);
			if ( $(v).prop("checked") ) {
				dummy.addClass("custom-radiobutton-checked custom-radiobutton-checked-default");
			}

			//Add/remove classes to radio-buttons whenever state changes
			$(v).change( function(e) {

				var radiobutton = $(e.currentTarget);
				var name = radiobutton.attr("name");
				var containerForm = $(e.currentTarget).parents("form");
				var withinForm = containerForm.length > 0;
				
				if ( withinForm ) {
					containerForm.find("input[name='"+name+"']").next('.custom-radiobutton-display').removeClass('custom-radiobutton-checked');
				}
				else {
					$("input[name='"+name+"']").filter( function() { return $(this).parents("form").length < 1; } ).next('.custom-radiobutton-display').removeClass('custom-radiobutton-checked');
				}
				
				radiobutton.next('.custom-radiobutton-display').addClass("custom-radiobutton-checked");

			});
			
			//Make reset button aware of the custom checkboxes
			var form = $(v).parents("form");
			var reset = form.find("input[type='reset']");
			reset.each( function(ri,rv) {
				if ( !$(rv).hasClass("custom-checkbox-aware") ) {
					$(rv).addClass("custom-checkbox-aware");
					$(rv).click( function() {
						form.find(".custom-radiobutton-display").removeClass("custom-radiobutton-checked");
						form.find(".custom-radiobutton-display.custom-radiobutton-checked-default").addClass("custom-radiobutton-checked");
					});
				}
			});

		});

	};

}(jQuery));