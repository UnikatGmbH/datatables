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

        var init = function () {
            buildStructure();

            body.on('scroll', function() {
                if(body.scrollTop() > 0) {
                    header.addClass('sticky');
                }
                else {
                    header.removeClass('sticky');
                }
            });
        };

        init();
    };
})(jQuery);