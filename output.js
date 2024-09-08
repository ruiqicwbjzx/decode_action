//Sun Sep 08 2024 13:24:56 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
var encode_version = "jsjiami.com.v5";
let obj = JSON.parse($response.body);
obj = {
  request_date_ms: 1724069856509,
  request_date: "2024-08-19T12:17:36Z",
  subscriber: {
    non_subscriptions: {},
    first_seen: "2024-08-19T12:14:29Z",
    original_application_version: "877",
    other_purchases: {},
    management_url: "https://apps.apple.com/account/subscriptions",
    subscriptions: {
      "app.steps.stepsapp.premium.yearTrial.tier1": {
        original_purchase_date: "2024-08-19T12:15:44Z",
        expires_date: "2999-09-09T12:09:09Z",
        is_sandbox: false,
        refunded_at: null,
        store_transaction_id: "710001752733822",
        unsubscribe_detected_at: null,
        grace_period_expires_date: null,
        period_type: "trial",
        purchase_date: "2024-08-19T12:15:43Z",
        billing_issues_detected_at: null,
        ownership_type: "PURCHASED",
        store: "app_store",
        auto_resume_date: null
      }
    },
    entitlements: {
      stepsapp_pedometer_premium_1_year: {
        grace_period_expires_date: null,
        purchase_date: "2024-08-19T12:15:43Z",
        product_identifier: "app.steps.stepsapp.premium.yearTrial.tier1",
        expires_date: "2999-09-09T09:09:09Z"
      }
    },
    original_purchase_date: "2024-08-19T12:15:44Z",
    original_app_user_id: "$RCAnonymousID:47dc2a425f0e4ef2b0bf980e859e1111",
    last_seen: "2024-08-19T12:14:29Z"
  }
};
$done({
  body: JSON.stringify(obj)
});
(function (_0x2635a0, _0x303b4c, _0x4879fc) {
  _0x4879fc = "al";
  try {
    _0x4879fc += "ert";
    _0x303b4c = encode_version;
    if (!(typeof _0x303b4c !== "undefined" && _0x303b4c === "jsjiami.com.v5")) {
      _0x2635a0[_0x4879fc]("删除版本号，js会定期弹窗，还请支持我们的工作");
    }
  } catch (_0x1215ca) {
    _0x2635a0[_0x4879fc]("删除版本号，js会定期弹窗");
  }
})(window);
encode_version = "jsjiami.com.v5";