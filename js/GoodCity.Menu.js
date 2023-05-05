
xxxxxxx.Menu = (function () {

	var isMobile = false;
	var $panel = $(".sidebar");

	function _init() {

		makeTriggerTl();
		$trigger.on('click', function (e) {
			if (!open) {
				openMenu();
			} else {
				closeMenu();
			}
		});

		testMobile();
		mobileNav();

		$(window).resize(function () {
			testMobile();
			positionSidebar();
		});

		if ('ontouchstart' in window) { var click = 'touchstart'; }
		else { var click = 'click'; }

	}

	function openMenu() {
		open = true;
		$body.css({overflowY:"hidden"});
		triggerTl.play();
	
		TweenMax.to($mainContent, .4, {
			left: "-30%", onComplete: function () { }
		});
		TweenMax.to($panel, .4, {
			left: "0%", 
			onComplete: function () { }
		});
		TweenMax.staggerFromTo($navLinks, .25, {
			transform: "translate(50rem,0)"
		}, {
			transform: "translate(0,0)"
		}, .035
		);
	}

	function closeMenu() {
		var self = this;
		
		var staticPos = isMobile ? "100%" : "93%";

		open = false;
		$body.css({overflowY:"visible"});
		triggerTl.reverse();
	
		TweenMax.to($mainContent, 0.25, {
			ease: Sine.easeIn,
			left: "0%", onComplete: function () { }
		});
		TweenMax.to($panel, 0.25, {
			ease: Sine.easeIn,
			left: staticPos, onComplete: function () { }
		});	
	}

	function makeTriggerTl() {
		triggerTl = new TimelineMax({paused:true});
		
		triggerTl.to($trigger.$x, .2, 
			{ transform: "translate(0,-3.5px) rotate(45deg)" }
		)
		.to($trigger.$z, .2, 
			{ transform: "translate(0,-3.5px) rotate(-45deg)" },
		"-=.2")
		.to($trigger.$y, .2, 
			{ opacity: 0 },
		"-=.2")
	}

	function mobileNav() {
		if (isMobile) {
			var scroll = $(window).scrollTop();
			
			if (scroll >= 100 && !open) {
				$panel.addClass("active");
			} else {
				$panel.removeClass("active");
			}
		}

		window.requestAnimationFrame(mobileNav.bind(this));
	}

	function testMobile() {
		isMobile = false;
		if ($('body').width() <= 640) {
			isMobile = true;
		}
	}

	function positionSidebar() {
		if (!open) {
			if (isMobile) {
				$panel.css({left:"100%"})
			} else {
				$panel.css({left:"93%"})
			}
		}
	}


	// PRIVATE VARS
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~
	var open = false;

	var $body = $('body');
	var $mainContent = $('.maincontent');
	var $trigger = $('.burger');
	$trigger.$x = $trigger.find('.x');
	$trigger.$y = $trigger.find('.y');
	$trigger.$z = $trigger.find('.z');
	var $panel = $(".sidebar");
	var $navLinks = $(".js-nav-link");
	var $triggerTl = null;



	// PRIVATE METHODS
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~



	// PUBLIC METHODS
	//~~~~~~~~~~~~~~~~~~~~~~~~~~~
	return {

		init: _init

	};


})();
