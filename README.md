# JSON to Menu
jQuery Plugin for create multilevel menus from a JSON String
## Features
* Create a Multilevel Menu as Unordered List
* Create a multilevel select (Indented)
## How to use
```html
<aside class="col-md-3">
    <nav class="sidebar-nav">
    <ul id="myMenu"></ul>
    </nav>
</aside>
```
```javascript
var items = [ { "href": "#1", "text": "Products", "icon": "fa fa-book", "children": [ { "href": "//github.com", "text": "Books", "children": [ { "href": "#", "text": "Jquery" }, { "href": "codeigniter.com", "text": "Codeigniter" }, { "href": "#", "text": "Wordpress" } ] }, { "href": "#", "text": "Software" } ] }, { "href": "sites.com", "text": "Sites", "children": [ { "href": "//codeignitertutoriales.com", "text": "My Blog" }, { "href": "#", "text": "GitHub" } ] } ];
                var $menu = $('#myMenu').renderizeMenu({data: items, active: 'sites.com', rootClass: "metismenu", aParentClass: "has-arrow"});
```
