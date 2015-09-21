(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["adswipe"] = factory();
	else
		root["adswipe"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint esnext: true */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.endpoint = endpoint;
	exports.debug = debug;
	exports.version = version;
	exports.apiVersion = apiVersion;
	exports.show = show;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utilConfigJs = __webpack_require__(1);

	var _utilConfigJs2 = _interopRequireDefault(_utilConfigJs);

	var _utilUtilJs = __webpack_require__(2);

	var _utilUtilJs2 = _interopRequireDefault(_utilUtilJs);

	var _utilHammerAsJs = __webpack_require__(4);

	var _utilHammerAsJs2 = _interopRequireDefault(_utilHammerAsJs);

	var _utilAjaxJs = __webpack_require__(7);

	var _utilAjaxJs2 = _interopRequireDefault(_utilAjaxJs);

	var config = new _utilConfigJs2['default']();
	var util = new _utilUtilJs2['default'](config);
	var hammer = new _utilHammerAsJs2['default'](config);

	util.checkFingerprint(); // generate unique fingerprint for user

	/**
	 * Allow API endpoint url to be returned or updated
	 * @return  string or bool  if get (empty arg), return endpoint string; if set, update and return true
	 */

	function endpoint(newEndpoint) {
	    if (util.empty(newEndpoint)) {
	        return config.endpoint;
	    } else {
	        config.endpoint = newEndpoint; // ie 'http://adswipejs.dev.192.168.1.117.xip.io/';
	        return true;
	    }
	}

	/**
	 * Allow debug mode to be toggled
	 * @return  bool        if get (empty arg), return debug bool; if set, update and return true
	 */

	function debug(newDebug) {
	    if (util.empty(newDebug)) {
	        return config.debug;
	    } else {
	        config.debug = newDebug;
	        return true;
	    }
	}

	/**
	 * Return version number
	 * @return string       version number
	 */

	function version() {
	    return config.version;
	}

	/**
	 * Return API version number (promise)
	 * @return string       api version number
	 */

	function apiVersion() {
	    // basically wrap api.get() promise in a promise
	    return new Promise(function (resolve, reject) {
	        var api = new _utilAjaxJs2['default']();
	        api.url = config.endpoint + 'version';
	        api.get().then(function (response) {
	            resolve(response);
	        }, function (error) {
	            reject(error);
	        });
	    });
	}

	/**
	 * Set up and display new ad
	 * @param  {int} campaignID     campaign ID hash
	 */

	function show(campaignID) {
	    if (util.empty(campaignID)) {
	        if (config.debug) console.log('Error: no campaign ID found');
	        return false;
	    }
	    return hammer.show(campaignID);
	}

	/**
	 * Reset ad when orientation changed
	 */
	window.onorientationchange = function () {
	    //var orientation = window.orientation;
	    hammer.reset();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*jshint esnext: true */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Config = (function () {
	    function Config() {
	        _classCallCheck(this, Config);

	        this._version = '0.1.4';
	        this._endpoint = 'http://adswipe.com/';
	        this._debug = false;
	        this._fingerprint = null;
	        this._classElement = '_adswipe_' + (Math.random() * 1e32).toString(36);
	        this._tapScale = '.95';
	        this._zIndex = null;
	        this._asid = null;
	        this._clickURL = null;
	        this._adID = null;
	        this._campaignID = null;
	        this._isShown = false;
	    }

	    _createClass(Config, [{
	        key: 'version',
	        get: function get() {
	            return this._version;
	        }
	    }, {
	        key: 'endpoint',
	        get: function get() {
	            return this._endpoint;
	        },
	        set: function set(url) {
	            this._endpoint = url.slice(-1) !== '/' ? url + '/' : url;return this._endpoint;
	        }
	    }, {
	        key: 'debug',
	        get: function get() {
	            return this._debug;
	        },
	        set: function set(debug) {
	            this._debug = debug;
	        }
	    }, {
	        key: 'classElement',
	        get: function get() {
	            return this._classElement;
	        }
	    }, {
	        key: 'tapScale',
	        get: function get() {
	            return this._tapScale;
	        }
	    }, {
	        key: 'zIndex',
	        get: function get() {
	            return this._zIndex;
	        },
	        set: function set(zIndex) {
	            this._zIndex = zIndex;
	        }
	    }, {
	        key: 'asid',
	        get: function get() {
	            return this._asid;
	        },
	        set: function set(asid) {
	            this._asid = asid;
	        }
	    }, {
	        key: 'clickURL',
	        get: function get() {
	            return this._clickURL;
	        },
	        set: function set(clickURL) {
	            this._clickURL = clickURL;
	        }
	    }, {
	        key: 'adID',
	        get: function get() {
	            return this._adID;
	        },
	        set: function set(adID) {
	            this._adID = adID;
	        }
	    }, {
	        key: 'campaignID',
	        get: function get() {
	            return this._campaignID;
	        },
	        set: function set(campaignID) {
	            this._campaignID = campaignID;
	        }
	    }, {
	        key: 'isShown',
	        get: function get() {
	            return this._isShown;
	        },
	        set: function set(isShown) {
	            this._isShown = isShown;
	        }
	    }]);

	    return Config;
	})();

	exports['default'] = Config;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint esnext: true */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _fingerprint2 = __webpack_require__(3);

	var _fingerprint22 = _interopRequireDefault(_fingerprint2);

	var Util = (function () {
	    function Util(config) {
	        _classCallCheck(this, Util);

	        this.config = config;
	    }

	    _createClass(Util, [{
	        key: 'empty',

	        /**
	         * Shortcut to check if variable is empty or not
	         * @param  string       variable to check
	         * @return bool         true if empty, false if not
	         */
	        value: function empty(arg) {
	            if (typeof arg === 'undefined' || arg === null) return true;else return false;
	        }
	    }, {
	        key: 'checkFingerprint',

	        /**
	         * Generate and store (in config/LocalStorage) unique user fingerprint to track user's swipes/clicks
	         * @return n/a
	         */
	        value: function checkFingerprint() {
	            var $ = this;
	            if (!$.config.fingerprint) {
	                // if not in local storage, generate fingerprint - else, get from localstorage
	                if (!localStorage.as_fingerprint) {
	                    new _fingerprint22['default']().get(function (result) {
	                        $.config.fingerprint = result;
	                        localStorage.as_fingerprint = result;
	                    });
	                } else {
	                    $.config.fingerprint = localStorage.as_fingerprint;
	                }
	            }
	        }
	    }, {
	        key: 'findNextZIndex',

	        /**
	         * Go through all the elements on the page and find the next highest z-index so adswipe appears on top
	         * @return {int}    z-index number to set adswipe to
	         */
	        value: function findNextZIndex() {
	            var $ = this;

	            // if no zIndex set in config yet
	            // aka, we only want to run all this on ad load so we don't eat up resources, so store in config and then add to that
	            // when adding new elements for ad layers (like info popup)
	            if (!$.config.zIndex) {
	                var all = document.getElementsByTagName('*');
	                var highest = 0;

	                for (var i = 0; i < all.length; i++) {
	                    var zi = document.defaultView.getComputedStyle(all[i], null).getPropertyValue('z-index');
	                    if (zi > highest && zi != 'auto') highest = zi;
	                }

	                // cast highest as integer, add one (for next zindex)
	                $.config.zIndex = Number(highest) + 1;
	            } else {
	                $.config.zIndex = $.config.zIndex + 1;
	            }

	            return $.config.zIndex;
	        }
	    }, {
	        key: 'whichTransitionEvent',

	        /**
	         * Figure out which transition event the browser is using
	         */
	        value: function whichTransitionEvent() {
	            var t;
	            var el = document.createElement('fakeelement');
	            var transitions = {
	                'transition': 'transitionend',
	                'OTransition': 'oTransitionEnd',
	                'MozTransition': 'transitionend',
	                'WebkitTransition': 'webkitTransitionEnd'
	            };

	            for (t in transitions) {
	                if (el.style[t] !== undefined) {
	                    return transitions[t];
	                }
	            }
	        }
	    }]);

	    return Util;
	})();

	exports['default'] = Util;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	* Fingerprintjs2 0.5.1 - Modern & flexible browser fingerprint library v2
	* https://github.com/Valve/fingerprintjs2
	* Copyright (c) 2015 Valentin Vasilyev (valentin.vasilyev@outlook.com)
	* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	* ARE DISCLAIMED. IN NO EVENT SHALL VALENTIN VASILYEV BE LIABLE FOR ANY
	* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	"use strict";

	(function (name, context, definition) {
	  "use strict";
	  if (typeof module !== "undefined" && module.exports) {
	    module.exports = definition();
	  } else if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    context[name] = definition();
	  }
	})("Fingerprint2", undefined, function () {
	  "use strict";
	  // This will only be polyfilled for IE8 and older
	  // Taken from Mozilla MDC
	  if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function (searchElement, fromIndex) {
	      var k;
	      if (this == null) {
	        throw new TypeError("'this' is null or undefined");
	      }
	      var O = Object(this);
	      var len = O.length >>> 0;
	      if (len === 0) {
	        return -1;
	      }
	      var n = +fromIndex || 0;
	      if (Math.abs(n) === Infinity) {
	        n = 0;
	      }
	      if (n >= len) {
	        return -1;
	      }
	      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
	      while (k < len) {
	        if (k in O && O[k] === searchElement) {
	          return k;
	        }
	        k++;
	      }
	      return -1;
	    };
	  }
	  var Fingerprint2 = function Fingerprint2(options) {
	    var defaultOptions = {
	      swfContainerId: "fingerprintjs2",
	      swfPath: "flash/compiled/FontList.swf",
	      sortPluginsFor: [/palemoon/i]
	    };
	    this.options = this.extend(options, defaultOptions);
	    this.nativeForEach = Array.prototype.forEach;
	    this.nativeMap = Array.prototype.map;
	  };
	  Fingerprint2.prototype = {
	    extend: function extend(source, target) {
	      if (source == null) {
	        return target;
	      }
	      for (var k in source) {
	        if (source[k] != null && target[k] !== source[k]) {
	          target[k] = source[k];
	        }
	      }
	      return target;
	    },
	    log: function log(msg) {
	      if (window.console) {
	        console.log(msg);
	      }
	    },
	    get: function get(done) {
	      var keys = [];
	      keys = this.userAgentKey(keys);
	      keys = this.languageKey(keys);
	      keys = this.colorDepthKey(keys);
	      keys = this.screenResolutionKey(keys);
	      keys = this.timezoneOffsetKey(keys);
	      keys = this.sessionStorageKey(keys);
	      keys = this.localStorageKey(keys);
	      keys = this.indexedDbKey(keys);
	      keys = this.addBehaviorKey(keys);
	      keys = this.openDatabaseKey(keys);
	      keys = this.cpuClassKey(keys);
	      keys = this.platformKey(keys);
	      keys = this.doNotTrackKey(keys);
	      keys = this.pluginsKey(keys);
	      keys = this.canvasKey(keys);
	      keys = this.webglKey(keys);
	      keys = this.adBlockKey(keys);
	      keys = this.hasLiedLanguagesKey(keys);
	      keys = this.hasLiedResolutionKey(keys);
	      keys = this.hasLiedOsKey(keys);
	      keys = this.hasLiedBrowserKey(keys);
	      keys = this.touchSupportKey(keys);
	      var that = this;
	      this.fontsKey(keys, function (newKeys) {
	        var murmur = that.x64hash128(newKeys.join("~~~"), 31);
	        return done(murmur);
	      });
	    },
	    userAgentKey: function userAgentKey(keys) {
	      if (!this.options.excludeUserAgent) {
	        keys.push(navigator.userAgent);
	      }
	      return keys;
	    },
	    languageKey: function languageKey(keys) {
	      if (!this.options.excludeLanguage) {
	        keys.push(navigator.language);
	      }
	      return keys;
	    },
	    colorDepthKey: function colorDepthKey(keys) {
	      if (!this.options.excludeColorDepth) {
	        keys.push(screen.colorDepth);
	      }
	      return keys;
	    },
	    screenResolutionKey: function screenResolutionKey(keys) {
	      if (!this.options.excludeScreenResolution) {
	        return this.getScreenResolution(keys);
	      }
	      return keys;
	    },
	    getScreenResolution: function getScreenResolution(keys) {
	      var resolution;
	      var available;
	      if (this.options.detectScreenOrientation) {
	        resolution = screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height];
	      } else {
	        resolution = [screen.height, screen.width];
	      }
	      if (typeof resolution !== "undefined") {
	        // headless browsers
	        keys.push(resolution);
	      }
	      if (screen.availWidth && screen.availHeight) {
	        if (this.options.detectScreenOrientation) {
	          available = screen.availHeight > screen.availWidth ? [screen.availHeight, screen.availWidth] : [screen.availWidth, screen.availHeight];
	        } else {
	          available = [screen.availHeight, screen.availWidth];
	        }
	      }
	      if (typeof available !== "undefined") {
	        // headless browsers
	        keys.push(available);
	      }
	      return keys;
	    },
	    timezoneOffsetKey: function timezoneOffsetKey(keys) {
	      if (!this.options.excludeTimezoneOffset) {
	        keys.push(new Date().getTimezoneOffset());
	      }
	      return keys;
	    },
	    sessionStorageKey: function sessionStorageKey(keys) {
	      if (!this.options.excludeSessionStorage && this.hasSessionStorage()) {
	        keys.push("sessionStorageKey");
	      }
	      return keys;
	    },
	    localStorageKey: function localStorageKey(keys) {
	      if (!this.options.excludeSessionStorage && this.hasLocalStorage()) {
	        keys.push("localStorageKey");
	      }
	      return keys;
	    },
	    indexedDbKey: function indexedDbKey(keys) {
	      if (!this.options.excludeIndexedDB && this.hasIndexedDB()) {
	        keys.push("indexedDbKey");
	      }
	      return keys;
	    },
	    addBehaviorKey: function addBehaviorKey(keys) {
	      //body might not be defined at this point or removed programmatically
	      if (document.body && !this.options.excludeAddBehavior && document.body.addBehavior) {
	        keys.push("addBehaviorKey");
	      }
	      return keys;
	    },
	    openDatabaseKey: function openDatabaseKey(keys) {
	      if (!this.options.excludeOpenDatabase && window.openDatabase) {
	        keys.push("openDatabase");
	      }
	      return keys;
	    },
	    cpuClassKey: function cpuClassKey(keys) {
	      if (!this.options.excludeCpuClass) {
	        keys.push(this.getNavigatorCpuClass());
	      }
	      return keys;
	    },
	    platformKey: function platformKey(keys) {
	      if (!this.options.excludePlatform) {
	        keys.push(this.getNavigatorPlatform());
	      }
	      return keys;
	    },
	    doNotTrackKey: function doNotTrackKey(keys) {
	      if (!this.options.excludeDoNotTrack) {
	        keys.push(this.getDoNotTrack());
	      }
	      return keys;
	    },
	    canvasKey: function canvasKey(keys) {
	      if (!this.options.excludeCanvas && this.isCanvasSupported()) {
	        keys.push(this.getCanvasFp());
	      }
	      return keys;
	    },
	    webglKey: function webglKey(keys) {
	      if (this.options.excludeWebGL) {
	        if (typeof NODEBUG === "undefined") {
	          this.log("Skipping WebGL fingerprinting per excludeWebGL configuration option");
	        }
	        return keys;
	      }
	      if (!this.isWebGlSupported()) {
	        if (typeof NODEBUG === "undefined") {
	          this.log("Skipping WebGL fingerprinting because it is not supported in this browser");
	        }
	        return keys;
	      }
	      keys.push(this.getWebglFp());
	      return keys;
	    },
	    adBlockKey: function adBlockKey(keys) {
	      if (!this.options.excludeAdBlock) {
	        keys.push(this.getAdBlock());
	      }
	      return keys;
	    },
	    hasLiedLanguagesKey: function hasLiedLanguagesKey(keys) {
	      if (!this.options.excludeHasLiedLanguages) {
	        keys.push(this.getHasLiedLanguages());
	      }
	      return keys;
	    },
	    hasLiedResolutionKey: function hasLiedResolutionKey(keys) {
	      if (!this.options.excludeHasLiedResolution) {
	        keys.push(this.getHasLiedResolution());
	      }
	      return keys;
	    },
	    hasLiedOsKey: function hasLiedOsKey(keys) {
	      if (!this.options.excludeHasLiedOs) {
	        keys.push(this.getHasLiedOs());
	      }
	      return keys;
	    },
	    hasLiedBrowserKey: function hasLiedBrowserKey(keys) {
	      if (!this.options.excludeHasLiedBrowser) {
	        keys.push(this.getHasLiedBrowser());
	      }
	      return keys;
	    },
	    fontsKey: function fontsKey(keys, done) {
	      if (this.options.excludeJsFonts) {
	        return this.flashFontsKey(keys, done);
	      }
	      return this.jsFontsKey(keys, done);
	    },
	    // flash fonts (will increase fingerprinting time 20X to ~ 130-150ms)
	    flashFontsKey: function flashFontsKey(keys, done) {
	      if (this.options.excludeFlashFonts) {
	        if (typeof NODEBUG === "undefined") {
	          this.log("Skipping flash fonts detection per excludeFlashFonts configuration option");
	        }
	        return done(keys);
	      }
	      // we do flash if swfobject is loaded
	      if (!this.hasSwfObjectLoaded()) {
	        if (typeof NODEBUG === "undefined") {
	          this.log("Swfobject is not detected, Flash fonts enumeration is skipped");
	        }
	        return done(keys);
	      }
	      if (!this.hasMinFlashInstalled()) {
	        if (typeof NODEBUG === "undefined") {
	          this.log("Flash is not installed, skipping Flash fonts enumeration");
	        }
	        return done(keys);
	      }
	      if (typeof this.options.swfPath === "undefined") {
	        if (typeof NODEBUG === "undefined") {
	          this.log("To use Flash fonts detection, you must pass a valid swfPath option, skipping Flash fonts enumeration");
	        }
	        return done(keys);
	      }
	      this.loadSwfAndDetectFonts(function (fonts) {
	        keys.push(fonts.join(";"));
	        done(keys);
	      });
	    },
	    // kudos to http://www.lalit.org/lab/javascript-css-font-detect/
	    jsFontsKey: function jsFontsKey(keys, done) {
	      // doing js fonts detection in a pseudo-async fashion
	      return setTimeout(function () {

	        // a font will be compared against all the three default fonts.
	        // and if it doesn't match all 3 then that font is not available.
	        var baseFonts = ["monospace", "sans-serif", "serif"];

	        //we use m or w because these two characters take up the maximum width.
	        // And we use a LLi so that the same matching fonts can get separated
	        var testString = "mmmmmmmmmmlli";

	        //we test using 72px font size, we may use any size. I guess larger the better.
	        var testSize = "72px";

	        var h = document.getElementsByTagName("body")[0];

	        // create a SPAN in the document to get the width of the text we use to test
	        var s = document.createElement("span");
	        s.style.fontSize = testSize;
	        s.innerHTML = testString;
	        var defaultWidth = {};
	        var defaultHeight = {};
	        for (var index in baseFonts) {
	          //get the default width for the three base fonts
	          s.style.fontFamily = baseFonts[index];
	          h.appendChild(s);
	          defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
	          defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
	          h.removeChild(s);
	        }
	        var detect = function detect(font) {
	          var detected = false;
	          for (var index in baseFonts) {
	            s.style.fontFamily = font + "," + baseFonts[index]; // name of the font along with the base font for fallback.
	            h.appendChild(s);
	            var matched = s.offsetWidth !== defaultWidth[baseFonts[index]] || s.offsetHeight !== defaultHeight[baseFonts[index]];
	            h.removeChild(s);
	            detected = detected || matched;
	          }
	          return detected;
	        };
	        var fontList = ["Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andale Mono", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Bitstream Vera Sans Mono", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Book Antiqua", "Bookman Old Style", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Calibri", "Californian FB", "Calisto MT", "Calligrapher", "Cambria", "Cambria Math", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Century", "Century Gothic", "Century Schoolbook", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Comic Sans", "Comic Sans MS", "Consolas", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Courier", "Courier New", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "Devanagari Sangam MN", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "Franklin Gothic", "Franklin Gothic Book", "Franklin Gothic Demi", "Franklin Gothic Demi Cond", "Franklin Gothic Heavy", "Franklin Gothic Medium", "Franklin Gothic Medium Cond", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Garamond", "Gautami", "Geeza Pro", "Geneva", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "Georgia", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Helvetica", "Helvetica Neue", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Impact", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Monaco", "Mongolian Baiti", "MONO", "Monotype Corsiva", "MoolBoran", "Mrs Eaves", "MS Gothic", "MS LineDraw", "MS Mincho", "MS Outlook", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS Reference Specialty", "MS Sans Serif", "MS Serif", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "MYRIAD", "MYRIAD PRO", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Palatino", "Palatino Linotype", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tahoma", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Times", "Times New Roman", "Times New Roman PS", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Trebuchet MS", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Verdana", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "Wingdings", "Wingdings 2", "Wingdings 3", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF"];
	        var available = [];
	        for (var i = 0, l = fontList.length; i < l; i++) {
	          if (detect(fontList[i])) {
	            available.push(fontList[i]);
	          }
	        }
	        keys.push(available.join(";"));
	        done(keys);
	      }, 1);
	    },
	    pluginsKey: function pluginsKey(keys) {
	      if (this.isIE()) {
	        keys.push(this.getIEPluginsString());
	      } else {
	        keys.push(this.getRegularPluginsString());
	      }
	      return keys;
	    },
	    getRegularPluginsString: function getRegularPluginsString() {
	      var plugins = [];
	      for (var i = 0, l = navigator.plugins.length; i < l; i++) {
	        plugins.push(navigator.plugins[i]);
	      }
	      // sorting plugins only for those user agents, that we know randomize the plugins
	      // every time we try to enumerate them
	      if (this.pluginsShouldBeSorted()) {
	        plugins = plugins.sort(function (a, b) {
	          if (a.name > b.name) {
	            return 1;
	          }
	          if (a.name < b.name) {
	            return -1;
	          }
	          return 0;
	        });
	      }
	      return this.map(plugins, function (p) {
	        var mimeTypes = this.map(p, function (mt) {
	          return [mt.type, mt.suffixes].join("~");
	        }).join(",");
	        return [p.name, p.description, mimeTypes].join("::");
	      }, this).join(";");
	    },
	    getIEPluginsString: function getIEPluginsString() {
	      if (window.ActiveXObject) {
	        var names = ["AcroPDF.PDF", // Adobe PDF reader 7+
	        "Adodb.Stream", "AgControl.AgControl", // Silverlight
	        "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
	        "QuickTime.QuickTime", // QuickTime
	        "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", // ShockWave player
	        "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", //flash plugin
	        "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", // Windows media player
	        "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1"];
	        // starting to detect plugins in IE
	        return this.map(names, function (name) {
	          try {
	            new ActiveXObject(name); // eslint-disable-no-new
	            return name;
	          } catch (e) {
	            return null;
	          }
	        }).join(";");
	      } else {
	        return "";
	      }
	    },
	    pluginsShouldBeSorted: function pluginsShouldBeSorted() {
	      var should = false;
	      for (var i = 0, l = this.options.sortPluginsFor.length; i < l; i++) {
	        var re = this.options.sortPluginsFor[i];
	        if (navigator.userAgent.match(re)) {
	          should = true;
	          break;
	        }
	      }
	      return should;
	    },
	    touchSupportKey: function touchSupportKey(keys) {
	      if (!this.options.excludeTouchSupport) {
	        keys.push(this.getTouchSupport());
	      }
	      return keys;
	    },
	    hasSessionStorage: function hasSessionStorage() {
	      try {
	        return !!window.sessionStorage;
	      } catch (e) {
	        return true; // SecurityError when referencing it means it exists
	      }
	    },
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
	    hasLocalStorage: function hasLocalStorage() {
	      try {
	        return !!window.localStorage;
	      } catch (e) {
	        return true; // SecurityError when referencing it means it exists
	      }
	    },
	    hasIndexedDB: function hasIndexedDB() {
	      return !!window.indexedDB;
	    },
	    getNavigatorCpuClass: function getNavigatorCpuClass() {
	      if (navigator.cpuClass) {
	        return "navigatorCpuClass: " + navigator.cpuClass;
	      } else {
	        return "navigatorCpuClass: unknown";
	      }
	    },
	    getNavigatorPlatform: function getNavigatorPlatform() {
	      if (navigator.platform) {
	        return "navigatorPlatform: " + navigator.platform;
	      } else {
	        return "navigatorPlatform: unknown";
	      }
	    },
	    getDoNotTrack: function getDoNotTrack() {
	      if (navigator.doNotTrack) {
	        return "doNotTrack: " + navigator.doNotTrack;
	      } else {
	        return "doNotTrack: unknown";
	      }
	    },
	    // This is a crude and primitive touch screen detection.
	    // It's not possible to currently reliably detect the  availability of a touch screen
	    // with a JS, without actually subscribing to a touch event.
	    // http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
	    // https://github.com/Modernizr/Modernizr/issues/548
	    // method returns an array of 3 values:
	    // maxTouchPoints, the success or failure of creating a TouchEvent,
	    // and the availability of the 'ontouchstart' property
	    getTouchSupport: function getTouchSupport() {
	      var maxTouchPoints = 0;
	      var touchEvent = false;
	      if (typeof navigator.maxTouchPoints !== "undefined") {
	        maxTouchPoints = navigator.maxTouchPoints;
	      } else if (typeof navigator.msMaxTouchPoints !== "undefined") {
	        maxTouchPoints = navigator.msMaxTouchPoints;
	      }
	      try {
	        document.createEvent("TouchEvent");
	        touchEvent = true;
	      } catch (_) {}
	      var touchStart = ("ontouchstart" in window);
	      return [maxTouchPoints, touchEvent, touchStart];
	    },
	    // https://www.browserleaks.com/canvas#how-does-it-work
	    getCanvasFp: function getCanvasFp() {
	      var result = [];
	      // Very simple now, need to make it more complex (geo shapes etc)
	      var canvas = document.createElement("canvas");
	      canvas.width = 2000;
	      canvas.height = 200;
	      canvas.style.display = "inline";
	      var ctx = canvas.getContext("2d");
	      // detect browser support of canvas blending
	      // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
	      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/blending.js
	      // https://securehomes.esat.kuleuven.be/~gacar/persistent/the_web_never_forgets.pdf
	      try {
	        ctx.globalCompositeOperation = "screen";
	      } catch (e) {}
	      result.push("canvas blending:" + (ctx.globalCompositeOperation === "screen" ? "yes" : "no"));

	      // detect browser support of canvas winding
	      // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
	      // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
	      ctx.rect(0, 0, 10, 10);
	      ctx.rect(2, 2, 6, 6);
	      result.push("canvas winding:" + (ctx.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no"));

	      ctx.textBaseline = "alphabetic";
	      ctx.fillStyle = "#f60";
	      ctx.fillRect(125, 1, 62, 20);
	      ctx.fillStyle = "#069";
	      ctx.font = "11pt no-real-font-123";
	      ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15);
	      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
	      ctx.font = "18pt Arial";
	      ctx.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45);

	      // canvas blending
	      // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
	      // http://jsfiddle.net/NDYV8/16/
	      ctx.globalCompositeOperation = "multiply";
	      ctx.fillStyle = "rgb(255,0,255)";
	      ctx.beginPath();
	      ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
	      ctx.closePath();
	      ctx.fill();
	      ctx.fillStyle = "rgb(0,255,255)";
	      ctx.beginPath();
	      ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
	      ctx.closePath();
	      ctx.fill();
	      ctx.fillStyle = "rgb(255,255,0)";
	      ctx.beginPath();
	      ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
	      ctx.closePath();
	      ctx.fill();
	      ctx.fillStyle = "rgb(255,0,255)";
	      // canvas winding
	      // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
	      // http://jsfiddle.net/NDYV8/19/
	      ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
	      ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
	      ctx.fill("evenodd");

	      result.push("canvas fp:" + canvas.toDataURL());
	      return result.join("~");
	    },

	    getWebglFp: function getWebglFp() {
	      var gl;
	      var fa2s = function fa2s(fa) {
	        gl.clearColor(0.0, 0.0, 0.0, 1.0);
	        gl.enable(gl.DEPTH_TEST);
	        gl.depthFunc(gl.LEQUAL);
	        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	        return "[" + fa[0] + ", " + fa[1] + "]";
	      };
	      var maxAnisotropy = function maxAnisotropy(gl) {
	        var anisotropy,
	            ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
	        return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
	      };
	      gl = this.getWebglCanvas();
	      if (!gl) {
	        return null;
	      }
	      // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
	      // First it draws a gradient object with shaders and convers the image to the Base64 string.
	      // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
	      // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
	      var result = [];
	      var vShaderTemplate = "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}";
	      var fShaderTemplate = "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}";
	      var vertexPosBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
	      var vertices = new Float32Array([-.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0]);
	      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	      vertexPosBuffer.itemSize = 3;
	      vertexPosBuffer.numItems = 3;
	      var program = gl.createProgram(),
	          vshader = gl.createShader(gl.VERTEX_SHADER);
	      gl.shaderSource(vshader, vShaderTemplate);
	      gl.compileShader(vshader);
	      var fshader = gl.createShader(gl.FRAGMENT_SHADER);
	      gl.shaderSource(fshader, fShaderTemplate);
	      gl.compileShader(fshader);
	      gl.attachShader(program, vshader);
	      gl.attachShader(program, fshader);
	      gl.linkProgram(program);
	      gl.useProgram(program);
	      program.vertexPosAttrib = gl.getAttribLocation(program, "attrVertex");
	      program.offsetUniform = gl.getUniformLocation(program, "uniformOffset");
	      gl.enableVertexAttribArray(program.vertexPosArray);
	      gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0);
	      gl.uniform2f(program.offsetUniform, 1, 1);
	      gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems);
	      if (gl.canvas != null) {
	        result.push(gl.canvas.toDataURL());
	      }
	      result.push("extensions:" + gl.getSupportedExtensions().join(";"));
	      result.push("webgl aliased line width range:" + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)));
	      result.push("webgl aliased point size range:" + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)));
	      result.push("webgl alpha bits:" + gl.getParameter(gl.ALPHA_BITS));
	      result.push("webgl antialiasing:" + (gl.getContextAttributes().antialias ? "yes" : "no"));
	      result.push("webgl blue bits:" + gl.getParameter(gl.BLUE_BITS));
	      result.push("webgl depth bits:" + gl.getParameter(gl.DEPTH_BITS));
	      result.push("webgl green bits:" + gl.getParameter(gl.GREEN_BITS));
	      result.push("webgl max anisotropy:" + maxAnisotropy(gl));
	      result.push("webgl max combined texture image units:" + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
	      result.push("webgl max cube map texture size:" + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE));
	      result.push("webgl max fragment uniform vectors:" + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS));
	      result.push("webgl max render buffer size:" + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE));
	      result.push("webgl max texture image units:" + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
	      result.push("webgl max texture size:" + gl.getParameter(gl.MAX_TEXTURE_SIZE));
	      result.push("webgl max varying vectors:" + gl.getParameter(gl.MAX_VARYING_VECTORS));
	      result.push("webgl max vertex attribs:" + gl.getParameter(gl.MAX_VERTEX_ATTRIBS));
	      result.push("webgl max vertex texture image units:" + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
	      result.push("webgl max vertex uniform vectors:" + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS));
	      result.push("webgl max viewport dims:" + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)));
	      result.push("webgl red bits:" + gl.getParameter(gl.RED_BITS));
	      result.push("webgl renderer:" + gl.getParameter(gl.RENDERER));
	      result.push("webgl shading language version:" + gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
	      result.push("webgl stencil bits:" + gl.getParameter(gl.STENCIL_BITS));
	      result.push("webgl vendor:" + gl.getParameter(gl.VENDOR));
	      result.push("webgl version:" + gl.getParameter(gl.VERSION));

	      if (!gl.getShaderPrecisionFormat) {
	        if (typeof NODEBUG === "undefined") {
	          this.log("WebGL fingerprinting is incomplete, because your browser does not support getShaderPrecisionFormat");
	        }
	        return result.join("~");
	      }

	      result.push("webgl vertex shader high float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision);
	      result.push("webgl vertex shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMin);
	      result.push("webgl vertex shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).rangeMax);
	      result.push("webgl vertex shader medium float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision);
	      result.push("webgl vertex shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMin);
	      result.push("webgl vertex shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).rangeMax);
	      result.push("webgl vertex shader low float precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).precision);
	      result.push("webgl vertex shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMin);
	      result.push("webgl vertex shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_FLOAT).rangeMax);
	      result.push("webgl fragment shader high float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision);
	      result.push("webgl fragment shader high float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMin);
	      result.push("webgl fragment shader high float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).rangeMax);
	      result.push("webgl fragment shader medium float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision);
	      result.push("webgl fragment shader medium float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMin);
	      result.push("webgl fragment shader medium float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).rangeMax);
	      result.push("webgl fragment shader low float precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).precision);
	      result.push("webgl fragment shader low float precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMin);
	      result.push("webgl fragment shader low float precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT).rangeMax);
	      result.push("webgl vertex shader high int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).precision);
	      result.push("webgl vertex shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMin);
	      result.push("webgl vertex shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_INT).rangeMax);
	      result.push("webgl vertex shader medium int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).precision);
	      result.push("webgl vertex shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMin);
	      result.push("webgl vertex shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_INT).rangeMax);
	      result.push("webgl vertex shader low int precision:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).precision);
	      result.push("webgl vertex shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMin);
	      result.push("webgl vertex shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.LOW_INT).rangeMax);
	      result.push("webgl fragment shader high int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).precision);
	      result.push("webgl fragment shader high int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMin);
	      result.push("webgl fragment shader high int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT).rangeMax);
	      result.push("webgl fragment shader medium int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).precision);
	      result.push("webgl fragment shader medium int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMin);
	      result.push("webgl fragment shader medium int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT).rangeMax);
	      result.push("webgl fragment shader low int precision:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).precision);
	      result.push("webgl fragment shader low int precision rangeMin:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMin);
	      result.push("webgl fragment shader low int precision rangeMax:" + gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT).rangeMax);
	      return result.join("~");
	    },
	    getAdBlock: function getAdBlock() {
	      var ads = document.createElement("div");
	      ads.setAttribute("id", "ads");
	      document.body.appendChild(ads);
	      return document.getElementById("ads") ? false : true;
	    },
	    getHasLiedLanguages: function getHasLiedLanguages() {
	      //We check if navigator.language is equal to the first language of navigator.languages
	      if (typeof navigator.languages !== "undefined") {
	        try {
	          var firstLanguages = navigator.languages[0].substr(0, 2);
	          if (firstLanguages !== navigator.language.substr(0, 2)) {
	            return true;
	          }
	        } catch (err) {
	          return true;
	        }
	      }
	      return false;
	    },
	    getHasLiedResolution: function getHasLiedResolution() {
	      if (screen.width < screen.availWidth) {
	        return true;
	      }
	      if (screen.height < screen.availHeight) {
	        return true;
	      }
	      return false;
	    },
	    getHasLiedOs: function getHasLiedOs() {
	      var userAgent = navigator.userAgent;
	      var oscpu = navigator.oscpu;
	      var platform = navigator.platform;
	      var os;
	      //We extract the OS from the user agent (respect the order of the if else if statement)
	      if (userAgent.toLowerCase().indexOf("windows phone") >= 0) {
	        os = "Windows Phone";
	      } else if (userAgent.toLowerCase().indexOf("win") >= 0) {
	        os = "Windows";
	      } else if (userAgent.toLowerCase().indexOf("android") >= 0) {
	        os = "Android";
	      } else if (userAgent.toLowerCase().indexOf("linux") >= 0) {
	        os = "Linux";
	      } else if (userAgent.toLowerCase().indexOf("iPhone") >= 0 || userAgent.toLowerCase().indexOf("iPad") >= 0) {
	        os = "iOS";
	      } else if (userAgent.toLowerCase().indexOf("mac") >= 0) {
	        os = "Mac";
	      } else {
	        os = "Other";
	      }
	      // We detect if the person uses a mobile device
	      var mobileDevice;
	      if ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
	        mobileDevice = true;
	      } else {
	        mobileDevice = false;
	      }

	      if (mobileDevice && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other") {
	        return true;
	      }

	      // We compare oscpu with the OS extracted from the UA
	      if (typeof oscpu !== "undefined") {
	        if (oscpu.toLowerCase().indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
	          return true;
	        } else if (oscpu.toLowerCase().indexOf("linux") >= 0 && os !== "Linux" && os !== "Android") {
	          return true;
	        } else if (oscpu.toLowerCase().indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS") {
	          return true;
	        } else if (oscpu.toLowerCase().indexOf("win") === 0 && oscpu.toLowerCase().indexOf("linux") === 0 && oscpu.toLowerCase().indexOf("mac") >= 0 && os !== "other") {
	          return true;
	        }
	      }

	      //We compare platform with the OS extracted from the UA
	      if (platform.toLowerCase().indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone") {
	        return true;
	      } else if ((platform.toLowerCase().indexOf("linux") >= 0 || platform.toLowerCase().indexOf("android") >= 0 || platform.toLowerCase().indexOf("pike") >= 0) && os !== "Linux" && os !== "Android") {
	        return true;
	      } else if ((platform.toLowerCase().indexOf("mac") >= 0 || platform.toLowerCase().indexOf("ipad") >= 0 || platform.toLowerCase().indexOf("ipod") >= 0 || platform.toLowerCase().indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS") {
	        return true;
	      } else if (platform.toLowerCase().indexOf("win") === 0 && platform.toLowerCase().indexOf("linux") === 0 && platform.toLowerCase().indexOf("mac") >= 0 && os !== "other") {
	        return true;
	      }

	      if (typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone") {
	        //We are are in the case where the person uses ie, therefore we can infer that it's windows
	        return true;
	      }

	      return false;
	    },
	    getHasLiedBrowser: function getHasLiedBrowser() {
	      var userAgent = navigator.userAgent;
	      var productSub = navigator.productSub;

	      //we extract the browser from the user agent (respect the order of the tests)
	      var browser;
	      if (userAgent.toLowerCase().indexOf("firefox") >= 0) {
	        browser = "Firefox";
	      } else if (userAgent.toLowerCase().indexOf("opera") >= 0 || userAgent.toLowerCase().indexOf("opr") >= 0) {
	        browser = "Opera";
	      } else if (userAgent.toLowerCase().indexOf("chrome") >= 0) {
	        browser = "Chrome";
	      } else if (userAgent.toLowerCase().indexOf("safari") >= 0) {
	        browser = "Safari";
	      } else if (userAgent.toLowerCase().indexOf("trident") >= 0) {
	        browser = "Internet Explorer";
	      } else {
	        browser = "Other";
	      }

	      if ((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107") {
	        return true;
	      }

	      var tempRes = eval.toString().length;
	      if (tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other") {
	        return true;
	      } else if (tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other") {
	        return true;
	      } else if (tempRes === 33 && browser !== "Chrome" && browser !== "Opera" && browser !== "Other") {
	        return true;
	      }

	      //We create an error to see how it is handled
	      var errFirefox;
	      try {
	        throw "a";
	      } catch (err) {
	        try {
	          err.toSource();
	          errFirefox = true;
	        } catch (errOfErr) {
	          errFirefox = false;
	        }
	      }
	      if (errFirefox && browser !== "Firefox" && browser !== "Other") {
	        return true;
	      }
	      return false;
	    },
	    isCanvasSupported: function isCanvasSupported() {
	      var elem = document.createElement("canvas");
	      return !!(elem.getContext && elem.getContext("2d"));
	    },
	    isWebGlSupported: function isWebGlSupported() {
	      // code taken from Modernizr
	      if (!this.isCanvasSupported()) {
	        return false;
	      }
	      var canvas = document.createElement("canvas"),
	          glContext = canvas.getContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));

	      return !!window.WebGLRenderingContext && !!glContext;
	    },
	    isIE: function isIE() {
	      if (navigator.appName === "Microsoft Internet Explorer") {
	        return true;
	      } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
	        // IE 11
	        return true;
	      }
	      return false;
	    },
	    hasSwfObjectLoaded: function hasSwfObjectLoaded() {
	      return typeof window.swfobject !== "undefined";
	    },
	    hasMinFlashInstalled: function hasMinFlashInstalled() {
	      return swfobject.hasFlashPlayerVersion("9.0.0");
	    },
	    addFlashDivNode: function addFlashDivNode() {
	      var node = document.createElement("div");
	      node.setAttribute("id", this.options.swfContainerId);
	      document.body.appendChild(node);
	    },
	    loadSwfAndDetectFonts: function loadSwfAndDetectFonts(done) {
	      var hiddenCallback = "___fp_swf_loaded";
	      window[hiddenCallback] = function (fonts) {
	        done(fonts);
	      };
	      var id = this.options.swfContainerId;
	      this.addFlashDivNode();
	      var flashvars = { onReady: hiddenCallback };
	      var flashparams = { allowScriptAccess: "always", menu: "false" };
	      swfobject.embedSWF(this.options.swfPath, id, "1", "1", "9.0.0", false, flashvars, flashparams, {});
	    },
	    getWebglCanvas: function getWebglCanvas() {
	      var canvas = document.createElement("canvas");
	      var gl = null;
	      try {
	        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
	      } catch (e) {}
	      if (!gl) {
	        gl = null;
	      }
	      return gl;
	    },
	    each: function each(obj, iterator, context) {
	      if (obj === null) {
	        return;
	      }
	      if (this.nativeForEach && obj.forEach === this.nativeForEach) {
	        obj.forEach(iterator, context);
	      } else if (obj.length === +obj.length) {
	        for (var i = 0, l = obj.length; i < l; i++) {
	          if (iterator.call(context, obj[i], i, obj) === {}) {
	            return;
	          }
	        }
	      } else {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            if (iterator.call(context, obj[key], key, obj) === {}) {
	              return;
	            }
	          }
	        }
	      }
	    },

	    map: function map(obj, iterator, context) {
	      var results = [];
	      // Not using strict equality so that this acts as a
	      // shortcut to checking for `null` and `undefined`.
	      if (obj == null) {
	        return results;
	      }
	      if (this.nativeMap && obj.map === this.nativeMap) {
	        return obj.map(iterator, context);
	      }
	      this.each(obj, function (value, index, list) {
	        results[results.length] = iterator.call(context, value, index, list);
	      });
	      return results;
	    },

	    /// MurmurHash3 related functions

	    //
	    // Given two 64bit ints (as an array of two 32bit ints) returns the two
	    // added together as a 64bit int (as an array of two 32bit ints).
	    //
	    x64Add: function x64Add(m, n) {
	      m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
	      n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
	      var o = [0, 0, 0, 0];
	      o[3] += m[3] + n[3];
	      o[2] += o[3] >>> 16;
	      o[3] &= 0xffff;
	      o[2] += m[2] + n[2];
	      o[1] += o[2] >>> 16;
	      o[2] &= 0xffff;
	      o[1] += m[1] + n[1];
	      o[0] += o[1] >>> 16;
	      o[1] &= 0xffff;
	      o[0] += m[0] + n[0];
	      o[0] &= 0xffff;
	      return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
	    },

	    //
	    // Given two 64bit ints (as an array of two 32bit ints) returns the two
	    // multiplied together as a 64bit int (as an array of two 32bit ints).
	    //
	    x64Multiply: function x64Multiply(m, n) {
	      m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
	      n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
	      var o = [0, 0, 0, 0];
	      o[3] += m[3] * n[3];
	      o[2] += o[3] >>> 16;
	      o[3] &= 0xffff;
	      o[2] += m[2] * n[3];
	      o[1] += o[2] >>> 16;
	      o[2] &= 0xffff;
	      o[2] += m[3] * n[2];
	      o[1] += o[2] >>> 16;
	      o[2] &= 0xffff;
	      o[1] += m[1] * n[3];
	      o[0] += o[1] >>> 16;
	      o[1] &= 0xffff;
	      o[1] += m[2] * n[2];
	      o[0] += o[1] >>> 16;
	      o[1] &= 0xffff;
	      o[1] += m[3] * n[1];
	      o[0] += o[1] >>> 16;
	      o[1] &= 0xffff;
	      o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
	      o[0] &= 0xffff;
	      return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
	    },
	    //
	    // Given a 64bit int (as an array of two 32bit ints) and an int
	    // representing a number of bit positions, returns the 64bit int (as an
	    // array of two 32bit ints) rotated left by that number of positions.
	    //
	    x64Rotl: function x64Rotl(m, n) {
	      n %= 64;
	      if (n === 32) {
	        return [m[1], m[0]];
	      } else if (n < 32) {
	        return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
	      } else {
	        n -= 32;
	        return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
	      }
	    },
	    //
	    // Given a 64bit int (as an array of two 32bit ints) and an int
	    // representing a number of bit positions, returns the 64bit int (as an
	    // array of two 32bit ints) shifted left by that number of positions.
	    //
	    x64LeftShift: function x64LeftShift(m, n) {
	      n %= 64;
	      if (n === 0) {
	        return m;
	      } else if (n < 32) {
	        return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
	      } else {
	        return [m[1] << n - 32, 0];
	      }
	    },
	    //
	    // Given two 64bit ints (as an array of two 32bit ints) returns the two
	    // xored together as a 64bit int (as an array of two 32bit ints).
	    //
	    x64Xor: function x64Xor(m, n) {
	      return [m[0] ^ n[0], m[1] ^ n[1]];
	    },
	    //
	    // Given a block, returns murmurHash3's final x64 mix of that block.
	    // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
	    // only place where we need to right shift 64bit ints.)
	    //
	    x64Fmix: function x64Fmix(h) {
	      h = this.x64Xor(h, [0, h[0] >>> 1]);
	      h = this.x64Multiply(h, [0xff51afd7, 0xed558ccd]);
	      h = this.x64Xor(h, [0, h[0] >>> 1]);
	      h = this.x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
	      h = this.x64Xor(h, [0, h[0] >>> 1]);
	      return h;
	    },

	    //
	    // Given a string and an optional seed as an int, returns a 128 bit
	    // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
	    //
	    x64hash128: function x64hash128(key, seed) {
	      key = key || "";
	      seed = seed || 0;
	      var remainder = key.length % 16;
	      var bytes = key.length - remainder;
	      var h1 = [0, seed];
	      var h2 = [0, seed];
	      var k1 = [0, 0];
	      var k2 = [0, 0];
	      var c1 = [0x87c37b91, 0x114253d5];
	      var c2 = [0x4cf5ad43, 0x2745937f];
	      for (var i = 0; i < bytes; i = i + 16) {
	        k1 = [key.charCodeAt(i + 4) & 0xff | (key.charCodeAt(i + 5) & 0xff) << 8 | (key.charCodeAt(i + 6) & 0xff) << 16 | (key.charCodeAt(i + 7) & 0xff) << 24, key.charCodeAt(i) & 0xff | (key.charCodeAt(i + 1) & 0xff) << 8 | (key.charCodeAt(i + 2) & 0xff) << 16 | (key.charCodeAt(i + 3) & 0xff) << 24];
	        k2 = [key.charCodeAt(i + 12) & 0xff | (key.charCodeAt(i + 13) & 0xff) << 8 | (key.charCodeAt(i + 14) & 0xff) << 16 | (key.charCodeAt(i + 15) & 0xff) << 24, key.charCodeAt(i + 8) & 0xff | (key.charCodeAt(i + 9) & 0xff) << 8 | (key.charCodeAt(i + 10) & 0xff) << 16 | (key.charCodeAt(i + 11) & 0xff) << 24];
	        k1 = this.x64Multiply(k1, c1);
	        k1 = this.x64Rotl(k1, 31);
	        k1 = this.x64Multiply(k1, c2);
	        h1 = this.x64Xor(h1, k1);
	        h1 = this.x64Rotl(h1, 27);
	        h1 = this.x64Add(h1, h2);
	        h1 = this.x64Add(this.x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
	        k2 = this.x64Multiply(k2, c2);
	        k2 = this.x64Rotl(k2, 33);
	        k2 = this.x64Multiply(k2, c1);
	        h2 = this.x64Xor(h2, k2);
	        h2 = this.x64Rotl(h2, 31);
	        h2 = this.x64Add(h2, h1);
	        h2 = this.x64Add(this.x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
	      }
	      k1 = [0, 0];
	      k2 = [0, 0];
	      switch (remainder) {
	        case 15:
	          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 14)], 48));
	        case 14:
	          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 13)], 40));
	        case 13:
	          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 12)], 32));
	        case 12:
	          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 11)], 24));
	        case 11:
	          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 10)], 16));
	        case 10:
	          k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 9)], 8));
	        case 9:
	          k2 = this.x64Xor(k2, [0, key.charCodeAt(i + 8)]);
	          k2 = this.x64Multiply(k2, c2);
	          k2 = this.x64Rotl(k2, 33);
	          k2 = this.x64Multiply(k2, c1);
	          h2 = this.x64Xor(h2, k2);
	        case 8:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 7)], 56));
	        case 7:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 6)], 48));
	        case 6:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 5)], 40));
	        case 5:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 4)], 32));
	        case 4:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 3)], 24));
	        case 3:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 2)], 16));
	        case 2:
	          k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 1)], 8));
	        case 1:
	          k1 = this.x64Xor(k1, [0, key.charCodeAt(i)]);
	          k1 = this.x64Multiply(k1, c1);
	          k1 = this.x64Rotl(k1, 31);
	          k1 = this.x64Multiply(k1, c2);
	          h1 = this.x64Xor(h1, k1);
	      }
	      h1 = this.x64Xor(h1, [0, key.length]);
	      h2 = this.x64Xor(h2, [0, key.length]);
	      h1 = this.x64Add(h1, h2);
	      h2 = this.x64Add(h2, h1);
	      h1 = this.x64Fmix(h1);
	      h2 = this.x64Fmix(h2);
	      h1 = this.x64Add(h1, h2);
	      h2 = this.x64Add(h2, h1);
	      return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
	    }
	  };
	  return Fingerprint2;
	});
	/* squelch */ /* squelch */ /* squelch */

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*jshint esnext: true */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _hammer = __webpack_require__(5);

	var _hammer2 = _interopRequireDefault(_hammer);

	var _utilAjaxJs = __webpack_require__(7);

	var _utilAjaxJs2 = _interopRequireDefault(_utilAjaxJs);

	var _uaparser = __webpack_require__(8);

	var _uaparser2 = _interopRequireDefault(_uaparser);

	var _utilUtilJs = __webpack_require__(2);

	var _utilUtilJs2 = _interopRequireDefault(_utilUtilJs);

	var HammerAS = (function () {
	    function HammerAS(config) {
	        _classCallCheck(this, HammerAS);

	        this.config = config;
	        this.util = new _utilUtilJs2['default'](config);

	        this.ad = null;
	        this.bg = null;
	        this.mc = null;

	        this.start_x = 0;
	        this.start_y = 0;

	        this.ticking = false;
	        this.transform = null;
	        this.timer = null;

	        this.ua = new _uaparser2['default']();

	        this.setup();
	    }

	    _createClass(HammerAS, [{
	        key: 'setup',
	        value: function setup(callback) {
	            var $ = this;

	            // add 'adswipe' div node
	            $.ad = document.createElement('div');
	            $.ad.setAttribute('class', $.config.classElement);
	            document.body.appendChild($.ad);

	            // add semi-transparent black bg (will be under ad)
	            $.bg = document.createElement('div');
	            $.bg.setAttribute('class', $.config.classElement + '_bg');
	            document.body.appendChild($.bg);
	            $.bg.style.transition = 'all .5s';
	            $.bg.style.opacity = 0;

	            // add ? to top right corner to explain what AS does
	            $.q = document.createElement('div');
	            $.q.setAttribute('class', $.config.classElement + '_q');
	            document.body.appendChild($.q);

	            // add info overlay for users wanting to learn what AS does
	            $.info = document.createElement('div');
	            $.info.setAttribute('class', $.config.classElement + '_info');
	            document.body.appendChild($.info);
	            $.info.style.visibility = 'hidden';
	            $.info.style.opacity = 0;

	            // set up hammerjs
	            $.mc = new _hammer2['default'].Manager($.ad);
	            $.mc.add(new _hammer2['default'].Pan());
	            $.mc.add(new _hammer2['default'].Swipe({
	                threshold: 5,
	                velocity: 0.2
	            })).recognizeWith($.mc.get('pan'));
	            $.mc.add(new _hammer2['default'].Tap());

	            // event listeners
	            $.mc.on('swipeleft swiperight', $.onSwipe.bind(this));
	            $.mc.on('panleft panright panend', $.onPan.bind(this));
	            $.mc.on('tap', $.onTap.bind(this));

	            // execute callback, if set
	            if (callback) {
	                callback();
	            }
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            var $ = this;

	            if ($.config.isShown) {
	                // remove previous instance
	                $.remove(function () {
	                    // set up new instance
	                    $.setup(function () {
	                        // show updated ad
	                        $.show($.config.asid);
	                    });
	                });
	            }
	        }
	    }, {
	        key: 'show',

	        /**
	         * Show ad
	         * @return {[type]} [description]
	         */
	        value: function show(asid) {
	            var $ = this;

	            // if Adswipe element removed, action has already been taken on this capaign, do not repeat
	            if (!$.ad) return false;

	            $.config.asid = asid;
	            $.config.isShown = true;

	            $.width = document.documentElement.clientWidth;
	            $.height = document.documentElement.clientHeight;

	            // add semi-transparent background style to bg element
	            $.bg.style.width = '100%';
	            $.bg.style.height = '100%';
	            $.bg.style.position = 'fixed';
	            $.bg.style.top = 0 + 'px';
	            $.bg.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of other elements, ad will be placed on top of this
	            $.bg.style.backgroundColor = 'rgba(0, 0, 0, .85)';
	            // fade in $.bg
	            $.bg.style.opacity = 1;

	            // get image, append to hammer element
	            var image = new _utilAjaxJs2['default']();
	            image.url = $.config.endpoint + 'publications';
	            image.data = {
	                'asid': asid,
	                'impressed_user': $.config.fingerprint
	            };
	            image.getImage().then(function (response) {
	                // everything is good
	                $.config.clickURL = response.clickURL;
	                $.config.adID = response.adID;
	                $.config.campaignID = response.campaignID;

	                /** add debug data to div if in debug mode
	                 * - width x height
	                 * - User Fingerprint (unique ID)
	                 *
	                 * NOTE: no trailing closing tag on LI to prevent inline-block spacing (which dicks everything up)
	                 */
	                if ($.config.debug) {
	                    var styleWidth = $.width > '800' ? '50%' : '90%'; // smaller width on larger display (so not stretched)
	                    var styleTitle = 'style="width: 30%; display: inline-block;"';
	                    var styleData = 'style="width: 70%; display: inline-block;"';
	                    var debugData = '<ul style="width: ' + styleWidth + '; display: inline-block;">\n                                    <li ' + styleTitle + '>Width x Height\n                                    <li ' + styleData + '>' + $.width + ' x ' + $.height + '\n                                    <li ' + styleTitle + '>User Fingerprint\n                                    <li ' + styleData + '>' + $.config.fingerprint + '\n                                    <li style="display: inline;">' + $.ua.getUA() + '\n                                </ul>';
	                    //$.ad.innerHTML = $.width+' x '+$.height+'<br>'+$.config.fingerprint;
	                    $.ad.innerHTML = debugData;
	                    $.ad.style.textAlign = 'center';
	                    $.ad.style.color = 'white';
	                    $.ad.style.fontWeight = 'bold';
	                    $.ad.style.textShadow = '0 0 2px black';
	                }

	                $.ad.style.transition = 'all .5s';
	                $.ad.style.backgroundImage = 'url("' + response.imageURL + '")';
	                $.ad.style.backgroundSize = 'contain';
	                $.ad.style.backgroundPosition = 'center center';
	                $.ad.style.backgroundRepeat = 'no-repeat';
	                $.ad.style.width = $.width + 'px';
	                $.ad.style.height = $.height + 'px';
	                $.ad.style.position = 'fixed';
	                $.ad.style.top = '0px';
	                $.ad.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of $.bg

	                $.q.style.transition = 'all .5s';
	                $.q.style.color = 'rgb(181, 181, 181)';
	                $.q.style.textAlign = 'right';
	                $.q.style.height = '50px';
	                $.q.style.width = '50px';
	                $.q.style.position = 'fixed';
	                $.q.style.top = '0px';
	                $.q.style.right = '0';
	                $.q.style.fontSize = 'large';
	                $.q.innerHTML = '<span id="' + $.config.classElement + '_q" style="cursor: pointer; padding: 5px; background-color: rgba(0, 0, 0, .20);">\n                                (?)\n                            </span>';
	                $.q.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of $.bg, $.ad

	                var infoStyle;
	                $.info.style.transition = 'all .5s';
	                $.info.style.color = 'rgb(181, 181, 181)';
	                $.info.style.backgroundColor = 'rgba(0, 0, 0, .85)';
	                $.info.style.width = '100%';
	                $.info.style.height = '100%';
	                $.info.style.position = 'fixed';
	                $.info.style.top = '0px';
	                $.info.style.fontSize = 'large';
	                $.info.style.zIndex = $.util.findNextZIndex(); // make sure this is on top of $.bg, $.ad

	                if ($.ua.getDevice().type === 'mobile') infoStyle = 'width: 90%; margin-left: 5%;';else infoStyle = 'width: 50%; margin-left: 25%;';

	                $.info.innerHTML = '<div style="height: ' + $.height + 'px; padding: 10px; overflow-y: auto; ' + infoStyle + '">\n                                    <div style="margin-bottom: 10px; text-align: center; font-size: larger;">\n                                        <strong>How Adswipe Works</strong>\n                                    </div>\n                                    <div style="margin-bottom: 10px;">\n                                        <div style="float: left; margin: 5px 15px 0 0; height: 30px;\n                                        padding: 5px 10px 5px 10px; border: 1px solid white; text-align: center;">\n                                            Swipe Left\n                                        </div>\n\n                                        <p>You understand that ads are inevitable, the trade-off for using cool\n                                        software at a reasonable price. By swiping left, you\'re telling us that you\'re\n                                        kinda into what the ad was about, but aren\'t sold enough to click it yet. We\n                                        want to make sure that if you\'re going to be advertised to, it may as well be\n                                        as useful to you as possible. We\'ll find something you like!</p>\n                                    </div>\n                                    <div style="margin-bottom: 10px;">\n                                        <div style="float: right; margin: 5px 0 0 15px; height: 30px;\n                                        padding: 5px 10px 5px 10px; border: 1px solid white; text-align: center;">\n                                            Swipe Right\n                                        </div>\n\n                                        <p style="text-align: right;">You don\'t resonate with anything about this ad,\n                                        and you know what? That\'s okay! We\'ll try to find something that does, even if\n                                        that means digging through the sofa to find it!</p>\n                                    </div>\n                                </div>';

	                // onclick event to fade in info overlay
	                $.q.addEventListener('click', function () {
	                    if ($.info.style.visibility === 'hidden') {
	                        $.info.style.opacity = 1;
	                        $.info.style.visibility = 'visible';
	                    }
	                }, false);

	                // onclick event to fade out info overlay
	                $.info.addEventListener('click', function () {
	                    if ($.info.style.visibility === 'visible') {
	                        $.info.style.opacity = 0;
	                        $.info.style.visibility = 'hidden';
	                    }
	                }, false);

	                // hammerjs
	                $.resetElement();
	            }, function (error) {
	                $.logEvent('Error: Unable to get image');
	                $.logEvent(error);
	                return false;
	            });
	        }
	    }, {
	        key: 'resetElement',
	        value: function resetElement(arg) {
	            var $ = this;

	            // I want this to swipe off-screen
	            var x, y;
	            if (arg === 'swipeleft') {
	                //$.ad.style.background = '#42d692'; // green
	                x = -$.ad.offsetWidth;
	                //updateCount('left');
	            } else if (arg === 'swiperight') {
	                //$.ad.style.background = '#d63349'; // red
	                x = $.start_x + 10 + $.ad.offsetWidth;
	                //    updateCount('right');
	            } else {
	                x = $.start_x;
	            }
	            $.transform = {
	                translate: {
	                    x: x,
	                    y: $.start_y
	                },
	                scale: 1,
	                angle: 0,
	                rx: 0,
	                ry: 0,
	                rz: 0
	            };
	            $.requestElementUpdate();
	        }
	    }, {
	        key: 'updateElementTransform',
	        value: function updateElementTransform() {
	            var $ = this;

	            var value = ['translate3d(' + $.transform.translate.x + 'px, ' + $.transform.translate.y + 'px, 0)', 'scale(' + $.transform.scale + ', ' + $.transform.scale + ')'];

	            value = value.join(' ');
	            $.ad.style.webkitTransform = value;
	            $.ad.style.mozTransform = value;
	            $.ad.style.transform = value;
	            $.ticking = false;
	        }
	    }, {
	        key: 'requestElementUpdate',
	        value: function requestElementUpdate() {
	            var $ = this;
	            if (!$.ticking) {
	                reqAnimationFrame($.updateElementTransform.bind(this));
	                $.ticking = true;
	            }
	        }
	    }, {
	        key: 'logEvent',
	        value: function logEvent(str) {
	            var $ = this;
	            if ($.config.debug) console.log(str);
	        }
	    }, {
	        key: 'onPan',
	        value: function onPan(ev) {
	            var $ = this;

	            $.transform.translate = {
	                x: $.start_x + ev.deltaX,
	                y: $.start_y
	            };

	            // if pan end, snap back if swipe is not called
	            if (ev.type === 'panend') {
	                clearTimeout($.timer);
	                $.timer = setTimeout(function () {
	                    $.resetElement();
	                }, 200);
	            }

	            $.requestElementUpdate();

	            $.logEvent(ev.type);
	        }
	    }, {
	        key: 'onSwipe',
	        value: function onSwipe(ev) {
	            var $ = this;
	            var angle = 50;

	            $.transform.ry = ev.direction & _hammer2['default'].DIRECTION_HORIZONTAL ? 1 : 0;
	            $.transform.rx = ev.direction & _hammer2['default'].DIRECTION_VERTICAL ? 1 : 0;
	            $.transform.angle = ev.direction & (_hammer2['default'].DIRECTION_RIGHT | _hammer2['default'].DIRECTION_UP) ? angle : -angle;

	            clearTimeout($.timer);
	            $.timer = setTimeout(function () {
	                $.resetElement(ev.type);
	            }, 50);
	            $.requestElementUpdate();

	            $.logEvent(ev.type);
	            $.sendAction(ev.type);
	        }
	    }, {
	        key: 'onTap',
	        value: function onTap(ev) {
	            var $ = this;

	            $.transform.scale = $.config.tapScale;

	            clearTimeout($.timer);
	            $.timer = setTimeout(function () {
	                $.resetElement();
	            }, 200);
	            $.requestElementUpdate();
	            $.logEvent(ev.type);

	            // send tap event back to server
	            $.sendAction(ev.type);
	        }
	    }, {
	        key: 'sendAction',
	        value: function sendAction(action) {
	            var $ = this;

	            // send tap event back to server
	            var update = new _utilAjaxJs2['default']();
	            update.url = $.config.endpoint + ('publications/' + $.config.asid);
	            var data = {
	                'action': action,
	                'asid': $.config.asid,
	                'impressed_user': $.config.fingerprint,
	                'ad_id': $.config.adID,
	                'campaign_id': $.config.campaignID,
	                'browser_name': $.ua.getBrowser().name,
	                'browser_version': $.ua.getBrowser().version,
	                'device_model': $.ua.getDevice().model,
	                'device_type': $.ua.getDevice().type,
	                'device_vendor': $.ua.getDevice().vendor,
	                'engine_name': $.ua.getEngine().name,
	                'engine_version': $.ua.getEngine().version,
	                'os_name': $.ua.getOS().name,
	                'os_version': $.ua.getOS().version,
	                'cpu': $.ua.getCPU().architecture,
	                'user_agent': $.ua.getUA()
	            };
	            update.post(data).then(function (response) {

	                $.remove(function () {
	                    if (action === 'tap') window.open($.config.clickURL);
	                });
	            });
	        }
	    }, {
	        key: 'remove',
	        value: function remove(callback) {
	            var $ = this;

	            // destroy hammer instance (events should unbind through garbage collection)
	            $.mc.destroy();
	            delete $.mc;

	            // now fade out $.ad, $.bg, $.q
	            // 'delete' should make browser's garbage collection remove any lingering event listeners
	            var transitionEnd = $.util.whichTransitionEvent();
	            $.ad.addEventListener(transitionEnd, function () {
	                $.ad.outerHTML = '';
	                delete $.ad;
	            }, false);

	            $.bg.addEventListener(transitionEnd, function () {
	                $.bg.outerHTML = '';
	                delete $.bg;
	            }, false);

	            $.q.addEventListener(transitionEnd, function () {
	                $.q.outerHTML = '';
	                delete $.q;
	            }, false);

	            $.ad.style.opacity = 0;
	            $.bg.style.opacity = 0;
	            $.q.style.opacity = 0;

	            // also remove info (it just didn't need to be faded out)
	            $.info.outerHTML = '';
	            delete $.info;

	            // reset config values
	            $.config.isShown = false;

	            // execute callback, if set
	            if (callback && typeof callback === 'function') {
	                callback();
	            }
	        }
	    }]);

	    return HammerAS;
	})();

	exports['default'] = HammerAS;

	// self-invoking functions cannot be apart of classes...
	var reqAnimationFrame = (function () {
	    return window[_hammer2['default'].prefixed(window, 'requestAnimationFrame')] || function (callback) {
	        window.setTimeout(callback, 1000 / 60);
	    };
	})();
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! Hammer.JS - v2.0.4 - 2014-09-28
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2014 Jorik Tangelder;
	 * Licensed under the MIT license */
	'use strict';

	(function (window, document, exportName, undefined) {
	    'use strict';

	    var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
	    var TEST_ELEMENT = document.createElement('div');

	    var TYPE_FUNCTION = 'function';

	    var round = Math.round;
	    var abs = Math.abs;
	    var now = Date.now;

	    /**
	     * set a timeout with a given scope
	     * @param {Function} fn
	     * @param {Number} timeout
	     * @param {Object} context
	     * @returns {number}
	     */
	    function setTimeoutContext(fn, timeout, context) {
	        return setTimeout(bindFn(fn, context), timeout);
	    }

	    /**
	     * if the argument is an array, we want to execute the fn on each entry
	     * if it aint an array we don't want to do a thing.
	     * this is used by all the methods that accept a single and array argument.
	     * @param {*|Array} arg
	     * @param {String} fn
	     * @param {Object} [context]
	     * @returns {Boolean}
	     */
	    function invokeArrayArg(arg, fn, context) {
	        if (Array.isArray(arg)) {
	            each(arg, context[fn], context);
	            return true;
	        }
	        return false;
	    }

	    /**
	     * walk objects and arrays
	     * @param {Object} obj
	     * @param {Function} iterator
	     * @param {Object} context
	     */
	    function each(obj, iterator, context) {
	        var i;

	        if (!obj) {
	            return;
	        }

	        if (obj.forEach) {
	            obj.forEach(iterator, context);
	        } else if (obj.length !== undefined) {
	            i = 0;
	            while (i < obj.length) {
	                iterator.call(context, obj[i], i, obj);
	                i++;
	            }
	        } else {
	            for (i in obj) {
	                obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	            }
	        }
	    }

	    /**
	     * extend object.
	     * means that properties in dest will be overwritten by the ones in src.
	     * @param {Object} dest
	     * @param {Object} src
	     * @param {Boolean} [merge]
	     * @returns {Object} dest
	     */
	    function extend(dest, src, merge) {
	        var keys = Object.keys(src);
	        var i = 0;
	        while (i < keys.length) {
	            if (!merge || merge && dest[keys[i]] === undefined) {
	                dest[keys[i]] = src[keys[i]];
	            }
	            i++;
	        }
	        return dest;
	    }

	    /**
	     * merge the values from src in the dest.
	     * means that properties that exist in dest will not be overwritten by src
	     * @param {Object} dest
	     * @param {Object} src
	     * @returns {Object} dest
	     */
	    function merge(dest, src) {
	        return extend(dest, src, true);
	    }

	    /**
	     * simple class inheritance
	     * @param {Function} child
	     * @param {Function} base
	     * @param {Object} [properties]
	     */
	    function inherit(child, base, properties) {
	        var baseP = base.prototype,
	            childP;

	        childP = child.prototype = Object.create(baseP);
	        childP.constructor = child;
	        childP._super = baseP;

	        if (properties) {
	            extend(childP, properties);
	        }
	    }

	    /**
	     * simple function bind
	     * @param {Function} fn
	     * @param {Object} context
	     * @returns {Function}
	     */
	    function bindFn(fn, context) {
	        return function boundFn() {
	            return fn.apply(context, arguments);
	        };
	    }

	    /**
	     * let a boolean value also be a function that must return a boolean
	     * this first item in args will be used as the context
	     * @param {Boolean|Function} val
	     * @param {Array} [args]
	     * @returns {Boolean}
	     */
	    function boolOrFn(val, args) {
	        if (typeof val == TYPE_FUNCTION) {
	            return val.apply(args ? args[0] || undefined : undefined, args);
	        }
	        return val;
	    }

	    /**
	     * use the val2 when val1 is undefined
	     * @param {*} val1
	     * @param {*} val2
	     * @returns {*}
	     */
	    function ifUndefined(val1, val2) {
	        return val1 === undefined ? val2 : val1;
	    }

	    /**
	     * addEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */
	    function addEventListeners(target, types, handler) {
	        each(splitStr(types), function (type) {
	            target.addEventListener(type, handler, false);
	        });
	    }

	    /**
	     * removeEventListener with multiple events at once
	     * @param {EventTarget} target
	     * @param {String} types
	     * @param {Function} handler
	     */
	    function removeEventListeners(target, types, handler) {
	        each(splitStr(types), function (type) {
	            target.removeEventListener(type, handler, false);
	        });
	    }

	    /**
	     * find if a node is in the given parent
	     * @method hasParent
	     * @param {HTMLElement} node
	     * @param {HTMLElement} parent
	     * @return {Boolean} found
	     */
	    function hasParent(node, parent) {
	        while (node) {
	            if (node == parent) {
	                return true;
	            }
	            node = node.parentNode;
	        }
	        return false;
	    }

	    /**
	     * small indexOf wrapper
	     * @param {String} str
	     * @param {String} find
	     * @returns {Boolean} found
	     */
	    function inStr(str, find) {
	        return str.indexOf(find) > -1;
	    }

	    /**
	     * split string on whitespace
	     * @param {String} str
	     * @returns {Array} words
	     */
	    function splitStr(str) {
	        return str.trim().split(/\s+/g);
	    }

	    /**
	     * find if a array contains the object using indexOf or a simple polyFill
	     * @param {Array} src
	     * @param {String} find
	     * @param {String} [findByKey]
	     * @return {Boolean|Number} false when not found, or the index
	     */
	    function inArray(src, find, findByKey) {
	        if (src.indexOf && !findByKey) {
	            return src.indexOf(find);
	        } else {
	            var i = 0;
	            while (i < src.length) {
	                if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
	                    return i;
	                }
	                i++;
	            }
	            return -1;
	        }
	    }

	    /**
	     * convert array-like objects to real arrays
	     * @param {Object} obj
	     * @returns {Array}
	     */
	    function toArray(obj) {
	        return Array.prototype.slice.call(obj, 0);
	    }

	    /**
	     * unique array with objects based on a key (like 'id') or just by the array's value
	     * @param {Array} src [{id:1},{id:2},{id:1}]
	     * @param {String} [key]
	     * @param {Boolean} [sort=False]
	     * @returns {Array} [{id:1},{id:2}]
	     */
	    function uniqueArray(src, key, sort) {
	        var results = [];
	        var values = [];
	        var i = 0;

	        while (i < src.length) {
	            var val = key ? src[i][key] : src[i];
	            if (inArray(values, val) < 0) {
	                results.push(src[i]);
	            }
	            values[i] = val;
	            i++;
	        }

	        if (sort) {
	            if (!key) {
	                results = results.sort();
	            } else {
	                results = results.sort(function sortUniqueArray(a, b) {
	                    return a[key] > b[key];
	                });
	            }
	        }

	        return results;
	    }

	    /**
	     * get the prefixed property
	     * @param {Object} obj
	     * @param {String} property
	     * @returns {String|Undefined} prefixed
	     */
	    function prefixed(obj, property) {
	        var prefix, prop;
	        var camelProp = property[0].toUpperCase() + property.slice(1);

	        var i = 0;
	        while (i < VENDOR_PREFIXES.length) {
	            prefix = VENDOR_PREFIXES[i];
	            prop = prefix ? prefix + camelProp : property;

	            if (prop in obj) {
	                return prop;
	            }
	            i++;
	        }
	        return undefined;
	    }

	    /**
	     * get a unique id
	     * @returns {number} uniqueId
	     */
	    var _uniqueId = 1;
	    function uniqueId() {
	        return _uniqueId++;
	    }

	    /**
	     * get the window object of an element
	     * @param {HTMLElement} element
	     * @returns {DocumentView|Window}
	     */
	    function getWindowForElement(element) {
	        var doc = element.ownerDocument;
	        return doc.defaultView || doc.parentWindow;
	    }

	    var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	    var SUPPORT_TOUCH = ('ontouchstart' in window);
	    var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	    var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	    var INPUT_TYPE_TOUCH = 'touch';
	    var INPUT_TYPE_PEN = 'pen';
	    var INPUT_TYPE_MOUSE = 'mouse';
	    var INPUT_TYPE_KINECT = 'kinect';

	    var COMPUTE_INTERVAL = 25;

	    var INPUT_START = 1;
	    var INPUT_MOVE = 2;
	    var INPUT_END = 4;
	    var INPUT_CANCEL = 8;

	    var DIRECTION_NONE = 1;
	    var DIRECTION_LEFT = 2;
	    var DIRECTION_RIGHT = 4;
	    var DIRECTION_UP = 8;
	    var DIRECTION_DOWN = 16;

	    var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	    var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	    var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	    var PROPS_XY = ['x', 'y'];
	    var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	    /**
	     * create new input type manager
	     * @param {Manager} manager
	     * @param {Function} callback
	     * @returns {Input}
	     * @constructor
	     */
	    function Input(manager, callback) {
	        var self = this;
	        this.manager = manager;
	        this.callback = callback;
	        this.element = manager.element;
	        this.target = manager.options.inputTarget;

	        // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	        // so when disabled the input events are completely bypassed.
	        this.domHandler = function (ev) {
	            if (boolOrFn(manager.options.enable, [manager])) {
	                self.handler(ev);
	            }
	        };

	        this.init();
	    }

	    Input.prototype = {
	        /**
	         * should handle the inputEvent data and trigger the callback
	         * @virtual
	         */
	        handler: function handler() {},

	        /**
	         * bind the events
	         */
	        init: function init() {
	            this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	            this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	            this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	        },

	        /**
	         * unbind the events
	         */
	        destroy: function destroy() {
	            this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	            this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	            this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	        }
	    };

	    /**
	     * create new input type manager
	     * called by the Manager constructor
	     * @param {Hammer} manager
	     * @returns {Input}
	     */
	    function createInputInstance(manager) {
	        var Type;
	        var inputClass = manager.options.inputClass;

	        if (inputClass) {
	            Type = inputClass;
	        } else if (SUPPORT_POINTER_EVENTS) {
	            Type = PointerEventInput;
	        } else if (SUPPORT_ONLY_TOUCH) {
	            Type = TouchInput;
	        } else if (!SUPPORT_TOUCH) {
	            Type = MouseInput;
	        } else {
	            Type = TouchMouseInput;
	        }
	        return new Type(manager, inputHandler);
	    }

	    /**
	     * handle input events
	     * @param {Manager} manager
	     * @param {String} eventType
	     * @param {Object} input
	     */
	    function inputHandler(manager, eventType, input) {
	        var pointersLen = input.pointers.length;
	        var changedPointersLen = input.changedPointers.length;
	        var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
	        var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;

	        input.isFirst = !!isFirst;
	        input.isFinal = !!isFinal;

	        if (isFirst) {
	            manager.session = {};
	        }

	        // source event is the normalized value of the domEvents
	        // like 'touchstart, mouseup, pointerdown'
	        input.eventType = eventType;

	        // compute scale, rotation etc
	        computeInputData(manager, input);

	        // emit secret event
	        manager.emit('hammer.input', input);

	        manager.recognize(input);
	        manager.session.prevInput = input;
	    }

	    /**
	     * extend the data with some usable properties like scale, rotate, velocity etc
	     * @param {Object} manager
	     * @param {Object} input
	     */
	    function computeInputData(manager, input) {
	        var session = manager.session;
	        var pointers = input.pointers;
	        var pointersLength = pointers.length;

	        // store the first input to calculate the distance and direction
	        if (!session.firstInput) {
	            session.firstInput = simpleCloneInputData(input);
	        }

	        // to compute scale and rotation we need to store the multiple touches
	        if (pointersLength > 1 && !session.firstMultiple) {
	            session.firstMultiple = simpleCloneInputData(input);
	        } else if (pointersLength === 1) {
	            session.firstMultiple = false;
	        }

	        var firstInput = session.firstInput;
	        var firstMultiple = session.firstMultiple;
	        var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	        var center = input.center = getCenter(pointers);
	        input.timeStamp = now();
	        input.deltaTime = input.timeStamp - firstInput.timeStamp;

	        input.angle = getAngle(offsetCenter, center);
	        input.distance = getDistance(offsetCenter, center);

	        computeDeltaXY(session, input);
	        input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	        input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	        input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	        computeIntervalInputData(session, input);

	        // find the correct target
	        var target = manager.element;
	        if (hasParent(input.srcEvent.target, target)) {
	            target = input.srcEvent.target;
	        }
	        input.target = target;
	    }

	    function computeDeltaXY(session, input) {
	        var center = input.center;
	        var offset = session.offsetDelta || {};
	        var prevDelta = session.prevDelta || {};
	        var prevInput = session.prevInput || {};

	        if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	            prevDelta = session.prevDelta = {
	                x: prevInput.deltaX || 0,
	                y: prevInput.deltaY || 0
	            };

	            offset = session.offsetDelta = {
	                x: center.x,
	                y: center.y
	            };
	        }

	        input.deltaX = prevDelta.x + (center.x - offset.x);
	        input.deltaY = prevDelta.y + (center.y - offset.y);
	    }

	    /**
	     * velocity is calculated every x ms
	     * @param {Object} session
	     * @param {Object} input
	     */
	    function computeIntervalInputData(session, input) {
	        var last = session.lastInterval || input,
	            deltaTime = input.timeStamp - last.timeStamp,
	            velocity,
	            velocityX,
	            velocityY,
	            direction;

	        if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	            var deltaX = last.deltaX - input.deltaX;
	            var deltaY = last.deltaY - input.deltaY;

	            var v = getVelocity(deltaTime, deltaX, deltaY);
	            velocityX = v.x;
	            velocityY = v.y;
	            velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
	            direction = getDirection(deltaX, deltaY);

	            session.lastInterval = input;
	        } else {
	            // use latest velocity info if it doesn't overtake a minimum period
	            velocity = last.velocity;
	            velocityX = last.velocityX;
	            velocityY = last.velocityY;
	            direction = last.direction;
	        }

	        input.velocity = velocity;
	        input.velocityX = velocityX;
	        input.velocityY = velocityY;
	        input.direction = direction;
	    }

	    /**
	     * create a simple clone from the input used for storage of firstInput and firstMultiple
	     * @param {Object} input
	     * @returns {Object} clonedInputData
	     */
	    function simpleCloneInputData(input) {
	        // make a simple copy of the pointers because we will get a reference if we don't
	        // we only need clientXY for the calculations
	        var pointers = [];
	        var i = 0;
	        while (i < input.pointers.length) {
	            pointers[i] = {
	                clientX: round(input.pointers[i].clientX),
	                clientY: round(input.pointers[i].clientY)
	            };
	            i++;
	        }

	        return {
	            timeStamp: now(),
	            pointers: pointers,
	            center: getCenter(pointers),
	            deltaX: input.deltaX,
	            deltaY: input.deltaY
	        };
	    }

	    /**
	     * get the center of all the pointers
	     * @param {Array} pointers
	     * @return {Object} center contains `x` and `y` properties
	     */
	    function getCenter(pointers) {
	        var pointersLength = pointers.length;

	        // no need to loop when only one touch
	        if (pointersLength === 1) {
	            return {
	                x: round(pointers[0].clientX),
	                y: round(pointers[0].clientY)
	            };
	        }

	        var x = 0,
	            y = 0,
	            i = 0;
	        while (i < pointersLength) {
	            x += pointers[i].clientX;
	            y += pointers[i].clientY;
	            i++;
	        }

	        return {
	            x: round(x / pointersLength),
	            y: round(y / pointersLength)
	        };
	    }

	    /**
	     * calculate the velocity between two points. unit is in px per ms.
	     * @param {Number} deltaTime
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Object} velocity `x` and `y`
	     */
	    function getVelocity(deltaTime, x, y) {
	        return {
	            x: x / deltaTime || 0,
	            y: y / deltaTime || 0
	        };
	    }

	    /**
	     * get the direction between two points
	     * @param {Number} x
	     * @param {Number} y
	     * @return {Number} direction
	     */
	    function getDirection(x, y) {
	        if (x === y) {
	            return DIRECTION_NONE;
	        }

	        if (abs(x) >= abs(y)) {
	            return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	        }
	        return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
	    }

	    /**
	     * calculate the absolute distance between two points
	     * @param {Object} p1 {x, y}
	     * @param {Object} p2 {x, y}
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} distance
	     */
	    function getDistance(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]],
	            y = p2[props[1]] - p1[props[1]];

	        return Math.sqrt(x * x + y * y);
	    }

	    /**
	     * calculate the angle between two coordinates
	     * @param {Object} p1
	     * @param {Object} p2
	     * @param {Array} [props] containing x and y keys
	     * @return {Number} angle
	     */
	    function getAngle(p1, p2, props) {
	        if (!props) {
	            props = PROPS_XY;
	        }
	        var x = p2[props[0]] - p1[props[0]],
	            y = p2[props[1]] - p1[props[1]];
	        return Math.atan2(y, x) * 180 / Math.PI;
	    }

	    /**
	     * calculate the rotation degrees between two pointersets
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} rotation
	     */
	    function getRotation(start, end) {
	        return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
	    }

	    /**
	     * calculate the scale factor between two pointersets
	     * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	     * @param {Array} start array of pointers
	     * @param {Array} end array of pointers
	     * @return {Number} scale
	     */
	    function getScale(start, end) {
	        return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	    }

	    var MOUSE_INPUT_MAP = {
	        mousedown: INPUT_START,
	        mousemove: INPUT_MOVE,
	        mouseup: INPUT_END
	    };

	    var MOUSE_ELEMENT_EVENTS = 'mousedown';
	    var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	    /**
	     * Mouse events input
	     * @constructor
	     * @extends Input
	     */
	    function MouseInput() {
	        this.evEl = MOUSE_ELEMENT_EVENTS;
	        this.evWin = MOUSE_WINDOW_EVENTS;

	        this.allow = true; // used by Input.TouchMouse to disable mouse events
	        this.pressed = false; // mousedown state

	        Input.apply(this, arguments);
	    }

	    inherit(MouseInput, Input, {
	        /**
	         * handle mouse events
	         * @param {Object} ev
	         */
	        handler: function MEhandler(ev) {
	            var eventType = MOUSE_INPUT_MAP[ev.type];

	            // on start we want to have the left mouse button down
	            if (eventType & INPUT_START && ev.button === 0) {
	                this.pressed = true;
	            }

	            if (eventType & INPUT_MOVE && ev.which !== 1) {
	                eventType = INPUT_END;
	            }

	            // mouse must be down, and mouse events are allowed (see the TouchMouse input)
	            if (!this.pressed || !this.allow) {
	                return;
	            }

	            if (eventType & INPUT_END) {
	                this.pressed = false;
	            }

	            this.callback(this.manager, eventType, {
	                pointers: [ev],
	                changedPointers: [ev],
	                pointerType: INPUT_TYPE_MOUSE,
	                srcEvent: ev
	            });
	        }
	    });

	    var POINTER_INPUT_MAP = {
	        pointerdown: INPUT_START,
	        pointermove: INPUT_MOVE,
	        pointerup: INPUT_END,
	        pointercancel: INPUT_CANCEL,
	        pointerout: INPUT_CANCEL
	    };

	    // in IE10 the pointer types is defined as an enum
	    var IE10_POINTER_TYPE_ENUM = {
	        2: INPUT_TYPE_TOUCH,
	        3: INPUT_TYPE_PEN,
	        4: INPUT_TYPE_MOUSE,
	        5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	    };

	    var POINTER_ELEMENT_EVENTS = 'pointerdown';
	    var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	    // IE10 has prefixed support, and case-sensitive
	    if (window.MSPointerEvent) {
	        POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	        POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	    }

	    /**
	     * Pointer events input
	     * @constructor
	     * @extends Input
	     */
	    function PointerEventInput() {
	        this.evEl = POINTER_ELEMENT_EVENTS;
	        this.evWin = POINTER_WINDOW_EVENTS;

	        Input.apply(this, arguments);

	        this.store = this.manager.session.pointerEvents = [];
	    }

	    inherit(PointerEventInput, Input, {
	        /**
	         * handle mouse events
	         * @param {Object} ev
	         */
	        handler: function PEhandler(ev) {
	            var store = this.store;
	            var removePointer = false;

	            var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	            var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	            var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	            var isTouch = pointerType == INPUT_TYPE_TOUCH;

	            // get index of the event in the store
	            var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	            // start and mouse must be down
	            if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	                if (storeIndex < 0) {
	                    store.push(ev);
	                    storeIndex = store.length - 1;
	                }
	            } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	                removePointer = true;
	            }

	            // it not found, so the pointer hasn't been down (so it's probably a hover)
	            if (storeIndex < 0) {
	                return;
	            }

	            // update the event in the store
	            store[storeIndex] = ev;

	            this.callback(this.manager, eventType, {
	                pointers: store,
	                changedPointers: [ev],
	                pointerType: pointerType,
	                srcEvent: ev
	            });

	            if (removePointer) {
	                // remove from the store
	                store.splice(storeIndex, 1);
	            }
	        }
	    });

	    var SINGLE_TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };

	    var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	    var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	    /**
	     * Touch events input
	     * @constructor
	     * @extends Input
	     */
	    function SingleTouchInput() {
	        this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	        this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	        this.started = false;

	        Input.apply(this, arguments);
	    }

	    inherit(SingleTouchInput, Input, {
	        handler: function TEhandler(ev) {
	            var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	            // should we handle the touch events?
	            if (type === INPUT_START) {
	                this.started = true;
	            }

	            if (!this.started) {
	                return;
	            }

	            var touches = normalizeSingleTouches.call(this, ev, type);

	            // when done, reset the started state
	            if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	                this.started = false;
	            }

	            this.callback(this.manager, type, {
	                pointers: touches[0],
	                changedPointers: touches[1],
	                pointerType: INPUT_TYPE_TOUCH,
	                srcEvent: ev
	            });
	        }
	    });

	    /**
	     * @this {TouchInput}
	     * @param {Object} ev
	     * @param {Number} type flag
	     * @returns {undefined|Array} [all, changed]
	     */
	    function normalizeSingleTouches(ev, type) {
	        var all = toArray(ev.touches);
	        var changed = toArray(ev.changedTouches);

	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            all = uniqueArray(all.concat(changed), 'identifier', true);
	        }

	        return [all, changed];
	    }

	    var TOUCH_INPUT_MAP = {
	        touchstart: INPUT_START,
	        touchmove: INPUT_MOVE,
	        touchend: INPUT_END,
	        touchcancel: INPUT_CANCEL
	    };

	    var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	    /**
	     * Multi-user touch events input
	     * @constructor
	     * @extends Input
	     */
	    function TouchInput() {
	        this.evTarget = TOUCH_TARGET_EVENTS;
	        this.targetIds = {};

	        Input.apply(this, arguments);
	    }

	    inherit(TouchInput, Input, {
	        handler: function MTEhandler(ev) {
	            var type = TOUCH_INPUT_MAP[ev.type];
	            var touches = getTouches.call(this, ev, type);
	            if (!touches) {
	                return;
	            }

	            this.callback(this.manager, type, {
	                pointers: touches[0],
	                changedPointers: touches[1],
	                pointerType: INPUT_TYPE_TOUCH,
	                srcEvent: ev
	            });
	        }
	    });

	    /**
	     * @this {TouchInput}
	     * @param {Object} ev
	     * @param {Number} type flag
	     * @returns {undefined|Array} [all, changed]
	     */
	    function getTouches(ev, type) {
	        var allTouches = toArray(ev.touches);
	        var targetIds = this.targetIds;

	        // when there is only one touch, the process can be simplified
	        if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	            targetIds[allTouches[0].identifier] = true;
	            return [allTouches, allTouches];
	        }

	        var i,
	            targetTouches,
	            changedTouches = toArray(ev.changedTouches),
	            changedTargetTouches = [],
	            target = this.target;

	        // get target touches from touches
	        targetTouches = allTouches.filter(function (touch) {
	            return hasParent(touch.target, target);
	        });

	        // collect touches
	        if (type === INPUT_START) {
	            i = 0;
	            while (i < targetTouches.length) {
	                targetIds[targetTouches[i].identifier] = true;
	                i++;
	            }
	        }

	        // filter changed touches to only contain touches that exist in the collected target ids
	        i = 0;
	        while (i < changedTouches.length) {
	            if (targetIds[changedTouches[i].identifier]) {
	                changedTargetTouches.push(changedTouches[i]);
	            }

	            // cleanup removed touches
	            if (type & (INPUT_END | INPUT_CANCEL)) {
	                delete targetIds[changedTouches[i].identifier];
	            }
	            i++;
	        }

	        if (!changedTargetTouches.length) {
	            return;
	        }

	        return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
	    }

	    /**
	     * Combined touch and mouse input
	     *
	     * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	     * This because touch devices also emit mouse events while doing a touch.
	     *
	     * @constructor
	     * @extends Input
	     */
	    function TouchMouseInput() {
	        Input.apply(this, arguments);

	        var handler = bindFn(this.handler, this);
	        this.touch = new TouchInput(this.manager, handler);
	        this.mouse = new MouseInput(this.manager, handler);
	    }

	    inherit(TouchMouseInput, Input, {
	        /**
	         * handle mouse and touch events
	         * @param {Hammer} manager
	         * @param {String} inputEvent
	         * @param {Object} inputData
	         */
	        handler: function TMEhandler(manager, inputEvent, inputData) {
	            var isTouch = inputData.pointerType == INPUT_TYPE_TOUCH,
	                isMouse = inputData.pointerType == INPUT_TYPE_MOUSE;

	            // when we're in a touch event, so  block all upcoming mouse events
	            // most mobile browser also emit mouseevents, right after touchstart
	            if (isTouch) {
	                this.mouse.allow = false;
	            } else if (isMouse && !this.mouse.allow) {
	                return;
	            }

	            // reset the allowMouse when we're done
	            if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
	                this.mouse.allow = true;
	            }

	            this.callback(manager, inputEvent, inputData);
	        },

	        /**
	         * remove the event listeners
	         */
	        destroy: function destroy() {
	            this.touch.destroy();
	            this.mouse.destroy();
	        }
	    });

	    var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	    var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	    // magical touchAction value
	    var TOUCH_ACTION_COMPUTE = 'compute';
	    var TOUCH_ACTION_AUTO = 'auto';
	    var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	    var TOUCH_ACTION_NONE = 'none';
	    var TOUCH_ACTION_PAN_X = 'pan-x';
	    var TOUCH_ACTION_PAN_Y = 'pan-y';

	    /**
	     * Touch Action
	     * sets the touchAction property or uses the js alternative
	     * @param {Manager} manager
	     * @param {String} value
	     * @constructor
	     */
	    function TouchAction(manager, value) {
	        this.manager = manager;
	        this.set(value);
	    }

	    TouchAction.prototype = {
	        /**
	         * set the touchAction value on the element or enable the polyfill
	         * @param {String} value
	         */
	        set: function set(value) {
	            // find out the touch-action by the event handlers
	            if (value == TOUCH_ACTION_COMPUTE) {
	                value = this.compute();
	            }

	            if (NATIVE_TOUCH_ACTION) {
	                this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	            }
	            this.actions = value.toLowerCase().trim();
	        },

	        /**
	         * just re-set the touchAction value
	         */
	        update: function update() {
	            this.set(this.manager.options.touchAction);
	        },

	        /**
	         * compute the value for the touchAction property based on the recognizer's settings
	         * @returns {String} value
	         */
	        compute: function compute() {
	            var actions = [];
	            each(this.manager.recognizers, function (recognizer) {
	                if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                    actions = actions.concat(recognizer.getTouchAction());
	                }
	            });
	            return cleanTouchActions(actions.join(' '));
	        },

	        /**
	         * this method is called on each input cycle and provides the preventing of the browser behavior
	         * @param {Object} input
	         */
	        preventDefaults: function preventDefaults(input) {
	            // not needed with native support for the touchAction property
	            if (NATIVE_TOUCH_ACTION) {
	                return;
	            }

	            var srcEvent = input.srcEvent;
	            var direction = input.offsetDirection;

	            // if the touch action did prevented once this session
	            if (this.manager.session.prevented) {
	                srcEvent.preventDefault();
	                return;
	            }

	            var actions = this.actions;
	            var hasNone = inStr(actions, TOUCH_ACTION_NONE);
	            var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
	            var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

	            if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
	                return this.preventSrc(srcEvent);
	            }
	        },

	        /**
	         * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	         * @param {Object} srcEvent
	         */
	        preventSrc: function preventSrc(srcEvent) {
	            this.manager.session.prevented = true;
	            srcEvent.preventDefault();
	        }
	    };

	    /**
	     * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	     * @param {String} actions
	     * @returns {*}
	     */
	    function cleanTouchActions(actions) {
	        // none
	        if (inStr(actions, TOUCH_ACTION_NONE)) {
	            return TOUCH_ACTION_NONE;
	        }

	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	        // pan-x and pan-y can be combined
	        if (hasPanX && hasPanY) {
	            return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
	        }

	        // pan-x OR pan-y
	        if (hasPanX || hasPanY) {
	            return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	        }

	        // manipulation
	        if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	            return TOUCH_ACTION_MANIPULATION;
	        }

	        return TOUCH_ACTION_AUTO;
	    }

	    /**
	     * Recognizer flow explained; *
	     * All recognizers have the initial state of POSSIBLE when a input session starts.
	     * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	     * Example session for mouse-input: mousedown -> mousemove -> mouseup
	     *
	     * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	     * which determines with state it should be.
	     *
	     * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	     * POSSIBLE to give it another change on the next cycle.
	     *
	     *               Possible
	     *                  |
	     *            +-----+---------------+
	     *            |                     |
	     *      +-----+-----+               |
	     *      |           |               |
	     *   Failed      Cancelled          |
	     *                          +-------+------+
	     *                          |              |
	     *                      Recognized       Began
	     *                                         |
	     *                                      Changed
	     *                                         |
	     *                                  Ended/Recognized
	     */
	    var STATE_POSSIBLE = 1;
	    var STATE_BEGAN = 2;
	    var STATE_CHANGED = 4;
	    var STATE_ENDED = 8;
	    var STATE_RECOGNIZED = STATE_ENDED;
	    var STATE_CANCELLED = 16;
	    var STATE_FAILED = 32;

	    /**
	     * Recognizer
	     * Every recognizer needs to extend from this class.
	     * @constructor
	     * @param {Object} options
	     */
	    function Recognizer(options) {
	        this.id = uniqueId();

	        this.manager = null;
	        this.options = merge(options || {}, this.defaults);

	        // default is enable true
	        this.options.enable = ifUndefined(this.options.enable, true);

	        this.state = STATE_POSSIBLE;

	        this.simultaneous = {};
	        this.requireFail = [];
	    }

	    Recognizer.prototype = {
	        /**
	         * @virtual
	         * @type {Object}
	         */
	        defaults: {},

	        /**
	         * set options
	         * @param {Object} options
	         * @return {Recognizer}
	         */
	        set: function set(options) {
	            extend(this.options, options);

	            // also update the touchAction, in case something changed about the directions/enabled state
	            this.manager && this.manager.touchAction.update();
	            return this;
	        },

	        /**
	         * recognize simultaneous with an other recognizer.
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        recognizeWith: function recognizeWith(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	                return this;
	            }

	            var simultaneous = this.simultaneous;
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            if (!simultaneous[otherRecognizer.id]) {
	                simultaneous[otherRecognizer.id] = otherRecognizer;
	                otherRecognizer.recognizeWith(this);
	            }
	            return this;
	        },

	        /**
	         * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        dropRecognizeWith: function dropRecognizeWith(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	                return this;
	            }

	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            delete this.simultaneous[otherRecognizer.id];
	            return this;
	        },

	        /**
	         * recognizer can only run when an other is failing
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        requireFailure: function requireFailure(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	                return this;
	            }

	            var requireFail = this.requireFail;
	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            if (inArray(requireFail, otherRecognizer) === -1) {
	                requireFail.push(otherRecognizer);
	                otherRecognizer.requireFailure(this);
	            }
	            return this;
	        },

	        /**
	         * drop the requireFailure link. it does not remove the link on the other recognizer.
	         * @param {Recognizer} otherRecognizer
	         * @returns {Recognizer} this
	         */
	        dropRequireFailure: function dropRequireFailure(otherRecognizer) {
	            if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	                return this;
	            }

	            otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	            var index = inArray(this.requireFail, otherRecognizer);
	            if (index > -1) {
	                this.requireFail.splice(index, 1);
	            }
	            return this;
	        },

	        /**
	         * has require failures boolean
	         * @returns {boolean}
	         */
	        hasRequireFailures: function hasRequireFailures() {
	            return this.requireFail.length > 0;
	        },

	        /**
	         * if the recognizer can recognize simultaneous with an other recognizer
	         * @param {Recognizer} otherRecognizer
	         * @returns {Boolean}
	         */
	        canRecognizeWith: function canRecognizeWith(otherRecognizer) {
	            return !!this.simultaneous[otherRecognizer.id];
	        },

	        /**
	         * You should use `tryEmit` instead of `emit` directly to check
	         * that all the needed recognizers has failed before emitting.
	         * @param {Object} input
	         */
	        emit: function emit(input) {
	            var self = this;
	            var state = this.state;

	            function emit(withState) {
	                self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
	            }

	            // 'panstart' and 'panmove'
	            if (state < STATE_ENDED) {
	                emit(true);
	            }

	            emit(); // simple 'eventName' events

	            // panend and pancancel
	            if (state >= STATE_ENDED) {
	                emit(true);
	            }
	        },

	        /**
	         * Check that all the require failure recognizers has failed,
	         * if true, it emits a gesture event,
	         * otherwise, setup the state to FAILED.
	         * @param {Object} input
	         */
	        tryEmit: function tryEmit(input) {
	            if (this.canEmit()) {
	                return this.emit(input);
	            }
	            // it's failing anyway
	            this.state = STATE_FAILED;
	        },

	        /**
	         * can we emit?
	         * @returns {boolean}
	         */
	        canEmit: function canEmit() {
	            var i = 0;
	            while (i < this.requireFail.length) {
	                if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                    return false;
	                }
	                i++;
	            }
	            return true;
	        },

	        /**
	         * update the recognizer
	         * @param {Object} inputData
	         */
	        recognize: function recognize(inputData) {
	            // make a new copy of the inputData
	            // so we can change the inputData without messing up the other recognizers
	            var inputDataClone = extend({}, inputData);

	            // is is enabled and allow recognizing?
	            if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	                this.reset();
	                this.state = STATE_FAILED;
	                return;
	            }

	            // reset when we've reached the end
	            if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	                this.state = STATE_POSSIBLE;
	            }

	            this.state = this.process(inputDataClone);

	            // the recognizer has recognized a gesture
	            // so trigger an event
	            if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	                this.tryEmit(inputDataClone);
	            }
	        },

	        /**
	         * return the state of the recognizer
	         * the actual recognizing happens in this method
	         * @virtual
	         * @param {Object} inputData
	         * @returns {Const} STATE
	         */
	        process: function process(inputData) {}, // jshint ignore:line

	        /**
	         * return the preferred touch-action
	         * @virtual
	         * @returns {Array}
	         */
	        getTouchAction: function getTouchAction() {},

	        /**
	         * called when the gesture isn't allowed to recognize
	         * like when another is being recognized or it is disabled
	         * @virtual
	         */
	        reset: function reset() {}
	    };

	    /**
	     * get a usable string, used as event postfix
	     * @param {Const} state
	     * @returns {String} state
	     */
	    function stateStr(state) {
	        if (state & STATE_CANCELLED) {
	            return 'cancel';
	        } else if (state & STATE_ENDED) {
	            return 'end';
	        } else if (state & STATE_CHANGED) {
	            return 'move';
	        } else if (state & STATE_BEGAN) {
	            return 'start';
	        }
	        return '';
	    }

	    /**
	     * direction cons to string
	     * @param {Const} direction
	     * @returns {String}
	     */
	    function directionStr(direction) {
	        if (direction == DIRECTION_DOWN) {
	            return 'down';
	        } else if (direction == DIRECTION_UP) {
	            return 'up';
	        } else if (direction == DIRECTION_LEFT) {
	            return 'left';
	        } else if (direction == DIRECTION_RIGHT) {
	            return 'right';
	        }
	        return '';
	    }

	    /**
	     * get a recognizer by name if it is bound to a manager
	     * @param {Recognizer|String} otherRecognizer
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer}
	     */
	    function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	        var manager = recognizer.manager;
	        if (manager) {
	            return manager.get(otherRecognizer);
	        }
	        return otherRecognizer;
	    }

	    /**
	     * This recognizer is just used as a base for the simple attribute recognizers.
	     * @constructor
	     * @extends Recognizer
	     */
	    function AttrRecognizer() {
	        Recognizer.apply(this, arguments);
	    }

	    inherit(AttrRecognizer, Recognizer, {
	        /**
	         * @namespace
	         * @memberof AttrRecognizer
	         */
	        defaults: {
	            /**
	             * @type {Number}
	             * @default 1
	             */
	            pointers: 1
	        },

	        /**
	         * Used to check if it the recognizer receives valid input, like input.distance > 10.
	         * @memberof AttrRecognizer
	         * @param {Object} input
	         * @returns {Boolean} recognized
	         */
	        attrTest: function attrTest(input) {
	            var optionPointers = this.options.pointers;
	            return optionPointers === 0 || input.pointers.length === optionPointers;
	        },

	        /**
	         * Process the input and return the state for the recognizer
	         * @memberof AttrRecognizer
	         * @param {Object} input
	         * @returns {*} State
	         */
	        process: function process(input) {
	            var state = this.state;
	            var eventType = input.eventType;

	            var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	            var isValid = this.attrTest(input);

	            // on cancel input and we've recognized before, return STATE_CANCELLED
	            if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	                return state | STATE_CANCELLED;
	            } else if (isRecognized || isValid) {
	                if (eventType & INPUT_END) {
	                    return state | STATE_ENDED;
	                } else if (!(state & STATE_BEGAN)) {
	                    return STATE_BEGAN;
	                }
	                return state | STATE_CHANGED;
	            }
	            return STATE_FAILED;
	        }
	    });

	    /**
	     * Pan
	     * Recognized when the pointer is down and moved in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function PanRecognizer() {
	        AttrRecognizer.apply(this, arguments);

	        this.pX = null;
	        this.pY = null;
	    }

	    inherit(PanRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof PanRecognizer
	         */
	        defaults: {
	            event: 'pan',
	            threshold: 10,
	            pointers: 1,
	            direction: DIRECTION_ALL
	        },

	        getTouchAction: function getTouchAction() {
	            var direction = this.options.direction;
	            var actions = [];
	            if (direction & DIRECTION_HORIZONTAL) {
	                actions.push(TOUCH_ACTION_PAN_Y);
	            }
	            if (direction & DIRECTION_VERTICAL) {
	                actions.push(TOUCH_ACTION_PAN_X);
	            }
	            return actions;
	        },

	        directionTest: function directionTest(input) {
	            var options = this.options;
	            var hasMoved = true;
	            var distance = input.distance;
	            var direction = input.direction;
	            var x = input.deltaX;
	            var y = input.deltaY;

	            // lock to axis?
	            if (!(direction & options.direction)) {
	                if (options.direction & DIRECTION_HORIZONTAL) {
	                    direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                    hasMoved = x != this.pX;
	                    distance = Math.abs(input.deltaX);
	                } else {
	                    direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	                    hasMoved = y != this.pY;
	                    distance = Math.abs(input.deltaY);
	                }
	            }
	            input.direction = direction;
	            return hasMoved && distance > options.threshold && direction & options.direction;
	        },

	        attrTest: function attrTest(input) {
	            return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
	        },

	        emit: function emit(input) {
	            this.pX = input.deltaX;
	            this.pY = input.deltaY;

	            var direction = directionStr(input.direction);
	            if (direction) {
	                this.manager.emit(this.options.event + direction, input);
	            }

	            this._super.emit.call(this, input);
	        }
	    });

	    /**
	     * Pinch
	     * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function PinchRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }

	    inherit(PinchRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof PinchRecognizer
	         */
	        defaults: {
	            event: 'pinch',
	            threshold: 0,
	            pointers: 2
	        },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_NONE];
	        },

	        attrTest: function attrTest(input) {
	            return this._super.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	        },

	        emit: function emit(input) {
	            this._super.emit.call(this, input);
	            if (input.scale !== 1) {
	                var inOut = input.scale < 1 ? 'in' : 'out';
	                this.manager.emit(this.options.event + inOut, input);
	            }
	        }
	    });

	    /**
	     * Press
	     * Recognized when the pointer is down for x ms without any movement.
	     * @constructor
	     * @extends Recognizer
	     */
	    function PressRecognizer() {
	        Recognizer.apply(this, arguments);

	        this._timer = null;
	        this._input = null;
	    }

	    inherit(PressRecognizer, Recognizer, {
	        /**
	         * @namespace
	         * @memberof PressRecognizer
	         */
	        defaults: {
	            event: 'press',
	            pointers: 1,
	            time: 500, // minimal time of the pointer to be pressed
	            threshold: 5 // a minimal movement is ok, but keep it low
	        },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_AUTO];
	        },

	        process: function process(input) {
	            var options = this.options;
	            var validPointers = input.pointers.length === options.pointers;
	            var validMovement = input.distance < options.threshold;
	            var validTime = input.deltaTime > options.time;

	            this._input = input;

	            // we only allow little movement
	            // and we've reached an end event, so a tap is possible
	            if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
	                this.reset();
	            } else if (input.eventType & INPUT_START) {
	                this.reset();
	                this._timer = setTimeoutContext(function () {
	                    this.state = STATE_RECOGNIZED;
	                    this.tryEmit();
	                }, options.time, this);
	            } else if (input.eventType & INPUT_END) {
	                return STATE_RECOGNIZED;
	            }
	            return STATE_FAILED;
	        },

	        reset: function reset() {
	            clearTimeout(this._timer);
	        },

	        emit: function emit(input) {
	            if (this.state !== STATE_RECOGNIZED) {
	                return;
	            }

	            if (input && input.eventType & INPUT_END) {
	                this.manager.emit(this.options.event + 'up', input);
	            } else {
	                this._input.timeStamp = now();
	                this.manager.emit(this.options.event, this._input);
	            }
	        }
	    });

	    /**
	     * Rotate
	     * Recognized when two or more pointer are moving in a circular motion.
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function RotateRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }

	    inherit(RotateRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof RotateRecognizer
	         */
	        defaults: {
	            event: 'rotate',
	            threshold: 0,
	            pointers: 2
	        },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_NONE];
	        },

	        attrTest: function attrTest(input) {
	            return this._super.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	        }
	    });

	    /**
	     * Swipe
	     * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	     * @constructor
	     * @extends AttrRecognizer
	     */
	    function SwipeRecognizer() {
	        AttrRecognizer.apply(this, arguments);
	    }

	    inherit(SwipeRecognizer, AttrRecognizer, {
	        /**
	         * @namespace
	         * @memberof SwipeRecognizer
	         */
	        defaults: {
	            event: 'swipe',
	            threshold: 10,
	            velocity: 0.65,
	            direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	            pointers: 1
	        },

	        getTouchAction: function getTouchAction() {
	            return PanRecognizer.prototype.getTouchAction.call(this);
	        },

	        attrTest: function attrTest(input) {
	            var direction = this.options.direction;
	            var velocity;

	            if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	                velocity = input.velocity;
	            } else if (direction & DIRECTION_HORIZONTAL) {
	                velocity = input.velocityX;
	            } else if (direction & DIRECTION_VERTICAL) {
	                velocity = input.velocityY;
	            }

	            return this._super.attrTest.call(this, input) && direction & input.direction && input.distance > this.options.threshold && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	        },

	        emit: function emit(input) {
	            var direction = directionStr(input.direction);
	            if (direction) {
	                this.manager.emit(this.options.event + direction, input);
	            }

	            this.manager.emit(this.options.event, input);
	        }
	    });

	    /**
	     * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	     * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	     * a single tap.
	     *
	     * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	     * multi-taps being recognized.
	     * @constructor
	     * @extends Recognizer
	     */
	    function TapRecognizer() {
	        Recognizer.apply(this, arguments);

	        // previous time and center,
	        // used for tap counting
	        this.pTime = false;
	        this.pCenter = false;

	        this._timer = null;
	        this._input = null;
	        this.count = 0;
	    }

	    inherit(TapRecognizer, Recognizer, {
	        /**
	         * @namespace
	         * @memberof PinchRecognizer
	         */
	        defaults: {
	            event: 'tap',
	            pointers: 1,
	            taps: 1,
	            interval: 300, // max time between the multi-tap taps
	            time: 250, // max time of the pointer to be down (like finger on the screen)
	            threshold: 2, // a minimal movement is ok, but keep it low
	            posThreshold: 10 // a multi-tap can be a bit off the initial position
	        },

	        getTouchAction: function getTouchAction() {
	            return [TOUCH_ACTION_MANIPULATION];
	        },

	        process: function process(input) {
	            var options = this.options;

	            var validPointers = input.pointers.length === options.pointers;
	            var validMovement = input.distance < options.threshold;
	            var validTouchTime = input.deltaTime < options.time;

	            this.reset();

	            if (input.eventType & INPUT_START && this.count === 0) {
	                return this.failTimeout();
	            }

	            // we only allow little movement
	            // and we've reached an end event, so a tap is possible
	            if (validMovement && validTouchTime && validPointers) {
	                if (input.eventType != INPUT_END) {
	                    return this.failTimeout();
	                }

	                var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
	                var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	                this.pTime = input.timeStamp;
	                this.pCenter = input.center;

	                if (!validMultiTap || !validInterval) {
	                    this.count = 1;
	                } else {
	                    this.count += 1;
	                }

	                this._input = input;

	                // if tap count matches we have recognized it,
	                // else it has began recognizing...
	                var tapCount = this.count % options.taps;
	                if (tapCount === 0) {
	                    // no failing requirements, immediately trigger the tap event
	                    // or wait as long as the multitap interval to trigger
	                    if (!this.hasRequireFailures()) {
	                        return STATE_RECOGNIZED;
	                    } else {
	                        this._timer = setTimeoutContext(function () {
	                            this.state = STATE_RECOGNIZED;
	                            this.tryEmit();
	                        }, options.interval, this);
	                        return STATE_BEGAN;
	                    }
	                }
	            }
	            return STATE_FAILED;
	        },

	        failTimeout: function failTimeout() {
	            this._timer = setTimeoutContext(function () {
	                this.state = STATE_FAILED;
	            }, this.options.interval, this);
	            return STATE_FAILED;
	        },

	        reset: function reset() {
	            clearTimeout(this._timer);
	        },

	        emit: function emit() {
	            if (this.state == STATE_RECOGNIZED) {
	                this._input.tapCount = this.count;
	                this.manager.emit(this.options.event, this._input);
	            }
	        }
	    });

	    /**
	     * Simple way to create an manager with a default set of recognizers.
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */
	    function Hammer(element, options) {
	        options = options || {};
	        options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	        return new Manager(element, options);
	    }

	    /**
	     * @const {string}
	     */
	    Hammer.VERSION = '2.0.4';

	    /**
	     * default settings
	     * @namespace
	     */
	    Hammer.defaults = {
	        /**
	         * set if DOM events are being triggered.
	         * But this is slower and unused by simple implementations, so disabled by default.
	         * @type {Boolean}
	         * @default false
	         */
	        domEvents: false,

	        /**
	         * The value for the touchAction property/fallback.
	         * When set to `compute` it will magically set the correct value based on the added recognizers.
	         * @type {String}
	         * @default compute
	         */
	        touchAction: TOUCH_ACTION_COMPUTE,

	        /**
	         * @type {Boolean}
	         * @default true
	         */
	        enable: true,

	        /**
	         * EXPERIMENTAL FEATURE -- can be removed/changed
	         * Change the parent input target element.
	         * If Null, then it is being set the to main element.
	         * @type {Null|EventTarget}
	         * @default null
	         */
	        inputTarget: null,

	        /**
	         * force an input class
	         * @type {Null|Function}
	         * @default null
	         */
	        inputClass: null,

	        /**
	         * Default recognizer setup when calling `Hammer()`
	         * When creating a new Manager these will be skipped.
	         * @type {Array}
	         */
	        preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, { enable: false }], [PinchRecognizer, { enable: false }, ['rotate']], [SwipeRecognizer, { direction: DIRECTION_HORIZONTAL }], [PanRecognizer, { direction: DIRECTION_HORIZONTAL }, ['swipe']], [TapRecognizer], [TapRecognizer, { event: 'doubletap', taps: 2 }, ['tap']], [PressRecognizer]],

	        /**
	         * Some CSS properties can be used to improve the working of Hammer.
	         * Add them to this method and they will be set when creating a new Manager.
	         * @namespace
	         */
	        cssProps: {
	            /**
	             * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	             * @type {String}
	             * @default 'none'
	             */
	            userSelect: 'none',

	            /**
	             * Disable the Windows Phone grippers when pressing an element.
	             * @type {String}
	             * @default 'none'
	             */
	            touchSelect: 'none',

	            /**
	             * Disables the default callout shown when you touch and hold a touch target.
	             * On iOS, when you touch and hold a touch target such as a link, Safari displays
	             * a callout containing information about the link. This property allows you to disable that callout.
	             * @type {String}
	             * @default 'none'
	             */
	            touchCallout: 'none',

	            /**
	             * Specifies whether zooming is enabled. Used by IE10>
	             * @type {String}
	             * @default 'none'
	             */
	            contentZooming: 'none',

	            /**
	             * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	             * @type {String}
	             * @default 'none'
	             */
	            userDrag: 'none',

	            /**
	             * Overrides the highlight color shown when the user taps a link or a JavaScript
	             * clickable element in iOS. This property obeys the alpha value, if specified.
	             * @type {String}
	             * @default 'rgba(0,0,0,0)'
	             */
	            tapHighlightColor: 'rgba(0,0,0,0)'
	        }
	    };

	    var STOP = 1;
	    var FORCED_STOP = 2;

	    /**
	     * Manager
	     * @param {HTMLElement} element
	     * @param {Object} [options]
	     * @constructor
	     */
	    function Manager(element, options) {
	        options = options || {};

	        this.options = merge(options, Hammer.defaults);
	        this.options.inputTarget = this.options.inputTarget || element;

	        this.handlers = {};
	        this.session = {};
	        this.recognizers = [];

	        this.element = element;
	        this.input = createInputInstance(this);
	        this.touchAction = new TouchAction(this, this.options.touchAction);

	        toggleCssProps(this, true);

	        each(options.recognizers, function (item) {
	            var recognizer = this.add(new item[0](item[1]));
	            item[2] && recognizer.recognizeWith(item[2]);
	            item[3] && recognizer.requireFailure(item[3]);
	        }, this);
	    }

	    Manager.prototype = {
	        /**
	         * set options
	         * @param {Object} options
	         * @returns {Manager}
	         */
	        set: function set(options) {
	            extend(this.options, options);

	            // Options that need a little more setup
	            if (options.touchAction) {
	                this.touchAction.update();
	            }
	            if (options.inputTarget) {
	                // Clean up existing event listeners and reinitialize
	                this.input.destroy();
	                this.input.target = options.inputTarget;
	                this.input.init();
	            }
	            return this;
	        },

	        /**
	         * stop recognizing for this session.
	         * This session will be discarded, when a new [input]start event is fired.
	         * When forced, the recognizer cycle is stopped immediately.
	         * @param {Boolean} [force]
	         */
	        stop: function stop(force) {
	            this.session.stopped = force ? FORCED_STOP : STOP;
	        },

	        /**
	         * run the recognizers!
	         * called by the inputHandler function on every movement of the pointers (touches)
	         * it walks through all the recognizers and tries to detect the gesture that is being made
	         * @param {Object} inputData
	         */
	        recognize: function recognize(inputData) {
	            var session = this.session;
	            if (session.stopped) {
	                return;
	            }

	            // run the touch-action polyfill
	            this.touchAction.preventDefaults(inputData);

	            var recognizer;
	            var recognizers = this.recognizers;

	            // this holds the recognizer that is being recognized.
	            // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	            // if no recognizer is detecting a thing, it is set to `null`
	            var curRecognizer = session.curRecognizer;

	            // reset when the last recognizer is recognized
	            // or when we're in a new session
	            if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
	                curRecognizer = session.curRecognizer = null;
	            }

	            var i = 0;
	            while (i < recognizers.length) {
	                recognizer = recognizers[i];

	                // find out if we are allowed try to recognize the input for this one.
	                // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	                // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	                //      that is being recognized.
	                // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	                //      this can be setup with the `recognizeWith()` method on the recognizer.
	                if (session.stopped !== FORCED_STOP && ( // 1
	                !curRecognizer || recognizer == curRecognizer || // 2
	                recognizer.canRecognizeWith(curRecognizer))) {
	                    // 3
	                    recognizer.recognize(inputData);
	                } else {
	                    recognizer.reset();
	                }

	                // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	                // current active recognizer. but only if we don't already have an active recognizer
	                if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                    curRecognizer = session.curRecognizer = recognizer;
	                }
	                i++;
	            }
	        },

	        /**
	         * get a recognizer by its event name.
	         * @param {Recognizer|String} recognizer
	         * @returns {Recognizer|Null}
	         */
	        get: function get(recognizer) {
	            if (recognizer instanceof Recognizer) {
	                return recognizer;
	            }

	            var recognizers = this.recognizers;
	            for (var i = 0; i < recognizers.length; i++) {
	                if (recognizers[i].options.event == recognizer) {
	                    return recognizers[i];
	                }
	            }
	            return null;
	        },

	        /**
	         * add a recognizer to the manager
	         * existing recognizers with the same event name will be removed
	         * @param {Recognizer} recognizer
	         * @returns {Recognizer|Manager}
	         */
	        add: function add(recognizer) {
	            if (invokeArrayArg(recognizer, 'add', this)) {
	                return this;
	            }

	            // remove existing
	            var existing = this.get(recognizer.options.event);
	            if (existing) {
	                this.remove(existing);
	            }

	            this.recognizers.push(recognizer);
	            recognizer.manager = this;

	            this.touchAction.update();
	            return recognizer;
	        },

	        /**
	         * remove a recognizer by name or instance
	         * @param {Recognizer|String} recognizer
	         * @returns {Manager}
	         */
	        remove: function remove(recognizer) {
	            if (invokeArrayArg(recognizer, 'remove', this)) {
	                return this;
	            }

	            var recognizers = this.recognizers;
	            recognizer = this.get(recognizer);
	            recognizers.splice(inArray(recognizers, recognizer), 1);

	            this.touchAction.update();
	            return this;
	        },

	        /**
	         * bind event
	         * @param {String} events
	         * @param {Function} handler
	         * @returns {EventEmitter} this
	         */
	        on: function on(events, handler) {
	            var handlers = this.handlers;
	            each(splitStr(events), function (event) {
	                handlers[event] = handlers[event] || [];
	                handlers[event].push(handler);
	            });
	            return this;
	        },

	        /**
	         * unbind event, leave emit blank to remove all handlers
	         * @param {String} events
	         * @param {Function} [handler]
	         * @returns {EventEmitter} this
	         */
	        off: function off(events, handler) {
	            var handlers = this.handlers;
	            each(splitStr(events), function (event) {
	                if (!handler) {
	                    delete handlers[event];
	                } else {
	                    handlers[event].splice(inArray(handlers[event], handler), 1);
	                }
	            });
	            return this;
	        },

	        /**
	         * emit event to the listeners
	         * @param {String} event
	         * @param {Object} data
	         */
	        emit: function emit(event, data) {
	            // we also want to trigger dom events
	            if (this.options.domEvents) {
	                triggerDomEvent(event, data);
	            }

	            // no handlers, so skip it all
	            var handlers = this.handlers[event] && this.handlers[event].slice();
	            if (!handlers || !handlers.length) {
	                return;
	            }

	            data.type = event;
	            data.preventDefault = function () {
	                data.srcEvent.preventDefault();
	            };

	            var i = 0;
	            while (i < handlers.length) {
	                handlers[i](data);
	                i++;
	            }
	        },

	        /**
	         * destroy the manager and unbinds all events
	         * it doesn't unbind dom events, that is the user own responsibility
	         */
	        destroy: function destroy() {
	            this.element && toggleCssProps(this, false);

	            this.handlers = {};
	            this.session = {};
	            this.input.destroy();
	            this.element = null;
	        }
	    };

	    /**
	     * add/remove the css properties as defined in manager.options.cssProps
	     * @param {Manager} manager
	     * @param {Boolean} add
	     */
	    function toggleCssProps(manager, add) {
	        var element = manager.element;
	        each(manager.options.cssProps, function (value, name) {
	            element.style[prefixed(element.style, name)] = add ? value : '';
	        });
	    }

	    /**
	     * trigger dom event
	     * @param {String} event
	     * @param {Object} data
	     */
	    function triggerDomEvent(event, data) {
	        var gestureEvent = document.createEvent('Event');
	        gestureEvent.initEvent(event, true, true);
	        gestureEvent.gesture = data;
	        data.target.dispatchEvent(gestureEvent);
	    }

	    extend(Hammer, {
	        INPUT_START: INPUT_START,
	        INPUT_MOVE: INPUT_MOVE,
	        INPUT_END: INPUT_END,
	        INPUT_CANCEL: INPUT_CANCEL,

	        STATE_POSSIBLE: STATE_POSSIBLE,
	        STATE_BEGAN: STATE_BEGAN,
	        STATE_CHANGED: STATE_CHANGED,
	        STATE_ENDED: STATE_ENDED,
	        STATE_RECOGNIZED: STATE_RECOGNIZED,
	        STATE_CANCELLED: STATE_CANCELLED,
	        STATE_FAILED: STATE_FAILED,

	        DIRECTION_NONE: DIRECTION_NONE,
	        DIRECTION_LEFT: DIRECTION_LEFT,
	        DIRECTION_RIGHT: DIRECTION_RIGHT,
	        DIRECTION_UP: DIRECTION_UP,
	        DIRECTION_DOWN: DIRECTION_DOWN,
	        DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	        DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	        DIRECTION_ALL: DIRECTION_ALL,

	        Manager: Manager,
	        Input: Input,
	        TouchAction: TouchAction,

	        TouchInput: TouchInput,
	        MouseInput: MouseInput,
	        PointerEventInput: PointerEventInput,
	        TouchMouseInput: TouchMouseInput,
	        SingleTouchInput: SingleTouchInput,

	        Recognizer: Recognizer,
	        AttrRecognizer: AttrRecognizer,
	        Tap: TapRecognizer,
	        Pan: PanRecognizer,
	        Swipe: SwipeRecognizer,
	        Pinch: PinchRecognizer,
	        Rotate: RotateRecognizer,
	        Press: PressRecognizer,

	        on: addEventListeners,
	        off: removeEventListeners,
	        each: each,
	        merge: merge,
	        extend: extend,
	        inherit: inherit,
	        bindFn: bindFn,
	        prefixed: prefixed
	    });

	    if ("function" == TYPE_FUNCTION && __webpack_require__(6)) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return Hammer;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module != 'undefined' && module.exports) {
	        module.exports = Hammer;
	    } else {
	        window[exportName] = Hammer;
	    }
	})(window, document, 'Hammer');

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*jshint esnext: true */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Ajax = (function () {
	    function Ajax(url, data, async) {
	        _classCallCheck(this, Ajax);

	        if (url) this.url = url;
	        if (data) this.data = data;
	        this.async = async ? this.async = async : this.async = true;

	        if (window.XMLHttpRequest) this.req = new XMLHttpRequest();else this.req = new ActiveXObject('Microsoft.XMLHTTP');
	    }

	    _createClass(Ajax, [{
	        key: 'get',
	        value: function get() {
	            var $ = this; // shorthand 'this'
	            var req = this.req;
	            var method = 'GET';

	            return new Promise(function (resolve, reject) {
	                if (!$.url) reject(Error('No URL Set'));

	                if (typeof $.data !== 'undefined' && $.data !== null) $.url = $.url + '?' + $.data;

	                req.open(method, $.url, $.async);
	                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	                req.onload = function (event) {
	                    if (this.status == 200) {
	                        $.response = JSON.parse(this.responseText);
	                        resolve($.response);
	                    } else {
	                        reject(Error(this.statusText));
	                    }
	                };

	                // Handle network errors
	                req.onerror = function () {
	                    reject(Error('Network Error'));
	                };

	                req.send();
	            });
	        }
	    }, {
	        key: 'getImage',
	        value: function getImage() {
	            // NOTE: likely will need to use BinaryJS for video blob streaming - http://binaryjs.com/
	            var $ = this; // shorthand 'this'
	            var req = this.req;
	            var method = 'GET';

	            return new Promise(function (resolve, reject) {
	                if (!$.url) reject(Error('No URL Set'));

	                if (typeof $.data !== 'undefined' && $.data !== null) {
	                    var params = Object.keys($.data).map(function (key) {
	                        return key + '=' + $.data[key];
	                    }).join('&');

	                    $.url = $.url + '?' + params;
	                }

	                req.open(method, $.url, $.async);
	                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	                req.onload = function (event) {
	                    if (this.status == 200) {
	                        var response = JSON.parse(this.response);
	                        var blob = b64toBlob(response.blob, response.type);
	                        var urlCreator = window.URL || window.webkitURL;

	                        $.response = {
	                            blob: blob,
	                            imageURL: urlCreator.createObjectURL(blob),
	                            clickURL: response.clickURL,
	                            adID: response.ad_id,
	                            campaignID: response.campaign_id
	                        };

	                        resolve($.response);
	                    } else {
	                        reject(Error(this.statusText));
	                    }
	                };

	                // Handle network errors
	                req.onerror = function () {
	                    reject(Error('Network Error'));
	                };

	                req.send();
	            });
	        }
	    }, {
	        key: 'post',
	        value: function post(data) {
	            var $ = this; // shorthand 'this'
	            var req = this.req;
	            var method = 'POST';

	            return new Promise(function (resolve, reject) {
	                if (!$.url) reject(Error('No URL Set'));

	                req.open(method, $.url, $.async);
	                req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	                req.onload = function (event) {
	                    if (this.status == 200) {
	                        $.response = JSON.parse(this.responseText);
	                        resolve($.response);
	                    } else {
	                        reject(Error(this.statusText));
	                    }
	                };

	                // Handle network errors
	                req.onerror = function () {
	                    reject(Error('Network Error'));
	                };

	                req.send(JSON.stringify(data));
	            });
	        }
	    }]);

	    return Ajax;
	})();

	exports['default'] = Ajax;

	function b64toBlob(b64Data, contentType, sliceSize) {
	    contentType = contentType || '';
	    sliceSize = sliceSize || 512;

	    var byteCharacters = atob(b64Data);
	    var byteArrays = [];

	    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	        var slice = byteCharacters.slice(offset, offset + sliceSize);

	        var byteNumbers = new Array(slice.length);
	        for (var i = 0; i < slice.length; i++) {
	            byteNumbers[i] = slice.charCodeAt(i);
	        }

	        var byteArray = new Uint8Array(byteNumbers);

	        byteArrays.push(byteArray);
	    }

	    var blob = new Blob(byteArrays, { type: contentType });
	    return blob;
	}
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * UAParser.js v0.7.9
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */

	'use strict';

	(function (window, undefined) {

	    'use strict';

	    //////////////
	    // Constants
	    /////////////

	    var LIBVERSION = '0.7.9',
	        EMPTY = '',
	        UNKNOWN = '?',
	        FUNC_TYPE = 'function',
	        UNDEF_TYPE = 'undefined',
	        OBJ_TYPE = 'object',
	        STR_TYPE = 'string',
	        MAJOR = 'major',
	        // deprecated
	    MODEL = 'model',
	        NAME = 'name',
	        TYPE = 'type',
	        VENDOR = 'vendor',
	        VERSION = 'version',
	        ARCHITECTURE = 'architecture',
	        CONSOLE = 'console',
	        MOBILE = 'mobile',
	        TABLET = 'tablet',
	        SMARTTV = 'smarttv',
	        WEARABLE = 'wearable',
	        EMBEDDED = 'embedded';

	    ///////////
	    // Helper
	    //////////

	    var util = {
	        extend: function extend(regexes, extensions) {
	            for (var i in extensions) {
	                if ('browser cpu device engine os'.indexOf(i) !== -1 && extensions[i].length % 2 === 0) {
	                    regexes[i] = extensions[i].concat(regexes[i]);
	                }
	            }
	            return regexes;
	        },
	        has: function has(str1, str2) {
	            if (typeof str1 === 'string') {
	                return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	            } else {
	                return false;
	            }
	        },
	        lowerize: function lowerize(str) {
	            return str.toLowerCase();
	        },
	        major: function major(version) {
	            return typeof version === STR_TYPE ? version.split('.')[0] : undefined;
	        }
	    };

	    ///////////////
	    // Map helper
	    //////////////

	    var mapper = {

	        rgx: function rgx() {

	            var result,
	                i = 0,
	                j,
	                k,
	                p,
	                q,
	                matches,
	                match,
	                args = arguments;

	            // loop through all regexes maps
	            while (i < args.length && !matches) {

	                var regex = args[i],
	                    // even sequence (0,2,4,..)
	                props = args[i + 1]; // odd sequence (1,3,5,..)

	                // construct object barebones
	                if (typeof result === UNDEF_TYPE) {
	                    result = {};
	                    for (p in props) {
	                        q = props[p];
	                        if (typeof q === OBJ_TYPE) {
	                            result[q[0]] = undefined;
	                        } else {
	                            result[q] = undefined;
	                        }
	                    }
	                }

	                // try matching uastring with regexes
	                j = k = 0;
	                while (j < regex.length && !matches) {
	                    matches = regex[j++].exec(this.getUA());
	                    if (!!matches) {
	                        for (p = 0; p < props.length; p++) {
	                            match = matches[++k];
	                            q = props[p];
	                            // check if given property is actually array
	                            if (typeof q === OBJ_TYPE && q.length > 0) {
	                                if (q.length == 2) {
	                                    if (typeof q[1] == FUNC_TYPE) {
	                                        // assign modified match
	                                        result[q[0]] = q[1].call(this, match);
	                                    } else {
	                                        // assign given value, ignore regex match
	                                        result[q[0]] = q[1];
	                                    }
	                                } else if (q.length == 3) {
	                                    // check whether function or regex
	                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                                        // call function (usually string mapper)
	                                        result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                                    } else {
	                                        // sanitize match using given regex
	                                        result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                                    }
	                                } else if (q.length == 4) {
	                                    result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                                }
	                            } else {
	                                result[q] = match ? match : undefined;
	                            }
	                        }
	                    }
	                }
	                i += 2;
	            }
	            return result;
	        },

	        str: function str(_str, map) {

	            for (var i in map) {
	                // check if array
	                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	                    for (var j = 0; j < map[i].length; j++) {
	                        if (util.has(map[i][j], _str)) {
	                            return i === UNKNOWN ? undefined : i;
	                        }
	                    }
	                } else if (util.has(map[i], _str)) {
	                    return i === UNKNOWN ? undefined : i;
	                }
	            }
	            return _str;
	        }
	    };

	    ///////////////
	    // String map
	    //////////////

	    var maps = {

	        browser: {
	            oldsafari: {
	                version: {
	                    '1.0': '/8',
	                    '1.2': '/1',
	                    '1.3': '/3',
	                    '2.0': '/412',
	                    '2.0.2': '/416',
	                    '2.0.3': '/417',
	                    '2.0.4': '/419',
	                    '?': '/'
	                }
	            }
	        },

	        device: {
	            amazon: {
	                model: {
	                    'Fire Phone': ['SD', 'KF']
	                }
	            },
	            sprint: {
	                model: {
	                    'Evo Shift 4G': '7373KT'
	                },
	                vendor: {
	                    'HTC': 'APA',
	                    'Sprint': 'Sprint'
	                }
	            }
	        },

	        os: {
	            windows: {
	                version: {
	                    'ME': '4.90',
	                    'NT 3.11': 'NT3.51',
	                    'NT 4.0': 'NT4.0',
	                    '2000': 'NT 5.0',
	                    'XP': ['NT 5.1', 'NT 5.2'],
	                    'Vista': 'NT 6.0',
	                    '7': 'NT 6.1',
	                    '8': 'NT 6.2',
	                    '8.1': 'NT 6.3',
	                    '10': ['NT 6.4', 'NT 10.0'],
	                    'RT': 'ARM'
	                }
	            }
	        }
	    };

	    //////////////
	    // Regex map
	    /////////////

	    var regexes = {

	        browser: [[

	        // Presto based
	        /(opera\smini)\/([\w\.-]+)/i, // Opera Mini
	        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, // Opera Mobi/Tablet
	        /(opera).+version\/([\w\.]+)/i, // Opera > 9.80
	        /(opera)[\/\s]+([\w\.]+)/i // Opera < 9.80

	        ], [NAME, VERSION], [/\s(opr)\/([\w\.]+)/i // Opera Webkit
	        ], [[NAME, 'Opera'], VERSION], [

	        // Mixed
	        /(kindle)\/([\w\.]+)/i, // Kindle
	        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
	        // Lunascape/Maxthon/Netfront/Jasmine/Blazer

	        // Trident based
	        /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
	        // Avant/IEMobile/SlimBrowser/Baidu
	        /(?:ms|\()(ie)\s([\w\.]+)/i, // Internet Explorer

	        // Webkit/KHTML based
	        /(rekonq)\/([\w\.]+)*/i, // Rekonq
	        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i
	        // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium
	        ], [NAME, VERSION], [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i // IE11
	        ], [[NAME, 'IE'], VERSION], [/(edge)\/((\d+)?[\w\.]+)/i // Microsoft Edge
	        ], [NAME, VERSION], [/(yabrowser)\/([\w\.]+)/i // Yandex
	        ], [[NAME, 'Yandex'], VERSION], [/(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
	        ], [[NAME, /_/g, ' '], VERSION], [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
	        // Chrome/OmniWeb/Arora/Tizen/Nokia
	        /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i
	        // UCBrowser/QQBrowser
	        ], [NAME, VERSION], [/(dolfin)\/([\w\.]+)/i // Dolphin
	        ], [[NAME, 'Dolphin'], VERSION], [/((?:android.+)crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
	        ], [[NAME, 'Chrome'], VERSION], [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i // MIUI Browser
	        ], [VERSION, [NAME, 'MIUI Browser']], [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i // Android Browser
	        ], [VERSION, [NAME, 'Android Browser']], [/FBAV\/([\w\.]+);/i // Facebook App for iOS
	        ], [VERSION, [NAME, 'Facebook']], [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i // Mobile Safari
	        ], [VERSION, [NAME, 'Mobile Safari']], [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i // Safari & Safari Mobile
	        ], [VERSION, NAME], [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
	        ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [/(konqueror)\/([\w\.]+)/i, // Konqueror
	        /(webkit|khtml)\/([\w\.]+)/i], [NAME, VERSION], [

	        // Gecko based
	        /(navigator|netscape)\/([\w\.-]+)/i // Netscape
	        ], [[NAME, 'Netscape'], VERSION], [/fxios\/([\w\.-]+)/i // Firefox for iOS
	        ], [VERSION, [NAME, 'Firefox']], [/(swiftfox)/i, // Swiftfox
	        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	        // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
	        // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, // Mozilla

	        // Other
	        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,
	        // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf
	        /(links)\s\(([\w\.]+)/i, // Links
	        /(gobrowser)\/?([\w\.]+)*/i, // GoBrowser
	        /(ice\s?browser)\/v?([\w\._]+)/i, // ICE Browser
	        /(mosaic)[\/\s]([\w\.]+)/i // Mosaic
	        ], [NAME, VERSION]

	        /* /////////////////////
	        // Media players BEGIN
	        ////////////////////////
	         , [
	         /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	        /(coremedia) v((\d+)[\w\._]+)/i
	        ], [NAME, VERSION], [
	         /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	        ], [NAME, VERSION], [
	         /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	        ], [NAME, VERSION], [
	         /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                            // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                            // NSPlayer/PSP-InternetRadioPlayer/Videos
	        /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	        /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	        /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	        ], [NAME, VERSION], [
	        /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	        ], [NAME, VERSION], [
	         /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	        ], [[NAME, 'Flip Player'], VERSION], [
	         /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                            // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	        ], [NAME], [
	         /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                            // Gstreamer
	        ], [NAME, VERSION], [
	         /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	        /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                            // Java/urllib/requests/wget/cURL
	        /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	        ], [NAME, VERSION], [
	         /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	        ], [[NAME, /_/g, ' '], VERSION], [
	         /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                            // MPlayer SVN
	        ], [NAME, VERSION], [
	         /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	        ], [NAME, VERSION], [
	         /(mplayer)/i,                                                       // MPlayer (no other info)
	        /(yourmuze)/i,                                                      // YourMuze
	        /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	        ], [NAME], [
	         /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	        ], [NAME, VERSION], [
	         /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	        ], [NAME, VERSION], [
	         /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	        ], [NAME, VERSION], [
	         /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	        /(winamp)\s((\d+)[\w\.-]+)/i,
	        /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	        ], [NAME, VERSION], [
	         /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                            // inlight radio
	        ], [NAME], [
	         /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                            // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                            // SoundTap/Totem/Stagefright/Streamium
	        ], [NAME, VERSION], [
	         /(smp)((\d+)[\d\.]+)/i                                              // SMP
	        ], [NAME, VERSION], [
	         /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	        /(vlc)\/((\d+)[\w\.-]+)/i,
	        /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	        /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	        /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	        ], [NAME, VERSION], [
	         /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	        /(windows-media-player)\/((\d+)[\w\.-]+)/i
	        ], [[NAME, /-/g, ' '], VERSION], [
	         /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                            // Windows Media Server
	        ], [VERSION, [NAME, 'Windows']], [
	         /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	        ], [NAME, VERSION], [
	         /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	        /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	        ], [[NAME, 'rad.io'], VERSION]
	         //////////////////////
	        // Media players END
	        ////////////////////*/

	        ],

	        cpu: [[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i // AMD64
	        ], [[ARCHITECTURE, 'amd64']], [/(ia32(?=;))/i // IA32 (quicktime)
	        ], [[ARCHITECTURE, util.lowerize]], [/((?:i[346]|x)86)[;\)]/i // IA32
	        ], [[ARCHITECTURE, 'ia32']], [

	        // PocketPC mistakenly identified as PowerPC
	        /windows\s(ce|mobile);\sppc;/i], [[ARCHITECTURE, 'arm']], [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i // PowerPC
	        ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [/(sun4\w)[;\)]/i // SPARC
	        ], [[ARCHITECTURE, 'sparc']], [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
	        // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	        ], [[ARCHITECTURE, util.lowerize]]],

	        device: [[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i // iPad/PlayBook
	        ], [MODEL, VENDOR, [TYPE, TABLET]], [/applecoremedia\/[\w\.]+ \((ipad)/ // iPad
	        ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [/(apple\s{0,1}tv)/i // Apple TV
	        ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [/(archos)\s(gamepad2?)/i, // Archos
	        /(hp).+(touchpad)/i, // HP TouchPad
	        /(kindle)\/([\w\.]+)/i, // Kindle
	        /\s(nook)[\w\s]+build\/(\w+)/i, // Nook
	        /(dell)\s(strea[kpr\s\d]*[\dko])/i // Dell Streak
	        ], [VENDOR, MODEL, [TYPE, TABLET]], [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i // Kindle Fire HD
	        ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i // Fire Phone
	        ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);.+(apple)/i // iPod/iPhone
	        ], [MODEL, VENDOR, [TYPE, MOBILE]], [/\((ip[honed|\s\w*]+);/i // iPod/iPhone
	        ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [/(blackberry)[\s-]?(\w+)/i, // BlackBerry
	        /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
	        // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Huawei/Meizu/Motorola/Polytron
	        /(hp)\s([\w\s]+\w)/i, // HP iPAQ
	        /(asus)-?(\w+)/i // Asus
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [/\(bb10;\s(\w+)/i // BlackBerry 10
	        ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
	        // Asus Tablets
	        /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [/(sony)\s(tablet\s[ps])\sbuild\//i, // Sony
	        /(sony)?(?:sgp.+)\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i], [[VENDOR, 'Sony'], [MODEL, 'Xperia Phone'], [TYPE, MOBILE]], [/\s(ouya)\s/i, // Ouya
	        /(nintendo)\s([wids3u]+)/i // Nintendo
	        ], [VENDOR, MODEL, [TYPE, CONSOLE]], [/android.+;\s(shield)\sbuild/i // Nvidia
	        ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [/(playstation\s[3portablevi]+)/i // Playstation
	        ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [/(sprint\s(\w+))/i // Sprint Phones
	        ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i // Lenovo tablets
	        ], [VENDOR, MODEL, [TYPE, TABLET]], [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, // HTC
	        /(zte)-(\w+)*/i, // ZTE
	        /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
	        // Alcatel/GeeksPhone/Huawei/Lenovo/Nexian/Panasonic/Sony
	        ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [/(nexus\s9)/i // HTC Nexus 9
	        ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [/[\s\(;](xbox(?:\sone)?)[\s\);]/i // Microsoft Xbox
	        ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [/(kin\.[onetw]{3})/i // Microsoft Kin
	        ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

	        // Motorola
	        /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [// Samsung
	        /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [/(samsung);smarttv/i], [VENDOR, MODEL, [TYPE, SMARTTV]], [/\(dtv[\);].+(aquos)/i // Sharp
	        ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [/sie-(\w+)*/i // Siemens
	        ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [/(maemo|nokia).*(n900|lumia\s\d+)/i, // Nokia
	        /(nokia)[\s_-]?([\w-]+)*/i], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [/android\s3\.[\s\w;-]{10}(a\d{3})/i // Acer
	        ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i // LG Tablet
	        ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [/(lg) netcast\.tv/i // LG SmartTV
	        ], [VENDOR, MODEL, [TYPE, SMARTTV]], [/(nexus\s[45])/i, // LG
	        /lg[e;\s\/-]+(\w+)*/i], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [/android.+(ideatab[a-z0-9\-\s]+)/i // Lenovo
	        ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [/linux;.+((jolla));/i // Jolla
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [/((pebble))app\/[\d\.]+\s/i // Pebble
	        ], [VENDOR, MODEL, [TYPE, WEARABLE]], [/android.+;\s(glass)\s\d/i // Google Glass
	        ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [/android.+(\w+)\s+build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
	        /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, // Xiaomi Hongmi
	        /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i // Xiaomi Mi
	        ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [/(mobile|tablet);.+rv\:.+gecko\//i // Unidentifiable
	        ], [[TYPE, util.lowerize], VENDOR, MODEL]

	        /*//////////////////////////
	        // TODO: move to string map
	        ////////////////////////////
	         /(C6603)/i                                                          // Sony Xperia Z C6603
	        ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	        /(C6903)/i                                                          // Sony Xperia Z 1
	        ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	         /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	        ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	        ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	        ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	        ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	        ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	        /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	        ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	        /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	        ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	         /(R1001)/i                                                          // Oppo R1001
	        ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [
	        /(X9006)/i                                                          // Oppo Find 7a
	        ], [[MODEL, 'Find 7a'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	        /(R2001)/i                                                          // Oppo YOYO R2001
	        ], [[MODEL, 'Yoyo R2001'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	        /(R815)/i                                                           // Oppo Clover R815
	        ], [[MODEL, 'Clover R815'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	         /(U707)/i                                                          // Oppo Find Way S
	        ], [[MODEL, 'Find Way S'], [VENDOR, 'Oppo'], [TYPE, MOBILE]], [
	         /(T3C)/i                                                            // Advan Vandroid T3C
	        ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	        /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	        ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	        /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	        ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [
	         /(V972M)/i                                                          // ZTE V972M
	        ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
	         /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	        /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	        ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	        /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	        ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	        /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	        ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	        
	        /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	        ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [
	         /////////////
	        // END TODO
	        ///////////*/

	        ],

	        engine: [[/windows.+\sedge\/([\w\.]+)/i // EdgeHTML
	        ], [VERSION, [NAME, 'EdgeHTML']], [/(presto)\/([\w\.]+)/i, // Presto
	        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	        /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, // KHTML/Tasman/Links
	        /(icab)[\/\s]([23]\.[\d\.]+)/i // iCab
	        ], [NAME, VERSION], [/rv\:([\w\.]+).*(gecko)/i // Gecko
	        ], [VERSION, NAME]],

	        os: [[

	        // Windows based
	        /microsoft\s(windows)\s(vista|xp)/i // Windows (iTunes)
	        ], [NAME, VERSION], [/(windows)\snt\s6\.2;\s(arm)/i, // Windows RT
	        /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	        // Mobile/Embedded OS
	        /\((bb)(10);/i // BlackBerry 10
	        ], [[NAME, 'BlackBerry'], VERSION], [/(blackberry)\w*\/?([\w\.]+)*/i, // Blackberry
	        /(tizen)[\/\s]([\w\.]+)/i, // Tizen
	        /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
	        // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	        /linux;.+(sailfish);/i // Sailfish OS
	        ], [NAME, VERSION], [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i // Symbian
	        ], [[NAME, 'Symbian'], VERSION], [/\((series40);/i // Series 40
	        ], [NAME], [/mozilla.+\(mobile;.+gecko.+firefox/i // Firefox OS
	        ], [[NAME, 'Firefox OS'], VERSION], [

	        // Console
	        /(nintendo|playstation)\s([wids3portablevu]+)/i, // Nintendo/Playstation

	        // GNU/Linux based
	        /(mint)[\/\s\(]?(\w+)*/i, // Mint
	        /(mageia|vectorlinux)[;\s]/i, // Mageia/VectorLinux
	        /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,
	        // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	        // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	        /(hurd|linux)\s?([\w\.]+)*/i, // Hurd/Linux
	        /(gnu)\s?([\w\.]+)*/i // GNU
	        ], [NAME, VERSION], [/(cros)\s[\w]+\s([\w\.]+\w)/i // Chromium OS
	        ], [[NAME, 'Chromium OS'], VERSION], [

	        // Solaris
	        /(sunos)\s?([\w\.]+\d)*/i // Solaris
	        ], [[NAME, 'Solaris'], VERSION], [

	        // BSD based
	        /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	        ], [NAME, VERSION], [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i // iOS
	        ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i // Mac OS
	        ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	        // Other
	        /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, // Solaris
	        /(haiku)\s(\w+)/i, // Haiku
	        /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, // AIX
	        /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
	        // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	        /(unix)\s?([\w\.]+)*/i // UNIX
	        ], [NAME, VERSION]]
	    };

	    /////////////////
	    // Constructor
	    ////////////////

	    var UAParser = function UAParser(uastring, extensions) {

	        if (!(this instanceof UAParser)) {
	            return new UAParser(uastring, extensions).getResult();
	        }

	        var ua = uastring || (window && window.navigator && window.navigator.userAgent ? window.navigator.userAgent : EMPTY);
	        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

	        this.getBrowser = function () {
	            var browser = mapper.rgx.apply(this, rgxmap.browser);
	            browser.major = util.major(browser.version);
	            return browser;
	        };
	        this.getCPU = function () {
	            return mapper.rgx.apply(this, rgxmap.cpu);
	        };
	        this.getDevice = function () {
	            return mapper.rgx.apply(this, rgxmap.device);
	        };
	        this.getEngine = function () {
	            return mapper.rgx.apply(this, rgxmap.engine);
	        };
	        this.getOS = function () {
	            return mapper.rgx.apply(this, rgxmap.os);
	        };
	        this.getResult = function () {
	            return {
	                ua: this.getUA(),
	                browser: this.getBrowser(),
	                engine: this.getEngine(),
	                os: this.getOS(),
	                device: this.getDevice(),
	                cpu: this.getCPU()
	            };
	        };
	        this.getUA = function () {
	            return ua;
	        };
	        this.setUA = function (uastring) {
	            ua = uastring;
	            return this;
	        };
	        this.setUA(ua);
	        return this;
	    };

	    UAParser.VERSION = LIBVERSION;
	    UAParser.BROWSER = {
	        NAME: NAME,
	        MAJOR: MAJOR, // deprecated
	        VERSION: VERSION
	    };
	    UAParser.CPU = {
	        ARCHITECTURE: ARCHITECTURE
	    };
	    UAParser.DEVICE = {
	        MODEL: MODEL,
	        VENDOR: VENDOR,
	        TYPE: TYPE,
	        CONSOLE: CONSOLE,
	        MOBILE: MOBILE,
	        SMARTTV: SMARTTV,
	        TABLET: TABLET,
	        WEARABLE: WEARABLE,
	        EMBEDDED: EMBEDDED
	    };
	    UAParser.ENGINE = {
	        NAME: NAME,
	        VERSION: VERSION
	    };
	    UAParser.OS = {
	        NAME: NAME,
	        VERSION: VERSION
	    };

	    ///////////
	    // Export
	    //////////

	    // check js environment
	    if (typeof exports !== UNDEF_TYPE) {
	        // nodejs env
	        if (typeof module !== UNDEF_TYPE && module.exports) {
	            exports = module.exports = UAParser;
	        }
	        exports.UAParser = UAParser;
	    } else {
	        // requirejs env (optional)
	        if ("function" === FUNC_TYPE && __webpack_require__(6)) {
	            !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                return UAParser;
	            }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        } else {
	            // browser env
	            window.UAParser = UAParser;
	        }
	    }

	    // jQuery/Zepto specific (optional)
	    // Note:
	    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	    //   and we should catch that.
	    var $ = window.jQuery || window.Zepto;
	    if (typeof $ !== UNDEF_TYPE) {
	        var parser = new UAParser();
	        $.ua = parser.getResult();
	        $.ua.get = function () {
	            return parser.getUA();
	        };
	        $.ua.set = function (uastring) {
	            parser.setUA(uastring);
	            var result = parser.getResult();
	            for (var prop in result) {
	                $.ua[prop] = result[prop];
	            }
	        };
	    }
	})(typeof window === 'object' ? window : undefined);

/***/ }
/******/ ])
});
;