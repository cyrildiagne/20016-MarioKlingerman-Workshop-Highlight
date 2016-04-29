var onMessageCallback;

function connect(onmessage) {
  onMessageCallback = onmessage;

  var host = window.document.location.host.replace(/:.*/, '');
  var ws = new WebSocket('ws://' + host + ':4080');
  ws.onmessage = function (event) {
    if (event.data.indexOf(',') != -1) {
      var labels = event.data.split(',');
      for (var label of labels) {
        onMessageCallback(label);
      }
    } else {
      onMessageCallback(event.data);
    }
  };
}

export default {
  connect
}
