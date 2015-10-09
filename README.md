# JSON-to-Menu
With JQuery Plugin JSON-to-menu, you can create a Multilevel Menu like an Unordered List or an Indented Select (AKA Dropdown, ComboBox, ListBox) from a JSON String. 
# 1. How to use
## 1.1. Format: Indented Select
#### HTML Code
```
<div class="col-md-4">
  <div id="container_id"></div>
</div>
```
#### Javascript Code
```
var str_json = '[ { "value": "#", "text": "Products", "children": [ { "value": "#", "text": "Books", "children": [ { "value": "#", "text": "Jquery" }, { "value": "#", "text": "Codeigniter" }, { "value": "#", "text": "Wordpress" } ] }, { "value": "#", "text": "Software" } ] }, { "value": "#", "text": "Sites", "children": [ { "value": "//davicotico.com", "text": "My Blog" }, { "value": "#", "text": "GitHub" } ] } ]';

$(document).ready(function(){
    $('#container_id').jsontomenu({
        data: str_json, 
        type: 'select', 
        title: '-Select an Option-',
        active: '//davicotico.com'
    });
});

```
## 1.2. Format: Unordered List
You need a JSON string with this data:
```
[
{
"href": "",
"text": "",
"icon": "",
"target": "",
"alt": "",
"children": 
 [
 
 ]
}
]
```
#### HTML Code
```
<div class="col-md-4">
  <div id="container_id"></div>
</div>
```
#### Javascript Code
```
$(document).ready(function(){
    $('#container_id').jsontomenu({
        data: str_json, 
        type: 'vertical', 
        title: 'Main Menu',
        active: '//davicotico.com'
    });
});
```
