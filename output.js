//Fri Sep 06 2024 09:23:28 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var _0x59e2b4;
var _0x53a854 = $response.body;
_0x59e2b4 = 9;
var _0x24fe38;
var _0x3a6760 = $request.url;
_0x24fe38 = 8;
const _0x1b9246 = "https://display-sc.miguvideo.com/display/v3/static/";
var _0x53a854 = $response.body.replace(/"toast":"[^"]+/g, "\"toast\": \"作者Telegram频道:https://t.me/GieGie777");
var _0x5dfe3d = JSON.parse(_0x53a854);
if (_0x3a6760.indexOf(_0x1b9246) != -1) {
  _0x5dfe3d.body.data[0].subTitle = "t.me/GieGie777";
  _0x5dfe3d.body.data[0].title = "已是永久会员";
  _0x53a854 = JSON.stringify(_0x5dfe3d);
}
$done({
  body: _0x53a854
});