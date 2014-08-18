function stream_layers(n, m, o, myData) {//n:# of streams,m:# of data points, o:?
  var dataIndex =0;
  var dataKeys = Object.keys(myData);
  if (arguments.length < 3)
    o = 0;

  return d3.range(n).map(function() {
      var a = [], i;
      for (i = 0; i < myData[dataKeys[0]].length; i++) //create array of the data
        a[i] = myData[dataKeys[dataIndex]][i];
      dataIndex+=1;
      return a.map(stream_index);
    });
}

function stream_index(d, i) {
  return {x: i, y: Math.max(0, d)};
}