# jQuery Menu from JSON
jQuery Plugins for create multilevel menus and nested select From a JSON String
## Plugins
* .renderizeMenu
* .nestedSelect

## Requirements
* jQuery >= 1.10

## Usage
```html
<script src="jquery.min.js"></script>
<script type="text/javascript" src="renderMenu.js"></script>
```

# .renderizeMenu(data[, options])
Create an unorder list with the id attribute
```html
    <ul id="myMenu"></ul>
```
Renderize the menu from a json string or array
```javascript
var items = [ { "href": "#1", "text": "Products", "icon": "fa fa-book", "children": [ { "href": "//github.com", "text": "Books", "children": [ { "href": "#", "text": "Jquery" }, { "href": "codeigniter.com", "text": "Codeigniter" }, { "href": "#", "text": "Wordpress" } ] }, { "href": "#", "text": "Software" } ] }, { "href": "sites.com", "text": "Sites", "children": [ { "href": "//codeignitertutoriales.com", "text": "My Blog" }, { "href": "#", "text": "GitHub" } ] } ];
var $menu = $('#myMenu').renderizeMenu(items);
```
Setting the options and use it with another plugin.

# .nestedSelect(data[, options])
Create a select with the id attribute
```html
<select id="mySelect" name="mySelect"></select>
```
Renderize the select from a json string or array
```javascript
var items = [{ "value": "//github.com/davicotico", "text": "First item"}, { "value": "#1", "text": "Products", "children": [ { "value": "//github.com", "text": "Books", "children": [ { "value": "#", "text": "Jquery" }, { "value": "#", "text": "Codeigniter" }, { "value": "#", "text": "Wordpress" } ] }, { "value": "#", "text": "Software" } ] }, { "value": "#", "text": "Sites", "children": [ { "value": "//codeignitertutoriales.com", "text": "My Blog" }, { "value": "#", "text": "GitHub" } ] }, { "value": "//github.com/davicotico", "text": "Last item"} ];
var $select = $('#mySelect').nestedSelect(items, {title: '-Select an Option-'});
$select.change(function () {
    alert($(this).val());
});
```

### How it works
```
[root class="nav navbar-nav mr-auto"]
    [item class="nav-item"][link="nav-link"] ... [/link][/item]
    [item class="nav-item"][link="nav-link"] ... [/link][/item]
    [itemHasMenu class="nav-item dropdown"]
        [linkHasMenu class="nav-link dropdown-toggle"] ... [/linkHasMenu]
            [menu class="dropdown-menu"]
                [menuItem class=""][menuLink class="dropdown-item"] ... [/menuLink][/menuItem]
                [menuItem class=""][menuLink class="dropdown-item"] ... [/menuLink][/menuItem]
                [menuItemHasSubmenu class="dropdown"][menuLinkHasSubmenu class="dropdown-item dropdown-toggle"] ... [/menuLinkHasSubmenu]
                    [submenu class="dropdown-menu"]
                        [menuItem class=""][menuLink class="dropdown-item"] ... [/menuLink][/menuItem]
                    [/submenu]
                [/menuItemHasSubmenu]
            [/menu]
    [/itemHasMenu]
[/root]
```
