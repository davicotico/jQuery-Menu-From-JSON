/**
* Jquery Multilevel Menu from JSON String
* 2017 - youtube.com/user/davicotico
* @autor David Ticona Saravia
* @version 1.0
* @abstract Create Multilevel Menu from JSON String.
* Formats availables: Vertical menu(Unordered list), Horizontal menu(Unorder list) and Select (Combobox)
* 
*/
(function($){
	$.fn.jsontomenu = function(options){
		var settings = $.extend({
			data: null,
			active: window.location.href,
			title: '',
			type: 'list'
		}, options);
		try {
			var objJson = jQuery.parseJSON(settings.data);
		} catch (e) {
			var objJson = null;
		}
		if(objJson!==null){
			switch (settings.type){
				case 'list' : 
					var result = create_vmenu(objJson, settings.active);
					this.append(result);
					jQuery('li.active').parents('.treeview').addClass('active');
					break;
				case 'fill_select' :
					var result = fill_select(objJson, settings.active);
					this.append(result);
					break;
                case 'select' :
					var result = create_select(objJson, settings.active);
					this.append(result);
					break;
				default : var result = create_vmenu(objJson, settings.active);
			}
			return this;
		}else{
			console.log('Error: JSON Format Incorrect');
		}
		/* Create a Select (Combobox) */
		function create_select(options, active){
			var html = '<select id="'+ settings.id +'" class="form-control">';
            if(settings.title !== ''){
                html += '<option>'+ settings.title +'</option>';
            }
			html += fill_select(options, active);
			html += '</select>';
            return html;
		}
		/* Fill a Select (Combobox) */
		function fill_select(arrayItem, active, level){
			var html = '';
			var level = (typeof(level)==='undefined') ? 0 : level;
			$.each(arrayItem, function(k, v){
				html += '<option ';
				if (active===v.value){
					html += 'selected class="active" ';
				}
				if(level===0){ bullet = '';} else{ bullet = '- ';}
				html += ' value="'+ v.value +'">'+ str_repeat("&nbsp;" , level ) + bullet +v.text +'</option>';
				if ((typeof(v.children) !== "undefined") && ($.isArray(v.children))){
					html += fill_select(v.children, active, level+2);
				}
			});
			return html;
		}
		/*Private Function: Vertical Menu*/
		function create_vmenu(arrayItem, active, level){
			var html = '', has_child = false;
			var level = (typeof(level)==='undefined') ? 0 : level;
			if (level===0){
				html = '<ul class="sidebar-menu">';
                html +=(settings.title!=='') ? '<li class="header">'+ settings.title +'</li>' : '';
			}else{
				html = '<ul class="tree-view-menu">';
			}
			$.each(arrayItem, function(k, v){
				if ((typeof(v.children) !== "undefined") && ($.isArray(v.children))){
					html += '<li class="treeview"><a href="#">';
					html += '<i class="'+ v.icon +'"></i>';
					html += '<span>'+ v.text +'</span><i class="fa fa-angle-left pull-right"></i></a>';
					has_child = true;
				}else{
					html += '<li';
					if (active === v.text){
						html += ' class ="active" ';
					}
					html += '><a title="'+ v.alt +'" href="'+ v.href +'" target="'+ v.target +'">';
					html += '<i class="'+ v.icon +'"></i>';
					html += '<span>'+ v.text +'</span></a>';
					has_child = false;
				}
				if (has_child === true){
					html += create_vmenu(v.children, active, level+1);
				}
				html +=  '</li>';
			});
			html += '</ul>';
			return html;
		}
		function str_repeat(input, multiplier) {
			var y = '';
			while (true) {
				if (multiplier & 1){
					y += input;
				}
				multiplier >>= 1;
				if (multiplier){
					input += input;
				} else {
					break;
				}
			}
			return y;
		}
	};
}(jQuery));
