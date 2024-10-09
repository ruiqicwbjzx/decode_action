//Wed Oct 09 2024 09:40:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
function lllil1il() {
  let i11i1iII = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    II1liilI = "";
  for (let liliiliI = 0; liliiliI < 36; liliiliI++) {
    liliiliI === 8 || liliiliI === 13 || liliiliI === 18 || liliiliI === 23 ? II1liilI += "-" : II1liilI += i11i1iII[Math.floor(Math.random() * i11i1iII.length)];
  }
  return II1liilI;
}
let lIIIIIiI = lllil1il();
const iill1iIl = {
  "url": "https://soonlink.xn--wqr30o34q.xn--io0a7i/api/v1/custom/unauthorized?uuid=" + lIIIIIiI,
  "headers": {
    "User-Agent": "Dart/3.5 (dart:io)",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Accept-Encoding": "gzip",
    "Host": "soonlink.xn--wqr30o34q.xn--io0a7i"
  }
};
function IIIiI111(l1llilI1, I11l11ll) {
  if (typeof $httpClient !== "undefined") $httpClient.get(l1llilI1, I11l11ll);else typeof http !== "undefined" ? http.get(l1llilI1, I11l11ll) : (console.log("不支持的请求环境"), $done());
}
IIIiI111(iill1iIl, (lIil1i11, liiIIil, Ii1l11i) => {
  if (lIil1i11) console.log("初次请求失败: ", lIil1i11), $done();else {
    try {
      let I11II1l = JSON.parse(Ii1l11i),
        Ii1IiI1 = I11II1l.data.auth_data;
      const iii11lil = {
        "url": "https://soonlink.xn--wqr30o34q.xn--io0a7i/api/v1/user/getSubscribe",
        "headers": {
          "User-Agent": "Dart/3.5 (dart:io)",
          "Accept": "*/*",
          "Accept-Encoding": "gzip",
          "Host": "soonlink.xn--wqr30o34q.xn--io0a7i",
          "Authorization": Ii1IiI1,
          "Content-Type": "application/json"
        }
      };
      IIIiI111(iii11lil, (il11IIii, ll1iIiil, l1I1Iil1) => {
        if (il11IIii) console.log("二次请求失败: ", il11IIii);else {
          try {
            let I1iiili1 = JSON.parse(l1I1Iil1),
              lI11ii1I = I1iiili1.data.subscribe_url,
              Iliii1 = I1iiili1.data.uuid;
            console.log("二次响应内容: ", I1iiili1);
            console.log("获取到的 uuid: " + Iliii1);
            console.log("获取到的 subscribe_url: " + lI11ii1I);
            $notification.post("订阅信息", "UUID: " + Iliii1, "订阅链接: " + lI11ii1I);
          } catch (ililllI) {
            console.log("解析二次响应数据时出错: ", ililllI.message);
          }
        }
        $done();
      });
    } catch (l1illll) {
      console.log("解析响应数据时出错: ", l1illll.message);
      $done();
    }
  }
});