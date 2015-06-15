var App = {
	init: function() {

		$(document).foundation();

		this.equalHeights();				// Equal height to divs
		this.stylishSelect();				// Stylish select init
		this.menu();						// Toggle mobile menu
		this.timer();
	},

	// Equal heights divs
	equalHeights: function(){
		equalheight = function(container){

			var currentTallest = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0;
			$(container).each(function() {

				$el = $(this);
				$($el).height('auto')
				topPostion = $el.position().top;

				if (currentRowStart != topPostion) {
					for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
						rowDivs[currentDiv].height(currentTallest);
					}
					rowDivs.length = 0; // empty the array
					currentRowStart = topPostion;
					currentTallest = $el.height();
					rowDivs.push($el);
				} else {
					rowDivs.push($el);
					currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
				}

				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
			});
		}

		$(window).load(function() {
			equalheight('.equal');
			equalheight('article .item-content p');
		});

		$(window).resize(function(){
			equalheight('.equal');
			equalheight('article .item-content p');
		});
	},


	// Stylish select
	stylishSelect: function(){

		if($('.menu-wrap select').length){
			$('.menu-wrap select').sSelect();
		}
	},


	// Menu trigger
	menu: function(){

		$('.mm-trigger').on('click', function(){
			$('.main-nav').addClass('active');
		});
	},


	// Timer
	timer: function(){
		var base = $('.timer');

		base.each(function() {
			var t = $(this).attr('data-time');

			$(this).countdown({
				date: t,
			    render: function(data) {
		        	var el = $(this.el);
		        	el.empty()
		            .append("<span>" + this.leadingZeros(data.hours, 2) + "</span><span class=\"separ\">:</span>")
		            .append("<span>" + this.leadingZeros(data.min, 2) + "</span><span class=\"separ\">:</span>")
		            .append("<span>" + this.leadingZeros(data.sec, 2) + "</span>");
		        }
			});
		});

		// console.log(base.length);
	}
};


$(function(){
	App.init();
});
