//Sun Oct 20 2024 04:18:01 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
if (typeof $request !== "undefined") {
  const _0x1cf759 = "https://ioa.onskrgames.uk/getLines";
  console.log("替换后的 URL: " + _0x1cf759);
  $done({
    "url": _0x1cf759
  });
} else console.log("无法重写 URL，因为 $request 未定义"), $done({});