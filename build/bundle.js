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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Plugin/Preset files are not allowed to export objects, only functions. In C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-preset-es2015\\lib\\index.js\n    at createDescriptor (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:178:11)\n    at items.map (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:109:50)\n    at Array.map (<anonymous>)\n    at createDescriptors (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:109:29)\n    at createPresetDescriptors (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:101:10)\n    at passPerPreset (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:58:96)\n    at cachedFunction (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\caching.js:33:19)\n    at presets.presets (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-descriptors.js:29:84)\n    at mergeChainOpts (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-chain.js:320:26)\n    at C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-chain.js:283:7\n    at buildRootChain (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\config-chain.js:68:29)\n    at loadPrivatePartialConfig (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\partial.js:85:55)\n    at Object.loadPartialConfig (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\@babel\\core\\lib\\config\\partial.js:110:18)\n    at Object.<anonymous> (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:144:26)\n    at Generator.next (<anonymous>)\n    at asyncGeneratorStep (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:3:103)\n    at _next (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:5:194)\n    at C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:5:364\n    at new Promise (<anonymous>)\n    at Object.<anonymous> (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:5:97)\n    at Object._loader (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:224:18)\n    at Object.loader (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:60:18)\n    at Object.<anonymous> (C:\\Users\\EDZ\\Desktop\\demo-dva\\node_modules\\babel-loader\\lib\\index.js:55:12)");

/***/ })
/******/ ]);