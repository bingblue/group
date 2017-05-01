(function($){
  $.fn.hit = function(options){
    var defaults = {    
      hammerImg : 'images/hammer.png',
      breakImg : 'images/break.png',
      scrollTime : 10,
      over : function(num){
        $(".mask-msg-bd").show();
      }
    };
    var opts = $.extend(defaults, options);
    var scrollTime = opts.scrollTime;
    var itemsT = null;
    var nowLeft = 0;
    var isAdd = true;
    var hammer = '<img class="hammer" src="' + opts.hammerImg + '">';
    itemsT = setInterval(function(){
      if(isAdd){
        ++nowLeft;
      }else{
        --nowLeft;
      }
      if(nowLeft==300)isAdd = false;
      if(nowLeft==0)isAdd = true;
      $(".egg-items").css({
        marginLeft : nowLeft*-1+"%"
      });
    },scrollTime*1000/300);

    $(".egg-item").on("click.eggItem",function(){
      $(".egg-item").off(".eggItem");
      var ml = $(".egg-items").css("marginLeft");
      clearInterval(itemsT);
      $(".egg-items").css({
        marginLeft : ml
      });
      $(this).find("img").attr("src",opts.breakImg);
      $(".hammer").remove();
      $(hammer).addClass("ani-hammer").appendTo($(this));
      setTimeout(function(){
        opts.over($(this).find(".egg-num").text());
      }, 500);
    });
  }
})(jQuery);