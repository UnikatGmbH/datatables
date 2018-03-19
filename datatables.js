/*! UX DataTables 0.1.0
 *  ©2018-2018 Unikat GmbH
 */

/**
 * @summary DataTables
 * @description
 * @version 0.1.0
 * @file datatables.js
 * @author Unikat GmbH
 * @contact www.das-unikat.com
 * @copyright Copyright 2018-2018 Unikat GmbH
 */

(function($) {
	"use strict";
    
    $.fn.dataTable = function(options) {
	    /**
         * Plugin settings
	     */
	    var settings = $.extend({}, $.fn.dataTable.defaults, options);
        var $this = $(this);

        $.fn.dataTable.defaults = {};
	
	    /**
         * Get the plugin options
         *
	     * @param name
	     * @param value
	     * @returns {*}
	     */
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
	
	    /**
         * Global header and body selectors
	     */
	    var header, body;
	
	    /**
         * Build the table structure for the plugin
         *
	     * @private
	     */
	    var _fbBuildStructure = function () {
            $this.addClass('ux-datatable');

            header = $this.find('thead').addClass('ux-datatable__header');
            header.find('tr').addClass('ux-datatable__header-row');
            header.find('th').addClass('ux-datatable__header-column');

            body = $this.find('tbody').addClass('ux-datatable__body');
            body.find('tr').addClass('ux-datatable__body-row');
            body.find('td').addClass('ux-datatable__body-column');
        };
	
	    /**
         * Get the browser scrollbar width
         *
	     * @returns {number}
	     * @private
	     */
        var _fnGetScrollbarWidth = function () {
            var outer = document.createElement("div");
            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

            document.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;
            outer.style.overflow = "scroll";
            
            var inner = document.createElement("div");
            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;
            
            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        };
	
	    /**
         * Get the full height of the inner table body
         *
	     * @returns {number}
	     * @private
	     */
        var _fnGetBodyHeight = function () {
            var height = 0;

            body.find('tr').each(function() {
                height += ($(this).height() + 1);
            });

            return height - 1;
        };
	
	    /**
         * Adjust the table when there is or is not a browser scrollbar
         *
	     * @private
	     */
	    var _fnAdjustForScrollbar = function () {
		    /**
             * If body larger than given height, adjust header for scrollbar
		     */
		    if(body[0].scrollHeight > 400) {
                header.css('padding-right', _fnGetScrollbarWidth());
            }
		    /**
             * If body smaller than given height, adjust body height to fit content
		     */
		    else {
                body.css('height', _fnGetBodyHeight());
            }
        };
	
	    /**
         * Initialize the plugin
	     */
	    var init = function () {
            _fbBuildStructure();
            _fnAdjustForScrollbar();

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