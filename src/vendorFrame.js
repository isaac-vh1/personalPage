
// src/vendorFrame.js
// Vendor-specific frame parser (big-endian 16-bit words)

/**
 * Convert a byte array (Uint8Array) to a lowercase hex string.
 * @param {Uint8Array} arr
 * @returns {string}
 */
function toHex(arr) {
  var out = "";
  for (var i = 0; i < arr.length; i++) {
    var b = arr[i].toString(16);
    if (b.length < 2) b = "0" + b;
    out += b;
  }
  return out;
}

/**
 * 16-bit big-endian: (MSB << 8) | LSB
 * @param {number} b0
 * @param {number} b1
 * @returns {number}
 */
function u16be(b0, b1) {
  return (b0 << 8) | b1;
}

/**
 * Chunk payload into 16-bit big-endian words.
 * @param {Uint8Array} payload
 * @returns {number[]}
 */
function chunkWordsBE(payload) {
  var words = [];
  for (var i = 0; i + 1 < payload.length; i += 2) {
    words.push(u16be(payload[i], payload[i + 1]));
  }
  return words;
}

/**
 * Parse a vendor frame from raw bytes.
 * Observed frame format:
 *  - [0] header (0x01)
 *  - [1] opcode (0x03)
 *  - [2] length (payload size in bytes, N)
 *  - [3..3+N-1] payload (9 x 16-bit big-endian words)
 *  - [remaining] trailer/checksum (e.g., 2 bytes)
 *
 * Payload words mapping:
 *   w0 capacityAh
 *   w1 socPct
 *   w2 unknown2
 *   w3 unknown3
 *   w4 status1
 *   w5 current_x100  -> currentA = w5 / 100
 *   w6 voltage_x10   -> voltageV = w6 / 10
 *   w7 flags         -> bit7 (0x80) means negative current
 *   w8 status2
 *
 * @param {Uint8Array} bytes
 * @returns {object}
 */
export function parseVendorFrameBytes(bytes) {
  var warnings = [];

  if (!bytes || bytes.length < 3) {
    return {
      rawHex: bytes ? toHex(bytes) : "",
      header: bytes && bytes.length > 0 ? bytes[0] : 0,
      opcode: bytes && bytes.length > 1 ? bytes[1] : 0,
      length: bytes && bytes.length > 2 ? bytes[2] : 0,
      payloadHex: "",
      trailerHex: undefined,
      wordsBE: [],
      capacityAh: undefined,
      socPct: undefined,
      unknown2: undefined,
      unknown3: undefined,
      status1: undefined,
      voltageV: undefined,
      currentA: undefined,
      flags: undefined,
      status2: undefined,
      powerW: undefined,
      warnings: ["Frame shorter than 3 bytes; cannot parse length/payload."],
    };
  }

  var header = bytes[0];
  var opcode = bytes[1];
  var length = bytes[2];
  var payloadEnd = 3 + length;

  if (payloadEnd > bytes.length) {
    warnings.push(
      "Declared payload length (" +
        length +
        ") exceeds available bytes (" +
        (bytes.length - 3) +
        ")."
    );
  }

  var pStart = 3;
  var pEnd = payloadEnd < bytes.length ? payloadEnd : bytes.length;
  var payload = bytes.slice(pStart, pEnd);
  var trailer = bytes.slice(pEnd);

  var wordsBE = chunkWordsBE(payload);

  // Known mappings
  var capacityAh = wordsBE.length > 0 ? wordsBE[0] : undefined; // e.g., 01 a0 -> 0x01A0 -> 416
  var socPct = wordsBE.length > 1 ? wordsBE[1] : undefined;     // e.g., 00 33 -> 0x0033 -> 51
  var unknown2 = wordsBE.length > 2 ? wordsBE[2] : undefined;   // 0x0055 -> 85
  var unknown3 = wordsBE.length > 3 ? wordsBE[3] : undefined;   // 0x0030 -> 48
  var status1 = wordsBE.length > 4 ? wordsBE[4] : undefined;    // 0x0001 -> 1

  var currentA = undefined;
  var voltageV = undefined;
  if (wordsBE.length >= 7) {
    currentA = wordsBE[5] / 100; // 0x01e5 -> 485 -> 4.85 A
    voltageV = wordsBE[6] / 10;  // 0x010a -> 266 -> 26.6 V
  }

  var flags = wordsBE.length > 7 ? wordsBE[7] : undefined;      // 0x0081 -> 129
  var status2 = wordsBE.length > 8 ? wordsBE[8] : undefined;    // 0x0002 -> 2

  // Sign from flags bit 7 (0x80): discharge -> negative current
  if (typeof currentA === "number" && typeof flags === "number") {
    if ((flags & 0x80) !== 0) {
      currentA = -currentA;
    }
  }

  var powerW =
    typeof voltageV === "number" && typeof currentA === "number"
      ? Math.round(voltageV * currentA * 100) / 100
      : undefined;

  if (header !== 0x01) warnings.push("Unexpected header: 0x" + header.toString(16));
  if (opcode !== 0x03) warnings.push("Unexpected opcode: 0x" + opcode.toString(16));

  return {
    rawHex: toHex(bytes),
    header: header,
    opcode: opcode,
    length: length,
    payloadHex: toHex(payload),
    trailerHex: trailer && trailer.length ? toHex(trailer) : undefined,
    wordsBE: wordsBE,

    capacityAh: capacityAh,
    socPct: socPct,
    unknown2: unknown2,
    unknown3: unknown3,
    status1: status1,
    voltageV: voltageV,
    currentA: currentA,
    flags: flags,
    status2: status2,
    powerW: powerW,

    warnings: warnings.length ? warnings : undefined,
  };
}

/**
 * Parse from hex string (e.g., "01031201a0003300...").
 * @param {string} hex
 * @returns {object}
 */
export function parseVendorFrameHex(hex) {
  if (!hex || typeof hex !== "string") {
    return {
      rawHex: "",
      header: 0,
      opcode: 0,
      length: 0,
      payloadHex: "",
      trailerHex: undefined,
      wordsBE: [],
      capacityAh: undefined,
      socPct: undefined,
      unknown2: undefined,
      unknown3: undefined,
      status1: undefined,
      voltageV: undefined,
      currentA: undefined,
      flags: undefined,
      status2: undefined,
      powerW: undefined,
      warnings: ["Empty or non-string hex input."],
    };
  }

  var clean = hex.trim().replace(/\s+/g, "");
  var hexOk = /^[0-9a-fA-F]+$/.test(clean);
  if (!hexOk) {
    return {
      rawHex: clean,
      header: 0,
      opcode: 0,
      length: 0,
      payloadHex: "",
      trailerHex: undefined,
      wordsBE: [],
      capacityAh: undefined,
      socPct: undefined,
      unknown2: undefined,
      unknown3: undefined,
      status1: undefined,
      voltageV: undefined,
      currentA: undefined,
      flags: undefined,
      status2: undefined,
      powerW: undefined,
      warnings: ["Invalid hex string."],
    };
  }

  var bytes = [];
  for (var i = 0; i < clean.length; i += 2) {
    var byteStr = clean.substr(i, 2);
    bytes.push(parseInt(byteStr, 16));
  }

  return parseVendorFrameBytes(new Uint8Array(bytes));
}
