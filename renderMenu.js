/**
 * Create a Multilevel Menu from JSON String.
 * Unordered list and Select (Combobox)
 * @autor David Ticona Saravia <david.ticona.saravia@gmail.com>
 * @version 0.9.0
 * @param {jQuery} $ 
 */
(function ($) {
    $.fn.setClass = function(classes) {
        this.attr('class', classes);
        return this;
    };
    $.fn.renderizeMenu = function (data, options) {
        var settings = $.extend({
            active: window.location.href,
            activeClass: 'active',
            rootClass: '',
            itemClass: null,
            linkClass: null,
            itemHasMenuClass: null,
            linkHasMenuClass: null,
            menuClass: null,
            menuItemClass: null,
            menuLinkClass: null,
            menuItemHasSubmenuClass: null,
            menuLinkHasSubmenuClass: null,
            submenuClass: null,
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
        this.setClass(settings.rootClass);
        var _settings = {
            menuClass: settings.menuClass, 
            itemClass: settings.itemClass,
            linkClass: settings.linkClass,
            itemHasMenuClass: settings.itemHasMenuClass,
            linkHasMenuClass: settings.linkHasMenuClass
        };
        buildList(this, arrJson, settings.active, 0);
        return this;
        
        function buildList($container, arrayItem, active, depth) {
            var level = (typeof (depth) === 'undefined') ? 0 : depth;
            var $elem;
            if (level === 0) {
                $elem = $container;
            } else {
                $elem = $('<ul>').setClass(options.menuClass);
            }
            $.each(arrayItem, function (k, v) {
                var isParent = (typeof (v.children) !== "undefined") && ($.isArray(v.children));
                _settings = {
                    menuClass: settings.menuClass,
                    itemClass: settings.itemClass,
                    linkClass: settings.linkClass,
                    itemHasMenuClass: settings.itemHasMenuClass,
                    linkHasMenuClass: settings.linkHasMenuClass
                };
                if (level>=1) {
                    _settings = {
                        menuClass: settings.submenuClass, 
                        itemClass: settings.menuItemClass,
                        linkClass: settings.menuLinkClass,
                        itemHasMenuClass: settings.menuItemHasSubmenuClass,
                        linkHasMenuClass: settings.menuLinkHasSubmenuClass
                    };
                }
                var $li = $('<li>').setClass(_settings.itemClass);
                if ((v.href === '#') || (isParent)) {
                    v.href = 'javascript:void(0)';
                }
                var $a = $('<a>').attr('href', v.href).setClass(_settings.linkClass);
                if (v.hasOwnProperty('target'))
                    $a.attr('target', v.target);
                if (v.hasOwnProperty('title'))
                    $a.attr('title', v.title);
                if (active === v.href) {
                    $a.addClass(settings.activeClass);
                }
                var $i = $('<i>').addClass(v.icon);
                $a.append($i).append("&nbsp;").append(v.text);
                if ((isParent) && (settings.dropdownIcon !== null)) {
                    $a.append('&nbsp;').append(settings.dropdownIcon);
                }
                if (isParent) {
                    $li.setClass(_settings.itemHasMenuClass);
                    $a.setClass(_settings.linkHasMenuClass);
                }
                $li.append($a);
                if (isParent) {
                    $li.append(buildList($container, v.children, active, level + 1));
                }
                $elem.append($li);
            });
            return $elem;
        }
    };
    
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
                var value = v[settings.propertyValue];
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
                var $opt = $('<option>').val(items[i].value).append(settings.bullet + items[i].text);
                $group.append($opt);
            }
            jqContainer.append($group);
        }
    };
}(jQuery));