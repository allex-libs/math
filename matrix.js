var random = require('./random');

function gcd(a,b){
  while(a!==b){
    if(a<b){
      b = b-a;
    }else{
      a = a-b;
    }
  }
  return a;
};

function gcdnormalized(arry){
  if(!arry){
    throw 'No weights';
  }
  var l = arry.length;
  if(!l){
    throw 'No weights';
  }
  if(l<2){
    return arry[1];
  }
  var d = gcd(arry[0],arry[1]);
  for(var i=2; i<l; i++){
    d = gcd(d,arry[i]);
  }
  if(d>1){
    var ret = [];
    for(var i=0; i<l; i++){
      ret.push(arry[i]/d);
    }
    return ret;
  }
  return arry;
};

function Matrix(rows,cols,symbolweights){
  if(!(rows&&cols&&symbolweights)){
    return;
  }
  this.rows = rows;
  this.cols = cols;
  this.weights = gcdnormalized(symbolweights);
  var map = [];
  var genlen = 0;
  for(var i=0; i<this.weights.length; i++){
    var w = this.weights[i];
    for(var j=0; j<w; j++){
      map.push(i);
    }
    genlen+=this.weights[i];
  }
  this.genlen = genlen;
  this.map = map;
}

Matrix.prototype.generate = function generate(){
  var retlen = this.rows*this.cols;
  var genlen = this.genlen;
  var map = this.map;
  var ret = [];
  for(var i=0; i<retlen; i++){
    ret.push(map[random(genlen)]);
  }
  return ret;
};

module.exports = Matrix;
