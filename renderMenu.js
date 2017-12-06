/**
 * Jquery Multilevel Menu from JSON String
 * @autor David Ticona Saravia
 * @version 1.0
 * @abstract Create Multilevel Menu from JSON String.
 * Formats availables: Unordered list and Select (Combobox)
 * 
 */
(function ($) {
    function str_repeat(input, multiplier) {
        var y = '';
        while (true) {
            if (multiplier & 1) {
                y += input;
            }
            multiplier >>= 1;
            if (multiplier) {
                input += input;
            } else {
                break;
            }
        }
        return y;
    }
    
    $.fn.menuSelect = function (options) {
        var settings = $.extend({
            data: null,
            active: window.location.href,
            title: '',
            group: false,
            bullet: '- ',
            propertyValue: 'value'
        }, options);
        var arrJson = settings.data;
        if (typeof settings.data === 'string') {
            try {
                arrJson = JSON.parse(settings.data);
            } catch (e) {
                return null;
            }
        }
        if (this.prop('tagName') === 'SELECT') {
            if (settings.title !== '') {
                let $opt = $('<option>').append(settings.title).val("");
                this.append($opt);
            }
            fillSelect(this, arrJson, settings.active);
            return this;
        } else {
            return null;
        }

        function fillSelect(jqContainer, arrayItem, active, level) {
            var $element = jqContainer;
            level = (typeof (level) === 'undefined') ? 0 : level;
            $.each(arrayItem, function (k, v) {
                var isParent = ((typeof (v.children) !== "undefined") && ($.isArray(v.children)));
                var $opt = $('<option>');
                var value = v[settings.propValue];
                if (active === value) {
                    $opt.addClass('active').prop('selected', true);
                }
                var bullet = (level === 0) ? '' : settings.bullet;
                if ((!settings.group) || ((level === 0) && (!isParent))) {
                    $opt.val(value).append(str_repeat('&nbsp;', level)).append(bullet + v.text);
                    $element.append($opt);
                }
                if (isParent) {
                    if ((settings.group)) {
                        createGroup($element, v.text, v.children);
                    } else {
                        fillSelect(jqContainer, v.children, active, level + 2);
                    }
                }
            });
        }
        function createGroup(jqContainer, title, items) {
            var $group = $('<optgroup>').attr('label', title);
            $.each(items, function (k, v) {
                let $opt = $('<option>');
                $opt.val(v.value).append(settings.bullet + v.text);
                $group.append($opt);
            });
            jqContainer.append($group);
        }
    };

    $.fn.menuList = function (options) {
        var settings = $.extend({
            data: null,
            active: window.location.href,
            ulParentClass: '',
            aParentClass: '',
            dropdownIcon: null
        }, options);
        var arrJson = settings.data;
        if (typeof settings.data === 'string') {
            try {
                arrJson = JSON.parse(settings.data);
            } catch (e) {
                return null;
            }
        }

        if (this.prop('tagName') === 'UL') {
            renderMenu(this, arrJson, settings.active);
            return this;
        } else {
            return null;
        }

        function renderMenu(jqContainer, arrayItem, active, depth) {
            var level = (typeof (depth) === 'undefined') ? 0 : depth;
            var $elem;
            if (level === 0) {
                $elem = jqContainer;
            } else {
                $elem = $('<ul>').addClass(settings.ulParentClass);
            }
            $.each(arrayItem, function (k, v) {
                var isParent = (typeof (v.children) !== "undefined") && ($.isArray(v.children));
                var $li = $('<li>');
                $li.attr('id', v.text);
                if (v.href === '#') {
                    v.href = 'javascript:void(0)';
                }
                var $a = $('<a>').attr('href', v.href);
                if (active === v.href) {
                    $li.addClass('active');
                }
                let $i = $('<i>').addClass(v.icon);
                $a.append($i).append("&nbsp;").append(v.text);
                if ((isParent) && (settings.dropdownIcon !== null)) {
                    $a.append('&nbsp;').append(settings.dropdownIcon);
                }
                if ((isParent) && (settings.aParentClass !== '')) {
                    $a.addClass(settings.aParentClass);
                }
                $li.append($a);
                if (isParent) {
                    $li.append(renderMenu(jqContainer, v.children, active, level + 1));
                }
                $elem.append($li);
            });
            return $elem;
        }
    };
}(jQuery));
