var App = {
	init: function() {

		$(document).foundation();

		this.equalHeights();				// Equal height to divs
		this.stylishSelect();				// Stylish select init
		this.menu();						// Toggle mobile menu
		this.timer();						// Countdown
		this.slick();						// Slick slider init
		this.lightbox();					// Lightbox init
		this.bg();							// Set background image to element from data attr
		this.fpSlider();					// Frontpage slider init
		this.pGrid();						// Fix for product grid
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
				$($el).height('auto');
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
		};

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

		if($('select#bids-num').length){
			$('select#bids-num').sSelect();

			$('select#bids-num').sSelect().change(
				function(){
					var word = $('.bids-num-outer .selectedTxt').html();
					var index = word.indexOf(' ');
					if(index == -1) {
						index = word.length;
					}
					$('.bids-num-outer .selectedTxt').html('<b>' + word.substring(0, index) + '</b>' + word.substring(index, word.length));
				});
		}

		if($('select.sSelect').length){
			$('select.sSelect').sSelect();
			setTimeout(function() {
				$('select.sSelect').next().addClass('sSelect');
			}, 10);
		}

		// Hack for styling of first letter inside of stylish select
		$('.bids-num-outer .selectedTxt, .bids-num-outer li a').each(function() {
			var word = $(this).html();
			var index = word.indexOf(' ');
			if(index == -1) {
				index = word.length;
			}
			$(this).html('<b>' + word.substring(0, index) + '</b>' + word.substring(index, word.length));
		});
	},


	// Menu trigger
	menu: function(){

		$('.mm-trigger').on('click', function(){
			$('.main-nav').addClass('active');
		});

		$('.main-nav').on('click', function(){
			$(this).removeClass('active');
		});
	},


	// Timer
	timer: function(){
		var base = $('.timer');

		if(base.length){

			base.each(function(){

				var t = $(this).attr('data-time'),
					ended_message = $('<span>Auction has ended</span>');

				if(t !== undefined){
					$(this).countdown({
						date: t,
						render: function(data) {
							var el = $(this.el);
							el.empty()
							.append("<span>" + this.leadingZeros(data.hours, 2) + "</span><span class=\"separ\">:</span>")
							.append("<span>" + this.leadingZeros(data.min, 2) + "</span><span class=\"separ\">:</span>")
							.append("<span>" + this.leadingZeros(data.sec, 2) + "</span>");
						},
						onEnd: function() {
							$(this.el).parent('.timer-wrap').addClass('ended').html('').append(ended_message);
						}
					});
				} else {
					$(this).removeClass('timer').addClass('counter').prev().text('Bids left: ').parent().addClass('has-counter');
				}
			});
		}
	},


	// Slick slider (item thumbnails)
	slick: function(){

		if($('.slick').length){
			$('.slider-large').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				asNavFor: '.slider-nav'
			});

			$('.slider-nav').slick({
				slidesToShow: 4,
				arrows: false,
				slidesToScroll: 1,
				asNavFor: '.slider-large',
				focusOnSelect: true
			});
		}
	},


	// Lightbox init
	lightbox: function(){

		if($('[rel="lightbox"]').length){

			$('[rel="lightbox"]').lightbox();
		}
	},


	// Set bg-image out of [data-bg] attribute
	bg: function(){

		if($('[data-bg]').length){

			$('[data-bg]').each( function(){
				var imgUrl = $(this).attr('data-bg');

				$(this).css('background-image', 'url(' + imgUrl + ')');
			});
		}
	},


	// Frontpage slider init
	fpSlider: function(){

		if($('#masterslider').length){

			var slider = new MasterSlider();
			// slider.control('arrows');

			slider.setup('masterslider' , {
				width:420,
				height:270,
				space:0,
				loop:true,
				autoplay: true,
				keyboard: true,
				// fullwidth: true,
				// autoHeight: true,
				view:'flow',
				layout:'partialview'
			});
		}
	},


	// Fix for product grid
	pGrid: function(){

		if($('.products-grid').length){
			$('.products-grid').each(function() {
				$(this).find('.header + .row .columns:last-child').addClass('end');
			});
		}
	}
};


$(function(){
	App.init();
});
