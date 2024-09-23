//Mon Sep 23 2024 04:59:17 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("赛盾VPN", {
  "logLevel": "info"
});
var body = $response.body;
$.log(body);
const code = /"code":(\d+)/.exec(body)?.[1] || 0;
$.log("code: " + code);
code != 200 ? ($.error("接口报错: " + (body.msg || "未知错误")), $.done({})) : (async () => {
  try {
    const iiIlii11 = await loadUtils();
    $.log("Utils loaded");
    $.log("Utils Object: " + JSON.stringify(iiIlii11));
    if (!iiIlii11 || typeof iiIlii11.createCryptoJS !== "function") {
      throw new ReferenceError("Utils 或 createCryptoJS 方法未正确加载");
    }
    const lI1IlllI = iiIlii11.createCryptoJS();
    $.log("CryptoJS created");
    if (!lI1IlllI) throw new ReferenceError("CryptoJS 变量未定义");
    body = $.toObj(body);
    const l1l1ilii = body.result.url,
      l1l1il1l = lI1IlllI.enc.Utf8.parse("TmPrPhkOf8by0cvx"),
      liIIll1l = lI1IlllI.enc.Utf8.parse("TmPrPhkOf8by0cvx"),
      ill11iI1 = AES_Decrypt(l1l1ilii, l1l1il1l, liIIll1l, lI1IlllI);
    $.log("Decrypted URL: " + ill11iI1);
    $.msg($.name, "🎉尊重原创@iuiuiui1解密成功", "URL: ".concat(ill11iI1));
  } catch (Il1I11iI) {
    $.logErr(Il1I11iI);
  } finally {
    $.done({
      "body": body
    });
  }
})();
function AES_Decrypt(lii1Il1, l1IlI111, iIIIIIll, III1IilI) {
  var ii11iI1 = III1IilI.AES.decrypt(lii1Il1, l1IlI111, {
    "iv": iIIIIIll,
    "mode": III1IilI.mode.CBC,
    "padding": III1IilI.pad.Pkcs7
  });
  return ii11iI1.toString(III1IilI.enc.Utf8);
}
async function loadUtils() {
  let lIiIlii = $.getdata("Utils_Code") || "";
  if (lIiIlii && lIiIlii.length) {
    return console.log("✅ " + $.name + ": 缓存中存在Utils代码, 跳过下载"), eval(lIiIlii), creatUtils();
  }
  return console.log("🚀 " + $.name + ": 开始下载Utils代码"), new Promise(i111l1I => {
    $.getScript("https://cdn.jsdelivr.net/gh/xzxxn777/Surge@main/Utils/Utils.js").then(liliIiII => {
      $.setdata(liliIiII, "Utils_Code");
      eval(liliIiII);
      console.log("✅ Utils加载成功, 请继续");
      i111l1I(creatUtils());
    });
  });
}