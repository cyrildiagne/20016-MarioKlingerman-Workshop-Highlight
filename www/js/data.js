var items = [];

for (var i = 0; i < filename2xy.length; i++) {
  var item = filename2xy[i];
  var p = {};
  p.x =  36 + item[2] / 2.59 - 1280 * 0.5;
  p.y = 185 + item[1] / 2.60 - 2400 * 0.5;
  items.push({
    id : item[0],
    position : p
  });
}

// var w = 1280;
// var h = 800 * 3;
//
// var numX = 19;
// var numY = 26;
//
// var size = 72;
// var offset = 201;

// for ( var i = 0; i < numX; i ++ ) {
//   for ( var j = 0; j < numY; j ++ ) {
//     if (j == numY-1 && i%2) continue;
//     var p = {};
//     p.x = -w * 0.5 + 67 * (i + 0.5);
//     p.y = -h * 0.5 + 77 * (j + 0.5) + (i%2?size*0.5:0);
//     p.y += offset;
//     items.push({
//       position : p
//     });
//   }
// }

export default {
  items
}
