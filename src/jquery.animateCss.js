
(function($) {

	var Animate = (function() {
		var _this = this,
			$window = $(window),
			onceInitFlag = false,
			defaultOptions = {
				throttleTime: 150
			};

		this.watchElements = [];

		this.throttleScroll = throttle(function() {
			var st = $window.scrollTop();
			_this.calculateIsShow(st);
		}, 150);

		this.onceInit = function() {
			if (onceInitFlag) {
				return;
			}
			onceInitFlag = true;

			$window.scroll(_this.throttleScroll);
		}

		this.calculateIsShow = function(scrollTop) {
			for(var i = 0; i < _this.watchElements.length; i++) {
				if(_this.watchElements[i].offset().top <= scrollTop + $window.height()) {
					_this.applyAnimatiClass(_this.watchElements[i], i);
				}
			}
		}

		this.applyAnimatiClass = function($el ,index) {
			var animateClass = $el.data('animate'),
				delay = $el.data('delay');

			if (animateClass) {
				$el.addClass(animateClass).trigger('animateIn')
			}

			if (delay) {
				$el.css({
					'-webkit-animation-delay': delay,
					'animation-delay': delay
				});
			}

			_this.removeFromWatch(index);
		}

		this.addToWatch = function(item) {
			_this.watchElements.push($(item));
			_this.throttleScroll();
		}

		this.removeFromWatch = function(index) {
			_this.watchElements.splice(index, 1);
		}

		this.initPlugin = function(options) {
			var $elements = this;
			var settings = $.extend(defaultOptions, options);

			$elements.each(function(i, item) {
				_this.addToWatch(item);
			});

			_this.onceInit();
		}
		return this;
	})();

	$.fn.AnimatedElement = Animate.initPlugin;
	$.fn.animateCss = Animate.initPlugin;

	function throttle(fn, threshhold, scope) {
		threshhold || (threshhold = 250);
		var last,
			deferTimer;
		return function () {
			var context = scope || this;

			var now = +new Date,
				args = arguments;
			if (last && now < last + threshhold) {
				// hold on to it
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function () {
					last = now;
					fn.apply(context, args);
				}, threshhold);
			} else {
				last = now;
				fn.apply(context, args);
			}
		};
	}

})(jQuery);
