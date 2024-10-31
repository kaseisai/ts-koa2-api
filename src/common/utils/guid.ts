import uuid from 'node-uuid';

export class Guid {
  static GetGuid(length?: number): string {
    const buffer = new Array(32);
    const r = uuid.v4(null, buffer, 16);
    const rr = bytesToUuid(r, 16);

    return rr.replace(/-/g, '').slice(0, length || 32);
  }
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  let i = offset || 0;
  const bth = byteToHex;
  return `${bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]]}-${bth[buf[i++]]}${bth[buf[i++]]}-${
    bth[buf[i++]]
  }${bth[buf[i++]]}-${bth[buf[i++]]}${bth[buf[i++]]}-${bth[buf[i++]]}${bth[buf[i++]]}${bth[buf[i++]]}${bth[buf[i++]]}${
    bth[buf[i++]]
  }${bth[buf[i++]]}`;
}
