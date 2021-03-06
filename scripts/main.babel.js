var currentWidth = window.innerWidth;
let isMobile = window.innerWidth <= 600;
const $navLink = $('.l-header__inner__siteNav__list__item a');
const $navLinkMobile = $('.l-header-mobile__opened__nav__item a');
const contentsArr = [];

run();

window.addEventListener("resize", function() {
  if (currentWidth == window.innerWidth) {
      return;
  }
  currentWidth = window.innerWidth;
  isMobile = window.innerWidth <= 600;
  run();
});

function run() {
	if (!isMobile) {
		calcContentsPosition($navLink, contentsArr);
		$(window).on('load scroll', function() {
		  currentCheck($navLink, contentsArr);
		});
		openSmallWindow();
		changeLanguage();
		smoothScroll($navLink, isMobile);
	} else {
		openMenu();
		smoothScroll($navLinkMobile, isMobile);
	}
}




function calcContentsPosition($navLink, contentsArr) {
	for (let i= 0; i< $navLink.length; i++) {
		const targetContents = $navLink.eq(i).attr('href');
		if (targetContents.charAt(0) == '#') {
			const headerHeight = $('header').height();
			const targetContentsTop = $(targetContents).offset().top - headerHeight;
			const targetContentsBottom = targetContentsTop + $(targetContents).outerHeight() + headerHeight;

			contentsArr[i] = {
				top: targetContentsTop,
				bottom: targetContentsBottom
			};
		}
	}
}

function currentCheck($navLink, contentsArr) {
	const currentPosition = $(window).scrollTop();
	for (let i = 0; i< contentsArr.length; i++) {
		if (contentsArr[i].top <= currentPosition && currentPosition <= contentsArr[i].bottom) {
			$navLink.removeClass('current');
     	$navLink.eq(i).addClass('current');
		}
	}
}

function smoothScroll($navLink, isMobile) {
	let headerHeight;
	isMobile ?  headerHeight = 0 : headerHeight = 49;
	$navLink.click(function() {
    $('html,body').animate({
      scrollTop: $($(this).attr('href')).offset().top - headerHeight
    }, 300);
    return false;
 	});
}

function openSmallWindow() {
	const $shareBtn = $('.l-header__inner__shareLinks__item a');
	for (let i=0; i<$shareBtn.length; i++) {
		$shareBtn[i].addEventListener("click", function(e) {
      e.preventDefault();
      window.open(this.href, "SNS_window", "width=600, height=500, menubar=no, toolbar=no, scrollbars=yes");
    }, false);
	}
}

function changeLanguage() {
	const $langBtn = $('.l-about__btns__item');
	const $langText = $('.l-about__text-area__item');
	$langBtn.click(function(event) {
		$langBtn.removeClass('btnActive');
		$(this).addClass('btnActive');
		$langText.hide().removeClass('.textActive');
		const BtnId = $(this).attr("id");
		const target = '#' + BtnId.substring(0,BtnId.length-3) + 'Text';
		$(`${target}`).fadeIn(800).addClass('textActive');
		calcContentsPosition($navLink, contentsArr);
		
	});
}

function openMenu() {
	$('#menu').click(function(event) {
		$('#menuContents').addClass('isVisible');
		$('body').addClass('locked');
	});

	$('.l-header-mobile__opened__nav__item a').click(function(event) {
		$('#menuContents').removeClass('isVisible');
		$('body').removeClass('locked');
	});

	$('#close').click(function(event) {
		$('#menuContents').removeClass('isVisible');
		$('body').removeClass('locked');
	});
}