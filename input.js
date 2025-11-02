//Sun Nov 02 2025 15:35:57 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const vscode = require("vscode");
class BalanceApiService {
  static BASE_URL = "https://portal.withorb.com/api/v1";
  static USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
  static PRICING_UNIT_ID = "jWTJo9ptbapMWkvg";
  static async getAccountInfo(_0x2f4c9e) {
    try {
      const _0x544b21 = this.BASE_URL + "/subscriptions_from_link?token=" + encodeURIComponent(_0x2f4c9e),
        _0x16413a = new AbortController(),
        _0x4d6a74 = setTimeout(() => _0x16413a.abort(), 10000),
        _0x2677d0 = await fetch(_0x544b21, {
          method: "GET",
          headers: {
            "User-Agent": this.USER_AGENT,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          signal: _0x16413a.signal
        }).finally(() => clearTimeout(_0x4d6a74));
      if (!_0x2677d0.ok) {
        throw this.createApiError(_0x2677d0.status, "HTTP " + _0x2677d0.status + ": " + _0x2677d0.statusText, "获取账号信息失败");
      }
      const _0x30f9f1 = await _0x2677d0.json();
      if (!_0x30f9f1 || !_0x30f9f1.data || !Array.isArray(_0x30f9f1.data) || _0x30f9f1.data.length === 0) {
        throw new Error("API响应格式错误：缺少有效的订阅数据");
      }
      const _0x2a530d = _0x30f9f1.data[0];
      if (!_0x2a530d.customer || !_0x2a530d.customer.id) {
        throw new Error("API响应格式错误：缺少customer信息");
      }
      return {
        customer_id: _0x2a530d.customer.id,
        email: _0x2a530d.customer.email || "",
        plan_name: _0x2a530d.plan?.["name"] || "未知套餐",
        end_date: _0x2a530d.end_date || null
      };
    } catch (_0x128aed) {
      throw this.handleApiError(_0x128aed, "获取账号信息失败");
    }
  }
  static async getBalance(_0x66d5b9, _0x2b5f5c) {
    try {
      const _0x45afef = this.BASE_URL + "/customers/" + encodeURIComponent(_0x66d5b9) + "/ledger_summary?pricing_unit_id=" + this.PRICING_UNIT_ID + "&token=" + encodeURIComponent(_0x2b5f5c),
        _0xce1f76 = new AbortController(),
        _0x230198 = setTimeout(() => _0xce1f76.abort(), 10000),
        _0x19ff4f = await fetch(_0x45afef, {
          method: "GET",
          headers: {
            "User-Agent": this.USER_AGENT,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          signal: _0xce1f76.signal
        }).finally(() => clearTimeout(_0x230198));
      if (!_0x19ff4f.ok) {
        throw this.createApiError(_0x19ff4f.status, "HTTP " + _0x19ff4f.status + ": " + _0x19ff4f.statusText, "获取余额失败");
      }
      const _0x2f290d = await _0x19ff4f.json();
      if (!_0x2f290d || _0x2f290d.credits_balance === undefined) {
        throw new Error("API响应格式错误：缺少credits_balance字段");
      }
      return _0x2f290d.credits_balance;
    } catch (_0xd1cc35) {
      throw this.handleApiError(_0xd1cc35, "获取余额失败");
    }
  }
  static createApiError(_0x569ee8, _0x1fa2e7, _0x1291eb) {
    const _0xb334b6 = new Error(_0x1fa2e7);
    _0xb334b6.statusCode = _0x569ee8;
    _0xb334b6.isNetworkError = false;
    _0xb334b6.context = _0x1291eb;
    return _0xb334b6;
  }
  static handleApiError(_0x3ba066, _0x12b247) {
    if (_0x3ba066.name === "TypeError" && _0x3ba066.message.includes("fetch")) {
      const _0x4b1ddf = new Error("网络连接失败，请检查网络连接");
      _0x4b1ddf.isNetworkError = true;
      _0x4b1ddf.context = _0x12b247;
      return _0x4b1ddf;
    }
    if (_0x3ba066.statusCode) {
      return _0x3ba066;
    }
    const _0x5a33d3 = new Error(_0x3ba066.message || "未知错误");
    _0x5a33d3.isNetworkError = false;
    _0x5a33d3.context = _0x12b247;
    return _0x5a33d3;
  }
}
class BalanceConfigManager {
  static SECTION = "augmentBalance";
  constructor() {
    this.onConfigChangedEmitter = new vscode.EventEmitter();
    this.onConfigChanged = this.onConfigChangedEmitter.event;
    vscode.workspace.onDidChangeConfiguration(_0x46ae33 => {
      _0x46ae33.affectsConfiguration(BalanceConfigManager.SECTION) && this.onConfigChangedEmitter.fire(this.getConfig());
    });
  }
  extractTokenFromUrl(_0x57dcf7) {
    if (!_0x57dcf7 || typeof _0x57dcf7 !== "string") {
      return _0x57dcf7;
    }
    const _0x419721 = _0x57dcf7.match(/[?&]token=([^&]+)/);
    if (_0x419721) {
      return _0x419721[1];
    }
    return _0x57dcf7;
  }
  getConfig() {
    const _0x20a6d7 = vscode.workspace.getConfiguration(BalanceConfigManager.SECTION),
      _0x57389f = _0x20a6d7.get("token", "");
    return {
      token: this.extractTokenFromUrl(_0x57389f),
      updateInterval: _0x20a6d7.get("updateInterval", 600),
      enabled: _0x20a6d7.get("enabled", true)
    };
  }
  validateConfig(_0xae7423) {
    const _0xcde774 = [];
    (!_0xae7423.token || _0xae7423.token.trim() === "") && _0xcde774.push("API token不能为空");
    (_0xae7423.updateInterval < 60 || _0xae7423.updateInterval > 3600) && _0xcde774.push("更新间隔必须在60-3600秒之间");
    return {
      isValid: _0xcde774.length === 0,
      errors: _0xcde774
    };
  }
  openSettings() {
    vscode.commands.executeCommand("workbench.action.openSettings", BalanceConfigManager.SECTION);
  }
  showConfigError(_0x28b0ca) {
    const _0x1689a2 = "Augment Balance配置错误：\n" + _0x28b0ca.join("\n");
    vscode.window.showErrorMessage(_0x1689a2, "打开设置").then(_0x124836 => {
      _0x124836 === "打开设置" && this.openSettings();
    });
  }
  showConfigSuccess() {
    vscode.window.showInformationMessage("Augment Balance配置已更新");
  }
  dispose() {
    this.onConfigChangedEmitter.dispose();
  }
}
class BalanceStateManager {
  static CACHE_EXPIRY_MS = 86400000;
  constructor(_0x5819ec) {
    this.context = _0x5819ec;
    this.onStateChangedEmitter = new vscode.EventEmitter();
    this.onStateChanged = this.onStateChangedEmitter.event;
  }
  getAccountCacheKey(_0x310f3b) {
    return _0x310f3b + "_AccountInfo";
  }
  getCachedAccountData(_0xee7447) {
    try {
      const _0x7fce9f = this.getAccountCacheKey(_0xee7447),
        _0xc7700 = this.context.globalState.get(_0x7fce9f);
      if (!_0xc7700) {
        return null;
      }
      const _0x16e22c = Date.now();
      if (_0x16e22c - _0xc7700.timestamp > BalanceStateManager.CACHE_EXPIRY_MS) {
        return null;
      }
      return _0xc7700;
    } catch (_0x52d1d5) {
      console.error("[BalanceState] 获取缓存数据失败:", _0x52d1d5);
      return null;
    }
  }
  async cacheAccountData(_0x57d1e9) {
    try {
      const _0x3cc569 = this.getAccountCacheKey(_0x57d1e9.token);
      await this.context.globalState.update(_0x3cc569, _0x57d1e9);
      this.onStateChangedEmitter.fire();
    } catch (_0x1c12e0) {
      console.error("[BalanceState] 缓存账号数据失败:", _0x1c12e0);
    }
  }
  async clearAccountCache(_0x59e120) {
    try {
      const _0x7a615e = this.getAccountCacheKey(_0x59e120);
      await this.context.globalState.update(_0x7a615e, undefined);
      this.onStateChangedEmitter.fire();
    } catch (_0x4388a4) {
      console.error("[BalanceState] 清除账号缓存失败:", _0x4388a4);
    }
  }
  validateCache(_0x20ea38) {
    const _0x4c14cd = this.getCachedAccountData(_0x20ea38);
    return {
      isAccountInfoValid: _0x4c14cd !== null && !_0x4c14cd.error
    };
  }
  async cacheError(_0x26a604, _0x23c5f8) {
    try {
      const _0xbf8c79 = this.getCachedAccountData(_0x23c5f8) || {},
        _0x3ce43f = {
          ..._0xbf8c79,
          error: _0x26a604,
          timestamp: Date.now(),
          token: _0x23c5f8
        },
        _0x149985 = this.getAccountCacheKey(_0x23c5f8);
      await this.context.globalState.update(_0x149985, _0x3ce43f);
      this.onStateChangedEmitter.fire();
    } catch (_0x5aa498) {
      console.error("[BalanceState] 缓存错误信息失败:", _0x5aa498);
    }
  }
  async cleanupExpiredCache() {
    try {
      const _0x33c2be = this.context.globalState.keys(),
        _0x175545 = Date.now();
      for (const _0x46f03b of _0x33c2be) {
        if (_0x46f03b.endsWith("_AccountInfo")) {
          const _0x5b7ab6 = this.context.globalState.get(_0x46f03b);
          _0x5b7ab6 && _0x5b7ab6.timestamp && _0x175545 - _0x5b7ab6.timestamp > BalanceStateManager.CACHE_EXPIRY_MS && (await this.context.globalState.update(_0x46f03b, undefined));
        }
      }
    } catch (_0x1f231f) {
      console.error("[BalanceState] 清理过期缓存失败:", _0x1f231f);
    }
  }
  async getOrFetchAccountInfo(_0x515a73, _0x9f60a0 = false) {
    const _0x243be5 = this.getCachedAccountData(_0x515a73);
    if (!_0x9f60a0 && _0x243be5 && !_0x243be5.error && _0x243be5.customer_id) {
      return {
        customer_id: _0x243be5.customer_id,
        email: _0x243be5.email,
        plan_name: _0x243be5.plan_name,
        end_date: _0x243be5.end_date
      };
    }
    return await BalanceApiService.getAccountInfo(_0x515a73);
  }
  async fetchAccountInfo(_0x1be545, _0x4374e0 = false) {
    try {
      const _0x3c5714 = await this.getOrFetchAccountInfo(_0x1be545, _0x4374e0),
        _0x17851c = await BalanceApiService.getBalance(_0x3c5714.customer_id, _0x1be545),
        _0x54e391 = {
          customer_id: _0x3c5714.customer_id,
          email: _0x3c5714.email,
          plan_name: _0x3c5714.plan_name,
          end_date: _0x3c5714.end_date,
          balance: _0x17851c,
          timestamp: Date.now(),
          token: _0x1be545
        };
      await this.cacheAccountData(_0x54e391);
      return _0x54e391;
    } catch (_0x1242d5) {
      throw _0x1242d5;
    }
  }
  dispose() {
    this.onStateChangedEmitter.dispose();
  }
}
class BalanceStatusBarManager {
  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    this.statusBarItem.command = "augmentBalance.openSettings";
    this.setNotConfigured();
    this.statusBarItem.show();
  }
  setNormal(_0x3062c9) {
    if (!_0x3062c9 || !_0x3062c9.balance) {
      this.setError("数据无效");
      return;
    }
    const _0x429a9c = parseFloat(_0x3062c9.balance);
    let _0x423911, _0x36b5df;
    if (_0x429a9c <= 5) {
      _0x423911 = "😟";
      _0x36b5df = "#ff4444";
    } else {
      _0x429a9c < 25 ? (_0x423911 = "🙂", _0x36b5df = "#ffaa00") : (_0x423911 = "😆", _0x36b5df = "#00aa00");
    }
    this.statusBarItem.text = _0x423911 + " " + _0x429a9c.toFixed(2);
    this.statusBarItem.color = _0x36b5df;
    this.statusBarItem.tooltip = this.createTooltip(_0x3062c9);
    this.statusBarItem.backgroundColor = undefined;
  }
  setLoading(_0x185751 = null) {
    this.statusBarItem.text = "⏳ 余额加载中...";
    this.statusBarItem.color = "#888888";
    this.statusBarItem.backgroundColor = undefined;
    _0x185751 ? this.statusBarItem.tooltip = "正在更新余额...\n\n" + this.createTooltip(_0x185751) : this.statusBarItem.tooltip = "正在获取余额信息...";
  }
  setNotConfigured() {
    this.statusBarItem.text = "⚙️ 余额未配置";
    this.statusBarItem.color = "#888888";
    this.statusBarItem.backgroundColor = undefined;
    this.statusBarItem.tooltip = "点击配置Augment余额显示\n\n需要设置API Token才能显示余额信息";
  }
  setError(_0x46641b, _0x1dfa35 = null) {
    this.statusBarItem.text = "❌ 余额错误";
    this.statusBarItem.color = "#ff4444";
    this.statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.errorBackground");
    let _0x249282 = "余额获取失败: " + _0x46641b + "\n\n点击打开设置页面";
    _0x1dfa35 && _0x1dfa35.balance && (_0x249282 += "\n\n上次成功获取的余额: " + parseFloat(_0x1dfa35.balance).toFixed(2), _0x249282 += "\n更新时间: " + new Date(_0x1dfa35.timestamp).toLocaleString());
    this.statusBarItem.tooltip = _0x249282;
  }
  updateFromCache(_0x406d9f, _0x3c7e21) {
    if (!_0x3c7e21) {
      this.setNotConfigured();
      return;
    }
    if (!_0x406d9f) {
      this.setLoading();
      return;
    }
    if (_0x406d9f.error) {
      this.setError(_0x406d9f.error, _0x406d9f);
      return;
    }
    this.setNormal(_0x406d9f);
  }
  createTooltip(_0x37d10e) {
    if (!_0x37d10e) {
      return "暂无数据";
    }
    const _0x2678e3 = parseFloat(_0x37d10e.balance || "0");
    let _0x3fa40f = "Augment 余额: " + _0x2678e3.toFixed(2) + "\n";
    _0x37d10e.email && (_0x3fa40f += "账号: " + _0x37d10e.email + "\n");
    _0x37d10e.plan_name && (_0x3fa40f += "套餐: " + _0x37d10e.plan_name + "\n");
    _0x37d10e.end_date && (_0x3fa40f += "到期时间: " + new Date(_0x37d10e.end_date).toLocaleDateString() + "\n");
    _0x37d10e.timestamp && (_0x3fa40f += "更新时间: " + new Date(_0x37d10e.timestamp).toLocaleString() + "\n");
    _0x3fa40f += "\n点击打开设置页面";
    return _0x3fa40f;
  }
  dispose() {
    this.statusBarItem.dispose();
  }
}
class AugmentBalanceEnhanced {
  constructor() {
    this.context = null;
    this.logger = this.createLogger();
    this.isInitialized = false;
    this.configManager = null;
    this.stateManager = null;
    this.statusBarManager = null;
    this.updateTimer = null;
    this.isUpdating = false;
    this.lastToken = "";
  }
  createLogger() {
    return {
      info: (_0x4a2edd, ..._0x12b9e2) => console.log("[BalanceEnhanced] " + _0x4a2edd, ..._0x12b9e2),
      warn: (_0x3c6b3c, ..._0x21b9e7) => console.warn("[BalanceEnhanced] " + _0x3c6b3c, ..._0x21b9e7),
      error: (_0x10b59c, ..._0x3b8519) => console.error("[BalanceEnhanced] " + _0x10b59c, ..._0x3b8519),
      debug: (_0x224d99, ..._0x34e002) => console.debug("[BalanceEnhanced] " + _0x224d99, ..._0x34e002)
    };
  }
  async initialize(_0x11b0c5) {
    if (this.isInitialized) {
      this.logger.warn("Already initialized");
      return;
    }
    try {
      this.context = _0x11b0c5;
      this.configManager = new BalanceConfigManager();
      this.stateManager = new BalanceStateManager(_0x11b0c5);
      this.statusBarManager = new BalanceStatusBarManager();
      this.registerCommands();
      this.configManager.onConfigChanged(_0x31e40f => {
        this.onConfigChanged(_0x31e40f);
      });
      this.stateManager.onStateChanged(() => {
        this.updateStatusBar();
      });
      await this.initializeState();
      this.isInitialized = true;
      this.logger.info("Enhanced module initialized successfully");
    } catch (_0x2acf99) {
      this.logger.error("Initialization failed:", _0x2acf99);
      throw _0x2acf99;
    }
  }
  registerCommands() {
    try {
      const _0x2cf387 = vscode.commands.registerCommand("augmentBalance.openSettings", () => {
          this.configManager.openSettings();
        }),
        _0x4f55c5 = vscode.commands.registerCommand("augmentBalance.refreshBalance", () => {
          this.refreshBalance(true);
        }),
        _0x126589 = vscode.commands.registerCommand("augmentBalance.toggleDisplay", () => {
          this.toggleDisplay();
        });
      this.context.subscriptions.push(_0x2cf387);
      this.context.subscriptions.push(_0x4f55c5);
      this.context.subscriptions.push(_0x126589);
      this.logger.info("Commands registered successfully");
    } catch (_0x552cf1) {
      this.logger.error("Failed to register commands:", _0x552cf1);
    }
  }
  async initializeState() {
    const _0x3e32ae = this.configManager.getConfig(),
      _0x2f6624 = this.configManager.validateConfig(_0x3e32ae);
    this.lastToken = _0x3e32ae.token;
    await this.stateManager.cleanupExpiredCache();
    if (!_0x2f6624.isValid || !_0x3e32ae.enabled) {
      this.statusBarManager.setNotConfigured();
      return;
    }
    this.updateStatusBar();
    this.startPeriodicUpdate(_0x3e32ae);
    await this.refreshBalance();
  }
  async onConfigChanged(_0x5a8a5b) {
    const _0x4f86eb = this.configManager.validateConfig(_0x5a8a5b);
    if (!_0x4f86eb.isValid || !_0x5a8a5b.enabled) {
      !_0x4f86eb.isValid && this.configManager.showConfigError(_0x4f86eb.errors);
      this.statusBarManager.setNotConfigured();
      this.stopPeriodicUpdate();
      return;
    }
    const _0x4de18b = this.lastToken !== _0x5a8a5b.token,
      _0x2a446f = this.lastToken;
    this.lastToken = _0x5a8a5b.token;
    let _0x3ca680 = _0x4de18b;
    if (_0x4de18b) {
      this.logger.info("Token已变更，清除旧token缓存并强制刷新");
      _0x2a446f && (await this.stateManager.clearAccountCache(_0x2a446f));
    } else {
      const _0x25cebb = this.stateManager.validateCache(_0x5a8a5b.token);
      !_0x25cebb.isAccountInfoValid && (this.logger.info("账号信息缓存无效，强制刷新"), _0x3ca680 = true);
    }
    this.configManager.showConfigSuccess();
    this.startPeriodicUpdate(_0x5a8a5b);
    await this.refreshBalance(_0x3ca680);
  }
  startPeriodicUpdate(_0x53f393) {
    this.stopPeriodicUpdate();
    if (!_0x53f393.enabled) {
      return;
    }
    const _0x29bb79 = _0x53f393.updateInterval * 1000;
    this.updateTimer = setInterval(() => {
      this.refreshBalance();
    }, _0x29bb79);
    this.logger.info("Started periodic update with interval: " + _0x53f393.updateInterval + "s");
  }
  stopPeriodicUpdate() {
    this.updateTimer && (clearInterval(this.updateTimer), this.updateTimer = null, this.logger.info("Stopped periodic update"));
  }
  async refreshBalance(_0x5bc10f = false) {
    if (this.isUpdating) {
      return;
    }
    const _0x26537f = this.configManager.getConfig(),
      _0x14d385 = this.configManager.validateConfig(_0x26537f);
    if (!_0x14d385.isValid || !_0x26537f.enabled) {
      this.statusBarManager.setNotConfigured();
      return;
    }
    this.isUpdating = true;
    try {
      const _0x181326 = this.stateManager.getCachedAccountData(_0x26537f.token);
      this.statusBarManager.setLoading(_0x181326);
      const _0x345b1b = await this.stateManager.fetchAccountInfo(_0x26537f.token, _0x5bc10f);
      this.statusBarManager.setNormal(_0x345b1b);
    } catch (_0x4a1d72) {
      const _0x2ec774 = _0x4a1d72.message || "未知错误",
        _0x50ec52 = this.stateManager.getCachedAccountData(_0x26537f.token);
      await this.stateManager.cacheError(_0x2ec774, _0x26537f.token);
      this.statusBarManager.setError(_0x2ec774, _0x50ec52);
      (_0x4a1d72.statusCode === 401 || _0x4a1d72.statusCode === 403) && vscode.window.showErrorMessage("Augment Balance认证失败: " + _0x2ec774, "打开设置").then(_0x56d12b => {
        _0x56d12b === "打开设置" && this.configManager.openSettings();
      });
    } finally {
      this.isUpdating = false;
    }
  }
  updateStatusBar() {
    const _0x4c41e0 = this.configManager.getConfig(),
      _0x4896ab = this.configManager.validateConfig(_0x4c41e0),
      _0x409701 = this.stateManager.getCachedAccountData(_0x4c41e0.token);
    this.statusBarManager.updateFromCache(_0x409701, _0x4896ab.isValid && _0x4c41e0.enabled);
  }
  async toggleDisplay() {
    const _0x49f739 = this.configManager.getConfig(),
      _0xd79edd = !_0x49f739.enabled,
      _0x2a7f3a = vscode.workspace.getConfiguration("augmentBalance");
    await _0x2a7f3a.update("enabled", _0xd79edd, vscode.ConfigurationTarget.Global);
    const _0x2e38e0 = _0xd79edd ? "已启用" : "已禁用";
    vscode.window.showInformationMessage("Augment余额显示" + _0x2e38e0);
  }
  dispose() {
    this.stopPeriodicUpdate();
    this.configManager && this.configManager.dispose();
    this.stateManager && this.stateManager.dispose();
    this.statusBarManager && this.statusBarManager.dispose();
    this.isInitialized = false;
    this.logger.info("Enhanced module disposed");
  }
}
module.exports = AugmentBalanceEnhanced;
