"use strict";

(function($) {
    $.fn.dataTable = function(options) {
        var settings = $.extend({}, $.fn.dataTable.defaults, options);
        var $this = $(this);

        $.fn.dataTable.defaults = {};

        $.fn.dataTable.option = function (name, value) {
            name = name || false;
            value = value || false;

            if(!name) {
                console.log("Option name missing");
                return;
            }
            if(!value) {
                if(settings.hasOwnProperty(name)) {
                    return settings[name];
                } else {
                    console.warn("Option " + name + " does not exist");
                }
            } else {
                if(settings.hasOwnProperty(name)) {
                    settings[name] = value;
                } else {
                    console.warn("Option " + name + " does not exist");
                }
            }
        };

        var header, body;

        var buildStructure = function () {
            $this.addClass('ux-datatable');

            header = $this.find('thead').addClass('ux-datatable__header');
            header.find('tr').addClass('ux-datatable__header-row');
            header.find('th').addClass('ux-datatable__header-column');

            body = $this.find('tbody').addClass('ux-datatable__body');
            body.find('tr').addClass('ux-datatable__body-row');
            body.find('td').addClass('ux-datatable__body-column');
        };

        var getScrollbarWidth = function () {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            // force scrollbars
            outer.style.overflow = "scroll";

            // add innerdiv
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            // remove divs
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        };

        var getBodyHeight = function () {
            var height = 0;

            body.find('tr').each(function() {
                height += ($(this).height() + 1);
            });

            return height - 1;
        };


        var adjustForScrollbar = function () {
            if(body[0].scrollHeight > 400) {
                header.css('padding-right', getScrollbarWidth());
            } else {
                body.css('height', getBodyHeight());
            }
        };

        var init = function () {
            buildStructure();
            adjustForScrollbar();

            body.on('scroll', function() {
                if(body.scrollTop() > 0) {
                    header.addClass('h-border-bottom');
                }
                else {
                    header.removeClass('h-border-bottom');
                }
            });
        };

        init();
    };
})(jQuery);