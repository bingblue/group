var MuChat = function(options){
  var defaults = {
    url:'http://localhost:808',
    nickName:'xiaomu222',
    content:'#content',
    sendBtn:'#sendBtn',
    sendTxt:'#sendTxt',
    clearBtn:'#clearBtn',
    onlineNum:'#onlineNum'
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
    this.socket.on('system', function (nickName, type, onlineNum){
      console.log(onlineNum)
      that._drawMsg('系统消息',nickName + type + '聊天',onlineNum,'red')
    });
    this.socket.on('newMsg', function(nickName, msg) {
      that._drawMsg(nickName, msg);
    });
    this._sendEvent(that);
    this._clearEvent(that);
  },
  _drawMsg:function(nickName,msg,onlineNum,color){
    var date = new Date().toTimeString().substr(0, 8);
    var newMsg = $('<p>'+nickName+'<span> ('+date+') </span>: '+msg+ '</p>');
    newMsg.css({
      color:color,
      fontSize:12
    })
    newMsg.find('span').css({
      color:'#999'
    })
    $(this.opts.content).append(newMsg).scrollTop($(this.opts.content).height());
    $(this.opts.onlineNum).text(onlineNum+'人在线');
  },
  _sendEvent:function(that){
    var isShiftDown = false;//是否按住shift键
    var isOK = true;//是否允许发送
    var t = null;//记时
    $(that.opts.sendBtn).click(function(){
      if(!isOK){
        that._drawMsg('系统消息','您聊天过快，请注意手速','red');
        return false;
      }
      isOK = false;
      t = setTimeout(function(){
        isOK = true;
        clearTimeout(t);
      },500);
      var postMsg = $(that.opts.sendTxt).val().trim();
      if(postMsg.length != 0){
        that.socket.emit('postMsg', postMsg); //把消息发送到服务器
        that._drawMsg('我', postMsg); //把自己的消息显示到自己的窗口中
        $(that.opts.sendTxt).val(''); //清空
      }
    });
    $('body').keydown(function(e){
      if(e && e.keyCode==16){
        isShiftDown = true;
      }
      if(e && e.keyCode==13 && !isShiftDown){ 
        $(that.opts.sendBtn).trigger('click');
      }
    });
    $('body').keyup(function(e){
      if(e && e.keyCode==16){
        isShiftDown = false;
      }
    });
  },
  _clearEvent:function(that){
    $(that.opts.clearBtn).click(function(){
      $(that.opts.content).text('');
    });
  }
}