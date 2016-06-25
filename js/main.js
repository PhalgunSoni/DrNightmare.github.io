jQuery(function($) {
	"use strict";
	// Author Code Here
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var texts = ['patients', 'doctors', 'pharmacies', 'health labs'];

var TypeWritter = function () {
  function TypeWritter(elem, texts, cursor) {
    _classCallCheck(this, TypeWritter);

    this.elem = elem;
    this.texts = texts;
    this.cursor = cursor;
    this.currText = '';
    this.stack = new Array();
    this.getText = this.getText.bind(this);
    this.write = this.write.bind(this);
    this.getSubString = this.getSubString.bind(this);
    this.cursor = document.createElement('span');
    this.cursor.innerHTML = "|";
    this.cursor.setAttribute("class", "cursor--default");
  }

  TypeWritter.prototype.init = function init(delay, loop) {
    var self = this;
    var getText = this.getText;
    var write = this.write;
    var maxlength = this.texts.length;
    var currText = this.currText;
    var i = 0;

    function getNewText() {
      if (i < maxlength) {
        currText = getText(i);
        write(currText);
      } else {
        if (loop) {
          i = 0;
          currText = getText(i);
          write(currText);
        } else {
          clearInterval(self.getNewText);
        }
      }
      i++;
      setTimeout(function () {
        requestAnimationFrame(getNewText);
      }, delay);
    }
    getNewText();
  };

  TypeWritter.prototype.getText = function getText(arrayPos) {
    return this.texts[arrayPos];
  };

  TypeWritter.prototype.write = function write(text) {
    var _this = this;

    var self = this;
    var elem = document.getElementById(this.elem);
    var textlen = text.length;
    var getSubString = this.getSubString;
    var j = 0;

    function writeInterval() {}
    self.writeInterval = setInterval(function () {
      if (j < textlen) {
        var text2write = getSubString(text, j);
        elem.innerHTML = text2write;
        elem.appendChild(_this.cursor);
      } else {
        _this.stack.splice(0, _this.stack.length);
        clearInterval(self.writeInterval);
      }
      j++;
    }, 100);
  };

  TypeWritter.prototype.getSubString = function getSubString(text, index) {
    this.stack.push(text[index]);
    return this.stack.join('');
  };

  return TypeWritter;
}();

;

var type = new TypeWritter('chng', texts, '');
type.init(3000, true);

var type = new TypeWritter('chng', texts, '');
type.init(3000, true);

	var owlPricing;
	var ratio = 2;

	// Window Load
	$(window).load(function() {
		// Preloader
		$('.intro-tables, .parallax, header').css('opacity', '0');
		$('.preloader').addClass('animated fadeOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
			$('.preloader').hide();
			$('.parallax, header').addClass('animated fadeIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				$('.intro-tables').addClass('animated fadeInUp').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
			});
		});

		// Header Init
		if ($(window).height() > $(window).width()) {
			var ratio = $('.parallax').width() / $('.parallax').height();
			$('.parallax img').css('height', ($(window).height()) + 'px');
			$('.parallax img').css('width', $('.parallax').height() * ratio + 'px');
		}

		$('header').height($(window).height() + 80);
		$('section .cut').each(function() {
			if ($(this).hasClass('cut-top'))
				$(this).css('border-right-width', $(this).parent().width() + "px");
			else if ($(this).hasClass('cut-bottom'))
				$(this).css('border-left-width', $(this).parent().width() + "px");
		});

		// Sliders Init
		$('.owl-schedule').owlCarousel({
			singleItem: true,
			pagination: true
		});
		$('.owl-testimonials').owlCarousel({
			singleItem: true,
			pagination: true
		});
		$('.owl-twitter').owlCarousel({
			singleItem: true,
			pagination: true
		});

		// Navbar Init
		$('nav').addClass('original').clone().insertAfter('nav').addClass('navbar-fixed-top').css('position', 'fixed').css('top', '0').css('margin-top', '0').removeClass('original');
		$('.mobile-nav ul').html($('nav .navbar-nav').html());
		$('nav.navbar-fixed-top .navbar-brand img').attr('src', $('nav.navbar-fixed-top .navbar-brand img').data("active-url"));

		// Typing Intro Init
		$(".typed").typewriter({
			speed: 60
		});

		// Popup Form Init
		var i = 0;
		var interval = 0.15;
		$('.popup-form .dropdown-menu li').each(function() {
			$(this).css('animation-delay', i + "s");
			i += interval;
		});
		$('.popup-form .dropdown-menu li a').click(function(event) {
			event.preventDefault();
			$(this).parent().parent().prev('button').html($(this).html());
		});

		// Onepage Nav
		$('.navbar.navbar-fixed-top .navbar-nav').onePageNav({
			currentClass: 'active',
			changeHash: false,
			scrollSpeed: 400,
			filter: ':not(.btn)'
		});
	});
	// Window Scroll
	function onScroll() {
		if ($(window).scrollTop() > 50) {
			$('nav.original').css('opacity', '0');
			$('nav.navbar-fixed-top').css('opacity', '1');
		} else {
			$('nav.original').css('opacity', '1');
			$('nav.navbar-fixed-top').css('opacity', '0');
		}
	}

	window.addEventListener('scroll', onScroll, false);

	// Window Resize
	$(window).resize(function() {
		$('header').height($(window).height());
	});

	// Pricing Box Click Event
	$('.pricing .box-main').click(function() {
		$('.pricing .box-main').removeClass('active');
		$('.pricing .box-second').removeClass('active');
		$(this).addClass('active');
		$(this).next($('.box-second')).addClass('active');
		$('#pricing').css("background-image", "url(" + $(this).data('img') + ")");
		$('#pricing').css("background-size", "cover");
	});

	// Mobile Nav
	$('body').on('click', 'nav .navbar-toggle', function() {
		event.stopPropagation();
		$('.mobile-nav').addClass('active');
	});

	$('body').on('click', '.mobile-nav a', function(event) {
		$('.mobile-nav').removeClass('active');
		if(!this.hash) return;
		event.preventDefault();
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	$('body').on('click', '.mobile-nav a.close-link', function(event) {
		$('.mobile-nav').removeClass('active');
		event.preventDefault();
	});

	$('body').on('click', 'nav.original .navbar-nav a:not([data-toggle])', function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			event.stopPropagation();
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog"),
			offset = ($(window).height() - $dialog.height()) / 2,
			bottomMargin = parseInt($dialog.css('marginBottom'), 10);

		// Make sure you don't hide the top part of the modal w/ a negative margin
		// if it's longer than the screen height, and keep the margin equal to 
		// the bottom margin of the modal
		if (offset < bottomMargin) offset = bottomMargin;
		$dialog.css("margin-top", offset);
	}

	$('.modal').on('show.bs.modal', centerModal);

	$('.modal-popup .close-link').click(function(event){
		event.preventDefault();
		$('#modal1').modal('hide');
	});

	$(window).on("resize", function() {
		$('.modal:visible').each(centerModal);
	});
});
