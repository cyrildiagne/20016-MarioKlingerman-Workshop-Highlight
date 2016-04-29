var onMessageCallback;

function connect(onmessage) {
  onMessageCallback = onmessage;

  var host = window.document.location.host.replace(/:.*/, '');
  var ws = new WebSocket('ws://' + host + ':4080');
  ws.onmessage = function (event) {
    onMessageCallback(event.data);
  };
}

export default {
  connect
}
