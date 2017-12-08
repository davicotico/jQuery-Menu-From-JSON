# jQuery Menu from JSON
jQuery Plugins for create multilevel menus and nested select From a JSON String
## Plugins
* .renderizeMenu
* .nestedSelect

# .renderizeMenu(data[, options])

```html
    <ul id="myMenu"></ul>
```

```javascript
var items = [ { "href": "#1", "text": "Products", "icon": "fa fa-book", "children": [ { "href": "//github.com", "text": "Books", "children": [ { "href": "#", "text": "Jquery" }, { "href": "codeigniter.com", "text": "Codeigniter" }, { "href": "#", "text": "Wordpress" } ] }, { "href": "#", "text": "Software" } ] }, { "href": "sites.com", "text": "Sites", "children": [ { "href": "//codeignitertutoriales.com", "text": "My Blog" }, { "href": "#", "text": "GitHub" } ] } ];
var $menu = $('#myMenu').renderizeMenu(items);
```

# .nestedSelect(data[, options])

```html
<select id="mySelect" name="mySelect"></select>
```

```javascript
var items = [{ "value": "//github.com/davicotico", "text": "First item"}, { "value": "#1", "text": "Products", "children": [ { "value": "//github.com", "text": "Books", "children": [ { "value": "#", "text": "Jquery" }, { "value": "#", "text": "Codeigniter" }, { "value": "#", "text": "Wordpress" } ] }, { "value": "#", "text": "Software" } ] }, { "value": "#", "text": "Sites", "children": [ { "value": "//codeignitertutoriales.com", "text": "My Blog" }, { "value": "#", "text": "GitHub" } ] }, { "value": "//github.com/davicotico", "text": "Last item"} ];
var $select = $('#mySelect').nestedSelect(items, {title: '-Select an Option-'});
$select.change(function () {
    alert($(this).val());
});
```
