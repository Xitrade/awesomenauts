$('.post').readmore({
	speed: 75,
	maxHeight: 500
});

$('.post').readmore({
	afterToggle: function(trigger, element, expanded) {
		if(!expanded) {
			$('html, body').animate( { scrollTop: element.offset().top}, {duration:100});
		}
	}
})