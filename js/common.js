$(function(){
	$('.fancybox').fancybox({
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	$(".more_arrow").click(function () {
      $('main').toggleClass('active');
      $('header').toggleClass('fixed');
    });
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
	$('.fixed_block').mousemove(function(e){
	   $('.cursor').css('top',e.pageY);
	  });
	  
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
		timeout: 0, 
		next:   '.floor_slider_arrow_r', 
		prev:   '.floor_slider_arrow_l' 
	});	
	$('.acc_trigger').click(function(){
		$(this).toggleClass('active');
        $(this).next('.acc_container').slideToggle()
        return false;   
    });
});
