var randomBytes = require('crypto').randomBytes;

var _rbLen = 10000;
function RandomBytesFetcher() {
  this.nums = randomBytes(_rbLen);
  this.cursor = 0;
}
RandomBytesFetcher.prototype.get = function (count) {
  var remaining = this.remaining(), ret;
  if (count > remaining) {
    this.nums = Buffer.concat([this.nums.slice(this.cursor),randomBytes(_rbLen-remaining)]);
    this.cursor = 0;
  }
  ret = this.nums.slice(this.cursor, this.cursor+count);
  this.cursor += count;
  return ret;
};
RandomBytesFetcher.prototype.remaining = function () {
  return this.nums.length-this.cursor;
};

var _rbf = new RandomBytesFetcher();

function sorter(a,b) {
  return a.code-b.code;
}

function valExtractor(item) {
  return item.val;
}

function shuffle(length) {
  var buf = _rbf.get(4*length);
  var temps = [];
  for(var i=0; i<length; i++){
    var code=buf[i*4+0]*256*256*256+buf[i*4+1]*256*256+buf[i*4+2]*256+buf[i*4+3];
    temps.push({code:code, val:i});
  }
  temps.sort(sorter);
  return temps.map(valExtractor);
}

module.exports = shuffle;
