"use strict";

/* ====================================== */
/* Reset and rearrange Stretched Column
/* ====================================== */
var thsn_rearrange_stretched_col = function( model_id ) {
	if( jQuery('body').hasClass('elementor-editor-active') ){
		jQuery( '*[data-id="'+model_id+'"]' ).each(function(){
			jQuery('.thsn-stretched-div', this).remove();
			jQuery('.elementor-widget-wrap', this).removeAttr('style');
			setTimeout(function(){ thsn_stretched_col(); }, 50);
		});	
	}
}

/* ====================================== */
/* Stretched Column
/* ====================================== */
var thsn_stretched_col = function() {

	jQuery('.elementor-section.elementor-top-section').each(function(){
		if( jQuery(this).hasClass('thsn-col-stretched-left') || jQuery(this).hasClass('thsn-col-stretched-right') || jQuery(this).hasClass('thsn-col-stretched-both') ){
			jQuery(this).addClass('thsn-col-stretched-yes').removeClass('thsn-col-stretched-no');
		} else {
			jQuery(this).addClass('thsn-col-stretched-no').removeClass('thsn-col-stretched-yes');
		}
	});

	// remove all stretched related changes in each column
	jQuery('.elementor-section.elementor-top-section').each(function(){
		var ThisSection = jQuery(this);
		var ThisColumn	= '';
		jQuery( '.elementor-column.elementor-top-column', ThisSection ).each(function(){
			ThisColumn	= jQuery(this);
			jQuery( '.thsn-stretched-div', ThisColumn ).remove();
			ThisColumn.removeClass('thsn-col-stretched-yes thsn-col-stretched-left thsn-col-stretched-right thsn-col-stretched-content-yes');
		});
	});

	// reset - Remove all inline css
	jQuery('.elementor-section.elementor-top-section').each(function(){
		jQuery( '.elementor-column.elementor-top-column', jQuery(this) ).each(function(){
			if( jQuery(this).children('.elementor-column-wrap').length > 0 ){
				jQuery(this).children('.elementor-column-wrap').removeAttr('style');
			} else {
				jQuery(this).children('.elementor-widget-wrap').removeAttr('style');
			}
		});
	});

	jQuery('.elementor-section.elementor-top-section.thsn-col-stretched-yes').each(function(){

		var ThisSection		= jQuery(this);
		var ThisColumn		= '';
		var ColWrapper		= '';
		var StretchedEle	= '';

		if( ThisSection.hasClass('thsn-col-stretched-left') || ThisSection.hasClass('thsn-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column.elementor-top-column', ThisSection ).first();

			if( jQuery('.thsn-stretched-div', ThisColumn).length == 0 ){

				if( ThisColumn.children('.elementor-column-wrap').length > 0 ){
					ColWrapper = ThisColumn.children('.elementor-column-wrap');
				} else {
					ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				}

				ColWrapper.prepend( '<div class="thsn-stretched-div"></div>' );

				// Stretched Element
				StretchedEle = ColWrapper.children('.thsn-stretched-div');

				StretchedEle.addClass( 'thsn-stretched-left' );
				ThisColumn.addClass('thsn-col-stretched-yes thsn-col-stretched-left');

				if( ThisSection.hasClass('thsn-left-col-stretched-content-yes') ){
					ThisColumn.addClass('thsn-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('thsn-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.removeAttr('style');
				var bgImage =  ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}

				// Background Color
				var bgColor = ColWrapper.css('background-color');

				if( bgColor && bgColor!='' ){

					if( bgColor.indexOf('rgba') != -1 ){ // check if RGB or RGBA

						var bgColorArray = bgColor.split(',');
						var colors = [];
						jQuery(bgColorArray).each(function(x,y){
							y = y.replace( 'rgba' , '' );
							y = y.replace( '(' , '' );
							y = y.replace( ')' , '' );
							y = y.trim();
							colors.push(y);
						});

						bgColor = 'rgb(';
						var loopx = 1;
						var opacity = 'n'
						jQuery.each( colors , function( index, value ) {
							if ( loopx == 1 ){
								bgColor += value;
							} else if ( loopx == 2 || loopx == 3 ){
								bgColor += ',' + value;
							} else if ( loopx == 4 && ( value == '0' || value == 0 ) ){
								opacity = 'y';
							}
							loopx = loopx + 1;
						});
						bgColor += ')';

						if ( opacity == 'y' ){
							bgColor = 'transparent';
						}

					}
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				thsn_stretched_col_calc();

			}

		}

		if( ThisSection.hasClass('thsn-col-stretched-right') || ThisSection.hasClass('thsn-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column.elementor-top-column', ThisSection ).last();

			if( jQuery('.thsn-stretched-div', ThisColumn).length==0 ){

				if( ThisColumn.children('.elementor-column-wrap').length > 0 ){
					ColWrapper = ThisColumn.children('.elementor-column-wrap');
				} else {
					ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				}

				ColWrapper.prepend( '<div class="thsn-stretched-div"></div>' );

				// Stretched Element
				StretchedEle = ColWrapper.children('.thsn-stretched-div');

				StretchedEle.addClass( 'thsn-stretched-right' );
				ThisColumn.addClass('thsn-col-stretched-yes thsn-col-stretched-right');

				if( ThisSection.hasClass('thsn-right-col-stretched-content-yes') ){
					ThisColumn.addClass('thsn-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('thsn-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.removeAttr('style');
				var bgImage = ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}

				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor && bgColor!='' ){
					if( bgColor.indexOf('rgba') != -1 ){ // check if RGB or RGBA
						var bgColorArray = bgColor.split(',');

						var colors = [];
						jQuery(bgColorArray).each(function(x,y){
							y = y.replace( 'rgba' , '' );
							y = y.replace( '(' , '' );
							y = y.replace( ')' , '' );
							y = y.trim();
							colors.push(y);
						});
						
						bgColor = 'rgb(';
						var loopx = 1;
						var opacity = 'n'
						jQuery.each( colors , function( index, value ) {
							if ( loopx == 1 ){
								bgColor += value;
							} else if ( loopx == 2 || loopx == 3 ){
								bgColor += ',' + value;
							} else if ( loopx == 4 && ( value == '0' || value == 0 ) ){
								opacity = 'y';
							}
							loopx = loopx + 1;
						});
						bgColor += ')';

						if ( opacity == 'y' ){
							bgColor = 'transparent';
						}

					}
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				thsn_stretched_col_calc();

			}
		}

	});

};

var thsn_stretched_col_calc = function() {

	// padding left or right
	if( jQuery('.elementor-section.elementor-top-section > .elementor-container .elementor-column.elementor-top-column.thsn-col-stretched-yes').length>0 ){

		// Returns width of browser viewport
		var window_width = jQuery( window ).width();

		// Returns width of HTML document
		var document_width = jQuery( document ).width();

		jQuery('.elementor-section.elementor-top-section > .elementor-container .elementor-column.elementor-top-column.thsn-col-stretched-yes').each(function(){

			var this_ele    = jQuery(this);
			var curr_width  = jQuery(this).closest('.elementor-container').width();
			var extra_width = ((window_width - curr_width)/2);
			var parent_width = '';

			var position = 'left';
			if( jQuery(this).hasClass('thsn-col-stretched-right') ){
				position = 'right';
			}

			// set width to 100% if parent is 100%
			parent_width = jQuery(this).width();
			if( parent_width == '100%' ){
				jQuery(this).children('.elementor-widget-wrap') .css('width','100%');
				jQuery(this).children('.elementor-column-wrap') .css('width','100%');
			} else {
				jQuery(this).children('.elementor-widget-wrap') .css('width','');
				jQuery(this).children('.elementor-column-wrap') .css('width','');
			}

			if ( jQuery('.thsn-stretched-div', jQuery(this)).css( 'margin-'+position ) == '-500px'  ){
				jQuery('.thsn-stretched-div', jQuery(this)).css( 'margin-'+position,'-'+extra_width+'px' );
			}

			// stretched column content too
			if( jQuery(this).hasClass('thsn-col-stretched-content-yes') ){
				var stretched_width = jQuery('.thsn-stretched-div', jQuery(this) ).width();
				if( jQuery(this).children('.elementor-column-wrap').length > 0 ){
					jQuery(this).children('.elementor-column-wrap').css( 'margin-'+position,'-'+extra_width+'px' );
					if ( jQuery('.thsn-stretched-div', jQuery(this)).css( 'margin-'+position ) == '-500px'  ){
						jQuery(this).children('.elementor-column-wrap').css( 'width', stretched_width+'px' );
					} else {
						jQuery(this).children('.elementor-column-wrap').css( 'width', 'auto' );
					}

				} else {
					jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'-'+extra_width+'px' );
					if ( jQuery('.thsn-stretched-div', jQuery(this)).css( 'margin-'+position ) == '-500px'  ){
						jQuery(this).children('.elementor-widget-wrap').css( 'width', stretched_width+'px' );
					} else {
						jQuery(this).children('.elementor-widget-wrap').css( 'width', 'auto' );
					}

				}

			} else {
				if( jQuery(this).children('.elementor-column-wrap').length > 0 ){
					jQuery(this).children('.elementor-column-wrap').css( 'margin-'+position,'' );
					jQuery(this).children('.elementor-column-wrap').css( 'width', '' );
				} else {
					jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'' );
					jQuery(this).children('.elementor-widget-wrap').css( 'width', '' );
				}
			}
		});

	}

}

/* ============================================== */
/* BG Image yes class in each Section and Column
/* ============================================== */
var thsn_bgimage_class = function() {
	jQuery('.elementor-section.elementor-top-section').each(function() {

		if( jQuery(this).css('background-image')!='' && jQuery(this).css('background-image')!='none' ){
			jQuery(this).addClass('thsn-bgimage-yes' ).removeClass('thsn-bgimage-no' );
		} else {
			jQuery(this).addClass('thsn-bgimage-no' ).removeClass('thsn-bgimage-yes' );
		}
	});
	jQuery('.elementor-column.elementor-top-column').each(function() {

		if( jQuery(this).children('.elementor-column-wrap').length > 0 ){

			if( jQuery(this).children('.elementor-column-wrap').children('.thsn-stretched-div').length > 0 ){

				if( jQuery(this).children('.elementor-column-wrap').children('.thsn-stretched-div').css('background-image') == 'none' || jQuery(this).children('.elementor-column-wrap').children('.thsn-stretched-div').css('background-image') == '' ){
					jQuery(this).addClass('thsn-bgimage-no' ).removeClass('thsn-bgimage-yes' );
				} else {
					jQuery(this).addClass('thsn-bgimage-yes' ).removeClass('thsn-bgimage-no' );
				}

			} else {

				if( jQuery(this).children('.elementor-column-wrap').css('background-image') == 'none' || jQuery(this).children('.elementor-column-wrap').css('background-image') == '' ){
					jQuery(this).addClass('thsn-bgimage-no' ).removeClass('thsn-bgimage-yes' );
				} else {
					jQuery(this).addClass('thsn-bgimage-yes' ).removeClass('thsn-bgimage-no' );
				}

			}

		} else {

			if( jQuery(this).children('.elementor-widget-wrap').children('.thsn-stretched-div').length > 0 ){

				if( jQuery(this).children('.elementor-widget-wrap').children('.thsn-stretched-div').css('background-image') == 'none' || jQuery(this).children('.elementor-widget-wrap').children('.thsn-stretched-div').css('background-image') == '' ){
					jQuery(this).addClass('thsn-bgimage-no' ).removeClass('thsn-bgimage-yes' );
				} else {
					jQuery(this).addClass('thsn-bgimage-yes' ).removeClass('thsn-bgimage-no' );
				}

			} else {

				if( jQuery(this).children('.elementor-widget-wrap').css('background-image') == 'none' || jQuery(this).children('.elementor-widget-wrap').css('background-image') == '' ){
					jQuery(this).addClass('thsn-bgimage-no' ).removeClass('thsn-bgimage-yes' );
				} else {
					jQuery(this).addClass('thsn-bgimage-yes' ).removeClass('thsn-bgimage-no' );
				}

			}

		}
	});
};

/* ============================================== */
/* BG Color yes class in each Section and Column
/* ============================================== */
var thsn_bgcolor_class = function() {
	jQuery('.elementor-section.elementor-top-section').each(function() {
		if( jQuery(this).css('background-color')!='' && jQuery(this).css('background-color')!='transparent' ){
			jQuery(this).addClass('thsn-bgcolor-yes');
		}
	});
	jQuery('.elementor-column.elementor-top-column').each(function() {
		if( jQuery(this).children('.thsn-stretched-div').length ){
			if( jQuery(this).children('.thsn-stretched-div').css('background-color')!='' && jQuery(this).children('.thsn-stretched-div').css('background-color')!='transparent' ){
				jQuery(this).addClass('thsn-bgcolor-yes' ).removeClass('thsn-bgcolor-no' );
			} else {
				jQuery(this).addClass('thsn-bgcolor-no' ).removeClass('thsn-bgcolor-yes' );
			}
		} else {


			if( jQuery(this).children('.elementor-column-wrap').length > 0 ){

				if( jQuery(this).children('.elementor-column-wrap').css('background-color') == 'transparent' || jQuery(this).children('.elementor-column-wrap').css('background-color') == '' ){
					jQuery(this).addClass('thsn-bgcolor-no' ).removeClass('thsn-bgcolor-yes' );
				} else {
					jQuery(this).addClass('thsn-bgcolor-yes' ).removeClass('thsn-bgcolor-no' );
				}

			} else {

				if( jQuery(this).children('.elementor-widget-wrap').css('background-color') == 'transparent' || jQuery(this).children('.elementor-widget-wrap').css('background-color') == '' ){
					jQuery(this).addClass('thsn-bgcolor-no' ).removeClass('thsn-bgcolor-yes' );
				} else {
					jQuery(this).addClass('thsn-bgcolor-yes' ).removeClass('thsn-bgcolor-no' );
				}

			}

		}
	});
};

/*----  Events  ----*/

// On resize
jQuery(window).resize(function(){
	setTimeout(function() {
		thsn_stretched_col_calc();
	}, 100);
});

// on ready
jQuery(document).ready(function(){
	thsn_stretched_col();
	thsn_stretched_col_calc();
	thsn_bgimage_class();
	thsn_bgcolor_class();
	setTimeout(function() {
		thsn_stretched_col_calc();
	}, 100);
});