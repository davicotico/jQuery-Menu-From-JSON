/**
 * Create Multilevel Menu from JSON String.
 * Unordered list and Select (Combobox)
 * @autor David Ticona Saravia <david.ticona.saravia@gmail.com>
 * @version 1.0
 * @param {jQuery} $ 
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
    $.fn.nestedSelect = function (data, options) {
        var settings = $.extend({
            active: window.location.href,
            title: '',
            group: false,
            bullet: '- ',
            propertyValue: 'value'
        }, options);
        if (this.prop('tagName') !== 'SELECT') {
            return null;
        }
        var arrJson = data;
        if (typeof data === 'string') {
            try {
                arrJson = JSON.parse(data);
            } catch (e) {
                return null;
            }
        }
        if (settings.title !== '') {
            this.append($('<option>').append(settings.title).val(""));
        }
        populateSelect(this, arrJson, settings.active);
        return this;
        function populateSelect(jqContainer, arrayItem, active, level) {
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
                        populateSelect(jqContainer, v.children, active, level + 2);
                    }
                }
            });
        }
        function createGroup(jqContainer, title, items) {
            var $group = $('<optgroup>').attr('label', title);
            for (var i=0, len=items.length; i<len; i++){
                let $opt = $('<option>').val(items[i].value).append(settings.bullet + items[i].text);
                $group.append($opt);
            }
            jqContainer.append($group);
        }
    };

    $.fn.renderizeMenu = function (data, options) {
        var settings = $.extend({
            active: window.location.href,
            rootClass: '',
            ulParentClass: '',
            aParentClass: '',
            dropdownIcon: null
        }, options);
        var arrJson = data;
        if (this.prop('tagName') !== 'UL') {
            return null;
        }
        if (typeof data === 'string') {
            try {
                arrJson = JSON.parse(data);
            } catch (e) {
                return null;
            }
        }
        this.addClass(settings.rootClass);
        buildList(this, arrJson, settings.active);
        return this;
        function buildList(jqContainer, arrayItem, active, depth) {
            var level = (typeof (depth) === 'undefined') ? 0 : depth;
            var $elem;
            if (level === 0) {
                $elem = jqContainer;
            } else {
                $elem = $('<ul>').addClass(settings.ulParentClass);
            }
            $.each(arrayItem, function (k, v) {
                let isParent = (typeof (v.children) !== "undefined") && ($.isArray(v.children));
                let $li = $('<li>');
                $li.attr('id', v.text);
                if (v.href === '#') {
                    v.href = 'javascript:void(0)';
                }
                var $a = $('<a>').attr('href', v.href);
                if (v.hasOwnProperty('target'))
                    $a.attr('target', v.target);
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
                    $li.append(buildList(jqContainer, v.children, active, level + 1));
                }
                $elem.append($li);
            });
            return $elem;
        }
    };
}(jQuery));
