var randomBytes = require('crypto').randomBytes;

function rng(n){
  var rands = randomBytes(n);
  var min = rands[0];
  var minords = [0];
  for(var i=1; i<n; i++){
    var b = rands[i];
    if(b<min){
      minords=[i];
      min = b;
      continue;
    }
    if(b===min){
      minords.push(i);
    }
  }
  if(minords.length===1){
    return minords[0];
  }
  return minords[rng(minords.length)];
}

module.exports = rng;
