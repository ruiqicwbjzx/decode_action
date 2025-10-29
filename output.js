//Wed Oct 29 2025 02:11:14 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
//Wed Oct 29 2025 02:09:39 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
function sleep(_0x114c08) {
  return new Promise(_0x4134d8 => setTimeout(_0x4134d8, _0x114c08));
}
async function robustSleep(_0x1d7e6b) {
  const _0x178193 = Date["now"](),
    _0x53e83c = _0x178193 + _0x1d7e6b;
  while (Date["now"]() < _0x53e83c) {
    await new Promise(_0x35fbd4 => setTimeout(_0x35fbd4, Math["min"](100, _0x53e83c - Date["now"]())));
  }
}
function calculateLuhnCheckDigit(_0x1a4bbd) {
  let _0x50a170 = 0,
    _0x2e6d8f = !![];
  for (let _0x5eee9e = _0x1a4bbd["length"] - 1; _0x5eee9e >= 0; _0x5eee9e--) {
    let _0x4025f4 = parseInt(_0x1a4bbd[_0x5eee9e]);
    _0x2e6d8f && (_0x4025f4 *= 2, _0x4025f4 > 9 && (_0x4025f4 -= 9)), _0x50a170 += _0x4025f4, _0x2e6d8f = !_0x2e6d8f;
  }
  const _0x246ae8 = (10 - _0x50a170 % 10) % 10;
  return _0x246ae8["toString"]();
}
function isValidLuhn(_0x3a46c4) {
  let _0x28ab78 = 0,
    _0x2a8091 = ![];
  for (let _0x305f9d = _0x3a46c4["length"] - 1; _0x305f9d >= 0; _0x305f9d--) {
    let _0x38bde3 = parseInt(_0x3a46c4[_0x305f9d]);
    _0x2a8091 && (_0x38bde3 *= 2, _0x38bde3 > 9 && (_0x38bde3 -= 9)), _0x28ab78 += _0x38bde3, _0x2a8091 = !_0x2a8091;
  }
  return _0x28ab78 % 10 === 0;
}
function calculateCheckDigit(_0xca8de8) {
  return calculateLuhnCheckDigit(_0xca8de8);
}
function isValidCardNumber(_0x3e5e65) {
  return isValidLuhn(_0x3e5e65);
}
const MII_DEFINITIONS = {
    "0": "ISO/TC 68 and other industry assignments",
    "1": "Airlines",
    "2": "Airlines and other future industry assignments",
    "3": "Travel and Entertainment (American Express, Diners Club, JCB, etc.)",
    "4": "Banking and Financial (Visa)",
    "5": "Banking and Financial (MasterCard)",
    "6": "Merchandising and Banking/Financial (Discover, UnionPay)",
    "7": "Petroleum and other future industry assignments",
    "8": "Healthcare, Telecommunications and other future industry assignments",
    "9": "National assignment"
  },
  VALID_BIN_RANGES = {
    "Visa": [{
      "start": "4",
      "length": 1
    }],
    "MasterCard": [{
      "start": "51",
      "end": "55"
    }, {
      "start": "2221",
      "end": "2720"
    }],
    "American Express": [{
      "start": "34",
      "length": 2
    }, {
      "start": "37",
      "length": 2
    }],
    "Diners Club": [{
      "start": "36",
      "length": 2
    }, {
      "start": "38",
      "length": 2
    }, {
      "start": "300",
      "end": "305"
    }, {
      "start": "309",
      "length": 3
    }],
    "Discover": [{
      "start": "6011",
      "length": 4
    }, {
      "start": "622126",
      "end": "622925"
    }, {
      "start": "644",
      "end": "649"
    }, {
      "start": "65",
      "length": 2
    }],
    "JCB": [{
      "start": "3528",
      "end": "3589"
    }],
    "UnionPay": [{
      "start": "62",
      "length": 2
    }]
  };
function validateBinFormat(_0x488b15) {
  const _0x4d7fe9 = _0x488b15["toString"]()["trim"]();
  if (!_0x4d7fe9 || _0x4d7fe9["length"] < 4) return {
    "valid": ![],
    "error": "BIN\u957F\u5EA6\u81F3\u5C11\u9700\u89814\u4F4D\u6570\u5B57",
    "code": "BIN_TOO_SHORT"
  };
  if (_0x4d7fe9["length"] > 10) return {
    "valid": ![],
    "error": "BIN\u957F\u5EA6\u4E0D\u5E94\u8D85\u8FC710\u4F4D\u6570\u5B57",
    "code": "BIN_TOO_LONG"
  };
  if (!/^\d+$/["test"](_0x4d7fe9)) return {
    "valid": ![],
    "error": "BIN\u53EA\u80FD\u5305\u542B\u6570\u5B57",
    "code": "BIN_INVALID_CHARS"
  };
  const _0x3a92e2 = _0x4d7fe9[0];
  if (!MII_DEFINITIONS[_0x3a92e2]) return {
    "valid": ![],
    "error": "\u65E0\u6548\u7684\u4E3B\u8981\u884C\u4E1A\u6807\u8BC6\u7B26\uFF08MII\uFF09: " + _0x3a92e2,
    "code": "INVALID_MII"
  };
  if (!["3", "4", "5", "6"]["includes"](_0x3a92e2)) return {
    "valid": ![],
    "error": "MII " + _0x3a92e2 + " \u4E0D\u5C5E\u4E8E\u94F6\u884C\u91D1\u878D\u7C7B\u522B\uFF0C\u5E94\u8BE5\u662F3\u30014\u30015\u62166\u5F00\u5934",
    "code": "NON_BANKING_MII",
    "miiType": MII_DEFINITIONS[_0x3a92e2]
  };
  return {
    "valid": !![],
    "mii": _0x3a92e2,
    "miiType": MII_DEFINITIONS[_0x3a92e2],
    "binLength": _0x4d7fe9["length"]
  };
}
function validateBinRange(_0x359a55) {
  const _0x5dc62c = _0x359a55["toString"]();
  let _0x4415a2 = [];
  for (const [_0x454fee, _0x24d9bf] of Object["entries"](VALID_BIN_RANGES)) {
    for (const _0x46cf28 of _0x24d9bf) {
      if (_0x46cf28["length"]) {
        if (_0x5dc62c["startsWith"](_0x46cf28["start"])) {
          _0x4415a2["push"](_0x454fee);
          break;
        }
      } else {
        if (_0x46cf28["end"]) {
          const _0x3f3ad6 = _0x5dc62c["substring"](0, _0x46cf28["start"]["length"]),
            _0x32ddfb = parseInt(_0x46cf28["start"]),
            _0x1e2859 = parseInt(_0x46cf28["end"]),
            _0x446024 = parseInt(_0x3f3ad6);
          if (_0x446024 >= _0x32ddfb && _0x446024 <= _0x1e2859) {
            _0x4415a2["push"](_0x454fee);
            break;
          }
        }
      }
    }
  }
  if (_0x4415a2["length"] > 0) return {
    "valid": !![],
    "matchedBrands": _0x4415a2,
    "primaryBrand": _0x4415a2[0]
  };
  return {
    "valid": ![],
    "error": "BIN\u4E0D\u5339\u914D\u4EFB\u4F55\u5DF2\u77E5\u7684\u94F6\u884C\u5361\u54C1\u724C\u8303\u56F4",
    "code": "UNKNOWN_BIN_RANGE"
  };
}
function validateBin(_0x33a1b9) {
  const _0x324843 = _0x33a1b9["toString"]()["trim"]();
  console["log"]("\n\uD83D\uDD0D \u5F00\u59CB\u6821\u9A8CBIN: " + _0x324843);
  const _0x1d74c6 = validateBinFormat(_0x324843);
  if (!_0x1d74c6["valid"]) return console["error"]("\u274C BIN\u683C\u5F0F\u6821\u9A8C\u5931\u8D25: " + _0x1d74c6["error"]), _0x1d74c6;
  console["log"]("\u2705 BIN\u683C\u5F0F\u6821\u9A8C\u901A\u8FC7"), console["log"]("   - MII: " + _0x1d74c6["mii"] + " (" + _0x1d74c6["miiType"] + ")"), console["log"]("   - BIN\u957F\u5EA6: " + _0x1d74c6["binLength"] + "\u4F4D");
  const _0x288982 = validateBinRange(_0x324843);
  if (!_0x288982["valid"]) return console["warn"]("\u26A0\uFE0F BIN\u8303\u56F4\u6821\u9A8C\u5931\u8D25: " + _0x288982["error"]), console["warn"]("   \u8BE5BIN\u53EF\u80FD\u4E0D\u662F\u5E38\u89C1\u94F6\u884C\u5361\u54C1\u724C\uFF0C\u4F46\u4ECD\u53EF\u5C1D\u8BD5\u751F\u6210"), {
    "valid": !![],
    "warning": _0x288982["error"],
    "mii": _0x1d74c6["mii"],
    "miiType": _0x1d74c6["miiType"],
    "isUnknownBrand": !![]
  };
  return console["log"]("\u2705 BIN\u8303\u56F4\u6821\u9A8C\u901A\u8FC7"), console["log"]("   - \u5339\u914D\u54C1\u724C: " + _0x288982["matchedBrands"]["join"](", ")), console["log"]("   - \u4E3B\u8981\u54C1\u724C: " + _0x288982["primaryBrand"]), {
    "valid": !![],
    "mii": _0x1d74c6["mii"],
    "miiType": _0x1d74c6["miiType"],
    "binLength": _0x1d74c6["binLength"],
    "matchedBrands": _0x288982["matchedBrands"],
    "primaryBrand": _0x288982["primaryBrand"]
  };
}
function detectCardBrand(_0x3967e9) {
  const _0x20f48e = _0x3967e9["toString"]();
  if (_0x20f48e["startsWith"]("4")) return {
    "name": "Visa",
    "length": 16,
    "cvvLength": 3
  };
  if (/^5[1-5]/["test"](_0x20f48e)) return {
    "name": "MasterCard",
    "length": 16,
    "cvvLength": 3
  };
  if (_0x20f48e["startsWith"]("2")) {
    if (_0x20f48e["length"] >= 4) {
      const _0x55f005 = parseInt(_0x20f48e["slice"](0, 4), 10);
      if (_0x55f005 >= 2221 && _0x55f005 <= 2720) return {
        "name": "MasterCard",
        "length": 16,
        "cvvLength": 3
      };
    }
  }
  if (_0x20f48e["startsWith"]("34") || _0x20f48e["startsWith"]("37")) return {
    "name": "American Express",
    "length": 15,
    "cvvLength": 4
  };
  if (_0x20f48e["startsWith"]("62")) return {
    "name": "UnionPay",
    "length": 16,
    "cvvLength": 3
  };
  if (_0x20f48e["startsWith"]("6011") || /^64[4-9]/["test"](_0x20f48e) || _0x20f48e["startsWith"]("65")) return {
    "name": "Discover",
    "length": 16,
    "cvvLength": 3
  };
  if (_0x20f48e["startsWith"]("36") || _0x20f48e["startsWith"]("38")) return {
    "name": "Diners Club",
    "length": 14,
    "cvvLength": 3
  };
  if (/^35[2-8]/["test"](_0x20f48e)) return {
    "name": "JCB",
    "length": 16,
    "cvvLength": 3
  };
  return {
    "name": "Unknown",
    "length": 16,
    "cvvLength": 3
  };
}
function getRealisticRandomDigit() {
  const _0x260792 = [0.09, 0.1, 0.11, 0.1, 0.1, 0.11, 0.1, 0.09, 0.1, 0.1],
    _0x33cdfc = Math["random"]();
  let _0x2c116e = 0;
  for (let _0x10ae4a = 0; _0x10ae4a < _0x260792["length"]; _0x10ae4a++) {
    _0x2c116e += _0x260792[_0x10ae4a];
    if (_0x33cdfc < _0x2c116e) return _0x10ae4a;
  }
  return 5;
}
function generateBankStandardAccountSegment(_0x1e4cea, _0x40ad49, _0x5ef37d) {
  const _0x992d4e = {
      0: [0.05, 0.15, 0.15, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.05],
      1: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1],
      "default": [0.08, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.04]
    },
    _0x4af365 = _0x992d4e[_0x1e4cea] || _0x992d4e["default"],
    _0x10a198 = Math["random"]();
  let _0x4e99aa = 0;
  for (let _0xbf64cf = 0; _0xbf64cf < _0x4af365["length"]; _0xbf64cf++) {
    _0x4e99aa += _0x4af365[_0xbf64cf];
    if (_0x10a198 < _0x4e99aa) return _0xbf64cf["toString"]();
  }
  return "5";
}
function generateAdvancedAccountSegment(_0xca2b6, _0x5dc495) {
  let _0x2c45de = 0;
  const _0x3a80dc = 100;
  while (_0x2c45de < _0x3a80dc) {
    let _0x2d5b46 = "";
    const _0x5bd24d = parseInt(_0x5dc495["slice"](-4)) % 1000,
      _0x38954a = String(Math["floor"](_0x5bd24d / 10) % 100)["padStart"](2, "0"),
      _0x47d297 = [0.7, 0.2, 0.1],
      _0x222b95 = weightedRandom(_0x47d297);
    if (_0xca2b6 >= 2) {
      const _0x3c86c6 = Math["floor"](Math["random"]() * 10);
      _0x2d5b46 += String((parseInt(_0x38954a[0]) + _0x3c86c6) % 10), _0x2d5b46 += String((parseInt(_0x38954a[1]) + Math["floor"](Math["random"]() * 3)) % 10);
    }
    const _0x2c8981 = _0xca2b6 - _0x2d5b46["length"];
    for (let _0xb73495 = 0; _0xb73495 < _0x2c8981; _0xb73495++) {
      const _0xd69aba = _0x2d5b46["length"];
      if (_0x222b95 === 0) _0x2d5b46 += generateBankStandardAccountSegment(_0xd69aba, _0x2d5b46, _0xca2b6);else _0x222b95 === 1 ? _0xd69aba === 2 ? _0x2d5b46 += weightedRandom([0.1, 0.1, 0.3, 0.3, 0.1, 0.05, 0.05, 0, 0, 0]) : _0x2d5b46 += generateBankStandardAccountSegment(_0xd69aba, _0x2d5b46, _0xca2b6) : _0xd69aba < 4 ? _0x2d5b46 += String(Math["floor"](Math["random"]() * 10)) : _0x2d5b46 += generateBankStandardAccountSegment(_0xd69aba, _0x2d5b46, _0xca2b6);
    }
    return _0x2d5b46;
    _0x2c45de++;
  }
  let _0x5b4144 = "";
  for (let _0x28794f = 0; _0x28794f < _0xca2b6; _0x28794f++) {
    _0x5b4144 += generateBankStandardAccountSegment(_0x28794f, _0x5b4144, _0xca2b6);
  }
  return _0x5b4144;
}
function weightedRandom(_0x123fd3) {
  const _0x4426d4 = Math["random"]();
  let _0x5bae9b = 0;
  for (let _0xc80436 = 0; _0xc80436 < _0x123fd3["length"]; _0xc80436++) {
    _0x5bae9b += _0x123fd3[_0xc80436];
    if (_0x4426d4 < _0x5bae9b) return _0xc80436;
  }
  return _0x123fd3["length"] - 1;
}
function generateRealisticExpiryDate() {
  const _0x2f8d31 = new Date(),
    _0x1757b2 = _0x2f8d31["getFullYear"](),
    _0x4b3160 = _0x2f8d31["getMonth"]() + 1,
    _0x47e155 = Math["floor"](Math["random"]() * 3) + 3;
  let _0x5c96fa = _0x1757b2 + _0x47e155,
    _0x341243;
  if (Math["random"]() < 0.7) {
    const _0x1f5dfe = [3, 6, 9, 12];
    _0x341243 = _0x1f5dfe[Math["floor"](Math["random"]() * _0x1f5dfe["length"])];
  } else _0x341243 = Math["floor"](Math["random"]() * 12) + 1;
  return _0x5c96fa === _0x1757b2 && _0x341243 <= _0x4b3160 && _0x5c96fa++, {
    "expMonth": String(_0x341243)["padStart"](2, "0"),
    "expYear": String(_0x5c96fa)["slice"](-2)
  };
}
function generateCVV(_0x5f48a1, _0x244ab2, _0x5b6859 = 3) {
  if (_0x244ab2 || _0x5b6859 === 4) return String(Math["floor"](Math["random"]() * 9000) + 1000);else {
    let _0x11e5a4;
    do {
      _0x11e5a4 = Math["floor"](Math["random"]() * 900) + 100;
      const _0x4791c9 = String(_0x11e5a4);
      if (_0x4791c9[0] !== _0x4791c9[1] || _0x4791c9[1] !== _0x4791c9[2]) break;
    } while (!![]);
    return String(_0x11e5a4);
  }
}
function formatCardNumber(_0x4d8247, _0x4b7384) {
  return _0x4b7384 ? _0x4d8247["replace"](/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3") : _0x4d8247["replace"](/(\d{4})(?=\d)/g, "$1 ");
}
function generateCardInfo(_0x567c59) {
  if (!_0x567c59 || _0x567c59["length"] === 0) throw new Error("\u5FC5\u987B\u63D0\u4F9BBIN\u524D\u7F00");
  const _0x467e04 = _0x567c59["toString"]()["replace"](/\D/g, ""),
    _0x15493b = validateBin(_0x467e04);
  if (!_0x15493b["valid"]) throw new Error("BIN\u6821\u9A8C\u5931\u8D25: " + _0x15493b["error"] + " (\u9519\u8BEF\u7801: " + _0x15493b["code"] + ")");
  _0x15493b["warning"] && console["warn"]("\u26A0\uFE0F BIN\u6821\u9A8C\u8B66\u544A: " + _0x15493b["warning"]);
  const _0x3ac232 = detectCardBrand(_0x467e04),
    _0xb4c7f1 = _0x3ac232["length"],
    _0x3e8429 = _0x3ac232["name"] === "American Express",
    _0x1163e2 = _0xb4c7f1 - _0x467e04["length"];
  if (_0x1163e2 <= 1) throw new Error("BIN\u957F\u5EA6\u8FC7\u957F\uFF0C\u65E0\u6CD5\u751F\u6210" + _0xb4c7f1 + "\u4F4D\u5361\u53F7");
  let _0x593a17 = 0;
  const _0x4b2a13 = 50;
  let _0xcf0332 = null;
  while (_0x593a17 < _0x4b2a13) {
    try {
      const _0x473c73 = _0x1163e2 - 1;
      let _0x4228dc = _0x467e04;
      if (_0x473c73 > 0) {
        const _0xf27032 = generateAdvancedAccountSegment(_0x473c73, _0x467e04);
        _0x4228dc += _0xf27032;
      }
      const _0x5cce79 = calculateCheckDigit(_0x4228dc),
        _0x3337c2 = _0x4228dc + _0x5cce79;
      if (_0x3337c2["length"] !== _0xb4c7f1) {
        console["error"]("\u274C \u5361\u53F7\u957F\u5EA6\u9519\u8BEF: \u671F\u671B" + _0xb4c7f1 + "\u4F4D\uFF0C\u5B9E\u9645" + _0x3337c2["length"] + "\u4F4D", _0x3337c2), console["error"]("BIN\u957F\u5EA6: " + _0x467e04["length"] + ", \u8D26\u6237\u6BB5\u957F\u5EA6: " + _0x473c73 + ", \u6821\u9A8C\u4F4D: 1\u4F4D");
        throw new Error("\u751F\u6210\u7684\u5361\u53F7\u957F\u5EA6\u4E0D\u6B63\u786E: \u671F\u671B" + _0xb4c7f1 + "\u4F4D\uFF0C\u5B9E\u9645" + _0x3337c2["length"] + "\u4F4D");
      }
      if (!isValidCardNumber(_0x3337c2)) {
        console["warn"]("\u751F\u6210\u7684\u5361\u53F7\u672A\u901A\u8FC7Luhn\u6821\u9A8C:", _0x3337c2), _0x593a17++;
        continue;
      }
      const {
          expMonth: _0x23c656,
          expYear: _0x2a736e
        } = generateRealisticExpiryDate(),
        _0x748b06 = generateCVV(_0x467e04, _0x3e8429, _0x3ac232["cvvLength"]);
      _0xcf0332 = {
        "cardNumber": formatCardNumber(_0x3337c2, _0x3e8429),
        "expiryDate": _0x23c656 + "/" + _0x2a736e,
        "cvc": _0x748b06,
        "cardBrand": _0x3ac232["name"]
      };
      break;
    } catch (_0x38159a) {
      console["error"]("\u751F\u6210\u5361\u53F7\u5C1D\u8BD5 " + (_0x593a17 + 1) + " \u5931\u8D25:", _0x38159a["message"]);
    }
    _0x593a17++;
  }
  if (_0xcf0332) return _0xcf0332;
  throw new Error("\u65E0\u6CD5\u751F\u6210\u7B26\u5408\u8981\u6C42\u7684\u9AD8\u8D28\u91CF\u5361\u53F7\uFF0C\u8BF7\u5C1D\u8BD5\u66F4\u6362BIN\u6216\u7A0D\u540E\u91CD\u8BD5");
}
async function getCheckoutUrl(_0x3bff85 = "pro") {
  console["log"]("\uD83D\uDCB3 \u83B7\u53D6\u7ED1\u5361\u9875\u9762URL...");
  const _0x4b7617 = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "zh-CN,zh;q=0.9",
      "Content-Type": "application/json",
      "Origin": "https://cursor.com",
      "Priority": "u=1, i",
      "Referer": "https://cursor.com/dashboard",
      "Sec-Ch-Ua-Arch": "\"x86\"",
      "Sec-Ch-Ua-Bitness": "\"64\"",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "\"Windows\"",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": navigator["userAgent"]
    },
    _0x33fe93 = {
      "allowAutomaticPayment": !![],
      "allowTrial": !![],
      "tier": _0x3bff85
    };
  try {
    console["log"]("\uD83D\uDCE1 \u53D1\u9001POST\u8BF7\u6C42\u5230: https://cursor.com/api/checkout"), console["log"]("\uD83D\uDCE6 \u8BF7\u6C42\u6570\u636E:", _0x33fe93);
    const _0x1a28c8 = await fetch("https://cursor.com/api/checkout", {
      "method": "POST",
      "headers": _0x4b7617,
      "body": JSON["stringify"](_0x33fe93),
      "credentials": "include"
    });
    console["log"]("\uD83D\uDD0D \u7ED1\u5361\u54CD\u5E94\u72B6\u6001: " + _0x1a28c8["status"]);
    if (_0x1a28c8["status"] === 200) try {
      const _0x4e113b = await _0x1a28c8["json"]();
      return console["log"]("\u2705 \u7ED1\u5361\u9875\u9762\u8BF7\u6C42\u6210\u529F!"), console["log"]("\uD83D\uDD17 \u7ED1\u5361\u9875\u9762URL: " + _0x4e113b), _0x4e113b && _0x4e113b["includes"]("checkout.stripe.com") ? (console["log"]("\u2705 \u68C0\u6D4B\u5230Stripe\u652F\u4ED8\u9875\u9762"), {
        "success": !![],
        "url": _0x4e113b
      }) : (console["warn"]("\u26A0\uFE0F \u8FD4\u56DE\u7684URL\u4E0D\u662F\u9884\u671F\u7684Stripe\u652F\u4ED8\u9875\u9762"), {
        "success": ![],
        "url": null,
        "error": "Invalid checkout URL"
      });
    } catch (_0x4871e9) {
      const _0xb834dc = await _0x1a28c8["text"]();
      return console["error"]("\u26A0\uFE0F \u54CD\u5E94\u89E3\u6790\u5931\u8D25: " + _0xb834dc["substring"](0, 200) + "..."), {
        "success": ![],
        "url": null,
        "error": "Response parse error"
      };
    } else {
      const _0x29602e = await _0x1a28c8["text"]();
      return console["error"]("\u274C \u7ED1\u5361\u9875\u9762\u8BF7\u6C42\u5931\u8D25: " + _0x1a28c8["status"]), console["error"]("\uD83D\uDCC4 \u9519\u8BEF\u54CD\u5E94: " + _0x29602e["substring"](0, 200) + "..."), {
        "success": ![],
        "url": null,
        "error": "HTTP " + _0x1a28c8["status"] + ": " + _0x29602e["substring"](0, 100)
      };
    }
  } catch (_0x47f771) {
    return console["error"]("\u274C \u7ED1\u5361\u8BF7\u6C42\u5F02\u5E38: " + _0x47f771["message"]), {
      "success": ![],
      "url": null,
      "error": _0x47f771["message"]
    };
  }
}