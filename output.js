//Sun Nov 02 2025 15:49:25 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const vscode = require("vscode");
class AugmentTokenLoginEnhanced {
  constructor() {
    this.context = null;
    this.logger = this.createLogger();
    this.isInitialized = false;
  }
  createLogger() {
    return {
      info: (_0x2db7f9, ..._0x4ad004) => console.log("[TokenLogin] " + _0x2db7f9, ..._0x4ad004),
      warn: (_0x2d0edc, ..._0x247c47) => console.warn("[TokenLogin] " + _0x2d0edc, ..._0x247c47),
      error: (_0x38031d, ..._0x1b0c7e) => console.error("[TokenLogin] " + _0x38031d, ..._0x1b0c7e),
      debug: (_0x411f58, ..._0x529747) => console.debug("[TokenLogin] " + _0x411f58, ..._0x529747)
    };
  }
  registerDeepLinkHandler() {
    try {
      const _0x4469f8 = vscode.window.registerUriHandler({
        handleUri: async _0x609f9a => {
          try {
            const _0x3c9e95 = new URLSearchParams(_0x609f9a && _0x609f9a.query || ""),
              _0x2696f7 = _0x3c9e95.get("url") || _0x3c9e95.get("tenantURL") || "",
              _0x29da21 = _0x3c9e95.get("token") || _0x3c9e95.get("accessToken") || "",
              _0x5dbafb = _0x3c9e95.get("portal");
            if (_0x5dbafb !== null) {
              const _0xda0492 = (_0x5dbafb || "").trim();
              if (_0xda0492.length === 0) {
                vscode.window.showWarningMessage("portal 参数为空，已忽略余额 token 更新");
              } else {
                let _0x42ee15 = _0xda0492;
                try {
                  const _0x593437 = _0xda0492.match(/[?&]token=([^&]+)/);
                  if (_0x593437) {
                    _0x42ee15 = decodeURIComponent(_0x593437[1]);
                  }
                } catch (_0x1b4127) {}
                try {
                  await vscode.workspace.getConfiguration("augmentBalance").update("token", _0x42ee15, vscode.ConfigurationTarget.Global);
                  this.logger.info("augmentBalance.token 已通过 portal 更新");
                } catch (_0x41bb0d) {
                  this.logger.warn("更新 augmentBalance.token 失败:", _0x41bb0d);
                }
              }
            }
            const _0x2860a4 = this.validateURL(_0x2696f7),
              _0x562106 = this.validateToken(_0x29da21);
            if (!_0x2860a4.valid || !_0x562106.valid) {
              vscode.window.showErrorMessage("推送登录参数无效");
              return;
            }
            const _0x17bdf5 = await this.updateSessionsData(_0x2860a4.url, _0x562106.token);
            if (_0x17bdf5 && _0x17bdf5.success) {
              typeof this.triggerSessionChange === "function" && (await this.triggerSessionChange());
              const _0x1d4eab = await vscode.window.showInformationMessage("登录成功，是否重载窗口以生效？", "重载窗口", "稍后");
              _0x1d4eab === "重载窗口" && vscode.commands.executeCommand("workbench.action.reloadWindow");
            } else {
              vscode.window.showErrorMessage("推送登录失败：" + (_0x17bdf5 && _0x17bdf5.error || "未知原因"));
            }
          } catch (_0x4e4d49) {
            this.logger && typeof this.logger.error === "function" && this.logger.error("Push login handle failed:", _0x4e4d49);
            vscode.window.showErrorMessage("推送登录异常：" + (_0x4e4d49 && _0x4e4d49.message ? _0x4e4d49.message : String(_0x4e4d49)));
          }
        }
      });
      this.context && this.context.subscriptions && _0x4469f8 && this.context.subscriptions.push(_0x4469f8);
      this.logger && typeof this.logger.info === "function" && this.logger.info("URI handler registered for autoAuth/push-login");
    } catch (_0x4215fd) {
      this.logger && typeof this.logger.warn === "function" && this.logger.warn("registerUriHandler failed:", _0x4215fd);
      try {
        const _0x137506 = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
        if (_0x137506 && _0x137506.Augment && typeof _0x137506.Augment.setUriHandler === "function") {
          const _0x5b2a09 = async _0x5f3baf => {
            try {
              const _0x50d6ec = new URLSearchParams(_0x5f3baf && _0x5f3baf.query || ""),
                _0x4e80ef = _0x50d6ec.get("url") || _0x50d6ec.get("tenantURL") || "",
                _0x40a7f5 = _0x50d6ec.get("token") || _0x50d6ec.get("accessToken") || "",
                _0x41842e = _0x50d6ec.get("portal");
              if (_0x41842e !== null) {
                const _0x4fb7aa = (_0x41842e || "").trim();
                if (_0x4fb7aa.length === 0) {
                  vscode.window.showWarningMessage("portal 参数为空，已忽略余额 token 更新");
                } else {
                  let _0x57a128 = _0x4fb7aa;
                  try {
                    const _0x2533fc = _0x4fb7aa.match(/[?&]token=([^&]+)/);
                    if (_0x2533fc) {
                      _0x57a128 = decodeURIComponent(_0x2533fc[1]);
                    }
                  } catch (_0x5335cb) {}
                  try {
                    await vscode.workspace.getConfiguration("augmentBalance").update("token", _0x57a128, vscode.ConfigurationTarget.Global);
                    this.logger.info("augmentBalance.token 已通过 portal 更新（fallback）");
                  } catch (_0x1920e3) {
                    this.logger.warn("更新 augmentBalance.token 失败（fallback）:", _0x1920e3);
                  }
                }
              }
              const _0x4d924a = this.validateURL(_0x4e80ef),
                _0x34778e = this.validateToken(_0x40a7f5);
              if (!_0x4d924a.valid || !_0x34778e.valid) {
                vscode.window.showErrorMessage("推送登录参数无效");
                return;
              }
              const _0x13bde1 = await this.updateSessionsData(_0x4d924a.url, _0x34778e.token);
              if (_0x13bde1 && _0x13bde1.success) {
                typeof this.triggerSessionChange === "function" && (await this.triggerSessionChange());
                const _0x5d56e2 = await vscode.window.showInformationMessage("登录成功，是否重载窗口以生效？", "重载窗口", "稍后");
                _0x5d56e2 === "重载窗口" && vscode.commands.executeCommand("workbench.action.reloadWindow");
              } else {
                vscode.window.showErrorMessage("推送登录失败：" + (_0x13bde1 && _0x13bde1.error || "未知原因"));
              }
            } catch (_0x5d5931) {
              this.logger && typeof this.logger.error === "function" && this.logger.error("Push login (fallback) failed:", _0x5d5931);
              vscode.window.showErrorMessage("推送登录异常（fallback）：" + (_0x5d5931 && _0x5d5931.message ? _0x5d5931.message : String(_0x5d5931)));
            }
          };
          _0x137506.Augment.setUriHandler(_0x5b2a09);
          this.logger && typeof this.logger.info === "function" && this.logger.info("Fallback to composite URI handler");
        }
      } catch (_0x4be497) {}
    }
  }
  async initialize(_0x1827f9) {
    if (this.isInitialized) {
      this.logger.warn("Already initialized");
      return;
    }
    try {
      this.context = _0x1827f9;
      this.registerCommands();
      this.setupTokenInjection();
      try {
        typeof this.registerDeepLinkHandler === "function" && this.registerDeepLinkHandler();
      } catch (_0x10e6c6) {
        this.logger && typeof this.logger.warn === "function" && this.logger.warn("registerDeepLinkHandler failed:", _0x10e6c6);
      }
      this.isInitialized = true;
      this.logger.info("Enhanced module initialized successfully");
    } catch (_0x36a38a) {
      this.logger.error("Initialization failed:", _0x36a38a);
      throw _0x36a38a;
    }
  }
  registerCommands() {
    try {
      const _0x53ba34 = vscode.commands.registerCommand("augment.custom.tokenManagement", () => {
          this.handleTokenManagement();
        }),
        _0x1ce851 = vscode.commands.registerCommand("augment.custom.directLogin", () => {
          this.handleDirectLogin();
        });
      this.context.subscriptions.push(_0x53ba34);
      this.context.subscriptions.push(_0x1ce851);
      this.logger.info("Commands registered successfully");
    } catch (_0x40dfe9) {
      this.logger.error("Failed to register commands:", _0x40dfe9);
    }
  }
  async getAccessToken() {
    try {
      const _0x48d0bc = await this.context.secrets.get("augment.sessions");
      if (_0x48d0bc) {
        const _0x29788f = JSON.parse(_0x48d0bc);
        return {
          success: true,
          accessToken: _0x29788f.accessToken,
          tenantURL: _0x29788f.tenantURL,
          data: _0x29788f
        };
      }
      return {
        success: false,
        error: "未找到会话数据"
      };
    } catch (_0x3f7e3d) {
      return {
        success: false,
        error: _0x3f7e3d.message
      };
    }
  }
  async setSecret(_0x2d0fad, _0x24127f) {
    try {
      const _0x937d3c = typeof _0x24127f === "string" ? _0x24127f : JSON.stringify(_0x24127f);
      await this.context.secrets.store(_0x2d0fad, _0x937d3c);
      this.logger.info("Secret " + _0x2d0fad + " stored successfully");
      return true;
    } catch (_0xbb12dc) {
      this.logger.error("Failed to store secret " + _0x2d0fad + ":", _0xbb12dc);
      return false;
    }
  }
  async updateAccessToken(_0x39dd34) {
    try {
      const _0x5b0457 = await this.context.secrets.get("augment.sessions");
      let _0x3a434b = {};
      if (_0x5b0457) {
        try {
          _0x3a434b = JSON.parse(_0x5b0457);
        } catch (_0x54f925) {
          this.logger.warn("Failed to parse existing sessions data, creating new object");
          _0x3a434b = {};
        }
      }
      _0x3a434b.accessToken = _0x39dd34;
      !_0x3a434b.tenantURL && (_0x3a434b.tenantURL = "https://d5.api.augmentcode.com/");
      !_0x3a434b.scopes && (_0x3a434b.scopes = ["email"]);
      const _0x192ff0 = await this.setSecret("augment.sessions", _0x3a434b);
      return _0x192ff0 ? (this.logger.info("AccessToken updated successfully"), await this.updateInterceptorSessionId(), {
        success: true,
        data: _0x3a434b
      }) : {
        success: false,
        error: "存储更新后的会话数据失败"
      };
    } catch (_0x59f886) {
      this.logger.error("Failed to update access token:", _0x59f886);
      return {
        success: false,
        error: _0x59f886.message
      };
    }
  }
  async updateSessionsData(_0x40eace, _0x40b313) {
    try {
      const _0xa6c4d2 = await this.context.secrets.get("augment.sessions");
      let _0x4e44c0 = {};
      if (_0xa6c4d2) {
        try {
          _0x4e44c0 = JSON.parse(_0xa6c4d2);
        } catch (_0x30436a) {
          this.logger.warn("Failed to parse existing sessions data, creating new object");
          _0x4e44c0 = {};
        }
      }
      _0x4e44c0.tenantURL = _0x40eace;
      _0x4e44c0.accessToken = _0x40b313;
      !_0x4e44c0.scopes && (_0x4e44c0.scopes = ["email"]);
      const _0x1ec15c = await this.setSecret("augment.sessions", _0x4e44c0);
      return _0x1ec15c ? (this.logger.info("Sessions data updated successfully"), await this.updateInterceptorSessionId(), {
        success: true,
        data: _0x4e44c0
      }) : {
        success: false,
        error: "存储更新后的会话数据失败"
      };
    } catch (_0x3f7e78) {
      this.logger.error("Failed to update sessions data:", _0x3f7e78);
      return {
        success: false,
        error: _0x3f7e78.message
      };
    }
  }
  formatURL(_0x2555c4) {
    if (!_0x2555c4) {
      return "";
    }
    !_0x2555c4.startsWith("http://") && !_0x2555c4.startsWith("https://") && (_0x2555c4 = "https://" + _0x2555c4);
    !_0x2555c4.endsWith("/") && (_0x2555c4 += "/");
    return _0x2555c4;
  }
  validateToken(_0x45522a) {
    if (!_0x45522a || typeof _0x45522a !== "string") {
      return {
        valid: false,
        error: "Token不能为空"
      };
    }
    const _0xaf0a31 = _0x45522a.trim();
    if (_0xaf0a31.length < 10) {
      return {
        valid: false,
        error: "Token长度似乎太短"
      };
    }
    return {
      valid: true,
      token: _0xaf0a31
    };
  }
  validateURL(_0xa4f241) {
    if (!_0xa4f241 || typeof _0xa4f241 !== "string") {
      return {
        valid: false,
        error: "URL不能为空"
      };
    }
    try {
      const _0x26d051 = this.formatURL(_0xa4f241.trim());
      new URL(_0x26d051);
      return {
        valid: true,
        url: _0x26d051
      };
    } catch {
      return {
        valid: false,
        error: "请输入有效的URL (例如: https://your-tenant.augmentcode.com/)"
      };
    }
  }
  generateNewSessionId() {
    const _0x2578c8 = "0123456789abcdef";
    let _0x4bb83e = "";
    for (let _0x491a5b = 0; _0x491a5b < 36; _0x491a5b++) {
      _0x4bb83e += _0x491a5b === 8 || _0x491a5b === 13 || _0x491a5b === 18 || _0x491a5b === 23 ? "-" : _0x491a5b === 14 ? "4" : _0x491a5b === 19 ? _0x2578c8[8 + Math.floor(4 * Math.random())] : _0x2578c8[Math.floor(16 * Math.random())];
    }
    return _0x4bb83e;
  }
  async updateInterceptorSessionId() {
    try {
      const _0x44bbdf = this.generateNewSessionId();
      if (typeof global !== "undefined" && global.AugmentInterceptor) {
        if (typeof global.AugmentInterceptor.updateFakeSessionId === "function") {
          const _0x5cf3b0 = global.AugmentInterceptor.updateFakeSessionId(_0x44bbdf);
          _0x5cf3b0 && this.logger.info("Interceptor SessionId updated via function to: " + _0x44bbdf);
        } else {
          global.AugmentInterceptor.FAKE_SESSION_ID = _0x44bbdf;
          this.logger.info("Interceptor SessionId updated directly to: " + _0x44bbdf);
        }
      }
      typeof window !== "undefined" && window.AugmentInterceptor && (typeof window.AugmentInterceptor.updateFakeSessionId === "function" ? window.AugmentInterceptor.updateFakeSessionId(_0x44bbdf) : window.AugmentInterceptor.FAKE_SESSION_ID = _0x44bbdf);
      return _0x44bbdf;
    } catch (_0x2510bf) {
      this.logger.error("Failed to update interceptor SessionId:", _0x2510bf);
      return null;
    }
  }
  async triggerSessionChange() {
    try {
      const _0x4e03ac = await this.updateInterceptorSessionId();
      _0x4e03ac && this.logger.info("Session change triggered with new SessionId: " + _0x4e03ac);
      vscode.authentication && typeof vscode.authentication.onDidChangeSessions === "function" && vscode.authentication.onDidChangeSessions(() => {
        this.logger.info("Session change event triggered");
      });
    } catch (_0x4b59a0) {
      this.logger.debug("Failed to trigger session change event:", _0x4b59a0);
    }
  }
  async handleTokenManagement() {
    try {
      const _0x3c0537 = await vscode.window.showQuickPick([{
        label: "🔑 直接登录",
        description: "使用租户URL和Token直接登录",
        detail: "输入租户URL和访问令牌进行快速登录"
      }, {
        label: "📋 获取 accessToken",
        description: "查看当前的 accessToken 和 tenantURL",
        detail: "显示当前存储的认证信息，支持复制和查看完整数据"
      }, {
        label: "⚙️ 设置 accessToken",
        description: "修改 accessToken 或 tenantURL",
        detail: "更新认证信息，支持仅更新 accessToken 或完整更新会话数据"
      }], {
        placeHolder: "选择要执行的操作"
      });
      if (!_0x3c0537) {
        return;
      }
      if (_0x3c0537.label === "🔑 直接登录") {
        await this.handleDirectLogin();
      } else {
        if (_0x3c0537.label === "📋 获取 accessToken") {
          await this.handleGetAccessToken();
        } else {
          _0x3c0537.label === "⚙️ 设置 accessToken" && (await this.handleSetToken());
        }
      }
    } catch (_0x9761b7) {
      vscode.window.showErrorMessage("错误: " + _0x9761b7.message);
    }
  }
  async handleDirectLogin() {
    try {
      const _0x1617e0 = vscode.window.createWebviewPanel("augmentLogin", "Augment 登录", vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true
      });
      _0x1617e0.webview.html = this.getLoginWebviewContent();
      _0x1617e0.webview.onDidReceiveMessage(async _0x1e95fe => {
        switch (_0x1e95fe.command) {
          case "login":
            await this.handleWebviewLogin(_0x1e95fe.data, _0x1617e0);
            break;
          case "cancel":
            _0x1617e0.dispose();
            break;
        }
      }, undefined, this.context.subscriptions);
    } catch (_0x3598d6) {
      this.logger.error("Direct login failed:", _0x3598d6);
      vscode.window.showErrorMessage("直接登录失败: " + _0x3598d6.message);
    }
  }
  async handleWebviewLogin(_0x152ecc, _0x2dbcc2) {
    try {
      const {
          tenantURL: _0xed3981,
          accessToken: _0x5e9b80
        } = _0x152ecc,
        _0x433cd9 = this.validateURL(_0xed3981),
        _0x3a8878 = this.validateToken(_0x5e9b80);
      if (!_0x433cd9.valid) {
        _0x2dbcc2.webview.postMessage({
          command: "error",
          field: "tenantURL",
          message: _0x433cd9.error
        });
        return;
      }
      if (!_0x3a8878.valid) {
        _0x2dbcc2.webview.postMessage({
          command: "error",
          field: "accessToken",
          message: _0x3a8878.error
        });
        return;
      }
      _0x2dbcc2.webview.postMessage({
        command: "loading",
        message: "正在验证登录信息..."
      });
      const _0x2edd0f = await this.updateSessionsData(_0x433cd9.url, _0x3a8878.token);
      _0x2edd0f.success ? (await this.triggerSessionChange(), _0x2dbcc2.webview.postMessage({
        command: "success",
        message: "登录成功！"
      }), setTimeout(async () => {
        _0x2dbcc2.dispose();
        const _0x71fe20 = await vscode.window.showInformationMessage("登录成功！建议重载窗口以使更改生效。", "重载窗口", "稍后重载");
        _0x71fe20 === "重载窗口" && vscode.commands.executeCommand("workbench.action.reloadWindow");
      }, 1500)) : _0x2dbcc2.webview.postMessage({
        command: "error",
        field: "general",
        message: "登录失败: " + _0x2edd0f.error
      });
    } catch (_0xf5e3c7) {
      this.logger.error("Webview login failed:", _0xf5e3c7);
      _0x2dbcc2.webview.postMessage({
        command: "error",
        field: "general",
        message: "登录失败: " + _0xf5e3c7.message
      });
    }
  }
  getLoginWebviewContent() {
    return "<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Augment 登录</title>\n    <style>\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n        }\n\n        body {\n            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            min-height: 100vh;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            padding: 20px;\n        }\n\n        .login-container {\n            background: rgba(255, 255, 255, 0.95);\n            backdrop-filter: blur(10px);\n            border-radius: 20px;\n            padding: 40px;\n            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);\n            width: 100%;\n            max-width: 450px;\n            animation: slideIn 0.5s ease-out;\n        }\n\n        @keyframes slideIn {\n            from {\n                opacity: 0;\n                transform: translateY(30px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n\n        .login-header {\n            text-align: center;\n            margin-bottom: 30px;\n        }\n\n        .login-title {\n            font-size: 28px;\n            font-weight: 700;\n            color: #333;\n            margin-bottom: 8px;\n        }\n\n        .login-subtitle {\n            color: #666;\n            font-size: 14px;\n        }\n\n        .form-group {\n            margin-bottom: 20px;\n        }\n\n        .form-label {\n            display: block;\n            margin-bottom: 8px;\n            font-weight: 600;\n            color: #333;\n            font-size: 14px;\n        }\n\n        .form-input {\n            width: 100%;\n            padding: 12px 16px;\n            border: 2px solid #e1e5e9;\n            border-radius: 10px;\n            font-size: 14px;\n            transition: all 0.3s ease;\n            background: #fff;\n        }\n\n        .form-input:focus {\n            outline: none;\n            border-color: #667eea;\n            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n        }\n\n        .form-input.error {\n            border-color: #e74c3c;\n            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);\n        }\n\n        .error-message {\n            color: #e74c3c;\n            font-size: 12px;\n            margin-top: 5px;\n            display: none;\n        }\n\n        .error-message.show {\n            display: block;\n        }\n\n        .button-group {\n            display: flex;\n            gap: 12px;\n            margin-top: 30px;\n        }\n\n        .btn {\n            flex: 1;\n            padding: 12px 24px;\n            border: none;\n            border-radius: 10px;\n            font-size: 14px;\n            font-weight: 600;\n            cursor: pointer;\n            transition: all 0.3s ease;\n            position: relative;\n            overflow: hidden;\n        }\n\n        .btn-primary {\n            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n            color: white;\n        }\n\n        .btn-primary:hover {\n            transform: translateY(-2px);\n            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n        }\n\n        .btn-secondary {\n            background: #f8f9fa;\n            color: #666;\n            border: 2px solid #e1e5e9;\n        }\n\n        .btn-secondary:hover {\n            background: #e9ecef;\n        }\n\n        .btn:disabled {\n            opacity: 0.6;\n            cursor: not-allowed;\n            transform: none !important;\n        }\n\n        .loading-spinner {\n            display: none;\n            width: 20px;\n            height: 20px;\n            border: 2px solid transparent;\n            border-top: 2px solid #fff;\n            border-radius: 50%;\n            animation: spin 1s linear infinite;\n            margin-right: 8px;\n        }\n\n        @keyframes spin {\n            0% { transform: rotate(0deg); }\n            100% { transform: rotate(360deg); }\n        }\n\n        .success-message {\n            background: #d4edda;\n            color: #155724;\n            padding: 12px;\n            border-radius: 8px;\n            margin-bottom: 20px;\n            display: none;\n            text-align: center;\n            font-weight: 500;\n        }\n\n        .success-message.show {\n            display: block;\n        }\n\n        .general-error {\n            background: #f8d7da;\n            color: #721c24;\n            padding: 12px;\n            border-radius: 8px;\n            margin-bottom: 20px;\n            display: none;\n            text-align: center;\n            font-weight: 500;\n        }\n\n        .general-error.show {\n            display: block;\n        }\n\n        .form-help {\n            font-size: 12px;\n            color: #666;\n            margin-top: 5px;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"login-container\">\n        <div class=\"login-header\">\n            <h1 class=\"login-title\">🔑 Augment 登录</h1>\n            <p class=\"login-subtitle\">输入您的租户URL和访问令牌</p>\n        </div>\n\n        <div class=\"success-message\" id=\"successMessage\"></div>\n        <div class=\"general-error\" id=\"generalError\"></div>\n\n        <form id=\"loginForm\">\n            <div class=\"form-group\">\n                <label class=\"form-label\" for=\"tenantURL\">租户URL</label>\n                <input\n                    type=\"url\"\n                    id=\"tenantURL\"\n                    class=\"form-input\"\n                    placeholder=\"https://your-tenant.augmentcode.com/\"\n                    required\n                >\n                <div class=\"error-message\" id=\"tenantURLError\"></div>\n                <div class=\"form-help\">请输入您的Augment租户URL地址</div>\n            </div>\n\n            <div class=\"form-group\">\n                <label class=\"form-label\" for=\"accessToken\">访问令牌</label>\n                <input\n                    type=\"password\"\n                    id=\"accessToken\"\n                    class=\"form-input\"\n                    placeholder=\"输入您的访问令牌...\"\n                    required\n                >\n                <div class=\"error-message\" id=\"accessTokenError\"></div>\n                <div class=\"form-help\">请输入您的Augment访问令牌</div>\n            </div>\n\n            <div class=\"button-group\">\n                <button type=\"button\" class=\"btn btn-secondary\" id=\"cancelBtn\">取消</button>\n                <button type=\"submit\" class=\"btn btn-primary\" id=\"loginBtn\">\n                    <span class=\"loading-spinner\" id=\"loadingSpinner\"></span>\n                    <span id=\"loginBtnText\">登录</span>\n                </button>\n            </div>\n        </form>\n    </div>\n\n    <script>\n        const vscode = acquireVsCodeApi();\n\n        const form = document.getElementById('loginForm');\n        const tenantURLInput = document.getElementById('tenantURL');\n        const accessTokenInput = document.getElementById('accessToken');\n        const loginBtn = document.getElementById('loginBtn');\n        const cancelBtn = document.getElementById('cancelBtn');\n        const loadingSpinner = document.getElementById('loadingSpinner');\n        const loginBtnText = document.getElementById('loginBtnText');\n        const successMessage = document.getElementById('successMessage');\n        const generalError = document.getElementById('generalError');\n\n        // 清除错误状态\n        function clearErrors() {\n            document.querySelectorAll('.form-input').forEach(input => {\n                input.classList.remove('error');\n            });\n            document.querySelectorAll('.error-message').forEach(msg => {\n                msg.classList.remove('show');\n            });\n            generalError.classList.remove('show');\n        }\n\n        // 显示错误\n        function showError(field, message) {\n            if (field === 'general') {\n                generalError.textContent = message;\n                generalError.classList.add('show');\n            } else {\n                const input = document.getElementById(field);\n                const errorMsg = document.getElementById(field + 'Error');\n                if (input && errorMsg) {\n                    input.classList.add('error');\n                    errorMsg.textContent = message;\n                    errorMsg.classList.add('show');\n                }\n            }\n        }\n\n        // 设置加载状态\n        function setLoading(loading, message = '') {\n            loginBtn.disabled = loading;\n            cancelBtn.disabled = loading;\n            tenantURLInput.disabled = loading;\n            accessTokenInput.disabled = loading;\n\n            if (loading) {\n                loadingSpinner.style.display = 'inline-block';\n                loginBtnText.textContent = message || '登录中...';\n            } else {\n                loadingSpinner.style.display = 'none';\n                loginBtnText.textContent = '登录';\n            }\n        }\n\n        // 表单提交\n        form.addEventListener('submit', (e) => {\n            e.preventDefault();\n            clearErrors();\n\n            const tenantURL = tenantURLInput.value.trim();\n            const accessToken = accessTokenInput.value.trim();\n\n            if (!tenantURL || !accessToken) {\n                if (!tenantURL) showError('tenantURL', '请输入租户URL');\n                if (!accessToken) showError('accessToken', '请输入访问令牌');\n                return;\n            }\n\n            setLoading(true);\n\n            vscode.postMessage({\n                command: 'login',\n                data: { tenantURL, accessToken }\n            });\n        });\n\n        // 取消按钮\n        cancelBtn.addEventListener('click', () => {\n            vscode.postMessage({ command: 'cancel' });\n        });\n\n        // 监听来自扩展的消息\n        window.addEventListener('message', event => {\n            const message = event.data;\n\n            switch (message.command) {\n                case 'error':\n                    setLoading(false);\n                    showError(message.field, message.message);\n                    break;\n\n                case 'loading':\n                    setLoading(true, message.message);\n                    break;\n\n                case 'success':\n                    setLoading(false);\n                    successMessage.textContent = message.message;\n                    successMessage.classList.add('show');\n                    form.style.display = 'none';\n                    break;\n            }\n        });\n\n        // 自动聚焦到第一个输入框\n        tenantURLInput.focus();\n    </script>\n</body>\n</html>";
  }
  async handleGetAccessToken() {
    try {
      const _0x473b65 = await this.getAccessToken();
      if (_0x473b65.success) {
        const _0x34152a = _0x473b65.accessToken && _0x473b65.accessToken.length > 16 ? _0x473b65.accessToken.substring(0, 8) + "..." + _0x473b65.accessToken.substring(_0x473b65.accessToken.length - 8) : _0x473b65.accessToken || "未设置",
          _0xd9a328 = "accessToken: " + _0x34152a + "\ntenantURL: " + (_0x473b65.tenantURL || "未设置"),
          _0x5d3cde = await vscode.window.showInformationMessage(_0xd9a328, "复制 accessToken", "显示完整数据");
        if (_0x5d3cde === "复制 accessToken" && _0x473b65.accessToken) {
          await vscode.env.clipboard.writeText(_0x473b65.accessToken);
          vscode.window.showInformationMessage("accessToken 已复制到剪贴板");
        } else {
          if (_0x5d3cde === "显示完整数据") {
            const _0xfbf05c = await vscode.workspace.openTextDocument({
              content: JSON.stringify(_0x473b65.data, null, 2),
              language: "json"
            });
            await vscode.window.showTextDocument(_0xfbf05c);
          }
        }
      } else {
        vscode.window.showErrorMessage("获取 accessToken 失败: " + _0x473b65.error);
      }
    } catch (_0x5ea2d4) {
      vscode.window.showErrorMessage("错误: " + _0x5ea2d4.message);
    }
  }
  async handleSetToken() {
    try {
      const _0x44240a = await vscode.window.showQuickPick([{
        label: "仅更新 accessToken",
        description: "只更新 augment.sessions 中的 accessToken",
        detail: "快速更新：仅修改 accessToken，保留 tenantURL 和权限范围"
      }, {
        label: "更新会话数据",
        description: "更新 augment.sessions 中的 tenantURL 和 accessToken",
        detail: "完整更新：通过引导输入同时修改 tenantURL 和 accessToken"
      }], {
        placeHolder: "选择要更新的内容"
      });
      if (!_0x44240a) {
        return;
      }
      if (_0x44240a.label === "仅更新 accessToken") {
        let _0x558194 = "输入新的 accessToken...";
        try {
          const _0x351460 = await this.context.secrets.get("augment.sessions");
          if (_0x351460) {
            const _0x1faa50 = JSON.parse(_0x351460);
            if (_0x1faa50.accessToken) {
              const _0xea9ac9 = _0x1faa50.accessToken;
              _0xea9ac9.length > 16 ? _0x558194 = "当前: " + _0xea9ac9.substring(0, 8) + "..." + _0xea9ac9.substring(_0xea9ac9.length - 8) : _0x558194 = "当前: " + _0xea9ac9;
            }
          }
        } catch (_0x5eb17e) {
          this.logger.debug("Failed to get current accessToken for placeholder:", _0x5eb17e);
        }
        const _0x536a09 = await vscode.window.showInputBox({
          prompt: "输入新的 accessToken",
          placeHolder: _0x558194,
          password: true,
          validateInput: _0x5ab2c3 => {
            const _0x32044e = this.validateToken(_0x5ab2c3);
            return _0x32044e.valid ? null : _0x32044e.error;
          }
        });
        if (!_0x536a09) {
          return;
        }
        const _0x4480f0 = await this.updateAccessToken(_0x536a09.trim());
        if (_0x4480f0.success) {
          vscode.window.showInformationMessage("accessToken 更新成功！");
          const _0x1cabdb = await vscode.window.showInformationMessage("accessToken 更新成功！", "显示更新后的数据");
          if (_0x1cabdb === "显示更新后的数据") {
            const _0x96d51e = await vscode.workspace.openTextDocument({
              content: JSON.stringify(_0x4480f0.data, null, 2),
              language: "json"
            });
            await vscode.window.showTextDocument(_0x96d51e);
          }
        } else {
          vscode.window.showErrorMessage("更新 accessToken 失败: " + _0x4480f0.error);
        }
      } else {
        let _0x2ae555 = {
          accessToken: "",
          tenantURL: "https://d5.api.augmentcode.com/",
          scopes: ["email"]
        };
        try {
          const _0x35ad34 = await this.context.secrets.get("augment.sessions");
          if (_0x35ad34) {
            const _0x186735 = JSON.parse(_0x35ad34);
            _0x2ae555 = {
              ..._0x2ae555,
              ..._0x186735
            };
          }
        } catch (_0x17b554) {
          this.logger.debug("Failed to get current sessions data:", _0x17b554);
        }
        const _0x5e389a = await vscode.window.showInputBox({
          prompt: "输入 tenantURL",
          placeHolder: "当前: " + _0x2ae555.tenantURL,
          value: _0x2ae555.tenantURL,
          validateInput: _0x166286 => {
            const _0xa7d431 = this.validateURL(_0x166286);
            return _0xa7d431.valid ? null : _0xa7d431.error;
          }
        });
        if (!_0x5e389a) {
          return;
        }
        const _0x59c9ba = _0x2ae555.accessToken.length > 16 ? _0x2ae555.accessToken.substring(0, 8) + "..." + _0x2ae555.accessToken.substring(_0x2ae555.accessToken.length - 8) : _0x2ae555.accessToken,
          _0x4b255a = await vscode.window.showInputBox({
            prompt: "输入 accessToken",
            placeHolder: "当前: " + _0x59c9ba,
            password: true,
            validateInput: _0x562ca2 => {
              const _0x2ffb63 = this.validateToken(_0x562ca2);
              return _0x2ffb63.valid ? null : _0x2ffb63.error;
            }
          });
        if (!_0x4b255a) {
          return;
        }
        const _0x3bcac3 = this.validateURL(_0x5e389a),
          _0x43007b = this.validateToken(_0x4b255a);
        if (!_0x3bcac3.valid || !_0x43007b.valid) {
          vscode.window.showErrorMessage("输入验证失败，请重试");
          return;
        }
        const _0x150375 = await this.updateSessionsData(_0x3bcac3.url, _0x43007b.token);
        if (_0x150375.success) {
          vscode.window.showInformationMessage("会话数据更新成功！");
          const _0x26efd8 = await vscode.window.showInformationMessage("会话数据更新成功！", "显示更新后的数据");
          if (_0x26efd8 === "显示更新后的数据") {
            const _0x12509b = await vscode.workspace.openTextDocument({
              content: JSON.stringify(_0x150375.data, null, 2),
              language: "json"
            });
            await vscode.window.showTextDocument(_0x12509b);
          }
        } else {
          vscode.window.showErrorMessage("更新会话数据失败: " + _0x150375.error);
        }
      }
    } catch (_0x5571a3) {
      vscode.window.showErrorMessage("错误: " + _0x5571a3.message);
    }
  }
  setupTokenInjection() {
    try {
      typeof window !== "undefined" && window.fetch ? (this.setupFetchInterception(), this.logger.info("Token injection setup completed for browser environment")) : this.logger.info("Not in browser environment, skipping token injection setup");
    } catch (_0x528409) {
      this.logger.error("Failed to setup token injection:", _0x528409);
    }
  }
  setupFetchInterception() {
    const _0x3b5147 = window.fetch,
      _0x366bad = this;
    window.fetch = async function (_0x41250b, _0x5e9963 = {}) {
      try {
        const _0x437a7d = await _0x366bad.injectTokenToRequest(_0x41250b, _0x5e9963);
        return _0x3b5147.call(this, _0x41250b, _0x437a7d);
      } catch (_0x16788f) {
        _0x366bad.logger.error("Token injection failed for fetch request:", _0x16788f);
        return _0x3b5147.call(this, _0x41250b, _0x5e9963);
      }
    };
    this.logger.info("Fetch API interception setup completed");
  }
  async injectTokenToRequest(_0x3e8cc2, _0x2a021b = {}) {
    try {
      const _0x336f70 = await this.getAccessToken();
      if (!_0x336f70.success || !_0x336f70.accessToken) {
        return _0x2a021b;
      }
      if (this.isAugmentRequest(_0x3e8cc2, _0x336f70.tenantURL)) {
        const _0x35f0b1 = _0x2a021b.headers || {},
          _0x3f7116 = Object.keys(_0x35f0b1).some(_0x1e4b4b => _0x1e4b4b.toLowerCase() === "authorization");
        !_0x3f7116 && (_0x35f0b1.Authorization = "Bearer " + _0x336f70.accessToken, this.logger.info("Token injected to request:", _0x3e8cc2));
        return {
          ..._0x2a021b,
          headers: _0x35f0b1
        };
      }
      return _0x2a021b;
    } catch (_0x199076) {
      this.logger.error("Failed to inject token to request:", _0x199076);
      return _0x2a021b;
    }
  }
  isAugmentRequest(_0x46b6a5, _0x5cb094) {
    if (!_0x46b6a5 || !_0x5cb094) {
      return false;
    }
    try {
      const _0x371aac = new URL(_0x46b6a5),
        _0x4a9dfc = new URL(_0x5cb094);
      return _0x371aac.hostname === _0x4a9dfc.hostname;
    } catch (_0x4c1c6d) {
      return _0x46b6a5.includes("augmentcode.com") || _0x46b6a5.includes("api.augment") || _0x5cb094 && _0x46b6a5.includes(_0x5cb094.replace(/https?:\/\//, ""));
    }
  }
  dispose() {
    this.isInitialized = false;
    this.logger.info("Enhanced module disposed");
  }
}
module.exports = AugmentTokenLoginEnhanced;