var MuChat = function(options){
  var defaults = {
    url:'http://localhost:8082',
    nickName:'xiaomu222',
    content:'#content',
    sendBtn:'#sendBtn',
    sendTxt:'#sendTxt',
    clearBtn:'#clearBtn'
  }
  this.opts = $.extend(defaults, options);
  this.socket = null;
  this.init();
}
MuChat.prototype = {
  init:function(){
    var that = this;
    this.socket = io(this.opts.url);
    this.socket.on('conn', function (userList) {
      console.log(userList);
    });
    this.socket.emit('login', this.opts.nickName);
    this.socket.on('system', function (nickName, type){
      that._drawMsg('系统消息',nickName + type + '聊天','red')
    });
    this.socket.on('newMsg', function(nickName, msg) {
      that._drawMsg(nickName, msg);
    });
    $(that.opts.sendBtn).click(function(){
      var postMsg = $(that.opts.sendTxt).val().trim();
      if(postMsg.length != 0){
        that.socket.emit('postMsg', postMsg); //把消息发送到服务器
        that._drawMsg('我', postMsg); //把自己的消息显示到自己的窗口中
        $(that.opts.sendTxt).val(''); //清空
      }
    });
    $(that.opts.clearBtn).click(function(){
      $(that.opts.content).text('');
    });
  },
  _drawMsg:function(nickName,msg,color){
    var date = new Date().toTimeString().substr(0, 8);
    var newMsg = $('<p>'+nickName+'<span> ('+date+') </span>: '+msg+ '</p>');
    newMsg.css({
      color:color,
      fontSize:12
    })
    newMsg.find('span').css({
      color:'#999'
    })
    $(this.opts.content).append(newMsg);
  }
}