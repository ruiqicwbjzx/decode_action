//Sat Sep 07 2024 16:27:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
let body = $response.body;
const replacements = {
  "\"free\"\\s*:\\s*[^,}]": "\"free\":1",
  "\"isSVip\"\\s*:\\s*[^,}]": "\"isSVip\":\"1\"",
  "\"validTimne\"\\s*:\\s*null": "\"validTimne\":\"2099-09-09\"",
  "\"validTimne\"\\s*:\\s*[^,}]": "\"validTimne\":\"2099-09-09\"",
  "\"memType\"\\s*:\\s*[^,}]": "\"memType\":3",
  "\"isXiaoduMember\"\\s*:\\s*\"0\"": "\"isXiaoduMember\":\"1\""
};
for (const [pattern, replacement] of Object.entries(replacements)) {
  const regex = new RegExp(pattern, "g");
  body = body.replace(regex, replacement);
}
$done({
  "body": body
});