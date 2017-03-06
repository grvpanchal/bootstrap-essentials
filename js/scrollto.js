+ function ($) {
    'use strict';

    // SCROLLTO CLASS DEFINITION
    // ======================

    var scrto = '[data-toggle="scroll"][href*="#"]:not([href="#"])'
    var Scrollto = function (element, options) {
        this.element = '#' + $(element).attr('id')
        this.$element = $(element)
        this.options = $.extend({}, Scrollto.DEFAULTS, options)

        if (this.options.toggle) this.toggle();
    }

    Scrollto.VERSION = '0.3.0'

    Scrollto.TRANSITION_DURATION = 'slow'

    Scrollto.DEFAULTS = {
        toggle: true,
        target: '0'
    }

    Scrollto.prototype.toggle = function () {
        //if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target, hash

            if (this.$element !== undefined && this.element.indexOf('#') === 0) {
                target = $(this.element)
                hash = this.element
            } else {
                target = $(this.hash)
                hash = this.hash
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
            }

            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, Scrollto.TRANSITION_DURATION, function () {
                    setTimeout(function () {
                        window.location.hash = hash
                    }, 50)
                })

                return false
            }
        //}
    }

    // SCROLLTO PLUGIN DEFINITION
    // =======================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data = $this.data('bs.scrollto')
            var options = $.extend({}, Scrollto.DEFAULTS, $this.data(), typeof option === 'object' && option)

            if (!data) $this.data('bs.scrollto', (data = new Scrollto(this, options)))
            if (typeof option === 'string') data[option]()
        })
    }

    var old = $.fn.scrollto

    $.fn.scrollto = Plugin
    $.fn.scrollto.Constructor = Scrollto


    // SCROLLTO NO CONFLICT
    // =================

    $.fn.scrollto.noConflict = function () {
        $.fn.scrollto = old
        return this
    }


    // SCROLLTO DATA-API
    // ==============

    $(document).on('click', scrto, Scrollto.prototype.toggle)

}(jQuery);