$(function(){
  var video = $("#myvideo")[0];
  video.addEventListener("loadeddata",function(){
    console.log("下载完成！");
    $(".mask1").fadeIn(200);
  });
  $(".star").click(function(){
    $(".wrap1").hide();
    $("#myvideo").show();
    video.play();
  });
  video.addEventListener("ended",function(){
    console.log("播放完成！");
    $("#myvideo").hide();
    $(".wrap2").show();
    setTimeout(function(){
      $(".mask2").fadeIn(200);
    },2000);
  });
});