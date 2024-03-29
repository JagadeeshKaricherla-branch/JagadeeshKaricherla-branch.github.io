(function() {// Input 0
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var COMPILED = !0, goog = goog || {};
goog.global = this || self;
goog.exportPath_ = function(a, b, c, d) {
  a = a.split(".");
  d = d || goog.global;
  a[0] in d || "undefined" == typeof d.execScript || d.execScript("var " + a[0]);
  for (var e; a.length && (e = a.shift());) {
    if (a.length || void 0 === b) {
      d = d[e] && d[e] !== Object.prototype[e] ? d[e] : d[e] = {};
    } else {
      if (!c && goog.isObject(b) && goog.isObject(d[e])) {
        for (var f in b) {
          b.hasOwnProperty(f) && (d[e][f] = b[f]);
        }
      } else {
        d[e] = b;
      }
    }
  }
};
goog.define = function(a, b) {
  if (!COMPILED) {
    var c = goog.global.CLOSURE_UNCOMPILED_DEFINES, d = goog.global.CLOSURE_DEFINES;
    c && void 0 === c.nodeType && Object.prototype.hasOwnProperty.call(c, a) ? b = c[a] : d && void 0 === d.nodeType && Object.prototype.hasOwnProperty.call(d, a) && (b = d[a]);
  }
  return b;
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.getLocale = function() {
  return goog.LOCALE;
};
goog.TRUSTED_SITE = !0;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide cannot be used within a module.");
  }
  if (!COMPILED && goog.isProvided_(a)) {
    throw Error('Namespace "' + a + '" already declared.');
  }
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b, c) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (var d = a; (d = d.substring(0, d.lastIndexOf("."))) && !goog.getObjectByName(d);) {
      goog.implicitNamespaces_[d] = !0;
    }
  }
  goog.exportPath_(a, b, c);
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.getScriptNonce_ = function(a) {
  a = (a || goog.global).document;
  return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : "";
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if ("string" !== typeof a || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInGoogModuleLoader_()) {
    throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    if (a in goog.loadedModules_) {
      return goog.loadedModules_[a].exports;
    }
    if (!goog.implicitNamespaces_[a]) {
      return a = goog.getObjectByName(a), null != a ? a : null;
    }
  }
  return null;
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6) {
    return !0;
  }
  var a = goog.global.$jscomp;
  return a ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInGoogModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.declareModuleId = function(a) {
  if (!COMPILED) {
    if (!goog.isInEs6ModuleLoader_()) {
      throw Error("goog.declareModuleId may only be called from within an ES6 module");
    }
    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName) {
      throw Error("goog.declareModuleId may only be called once per module.");
    }
    if (a in goog.loadedModules_) {
      throw Error('Module with namespace "' + a + '" already exists.');
    }
  }
  if (goog.moduleLoaderState_) {
    goog.moduleLoaderState_.moduleName = a;
  } else {
    var b = goog.global.$jscomp;
    if (!b || "function" != typeof b.getCurrentModulePath) {
      throw Error('Module with namespace "' + a + '" has been loaded incorrectly.');
    }
    b = b.require(b.getCurrentModulePath());
    goog.loadedModules_[a] = {exports:b, type:goog.ModuleType.ES6, moduleId:a};
  }
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
  return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && null != goog.getObjectByName(a);
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
  a = a.split(".");
  b = b || goog.global;
  for (var c = 0; c < a.length; c++) {
    if (b = b[a[c]], null == b) {
      return null;
    }
  }
  return b;
};
goog.addDependency = function(a, b, c, d) {
  !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency(a, b, c, d);
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested(a);
    if (goog.isProvided_(a)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(a);
      }
    } else if (goog.ENABLE_DEBUG_LOADER) {
      var b = goog.moduleLoaderState_;
      goog.moduleLoaderState_ = null;
      try {
        goog.debugLoader_.load_(a);
      } finally {
        goog.moduleLoaderState_ = b;
      }
    }
    return null;
  }
};
goog.requireType = function(a) {
  return {};
};
goog.basePath = "";
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.instance_ = void 0;
  a.getInstance = function() {
    if (a.instance_) {
      return a.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a();
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRANSPILE_TO_LANGUAGE = "";
goog.TRANSPILER = "transpile.js";
goog.TRUSTED_TYPES_POLICY_NAME = "goog";
goog.hasBadLetScoping = null;
goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:!1, type:goog.ModuleType.GOOG};
    var c = {}, d = c;
    if ("function" === typeof a) {
      d = a.call(void 0, d);
    } else if ("string" === typeof a) {
      d = goog.loadModuleFromSource_.call(void 0, d, a);
    } else {
      throw Error("Invalid module definition");
    }
    var e = goog.moduleLoaderState_.moduleName;
    if ("string" === typeof e && e) {
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(e, d, c !== d) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof d && null != d && Object.seal(d), goog.loadedModules_[e] = {exports:d, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
    } else {
      throw Error('Invalid module name "' + e + '"');
    }
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function(a, b) {
  eval(goog.CLOSURE_EVAL_PREFILTER_.createScript(b));
  return a;
};
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0; b < a.length;) {
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  }
  return a.join("/");
};
goog.loadFileSync_ = function(a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  }
  try {
    var b = new goog.global.XMLHttpRequest();
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.transpile_ = function(a, b, c) {
  var d = goog.global.$jscomp;
  d || (goog.global.$jscomp = d = {});
  var e = d.transpile;
  if (!e) {
    var f = goog.basePath + goog.TRANSPILER, g = goog.loadFileSync_(f);
    if (g) {
      (function() {
        (0,eval)(g + "\n//# sourceURL=" + f);
      }).call(goog.global);
      if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) {
        throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
      }
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      d = goog.global.$jscomp;
      e = d.transpile;
    }
  }
  e || (e = d.transpile = function(l, m) {
    goog.logToConsole_(m + " requires transpilation but no transpiler was found.");
    return l;
  });
  return e(a, b, c);
};
goog.typeOf = function(a) {
  var b = typeof a;
  return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isObject = function(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
  return Object.prototype.hasOwnProperty.call(a, goog.UID_PROPERTY_) && a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if ("function" === typeof a.clone) {
      return a.clone();
    }
    if ("undefined" !== typeof Map && a instanceof Map) {
      return new Map(a);
    }
    if ("undefined" !== typeof Set && a instanceof Set) {
      return new Set(a);
    }
    b = "array" == b ? [] : {};
    for (var c in a) {
      b[c] = goog.cloneObject(a[c]);
    }
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
};
goog.now = function() {
  return Date.now();
};
goog.globalEval = function(a) {
  (0,eval)(a);
};
goog.getCssName = function(a, b) {
  if ("." == String(a).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
  }
  var c = function(e) {
    return goog.cssNameMapping_[e] || e;
  }, d = function(e) {
    e = e.split("-");
    for (var f = [], g = 0; g < e.length; g++) {
      f.push(c(e[g]));
    }
    return f.join("-");
  };
  d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(e) {
    return e;
  };
  a = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a;
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.GetMsgOptions = function() {
};
goog.getMsg = function(a, b, c) {
  c && c.html && (a = a.replace(/</g, "&lt;"));
  c && c.unescapeHtmlEntities && (a = a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  b && (a = a.replace(/\{\$([^}]+)}/g, function(d, e) {
    return null != b && e in b ? b[e] : d;
  }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, !0, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.base = function(d, e, f) {
    for (var g = Array(arguments.length - 2), l = 2; l < arguments.length; l++) {
      g[l - 2] = arguments[l];
    }
    return b.prototype[e].apply(d, g);
  };
};
goog.scope = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a module.");
  }
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor, d = b.statics;
  c && c != Object.prototype.constructor || (c = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  return goog.defineClass.SEAL_CLASS_INSTANCES ? function() {
    var c = a.apply(this, arguments) || this;
    c[goog.UID_PROPERTY_] = c[goog.UID_PROPERTY_];
    return c;
  } : a;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) {
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) {
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
};
goog.identity_ = function(a) {
  return a;
};
goog.createTrustedTypesPolicy = function(a) {
  var b = null, c = goog.global.trustedTypes;
  if (!c || !c.createPolicy) {
    return b;
  }
  try {
    b = c.createPolicy(a, {createHTML:goog.identity_, createScript:goog.identity_, createScriptURL:goog.identity_});
  } catch (d) {
    goog.logToConsole_(d.message);
  }
  return b;
};
!COMPILED && goog.DEPENDENCIES_ENABLED && (goog.isEdge_ = function() {
  return !!(goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "").match(/Edge\/(\d+)(\.\d)*/i);
}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return null != a && "write" in a;
}, goog.isDocumentLoading_ = function() {
  var a = goog.global.document;
  return a.attachEvent ? "complete" != a.readyState : "loading" == a.readyState;
}, goog.findBasePath_ = function() {
  if (void 0 != goog.global.CLOSURE_BASE_PATH && "string" === typeof goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else if (goog.inHtmlDocument_()) {
    var a = goog.global.document, b = a.currentScript;
    a = b ? [b] : a.getElementsByTagName("SCRIPT");
    for (b = a.length - 1; 0 <= b; --b) {
      var c = a[b].src, d = c.lastIndexOf("?");
      d = -1 == d ? c.length : d;
      if ("base.js" == c.slice(d - 7, d)) {
        goog.basePath = c.slice(0, d - 7);
        break;
      }
    }
  }
}, goog.findBasePath_(), goog.Transpiler = function() {
  this.requiresTranspilation_ = null;
  this.transpilationTarget_ = goog.TRANSPILE_TO_LANGUAGE;
}, goog.Transpiler.prototype.createRequiresTranspilation_ = function() {
  function a(f, g) {
    e ? d[f] = !0 : g() ? (c = f, d[f] = !1) : e = d[f] = !0;
  }
  function b(f) {
    try {
      return !!eval(goog.CLOSURE_EVAL_PREFILTER_.createScript(f));
    } catch (g) {
      return !1;
    }
  }
  var c = "es3", d = {es3:!1}, e = !1;
  a("es5", function() {
    return b("[1,].length==1");
  });
  a("es6", function() {
    return goog.isEdge_() ? !1 : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()');
  });
  a("es7", function() {
    return b("2**3==8");
  });
  a("es8", function() {
    return b("async()=>1,1");
  });
  a("es9", function() {
    return b("({...rest}={}),1");
  });
  a("es_2019", function() {
    return b('let r;try{r="\u2029"}catch{};r');
  });
  a("es_2020", function() {
    return b("null?.x??1");
  });
  a("es_next", function() {
    return !1;
  });
  return {target:c, map:d};
}, goog.Transpiler.prototype.needsTranspile = function(a, b) {
  if ("always" == goog.TRANSPILE) {
    return !0;
  }
  if ("never" == goog.TRANSPILE) {
    return !1;
  }
  if (!this.requiresTranspilation_) {
    var c = this.createRequiresTranspilation_();
    this.requiresTranspilation_ = c.map;
    this.transpilationTarget_ = this.transpilationTarget_ || c.target;
  }
  if (a in this.requiresTranspilation_) {
    return this.requiresTranspilation_[a] ? !0 : !goog.inHtmlDocument_() || "es6" != b || "noModule" in goog.global.document.createElement("script") ? !1 : !0;
  }
  throw Error("Unknown language mode: " + a);
}, goog.Transpiler.prototype.transpile = function(a, b) {
  return goog.transpile_(a, b, this.transpilationTarget_);
}, goog.transpiler_ = new goog.Transpiler(), goog.protectScriptTag_ = function(a) {
  return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
}, goog.DebugLoader_ = function() {
  this.dependencies_ = {};
  this.idToPath_ = {};
  this.written_ = {};
  this.loadingDeps_ = [];
  this.depsToLoad_ = [];
  this.paused_ = !1;
  this.factory_ = new goog.DependencyFactory(goog.transpiler_);
  this.deferredCallbacks_ = {};
  this.deferredQueue_ = [];
}, goog.DebugLoader_.prototype.bootstrap = function(a, b) {
  function c() {
    d && (goog.global.setTimeout(d, 0), d = null);
  }
  var d = b;
  if (a.length) {
    b = [];
    for (var e = 0; e < a.length; e++) {
      var f = this.getPathFromDeps_(a[e]);
      if (!f) {
        throw Error("Unregonized namespace: " + a[e]);
      }
      b.push(this.dependencies_[f]);
    }
    f = goog.require;
    var g = 0;
    for (e = 0; e < a.length; e++) {
      f(a[e]), b[e].onLoad(function() {
        ++g == a.length && c();
      });
    }
  } else {
    c();
  }
}, goog.DebugLoader_.prototype.loadClosureDeps = function() {
  this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}, !1));
  this.loadDeps_();
}, goog.DebugLoader_.prototype.requested = function(a, b) {
  (a = this.getPathFromDeps_(a)) && (b || this.areDepsLoaded_(this.dependencies_[a].requires)) && (b = this.deferredCallbacks_[a]) && (delete this.deferredCallbacks_[a], b());
}, goog.DebugLoader_.prototype.setDependencyFactory = function(a) {
  this.factory_ = a;
}, goog.DebugLoader_.prototype.load_ = function(a) {
  if (this.getPathFromDeps_(a)) {
    var b = this, c = [], d = function(e) {
      var f = b.getPathFromDeps_(e);
      if (!f) {
        throw Error("Bad dependency path or symbol: " + e);
      }
      if (!b.written_[f]) {
        b.written_[f] = !0;
        e = b.dependencies_[f];
        for (f = 0; f < e.requires.length; f++) {
          goog.isProvided_(e.requires[f]) || d(e.requires[f]);
        }
        c.push(e);
      }
    };
    d(a);
    a = !!this.depsToLoad_.length;
    this.depsToLoad_ = this.depsToLoad_.concat(c);
    this.paused_ || a || this.loadDeps_();
  } else {
    goog.logToConsole_("goog.require could not find: " + a);
  }
}, goog.DebugLoader_.prototype.loadDeps_ = function() {
  for (var a = this, b = this.paused_; this.depsToLoad_.length && !b;) {
    (function() {
      var c = !1, d = a.depsToLoad_.shift(), e = !1;
      a.loading_(d);
      var f = {pause:function() {
        if (c) {
          throw Error("Cannot call pause after the call to load.");
        }
        b = !0;
      }, resume:function() {
        c ? a.resume_() : b = !1;
      }, loaded:function() {
        if (e) {
          throw Error("Double call to loaded.");
        }
        e = !0;
        a.loaded_(d);
      }, pending:function() {
        for (var g = [], l = 0; l < a.loadingDeps_.length; l++) {
          g.push(a.loadingDeps_[l]);
        }
        return g;
      }, setModuleState:function(g) {
        goog.moduleLoaderState_ = {type:g, moduleName:"", declareLegacyNamespace:!1};
      }, registerEs6ModuleExports:function(g, l, m) {
        m && (goog.loadedModules_[m] = {exports:l, type:goog.ModuleType.ES6, moduleId:m || ""});
      }, registerGoogModuleExports:function(g, l) {
        goog.loadedModules_[g] = {exports:l, type:goog.ModuleType.GOOG, moduleId:g};
      }, clearModuleState:function() {
        goog.moduleLoaderState_ = null;
      }, defer:function(g) {
        if (c) {
          throw Error("Cannot register with defer after the call to load.");
        }
        a.defer_(d, g);
      }, areDepsLoaded:function() {
        return a.areDepsLoaded_(d.requires);
      }};
      try {
        d.load(f);
      } finally {
        c = !0;
      }
    })();
  }
  b && this.pause_();
}, goog.DebugLoader_.prototype.pause_ = function() {
  this.paused_ = !0;
}, goog.DebugLoader_.prototype.resume_ = function() {
  this.paused_ && (this.paused_ = !1, this.loadDeps_());
}, goog.DebugLoader_.prototype.loading_ = function(a) {
  this.loadingDeps_.push(a);
}, goog.DebugLoader_.prototype.loaded_ = function(a) {
  for (var b = 0; b < this.loadingDeps_.length; b++) {
    if (this.loadingDeps_[b] == a) {
      this.loadingDeps_.splice(b, 1);
      break;
    }
  }
  for (b = 0; b < this.deferredQueue_.length; b++) {
    if (this.deferredQueue_[b] == a.path) {
      this.deferredQueue_.splice(b, 1);
      break;
    }
  }
  if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length) {
    for (; this.deferredQueue_.length;) {
      this.requested(this.deferredQueue_.shift(), !0);
    }
  }
  a.loaded();
}, goog.DebugLoader_.prototype.areDepsLoaded_ = function(a) {
  for (var b = 0; b < a.length; b++) {
    var c = this.getPathFromDeps_(a[b]);
    if (!c || !(c in this.deferredCallbacks_ || goog.isProvided_(a[b]))) {
      return !1;
    }
  }
  return !0;
}, goog.DebugLoader_.prototype.getPathFromDeps_ = function(a) {
  return a in this.idToPath_ ? this.idToPath_[a] : a in this.dependencies_ ? a : null;
}, goog.DebugLoader_.prototype.defer_ = function(a, b) {
  this.deferredCallbacks_[a.path] = b;
  this.deferredQueue_.push(a.path);
}, goog.LoadController = function() {
}, goog.LoadController.prototype.pause = function() {
}, goog.LoadController.prototype.resume = function() {
}, goog.LoadController.prototype.loaded = function() {
}, goog.LoadController.prototype.pending = function() {
}, goog.LoadController.prototype.registerEs6ModuleExports = function(a, b, c) {
}, goog.LoadController.prototype.setModuleState = function(a) {
}, goog.LoadController.prototype.clearModuleState = function() {
}, goog.LoadController.prototype.defer = function(a) {
}, goog.LoadController.prototype.areDepsLoaded = function() {
}, goog.Dependency = function(a, b, c, d, e) {
  this.path = a;
  this.relativePath = b;
  this.provides = c;
  this.requires = d;
  this.loadFlags = e;
  this.loaded_ = !1;
  this.loadCallbacks_ = [];
}, goog.Dependency.prototype.getPathName = function() {
  var a = this.path, b = a.indexOf("://");
  0 <= b && (a = a.substring(b + 3), b = a.indexOf("/"), 0 <= b && (a = a.substring(b + 1)));
  return a;
}, goog.Dependency.prototype.onLoad = function(a) {
  this.loaded_ ? a() : this.loadCallbacks_.push(a);
}, goog.Dependency.prototype.loaded = function() {
  this.loaded_ = !0;
  var a = this.loadCallbacks_;
  this.loadCallbacks_ = [];
  for (var b = 0; b < a.length; b++) {
    a[b]();
  }
}, goog.Dependency.defer_ = !1, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function(a) {
  var b = Math.random().toString(32);
  goog.Dependency.callbackMap_[b] = a;
  return b;
}, goog.Dependency.unregisterCallback_ = function(a) {
  delete goog.Dependency.callbackMap_[a];
}, goog.Dependency.callback_ = function(a, b) {
  if (a in goog.Dependency.callbackMap_) {
    for (var c = goog.Dependency.callbackMap_[a], d = [], e = 1; e < arguments.length; e++) {
      d.push(arguments[e]);
    }
    c.apply(void 0, d);
  } else {
    throw Error("Callback key " + a + " does not exist (was base.js loaded more than once?).");
  }
}, goog.Dependency.prototype.load = function(a) {
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var b = goog.global.document;
      if ("complete" == b.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
        if (/\bdeps.js$/.test(this.path)) {
          a.loaded();
          return;
        }
        throw Error('Cannot write "' + this.path + '" after document load');
      }
      var c = goog.getScriptNonce_();
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
        var d = function(l) {
          l.readyState && "complete" != l.readyState ? l.onload = d : (goog.Dependency.unregisterCallback_(e), a.loaded());
        };
        var e = goog.Dependency.registerCallback_(d);
        c = c ? ' nonce="' + c + '"' : "";
        var f = '<script src="' + this.path + '"' + c + (goog.Dependency.defer_ ? " defer" : "") + ' id="script-' + e + '">\x3c/script>';
        f += "<script" + c + ">";
        f = goog.Dependency.defer_ ? f + ("document.getElementById('script-" + e + "').onload = function() {\n  goog.Dependency.callback_('" + e + "', this);\n};\n") : f + ("goog.Dependency.callback_('" + e + "', document.getElementById('script-" + e + "'));");
        f += "\x3c/script>";
        b.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(f) : f);
      } else {
        var g = b.createElement("script");
        g.defer = goog.Dependency.defer_;
        g.async = !1;
        c && (g.nonce = c);
        g.onload = function() {
          g.onload = null;
          a.loaded();
        };
        g.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
        b.head.appendChild(g);
      }
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."), a.loaded()) : a.pause();
    }
  }
}, goog.Es6ModuleDependency = function(a, b, c, d, e) {
  goog.Dependency.call(this, a, b, c, d, e);
}, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function(a) {
  function b(h, n) {
    var q = "", p = goog.getScriptNonce_();
    p && (q = ' nonce="' + p + '"');
    h = n ? '<script type="module" crossorigin' + q + ">" + n + "\x3c/script>" : '<script type="module" crossorigin src="' + h + '"' + q + ">\x3c/script>";
    d.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(h) : h);
  }
  function c(h, n) {
    var q = d.createElement("script");
    q.defer = !0;
    q.async = !1;
    q.type = "module";
    q.setAttribute("crossorigin", !0);
    var p = goog.getScriptNonce_();
    p && (q.nonce = p);
    n ? q.text = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript(n) : n : q.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(h) : h;
    d.head.appendChild(q);
  }
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? a.loaded() : a.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var d = goog.global.document, e = this;
      if (goog.isDocumentLoading_()) {
        var f = b;
        goog.Dependency.defer_ = !0;
      } else {
        f = c;
      }
      var g = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(g);
        a.setModuleState(goog.ModuleType.ES6);
      });
      f(void 0, 'goog.Dependency.callback_("' + g + '")');
      f(this.path, void 0);
      var l = goog.Dependency.registerCallback_(function(h) {
        goog.Dependency.unregisterCallback_(l);
        a.registerEs6ModuleExports(e.path, h, goog.moduleLoaderState_.moduleName);
      });
      f(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + l + '", m)');
      var m = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_(m);
        a.clearModuleState();
        a.loaded();
      });
      f(void 0, 'goog.Dependency.callback_("' + m + '")');
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), a.pause();
    }
  }
}, goog.TransformedDependency = function(a, b, c, d, e) {
  goog.Dependency.call(this, a, b, c, d, e);
  this.contents_ = null;
  this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"));
}, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function(a) {
  function b() {
    e.contents_ = goog.loadFileSync_(e.path);
    e.contents_ && (e.contents_ = e.transform(e.contents_), e.contents_ && (e.contents_ += "\n//# sourceURL=" + e.path));
  }
  function c() {
    e.lazyFetch_ && b();
    if (e.contents_) {
      f && a.setModuleState(goog.ModuleType.ES6);
      try {
        var h = e.contents_;
        e.contents_ = null;
        goog.globalEval(goog.CLOSURE_EVAL_PREFILTER_.createScript(h));
        if (f) {
          var n = goog.moduleLoaderState_.moduleName;
        }
      } finally {
        f && a.clearModuleState();
      }
      f && goog.global.$jscomp.require.ensure([e.getPathName()], function() {
        a.registerEs6ModuleExports(e.path, goog.global.$jscomp.require(e.getPathName()), n);
      });
      a.loaded();
    }
  }
  function d() {
    var h = goog.global.document, n = goog.Dependency.registerCallback_(function() {
      goog.Dependency.unregisterCallback_(n);
      c();
    }), q = goog.getScriptNonce_();
    q = "<script" + (q ? ' nonce="' + q + '"' : "") + ">" + goog.protectScriptTag_('goog.Dependency.callback_("' + n + '");') + "\x3c/script>";
    h.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML(q) : q);
  }
  var e = this;
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    b(), this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, a.loaded()) : a.pause();
  } else {
    var f = this.loadFlags.module == goog.ModuleType.ES6;
    this.lazyFetch_ || b();
    var g = 1 < a.pending().length;
    if (goog.Dependency.defer_ && (g || goog.isDocumentLoading_())) {
      a.defer(function() {
        c();
      });
    } else {
      var l = goog.global.document;
      g = goog.inHtmlDocument_() && ("ActiveXObject" in goog.global || goog.isEdge_());
      if (f && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !g) {
        goog.Dependency.defer_ = !0;
        a.pause();
        var m = l.onreadystatechange;
        l.onreadystatechange = function() {
          "interactive" == l.readyState && (l.onreadystatechange = m, c(), a.resume());
          "function" === typeof m && m.apply(void 0, arguments);
        };
      } else {
        goog.inHtmlDocument_() && goog.isDocumentLoading_() ? d() : c();
      }
    }
  }
}, goog.TransformedDependency.prototype.transform = function(a) {
}, goog.TranspiledDependency = function(a, b, c, d, e, f) {
  goog.TransformedDependency.call(this, a, b, c, d, e);
  this.transpiler = f;
}, goog.inherits(goog.TranspiledDependency, goog.TransformedDependency), goog.TranspiledDependency.prototype.transform = function(a) {
  return this.transpiler.transpile(a, this.getPathName());
}, goog.PreTranspiledEs6ModuleDependency = function(a, b, c, d, e) {
  goog.TransformedDependency.call(this, a, b, c, d, e);
}, goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency), goog.PreTranspiledEs6ModuleDependency.prototype.transform = function(a) {
  return a;
}, goog.GoogModuleDependency = function(a, b, c, d, e, f, g) {
  goog.TransformedDependency.call(this, a, b, c, d, e);
  this.needsTranspile_ = f;
  this.transpiler_ = g;
}, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform = function(a) {
  this.needsTranspile_ && (a = this.transpiler_.transpile(a, this.getPathName()));
  return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON ? "goog.loadModule(" + goog.global.JSON.stringify(a + "\n//# sourceURL=" + this.path + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + a + "\n;return exports});\n//# sourceURL=" + this.path + "\n";
}, goog.DebugLoader_.prototype.addDependency = function(a, b, c, d) {
  b = b || [];
  a = a.replace(/\\/g, "/");
  var e = goog.normalizePath_(goog.basePath + a);
  d && "boolean" !== typeof d || (d = d ? {module:goog.ModuleType.GOOG} : {});
  c = this.factory_.createDependency(e, a, b, c, d, goog.transpiler_.needsTranspile(d.lang || "es3", d.module));
  this.dependencies_[e] = c;
  for (c = 0; c < b.length; c++) {
    this.idToPath_[b[c]] = e;
  }
  this.idToPath_[a] = e;
}, goog.DependencyFactory = function(a) {
  this.transpiler = a;
}, goog.DependencyFactory.prototype.createDependency = function(a, b, c, d, e, f) {
  return e.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency(a, b, c, d, e, f, this.transpiler) : f ? new goog.TranspiledDependency(a, b, c, d, e, this.transpiler) : e.module == goog.ModuleType.ES6 ? "never" == goog.TRANSPILE && goog.ASSUME_ES_MODULES_TRANSPILED ? new goog.PreTranspiledEs6ModuleDependency(a, b, c, d, e) : new goog.Es6ModuleDependency(a, b, c, d, e) : new goog.Dependency(a, b, c, d, e);
}, goog.debugLoader_ = new goog.DebugLoader_(), goog.loadClosureDeps = function() {
  goog.debugLoader_.loadClosureDeps();
}, goog.setDependencyFactory = function(a) {
  goog.debugLoader_.setDependencyFactory(a);
}, goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null, goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function(a, b) {
  goog.debugLoader_.bootstrap(a, b);
});
if (!COMPILED) {
  var isChrome87 = !1;
  try {
    isChrome87 = eval(goog.global.trustedTypes.emptyScript) !== goog.global.trustedTypes.emptyScript;
  } catch (a) {
  }
  goog.CLOSURE_EVAL_PREFILTER_ = goog.global.trustedTypes && isChrome87 && goog.createTrustedTypesPolicy("goog#base#devonly#eval") || {createScript:goog.identity_};
}
;
// Input 1
goog.json = {};
goog.json.Replacer = {};
goog.json.Reviver = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.TRY_NATIVE_JSON = !0;
goog.json.isValid = function(a) {
  return /^\s*$/.test(a) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""));
};
goog.json.errorLogger_ = () => {
};
goog.json.setErrorLogger = function(a) {
  goog.json.errorLogger_ = a;
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
  let b;
  if (goog.json.TRY_NATIVE_JSON) {
    try {
      return goog.global.JSON.parse(a);
    } catch (c) {
      b = c;
    }
  }
  a = String(a);
  if (goog.json.isValid(a)) {
    try {
      const c = eval("(" + a + ")");
      b && goog.json.errorLogger_("Invalid JSON: " + a, b);
      return c;
    } catch (c) {
    }
  }
  throw Error("Invalid JSON string: " + a);
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(a, b) {
  return (new goog.json.Serializer(b)).serialize(a);
};
goog.json.Serializer = function(a) {
  this.replacer_ = a;
};
goog.json.Serializer.prototype.serialize = function(a) {
  const b = [];
  this.serializeInternal(a, b);
  return b.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(a, b) {
  if (null == a) {
    b.push("null");
  } else {
    if ("object" == typeof a) {
      if (Array.isArray(a)) {
        this.serializeArray(a, b);
        return;
      }
      if (a instanceof String || a instanceof Number || a instanceof Boolean) {
        a = a.valueOf();
      } else {
        this.serializeObject_(a, b);
        return;
      }
    }
    switch(typeof a) {
      case "string":
        this.serializeString_(a, b);
        break;
      case "number":
        this.serializeNumber_(a, b);
        break;
      case "boolean":
        b.push(String(a));
        break;
      case "function":
        b.push("null");
        break;
      default:
        throw Error("Unknown type: " + typeof a);
    }
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\v":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(a, b) {
  b.push('"', a.replace(goog.json.Serializer.charsToReplace_, function(c) {
    let d = goog.json.Serializer.charToJsonCharCache_[c];
    d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).slice(1), goog.json.Serializer.charToJsonCharCache_[c] = d);
    return d;
  }), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(a, b) {
  b.push(isFinite(a) && !isNaN(a) ? String(a) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(a, b) {
  const c = a.length;
  b.push("[");
  var d = "";
  for (let e = 0; e < c; e++) {
    b.push(d), d = a[e], this.serializeInternal(this.replacer_ ? this.replacer_.call(a, String(e), d) : d, b), d = ",";
  }
  b.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(a, b) {
  b.push("{");
  let c = "";
  for (const d in a) {
    if (Object.prototype.hasOwnProperty.call(a, d)) {
      const e = a[d];
      "function" != typeof e && (b.push(c), this.serializeString_(d, b), b.push(":"), this.serializeInternal(this.replacer_ ? this.replacer_.call(a, d, e) : e, b), c = ",");
    }
  }
  b.push("}");
};
// Input 2
var config = {app_service_endpoint:"https://app.link", link_service_endpoint:"https://bnc.lt", api_endpoint:"https://api.stage.branch.io", version:"1.0.0", sdk:"connected"};
// Input 3
var safejson = {parse:function(a) {
  a = String(a);
  try {
    return JSON.parse(a);
  } catch (b) {
  }
  throw Error("Invalid JSON string: " + a);
}, stringify:function(a) {
  try {
    return "object" === typeof JSON && "function" === typeof JSON.stringify ? JSON.stringify(a) : goog.json.serialize(a);
  } catch (b) {
  }
  throw Error("Could not stringify object");
}};
// Input 4
var utils = {}, message;
utils.debug = !0;
utils.retries = 2;
utils.retry_delay = 200;
utils.timeout = 5000;
utils.nonce = "";
utils.instrumentation = {};
utils.navigationTimingAPIEnabled = "undefined" !== typeof window && !!(window.performance && window.performance.timing && window.performance.timing.navigationStart);
utils.timeSinceNavigationStart = function() {
  return (Date.now() - window.performance.timing.navigationStart).toString();
};
utils.currentRequestBrttTag = "";
utils.calculateBrtt = function(a) {
  return a && "number" === typeof a ? (Date.now() - a).toString() : null;
};
utils.userPreferences = {trackingDisabled:!1, whiteListedEndpointsWithData:{"/v1/open":{link_identifier:"\\d+"}, "/v1/url":{}}, allowErrorsInCallback:!1, shouldBlockRequest:function(a, b) {
  var c = document.createElement("a");
  c.href = a;
  a = [config.api_endpoint, config.app_service_endpoint, config.link_service_endpoint];
  var d = c.origin;
  d.endsWith("/") && (d = d.substring(0, d.length - 1));
  if (!a.includes(d)) {
    return !1;
  }
  c = c.pathname;
  "/" != c[0] && (c = "/" + c);
  if (c.startsWith("/c/")) {
    return !1;
  }
  c = utils.userPreferences.whiteListedEndpointsWithData[c];
  if (!c) {
    return !0;
  }
  if (0 < Object.keys(c).length) {
    if (!b) {
      return !0;
    }
    for (var e in c) {
      if (a = new RegExp(c[e]), !b.hasOwnProperty(e) || !a.test(b[e])) {
        return !0;
      }
    }
  }
  return !1;
}};
utils.generateDynamicBNCLink = function(a, b) {
  if (a || b) {
    a = config.link_service_endpoint + "/a/" + a + "?";
    for (var c = "tags alias channel feature stage campaign type duration sdk source data".split(" "), d = 0; d < c.length; d++) {
      var e = c[d], f = b[e];
      if (f) {
        if ("tags" === e && Array.isArray(f)) {
          for (var g = 0; g < f.length; g++) {
            a = ("?" === a[a.length - 1] ? a + e : a + "&" + e) + "=" + encodeURIComponent(f[g]);
          }
        } else if ("string" === typeof f && 0 < f.length || "number" === typeof f) {
          "data" === e && "string" === typeof f && (f = utils.base64encode(f)), a = ("?" === a[a.length - 1] ? a + e : a + "&" + e) + "=" + encodeURIComponent(f);
        }
      }
    }
    return a;
  }
};
utils.cleanApplicationAndSessionStorage = function(a) {
  a && (a.device_fingerprint_id = null, a.sessionLink = null, a.session_id = null, a.randomized_bundle_token = null, a.identity = null, a.randomized_device_token = null, a._storage.remove("branch_view_enabled"), session.set(a._storage, {}, !0));
};
utils.httpMethod = {POST:"POST", GET:"GET"};
utils.messages = {missingParam:"API request $1 missing parameter $2", invalidType:"API request $1, parameter $2 is not $3", nonInit:"Branch SDK not initialized", initPending:"Branch SDK initialization pending and a Branch method was called outside of the queue order", initFailed:"Branch SDK initialization failed, so further methods cannot be called", existingInit:"Branch SDK already initialized", missingAppId:"Missing Branch app ID", callBranchInitFirst:"Branch.init must be called first", timeout:"Request timed out", 
blockedByClient:"Request blocked by client, probably adblock", missingUrl:"Required argument: URL, is missing", trackingDisabled:"Requested operation cannot be completed since tracking is disabled"};
utils.getLocationSearch = function() {
  return utils.isIframeAndFromSameOrigin() ? window.top.location.search : window.location.search;
};
utils.getLocationHash = function() {
  return utils.isIframeAndFromSameOrigin() ? window.top.location.hash : window.location.hash;
};
utils.message = function(a, b, c, d) {
  a = a.replace(/\$(\d)/g, function(e, f) {
    return b[parseInt(f, 10) - 1];
  });
  c && (a += "\n Failure Code:" + c);
  d && (a += "\n Failure Details:" + d);
  utils.debug && console && console.log(a);
  return a;
};
utils.whiteListSessionData = function(a) {
  return {data:a.data || "", data_parsed:a.data_parsed || {}, has_app:utils.getBooleanOrNull(a.has_app), identity:a.identity || null, developer_identity:a.identity || null, referring_identity:a.referring_identity || null, referring_link:a.referring_link || null};
};
utils.getWindowLocation = function() {
  return utils.isIframe() ? document.referrer : String(window.location);
};
utils.getParameterByName = function(a) {
  a = a.replace(/[\[\]]/g, "\\$&");
  var b = utils.getWindowLocation();
  return (a = (new RegExp("[?&]" + a + "(=([^&#]*)|&|#|$)")).exec(b)) && a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "";
};
utils.cleanLinkData = function(a) {
  a.source = "connected-sdk";
  var b = a.data;
  switch(typeof b) {
    case "string":
      try {
        b = safejson.parse(b);
      } catch (c) {
        b = {_bncNoEval:!0};
      }
      break;
    case "object":
      break;
    default:
      b = {};
  }
  b.$canonical_url || (b.$canonical_url = utils.getWindowLocation());
  b.$og_title || (b.$og_title = utils.getOpenGraphContent("title"));
  b.$og_description || (b.$og_description = utils.getOpenGraphContent("description"));
  b.$og_image_url || (b.$og_image_url = utils.getOpenGraphContent("image"));
  b.$og_video || (b.$og_video = utils.getOpenGraphContent("video"));
  b.$og_type || (b.$og_type = utils.getOpenGraphContent("type"));
  "string" === typeof b.$desktop_url && (b.$desktop_url = b.$desktop_url.replace(/#r:[a-z0-9-_]+$/i, "").replace(/([\?&]_branch_match_id=\d+)/, ""));
  try {
    safejson.parse(b);
  } catch (c) {
    b = goog.json.serialize(b);
  }
  a.data = b;
  return a;
};
utils.getClickIdAndSearchStringFromLink = function(a) {
  function b(d) {
    return "" !== d;
  }
  if (!a || "string" !== typeof a) {
    return "";
  }
  var c = document.createElement("a");
  c.href = a;
  a = c.pathname && c.pathname.split("/").filter(b);
  return Array.isArray(a) && a.length ? a[a.length - 1] + c.search : c.search;
};
utils.processReferringLink = function(a) {
  return a ? "http" !== a.substring(0, 4) ? config.link_service_endpoint + a : a : null;
};
utils.merge = function(a, b, c) {
  a && "object" === typeof a || (a = {});
  if (!b || "object" !== typeof b) {
    return a;
  }
  for (var d in b) {
    if (b.hasOwnProperty(d)) {
      var e = b[d];
      !c || void 0 !== e && null !== e ? a[d] = e : delete a[d];
    }
  }
  return a;
};
utils.hashValue = function(a) {
  try {
    var b = utils.getLocationHash().match(new RegExp(a + ":([^&]*)"));
    if (b && 1 <= b.length) {
      return b[1];
    }
  } catch (c) {
  }
};
function isSafariBrowser(a) {
  return !!/^((?!chrome|android|crios|firefox|fxios|edg|yabrowser).)*safari/i.test(a);
}
function isChromeBrowser(a) {
  return !!/(chrome|crios)/i.test(a);
}
function isFirefoxBrowser(a) {
  return !!/(fxios|firefox)/i.test(a);
}
function isEdgeBrowser(a) {
  return !!/edg/i.test(a);
}
function isOperaBrowser(a) {
  return !!/(opt|opr)/i.test(a);
}
function isYandexBrowser(a) {
  return !!/yabrowser/i.test(a);
}
function isMacintoshDesktop(a) {
  return a && -1 < a.indexOf("Macintosh");
}
function isGTEVersion(a, b) {
  b = b || 11;
  if ((a = /version\/([^ ]*)/i.exec(a)) && a[1]) {
    try {
      if (parseFloat(a[1]) >= b) {
        return !0;
      }
    } catch (c) {
    }
  }
  return !1;
}
function isSafari13OrGreateriPad(a) {
  return a && isSafariBrowser(a) && isMacintoshDesktop(a) && isGTEVersion(a, 13) && screen.height > screen.width;
}
function isIOS(a) {
  return a && /(iPad|iPod|iPhone)/.test(a);
}
utils.mobileUserAgent = function() {
  var a = navigator.userAgent;
  return a.match(/android/i) ? "android" : a.match(/ipad/i) || isSafari13OrGreateriPad(a) ? "ipad" : a.match(/i(os|p(hone|od))/i) ? "ios" : a.match(/\(BB[1-9][0-9]*;/i) ? "blackberry" : a.match(/Windows Phone/i) ? "windows_phone" : a.match(/Kindle/i) || a.match(/Silk/i) || a.match(/KFTT/i) || a.match(/KFOT/i) || a.match(/KFJWA/i) || a.match(/KFJWI/i) || a.match(/KFSOWI/i) || a.match(/KFTHWA/i) || a.match(/KFTHWI/i) || a.match(/KFAPWA/i) || a.match(/KFAPWI/i) ? "kindle" : !1;
};
utils.isSafari11OrGreater = function() {
  var a = navigator.userAgent;
  return isSafariBrowser(a) ? isGTEVersion(a, 11) : !1;
};
utils.isWebKitBrowser = function() {
  return !!window.webkitURL;
};
utils.isIOSWKWebView = function() {
  var a = navigator.userAgent;
  return utils.isWebKitBrowser() && a && isIOS(a) && !isChromeBrowser(a) && !isFirefoxBrowser(a) && !isEdgeBrowser(a) && !isOperaBrowser(a) && !isYandexBrowser(a);
};
utils.getParamValue = function(a) {
  try {
    var b = utils.getLocationSearch().substring(1).match(new RegExp(a + "=([^&]*)"));
    if (b && 1 <= b.length) {
      return b[1];
    }
  } catch (c) {
  }
};
utils.isKey = function(a) {
  return -1 < a.indexOf("key_");
};
utils.snakeToCamel = function(a) {
  return a.replace(/(\-\w)/g, function(b) {
    return b[1].toUpperCase();
  });
};
utils.base64encode = function(a) {
  var b = "", c, d = 0;
  a = a.replace(/\r\n/g, "\n");
  var e = "";
  for (c = 0; c < a.length; c++) {
    var f = a.charCodeAt(c);
    128 > f ? e += String.fromCharCode(f) : (127 < f && 2048 > f ? e += String.fromCharCode(f >> 6 | 192) : (e += String.fromCharCode(f >> 12 | 224), e += String.fromCharCode(f >> 6 & 63 | 128)), e += String.fromCharCode(f & 63 | 128));
  }
  for (a = e; d < a.length;) {
    var g = a.charCodeAt(d++);
    e = a.charCodeAt(d++);
    c = a.charCodeAt(d++);
    f = g >> 2;
    g = (g & 3) << 4 | e >> 4;
    var l = (e & 15) << 2 | c >> 6;
    var m = c & 63;
    isNaN(e) ? m = l = 64 : isNaN(c) && (m = 64);
    b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(m);
  }
  return b;
};
utils.base64Decode = function(a) {
  return utils.isBase64Encoded(a) ? atob(a) : a;
};
utils.isBase64Encoded = function(a) {
  if ("string" !== typeof a || "" === a || "" === a.trim()) {
    return !1;
  }
  try {
    return btoa(atob(a)) === a;
  } catch (b) {
    return !1;
  }
};
utils.encodeBFPs = function(a) {
  a && a.randomized_device_token && !utils.isBase64Encoded(a.randomized_device_token) && (a.randomized_device_token = btoa(a.randomized_device_token));
  return a;
};
utils.decodeBFPs = function(a) {
  a && utils.isBase64Encoded(a.randomized_device_token) && (a.randomized_device_token = atob(a.randomized_device_token));
  return a;
};
utils.addEvent = function(a, b, c, d) {
  var e = 0;
  "function" === typeof a.addEventListener ? e = a.addEventListener(b, c, d) : "function" === typeof a.attachEvent ? e = a.attachEvent("on" + b, c) : a["on" + b] = c;
  return e;
};
utils.extractDeeplinkPath = function(a) {
  if (!a) {
    return null;
  }
  -1 < a.indexOf("://") && (a = a.split("://")[1]);
  return a.substring(a.indexOf("/") + 1);
};
utils.extractMobileDeeplinkPath = function(a) {
  if (!a) {
    return null;
  }
  -1 < a.indexOf("://") ? a = a.split("://")[1] : "/" === a.charAt(0) && (a = a.slice(1));
  return a;
};
utils.getOpenGraphContent = function(a, b) {
  a = String(a);
  b = b || null;
  (a = document.querySelector('meta[property="og:' + a + '"]')) && a.content && (b = a.content);
  return b;
};
utils.prioritizeDeeplinkPaths = function(a, b) {
  if (!b || "object" !== typeof b || 0 === Object.keys(b || {}).length) {
    return a;
  }
  b.hostedIOS ? a.$ios_deeplink_path = b.hostedIOS : b.applinksIOS ? a.$ios_deeplink_path = b.applinksIOS : b.twitterIOS && (a.$ios_deeplink_path = b.twitterIOS);
  b.hostedAndroid ? a.$android_deeplink_path = b.hostedAndroid : b.applinksAndroid ? a.$android_deeplink_path = b.applinksAndroid : b.twitterAndroid && (a.$android_deeplink_path = b.twitterAndroid);
  a.hasOwnProperty("$ios_deeplink_path") && a.hasOwnProperty("$android_deeplink_path") && a.$ios_deeplink_path === a.$android_deeplink_path && (a.$deeplink_path = a.$ios_deeplink_path);
  return a;
};
utils.processHostedDeepLinkData = function(a) {
  var b = {};
  if (!a || 0 === a.length) {
    return b;
  }
  for (var c = {hostedIOS:null, hostedAndroid:null, applinksIOS:null, applinksAndroid:null, twitterIOS:null, twitterAndroid:null}, d = 0; d < a.length; d++) {
    if ((a[d].getAttribute("name") || a[d].getAttribute("property")) && a[d].getAttribute("content")) {
      var e = a[d].getAttribute("name"), f = a[d].getAttribute("property");
      e = e || f;
      f = e.split(":");
      3 === f.length && "branch" === f[0] && "deeplink" === f[1] && ("$ios_deeplink_path" === f[2] ? c.hostedIOS = utils.extractMobileDeeplinkPath(a[d].getAttribute("content")) : "$android_deeplink_path" === f[2] ? c.hostedAndroid = utils.extractMobileDeeplinkPath(a[d].getAttribute("content")) : b[f[2]] = a[d].getAttribute("content"));
      "al:ios:url" === e && (c.applinksIOS = utils.extractMobileDeeplinkPath(a[d].getAttribute("content")));
      "twitter:app:url:iphone" === e && (c.twitterIOS = utils.extractMobileDeeplinkPath(a[d].getAttribute("content")));
      "al:android:url" === e && (c.applinksAndroid = utils.extractMobileDeeplinkPath(a[d].getAttribute("content")));
      "twitter:app:url:googleplay" === e && (c.twitterAndroid = utils.extractMobileDeeplinkPath(a[d].getAttribute("content")));
    }
  }
  return utils.prioritizeDeeplinkPaths(b, c);
};
utils.getHostedDeepLinkData = function() {
  var a = document.getElementsByTagName("meta");
  return utils.processHostedDeepLinkData(a);
};
utils.getBrowserLanguageCode = function() {
  try {
    if (navigator.languages && 0 < navigator.languages.length) {
      var a = navigator.languages[0];
    } else {
      navigator.language && (a = navigator.language);
    }
    a = a.substring(0, 2).toUpperCase();
  } catch (b) {
    a = null;
  }
  return a;
};
utils.calculateDiffBetweenArrays = function(a, b) {
  var c = [];
  b.forEach(function(d) {
    -1 === a.indexOf(d) && c.push(d);
  });
  return c;
};
utils.getTitle = function() {
  var a = document.getElementsByTagName("title");
  return 0 < a.length ? a[0].innerText : null;
};
utils.getDescription = function() {
  var a = document.querySelector('meta[name="description"]');
  return a && a.content ? a.content : null;
};
utils.getCanonicalURL = function() {
  var a = document.querySelector('link[rel="canonical"]');
  return a && a.href ? a.href : null;
};
utils.addPropertyIfNotNull = function(a, b, c) {
  if (null !== c && void 0 !== c) {
    if ("object" === typeof c && 0 === Object.keys(c || {}).length) {
      return a;
    }
    a[b] = c;
  }
  return a;
};
utils.openGraphDataAsObject = function() {
  var a = {};
  a = utils.addPropertyIfNotNull(a, "$og_title", utils.getOpenGraphContent("title"));
  a = utils.addPropertyIfNotNull(a, "$og_description", utils.getOpenGraphContent("description"));
  a = utils.addPropertyIfNotNull(a, "$og_image_url", utils.getOpenGraphContent("image"));
  a = utils.addPropertyIfNotNull(a, "$og_video", utils.getOpenGraphContent("video"));
  return (a = utils.addPropertyIfNotNull(a, "$og_type", utils.getOpenGraphContent("type"))) && 0 < Object.keys(a).length ? a : null;
};
utils.getAdditionalMetadata = function() {
  var a = {};
  a = utils.addPropertyIfNotNull(a, "og_data", utils.openGraphDataAsObject());
  a = utils.addPropertyIfNotNull(a, "hosted_deeplink_data", utils.getHostedDeepLinkData());
  a = utils.addPropertyIfNotNull(a, "title", utils.getTitle());
  a = utils.addPropertyIfNotNull(a, "description", utils.getDescription());
  return (a = utils.addPropertyIfNotNull(a, "canonical_url", utils.getCanonicalURL())) && 0 < Object.keys(a).length ? a : {};
};
utils.removePropertiesFromObject = function(a, b) {
  if (a && "object" === typeof a && !Array.isArray(a) && 0 < Object.keys(a).length && b && Array.isArray(b) && 0 < b.length) {
    for (var c in a) {
      a.hasOwnProperty(c) && -1 < b.indexOf(c) && delete a[c];
    }
  }
};
var BRANCH_STANDARD_EVENTS = "ADD_TO_CART ADD_TO_WISHLIST VIEW_CART INITIATE_PURCHASE ADD_PAYMENT_INFO PURCHASE SPEND_CREDITS SEARCH VIEW_ITEM VIEW_ITEMS RATE SHARE COMPLETE_REGISTRATION COMPLETE_TUTORIAL ACHIEVE_LEVEL UNLOCK_ACHIEVEMENT LOGIN SUBSCRIBE START_TRIAL INVITE RESERVE VIEW_AD CLICK_AD INITIATE_STREAM COMPLETE_STREAM".split(" "), BRANCH_STANDARD_EVENT_DATA = "transaction_id revenue currency shipping tax coupon affiliation search_query description".split(" ");
utils.isStandardEvent = function(a) {
  return a && -1 < BRANCH_STANDARD_EVENTS.indexOf(a);
};
utils.separateEventAndCustomData = function(a) {
  if (!a || 0 === Object.keys(a).length) {
    return null;
  }
  for (var b = utils.calculateDiffBetweenArrays(BRANCH_STANDARD_EVENT_DATA, Object.keys(a)), c = {}, d = 0; d < b.length; d++) {
    var e = b[d];
    c[e] = a[e];
    delete a[e];
  }
  return {custom_data:utils.convertObjectValuesToString(c), event_data:a};
};
utils.validateParameterType = function(a, b) {
  return !b || null === a && "object" === b ? !1 : "array" === b ? Array.isArray(a) : typeof a === b && !Array.isArray(a);
};
utils.getScreenHeight = function() {
  return screen.height || 0;
};
utils.getScreenWidth = function() {
  return screen.width || 0;
};
utils.getUserData = function(a) {
  var b = {};
  b = utils.addPropertyIfNotNull(b, "http_origin", document.URL);
  b = utils.addPropertyIfNotNull(b, "user_agent", navigator.userAgent);
  b = utils.addPropertyIfNotNull(b, "language", utils.getBrowserLanguageCode());
  b = utils.addPropertyIfNotNull(b, "screen_width", utils.getScreenWidth());
  b = utils.addPropertyIfNotNull(b, "screen_height", utils.getScreenHeight());
  b = utils.addPropertyIfNotNull(b, "http_referrer", document.referrer);
  b = utils.addPropertyIfNotNull(b, "randomized_device_token", a.randomized_device_token);
  b = utils.addPropertyIfNotNull(b, "developer_identity", a.identity);
  b = utils.addPropertyIfNotNull(b, "identity", a.identity);
  b = utils.addPropertyIfNotNull(b, "sdk", config.sdk);
  return b = utils.addPropertyIfNotNull(b, "sdk_version", config.version);
};
utils.isIframe = function() {
  return window.self !== window.top;
};
utils.isSameOriginFrame = function() {
  var a = "true";
  try {
    window.top.location.search && (a = "true");
  } catch (b) {
    return !1;
  }
  return "true" === a;
};
utils.isIframeAndFromSameOrigin = function() {
  return utils.isIframe() && utils.isSameOriginFrame();
};
utils.getInitialReferrer = function(a) {
  return a ? a : utils.isIframe() ? utils.isSameOriginFrame() ? window.top.document.referrer : "" : document.referrer;
};
utils.getCurrentUrl = function() {
  return utils.isIframeAndFromSameOrigin() ? window.top.location.href : window.location.href;
};
utils.convertValueToString = function(a) {
  return utils.validateParameterType(a, "object") || utils.validateParameterType(a, "array") ? safejson.stringify(a) : null === a ? "null" : a.toString();
};
utils.convertObjectValuesToString = function(a) {
  if (!utils.validateParameterType(a, "object") || 0 === Object.keys(a).length) {
    return {};
  }
  for (var b in a) {
    a.hasOwnProperty(b) && (a[b] = utils.convertValueToString(a[b]));
  }
  return a;
};
utils.mergeHostedDeeplinkData = function(a, b) {
  a = a ? utils.merge({}, a) : {};
  return b && 0 < Object.keys(b).length ? 0 < Object.keys(a).length ? utils.merge(a, b) : utils.merge({}, b) : a;
};
utils.addNonceAttribute = function(a) {
  "" !== utils.nonce && a.setAttribute("nonce", utils.nonce);
};
utils.getBooleanOrNull = function(a) {
  return void 0 === a ? null : a;
};
utils.delay = function(a, b) {
  isNaN(b) || 0 >= b ? a() : setTimeout(a, b);
};
utils.validateAdvertiserIDs = function(a = {}) {
  const b = "SAMSUNG_IFA LG_IFA PANASONIC_IFA PLAYSTATION_IFA XBOX_MSAI ROKU_RIDA MAC_ADDRESS OAID IDFA AAID ANDROID_ID IDFV".split(" ");
  a = Object.keys(a).filter(c => -1 === b.indexOf(c)).map(c => Error(`${c} is invalid.`));
  if (0 < a.length) {
    for (let c = 0; c < a.length; c++) {
      console.log(a[c]);
    }
    return !1;
  }
  return !0;
};
// Input 5
var resources = {}, validationTypes = {OBJECT:0, STRING:1, NUMBER:2, ARRAY:3, BOOLEAN:4}, _validator;
function validator(a, b) {
  return function(c, d, e) {
    if (utils.userPreferences.trackingDisabled) {
      return !1;
    }
    if ("number" === typeof e || e) {
      if (b === validationTypes.OBJECT) {
        if ("object" !== typeof e) {
          return utils.message(utils.messages.invalidType, [c, d, "an object"]);
        }
      } else if (b === validationTypes.ARRAY) {
        if (!(e instanceof Array)) {
          return utils.message(utils.messages.invalidType, [c, d, "an array"]);
        }
      } else if (b === validationTypes.NUMBER) {
        if ("number" !== typeof e) {
          return utils.message(utils.messages.invalidType, [c, d, "a number"]);
        }
      } else if (b === validationTypes.BOOLEAN) {
        if ("boolean" !== typeof e) {
          return utils.message(utils.messages.invalidType, [c, d, "a boolean"]);
        }
      } else {
        if ("string" !== typeof e) {
          return utils.message(utils.messages.invalidType, [c, d, "a string"]);
        }
        if (b !== validationTypes.STRING && !b.test(e)) {
          return utils.message(utils.messages.invalidType, [c, d, "in the proper format"]);
        }
      }
    } else {
      if (a) {
        return utils.message(utils.messages.missingParam, [c, d]);
      }
    }
    return !1;
  };
}
function defaults(a) {
  var b = {randomized_device_token:validator(!0, validationTypes.STRING), randomized_bundle_token:validator(!0, validationTypes.STRING), sdk:validator(!0, validationTypes.STRING), sdk_version:validator(!0, validationTypes.STRING), session_id:validator(!0, validationTypes.STRING)};
  return utils.merge(a, b);
}
function v2defaults(a) {
  var b = {user_data:validator(!0, validationTypes.STRING)};
  return utils.merge(a, b);
}
resources.open = {destination:config.api_endpoint, endpoint:"/v1/open", method:utils.httpMethod.POST, params:{randomized_device_token:validator(!1, validationTypes.STRING), randomized_bundle_token:validator(!1, validationTypes.STRING), link_identifier:validator(!1, validationTypes.STRING), sdk:validator(!1, validationTypes.STRING), options:validator(!1, validationTypes.OBJECT), initial_referrer:validator(!1, validationTypes.STRING), tracking_disabled:validator(!1, validationTypes.BOOLEAN), current_url:validator(!1, 
validationTypes.STRING), screen_height:validator(!1, validationTypes.NUMBER), screen_width:validator(!1, validationTypes.NUMBER), sdk_version:validator(!1, validationTypes.STRING), advertising_ids:validator(!1, validationTypes.OBJECT)}};
resources._r = {destination:config.app_service_endpoint, endpoint:"/_r", method:utils.httpMethod.GET, jsonp:!0, params:{sdk:validator(!0, validationTypes.STRING), _t:validator(!1, validationTypes.STRING), branch_key:validator(!0, validationTypes.STRING)}};
resources.linkClick = {destination:"", endpoint:"", method:utils.httpMethod.GET, queryPart:{link_url:validator(!0, validationTypes.STRING)}, params:{click:validator(!0, validationTypes.STRING)}};
resources.logout = {destination:config.api_endpoint, endpoint:"/v1/logout", method:utils.httpMethod.POST, params:defaults({session_id:validator(!0, validationTypes.STRING)})};
resources.profile = {destination:config.api_endpoint, endpoint:"/v1/profile", method:utils.httpMethod.POST, params:defaults({randomized_bundle_token:validator(!0, validationTypes.STRING), identity:validator(!0, validationTypes.STRING)})};
resources.link = {destination:config.api_endpoint, endpoint:"/v1/url", method:utils.httpMethod.POST, ref:"obj", params:defaults({alias:validator(!1, validationTypes.STRING), campaign:validator(!1, validationTypes.STRING), channel:validator(!1, validationTypes.STRING), data:validator(!1, validationTypes.STRING), feature:validator(!1, validationTypes.STRING), randomized_bundle_token:validator(!0, validationTypes.STRING), stage:validator(!1, validationTypes.STRING), tags:validator(!1, validationTypes.ARRAY), 
type:validator(!1, validationTypes.NUMBER), source:validator(!1, validationTypes.STRING), instrumentation:validator(!1, validationTypes.STRING)})};
resources.qrCode = {destination:config.api_endpoint, endpoint:"/v1/qr-code", method:utils.httpMethod.POST, ref:"obj", params:defaults({alias:validator(!1, validationTypes.STRING), campaign:validator(!1, validationTypes.STRING), channel:validator(!1, validationTypes.STRING), data:validator(!1, validationTypes.STRING), qr_code_settings:validator(!1, validationTypes.STRING), feature:validator(!1, validationTypes.STRING), randomized_bundle_token:validator(!0, validationTypes.STRING), stage:validator(!1, 
validationTypes.STRING), tags:validator(!1, validationTypes.ARRAY), type:validator(!1, validationTypes.NUMBER), source:validator(!1, validationTypes.STRING)})};
resources.logStandardEvent = {destination:config.api_endpoint, endpoint:"/v2/event/standard", method:utils.httpMethod.POST, params:v2defaults({name:validator(!0, validationTypes.STRING), custom_data:validator(!1, validationTypes.STRING), event_data:validator(!1, validationTypes.STRING), content_items:validator(!1, validationTypes.STRING), customer_event_alias:validator(!1, validationTypes.STRING)})};
resources.logCustomEvent = {destination:config.api_endpoint, endpoint:"/v2/event/custom", method:utils.httpMethod.POST, params:v2defaults({name:validator(!0, validationTypes.STRING), custom_data:validator(!1, validationTypes.STRING), event_data:validator(!1, validationTypes.STRING), content_items:validator(!1, validationTypes.STRING), customer_event_alias:validator(!1, validationTypes.STRING)})};
resources.crossPlatformIds = {destination:config.api_endpoint, endpoint:"/v1/cpid", method:utils.httpMethod.POST, params:{user_data:validator(!0, validationTypes.STRING)}};
resources.lastAttributedTouchData = {destination:config.api_endpoint, endpoint:"/v1/cpid/latd", method:utils.httpMethod.POST, params:{user_data:validator(!0, validationTypes.STRING)}};
// Input 6
var COOKIE_MS = 31536E6, BRANCH_KEY_PREFIX = "BRANCH_CONNECTEDSDK_KEY", storage, BranchStorage = function(a) {
  for (var b = 0; b < a.length; b++) {
    var c = this[a[b]];
    c = "function" === typeof c ? c() : c;
    if (c.isEnabled()) {
      return c._store = {}, c;
    }
  }
}, prefix = function(a) {
  return "branch_session" === a || "branch_session_first" === a ? a : BRANCH_KEY_PREFIX + a;
}, trimPrefix = function(a) {
  return a.replace(BRANCH_KEY_PREFIX, "");
}, retrieveValue = function(a) {
  return "true" === a ? !0 : "false" === a ? !1 : a;
}, hasBranchPrefix = function(a) {
  return 0 === a.indexOf(BRANCH_KEY_PREFIX);
}, isBranchCookie = function(a) {
  return "branch_session" === a || "branch_session_first" === a || hasBranchPrefix(a);
}, processCookie = function(a) {
  a = a.trim();
  var b = a.indexOf("=");
  return {name:a.substring(0, b), value:retrieveValue(a.substring(b + 1, a.length))};
}, webStorage = function(a) {
  try {
    var b = a && localStorage ? localStorage : sessionStorage;
  } catch (c) {
    return {isEnabled:function() {
      return !1;
    }};
  }
  return {getAll:function() {
    if ("undefined" === typeof b) {
      return null;
    }
    var c = null, d;
    for (d in b) {
      0 === d.indexOf(BRANCH_KEY_PREFIX) && (null === c && (c = {}), c[trimPrefix(d)] = retrieveValue(b.getItem(d)));
    }
    return utils.decodeBFPs(c);
  }, get:function(c, d) {
    return "randomized_device_token" === c ? d && localStorage ? utils.base64Decode(localStorage.getItem(prefix(c))) : utils.base64Decode(b.getItem(prefix(c))) : retrieveValue(d && localStorage ? localStorage.getItem(prefix(c)) : b.getItem(prefix(c)));
  }, set:function(c, d, e) {
    e && localStorage ? localStorage.setItem(prefix(c), d) : b.setItem(prefix(c), d);
  }, remove:function(c, d) {
    d && localStorage ? localStorage.removeItem(prefix(c)) : b.removeItem(prefix(c));
  }, clear:function() {
    Object.keys(b).forEach(function(c) {
      0 === c.indexOf(BRANCH_KEY_PREFIX) && b.removeItem(c);
    });
  }, isEnabled:function() {
    try {
      return b.setItem("test", ""), b.removeItem("test"), !0;
    } catch (c) {
      return !1;
    }
  }};
};
BranchStorage.prototype.local = function() {
  return webStorage(!0);
};
BranchStorage.prototype.session = function() {
  return webStorage(!1);
};
var cookies = function() {
  var a = function(b, c) {
    c && (b = prefix(b));
    document.cookie = b + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
  };
  return {getAll:function() {
    for (var b = {}, c = document.cookie.split(";"), d = 0; d < c.length; d++) {
      var e = processCookie(c[d]);
      e && e.hasOwnProperty("name") && e.hasOwnProperty("value") && isBranchCookie(e.name) && (b[trimPrefix(e.name)] = e.value);
    }
    return b;
  }, get:function(b) {
    b = prefix(b);
    for (var c = document.cookie.split(";"), d = 0; d < c.length; d++) {
      var e = processCookie(c[d]);
      if (e && e.hasOwnProperty("name") && e.hasOwnProperty("value") && e.name === b) {
        return e.value;
      }
    }
    return null;
  }, set:function(b, c) {
    b = prefix(b);
    document.cookie = b + "=" + c + "; path=/";
  }, remove:function(b) {
    a(b, !0);
  }, clear:function() {
    for (var b = document.cookie.split(";"), c = 0; c < b.length; c++) {
      var d = processCookie(b[c]);
      d && d.hasOwnProperty("name") && isBranchCookie(d.name) && a(d.name, !1);
    }
  }, isEnabled:function() {
    return navigator.cookieEnabled;
  }};
};
BranchStorage.prototype.cookie = function() {
  return cookies();
};
BranchStorage.prototype.pojo = {getAll:function() {
  return this._store;
}, get:function(a) {
  return this._store[a] || null;
}, set:function(a, b) {
  this._store[a] = b;
}, remove:function(a) {
  delete this._store[a];
}, clear:function() {
  this._store = {};
}, isEnabled:function() {
  return !0;
}};
// Input 7
var Server = function() {
};
Server.prototype._jsonp_callback_index = 0;
Server.prototype.serializeObject = function(a, b) {
  if ("undefined" === typeof a) {
    return "";
  }
  var c = [];
  if (a instanceof Array) {
    for (var d = 0; d < a.length; d++) {
      c.push(encodeURIComponent(b) + "=" + encodeURIComponent(a[d]));
    }
    return c.join("&");
  }
  for (d in a) {
    a.hasOwnProperty(d) && (a[d] instanceof Array || "object" === typeof a[d] ? c.push(this.serializeObject(a[d], b ? b + "." + d : d)) : c.push(encodeURIComponent(b ? b + "." + d : d) + "=" + encodeURIComponent(a[d])));
  }
  return c.join("&");
};
Server.prototype.getUrl = function(a, b) {
  var c, d, e = a.destination + a.endpoint, f = /^[0-9]{15,20}$/, g = /key_(live|test)_[A-Za-z0-9]{32}/, l = function(h, n) {
    "undefined" === typeof n && (n = {});
    if (h.branch_key && g.test(h.branch_key)) {
      return n.branch_key = h.branch_key, n;
    }
    if (h.app_id && f.test(h.app_id)) {
      return n.app_id = h.app_id, n;
    }
    if (h.instrumentation) {
      n.instrumentation = h.instrumentation;
    } else {
      throw Error(utils.message(utils.messages.missingParam, [a.endpoint, "branch_key or app_id"]));
    }
  };
  if ("/v1/has-app" === a.endpoint) {
    try {
      a.queryPart = l(b, a.queryPart);
    } catch (h) {
      return {error:h.message};
    }
  }
  if ("undefined" !== typeof a.queryPart) {
    for (c in a.queryPart) {
      if (a.queryPart.hasOwnProperty(c)) {
        if (d = "function" === typeof a.queryPart[c] ? a.queryPart[c](a.endpoint, c, b[c]) : d) {
          return {error:d};
        }
        e += "/" + b[c];
      }
    }
  }
  var m = {};
  if ("undefined" !== typeof a.params) {
    for (c in a.params) {
      if (a.params.hasOwnProperty(c)) {
        if (d = a.params[c](a.endpoint, c, b[c])) {
          return {error:d};
        }
        d = b[c];
        "undefined" !== typeof d && "" !== d && null !== d && (m[c] = d);
      }
    }
  }
  if ("POST" === a.method) {
    try {
      b = l(b, m);
    } catch (h) {
      return {error:h.message};
    }
  }
  "/v1/open" === a.endpoint && (m.options = safejson.stringify(m.options || {}), m.advertising_ids && (m.advertising_ids = safejson.stringify(utils.convertObjectValuesToString(m.advertising_ids || {}))));
  return {data:this.serializeObject(m, ""), url:e.replace(/^\//, "")};
};
Server.prototype.createScript = function(a, b, c) {
  var d = document.createElement("script");
  d.type = "text/javascript";
  d.async = !0;
  d.src = a;
  utils.addNonceAttribute(d);
  a = document.getElementsByTagName("head");
  !a || 1 > a.length ? "function" === typeof b && b() : (a[0].appendChild(d), "function" === typeof b && utils.addEvent(d, "error", b), "function" === typeof c && utils.addEvent(d, "load", c));
};
Server.prototype.jsonpRequest = function(a, b, c, d) {
  var e = Date.now(), f = utils.currentRequestBrttTag;
  0 === this._jsonp_callback_index && utils.isSafari11OrGreater() && this._jsonp_callback_index++;
  var g = "branch_callback__" + this._jsonp_callback_index++, l = 0 <= a.indexOf("branch.io") ? "&data=" : "&post_data=";
  b = "POST" === c ? encodeURIComponent(utils.base64encode(goog.json.serialize(b))) : "";
  var m = window.setTimeout(function() {
    window[g] = function() {
    };
    utils.addPropertyIfNotNull(utils.instrumentation, f, utils.calculateBrtt(e));
    d(Error(utils.messages.timeout), null, 504);
  }, utils.timeout);
  window[g] = function(h) {
    window.clearTimeout(m);
    d(null, h);
  };
  this.createScript(a + (0 > a.indexOf("?") ? "?" : "") + (b ? l + b : "") + (0 <= a.indexOf("/c/") ? "&click=1" : "") + "&callback=" + g, function() {
    d(Error(utils.messages.blockedByClient), null);
  }, function() {
    utils.addPropertyIfNotNull(utils.instrumentation, f, utils.calculateBrtt(e));
    try {
      "function" === typeof this.remove ? this.remove() : this.parentNode.removeChild(this);
    } catch (h) {
    }
    delete window[g];
  });
};
Server.prototype.XHRRequest = function(a, b, c, d, e, f, g) {
  var l = Date.now(), m = utils.currentRequestBrttTag, h = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  g && (h.responseType = g);
  h.ontimeout = function() {
    utils.addPropertyIfNotNull(utils.instrumentation, m, utils.calculateBrtt(l));
    e(Error(utils.messages.timeout), null, 504);
  };
  h.onerror = function(n) {
    e(Error(n.error || "Error in API: " + h.status), null, h.status);
  };
  h.onreadystatechange = function() {
    if (4 === h.readyState) {
      if (utils.addPropertyIfNotNull(utils.instrumentation, m, utils.calculateBrtt(l)), 200 === h.status) {
        if ("arraybuffer" === h.responseType) {
          var n = h.response;
        } else if (f) {
          n = h.responseText;
        } else {
          try {
            n = safejson.parse(h.responseText);
          } catch (q) {
            n = {};
          }
        }
        e(null, n, h.status);
      } else if ("4" === h.status.toString().substring(0, 1) || "5" === h.status.toString().substring(0, 1)) {
        h.responseURL && h.responseURL.includes("v2/event") ? e(h.responseText, null, h.status) : e(Error("Error in API: " + h.status), null, h.status);
      }
    }
  };
  try {
    h.open(c, a, !0), h.timeout = utils.timeout, h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), h.send(b);
  } catch (n) {
    d.set("use_jsonp", !0), this.jsonpRequest(a, b, c, e);
  }
};
Server.prototype.request = function(a, b, c, d) {
  var e = this;
  utils.currentRequestBrttTag = a.endpoint + "-brtt";
  ("/v1/url" === a.endpoint || "/v1/has-app" === a.endpoint) && 1 < Object.keys(utils.instrumentation).length && (delete utils.instrumentation["-brtt"], b.instrumentation = safejson.stringify(utils.merge({}, utils.instrumentation)), utils.instrumentation = {});
  if (utils.userPreferences.trackingDisabled) {
    for (var f = ["randomized_device_token", "randomized_bundle_token", "session_id", "identity"], g = 0; g < f.length; g++) {
      b.hasOwnProperty(f[g]) && delete b[f[g]];
    }
  }
  f = this.getUrl(a, b);
  if (f.error) {
    return d(Error(safejson.stringify({message:f.error, endpoint:a.endpoint, data:b})));
  }
  var l = "";
  if ("GET" === a.method) {
    var m = f.url + "?" + f.data;
  } else {
    m = f.url, l = f.data;
  }
  var h = c.get("use_jsonp") || a.jsonp ? b : l;
  var n = utils.retries, q = function(r, u, v) {
    if ("function" === typeof e.onAPIResponse) {
      e.onAPIResponse(m, a.method, h, r, v, u);
    }
    r && 0 < n && "5" === (v || "").toString().substring(0, 1) ? (n--, window.setTimeout(function() {
      t();
    }, utils.retry_delay)) : d(r, u);
  };
  if (utils.userPreferences.trackingDisabled && utils.userPreferences.shouldBlockRequest(m, b)) {
    return utils.userPreferences.allowErrorsInCallback ? q(Error(utils.messages.trackingDisabled), null, 300) : q(null, {}, 200);
  }
  var p = !1;
  if ("/v1/qr-code" === a.endpoint) {
    p = !0;
    var k = "arraybuffer";
  }
  var t = function() {
    c.get("use_jsonp") || a.jsonp ? e.jsonpRequest(m, b, a.method, q) : e.XHRRequest(m, l, a.method, c, q, p, k);
  };
  t();
};
// Input 8
var task_queue = function() {
  var a = [], b = function() {
    if (a.length) {
      a[0](function() {
        a.shift();
        b();
      });
    }
  };
  return function(c) {
    a.push(c);
    1 === a.length && b();
  };
};
// Input 9
var session = {get:function(a, b) {
  try {
    var c = safejson.parse(a.get(b ? "branch_session_first" : "branch_session", b)) || null;
    return utils.decodeBFPs(c);
  } catch (d) {
    return null;
  }
}, set:function(a, b, c) {
  b = utils.encodeBFPs(b);
  a.set("branch_session", goog.json.serialize(b));
  c && a.set("branch_session_first", goog.json.serialize(b), !0);
}, update:function(a, b) {
  if (b) {
    var c = session.get(a) || {};
    b = goog.json.serialize(utils.encodeBFPs(utils.merge(c, b)));
    a.set("branch_session", b);
  }
}, patch:function(a, b, c, d) {
  var e = function(g, l) {
    return utils.encodeBFPs(utils.merge(safejson.parse(g), l, d));
  }, f = a.get("branch_session", !1) || {};
  a.set("branch_session", goog.json.serialize(e(f, b)));
  c && (c = a.get("branch_session_first", !0) || {}, a.set("branch_session_first", goog.json.serialize(e(c, b)), !0));
}};
// Input 10
var default_branch, callback_params = {NO_CALLBACK:0, CALLBACK_ERR:1, CALLBACK_ERR_DATA:2}, init_states = {NO_INIT:0, INIT_PENDING:1, INIT_FAILED:2, INIT_SUCCEEDED:3}, init_state_fail_codes = {NO_FAILURE:0, UNKNOWN_CAUSE:1, OPEN_FAILED:2, BFP_NOT_FOUND:3, HAS_APP_FAILED:4}, wrap = function(a, b, c) {
  return function() {
    var d = this, e = arguments[arguments.length - 1];
    if (a === callback_params.NO_CALLBACK || "function" !== typeof e) {
      var f = function(l) {
      };
      var g = Array.prototype.slice.call(arguments);
    } else {
      g = Array.prototype.slice.call(arguments, 0, arguments.length - 1) || [], f = e;
    }
    d._queue(function(l) {
      var m = function(h, n) {
        try {
          if (h && a === callback_params.NO_CALLBACK) {
            throw h;
          }
          a === callback_params.CALLBACK_ERR ? f(h) : a === callback_params.CALLBACK_ERR_DATA && f(h, n);
        } finally {
          l();
        }
      };
      if (!c) {
        if (d.init_state === init_states.INIT_PENDING) {
          return m(Error(utils.message(utils.messages.initPending)), null);
        }
        if (d.init_state === init_states.INIT_FAILED) {
          return m(Error(utils.message(utils.messages.initFailed, d.init_state_fail_code, d.init_state_fail_details)), null);
        }
        if (d.init_state === init_states.NO_INIT || !d.init_state) {
          return m(Error(utils.message(utils.messages.nonInit)), null);
        }
      }
      g.unshift(m);
      b.apply(d, g);
    });
  };
}, Branch = function() {
  if (!(this instanceof Branch)) {
    return default_branch ||= new Branch(), default_branch;
  }
  this._queue = task_queue();
  this._storage = new BranchStorage(["session", "cookie", "pojo"]);
  this._server = new Server();
  var a = config.sdk, b = config.version;
  this._listeners = [];
  this.sdk = a;
  this.sdk_version = b;
  this.init_state = init_states.NO_INIT;
  this.init_state_fail_code = init_state_fail_codes.NO_FAILURE;
  this.init_state_fail_details = null;
};
Branch.prototype._api = function(a, b, c) {
  this.app_id && (b.app_id = this.app_id);
  this.branch_key && (b.branch_key = this.branch_key);
  (a.params && a.params.session_id || a.queryPart && a.queryPart.session_id) && this.session_id && (b.session_id = this.session_id);
  (a.params && a.params.randomized_bundle_token || a.queryPart && a.queryPart.randomized_bundle_token) && this.randomized_bundle_token && (b.randomized_bundle_token = this.randomized_bundle_token);
  0 > a.endpoint.indexOf("/v1/") ? (a.params && a.params.developer_identity || a.queryPart && a.queryPart.developer_identity) && this.identity && (b.developer_identity = this.identity) : (a.params && a.params.identity || a.queryPart && a.queryPart.identity) && this.identity && (b.identity = this.identity);
  (a.params && a.params.link_click_id || a.queryPart && a.queryPart.link_click_id) && this.link_click_id && (b.link_click_id = this.link_click_id);
  (a.params && a.params.sdk || a.queryPart && a.queryPart.sdk) && this.sdk && (b.sdk = this.sdk, b.sdk_version = this.sdk_version);
  (a.params && a.params.randomized_device_token || a.queryPart && a.queryPart.randomized_device_token) && this.randomized_device_token && (b.randomized_device_token = this.randomized_device_token);
  utils.userPreferences.trackingDisabled && (b.tracking_disabled = utils.userPreferences.trackingDisabled);
  return this._server.request(a, b, this._storage, function(d, e) {
    c(d, e);
  });
};
Branch.prototype._referringLink = function() {
  var a = session.get(this._storage);
  return (a = a && a.referring_link) ? a : (a = this._storage.get("click_id")) ? config.link_service_endpoint + "/c/" + a : null;
};
Branch.prototype.init = wrap(callback_params.CALLBACK_ERR_DATA, function(a, b, c) {
  utils.navigationTimingAPIEnabled && (utils.instrumentation["init-began-at"] = utils.timeSinceNavigationStart());
  var d = this;
  d.init_state = init_states.INIT_PENDING;
  utils.isKey(b) ? d.branch_key = b : d.app_id = b;
  c = c && utils.validateParameterType(c, "object") ? c : {};
  d.init_options = c;
  utils.retries = c && c.retries && Number.isInteger(c.retries) ? c.retries : utils.retries;
  utils.retry_delay = c && c.retry_delay && Number.isInteger(c.retry_delay) ? c.retry_delay : utils.retry_delay;
  utils.timeout = c && c.timeout && Number.isInteger(c.timeout) ? c.timeout : utils.timeout;
  utils.nonce = c && c.nonce ? c.nonce : utils.nonce;
  utils.debug = c && c.enableLogging ? c.enableLogging : utils.debug;
  utils.userPreferences.trackingDisabled = c && c.tracking_disabled && !0 === c.tracking_disabled ? !0 : !1;
  utils.userPreferences.allowErrorsInCallback = !1;
  utils.userPreferences.trackingDisabled && utils.cleanApplicationAndSessionStorage(d);
  d.advertising_ids = c && c.advertising_ids && utils.validateParameterType(c.advertising_ids, "object") && utils.validateAdvertiserIDs(c.advertising_ids) ? c.advertising_ids : null;
  b = session.get(d._storage, !0);
  d.randomized_bundle_token = b && b.randomized_bundle_token;
  b = session.get(d._storage);
  var e = (c && "undefined" !== typeof c.branch_match_id && null !== c.branch_match_id ? c.branch_match_id : null) || utils.getParamValue("_branch_match_id") || utils.hashValue("r"), f = !d.randomized_bundle_token;
  d._branchViewEnabled = !!d._storage.get("branch_view_enabled");
  var g = function(p) {
    var k = {sdk:config.version, branch_key:d.branch_key}, t = session.get(d._storage) || {}, r = session.get(d._storage, !0) || {};
    r.randomized_device_token && (k._t = r.randomized_device_token);
    d._api(resources._r, k, function(u, v) {
      u && (d.init_state_fail_code = init_state_fail_codes.BFP_NOT_FOUND, d.init_state_fail_details = u.message);
      v && (t.randomized_device_token = v, p && p(null, t));
    });
  }, l = function(p, k) {
    p = parseInt(utils.getParamValue("[?&]_open_delay_ms"), 10);
    utils.delay(function() {
      d._api(resources.open, {link_identifier:e, randomized_device_token:k.randomized_device_token, options:c, advertising_ids:d.advertising_ids, initial_referrer:utils.getInitialReferrer(d._referringLink()), current_url:utils.getCurrentUrl(), screen_height:utils.getScreenHeight(), screen_width:utils.getScreenWidth()}, function(t, r) {
        t && (d.init_state_fail_code = init_state_fail_codes.OPEN_FAILED, d.init_state_fail_details = t.message);
        t || "object" !== typeof r || e && (r.click_id = e);
        m(t, r);
      });
    }, p);
  }, m = function(p, k) {
    k && (k.link_click_id && (d.link_click_id = k.link_click_id.toString()), k.session_id && (d.session_id = k.session_id.toString()), k.randomized_bundle_token && (d.randomized_bundle_token = k.randomized_bundle_token.toString()), k.identity && (d.identity = k.identity.toString()), k.link && (d.sessionLink = k.link), k.referring_link && (k.referring_link = utils.processReferringLink(k.referring_link)), !k.click_id && k.referring_link && (k.click_id = utils.getClickIdAndSearchStringFromLink(k.referring_link)), 
    d.randomized_device_token = k.randomized_device_token, utils.userPreferences.trackingDisabled || (f && (k.identity = d.identity), session.set(d._storage, k, f)), d.init_state = init_states.INIT_SUCCEEDED, k.data_parsed = k.data && 0 !== k.data.length ? safejson.parse(k.data) : {});
    if (p) {
      return d.init_state = init_states.INIT_FAILED, d.init_state_fail_code || (d.init_state_fail_code = init_state_fail_codes.UNKNOWN_CAUSE, d.init_state_fail_details = p.message), a(p, k && utils.whiteListSessionData(k));
    }
    try {
      a(p, k && utils.whiteListSessionData(k));
    } catch (t) {
    } finally {
      d.renderFinalize();
    }
    p = utils.getAdditionalMetadata();
    (k = utils.validateParameterType(c.metadata, "object") ? c.metadata : null) && (k = utils.mergeHostedDeeplinkData(p.hosted_deeplink_data, k)) && 0 < Object.keys(k).length && (p.hosted_deeplink_data = k);
    utils.userPreferences.trackingDisabled && (utils.userPreferences.allowErrorsInCallback = !0);
  }, h = function() {
    if ("undefined" !== typeof document.hidden) {
      var p = "hidden";
      var k = "visibilitychange";
    } else {
      "undefined" !== typeof document.mozHidden ? (p = "mozHidden", k = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (p = "msHidden", k = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (p = "webkitHidden", k = "webkitvisibilitychange");
    }
    k && !d.changeEventListenerAdded && (d.changeEventListenerAdded = !0, document.addEventListener(k, function() {
      document[p] || g(l);
    }, !1));
  };
  if (b && b.session_id && !e && !utils.getParamValue("branchify_url")) {
    session.update(d._storage, {data:""}), session.update(d._storage, {referring_link:""}), h(), g(m);
  } else {
    b = {sdk:config.version, branch_key:d.branch_key};
    var n = session.get(d._storage, !0) || {};
    n.randomized_device_token && (b._t = n.randomized_device_token);
    n.identity && (d.identity = n.identity);
    var q = parseInt(utils.getParamValue("[?&]_open_delay_ms"), 10);
    d._api(resources._r, b, function(p, k) {
      if (p) {
        return d.init_state_fail_code = init_state_fail_codes.BFP_NOT_FOUND, d.init_state_fail_details = p.message, m(p, null);
      }
      utils.delay(function() {
        d._api(resources.open, {link_identifier:e, randomized_device_token:k, options:c, advertising_ids:d.advertising_ids, initial_referrer:utils.getInitialReferrer(d._referringLink()), current_url:utils.getCurrentUrl(), screen_height:utils.getScreenHeight(), screen_width:utils.getScreenWidth()}, function(t, r) {
          t && (d.init_state_fail_code = init_state_fail_codes.OPEN_FAILED, d.init_state_fail_details = t.message);
          t || "object" !== typeof r || (r.branch_view_enabled && (d._branchViewEnabled = !!r.branch_view_enabled, d._storage.set("branch_view_enabled", d._branchViewEnabled)), e && (r.click_id = e));
          h();
          m(t, r);
        });
      }, q);
    });
  }
}, !0);
Branch.prototype.renderQueue = wrap(callback_params.NO_CALLBACK, function(a, b) {
  this._renderFinalized ? b() : (this._renderQueue = this._renderQueue || [], this._renderQueue.push(b));
  a(null, null);
});
Branch.prototype.renderFinalize = wrap(callback_params.CALLBACK_ERR_DATA, function(a) {
  this._renderQueue && 0 < this._renderQueue.length && (this._renderQueue.forEach(function(b) {
    b.call(this);
  }), delete this._renderQueue);
  this._renderFinalized = !0;
  a(null, null);
});
Branch.prototype.data = wrap(callback_params.CALLBACK_ERR_DATA, function(a) {
  var b = utils.whiteListSessionData(session.get(this._storage));
  b.referring_link = this._referringLink();
  b.data_parsed = b.data && 0 !== b.data.length ? safejson.parse(b.data) : {};
  a(null, b);
});
Branch.prototype.first = wrap(callback_params.CALLBACK_ERR_DATA, function(a) {
  a(null, utils.whiteListSessionData(session.get(this._storage, !0)));
});
Branch.prototype.setIdentity = wrap(callback_params.CALLBACK_ERR_DATA, function(a, b) {
  var c = this;
  this._api(resources.profile, {identity:b}, function(d, e) {
    d && a(d);
    e = e || {};
    c.randomized_bundle_token = e.randomized_bundle_token ? e.randomized_bundle_token.toString() : null;
    c.sessionLink = e.link;
    c.identity = b;
    e.developer_identity = b;
    e.referring_data_parsed = e.referring_data ? safejson.parse(e.referring_data) : null;
    session.patch(c._storage, {identity:b, randomized_bundle_token:c.randomized_bundle_token}, !0);
    a(null, e);
  });
});
Branch.prototype.logout = wrap(callback_params.CALLBACK_ERR, function(a) {
  var b = this;
  this._api(resources.logout, {}, function(c, d) {
    c && a(c);
    d = d || {};
    d = {data_parsed:null, data:null, referring_link:null, click_id:null, link_click_id:null, identity:null, session_id:d.session_id, randomized_bundle_token:d.randomized_bundle_token, link:d.link, device_fingerprint_id:b.device_fingerprint_id || null};
    b.sessionLink = d.link;
    b.session_id = d.session_id;
    b.randomized_bundle_token = d.randomized_bundle_token;
    b.identity = null;
    session.patch(b._storage, d, !0, !0);
    a(null);
  });
});
Branch.prototype.getBrowserFingerprintId = wrap(callback_params.CALLBACK_ERR_DATA, function(a) {
  var b = session.get(this._storage, !0) || {};
  a(null, b.randomized_device_token || null);
});
Branch.prototype.crossPlatformIds = wrap(callback_params.CALLBACK_ERR_DATA, function(a) {
  this._api(resources.crossPlatformIds, {user_data:safejson.stringify(utils.getUserData(this))}, function(b, c) {
    return a(b || null, c && c.user_data || null);
  });
});
Branch.prototype.lastAttributedTouchData = wrap(callback_params.CALLBACK_ERR_DATA, function(a, b) {
  b = utils.validateParameterType(b, "number") ? b : null;
  var c = utils.getUserData(this);
  utils.addPropertyIfNotNull(c, "attribution_window", b);
  this._api(resources.lastAttributedTouchData, {user_data:safejson.stringify(c)}, function(d, e) {
    return a(d || null, e || null);
  });
});
Branch.prototype.logEvent = wrap(callback_params.CALLBACK_ERR, function(a, b, c, d, e) {
  b = utils.validateParameterType(b, "string") ? b : null;
  c = utils.validateParameterType(c, "object") ? c : null;
  e = utils.validateParameterType(e, "string") ? e : null;
  c = utils.separateEventAndCustomData(c);
  utils.isStandardEvent(b) ? (d = utils.validateParameterType(d, "array") ? d : null, this._api(resources.logStandardEvent, {name:b, user_data:safejson.stringify(utils.getUserData(this)), custom_data:safejson.stringify(c && c.custom_data || {}), event_data:safejson.stringify(c && c.event_data || {}), content_items:safejson.stringify(d || []), customer_event_alias:e}, function(f, g) {
    return a(f || null);
  })) : this._api(resources.logCustomEvent, {name:b, user_data:safejson.stringify(utils.getUserData(this)), custom_data:safejson.stringify(c && c.custom_data || {}), event_data:safejson.stringify(c && c.event_data || {}), content_items:safejson.stringify(d || []), customer_event_alias:e}, function(f, g) {
    return a(f || null);
  });
});
Branch.prototype.link = wrap(callback_params.CALLBACK_ERR_DATA, function(a, b) {
  var c = utils.cleanLinkData(b), d = this.branch_key;
  this._api(resources.link, c, function(e, f) {
    if (e) {
      return a(e, utils.generateDynamicBNCLink(d, c));
    }
    a(null, f && f.url);
  });
});
Branch.prototype.qrCode = wrap(callback_params.CALLBACK_ERR_DATA, function(a, b, c, d) {
  utils.cleanLinkData(b).qr_code_settings = safejson.stringify(utils.convertObjectValuesToString(c || {}));
  this._api(resources.qrCode, utils.cleanLinkData(b), function(e, f) {
    function g() {
    }
    e || (g.rawBuffer = f, g.base64 = function() {
      if (this.rawBuffer) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(this.rawBuffer)));
      }
      throw Error("QrCode.rawBuffer is empty.");
    });
    return a(e || null, g || null);
  });
});
Branch.prototype._windowRedirect = function(a) {
  window.top.location = a;
};
function _setBranchViewData(a, b, c) {
  c = c || {};
  try {
    a._branchViewData = safejson.parse(safejson.stringify(c));
  } finally {
    a._branchViewData = a._branchViewData || {};
  }
  b();
}
Branch.prototype.setBranchViewData = wrap(callback_params.CALLBACK_ERR, function(a, b) {
  _setBranchViewData.call(null, this, a, b);
}, !0);
Branch.prototype.disableTracking = wrap(callback_params.CALLBACK_ERR, function(a, b) {
  if (!1 === b || "false" === b) {
    utils.userPreferences.trackingDisabled = !1, utils.userPreferences.allowErrorsInCallback = !1, this.branch_key && this.init_options && (!0 === this.init_options.tracking_disabled && delete this.init_options.tracking_disabled, this.init(this.branch_key, this.init_options));
  } else if (void 0 === b || !0 === b || "true" === b) {
    utils.cleanApplicationAndSessionStorage(this), utils.userPreferences.trackingDisabled = !0, utils.userPreferences.allowErrorsInCallback = !0;
  }
  a();
}, !0);
Branch.prototype.setAPIResponseCallback = wrap(callback_params.NO_CALLBACK, function(a, b) {
  this._server.onAPIResponse = b;
  a();
}, !0);
// Input 11
var branch_instance = new Branch();
if (window.branch && window.branch._q) {
  for (var queue = window.branch._q, i = 0; i < queue.length; i++) {
    var task = queue[i];
    branch_instance[task[0]].apply(branch_instance, task[1]);
  }
}
"function" === typeof define && define.amd ? define("branch", function() {
  return branch_instance;
}) : "object" === typeof exports && (module.exports = branch_instance);
window && (window.branch = branch_instance);
})();
