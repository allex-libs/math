var fs = require('fs');
var Matrix = require('../matrix');

var defaultWeights = [1,1,1,1,1,1,1,1,1];

function getWeights(){
  var wss;
  try{
    var wss = fs.readFileSync('./weights.csv','utf8');
  }
  catch(e){
    return defaultWeights;
  }
  if(!wss){
    return defaultWeights;
  }
  wss = wss.replace(/\s/g,'');
  var ret = wss.split(',');
  if(ret.length){
    for(var i in ret){
      ret[i] = parseInt(ret[i]);
      if(isNaN(ret[i])){
        return defaultWeights;
      }
    }
  }else{
    return defaultWeights;
  }
  return ret;
}

var rows = 3;
var cols = 5;
var million = 1000000;
var millions = parseInt(process.argv[2]) || 1;
var output = process.argv[3] || 'output.csv';
var weights = getWeights();

console.log('Generating',millions,'millions of',rows,'x',cols,'slot matrix data in',output);
console.log('Each row of',output,'contains',rows*cols,'<Tab> delimited values in the range [0,',weights.length-1,']');
console.log('Weights are',weights);

var fh = fs.openSync(output,'w');
var m = new Matrix(3,5,weights);
console.log('Normalized weights are',m.weights);
var run = 0;
while(run<millions){
  for(var i=0; i<million; i++){
    var b = new Buffer(((m.generate()).join("\t"))+"\n");
    fs.writeSync(fh,b,0,b.length,null);
  }
  run++;
}
