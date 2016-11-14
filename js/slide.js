+ function($) {
    'use strict';

    // SLIDE PUBLIC CLASS DEFINITION
    // ================================

    var Slide = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Slide.DEFAULTS, options)
        this.$trigger = $('[data-toggle="slide"][href="#' + element.id + '"],' +
            '[data-toggle="slide"][data-target="#' + element.id + '"],' +
            '[data-toggle="slide-in"][href="#' + element.id + '"],' +
            '[data-toggle="slide-in"][data-target="#' + element.id + '"]')
        this.isShown = null
        this.$backdrop = null
        this.addAriaAndSlideClass(this.$element, this.$trigger)

        if (this.options.toggle) this.toggle()
    }

    Slide.VERSION = '0.1.0'

    Slide.DEFAULTS = {
        toggle: true,
        backdrop: true
    }

    Slide.prototype.backdrop = function($element) {
        if (this.isShown && this.options.backdrop) {
            $(document.createElement('div'))
                .addClass('slide-modal modal-backdrop fade')
                .prependTo($element)
            this.$backdrop = $('.slide-modal.modal-backdrop')
        }
    }

    Slide.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }

    Slide.prototype.show = function() {

        if (this.transitioning || this.$element.hasClass('in')) return

        var startEvent = $.Event('show.bs.slide')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return

        this.$element
            .addClass('in')
            
        if (this.$trigger.attr('data-toggle') == "slide-in") {
            this.backdrop('.navbar-slide-nav')
            if (this.$backdrop != null) {
                this.$backdrop
                    .addClass('in')
                    .css('z-index', '1')
            }
        } else {
            this.$element.closest('.navbar-slide-nav.navbar')
                .addClass('slide-active')

            this.$element.closest('.navbar-slide-nav.navbar')
                .nextAll('div')
                .addClass('slide-active')

            $('html, body').css('overflow-x', 'hidden');

            if (this.$element.closest('.navbar').hasClass('navbar-fixed-top')) {
                this.backdrop('body')
                if (this.$backdrop != null) {
                    this.$backdrop
                        .addClass('in')
                        .css('z-index', '1029')
                }
            } else {
                this.backdrop('.navbar-slide-nav')
                this.$backdrop
                    .addClass('in')
                    .css('z-index', '1')
            }
        }
        this.$trigger
            .removeClass('slided')
            .attr('aria-expanded', true)
    }

    Slide.prototype.hide = function() {

        if (this.transitioning || !this.$element.hasClass('in')) return

        var startEvent = $.Event('hide.bs.slide')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented()) return


        this.$element
            .removeClass('in')
            .attr('aria-expanded', false)

        this.removeBackdrop()

        $('.navbar-slide-nav.navbar ~ *, .navbar-slide-nav.navbar')
            .removeClass('slide-active')
        
        $('html, body').css('overflow-x', '');

        this.$trigger
            .addClass('slided')
            .attr('aria-expanded', false)


    }

    Slide.prototype.toggle = function() {
        this.isShown = true
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

    Slide.prototype.addAriaAndSlideClass = function($element, $trigger) {
        var isOpen = $element.hasClass('in')

        $element.attr('aria-expanded', isOpen)
        $trigger
            .attr('aria-expanded', isOpen)
    }

    function getTargetFromTrigger($trigger) {
        var href
        var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

        return $(target)
    }

    // SLIDE PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this)

            var data = $this.data('bs.slide')
            var options = $.extend({}, Slide.DEFAULTS, $this.data(), typeof option == 'object' && option)

            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
            if (!data) $this.data('bs.slide', (data = new Slide(this, options)))
            if (typeof option == 'string') data[option]()
        });


    }

    var old = $.fn.slide

    $.fn.slide = Plugin
    $.fn.slide.Constructor = Slide


    // SLIDE NO CONFLICT
    // ====================

    $.fn.slide.noConflict = function() {
        $.fn.slide = old
        return this
    }


    // SLIDE DATA-API
    // =================

    $(document).on('click', '[data-toggle="slide"], [data-toggle="slide-in"]', function(e) {
        var $this = $(this)

        if (!$this.attr('data-target')) e.preventDefault()

        var $target = getTargetFromTrigger($this)
        var data = $target.data('bs.slide')
        var option = data ? 'toggle' : $this.data()

        Plugin.call($target, option)
    })
    $(document).on('click', '.slide-modal, .navbar-slide-nav.navbar ~ *', function() {
        if ($('.navbar .navbar-slide').hasClass('in')) {
            $('.navbar .navbar-toggle').click()
        }
    })
}(jQuery);