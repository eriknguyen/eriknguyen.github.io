var fullHeight = $('.__full-height');

var windowHeight = $(window).height();
fullHeight.css('min-height', windowHeight);
$(window).resize(function() {
	var windowHeight = $(window).height();
	fullHeight.css('min-height', windowHeight);
});


// TODO: dynamic pages by getting number of panels
var pages = 4;
var panelId = "#panel_";

var currentpage = (document.location.hash) ? parseInt(document.location.hash.replace('#panel_', '')) : 1;
var nextpage = (currentpage >= pages) ? pages : currentpage + 1;
var prevpage = (currentpage <= 1) ? 1 : currentpage - 1;

var animatingup = false;
var animatingdown = false;

var resizeTimer; 	// use Timeout with a timer to call scrolltocurrent only when resize event done
window.onresize = function(event) {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(scrolltocurrent, 250);
};

$(window).scroll(function(event) {

	if (animatingup || animatingdown) {
		return;
	}

	nextpage = (currentpage >= pages) ? pages : currentpage + 1;
	prevpage = (currentpage <= 1) ? 1 : currentpage - 1;

	if (!animatingup) {
		if ($(window).scrollTop() + $(window).height() >= $(panelId + (nextpage)).offset().top + 50) {
			if (nextpage > currentpage) {
				var p2 = $(panelId + (nextpage));
				var pageheight = p2.position().top;
				animatingdown = true;
				$('html, body').animate({
					scrollTop: pageheight
				}, 500, function() {
					currentpage = nextpage;
					animatingdown = false;
					document.location.hash = panelId + currentpage;
				});
				return;
			}
		}
	}

	if (!animatingdown) {
		if ($(panelId + (currentpage)).offset().top - $(window).scrollTop() >= 50) {
			if (prevpage < currentpage) {
				var p2 = $(panelId + (prevpage));
				var pageheight = p2.position().top;
				animatingup = true;
				$('html, body').animate({
					scrollTop: pageheight
				}, 500, function() {
					currentpage = prevpage;
					animatingup = false;
					document.location.hash = panelId + currentpage;
				});
				return;
			}
		}
	}

});

function scrolltocurrent() {
	var p2 = $(panelId + (currentpage));
	var pageheight = p2.position().top;
	$('html, body').animate({
		scrollTop: pageheight
	}, 200);
}