$(function(){

	
	$('.map_nav ul li a').click(function(){
		if (!$(this).parent('li').hasClass('active')) {
			$('.map_nav ul li').removeClass('active');
			$(this).parent('li').addClass('active');	//Зміна активного пункту меню
			$('img[usemap]').attr('src', $(this).attr('data-map'));	//Зміна карти

			for (var i = 1; i < $('[class^=area]').length+1; i++) {
				$('.area' + i).attr('data-visibility','visible');
			};
			if ($(this).parent('li').index() == 0 || $(this).parent('li').index() == 3) {
				$('.area1').attr('data-visibility','hidden');
				$('.area2').attr('data-visibility','hidden');
				$('.area3').attr('data-visibility','hidden');
			}
			else if($(this).parent('li').index() == 1 || $(this).parent('li').index() == 2){
				$('.area1').attr('data-visibility','hidden');
				$('.area2').attr('data-visibility','hidden');
			}

			$('map area').each(function(){
				for (var i = 1; i < $('.map_nav ul li').length+1; i++) {
					$(this).next('.area_box').removeClass('style' + i);
				};
				if ($(this).attr('data-visibility') == 'visible') {
					$(this).next('.area_box').addClass('style' + ($('.map_nav ul li.active').index()+1));
				}
				$(this).next('.area_box').find('.area_body').slideUp(300);
			});
		};
		addMarkerMap();
		return false;
	});

	
	


	/*----------Виклик функції addMarkerMap------------*/

	$('img[usemap]').rwdImageMaps();

	/*--------------------------------------------------Додавання маркера на карту-------------------------------------------------------*/
		$('map area').each(function(){
			var areaTitle = 'Литер';
			$(this).after("<div class='area_box' style='top:0px; left:0px;'><div class='area_head'><div class='area_title'>"+areaTitle+"</div><div class='area_number'>"+$(this).attr('class').replace('area','')+"</div></div><div class='area_body'><div></div>");
		});

		/*------------------           Зміна активних title             -------------------------*/
		if ($('.map_nav ul li').hasClass('active')) {
			$('map area').each(function(){
				for (var i = 1; i < $('.map_nav ul li').length+1; i++) {
					$(this).next('.area_box').removeClass('style' + i);
				};
				if ($(this).attr('data-visibility') == 'visible') {
					$(this).next('.area_box').addClass('style' + ($('.map_nav ul li.active').index()+1));
				}
			});
		};
		function addMarkerMap(){
			$('map area').each(function(){
				$(this).click(function(){return false});
				var coords = $(this).attr('coords');
				var a = coords.split(',');
				var b = new Array();
				var beven = new Array(); // Відстань зліва
				var bodd = new Array();	// Відстань зверху
				var altb = new Array();	// Відстань зверху
				a.forEach(function(element, index) {
				    b.push(parseInt(element));  
				    if(index%2 == 0){
				    	beven.push(Math.round(element));
				    }
				    if(index%2 == 1){
				    	bodd.push(Math.round(element));
				    }
				});
				bevenmax = Math.max.apply({},beven);
				bevenmin = Math.min.apply({},beven);
				boddmax = Math.max.apply({},bodd);
				boddmin = Math.min.apply({},bodd);
				bevenmiddle = Math.round((bevenmax + bevenmin)/2);
				boddmiddle = Math.round((boddmax + boddmin)/2);
				height = boddmax - boddmin;
				width = bevenmax - bevenmin;
				// Пощук координати x на висоті y
				bodd.forEach(function(element, index) {
					if ((boddmiddle-150) <= element  &&  (boddmiddle+150) >= element) {
						for (var i = 0; i < b.length; i++) {
							if (i%2 == 1) {
								if (b[i] == element) {	
									altb.push(b[i-1]);
								};
							};
						};
					};
				});
				altwidth = Math.round((Math.max.apply({},altb) + Math.min.apply({},altb))/2);
				
				/*------------------           Координати по замовчуваню для всіх інфоблоків             -------------------------*/
				$(this).next('.area_box').css({
					'top': (boddmiddle),
					'left': (bevenmiddle)
				});
				
				/*------------------           Зміна позиції інфоблоку             -------------------------*/
				if ($(this).attr('class').replace('area','') == 1) {
					$(this).next('.area_box').css({
						'top': boddmin,
						'left': (bevenmin-70)
					});
				}	
				if ($(this).attr('class').replace('area','') == 2) {
					$(this).next('.area_box').css({
						'left': (bevenmin-80)
					});
				}
				if ($(this).attr('class').replace('area','') == 3) {
					$(this).next('.area_box').css({
						'top': boddmin,
						'left': (bevenmiddle-120)
					});
				}
				if ($(this).attr('class').replace('area','') == 4) {
					$(this).next('.area_box').css({
						'top': boddmax,
						'left': (bevenmiddle-160)
					});
				}
				if ($(this).attr('class').replace('area','') == 5) {
					$(this).next('.area_box').css({
						'top': (boddmax-20)
					});
				}

				/*------------------           Подія наведденя курсора на активну область карти             -------------------------*/
				$(this).mouseenter(function(){			
					if ($(this).attr('data-visibility') == 'visible' && $(this).next('.area_box').find('.area_body').css('display') == 'none') {				
						for (var i = 1; i < $('.map_nav ul li').length+1; i++) {
								if ($(this).attr('data-about' + i) != undefined && $('.map_nav ul li').eq(i-1).hasClass('active')) {
									$(this).next('.area_box').find('.area_body').html($(this).attr('data-about' + i));	
								}
							};
							$(this).next('.area_box').find('.area_body').slideDown(300);
							/*$(this).mouseleave(function(){
								$(this).next('.area_box').find('.area_body').slideUp(300);
							});*/
					};
				});

				/*------------------           Подія наведденя курсора на активний title карти           -------------------------*/
				$('.area_box').mouseenter(function(){
					if ($(this).prev('area').attr('data-visibility') == 'visible' && $(this).find('.area_body').css('display') == 'none'){
						for (var i = 1; i < $('.map_nav ul li').length+1; i++) {
							if ($(this).prev('area').attr('data-about' + i) != undefined && $('.map_nav ul li').eq(i-1).hasClass('active')) {
								$(this).find('.area_body').html($(this).prev('area').attr('data-about' + i));	
							}
						};
						$(this).find('.area_body').slideDown(300);
					}
					$('.area_box').mouseleave(function(){
						$(this).find('.area_body').slideUp(300);
					});
				});
			});
				
		}
		/*----------Виклик функції addMarkerMap------------*/
		addMarkerMap();
		$(window).resize(function(){
			addMarkerMap();
		});
		
});
