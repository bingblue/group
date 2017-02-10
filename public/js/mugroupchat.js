var MuGroupChat = function(options){
  var defaults = {
    url:'http://localhost:808',
    nickName:'xiaomu222',
    userId:100001,
    room:100001,
    content:'#content',
    sendBtn:'#sendBtn',
    sendTxt:'#sendTxt',
    clearBtn:'#clearBtn',
    onlineNum:'#onlineNum'
  }
  this.opts = $.extend(defaults, options);
  this.userData = {
    nickName:this.opts.nickName,
    userId:this.opts.userId,
    room:this.opts.room
  };
  this.socket = null;
  this.onlineNum = 0;
  this.init();
}
MuGroupChat.prototype = {
  init:function(){
    var that = this;
    this.socket = io(this.opts.url);
    this._joinRoom(that);
    this._getSystemMsg(that);
    this._getUserMsg(that);
    this._sendEvent(that);
    this._clearEvent(that);
  },
  _getSystemMsg:function(that){
    this.socket.on('system', function (nickName, type, onlineUser){
      console.log(onlineUser);
      that.onlineNum = onlineUser;
      that._drawMsg('系统消息',nickName + type + '聊天','red')
    });
  },
  _getUserMsg:function(that){
    this.socket.on('newMsg', function(nickName, msg) {
      that._drawMsg(nickName, msg);
    });
  },
  _sendMsg:function(postMsg){
    this.userData.msg = postMsg;
    this.socket.emit('postMsg', this.userData); //把消息发送到服务器
  },
  _joinRoom:function(that){
    this.socket.emit('login',that.userData);
  },
  //展示消息
  _drawMsg:function(nickName,msg,color){
    var that = this;
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
    $(this.opts.onlineNum).text(that.onlineNum+'人在线');
  },
  //发送和回车事件
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
        that._sendMsg(postMsg);
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
  //清屏事件
  _clearEvent:function(that){
    $(that.opts.clearBtn).click(function(){
      $(that.opts.content).text('');
    });
  }
}