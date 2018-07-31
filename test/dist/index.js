/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 58);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(23)('wks');
var uid = __webpack_require__(24);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var ctx = __webpack_require__(12);
var hide = __webpack_require__(10);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(48);
var toPrimitive = __webpack_require__(42);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(21);
module.exports = __webpack_require__(1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(33);
var defined = __webpack_require__(30);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(45);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(24)('meta');
var isObject = __webpack_require__(2);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(8)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(56);
var enumBugKeys = __webpack_require__(31);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(30);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(52);
var enumBugKeys = __webpack_require__(31);
var IE_PROTO = __webpack_require__(39)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(47)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(94).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(0);
var fails = __webpack_require__(8);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(17) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(12);
var IObject = __webpack_require__(33);
var toObject = __webpack_require__(16);
var toLength = __webpack_require__(41);
var asc = __webpack_require__(89);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(12);
var call = __webpack_require__(96);
var isArrayIter = __webpack_require__(95);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(41);
var getIterFn = __webpack_require__(103);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(29);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(17);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(38);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(13);
var $iterCreate = __webpack_require__(97);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(55);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(19);
var createDesc = __webpack_require__(21);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(42);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(48);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(10);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys');
var uid = __webpack_require__(24);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(40);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(17);
var wksExt = __webpack_require__(44);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var $export = __webpack_require__(4);
var meta = __webpack_require__(14);
var fails = __webpack_require__(8);
var hide = __webpack_require__(10);
var redefineAll = __webpack_require__(37);
var forOf = __webpack_require__(32);
var anInstance = __webpack_require__(27);
var isObject = __webpack_require__(2);
var setToStringTag = __webpack_require__(22);
var dP = __webpack_require__(6).f;
var each = __webpack_require__(28)(0);
var DESCRIPTORS = __webpack_require__(1);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(47)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(29);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(19);
var toObject = __webpack_require__(16);
var IObject = __webpack_require__(33);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(8)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(15);

module.exports = __webpack_require__(1) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(11);
var gOPN = __webpack_require__(54).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(56);
var hiddenKeys = __webpack_require__(31).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(16);
var IE_PROTO = __webpack_require__(39)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(87)(false);
var IE_PROTO = __webpack_require__(39)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _getOwnPropertyNames = __webpack_require__(65);

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

var _defineProperties = __webpack_require__(62);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _keys = __webpack_require__(67);

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__(66);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _assign = __webpack_require__(60);

var _assign2 = _interopRequireDefault(_assign);

var _metadata = __webpack_require__(69);

var _metadata2 = _interopRequireDefault(_metadata);

var _getOwnPropertyDescriptor = __webpack_require__(64);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _create = __webpack_require__(61);

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = __webpack_require__(68);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _stringify = __webpack_require__(59);

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty = __webpack_require__(63);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = __webpack_require__(72);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && ( false ? 'undefined' : (0, _typeof3.default)(module)) === 'object') module.exports = factory(__webpack_require__(26));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(26)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var a = (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' ? factory(require("vue")) : factory(root["Vue"]);
    for (var i in a) {
      ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' ? exports : root)[i] = a[i];
    }
  }
})(undefined, function (__WEBPACK_EXTERNAL_MODULE_5__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // identity function for calling harmony imports with the correct context
      /******/__webpack_require__.i = function (value) {
        return value;
      };
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/(0, _defineProperty2.default)(exports, name, {
            /******/configurable: false,
            /******/enumerable: true,
            /******/get: getter
            /******/ });
          /******/
        }
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 7);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = [];

      /***/
    },
    /* 1 */
    /***/function (module, exports) {

      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */
      // css base code, injected by the css-loader
      module.exports = function (useSourceMap) {
        var list = [];

        // return the list of modules as css string
        list.toString = function toString() {
          return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);
            if (item[2]) {
              return "@media " + item[2] + "{" + content + "}";
            } else {
              return content;
            }
          }).join("");
        };

        // import a list of modules into the list
        list.i = function (modules, mediaQuery) {
          if (typeof modules === "string") modules = [[null, modules, ""]];
          var alreadyImportedModules = {};
          for (var i = 0; i < this.length; i++) {
            var id = this[i][0];
            if (typeof id === "number") alreadyImportedModules[id] = true;
          }
          for (i = 0; i < modules.length; i++) {
            var item = modules[i];
            // skip already imported module
            // this implementation is not 100% perfect for weird media query combinations
            //  when a module is imported multiple times with different media queries.
            //  I hope this will never occur (Hey this way we have smaller bundles)
            if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
              if (mediaQuery && !item[2]) {
                item[2] = mediaQuery;
              } else if (mediaQuery) {
                item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
              }
              list.push(item);
            }
          }
        };
        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || '';
        var cssMapping = item[3];
        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function (source) {
            return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
          });

          return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
        }

        return [content].join('\n');
      }

      // Adapted from convert-source-map (MIT)
      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent((0, _stringify2.default)(sourceMap))));
        var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

        return '/*# ' + data + ' */';
      }

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = {};

      /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var hasOwn = __webpack_require__(4);
      module.exports = hasOwn.toString;

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var class2type = __webpack_require__(2);
      module.exports = class2type.hasOwnProperty;

      /***/
    },
    /* 5 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

      /***/
    },
    /* 6 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      /* harmony import */
      var __WEBPACK_IMPORTED_MODULE_0__index_less__ = __webpack_require__(18);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_less__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__base_js__ = __webpack_require__(26);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1__base_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__base_js__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_2_vue_property_decorator__ = __webpack_require__(25);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_3__CalenderModel__ = __webpack_require__(22);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_4_vue_awesome_swiper__ = __webpack_require__(23);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_4_vue_awesome_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_awesome_swiper__);
      var __extends = this && this.__extends || function () {
        var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };
        return function (d, b) {
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
        };
      }();
      var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
            d;
        if ((typeof Reflect === 'undefined' ? 'undefined' : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
          if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
      };
      var __metadata = this && this.__metadata || function (k, v) {
        if ((typeof Reflect === 'undefined' ? 'undefined' : (0, _typeof3.default)(Reflect)) === "object" && typeof _metadata2.default === "function") return (0, _metadata2.default)(k, v);
      };

      var Utils = __webpack_require__(10);
      //const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');


      //@ts-ignore
      //Vue.use(VueAwesomeSwiper);

      var CalendarWeek = /** @class */function (_super) {
        __extends(CalendarWeek, _super);
        function CalendarWeek() {
          var _this_1 = _super !== null && _super.apply(this, arguments) || this;
          _this_1.dateDescription = "";
          /**
           * 设置每月对应的天数
           */
          _this_1.monthDays = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
          };
          /**
           * 天 swiper options
           */
          _this_1.daySwiperOption = {
            notNextTick: true,
            loop: false,
            slidesPerView: 1,
            initialSlide: 1,
            observer: true,
            observeParents: true,
            fade: {
              crossFade: true
            }
          };
          //swiper的slide切换记录的索引
          _this_1.daySwiperIndex = 1;
          //配置项的copy副本
          _this_1.tempOption = new __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */].CalenderOptions();
          //日历组件配置项数据
          _this_1.calenderOption = new __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */].CalenderOptions();
          /**
           * 多少个月日历
           */
          _this_1.weekCalender = new __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */].WeekCalender();
          /**
           * 用于记录日历月份的数据，判断到底是否应该生成新的日历
           */
          _this_1.daySwiperIncludes = [];
          return _this_1;
        }
        Object.defineProperty(CalendarWeek.prototype, "calendarOptionComputed", {
          /**
           * 计算属性，计算option的变化
           * @return {string} 返回空字符串
           */
          get: function get() {
            if (this.tempOption.beginDate != this.option.beginDate || this.tempOption.endDate != this.option.endDate || this.tempOption.currentDate != this.option.currentDate) {
              this.tempOption = (0, _assign2.default)({}, this.option);
              this.calenderOption = (0, _assign2.default)({}, this.option);
              this.calenderOption.showHeader = this.option.showHeader;
              this.calenderOption.beginDate = Utils.createCorrectDate(this.option.beginDate);
              this.calenderOption.endDate = Utils.createCorrectDate(this.option.endDate);
              this.calenderOption.currentDate = Utils.createCorrectDate(this.option.currentDate);
              this.initialWeekCalenderOptions(this.calenderOption);
            }
            return "";
          },
          enumerable: true,
          configurable: true
        });
        /**
         * 初始化周日历组件相关配置数据
         * @param {Calender.CalenderOptions} initCalenderData 初始化周日历组件的数据
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.initialWeekCalenderOptions = function (initCalenderData) {
          //重置原来渲染的所有数据
          this.daySwiperIncludes = new Array();
          //清空原来的日历数据
          this.weekCalender.WeekDayList.length = 0;
          this.daySwiperTempDate = "";
          this.daySwiperIndex = 1;
          //重置daySwiper的索引
          if (this.daySwiper) {
            this.daySwiper.activeIndex = 1;
            this.daySwiper.realIndex = 1;
          }
          this.initCalender(initCalenderData);
        };
        /**
         * 渲染日历视图
         * @param {Date} date 日期对象
         * @param {boolean} isRight 是否往右边增加一个月份的日历，true为往右边增加，false为往左边增加，默认为true
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.renderCalenderView = function (date, isRight) {
          if (isRight === void 0) {
            isRight = true;
          }
          var dayList = [];
          //当前是周几
          var weekDay = date.getDay();
          //从周日到今天相差几天
          var diffBeginDay = weekDay - 0;
          var beginDate = Utils.copyDate(date);
          beginDate.setDate(beginDate.getDate() - diffBeginDay);
          this.daySwiperIncludes.push(Utils.dateFormat("yyyy-MM-dd", beginDate));
          //当前日期
          var today = Utils.dateFormat("yyyy-MM-dd", new Date());
          var defaultDay = Utils.dateFormat("yyyy-MM-dd", this.calenderOption.currentDate);
          for (var i = 0; i <= 6; i++) {
            var tempDate1 = Utils.copyDate(beginDate);
            tempDate1.setDate(tempDate1.getDate() + i);
            //判断是否已经超过最大日期，如果已经超过最大日期，则生成空的元素
            if (tempDate1 <= this.calenderOption.endDate && this.calenderOption.beginDate <= tempDate1) {
              var dayModel = new __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */].DayModel();
              dayModel.currentDate = Utils.dateFormat("yyyy-MM-dd", tempDate1);
              dayModel.day = tempDate1.getDate();
              dayModel.dayDesc = tempDate1.getDate().toString();
              dayModel.oriDayDesc = dayModel.dayDesc;
              if (today == dayModel.currentDate && today == defaultDay) {
                dayModel.dayDesc = "今";
                dayModel.oriDayDesc = dayModel.dayDesc;
                dayModel.dayClass = "day current";
                dayModel.oriDayClass = "day";
                this.chooseDayItemHandle(dayModel, null);
              } else if (defaultDay == dayModel.currentDate) {
                dayModel.dayClass = "day current";
                this.chooseDayItemHandle(dayModel, null);
              }
              dayList.push(dayModel);
            } else {
              var dayModel = new __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */].DayModel();
              dayList.push(dayModel);
            }
          }
          if (isRight) this.weekCalender.WeekDayList.push({ dayList: dayList });else {
            this.weekCalender.WeekDayList.unshift({ dayList: dayList });
          }
        };
        /**
         * 初始化日历视图数据 初始化渲染三周的日历，当前周，上一个周，下一个周
         * - 1、默认以currentDate为当前周
         * @param  {Calender.CalenderOptions} calenderOption 日历初始化选项
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.initCalender = function (calendarOption) {
          //默认时间
          var currentDate = Utils.copyDate(calendarOption.currentDate);
          //渲染上一周
          var tempDate = Utils.copyDate(calendarOption.currentDate);
          tempDate.setDate(tempDate.getDate() - 7);
          if (tempDate >= calendarOption.beginDate) {
            this.renderCalenderView(tempDate);
          } else {
            //重置daySwiper的索引
            if (this.daySwiper) {
              this.daySwiper.activeIndex = 0;
              this.daySwiper.realIndex = 0;
              this.daySwiperIndex = 0;
            }
          }
          //渲染当前周
          this.renderCalenderView(currentDate);
          //渲染下一周
          tempDate = Utils.copyDate(calendarOption.currentDate);
          tempDate.setDate(tempDate.getDate() + 7);
          if (tempDate <= calendarOption.endDate) this.renderCalenderView(tempDate);
        };
        /**
         * 初始化视图相关事件
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.mounted = function () {
          var _this = this;
          //@ts-ignore
          this.daySwiper = this.$refs.daySwiper.swiper;
          this.daySwiper.on("slideChangeTransitionEnd", function () {
            var date = this.slides.eq(this.activeIndex).find("div").attr("data-date");
            if (_this.daySwiperTempDate == date) {
              return;
            }
            _this.daySwiperTempDate = date;
            //需要判断是否是最后一个slider模块
            if (this.activeIndex >= _this.daySwiperIndex) {
              _this.slideNextTransitionEnd(this);
              _this.daySwiperIndex += 1;
            } else {
              _this.slidePrevTransitionEnd(this);
              _this.daySwiperIndex -= 1;
            }
          });
          //默认时间
          var currentDate = Utils.copyDate(this.calenderOption.currentDate);
          //渲染上一周
          var tempDate = Utils.copyDate(this.calenderOption.currentDate);
          tempDate.setDate(tempDate.getDate() - 7);
          if (tempDate < this.calenderOption.beginDate) {
            this.daySwiper.activeIndex = 0;
            this.daySwiper.realIndex = 0;
            this.daySwiperIndex = 0;
          }
        };
        /**
         * 向左边滑动
         * @param {swiper} daySwiper
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.slidePrevTransitionEnd = function (daySwiper) {
          var _this = this;
          var currentMonthDateStr = daySwiper.slides.eq(daySwiper.activeIndex).find("div").attr("data-date");
          var chooseDate = null;
          for (var _i = 0, _a = _this.weekCalender.WeekDayList; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.dayList; _b < _c.length; _b++) {
              var item1 = _c[_b];
              if (!item1.dayDesc) continue;
              if (item1.dayClass.indexOf("current") > -1) {
                //取出选中的一天
                chooseDate = Utils.createCorrectDate(item1.currentDate);
              }
              item1.dayDesc = item1.oriDayDesc;
              item1.dayClass = item1.oriDayClass;
            }
          }
          /*******************提前渲染上一周的日历 begin*****************/
          var currentDate = Utils.createCorrectDate(currentMonthDateStr);
          var beginDate = _this.calenderOption.beginDate;
          if (currentDate > beginDate) {
            currentDate.setDate(currentDate.getDate() - 7);
            var dateStr = Utils.dateFormat("yyyy-MM-dd", currentDate);
            if (!_this.daySwiperIncludes.includes(dateStr)) {
              _this.renderCalenderView(currentDate, false);
              _this.daySwiperIncludes.push(dateStr);
              daySwiper.activeIndex = daySwiper.activeIndex + 1;
              daySwiper.realIndex = daySwiper.realIndex + 1;
              _this.daySwiperIndex += 1;
            }
          }
          _this.swipeWeekCalenderSlideHandle(currentMonthDateStr, true);
          /*******************提前渲染上一周的日历 end*****************/
          //如果是最前一周，则显示最前一周第一天
          //否则，原来选的是周几，则显示周几
          chooseDate.setDate(chooseDate.getDate() - 7);
          var chooseDay = null;
          for (var _d = 0, _e = _this.weekCalender.WeekDayList; _d < _e.length; _d++) {
            var item = _e[_d];
            for (var _f = 0, _g = item.dayList; _f < _g.length; _f++) {
              var item1 = _g[_f];
              if (!item1.dayDesc) continue;
              if (chooseDate >= beginDate) {
                chooseDay = Utils.dateFormat("yyyy-MM-dd", chooseDate);
              } else {
                chooseDay = Utils.dateFormat("yyyy-MM-dd", beginDate);
              }
              if (item1.currentDate != chooseDay) continue;
              item1.dayClass = "day current";
              _this.chooseDayItemHandle(item1, null);
              break;
            }
          }
        };
        /**
         * 向右边滑动
         * @param {swiper} daySwiper
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.slideNextTransitionEnd = function (daySwiper) {
          var _this = this;
          var currentMonthDateStr = daySwiper.slides.eq(daySwiper.activeIndex).find("div").attr("data-date");
          var chooseDate = null;
          for (var _i = 0, _a = _this.weekCalender.WeekDayList; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.dayList; _b < _c.length; _b++) {
              var item1 = _c[_b];
              if (!item1.dayDesc) continue;
              if (item1.dayClass.indexOf("current") > -1) {
                //取出选中的一天
                chooseDate = Utils.createCorrectDate(item1.currentDate);
              }
              item1.dayDesc = item1.oriDayDesc;
              item1.dayClass = item1.oriDayClass;
            }
          }
          /*******************提前渲染下一周的日历 begin*****************/
          var currentDate = Utils.createCorrectDate(currentMonthDateStr);
          var endDate = _this.calenderOption.endDate;
          currentDate.setDate(currentDate.getDate() + 7);
          if (currentDate < endDate) {
            var dateStr = Utils.dateFormat("yyyy-MM-dd", currentDate);
            if (!_this.daySwiperIncludes.includes(dateStr)) {
              _this.renderCalenderView(currentDate);
              _this.daySwiperIncludes.push(dateStr);
            }
          }
          _this.swipeWeekCalenderSlideHandle(currentMonthDateStr, true);
          /*******************提前渲染下一周的日历 end*****************/
          //默认显示的日期，如果是最后一周，则显示最后一周的最后一天，
          //否则，原来选的是周几，则显示周几
          chooseDate.setDate(chooseDate.getDate() + 7);
          var chooseDay = null;
          for (var _d = 0, _e = _this.weekCalender.WeekDayList; _d < _e.length; _d++) {
            var item = _e[_d];
            for (var _f = 0, _g = item.dayList; _f < _g.length; _f++) {
              var item1 = _g[_f];
              if (!item1.dayDesc) continue;
              if (chooseDate <= endDate) {
                chooseDay = Utils.dateFormat("yyyy-MM-dd", chooseDate);
              } else {
                chooseDay = Utils.dateFormat("yyyy-MM-dd", endDate);
              }
              if (item1.currentDate != chooseDay) continue;
              item1.dayClass = "day current";
              _this.chooseDayItemHandle(item1, null);
              break;
            }
          }
        };
        /**
         * 日历组件滑动的时候通知事件，让组件调用者重置日历状态
         * @param {string} date 日期
         * @param {boolean} isNext 是否渲染下下周日期，默认为true，false为渲染上上周日期
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.swipeWeekCalenderSlideHandle = function (date, isNext) {
          if (isNext === void 0) {
            isNext = true;
          }
        };
        /**
         * 选择具体的日期
         * @param {object} dayItem 当前月份，精确到天：2018-01-01
         * @param {event} event 点击事件
         * @return {void} 无返回值
         */
        CalendarWeek.prototype.chooseDayItemHandle = function (dayItem, event) {
          if (event === void 0) {
            event = null;
          }
          this.dateDescription = dayItem.currentDate;
          if (!dayItem.currentDate || !dayItem.enabled) return;
          var _this = this;
          //把选中的时间日期赋值给calenderChoosedModel，发送给外部调用者
          for (var _i = 0, _a = this.weekCalender.WeekDayList; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var _b = 0, _c = item.dayList; _b < _c.length; _b++) {
              var item1 = _c[_b];
              if (!item1.dayDesc || !item1.enabled) continue;
              if (item1.currentDate == dayItem.currentDate) {
                //当前日期，则变更状态
                item1.dayClass = "day current";
                if (item1.oriDayClass) item1.dayClass = "day current " + item1.oriDayClass;
              } else {
                //不是当前日期，则重置状态
                item1.dayDesc = item1.oriDayDesc;
                item1.dayClass = item1.oriDayClass;
              }
            }
          }
        };
        var _a, _b;
        __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vue_property_decorator__["a" /* Prop */])(), __metadata("design:type", typeof (_a = (typeof __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__CalenderModel__["a" /* Calender */]).CalenderOptions) === "function" && _a || Object)], CalendarWeek.prototype, "option", void 0);
        __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vue_property_decorator__["b" /* Emit */])("on-slide"), __metadata("design:type", Function), __metadata("design:paramtypes", [String, Boolean]), __metadata("design:returntype", void 0)], CalendarWeek.prototype, "swipeWeekCalenderSlideHandle", null);
        __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vue_property_decorator__["b" /* Emit */])("on-click"), __metadata("design:type", Function), __metadata("design:paramtypes", [Object, typeof (_b = typeof Event !== "undefined" && Event) === "function" && _b || Object]), __metadata("design:returntype", void 0)], CalendarWeek.prototype, "chooseDayItemHandle", null);
        CalendarWeek = __decorate([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vue_property_decorator__["c" /* Component */])({
          template: __webpack_require__(16),
          components: {
            swiper: __WEBPACK_IMPORTED_MODULE_4_vue_awesome_swiper__["swiper"],
            swiperSlide: __WEBPACK_IMPORTED_MODULE_4_vue_awesome_swiper__["swiperSlide"]
          }
        })
        /**
         * 周日历组件
         * @class
         * @extends {Vue}
         */
        ], CalendarWeek);
        return CalendarWeek;
      }(__WEBPACK_IMPORTED_MODULE_2_vue_property_decorator__["d" /* Vue */]);
      /* harmony default export */__webpack_exports__["a"] = CalendarWeek;

      /***/
    },
    /* 7 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(6);

      /* harmony default export */__webpack_exports__["default"] = __WEBPACK_IMPORTED_MODULE_0__src_index__["a" /* default */];

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(false);
      // imports
      exports.i(__webpack_require__(9), "");

      // module
      exports.push([module.i, "/*footer*/\n/*footer*/\n/**\n * 图片的垂直居中，注意容器不能设置float，会破坏display的效果，有需要建议在外层增加一层div包裹\n *\n * 正常使用，将该方法设置给img的父元素即可:\n *    div.pic-wrapper\n *      img\n * 若元素需要float:\n *    div.float\n *      div.pic-wrapper\n *        img\n * @param width\n * @param height\n */\n/**\n * 兼容一个参数的写法，长宽相等\n */\nhtml,\nbody {\n  height: 100%;\n  font-family: \"\\5FAE\\8F6F\\96C5\\9ED1\", \"Microsoft Yahei\", \"Hiragino Sans GB\", tahoma, arial, \"\\5B8B\\4F53\";\n  font-size: 14px;\n  user-select: none;\n}\n.calender-week-wrapper {\n  background: #ffffff;\n}\n.calender-week-wrapper .calender-month {\n  position: relative;\n  border-bottom: 1px solid #e6e6e6;\n}\n.calender-week-wrapper .calender-month .month-list .month-item {\n  width: 100%;\n  text-align: center;\n  padding: 0.37333333rem 0;\n}\n.calender-week-wrapper .calender-month .month-list .month-item .month {\n  display: inline-block;\n  font-size: 16px;\n  color: #4d5270;\n  position: relative;\n}\n.calender-week-wrapper .calender-month .month-list .month-item .month [data-dpr=\"2\"] {\n  font-size: 32px;\n}\n.calender-week-wrapper .calender-month .month-list .month-item .month [data-dpr=\"3\"] {\n  font-size: 48px;\n}\n.calender-week-wrapper .swiper-container {\n  width: 100%;\n}\n.calender-week-wrapper .calender-week {\n  *zoom: 1;\n  padding-top: 0.53333333rem;\n}\n.calender-week-wrapper .calender-week:before,\n.calender-week-wrapper .calender-week:after {\n  content: \"\";\n  display: table;\n}\n.calender-week-wrapper .calender-week:after {\n  clear: both;\n}\n.calender-week-wrapper .calender-week .week-item {\n  display: block;\n  float: left;\n  *display: inline;\n  width: 14.28%;\n  font-size: 15px;\n  color: #999;\n  text-align: center;\n}\n.calender-week-wrapper .calender-week .week-item [data-dpr=\"2\"] {\n  font-size: 30px;\n}\n.calender-week-wrapper .calender-week .week-item [data-dpr=\"3\"] {\n  font-size: 45px;\n}\n.calender-week-wrapper .calender-day {\n  margin-top: 0.24rem;\n}\n.calender-week-wrapper .calender-day .day-items {\n  *zoom: 1;\n}\n.calender-week-wrapper .calender-day .day-items:before,\n.calender-week-wrapper .calender-day .day-items:after {\n  content: \"\";\n  display: table;\n}\n.calender-week-wrapper .calender-day .day-items:after {\n  clear: both;\n}\n.calender-week-wrapper .calender-day .day-items .item {\n  float: left;\n  *display: inline;\n  width: 14.28%;\n  height: 0.93333333rem;\n  position: relative;\n  text-align: center;\n}\n.calender-week-wrapper .calender-day .day-items .item .day {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 0.85333333rem;\n  height: 0.85333333rem;\n  font-size: 15px;\n  color: #999;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  -o-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  -webkit-border-radius: 0.8533333333333334rem;\n  -webkit-background-clip: padding-box;\n  -moz-border-radius: 0.8533333333333334rem;\n  -moz-background-clip: padding;\n  border-radius: 0.8533333333333334rem;\n  background-clip: padding-box;\n}\n.calender-week-wrapper .calender-day .day-items .item .day [data-dpr=\"2\"] {\n  font-size: 30px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day [data-dpr=\"3\"] {\n  font-size: 45px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day.current {\n  background: #59BBFF;\n  color: #fff !important;\n  font-size: 16px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day.current [data-dpr=\"2\"] {\n  font-size: 32px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day.current [data-dpr=\"3\"] {\n  font-size: 48px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day.no-today {\n  width: 0.61333333rem;\n  height: 0.61333333rem;\n  line-height: 1;\n  padding: 0.13333333rem 0;\n  background: #ffb39c;\n  color: #fff;\n  font-size: 15px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day.no-today [data-dpr=\"2\"] {\n  font-size: 30px;\n}\n.calender-week-wrapper .calender-day .day-items .item .day.no-today [data-dpr=\"3\"] {\n  font-size: 45px;\n}\n", ""]);

      // exports


      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      exports = module.exports = __webpack_require__(1)(false);
      // imports


      // module
      exports.push([module.i, "/**\n * Swiper 4.3.3\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * http://www.idangero.us/swiper/\n *\n * Copyright 2014-2018 Vladimir Kharlampidi\n *\n * Released under the MIT License\n *\n * Released on: June 5, 2018\n */\n.swiper-container{margin:0 auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:100%;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;-o-transition-property:transform;transition-property:transform;transition-property:transform,-webkit-transform}.swiper-invisible-blank-slide{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;-o-transition-property:transform,height;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.swiper-container-3d{-webkit-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-wp8-horizontal,.swiper-container-wp8-horizontal>.swiper-wrapper{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-container-wp8-vertical,.swiper-container-wp8-vertical>.swiper-wrapper{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s opacity;-o-transition:.3s opacity;transition:.3s opacity;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{-webkit-transform:scale(.66);-ms-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{-webkit-transform:scale(.66);-ms-transform:scale(.66);transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{-webkit-transform:scale(.33);-ms-transform:scale(.33);transform:scale(.33)}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;-webkit-box-shadow:none;box-shadow:none;-webkit-appearance:none;-moz-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:6px 0;display:block}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;-webkit-transition:.2s top,.2s -webkit-transform;transition:.2s top,.2s -webkit-transform;-o-transition:.2s transform,.2s top;transition:.2s transform,.2s top;transition:.2s transform,.2s top,.2s -webkit-transform}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s left,.2s -webkit-transform;transition:.2s left,.2s -webkit-transform;-o-transition:.2s transform,.2s left;transition:.2s transform,.2s left;transition:.2s transform,.2s left,.2s -webkit-transform}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{-webkit-transition:.2s right,.2s -webkit-transform;transition:.2s right,.2s -webkit-transform;-o-transition:.2s transform,.2s right;transition:.2s transform,.2s right;transition:.2s transform,.2s right,.2s -webkit-transform}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-ms-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{-webkit-transform-origin:right top;-ms-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:4px;left:0;top:0}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{width:4px;height:100%;left:0;top:0}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-progressbar.swiper-pagination-white{background:rgba(255,255,255,.25)}.swiper-pagination-progressbar.swiper-pagination-white .swiper-pagination-progressbar-fill{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-pagination-progressbar.swiper-pagination-black{background:rgba(0,0,0,.25)}.swiper-pagination-progressbar.swiper-pagination-black .swiper-pagination-progressbar-fill{background:#000}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-ms-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:'';width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-coverflow .swiper-wrapper{-ms-perspective:1200px}", ""]);

      // exports


      /***/
    },
    /* 10 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = __webpack_require__(11);

      /***/
    },
    /* 11 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var class2type = __webpack_require__(2);
      var getProto = __webpack_require__(12);
      var hasOwn = __webpack_require__(4);
      var array = __webpack_require__(0);
      var push = __webpack_require__(15);
      var indexOf = __webpack_require__(13);
      var fnToString = __webpack_require__(3);
      var objectFunctionString = __webpack_require__(14);
      var types = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol"];
      types.map(function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
      });

      module.exports = {
        type: function type(obj) {
          if (obj == null) {
            return obj + "";
          }
          return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
        },
        isNull: function isNull(obj) {
          return obj === null || typeof obj === "undefined";
        },
        isPlainObject: function isPlainObject(obj) {
          var proto, Ctor;
          if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
          }

          proto = getProto(obj);
          if (!proto) {
            return true;
          }
          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === objectFunctionString;
        },
        isEmptyObject: function isEmptyObject(obj) {
          var name;
          for (name in obj) {
            return false;
          }
          return true;
        },
        isFunction: function isFunction(obj) {
          return this.type(obj) === "function";
        },

        isNumeric: function isNumeric(obj) {
          var type = this.type(obj);
          return (type === "number" || type === "string") &&
          // parseFloat NaNs numeric-cast false positives ("")
          // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
          // subtraction forces infinities to NaN
          !isNaN(obj - parseFloat(obj));
        },
        isArray: function isArray(obj) {
          return this.type(obj) == "array";
        },
        isBoolean: function isBoolean(obj) {
          return this.type(obj) == "boolean";
        },
        isDate: function isDate(obj) {
          return this.type(obj) == "date";
        },
        contain: function contain(elem, array, i) {
          return array == null ? -1 : indexOf.call(array, elem, i);
        },
        merge: function merge(first, second) {
          var len = +second.length,
              j = 0,
              i = first.length;
          for (; j < len; j++) {
            first[i++] = second[j];
          }
          first.length = i;
          return first;
        },
        trim: function trim(text) {
          return text == null ? "" : (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
        },

        // results is for internal usage only
        makeArray: function makeArray(arr, results) {
          var ret = results || [];
          if (arr != null) {
            if (this.isArrayLike(Object(arr))) {
              this.merge(ret, typeof arr === "string" ? [arr] : arr);
            } else {
              push.call(ret, arr);
            }
          }
          return ret;
        },
        isWindow: function isWindow(obj) {
          return obj != null && obj === obj.window;
        },
        isArrayLike: function isArrayLike(obj) {
          var length = !!obj && "length" in obj && obj.length,
              type = this.type(obj);
          if (type === "function" || this.isWindow(obj)) {
            return false;
          }
          return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
        },
        unique: function unique(arr) {
          var res = [];
          var json = {};
          for (var i = 0; i < arr.length; i++) {
            if (!json[arr[i]]) {
              res.push(arr[i]);
              json[arr[i]] = 1;
            }
          }
          return res;
        },
        findElementIndex: function findElementIndex(arr, element) {
          for (var i = 0; i < arr.length; i++) {
            if (Object.prototype.toString.call(arr[i]) == "[object Object]") {
              for (var key in arr[i]) {
                if (key == element) {
                  return i;
                }
              }
            } else if (element === arr[i]) {
              return i;
            }
          }
          return -1;
        },
        removeElement: function removeElement(array, element) {
          var n = this.findElementIndex(array, element);
          if (n < 0) {
            return array;
          } else {
            return array.splice(n, 1); //this.slice(0, n).concat(this.slice(n + 1, this.length));
          }
        },
        copyDate: function copyDate(date) {
          try {
            var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            newDate.setHours(date.getHours());
            newDate.setMinutes(date.getMinutes());
            newDate.setSeconds(date.getSeconds());
            newDate.setMilliseconds(date.getMilliseconds());

            return newDate;
          } catch (e) {
            throw "invalidDate";
          }
        },
        /**
         * 创建正确的Date对象
         * @param strFormatDate 日期字符串，支持格式
         *  2017-11-19 12:20:30:333
         *  2017/11/19 12:20:30:333
         *  2017.11.19 12:20:30:333
         *  2017-11-19
         *  2017/11/19
         *  2017.11.19
         * @param dateArr 时、分、秒数组，格式
         *  [23,59,59]
         */
        createCorrectDate: function createCorrectDate(strFormatDate, dateArr) {
          if (strFormatDate == undefined || strFormatDate == null || strFormatDate == '') return 'invalidDate';
          var dateObj;
          dateArr = dateArr || [];
          try {
            var dateArray;
            if (strFormatDate.indexOf(":") > -1) {
              var dateStrSplit = strFormatDate.toString().split(" ");
              strFormatDate = dateStrSplit[0];
              if (dateArr.length <= 0) dateArr = dateStrSplit[1].split(":");
            }
            if (strFormatDate.indexOf('-') > -1) {
              dateArray = strFormatDate.toString().split('-');
              dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
              if (Number(dateArray[0]) != dateObj.getFullYear()) return 'invalidDate';
              if (Number(dateArray[1]) != dateObj.getMonth() + 1) return 'invalidDate';
              if (Number(dateArray[2]) != dateObj.getDate()) return 'invalidDate';
            } else if (strFormatDate.indexOf('.') > -1) {
              dateArray = strFormatDate.toString().split('.');
              dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
              if (Number(dateArray[0]) != dateObj.getFullYear()) return 'invalidDate';
              if (Number(dateArray[1]) != dateObj.getMonth() + 1) return 'invalidDate';
              if (Number(dateArray[2]) != dateObj.getDate()) return 'invalidDate';
            } else if (strFormatDate.indexOf('/') > -1) {
              dateArray = strFormatDate.toString().split('/');
              dateObj = new Date(Number(dateArray[0]), Number(dateArray[1]) - 1, Number(dateArray[2]));
              if (Number(dateArray[0]) != dateObj.getFullYear()) return 'invalidDate';
              if (Number(dateArray[1]) != dateObj.getMonth() + 1) return 'invalidDate';
              if (Number(dateArray[2]) != dateObj.getDate()) return 'invalidDate';
            }

            for (var i = 0; i < dateArr.length; i++) {
              switch (i) {
                case 0:
                  dateObj.setHours(dateArr[0]);
                  if (dateObj.getHours() != Number(dateArr[0])) return 'invalidDate';
                  break;
                case 1:
                  dateObj.setMinutes(dateArr[1]);
                  if (dateObj.getMinutes() != Number(dateArr[1])) return 'invalidDate';
                  break;
                case 2:
                  dateObj.setSeconds(dateArr[2]);
                  if (dateObj.getSeconds() != Number(dateArr[2])) return 'invalidDate';
                  break;
                case 3:
                  dateObj.setMilliseconds(dateArr[3]);
                  if (dateObj.getMilliseconds() != Number(dateArr[3])) return 'invalidDate';
                default:
                  break;
              }
            }
            if (dateArr.length <= 0) {
              dateObj.setHours(0);
              dateObj.setMinutes(0);
              dateObj.setSeconds(0);
              dateObj.setMilliseconds(0);
            }

            return dateObj;
          } catch (e) {
            return 'invalidDate';
          }
        },
        dateFormat: function dateFormat(fmt, objDate) {
          var o = {
            "M+": objDate.getMonth() + 1, //月份
            "d+": objDate.getDate(), //日
            "h+": objDate.getHours(), //小时
            "m+": objDate.getMinutes(), //分
            "s+": objDate.getSeconds(), //秒
            "q+": Math.floor((objDate.getMonth() + 3) / 3), //季度
            "S": objDate.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (objDate.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }return fmt;
        },
        isLeapYear: function isLeapYear(objDate) {
          //判断闰年
          var pYear = objDate.getFullYear();
          if (!isNaN(parseInt(pYear))) {
            if (pYear % 4 == 0 && pYear % 100 != 0 || pYear % 100 == 0 && pYear % 400 == 0) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
        /***************************************************
         *比较两个日期的间隔
         *参数说明:
         * @param interval要返回的两个日期的间隔,比如：
         *  s：返回两个日期相差的秒数
         *  n：返回两个日期相差的分钟数
         *  h：返回两个日期相差的小时数
         *  d：返回两个日期相差的天数
         *  w：返回两个日期相差的周数
         *  m：返回连个日期相差的月数
         *  y：返回连个日期相差的年数
         * @param beginDate：开始日期
         * @param endDate:结束日期
         ****************************************************/
        diffDate: function diffDate(interval, beginDate, endDate) {
          var dtBegin;
          var dtEnd;
          try {
            if (Object.prototype.toString.call(beginDate) == "[object Date]") {
              dtBegin = beginDate;
            } else if (Object.prototype.toString.call(beginDate) == "[object String]") {
              dtBegin = this.createCorrectDate(beginDate);
            }

            if (Object.prototype.toString.call(endDate) == "[object Date]") {
              dtEnd = endDate;
            } else if (Object.prototype.toString.call(endDate) == "[object String]") {
              dtEnd = this.createCorrectDate(endDate);
            }

            if (isNaN(dtEnd)) return undefined;
            switch (interval) {
              case "s":
                return parseInt((dtEnd - dtBegin) / 1000);
              case "n":
                return parseInt((dtEnd - dtBegin) / 60000);
              case "h":
                return parseInt((dtEnd - dtBegin) / 3600000);
              case "d":
                return parseInt((dtEnd - dtBegin) / 86400000);
              case "w":
                return parseInt((dtEnd - dtBegin) / (86400000 * 7));
              case "m":
                return dtEnd.getMonth() + 1 + (dtEnd.getFullYear() - dtBegin.getFullYear()) * 12 - (dtBegin.getMonth() + 1);
              case "y":
                return dtEnd.getFullYear() - dtBegin.getFullYear();
            }
          } catch (e) {
            throw "无效的时间格式！";
          }
        },
        /***************************************************
         *比较两个日期的间隔
         *参数说明:
         *objDate：结束日期
         *interval要返回的两个日期的间隔,比如：
         *s：返回两个日期相差的秒数
         *n：返回两个日期相差的分钟数
         *h：返回两个日期相差的小时数
         *d：返回两个日期相差的天数
         *w：返回两个日期相差的周数
         *m：返回连个日期相差的月数
         *y：返回连个日期相差的年数
         ****************************************************/
        dateDiff: function dateDiff(interval, objBeginDate, objEndDate) {
          var dtBegin = new Date(objBeginDate);
          var dtEnd = new Date(objEndDate);
          if (isNaN(dtEnd)) return undefined;
          switch (interval) {
            case "s":
              return parseInt((dtEnd - dtBegin) / 1000);
            case "n":
              return parseInt((dtEnd - dtBegin) / 60000);
            case "h":
              return parseInt((dtEnd - dtBegin) / 3600000);
            case "d":
              return parseInt((dtEnd - dtBegin) / 86400000);
            case "w":
              return parseInt((dtEnd - dtBegin) / (86400000 * 7));
            case "m":
              return dtEnd.getMonth() + 1 + (dtEnd.getFullYear() - dtBegin.getFullYear()) * 12 - (dtBegin.getMonth() + 1);
            case "y":
              return dtEnd.getFullYear() - dtBegin.getFullYear();
          }
        },
        clone: function clone() {
          var options,
              name,
              src,
              copy,
              copyIsArray,
              clone,
              target = arguments[0] || {},
              i = 1,
              length = arguments.length,
              deep = false;

          // Handle a deep copy situation
          if (typeof target === "boolean") {
            deep = target;
            // Skip the boolean and the target
            target = arguments[i] || {};
            i++;
          }
          // Handle case when target is a string or something (possible in deep copy)
          if ((typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) !== "object" && !this.isFunction(target)) {
            target = {};
          }
          if (i === length) {
            target = this;
            i--;
          }
          for (; i < length; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
              // Extend the base object
              for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target === copy) {
                  continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && Array.isArray(src) ? src : [];
                  } else {
                    clone = src && this.isPlainObject(src) ? src : {};
                  }
                  // Never move original objects, clone them
                  target[name] = this.clone(deep, clone, copy);
                  // Don't bring in undefined values
                } else if (copy !== undefined) {
                  target[name] = copy;
                }
              }
            }
          }
          // Return the modified object
          return target;
        },
        getQuery: function getQuery(queryKey, target, pattern) {
          var locationSearch = location.search;
          if (target) locationSearch = target;
          var regExp = new RegExp("" + queryKey + "=([^&=]+)");
          if (pattern) regExp = pattern;
          var query;
          if (regExp.test(locationSearch)) {
            query = RegExp.$1;
          }
          return query;
        },
        getOffset: function getOffset(element) {
          var left = 0,
              top = 0;
          var parent = element;
          while (parent != null) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
          }
          return { offsetX: left, offsetY: top };
        },
        getScrollOffsets: function getScrollOffsets(w) {
          var w = w || window;
          if (w.pageXOffset != null) {
            return { scrollX: w.pageXOffset, scrollY: w.pageYOffset };
          }
          var doc = w.document;
          if (doc.compatMode == "CSS1Compat") {
            return { scrollX: doc.documentElement.scrollLeft, scrollY: doc.documentElement.scrollTop };
          }
          return { scrollX: doc.body.scrollLeft, scrollY: doc.body.scrollTop };
        },
        getViewPortSize: function getViewPortSize(w) {
          var w = w || window;
          if (w.innerWidth) {
            return { width: w.innerWidth, height: w.innerHeight };
          }
          var d = w.document;
          if (d.compatMode == "CSS1Compat") {
            return { width: d.documentElement.clientWidth, height: d.documentElement.clientHeight };
          }
          return { width: d.body.clientWidth, height: d.body.clientHeight };
        }
      };

      /***/
    },
    /* 12 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      module.exports = _getPrototypeOf2.default;

      /***/
    },
    /* 13 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var array = __webpack_require__(0);
      module.exports = array.indexOf;

      /***/
    },
    /* 14 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var fnToString = __webpack_require__(3);
      module.exports = fnToString.call(Object);

      /***/
    },
    /* 15 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      var array = __webpack_require__(0);
      module.exports = array.push;

      /***/
    },
    /* 16 */
    /***/function (module, exports) {

      module.exports = "<div class=\"calender-week-wrapper\">\r\n  <div ref=\"calenderMonthWrapper\" class=\"calender-month\" v-if=\"calenderOption.showHeader\">\r\n    <div class=\"month-list swiper-wrapper\">\r\n      <div class=\"month-item\">\r\n        <span class=\"month\">{{dateDescription}}</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"calender-week\">\r\n    <span class=\"week-item\">日</span>\r\n    <span class=\"week-item\">一</span>\r\n    <span class=\"week-item\">二</span>\r\n    <span class=\"week-item\">三</span>\r\n    <span class=\"week-item\">四</span>\r\n    <span class=\"week-item\">五</span>\r\n    <span class=\"week-item\">六</span>\r\n  </div>\r\n  {{calendarOptionComputed}}\r\n  <swiper class=\"calender-day\" :options=\"daySwiperOption\" ref=\"daySwiper\">\r\n    <swiper-slide v-for=\"weekCalender in weekCalender.WeekDayList\" class=\"day-items swiper-slide\">\r\n      <div v-for=\"item in weekCalender.dayList\" :data-date=\"item.currentDate\" class=\"item\">\r\n        <span v-on:click=\"chooseDayItemHandle(item,$event)\" :class=\"item.dayClass\">{{item.dayDesc}}</span>\r\n      </div>\r\n    </swiper-slide>\r\n\r\n  </swiper>\r\n</div>";

      /***/
    },
    /* 17 */
    /***/function (module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

      /***/
    },
    /* 18 */
    /***/function (module, exports, __webpack_require__) {

      // style-loader: Adds some css to the DOM by adding a <style> tag

      // load the styles
      var content = __webpack_require__(8);
      if (typeof content === 'string') content = [[module.i, content, '']];
      // Prepare cssTransformation
      var transform;

      var options = { "hmr": true };
      options.transform = transform;
      // add the styles to the DOM
      var update = __webpack_require__(19)(content, options);
      if (content.locals) module.exports = content.locals;
      // Hot Module Replacement
      if (false) {
        // When the styles change, update the <style> tags
        if (!content.locals) {
          module.hot.accept("!!../node_modules/_css-loader@0.28.11@css-loader/index.js!../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!./index.less", function () {
            var newContent = require("!!../node_modules/_css-loader@0.28.11@css-loader/index.js!../node_modules/_less-loader@4.1.0@less-loader/dist/cjs.js!./index.less");
            if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
            update(newContent);
          });
        }
        // When the module is disposed, remove the <style> tags
        module.hot.dispose(function () {
          update();
        });
      }

      /***/
    },
    /* 19 */
    /***/function (module, exports, __webpack_require__) {

      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */

      var stylesInDom = {};

      var memoize = function memoize(fn) {
        var memo;

        return function () {
          if (typeof memo === "undefined") memo = fn.apply(this, arguments);
          return memo;
        };
      };

      var isOldIE = memoize(function () {
        // Test for IE <= 9 as proposed by Browserhacks
        // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
        // Tests for existence of standard globals is to allow style-loader
        // to operate correctly into non-standard environments
        // @see https://github.com/webpack-contrib/style-loader/issues/177
        return window && document && document.all && !window.atob;
      });

      var getElement = function (fn) {
        var memo = {};

        return function (selector) {
          if (typeof memo[selector] === "undefined") {
            var styleTarget = fn.call(this, selector);
            // Special case to return head of iframe instead of iframe itself
            if (styleTarget instanceof window.HTMLIFrameElement) {
              try {
                // This will throw an exception if access to iframe is blocked
                // due to cross-origin restrictions
                styleTarget = styleTarget.contentDocument.head;
              } catch (e) {
                styleTarget = null;
              }
            }
            memo[selector] = styleTarget;
          }
          return memo[selector];
        };
      }(function (target) {
        return document.querySelector(target);
      });

      var singleton = null;
      var singletonCounter = 0;
      var stylesInsertedAtTop = [];

      var fixUrls = __webpack_require__(20);

      module.exports = function (list, options) {
        if (typeof DEBUG !== "undefined" && DEBUG) {
          if ((typeof document === 'undefined' ? 'undefined' : (0, _typeof3.default)(document)) !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
        }

        options = options || {};

        options.attrs = (0, _typeof3.default)(options.attrs) === "object" ? options.attrs : {};

        // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page
        if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

        // By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

        // By default, add <style> tags to the bottom of the target
        if (!options.insertAt) options.insertAt = "bottom";

        var styles = listToStyles(list, options);

        addStylesToDom(styles, options);

        return function update(newList) {
          var mayRemove = [];

          for (var i = 0; i < styles.length; i++) {
            var item = styles[i];
            var domStyle = stylesInDom[item.id];

            domStyle.refs--;
            mayRemove.push(domStyle);
          }

          if (newList) {
            var newStyles = listToStyles(newList, options);
            addStylesToDom(newStyles, options);
          }

          for (var i = 0; i < mayRemove.length; i++) {
            var domStyle = mayRemove[i];

            if (domStyle.refs === 0) {
              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j]();
              }delete stylesInDom[domStyle.id];
            }
          }
        };
      };

      function addStylesToDom(styles, options) {
        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];

          if (domStyle) {
            domStyle.refs++;

            for (var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j](item.parts[j]);
            }

            for (; j < item.parts.length; j++) {
              domStyle.parts.push(addStyle(item.parts[j], options));
            }
          } else {
            var parts = [];

            for (var j = 0; j < item.parts.length; j++) {
              parts.push(addStyle(item.parts[j], options));
            }

            stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts };
          }
        }
      }

      function listToStyles(list, options) {
        var styles = [];
        var newStyles = {};

        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = options.base ? item[0] + options.base : item[0];
          var css = item[1];
          var media = item[2];
          var sourceMap = item[3];
          var part = { css: css, media: media, sourceMap: sourceMap };

          if (!newStyles[id]) styles.push(newStyles[id] = { id: id, parts: [part] });else newStyles[id].parts.push(part);
        }

        return styles;
      }

      function insertStyleElement(options, style) {
        var target = getElement(options.insertInto);

        if (!target) {
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        }

        var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

        if (options.insertAt === "top") {
          if (!lastStyleElementInsertedAtTop) {
            target.insertBefore(style, target.firstChild);
          } else if (lastStyleElementInsertedAtTop.nextSibling) {
            target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
          } else {
            target.appendChild(style);
          }
          stylesInsertedAtTop.push(style);
        } else if (options.insertAt === "bottom") {
          target.appendChild(style);
        } else if ((0, _typeof3.default)(options.insertAt) === "object" && options.insertAt.before) {
          var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
          target.insertBefore(style, nextSibling);
        } else {
          throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
        }
      }

      function removeStyleElement(style) {
        if (style.parentNode === null) return false;
        style.parentNode.removeChild(style);

        var idx = stylesInsertedAtTop.indexOf(style);
        if (idx >= 0) {
          stylesInsertedAtTop.splice(idx, 1);
        }
      }

      function createStyleElement(options) {
        var style = document.createElement("style");

        options.attrs.type = "text/css";

        addAttrs(style, options.attrs);
        insertStyleElement(options, style);

        return style;
      }

      function createLinkElement(options) {
        var link = document.createElement("link");

        options.attrs.type = "text/css";
        options.attrs.rel = "stylesheet";

        addAttrs(link, options.attrs);
        insertStyleElement(options, link);

        return link;
      }

      function addAttrs(el, attrs) {
        (0, _keys2.default)(attrs).forEach(function (key) {
          el.setAttribute(key, attrs[key]);
        });
      }

      function addStyle(obj, options) {
        var style, update, remove, result;

        // If a transform function was defined, run it on the css
        if (options.transform && obj.css) {
          result = options.transform(obj.css);

          if (result) {
            // If transform returns a value, use that instead of the original css.
            // This allows running runtime transformations on the css.
            obj.css = result;
          } else {
            // If the transform function returns a falsy value, don't add this css.
            // This allows conditional loading of css
            return function () {
              // noop
            };
          }
        }

        if (options.singleton) {
          var styleIndex = singletonCounter++;

          style = singleton || (singleton = createStyleElement(options));

          update = applyToSingletonTag.bind(null, style, styleIndex, false);
          remove = applyToSingletonTag.bind(null, style, styleIndex, true);
        } else if (obj.sourceMap && typeof URL === "function" && typeof URL.createObjectURL === "function" && typeof URL.revokeObjectURL === "function" && typeof Blob === "function" && typeof btoa === "function") {
          style = createLinkElement(options);
          update = updateLink.bind(null, style, options);
          remove = function remove() {
            removeStyleElement(style);

            if (style.href) URL.revokeObjectURL(style.href);
          };
        } else {
          style = createStyleElement(options);
          update = applyToTag.bind(null, style);
          remove = function remove() {
            removeStyleElement(style);
          };
        }

        update(obj);

        return function updateStyle(newObj) {
          if (newObj) {
            if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
              return;
            }

            update(obj = newObj);
          } else {
            remove();
          }
        };
      }

      var replaceText = function () {
        var textStore = [];

        return function (index, replacement) {
          textStore[index] = replacement;

          return textStore.filter(Boolean).join('\n');
        };
      }();

      function applyToSingletonTag(style, index, remove, obj) {
        var css = remove ? "" : obj.css;

        if (style.styleSheet) {
          style.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = style.childNodes;

          if (childNodes[index]) style.removeChild(childNodes[index]);

          if (childNodes.length) {
            style.insertBefore(cssNode, childNodes[index]);
          } else {
            style.appendChild(cssNode);
          }
        }
      }

      function applyToTag(style, obj) {
        var css = obj.css;
        var media = obj.media;

        if (media) {
          style.setAttribute("media", media);
        }

        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          while (style.firstChild) {
            style.removeChild(style.firstChild);
          }

          style.appendChild(document.createTextNode(css));
        }
      }

      function updateLink(link, options, obj) {
        var css = obj.css;
        var sourceMap = obj.sourceMap;

        /*
        	If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
        	and there is no publicPath defined then lets turn convertToAbsoluteUrls
        	on by default.  Otherwise default to the convertToAbsoluteUrls option
        	directly
        */
        var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

        if (options.convertToAbsoluteUrls || autoFixUrls) {
          css = fixUrls(css);
        }

        if (sourceMap) {
          // http://stackoverflow.com/a/26603875
          css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent((0, _stringify2.default)(sourceMap)))) + " */";
        }

        var blob = new Blob([css], { type: "text/css" });

        var oldSrc = link.href;

        link.href = URL.createObjectURL(blob);

        if (oldSrc) URL.revokeObjectURL(oldSrc);
      }

      /***/
    },
    /* 20 */
    /***/function (module, exports) {

      /**
       * When source maps are enabled, `style-loader` uses a link element with a data-uri to
       * embed the css on the page. This breaks all relative urls because now they are relative to a
       * bundle instead of the current page.
       *
       * One solution is to only use full urls, but that may be impossible.
       *
       * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
       *
       * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
       *
       */

      module.exports = function (css) {
        // get current location
        var location = typeof window !== "undefined" && window.location;

        if (!location) {
          throw new Error("fixUrls requires window.location");
        }

        // blank or null?
        if (!css || typeof css !== "string") {
          return css;
        }

        var baseUrl = location.protocol + "//" + location.host;
        var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

        // convert each url(...)
        /*
        This regular expression is just a way to recursively match brackets within
        a string.
        	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
           (  = Start a capturing group
             (?:  = Start a non-capturing group
                 [^)(]  = Match anything that isn't a parentheses
                 |  = OR
                 \(  = Match a start parentheses
                     (?:  = Start another non-capturing groups
                         [^)(]+  = Match anything that isn't a parentheses
                         |  = OR
                         \(  = Match a start parentheses
                             [^)(]*  = Match anything that isn't a parentheses
                         \)  = Match a end parentheses
                     )  = End Group
                     *\) = Match anything and then a close parens
                 )  = Close non-capturing group
                 *  = Match anything
              )  = Close capturing group
         \)  = Match a close parens
        	 /gi  = Get all matches, not the first.  Be case insensitive.
         */
        var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
          // strip quotes (if they exist)
          var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
            return $1;
          }).replace(/^'(.*)'$/, function (o, $1) {
            return $1;
          });

          // already a full url? no change
          if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
            return fullMatch;
          }

          // convert the url to a full url
          var newUrl;

          if (unquotedOrigUrl.indexOf("//") === 0) {
            //TODO: should we add protocol?
            newUrl = unquotedOrigUrl;
          } else if (unquotedOrigUrl.indexOf("/") === 0) {
            // path should be relative to the base url
            newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
          } else {
            // path should be relative to current directory
            newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
          }

          // send back the fixed url(...)
          return "url(" + (0, _stringify2.default)(newUrl) + ")";
        });

        // send back the fixed css
        return fixedCss;
      };

      /***/
    },
    /* 21 */
    /***/function (module, exports, __webpack_require__) {

      /**
       * Swiper 4.3.3
       * Most modern mobile touch slider and framework with hardware accelerated transitions
       * http://www.idangero.us/swiper/
       *
       * Copyright 2014-2018 Vladimir Kharlampidi
       *
       * Released under the MIT License
       *
       * Released on: June 5, 2018
       */

      (function (global, factory) {
        true ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Swiper = factory();
      })(this, function () {
        'use strict';

        /**
         * SSR Window 1.0.0
         * Better handling for window object in SSR environment
         * https://github.com/nolimits4web/ssr-window
         *
         * Copyright 2018, Vladimir Kharlampidi
         *
         * Licensed under MIT
         *
         * Released on: February 10, 2018
         */

        var d;
        if (typeof document === 'undefined') {
          d = {
            body: {},
            addEventListener: function addEventListener() {},
            removeEventListener: function removeEventListener() {},
            activeElement: {
              blur: function blur() {},
              nodeName: ''
            },
            querySelector: function querySelector() {
              return null;
            },
            querySelectorAll: function querySelectorAll() {
              return [];
            },
            getElementById: function getElementById() {
              return null;
            },
            createEvent: function createEvent() {
              return {
                initEvent: function initEvent() {}
              };
            },
            createElement: function createElement() {
              return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function setAttribute() {},
                getElementsByTagName: function getElementsByTagName() {
                  return [];
                }
              };
            },
            location: { hash: '' }
          };
        } else {
          // eslint-disable-next-line
          d = document;
        }

        var doc = d;

        var w;
        if (typeof window === 'undefined') {
          w = {
            document: doc,
            navigator: {
              userAgent: ''
            },
            location: {},
            history: {},
            CustomEvent: function CustomEvent() {
              return this;
            },
            addEventListener: function addEventListener() {},
            removeEventListener: function removeEventListener() {},
            getComputedStyle: function getComputedStyle() {
              return {
                getPropertyValue: function getPropertyValue() {
                  return '';
                }
              };
            },
            Image: function Image() {},
            Date: function Date() {},
            screen: {},
            setTimeout: function setTimeout() {},
            clearTimeout: function clearTimeout() {}
          };
        } else {
          // eslint-disable-next-line
          w = window;
        }

        var win = w;

        /**
         * Dom7 2.0.6
         * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
         * http://framework7.io/docs/dom.html
         *
         * Copyright 2018, Vladimir Kharlampidi
         * The iDangero.us
         * http://www.idangero.us/
         *
         * Licensed under MIT
         *
         * Released on: May 27, 2018
         */

        var Dom7 = function Dom7(arr) {
          var self = this;
          // Create array-like object
          for (var i = 0; i < arr.length; i += 1) {
            self[i] = arr[i];
          }
          self.length = arr.length;
          // Return collection with methods
          return this;
        };

        function $(selector, context) {
          var arr = [];
          var i = 0;
          if (selector && !context) {
            if (selector instanceof Dom7) {
              return selector;
            }
          }
          if (selector) {
            // String
            if (typeof selector === 'string') {
              var els;
              var tempParent;
              var html = selector.trim();
              if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                var toCreate = 'div';
                if (html.indexOf('<li') === 0) {
                  toCreate = 'ul';
                }
                if (html.indexOf('<tr') === 0) {
                  toCreate = 'tbody';
                }
                if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
                  toCreate = 'tr';
                }
                if (html.indexOf('<tbody') === 0) {
                  toCreate = 'table';
                }
                if (html.indexOf('<option') === 0) {
                  toCreate = 'select';
                }
                tempParent = doc.createElement(toCreate);
                tempParent.innerHTML = html;
                for (i = 0; i < tempParent.childNodes.length; i += 1) {
                  arr.push(tempParent.childNodes[i]);
                }
              } else {
                if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                  // Pure ID selector
                  els = [doc.getElementById(selector.trim().split('#')[1])];
                } else {
                  // Other selectors
                  els = (context || doc).querySelectorAll(selector.trim());
                }
                for (i = 0; i < els.length; i += 1) {
                  if (els[i]) {
                    arr.push(els[i]);
                  }
                }
              }
            } else if (selector.nodeType || selector === win || selector === doc) {
              // Node/element
              arr.push(selector);
            } else if (selector.length > 0 && selector[0].nodeType) {
              // Array of elements or instance of Dom
              for (i = 0; i < selector.length; i += 1) {
                arr.push(selector[i]);
              }
            }
          }
          return new Dom7(arr);
        }

        $.fn = Dom7.prototype;
        $.Class = Dom7;
        $.Dom7 = Dom7;

        function unique(arr) {
          var uniqueArray = [];
          for (var i = 0; i < arr.length; i += 1) {
            if (uniqueArray.indexOf(arr[i]) === -1) {
              uniqueArray.push(arr[i]);
            }
          }
          return uniqueArray;
        }

        // Classes and attributes
        function addClass(className) {
          var this$1 = this;

          if (typeof className === 'undefined') {
            return this;
          }
          var classes = className.split(' ');
          for (var i = 0; i < classes.length; i += 1) {
            for (var j = 0; j < this.length; j += 1) {
              if (typeof this$1[j].classList !== 'undefined') {
                this$1[j].classList.add(classes[i]);
              }
            }
          }
          return this;
        }
        function removeClass(className) {
          var this$1 = this;

          var classes = className.split(' ');
          for (var i = 0; i < classes.length; i += 1) {
            for (var j = 0; j < this.length; j += 1) {
              if (typeof this$1[j].classList !== 'undefined') {
                this$1[j].classList.remove(classes[i]);
              }
            }
          }
          return this;
        }
        function hasClass(className) {
          if (!this[0]) {
            return false;
          }
          return this[0].classList.contains(className);
        }
        function toggleClass(className) {
          var this$1 = this;

          var classes = className.split(' ');
          for (var i = 0; i < classes.length; i += 1) {
            for (var j = 0; j < this.length; j += 1) {
              if (typeof this$1[j].classList !== 'undefined') {
                this$1[j].classList.toggle(classes[i]);
              }
            }
          }
          return this;
        }
        function attr(attrs, value) {
          var arguments$1 = arguments;
          var this$1 = this;

          if (arguments.length === 1 && typeof attrs === 'string') {
            // Get attr
            if (this[0]) {
              return this[0].getAttribute(attrs);
            }
            return undefined;
          }

          // Set attrs
          for (var i = 0; i < this.length; i += 1) {
            if (arguments$1.length === 2) {
              // String
              this$1[i].setAttribute(attrs, value);
            } else {
              // Object
              // eslint-disable-next-line
              for (var attrName in attrs) {
                this$1[i][attrName] = attrs[attrName];
                this$1[i].setAttribute(attrName, attrs[attrName]);
              }
            }
          }
          return this;
        }
        // eslint-disable-next-line
        function removeAttr(attr) {
          var this$1 = this;

          for (var i = 0; i < this.length; i += 1) {
            this$1[i].removeAttribute(attr);
          }
          return this;
        }
        function data(key, value) {
          var this$1 = this;

          var el;
          if (typeof value === 'undefined') {
            el = this[0];
            // Get value
            if (el) {
              if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
                return el.dom7ElementDataStorage[key];
              }

              var dataKey = el.getAttribute("data-" + key);
              if (dataKey) {
                return dataKey;
              }
              return undefined;
            }
            return undefined;
          }

          // Set value
          for (var i = 0; i < this.length; i += 1) {
            el = this$1[i];
            if (!el.dom7ElementDataStorage) {
              el.dom7ElementDataStorage = {};
            }
            el.dom7ElementDataStorage[key] = value;
          }
          return this;
        }
        // Transforms
        // eslint-disable-next-line
        function transform(transform) {
          var this$1 = this;

          for (var i = 0; i < this.length; i += 1) {
            var elStyle = this$1[i].style;
            elStyle.webkitTransform = transform;
            elStyle.transform = transform;
          }
          return this;
        }
        function transition(duration) {
          var this$1 = this;

          if (typeof duration !== 'string') {
            duration = duration + "ms"; // eslint-disable-line
          }
          for (var i = 0; i < this.length; i += 1) {
            var elStyle = this$1[i].style;
            elStyle.webkitTransitionDuration = duration;
            elStyle.transitionDuration = duration;
          }
          return this;
        }
        // Events
        function on() {
          var this$1 = this;
          var assign;

          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }var eventType = args[0];
          var targetSelector = args[1];
          var listener = args[2];
          var capture = args[3];
          if (typeof args[1] === 'function') {
            assign = args, eventType = assign[0], listener = assign[1], capture = assign[2];
            targetSelector = undefined;
          }
          if (!capture) {
            capture = false;
          }

          function handleLiveEvent(e) {
            var target = e.target;
            if (!target) {
              return;
            }
            var eventData = e.target.dom7EventData || [];
            if (eventData.indexOf(e) < 0) {
              eventData.unshift(e);
            }
            if ($(target).is(targetSelector)) {
              listener.apply(target, eventData);
            } else {
              var parents = $(target).parents(); // eslint-disable-line
              for (var k = 0; k < parents.length; k += 1) {
                if ($(parents[k]).is(targetSelector)) {
                  listener.apply(parents[k], eventData);
                }
              }
            }
          }
          function handleEvent(e) {
            var eventData = e && e.target ? e.target.dom7EventData || [] : [];
            if (eventData.indexOf(e) < 0) {
              eventData.unshift(e);
            }
            listener.apply(this, eventData);
          }
          var events = eventType.split(' ');
          var j;
          for (var i = 0; i < this.length; i += 1) {
            var el = this$1[i];
            if (!targetSelector) {
              for (j = 0; j < events.length; j += 1) {
                var event = events[j];
                if (!el.dom7Listeners) {
                  el.dom7Listeners = {};
                }
                if (!el.dom7Listeners[event]) {
                  el.dom7Listeners[event] = [];
                }
                el.dom7Listeners[event].push({
                  listener: listener,
                  proxyListener: handleEvent
                });
                el.addEventListener(event, handleEvent, capture);
              }
            } else {
              // Live events
              for (j = 0; j < events.length; j += 1) {
                var event$1 = events[j];
                if (!el.dom7LiveListeners) {
                  el.dom7LiveListeners = {};
                }
                if (!el.dom7LiveListeners[event$1]) {
                  el.dom7LiveListeners[event$1] = [];
                }
                el.dom7LiveListeners[event$1].push({
                  listener: listener,
                  proxyListener: handleLiveEvent
                });
                el.addEventListener(event$1, handleLiveEvent, capture);
              }
            }
          }
          return this;
        }
        function off() {
          var this$1 = this;
          var assign;

          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }var eventType = args[0];
          var targetSelector = args[1];
          var listener = args[2];
          var capture = args[3];
          if (typeof args[1] === 'function') {
            assign = args, eventType = assign[0], listener = assign[1], capture = assign[2];
            targetSelector = undefined;
          }
          if (!capture) {
            capture = false;
          }

          var events = eventType.split(' ');
          for (var i = 0; i < events.length; i += 1) {
            var event = events[i];
            for (var j = 0; j < this.length; j += 1) {
              var el = this$1[j];
              var handlers = void 0;
              if (!targetSelector && el.dom7Listeners) {
                handlers = el.dom7Listeners[event];
              } else if (targetSelector && el.dom7LiveListeners) {
                handlers = el.dom7LiveListeners[event];
              }
              if (handlers && handlers.length) {
                for (var k = handlers.length - 1; k >= 0; k -= 1) {
                  var handler = handlers[k];
                  if (listener && handler.listener === listener) {
                    el.removeEventListener(event, handler.proxyListener, capture);
                    handlers.splice(k, 1);
                  } else if (!listener) {
                    el.removeEventListener(event, handler.proxyListener, capture);
                    handlers.splice(k, 1);
                  }
                }
              }
            }
          }
          return this;
        }
        function trigger() {
          var this$1 = this;
          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }var events = args[0].split(' ');
          var eventData = args[1];
          for (var i = 0; i < events.length; i += 1) {
            var event = events[i];
            for (var j = 0; j < this.length; j += 1) {
              var el = this$1[j];
              var evt = void 0;
              try {
                evt = new win.CustomEvent(event, {
                  detail: eventData,
                  bubbles: true,
                  cancelable: true
                });
              } catch (e) {
                evt = doc.createEvent('Event');
                evt.initEvent(event, true, true);
                evt.detail = eventData;
              }
              // eslint-disable-next-line
              el.dom7EventData = args.filter(function (data, dataIndex) {
                return dataIndex > 0;
              });
              el.dispatchEvent(evt);
              el.dom7EventData = [];
              delete el.dom7EventData;
            }
          }
          return this;
        }
        function transitionEnd(callback) {
          var events = ['webkitTransitionEnd', 'transitionend'];
          var dom = this;
          var i;
          function fireCallBack(e) {
            /* jshint validthis:true */
            if (e.target !== this) {
              return;
            }
            callback.call(this, e);
            for (i = 0; i < events.length; i += 1) {
              dom.off(events[i], fireCallBack);
            }
          }
          if (callback) {
            for (i = 0; i < events.length; i += 1) {
              dom.on(events[i], fireCallBack);
            }
          }
          return this;
        }
        function outerWidth(includeMargins) {
          if (this.length > 0) {
            if (includeMargins) {
              // eslint-disable-next-line
              var styles = this.styles();
              return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
            }
            return this[0].offsetWidth;
          }
          return null;
        }
        function outerHeight(includeMargins) {
          if (this.length > 0) {
            if (includeMargins) {
              // eslint-disable-next-line
              var styles = this.styles();
              return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
            }
            return this[0].offsetHeight;
          }
          return null;
        }
        function offset() {
          if (this.length > 0) {
            var el = this[0];
            var box = el.getBoundingClientRect();
            var body = doc.body;
            var clientTop = el.clientTop || body.clientTop || 0;
            var clientLeft = el.clientLeft || body.clientLeft || 0;
            var scrollTop = el === win ? win.scrollY : el.scrollTop;
            var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
            return {
              top: box.top + scrollTop - clientTop,
              left: box.left + scrollLeft - clientLeft
            };
          }

          return null;
        }
        function styles() {
          if (this[0]) {
            return win.getComputedStyle(this[0], null);
          }
          return {};
        }
        function css(props, value) {
          var this$1 = this;

          var i;
          if (arguments.length === 1) {
            if (typeof props === 'string') {
              if (this[0]) {
                return win.getComputedStyle(this[0], null).getPropertyValue(props);
              }
            } else {
              for (i = 0; i < this.length; i += 1) {
                // eslint-disable-next-line
                for (var prop in props) {
                  this$1[i].style[prop] = props[prop];
                }
              }
              return this;
            }
          }
          if (arguments.length === 2 && typeof props === 'string') {
            for (i = 0; i < this.length; i += 1) {
              this$1[i].style[props] = value;
            }
            return this;
          }
          return this;
        }
        // Iterate over the collection passing elements to `callback`
        function each(callback) {
          var this$1 = this;

          // Don't bother continuing without a callback
          if (!callback) {
            return this;
          }
          // Iterate over the current collection
          for (var i = 0; i < this.length; i += 1) {
            // If the callback returns false
            if (callback.call(this$1[i], i, this$1[i]) === false) {
              // End the loop early
              return this$1;
            }
          }
          // Return `this` to allow chained DOM operations
          return this;
        }
        // eslint-disable-next-line
        function html(html) {
          var this$1 = this;

          if (typeof html === 'undefined') {
            return this[0] ? this[0].innerHTML : undefined;
          }

          for (var i = 0; i < this.length; i += 1) {
            this$1[i].innerHTML = html;
          }
          return this;
        }
        // eslint-disable-next-line
        function text(text) {
          var this$1 = this;

          if (typeof text === 'undefined') {
            if (this[0]) {
              return this[0].textContent.trim();
            }
            return null;
          }

          for (var i = 0; i < this.length; i += 1) {
            this$1[i].textContent = text;
          }
          return this;
        }
        function is(selector) {
          var el = this[0];
          var compareWith;
          var i;
          if (!el || typeof selector === 'undefined') {
            return false;
          }
          if (typeof selector === 'string') {
            if (el.matches) {
              return el.matches(selector);
            } else if (el.webkitMatchesSelector) {
              return el.webkitMatchesSelector(selector);
            } else if (el.msMatchesSelector) {
              return el.msMatchesSelector(selector);
            }

            compareWith = $(selector);
            for (i = 0; i < compareWith.length; i += 1) {
              if (compareWith[i] === el) {
                return true;
              }
            }
            return false;
          } else if (selector === doc) {
            return el === doc;
          } else if (selector === win) {
            return el === win;
          }

          if (selector.nodeType || selector instanceof Dom7) {
            compareWith = selector.nodeType ? [selector] : selector;
            for (i = 0; i < compareWith.length; i += 1) {
              if (compareWith[i] === el) {
                return true;
              }
            }
            return false;
          }
          return false;
        }
        function index() {
          var child = this[0];
          var i;
          if (child) {
            i = 0;
            // eslint-disable-next-line
            while ((child = child.previousSibling) !== null) {
              if (child.nodeType === 1) {
                i += 1;
              }
            }
            return i;
          }
          return undefined;
        }
        // eslint-disable-next-line
        function eq(index) {
          if (typeof index === 'undefined') {
            return this;
          }
          var length = this.length;
          var returnIndex;
          if (index > length - 1) {
            return new Dom7([]);
          }
          if (index < 0) {
            returnIndex = length + index;
            if (returnIndex < 0) {
              return new Dom7([]);
            }
            return new Dom7([this[returnIndex]]);
          }
          return new Dom7([this[index]]);
        }
        function append() {
          var this$1 = this;
          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }var newChild;

          for (var k = 0; k < args.length; k += 1) {
            newChild = args[k];
            for (var i = 0; i < this.length; i += 1) {
              if (typeof newChild === 'string') {
                var tempDiv = doc.createElement('div');
                tempDiv.innerHTML = newChild;
                while (tempDiv.firstChild) {
                  this$1[i].appendChild(tempDiv.firstChild);
                }
              } else if (newChild instanceof Dom7) {
                for (var j = 0; j < newChild.length; j += 1) {
                  this$1[i].appendChild(newChild[j]);
                }
              } else {
                this$1[i].appendChild(newChild);
              }
            }
          }

          return this;
        }
        function prepend(newChild) {
          var this$1 = this;

          var i;
          var j;
          for (i = 0; i < this.length; i += 1) {
            if (typeof newChild === 'string') {
              var tempDiv = doc.createElement('div');
              tempDiv.innerHTML = newChild;
              for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
                this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
              }
            } else if (newChild instanceof Dom7) {
              for (j = 0; j < newChild.length; j += 1) {
                this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
              }
            } else {
              this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
            }
          }
          return this;
        }
        function next(selector) {
          if (this.length > 0) {
            if (selector) {
              if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
                return new Dom7([this[0].nextElementSibling]);
              }
              return new Dom7([]);
            }

            if (this[0].nextElementSibling) {
              return new Dom7([this[0].nextElementSibling]);
            }
            return new Dom7([]);
          }
          return new Dom7([]);
        }
        function nextAll(selector) {
          var nextEls = [];
          var el = this[0];
          if (!el) {
            return new Dom7([]);
          }
          while (el.nextElementSibling) {
            var next = el.nextElementSibling; // eslint-disable-line
            if (selector) {
              if ($(next).is(selector)) {
                nextEls.push(next);
              }
            } else {
              nextEls.push(next);
            }
            el = next;
          }
          return new Dom7(nextEls);
        }
        function prev(selector) {
          if (this.length > 0) {
            var el = this[0];
            if (selector) {
              if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
                return new Dom7([el.previousElementSibling]);
              }
              return new Dom7([]);
            }

            if (el.previousElementSibling) {
              return new Dom7([el.previousElementSibling]);
            }
            return new Dom7([]);
          }
          return new Dom7([]);
        }
        function prevAll(selector) {
          var prevEls = [];
          var el = this[0];
          if (!el) {
            return new Dom7([]);
          }
          while (el.previousElementSibling) {
            var prev = el.previousElementSibling; // eslint-disable-line
            if (selector) {
              if ($(prev).is(selector)) {
                prevEls.push(prev);
              }
            } else {
              prevEls.push(prev);
            }
            el = prev;
          }
          return new Dom7(prevEls);
        }
        function parent(selector) {
          var this$1 = this;

          var parents = []; // eslint-disable-line
          for (var i = 0; i < this.length; i += 1) {
            if (this$1[i].parentNode !== null) {
              if (selector) {
                if ($(this$1[i].parentNode).is(selector)) {
                  parents.push(this$1[i].parentNode);
                }
              } else {
                parents.push(this$1[i].parentNode);
              }
            }
          }
          return $(unique(parents));
        }
        function parents(selector) {
          var this$1 = this;

          var parents = []; // eslint-disable-line
          for (var i = 0; i < this.length; i += 1) {
            var parent = this$1[i].parentNode; // eslint-disable-line
            while (parent) {
              if (selector) {
                if ($(parent).is(selector)) {
                  parents.push(parent);
                }
              } else {
                parents.push(parent);
              }
              parent = parent.parentNode;
            }
          }
          return $(unique(parents));
        }
        function closest(selector) {
          var closest = this; // eslint-disable-line
          if (typeof selector === 'undefined') {
            return new Dom7([]);
          }
          if (!closest.is(selector)) {
            closest = closest.parents(selector).eq(0);
          }
          return closest;
        }
        function find(selector) {
          var this$1 = this;

          var foundElements = [];
          for (var i = 0; i < this.length; i += 1) {
            var found = this$1[i].querySelectorAll(selector);
            for (var j = 0; j < found.length; j += 1) {
              foundElements.push(found[j]);
            }
          }
          return new Dom7(foundElements);
        }
        function children(selector) {
          var this$1 = this;

          var children = []; // eslint-disable-line
          for (var i = 0; i < this.length; i += 1) {
            var childNodes = this$1[i].childNodes;

            for (var j = 0; j < childNodes.length; j += 1) {
              if (!selector) {
                if (childNodes[j].nodeType === 1) {
                  children.push(childNodes[j]);
                }
              } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
                children.push(childNodes[j]);
              }
            }
          }
          return new Dom7(unique(children));
        }
        function remove() {
          var this$1 = this;

          for (var i = 0; i < this.length; i += 1) {
            if (this$1[i].parentNode) {
              this$1[i].parentNode.removeChild(this$1[i]);
            }
          }
          return this;
        }
        function add() {
          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }var dom = this;
          var i;
          var j;
          for (i = 0; i < args.length; i += 1) {
            var toAdd = $(args[i]);
            for (j = 0; j < toAdd.length; j += 1) {
              dom[dom.length] = toAdd[j];
              dom.length += 1;
            }
          }
          return dom;
        }

        var Methods = {
          addClass: addClass,
          removeClass: removeClass,
          hasClass: hasClass,
          toggleClass: toggleClass,
          attr: attr,
          removeAttr: removeAttr,
          data: data,
          transform: transform,
          transition: transition,
          on: on,
          off: off,
          trigger: trigger,
          transitionEnd: transitionEnd,
          outerWidth: outerWidth,
          outerHeight: outerHeight,
          offset: offset,
          css: css,
          each: each,
          html: html,
          text: text,
          is: is,
          index: index,
          eq: eq,
          append: append,
          prepend: prepend,
          next: next,
          nextAll: nextAll,
          prev: prev,
          prevAll: prevAll,
          parent: parent,
          parents: parents,
          closest: closest,
          find: find,
          children: children,
          remove: remove,
          add: add,
          styles: styles
        };

        (0, _keys2.default)(Methods).forEach(function (methodName) {
          $.fn[methodName] = Methods[methodName];
        });

        var Utils = {
          deleteProps: function deleteProps(obj) {
            var object = obj;
            (0, _keys2.default)(object).forEach(function (key) {
              try {
                object[key] = null;
              } catch (e) {
                // no getter for object
              }
              try {
                delete object[key];
              } catch (e) {
                // something got wrong
              }
            });
          },
          nextTick: function nextTick(callback, delay) {
            if (delay === void 0) delay = 0;

            return setTimeout(callback, delay);
          },
          now: function now() {
            return Date.now();
          },
          getTranslate: function getTranslate(el, axis) {
            if (axis === void 0) axis = 'x';

            var matrix;
            var curTransform;
            var transformMatrix;

            var curStyle = win.getComputedStyle(el, null);

            if (win.WebKitCSSMatrix) {
              curTransform = curStyle.transform || curStyle.webkitTransform;
              if (curTransform.split(',').length > 6) {
                curTransform = curTransform.split(', ').map(function (a) {
                  return a.replace(',', '.');
                }).join(', ');
              }
              // Some old versions of Webkit choke when 'none' is passed; pass
              // empty string instead in this case
              transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            } else {
              transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
              matrix = transformMatrix.toString().split(',');
            }

            if (axis === 'x') {
              // Latest Chrome and webkits Fix
              if (win.WebKitCSSMatrix) {
                curTransform = transformMatrix.m41;
              }
              // Crazy IE10 Matrix
              else if (matrix.length === 16) {
                  curTransform = parseFloat(matrix[12]);
                }
                // Normal Browsers
                else {
                    curTransform = parseFloat(matrix[4]);
                  }
            }
            if (axis === 'y') {
              // Latest Chrome and webkits Fix
              if (win.WebKitCSSMatrix) {
                curTransform = transformMatrix.m42;
              }
              // Crazy IE10 Matrix
              else if (matrix.length === 16) {
                  curTransform = parseFloat(matrix[13]);
                }
                // Normal Browsers
                else {
                    curTransform = parseFloat(matrix[5]);
                  }
            }
            return curTransform || 0;
          },
          parseUrlQuery: function parseUrlQuery(url) {
            var query = {};
            var urlToParse = url || win.location.href;
            var i;
            var params;
            var param;
            var length;
            if (typeof urlToParse === 'string' && urlToParse.length) {
              urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
              params = urlToParse.split('&').filter(function (paramsPart) {
                return paramsPart !== '';
              });
              length = params.length;

              for (i = 0; i < length; i += 1) {
                param = params[i].replace(/#\S+/g, '').split('=');
                query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
              }
            }
            return query;
          },
          isObject: function isObject(o) {
            return (typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) === 'object' && o !== null && o.constructor && o.constructor === Object;
          },
          extend: function extend() {
            var args = [],
                len$1 = arguments.length;
            while (len$1--) {
              args[len$1] = arguments[len$1];
            }var to = Object(args[0]);
            for (var i = 1; i < args.length; i += 1) {
              var nextSource = args[i];
              if (nextSource !== undefined && nextSource !== null) {
                var keysArray = (0, _keys2.default)(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                  var nextKey = keysArray[nextIndex];
                  var desc = (0, _getOwnPropertyDescriptor2.default)(nextSource, nextKey);
                  if (desc !== undefined && desc.enumerable) {
                    if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                      Utils.extend(to[nextKey], nextSource[nextKey]);
                    } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                      to[nextKey] = {};
                      Utils.extend(to[nextKey], nextSource[nextKey]);
                    } else {
                      to[nextKey] = nextSource[nextKey];
                    }
                  }
                }
              }
            }
            return to;
          }
        };

        var Support = function Support() {
          var testDiv = doc.createElement('div');
          return {
            touch: win.Modernizr && win.Modernizr.touch === true || function checkTouch() {
              return !!('ontouchstart' in win || win.DocumentTouch && doc instanceof win.DocumentTouch);
            }(),

            pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent),
            prefixedPointerEvents: !!win.navigator.msPointerEnabled,

            transition: function checkTransition() {
              var style = testDiv.style;
              return 'transition' in style || 'webkitTransition' in style || 'MozTransition' in style;
            }(),
            transforms3d: win.Modernizr && win.Modernizr.csstransforms3d === true || function checkTransforms3d() {
              var style = testDiv.style;
              return 'webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style;
            }(),

            flexbox: function checkFlexbox() {
              var style = testDiv.style;
              var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');
              for (var i = 0; i < styles.length; i += 1) {
                if (styles[i] in style) {
                  return true;
                }
              }
              return false;
            }(),

            observer: function checkObserver() {
              return 'MutationObserver' in win || 'WebkitMutationObserver' in win;
            }(),

            passiveListener: function checkPassiveListener() {
              var supportsPassive = false;
              try {
                var opts = Object.defineProperty({}, 'passive', {
                  // eslint-disable-next-line
                  get: function get() {
                    supportsPassive = true;
                  }
                });
                win.addEventListener('testPassiveListener', null, opts);
              } catch (e) {
                // No support
              }
              return supportsPassive;
            }(),

            gestures: function checkGestures() {
              return 'ongesturestart' in win;
            }()
          };
        }();

        var SwiperClass = function SwiperClass(params) {
          if (params === void 0) params = {};

          var self = this;
          self.params = params;

          // Events
          self.eventsListeners = {};

          if (self.params && self.params.on) {
            (0, _keys2.default)(self.params.on).forEach(function (eventName) {
              self.on(eventName, self.params.on[eventName]);
            });
          }
        };

        var staticAccessors = { components: { configurable: true } };
        SwiperClass.prototype.on = function on(events, handler, priority) {
          var self = this;
          if (typeof handler !== 'function') {
            return self;
          }
          var method = priority ? 'unshift' : 'push';
          events.split(' ').forEach(function (event) {
            if (!self.eventsListeners[event]) {
              self.eventsListeners[event] = [];
            }
            self.eventsListeners[event][method](handler);
          });
          return self;
        };
        SwiperClass.prototype.once = function once(events, handler, priority) {
          var self = this;
          if (typeof handler !== 'function') {
            return self;
          }
          function onceHandler() {
            var args = [],
                len = arguments.length;
            while (len--) {
              args[len] = arguments[len];
            }handler.apply(self, args);
            self.off(events, onceHandler);
          }
          return self.on(events, onceHandler, priority);
        };
        SwiperClass.prototype.off = function off(events, handler) {
          var self = this;
          if (!self.eventsListeners) {
            return self;
          }
          events.split(' ').forEach(function (event) {
            if (typeof handler === 'undefined') {
              self.eventsListeners[event] = [];
            } else {
              self.eventsListeners[event].forEach(function (eventHandler, index) {
                if (eventHandler === handler) {
                  self.eventsListeners[event].splice(index, 1);
                }
              });
            }
          });
          return self;
        };
        SwiperClass.prototype.emit = function emit() {
          var args = [],
              len = arguments.length;
          while (len--) {
            args[len] = arguments[len];
          }var self = this;
          if (!self.eventsListeners) {
            return self;
          }
          var events;
          var data;
          var context;
          if (typeof args[0] === 'string' || Array.isArray(args[0])) {
            events = args[0];
            data = args.slice(1, args.length);
            context = self;
          } else {
            events = args[0].events;
            data = args[0].data;
            context = args[0].context || self;
          }
          var eventsArray = Array.isArray(events) ? events : events.split(' ');
          eventsArray.forEach(function (event) {
            if (self.eventsListeners && self.eventsListeners[event]) {
              var handlers = [];
              self.eventsListeners[event].forEach(function (eventHandler) {
                handlers.push(eventHandler);
              });
              handlers.forEach(function (eventHandler) {
                eventHandler.apply(context, data);
              });
            }
          });
          return self;
        };
        SwiperClass.prototype.useModulesParams = function useModulesParams(instanceParams) {
          var instance = this;
          if (!instance.modules) {
            return;
          }
          (0, _keys2.default)(instance.modules).forEach(function (moduleName) {
            var module = instance.modules[moduleName];
            // Extend params
            if (module.params) {
              Utils.extend(instanceParams, module.params);
            }
          });
        };
        SwiperClass.prototype.useModules = function useModules(modulesParams) {
          if (modulesParams === void 0) modulesParams = {};

          var instance = this;
          if (!instance.modules) {
            return;
          }
          (0, _keys2.default)(instance.modules).forEach(function (moduleName) {
            var module = instance.modules[moduleName];
            var moduleParams = modulesParams[moduleName] || {};
            // Extend instance methods and props
            if (module.instance) {
              (0, _keys2.default)(module.instance).forEach(function (modulePropName) {
                var moduleProp = module.instance[modulePropName];
                if (typeof moduleProp === 'function') {
                  instance[modulePropName] = moduleProp.bind(instance);
                } else {
                  instance[modulePropName] = moduleProp;
                }
              });
            }
            // Add event listeners
            if (module.on && instance.on) {
              (0, _keys2.default)(module.on).forEach(function (moduleEventName) {
                instance.on(moduleEventName, module.on[moduleEventName]);
              });
            }

            // Module create callback
            if (module.create) {
              module.create.bind(instance)(moduleParams);
            }
          });
        };
        staticAccessors.components.set = function (components) {
          var Class = this;
          if (!Class.use) {
            return;
          }
          Class.use(components);
        };
        SwiperClass.installModule = function installModule(module) {
          var params = [],
              len = arguments.length - 1;
          while (len-- > 0) {
            params[len] = arguments[len + 1];
          }var Class = this;
          if (!Class.prototype.modules) {
            Class.prototype.modules = {};
          }
          var name = module.name || (0, _keys2.default)(Class.prototype.modules).length + "_" + Utils.now();
          Class.prototype.modules[name] = module;
          // Prototype
          if (module.proto) {
            (0, _keys2.default)(module.proto).forEach(function (key) {
              Class.prototype[key] = module.proto[key];
            });
          }
          // Class
          if (module.static) {
            (0, _keys2.default)(module.static).forEach(function (key) {
              Class[key] = module.static[key];
            });
          }
          // Callback
          if (module.install) {
            module.install.apply(Class, params);
          }
          return Class;
        };
        SwiperClass.use = function use(module) {
          var params = [],
              len = arguments.length - 1;
          while (len-- > 0) {
            params[len] = arguments[len + 1];
          }var Class = this;
          if (Array.isArray(module)) {
            module.forEach(function (m) {
              return Class.installModule(m);
            });
            return Class;
          }
          return Class.installModule.apply(Class, [module].concat(params));
        };

        (0, _defineProperties2.default)(SwiperClass, staticAccessors);

        function updateSize() {
          var swiper = this;
          var width;
          var height;
          var $el = swiper.$el;
          if (typeof swiper.params.width !== 'undefined') {
            width = swiper.params.width;
          } else {
            width = $el[0].clientWidth;
          }
          if (typeof swiper.params.height !== 'undefined') {
            height = swiper.params.height;
          } else {
            height = $el[0].clientHeight;
          }
          if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
            return;
          }

          // Subtract paddings
          width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
          height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

          Utils.extend(swiper, {
            width: width,
            height: height,
            size: swiper.isHorizontal() ? width : height
          });
        }

        function updateSlides() {
          var swiper = this;
          var params = swiper.params;

          var $wrapperEl = swiper.$wrapperEl;
          var swiperSize = swiper.size;
          var rtl = swiper.rtlTranslate;
          var wrongRTL = swiper.wrongRTL;
          var isVirtual = swiper.virtual && params.virtual.enabled;
          var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
          var slides = $wrapperEl.children("." + swiper.params.slideClass);
          var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
          var snapGrid = [];
          var slidesGrid = [];
          var slidesSizesGrid = [];

          var offsetBefore = params.slidesOffsetBefore;
          if (typeof offsetBefore === 'function') {
            offsetBefore = params.slidesOffsetBefore.call(swiper);
          }

          var offsetAfter = params.slidesOffsetAfter;
          if (typeof offsetAfter === 'function') {
            offsetAfter = params.slidesOffsetAfter.call(swiper);
          }

          var previousSnapGridLength = swiper.snapGrid.length;
          var previousSlidesGridLength = swiper.snapGrid.length;

          var spaceBetween = params.spaceBetween;
          var slidePosition = -offsetBefore;
          var prevSlideSize = 0;
          var index = 0;
          if (typeof swiperSize === 'undefined') {
            return;
          }
          if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
            spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
          }

          swiper.virtualSize = -spaceBetween;

          // reset margins
          if (rtl) {
            slides.css({ marginLeft: '', marginTop: '' });
          } else {
            slides.css({ marginRight: '', marginBottom: '' });
          }

          var slidesNumberEvenToRows;
          if (params.slidesPerColumn > 1) {
            if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
              slidesNumberEvenToRows = slidesLength;
            } else {
              slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
            }
            if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
              slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
            }
          }

          // Calc slides
          var slideSize;
          var slidesPerColumn = params.slidesPerColumn;
          var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
          var numFullColumns = slidesPerRow - (params.slidesPerColumn * slidesPerRow - slidesLength);
          for (var i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            var slide = slides.eq(i);
            if (params.slidesPerColumn > 1) {
              // Set slides order
              var newSlideOrderIndex = void 0;
              var column = void 0;
              var row = void 0;
              if (params.slidesPerColumnFill === 'column') {
                column = Math.floor(i / slidesPerColumn);
                row = i - column * slidesPerColumn;
                if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
                  row += 1;
                  if (row >= slidesPerColumn) {
                    row = 0;
                    column += 1;
                  }
                }
                newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                slide.css({
                  '-webkit-box-ordinal-group': newSlideOrderIndex,
                  '-moz-box-ordinal-group': newSlideOrderIndex,
                  '-ms-flex-order': newSlideOrderIndex,
                  '-webkit-order': newSlideOrderIndex,
                  order: newSlideOrderIndex
                });
              } else {
                row = Math.floor(i / slidesPerRow);
                column = i - row * slidesPerRow;
              }
              slide.css("margin-" + (swiper.isHorizontal() ? 'top' : 'left'), row !== 0 && params.spaceBetween && params.spaceBetween + "px").attr('data-swiper-column', column).attr('data-swiper-row', row);
            }
            if (slide.css('display') === 'none') {
              continue;
            } // eslint-disable-line

            if (params.slidesPerView === 'auto') {
              var slideStyles = win.getComputedStyle(slide[0], null);
              var currentTransform = slide[0].style.transform;
              var currentWebKitTransform = slide[0].style.webkitTransform;
              if (currentTransform) {
                slide[0].style.transform = 'none';
              }
              if (currentWebKitTransform) {
                slide[0].style.webkitTransform = 'none';
              }
              if (swiper.isHorizontal()) {
                slideSize = slide[0].getBoundingClientRect().width + parseFloat(slideStyles.getPropertyValue('margin-left')) + parseFloat(slideStyles.getPropertyValue('margin-right'));
              } else {
                slideSize = slide[0].getBoundingClientRect().height + parseFloat(slideStyles.getPropertyValue('margin-top')) + parseFloat(slideStyles.getPropertyValue('margin-bottom'));
              }
              if (currentTransform) {
                slide[0].style.transform = currentTransform;
              }
              if (currentWebKitTransform) {
                slide[0].style.webkitTransform = currentWebKitTransform;
              }
              if (params.roundLengths) {
                slideSize = Math.floor(slideSize);
              }
            } else {
              slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
              if (params.roundLengths) {
                slideSize = Math.floor(slideSize);
              }

              if (slides[i]) {
                if (swiper.isHorizontal()) {
                  slides[i].style.width = slideSize + "px";
                } else {
                  slides[i].style.height = slideSize + "px";
                }
              }
            }
            if (slides[i]) {
              slides[i].swiperSlideSize = slideSize;
            }
            slidesSizesGrid.push(slideSize);

            if (params.centeredSlides) {
              slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
              if (prevSlideSize === 0 && i !== 0) {
                slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
              }
              if (i === 0) {
                slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
              }
              if (Math.abs(slidePosition) < 1 / 1000) {
                slidePosition = 0;
              }
              if (params.roundLengths) {
                slidePosition = Math.floor(slidePosition);
              }
              if (index % params.slidesPerGroup === 0) {
                snapGrid.push(slidePosition);
              }
              slidesGrid.push(slidePosition);
            } else {
              if (params.roundLengths) {
                slidePosition = Math.floor(slidePosition);
              }
              if (index % params.slidesPerGroup === 0) {
                snapGrid.push(slidePosition);
              }
              slidesGrid.push(slidePosition);
              slidePosition = slidePosition + slideSize + spaceBetween;
            }

            swiper.virtualSize += slideSize + spaceBetween;

            prevSlideSize = slideSize;

            index += 1;
          }
          swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
          var newSlidesGrid;

          if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
            $wrapperEl.css({ width: swiper.virtualSize + params.spaceBetween + "px" });
          }
          if (!Support.flexbox || params.setWrapperSize) {
            if (swiper.isHorizontal()) {
              $wrapperEl.css({ width: swiper.virtualSize + params.spaceBetween + "px" });
            } else {
              $wrapperEl.css({ height: swiper.virtualSize + params.spaceBetween + "px" });
            }
          }

          if (params.slidesPerColumn > 1) {
            swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
            swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
            if (swiper.isHorizontal()) {
              $wrapperEl.css({ width: swiper.virtualSize + params.spaceBetween + "px" });
            } else {
              $wrapperEl.css({ height: swiper.virtualSize + params.spaceBetween + "px" });
            }
            if (params.centeredSlides) {
              newSlidesGrid = [];
              for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
                var slidesGridItem = snapGrid[i$1];
                if (params.roundLengths) {
                  slidesGridItem = Math.floor(slidesGridItem);
                }
                if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) {
                  newSlidesGrid.push(slidesGridItem);
                }
              }
              snapGrid = newSlidesGrid;
            }
          }

          // Remove last grid elements depending on width
          if (!params.centeredSlides) {
            newSlidesGrid = [];
            for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
              var slidesGridItem$1 = snapGrid[i$2];
              if (params.roundLengths) {
                slidesGridItem$1 = Math.floor(slidesGridItem$1);
              }
              if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
                newSlidesGrid.push(slidesGridItem$1);
              }
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
              snapGrid.push(swiper.virtualSize - swiperSize);
            }
          }
          if (snapGrid.length === 0) {
            snapGrid = [0];
          }

          if (params.spaceBetween !== 0) {
            if (swiper.isHorizontal()) {
              if (rtl) {
                slides.css({ marginLeft: spaceBetween + "px" });
              } else {
                slides.css({ marginRight: spaceBetween + "px" });
              }
            } else {
              slides.css({ marginBottom: spaceBetween + "px" });
            }
          }

          Utils.extend(swiper, {
            slides: slides,
            snapGrid: snapGrid,
            slidesGrid: slidesGrid,
            slidesSizesGrid: slidesSizesGrid
          });

          if (slidesLength !== previousSlidesLength) {
            swiper.emit('slidesLengthChange');
          }
          if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) {
              swiper.checkOverflow();
            }
            swiper.emit('snapGridLengthChange');
          }
          if (slidesGrid.length !== previousSlidesGridLength) {
            swiper.emit('slidesGridLengthChange');
          }

          if (params.watchSlidesProgress || params.watchSlidesVisibility) {
            swiper.updateSlidesOffset();
          }
        }

        function updateAutoHeight(speed) {
          var swiper = this;
          var activeSlides = [];
          var newHeight = 0;
          var i;
          if (typeof speed === 'number') {
            swiper.setTransition(speed);
          } else if (speed === true) {
            swiper.setTransition(swiper.params.speed);
          }
          // Find slides currently in view
          if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
            for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
              var index = swiper.activeIndex + i;
              if (index > swiper.slides.length) {
                break;
              }
              activeSlides.push(swiper.slides.eq(index)[0]);
            }
          } else {
            activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
          }

          // Find new height from highest slide in view
          for (i = 0; i < activeSlides.length; i += 1) {
            if (typeof activeSlides[i] !== 'undefined') {
              var height = activeSlides[i].offsetHeight;
              newHeight = height > newHeight ? height : newHeight;
            }
          }

          // Update Height
          if (newHeight) {
            swiper.$wrapperEl.css('height', newHeight + "px");
          }
        }

        function updateSlidesOffset() {
          var swiper = this;
          var slides = swiper.slides;
          for (var i = 0; i < slides.length; i += 1) {
            slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
          }
        }

        function updateSlidesProgress(translate) {
          if (translate === void 0) translate = this && this.translate || 0;

          var swiper = this;
          var params = swiper.params;

          var slides = swiper.slides;
          var rtl = swiper.rtlTranslate;

          if (slides.length === 0) {
            return;
          }
          if (typeof slides[0].swiperSlideOffset === 'undefined') {
            swiper.updateSlidesOffset();
          }

          var offsetCenter = -translate;
          if (rtl) {
            offsetCenter = translate;
          }

          // Visible Slides
          slides.removeClass(params.slideVisibleClass);

          for (var i = 0; i < slides.length; i += 1) {
            var slide = slides[i];
            var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + params.spaceBetween);
            if (params.watchSlidesVisibility) {
              var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
              var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
              var isVisible = slideBefore >= 0 && slideBefore < swiper.size || slideAfter > 0 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
              if (isVisible) {
                slides.eq(i).addClass(params.slideVisibleClass);
              }
            }
            slide.progress = rtl ? -slideProgress : slideProgress;
          }
        }

        function updateProgress(translate) {
          if (translate === void 0) translate = this && this.translate || 0;

          var swiper = this;
          var params = swiper.params;

          var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
          var progress = swiper.progress;
          var isBeginning = swiper.isBeginning;
          var isEnd = swiper.isEnd;
          var wasBeginning = isBeginning;
          var wasEnd = isEnd;
          if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
          } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            isBeginning = progress <= 0;
            isEnd = progress >= 1;
          }
          Utils.extend(swiper, {
            progress: progress,
            isBeginning: isBeginning,
            isEnd: isEnd
          });

          if (params.watchSlidesProgress || params.watchSlidesVisibility) {
            swiper.updateSlidesProgress(translate);
          }

          if (isBeginning && !wasBeginning) {
            swiper.emit('reachBeginning toEdge');
          }
          if (isEnd && !wasEnd) {
            swiper.emit('reachEnd toEdge');
          }
          if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
            swiper.emit('fromEdge');
          }

          swiper.emit('progress', progress);
        }

        function updateSlidesClasses() {
          var swiper = this;

          var slides = swiper.slides;
          var params = swiper.params;
          var $wrapperEl = swiper.$wrapperEl;
          var activeIndex = swiper.activeIndex;
          var realIndex = swiper.realIndex;
          var isVirtual = swiper.virtual && params.virtual.enabled;

          slides.removeClass(params.slideActiveClass + " " + params.slideNextClass + " " + params.slidePrevClass + " " + params.slideDuplicateActiveClass + " " + params.slideDuplicateNextClass + " " + params.slideDuplicatePrevClass);

          var activeSlide;
          if (isVirtual) {
            activeSlide = swiper.$wrapperEl.find("." + params.slideClass + "[data-swiper-slide-index=\"" + activeIndex + "\"]");
          } else {
            activeSlide = slides.eq(activeIndex);
          }

          // Active classes
          activeSlide.addClass(params.slideActiveClass);

          if (params.loop) {
            // Duplicate to all looped slides
            if (activeSlide.hasClass(params.slideDuplicateClass)) {
              $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
            } else {
              $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
            }
          }
          // Next Slide
          var nextSlide = activeSlide.nextAll("." + params.slideClass).eq(0).addClass(params.slideNextClass);
          if (params.loop && nextSlide.length === 0) {
            nextSlide = slides.eq(0);
            nextSlide.addClass(params.slideNextClass);
          }
          // Prev Slide
          var prevSlide = activeSlide.prevAll("." + params.slideClass).eq(0).addClass(params.slidePrevClass);
          if (params.loop && prevSlide.length === 0) {
            prevSlide = slides.eq(-1);
            prevSlide.addClass(params.slidePrevClass);
          }
          if (params.loop) {
            // Duplicate to all looped slides
            if (nextSlide.hasClass(params.slideDuplicateClass)) {
              $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
            } else {
              $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
            }
            if (prevSlide.hasClass(params.slideDuplicateClass)) {
              $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
            } else {
              $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
            }
          }
        }

        function updateActiveIndex(newActiveIndex) {
          var swiper = this;
          var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
          var slidesGrid = swiper.slidesGrid;
          var snapGrid = swiper.snapGrid;
          var params = swiper.params;
          var previousIndex = swiper.activeIndex;
          var previousRealIndex = swiper.realIndex;
          var previousSnapIndex = swiper.snapIndex;
          var activeIndex = newActiveIndex;
          var snapIndex;
          if (typeof activeIndex === 'undefined') {
            for (var i = 0; i < slidesGrid.length; i += 1) {
              if (typeof slidesGrid[i + 1] !== 'undefined') {
                if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
                  activeIndex = i;
                } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
                  activeIndex = i + 1;
                }
              } else if (translate >= slidesGrid[i]) {
                activeIndex = i;
              }
            }
            // Normalize slideIndex
            if (params.normalizeSlideIndex) {
              if (activeIndex < 0 || typeof activeIndex === 'undefined') {
                activeIndex = 0;
              }
            }
          }
          if (snapGrid.indexOf(translate) >= 0) {
            snapIndex = snapGrid.indexOf(translate);
          } else {
            snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
          }
          if (snapIndex >= snapGrid.length) {
            snapIndex = snapGrid.length - 1;
          }
          if (activeIndex === previousIndex) {
            if (snapIndex !== previousSnapIndex) {
              swiper.snapIndex = snapIndex;
              swiper.emit('snapIndexChange');
            }
            return;
          }

          // Get real index
          var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

          Utils.extend(swiper, {
            snapIndex: snapIndex,
            realIndex: realIndex,
            previousIndex: previousIndex,
            activeIndex: activeIndex
          });
          swiper.emit('activeIndexChange');
          swiper.emit('snapIndexChange');
          if (previousRealIndex !== realIndex) {
            swiper.emit('realIndexChange');
          }
          swiper.emit('slideChange');
        }

        function updateClickedSlide(e) {
          var swiper = this;
          var params = swiper.params;
          var slide = $(e.target).closest("." + params.slideClass)[0];
          var slideFound = false;
          if (slide) {
            for (var i = 0; i < swiper.slides.length; i += 1) {
              if (swiper.slides[i] === slide) {
                slideFound = true;
              }
            }
          }

          if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) {
              swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
            } else {
              swiper.clickedIndex = $(slide).index();
            }
          } else {
            swiper.clickedSlide = undefined;
            swiper.clickedIndex = undefined;
            return;
          }
          if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
            swiper.slideToClickedSlide();
          }
        }

        var update = {
          updateSize: updateSize,
          updateSlides: updateSlides,
          updateAutoHeight: updateAutoHeight,
          updateSlidesOffset: updateSlidesOffset,
          updateSlidesProgress: updateSlidesProgress,
          updateProgress: updateProgress,
          updateSlidesClasses: updateSlidesClasses,
          updateActiveIndex: updateActiveIndex,
          updateClickedSlide: updateClickedSlide
        };

        function getTranslate(axis) {
          if (axis === void 0) axis = this.isHorizontal() ? 'x' : 'y';

          var swiper = this;

          var params = swiper.params;
          var rtl = swiper.rtlTranslate;
          var translate = swiper.translate;
          var $wrapperEl = swiper.$wrapperEl;

          if (params.virtualTranslate) {
            return rtl ? -translate : translate;
          }

          var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
          if (rtl) {
            currentTranslate = -currentTranslate;
          }

          return currentTranslate || 0;
        }

        function setTranslate(translate, byController) {
          var swiper = this;
          var rtl = swiper.rtlTranslate;
          var params = swiper.params;
          var $wrapperEl = swiper.$wrapperEl;
          var progress = swiper.progress;
          var x = 0;
          var y = 0;
          var z = 0;

          if (swiper.isHorizontal()) {
            x = rtl ? -translate : translate;
          } else {
            y = translate;
          }

          if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
          }

          if (!params.virtualTranslate) {
            if (Support.transforms3d) {
              $wrapperEl.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)");
            } else {
              $wrapperEl.transform("translate(" + x + "px, " + y + "px)");
            }
          }
          swiper.previousTranslate = swiper.translate;
          swiper.translate = swiper.isHorizontal() ? x : y;

          // Check if we need to update progress
          var newProgress;
          var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
          if (translatesDiff === 0) {
            newProgress = 0;
          } else {
            newProgress = (translate - swiper.minTranslate()) / translatesDiff;
          }
          if (newProgress !== progress) {
            swiper.updateProgress(translate);
          }

          swiper.emit('setTranslate', swiper.translate, byController);
        }

        function minTranslate() {
          return -this.snapGrid[0];
        }

        function maxTranslate() {
          return -this.snapGrid[this.snapGrid.length - 1];
        }

        var translate = {
          getTranslate: getTranslate,
          setTranslate: setTranslate,
          minTranslate: minTranslate,
          maxTranslate: maxTranslate
        };

        function setTransition(duration, byController) {
          var swiper = this;

          swiper.$wrapperEl.transition(duration);

          swiper.emit('setTransition', duration, byController);
        }

        function transitionStart(runCallbacks, direction) {
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var activeIndex = swiper.activeIndex;
          var params = swiper.params;
          var previousIndex = swiper.previousIndex;
          if (params.autoHeight) {
            swiper.updateAutoHeight();
          }

          var dir = direction;
          if (!dir) {
            if (activeIndex > previousIndex) {
              dir = 'next';
            } else if (activeIndex < previousIndex) {
              dir = 'prev';
            } else {
              dir = 'reset';
            }
          }

          swiper.emit('transitionStart');

          if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === 'reset') {
              swiper.emit('slideResetTransitionStart');
              return;
            }
            swiper.emit('slideChangeTransitionStart');
            if (dir === 'next') {
              swiper.emit('slideNextTransitionStart');
            } else {
              swiper.emit('slidePrevTransitionStart');
            }
          }
        }

        function transitionEnd$1(runCallbacks, direction) {
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var activeIndex = swiper.activeIndex;
          var previousIndex = swiper.previousIndex;
          swiper.animating = false;
          swiper.setTransition(0);

          var dir = direction;
          if (!dir) {
            if (activeIndex > previousIndex) {
              dir = 'next';
            } else if (activeIndex < previousIndex) {
              dir = 'prev';
            } else {
              dir = 'reset';
            }
          }

          swiper.emit('transitionEnd');

          if (runCallbacks && activeIndex !== previousIndex) {
            if (dir === 'reset') {
              swiper.emit('slideResetTransitionEnd');
              return;
            }
            swiper.emit('slideChangeTransitionEnd');
            if (dir === 'next') {
              swiper.emit('slideNextTransitionEnd');
            } else {
              swiper.emit('slidePrevTransitionEnd');
            }
          }
        }

        var transition$1 = {
          setTransition: setTransition,
          transitionStart: transitionStart,
          transitionEnd: transitionEnd$1
        };

        function slideTo(index, speed, runCallbacks, internal) {
          if (index === void 0) index = 0;
          if (speed === void 0) speed = this.params.speed;
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var slideIndex = index;
          if (slideIndex < 0) {
            slideIndex = 0;
          }

          var params = swiper.params;
          var snapGrid = swiper.snapGrid;
          var slidesGrid = swiper.slidesGrid;
          var previousIndex = swiper.previousIndex;
          var activeIndex = swiper.activeIndex;
          var rtl = swiper.rtlTranslate;
          if (swiper.animating && params.preventIntercationOnTransition) {
            return false;
          }

          var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
          if (snapIndex >= snapGrid.length) {
            snapIndex = snapGrid.length - 1;
          }

          if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
            swiper.emit('beforeSlideChangeStart');
          }

          var translate = -snapGrid[snapIndex];

          // Update progress
          swiper.updateProgress(translate);

          // Normalize slideIndex
          if (params.normalizeSlideIndex) {
            for (var i = 0; i < slidesGrid.length; i += 1) {
              if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
                slideIndex = i;
              }
            }
          }
          // Directions locks
          if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
              return false;
            }
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
              if ((activeIndex || 0) !== slideIndex) {
                return false;
              }
            }
          }

          var direction;
          if (slideIndex > activeIndex) {
            direction = 'next';
          } else if (slideIndex < activeIndex) {
            direction = 'prev';
          } else {
            direction = 'reset';
          }

          // Update Index
          if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
            swiper.updateActiveIndex(slideIndex);
            // Update Height
            if (params.autoHeight) {
              swiper.updateAutoHeight();
            }
            swiper.updateSlidesClasses();
            if (params.effect !== 'slide') {
              swiper.setTranslate(translate);
            }
            if (direction !== 'reset') {
              swiper.transitionStart(runCallbacks, direction);
              swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
          }

          if (speed === 0 || !Support.transition) {
            swiper.setTransition(0);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit('beforeTransitionStart', speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            swiper.transitionEnd(runCallbacks, direction);
          } else {
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit('beforeTransitionStart', speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (!swiper.animating) {
              swiper.animating = true;
              if (!swiper.onSlideToWrapperTransitionEnd) {
                swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                  if (!swiper || swiper.destroyed) {
                    return;
                  }
                  if (e.target !== this) {
                    return;
                  }
                  swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
                  swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
                  swiper.transitionEnd(runCallbacks, direction);
                };
              }
              swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
              swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            }
          }

          return true;
        }

        function slideToLoop(index, speed, runCallbacks, internal) {
          if (index === void 0) index = 0;
          if (speed === void 0) speed = this.params.speed;
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var newIndex = index;
          if (swiper.params.loop) {
            newIndex += swiper.loopedSlides;
          }

          return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }

        /* eslint no-unused-vars: "off" */
        function slideNext(speed, runCallbacks, internal) {
          if (speed === void 0) speed = this.params.speed;
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var params = swiper.params;
          var animating = swiper.animating;
          if (params.loop) {
            if (animating) {
              return false;
            }
            swiper.loopFix();
            // eslint-disable-next-line
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
          }
          return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
        }

        /* eslint no-unused-vars: "off" */
        function slidePrev(speed, runCallbacks, internal) {
          if (speed === void 0) speed = this.params.speed;
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var params = swiper.params;
          var animating = swiper.animating;
          var snapGrid = swiper.snapGrid;
          var slidesGrid = swiper.slidesGrid;
          var rtlTranslate = swiper.rtlTranslate;

          if (params.loop) {
            if (animating) {
              return false;
            }
            swiper.loopFix();
            // eslint-disable-next-line
            swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          }
          var translate = rtlTranslate ? swiper.translate : -swiper.translate;
          function normalize(val) {
            if (val < 0) {
              return -Math.floor(Math.abs(val));
            }
            return Math.floor(val);
          }
          var normalizedTranslate = normalize(translate);
          var normalizedSnapGrid = snapGrid.map(function (val) {
            return normalize(val);
          });
          var normalizedSlidesGrid = slidesGrid.map(function (val) {
            return normalize(val);
          });

          var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
          var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
          var prevIndex;
          if (typeof prevSnap !== 'undefined') {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) {
              prevIndex = swiper.activeIndex - 1;
            }
          }
          return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }

        /* eslint no-unused-vars: "off" */
        function slideReset(speed, runCallbacks, internal) {
          if (speed === void 0) speed = this.params.speed;
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }

        /* eslint no-unused-vars: "off" */
        function slideToClosest(speed, runCallbacks, internal) {
          if (speed === void 0) speed = this.params.speed;
          if (runCallbacks === void 0) runCallbacks = true;

          var swiper = this;
          var index = swiper.activeIndex;
          var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

          if (snapIndex < swiper.snapGrid.length - 1) {
            var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

            var currentSnap = swiper.snapGrid[snapIndex];
            var nextSnap = swiper.snapGrid[snapIndex + 1];

            if (translate - currentSnap > (nextSnap - currentSnap) / 2) {
              index = swiper.params.slidesPerGroup;
            }
          }

          return swiper.slideTo(index, speed, runCallbacks, internal);
        }

        function slideToClickedSlide() {
          var swiper = this;
          var params = swiper.params;
          var $wrapperEl = swiper.$wrapperEl;

          var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
          var slideToIndex = swiper.clickedIndex;
          var realIndex;
          if (params.loop) {
            if (swiper.animating) {
              return;
            }
            realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
            if (params.centeredSlides) {
              if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                swiper.loopFix();
                slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();

                Utils.nextTick(function () {
                  swiper.slideTo(slideToIndex);
                });
              } else {
                swiper.slideTo(slideToIndex);
              }
            } else if (slideToIndex > swiper.slides.length - slidesPerView) {
              swiper.loopFix();
              slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();

              Utils.nextTick(function () {
                swiper.slideTo(slideToIndex);
              });
            } else {
              swiper.slideTo(slideToIndex);
            }
          } else {
            swiper.slideTo(slideToIndex);
          }
        }

        var slide = {
          slideTo: slideTo,
          slideToLoop: slideToLoop,
          slideNext: slideNext,
          slidePrev: slidePrev,
          slideReset: slideReset,
          slideToClosest: slideToClosest,
          slideToClickedSlide: slideToClickedSlide
        };

        function loopCreate() {
          var swiper = this;
          var params = swiper.params;
          var $wrapperEl = swiper.$wrapperEl;
          // Remove duplicated slides
          $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass).remove();

          var slides = $wrapperEl.children("." + params.slideClass);

          if (params.loopFillGroupWithBlank) {
            var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
            if (blankSlidesNum !== params.slidesPerGroup) {
              for (var i = 0; i < blankSlidesNum; i += 1) {
                var blankNode = $(doc.createElement('div')).addClass(params.slideClass + " " + params.slideBlankClass);
                $wrapperEl.append(blankNode);
              }
              slides = $wrapperEl.children("." + params.slideClass);
            }
          }

          if (params.slidesPerView === 'auto' && !params.loopedSlides) {
            params.loopedSlides = slides.length;
          }

          swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
          swiper.loopedSlides += params.loopAdditionalSlides;
          if (swiper.loopedSlides > slides.length) {
            swiper.loopedSlides = slides.length;
          }

          var prependSlides = [];
          var appendSlides = [];
          slides.each(function (index, el) {
            var slide = $(el);
            if (index < swiper.loopedSlides) {
              appendSlides.push(el);
            }
            if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
              prependSlides.push(el);
            }
            slide.attr('data-swiper-slide-index', index);
          });
          for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
            $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
          }
          for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
            $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
          }
        }

        function loopFix() {
          var swiper = this;
          var params = swiper.params;
          var activeIndex = swiper.activeIndex;
          var slides = swiper.slides;
          var loopedSlides = swiper.loopedSlides;
          var allowSlidePrev = swiper.allowSlidePrev;
          var allowSlideNext = swiper.allowSlideNext;
          var snapGrid = swiper.snapGrid;
          var rtl = swiper.rtlTranslate;
          var newIndex;
          swiper.allowSlidePrev = true;
          swiper.allowSlideNext = true;

          var snapTranslate = -snapGrid[activeIndex];
          var diff = snapTranslate - swiper.getTranslate();

          // Fix For Negative Oversliding
          if (activeIndex < loopedSlides) {
            newIndex = slides.length - loopedSlides * 3 + activeIndex;
            newIndex += loopedSlides;
            var slideChanged = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged && diff !== 0) {
              swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
          } else if (params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2 || activeIndex >= slides.length - loopedSlides) {
            // Fix For Positive Oversliding
            newIndex = -slides.length + activeIndex + loopedSlides;
            newIndex += loopedSlides;
            var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
            if (slideChanged$1 && diff !== 0) {
              swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
          }
          swiper.allowSlidePrev = allowSlidePrev;
          swiper.allowSlideNext = allowSlideNext;
        }

        function loopDestroy() {
          var swiper = this;
          var $wrapperEl = swiper.$wrapperEl;
          var params = swiper.params;
          var slides = swiper.slides;
          $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass).remove();
          slides.removeAttr('data-swiper-slide-index');
        }

        var loop = {
          loopCreate: loopCreate,
          loopFix: loopFix,
          loopDestroy: loopDestroy
        };

        function setGrabCursor(moving) {
          var swiper = this;
          if (Support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked) {
            return;
          }
          var el = swiper.el;
          el.style.cursor = 'move';
          el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
          el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
          el.style.cursor = moving ? 'grabbing' : 'grab';
        }

        function unsetGrabCursor() {
          var swiper = this;
          if (Support.touch || swiper.params.watchOverflow && swiper.isLocked) {
            return;
          }
          swiper.el.style.cursor = '';
        }

        var grabCursor = {
          setGrabCursor: setGrabCursor,
          unsetGrabCursor: unsetGrabCursor
        };

        function appendSlide(slides) {
          var swiper = this;
          var $wrapperEl = swiper.$wrapperEl;
          var params = swiper.params;
          if (params.loop) {
            swiper.loopDestroy();
          }
          if ((typeof slides === 'undefined' ? 'undefined' : (0, _typeof3.default)(slides)) === 'object' && 'length' in slides) {
            for (var i = 0; i < slides.length; i += 1) {
              if (slides[i]) {
                $wrapperEl.append(slides[i]);
              }
            }
          } else {
            $wrapperEl.append(slides);
          }
          if (params.loop) {
            swiper.loopCreate();
          }
          if (!(params.observer && Support.observer)) {
            swiper.update();
          }
        }

        function prependSlide(slides) {
          var swiper = this;
          var params = swiper.params;
          var $wrapperEl = swiper.$wrapperEl;
          var activeIndex = swiper.activeIndex;

          if (params.loop) {
            swiper.loopDestroy();
          }
          var newActiveIndex = activeIndex + 1;
          if ((typeof slides === 'undefined' ? 'undefined' : (0, _typeof3.default)(slides)) === 'object' && 'length' in slides) {
            for (var i = 0; i < slides.length; i += 1) {
              if (slides[i]) {
                $wrapperEl.prepend(slides[i]);
              }
            }
            newActiveIndex = activeIndex + slides.length;
          } else {
            $wrapperEl.prepend(slides);
          }
          if (params.loop) {
            swiper.loopCreate();
          }
          if (!(params.observer && Support.observer)) {
            swiper.update();
          }
          swiper.slideTo(newActiveIndex, 0, false);
        }

        function addSlide(index, slides) {
          var swiper = this;
          var $wrapperEl = swiper.$wrapperEl;
          var params = swiper.params;
          var activeIndex = swiper.activeIndex;
          var activeIndexBuffer = activeIndex;
          if (params.loop) {
            activeIndexBuffer -= swiper.loopedSlides;
            swiper.loopDestroy();
            swiper.slides = $wrapperEl.children("." + params.slideClass);
          }
          var baseLength = swiper.slides.length;
          if (index <= 0) {
            swiper.prependSlide(slides);
            return;
          } else if (index >= baseLength) {
            swiper.appendSlide(slides);
            return;
          }
          var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

          var slidesBuffer = [];
          for (var i = baseLength - 1; i >= index; i -= 1) {
            var currentSlide = swiper.slides.eq(i);
            currentSlide.remove();
            slidesBuffer.unshift(currentSlide);
          }

          if ((typeof slides === 'undefined' ? 'undefined' : (0, _typeof3.default)(slides)) === 'object' && 'length' in slides) {
            for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
              if (slides[i$1]) {
                $wrapperEl.append(slides[i$1]);
              }
            }
            newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
          } else {
            $wrapperEl.append(slides);
          }

          for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
            $wrapperEl.append(slidesBuffer[i$2]);
          }

          if (params.loop) {
            swiper.loopCreate();
          }
          if (!(params.observer && Support.observer)) {
            swiper.update();
          }
          if (params.loop) {
            swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
          } else {
            swiper.slideTo(newActiveIndex, 0, false);
          }
        }

        function removeSlide(slidesIndexes) {
          var swiper = this;
          var params = swiper.params;
          var $wrapperEl = swiper.$wrapperEl;
          var activeIndex = swiper.activeIndex;

          var activeIndexBuffer = activeIndex;
          if (params.loop) {
            activeIndexBuffer -= swiper.loopedSlides;
            swiper.loopDestroy();
            swiper.slides = $wrapperEl.children("." + params.slideClass);
          }
          var newActiveIndex = activeIndexBuffer;
          var indexToRemove;

          if ((typeof slidesIndexes === 'undefined' ? 'undefined' : (0, _typeof3.default)(slidesIndexes)) === 'object' && 'length' in slidesIndexes) {
            for (var i = 0; i < slidesIndexes.length; i += 1) {
              indexToRemove = slidesIndexes[i];
              if (swiper.slides[indexToRemove]) {
                swiper.slides.eq(indexToRemove).remove();
              }
              if (indexToRemove < newActiveIndex) {
                newActiveIndex -= 1;
              }
            }
            newActiveIndex = Math.max(newActiveIndex, 0);
          } else {
            indexToRemove = slidesIndexes;
            if (swiper.slides[indexToRemove]) {
              swiper.slides.eq(indexToRemove).remove();
            }
            if (indexToRemove < newActiveIndex) {
              newActiveIndex -= 1;
            }
            newActiveIndex = Math.max(newActiveIndex, 0);
          }

          if (params.loop) {
            swiper.loopCreate();
          }

          if (!(params.observer && Support.observer)) {
            swiper.update();
          }
          if (params.loop) {
            swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
          } else {
            swiper.slideTo(newActiveIndex, 0, false);
          }
        }

        function removeAllSlides() {
          var swiper = this;

          var slidesIndexes = [];
          for (var i = 0; i < swiper.slides.length; i += 1) {
            slidesIndexes.push(i);
          }
          swiper.removeSlide(slidesIndexes);
        }

        var manipulation = {
          appendSlide: appendSlide,
          prependSlide: prependSlide,
          addSlide: addSlide,
          removeSlide: removeSlide,
          removeAllSlides: removeAllSlides
        };

        var Device = function Device() {
          var ua = win.navigator.userAgent;

          var device = {
            ios: false,
            android: false,
            androidChrome: false,
            desktop: false,
            windows: false,
            iphone: false,
            ipod: false,
            ipad: false,
            cordova: win.cordova || win.phonegap,
            phonegap: win.cordova || win.phonegap
          };

          var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
          var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
          var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
          var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
          var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);

          // Windows
          if (windows) {
            device.os = 'windows';
            device.osVersion = windows[2];
            device.windows = true;
          }
          // Android
          if (android && !windows) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
          }
          if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
          }
          // iOS
          if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
          }
          if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
          }
          if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
          }
          // iOS 8+ changed UA
          if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
              device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
          }

          // Desktop
          device.desktop = !(device.os || device.android || device.webView);

          // Webview
          device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

          // Minimal UI
          if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            var metaViewport = doc.querySelector('meta[name="viewport"]');
            device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
          }

          // Pixel Ratio
          device.pixelRatio = win.devicePixelRatio || 1;

          // Export object
          return device;
        }();

        function onTouchStart(event) {
          var swiper = this;
          var data = swiper.touchEventsData;
          var params = swiper.params;
          var touches = swiper.touches;
          if (swiper.animating && params.preventIntercationOnTransition) {
            return;
          }
          var e = event;
          if (e.originalEvent) {
            e = e.originalEvent;
          }
          data.isTouchEvent = e.type === 'touchstart';
          if (!data.isTouchEvent && 'which' in e && e.which === 3) {
            return;
          }
          if (data.isTouched && data.isMoved) {
            return;
          }
          if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : "." + params.noSwipingClass)[0]) {
            swiper.allowClick = true;
            return;
          }
          if (params.swipeHandler) {
            if (!$(e).closest(params.swipeHandler)[0]) {
              return;
            }
          }

          touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
          touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
          var startX = touches.currentX;
          var startY = touches.currentY;

          // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

          if (Device.ios && !Device.cordova && params.iOSEdgeSwipeDetection && (startX <= params.iOSEdgeSwipeThreshold || startX >= win.screen.width - params.iOSEdgeSwipeThreshold)) {
            return;
          }

          Utils.extend(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: undefined,
            startMoving: undefined
          });

          touches.startX = startX;
          touches.startY = startY;
          data.touchStartTime = Utils.now();
          swiper.allowClick = true;
          swiper.updateSize();
          swiper.swipeDirection = undefined;
          if (params.threshold > 0) {
            data.allowThresholdMove = false;
          }
          if (e.type !== 'touchstart') {
            var preventDefault = true;
            if ($(e.target).is(data.formElements)) {
              preventDefault = false;
            }
            if (doc.activeElement && $(doc.activeElement).is(data.formElements) && doc.activeElement !== e.target) {
              doc.activeElement.blur();
            }
            if (preventDefault && swiper.allowTouchMove) {
              e.preventDefault();
            }
          }
          swiper.emit('touchStart', e);
        }

        function onTouchMove(event) {
          var swiper = this;
          var data = swiper.touchEventsData;
          var params = swiper.params;
          var touches = swiper.touches;
          var rtl = swiper.rtlTranslate;
          var e = event;
          if (e.originalEvent) {
            e = e.originalEvent;
          }
          if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) {
              swiper.emit('touchMoveOpposite', e);
            }
            return;
          }
          if (data.isTouchEvent && e.type === 'mousemove') {
            return;
          }
          var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
          var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
          if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
          }
          if (!swiper.allowTouchMove) {
            // isMoved = true;
            swiper.allowClick = false;
            if (data.isTouched) {
              Utils.extend(touches, {
                startX: pageX,
                startY: pageY,
                currentX: pageX,
                currentY: pageY
              });
              data.touchStartTime = Utils.now();
            }
            return;
          }
          if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
            if (swiper.isVertical()) {
              // Vertical
              if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
              }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
              return;
            }
          }
          if (data.isTouchEvent && doc.activeElement) {
            if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
              data.isMoved = true;
              swiper.allowClick = false;
              return;
            }
          }
          if (data.allowTouchCallbacks) {
            swiper.emit('touchMove', e);
          }
          if (e.targetTouches && e.targetTouches.length > 1) {
            return;
          }

          touches.currentX = pageX;
          touches.currentY = pageY;

          var diffX = touches.currentX - touches.startX;
          var diffY = touches.currentY - touches.startY;

          if (typeof data.isScrolling === 'undefined') {
            var touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
              data.isScrolling = false;
            } else {
              // eslint-disable-next-line
              if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
              }
            }
          }
          if (data.isScrolling) {
            swiper.emit('touchMoveOpposite', e);
          }
          if (typeof startMoving === 'undefined') {
            if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
              data.startMoving = true;
            }
          }
          if (data.isScrolling) {
            data.isTouched = false;
            return;
          }
          if (!data.startMoving) {
            return;
          }
          swiper.allowClick = false;
          e.preventDefault();
          if (params.touchMoveStopPropagation && !params.nested) {
            e.stopPropagation();
          }

          if (!data.isMoved) {
            if (params.loop) {
              swiper.loopFix();
            }
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
              swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
            }
            data.allowMomentumBounce = false;
            // Grab Cursor
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
              swiper.setGrabCursor(true);
            }
            swiper.emit('sliderFirstMove', e);
          }
          swiper.emit('sliderMove', e);
          data.isMoved = true;

          var diff = swiper.isHorizontal() ? diffX : diffY;
          touches.diff = diff;

          diff *= params.touchRatio;
          if (rtl) {
            diff = -diff;
          }

          swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
          data.currentTranslate = diff + data.startTranslate;

          var disableParentSwiper = true;
          var resistanceRatio = params.resistanceRatio;
          if (params.touchReleaseOnEdges) {
            resistanceRatio = 0;
          }
          if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) {
              data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
            }
          } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
            disableParentSwiper = false;
            if (params.resistance) {
              data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
            }
          }

          if (disableParentSwiper) {
            e.preventedByNestedSwiper = true;
          }

          // Directions locks
          if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
            data.currentTranslate = data.startTranslate;
          }
          if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
            data.currentTranslate = data.startTranslate;
          }

          // Threshold
          if (params.threshold > 0) {
            if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
              if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
              }
            } else {
              data.currentTranslate = data.startTranslate;
              return;
            }
          }

          if (!params.followFinger) {
            return;
          }

          // Update active index in free mode
          if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          }
          if (params.freeMode) {
            // Velocity
            if (data.velocities.length === 0) {
              data.velocities.push({
                position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
                time: data.touchStartTime
              });
            }
            data.velocities.push({
              position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
              time: Utils.now()
            });
          }
          // Update progress
          swiper.updateProgress(data.currentTranslate);
          // Update translate
          swiper.setTranslate(data.currentTranslate);
        }

        function onTouchEnd(event) {
          var swiper = this;
          var data = swiper.touchEventsData;

          var params = swiper.params;
          var touches = swiper.touches;
          var rtl = swiper.rtlTranslate;
          var $wrapperEl = swiper.$wrapperEl;
          var slidesGrid = swiper.slidesGrid;
          var snapGrid = swiper.snapGrid;
          var e = event;
          if (e.originalEvent) {
            e = e.originalEvent;
          }
          if (data.allowTouchCallbacks) {
            swiper.emit('touchEnd', e);
          }
          data.allowTouchCallbacks = false;
          if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) {
              swiper.setGrabCursor(false);
            }
            data.isMoved = false;
            data.startMoving = false;
            return;
          }
          // Return Grab Cursor
          if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
            swiper.setGrabCursor(false);
          }

          // Time diff
          var touchEndTime = Utils.now();
          var timeDiff = touchEndTime - data.touchStartTime;

          // Tap, doubleTap, Click
          if (swiper.allowClick) {
            swiper.updateClickedSlide(e);
            swiper.emit('tap', e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime > 300) {
              if (data.clickTimeout) {
                clearTimeout(data.clickTimeout);
              }
              data.clickTimeout = Utils.nextTick(function () {
                if (!swiper || swiper.destroyed) {
                  return;
                }
                swiper.emit('click', e);
              }, 300);
            }
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
              if (data.clickTimeout) {
                clearTimeout(data.clickTimeout);
              }
              swiper.emit('doubleTap', e);
            }
          }

          data.lastClickTime = Utils.now();
          Utils.nextTick(function () {
            if (!swiper.destroyed) {
              swiper.allowClick = true;
            }
          });

          if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
          }
          data.isTouched = false;
          data.isMoved = false;
          data.startMoving = false;

          var currentPos;
          if (params.followFinger) {
            currentPos = rtl ? swiper.translate : -swiper.translate;
          } else {
            currentPos = -data.currentTranslate;
          }

          if (params.freeMode) {
            if (currentPos < -swiper.minTranslate()) {
              swiper.slideTo(swiper.activeIndex);
              return;
            } else if (currentPos > -swiper.maxTranslate()) {
              if (swiper.slides.length < snapGrid.length) {
                swiper.slideTo(snapGrid.length - 1);
              } else {
                swiper.slideTo(swiper.slides.length - 1);
              }
              return;
            }

            if (params.freeModeMomentum) {
              if (data.velocities.length > 1) {
                var lastMoveEvent = data.velocities.pop();
                var velocityEvent = data.velocities.pop();

                var distance = lastMoveEvent.position - velocityEvent.position;
                var time = lastMoveEvent.time - velocityEvent.time;
                swiper.velocity = distance / time;
                swiper.velocity /= 2;
                if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
                  swiper.velocity = 0;
                }
                // this implies that the user stopped moving a finger then released.
                // There would be no events with distance zero, so the last event is stale.
                if (time > 150 || Utils.now() - lastMoveEvent.time > 300) {
                  swiper.velocity = 0;
                }
              } else {
                swiper.velocity = 0;
              }
              swiper.velocity *= params.freeModeMomentumVelocityRatio;

              data.velocities.length = 0;
              var momentumDuration = 1000 * params.freeModeMomentumRatio;
              var momentumDistance = swiper.velocity * momentumDuration;

              var newPosition = swiper.translate + momentumDistance;
              if (rtl) {
                newPosition = -newPosition;
              }

              var doBounce = false;
              var afterBouncePosition;
              var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
              var needsLoopFix;
              if (newPosition < swiper.maxTranslate()) {
                if (params.freeModeMomentumBounce) {
                  if (newPosition + swiper.maxTranslate() < -bounceAmount) {
                    newPosition = swiper.maxTranslate() - bounceAmount;
                  }
                  afterBouncePosition = swiper.maxTranslate();
                  doBounce = true;
                  data.allowMomentumBounce = true;
                } else {
                  newPosition = swiper.maxTranslate();
                }
                if (params.loop && params.centeredSlides) {
                  needsLoopFix = true;
                }
              } else if (newPosition > swiper.minTranslate()) {
                if (params.freeModeMomentumBounce) {
                  if (newPosition - swiper.minTranslate() > bounceAmount) {
                    newPosition = swiper.minTranslate() + bounceAmount;
                  }
                  afterBouncePosition = swiper.minTranslate();
                  doBounce = true;
                  data.allowMomentumBounce = true;
                } else {
                  newPosition = swiper.minTranslate();
                }
                if (params.loop && params.centeredSlides) {
                  needsLoopFix = true;
                }
              } else if (params.freeModeSticky) {
                var nextSlide;
                for (var j = 0; j < snapGrid.length; j += 1) {
                  if (snapGrid[j] > -newPosition) {
                    nextSlide = j;
                    break;
                  }
                }

                if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
                  newPosition = snapGrid[nextSlide];
                } else {
                  newPosition = snapGrid[nextSlide - 1];
                }
                newPosition = -newPosition;
              }
              if (needsLoopFix) {
                swiper.once('transitionEnd', function () {
                  swiper.loopFix();
                });
              }
              // Fix duration
              if (swiper.velocity !== 0) {
                if (rtl) {
                  momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
                } else {
                  momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
                }
              } else if (params.freeModeSticky) {
                swiper.slideToClosest();
                return;
              }

              if (params.freeModeMomentumBounce && doBounce) {
                swiper.updateProgress(afterBouncePosition);
                swiper.setTransition(momentumDuration);
                swiper.setTranslate(newPosition);
                swiper.transitionStart(true, swiper.swipeDirection);
                swiper.animating = true;
                $wrapperEl.transitionEnd(function () {
                  if (!swiper || swiper.destroyed || !data.allowMomentumBounce) {
                    return;
                  }
                  swiper.emit('momentumBounce');

                  swiper.setTransition(params.speed);
                  swiper.setTranslate(afterBouncePosition);
                  $wrapperEl.transitionEnd(function () {
                    if (!swiper || swiper.destroyed) {
                      return;
                    }
                    swiper.transitionEnd();
                  });
                });
              } else if (swiper.velocity) {
                swiper.updateProgress(newPosition);
                swiper.setTransition(momentumDuration);
                swiper.setTranslate(newPosition);
                swiper.transitionStart(true, swiper.swipeDirection);
                if (!swiper.animating) {
                  swiper.animating = true;
                  $wrapperEl.transitionEnd(function () {
                    if (!swiper || swiper.destroyed) {
                      return;
                    }
                    swiper.transitionEnd();
                  });
                }
              } else {
                swiper.updateProgress(newPosition);
              }

              swiper.updateActiveIndex();
              swiper.updateSlidesClasses();
            } else if (params.freeModeSticky) {
              swiper.slideToClosest();
              return;
            }

            if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
              swiper.updateProgress();
              swiper.updateActiveIndex();
              swiper.updateSlidesClasses();
            }
            return;
          }

          // Find current slide
          var stopIndex = 0;
          var groupSize = swiper.slidesSizesGrid[0];
          for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
            if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
              if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
                stopIndex = i;
                groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
              }
            } else if (currentPos >= slidesGrid[i]) {
              stopIndex = i;
              groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
          }

          // Find current slide size
          var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

          if (timeDiff > params.longSwipesMs) {
            // Long touches
            if (!params.longSwipes) {
              swiper.slideTo(swiper.activeIndex);
              return;
            }
            if (swiper.swipeDirection === 'next') {
              if (ratio >= params.longSwipesRatio) {
                swiper.slideTo(stopIndex + params.slidesPerGroup);
              } else {
                swiper.slideTo(stopIndex);
              }
            }
            if (swiper.swipeDirection === 'prev') {
              if (ratio > 1 - params.longSwipesRatio) {
                swiper.slideTo(stopIndex + params.slidesPerGroup);
              } else {
                swiper.slideTo(stopIndex);
              }
            }
          } else {
            // Short swipes
            if (!params.shortSwipes) {
              swiper.slideTo(swiper.activeIndex);
              return;
            }
            if (swiper.swipeDirection === 'next') {
              swiper.slideTo(stopIndex + params.slidesPerGroup);
            }
            if (swiper.swipeDirection === 'prev') {
              swiper.slideTo(stopIndex);
            }
          }
        }

        function onResize() {
          var swiper = this;

          var params = swiper.params;
          var el = swiper.el;

          if (el && el.offsetWidth === 0) {
            return;
          }

          // Breakpoints
          if (params.breakpoints) {
            swiper.setBreakpoint();
          }

          // Save locks
          var allowSlideNext = swiper.allowSlideNext;
          var allowSlidePrev = swiper.allowSlidePrev;
          var snapGrid = swiper.snapGrid;

          // Disable locks on resize
          swiper.allowSlideNext = true;
          swiper.allowSlidePrev = true;

          swiper.updateSize();
          swiper.updateSlides();

          if (params.freeMode) {
            var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
            swiper.setTranslate(newTranslate);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();

            if (params.autoHeight) {
              swiper.updateAutoHeight();
            }
          } else {
            swiper.updateSlidesClasses();
            if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
              swiper.slideTo(swiper.slides.length - 1, 0, false, true);
            } else {
              swiper.slideTo(swiper.activeIndex, 0, false, true);
            }
          }
          // Return locks after resize
          swiper.allowSlidePrev = allowSlidePrev;
          swiper.allowSlideNext = allowSlideNext;

          if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
            swiper.checkOverflow();
          }
        }

        function onClick(e) {
          var swiper = this;
          if (!swiper.allowClick) {
            if (swiper.params.preventClicks) {
              e.preventDefault();
            }
            if (swiper.params.preventClicksPropagation && swiper.animating) {
              e.stopPropagation();
              e.stopImmediatePropagation();
            }
          }
        }

        function attachEvents() {
          var swiper = this;
          var params = swiper.params;
          var touchEvents = swiper.touchEvents;
          var el = swiper.el;
          var wrapperEl = swiper.wrapperEl;

          {
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
          }

          swiper.onClick = onClick.bind(swiper);

          var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
          var capture = !!params.nested;

          // Touch Events
          {
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
              target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
              doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
              doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
            } else {
              if (Support.touch) {
                var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
                target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
                target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
                target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
              }
              if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
                target.addEventListener('mousedown', swiper.onTouchStart, false);
                doc.addEventListener('mousemove', swiper.onTouchMove, capture);
                doc.addEventListener('mouseup', swiper.onTouchEnd, false);
              }
            }
            // Prevent Links Clicks
            if (params.preventClicks || params.preventClicksPropagation) {
              target.addEventListener('click', swiper.onClick, true);
            }
          }

          // Resize handler
          swiper.on(Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize, true);
        }

        function detachEvents() {
          var swiper = this;

          var params = swiper.params;
          var touchEvents = swiper.touchEvents;
          var el = swiper.el;
          var wrapperEl = swiper.wrapperEl;

          var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
          var capture = !!params.nested;

          // Touch Events
          {
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
              target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
              doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
              doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
            } else {
              if (Support.touch) {
                var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
                target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
                target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
                target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
              }
              if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
                target.removeEventListener('mousedown', swiper.onTouchStart, false);
                doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
                doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
              }
            }
            // Prevent Links Clicks
            if (params.preventClicks || params.preventClicksPropagation) {
              target.removeEventListener('click', swiper.onClick, true);
            }
          }

          // Resize handler
          swiper.off(Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate', onResize);
        }

        var events = {
          attachEvents: attachEvents,
          detachEvents: detachEvents
        };

        function setBreakpoint() {
          var swiper = this;
          var activeIndex = swiper.activeIndex;
          var initialized = swiper.initialized;
          var loopedSlides = swiper.loopedSlides;if (loopedSlides === void 0) loopedSlides = 0;
          var params = swiper.params;
          var breakpoints = params.breakpoints;
          if (!breakpoints || breakpoints && (0, _keys2.default)(breakpoints).length === 0) {
            return;
          }
          // Set breakpoint for window width and update parameters
          var breakpoint = swiper.getBreakpoint(breakpoints);
          if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
            var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
            var needsReLoop = params.loop && breakPointsParams.slidesPerView !== params.slidesPerView;

            Utils.extend(swiper.params, breakPointsParams);

            Utils.extend(swiper, {
              allowTouchMove: swiper.params.allowTouchMove,
              allowSlideNext: swiper.params.allowSlideNext,
              allowSlidePrev: swiper.params.allowSlidePrev
            });

            swiper.currentBreakpoint = breakpoint;

            if (needsReLoop && initialized) {
              swiper.loopDestroy();
              swiper.loopCreate();
              swiper.updateSlides();
              swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit('breakpoint', breakPointsParams);
          }
        }

        function getBreakpoint(breakpoints) {
          // Get breakpoint for window width
          if (!breakpoints) {
            return undefined;
          }
          var breakpoint = false;
          var points = [];
          (0, _keys2.default)(breakpoints).forEach(function (point) {
            points.push(point);
          });
          points.sort(function (a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
          });
          for (var i = 0; i < points.length; i += 1) {
            var point = points[i];
            if (point >= win.innerWidth && !breakpoint) {
              breakpoint = point;
            }
          }
          return breakpoint || 'max';
        }

        var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

        var Browser = function Browser() {
          function isSafari() {
            var ua = win.navigator.userAgent.toLowerCase();
            return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
          }
          return {
            isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
            isSafari: isSafari(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent)
          };
        }();

        function addClasses() {
          var swiper = this;
          var classNames = swiper.classNames;
          var params = swiper.params;
          var rtl = swiper.rtl;
          var $el = swiper.$el;
          var suffixes = [];

          suffixes.push(params.direction);

          if (params.freeMode) {
            suffixes.push('free-mode');
          }
          if (!Support.flexbox) {
            suffixes.push('no-flexbox');
          }
          if (params.autoHeight) {
            suffixes.push('autoheight');
          }
          if (rtl) {
            suffixes.push('rtl');
          }
          if (params.slidesPerColumn > 1) {
            suffixes.push('multirow');
          }
          if (Device.android) {
            suffixes.push('android');
          }
          if (Device.ios) {
            suffixes.push('ios');
          }
          // WP8 Touch Events Fix
          if (Browser.isIE && (Support.pointerEvents || Support.prefixedPointerEvents)) {
            suffixes.push("wp8-" + params.direction);
          }

          suffixes.forEach(function (suffix) {
            classNames.push(params.containerModifierClass + suffix);
          });

          $el.addClass(classNames.join(' '));
        }

        function removeClasses() {
          var swiper = this;
          var $el = swiper.$el;
          var classNames = swiper.classNames;

          $el.removeClass(classNames.join(' '));
        }

        var classes = { addClasses: addClasses, removeClasses: removeClasses };

        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
          var image;
          function onReady() {
            if (callback) {
              callback();
            }
          }
          if (!imageEl.complete || !checkForComplete) {
            if (src) {
              image = new win.Image();
              image.onload = onReady;
              image.onerror = onReady;
              if (sizes) {
                image.sizes = sizes;
              }
              if (srcset) {
                image.srcset = srcset;
              }
              if (src) {
                image.src = src;
              }
            } else {
              onReady();
            }
          } else {
            // image already loaded...
            onReady();
          }
        }

        function preloadImages() {
          var swiper = this;
          swiper.imagesToLoad = swiper.$el.find('img');
          function onReady() {
            if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) {
              return;
            }
            if (swiper.imagesLoaded !== undefined) {
              swiper.imagesLoaded += 1;
            }
            if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
              if (swiper.params.updateOnImagesReady) {
                swiper.update();
              }
              swiper.emit('imagesReady');
            }
          }
          for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
            var imageEl = swiper.imagesToLoad[i];
            swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
          }
        }

        var images = {
          loadImage: loadImage,
          preloadImages: preloadImages
        };

        function checkOverflow() {
          var swiper = this;
          var wasLocked = swiper.isLocked;

          swiper.isLocked = swiper.snapGrid.length === 1;
          swiper.allowSlideNext = !swiper.isLocked;
          swiper.allowSlidePrev = !swiper.isLocked;

          // events
          if (wasLocked !== swiper.isLocked) {
            swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
          }

          if (wasLocked && wasLocked !== swiper.isLocked) {
            swiper.isEnd = false;
            swiper.navigation.update();
          }
        }

        var checkOverflow$1 = { checkOverflow: checkOverflow };

        var defaults = {
          init: true,
          direction: 'horizontal',
          touchEventsTarget: 'container',
          initialSlide: 0,
          speed: 300,
          //
          preventIntercationOnTransition: false,

          // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
          iOSEdgeSwipeDetection: false,
          iOSEdgeSwipeThreshold: 20,

          // Free mode
          freeMode: false,
          freeModeMomentum: true,
          freeModeMomentumRatio: 1,
          freeModeMomentumBounce: true,
          freeModeMomentumBounceRatio: 1,
          freeModeMomentumVelocityRatio: 1,
          freeModeSticky: false,
          freeModeMinimumVelocity: 0.02,

          // Autoheight
          autoHeight: false,

          // Set wrapper width
          setWrapperSize: false,

          // Virtual Translate
          virtualTranslate: false,

          // Effects
          effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

          // Breakpoints
          breakpoints: undefined,

          // Slides grid
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerColumnFill: 'column',
          slidesPerGroup: 1,
          centeredSlides: false,
          slidesOffsetBefore: 0, // in px
          slidesOffsetAfter: 0, // in px
          normalizeSlideIndex: true,

          // Disable swiper and hide navigation when container not overflow
          watchOverflow: false,

          // Round length
          roundLengths: false,

          // Touches
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: true,
          shortSwipes: true,
          longSwipes: true,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: true,
          allowTouchMove: true,
          threshold: 0,
          touchMoveStopPropagation: true,
          touchReleaseOnEdges: false,

          // Unique Navigation Elements
          uniqueNavElements: true,

          // Resistance
          resistance: true,
          resistanceRatio: 0.85,

          // Progress
          watchSlidesProgress: false,
          watchSlidesVisibility: false,

          // Cursor
          grabCursor: false,

          // Clicks
          preventClicks: true,
          preventClicksPropagation: true,
          slideToClickedSlide: false,

          // Images
          preloadImages: true,
          updateOnImagesReady: true,

          // loop
          loop: false,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          loopFillGroupWithBlank: false,

          // Swiping/no swiping
          allowSlidePrev: true,
          allowSlideNext: true,
          swipeHandler: null, // '.swipe-handler',
          noSwiping: true,
          noSwipingClass: 'swiper-no-swiping',
          noSwipingSelector: null,

          // Passive Listeners
          passiveListeners: true,

          // NS
          containerModifierClass: 'swiper-container-', // NEW
          slideClass: 'swiper-slide',
          slideBlankClass: 'swiper-slide-invisible-blank',
          slideActiveClass: 'swiper-slide-active',
          slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
          slideVisibleClass: 'swiper-slide-visible',
          slideDuplicateClass: 'swiper-slide-duplicate',
          slideNextClass: 'swiper-slide-next',
          slideDuplicateNextClass: 'swiper-slide-duplicate-next',
          slidePrevClass: 'swiper-slide-prev',
          slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
          wrapperClass: 'swiper-wrapper',

          // Callbacks
          runCallbacksOnInit: true
        };

        var prototypes = {
          update: update,
          translate: translate,
          transition: transition$1,
          slide: slide,
          loop: loop,
          grabCursor: grabCursor,
          manipulation: manipulation,
          events: events,
          breakpoints: breakpoints,
          checkOverflow: checkOverflow$1,
          classes: classes,
          images: images
        };

        var extendedDefaults = {};

        var Swiper = function (SwiperClass$$1) {
          function Swiper() {
            var assign;

            var args = [],
                len = arguments.length;
            while (len--) {
              args[len] = arguments[len];
            }var el;
            var params;
            if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
              params = args[0];
            } else {
              assign = args, el = assign[0], params = assign[1];
            }
            if (!params) {
              params = {};
            }

            params = Utils.extend({}, params);
            if (el && !params.el) {
              params.el = el;
            }

            SwiperClass$$1.call(this, params);

            (0, _keys2.default)(prototypes).forEach(function (prototypeGroup) {
              (0, _keys2.default)(prototypes[prototypeGroup]).forEach(function (protoMethod) {
                if (!Swiper.prototype[protoMethod]) {
                  Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
                }
              });
            });

            // Swiper Instance
            var swiper = this;
            if (typeof swiper.modules === 'undefined') {
              swiper.modules = {};
            }
            (0, _keys2.default)(swiper.modules).forEach(function (moduleName) {
              var module = swiper.modules[moduleName];
              if (module.params) {
                var moduleParamName = (0, _keys2.default)(module.params)[0];
                var moduleParams = module.params[moduleParamName];
                if ((typeof moduleParams === 'undefined' ? 'undefined' : (0, _typeof3.default)(moduleParams)) !== 'object') {
                  return;
                }
                if (!(moduleParamName in params && 'enabled' in moduleParams)) {
                  return;
                }
                if (params[moduleParamName] === true) {
                  params[moduleParamName] = { enabled: true };
                }
                if ((0, _typeof3.default)(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
                  params[moduleParamName].enabled = true;
                }
                if (!params[moduleParamName]) {
                  params[moduleParamName] = { enabled: false };
                }
              }
            });

            // Extend defaults with modules params
            var swiperParams = Utils.extend({}, defaults);
            swiper.useModulesParams(swiperParams);

            // Extend defaults with passed params
            swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = Utils.extend({}, swiper.params);
            swiper.passedParams = Utils.extend({}, params);

            // Save Dom lib
            swiper.$ = $;

            // Find el
            var $el = $(swiper.params.el);
            el = $el[0];

            if (!el) {
              return undefined;
            }

            if ($el.length > 1) {
              var swipers = [];
              $el.each(function (index, containerEl) {
                var newParams = Utils.extend({}, params, { el: containerEl });
                swipers.push(new Swiper(newParams));
              });
              return swipers;
            }

            el.swiper = swiper;
            $el.data('swiper', swiper);

            // Find Wrapper
            var $wrapperEl = $el.children("." + swiper.params.wrapperClass);

            // Extend Swiper
            Utils.extend(swiper, {
              $el: $el,
              el: el,
              $wrapperEl: $wrapperEl,
              wrapperEl: $wrapperEl[0],

              // Classes
              classNames: [],

              // Slides
              slides: $(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],

              // isDirection
              isHorizontal: function isHorizontal() {
                return swiper.params.direction === 'horizontal';
              },
              isVertical: function isVertical() {
                return swiper.params.direction === 'vertical';
              },
              // RTL
              rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
              rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
              wrongRTL: $wrapperEl.css('display') === '-webkit-box',

              // Indexes
              activeIndex: 0,
              realIndex: 0,

              //
              isBeginning: true,
              isEnd: false,

              // Props
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: false,

              // Locks
              allowSlideNext: swiper.params.allowSlideNext,
              allowSlidePrev: swiper.params.allowSlidePrev,

              // Touch Events
              touchEvents: function touchEvents() {
                var touch = ['touchstart', 'touchmove', 'touchend'];
                var desktop = ['mousedown', 'mousemove', 'mouseup'];
                if (Support.pointerEvents) {
                  desktop = ['pointerdown', 'pointermove', 'pointerup'];
                } else if (Support.prefixedPointerEvents) {
                  desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
                }
                swiper.touchEventsTouch = {
                  start: touch[0],
                  move: touch[1],
                  end: touch[2]
                };
                swiper.touchEventsDesktop = {
                  start: desktop[0],
                  move: desktop[1],
                  end: desktop[2]
                };
                return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
              }(),
              touchEventsData: {
                isTouched: undefined,
                isMoved: undefined,
                allowTouchCallbacks: undefined,
                touchStartTime: undefined,
                isScrolling: undefined,
                currentTranslate: undefined,
                startTranslate: undefined,
                allowThresholdMove: undefined,
                // Form elements to match
                formElements: 'input, select, option, textarea, button, video',
                // Last click time
                lastClickTime: Utils.now(),
                clickTimeout: undefined,
                // Velocities
                velocities: [],
                allowMomentumBounce: undefined,
                isTouchEvent: undefined,
                startMoving: undefined
              },

              // Clicks
              allowClick: true,

              // Touches
              allowTouchMove: swiper.params.allowTouchMove,

              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
              },

              // Images
              imagesToLoad: [],
              imagesLoaded: 0

            });

            // Install Modules
            swiper.useModules();

            // Init
            if (swiper.params.init) {
              swiper.init();
            }

            // Return app instance
            return swiper;
          }

          if (SwiperClass$$1) Swiper.__proto__ = SwiperClass$$1;
          Swiper.prototype = (0, _create2.default)(SwiperClass$$1 && SwiperClass$$1.prototype);
          Swiper.prototype.constructor = Swiper;

          var staticAccessors = { extendedDefaults: { configurable: true }, defaults: { configurable: true }, Class: { configurable: true }, $: { configurable: true } };
          Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic() {
            var swiper = this;
            var params = swiper.params;
            var slides = swiper.slides;
            var slidesGrid = swiper.slidesGrid;
            var swiperSize = swiper.size;
            var activeIndex = swiper.activeIndex;
            var spv = 1;
            if (params.centeredSlides) {
              var slideSize = slides[activeIndex].swiperSlideSize;
              var breakLoop;
              for (var i = activeIndex + 1; i < slides.length; i += 1) {
                if (slides[i] && !breakLoop) {
                  slideSize += slides[i].swiperSlideSize;
                  spv += 1;
                  if (slideSize > swiperSize) {
                    breakLoop = true;
                  }
                }
              }
              for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
                if (slides[i$1] && !breakLoop) {
                  slideSize += slides[i$1].swiperSlideSize;
                  spv += 1;
                  if (slideSize > swiperSize) {
                    breakLoop = true;
                  }
                }
              }
            } else {
              for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
                if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
                  spv += 1;
                }
              }
            }
            return spv;
          };
          Swiper.prototype.update = function update$$1() {
            var swiper = this;
            if (!swiper || swiper.destroyed) {
              return;
            }
            var snapGrid = swiper.snapGrid;
            var params = swiper.params;
            // Breakpoints
            if (params.breakpoints) {
              swiper.setBreakpoint();
            }
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();

            function setTranslate() {
              var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
              var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
              swiper.setTranslate(newTranslate);
              swiper.updateActiveIndex();
              swiper.updateSlidesClasses();
            }
            var translated;
            if (swiper.params.freeMode) {
              setTranslate();
              if (swiper.params.autoHeight) {
                swiper.updateAutoHeight();
              }
            } else {
              if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
                translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
              } else {
                translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
              }
              if (!translated) {
                setTranslate();
              }
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
              swiper.checkOverflow();
            }
            swiper.emit('update');
          };
          Swiper.prototype.init = function init() {
            var swiper = this;
            if (swiper.initialized) {
              return;
            }

            swiper.emit('beforeInit');

            // Set breakpoint
            if (swiper.params.breakpoints) {
              swiper.setBreakpoint();
            }

            // Add Classes
            swiper.addClasses();

            // Create loop
            if (swiper.params.loop) {
              swiper.loopCreate();
            }

            // Update size
            swiper.updateSize();

            // Update slides
            swiper.updateSlides();

            if (swiper.params.watchOverflow) {
              swiper.checkOverflow();
            }

            // Set Grab Cursor
            if (swiper.params.grabCursor) {
              swiper.setGrabCursor();
            }

            if (swiper.params.preloadImages) {
              swiper.preloadImages();
            }

            // Slide To Initial Slide
            if (swiper.params.loop) {
              swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
            } else {
              swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
            }

            // Attach events
            swiper.attachEvents();

            // Init Flag
            swiper.initialized = true;

            // Emit
            swiper.emit('init');
          };
          Swiper.prototype.destroy = function destroy(deleteInstance, cleanStyles) {
            if (deleteInstance === void 0) deleteInstance = true;
            if (cleanStyles === void 0) cleanStyles = true;

            var swiper = this;
            var params = swiper.params;
            var $el = swiper.$el;
            var $wrapperEl = swiper.$wrapperEl;
            var slides = swiper.slides;

            if (typeof swiper.params === 'undefined' || swiper.destroyed) {
              return null;
            }

            swiper.emit('beforeDestroy');

            // Init Flag
            swiper.initialized = false;

            // Detach events
            swiper.detachEvents();

            // Destroy loop
            if (params.loop) {
              swiper.loopDestroy();
            }

            // Cleanup styles
            if (cleanStyles) {
              swiper.removeClasses();
              $el.removeAttr('style');
              $wrapperEl.removeAttr('style');
              if (slides && slides.length) {
                slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
              }
            }

            swiper.emit('destroy');

            // Detach emitter events
            (0, _keys2.default)(swiper.eventsListeners).forEach(function (eventName) {
              swiper.off(eventName);
            });

            if (deleteInstance !== false) {
              swiper.$el[0].swiper = null;
              swiper.$el.data('swiper', null);
              Utils.deleteProps(swiper);
            }
            swiper.destroyed = true;

            return null;
          };
          Swiper.extendDefaults = function extendDefaults(newDefaults) {
            Utils.extend(extendedDefaults, newDefaults);
          };
          staticAccessors.extendedDefaults.get = function () {
            return extendedDefaults;
          };
          staticAccessors.defaults.get = function () {
            return defaults;
          };
          staticAccessors.Class.get = function () {
            return SwiperClass$$1;
          };
          staticAccessors.$.get = function () {
            return $;
          };

          (0, _defineProperties2.default)(Swiper, staticAccessors);

          return Swiper;
        }(SwiperClass);

        var Device$1 = {
          name: 'device',
          proto: {
            device: Device
          },
          static: {
            device: Device
          }
        };

        var Support$1 = {
          name: 'support',
          proto: {
            support: Support
          },
          static: {
            support: Support
          }
        };

        var Browser$1 = {
          name: 'browser',
          proto: {
            browser: Browser
          },
          static: {
            browser: Browser
          }
        };

        var Resize = {
          name: 'resize',
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              resize: {
                resizeHandler: function resizeHandler() {
                  if (!swiper || swiper.destroyed || !swiper.initialized) {
                    return;
                  }
                  swiper.emit('beforeResize');
                  swiper.emit('resize');
                },
                orientationChangeHandler: function orientationChangeHandler() {
                  if (!swiper || swiper.destroyed || !swiper.initialized) {
                    return;
                  }
                  swiper.emit('orientationchange');
                }
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              // Emit resize
              win.addEventListener('resize', swiper.resize.resizeHandler);

              // Emit orientationchange
              win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
            },
            destroy: function destroy() {
              var swiper = this;
              win.removeEventListener('resize', swiper.resize.resizeHandler);
              win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
            }
          }
        };

        var Observer = {
          func: win.MutationObserver || win.WebkitMutationObserver,
          attach: function attach(target, options) {
            if (options === void 0) options = {};

            var swiper = this;

            var ObserverFunc = Observer.func;
            var observer = new ObserverFunc(function (mutations) {
              mutations.forEach(function (mutation) {
                swiper.emit('observerUpdate', mutation);
              });
            });

            observer.observe(target, {
              attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
              childList: typeof options.childList === 'undefined' ? true : options.childList,
              characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });

            swiper.observer.observers.push(observer);
          },
          init: function init() {
            var swiper = this;
            if (!Support.observer || !swiper.params.observer) {
              return;
            }
            if (swiper.params.observeParents) {
              var containerParents = swiper.$el.parents();
              for (var i = 0; i < containerParents.length; i += 1) {
                swiper.observer.attach(containerParents[i]);
              }
            }
            // Observe container
            swiper.observer.attach(swiper.$el[0], { childList: false });

            // Observe wrapper
            swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
          },
          destroy: function destroy() {
            var swiper = this;
            swiper.observer.observers.forEach(function (observer) {
              observer.disconnect();
            });
            swiper.observer.observers = [];
          }
        };

        var Observer$1 = {
          name: 'observer',
          params: {
            observer: false,
            observeParents: false
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              observer: {
                init: Observer.init.bind(swiper),
                attach: Observer.attach.bind(swiper),
                destroy: Observer.destroy.bind(swiper),
                observers: []
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              swiper.observer.init();
            },
            destroy: function destroy() {
              var swiper = this;
              swiper.observer.destroy();
            }
          }
        };

        var Virtual = {
          update: function update(force) {
            var swiper = this;
            var ref = swiper.params;
            var slidesPerView = ref.slidesPerView;
            var slidesPerGroup = ref.slidesPerGroup;
            var centeredSlides = ref.centeredSlides;
            var ref$1 = swiper.virtual;
            var previousFrom = ref$1.from;
            var previousTo = ref$1.to;
            var slides = ref$1.slides;
            var previousSlidesGrid = ref$1.slidesGrid;
            var renderSlide = ref$1.renderSlide;
            var previousOffset = ref$1.offset;
            swiper.updateActiveIndex();
            var activeIndex = swiper.activeIndex || 0;

            var offsetProp;
            if (swiper.rtlTranslate) {
              offsetProp = 'right';
            } else {
              offsetProp = swiper.isHorizontal() ? 'left' : 'top';
            }

            var slidesAfter;
            var slidesBefore;
            if (centeredSlides) {
              slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
              slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
            } else {
              slidesAfter = slidesPerView + (slidesPerGroup - 1);
              slidesBefore = slidesPerGroup;
            }
            var from = Math.max((activeIndex || 0) - slidesBefore, 0);
            var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
            var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

            Utils.extend(swiper.virtual, {
              from: from,
              to: to,
              offset: offset,
              slidesGrid: swiper.slidesGrid
            });

            function onRendered() {
              swiper.updateSlides();
              swiper.updateProgress();
              swiper.updateSlidesClasses();
              if (swiper.lazy && swiper.params.lazy.enabled) {
                swiper.lazy.load();
              }
            }

            if (previousFrom === from && previousTo === to && !force) {
              if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
                swiper.slides.css(offsetProp, offset + "px");
              }
              swiper.updateProgress();
              return;
            }
            if (swiper.params.virtual.renderExternal) {
              swiper.params.virtual.renderExternal.call(swiper, {
                offset: offset,
                from: from,
                to: to,
                slides: function getSlides() {
                  var slidesToRender = [];
                  for (var i = from; i <= to; i += 1) {
                    slidesToRender.push(slides[i]);
                  }
                  return slidesToRender;
                }()
              });
              onRendered();
              return;
            }
            var prependIndexes = [];
            var appendIndexes = [];
            if (force) {
              swiper.$wrapperEl.find("." + swiper.params.slideClass).remove();
            } else {
              for (var i = previousFrom; i <= previousTo; i += 1) {
                if (i < from || i > to) {
                  swiper.$wrapperEl.find("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + i + "\"]").remove();
                }
              }
            }
            for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
              if (i$1 >= from && i$1 <= to) {
                if (typeof previousTo === 'undefined' || force) {
                  appendIndexes.push(i$1);
                } else {
                  if (i$1 > previousTo) {
                    appendIndexes.push(i$1);
                  }
                  if (i$1 < previousFrom) {
                    prependIndexes.push(i$1);
                  }
                }
              }
            }
            appendIndexes.forEach(function (index) {
              swiper.$wrapperEl.append(renderSlide(slides[index], index));
            });
            prependIndexes.sort(function (a, b) {
              return a < b;
            }).forEach(function (index) {
              swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
            });
            swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, offset + "px");
            onRendered();
          },
          renderSlide: function renderSlide(slide, index) {
            var swiper = this;
            var params = swiper.params.virtual;
            if (params.cache && swiper.virtual.cache[index]) {
              return swiper.virtual.cache[index];
            }
            var $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $("<div class=\"" + swiper.params.slideClass + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>");
            if (!$slideEl.attr('data-swiper-slide-index')) {
              $slideEl.attr('data-swiper-slide-index', index);
            }
            if (params.cache) {
              swiper.virtual.cache[index] = $slideEl;
            }
            return $slideEl;
          },
          appendSlide: function appendSlide(slide) {
            var swiper = this;
            swiper.virtual.slides.push(slide);
            swiper.virtual.update(true);
          },
          prependSlide: function prependSlide(slide) {
            var swiper = this;
            swiper.virtual.slides.unshift(slide);
            if (swiper.params.virtual.cache) {
              var cache = swiper.virtual.cache;
              var newCache = {};
              (0, _keys2.default)(cache).forEach(function (cachedIndex) {
                newCache[cachedIndex + 1] = cache[cachedIndex];
              });
              swiper.virtual.cache = newCache;
            }
            swiper.virtual.update(true);
            swiper.slideNext(0);
          }
        };

        var Virtual$1 = {
          name: 'virtual',
          params: {
            virtual: {
              enabled: false,
              slides: [],
              cache: true,
              renderSlide: null,
              renderExternal: null
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              virtual: {
                update: Virtual.update.bind(swiper),
                appendSlide: Virtual.appendSlide.bind(swiper),
                prependSlide: Virtual.prependSlide.bind(swiper),
                renderSlide: Virtual.renderSlide.bind(swiper),
                slides: swiper.params.virtual.slides,
                cache: {}
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (!swiper.params.virtual.enabled) {
                return;
              }
              swiper.classNames.push(swiper.params.containerModifierClass + "virtual");
              var overwriteParams = {
                watchSlidesProgress: true
              };
              Utils.extend(swiper.params, overwriteParams);
              Utils.extend(swiper.originalParams, overwriteParams);

              swiper.virtual.update();
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              if (!swiper.params.virtual.enabled) {
                return;
              }
              swiper.virtual.update();
            }
          }
        };

        var Keyboard = {
          handle: function handle(event) {
            var swiper = this;
            var rtl = swiper.rtlTranslate;
            var e = event;
            if (e.originalEvent) {
              e = e.originalEvent;
            } // jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!swiper.allowSlideNext && (swiper.isHorizontal() && kc === 39 || swiper.isVertical() && kc === 40)) {
              return false;
            }
            if (!swiper.allowSlidePrev && (swiper.isHorizontal() && kc === 37 || swiper.isVertical() && kc === 38)) {
              return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
              return undefined;
            }
            if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
              return undefined;
            }
            if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
              var inView = false;
              // Check that swiper should be inside of visible area of window
              if (swiper.$el.parents("." + swiper.params.slideClass).length > 0 && swiper.$el.parents("." + swiper.params.slideActiveClass).length === 0) {
                return undefined;
              }
              var windowWidth = win.innerWidth;
              var windowHeight = win.innerHeight;
              var swiperOffset = swiper.$el.offset();
              if (rtl) {
                swiperOffset.left -= swiper.$el[0].scrollLeft;
              }
              var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];
              for (var i = 0; i < swiperCoord.length; i += 1) {
                var point = swiperCoord[i];
                if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
                  inView = true;
                }
              }
              if (!inView) {
                return undefined;
              }
            }
            if (swiper.isHorizontal()) {
              if (kc === 37 || kc === 39) {
                if (e.preventDefault) {
                  e.preventDefault();
                } else {
                  e.returnValue = false;
                }
              }
              if (kc === 39 && !rtl || kc === 37 && rtl) {
                swiper.slideNext();
              }
              if (kc === 37 && !rtl || kc === 39 && rtl) {
                swiper.slidePrev();
              }
            } else {
              if (kc === 38 || kc === 40) {
                if (e.preventDefault) {
                  e.preventDefault();
                } else {
                  e.returnValue = false;
                }
              }
              if (kc === 40) {
                swiper.slideNext();
              }
              if (kc === 38) {
                swiper.slidePrev();
              }
            }
            swiper.emit('keyPress', kc);
            return undefined;
          },
          enable: function enable() {
            var swiper = this;
            if (swiper.keyboard.enabled) {
              return;
            }
            $(doc).on('keydown', swiper.keyboard.handle);
            swiper.keyboard.enabled = true;
          },
          disable: function disable() {
            var swiper = this;
            if (!swiper.keyboard.enabled) {
              return;
            }
            $(doc).off('keydown', swiper.keyboard.handle);
            swiper.keyboard.enabled = false;
          }
        };

        var Keyboard$1 = {
          name: 'keyboard',
          params: {
            keyboard: {
              enabled: false,
              onlyInViewport: true
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              keyboard: {
                enabled: false,
                enable: Keyboard.enable.bind(swiper),
                disable: Keyboard.disable.bind(swiper),
                handle: Keyboard.handle.bind(swiper)
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (swiper.params.keyboard.enabled) {
                swiper.keyboard.enable();
              }
            },
            destroy: function destroy() {
              var swiper = this;
              if (swiper.keyboard.enabled) {
                swiper.keyboard.disable();
              }
            }
          }
        };

        function isEventSupported() {
          var eventName = 'onwheel';
          var isSupported = eventName in doc;

          if (!isSupported) {
            var element = doc.createElement('div');
            element.setAttribute(eventName, 'return;');
            isSupported = typeof element[eventName] === 'function';
          }

          if (!isSupported && doc.implementation && doc.implementation.hasFeature &&
          // always returns true in newer browsers as per the standard.
          // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
          doc.implementation.hasFeature('', '') !== true) {
            // This is the only way to test support for the `wheel` event in IE9+.
            isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
          }

          return isSupported;
        }
        var Mousewheel = {
          lastScrollTime: Utils.now(),
          event: function getEvent() {
            if (win.navigator.userAgent.indexOf('firefox') > -1) {
              return 'DOMMouseScroll';
            }
            return isEventSupported() ? 'wheel' : 'mousewheel';
          }(),
          normalize: function normalize(e) {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;

            var sX = 0;
            var sY = 0; // spinX, spinY
            var pX = 0;
            var pY = 0; // pixelX, pixelY

            // Legacy
            if ('detail' in e) {
              sY = e.detail;
            }
            if ('wheelDelta' in e) {
              sY = -e.wheelDelta / 120;
            }
            if ('wheelDeltaY' in e) {
              sY = -e.wheelDeltaY / 120;
            }
            if ('wheelDeltaX' in e) {
              sX = -e.wheelDeltaX / 120;
            }

            // side scrolling on FF with DOMMouseScroll
            if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
              sX = sY;
              sY = 0;
            }

            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;

            if ('deltaY' in e) {
              pY = e.deltaY;
            }
            if ('deltaX' in e) {
              pX = e.deltaX;
            }

            if ((pX || pY) && e.deltaMode) {
              if (e.deltaMode === 1) {
                // delta in LINE units
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
              } else {
                // delta in PAGE units
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
              }
            }

            // Fall-back if spin cannot be determined
            if (pX && !sX) {
              sX = pX < 1 ? -1 : 1;
            }
            if (pY && !sY) {
              sY = pY < 1 ? -1 : 1;
            }

            return {
              spinX: sX,
              spinY: sY,
              pixelX: pX,
              pixelY: pY
            };
          },
          handleMouseEnter: function handleMouseEnter() {
            var swiper = this;
            swiper.mouseEntered = true;
          },
          handleMouseLeave: function handleMouseLeave() {
            var swiper = this;
            swiper.mouseEntered = false;
          },
          handle: function handle(event) {
            var e = event;
            var swiper = this;
            var params = swiper.params.mousewheel;

            if (!swiper.mouseEntered && !params.releaseOnEdges) {
              return true;
            }

            if (e.originalEvent) {
              e = e.originalEvent;
            } // jquery fix
            var delta = 0;
            var rtlFactor = swiper.rtlTranslate ? -1 : 1;

            var data = Mousewheel.normalize(e);

            if (params.forceToAxis) {
              if (swiper.isHorizontal()) {
                if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) {
                  delta = data.pixelX * rtlFactor;
                } else {
                  return true;
                }
              } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) {
                delta = data.pixelY;
              } else {
                return true;
              }
            } else {
              delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
            }

            if (delta === 0) {
              return true;
            }

            if (params.invert) {
              delta = -delta;
            }

            if (!swiper.params.freeMode) {
              if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
                if (delta < 0) {
                  if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
                    swiper.slideNext();
                    swiper.emit('scroll', e);
                  } else if (params.releaseOnEdges) {
                    return true;
                  }
                } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
                  swiper.slidePrev();
                  swiper.emit('scroll', e);
                } else if (params.releaseOnEdges) {
                  return true;
                }
              }
              swiper.mousewheel.lastScrollTime = new win.Date().getTime();
            } else {
              // Freemode or scrollContainer:
              if (swiper.params.loop) {
                swiper.loopFix();
              }
              var position = swiper.getTranslate() + delta * params.sensitivity;
              var wasBeginning = swiper.isBeginning;
              var wasEnd = swiper.isEnd;

              if (position >= swiper.minTranslate()) {
                position = swiper.minTranslate();
              }
              if (position <= swiper.maxTranslate()) {
                position = swiper.maxTranslate();
              }

              swiper.setTransition(0);
              swiper.setTranslate(position);
              swiper.updateProgress();
              swiper.updateActiveIndex();
              swiper.updateSlidesClasses();

              if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
                swiper.updateSlidesClasses();
              }

              if (swiper.params.freeModeSticky) {
                clearTimeout(swiper.mousewheel.timeout);
                swiper.mousewheel.timeout = Utils.nextTick(function () {
                  swiper.slideToClosest();
                }, 300);
              }
              // Emit event
              swiper.emit('scroll', e);

              // Stop autoplay
              if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) {
                swiper.autoplay.stop();
              }
              // Return page scroll on edge positions
              if (position === swiper.minTranslate() || position === swiper.maxTranslate()) {
                return true;
              }
            }

            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
            return false;
          },
          enable: function enable() {
            var swiper = this;
            if (!Mousewheel.event) {
              return false;
            }
            if (swiper.mousewheel.enabled) {
              return false;
            }
            var target = swiper.$el;
            if (swiper.params.mousewheel.eventsTarged !== 'container') {
              target = $(swiper.params.mousewheel.eventsTarged);
            }
            target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
            target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
            target.on(Mousewheel.event, swiper.mousewheel.handle);
            swiper.mousewheel.enabled = true;
            return true;
          },
          disable: function disable() {
            var swiper = this;
            if (!Mousewheel.event) {
              return false;
            }
            if (!swiper.mousewheel.enabled) {
              return false;
            }
            var target = swiper.$el;
            if (swiper.params.mousewheel.eventsTarged !== 'container') {
              target = $(swiper.params.mousewheel.eventsTarged);
            }
            target.off(Mousewheel.event, swiper.mousewheel.handle);
            swiper.mousewheel.enabled = false;
            return true;
          }
        };

        var Mousewheel$1 = {
          name: 'mousewheel',
          params: {
            mousewheel: {
              enabled: false,
              releaseOnEdges: false,
              invert: false,
              forceToAxis: false,
              sensitivity: 1,
              eventsTarged: 'container'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              mousewheel: {
                enabled: false,
                enable: Mousewheel.enable.bind(swiper),
                disable: Mousewheel.disable.bind(swiper),
                handle: Mousewheel.handle.bind(swiper),
                handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
                handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
                lastScrollTime: Utils.now()
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (swiper.params.mousewheel.enabled) {
                swiper.mousewheel.enable();
              }
            },
            destroy: function destroy() {
              var swiper = this;
              if (swiper.mousewheel.enabled) {
                swiper.mousewheel.disable();
              }
            }
          }
        };

        var Navigation = {
          update: function update() {
            // Update Navigation Buttons
            var swiper = this;
            var params = swiper.params.navigation;

            if (swiper.params.loop) {
              return;
            }
            var ref = swiper.navigation;
            var $nextEl = ref.$nextEl;
            var $prevEl = ref.$prevEl;

            if ($prevEl && $prevEl.length > 0) {
              if (swiper.isBeginning) {
                $prevEl.addClass(params.disabledClass);
              } else {
                $prevEl.removeClass(params.disabledClass);
              }
              $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
            }
            if ($nextEl && $nextEl.length > 0) {
              if (swiper.isEnd) {
                $nextEl.addClass(params.disabledClass);
              } else {
                $nextEl.removeClass(params.disabledClass);
              }
              $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
            }
          },
          init: function init() {
            var swiper = this;
            var params = swiper.params.navigation;
            if (!(params.nextEl || params.prevEl)) {
              return;
            }

            var $nextEl;
            var $prevEl;
            if (params.nextEl) {
              $nextEl = $(params.nextEl);
              if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && swiper.$el.find(params.nextEl).length === 1) {
                $nextEl = swiper.$el.find(params.nextEl);
              }
            }
            if (params.prevEl) {
              $prevEl = $(params.prevEl);
              if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && swiper.$el.find(params.prevEl).length === 1) {
                $prevEl = swiper.$el.find(params.prevEl);
              }
            }

            if ($nextEl && $nextEl.length > 0) {
              $nextEl.on('click', function (e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop) {
                  return;
                }
                swiper.slideNext();
              });
            }
            if ($prevEl && $prevEl.length > 0) {
              $prevEl.on('click', function (e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop) {
                  return;
                }
                swiper.slidePrev();
              });
            }

            Utils.extend(swiper.navigation, {
              $nextEl: $nextEl,
              nextEl: $nextEl && $nextEl[0],
              $prevEl: $prevEl,
              prevEl: $prevEl && $prevEl[0]
            });
          },
          destroy: function destroy() {
            var swiper = this;
            var ref = swiper.navigation;
            var $nextEl = ref.$nextEl;
            var $prevEl = ref.$prevEl;
            if ($nextEl && $nextEl.length) {
              $nextEl.off('click');
              $nextEl.removeClass(swiper.params.navigation.disabledClass);
            }
            if ($prevEl && $prevEl.length) {
              $prevEl.off('click');
              $prevEl.removeClass(swiper.params.navigation.disabledClass);
            }
          }
        };

        var Navigation$1 = {
          name: 'navigation',
          params: {
            navigation: {
              nextEl: null,
              prevEl: null,

              hideOnClick: false,
              disabledClass: 'swiper-button-disabled',
              hiddenClass: 'swiper-button-hidden',
              lockClass: 'swiper-button-lock'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              navigation: {
                init: Navigation.init.bind(swiper),
                update: Navigation.update.bind(swiper),
                destroy: Navigation.destroy.bind(swiper)
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              swiper.navigation.init();
              swiper.navigation.update();
            },
            toEdge: function toEdge() {
              var swiper = this;
              swiper.navigation.update();
            },
            fromEdge: function fromEdge() {
              var swiper = this;
              swiper.navigation.update();
            },
            destroy: function destroy() {
              var swiper = this;
              swiper.navigation.destroy();
            },
            click: function click(e) {
              var swiper = this;
              var ref = swiper.navigation;
              var $nextEl = ref.$nextEl;
              var $prevEl = ref.$prevEl;
              if (swiper.params.navigation.hideOnClick && !$(e.target).is($prevEl) && !$(e.target).is($nextEl)) {
                if ($nextEl) {
                  $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
                if ($prevEl) {
                  $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
              }
            }
          }
        };

        var Pagination = {
          update: function update() {
            // Render || Update Pagination bullets/items
            var swiper = this;
            var rtl = swiper.rtl;
            var params = swiper.params.pagination;
            if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
              return;
            }
            var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            var $el = swiper.pagination.$el;
            // Current/Total
            var current;
            var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
              current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
              if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
                current -= slidesLength - swiper.loopedSlides * 2;
              }
              if (current > total - 1) {
                current -= total;
              }
              if (current < 0 && swiper.params.paginationType !== 'bullets') {
                current = total + current;
              }
            } else if (typeof swiper.snapIndex !== 'undefined') {
              current = swiper.snapIndex;
            } else {
              current = swiper.activeIndex || 0;
            }
            // Types
            if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
              var bullets = swiper.pagination.bullets;
              var firstIndex;
              var lastIndex;
              var midIndex;
              if (params.dynamicBullets) {
                swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
                $el.css(swiper.isHorizontal() ? 'width' : 'height', swiper.pagination.bulletSize * (params.dynamicMainBullets + 4) + "px");
                if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
                  swiper.pagination.dynamicBulletIndex += current - swiper.previousIndex;
                  if (swiper.pagination.dynamicBulletIndex > params.dynamicMainBullets - 1) {
                    swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
                  } else if (swiper.pagination.dynamicBulletIndex < 0) {
                    swiper.pagination.dynamicBulletIndex = 0;
                  }
                }
                firstIndex = current - swiper.pagination.dynamicBulletIndex;
                lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                midIndex = (lastIndex + firstIndex) / 2;
              }
              bullets.removeClass(params.bulletActiveClass + " " + params.bulletActiveClass + "-next " + params.bulletActiveClass + "-next-next " + params.bulletActiveClass + "-prev " + params.bulletActiveClass + "-prev-prev " + params.bulletActiveClass + "-main");
              if ($el.length > 1) {
                bullets.each(function (index, bullet) {
                  var $bullet = $(bullet);
                  var bulletIndex = $bullet.index();
                  if (bulletIndex === current) {
                    $bullet.addClass(params.bulletActiveClass);
                  }
                  if (params.dynamicBullets) {
                    if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                      $bullet.addClass(params.bulletActiveClass + "-main");
                    }
                    if (bulletIndex === firstIndex) {
                      $bullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
                    }
                    if (bulletIndex === lastIndex) {
                      $bullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
                    }
                  }
                });
              } else {
                var $bullet = bullets.eq(current);
                $bullet.addClass(params.bulletActiveClass);
                if (params.dynamicBullets) {
                  var $firstDisplayedBullet = bullets.eq(firstIndex);
                  var $lastDisplayedBullet = bullets.eq(lastIndex);
                  for (var i = firstIndex; i <= lastIndex; i += 1) {
                    bullets.eq(i).addClass(params.bulletActiveClass + "-main");
                  }
                  $firstDisplayedBullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
                  $lastDisplayedBullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
                }
              }
              if (params.dynamicBullets) {
                var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                var bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - midIndex * swiper.pagination.bulletSize;
                var offsetProp = rtl ? 'right' : 'left';
                bullets.css(swiper.isHorizontal() ? offsetProp : 'top', bulletsOffset + "px");
              }
            }
            if (params.type === 'fraction') {
              $el.find("." + params.currentClass).text(params.formatFractionCurrent(current + 1));
              $el.find("." + params.totalClass).text(params.formatFractionTotal(total));
            }
            if (params.type === 'progressbar') {
              var progressbarDirection;
              if (params.progressbarOpposite) {
                progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
              } else {
                progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
              }
              var scale = (current + 1) / total;
              var scaleX = 1;
              var scaleY = 1;
              if (progressbarDirection === 'horizontal') {
                scaleX = scale;
              } else {
                scaleY = scale;
              }
              $el.find("." + params.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(swiper.params.speed);
            }
            if (params.type === 'custom' && params.renderCustom) {
              $el.html(params.renderCustom(swiper, current + 1, total));
              swiper.emit('paginationRender', swiper, $el[0]);
            } else {
              swiper.emit('paginationUpdate', swiper, $el[0]);
            }
            $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
          },
          render: function render() {
            // Render Container
            var swiper = this;
            var params = swiper.params.pagination;
            if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
              return;
            }
            var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

            var $el = swiper.pagination.$el;
            var paginationHTML = '';
            if (params.type === 'bullets') {
              var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
              for (var i = 0; i < numberOfBullets; i += 1) {
                if (params.renderBullet) {
                  paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
                } else {
                  paginationHTML += "<" + params.bulletElement + " class=\"" + params.bulletClass + "\"></" + params.bulletElement + ">";
                }
              }
              $el.html(paginationHTML);
              swiper.pagination.bullets = $el.find("." + params.bulletClass);
            }
            if (params.type === 'fraction') {
              if (params.renderFraction) {
                paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
              } else {
                paginationHTML = "<span class=\"" + params.currentClass + "\"></span>" + ' / ' + "<span class=\"" + params.totalClass + "\"></span>";
              }
              $el.html(paginationHTML);
            }
            if (params.type === 'progressbar') {
              if (params.renderProgressbar) {
                paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
              } else {
                paginationHTML = "<span class=\"" + params.progressbarFillClass + "\"></span>";
              }
              $el.html(paginationHTML);
            }
            if (params.type !== 'custom') {
              swiper.emit('paginationRender', swiper.pagination.$el[0]);
            }
          },
          init: function init() {
            var swiper = this;
            var params = swiper.params.pagination;
            if (!params.el) {
              return;
            }

            var $el = $(params.el);
            if ($el.length === 0) {
              return;
            }

            if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && swiper.$el.find(params.el).length === 1) {
              $el = swiper.$el.find(params.el);
            }

            if (params.type === 'bullets' && params.clickable) {
              $el.addClass(params.clickableClass);
            }

            $el.addClass(params.modifierClass + params.type);

            if (params.type === 'bullets' && params.dynamicBullets) {
              $el.addClass("" + params.modifierClass + params.type + "-dynamic");
              swiper.pagination.dynamicBulletIndex = 0;
              if (params.dynamicMainBullets < 1) {
                params.dynamicMainBullets = 1;
              }
            }
            if (params.type === 'progressbar' && params.progressbarOpposite) {
              $el.addClass(params.progressbarOppositeClass);
            }

            if (params.clickable) {
              $el.on('click', "." + params.bulletClass, function onClick(e) {
                e.preventDefault();
                var index = $(this).index() * swiper.params.slidesPerGroup;
                if (swiper.params.loop) {
                  index += swiper.loopedSlides;
                }
                swiper.slideTo(index);
              });
            }

            Utils.extend(swiper.pagination, {
              $el: $el,
              el: $el[0]
            });
          },
          destroy: function destroy() {
            var swiper = this;
            var params = swiper.params.pagination;
            if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
              return;
            }
            var $el = swiper.pagination.$el;

            $el.removeClass(params.hiddenClass);
            $el.removeClass(params.modifierClass + params.type);
            if (swiper.pagination.bullets) {
              swiper.pagination.bullets.removeClass(params.bulletActiveClass);
            }
            if (params.clickable) {
              $el.off('click', "." + params.bulletClass);
            }
          }
        };

        var Pagination$1 = {
          name: 'pagination',
          params: {
            pagination: {
              el: null,
              bulletElement: 'span',
              clickable: false,
              hideOnClick: false,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: false,
              type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
              dynamicBullets: false,
              dynamicMainBullets: 1,
              formatFractionCurrent: function formatFractionCurrent(number) {
                return number;
              },
              formatFractionTotal: function formatFractionTotal(number) {
                return number;
              },
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
              modifierClass: 'swiper-pagination-', // NEW
              currentClass: 'swiper-pagination-current',
              totalClass: 'swiper-pagination-total',
              hiddenClass: 'swiper-pagination-hidden',
              progressbarFillClass: 'swiper-pagination-progressbar-fill',
              progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
              clickableClass: 'swiper-pagination-clickable', // NEW
              lockClass: 'swiper-pagination-lock'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              pagination: {
                init: Pagination.init.bind(swiper),
                render: Pagination.render.bind(swiper),
                update: Pagination.update.bind(swiper),
                destroy: Pagination.destroy.bind(swiper),
                dynamicBulletIndex: 0
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              swiper.pagination.init();
              swiper.pagination.render();
              swiper.pagination.update();
            },
            activeIndexChange: function activeIndexChange() {
              var swiper = this;
              if (swiper.params.loop) {
                swiper.pagination.update();
              } else if (typeof swiper.snapIndex === 'undefined') {
                swiper.pagination.update();
              }
            },
            snapIndexChange: function snapIndexChange() {
              var swiper = this;
              if (!swiper.params.loop) {
                swiper.pagination.update();
              }
            },
            slidesLengthChange: function slidesLengthChange() {
              var swiper = this;
              if (swiper.params.loop) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            },
            snapGridLengthChange: function snapGridLengthChange() {
              var swiper = this;
              if (!swiper.params.loop) {
                swiper.pagination.render();
                swiper.pagination.update();
              }
            },
            destroy: function destroy() {
              var swiper = this;
              swiper.pagination.destroy();
            },
            click: function click(e) {
              var swiper = this;
              if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !$(e.target).hasClass(swiper.params.pagination.bulletClass)) {
                swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
              }
            }
          }
        };

        var Scrollbar = {
          setTranslate: function setTranslate() {
            var swiper = this;
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
              return;
            }
            var scrollbar = swiper.scrollbar;
            var rtl = swiper.rtlTranslate;
            var progress = swiper.progress;
            var dragSize = scrollbar.dragSize;
            var trackSize = scrollbar.trackSize;
            var $dragEl = scrollbar.$dragEl;
            var $el = scrollbar.$el;
            var params = swiper.params.scrollbar;

            var newSize = dragSize;
            var newPos = (trackSize - dragSize) * progress;
            if (rtl) {
              newPos = -newPos;
              if (newPos > 0) {
                newSize = dragSize - newPos;
                newPos = 0;
              } else if (-newPos + dragSize > trackSize) {
                newSize = trackSize + newPos;
              }
            } else if (newPos < 0) {
              newSize = dragSize + newPos;
              newPos = 0;
            } else if (newPos + dragSize > trackSize) {
              newSize = trackSize - newPos;
            }
            if (swiper.isHorizontal()) {
              if (Support.transforms3d) {
                $dragEl.transform("translate3d(" + newPos + "px, 0, 0)");
              } else {
                $dragEl.transform("translateX(" + newPos + "px)");
              }
              $dragEl[0].style.width = newSize + "px";
            } else {
              if (Support.transforms3d) {
                $dragEl.transform("translate3d(0px, " + newPos + "px, 0)");
              } else {
                $dragEl.transform("translateY(" + newPos + "px)");
              }
              $dragEl[0].style.height = newSize + "px";
            }
            if (params.hide) {
              clearTimeout(swiper.scrollbar.timeout);
              $el[0].style.opacity = 1;
              swiper.scrollbar.timeout = setTimeout(function () {
                $el[0].style.opacity = 0;
                $el.transition(400);
              }, 1000);
            }
          },
          setTransition: function setTransition(duration) {
            var swiper = this;
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
              return;
            }
            swiper.scrollbar.$dragEl.transition(duration);
          },
          updateSize: function updateSize() {
            var swiper = this;
            if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
              return;
            }

            var scrollbar = swiper.scrollbar;
            var $dragEl = scrollbar.$dragEl;
            var $el = scrollbar.$el;

            $dragEl[0].style.width = '';
            $dragEl[0].style.height = '';
            var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

            var divider = swiper.size / swiper.virtualSize;
            var moveDivider = divider * (trackSize / swiper.size);
            var dragSize;
            if (swiper.params.scrollbar.dragSize === 'auto') {
              dragSize = trackSize * divider;
            } else {
              dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
            }

            if (swiper.isHorizontal()) {
              $dragEl[0].style.width = dragSize + "px";
            } else {
              $dragEl[0].style.height = dragSize + "px";
            }

            if (divider >= 1) {
              $el[0].style.display = 'none';
            } else {
              $el[0].style.display = '';
            }
            if (swiper.params.scrollbarHide) {
              $el[0].style.opacity = 0;
            }
            Utils.extend(scrollbar, {
              trackSize: trackSize,
              divider: divider,
              moveDivider: moveDivider,
              dragSize: dragSize
            });
            scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
          },
          setDragPosition: function setDragPosition(e) {
            var swiper = this;
            var scrollbar = swiper.scrollbar;
            var rtl = swiper.rtlTranslate;
            var $el = scrollbar.$el;
            var dragSize = scrollbar.dragSize;
            var trackSize = scrollbar.trackSize;

            var pointerPosition;
            if (swiper.isHorizontal()) {
              pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX;
            } else {
              pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
            }
            var positionRatio;
            positionRatio = (pointerPosition - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - dragSize / 2) / (trackSize - dragSize);
            positionRatio = Math.max(Math.min(positionRatio, 1), 0);
            if (rtl) {
              positionRatio = 1 - positionRatio;
            }

            var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;

            swiper.updateProgress(position);
            swiper.setTranslate(position);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
          },
          onDragStart: function onDragStart(e) {
            var swiper = this;
            var params = swiper.params.scrollbar;
            var scrollbar = swiper.scrollbar;
            var $wrapperEl = swiper.$wrapperEl;
            var $el = scrollbar.$el;
            var $dragEl = scrollbar.$dragEl;
            swiper.scrollbar.isTouched = true;
            e.preventDefault();
            e.stopPropagation();

            $wrapperEl.transition(100);
            $dragEl.transition(100);
            scrollbar.setDragPosition(e);

            clearTimeout(swiper.scrollbar.dragTimeout);

            $el.transition(0);
            if (params.hide) {
              $el.css('opacity', 1);
            }
            swiper.emit('scrollbarDragStart', e);
          },
          onDragMove: function onDragMove(e) {
            var swiper = this;
            var scrollbar = swiper.scrollbar;
            var $wrapperEl = swiper.$wrapperEl;
            var $el = scrollbar.$el;
            var $dragEl = scrollbar.$dragEl;

            if (!swiper.scrollbar.isTouched) {
              return;
            }
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
            scrollbar.setDragPosition(e);
            $wrapperEl.transition(0);
            $el.transition(0);
            $dragEl.transition(0);
            swiper.emit('scrollbarDragMove', e);
          },
          onDragEnd: function onDragEnd(e) {
            var swiper = this;

            var params = swiper.params.scrollbar;
            var scrollbar = swiper.scrollbar;
            var $el = scrollbar.$el;

            if (!swiper.scrollbar.isTouched) {
              return;
            }
            swiper.scrollbar.isTouched = false;
            if (params.hide) {
              clearTimeout(swiper.scrollbar.dragTimeout);
              swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
                $el.css('opacity', 0);
                $el.transition(400);
              }, 1000);
            }
            swiper.emit('scrollbarDragEnd', e);
            if (params.snapOnRelease) {
              swiper.slideToClosest();
            }
          },
          enableDraggable: function enableDraggable() {
            var swiper = this;
            if (!swiper.params.scrollbar.el) {
              return;
            }
            var scrollbar = swiper.scrollbar;
            var touchEvents = swiper.touchEvents;
            var touchEventsDesktop = swiper.touchEventsDesktop;
            var params = swiper.params;
            var $el = scrollbar.$el;
            var target = $el[0];
            var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
            var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
              target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
              doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
              doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
            } else {
              if (Support.touch) {
                target.addEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
                target.addEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
                target.addEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
              }
              if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
                target.addEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
                doc.addEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
                doc.addEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
              }
            }
          },
          disableDraggable: function disableDraggable() {
            var swiper = this;
            if (!swiper.params.scrollbar.el) {
              return;
            }
            var scrollbar = swiper.scrollbar;
            var touchEvents = swiper.touchEvents;
            var touchEventsDesktop = swiper.touchEventsDesktop;
            var params = swiper.params;
            var $el = scrollbar.$el;
            var target = $el[0];
            var activeListener = Support.passiveListener && params.passiveListener ? { passive: false, capture: false } : false;
            var passiveListener = Support.passiveListener && params.passiveListener ? { passive: true, capture: false } : false;
            if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
              target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
              doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
              doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
            } else {
              if (Support.touch) {
                target.removeEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
                target.removeEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
                target.removeEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
              }
              if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
                target.removeEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
                doc.removeEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
                doc.removeEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
              }
            }
          },
          init: function init() {
            var swiper = this;
            if (!swiper.params.scrollbar.el) {
              return;
            }
            var scrollbar = swiper.scrollbar;
            var $swiperEl = swiper.$el;
            var params = swiper.params.scrollbar;

            var $el = $(params.el);
            if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
              $el = $swiperEl.find(params.el);
            }

            var $dragEl = $el.find("." + swiper.params.scrollbar.dragClass);
            if ($dragEl.length === 0) {
              $dragEl = $("<div class=\"" + swiper.params.scrollbar.dragClass + "\"></div>");
              $el.append($dragEl);
            }

            Utils.extend(scrollbar, {
              $el: $el,
              el: $el[0],
              $dragEl: $dragEl,
              dragEl: $dragEl[0]
            });

            if (params.draggable) {
              scrollbar.enableDraggable();
            }
          },
          destroy: function destroy() {
            var swiper = this;
            swiper.scrollbar.disableDraggable();
          }
        };

        var Scrollbar$1 = {
          name: 'scrollbar',
          params: {
            scrollbar: {
              el: null,
              dragSize: 'auto',
              hide: false,
              draggable: false,
              snapOnRelease: true,
              lockClass: 'swiper-scrollbar-lock',
              dragClass: 'swiper-scrollbar-drag'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              scrollbar: {
                init: Scrollbar.init.bind(swiper),
                destroy: Scrollbar.destroy.bind(swiper),
                updateSize: Scrollbar.updateSize.bind(swiper),
                setTranslate: Scrollbar.setTranslate.bind(swiper),
                setTransition: Scrollbar.setTransition.bind(swiper),
                enableDraggable: Scrollbar.enableDraggable.bind(swiper),
                disableDraggable: Scrollbar.disableDraggable.bind(swiper),
                setDragPosition: Scrollbar.setDragPosition.bind(swiper),
                onDragStart: Scrollbar.onDragStart.bind(swiper),
                onDragMove: Scrollbar.onDragMove.bind(swiper),
                onDragEnd: Scrollbar.onDragEnd.bind(swiper),
                isTouched: false,
                timeout: null,
                dragTimeout: null
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              swiper.scrollbar.init();
              swiper.scrollbar.updateSize();
              swiper.scrollbar.setTranslate();
            },
            update: function update() {
              var swiper = this;
              swiper.scrollbar.updateSize();
            },
            resize: function resize() {
              var swiper = this;
              swiper.scrollbar.updateSize();
            },
            observerUpdate: function observerUpdate() {
              var swiper = this;
              swiper.scrollbar.updateSize();
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              swiper.scrollbar.setTranslate();
            },
            setTransition: function setTransition(duration) {
              var swiper = this;
              swiper.scrollbar.setTransition(duration);
            },
            destroy: function destroy() {
              var swiper = this;
              swiper.scrollbar.destroy();
            }
          }
        };

        var Parallax = {
          setTransform: function setTransform(el, progress) {
            var swiper = this;
            var rtl = swiper.rtl;

            var $el = $(el);
            var rtlFactor = rtl ? -1 : 1;

            var p = $el.attr('data-swiper-parallax') || '0';
            var x = $el.attr('data-swiper-parallax-x');
            var y = $el.attr('data-swiper-parallax-y');
            var scale = $el.attr('data-swiper-parallax-scale');
            var opacity = $el.attr('data-swiper-parallax-opacity');

            if (x || y) {
              x = x || '0';
              y = y || '0';
            } else if (swiper.isHorizontal()) {
              x = p;
              y = '0';
            } else {
              y = p;
              x = '0';
            }

            if (x.indexOf('%') >= 0) {
              x = parseInt(x, 10) * progress * rtlFactor + "%";
            } else {
              x = x * progress * rtlFactor + "px";
            }
            if (y.indexOf('%') >= 0) {
              y = parseInt(y, 10) * progress + "%";
            } else {
              y = y * progress + "px";
            }

            if (typeof opacity !== 'undefined' && opacity !== null) {
              var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
              $el[0].style.opacity = currentOpacity;
            }
            if (typeof scale === 'undefined' || scale === null) {
              $el.transform("translate3d(" + x + ", " + y + ", 0px)");
            } else {
              var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
              $el.transform("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")");
            }
          },
          setTranslate: function setTranslate() {
            var swiper = this;
            var $el = swiper.$el;
            var slides = swiper.slides;
            var progress = swiper.progress;
            var snapGrid = swiper.snapGrid;
            $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index, el) {
              swiper.parallax.setTransform(el, progress);
            });
            slides.each(function (slideIndex, slideEl) {
              var slideProgress = slideEl.progress;
              if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
                slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
              }
              slideProgress = Math.min(Math.max(slideProgress, -1), 1);
              $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index, el) {
                swiper.parallax.setTransform(el, slideProgress);
              });
            });
          },
          setTransition: function setTransition(duration) {
            if (duration === void 0) duration = this.params.speed;

            var swiper = this;
            var $el = swiper.$el;
            $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index, parallaxEl) {
              var $parallaxEl = $(parallaxEl);
              var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
              if (duration === 0) {
                parallaxDuration = 0;
              }
              $parallaxEl.transition(parallaxDuration);
            });
          }
        };

        var Parallax$1 = {
          name: 'parallax',
          params: {
            parallax: {
              enabled: false
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              parallax: {
                setTransform: Parallax.setTransform.bind(swiper),
                setTranslate: Parallax.setTranslate.bind(swiper),
                setTransition: Parallax.setTransition.bind(swiper)
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (!swiper.params.parallax.enabled) {
                return;
              }
              swiper.params.watchSlidesProgress = true;
            },
            init: function init() {
              var swiper = this;
              if (!swiper.params.parallax) {
                return;
              }
              swiper.parallax.setTranslate();
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              if (!swiper.params.parallax) {
                return;
              }
              swiper.parallax.setTranslate();
            },
            setTransition: function setTransition(duration) {
              var swiper = this;
              if (!swiper.params.parallax) {
                return;
              }
              swiper.parallax.setTransition(duration);
            }
          }
        };

        var Zoom = {
          // Calc Scale From Multi-touches
          getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
            if (e.targetTouches.length < 2) {
              return 1;
            }
            var x1 = e.targetTouches[0].pageX;
            var y1 = e.targetTouches[0].pageY;
            var x2 = e.targetTouches[1].pageX;
            var y2 = e.targetTouches[1].pageY;
            var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            return distance;
          },
          // Events
          onGestureStart: function onGestureStart(e) {
            var swiper = this;
            var params = swiper.params.zoom;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            zoom.fakeGestureTouched = false;
            zoom.fakeGestureMoved = false;
            if (!Support.gestures) {
              if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                return;
              }
              zoom.fakeGestureTouched = true;
              gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
            }
            if (!gesture.$slideEl || !gesture.$slideEl.length) {
              gesture.$slideEl = $(e.target).closest('.swiper-slide');
              if (gesture.$slideEl.length === 0) {
                gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
              }
              gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
              gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
              gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
              if (gesture.$imageWrapEl.length === 0) {
                gesture.$imageEl = undefined;
                return;
              }
            }
            gesture.$imageEl.transition(0);
            swiper.zoom.isScaling = true;
          },
          onGestureChange: function onGestureChange(e) {
            var swiper = this;
            var params = swiper.params.zoom;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            if (!Support.gestures) {
              if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                return;
              }
              zoom.fakeGestureMoved = true;
              gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }
            if (Support.gestures) {
              swiper.zoom.scale = e.scale * zoom.currentScale;
            } else {
              zoom.scale = gesture.scaleMove / gesture.scaleStart * zoom.currentScale;
            }
            if (zoom.scale > gesture.maxRatio) {
              zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
            }
            if (zoom.scale < params.minRatio) {
              zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
            }
            gesture.$imageEl.transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
          },
          onGestureEnd: function onGestureEnd(e) {
            var swiper = this;
            var params = swiper.params.zoom;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            if (!Support.gestures) {
              if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
                return;
              }
              if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android) {
                return;
              }
              zoom.fakeGestureTouched = false;
              zoom.fakeGestureMoved = false;
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }
            zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
            gesture.$imageEl.transition(swiper.params.speed).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
            zoom.currentScale = zoom.scale;
            zoom.isScaling = false;
            if (zoom.scale === 1) {
              gesture.$slideEl = undefined;
            }
          },
          onTouchStart: function onTouchStart(e) {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }
            if (image.isTouched) {
              return;
            }
            if (Device.android) {
              e.preventDefault();
            }
            image.isTouched = true;
            image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
          },
          onTouchMove: function onTouchMove(e) {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;
            var velocity = zoom.velocity;
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }
            swiper.allowClick = false;
            if (!image.isTouched || !gesture.$slideEl) {
              return;
            }

            if (!image.isMoved) {
              image.width = gesture.$imageEl[0].offsetWidth;
              image.height = gesture.$imageEl[0].offsetHeight;
              image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
              image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
              gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
              gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
              gesture.$imageWrapEl.transition(0);
              if (swiper.rtl) {
                image.startX = -image.startX;
                image.startY = -image.startY;
              }
            }
            // Define if we need image drag
            var scaledWidth = image.width * zoom.scale;
            var scaledHeight = image.height * zoom.scale;

            if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) {
              return;
            }

            image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
            image.maxX = -image.minX;
            image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
            image.maxY = -image.minY;

            image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

            if (!image.isMoved && !zoom.isScaling) {
              if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
                image.isTouched = false;
                return;
              } else if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
                image.isTouched = false;
                return;
              }
            }
            e.preventDefault();
            e.stopPropagation();

            image.isMoved = true;
            image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
            image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

            if (image.currentX < image.minX) {
              image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
            }
            if (image.currentX > image.maxX) {
              image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
            }

            if (image.currentY < image.minY) {
              image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
            }
            if (image.currentY > image.maxY) {
              image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
            }

            // Velocity
            if (!velocity.prevPositionX) {
              velocity.prevPositionX = image.touchesCurrent.x;
            }
            if (!velocity.prevPositionY) {
              velocity.prevPositionY = image.touchesCurrent.y;
            }
            if (!velocity.prevTime) {
              velocity.prevTime = Date.now();
            }
            velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
            velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
            if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) {
              velocity.x = 0;
            }
            if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) {
              velocity.y = 0;
            }
            velocity.prevPositionX = image.touchesCurrent.x;
            velocity.prevPositionY = image.touchesCurrent.y;
            velocity.prevTime = Date.now();

            gesture.$imageWrapEl.transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
          },
          onTouchEnd: function onTouchEnd() {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;
            var velocity = zoom.velocity;
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }
            if (!image.isTouched || !image.isMoved) {
              image.isTouched = false;
              image.isMoved = false;
              return;
            }
            image.isTouched = false;
            image.isMoved = false;
            var momentumDurationX = 300;
            var momentumDurationY = 300;
            var momentumDistanceX = velocity.x * momentumDurationX;
            var newPositionX = image.currentX + momentumDistanceX;
            var momentumDistanceY = velocity.y * momentumDurationY;
            var newPositionY = image.currentY + momentumDistanceY;

            // Fix duration
            if (velocity.x !== 0) {
              momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
            }
            if (velocity.y !== 0) {
              momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
            }
            var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

            image.currentX = newPositionX;
            image.currentY = newPositionY;

            // Define if we need image drag
            var scaledWidth = image.width * zoom.scale;
            var scaledHeight = image.height * zoom.scale;
            image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
            image.maxX = -image.minX;
            image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
            image.maxY = -image.minY;
            image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
            image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

            gesture.$imageWrapEl.transition(momentumDuration).transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
          },
          onTransitionEnd: function onTransitionEnd() {
            var swiper = this;
            var zoom = swiper.zoom;
            var gesture = zoom.gesture;
            if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
              gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
              gesture.$imageWrapEl.transform('translate3d(0,0,0)');
              gesture.$slideEl = undefined;
              gesture.$imageEl = undefined;
              gesture.$imageWrapEl = undefined;

              zoom.scale = 1;
              zoom.currentScale = 1;
            }
          },
          // Toggle Zoom
          toggle: function toggle(e) {
            var swiper = this;
            var zoom = swiper.zoom;

            if (zoom.scale && zoom.scale !== 1) {
              // Zoom Out
              zoom.out();
            } else {
              // Zoom In
              zoom.in(e);
            }
          },
          in: function in$1(e) {
            var swiper = this;

            var zoom = swiper.zoom;
            var params = swiper.params.zoom;
            var gesture = zoom.gesture;
            var image = zoom.image;

            if (!gesture.$slideEl) {
              gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
              gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
              gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }

            gesture.$slideEl.addClass("" + params.zoomedSlideClass);

            var touchX;
            var touchY;
            var offsetX;
            var offsetY;
            var diffX;
            var diffY;
            var translateX;
            var translateY;
            var imageWidth;
            var imageHeight;
            var scaledWidth;
            var scaledHeight;
            var translateMinX;
            var translateMinY;
            var translateMaxX;
            var translateMaxY;
            var slideWidth;
            var slideHeight;

            if (typeof image.touchesStart.x === 'undefined' && e) {
              touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
              touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
            } else {
              touchX = image.touchesStart.x;
              touchY = image.touchesStart.y;
            }

            zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
            zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
            if (e) {
              slideWidth = gesture.$slideEl[0].offsetWidth;
              slideHeight = gesture.$slideEl[0].offsetHeight;
              offsetX = gesture.$slideEl.offset().left;
              offsetY = gesture.$slideEl.offset().top;
              diffX = offsetX + slideWidth / 2 - touchX;
              diffY = offsetY + slideHeight / 2 - touchY;

              imageWidth = gesture.$imageEl[0].offsetWidth;
              imageHeight = gesture.$imageEl[0].offsetHeight;
              scaledWidth = imageWidth * zoom.scale;
              scaledHeight = imageHeight * zoom.scale;

              translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
              translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
              translateMaxX = -translateMinX;
              translateMaxY = -translateMinY;

              translateX = diffX * zoom.scale;
              translateY = diffY * zoom.scale;

              if (translateX < translateMinX) {
                translateX = translateMinX;
              }
              if (translateX > translateMaxX) {
                translateX = translateMaxX;
              }

              if (translateY < translateMinY) {
                translateY = translateMinY;
              }
              if (translateY > translateMaxY) {
                translateY = translateMaxY;
              }
            } else {
              translateX = 0;
              translateY = 0;
            }
            gesture.$imageWrapEl.transition(300).transform("translate3d(" + translateX + "px, " + translateY + "px,0)");
            gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
          },
          out: function out() {
            var swiper = this;

            var zoom = swiper.zoom;
            var params = swiper.params.zoom;
            var gesture = zoom.gesture;

            if (!gesture.$slideEl) {
              gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
              gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
              gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
            }
            if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
              return;
            }

            zoom.scale = 1;
            zoom.currentScale = 1;
            gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
            gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
            gesture.$slideEl.removeClass("" + params.zoomedSlideClass);
            gesture.$slideEl = undefined;
          },
          // Attach/Detach Events
          enable: function enable() {
            var swiper = this;
            var zoom = swiper.zoom;
            if (zoom.enabled) {
              return;
            }
            zoom.enabled = true;

            var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

            // Scale image
            if (Support.gestures) {
              swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
              swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
              swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
            } else if (swiper.touchEvents.start === 'touchstart') {
              swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
              swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
              swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
            }

            // Move image
            swiper.$wrapperEl.on(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove);
          },
          disable: function disable() {
            var swiper = this;
            var zoom = swiper.zoom;
            if (!zoom.enabled) {
              return;
            }

            swiper.zoom.enabled = false;

            var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

            // Scale image
            if (Support.gestures) {
              swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
              swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
              swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
            } else if (swiper.touchEvents.start === 'touchstart') {
              swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
              swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
              swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
            }

            // Move image
            swiper.$wrapperEl.off(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove);
          }
        };

        var Zoom$1 = {
          name: 'zoom',
          params: {
            zoom: {
              enabled: false,
              maxRatio: 3,
              minRatio: 1,
              toggle: true,
              containerClass: 'swiper-zoom-container',
              zoomedSlideClass: 'swiper-slide-zoomed'
            }
          },
          create: function create() {
            var swiper = this;
            var zoom = {
              enabled: false,
              scale: 1,
              currentScale: 1,
              isScaling: false,
              gesture: {
                $slideEl: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                $imageEl: undefined,
                $imageWrapEl: undefined,
                maxRatio: 3
              },
              image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
              },
              velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
              }
            };
            'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ').forEach(function (methodName) {
              zoom[methodName] = Zoom[methodName].bind(swiper);
            });
            Utils.extend(swiper, {
              zoom: zoom
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (swiper.params.zoom.enabled) {
                swiper.zoom.enable();
              }
            },
            destroy: function destroy() {
              var swiper = this;
              swiper.zoom.disable();
            },
            touchStart: function touchStart(e) {
              var swiper = this;
              if (!swiper.zoom.enabled) {
                return;
              }
              swiper.zoom.onTouchStart(e);
            },
            touchEnd: function touchEnd(e) {
              var swiper = this;
              if (!swiper.zoom.enabled) {
                return;
              }
              swiper.zoom.onTouchEnd(e);
            },
            doubleTap: function doubleTap(e) {
              var swiper = this;
              if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
                swiper.zoom.toggle(e);
              }
            },
            transitionEnd: function transitionEnd() {
              var swiper = this;
              if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
                swiper.zoom.onTransitionEnd();
              }
            }
          }
        };

        var Lazy = {
          loadInSlide: function loadInSlide(index, loadInDuplicate) {
            if (loadInDuplicate === void 0) loadInDuplicate = true;

            var swiper = this;
            var params = swiper.params.lazy;
            if (typeof index === 'undefined') {
              return;
            }
            if (swiper.slides.length === 0) {
              return;
            }
            var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

            var $slideEl = isVirtual ? swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + index + "\"]") : swiper.slides.eq(index);

            var $images = $slideEl.find("." + params.elementClass + ":not(." + params.loadedClass + "):not(." + params.loadingClass + ")");
            if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
              $images = $images.add($slideEl[0]);
            }
            if ($images.length === 0) {
              return;
            }

            $images.each(function (imageIndex, imageEl) {
              var $imageEl = $(imageEl);
              $imageEl.addClass(params.loadingClass);

              var background = $imageEl.attr('data-background');
              var src = $imageEl.attr('data-src');
              var srcset = $imageEl.attr('data-srcset');
              var sizes = $imageEl.attr('data-sizes');

              swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, function () {
                if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) {
                  return;
                }
                if (background) {
                  $imageEl.css('background-image', "url(\"" + background + "\")");
                  $imageEl.removeAttr('data-background');
                } else {
                  if (srcset) {
                    $imageEl.attr('srcset', srcset);
                    $imageEl.removeAttr('data-srcset');
                  }
                  if (sizes) {
                    $imageEl.attr('sizes', sizes);
                    $imageEl.removeAttr('data-sizes');
                  }
                  if (src) {
                    $imageEl.attr('src', src);
                    $imageEl.removeAttr('data-src');
                  }
                }

                $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
                $slideEl.find("." + params.preloaderClass).remove();
                if (swiper.params.loop && loadInDuplicate) {
                  var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
                  if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
                    var originalSlide = swiper.$wrapperEl.children("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + swiper.params.slideDuplicateClass + ")");
                    swiper.lazy.loadInSlide(originalSlide.index(), false);
                  } else {
                    var duplicatedSlide = swiper.$wrapperEl.children("." + swiper.params.slideDuplicateClass + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]");
                    swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
                  }
                }
                swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
              });

              swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
            });
          },
          load: function load() {
            var swiper = this;
            var $wrapperEl = swiper.$wrapperEl;
            var swiperParams = swiper.params;
            var slides = swiper.slides;
            var activeIndex = swiper.activeIndex;
            var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
            var params = swiperParams.lazy;

            var slidesPerView = swiperParams.slidesPerView;
            if (slidesPerView === 'auto') {
              slidesPerView = 0;
            }

            function slideExist(index) {
              if (isVirtual) {
                if ($wrapperEl.children("." + swiperParams.slideClass + "[data-swiper-slide-index=\"" + index + "\"]").length) {
                  return true;
                }
              } else if (slides[index]) {
                return true;
              }
              return false;
            }
            function slideIndex(slideEl) {
              if (isVirtual) {
                return $(slideEl).attr('data-swiper-slide-index');
              }
              return $(slideEl).index();
            }

            if (!swiper.lazy.initialImageLoaded) {
              swiper.lazy.initialImageLoaded = true;
            }
            if (swiper.params.watchSlidesVisibility) {
              $wrapperEl.children("." + swiperParams.slideVisibleClass).each(function (elIndex, slideEl) {
                var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
                swiper.lazy.loadInSlide(index);
              });
            } else if (slidesPerView > 1) {
              for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
                if (slideExist(i)) {
                  swiper.lazy.loadInSlide(i);
                }
              }
            } else {
              swiper.lazy.loadInSlide(activeIndex);
            }
            if (params.loadPrevNext) {
              if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
                var amount = params.loadPrevNextAmount;
                var spv = slidesPerView;
                var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
                var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
                // Next Slides
                for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
                  if (slideExist(i$1)) {
                    swiper.lazy.loadInSlide(i$1);
                  }
                }
                // Prev Slides
                for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
                  if (slideExist(i$2)) {
                    swiper.lazy.loadInSlide(i$2);
                  }
                }
              } else {
                var nextSlide = $wrapperEl.children("." + swiperParams.slideNextClass);
                if (nextSlide.length > 0) {
                  swiper.lazy.loadInSlide(slideIndex(nextSlide));
                }

                var prevSlide = $wrapperEl.children("." + swiperParams.slidePrevClass);
                if (prevSlide.length > 0) {
                  swiper.lazy.loadInSlide(slideIndex(prevSlide));
                }
              }
            }
          }
        };

        var Lazy$1 = {
          name: 'lazy',
          params: {
            lazy: {
              enabled: false,
              loadPrevNext: false,
              loadPrevNextAmount: 1,
              loadOnTransitionStart: false,

              elementClass: 'swiper-lazy',
              loadingClass: 'swiper-lazy-loading',
              loadedClass: 'swiper-lazy-loaded',
              preloaderClass: 'swiper-lazy-preloader'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              lazy: {
                initialImageLoaded: false,
                load: Lazy.load.bind(swiper),
                loadInSlide: Lazy.loadInSlide.bind(swiper)
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
                swiper.params.preloadImages = false;
              }
            },
            init: function init() {
              var swiper = this;
              if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
                swiper.lazy.load();
              }
            },
            scroll: function scroll() {
              var swiper = this;
              if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
                swiper.lazy.load();
              }
            },
            resize: function resize() {
              var swiper = this;
              if (swiper.params.lazy.enabled) {
                swiper.lazy.load();
              }
            },
            scrollbarDragMove: function scrollbarDragMove() {
              var swiper = this;
              if (swiper.params.lazy.enabled) {
                swiper.lazy.load();
              }
            },
            transitionStart: function transitionStart() {
              var swiper = this;
              if (swiper.params.lazy.enabled) {
                if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded) {
                  swiper.lazy.load();
                }
              }
            },
            transitionEnd: function transitionEnd() {
              var swiper = this;
              if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
                swiper.lazy.load();
              }
            }
          }
        };

        /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

        var Controller = {
          LinearSpline: function LinearSpline(x, y) {
            var binarySearch = function search() {
              var maxIndex;
              var minIndex;
              var guess;
              return function (array, val) {
                minIndex = -1;
                maxIndex = array.length;
                while (maxIndex - minIndex > 1) {
                  guess = maxIndex + minIndex >> 1;
                  if (array[guess] <= val) {
                    minIndex = guess;
                  } else {
                    maxIndex = guess;
                  }
                }
                return maxIndex;
              };
            }();
            this.x = x;
            this.y = y;
            this.lastIndex = x.length - 1;
            // Given an x value (x2), return the expected y2 value:
            // (x1,y1) is the known point before given value,
            // (x3,y3) is the known point after given value.
            var i1;
            var i3;

            this.interpolate = function interpolate(x2) {
              if (!x2) {
                return 0;
              }

              // Get the indexes of x1 and x3 (the array indexes before and after given x2):
              i3 = binarySearch(this.x, x2);
              i1 = i3 - 1;

              // We have our indexes i1 & i3, so we can calculate already:
              // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
              return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
            };
            return this;
          },
          // xxx: for now i will just save one spline function to to
          getInterpolateFunction: function getInterpolateFunction(c) {
            var swiper = this;
            if (!swiper.controller.spline) {
              swiper.controller.spline = swiper.params.loop ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
            }
          },
          setTranslate: function setTranslate(setTranslate$1, byController) {
            var swiper = this;
            var controlled = swiper.controller.control;
            var multiplier;
            var controlledTranslate;
            function setControlledTranslate(c) {
              // this will create an Interpolate function based on the snapGrids
              // x is the Grid of the scrolled scroller and y will be the controlled scroller
              // it makes sense to create this only once and recall it for the interpolation
              // the function does a lot of value caching for performance
              var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
              if (swiper.params.controller.by === 'slide') {
                swiper.controller.getInterpolateFunction(c);
                // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                // but it did not work out
                controlledTranslate = -swiper.controller.spline.interpolate(-translate);
              }

              if (!controlledTranslate || swiper.params.controller.by === 'container') {
                multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
                controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
              }

              if (swiper.params.controller.inverse) {
                controlledTranslate = c.maxTranslate() - controlledTranslate;
              }
              c.updateProgress(controlledTranslate);
              c.setTranslate(controlledTranslate, swiper);
              c.updateActiveIndex();
              c.updateSlidesClasses();
            }
            if (Array.isArray(controlled)) {
              for (var i = 0; i < controlled.length; i += 1) {
                if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                  setControlledTranslate(controlled[i]);
                }
              }
            } else if (controlled instanceof Swiper && byController !== controlled) {
              setControlledTranslate(controlled);
            }
          },
          setTransition: function setTransition(duration, byController) {
            var swiper = this;
            var controlled = swiper.controller.control;
            var i;
            function setControlledTransition(c) {
              c.setTransition(duration, swiper);
              if (duration !== 0) {
                c.transitionStart();
                c.$wrapperEl.transitionEnd(function () {
                  if (!controlled) {
                    return;
                  }
                  if (c.params.loop && swiper.params.controller.by === 'slide') {
                    c.loopFix();
                  }
                  c.transitionEnd();
                });
              }
            }
            if (Array.isArray(controlled)) {
              for (i = 0; i < controlled.length; i += 1) {
                if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                  setControlledTransition(controlled[i]);
                }
              }
            } else if (controlled instanceof Swiper && byController !== controlled) {
              setControlledTransition(controlled);
            }
          }
        };
        var Controller$1 = {
          name: 'controller',
          params: {
            controller: {
              control: undefined,
              inverse: false,
              by: 'slide' // or 'container'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              controller: {
                control: swiper.params.controller.control,
                getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
                setTranslate: Controller.setTranslate.bind(swiper),
                setTransition: Controller.setTransition.bind(swiper)
              }
            });
          },
          on: {
            update: function update() {
              var swiper = this;
              if (!swiper.controller.control) {
                return;
              }
              if (swiper.controller.spline) {
                swiper.controller.spline = undefined;
                delete swiper.controller.spline;
              }
            },
            resize: function resize() {
              var swiper = this;
              if (!swiper.controller.control) {
                return;
              }
              if (swiper.controller.spline) {
                swiper.controller.spline = undefined;
                delete swiper.controller.spline;
              }
            },
            observerUpdate: function observerUpdate() {
              var swiper = this;
              if (!swiper.controller.control) {
                return;
              }
              if (swiper.controller.spline) {
                swiper.controller.spline = undefined;
                delete swiper.controller.spline;
              }
            },
            setTranslate: function setTranslate(translate, byController) {
              var swiper = this;
              if (!swiper.controller.control) {
                return;
              }
              swiper.controller.setTranslate(translate, byController);
            },
            setTransition: function setTransition(duration, byController) {
              var swiper = this;
              if (!swiper.controller.control) {
                return;
              }
              swiper.controller.setTransition(duration, byController);
            }
          }
        };

        var a11y = {
          makeElFocusable: function makeElFocusable($el) {
            $el.attr('tabIndex', '0');
            return $el;
          },
          addElRole: function addElRole($el, role) {
            $el.attr('role', role);
            return $el;
          },
          addElLabel: function addElLabel($el, label) {
            $el.attr('aria-label', label);
            return $el;
          },
          disableEl: function disableEl($el) {
            $el.attr('aria-disabled', true);
            return $el;
          },
          enableEl: function enableEl($el) {
            $el.attr('aria-disabled', false);
            return $el;
          },
          onEnterKey: function onEnterKey(e) {
            var swiper = this;
            var params = swiper.params.a11y;
            if (e.keyCode !== 13) {
              return;
            }
            var $targetEl = $(e.target);
            if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
              if (!(swiper.isEnd && !swiper.params.loop)) {
                swiper.slideNext();
              }
              if (swiper.isEnd) {
                swiper.a11y.notify(params.lastSlideMessage);
              } else {
                swiper.a11y.notify(params.nextSlideMessage);
              }
            }
            if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
              if (!(swiper.isBeginning && !swiper.params.loop)) {
                swiper.slidePrev();
              }
              if (swiper.isBeginning) {
                swiper.a11y.notify(params.firstSlideMessage);
              } else {
                swiper.a11y.notify(params.prevSlideMessage);
              }
            }
            if (swiper.pagination && $targetEl.is("." + swiper.params.pagination.bulletClass)) {
              $targetEl[0].click();
            }
          },
          notify: function notify(message) {
            var swiper = this;
            var notification = swiper.a11y.liveRegion;
            if (notification.length === 0) {
              return;
            }
            notification.html('');
            notification.html(message);
          },
          updateNavigation: function updateNavigation() {
            var swiper = this;

            if (swiper.params.loop) {
              return;
            }
            var ref = swiper.navigation;
            var $nextEl = ref.$nextEl;
            var $prevEl = ref.$prevEl;

            if ($prevEl && $prevEl.length > 0) {
              if (swiper.isBeginning) {
                swiper.a11y.disableEl($prevEl);
              } else {
                swiper.a11y.enableEl($prevEl);
              }
            }
            if ($nextEl && $nextEl.length > 0) {
              if (swiper.isEnd) {
                swiper.a11y.disableEl($nextEl);
              } else {
                swiper.a11y.enableEl($nextEl);
              }
            }
          },
          updatePagination: function updatePagination() {
            var swiper = this;
            var params = swiper.params.a11y;
            if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
              swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
                var $bulletEl = $(bulletEl);
                swiper.a11y.makeElFocusable($bulletEl);
                swiper.a11y.addElRole($bulletEl, 'button');
                swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
              });
            }
          },
          init: function init() {
            var swiper = this;

            swiper.$el.append(swiper.a11y.liveRegion);

            // Navigation
            var params = swiper.params.a11y;
            var $nextEl;
            var $prevEl;
            if (swiper.navigation && swiper.navigation.$nextEl) {
              $nextEl = swiper.navigation.$nextEl;
            }
            if (swiper.navigation && swiper.navigation.$prevEl) {
              $prevEl = swiper.navigation.$prevEl;
            }
            if ($nextEl) {
              swiper.a11y.makeElFocusable($nextEl);
              swiper.a11y.addElRole($nextEl, 'button');
              swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
              $nextEl.on('keydown', swiper.a11y.onEnterKey);
            }
            if ($prevEl) {
              swiper.a11y.makeElFocusable($prevEl);
              swiper.a11y.addElRole($prevEl, 'button');
              swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
              $prevEl.on('keydown', swiper.a11y.onEnterKey);
            }

            // Pagination
            if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
              swiper.pagination.$el.on('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
            }
          },
          destroy: function destroy() {
            var swiper = this;
            if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) {
              swiper.a11y.liveRegion.remove();
            }

            var $nextEl;
            var $prevEl;
            if (swiper.navigation && swiper.navigation.$nextEl) {
              $nextEl = swiper.navigation.$nextEl;
            }
            if (swiper.navigation && swiper.navigation.$prevEl) {
              $prevEl = swiper.navigation.$prevEl;
            }
            if ($nextEl) {
              $nextEl.off('keydown', swiper.a11y.onEnterKey);
            }
            if ($prevEl) {
              $prevEl.off('keydown', swiper.a11y.onEnterKey);
            }

            // Pagination
            if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
              swiper.pagination.$el.off('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
            }
          }
        };
        var A11y = {
          name: 'a11y',
          params: {
            a11y: {
              enabled: true,
              notificationClass: 'swiper-notification',
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              firstSlideMessage: 'This is the first slide',
              lastSlideMessage: 'This is the last slide',
              paginationBulletMessage: 'Go to slide {{index}}'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              a11y: {
                liveRegion: $("<span class=\"" + swiper.params.a11y.notificationClass + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")
              }
            });
            (0, _keys2.default)(a11y).forEach(function (methodName) {
              swiper.a11y[methodName] = a11y[methodName].bind(swiper);
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (!swiper.params.a11y.enabled) {
                return;
              }
              swiper.a11y.init();
              swiper.a11y.updateNavigation();
            },
            toEdge: function toEdge() {
              var swiper = this;
              if (!swiper.params.a11y.enabled) {
                return;
              }
              swiper.a11y.updateNavigation();
            },
            fromEdge: function fromEdge() {
              var swiper = this;
              if (!swiper.params.a11y.enabled) {
                return;
              }
              swiper.a11y.updateNavigation();
            },
            paginationUpdate: function paginationUpdate() {
              var swiper = this;
              if (!swiper.params.a11y.enabled) {
                return;
              }
              swiper.a11y.updatePagination();
            },
            destroy: function destroy() {
              var swiper = this;
              if (!swiper.params.a11y.enabled) {
                return;
              }
              swiper.a11y.destroy();
            }
          }
        };

        var History = {
          init: function init() {
            var swiper = this;
            if (!swiper.params.history) {
              return;
            }
            if (!win.history || !win.history.pushState) {
              swiper.params.history.enabled = false;
              swiper.params.hashNavigation.enabled = true;
              return;
            }
            var history = swiper.history;
            history.initialized = true;
            history.paths = History.getPathValues();
            if (!history.paths.key && !history.paths.value) {
              return;
            }
            history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
            if (!swiper.params.history.replaceState) {
              win.addEventListener('popstate', swiper.history.setHistoryPopState);
            }
          },
          destroy: function destroy() {
            var swiper = this;
            if (!swiper.params.history.replaceState) {
              win.removeEventListener('popstate', swiper.history.setHistoryPopState);
            }
          },
          setHistoryPopState: function setHistoryPopState() {
            var swiper = this;
            swiper.history.paths = History.getPathValues();
            swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
          },
          getPathValues: function getPathValues() {
            var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) {
              return part !== '';
            });
            var total = pathArray.length;
            var key = pathArray[total - 2];
            var value = pathArray[total - 1];
            return { key: key, value: value };
          },
          setHistory: function setHistory(key, index) {
            var swiper = this;
            if (!swiper.history.initialized || !swiper.params.history.enabled) {
              return;
            }
            var slide = swiper.slides.eq(index);
            var value = History.slugify(slide.attr('data-history'));
            if (!win.location.pathname.includes(key)) {
              value = key + "/" + value;
            }
            var currentState = win.history.state;
            if (currentState && currentState.value === value) {
              return;
            }
            if (swiper.params.history.replaceState) {
              win.history.replaceState({ value: value }, null, value);
            } else {
              win.history.pushState({ value: value }, null, value);
            }
          },
          slugify: function slugify(text) {
            return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
          },
          scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
            var swiper = this;
            if (value) {
              for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
                var slide = swiper.slides.eq(i);
                var slideHistory = History.slugify(slide.attr('data-history'));
                if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
                  var index = slide.index();
                  swiper.slideTo(index, speed, runCallbacks);
                }
              }
            } else {
              swiper.slideTo(0, speed, runCallbacks);
            }
          }
        };

        var History$1 = {
          name: 'history',
          params: {
            history: {
              enabled: false,
              replaceState: false,
              key: 'slides'
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              history: {
                init: History.init.bind(swiper),
                setHistory: History.setHistory.bind(swiper),
                setHistoryPopState: History.setHistoryPopState.bind(swiper),
                scrollToSlide: History.scrollToSlide.bind(swiper),
                destroy: History.destroy.bind(swiper)
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (swiper.params.history.enabled) {
                swiper.history.init();
              }
            },
            destroy: function destroy() {
              var swiper = this;
              if (swiper.params.history.enabled) {
                swiper.history.destroy();
              }
            },
            transitionEnd: function transitionEnd() {
              var swiper = this;
              if (swiper.history.initialized) {
                swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
              }
            }
          }
        };

        var HashNavigation = {
          onHashCange: function onHashCange() {
            var swiper = this;
            var newHash = doc.location.hash.replace('#', '');
            var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
            if (newHash !== activeSlideHash) {
              swiper.slideTo(swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-hash=\"" + newHash + "\"]").index());
            }
          },
          setHash: function setHash() {
            var swiper = this;
            if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) {
              return;
            }
            if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
              win.history.replaceState(null, null, "#" + swiper.slides.eq(swiper.activeIndex).attr('data-hash') || '');
            } else {
              var slide = swiper.slides.eq(swiper.activeIndex);
              var hash = slide.attr('data-hash') || slide.attr('data-history');
              doc.location.hash = hash || '';
            }
          },
          init: function init() {
            var swiper = this;
            if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) {
              return;
            }
            swiper.hashNavigation.initialized = true;
            var hash = doc.location.hash.replace('#', '');
            if (hash) {
              var speed = 0;
              for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
                var slide = swiper.slides.eq(i);
                var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
                  var index = slide.index();
                  swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
                }
              }
            }
            if (swiper.params.hashNavigation.watchState) {
              $(win).on('hashchange', swiper.hashNavigation.onHashCange);
            }
          },
          destroy: function destroy() {
            var swiper = this;
            if (swiper.params.hashNavigation.watchState) {
              $(win).off('hashchange', swiper.hashNavigation.onHashCange);
            }
          }
        };
        var HashNavigation$1 = {
          name: 'hash-navigation',
          params: {
            hashNavigation: {
              enabled: false,
              replaceState: false,
              watchState: false
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              hashNavigation: {
                initialized: false,
                init: HashNavigation.init.bind(swiper),
                destroy: HashNavigation.destroy.bind(swiper),
                setHash: HashNavigation.setHash.bind(swiper),
                onHashCange: HashNavigation.onHashCange.bind(swiper)
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (swiper.params.hashNavigation.enabled) {
                swiper.hashNavigation.init();
              }
            },
            destroy: function destroy() {
              var swiper = this;
              if (swiper.params.hashNavigation.enabled) {
                swiper.hashNavigation.destroy();
              }
            },
            transitionEnd: function transitionEnd() {
              var swiper = this;
              if (swiper.hashNavigation.initialized) {
                swiper.hashNavigation.setHash();
              }
            }
          }
        };

        /* eslint no-underscore-dangle: "off" */

        var Autoplay = {
          run: function run() {
            var swiper = this;
            var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
            var delay = swiper.params.autoplay.delay;
            if ($activeSlideEl.attr('data-swiper-autoplay')) {
              delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
            }
            swiper.autoplay.timeout = Utils.nextTick(function () {
              if (swiper.params.autoplay.reverseDirection) {
                if (swiper.params.loop) {
                  swiper.loopFix();
                  swiper.slidePrev(swiper.params.speed, true, true);
                  swiper.emit('autoplay');
                } else if (!swiper.isBeginning) {
                  swiper.slidePrev(swiper.params.speed, true, true);
                  swiper.emit('autoplay');
                } else if (!swiper.params.autoplay.stopOnLastSlide) {
                  swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                  swiper.emit('autoplay');
                } else {
                  swiper.autoplay.stop();
                }
              } else if (swiper.params.loop) {
                swiper.loopFix();
                swiper.slideNext(swiper.params.speed, true, true);
                swiper.emit('autoplay');
              } else if (!swiper.isEnd) {
                swiper.slideNext(swiper.params.speed, true, true);
                swiper.emit('autoplay');
              } else if (!swiper.params.autoplay.stopOnLastSlide) {
                swiper.slideTo(0, swiper.params.speed, true, true);
                swiper.emit('autoplay');
              } else {
                swiper.autoplay.stop();
              }
            }, delay);
          },
          start: function start() {
            var swiper = this;
            if (typeof swiper.autoplay.timeout !== 'undefined') {
              return false;
            }
            if (swiper.autoplay.running) {
              return false;
            }
            swiper.autoplay.running = true;
            swiper.emit('autoplayStart');
            swiper.autoplay.run();
            return true;
          },
          stop: function stop() {
            var swiper = this;
            if (!swiper.autoplay.running) {
              return false;
            }
            if (typeof swiper.autoplay.timeout === 'undefined') {
              return false;
            }

            if (swiper.autoplay.timeout) {
              clearTimeout(swiper.autoplay.timeout);
              swiper.autoplay.timeout = undefined;
            }
            swiper.autoplay.running = false;
            swiper.emit('autoplayStop');
            return true;
          },
          pause: function pause(speed) {
            var swiper = this;
            if (!swiper.autoplay.running) {
              return;
            }
            if (swiper.autoplay.paused) {
              return;
            }
            if (swiper.autoplay.timeout) {
              clearTimeout(swiper.autoplay.timeout);
            }
            swiper.autoplay.paused = true;
            if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
              swiper.autoplay.paused = false;
              swiper.autoplay.run();
            } else {
              swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
              swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            }
          }
        };

        var Autoplay$1 = {
          name: 'autoplay',
          params: {
            autoplay: {
              enabled: false,
              delay: 3000,
              waitForTransition: true,
              disableOnInteraction: true,
              stopOnLastSlide: false,
              reverseDirection: false
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              autoplay: {
                running: false,
                paused: false,
                run: Autoplay.run.bind(swiper),
                start: Autoplay.start.bind(swiper),
                stop: Autoplay.stop.bind(swiper),
                pause: Autoplay.pause.bind(swiper),
                onTransitionEnd: function onTransitionEnd(e) {
                  if (!swiper || swiper.destroyed || !swiper.$wrapperEl) {
                    return;
                  }
                  if (e.target !== this) {
                    return;
                  }
                  swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
                  swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
                  swiper.autoplay.paused = false;
                  if (!swiper.autoplay.running) {
                    swiper.autoplay.stop();
                  } else {
                    swiper.autoplay.run();
                  }
                }
              }
            });
          },
          on: {
            init: function init() {
              var swiper = this;
              if (swiper.params.autoplay.enabled) {
                swiper.autoplay.start();
              }
            },
            beforeTransitionStart: function beforeTransitionStart(speed, internal) {
              var swiper = this;
              if (swiper.autoplay.running) {
                if (internal || !swiper.params.autoplay.disableOnInteraction) {
                  swiper.autoplay.pause(speed);
                } else {
                  swiper.autoplay.stop();
                }
              }
            },
            sliderFirstMove: function sliderFirstMove() {
              var swiper = this;
              if (swiper.autoplay.running) {
                if (swiper.params.autoplay.disableOnInteraction) {
                  swiper.autoplay.stop();
                } else {
                  swiper.autoplay.pause();
                }
              }
            },
            destroy: function destroy() {
              var swiper = this;
              if (swiper.autoplay.running) {
                swiper.autoplay.stop();
              }
            }
          }
        };

        var Fade = {
          setTranslate: function setTranslate() {
            var swiper = this;
            var slides = swiper.slides;
            for (var i = 0; i < slides.length; i += 1) {
              var $slideEl = swiper.slides.eq(i);
              var offset = $slideEl[0].swiperSlideOffset;
              var tx = -offset;
              if (!swiper.params.virtualTranslate) {
                tx -= swiper.translate;
              }
              var ty = 0;
              if (!swiper.isHorizontal()) {
                ty = tx;
                tx = 0;
              }
              var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
              $slideEl.css({
                opacity: slideOpacity
              }).transform("translate3d(" + tx + "px, " + ty + "px, 0px)");
            }
          },
          setTransition: function setTransition(duration) {
            var swiper = this;
            var slides = swiper.slides;
            var $wrapperEl = swiper.$wrapperEl;
            slides.transition(duration);
            if (swiper.params.virtualTranslate && duration !== 0) {
              var eventTriggered = false;
              slides.transitionEnd(function () {
                if (eventTriggered) {
                  return;
                }
                if (!swiper || swiper.destroyed) {
                  return;
                }
                eventTriggered = true;
                swiper.animating = false;
                var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                for (var i = 0; i < triggerEvents.length; i += 1) {
                  $wrapperEl.trigger(triggerEvents[i]);
                }
              });
            }
          }
        };

        var EffectFade = {
          name: 'effect-fade',
          params: {
            fadeEffect: {
              crossFade: false
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              fadeEffect: {
                setTranslate: Fade.setTranslate.bind(swiper),
                setTransition: Fade.setTransition.bind(swiper)
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (swiper.params.effect !== 'fade') {
                return;
              }
              swiper.classNames.push(swiper.params.containerModifierClass + "fade");
              var overwriteParams = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: true
              };
              Utils.extend(swiper.params, overwriteParams);
              Utils.extend(swiper.originalParams, overwriteParams);
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              if (swiper.params.effect !== 'fade') {
                return;
              }
              swiper.fadeEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
              var swiper = this;
              if (swiper.params.effect !== 'fade') {
                return;
              }
              swiper.fadeEffect.setTransition(duration);
            }
          }
        };

        var Cube = {
          setTranslate: function setTranslate() {
            var swiper = this;
            var $el = swiper.$el;
            var $wrapperEl = swiper.$wrapperEl;
            var slides = swiper.slides;
            var swiperWidth = swiper.width;
            var swiperHeight = swiper.height;
            var rtl = swiper.rtlTranslate;
            var swiperSize = swiper.size;
            var params = swiper.params.cubeEffect;
            var isHorizontal = swiper.isHorizontal();
            var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            var wrapperRotate = 0;
            var $cubeShadowEl;
            if (params.shadow) {
              if (isHorizontal) {
                $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
                if ($cubeShadowEl.length === 0) {
                  $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
                  $wrapperEl.append($cubeShadowEl);
                }
                $cubeShadowEl.css({ height: swiperWidth + "px" });
              } else {
                $cubeShadowEl = $el.find('.swiper-cube-shadow');
                if ($cubeShadowEl.length === 0) {
                  $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
                  $el.append($cubeShadowEl);
                }
              }
            }
            for (var i = 0; i < slides.length; i += 1) {
              var $slideEl = slides.eq(i);
              var slideIndex = i;
              if (isVirtual) {
                slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
              }
              var slideAngle = slideIndex * 90;
              var round = Math.floor(slideAngle / 360);
              if (rtl) {
                slideAngle = -slideAngle;
                round = Math.floor(-slideAngle / 360);
              }
              var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
              var tx = 0;
              var ty = 0;
              var tz = 0;
              if (slideIndex % 4 === 0) {
                tx = -round * 4 * swiperSize;
                tz = 0;
              } else if ((slideIndex - 1) % 4 === 0) {
                tx = 0;
                tz = -round * 4 * swiperSize;
              } else if ((slideIndex - 2) % 4 === 0) {
                tx = swiperSize + round * 4 * swiperSize;
                tz = swiperSize;
              } else if ((slideIndex - 3) % 4 === 0) {
                tx = -swiperSize;
                tz = 3 * swiperSize + swiperSize * 4 * round;
              }
              if (rtl) {
                tx = -tx;
              }

              if (!isHorizontal) {
                ty = tx;
                tx = 0;
              }

              var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
              if (progress <= 1 && progress > -1) {
                wrapperRotate = slideIndex * 90 + progress * 90;
                if (rtl) {
                  wrapperRotate = -slideIndex * 90 - progress * 90;
                }
              }
              $slideEl.transform(transform);
              if (params.slideShadows) {
                // Set shadows
                var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                if (shadowBefore.length === 0) {
                  shadowBefore = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
                  $slideEl.append(shadowBefore);
                }
                if (shadowAfter.length === 0) {
                  shadowAfter = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
                  $slideEl.append(shadowAfter);
                }
                if (shadowBefore.length) {
                  shadowBefore[0].style.opacity = Math.max(-progress, 0);
                }
                if (shadowAfter.length) {
                  shadowAfter[0].style.opacity = Math.max(progress, 0);
                }
              }
            }
            $wrapperEl.css({
              '-webkit-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
              '-moz-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
              '-ms-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
              'transform-origin': "50% 50% -" + swiperSize / 2 + "px"
            });

            if (params.shadow) {
              if (isHorizontal) {
                $cubeShadowEl.transform("translate3d(0px, " + (swiperWidth / 2 + params.shadowOffset) + "px, " + -swiperWidth / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + params.shadowScale + ")");
              } else {
                var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                var scale1 = params.shadowScale;
                var scale2 = params.shadowScale / multiplier;
                var offset = params.shadowOffset;
                $cubeShadowEl.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + (swiperHeight / 2 + offset) + "px, " + -swiperHeight / 2 / scale2 + "px) rotateX(-90deg)");
              }
            }
            var zFactor = Browser.isSafari || Browser.isUiWebView ? -swiperSize / 2 : 0;
            $wrapperEl.transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)");
          },
          setTransition: function setTransition(duration) {
            var swiper = this;
            var $el = swiper.$el;
            var slides = swiper.slides;
            slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
            if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
              $el.find('.swiper-cube-shadow').transition(duration);
            }
          }
        };

        var EffectCube = {
          name: 'effect-cube',
          params: {
            cubeEffect: {
              slideShadows: true,
              shadow: true,
              shadowOffset: 20,
              shadowScale: 0.94
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              cubeEffect: {
                setTranslate: Cube.setTranslate.bind(swiper),
                setTransition: Cube.setTransition.bind(swiper)
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (swiper.params.effect !== 'cube') {
                return;
              }
              swiper.classNames.push(swiper.params.containerModifierClass + "cube");
              swiper.classNames.push(swiper.params.containerModifierClass + "3d");
              var overwriteParams = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: false,
                virtualTranslate: true
              };
              Utils.extend(swiper.params, overwriteParams);
              Utils.extend(swiper.originalParams, overwriteParams);
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              if (swiper.params.effect !== 'cube') {
                return;
              }
              swiper.cubeEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
              var swiper = this;
              if (swiper.params.effect !== 'cube') {
                return;
              }
              swiper.cubeEffect.setTransition(duration);
            }
          }
        };

        var Flip = {
          setTranslate: function setTranslate() {
            var swiper = this;
            var slides = swiper.slides;
            var rtl = swiper.rtlTranslate;
            for (var i = 0; i < slides.length; i += 1) {
              var $slideEl = slides.eq(i);
              var progress = $slideEl[0].progress;
              if (swiper.params.flipEffect.limitRotation) {
                progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
              }
              var offset = $slideEl[0].swiperSlideOffset;
              var rotate = -180 * progress;
              var rotateY = rotate;
              var rotateX = 0;
              var tx = -offset;
              var ty = 0;
              if (!swiper.isHorizontal()) {
                ty = tx;
                tx = 0;
                rotateX = -rotateY;
                rotateY = 0;
              } else if (rtl) {
                rotateY = -rotateY;
              }

              $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

              if (swiper.params.flipEffect.slideShadows) {
                // Set shadows
                var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                if (shadowBefore.length === 0) {
                  shadowBefore = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>");
                  $slideEl.append(shadowBefore);
                }
                if (shadowAfter.length === 0) {
                  shadowAfter = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>");
                  $slideEl.append(shadowAfter);
                }
                if (shadowBefore.length) {
                  shadowBefore[0].style.opacity = Math.max(-progress, 0);
                }
                if (shadowAfter.length) {
                  shadowAfter[0].style.opacity = Math.max(progress, 0);
                }
              }
              $slideEl.transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
            }
          },
          setTransition: function setTransition(duration) {
            var swiper = this;
            var slides = swiper.slides;
            var activeIndex = swiper.activeIndex;
            var $wrapperEl = swiper.$wrapperEl;
            slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
            if (swiper.params.virtualTranslate && duration !== 0) {
              var eventTriggered = false;
              // eslint-disable-next-line
              slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
                if (eventTriggered) {
                  return;
                }
                if (!swiper || swiper.destroyed) {
                  return;
                }
                // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
                eventTriggered = true;
                swiper.animating = false;
                var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
                for (var i = 0; i < triggerEvents.length; i += 1) {
                  $wrapperEl.trigger(triggerEvents[i]);
                }
              });
            }
          }
        };

        var EffectFlip = {
          name: 'effect-flip',
          params: {
            flipEffect: {
              slideShadows: true,
              limitRotation: true
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              flipEffect: {
                setTranslate: Flip.setTranslate.bind(swiper),
                setTransition: Flip.setTransition.bind(swiper)
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (swiper.params.effect !== 'flip') {
                return;
              }
              swiper.classNames.push(swiper.params.containerModifierClass + "flip");
              swiper.classNames.push(swiper.params.containerModifierClass + "3d");
              var overwriteParams = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: true,
                spaceBetween: 0,
                virtualTranslate: true
              };
              Utils.extend(swiper.params, overwriteParams);
              Utils.extend(swiper.originalParams, overwriteParams);
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              if (swiper.params.effect !== 'flip') {
                return;
              }
              swiper.flipEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
              var swiper = this;
              if (swiper.params.effect !== 'flip') {
                return;
              }
              swiper.flipEffect.setTransition(duration);
            }
          }
        };

        var Coverflow = {
          setTranslate: function setTranslate() {
            var swiper = this;
            var swiperWidth = swiper.width;
            var swiperHeight = swiper.height;
            var slides = swiper.slides;
            var $wrapperEl = swiper.$wrapperEl;
            var slidesSizesGrid = swiper.slidesSizesGrid;
            var params = swiper.params.coverflowEffect;
            var isHorizontal = swiper.isHorizontal();
            var transform = swiper.translate;
            var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
            var rotate = isHorizontal ? params.rotate : -params.rotate;
            var translate = params.depth;
            // Each slide offset from center
            for (var i = 0, length = slides.length; i < length; i += 1) {
              var $slideEl = slides.eq(i);
              var slideSize = slidesSizesGrid[i];
              var slideOffset = $slideEl[0].swiperSlideOffset;
              var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;

              var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
              var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
              // var rotateZ = 0
              var translateZ = -translate * Math.abs(offsetMultiplier);

              var translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
              var translateX = isHorizontal ? params.stretch * offsetMultiplier : 0;

              // Fix for ultra small values
              if (Math.abs(translateX) < 0.001) {
                translateX = 0;
              }
              if (Math.abs(translateY) < 0.001) {
                translateY = 0;
              }
              if (Math.abs(translateZ) < 0.001) {
                translateZ = 0;
              }
              if (Math.abs(rotateY) < 0.001) {
                rotateY = 0;
              }
              if (Math.abs(rotateX) < 0.001) {
                rotateX = 0;
              }

              var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

              $slideEl.transform(slideTransform);
              $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
              if (params.slideShadows) {
                // Set shadows
                var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
                var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
                if ($shadowBeforeEl.length === 0) {
                  $shadowBeforeEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
                  $slideEl.append($shadowBeforeEl);
                }
                if ($shadowAfterEl.length === 0) {
                  $shadowAfterEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
                  $slideEl.append($shadowAfterEl);
                }
                if ($shadowBeforeEl.length) {
                  $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                }
                if ($shadowAfterEl.length) {
                  $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
                }
              }
            }

            // Set correct perspective for IE10
            if (Support.pointerEvents || Support.prefixedPointerEvents) {
              var ws = $wrapperEl[0].style;
              ws.perspectiveOrigin = center + "px 50%";
            }
          },
          setTransition: function setTransition(duration) {
            var swiper = this;
            swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
          }
        };

        var EffectCoverflow = {
          name: 'effect-coverflow',
          params: {
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }
          },
          create: function create() {
            var swiper = this;
            Utils.extend(swiper, {
              coverflowEffect: {
                setTranslate: Coverflow.setTranslate.bind(swiper),
                setTransition: Coverflow.setTransition.bind(swiper)
              }
            });
          },
          on: {
            beforeInit: function beforeInit() {
              var swiper = this;
              if (swiper.params.effect !== 'coverflow') {
                return;
              }

              swiper.classNames.push(swiper.params.containerModifierClass + "coverflow");
              swiper.classNames.push(swiper.params.containerModifierClass + "3d");

              swiper.params.watchSlidesProgress = true;
              swiper.originalParams.watchSlidesProgress = true;
            },
            setTranslate: function setTranslate() {
              var swiper = this;
              if (swiper.params.effect !== 'coverflow') {
                return;
              }
              swiper.coverflowEffect.setTranslate();
            },
            setTransition: function setTransition(duration) {
              var swiper = this;
              if (swiper.params.effect !== 'coverflow') {
                return;
              }
              swiper.coverflowEffect.setTransition(duration);
            }
          }
        };

        // Swiper Class

        var components = [Device$1, Support$1, Browser$1, Resize, Observer$1, Virtual$1, Keyboard$1, Mousewheel$1, Navigation$1, Pagination$1, Scrollbar$1, Parallax$1, Zoom$1, Lazy$1, Controller$1, A11y, History$1, HashNavigation$1, Autoplay$1, EffectFade, EffectCube, EffectFlip, EffectCoverflow];

        if (typeof Swiper.use === 'undefined') {
          Swiper.use = Swiper.Class.use;
          Swiper.installModule = Swiper.Class.installModule;
        }

        Swiper.use(components);

        return Swiper;
      });

      /***/
    },
    /* 22 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      /* harmony export (binding) */
      __webpack_require__.d(__webpack_exports__, "a", function () {
        return Calender;
      });
      /**
       * 日历组件相关的数据模块
       * @namespace
       */
      var Calender;
      (function (Calender) {
        /**
         * 每周的日历列表
         * @class
         */
        var WeekCalender = /** @class */function () {
          function WeekCalender() {
            /**
             * 总共有多少周的日期集合
             */
            this.WeekDayList = [];
          }
          return WeekCalender;
        }();
        Calender.WeekCalender = WeekCalender;
        /**
         * 每天显示的状态设置
         * @class
         */
        var DayStatus = /** @class */function () {
          function DayStatus() {
            /**
             * 每天状态列表
             */
            this.dayStatusList = [];
          }
          return DayStatus;
        }();
        Calender.DayStatus = DayStatus;
        /**
         * 日历可选项配置实体
         * @class
         */
        var CalenderOptions = /** @class */function () {
          function CalenderOptions() {
            /**
             * 日历标题
             */
            this.showHeader = false;
          }
          return CalenderOptions;
        }();
        Calender.CalenderOptions = CalenderOptions;
        /**
         * 天 数据实体
         * @class
         */
        var DayModel = /** @class */function () {
          function DayModel() {
            /**
             * 默认css样式
             */
            this.dayClass = "day";
            /**
             * 默认css样式
             */
            this.oriDayClass = "day";
            /**
             * 每天日历是否可用(点击)
             */
            this.enabled = true;
          }
          return DayModel;
        }();
        Calender.DayModel = DayModel;
      })(Calender || (Calender = {}));

      /***/
    },
    /* 23 */
    /***/function (module, exports, __webpack_require__) {

      !function (e, t) {
        true ? module.exports = t(__webpack_require__(21)) : "function" == typeof define && define.amd ? define("VueAwesomeSwiper", ["swiper"], t) : "object" == (typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) ? exports.VueAwesomeSwiper = t(require("swiper/dist/js/swiper.js")) : e.VueAwesomeSwiper = t(e.Swiper);
      }(this, function (e) {
        return function (e) {
          function t(i) {
            if (n[i]) return n[i].exports;var s = n[i] = { i: i, l: !1, exports: {} };return e[i].call(s.exports, s, s.exports, t), s.l = !0, s.exports;
          }var n = {};return t.m = e, t.c = n, t.i = function (e) {
            return e;
          }, t.d = function (e, n, i) {
            t.o(e, n) || (0, _defineProperty2.default)(e, n, { configurable: !1, enumerable: !0, get: i });
          }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
              return e.default;
            } : function () {
              return e;
            };return t.d(n, "a", n), n;
          }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }, t.p = "/", t(t.s = 4);
        }([function (t, n) {
          t.exports = e;
        }, function (e, t) {
          e.exports = function (e, t, n, i, s, r) {
            var o,
                a = e = e || {},
                u = (0, _typeof3.default)(e.default);"object" !== u && "function" !== u || (o = e, a = e.default);var p = "function" == typeof a ? a.options : a;t && (p.render = t.render, p.staticRenderFns = t.staticRenderFns, p._compiled = !0), n && (p.functional = !0), s && (p._scopeId = s);var l;if (r ? (l = function l(e) {
              e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, e || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(r);
            }, p._ssrRegister = l) : i && (l = i), l) {
              var c = p.functional,
                  d = c ? p.render : p.beforeCreate;c ? (p._injectStyles = l, p.render = function (e, t) {
                return l.call(t), d(e, t);
              }) : p.beforeCreate = d ? [].concat(d, l) : [l];
            }return { esModule: o, exports: a, options: p };
          };
        }, function (e, t, n) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });var i = n(5),
              s = n.n(i),
              r = n(8),
              o = n(1),
              a = o(s.a, r.a, !1, null, null, null);t.default = a.exports;
        }, function (e, t, n) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });var i = n(6),
              s = n.n(i),
              r = n(7),
              o = n(1),
              a = o(s.a, r.a, !1, null, null, null);t.default = a.exports;
        }, function (e, t, n) {
          "use strict";
          function i(e) {
            return e && e.__esModule ? e : { default: e };
          }Object.defineProperty(t, "__esModule", { value: !0 }), t.install = t.swiperSlide = t.swiper = t.Swiper = void 0;var s = n(0),
              r = i(s),
              o = n(2),
              a = i(o),
              u = n(3),
              p = i(u),
              l = window.Swiper || r.default,
              c = p.default,
              d = a.default,
              f = function f(e, t) {
            t && (p.default.props.globalOptions.default = function () {
              return t;
            }), e.component(p.default.name, p.default), e.component(a.default.name, a.default);
          },
              h = { Swiper: l, swiper: c, swiperSlide: d, install: f };t.default = h, t.Swiper = l, t.swiper = c, t.swiperSlide = d, t.install = f;
        }, function (e, t, n) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }), t.default = { name: "swiper-slide", data: function data() {
              return { slideClass: "swiper-slide" };
            }, ready: function ready() {
              this.update();
            }, mounted: function mounted() {
              this.update(), this.$parent && this.$parent.options && this.$parent.options.slideClass && (this.slideClass = this.$parent.options.slideClass);
            }, updated: function updated() {
              this.update();
            }, attached: function attached() {
              this.update();
            }, methods: { update: function update() {
                this.$parent && this.$parent.swiper && this.$parent.update();
              } } };
        }, function (e, t, n) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });var i = n(0),
              s = function (e) {
            return e && e.__esModule ? e : { default: e };
          }(i),
              r = window.Swiper || s.default;"function" != typeof _assign2.default && Object.defineProperty(Object, "assign", { value: function value(e, t) {
              if (null == e) throw new TypeError("Cannot convert undefined or null to object");for (var n = Object(e), i = 1; i < arguments.length; i++) {
                var s = arguments[i];if (null != s) for (var r in s) {
                  Object.prototype.hasOwnProperty.call(s, r) && (n[r] = s[r]);
                }
              }return n;
            }, writable: !0, configurable: !0 });var o = ["beforeDestroy", "slideChange", "slideChangeTransitionStart", "slideChangeTransitionEnd", "slideNextTransitionStart", "slideNextTransitionEnd", "slidePrevTransitionStart", "slidePrevTransitionEnd", "transitionStart", "transitionEnd", "touchStart", "touchMove", "touchMoveOpposite", "sliderMove", "touchEnd", "click", "tap", "doubleTap", "imagesReady", "progress", "reachBeginning", "reachEnd", "fromEdge", "setTranslate", "setTransition", "resize"];t.default = { name: "swiper", props: { options: { type: Object, default: function _default() {
                  return {};
                } }, globalOptions: { type: Object, required: !1, default: function _default() {
                  return {};
                } } }, data: function data() {
              return { swiper: null, classes: { wrapperClass: "swiper-wrapper" } };
            }, ready: function ready() {
              this.swiper || this.mountInstance();
            }, mounted: function mounted() {
              if (!this.swiper) {
                var e = !1;for (var t in this.classes) {
                  this.classes.hasOwnProperty(t) && this.options[t] && (e = !0, this.classes[t] = this.options[t]);
                }e ? this.$nextTick(this.mountInstance) : this.mountInstance();
              }
            }, activated: function activated() {
              this.update();
            }, updated: function updated() {
              this.update();
            }, beforeDestroy: function beforeDestroy() {
              this.$nextTick(function () {
                this.swiper && (this.swiper.destroy && this.swiper.destroy(), delete this.swiper);
              });
            }, methods: { update: function update() {
                this.swiper && (this.swiper.update && this.swiper.update(), this.swiper.navigation && this.swiper.navigation.update(), this.swiper.pagination && this.swiper.pagination.render(), this.swiper.pagination && this.swiper.pagination.update());
              }, mountInstance: function mountInstance() {
                var e = (0, _assign2.default)({}, this.globalOptions, this.options);this.swiper = new r(this.$el, e), this.bindEvents(), this.$emit("ready", this.swiper);
              }, bindEvents: function bindEvents() {
                var e = this,
                    t = this;o.forEach(function (n) {
                  e.swiper.on(n, function () {
                    t.$emit.apply(t, [n].concat(Array.prototype.slice.call(arguments))), t.$emit.apply(t, [n.replace(/([A-Z])/g, "-$1").toLowerCase()].concat(Array.prototype.slice.call(arguments)));
                  });
                });
              } } };
        }, function (e, t, n) {
          "use strict";
          var i = function i() {
            var e = this,
                t = e.$createElement,
                n = e._self._c || t;return n("div", { staticClass: "swiper-container" }, [e._t("parallax-bg"), e._v(" "), n("div", { class: e.classes.wrapperClass }, [e._t("default")], 2), e._v(" "), e._t("pagination"), e._v(" "), e._t("button-prev"), e._v(" "), e._t("button-next"), e._v(" "), e._t("scrollbar")], 2);
          },
              s = [],
              r = { render: i, staticRenderFns: s };t.a = r;
        }, function (e, t, n) {
          "use strict";
          var i = function i() {
            var e = this,
                t = e.$createElement;return (e._self._c || t)("div", { class: e.slideClass }, [e._t("default")], 2);
          },
              s = [],
              r = { render: i, staticRenderFns: s };t.a = r;
        }]);
      });

      /***/
    },
    /* 24 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";
      /* WEBPACK VAR INJECTION */
      (function (process) {
        /**
        * vue-class-component v6.2.0
        * (c) 2015-present Evan You
        * @license MIT
        */

        Object.defineProperty(exports, '__esModule', { value: true });

        function _interopDefault(ex) {
          return ex && (typeof ex === 'undefined' ? 'undefined' : (0, _typeof3.default)(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
        }

        var Vue = _interopDefault(__webpack_require__(5));

        var hasProto = { __proto__: [] } instanceof Array;
        function createDecorator(factory) {
          return function (target, key, index) {
            var Ctor = typeof target === 'function' ? target : target.constructor;
            if (!Ctor.__decorators__) {
              Ctor.__decorators__ = [];
            }
            if (typeof index !== 'number') {
              index = undefined;
            }
            Ctor.__decorators__.push(function (options) {
              return factory(options, key, index);
            });
          };
        }
        function mixins() {
          var Ctors = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            Ctors[_i] = arguments[_i];
          }
          return Vue.extend({ mixins: Ctors });
        }
        function isPrimitive(value) {
          var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
          return value == null || type !== "object" && type !== "function";
        }
        function warn(message) {
          if (typeof console !== 'undefined') {
            console.warn('[vue-class-component] ' + message);
          }
        }

        function collectDataFromConstructor(vm, Component) {
          // override _init to prevent to init as Vue instance
          var originalInit = Component.prototype._init;
          Component.prototype._init = function () {
            var _this = this;
            // proxy to actual vm
            var keys = (0, _getOwnPropertyNames2.default)(vm);
            // 2.2.0 compat (props are no longer exposed as self properties)
            if (vm.$options.props) {
              for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                  keys.push(key);
                }
              }
            }
            keys.forEach(function (key) {
              if (key.charAt(0) !== '_') {
                (0, _defineProperty2.default)(_this, key, {
                  get: function get() {
                    return vm[key];
                  },
                  set: function set(value) {
                    return vm[key] = value;
                  },
                  configurable: true
                });
              }
            });
          };
          // should be acquired class property values
          var data = new Component();
          // restore original _init to avoid memory leak (#209)
          Component.prototype._init = originalInit;
          // create plain data object
          var plainData = {};
          (0, _keys2.default)(data).forEach(function (key) {
            if (data[key] !== undefined) {
              plainData[key] = data[key];
            }
          });
          if (process.env.NODE_ENV !== 'production') {
            if (!(Component.prototype instanceof Vue) && (0, _keys2.default)(plainData).length > 0) {
              warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
            }
          }
          return plainData;
        }

        var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured' // 2.5
        ];
        function componentFactory(Component, options) {
          if (options === void 0) {
            options = {};
          }
          options.name = options.name || Component._componentTag || Component.name;
          // prototype props.
          var proto = Component.prototype;
          (0, _getOwnPropertyNames2.default)(proto).forEach(function (key) {
            if (key === 'constructor') {
              return;
            }
            // hooks
            if ($internalHooks.indexOf(key) > -1) {
              options[key] = proto[key];
              return;
            }
            var descriptor = (0, _getOwnPropertyDescriptor2.default)(proto, key);
            if (typeof descriptor.value === 'function') {
              // methods
              (options.methods || (options.methods = {}))[key] = descriptor.value;
            } else if (descriptor.get || descriptor.set) {
              // computed properties
              (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
              };
            }
          });
          (options.mixins || (options.mixins = [])).push({
            data: function data() {
              return collectDataFromConstructor(this, Component);
            }
          });
          // decorate options
          var decorators = Component.__decorators__;
          if (decorators) {
            decorators.forEach(function (fn) {
              return fn(options);
            });
            delete Component.__decorators__;
          }
          // find super
          var superProto = (0, _getPrototypeOf2.default)(Component.prototype);
          var Super = superProto instanceof Vue ? superProto.constructor : Vue;
          var Extended = Super.extend(options);
          forwardStaticMembers(Extended, Component, Super);
          return Extended;
        }
        var reservedPropertyNames = [
        // Unique id
        'cid',
        // Super Vue constructor
        'super',
        // Component options that will be used by the component
        'options', 'superOptions', 'extendOptions', 'sealedOptions',
        // Private assets
        'component', 'directive', 'filter'];
        function forwardStaticMembers(Extended, Original, Super) {
          // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
          (0, _getOwnPropertyNames2.default)(Original).forEach(function (key) {
            // `prototype` should not be overwritten
            if (key === 'prototype') {
              return;
            }
            // Some browsers does not allow reconfigure built-in properties
            var extendedDescriptor = (0, _getOwnPropertyDescriptor2.default)(Extended, key);
            if (extendedDescriptor && !extendedDescriptor.configurable) {
              return;
            }
            var descriptor = (0, _getOwnPropertyDescriptor2.default)(Original, key);
            // If the user agent does not support `__proto__` or its family (IE <= 10),
            // the sub class properties may be inherited properties from the super class in TypeScript.
            // We need to exclude such properties to prevent to overwrite
            // the component options object which stored on the extended constructor (See #192).
            // If the value is a referenced value (object or function),
            // we can check equality of them and exclude it if they have the same reference.
            // If it is a primitive value, it will be forwarded for safety.
            if (!hasProto) {
              // Only `cid` is explicitly exluded from property forwarding
              // because we cannot detect whether it is a inherited property or not
              // on the no `__proto__` environment even though the property is reserved.
              if (key === 'cid') {
                return;
              }
              var superDescriptor = (0, _getOwnPropertyDescriptor2.default)(Super, key);
              if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
                return;
              }
            }
            // Warn if the users manually declare reserved properties
            if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
              warn("Static property name '" + key + "' declared on class '" + Original.name + "' " + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
            }
            (0, _defineProperty2.default)(Extended, key, descriptor);
          });
        }

        function Component(options) {
          if (typeof options === 'function') {
            return componentFactory(options);
          }
          return function (Component) {
            return componentFactory(Component, options);
          };
        }
        (function (Component) {
          function registerHooks(keys) {
            $internalHooks.push.apply($internalHooks, keys);
          }
          Component.registerHooks = registerHooks;
        })(Component || (Component = {}));
        var Component$1 = Component;

        exports.default = Component$1;
        exports.createDecorator = createDecorator;
        exports.mixins = mixins;

        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(17));

      /***/
    },
    /* 25 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";
      /* unused harmony export Inject */
      /* unused harmony export Provide */
      /* unused harmony export Model */
      /* harmony export (immutable) */
      __webpack_exports__["a"] = Prop;
      /* unused harmony export Watch */
      /* harmony export (immutable) */__webpack_exports__["b"] = Emit;
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_vue_class_component__ = __webpack_require__(24);
      /* harmony import */var __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__);
      /* harmony reexport (default from non-hamory) */__webpack_require__.d(__webpack_exports__, "c", function () {
        return __WEBPACK_IMPORTED_MODULE_1_vue_class_component___default.a;
      });
      /* harmony reexport (default from non-hamory) */__webpack_require__.d(__webpack_exports__, "d", function () {
        return __WEBPACK_IMPORTED_MODULE_0_vue___default.a;
      });
      /* unused harmony reexport Mixins */
      /** vue-property-decorator verson 7.0.0 MIT LICENSE copyright 2018 kaorun343 */

      /**
       * decorator of an inject
       * @param from key
       * @return PropertyDecorator
       */
      function Inject(options) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__["createDecorator"])(function (componentOptions, key) {
          if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
          }
          if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
          }
        });
      }
      /**
       * decorator of a provide
       * @param key key
       * @return PropertyDecorator | void
       */
      function Provide(key) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__["createDecorator"])(function (componentOptions, k) {
          var provide = componentOptions.provide;
          if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
              var rv = (0, _create2.default)((typeof original_1 === 'function' ? original_1.call(this) : original_1) || null);
              for (var i in provide.managed) {
                rv[provide.managed[i]] = this[i];
              }return rv;
            };
            provide.managed = {};
          }
          provide.managed[k] = key || k;
        });
      }
      /**
       * decorator of model
       * @param  event event name
       * @param options options
       * @return PropertyDecorator
       */
      function Model(event, options) {
        if (options === void 0) {
          options = {};
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__["createDecorator"])(function (componentOptions, k) {
          (componentOptions.props || (componentOptions.props = {}))[k] = options;
          componentOptions.model = { prop: k, event: event || k };
        });
      }
      /**
       * decorator of a prop
       * @param  options the options for the prop
       * @return PropertyDecorator | void
       */
      function Prop(options) {
        if (options === void 0) {
          options = {};
        }
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__["createDecorator"])(function (componentOptions, k) {
          (componentOptions.props || (componentOptions.props = {}))[k] = options;
        });
      }
      /**
       * decorator of a watch function
       * @param  path the path or the expression to observe
       * @param  WatchOption
       * @return MethodDecorator
       */
      function Watch(path, options) {
        if (options === void 0) {
          options = {};
        }
        var _a = options.deep,
            deep = _a === void 0 ? false : _a,
            _b = options.immediate,
            immediate = _b === void 0 ? false : _b;
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vue_class_component__["createDecorator"])(function (componentOptions, handler) {
          if ((0, _typeof3.default)(componentOptions.watch) !== 'object') {
            componentOptions.watch = (0, _create2.default)(null);
          }
          componentOptions.watch[path] = { handler: handler, deep: deep, immediate: immediate };
        });
      }
      // Code copied from Vue/src/shared/util.js
      var hyphenateRE = /\B([A-Z])/g;
      var hyphenate = function hyphenate(str) {
        return str.replace(hyphenateRE, '-$1').toLowerCase();
      };
      /**
       * decorator of an event-emitter function
       * @param  event The name of the event
       * @return MethodDecorator
       */
      function Emit(event) {
        return function (target, key, descriptor) {
          key = hyphenate(key);
          var original = descriptor.value;
          descriptor.value = function emitter() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (original.apply(this, args) !== false) this.$emit.apply(this, [event || key].concat(args));
          };
        };
      }

      /***/
    },
    /* 26 */
    /***/function (module, exports) {

      (function (win) {
        var ratio,
            scaleValue,
            renderTime,
            document = window.document,
            docElem = document.documentElement,
            vpm = document.querySelector('meta[name="viewport"]');

        if (vpm) {
          var tempArray = vpm.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
          if (tempArray) {
            scaleValue = parseFloat(tempArray[2]);
            ratio = parseInt(1 / scaleValue);
          }
        } else {
          vpm = document.createElement("meta");
          vpm.setAttribute("name", "viewport");
          vpm.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no, minimal-ui");
          docElem.firstElementChild.appendChild(vpm);
        }

        win.addEventListener("resize", function () {
          clearTimeout(renderTime);
          renderTime = setTimeout(initPage, 300);
        }, false);

        win.addEventListener("pageshow", function (e) {
          e.persisted && (clearTimeout(renderTime), renderTime = setTimeout(initPage, 300));
        }, false);

        "complete" === document.readyState ? document.body.style.fontSize = 12 * ratio + "px" : document.addEventListener("DOMContentLoaded", function () {
          document.body.style.fontSize = 12 * ratio + "px";
        }, false);

        initPage();

        function initPage() {
          var htmlWidth = docElem.getBoundingClientRect().width;
          htmlWidth / ratio > 960 && (htmlWidth = 960 * ratio);
          win.rem = htmlWidth / 10;
          docElem.style.fontSize = win.rem + "px";
        }
      })(window);

      /***/
    }]
    /******/)
  );
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(123)(module)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var _vue = __webpack_require__(26);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(57);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue2.default({
  el: '#app',
  components: {
    VueWeekcalender: _index2.default
  },
  data: function data() {
    return {
      options: {
        showHeader: true,
        beginDate: "2018-07-30",
        endDate: "2018-08-12",
        currentDate: "2018-08-03"
      }
    };
  },

  methods: {
    chooseDayItemHandle: function chooseDayItemHandle(dayItem) {
      console.log(dayItem);
    },

    slideChangeHandle: function slideChangeHandle(item) {
      console.log(item);
    }
  }
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(78), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(71);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(70);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
var $Object = __webpack_require__(0).Object;
module.exports = function getOwnPropertyNames(it) {
  return $Object.getOwnPropertyNames(it);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(112);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(113);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
module.exports = __webpack_require__(0).Reflect.metadata;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(117);
__webpack_require__(115);
__webpack_require__(120);
__webpack_require__(121);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
__webpack_require__(122);
module.exports = __webpack_require__(44).f('iterator');


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(41);
var toAbsoluteIndex = __webpack_require__(102);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
var isArray = __webpack_require__(49);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(88);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(29);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(6).f;
var create = __webpack_require__(18);
var redefineAll = __webpack_require__(37);
var ctx = __webpack_require__(12);
var anInstance = __webpack_require__(27);
var forOf = __webpack_require__(32);
var $iterDefine = __webpack_require__(34);
var step = __webpack_require__(50);
var setSpecies = __webpack_require__(100);
var DESCRIPTORS = __webpack_require__(1);
var fastKey = __webpack_require__(14).fastKey;
var validate = __webpack_require__(25);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(37);
var getWeak = __webpack_require__(14).getWeak;
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(2);
var anInstance = __webpack_require__(27);
var forOf = __webpack_require__(32);
var createArrayMethod = __webpack_require__(28);
var $has = __webpack_require__(9);
var validate = __webpack_require__(25);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(15);
var gOPS = __webpack_require__(36);
var pIE = __webpack_require__(19);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(13);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(18);
var descriptor = __webpack_require__(21);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(105);
var $export = __webpack_require__(4);
var shared = __webpack_require__(23)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(118))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(2);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(12)(Function.call, __webpack_require__(35).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var core = __webpack_require__(0);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(1);
var SPECIES = __webpack_require__(3)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(40);
var defined = __webpack_require__(30);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(40);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(90);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(13);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(86);
var step = __webpack_require__(50);
var Iterators = __webpack_require__(13);
var toIObject = __webpack_require__(11);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(34)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(91);
var validate = __webpack_require__(25);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(46)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(51) });


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(18) });


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', { defineProperties: __webpack_require__(52) });


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(11);
var $getOwnPropertyDescriptor = __webpack_require__(35).f;

__webpack_require__(20)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(20)('getOwnPropertyNames', function () {
  return __webpack_require__(53).f;
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(16);
var $getPrototypeOf = __webpack_require__(55);

__webpack_require__(20)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(16);
var $keys = __webpack_require__(15);

__webpack_require__(20)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(99).set });


/***/ }),
/* 115 */
/***/ (function(module, exports) {



/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(101)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(34)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(1);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(38);
var META = __webpack_require__(14).KEY;
var $fails = __webpack_require__(8);
var shared = __webpack_require__(23);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(24);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(44);
var wksDefine = __webpack_require__(43);
var enumKeys = __webpack_require__(93);
var isArray = __webpack_require__(49);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(2);
var toIObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(42);
var createDesc = __webpack_require__(21);
var _create = __webpack_require__(18);
var gOPNExt = __webpack_require__(53);
var $GOPD = __webpack_require__(35);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(15);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(54).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(19).f = $propertyIsEnumerable;
  __webpack_require__(36).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(17)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(28)(0);
var redefine = __webpack_require__(38);
var meta = __webpack_require__(14);
var assign = __webpack_require__(51);
var weak = __webpack_require__(92);
var isObject = __webpack_require__(2);
var fails = __webpack_require__(8);
var validate = __webpack_require__(25);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(46)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(98);
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(45);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('asyncIterator');


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('observable');


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(104);
var global = __webpack_require__(5);
var hide = __webpack_require__(10);
var Iterators = __webpack_require__(13);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);