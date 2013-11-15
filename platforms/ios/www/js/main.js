var cheers = cheers || {};

cheers.Splash = function() {
	$("#splash").tap(function() {
	  
	  $("#splash-txt").animate({
	  	scale: '0',
	  	opacity:0
	  },400,'ease',function() {
	  	$(this).remove();
	  });

		$(this).animate({
			scale: '0',
			opacity:0
		},400,'ease',function() {
			$(this).remove();
			cheers.showCountries();
			//show chooser buttons
			$("#chooser").animate({
				translate3d:'0px,0px,0px' 
			},600);
		});
	});
};


cheers.showCountries = function() {
	$("#btn-quotes").css('opacity',0.5);
	$("#content").animate({
		translate3d:'0px,0px,0px' 
	},400,'ease',function() {
		$("#chooser").show();
		cheers.flagSlider();
	});
};

cheers.showQuotes = function() {
	$.ajax({
		type:'GET',
		url:'quotes.html',
		success:function(data) {
			$("#flags").css('opacity',0).empty();
			$("#quotes").empty().append(data).css('opacity',1);
			$('#quoteSlider').swipeSlide();
			$("#details").hide();
		},
		error:function() { alert("Something went wrong. Please restart the app. #fail :(")}
	});
};

cheers.flagSlider = function() {
	$.ajax({
		type:'GET',
		url:'flags.html',
		success:function(data) {
			$("#quotes").css('opacity',0).empty();
			$("#flags").empty().append(data).css('opacity',1);
			$('#flagSlider').swipeSlide();
			cheers.showDetails();
		},
		error:function() { alert("Something went wrong. Please restart the app. #fail :(")}
	});
};

cheers.changeSection = function() {
	$("#btn-places").tap(function() {
		$("#content h1").text("Countries");
		$(this).css('opacity',1);
		$("#btn-quotes").css('opacity',0.5);
		cheers.flagSlider();
	});
	$("#btn-quotes").tap(function() {
		$("#content h1").text("Quotes");
		$(this).css('opacity',1);
		$("#btn-places").css('opacity',0.5);
		cheers.showQuotes();
	});
};

cheers.showDetails = function() {
  $(".flag").tap(function() {
      var flag = $(this).attr("data-flag");
      var cheer = $(this).attr("data-cheers"); 
      var t = $(this).attr("data-translation");
      $(".big-flag").empty().append("<img src="+flag+" width=100% height=100%>");
      $("#details h1").text(cheer);
      $("#details .translation").text(t);
      $("#details").show();
      //$("#details").addClass("detailsShow");
  });
  
  $("#details").tap(function() {
  	$("#details").removeClass("detailsShow");
  	$("#details").hide();
  });

};

$(document).ready(function() {
	cheers.Splash();
	cheers.changeSection();
});