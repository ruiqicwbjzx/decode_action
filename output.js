//Fri Sep 06 2024 07:30:10 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
//Fri Sep 06 2024 07:28:32 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var encode_version = "jsjiami.com.v5";
var _0x8b597a = $response.body;
var _0x467987 = $request.url;
const _0x323e03 = "/v3/app/config/check";
const _0x279430 = "apipc01.gushi.cn";
const _0x1a57eb = "/users/vipinfos";
if (typeof _0x8b597a === "string") {
  if (_0x467987.indexOf(_0x279430) !== -1) {
    _0x8b597a = _0x8b597a.replace(/"isVIP":\d/g, "\"isVIP\":0").replace(/"isVip":\d/g, "\"isVip\":0").replace(/"commentCount":\w/g, "\"commentCount\":-1").replace(/"isEnd":\w/g, "\"isEnd\":1").replace(/"type":\w/g, "\"type\":0").replace(/"coinPayment":\w/g, "\"coinPayment\":0").replace(/"VIP":\d/g, "\"VIP\":1");
  }
  var _0x47dda3;
  try {
    _0x47dda3 = JSON.parse(_0x8b597a);
    if (_0x467987.indexOf(_0x323e03) !== -1) {
      _0x47dda3.userVipInfo.vip = 1;
      _0x47dda3.userVipInfo.endDay = 32493834549000;
      _0x47dda3.userVipInfo.ticketEndDay = 32493834549000;
      _0x47dda3.userVipInfo.nickName = "https://t.me/GieGie777";
      _0x47dda3.userVipInfo.coinNum = 999880;
      _0x47dda3.userVipInfo.ticketCount = 9998880;
      _0x47dda3.userVipInfo.isMonthly = 999880;
      _0x47dda3.abtest_v = 1;
      _0x47dda3.emojiV = 1;
      _0x47dda3.noticeOpenDonation.coins = 999880;
      _0x8b597a = JSON.stringify(_0x47dda3);
    }
    if (_0x467987.indexOf(_0x1a57eb) !== -1) {
      _0x47dda3.userVipInfo.vip = 1;
      _0x47dda3.userVipInfo.ticketEndDay = 32493834549000;
      _0x47dda3.userVipInfo.endDay = 32493834549000;
      _0x47dda3.userVipInfo.isMonthly = 999880;
      _0x47dda3.userVipInfo.coinNum = 999880;
      _0x47dda3.userVipInfo.ticketCount = 999880;
      _0x8b597a = JSON.stringify(_0x47dda3);
    }
  } catch (_0x1d9623) {
    console.log("JSON \u89E3\u6790\u9519\u8BEF: " + _0x1d9623.message);
  }
}
$done({
  body: _0x8b597a
});
(function (_0x18c629, _0x5af4b8, _0x55f6e6) {
  var _0x56556d = function () {
    var _0x1a36da = true;
    return function (_0x429235, _0xfd802f) {
      var _0x26114b = _0x1a36da ? function () {
        if (_0xfd802f) {
          var _0x3606a7 = _0xfd802f.apply(_0x429235, arguments);
          _0xfd802f = null;
          return _0x3606a7;
        }
      } : function () {};
      _0x1a36da = false;
      return _0x26114b;
    };
  }();
  var _0x28a2ab = _0x56556d(this, function () {
    var _0x3cf7be = function () {};
    var _0xb738f9 = typeof window !== "undefined" ? window : typeof process === "object" && typeof require === "function" && typeof global === "object" ? global : this;
    if (!_0xb738f9.console) {
      _0xb738f9.console = function (_0x403882) {
        var _0x55f6e6 = {};
        _0x55f6e6.log = _0x403882;
        _0x55f6e6.warn = _0x403882;
        _0x55f6e6.debug = _0x403882;
        _0x55f6e6.info = _0x403882;
        _0x55f6e6.error = _0x403882;
        _0x55f6e6.exception = _0x403882;
        _0x55f6e6.trace = _0x403882;
        return _0x55f6e6;
      }(_0x3cf7be);
    } else {
      _0xb738f9.console.log = _0x3cf7be;
      _0xb738f9.console.warn = _0x3cf7be;
      _0xb738f9.console.debug = _0x3cf7be;
      _0xb738f9.console.info = _0x3cf7be;
      _0xb738f9.console.error = _0x3cf7be;
      _0xb738f9.console.exception = _0x3cf7be;
      _0xb738f9.console.trace = _0x3cf7be;
    }
  });
  _0x28a2ab();
  _0x55f6e6 = "al";
  try {
    _0x55f6e6 += "ert";
    _0x5af4b8 = encode_version;
    if (!(typeof _0x5af4b8 !== "undefined" && _0x5af4b8 === "jsjiami.com.v5")) {
      _0x18c629[_0x55f6e6]("\u5220\u9664\u7248\u672C\u53F7\uFF0Cjs\u4F1A\u5B9A\u671F\u5F39\u7A97\uFF0C\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C");
    }
  } catch (_0x8e93c5) {
    _0x18c629[_0x55f6e6]("\u5220\u9664\u7248\u672C\u53F7\uFF0Cjs\u4F1A\u5B9A\u671F\u5F39\u7A97");
  }
})(window);
encode_version = "jsjiami.com.v5";