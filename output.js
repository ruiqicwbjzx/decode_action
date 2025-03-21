//Fri Mar 21 2025 13:58:52 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
(() => {
  function b() {
    'use strict';

    b = function () {
      return A;
    };
    var z,
      A = {},
      B = Object.prototype,
      C = B.hasOwnProperty,
      D = Object.defineProperty || function (ac, ad, ae) {
        ac[ad] = ae.value;
      },
      F = "function" == typeof Symbol ? Symbol : {},
      H = F.iterator || "@@iterator",
      I = F.asyncIterator || "@@asyncIterator",
      J = F.toStringTag || "@@toStringTag";
    function K(ac, ad, ae) {
      var ag = {
        value: ae,
        enumerable: !0,
        configurable: !0,
        writable: !0
      };
      Object.defineProperty(ac, ad, ag);
      return ac[ad];
    }
    try {
      K({}, "");
    } catch (ad) {
      K = function (af, ag, ah) {
        return af[ag] = ah;
      };
    }
    function M(af, ag, ah, ai) {
      var aj = ag && ag.prototype instanceof X ? ag : X,
        ak = Object.create(aj.prototype),
        al = new aa(ai || []);
      D(ak, "_invoke", {
        value: a6(af, ah, al)
      });
      return ak;
    }
    function N(af, ag, ah) {
      try {
        return {
          type: "normal",
          arg: af.call(ag, ah)
        };
      } catch (am) {
        var aj = {
          type: "throw",
          arg: am
        };
        return aj;
      }
    }
    A.wrap = M;
    var Q = "suspendedStart",
      R = "suspendedYield",
      T = "executing",
      V = "completed",
      W = {};
    function X() {}
    function Y() {}
    function Z() {}
    var a0 = {};
    K(a0, H, function () {
      return this;
    });
    var a1 = Object.getPrototypeOf,
      a2 = a1 && a1(a1(ab([])));
    a2 && a2 !== B && C.call(a2, H) && (a0 = a2);
    Z.prototype = X.prototype = Object.create(a0);
    var a3 = Z.prototype;
    function a4(af) {
      ["next", "throw", "return"].forEach(function (ai) {
        K(af, ai, function (ak) {
          return this._invoke(ai, ak);
        });
      });
    }
    function a5(af, ag) {
      function aj(ak, al, am, an) {
        var ap = N(af[ak], af, al);
        if ("throw" !== ap.type) {
          var aq = ap.arg,
            ar = aq.value;
          return ar && "object" == c(ar) && C.call(ar, "__await") ? ag.resolve(ar.__await).then(function (as) {
            aj("next", as, am, an);
          }, function (as) {
            aj("throw", as, am, an);
          }) : ag.resolve(ar).then(function (as) {
            aq.value = as;
            am(aq);
          }, function (as) {
            return aj("throw", as, am, an);
          });
        }
        an(ap.arg);
      }
      var ai;
      D(this, "_invoke", {
        value: function (ak, al) {
          function ao() {
            return new ag(function (aq, ar) {
              aj(ak, al, aq, ar);
            });
          }
          return ai = ai ? ai.then(ao, ao) : ao();
        }
      });
    }
    function a6(af, ag, ah) {
      var aj = Q;
      return function (al, am) {
        if (aj === T) {
          throw Error("Generator is already running");
        }
        if (aj === V) {
          if ("throw" === al) {
            throw am;
          }
          var ap = {
            value: z,
            done: !0
          };
          return ap;
        }
        for (ah.method = al, ah.arg = am;;) {
          var aq = ah.delegate;
          if (aq) {
            var ar = a7(aq, ah);
            if (ar) {
              if (ar === W) {
                continue;
              }
              return ar;
            }
          }
          if ("next" === ah.method) {
            ah.sent = ah._sent = ah.arg;
          } else {
            if ("throw" === ah.method) {
              if (aj === Q) {
                throw aj = V, ah.arg;
              }
              ah.dispatchException(ah.arg);
            } else {
              "return" === ah.method && ah.abrupt("return", ah.arg);
            }
          }
          aj = T;
          var as = N(af, ag, ah);
          if ("normal" === as.type) {
            if (aj = ah.done ? V : R, as.arg === W) {
              continue;
            }
            var at = {};
            at.value = as.arg;
            at.done = ah.done;
            return at;
          }
          "throw" === as.type && (aj = V, ah.method = "throw", ah.arg = as.arg);
        }
      };
    }
    function a7(af, ag) {
      var al = ag.method,
        am = af.iterator[al];
      if (am === z) {
        ag.delegate = null;
        "throw" === al && af.iterator.return && (ag.method = "return", ag.arg = z, a7(af, ag), "throw" === ag.method) || "return" !== al && (ag.method = "throw", ag.arg = new TypeError("The iterator does not provide a '" + al + "' method"));
        return W;
      }
      var ak = N(am, af.iterator, ag.arg);
      if ("throw" === ak.type) {
        ag.method = "throw";
        ag.arg = ak.arg;
        ag.delegate = null;
        return W;
      }
      var aj = ak.arg;
      return aj ? aj.done ? (ag[af.resultName] = aj.value, ag.next = af.nextLoc, "return" !== ag.method && (ag.method = "next", ag.arg = z), ag.delegate = null, W) : aj : (ag.method = "throw", ag.arg = new TypeError("iterator result is not an object"), ag.delegate = null, W);
    }
    function a8(af) {
      var ah = {
        tryLoc: af[0]
      };
      var ai = ah;
      1 in af && (ai.catchLoc = af[1]);
      2 in af && (ai.finallyLoc = af[2], ai.afterLoc = af[3]);
      this.tryEntries.push(ai);
    }
    function a9(af) {
      var ag = af.completion || {};
      ag.type = "normal";
      delete ag.arg;
      af.completion = ag;
    }
    function aa(af) {
      var ah = {
        tryLoc: "root"
      };
      this.tryEntries = [ah];
      af.forEach(a8, this);
      this.reset(!0);
    }
    function ab(af) {
      if (af || "" === af) {
        var ah = af[H];
        if (ah) {
          return ah.call(af);
        }
        if ("function" == typeof af.next) {
          return af;
        }
        if (!isNaN(af.length)) {
          var ai = -1,
            aj = function am() {
              for (; ++ai < af.length;) {
                if (C.call(af, ai)) {
                  am.value = af[ai];
                  am.done = !1;
                  return am;
                }
              }
              am.value = z;
              am.done = !0;
              return am;
            };
          return aj.next = aj;
        }
      }
      throw new TypeError(c(af) + " is not iterable");
    }
    Y.prototype = Z;
    D(a3, "constructor", {
      value: Z,
      configurable: !0
    });
    D(Z, "constructor", {
      value: Y,
      configurable: !0
    });
    Y.displayName = K(Z, J, "GeneratorFunction");
    A.isGeneratorFunction = function (af) {
      var ah = "function" == typeof af && af.constructor;
      return !!ah && (ah === Y || "GeneratorFunction" === (ah.displayName || ah.name));
    };
    A.mark = function (af) {
      Object.setPrototypeOf ? Object.setPrototypeOf(af, Z) : (af.__proto__ = Z, K(af, J, "GeneratorFunction"));
      af.prototype = Object.create(a3);
      return af;
    };
    A.awrap = function (af) {
      var ah = {
        __await: af
      };
      return ah;
    };
    a4(a5.prototype);
    K(a5.prototype, I, function () {
      return this;
    });
    A.AsyncIterator = a5;
    A.async = function (af, ag, ah, ai, aj) {
      void 0 === aj && (aj = Promise);
      var al = new a5(M(af, ag, ah, ai), aj);
      return A.isGeneratorFunction(ag) ? al : al.next().then(function (an) {
        return an.done ? an.value : al.next();
      });
    };
    a4(a3);
    K(a3, J, "Generator");
    K(a3, H, function () {
      return this;
    });
    K(a3, "toString", function () {
      return "[object Generator]";
    });
    A.keys = function (af) {
      var ah = Object(af),
        ai = [];
      for (var aj in ah) ai.push(aj);
      ai.reverse();
      return function al() {
        for (; ai.length;) {
          var ao = ai.pop();
          if (ao in ah) {
            al.value = ao;
            al.done = !1;
            return al;
          }
        }
        al.done = !0;
        return al;
      };
    };
    A.values = ab;
    aa.prototype = {
      constructor: aa,
      reset: function (af) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = z, this.done = !1, this.delegate = null, this.method = "next", this.arg = z, this.tryEntries.forEach(a9), !af) {
          for (var ag in this) "t" === ag.charAt(0) && C.call(this, ag) && !isNaN(+ag.slice(1)) && (this[ag] = z);
        }
      },
      stop: function () {
        this.done = !0;
        var af = this.tryEntries[0].completion;
        if ("throw" === af.type) {
          throw af.arg;
        }
        return this.rval;
      },
      dispatchException: function (af) {
        if (this.done) {
          throw af;
        }
        var ah = this;
        function an(ao, ap) {
          ak.type = "throw";
          ak.arg = af;
          ah.next = ao;
          ap && (ah.method = "next", ah.arg = z);
          return !!ap;
        }
        for (var ai = this.tryEntries.length - 1; ai >= 0; --ai) {
          var aj = this.tryEntries[ai],
            ak = aj.completion;
          if ("root" === aj.tryLoc) {
            return an("end");
          }
          if (aj.tryLoc <= this.prev) {
            var al = C.call(aj, "catchLoc"),
              am = C.call(aj, "finallyLoc");
            if (al && am) {
              if (this.prev < aj.catchLoc) {
                return an(aj.catchLoc, !0);
              }
              if (this.prev < aj.finallyLoc) {
                return an(aj.finallyLoc);
              }
            } else {
              if (al) {
                if (this.prev < aj.catchLoc) {
                  return an(aj.catchLoc, !0);
                }
              } else {
                if (!am) {
                  throw Error("try statement without catch or finally");
                }
                if (this.prev < aj.finallyLoc) {
                  return an(aj.finallyLoc);
                }
              }
            }
          }
        }
      },
      abrupt: function (af, ag) {
        for (var ai = this.tryEntries.length - 1; ai >= 0; --ai) {
          var aj = this.tryEntries[ai];
          if (aj.tryLoc <= this.prev && C.call(aj, "finallyLoc") && this.prev < aj.finallyLoc) {
            var ak = aj;
            break;
          }
        }
        ak && ("break" === af || "continue" === af) && ak.tryLoc <= ag && ag <= ak.finallyLoc && (ak = null);
        var al = ak ? ak.completion : {};
        al.type = af;
        al.arg = ag;
        return ak ? (this.method = "next", this.next = ak.finallyLoc, W) : this.complete(al);
      },
      complete: function (af, ag) {
        if ("throw" === af.type) {
          throw af.arg;
        }
        "break" === af.type || "continue" === af.type ? this.next = af.arg : "return" === af.type ? (this.rval = this.arg = af.arg, this.method = "return", this.next = "end") : "normal" === af.type && ag && (this.next = ag);
        return W;
      },
      finish: function (af) {
        for (var ah = this.tryEntries.length - 1; ah >= 0; --ah) {
          var ai = this.tryEntries[ah];
          if (ai.finallyLoc === af) {
            this.complete(ai.completion, ai.afterLoc);
            a9(ai);
            return W;
          }
        }
      },
      catch: function (af) {
        for (var ah = this.tryEntries.length - 1; ah >= 0; --ah) {
          var ai = this.tryEntries[ah];
          if (ai.tryLoc === af) {
            var aj = ai.completion;
            if ("throw" === aj.type) {
              var ak = aj.arg;
              a9(ai);
            }
            return ak;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (af, ag, ah) {
        this.delegate = {
          iterator: ab(af),
          resultName: ag,
          nextLoc: ah
        };
        "next" === this.method && (this.arg = z);
        return W;
      }
    };
    return A;
  }
  function c(p) {
    c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (r) {
      return typeof r;
    } : function (r) {
      return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    };
    return c(p);
  }
  function d(p, q, s, v, w, x, y) {
    try {
      var z = p[x](y),
        A = z.value;
    } catch (B) {
      return void s(B);
    }
    z.done ? q(A) : Promise.resolve(A).then(v, w);
  }
  function e(p) {
    return function () {
      var q = this,
        s = arguments;
      return new Promise(function (u, v) {
        var x = p.apply(q, s);
        function y(A) {
          d(x, u, v, y, z, "next", A);
        }
        function z(A) {
          d(x, u, v, y, z, "throw", A);
        }
        y(void 0);
      });
    };
  }
  var f = new Env("解密崽操你妈", {
      logLevel: "debug"
    }),
    g = $response.body,
    h = "longmanschool@lx100$#365",
    i = "52013140fillinTopicAnsw",
    j = $request.url;
  function k(p) {
    if ("object" === c(p) && null !== p) {
      for (var q in p) p.hasOwnProperty(q) && ("free" === q || ["isVip", "isFamilyVip", "isSVip"].includes(q) ? p[q] = 1 : "isXiaoduMember" === q ? p[q] = "1" : "validTimne" === q ? p[q] = "2099-09-09" : "memType" === q ? p[q] = 3 : "skuType" === q ? p[q] = "3" : "vipStatus" === q ? p[q] = 1 : k(p[q]));
    }
  }
  function l(p, q, s, u) {
    var v = u.enc.Utf8.parse(q),
      w = u.enc.Utf8.parse(s),
      x = u.TripleDES.decrypt({
        ciphertext: u.enc.Base64.parse(p)
      }, v, {
        iv: w,
        mode: u.mode.CBC,
        padding: u.pad.Pkcs7
      });
    return x.toString(u.enc.Utf8);
  }
  function m(p, q, s, u) {
    var v = u.enc.Utf8.parse(q),
      w = u.enc.Utf8.parse(s),
      x = u.TripleDES.encrypt(p, v, {
        iv: w,
        mode: u.mode.CBC,
        padding: u.pad.Pkcs7
      });
    return x.ciphertext.toString(u.enc.Base64);
  }
  function n() {
    return o.apply(this, arguments);
  }
  function o() {
    o = e(b().mark(function p() {
      var r;
      return b().wrap(function s(u) {
        for (;;) {
          switch (u.prev = u.next) {
            case 0:
              if (r = f.getdata("Utils_Code") || "", !r || !r.length) {
                u.next = 5;
                break;
              }
              console.log("✅ ".concat(f.name, ": 缓存中存在Utils代码, 跳过下载"));
              eval(r);
              return u.abrupt("return", creatUtils());
            case 5:
              console.log("🚀 ".concat(f.name, ": 开始下载Utils代码"));
              return u.abrupt("return", new Promise(function (w) {
                f.getScript("https://cdn.jsdelivr.net/gh/xzxxn777/Surge@main/Utils/Utils.js").then(function (x) {
                  f.setdata(x, "Utils_Code");
                  eval(x);
                  console.log("✅ Utils加载成功, 请继续");
                  w(creatUtils());
                });
              }));
            case 7:
            case "end":
              return u.stop();
          }
        }
      }, p);
    }));
    return o.apply(this, arguments);
  }
  e(b().mark(function p() {
    var q, s, u, v, w, x;
    return b().wrap(function (y) {
      for (;;) {
        switch (y.prev = y.next) {
          case 0:
            y.prev = 0;
            q = function (C) {
              Array.isArray(C) && C.forEach(function (D) {
                for (var E in D.code && (D.free = 1), D) D[E] && "object" === c(D[E]) && q(D[E]);
              });
            };
            y.next = 4;
            return n();
          case 4:
            if (s = y.sent, s && "function" == typeof s.createCryptoJS) {
              y.next = 7;
              break;
            }
            throw new ReferenceError("Utils 或 createCryptoJS 方法未正确加载");
          case 7:
            if (u = s.createCryptoJS(), u) {
              y.next = 10;
              break;
            }
            throw new ReferenceError("CryptoJS 变量未定义");
          case 10:
            if (v = JSON.parse(g), j.includes("https://xfapi.fingerabc.cn/api/lesson/queryLessons") && v.ApiOsLessonOut && Array.isArray(v.ApiOsLessonOut) && q(v.ApiOsLessonOut), "string" != typeof v.result) {
              y.next = 25;
              break;
            }
            w = l(v.result, h, i, u);
            y.prev = 14;
            x = JSON.parse(w);
            k(x);
            v.result = m(JSON.stringify(x), h, i, u);
            y.next = 25;
            break;
          case 20:
            var A = {};
            A.body = g;
            y.prev = 20;
            y.t0 = y.catch(14);
            f.log("接口G了，不要再请求了.请联系作者");
            f.done(A);
            return y.abrupt("return");
          case 25:
            g = JSON.stringify(v);
            f.done({
              body: g
            });
            y.next = 33;
            break;
          case 29:
            var B = {};
            B.body = g;
            y.prev = 29;
            y.t1 = y.catch(0);
            f.logErr(y.t1);
            f.done(B);
          case 33:
          case "end":
            return y.stop();
        }
      }
    }, p, null, [[0, 29], [14, 20]]);
  }))();
})();