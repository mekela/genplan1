$(function(){
	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		},
		closeBtn   : false
	});
	$('.fancybox_form').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	
	//about
	$(".about_box_lnk").click(function () {
      $(this).hide();
       $(this).prev('.about_box_txt_hide').show('slow');
    });
	
	/* $(".more_arrow").click(function () {
      $('main').toggleClass('active');
      $('header').toggleClass('fixed');
    }); */
	$(".fixed_block").click(function () {
      $(this).addClass('active');
      $('#mapwrap').addClass('active');
      $('#arrow_left').show();
    });
	$("#arrow_left").click(function () {
      $(this).hide('active');
      $('#mapwrap').removeClass('active');
      $('.fixed_block').removeClass('active');
    });
	$(".head_info_icon img").mouseenter(function () {
      $('.head_info_icon p').toggleClass('block');
    });
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	/* $('.fixed_block').mousemove(function(e){
	   $('.cursor').css('top',e.pageY);
	  }); */
	  
	 $('.slider_block').cycle({ 
		fx:     'scrollHorz', 
		speed:  'slow', 
		timeout: 0, 
		next:   '.slider_arrow_r', 
		prev:   '.slider_arrow_l' 
	});	
	$('.floor_block').cycle({ 
		fx:     'scrollHorz', 
		speed:  'slow', 
		nowrap:  1, 
		timeout: 0, 
		next:   '.floor_slider_arrow_r', 
		prev:   '.floor_slider_arrow_l' 
	});	
	$('.acc_trigger').click(function(){
		$(this).toggleClass('active');
        $(this).next('.acc_container').slideToggle()
        return false;   
    });
	$(".contacts_form_title").click(function () {
      $('.contacts_form_block').slideToggle();
    });
	$(".contacts_form_close").click(function () {
      $('.contacts_form_block').hide();
    });

	/*--------------------------------------------------Виділення активної області карти-------------------------------------------------------*/
	$.each($('map[id^="liter"] area'), function(idx, el) {
		$(el).on('mouseover', function(){
			$('#ID_'+$(this).attr('id')).css('visibility', 'visible');
			$(this).parent().next('#ID_liter').css('visibility', 'hidden');
		});
		$(el).on('mouseout', function(){
			$('.floor_active').css('visibility', 'hidden');
			$(this).parent().next('#ID_liter').css('visibility', 'visible');
		});
	});

	function floor_resize(){
		$('.floor_item').each(function(){
			$(this).width($(this).parent('.floor_block').width());
			//$(this).height($(this).children('.floor_box').height());
		});
	};
	$(window).resize(function(){
		floor_resize();
	});
	$('.floor_slider_arrow_l').click(function(){
		floor_resize();
	});
	$('.floor_slider_arrow_r').click(function(){
		floor_resize();
	});
	floor_resize();
});
