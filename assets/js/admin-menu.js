(function($) {
	"use strict";

	$(document).ready(function($){
		/**
		 * Menu
		 * */
		// Uploading files
		var file_frame;

		$(document).on( 'click', '.button_upload_image', function( event ){

		    event.preventDefault();

		    // If the media frame already exists, reopen it.
		    if ( file_frame ) {
		        file_frame.open();
		        return;
		    }

		    var clickedID = $(this).attr('data-id');

		    // Create the media frame.
		    file_frame = wp.media.frames.downloadable_file = wp.media({
		        title: 'Choose an image',
		        button: {
		            text: 'Use image'
		        },
		        multiple: false
		    });

		    // When an image is selected, run a callback.
		    file_frame.on( 'select', function() {
		        var attachment = file_frame.state().get('selection').first().toJSON();
		        
		        $('#' + clickedID).val( attachment.url );
		        if ($('#' + clickedID).attr('data-name'))
		            $('#' + clickedID).attr('name', $('#' + clickedID).attr('data-name'));
		    });

		    // Finally, open the modal.
		    file_frame.open();
		});

		$(document).on( 'click', '.button_remove_image', function( event ){

		    var clickedID = $(this).attr('data-id');
		    $('#' + clickedID).val( '' );

		    return false;
		});

	    function update_m_nancy_menu_options(elem, shift) {
	        var current_elem = elem;
	        var depth_shift = shift;
	        var classNames = current_elem.attr('class').split(' ');

	        for (var i = 0; i < classNames.length; i+=1) {
	            if (classNames[i].indexOf('menu-item-depth-') >= 0) {
	                var depth = classNames[i].split('menu-item-depth-');
	                var id = current_elem.attr('id');

	                depth = parseInt(depth[1]) + depth_shift;
	                id = id.replace('menu-item-', '');

	                if (depth == 0) {
	                    current_elem.find('.edit-menu-item-level1-' + id).hide().find('select, input, textarea').each(function() {
	                        $(this).removeAttr('name');
	                    });
	                    current_elem.find('.edit-menu-item-level0-'+id).show().find('select, input[type="text"], textarea').each(function() {
	                        if ($(this).val()) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                    current_elem.find('.edit-menu-item-level0-'+id).find('input[type="checkbox"]').each(function() {
	                        if ($(this).is(':checked')) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                    current_elem.find('.edit-menu-item-level01-'+id).show().find('select, input[type="text"], textarea').each(function() {
	                        if ($(this).val()) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                    current_elem.find('.edit-menu-item-level01-'+id).find('input[type="checkbox"]').each(function() {
	                        if ($(this).is(':checked')) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                } else if (depth == 1) {
	                    current_elem.find('.edit-menu-item-level0-' + id).hide().find('select, input, textarea').each(function() {
	                        $(this).removeAttr('name');
	                    });
	                    current_elem.find('.edit-menu-item-level1-'+id).show().find('select, input[type="text"], textarea').each(function() {
	                        if ($(this).val()) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                    current_elem.find('.edit-menu-item-level1-'+id).find('input[type="checkbox"]').each(function() {
	                        if ($(this).is(':checked')) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                    current_elem.find('.edit-menu-item-level01-'+id).show().find('select, input[type="text"], textarea').each(function() {
	                        if ($(this).val()) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                    current_elem.find('.edit-menu-item-level01-'+id).find('input[type="checkbox"]').each(function() {
	                        if ($(this).is(':checked')) {
	                            $(this).attr('name', $(this).attr('data-name'));
	                        } else {
	                            $(this).removeAttr('name');
	                        }
	                    });
	                } else {
	                    current_elem.find('.edit-menu-item-level0-'+id).hide().find('select, input, textarea').each(function() {
	                        $(this).removeAttr('name');
	                    });
	                    current_elem.find('.edit-menu-item-level1-'+id).hide().find('select, input, textarea').each(function() {
	                        $(this).removeAttr('name');
	                    });
	                    current_elem.find('.edit-menu-item-level01-'+id).hide().find('select, input, textarea').each(function() {
	                        $(this).removeAttr('name');
	                    });
	                }
	            }
	        }
	    }

	    $(document).on('change', '.menu-item select, .menu-item textarea, .menu-item input[type="text"]', function() {
	        var that = $(this);
	        value = that.val();
	        if (value) {
	            that.attr('name', $(this).attr('data-name'));
	        } else {
	            that.removeAttr('name');
	        }
	    });

	    $(document).on('change', '.menu-item input[type="checkbox"]', function() {
	        var that = $(this);
	        value = that.is(':checked');
	        if (value) {
	            that.attr('name', $(this).attr('data-name'));
	        } else {
	            that.removeAttr('name');
	        }
	    });

	    $('#update-nav-menu').bind('click', function(e) {
	        if ( e.target && e.target.className ) {
	            if ( -1 != e.target.className.indexOf('item-delete') ) {
	                var clickedEl = e.target;
	                var itemID = parseInt(clickedEl.id.replace('delete-', ''), 10);
	                var menu_item = $('#menu-item-' + itemID);
	                var children = menu_item.childMenuItems();
	                children.each(function() {
	                    update_m_nancy_menu_options($(this), -1);
	                });
	            }
	        }
	    });

	    $( "#menu-to-edit" ).on( "sortstop", function( event, ui ) {
	        var menu_item = ui.item;
	        setTimeout(function() {
	            update_m_nancy_menu_options(menu_item, 0);
	            var children = menu_item.childMenuItems();
	            children.each(function() {
	                update_m_nancy_menu_options($(this), 0);
	            })
	        }, 200);
	    } );
		
	    // End Menu
	});
	
})(jQuery);