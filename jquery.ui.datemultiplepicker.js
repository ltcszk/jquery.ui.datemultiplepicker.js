/*!
* jquery.ui.datemultiplepicker.js
* https://github.com/ltcszk/jquery.ui.datemultiplepicker.js
*
* Copyright 2012, ltcszk
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
(function ($) {
    var defaultsetting = {
        numberOfMonths: 1,
        // showButtonPanel: true,
        minDate: 0,
        maxDate: 700,
        dateFormat: "yy-mm-dd"
    }

    $.extend(
					$.fn,
					{

					    datemultiplepicker: function (setting) {
					        var selecteddays = [];
					        var ps = $.extend({}, defaultsetting, setting);
					        var isinput = false;
					        var $div = this;

					        //避免受外部样式影响
					        var tdiv = $("<span/>");
					        $div.after(tdiv);
					        $div.css('position', 'absolute');
					        $('body').append($div);
					        var _hide = $.fn.hide;
					        $.fn.hide = function (speed, callback) {
					            if (this[0] == $div[0])
					                _hide.apply(tdiv, arguments);
					            return _hide.apply(this, arguments);
					        }
					        var _show = $.fn.show;
					        $.fn.show = function (speed, callback) {
					            if (this[0] == $div[0])
					                _show.apply(tdiv, arguments);
					            return _show.apply(this, arguments);
					        }
					        var _toggle = $.fn.toggle;
					        $.fn.toggle = function (speed, callback) {
					            if (this[0] == $div[0])
					                _toggle.apply(tdiv, arguments);
					            return _toggle.apply(this, arguments);
					        }
					        //-------------------------
					        var _onSelect = ps.onSelect;
					        ps.onSelect = function (dateStr, inst) {
					            var _i = $.inArray(dateStr, selecteddays);
					            if (_i > -1)
					                selecteddays.splice(_i, 1);
					            else
					                selecteddays.push(dateStr);
					            if (isinput) {
					                ps.input.val(selecteddays.join(','));
					            }
					            _onSelect && _onSelect.apply(this, arguments)
					        }



					        $div.datepicker(ps);
					        var refresh = function () {
					            $div.show();
					            tdiv.width($div.width());
					            tdiv.height($div.height());
					            //$div.css('z-index', 1000000);
					            $div.offset(tdiv.offset());
					        }
					        $div.data('refresh', refresh);
					        refresh();
					        if (ps.input && ps.input.is(':input')) {
					            isinput = true;
					            var _iv = ps.input.val();

					            _iv && (selecteddays = _iv.split(','));
					        }
					        this.data('value', selecteddays);
					        // $.datepicker.setDefaults( $.datepicker.regional[
					        // "zh-CN" ] );
					        var $div = $(this);

					        var _updateDatepicker = $.datepicker._updateDatepicker;
					        $.datepicker._updateDatepicker = function (inst) {
					            _updateDatepicker.apply(this, arguments);
					            var self = this;

					            // 注入_____________________________________
					            if (inst.input[0] == $div[0]) {
					                var $a = $div.find('a.ui-state-default');
					                _selecteddays = selecteddays.slice(0);
					                $a.each(function () {
					                    var _a = $(this);
					                    var _p = _a.parent();
					                    var _da = self._formatDate(inst, _a
												.text(), _p.data('month'), _p
												.data('year'));

					                    var _i = $.inArray(_da, _selecteddays);

					                    if (_i > -1) {
					                        _a.addClass('ui-state-active');
					                        // _a.css('color', 'red');
					                        _selecteddays.splice(_i, 1);

					                    } else {
					                        _a.removeClass('ui-state-active')
					                        // _a.css('color', 'black');

					                    }
					                    _a.removeClass('ui-state-highlight');
					                });
					            }
					            // alert(1);
					            // ________________________
					        }
					        this.datepicker("refresh");
					        return this;
					    },

					    getvalue: function () {
					        return this.data('value');
					    },
					    datemultiplepickerrefresh: function () {
					        var refresh = this.data('refresh');
					        refresh();
					    }
					});
})(jQuery);