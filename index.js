function createlib (execlib) {
  'use strict';

  return {
    crc16 : require('./crc16'),
    crc32 : require('./crc32'),
    shuffler : require('./shuffler')
  };
}

module.exports = createlib;
