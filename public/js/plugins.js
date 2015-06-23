// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
  //版权信息
  console.log("%c作者:","color:#666;font-size:16px;");
  console.log("%c小牧COOL","font-size:25px;");
  console.log("%cQQ:895355044","color:#666;font-size:16px;");
  console.log("%cQQ群:206683621","color:#666;font-size:16px;");
}());

// Place any jQuery/helper plugins in here.
