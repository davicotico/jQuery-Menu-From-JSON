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
    $.fn.menuSelect = function(options){
        var settings = $.extend({
            data: null,
            name: null,
            id: null,
            active: window.location.href,
            title: '',
            group: false,
            bullet: '- '
        }, options);
        try {
            var objJson = JSON.parse(settings.data);
        } catch (e) {
            var objJson = null;
            return null;
        }
        if (this.prop('tagName')!=='SELECT'){
            return createSelect(this, objJson, settings.active);
        } else{
            fillSelect(this, objJson, settings.active);
            return this;
        }
        function createSelect(jqContainer, items, active) {
            var $select = $('<select>');
            $select.attr('id', settings.id).attr('name', settings.name);
            if (settings.title !== '') {
                var $opt = $('<option>').append(settings.title).val("");
                $select.append($opt);
            }
            var $element = jqContainer;
            $element.append($select);
            fillSelect($('#' + settings.id), items, active);
            return $select;
        }
        function fillSelect(jqContainer, arrayItem, active, level){
            var $element = jqContainer;
            level = (typeof (level) === 'undefined') ? 0 : level;
            $.each(arrayItem, function (k, v) {
                var isParent = ((typeof (v.children) !== "undefined") && ($.isArray(v.children)));
                var $opt = $('<option>');
                if (active === v.value) {
                    $opt.addClass('active').prop('selected', true);
                }
                var bullet = (level === 0) ? '' : settings.bullet;
                if ((!settings.group)||((level===0)&&(!isParent))){
                    console.log(k+'::: isParent:'+isParent+ ', Level:'+level+', group:'+settings.group);
                    $opt.val(v.value).append(str_repeat('&nbsp;', level)).append(bullet + v.text);
                    $element.append($opt);
                }
                if (isParent) {
                    if ((settings.group)){
                        createGroup($element, v.text, v.children);
                    } else{
                        fillSelect(jqContainer, v.children, active, level + 2);
                    }
                }
            });
        }
        function createGroup(jqContainer, title, items){
            var $group = $('<optgroup>').attr('label', title);
            $.each(items, function(k, v){
                var $opt = $('<option>');
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
            title: '',
            id: null,
            class: '',
            ulParentClass: '',
            aParentClass: '',
            dropdownIcon: null
        }, options);
        try {
            var objJson = JSON.parse(settings.data);
        } catch (e) {
            var objJson = null;
            return null;
        }
        if (this.prop('tagName')!=='UL'){
            return createMenu(this, objJson, settings.active);
        } else {
            renderMenu(this, objJson, settings.active);
            return this;
        }
        function createMenu(container, items, active, depth) {
            var $ulRoot = $('<ul>').addClass(settings.class);
            $ulRoot.attr('id', settings.id);
            if (settings.title !== '') {
                var $li = $('<li>').addClass('header').html(settings.title);
                $ulRoot.append($li);
            }
            var $element = container;
            var $m = renderMenu($ulRoot, items, active, depth);
            $element.append($m);
            return $ulRoot;
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
                if (v.href==='#'){
                    v.href = 'javascript:void(0)';
                }
                var $a = $('<a>').attr('href', v.href);
                if (active===v.href){
                    $li.addClass('active');
                }
                var $i = $('<i>').addClass(v.icon);
                $a.append($i).append("&nbsp;").append(v.text);
                if ((isParent)&&(settings.dropdownIcon!==null)){
                    $a.append('&nbsp;').append(settings.dropdownIcon);
                }
                if ((isParent)&&(settings.aParentClass!==''))
                {
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