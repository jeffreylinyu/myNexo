/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./Resources/ts/Gastro.ts":
/*!********************************!*\
  !*** ./Resources/ts/Gastro.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_ModifierPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/ModifierPromise */ "./Resources/ts/classes/ModifierPromise.ts");
/* harmony import */ var _classes_SendToKitchenQueue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/SendToKitchenQueue */ "./Resources/ts/classes/SendToKitchenQueue.ts");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




var gastroPosMeal = (__webpack_require__(/*! ./components/gastro-pos-meal */ "./Resources/ts/components/gastro-pos-meal.vue")["default"]);

var gastroTable = (__webpack_require__(/*! ./components/gastro-table */ "./Resources/ts/components/gastro-table.vue")["default"]);

var gastroTableButton = (__webpack_require__(/*! ./components/gastro-table-button */ "./Resources/ts/components/gastro-table-button.vue")["default"]);

var gastroOrdersButton = (__webpack_require__(/*! ./components/gastro-pos-orders-button */ "./Resources/ts/components/gastro-pos-orders-button.vue")["default"]);

var gastroPosTables = (__webpack_require__(/*! ./components/gastro-pos-tables */ "./Resources/ts/components/gastro-pos-tables.vue")["default"]);

var gastroAddButtons = (__webpack_require__(/*! ./components/gastro-add-buttons */ "./Resources/ts/components/gastro-add-buttons.vue")["default"]);

var gastroSplitOrderButton = (__webpack_require__(/*! ./components/gastro-split-orders-button */ "./Resources/ts/components/gastro-split-orders-button.vue")["default"]);

var gastroMergeOrderButton = (__webpack_require__(/*! ./components/gastro-merge-orders-button */ "./Resources/ts/components/gastro-merge-orders-button.vue")["default"]);

var gastroToKitchenButton = (__webpack_require__(/*! ./components/gastro-to-kitchen-button */ "./Resources/ts/components/gastro-to-kitchen-button.vue")["default"]);

var gastroPosOrderOptions = (__webpack_require__(/*! ./components/gastro-pos-order-options */ "./Resources/ts/components/gastro-pos-order-options.vue")["default"]);

var Gastro = /*#__PURE__*/function () {
  function Gastro() {
    var _this = this;

    _classCallCheck(this, Gastro);

    this.addButtonsVisible = new RxJS.ReplaySubject();
    this.tableOpenedSubject = new RxJS.ReplaySubject();
    this.tableOpenedStatus = false;
    this.selectedOrder = new RxJS.BehaviorSubject();
    nsHooks.addAction('ns-pos-header', 'gastro-add-table-button', function (header) {
      return _this.addHeaderButton(header);
    });
    nsHooks.addAction('ns-after-product-computed', 'gastro-update-product', function (product) {
      return _this.computeProduct(product);
    });
    nsHooks.addAction('ns-cart-after-refreshed', 'gastro-build-modifier', function (order) {
      return setTimeout(function () {
        return _this.buildModifierVue(order);
      }, 100);
    });
    nsHooks.addAction('ns-order-submit-successful', 'gastro-submit-order', function (result) {
      // should only print
      // the local print option is enabled
      if (GastroSettings.ns_gastro_kitchen_print_gateway === 'local_print') {
        _this.printOrderToKichen(result.data.order.id);
      }
    });
    nsHooks.addAction('ns-before-load-order', 'gastro-catch-order', function (order) {
      return _this.retrictOrderEdition();
    });
    nsHooks.addFilter('ns-pending-orders-right-column', 'gastro-right-column', function (lines) {
      lines.push({
        label: __m('Table Name', 'Gastro'),
        value: function value(order) {
          return order.table_name || __m('N/A', 'Gastro');
        }
      });
      return lines;
    });
    this.tableOpenedSubject.subscribe(function (status) {
      return _this.tableOpenedStatus = status;
    });
  }

  _createClass(Gastro, [{
    key: "getType",
    value: function getType() {
      return {
        'identifier': 'dine-in',
        'label': "Dine in ".concat(function () {
          var order = POS.order.getValue();

          if (order.table) {// return order.table.name + `${ order.table.selectedSeats > 0 ? ` (${order.table.selectedSeats})` : '' }`;
          }

          return '';
        }()),
        'icon': GastroSettings.icons.chair,
        'selected': false
      };
    }
  }, {
    key: "retrictOrderEdition",
    value: function retrictOrderEdition() {
      if (!GastroSettings.permissions.gastroEditOrder && !this.tableOpenedStatus) {
        nsSnackBar.error(__('You\'re not allowed to edit orders.')).subscribe();
        throw 'Not allowed';
      }
    }
  }, {
    key: "printOrderToKichen",
    value: function printOrderToKichen(order_id) {
      var products_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      nsHttpClient.post("/api/nexopos/v4/gastro/orders/".concat(order_id, "/kitchen-receipts"), {
        products_id: products_id
      }).subscribe(function (receipts) {
        receipts.forEach(function (receipt) {
          var content = receipt.template;
          var address = receipt.nps_address;
          receipt.printers.forEach(function (printer) {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function (e) {
              nsSnackBar.success('The print job has been submitted.').subscribe();
            });
            oReq.addEventListener('error', function () {
              return nsSnackBar.error(__('An unexpected error has occured while printing.')).subscribe();
            });
            oReq.open("POST", "".concat(address, "api/print"));
            oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oReq.send(JSON.stringify({
              printer: printer,
              content: content
            }));
          });
        });
      }, function (error) {
        nsSnackBar.error(__m("An error has occured while fetching the order receipts for the kitchen printing.", 'NsGastro')).subscribe();
      });
    }
  }, {
    key: "printOrderCanceledMealKitchen",
    value: function printOrderCanceledMealKitchen(order_id) {
      var products_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!GastroSettings.ns_gastro_allow_cancelation_print || GastroSettings.ns_gastro_kitchen_print_gateway !== 'local_print') {
        return false;
      }

      nsHttpClient.post("/api/nexopos/v4/gastro/orders/".concat(order_id, "/kitchen-canceled-receipts")).subscribe(function (receipts) {
        receipts.forEach(function (receipt) {
          var content = receipt.template;
          var address = receipt.nps_address;
          receipt.printers.forEach(function (printer) {
            var oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function (e) {
              nsSnackBar.success('The print job has been submitted.').subscribe();
            });
            oReq.addEventListener('error', function () {
              return nsSnackBar.error(__('An unexpected error has occured while printing.')).subscribe();
            });
            oReq.open("POST", "".concat(address, "api/print"));
            oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oReq.send(JSON.stringify({
              printer: printer,
              content: content
            }));
          });
        });
      }, function (error) {
        nsSnackBar.error(__m("An error has occured while fetching the order receipts for the kitchen printing.", 'NsGastro')).subscribe();
      });
    }
  }, {
    key: "setAddButtonsVisibility",
    value: function setAddButtonsVisibility(status) {
      if (status === 'visible') {
        this.addButtonsVisible.next(true);
      } else {
        this.addButtonsVisible.next(false);
      }
    }
  }, {
    key: "boot",
    value: function boot() {
      var _this2 = this;

      this.bindPromise();
      this.registerCustomOrderType();
      this.injectSendToKitchenPopup();
      POS.visibleSection.subscribe(function (value) {
        _this2.currentScreen = value;

        if (['both', 'cart'].includes(value)) {
          setTimeout(function () {
            _this2.injectAddToOrderButtons();

            _this2.toggleAddButtonsVisibility();
          }, 20);
        }
      });
      this.subscribeToAddButtonVisibility();
    }
  }, {
    key: "replaceHoldButton",
    value: function replaceHoldButton() {
      if (document.querySelector('#to-kitchen-button') === null) {
        var newButton = document.createElement('gastro-to-kitchen-button');
        var holdButton = document.querySelector('#hold-button');
        holdButton.classList.add('hidden');
        holdButton.parentNode.insertBefore(newButton, holdButton.nextElementSibling);
        /**
         * render the vue button component
         */

        var componentClass = Vue.extend(gastroToKitchenButton);
        var instance = new componentClass();
        instance.$mount('gastro-to-kitchen-button');
      }
    }
    /**
     * we'll toggle visibility if the cart is either
     * displaying both section or is displaying the cart.
     */

  }, {
    key: "subscribeToAddButtonVisibility",
    value: function subscribeToAddButtonVisibility() {
      var _this3 = this;

      this.addButtonsVisible.subscribe(function (value) {
        _this3.addButtonsVisibility = value;

        if (['both', 'cart'].includes(_this3.currentScreen)) {
          _this3.toggleAddButtonsVisibility();
        }
      });
    }
  }, {
    key: "toggleAddButtonsVisibility",
    value: function toggleAddButtonsVisibility() {
      if (['both', 'cart'].includes(this.currentScreen)) {
        if (this.addButtonsVisibility) {
          document.querySelector('#cart-bottom-buttons') !== null && document.querySelector('#cart-bottom-buttons').classList.remove('flex');
          document.querySelector('#cart-bottom-buttons') !== null && document.querySelector('#cart-bottom-buttons').classList.add('hidden');
          document.querySelector('#gastro-add-buttons') !== null && document.querySelector('#gastro-add-buttons').classList.remove('hidden');
          document.querySelector('#gastro-add-buttons') !== null && document.querySelector('#gastro-add-buttons').classList.add('flex');
        } else {
          document.querySelector('#cart-bottom-buttons') !== null && document.querySelector('#cart-bottom-buttons').classList.remove('hidden');
          document.querySelector('#cart-bottom-buttons') !== null && document.querySelector('#cart-bottom-buttons').classList.add('flex');
          document.querySelector('#gastro-add-buttons') !== null && document.querySelector('#gastro-add-buttons').classList.remove('flex');
          document.querySelector('#gastro-add-buttons') !== null && document.querySelector('#gastro-add-buttons').classList.add('hidden');
        }

        this.replaceHoldButton();
      }
    }
  }, {
    key: "injectAddToOrderButtons",
    value: function injectAddToOrderButtons() {
      var _a, _b, _c;

      if (document.querySelector('#gastro-add-buttons') !== null) {
        return false;
      }

      if (document.querySelector('.cart-table')) {
        document.querySelector('.cart-table').insertAdjacentHTML('beforeend', '<gastro-add-buttons></gastro-add-buttons>');
        var componentClass = Vue.extend(gastroAddButtons);
        var instance = new componentClass();
        /**
         * Let's intanciate the component
         * and mount it
         */

        instance.template = ((_a = gastroAddButtons === null || gastroAddButtons === void 0 ? void 0 : gastroAddButtons.options) === null || _a === void 0 ? void 0 : _a.template) || undefined;
        instance.render = gastroAddButtons.render || undefined;
        instance.methods = ((_b = gastroAddButtons === null || gastroAddButtons === void 0 ? void 0 : gastroAddButtons.options) === null || _b === void 0 ? void 0 : _b.methods) || (gastroAddButtons === null || gastroAddButtons === void 0 ? void 0 : gastroAddButtons.methods);
        instance.data = ((_c = gastroAddButtons === null || gastroAddButtons === void 0 ? void 0 : gastroAddButtons.options) === null || _c === void 0 ? void 0 : _c.data) || (gastroAddButtons === null || gastroAddButtons === void 0 ? void 0 : gastroAddButtons.data);
        instance.$mount("gastro-add-buttons");
      }
    }
  }, {
    key: "bindPromise",
    value: function bindPromise() {
      POS.addToCartQueue['ModifierPromise'] = _classes_ModifierPromise__WEBPACK_IMPORTED_MODULE_1__.ModifierPromise;
    }
    /**
     * Add a custom table management
     * button to the header buttons.
     * @param header Object
     */

  }, {
    key: "addHeaderButton",
    value: function addHeaderButton(header) {
      header.buttons['GastroTableButton'] = gastroTableButton;
      header.buttons['GastroOrdersButton'] = gastroOrdersButton;
      header.buttons['GastroSplitOrderButton'] = gastroSplitOrderButton;
      header.buttons['GastroMergeOrderButton'] = gastroMergeOrderButton;
      return header;
    }
  }, {
    key: "registerCustomOrderType",
    value: function registerCustomOrderType() {
      var _this4 = this;

      var types = POS.types.getValue(); // types.push( this.getType() );

      POS.orderTypeQueue.push({
        identifier: 'gastro.table',
        promise: function promise(selectedType) {
          return __awaiter(_this4, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return new Promise(function (resolve, reject) {
                      if (selectedType.identifier === 'dine-in' && GastroSettings.ns_gastro_tables_enabled) {
                        Popup.show(gastroTable, {
                          resolve: resolve,
                          reject: reject
                        });
                      } else {
                        resolve(true);
                      }
                    });

                  case 2:
                    return _context.abrupt("return", _context.sent);

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));
        }
      });
    }
  }, {
    key: "computeProduct",
    value: function computeProduct(product) {
      if (product.modifiersGroups !== undefined && product.modifiersGroups.length > 0) {
        /**
         * this will compute the total of each modifier
         * and additionnate with the actual product total.
         */
        var additionalPrice = 0;

        if (product.modifiersGroups.length > 0) {
          product.modifiersGroups.forEach(function (group) {
            group.modifiers.forEach(function (modifier) {
              additionalPrice += modifier.total_price;
            });
          });
        }

        product.modifiers_total = additionalPrice * product.quantity;
        product.modifiers_net_total = additionalPrice * product.quantity;
        product.modifiers_gross_total = additionalPrice * product.quantity;
        product.total_price = (product.unit_price + additionalPrice) * product.quantity;
        product.total_price_with_tax = (product.unit_price + additionalPrice) * product.quantity;
        product.total_price_without_tax = (product.unit_price + additionalPrice) * product.quantity;
      }
    }
  }, {
    key: "buildModifierVue",
    value: function buildModifierVue(order) {
      var _this5 = this;

      order.products.forEach(function (product, index) {
        var productLineDom = document.querySelector("[product-index=\"".concat(index, "\"]"));
        /**
         * in case the cart is not visible
         * we should't proceed.
         */

        if (productLineDom === null) {
          return false;
        }
        /**
         * if the modifier group has been
         * previously added, we'll remove that
         */


        if (productLineDom.querySelector('.modifier-container') !== null) {
          productLineDom.querySelector('.modifier-container').remove();
        }

        _this5.injectModifiersGroups(product, index);

        _this5.injectCutleryOptions(product, index);
      });
    }
    /**
     * replaces the "Hold" button into a "To Kitchen" button.
     * Gives the choice to hold the button once pressed.
     */

  }, {
    key: "injectSendToKitchenPopup",
    value: function injectSendToKitchenPopup() {
      nsHooks.addFilter('ns-hold-queue', 'gastro-inject-send-to-kitchen', function (queues) {
        queues.push(_classes_SendToKitchenQueue__WEBPACK_IMPORTED_MODULE_2__.SendToKitchenQueue);
        return queues;
      });
    }
  }, {
    key: "injectModifiersGroups",
    value: function injectModifiersGroups(product, index) {
      if (product.modifiersGroups && product.modifiersGroups.length > 0) {
        var productLineDom = document.querySelector("[product-index=\"".concat(index, "\"]"));
        /**
         * Let's create a new wrapper and
         * append it to the product details container.
         */

        var modifierContainer = document.createElement('div');
        modifierContainer.className = 'modifier-container mt-2 text-sm cursor-pointer';
        modifierContainer.setAttribute('product-reference', index);
        productLineDom.querySelector('div').appendChild(modifierContainer);
        /**
         * Let's loop modifiers
         * and make sure to add them to modifier container.
         */

        product.modifiersGroups.forEach(function (group) {
          group.modifiers.forEach(function (modifier) {
            var modifierTemplate = document.createElement('template');
            var html = "\n                    <div class=\"single-modifier p-1 flex justify-between\">\n                        <span>".concat(group.name, " : ").concat(modifier.name, " (x").concat(modifier.quantity, ")</span>\n                        <div class=\"flex\">\n                            <span>").concat(Vue.filter('currency')(modifier.total_price), "</span>\n                            <ns-close-button></ns-close-button>\n                        </div>\n                    </div>\n                    ");
            modifierTemplate.innerHTML = html.trim();
            productLineDom.querySelector('.modifier-container').appendChild(modifierTemplate.content.firstChild);
          });
        });
        modifierContainer.addEventListener('click', function () {
          return __awaiter(this, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
            var productIndex, product, modifierPromise, response, data;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    productIndex = this.getAttribute('product-reference');
                    product = POS.order.getValue().products[productIndex];
                    _context2.prev = 2;
                    modifierPromise = new _classes_ModifierPromise__WEBPACK_IMPORTED_MODULE_1__.ModifierPromise(product);
                    _context2.next = 6;
                    return modifierPromise.run(product);

                  case 6:
                    response = _context2.sent;
                    data = Object.assign(Object.assign({}, product), response);
                    POS.updateProduct(product, data, productIndex);
                    _context2.next = 14;
                    break;

                  case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2["catch"](2);
                    console.log(_context2.t0);

                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[2, 11]]);
          }));
        });
      }
    }
  }, {
    key: "injectCutleryOptions",
    value: function injectCutleryOptions(product, index) {
      var _this6 = this;

      var productLineDom = document.querySelector("[product-index=\"".concat(index, "\"]"));

      if (productLineDom.querySelectorAll('.cutlery-options').length === 0) {
        var modifierTemplate = document.createElement('template');
        var html = "\n                <div class=\"px-1 cutlery-options\">\n                    <a class=\"hover:text-blue-600 cursor-pointer outline-none border-dashed py-1 border-b  text-sm border-blue-400\">\n                        <i class=\"las la-utensils text-xl\"></i>\n                    </a>\n                </div>\n            ";
        modifierTemplate.innerHTML = html.trim();
        productLineDom.querySelector('.product-options').appendChild(modifierTemplate.content.firstChild);
        /**
         * add an events listener to cutlery icon
         * to display meals options.
         */

        productLineDom.querySelector('.cutlery-options a').addEventListener('click', function () {
          return __awaiter(_this6, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
            var response;
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return new Promise(function (resolve, reject) {
                      Popup.show(gastroPosMeal, {
                        resolve: resolve,
                        reject: reject,
                        product: product
                      });
                    });

                  case 3:
                    response = _context3.sent;
                    _context3.next = 9;
                    break;

                  case 6:
                    _context3.prev = 6;
                    _context3.t0 = _context3["catch"](0);
                    console.log(_context3.t0);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, null, [[0, 6]]);
          }));
        });
      }
    }
  }]);

  return Gastro;
}();
/**
 * when the DOM is ready
 * to be loaded.
 */


window['Gastro'] = new Gastro();
document.addEventListener('DOMContentLoaded', function () {
  window['Gastro'].boot();
});

/***/ }),

/***/ "./Resources/ts/classes/ModifierPromise.ts":
/*!*************************************************!*\
  !*** ./Resources/ts/classes/ModifierPromise.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModifierPromise": () => (/* binding */ ModifierPromise)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var gastroModifierGroup = (__webpack_require__(/*! ./../components/gastro-modifier-group.vue */ "./Resources/ts/components/gastro-modifier-group.vue")["default"]);

var ModifierPromise = /*#__PURE__*/function () {
  function ModifierPromise(product) {
    _classCallCheck(this, ModifierPromise);

    this.product = product;
  }

  _createClass(ModifierPromise, [{
    key: "run",
    value: function run(queueData) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        return __awaiter(_this, void 0, void 0, /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          var product, modifiers, modifiersGroups, index;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  product = this.product;

                  if (!(product.$original().gastro_item_type === 'product' && product.$original().modifiers_groups.length > 0)) {
                    _context.next = 21;
                    break;
                  }

                  modifiers = JSON.parse(product.$original().modifiers_groups);
                  modifiersGroups = new Array();
                  _context.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().keys(modifiers);

                case 5:
                  if ((_context.t1 = _context.t0()).done) {
                    _context.next = 20;
                    break;
                  }

                  index = _context.t1.value;
                  _context.prev = 7;
                  _context.t2 = modifiersGroups;
                  _context.next = 11;
                  return this.loadModifier(modifiers[index], product);

                case 11:
                  _context.t3 = _context.sent;

                  _context.t2.push.call(_context.t2, _context.t3);

                  _context.next = 18;
                  break;

                case 15:
                  _context.prev = 15;
                  _context.t4 = _context["catch"](7);
                  return _context.abrupt("return", reject(_context.t4));

                case 18:
                  _context.next = 5;
                  break;

                case 20:
                  return _context.abrupt("return", resolve({
                    modifiersGroups: modifiersGroups
                  }));

                case 21:
                  return _context.abrupt("return", resolve({}));

                case 22:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[7, 15]]);
        }));
      });
    }
  }, {
    key: "loadModifier",
    value: function loadModifier(id, product) {
      return new Promise(function (resolve, reject) {
        Popup.show(gastroModifierGroup, {
          resolve: resolve,
          reject: reject,
          product: product,
          modifierGroupId: id
        });
      });
    }
    /**
     * compute product by mutating the product price value
     * @deprecated
     * @param modifiersGroups modifiers groups
     * @param queueData product data
     */

  }, {
    key: "computeProduct",
    value: function computeProduct(modifiersGroups, queueData) {
      var finalObject = new Object();
      ['excl_tax_sale_price', 'excl_tax_wholesale_price', 'incl_tax_sale_price', 'incl_tax_wholesale_price', 'sale_price', 'sale_price_edit', 'sale_price_tax', 'wholesale_price', 'wholesale_price_edit', 'wholesale_price_tax'].forEach(function (item) {
        finalObject[item] = Object.values(modifiersGroups).map(function (group) {
          return group.modifiers.map(function (modifier) {
            return modifier.unit_quantities[0][item] * modifier.quantity;
          });
        }).flat().reduce(function (before, after) {
          return before + after;
        }) + queueData.$quantities()[item];
      });
      /**
       * We've updated the prices as the modifier
       * has been added to the product.
       */

      var $quantities = function $quantities() {
        return Object.assign(Object.assign({}, queueData.$quantities()), finalObject);
      };

      return $quantities;
    }
  }]);

  return ModifierPromise;
}();

/***/ }),

/***/ "./Resources/ts/classes/SendToKitchenQueue.ts":
/*!****************************************************!*\
  !*** ./Resources/ts/classes/SendToKitchenQueue.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SendToKitchenQueue": () => (/* binding */ SendToKitchenQueue)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SendToKitchenQueue = /*#__PURE__*/function () {
  function SendToKitchenQueue(order) {
    _classCallCheck(this, SendToKitchenQueue);

    this.order = order;
  }

  _createClass(SendToKitchenQueue, [{
    key: "run",
    value: function run() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        Popup.show(nsConfirmPopup, {
          title: 'Send the order to the kitchen',
          message: "An order send to the kitchen can be seen and cooked by kitchen staff.",
          onAction: function onAction(action) {
            if (action) {
              _this.order.gastro_order_status = 'pending';
              resolve(true);
            } else {
              _this.order.gastro_order_status = 'hold';
              reject(false);
            }
          }
        });
      });
    }
  }]);

  return SendToKitchenQueue;
}();

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-add-buttons.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-add-buttons.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: '',
  data: function data() {
    return {
      selectedOrder: null,
      subscription: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.subscription = Gastro.selectedOrder.subscribe(function (order) {
      _this.selectedOrder = order;
    });
  },
  methods: {
    __m: __m,
    cancelAddToOrder: function cancelAddToOrder() {
      Gastro.selectedOrder.next({});
      Gastro.setAddButtonsVisibility('hidden');
      POS.reset();
    },
    submitAddToOrder: function submitAddToOrder() {
      var _this2 = this;

      var products = POS.products.getValue();

      if (products.length === 0) {
        return nsSnackBar.error(__m('Unable to submit if the cart is empty.', 'NsGastro'), null, {
          duration: 4000
        }).subscribe();
      }

      Popup.show(nsConfirmPopup, {
        title: __m('Confirm Your Action', 'NsGastro'),
        message: __m('Would you like to add {products} items to the order {order}', 'NsGastro').replace('{products}', products.length).replace('{order}', this.selectedOrder.code),
        onAction: function onAction(action) {
          if (action) {
            nsHttpClient.post("/api/nexopos/v4/gastro/orders/".concat(_this2.selectedOrder.id, "/add-products"), {
              products: products
            }).subscribe(function (result) {
              nsSnackBar.success(result.message, 'OK', {
                duration: 3000
              }).subscribe();
              /**
               * We'll print only the new
               * item that has been added to the order
               */

              Gastro.printOrderToKichen(_this2.selectedOrder.id, result.data.orderProducts.map(function (product) {
                return product.id;
              }));

              _this2.cancelAddToOrder();
            }, function (error) {
              nsSnackBar.error(error.message || __m('An unexpected error occured', 'NsGastro'), 'OK', {
                duration: 0
              }).subscribe();
            });
          }
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-keyboard.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-keyboard.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-keyboard',
  data: function data() {
    return {
      keyboardComponent: function keyboardComponent() {
        return nsComponents.nsNumpad;
      }
    };
  },
  methods: {
    __m: __m,
    closePopup: function closePopup() {
      this.$popupParams.reject(false);
      this.$popup.close();
    },
    updateModifierQuantity: function updateModifierQuantity(quantity) {
      this.modifier.quantity = quantity;
      this.$forceUpdate();
    },
    saveQuantity: function saveQuantity(quantity) {
      if (parseFloat(quantity) > 0) {
        this.modifier.quantity = parseFloat(this.modifier.quantity);
        this.$popup.close();
        this.$popupParams.resolve(this.modifier);
      } else {
        nsSnackBar.error(__m('Invalid quantity provided.', 'NsGastro')).subscribe();
      }
    }
  },
  computed: {
    modifier: function modifier() {
      return this.$popupParams.modifier;
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var _methods;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-kitchen-settings',
  data: function data() {
    console.log(this);
    return {
      validation: new FormValidation(),
      fields: []
    };
  },
  computed: {
    title: function title() {
      return this.$popupParams.title || __m('Untitled Popup', 'NsGastro');
    }
  },
  mounted: function mounted() {
    this.fields = this.validation.createFields(this.$popupParams.fields);
    this.popupCloser();
  },
  methods: (_methods = {
    __m: __m,
    popupResolver: popupResolver,
    popupCloser: popupCloser,
    saveForm: function saveForm() {
      // nsHttpClient
      this.popupResolver(this.validation.extractFields(this.fields));
    }
  }, _defineProperty(_methods, "popupCloser", popupCloser), _defineProperty(_methods, "popupResolver", popupResolver), _defineProperty(_methods, "closePopup", function closePopup() {
    this.popupResolver(false);
  }), _methods)
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_pos_merge_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-merge.vue */ "./Resources/ts/components/gastro-pos-merge.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    __m: __m,
    openMergeOrderPopup: function openMergeOrderPopup() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_pos_merge_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    resolve: resolve,
                    reject: reject
                  });
                });

              case 3:
                result = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_keyboard_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-keyboard.vue */ "./Resources/ts/components/gastro-keyboard.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-modifier-group',
  mounted: function mounted() {
    this.loadModifierGroup();
  },
  data: function data() {
    return {
      modifierGroup: null
    };
  },
  methods: {
    __m: __m,
    select: function select(modifier) {
      var _this = this;

      if (!this.modifierGroup.multiselect) {
        var index = this.modifierGroup.modifiers.indexOf(modifier);
        this.modifierGroup.modifiers.forEach(function (_modifier, _index) {
          if (_index !== index) {
            _modifier.selected = false;
            _modifier.quantity = 0;
          }
        });
      }

      modifier.selected = !modifier.selected;

      if (this.modifierGroup.countable) {
        if (modifier.selected) {
          new Promise( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(resolve, reject) {
              return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.prev = 0;
                      _context.next = 3;
                      return Popup.show(_gastro_keyboard_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
                        resolve: resolve,
                        reject: reject,
                        modifier: modifier,
                        product: _this.$popupParams.product
                      });

                    case 3:
                      modifier = _context.sent;
                      _context.next = 10;
                      break;

                    case 6:
                      _context.prev = 6;
                      _context.t0 = _context["catch"](0);
                      console.log(_context.t0);
                      modifier.selected = false;

                    case 10:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, null, [[0, 6]]);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        } else {
          modifier.quantity = 0;
        }
      } else {
        if (modifier.selected) {
          modifier.quantity = 1;
        } else {
          modifier.quantity = 0;
        }
      }
    },
    loadModifierGroup: function loadModifierGroup() {
      var _this2 = this;

      nsHttpClient.get("/api/nexopos/v4/gastro/modifiers-groups/".concat(this.$popupParams.modifierGroupId)).subscribe(function (result) {
        result.modifiers = result.modifiers.map(function (modifier) {
          modifier.modifier_id = modifier.id;
          /**
           * we delete the id reference as it should point to the entries
           * stored within the "nexopos_orders_products_modifiers".
           */

          delete modifier.id;
          var reference = [];

          if (_this2.$popupParams.product.modifiersGroups) {
            /**
             * attempt to find if the group is already attached
             * to the product so we can pull that.
             */
            var group = _this2.$popupParams.product.modifiersGroups.filter(function (_group) {
              return _group.modifier_group_id === _this2.$popupParams.modifierGroupId;
            });
            /**
             * We'll check fi the group length
             */


            if (group.length > 0) {
              reference = group[0].modifiers.filter(function (m) {
                return m.modifier_id === modifier.modifier_id;
              });
            }
          }

          modifier.selected = reference.length === 0 ? false : reference[0].selected;
          modifier.quantity = reference.length === 0 ? 0 : reference[0].quantity;
          return modifier;
        });
        _this2.modifierGroup = result;
      }, function (error) {
        nsSnackBar.error(error.message || 'An unexpected error has occured.').subscribe();
      });
    },
    nextStep: function nextStep() {
      var group = this.modifierGroup;
      /**
       * if the modifier is required
       * you need to select one before proceeding.
       */

      if (this.modifierGroup.modifiers.filter(function (m) {
        return m.selected;
      }).length === 0 && parseInt(group.forced) === 1) {
        return nsSnackBar.error('You must select a modifier before proceeding.').subscribe();
      }
      /**
       * We need to specify quantity
       * for the provided modifier
       */


      if (this.modifierGroup.modifiers.filter(function (m) {
        return m.selected;
      }).length > 0 && parseInt(group.countable) === 1 && parseInt(group.forced) === 1) {
        var total = this.modifierGroup.modifiers.map(function (m) {
          return m.quantity;
        }).reduce(function (before, after) {
          return before + after;
        });

        if (total <= 0) {
          return nsSnackBar.error('The current modifier group is require modifier with valid quantities.').subscribe();
        }
      }
      /**
       * make sure to only return
       * the modifiers that are selected.
       */


      group.modifier_group_id = group.id;
      group.modifiers = group.modifiers.filter(function (m) {
        return m.selected;
      });
      group.modifiers.forEach(function (modifier) {
        modifier.unit_price = modifier.unit_quantities[0].sale_price;
        modifier.unit_quantity_id = modifier.unit_quantities[0].id;
        modifier.unit_id = modifier.unit_quantities[0].unit_id;
        modifier.total_price = modifier.unit_quantities[0].sale_price * modifier.quantity;
      });
      delete group.id;
      this.$popupParams.resolve(group);
      this.$popup.close();
    },
    close: function close() {
      this.$popupParams.reject(false);
      this.$popup.close();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-meal.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-meal.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-pos-meal',
  mounted: function mounted() {
    var _this = this;

    this.$popup.event.subscribe(function (action) {
      if (action.event === 'click-overlay') {
        _this.closePopup();
      }
    });
  },
  methods: {
    __m: __m,
    closePopup: function closePopup() {
      this.$popupParams.reject(false);
      this.$popup.close();
    },
    printKitchen: function printKitchen() {
      var product = this.$popupParams.product;

      if (['pending', 'ongoing'].includes(product.cooking_status) && product.id !== undefined) {}

      nsSnackBar.error('Unable to print a meal that is not yet send at the kitchen or which is already cooked.').subscribe();
    },
    cancelMeal: function cancelMeal() {
      var product = this.$popupParams.product;

      if (['pending', 'ongoing'].includes(product.cooking_status) && product.id !== undefined) {}

      nsSnackBar.error('Unable to cancel a meal that is not send to the kitchen or which is already cookied.').subscribe();
    },
    addProductNote: function addProductNote() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(nsPromptPopup, {
                    resolve: resolve,
                    reject: reject,
                    input: _this2.$popupParams.product.cooking_note,
                    title: 'Meal Note',
                    message: 'The following note will be visible at the kitchen and on the kitchen slip.',
                    onAction: function onAction(output) {
                      resolve(output);
                    }
                  });
                });

              case 3:
                result = _context.sent;

                if (result !== false) {
                  _this2.$popupParams.product.cooking_note = result;
                }

                _this2.closePopup();

                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-merge.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-merge.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-pos-merge',
  watch: {
    search: function search() {
      var _this = this;

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(function () {
        _this.searchOrderWithQuery(_this.search);
      }, 500);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.popupCloser();
    this.$refs.searchField.focus();
    this.$refs.searchField.addEventListener('blur', function () {
      setTimeout(function () {
        _this2.searchResults = [];
      }, 300);
    });
    RxJS.forkJoin([this.loadCustomers(), this.loadOrderType(), this.loadTables()]).subscribe(function (result) {
      _this2.customers = result[0].map(function (customer) {
        return {
          label: customer.name,
          value: customer.id
        };
      });
      _this2.orderTypes = Object.values(result[1].types).map(function (type) {
        return {
          label: type.label,
          value: type.identifier
        };
      });
      _this2.tables = result[2].map(function (table) {
        return {
          label: table.name,
          value: table.id
        };
      });

      _this2.buildFields();
    });
  },
  data: function data() {
    return {
      search: '',
      searchResults: [],
      validation: new FormValidation(),
      orderFields: [],
      queuedOrders: [],
      customers: [],
      totalOrders: 0,
      totalProducts: 0,
      tables: [],
      orderTypes: [],
      typeLabels: {},
      mergeResult: {}
    };
  },
  methods: {
    __m: __m,
    popupCloser: popupCloser,
    popupResolver: popupResolver,

    /**
     * We want to be able to detect wether 
     * the order type is set to "dine-in" for injecting
     * tables.
     */
    detectOrderType: function detectOrderType(field) {
      if (field.name === 'type') {
        if (field.value === 'dine-in') {
          /**
           * @todo we need to make sure
           * to skip this if the tables are disabled.
           */
          this.orderFields.push({
            label: __m('Table', 'NsGastro'),
            name: 'table_id',
            type: 'select',
            options: this.tables,
            description: __m('Assign the order to a table.', 'NsGastro'),
            validation: 'required'
          });
        } else {
          var _field = this.orderFields.filter(function (f) {
            return f.name == 'table_id';
          });

          if (_field.length > 0) {
            var index = this.orderFields.indexOf(_field[0]);
            this.orderFields.splice(index, 1);
          }
        }
      }
    },
    submitOrderMerging: function submitOrderMerging() {
      var _this3 = this;

      if (this.queuedOrders.length < 2) {
        return nsSnackBar.error(__m('There should be at least 2 queued orders for merging.', 'NsGastro')).subscribe();
      }

      if (this.queuedOrders.length > 5) {
        return nsSnackBar.error(__m('At most 5 orders can be merged.', 'NsGastro')).subscribe();
      }

      if (!this.validation.validateFields(this.orderFields)) {
        return nsSnackBar.error(__m('Unable to proceed the form is not valid.', 'NsGastro')).subscribe();
      }

      Popup.show(nsConfirmPopup, {
        title: __m('Confirm Your Action', 'NsGastro'),
        message: __m("The provided order will be merged. Note that this operation can't be undone", 'NsGastro'),
        onAction: function onAction(action) {
          if (action) {
            _this3.proceedOrderMerging();
          }
        }
      });
    },
    proceedOrderMerging: function proceedOrderMerging() {
      var _this4 = this;

      nsHttpClient.post("/api/nexopos/v4/gastro/orders/merge", {
        orders: this.queuedOrders,
        fields: this.validation.extractFields(this.orderFields)
      }).subscribe(function (result) {
        _this4.mergeResult = result.data;
        nsSnackBar.success(__m("The orders has been marged into {order} successfully.", 'NsGastro').replace('{order}', result.data.order.code), __m('Ok', 'NsGastro'), {
          duraton: 10000
        }).subscribe();

        _this4.popupResolver(true);
      }, function (error) {
        nsSnackBar.error(__m('An unexpected error has occured.', 'NsGastro')).subscribe();
      });
    },
    removeOrderFromQueue: function removeOrderFromQueue(order) {
      var index = this.queuedOrders.indexOf(order);
      this.queuedOrders.splice(index, 1);
      this.computeOrders();
    },
    buildFields: function buildFields() {
      this.orderFields = this.validation.createFields([{
        label: __m('Customer', 'NsGastro'),
        name: 'customer_id',
        type: 'select',
        options: this.customers,
        description: __m('Assign a customer to the order.', 'NsGastro')
      }, {
        label: __m('Name', 'NsGastro'),
        name: 'name',
        type: 'text',
        description: __m('Define the order name. Might be useful to retreive the order.', 'NsGastro')
      }, {
        label: __m('Order Type', 'NsGastro'),
        name: 'type',
        type: 'select',
        options: this.orderTypes,
        description: __m('Set what is the order type.', 'NsGastro')
      }]);
    },
    computeOrders: function computeOrders() {
      if (this.queuedOrders.length > 0) {
        this.totalOrders = this.queuedOrders.map(function (order) {
          return order.total;
        }).reduce(function (before, after) {
          return before + after;
        });
        this.totalProducts = this.queuedOrders.map(function (order) {
          return order.products.map(function (p) {
            return p.quantity;
          }).flat();
        }).flat().reduce(function (before, after) {
          return before + after;
        });
      } else {
        this.totalOrders = 0;
        this.totalProducts = 0;
      }
    },
    getOrderType: function getOrderType(type) {
      return this.typeLabels[type] || __m('Unknown', 'NsGastro');
    },
    loadCustomers: function loadCustomers() {
      return nsHttpClient.get("/api/nexopos/v4/customers");
    },
    loadOrderType: function loadOrderType() {
      return nsHttpClient.get("/api/nexopos/v4/gastro/order-types");
    },

    /**
     * Will load all the orders
     * currently available on the system
     * @return void
     */
    loadTables: function loadTables() {
      return nsHttpClient.get("/api/nexopos/v4/gastro/tables");
    },
    addToTheQueue: function addToTheQueue(order) {
      var _this5 = this;

      var ids = this.queuedOrders.map(function (order) {
        return order.id;
      });
      this.search = '';

      if (ids.includes(order.id)) {
        return nsSnackBar.error(__m('The order has already been added to the queue.', 'NsGastro')).subscribe();
      }

      order.products = [];
      this.queuedOrders.push(order);
      nsHttpClient.get("/api/nexopos/v4/gastro/orders/".concat(order.id, "/products")).subscribe(function (products) {
        order.products = products;

        _this5.computeOrders();
      });
    },
    searchOrderWithQuery: function searchOrderWithQuery(term) {
      var _this6 = this;

      if (term.length > 0) {
        nsHttpClient.get("/api/nexopos/v4/gastro/orders/search?search=".concat(term)).subscribe(function (result) {
          if (result.length === 0) {
            _this6.$refs.searchField.focus();

            _this6.$refs.searchField.select();

            nsSnackBar.info(__m('No results match your query, please try again.', 'NsGastro', 'OK', {
              duration: 4000
            })).subscribe();
          }

          _this6.searchResults = result;
        }, function (error) {
          return nsSnacBar.error(__m('An error has occured while searching orders', 'NsGastro'), 'OK', {
            duration: 4000
          }).subscribe();
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-move.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-move.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-pos-order-move',
  data: function data() {
    return {
      order: null,
      tableName: '',
      watchTimeout: null,
      tables: []
    };
  },
  watch: {
    tableName: function tableName() {
      var _this = this;

      clearTimeout(this.watchTimeout);
      this.watchTimeout = setTimeout(function () {
        _this.searchTables(_this.tableName);
      }, 1000);
    }
  },
  methods: {
    popupResolver: popupResolver,
    popupCloser: popupCloser,
    __m: __m,
    closePopup: function closePopup() {
      this.popupResolver(false);
    },
    moveTo: function moveTo(table) {
      var _this2 = this;

      Popup.show(nsConfirmPopup, {
        title: __m("Move The Order To \"{table}\" ?", 'NsGastro').replace('{table}', table.name),
        message: __m('The order will be moved to a new table. Would you like to confirm ? ', 'NsGastro'),
        onAction: function onAction(action) {
          if (action) {
            _this2.proceedMove(_this2.order, table);
          }
        }
      });
    },
    proceedMove: function proceedMove(order, table) {
      var _this3 = this;

      nsHttpClient.post("/api/nexopos/v4/gastro/orders/".concat(order.id, "/change-table"), {
        table_id: table.id
      }).subscribe(function (result) {
        nsSnackBar.success(result.message, 'OK', {
          duration: 3000
        }).subscribe();

        _this3.popupResolver(true);
      }, function (error) {
        var message = error.message || __m('An unexpected error occured while moving the order.', 'NsGastro');

        nsSnackBar.error(message, 'OK', {
          duration: 3000
        }).subscribe();
      });
    },
    searchTables: function searchTables(search) {
      var _this4 = this;

      nsHttpClient.post("/api/nexopos/v4/gastro/tables/search", {
        search: search
      }).subscribe(function (tables) {
        _this4.tables = tables;
      });
    }
  },
  mounted: function mounted() {
    this.popupCloser();
    this.order = this.$popupParams.order;
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-options.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-options.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_pos_order_move_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-order-move.vue */ "./Resources/ts/components/gastro-pos-order-move.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-pos-order-options',
  data: function data() {
    var _this = this;

    return {
      options: nsHooks.applyFilters('ns-gastro-order-options', [{
        label: __m('Move', 'NsGastro'),
        icon: 'la-expand-arrows-alt ',
        onClick: function onClick(order) {
          return _this.moveOrder(order);
        }
      }, {
        label: __m('Request', 'NsGastro'),
        icon: 'la-mitten',
        onClick: function onClick(order) {
          return _this.requestOrder(order);
        }
      }]),
      order: null
    };
  },
  mounted: function mounted() {
    this.popupCloser();
    this.order = this.$popupParams.order;
    this.popupCloser();
  },
  methods: {
    __m: __m,
    popupCloser: popupCloser,
    popupResolver: popupResolver,
    closePopup: function closePopup() {
      this.popupResolver(false);
    },
    requestOrder: function requestOrder(order) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(order.gastro_order_status !== 'ready')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", nsSnackBar.error(__m('Unable to request an order that is not ready.', 'NsGastro')).subscribe());

              case 2:
                Popup.show(nsConfirmPopup, {
                  title: __m('Confirm Request', 'NsGastro'),
                  message: __m('The request will be submitted to the kitchen.', 'NsGastro'),
                  onAction: function onAction(action) {
                    if (action) {
                      nsHttpClient.get("/api/nexopos/v4/gastro/orders/".concat(order.id, "/request")).subscribe(function (result) {
                        _this2.popupResolver(true);

                        nsSnackBar.success(result.message, __m('Ok', 'NsGastro'), {
                          duration: 3000
                        }).subscribe();
                      }, function (error) {
                        nsSnackBar.error(error.message || __m('An unexpected error has occured.', 'NsGastro'), __m('Ok', 'NsGastro'), {
                          duration: 3000
                        }).subscribe();
                      });
                    }
                  }
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    moveOrder: function moveOrder(order) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_pos_order_move_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    resolve: resolve,
                    reject: reject,
                    $parent: _this3,
                    order: order
                  });
                });

              case 3:
                result = _context2.sent;

                _this3.popupResolver(true);

                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_pos_ready_meals_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-ready-meals.vue */ "./Resources/ts/components/gastro-pos-ready-meals.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "gastro-pos-orders-button",
  data: function data() {
    return {
      readyMeals: 0
    };
  },
  methods: {
    __m: __m,
    openReadyOrder: function openReadyOrder() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_pos_ready_meals_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    resolve: resolve,
                    reject: reject
                  });
                });

              case 3:
                result = _context.sent;
                _context.next = 8;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }))();
    },
    getReadyMealCount: function getReadyMealCount() {
      var _this = this;

      nsHttpClient.get("/api/nexopos/v4/gastro/products/count-ready").subscribe(function (result) {
        _this.readyMeals = result.readyMeals;
      });
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.getReadyMealCount();

    if (typeof Echo !== 'undefined') {
      Echo["private"]("ns.private-channel").listen('Modules\\NsGastro\\Events\\KitchenAfterUpdatedOrderEvent', function (e) {
        console.log(e);

        _this2.getReadyMealCount();
      });
    } else {
      setInterval(function () {
        _this2.getReadyMealCount();
      }, 10000);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-product-options.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-product-options.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "gastro-pos-product-options",
  computed: {
    product: function product() {
      return this.$popupParams.product;
    }
  },
  mounted: function mounted() {
    this.popupCloser();
  },
  methods: {
    __m: __m,
    popupResolver: popupResolver,
    popupCloser: popupCloser,
    updateNote: function updateNote() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var note;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this.product.cooking_status !== 'pending')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", nsSnackBar.error(__m('Unable to edit this product notes.', 'NsGastro')).subscribe());

              case 2:
                _context.prev = 2;
                _context.next = 5;
                return new Promise(function (resolve, reject) {
                  Popup.show(nsPromptPopup, {
                    resolve: resolve,
                    reject: reject,
                    input: _this.product.cooking_note,
                    title: 'Meal Note',
                    message: 'The following note will be visible at the kitchen and on the kitchen slip.',
                    onAction: function onAction(output) {
                      resolve(output);
                    }
                  });
                });

              case 5:
                note = _context.sent;
                _this.product.cooking_note = note;
                nsHttpClient.post("/api/nexopos/v4/gastro/products/".concat(_this.product.id, "/note"), {
                  note: note
                }).subscribe(function (result) {
                  _this.popupResolver(_this.product);

                  nsSnackBar.success(result.message).subscribe();
                }, function (error) {
                  nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
                });
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }))();
    },
    serveMeal: function serveMeal() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.product.cooking_status !== 'ready')) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", nsSnackBar.error(__m('Unable to serve a meal that is not ready.', 'NsGastro')).subscribe());

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return new Promise(function (resolve, reject) {
                  Popup.show(nsConfirmPopup, {
                    title: __m('Would You Serve The Meal ?', 'NsGastro'),
                    resolve: resolve,
                    reject: reject,
                    message: __m("You're about to serve the meal \"{product}\". note that this operation can't be canceled.", 'NsGastro').replace('{product}', _this2.product.name),
                    onAction: function onAction(action) {
                      if (action) {
                        nsHttpClient.post("/api/nexopos/v4/gastro/products/".concat(_this2.product.id, "/serve"), {
                          reason: action
                        }).subscribe(function (result) {
                          nsSnackBar.success(result.message).subscribe();

                          _this2.popupResolver(result);
                        }, function (error) {
                          nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
                        });
                      }
                    }
                  });
                });

              case 5:
                result = _context2.sent;
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 8]]);
      }))();
    },
    printCanceledMeal: function printCanceledMeal(order_id) {
      Gastro.printOrderCanceledMealKitchen(order_id);
    },
    cancelMeal: function cancelMeal() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(_this3.product.cooking_status === 'canceled')) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", nsSnackBar.error(__m('Unable to cancel an already canceled product.', 'NsGastro')).subscribe());

              case 2:
                _context3.prev = 2;
                _context3.next = 5;
                return new Promise(function (resolve, reject) {
                  Popup.show(nsPromptPopup, {
                    title: __m('Confirm Your Action', 'NsGastro'),
                    resolve: resolve,
                    reject: reject,
                    message: __m("You're about to cancel \"{product}\". Please provide a reason for this action.", 'NsGastro').replace('{product}', _this3.product.name),
                    onAction: function onAction(action) {
                      if (typeof action === 'string') {
                        nsHttpClient.post("/api/nexopos/v4/gastro/products/".concat(_this3.product.id, "/cancel"), {
                          reason: action
                        }).subscribe(function (result) {
                          nsSnackBar.success(result.message).subscribe();
                          _this3.product = result.data.product;
                        }, function (error) {
                          nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
                        });
                      }
                    }
                  });
                });

              case 5:
                result = _context3.sent;
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 8]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-pos-ready-meals',
  mounted: function mounted() {
    this.popupCloser();
    this.getReadyMeals();
  },
  data: function data() {
    return {
      response: null,
      prevPage: null,
      nextPage: null,
      loaded: false
    };
  },
  methods: {
    __m: __m,
    popupCloser: popupCloser,
    popupResolver: popupResolver,
    serveMeal: function serveMeal(meal) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(nsConfirmPopup, {
                    resolve: resolve,
                    reject: reject,
                    title: __m('Would You Mark As Served ?', 'NsGastro'),
                    message: __m('The meal will be marked as served. Please confirm your action.', 'NsGastro'),
                    onAction: function onAction(action) {
                      if (action) {
                        nsHttpClient.post("/api/nexopos/v4/gastro/products/".concat(meal.id, "/serve")).subscribe(function (result) {
                          var link = _this.response.links.filter(function (link) {
                            return parseInt(link.label) === parseInt(_this.response.current_page);
                          });

                          if (link.length === 1) {
                            _this.gotToPage(link[0]);
                          } else {
                            _this.getReadyMeals();
                          }

                          nsSnackBar.success(result.message).subscribe();
                        }, function (error) {
                          nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
                        });
                      }
                    }
                  });
                });

              case 3:
                result = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }))();
    },
    markListedAsServed: function markListedAsServed() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this2.response.data.length === 0)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", nsSnackBar.error(__m('There is nothing to mark as served.', 'NsGastro')).subscribe());

              case 2:
                _context2.prev = 2;
                _context2.next = 5;
                return new Promise(function (resolve, reject) {
                  var products = _this2.response.data.map(function (entry) {
                    return entry.id;
                  });

                  Popup.show(nsConfirmPopup, {
                    resolve: resolve,
                    reject: reject,
                    title: __m('Confirm Yout Action ?', 'NsGastro'),
                    message: __m('Would you like to mark all listed products as served ?', 'NsGastro'),
                    onAction: function onAction(action) {
                      if (action) {
                        nsHttpClient.post("/api/nexopos/v4/gastro/products/serve", {
                          products: products
                        }).subscribe(function (result) {
                          var link = _this2.response.links.filter(function (link) {
                            return parseInt(link.label) === parseInt(_this2.response.current_page);
                          });

                          if (link.length === 1) {
                            _this2.gotToPage(link[0]);
                          } else {
                            _this2.getReadyMeals();
                          }

                          nsSnackBar.success(result.message).subscribe();
                        }, function (error) {
                          nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
                        });
                      }
                    }
                  });
                });

              case 5:
                result = _context2.sent;
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 8]]);
      }))();
    },
    getReadyMeals: function getReadyMeals() {
      var _this3 = this;

      this.loaded = false;
      nsHttpClient.get("/api/nexopos/v4/gastro/products/ready").subscribe(function (response) {
        _this3.loaded = true;
        _this3.response = response;
      }, function (error) {
        nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
      });
    },
    gotToPage: function gotToPage(link) {
      var _this4 = this;

      if (link.url !== null) {
        nsHttpClient.get(link.url).subscribe(function (response) {
          _this4.loaded = true;
          _this4.response = response;
        }, function (error) {
          nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-tables.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-tables.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "gastro-pos-tables",
  mounted: function mounted() {
    this.popupCloser();
  },
  methods: {
    __m: __m,
    popupCloser: popupCloser,
    popupResolver: popupResolver,
    closePopup: function closePopup() {
      this.popupResolver(false);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-seats.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-seats.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-keyboard',
  data: function data() {
    return {
      keyboardComponent: function keyboardComponent() {
        return nsComponents.nsNumpad;
      }
    };
  },
  methods: {
    __m: __m,
    closePopup: function closePopup() {
      this.$popupParams.reject(false);
      this.$popup.close();
    },
    updateModifierQuantity: function updateModifierQuantity(quantity) {
      this.table.selectedSeats = quantity;
      this.$forceUpdate();
    },
    saveQuantity: function saveQuantity(quantity) {
      if (parseFloat(quantity) > 0 && parseFloat(quantity) <= parseFloat(this.table.seats)) {
        this.table.selectedSeats = parseFloat(quantity);
        this.$popup.close();
        this.$popupParams.resolve(this.table);
      } else {
        nsSnackBar.error('Invalid seats provided.').subscribe();
      }
    }
  },
  computed: {
    selectedSeats: function selectedSeats() {
      return this.table.selectedSeats || 1;
    },
    table: function table() {
      return this.$popupParams.table;
    }
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-order.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-order.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return _objectSpread(_objectSpread({}, GastroSettings), {}, {
      search: '',
      searchTimeout: null,
      searchResults: [],
      selectedOrder: null,
      validation: new FormValidation(),
      orderProducts: [],
      splitResult: null,
      customers: [],
      tables: [],
      ordersPortions: [],
      slices: 0,
      splitSlice: 0,
      orderTypes: [],
      fields: [{
        type: 'number',
        label: __m('Slices', 'NsGastro'),
        description: __m('In how much parts the order should be split', 'NsGastro'),
        validation: 'required'
      }]
    });
  },
  computed: {
    sliceOrderSelected: function sliceOrderSelected() {
      return this.ordersPortions.filter(function (order) {
        return order.selected;
      }).length > 0;
    }
  },
  watch: {
    search: function search() {
      var _this = this;

      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(function () {
        _this.searchOrderWithQuery(_this.search);
      }, 500);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.popupCloser();
    this.$refs.searchField.focus();
    this.$refs.searchField.addEventListener('blur', function () {
      setTimeout(function () {
        _this2.searchResults = [];
      }, 300);
    });
  },
  methods: {
    __m: __m,
    popupCloser: popupCloser,
    popupResolver: popupResolver,

    /**
     * We want to be able to detect wether 
     * the order type is set to "dine-in" for injecting
     * tables.
     */
    detectOrderType: function detectOrderType(field, order) {
      if (field.name === 'type') {
        if (field.value === 'dine-in') {
          /**
           * @todo we need to make sure
           * to skip this if the tables are disabled.
           */
          order.fields.push({
            label: __m('Table', 'NsGastro'),
            name: 'table_id',
            type: 'select',
            options: this.tables,
            description: __m('Assign the order to a table.', 'NsGastro'),
            validation: 'required'
          });
        } else {
          var _field = order.fields.filter(function (f) {
            return f.name == 'table_id';
          });

          if (_field.length > 0) {
            var index = order.fields.indexOf(_field[0]);
            order.fields.splice(index, 1);
          }
        }
      }
    },

    /**
     * Will load all the orders
     * currently available on the system
     * @return void
     */
    loadTables: function loadTables() {
      var _this3 = this;

      nsHttpClient.get("/api/nexopos/v4/gastro/tables").subscribe(function (tables) {
        _this3.tables = tables.map(function (table) {
          return {
            label: table.name,
            value: table.id
          };
        });
      }, function (error) {
        return nsSnackBar.error(__m('An unexpected error has occured while fetching the tables.', 'NsGastro'), null, {
          duration: 3000
        }).subscribe();
      });
    },
    reduceProduct: function reduceProduct(product, order) {
      product.quantity--;

      if (product.quantity === 0) {
        var index = order.products.indexOf(product);
        order.products.splice(index, 1);
      }

      var totalModifiers = 0;

      if (product.modifiers.length > 0) {
        totalModifiers = product.modifiers.map(function (modifier) {
          return modifier.total_price;
        }).reduce(function (before, after) {
          return before + after;
        });
      }

      product.total_price = product.quantity * (product.unit_price + totalModifiers);
      this.orderProducts.forEach(function (_product) {
        if (_product.id === product.id) {
          _product.displayed_quantity += 1;
        }
      });
    },
    addProductToSelectedSlice: function addProductToSelectedSlice(product) {
      var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var selectedOrderSlice = this.ordersPortions.filter(function (order) {
        return order.selected;
      });
      var unselectedOrderSlices = this.ordersPortions.filter(function (order) {
        return !order.selected;
      });

      if (selectedOrderSlice.length > 0) {
        var existingProduct = selectedOrderSlice[0].products.filter(function (_product) {
          return _product.id === product.id;
        });
        var mapSimilarProducts = unselectedOrderSlices.map(function (order) {
          return order.products;
        }).flat().filter(function (_product) {
          return _product.id === product.id;
        });
        var totalAssignedQuantity = 0;

        if (mapSimilarProducts.length > 0) {
          totalAssignedQuantity = mapSimilarProducts.map(function (product) {
            return product.quantity;
          }).reduce(function (before, after) {
            return before + after;
          });
        }

        if (existingProduct.length > 0) {
          /**
           * To make sure the total assigned
           * quantity doesn't not exceed the available quantity
           * for the selected product.
           */
          if (product.quantity - (totalAssignedQuantity + (existingProduct[0].quantity + quantity)) <= -1) {
            return nsSnackBar.error(__m('Unable to add more quantity.', 'NsGastro')).subscribe();
          }

          existingProduct[0].quantity += quantity;
          var totalModifiers = 0;

          if (existingProduct[0].modifiers.length > 0) {
            totalModifiers = existingProduct[0].modifiers.map(function (modifier) {
              return modifier.total_price;
            }).reduce(function (before, after) {
              return before + after;
            });
          }

          existingProduct[0].total_price = (existingProduct[0].unit_price + totalModifiers) * existingProduct[0].quantity;
          product.displayed_quantity = product.quantity - existingProduct[0].quantity - totalAssignedQuantity;
        } else {
          /**
           * To make sure the total assigned
           * quantity doesn't not exceed the available quantity
           * for the selected product.
           */
          if (product.quantity - (totalAssignedQuantity + quantity) <= -1) {
            return nsSnackBar.error(__m('Unable to add more quantity.', 'NsGastro')).subscribe();
          }

          var isolatedReference = Object.assign({}, product);
          isolatedReference.quantity = quantity;
          var _totalModifiers = 0;

          if (isolatedReference.modifiers.length > 0) {
            _totalModifiers = isolatedReference.modifiers.map(function (modifier) {
              return modifier.total_price;
            }).reduce(function (before, after) {
              return before + after;
            });
          }

          isolatedReference.total_price = (isolatedReference.unit_price + _totalModifiers) * isolatedReference.quantity;
          selectedOrderSlice[0].products.push(isolatedReference);
          product.displayed_quantity = product.quantity - quantity - totalAssignedQuantity;
        }
      }
    },
    selectOrderslice: function selectOrderslice(order) {
      this.ordersPortions.forEach(function (order) {
        order.selected = false;
      });
      order.selected = true;
    },
    selectOrder: function selectOrder(order) {
      this.selectedOrder = order;
      this.searchResults = [];
      this.search = '';
      this.loadOrderProducts();
    },
    getOrderType: function getOrderType(type) {
      return this.typeLabels[type] || __m('Unknown', 'NsGastro');
    },
    loadCustomers: function loadCustomers() {
      var _this4 = this;

      nsHttpClient.get("/api/nexopos/v4/customers").subscribe(function (customers) {
        console.log(customers);
        _this4.customers = customers.map(function (customer) {
          return {
            label: customer.name,
            value: customer.id
          };
        });
      });
    },
    loadOrderProducts: function loadOrderProducts() {
      var _this5 = this;

      this.loadCustomers();
      this.loadOrderType();
      this.loadTables();
      nsHttpClient.get("/api/nexopos/v4/gastro/orders/".concat(this.selectedOrder.id, "/products")).subscribe(function (products) {
        _this5.orderProducts = products;

        _this5.orderProducts.forEach(function (product) {
          product.displayed_quantity = product.quantity;
        });

        _this5.$refs.sliceField.addEventListener('focus', function () {
          _this5.$refs.sliceField.select();
        });
      }, function (error) {
        nsSnackBar.error(error.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();
      });
    },
    loadOrderType: function loadOrderType() {
      var _this6 = this;

      nsHttpClient.get("/api/nexopos/v4/gastro/order-types").subscribe(function (result) {
        _this6.orderTypes = Object.values(result.types).map(function (type) {
          return {
            label: type.label,
            value: type.identifier
          };
        });
      });
    },
    proceedSplit: function proceedSplit() {
      var _this7 = this;

      if (this.ordersPortions.length === 0) {
        return nsSnackBar.error(__m('Unable to proceed if there is no portions are defined.', 'NsGastro')).subscribe();
      }

      var productLength = this.ordersPortions.map(function (o) {
        return o.products.length === 0;
      });

      if (productLength.filter(function (p) {
        return p === true;
      }).length > 0) {
        return nsSnackBar.error(__m('Unable to proceed if an order slice is empty.', 'NsGastro')).subscribe();
      }

      if (this.orderProducts.filter(function (product) {
        return product.displayed_quantity > 0;
      }).length > 0) {
        return nsSnackBar.error(__m('Unable to proceed, as there are unassigned products', 'NsGastro')).subscribe();
      }

      if (this.ordersPortions.filter(function (order) {
        return !_this7.validation.validateFields(order.fields);
      }).length > 0) {
        return nsSnackBar.error(__m('Unable to proceed as one or more slice forms is invalid.', 'NsGastro')).subscribe();
      }

      Popup.show(nsConfirmPopup, {
        title: __m('Confirm Your Action', 'NsGastro'),
        message: __m('Would you like to confirm the order split ?', 'NsGastro'),
        onAction: function onAction(action) {
          if (action) {
            _this7.confirmSplit();
          }
        }
      });
    },
    confirmSplit: function confirmSplit() {
      var _this8 = this;

      var slices = this.ordersPortions.map(function (slicen) {
        var order = _this8.validation.extractFields(slicen.fields);

        order.products = slicen.products;
        return order;
      });
      nsHttpClient.post("/api/nexopos/v4/gastro/orders/split", {
        original: this.selectedOrder,
        slices: slices
      }).subscribe(function (result) {
        _this8.splitResult = result.data;
      }, function (error) {
        nsSnackBar.error(error.message || __m('An unexpected error has occured while splitting the order.', 'NsGastro')).subscribe();
      });
    },
    generatePortions: function generatePortions() {
      var _this9 = this;

      if (parseInt(this.slices) <= 1 || parseInt(this.slices) > 5) {
        return nsSnackBar.error(__m('Invalid slices for the order. An order can be splited in 2 slices and up to 5 slices.', 'NsGastro')).subscribe();
      }

      if (this.ordersPortions.length > 0) {
        return Popup.show(nsConfirmPopup, {
          title: __m('Confirm Your Action', 'NsGastro'),
          message: __m('Looks like you already have defined some orders parts. Would you like to delete them ?', 'NsGastro'),
          onAction: function onAction(action) {
            if (action) {
              _this9.__generatePortions();
            }
          }
        });
      }

      return this.__generatePortions();
    },
    __generatePortions: function __generatePortions() {
      var _this10 = this;

      this.ordersPortions = new Array(parseInt(this.slices)).fill('').map(function (order) {
        return {
          fields: _this10.validation.createFields([{
            type: 'text',
            options: _this10.customers,
            name: 'name',
            label: __m('Name', 'NsGastro'),
            description: __m('A name can help you to identify the order quickly.', 'NsGastro')
          }, {
            type: 'select',
            options: _this10.customers,
            name: 'customer_id',
            label: __m('Assigned Customer', 'NsGastro'),
            description: __m('Choose the customer that is assigned to the order.', 'NsGastro'),
            validation: 'required'
          }, {
            type: 'select',
            options: _this10.orderTypes,
            label: __m('Order Type', 'NsGastro'),
            name: 'type',
            description: __m('Define what is the order type.', 'NsGastro'),
            validation: 'required'
          }]),
          type: null,
          discount: 0,
          products: [],
          selected: false
        };
      });
    },
    searchOrderWithQuery: function searchOrderWithQuery(term) {
      var _this11 = this;

      if (term.length > 0) {
        nsHttpClient.get("/api/nexopos/v4/gastro/orders/search?search=".concat(term)).subscribe(function (result) {
          if (result.length === 0) {
            _this11.$refs.searchField.focus();

            _this11.$refs.searchField.select();

            nsSnackBar.info(__m('No results match your query, please try again.', 'NsGastro', 'OK', {
              duration: 4000
            })).subscribe();
          }

          _this11.searchResults = result;
        }, function (error) {
          return nsSnacBar.error(__m('An error has occured while searching orders', 'NsGastro'), 'OK', {
            duration: 4000
          }).subscribe();
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-orders-button.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-orders-button.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_split_order_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-split-order.vue */ "./Resources/ts/components/gastro-split-order.vue");
/* harmony import */ var _gastro_table_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gastro-table.vue */ "./Resources/ts/components/gastro-table.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    __m: __m,
    openSplitOrderPopup: function openSplitOrderPopup() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_split_order_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    resolve: resolve,
                    reject: reject
                  });
                });

              case 3:
                result = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table-button.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table-button.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_pos_tables_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-tables.vue */ "./Resources/ts/components/gastro-pos-tables.vue");
/* harmony import */ var _gastro_table_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gastro-table.vue */ "./Resources/ts/components/gastro-table.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  methods: {
    __m: __m,
    openTableManagement: function openTableManagement() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_table_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    resolve: resolve,
                    reject: reject,
                    mode: 'explore'
                  });
                });

              case 3:
                result = _context.sent;
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gastro_kitchen_settings_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-kitchen-settings.vue */ "./Resources/ts/components/gastro-kitchen-settings.vue");
/* harmony import */ var _gastro_pos_order_options_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gastro-pos-order-options.vue */ "./Resources/ts/components/gastro-pos-order-options.vue");
/* harmony import */ var _gastro_pos_product_options_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gastro-pos-product-options.vue */ "./Resources/ts/components/gastro-pos-product-options.vue");
/* harmony import */ var _gastro_seats_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gastro-seats.vue */ "./Resources/ts/components/gastro-seats.vue");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  mounted: function mounted() {
    var _this = this;

    if (this.ns_gastro_areas_enabled) {
      this.loadAreas();
      this.screen = 'areas';
    } else {
      this.loadTables();
      this.screen = 'tables';
    }

    this.mode = this.$popupParams.mode || 'select';

    if (ns.websocket.enabled) {
      this.listenSockets();
    } else {
      this.launchIntervalFetches();
    }

    Gastro.tableOpenedSubject.next(true);
    this.popupCloser();
    nsHooks.addAction('ns-pos-payment-destroyed', 'gastro-reset-cart', function () {
      if (_this.isPaying) {
        POS.reset();
        _this.isPaying = false;
      }
    });
  },
  destroyed: function destroyed() {
    Gastro.tableOpenedSubject.next(false);
    clearTimeout(this.intervalFetches);
  },
  data: function data() {
    var storeSettings = JSON.parse(localStorage.getItem('gastro.table.settings'));
    var rangeStars = ns.date.moment.startOf('day').format();
    var rangeEnds = ns.date.moment.endOf('day').format();
    return _objectSpread({
      screen: 'areas',
      tableLoaded: false,
      mouseDown: false,
      ordersLoaded: false,
      intervalFetches: null,
      additionalTitle: null,
      areasLoaded: false,
      selectedArea: null,
      selectedTable: null,
      selectedSessions: null,
      isPaying: false,
      areas: [],
      tables: [],
      showDetails: {},
      sessions: [],
      orders: [],
      filterMode: '',
      mode: 'select',
      settings: {
        range_starts: storeSettings !== null ? storeSettings.range_starts || rangeStars : rangeStars,
        range_ends: storeSettings !== null ? storeSettings.range_ends || rangeEnds : rangeEnds
      }
    }, GastroSettings);
  },
  computed: {
    order: function order() {
      return POS.order.getValue();
    },
    hasCustomSettings: function hasCustomSettings() {
      return localStorage.getItem('gastro.table.settings') !== null;
    }
  },
  methods: {
    __m: __m,
    popupCloser: popupCloser,
    popupResolver: popupResolver,
    toggleDetails: function toggleDetails(order) {
      this.$set(this.showDetails, order.code, !this.showDetails[order.code]);
      this.$forceUpdate();
    },
    launchIntervalFetches: function launchIntervalFetches() {
      var _this2 = this;

      this.intervalFetches = setInterval(function () {
        if (_this2.screen === 'orders') {
          _this2.showTableHistory(_this2.selectedTable);
        }

        if (_this2.screen === 'sessions-orders') {
          _this2.loadSessionOrders(_this2.selectedSessions);
        }
      }, 5000);
    },
    toggleTableSessionHistory: function toggleTableSessionHistory() {
      var _this3 = this;

      if (this.screen !== 'sessions') {
        this.sessions = [];
        nsHttpClient.post("/api/nexopos/v4/gastro/tables/".concat(this.selectedTable.id, "/sessions"), this.settings).subscribe({
          next: function next(result) {
            _this3.sessions = result;
            _this3.screen = 'sessions';
          },
          error: function error(_error) {
            nsSnackBar.error(__m('An unexpected error has occured.', 'NsGastro')).subscribe();
          }
        });
      } else {
        this.screen = 'orders';
        this.showTableHistory(this.selectedTable);
      }
    },
    loadSessionOrders: function loadSessionOrders(session) {
      var _this4 = this;

      this.screen = 'sessions-orders';
      this.selectedSessions = session;
      nsHttpClient.post("/api/nexopos/v4/gastro/tables/".concat(this.selectedTable.id, "/sessions/").concat(session.id, "/orders"), this.settings).subscribe({
        next: function next(result) {
          _this4.orders = result;
        },
        error: function error(_error2) {
          nsSnackBar.error(__m('An unexpected error has occured.', 'NsGastro')).subscribe();
        }
      });
    },
    openSession: function openSession(session) {
      var _this5 = this;

      Popup.show(nsConfirmPopup, {
        title: __m('Confirm Your Action', 'NsGastro'),
        message: __m('Would you like to open this session ?', 'NsGastro'),
        onAction: function onAction(action) {
          if (action) {
            nsHttpClient.put("/api/nexopos/v4/gastro/tables/".concat(_this5.selectedTable.id, "/sessions/").concat(session.id, "/action"), {
              action: 'open'
            }).subscribe({
              next: function next(result) {
                _this5.toggleTableSessionHistory();

                nsSnackBar.success(result.message, __m('Okay', 'NsGastro'), {
                  duration: 3000
                }).subscribe();
              },
              error: function error(_error3) {
                nsSnackBar.error(__m('An unexpected error has occured.', 'NsGastro')).subscribe();
              }
            });
          }
        }
      });
    },
    closeSession: function closeSession(session) {
      var _this6 = this;

      Popup.show(nsConfirmPopup, {
        title: __m('Confirm Your Action', 'NsGastro'),
        message: __m('Would you like to close this session manually ?', 'NsGastro'),
        onAction: function onAction(action) {
          if (action) {
            nsHttpClient.put("/api/nexopos/v4/gastro/tables/".concat(_this6.selectedTable.id, "/sessions/").concat(session.id, "/action"), {
              action: 'close'
            }).subscribe({
              next: function next(result) {
                _this6.toggleTableSessionHistory();

                nsSnackBar.success(result.message, __m('Okay', 'NsGastro'), {
                  duration: 3000
                }).subscribe();
              },
              error: function error(_error4) {
                nsSnackBar.error(__m('An unexpected error has occured.', 'NsGastro')).subscribe();
              }
            });
          }
        }
      });
    },
    listenSockets: function listenSockets() {
      var _this7 = this;

      Echo["private"]("ns.private-channel").listen('App\\Events\\OrderAfterCreatedEvent', function (e) {
        _this7.showTableHistory(_this7.selectedTable);
      }).listen('Modules\\NsGastro\\Events\\TableAfterUpdatedEvent', function (e) {
        _this7.showTableHistory(_this7.selectedTable);
      }).listen('App\\Events\\OrderAfterUpdatedEvent', function (e) {
        _this7.showTableHistory(_this7.selectedTable);
      });
    },
    filterOnlyBusy: function filterOnlyBusy() {
      if (['', 'free'].includes(this.filterMode)) {
        this.filterMode = 'busy';
      } else {
        this.filterMode = '';
      }

      this.loadTables(this.selectedArea);
    },
    filterOnlyAvailable: function filterOnlyAvailable() {
      if (['', 'busy'].includes(this.filterMode)) {
        this.filterMode = 'free';
      } else {
        this.filterMode = '';
      }

      this.loadTables(this.selectedArea);
    },
    setRange: function setRange(range) {
      switch (range) {
        case 'today':
          this.settings.range_starts = moment(ns.date.current).startOf('day').format('YYYY/MM/DD HH:mm:ss');
          this.settings.range_ends = moment(ns.date.current).endOf('day').format('YYYY/MM/DD HH:mm:ss');
          break;

        case 'yesterday':
          this.settings.range_starts = moment(ns.date.current).subtract(1, 'days').startOf('day').format('YYYY/MM/DD HH:mm:ss');
          this.settings.range_ends = moment(ns.date.current).endOf('day').format('YYYY/MM/DD HH:mm:ss');
          break;

        case 'week':
          this.settings.range_starts = moment(ns.date.current).subtract(6, 'days').startOf('day').format('YYYY/MM/DD HH:mm:ss');
          this.settings.range_ends = moment(ns.date.current).endOf('day').format('YYYY/MM/DD HH:mm:ss');
          break;
      }

      localStorage.setItem('gastro.table.settings', JSON.stringify(this.settings));
    },
    debounceForAvailability: function debounceForAvailability(table, e) {
      var _this8 = this;

      if (table.busy) {
        this.mouseDown = true;
        setTimeout(function () {
          if (_this8.mouseDown) {
            _this8.setAvailable(table);

            e.preventDefault();
          }
        }, 600);
      }
    },
    openOrderOption: function openOrderOption(order) {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_pos_order_options_vue__WEBPACK_IMPORTED_MODULE_2__["default"], {
                    resolve: resolve,
                    reject: reject,
                    order: order
                  });
                });

              case 3:
                result = _context.sent;

                _this9.showTableHistory(_this9.selectedTable);

                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    addProduct: function addProduct(order) {
      Gastro.selectedOrder.next(order);
      Gastro.setAddButtonsVisibility('visible');
      this.$popup.close();
    },
    printOrder: function printOrder(order) {
      POS.printOrder(order.id);
    },
    payOrder: function payOrder(order) {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var popup, oldOrder, newOrder;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                popup = Popup.show(nsPOSLoadingPopup);
                oldOrder = POS.order.getValue();
                _context2.prev = 2;
                _context2.next = 5;
                return POS.loadOrder(order.id);

              case 5:
                newOrder = POS.order.getValue();

                if (!(newOrder.payment_status === 'paid')) {
                  _context2.next = 9;
                  break;
                }

                POS.reset();
                return _context2.abrupt("return", nsSnackBar.error(__m('Unable to make a payment for an already paid order.', 'NsGastro')).subscribe());

              case 9:
                _this10.proceedCustomerLoading(oldOrder);
                /**
                 * the script shold be aware the payment
                 * popup was opened from the PayButton
                 */


                _this10.isPaying = true;
                _context2.next = 16;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);

              case 16:
                popup.close();

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 13]]);
      }))();
    },
    proceedCustomerLoading: function proceedCustomerLoading(oldOrder) {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var queues, order, index, promise, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queues = [ProductsQueue, CustomerQueue, TypeQueue, PaymentQueue];
                order = POS.order.getValue();
                _context3.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().keys(queues);

              case 3:
                if ((_context3.t1 = _context3.t0()).done) {
                  _context3.next = 17;
                  break;
                }

                index = _context3.t1.value;
                _context3.prev = 5;
                promise = new queues[index](order);
                _context3.next = 9;
                return promise.run();

              case 9:
                response = _context3.sent;
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t2 = _context3["catch"](5);
                return _context3.abrupt("return", false);

              case 15:
                _context3.next = 3;
                break;

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[5, 12]]);
      }))();
    },
    openSettingsOptions: function openSettingsOptions() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_kitchen_settings_vue__WEBPACK_IMPORTED_MODULE_1__["default"], {
                    fields: [{
                      type: 'datetimepicker',
                      name: 'range_starts',
                      label: __m('Start Range', 'NsGastro'),
                      value: _this11.settings.range_starts,
                      description: __m('Define when from which moment the orders should be fetched.', 'NsGastro')
                    }, {
                      type: 'datetimepicker',
                      name: 'range_ends',
                      label: __m('End Range', 'NsGastro'),
                      value: _this11.settings.range_ends,
                      description: __m('Define till which moment the orders should be fetched.', 'NsGastro')
                    }],
                    resolve: resolve,
                    reject: reject,
                    settings: _this11.settings,
                    title: __m('Settings', 'NsGastro')
                  });
                });

              case 3:
                result = _context4.sent;
                localStorage.setItem('gastro.table.settings', JSON.stringify(_this11.settings));
                _this11.settings = result;

                _this11.showTableHistory(_this11.selectedTable);

                _context4.next = 12;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 9]]);
      }))();
    },
    getMealBGClass: function getMealBGClass(product) {
      switch (product.cooking_status) {
        case 'ready':
          return 'bg-success-secondary';
          break;

        case 'ongoing':
          return 'bg-info-secondary';
          break;

        case 'canceled':
          return 'bg-input-disabled';
          break;

        case 'processed':
          return 'bg-success-secondary';
          break;

        case 'requested':
          return 'bg-warning-secondary';
          break;
      }
    },
    getMealProductTextColor: function getMealProductTextColor(product) {
      switch (product.cooking_status) {
        case 'canceled':
          return 'text-secondary';
          break;

        default:
          return 'text-primary';
      }
    },
    getMealModifierTextColor: function getMealModifierTextColor(product) {
      switch (product.cooking_status) {
        case 'canceled':
          return 'text-secondary';
          break;

        default:
          return 'text-primary';
      }
    },
    closePopup: function closePopup() {
      this.$popup.close();
      this.$popupParams.reject(false);
    },
    returnToAreas: function returnToAreas() {
      this.loadAreas();
    },
    returnToTables: function returnToTables() {
      this.selectedTable = null;
      this.loadTables(this.selectedArea);
    },
    loadAreas: function loadAreas() {
      var _this12 = this;

      this.screen = 'areas';
      this.areasLoaded = false;
      nsHttpClient.get("/api/nexopos/v4/gastro/areas").subscribe({
        next: function next(result) {
          _this12.areasLoaded = true;
          _this12.areas = result;
        },
        error: function error(_error5) {
          nsSnackBar.error(_error5.message || __m('An unexpected error has occured.', 'NsGastro'), __m('OK', 'NsGastro'), {
            duration: 0
          }).subscribe();
        }
      });
    },

    /**
     * Will set a busy table as available
     * @param {table} table
     * @return void
     */
    setAvailable: function setAvailable(table) {
      var _this13 = this;

      Popup.show(nsConfirmPopup, {
        title: __m("Set the table as available ?", 'NsGastro'),
        message: __m("You'll set the table as available, please confirm your action.", 'NsGastro'),
        onAction: function onAction(action) {
          if (action) {
            nsHttpClient.post("/api/nexopos/v4/gastro/tables/".concat(table.id, "/change-availability"), {
              status: 'available'
            }).subscribe({
              next: function next(result) {
                // this should refresh the tables
                _this13.loadTables(_this13.selectedArea);

                nsSnackBar.success(result.message, __m('OK', 'NsGastro'), {
                  duration: 3000
                }).subscribe();
              },
              error: function error(_error6) {
                nsSnackBar.success(_error6.message || __m('An unexpected error has occured.', 'NsGastro'), __m('OK', 'NsGastro'), {
                  duration: 3000
                }).subscribe();
              }
            });
          }
        }
      });
    },
    loadTables: function loadTables() {
      var _this14 = this;

      var area = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.selectedArea = area;
      this.screen = 'tables';
      this.tableLoaded = false;
      this.additionalTitle = null;
      var subscription = area === null ? nsHttpClient.get("/api/nexopos/v4/gastro/tables?filter=".concat(this.filterMode)) : nsHttpClient.get("/api/nexopos/v4/gastro/areas/".concat(area.id, "/available-tables?filter=").concat(this.filterMode));
      subscription.subscribe({
        next: function next(result) {
          _this14.tableLoaded = true;
          _this14.tables = result.map(function (table) {
            table.selectedSeats = 1;
            table.selected = _this14.order.table && _this14.order.table.id === table.id ? _this14.order.table : false;
            return table;
          });
        },
        error: function error(_error7) {
          nsSnackBar.error(_error7.message || __m('An unexpected error has occured.', 'NsGastro'), __m('OK', 'NsGastro'), {
            duration: 0
          }).subscribe();
        }
      });
    },
    selectQuantity: function selectQuantity(table) {
      if (this.mode === 'select') {
        return this.proceedSelect(table);
      } else {
        return this.showTableHistory(table);
      }
    },
    showTableHistory: function showTableHistory(table) {
      var _this15 = this;

      this.selectedTable = table;
      this.additionalTitle = __m('{table} : Orders History - {availability}', 'NsGastro').replace('{availability}', table.busy ? __m('Busy', 'NsGastro') : __m('Available', 'NsGastro')).replace('{table}', table.name);
      this.screen = 'orders';
      this.ordersLoaded = false;
      nsHttpClient.post("/api/nexopos/v4/gastro/tables/".concat(table.id, "/orders"), this.settings).subscribe({
        next: function next(orders) {
          _this15.ordersLoaded = true;
          orders.map(function (order) {
            if (_this15.showDetails[order.code] === undefined) {
              _this15.showDetails[order.code] = false;
            }

            return order;
          });
          _this15.orders = orders;
        }
      });
    },
    showProductOptions: function showProductOptions(product) {
      var _this16 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_pos_product_options_vue__WEBPACK_IMPORTED_MODULE_3__["default"], {
                    resolve: resolve,
                    reject: reject,
                    product: product
                  });
                });

              case 3:
                result = _context5.sent;

                /**
                 * Will refresh the table, to ensure changes
                 * are reflected.
                 */
                _this16.showTableHistory(_this16.selectedTable);

                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                console.log(_context5.t0);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }))();
    },
    proceedSelect: function proceedSelect(table) {
      var _this17 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!_this17.ns_gastro_seats_enabled) {
                  _context6.next = 11;
                  break;
                }

                _context6.prev = 1;

                /**
                 * restoring the default selected
                 * seats for the unselected tables.
                 */
                _this17.tables.forEach(function (table) {
                  table.selected = false;
                  table.selectedSeats = 1;
                });

                _context6.next = 5;
                return new Promise(function (resolve, reject) {
                  Popup.show(_gastro_seats_vue__WEBPACK_IMPORTED_MODULE_4__["default"], {
                    resolve: resolve,
                    reject: reject,
                    table: table
                  });
                });

              case 5:
                table = _context6.sent;
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", nsSnackBar.error(__m('You need to define the seats before proceeding.', 'NsGastro')).subscribe());

              case 11:
                /**
                 * the table quantity should have been upated now.
                 * let's make sure that table is selected.
                 */
                table.selected = true;
                /** 
                 * we'll update the table and the area used
                 * for the ongoing order.
                */

                _this17.order.table_id = table.id;
                _this17.order.table = table;
                _this17.order.area_id = table.area_id;
                /**
                 * if a table is selected without defining the 
                 * order type, we'll select "Dine in" automatically
                 */

                if (_this17.order.type === undefined) {
                  _this17.order.type = Gastro.getType();
                }
                /**
                 * update order type label, so that
                 * it has the table name on the type label
                 */


                _this17.order.type.label = Gastro.getType().label;
                POS.order.next(_this17.order);

                _this17.$popup.close();

                _this17.$popupParams.resolve(table);

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 8]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'gastro-to-kitchen-button',
  mounted: function mounted() {
    var _this = this;

    POS.order.subscribe(function (order) {
      _this.order = order;
    });
  },
  data: function data() {
    return {
      order: {}
    };
  },
  methods: {
    __m: __m,
    submitToKitchen: function submitToKitchen() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var queues, index, promise, response, popup, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queues = nsHooks.applyFilters('ns-hold-queue', [ProductsQueue, CustomerQueue, TypeQueue]);
                _context.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().keys(queues);

              case 2:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 16;
                  break;
                }

                index = _context.t1.value;
                _context.prev = 4;
                promise = new queues[index](_this2.order);
                _context.next = 8;
                return promise.run();

              case 8:
                response = _context.sent;
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t2 = _context["catch"](4);
                return _context.abrupt("return", false);

              case 14:
                _context.next = 2;
                break;

              case 16:
                _this2.order.payment_status = 'hold';
                POS.order.next(_this2.order);
                popup = Popup.show(nsPOSLoadingPopup);
                _context.prev = 19;
                _context.next = 22;
                return POS.submitOrder();

              case 22:
                result = _context.sent;
                popup.close();
                nsSnackBar.success(result.message).subscribe();
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t3 = _context["catch"](19);
                popup.close();
                nsSnackBar.error(_context.t3.message || __m('An unexpected error occured.', 'NsGastro')).subscribe();

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 11], [19, 27]]);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.light .modifier-item[data-v-cc0c3326] {\n    background:rgb(255 255 255 / 73%);\n}\n.dark .modifier-item[data-v-cc0c3326] {\n    background:rgb(0 0 0 / 73%);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./Resources/css/gastro.scss":
/*!***********************************!*\
  !*** ./Resources/css/gastro.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_style_index_0_id_cc0c3326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css& */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_style_index_0_id_cc0c3326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_style_index_0_id_cc0c3326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

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

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./Resources/ts/components/gastro-add-buttons.vue":
/*!********************************************************!*\
  !*** ./Resources/ts/components/gastro-add-buttons.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_add_buttons_vue_vue_type_template_id_6da21da1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-add-buttons.vue?vue&type=template&id=6da21da1& */ "./Resources/ts/components/gastro-add-buttons.vue?vue&type=template&id=6da21da1&");
/* harmony import */ var _gastro_add_buttons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-add-buttons.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-add-buttons.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_add_buttons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_add_buttons_vue_vue_type_template_id_6da21da1___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_add_buttons_vue_vue_type_template_id_6da21da1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-add-buttons.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-keyboard.vue":
/*!*****************************************************!*\
  !*** ./Resources/ts/components/gastro-keyboard.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_keyboard_vue_vue_type_template_id_4097144b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-keyboard.vue?vue&type=template&id=4097144b& */ "./Resources/ts/components/gastro-keyboard.vue?vue&type=template&id=4097144b&");
/* harmony import */ var _gastro_keyboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-keyboard.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-keyboard.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_keyboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_keyboard_vue_vue_type_template_id_4097144b___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_keyboard_vue_vue_type_template_id_4097144b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-keyboard.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-kitchen-settings.vue":
/*!*************************************************************!*\
  !*** ./Resources/ts/components/gastro-kitchen-settings.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_kitchen_settings_vue_vue_type_template_id_bd02abe0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0& */ "./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0&");
/* harmony import */ var _gastro_kitchen_settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-kitchen-settings.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_kitchen_settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_kitchen_settings_vue_vue_type_template_id_bd02abe0___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_kitchen_settings_vue_vue_type_template_id_bd02abe0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-kitchen-settings.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-merge-orders-button.vue":
/*!****************************************************************!*\
  !*** ./Resources/ts/components/gastro-merge-orders-button.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_merge_orders_button_vue_vue_type_template_id_734dad91___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-merge-orders-button.vue?vue&type=template&id=734dad91& */ "./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=template&id=734dad91&");
/* harmony import */ var _gastro_merge_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-merge-orders-button.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_merge_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_merge_orders_button_vue_vue_type_template_id_734dad91___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_merge_orders_button_vue_vue_type_template_id_734dad91___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-merge-orders-button.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-modifier-group.vue":
/*!***********************************************************!*\
  !*** ./Resources/ts/components/gastro-modifier-group.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_modifier_group_vue_vue_type_template_id_cc0c3326_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true& */ "./Resources/ts/components/gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true&");
/* harmony import */ var _gastro_modifier_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-modifier-group.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-modifier-group.vue?vue&type=script&lang=js&");
/* harmony import */ var _gastro_modifier_group_vue_vue_type_style_index_0_id_cc0c3326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css& */ "./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _gastro_modifier_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_modifier_group_vue_vue_type_template_id_cc0c3326_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_modifier_group_vue_vue_type_template_id_cc0c3326_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  "cc0c3326",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-modifier-group.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-meal.vue":
/*!*****************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-meal.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_meal_vue_vue_type_template_id_9940d500___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-meal.vue?vue&type=template&id=9940d500& */ "./Resources/ts/components/gastro-pos-meal.vue?vue&type=template&id=9940d500&");
/* harmony import */ var _gastro_pos_meal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-meal.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-meal.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_meal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_meal_vue_vue_type_template_id_9940d500___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_meal_vue_vue_type_template_id_9940d500___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-meal.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-merge.vue":
/*!******************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-merge.vue ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_merge_vue_vue_type_template_id_363b26cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-merge.vue?vue&type=template&id=363b26cb& */ "./Resources/ts/components/gastro-pos-merge.vue?vue&type=template&id=363b26cb&");
/* harmony import */ var _gastro_pos_merge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-merge.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-merge.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_merge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_merge_vue_vue_type_template_id_363b26cb___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_merge_vue_vue_type_template_id_363b26cb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-merge.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-order-move.vue":
/*!***********************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-order-move.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_order_move_vue_vue_type_template_id_05e58a6d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-order-move.vue?vue&type=template&id=05e58a6d& */ "./Resources/ts/components/gastro-pos-order-move.vue?vue&type=template&id=05e58a6d&");
/* harmony import */ var _gastro_pos_order_move_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-order-move.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-order-move.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_order_move_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_order_move_vue_vue_type_template_id_05e58a6d___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_order_move_vue_vue_type_template_id_05e58a6d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-order-move.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-order-options.vue":
/*!**************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-order-options.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_order_options_vue_vue_type_template_id_28914f32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-order-options.vue?vue&type=template&id=28914f32& */ "./Resources/ts/components/gastro-pos-order-options.vue?vue&type=template&id=28914f32&");
/* harmony import */ var _gastro_pos_order_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-order-options.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-order-options.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_order_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_order_options_vue_vue_type_template_id_28914f32___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_order_options_vue_vue_type_template_id_28914f32___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-order-options.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-orders-button.vue":
/*!**************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-orders-button.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_orders_button_vue_vue_type_template_id_cdedaca6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6& */ "./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6&");
/* harmony import */ var _gastro_pos_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-orders-button.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_orders_button_vue_vue_type_template_id_cdedaca6___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_orders_button_vue_vue_type_template_id_cdedaca6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-orders-button.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-product-options.vue":
/*!****************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-product-options.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_product_options_vue_vue_type_template_id_4118d893___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-product-options.vue?vue&type=template&id=4118d893& */ "./Resources/ts/components/gastro-pos-product-options.vue?vue&type=template&id=4118d893&");
/* harmony import */ var _gastro_pos_product_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-product-options.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-product-options.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_product_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_product_options_vue_vue_type_template_id_4118d893___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_product_options_vue_vue_type_template_id_4118d893___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-product-options.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-ready-meals.vue":
/*!************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-ready-meals.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_ready_meals_vue_vue_type_template_id_350fdfb9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9& */ "./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9&");
/* harmony import */ var _gastro_pos_ready_meals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-ready-meals.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_ready_meals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_ready_meals_vue_vue_type_template_id_350fdfb9___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_ready_meals_vue_vue_type_template_id_350fdfb9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-ready-meals.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-tables.vue":
/*!*******************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-tables.vue ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_pos_tables_vue_vue_type_template_id_7c3209e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-pos-tables.vue?vue&type=template&id=7c3209e2& */ "./Resources/ts/components/gastro-pos-tables.vue?vue&type=template&id=7c3209e2&");
/* harmony import */ var _gastro_pos_tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-pos-tables.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-pos-tables.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_pos_tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_pos_tables_vue_vue_type_template_id_7c3209e2___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_pos_tables_vue_vue_type_template_id_7c3209e2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-pos-tables.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-seats.vue":
/*!**************************************************!*\
  !*** ./Resources/ts/components/gastro-seats.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_seats_vue_vue_type_template_id_734998da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-seats.vue?vue&type=template&id=734998da& */ "./Resources/ts/components/gastro-seats.vue?vue&type=template&id=734998da&");
/* harmony import */ var _gastro_seats_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-seats.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-seats.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_seats_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_seats_vue_vue_type_template_id_734998da___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_seats_vue_vue_type_template_id_734998da___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-seats.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-split-order.vue":
/*!********************************************************!*\
  !*** ./Resources/ts/components/gastro-split-order.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_split_order_vue_vue_type_template_id_5035fb27___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-split-order.vue?vue&type=template&id=5035fb27& */ "./Resources/ts/components/gastro-split-order.vue?vue&type=template&id=5035fb27&");
/* harmony import */ var _gastro_split_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-split-order.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-split-order.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_split_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_split_order_vue_vue_type_template_id_5035fb27___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_split_order_vue_vue_type_template_id_5035fb27___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-split-order.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-split-orders-button.vue":
/*!****************************************************************!*\
  !*** ./Resources/ts/components/gastro-split-orders-button.vue ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_split_orders_button_vue_vue_type_template_id_ee40201a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-split-orders-button.vue?vue&type=template&id=ee40201a& */ "./Resources/ts/components/gastro-split-orders-button.vue?vue&type=template&id=ee40201a&");
/* harmony import */ var _gastro_split_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-split-orders-button.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-split-orders-button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_split_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_split_orders_button_vue_vue_type_template_id_ee40201a___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_split_orders_button_vue_vue_type_template_id_ee40201a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-split-orders-button.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-table-button.vue":
/*!*********************************************************!*\
  !*** ./Resources/ts/components/gastro-table-button.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_table_button_vue_vue_type_template_id_76bff116___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-table-button.vue?vue&type=template&id=76bff116& */ "./Resources/ts/components/gastro-table-button.vue?vue&type=template&id=76bff116&");
/* harmony import */ var _gastro_table_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-table-button.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-table-button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_table_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_table_button_vue_vue_type_template_id_76bff116___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_table_button_vue_vue_type_template_id_76bff116___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-table-button.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-table.vue":
/*!**************************************************!*\
  !*** ./Resources/ts/components/gastro-table.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_table_vue_vue_type_template_id_e2f8fccc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-table.vue?vue&type=template&id=e2f8fccc& */ "./Resources/ts/components/gastro-table.vue?vue&type=template&id=e2f8fccc&");
/* harmony import */ var _gastro_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-table.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-table.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_table_vue_vue_type_template_id_e2f8fccc___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_table_vue_vue_type_template_id_e2f8fccc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-table.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-to-kitchen-button.vue":
/*!**************************************************************!*\
  !*** ./Resources/ts/components/gastro-to-kitchen-button.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gastro_to_kitchen_button_vue_vue_type_template_id_11f1f359___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359& */ "./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359&");
/* harmony import */ var _gastro_to_kitchen_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gastro-to-kitchen-button.vue?vue&type=script&lang=js& */ "./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _gastro_to_kitchen_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _gastro_to_kitchen_button_vue_vue_type_template_id_11f1f359___WEBPACK_IMPORTED_MODULE_0__.render,
  _gastro_to_kitchen_button_vue_vue_type_template_id_11f1f359___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "Resources/ts/components/gastro-to-kitchen-button.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./Resources/ts/components/gastro-add-buttons.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./Resources/ts/components/gastro-add-buttons.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_add_buttons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-add-buttons.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-add-buttons.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_add_buttons_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-keyboard.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./Resources/ts/components/gastro-keyboard.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_keyboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-keyboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-keyboard.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_keyboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_kitchen_settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-kitchen-settings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_kitchen_settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_merge_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-merge-orders-button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_merge_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-modifier-group.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-modifier-group.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-modifier-group.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-meal.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-meal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_meal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-meal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-meal.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_meal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-merge.vue?vue&type=script&lang=js&":
/*!*******************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-merge.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_merge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-merge.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-merge.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_merge_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-order-move.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-order-move.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_move_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-order-move.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-move.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_move_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-order-options.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-order-options.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-order-options.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-options.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-orders-button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-product-options.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-product-options.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_product_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-product-options.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-product-options.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_product_options_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_ready_meals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-ready-meals.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_ready_meals_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-pos-tables.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-tables.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-tables.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-tables.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_tables_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-seats.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./Resources/ts/components/gastro-seats.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_seats_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-seats.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-seats.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_seats_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-split-order.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./Resources/ts/components/gastro-split-order.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-split-order.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-order.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-split-orders-button.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-split-orders-button.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-split-orders-button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-orders-button.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_orders_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-table-button.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./Resources/ts/components/gastro-table-button.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-table-button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table-button.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-table.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./Resources/ts/components/gastro-table.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-table.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_to_kitchen_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-to-kitchen-button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_to_kitchen_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_style_index_0_id_cc0c3326_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[1]!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10[0].rules[0].use[2]!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=style&index=0&id=cc0c3326&scoped=true&lang=css&");


/***/ }),

/***/ "./Resources/ts/components/gastro-add-buttons.vue?vue&type=template&id=6da21da1&":
/*!***************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-add-buttons.vue?vue&type=template&id=6da21da1& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_add_buttons_vue_vue_type_template_id_6da21da1___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_add_buttons_vue_vue_type_template_id_6da21da1___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_add_buttons_vue_vue_type_template_id_6da21da1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-add-buttons.vue?vue&type=template&id=6da21da1& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-add-buttons.vue?vue&type=template&id=6da21da1&");


/***/ }),

/***/ "./Resources/ts/components/gastro-keyboard.vue?vue&type=template&id=4097144b&":
/*!************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-keyboard.vue?vue&type=template&id=4097144b& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_keyboard_vue_vue_type_template_id_4097144b___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_keyboard_vue_vue_type_template_id_4097144b___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_keyboard_vue_vue_type_template_id_4097144b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-keyboard.vue?vue&type=template&id=4097144b& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-keyboard.vue?vue&type=template&id=4097144b&");


/***/ }),

/***/ "./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0&":
/*!********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_kitchen_settings_vue_vue_type_template_id_bd02abe0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_kitchen_settings_vue_vue_type_template_id_bd02abe0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_kitchen_settings_vue_vue_type_template_id_bd02abe0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0&");


/***/ }),

/***/ "./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=template&id=734dad91&":
/*!***********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=template&id=734dad91& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_merge_orders_button_vue_vue_type_template_id_734dad91___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_merge_orders_button_vue_vue_type_template_id_734dad91___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_merge_orders_button_vue_vue_type_template_id_734dad91___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-merge-orders-button.vue?vue&type=template&id=734dad91& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=template&id=734dad91&");


/***/ }),

/***/ "./Resources/ts/components/gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_template_id_cc0c3326_scoped_true___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_template_id_cc0c3326_scoped_true___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_modifier_group_vue_vue_type_template_id_cc0c3326_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-meal.vue?vue&type=template&id=9940d500&":
/*!************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-meal.vue?vue&type=template&id=9940d500& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_meal_vue_vue_type_template_id_9940d500___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_meal_vue_vue_type_template_id_9940d500___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_meal_vue_vue_type_template_id_9940d500___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-meal.vue?vue&type=template&id=9940d500& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-meal.vue?vue&type=template&id=9940d500&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-merge.vue?vue&type=template&id=363b26cb&":
/*!*************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-merge.vue?vue&type=template&id=363b26cb& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_merge_vue_vue_type_template_id_363b26cb___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_merge_vue_vue_type_template_id_363b26cb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_merge_vue_vue_type_template_id_363b26cb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-merge.vue?vue&type=template&id=363b26cb& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-merge.vue?vue&type=template&id=363b26cb&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-order-move.vue?vue&type=template&id=05e58a6d&":
/*!******************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-order-move.vue?vue&type=template&id=05e58a6d& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_move_vue_vue_type_template_id_05e58a6d___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_move_vue_vue_type_template_id_05e58a6d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_move_vue_vue_type_template_id_05e58a6d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-order-move.vue?vue&type=template&id=05e58a6d& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-move.vue?vue&type=template&id=05e58a6d&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-order-options.vue?vue&type=template&id=28914f32&":
/*!*********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-order-options.vue?vue&type=template&id=28914f32& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_options_vue_vue_type_template_id_28914f32___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_options_vue_vue_type_template_id_28914f32___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_order_options_vue_vue_type_template_id_28914f32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-order-options.vue?vue&type=template&id=28914f32& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-options.vue?vue&type=template&id=28914f32&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6&":
/*!*********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_orders_button_vue_vue_type_template_id_cdedaca6___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_orders_button_vue_vue_type_template_id_cdedaca6___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_orders_button_vue_vue_type_template_id_cdedaca6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-product-options.vue?vue&type=template&id=4118d893&":
/*!***********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-product-options.vue?vue&type=template&id=4118d893& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_product_options_vue_vue_type_template_id_4118d893___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_product_options_vue_vue_type_template_id_4118d893___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_product_options_vue_vue_type_template_id_4118d893___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-product-options.vue?vue&type=template&id=4118d893& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-product-options.vue?vue&type=template&id=4118d893&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9&":
/*!*******************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_ready_meals_vue_vue_type_template_id_350fdfb9___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_ready_meals_vue_vue_type_template_id_350fdfb9___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_ready_meals_vue_vue_type_template_id_350fdfb9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9&");


/***/ }),

/***/ "./Resources/ts/components/gastro-pos-tables.vue?vue&type=template&id=7c3209e2&":
/*!**************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-pos-tables.vue?vue&type=template&id=7c3209e2& ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_tables_vue_vue_type_template_id_7c3209e2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_tables_vue_vue_type_template_id_7c3209e2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_pos_tables_vue_vue_type_template_id_7c3209e2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-pos-tables.vue?vue&type=template&id=7c3209e2& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-tables.vue?vue&type=template&id=7c3209e2&");


/***/ }),

/***/ "./Resources/ts/components/gastro-seats.vue?vue&type=template&id=734998da&":
/*!*********************************************************************************!*\
  !*** ./Resources/ts/components/gastro-seats.vue?vue&type=template&id=734998da& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_seats_vue_vue_type_template_id_734998da___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_seats_vue_vue_type_template_id_734998da___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_seats_vue_vue_type_template_id_734998da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-seats.vue?vue&type=template&id=734998da& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-seats.vue?vue&type=template&id=734998da&");


/***/ }),

/***/ "./Resources/ts/components/gastro-split-order.vue?vue&type=template&id=5035fb27&":
/*!***************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-split-order.vue?vue&type=template&id=5035fb27& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_order_vue_vue_type_template_id_5035fb27___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_order_vue_vue_type_template_id_5035fb27___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_order_vue_vue_type_template_id_5035fb27___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-split-order.vue?vue&type=template&id=5035fb27& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-order.vue?vue&type=template&id=5035fb27&");


/***/ }),

/***/ "./Resources/ts/components/gastro-split-orders-button.vue?vue&type=template&id=ee40201a&":
/*!***********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-split-orders-button.vue?vue&type=template&id=ee40201a& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_orders_button_vue_vue_type_template_id_ee40201a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_orders_button_vue_vue_type_template_id_ee40201a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_split_orders_button_vue_vue_type_template_id_ee40201a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-split-orders-button.vue?vue&type=template&id=ee40201a& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-orders-button.vue?vue&type=template&id=ee40201a&");


/***/ }),

/***/ "./Resources/ts/components/gastro-table-button.vue?vue&type=template&id=76bff116&":
/*!****************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-table-button.vue?vue&type=template&id=76bff116& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_button_vue_vue_type_template_id_76bff116___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_button_vue_vue_type_template_id_76bff116___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_button_vue_vue_type_template_id_76bff116___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-table-button.vue?vue&type=template&id=76bff116& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table-button.vue?vue&type=template&id=76bff116&");


/***/ }),

/***/ "./Resources/ts/components/gastro-table.vue?vue&type=template&id=e2f8fccc&":
/*!*********************************************************************************!*\
  !*** ./Resources/ts/components/gastro-table.vue?vue&type=template&id=e2f8fccc& ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_vue_vue_type_template_id_e2f8fccc___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_vue_vue_type_template_id_e2f8fccc___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_table_vue_vue_type_template_id_e2f8fccc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-table.vue?vue&type=template&id=e2f8fccc& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table.vue?vue&type=template&id=e2f8fccc&");


/***/ }),

/***/ "./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359&":
/*!*********************************************************************************************!*\
  !*** ./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_to_kitchen_button_vue_vue_type_template_id_11f1f359___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_to_kitchen_button_vue_vue_type_template_id_11f1f359___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_gastro_to_kitchen_button_vue_vue_type_template_id_11f1f359___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359& */ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359&");


/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-add-buttons.vue?vue&type=template&id=6da21da1&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-add-buttons.vue?vue&type=template&id=6da21da1& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "h-16 flex flex-shrink-0 border-t border-gray-200",
      attrs: { id: "gastro-add-buttons" },
    },
    [
      _c(
        "div",
        {
          staticClass:
            "flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center bg-green-500 text-white hover:bg-green-600 border-r border-green-600 flex-auto",
          attrs: { id: "kitchen-button" },
          on: {
            click: function ($event) {
              return _vm.submitAddToOrder()
            },
          },
        },
        [
          _c("i", {
            staticClass: "mr-2 text-xl lg:text-3xl las la-paper-plane",
          }),
          _vm._v(" "),
          _c("span", { staticClass: "text-lg lg:text-2xl" }, [
            _vm._v(_vm._s(_vm.__m("To Kitchen"))),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center bg-red-500 text-white border-r hover:bg-red-600 border-red-600 flex-auto",
          attrs: { id: "hold-button" },
          on: {
            click: function ($event) {
              return _vm.cancelAddToOrder()
            },
          },
        },
        [
          _c("i", { staticClass: "mr-2 text-xl lg:text-3xl las la-times" }),
          _vm._v(" "),
          _c("span", { staticClass: "text-lg lg:text-2xl" }, [
            _vm._v(_vm._s(_vm.__m("Cancel", "NsGastro"))),
          ]),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-keyboard.vue?vue&type=template&id=4097144b&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-keyboard.vue?vue&type=template&id=4097144b& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "shadow-lg ns-box w-95vw md:w-3/5-screen" }, [
    _c(
      "div",
      { staticClass: "border-b ns-box-header p-2 flex justify-between" },
      [
        _c("h3", [_vm._v(_vm._s(_vm.__m("Define Quantity", "NsGastro")))]),
        _vm._v(" "),
        _c("ns-close-button", {
          on: {
            click: function ($event) {
              return _vm.closePopup()
            },
          },
        }),
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "p-2 border-b ns-box-body" }, [
      _c("div", { staticClass: "text-3xl flex justify-end p-2" }, [
        _vm._v(_vm._s(_vm.modifier.quantity)),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "p-2" },
      [
        _c(_vm.keyboardComponent(), {
          tag: "component",
          attrs: { value: _vm.modifier.quantity },
          on: {
            next: function ($event) {
              return _vm.saveQuantity($event)
            },
            changed: function ($event) {
              return _vm.updateModifierQuantity($event)
            },
          },
        }),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0&":
/*!*******************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-kitchen-settings.vue?vue&type=template&id=bd02abe0& ***!
  \*******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "w-95vw md:w-3/5-screen lg:w-2/5-screen shadow-xl ns-box" },
    [
      _c(
        "div",
        {
          staticClass:
            "p-2 flex items-center border-b ns-box-header justify-between",
        },
        [
          _c("div", { staticClass: "h3 font-semibold" }, [
            _vm._v(_vm._s(_vm.title)),
          ]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.popupResolver(false)
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "p-2" },
        _vm._l(_vm.fields, function (field, index) {
          return _c("ns-field", { key: index, attrs: { field: field } })
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "p-2 border-t ns-box-body flex justify-between" },
        [
          _c("div"),
          _vm._v(" "),
          _c(
            "div",
            [
              _c(
                "ns-button",
                {
                  attrs: { type: "info" },
                  on: {
                    click: function ($event) {
                      return _vm.saveForm()
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__m("Save", "NsGastro")))]
              ),
            ],
            1
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=template&id=734dad91&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-merge-orders-button.vue?vue&type=template&id=734dad91& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ns-button hover-warning" }, [
    _c(
      "button",
      {
        staticClass:
          "flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm",
        on: {
          click: function ($event) {
            return _vm.openMergeOrderPopup()
          },
        },
      },
      [
        _c("i", { staticClass: "text-xl las la-compress-arrows-alt mr-2" }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.__m("Merge Orders", "NsGastro")))]),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-modifier-group.vue?vue&type=template&id=cc0c3326&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "shadow-lg ns-box h-95vh md:h-4/5-screen w-95vw md:w-3/5-screen flex flex-col",
    },
    [
      _c(
        "div",
        {
          staticClass:
            "p-2 border-b ns-box-header flex justify-between items-center",
        },
        [
          _c("h3", [_vm._v(_vm._s(_vm.__m("Modifier", "NsGastro")))]),
          _vm._v(" "),
          _c("ns-close-button", {
            on: {
              click: function ($event) {
                return _vm.close()
              },
            },
          }),
        ],
        1
      ),
      _vm._v(" "),
      _vm.modifierGroup === null
        ? _c(
            "div",
            { staticClass: "h-84 flex items-center justify-center" },
            [_c("ns-spinner")],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.modifierGroup !== null
        ? _c(
            "div",
            { staticClass: "overflow-hidden flex-auto flex flex-col" },
            [
              _c(
                "div",
                { staticClass: "m-2 p-2 ns-notice success text-center" },
                [
                  _c("p", [
                    _vm._v(
                      _vm._s(
                        _vm.modifierGroup.description ||
                          "No description provided."
                      )
                    ),
                  ]),
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "grid grid-cols-2 md:grid-cols-3 overflow-hidden cursor-pointer overflow-y-auto",
                },
                _vm._l(_vm.modifierGroup.modifiers, function (modifier) {
                  return _c(
                    "div",
                    {
                      key: modifier.id,
                      staticClass: "border h-44 md:h-56 ns-numpad-key",
                      class: modifier.selected ? "info" : "",
                      on: {
                        click: function ($event) {
                          return _vm.select(modifier)
                        },
                      },
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "relative h-full w-full flex items-center justify-center overflow-hidden",
                        },
                        [
                          modifier.quantity > 0
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "flex items-center justify-center text-white absolute right-4 top-4 rounded-full h-8 w-8 bg-info-secondary font-bold",
                                },
                                [_vm._v(_vm._s(modifier.quantity))]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          modifier.galleries[0]
                            ? _c("img", {
                                staticClass: "object-cover h-full",
                                attrs: {
                                  src: modifier.galleries[0].url,
                                  alt: modifier.name,
                                },
                              })
                            : _vm._e(),
                          _vm._v(" "),
                          !modifier.galleries[0]
                            ? _c("i", {
                                staticClass:
                                  "las la-image text-secondary text-6xl",
                              })
                            : _vm._e(),
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "h-0 w-full" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "relative w-full flex items-center justify-center -top-10 h-20 py-2 flex-col modifier-item",
                          },
                          [
                            _c(
                              "h3",
                              {
                                staticClass:
                                  "font-bold text-primary py-2 text-center",
                              },
                              [_vm._v(_vm._s(modifier.name))]
                            ),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                staticClass:
                                  "text-xs font-bold text-secondary py-1 text-center",
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("currency")(
                                      modifier.unit_quantities[0].sale_price
                                    )
                                  )
                                ),
                              ]
                            ),
                          ]
                        ),
                      ]),
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "border-t ns-box-footer border-gray p-2 flex justify-between items-center",
                },
                [
                  _c("div"),
                  _vm._v(" "),
                  _c(
                    "div",
                    [
                      _c(
                        "ns-button",
                        {
                          attrs: { type: "info" },
                          on: {
                            click: function ($event) {
                              return _vm.nextStep()
                            },
                          },
                        },
                        [_vm._v(_vm._s(_vm.__m("Continue", "NsGastro")))]
                      ),
                    ],
                    1
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-meal.vue?vue&type=template&id=9940d500&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-meal.vue?vue&type=template&id=9940d500& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "shadow-lg w-95vw md:w-3/5-screen lg:w-2/5-screen bg-white",
    },
    [
      _c(
        "div",
        { staticClass: "p-2 flex justify-between border-b items-center" },
        [
          _c("h3", [_vm._v(_vm._s(_vm.__m("Meal Status", "NsGastro")))]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.closePopup()
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c("div", [
        _c("div", { staticClass: "grid grid-cols-2 text-gray-700" }, [
          _c(
            "div",
            {
              staticClass:
                "cursor-pointer hover:bg-blue-400 hover:text-white border border-gray-100 h-36 flex items-center flex-col justify-center",
              on: {
                click: function ($event) {
                  return _vm.printKitchen()
                },
              },
            },
            [
              _c("i", { staticClass: "text-6xl las la-print" }),
              _vm._v(" "),
              _c("span", { staticClass: "font-bold" }, [
                _vm._v(_vm._s(_vm.__m("Print", "NsGastro"))),
              ]),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "cursor-pointer hover:bg-blue-400 hover:text-white border border-gray-100 h-36 flex items-center flex-col justify-center",
              on: {
                click: function ($event) {
                  return _vm.cancelMeal()
                },
              },
            },
            [
              _c("i", { staticClass: "text-6xl las la-ban" }),
              _vm._v(" "),
              _c("span", { staticClass: "font-bold" }, [
                _vm._v(_vm._s(_vm.__m("Cancel", "NsGastro"))),
              ]),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "cursor-pointer hover:bg-blue-400 hover:text-white border border-gray-100 h-36 flex items-center flex-col justify-center",
              on: {
                click: function ($event) {
                  return _vm.addProductNote()
                },
              },
            },
            [
              _c("i", { staticClass: "text-6xl las la-comment-alt" }),
              _vm._v(" "),
              _c("span", { staticClass: "font-bold" }, [
                _vm._v(_vm._s(_vm.__m("Note", "NsGastro"))),
              ]),
            ]
          ),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-merge.vue?vue&type=template&id=363b26cb&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-merge.vue?vue&type=template&id=363b26cb& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "ns-box shadowl-lg w-95vw h-95vh lg:w-2/3-screen flex flex-col text-gray-700 overflow-hidden",
    },
    [
      _c(
        "div",
        {
          staticClass:
            "border-b ns-box-header p-2 flex justify-between items-center",
        },
        [
          _c("span", { staticClass: "font-semibold" }, [
            _vm._v(_vm._s(_vm.__m("Merge Orders", "NsGastro"))),
          ]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.popupResolver(false)
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "p-2 ns-box-body flex flex-col flex-auto overflow-hidden",
        },
        [
          _c(
            "div",
            {
              staticClass:
                "rounded overflow-hidden border-2 flex flex-shrink-0 input-group info w-full",
            },
            [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.search,
                    expression: "search",
                  },
                ],
                ref: "searchField",
                staticClass: "flex-auto p-2 outline-none",
                attrs: {
                  placeholder: _vm.__m("Order Code", "NsGastro"),
                  type: "text",
                },
                domProps: { value: _vm.search },
                on: {
                  input: function ($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.search = $event.target.value
                  },
                },
              }),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "px-3 py-2",
                  on: {
                    click: function ($event) {
                      return _vm.searchOrderWithQuery(_vm.search)
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__m("Search", "NsGastro")))]
              ),
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "h-0 relative" }, [
            _c(
              "div",
              { staticClass: "shadow elevation-surface w-full absolute z-10" },
              [
                _c(
                  "ul",
                  _vm._l(_vm.searchResults, function (order) {
                    return _c(
                      "li",
                      {
                        key: order.id,
                        staticClass:
                          "cursor-pointer p-2 border-b border-box-edge flex flex-col justify-between",
                        on: {
                          click: function ($event) {
                            return _vm.addToTheQueue(order)
                          },
                        },
                      },
                      [
                        _c("div", { staticClass: "flex justify-between" }, [
                          _c(
                            "h2",
                            { staticClass: "font-semibold text-primary" },
                            [_vm._v(_vm._s(order.code))]
                          ),
                          _vm._v(" "),
                          _c("span", { staticClass: "text-primary" }, [
                            _vm._v(_vm._s(_vm._f("currency")(order.total))),
                          ]),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "flex justify-between" }, [
                          _c("div", [
                            _c(
                              "span",
                              { staticClass: "text-sm text-secondary" },
                              [
                                _vm._v(
                                  _vm._s(_vm.__m("Customer: ", "NsGastro")) +
                                    " " +
                                    _vm._s(order.customer.name)
                                ),
                              ]
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", [
                            _c(
                              "span",
                              { staticClass: "text-sm text-secondary" },
                              [
                                _vm._v(
                                  _vm._s(_vm.__m("Order Type: ", "NsGastro")) +
                                    " " +
                                    _vm._s(_vm.getOrderType(order.type))
                                ),
                              ]
                            ),
                          ]),
                        ]),
                      ]
                    )
                  }),
                  0
                ),
              ]
            ),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "py-2 md:py-4" }, [
            _c("div", { staticClass: "-mx-2 md:-mx-4 flex flex-wrap" }, [
              _c("div", { staticClass: "px-2 md:px-4 w-1/2" }, [
                _c(
                  "div",
                  {
                    staticClass: "shadow elevation-surface border rounded p-2",
                  },
                  [
                    _c("h4", { staticClass: "font-semibold" }, [
                      _vm._v(_vm._s(_vm.__m("Total", "NsGastro"))),
                    ]),
                    _vm._v(" "),
                    _c(
                      "h2",
                      { staticClass: "font-bold text-2xl md:text-4xl" },
                      [_vm._v(_vm._s(_vm._f("currency")(_vm.totalOrders)))]
                    ),
                  ]
                ),
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "px-2 md:px-4 w-1/2" }, [
                _c(
                  "div",
                  {
                    staticClass: "shadow elevation-surface border rounded p-2",
                  },
                  [
                    _c("h4", { staticClass: "font-semibold" }, [
                      _vm._v(_vm._s(_vm.__m("Products", "NsGastro"))),
                    ]),
                    _vm._v(" "),
                    _c(
                      "h2",
                      { staticClass: "font-bold text-2xl md:text-4xl" },
                      [_vm._v(_vm._s(_vm.totalProducts))]
                    ),
                  ]
                ),
              ]),
            ]),
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "overflow-y-auto flex-auto" }, [
            _c("div", { staticClass: "p-2" }, [
              _c(
                "div",
                { staticClass: "flex -mx-2 md:flex-nowrap flex-wrap" },
                [
                  _c("div", { staticClass: "w-full md:w-1/2 lg:w-2/6 px-2" }, [
                    _c(
                      "h3",
                      {
                        staticClass:
                          "border-b font-semibold text-sm border-info-tertiary py-2",
                      },
                      [_vm._v(_vm._s(_vm.__m("Queued Orders", "NsGastro")))]
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      { staticClass: "py-2" },
                      [
                        _vm._l(_vm.queuedOrders, function (order) {
                          return _c(
                            "li",
                            {
                              key: order.id,
                              staticClass:
                                "shadow elevation-surface border rounded p-2 flex items-center justify-between",
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "flex flex-auto justify-between",
                                },
                                [
                                  _c("span", [_vm._v(_vm._s(order.code))]),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(_vm._f("currency")(order.total))
                                    ),
                                  ]),
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "ml-2" },
                                [
                                  _c("ns-close-button", {
                                    on: {
                                      click: function ($event) {
                                        return _vm.removeOrderFromQueue(order)
                                      },
                                    },
                                  }),
                                ],
                                1
                              ),
                            ]
                          )
                        }),
                        _vm._v(" "),
                        _vm.queuedOrders.length === 0
                          ? _c(
                              "li",
                              {
                                staticClass:
                                  "p-2 shadow elevation-surface border text-center",
                              },
                              [
                                _vm._v(
                                  _vm._s(
                                    _vm.__m(
                                      "No order has been queued.",
                                      "NsGastro"
                                    )
                                  )
                                ),
                              ]
                            )
                          : _vm._e(),
                      ],
                      2
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "w-full md:w-1/2 lg:w-4/6 px-2" }, [
                    _c(
                      "h3",
                      {
                        staticClass:
                          "border-b font-semibold text-sm border-info-tertiary py-2",
                      },
                      [_vm._v(_vm._s(_vm.__m("Order Settings", "NsGastro")))]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "elevation-surface my-4 p-2" }, [
                      _c(
                        "div",
                        { staticClass: "-mx-2 flex flex-wrap" },
                        _vm._l(_vm.orderFields, function (field, index) {
                          return _c(
                            "div",
                            { key: index, staticClass: "p-2 w-full md:w-1/2" },
                            [
                              _c("ns-field", {
                                attrs: { field: field },
                                on: {
                                  change: function ($event) {
                                    return _vm.detectOrderType($event)
                                  },
                                },
                              }),
                            ],
                            1
                          )
                        }),
                        0
                      ),
                    ]),
                  ]),
                ]
              ),
            ]),
          ]),
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "p-2 flex justify-between border-t border-box-edge" },
        [
          _c("div"),
          _vm._v(" "),
          _c(
            "div",
            [
              _c(
                "ns-button",
                {
                  attrs: { type: "info" },
                  on: {
                    click: function ($event) {
                      return _vm.submitOrderMerging()
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__m("Submit", "NsGastro")))]
              ),
            ],
            1
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-move.vue?vue&type=template&id=05e58a6d&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-move.vue?vue&type=template&id=05e58a6d& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.order
    ? _c(
        "div",
        {
          staticClass:
            "shadow-full ns-box w-95vw h-95vh md:w-3/4-screen lg:w-3/6-screen md:h-half overflow-hidden flex flex-col",
        },
        [
          _c(
            "div",
            {
              staticClass:
                "border-b ns-box-header p-2 flex flex-col md:flex-row justify-between items-center",
            },
            [
              _c("div", { staticClass: "flex-auto" }, [
                _c("h3", { staticClass: "font-semibold mb-1 md:mb-0" }, [
                  _vm._v(_vm._s(_vm.__m("Move Order", "NsGastro"))),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "flex items-center justify-between w-full md:w-auto",
                },
                [
                  _c(
                    "div",
                    { staticClass: "px-1" },
                    [
                      _c("ns-close-button", {
                        on: {
                          click: function ($event) {
                            return _vm.closePopup()
                          },
                        },
                      }),
                    ],
                    1
                  ),
                ]
              ),
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "p-2 ns-box-body flex-auto flex flex-col overflow-hidden",
            },
            [
              _c("p", { staticClass: "text-center mb-4 text-primary" }, [
                _vm._v(
                  _vm._s(
                    _vm
                      .__m(
                        "You're about to move the order {order}. Please select the table where you would like to move the order.",
                        "NsGastro"
                      )
                      .replace("{order}", this.order.code)
                  )
                ),
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "shadow rounded elevation-surface flex flex-col overflow-hidden",
                },
                [
                  _c("div", { staticClass: "p-2 flex-col flex border-b" }, [
                    _c(
                      "div",
                      { staticClass: "input-group border-2 overflow-hidden" },
                      [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.tableName,
                              expression: "tableName",
                            },
                          ],
                          staticClass: "w-full p-2",
                          attrs: {
                            type: "text",
                            placeholder: _vm.__m("Search a table", "NsGastro"),
                          },
                          domProps: { value: _vm.tableName },
                          on: {
                            input: function ($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.tableName = $event.target.value
                            },
                          },
                        }),
                      ]
                    ),
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "overflow-y-auto" }, [
                    _c(
                      "ul",
                      _vm._l(_vm.tables, function (table) {
                        return _c(
                          "li",
                          {
                            key: table.id,
                            staticClass:
                              "hover:bg-blue-100 cursor-pointer text-primary p-2 border-b flex justify-between",
                            on: {
                              click: function ($event) {
                                return _vm.moveTo(table)
                              },
                            },
                          },
                          [
                            _c("span", [_vm._v(_vm._s(table.name))]),
                            _vm._v(" "),
                            _c("div", [
                              !table.busy
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "rounded-full px-2 text-xs py-1 bg-green-400",
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.__m("Available", "NsGastro"))
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              table.busy
                                ? _c(
                                    "span",
                                    {
                                      staticClass:
                                        "rounded-full px-2 text-xs py-1 bg-yellow-400",
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.__m("Busy", "NsGastro"))
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                            ]),
                          ]
                        )
                      }),
                      0
                    ),
                  ]),
                ]
              ),
            ]
          ),
        ]
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-options.vue?vue&type=template&id=28914f32&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-order-options.vue?vue&type=template&id=28914f32& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "shadow-full ns-box w-95vw h-1/2 md:w-3/4-screen lg:w-3/6-screen overflow-hidden flex flex-col",
    },
    [
      _c(
        "div",
        { staticClass: "grid grid-cols-2" },
        _vm._l(_vm.options, function (option, index) {
          return _c(
            "div",
            {
              key: index,
              staticClass:
                "border ns-numpad-key flex cursor-pointer items-center justify-center go-h-52 flex-col",
              on: {
                click: function ($event) {
                  return option.onClick(_vm.order)
                },
              },
            },
            [
              _c("i", {
                staticClass: "las go-text-8xl mr-1",
                class: option.icon,
              }),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(option.label))]),
            ]
          )
        }),
        0
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-orders-button.vue?vue&type=template&id=cdedaca6& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ns-button hover-info" }, [
    _c(
      "button",
      {
        staticClass:
          "relative flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm ",
        on: {
          click: function ($event) {
            return _vm.openReadyOrder()
          },
        },
      },
      [
        _c("i", { staticClass: "text-xl las la-check-circle" }),
        _vm._v(" "),
        _c("span", { staticClass: "ml-1" }, [
          _vm._v(_vm._s(_vm.__m("Ready Meals", "NsGastro"))),
        ]),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass:
              "h-6 w-6 ml-1 justify-center rounded-full flex items-center bg-info-tertiary text-white fond-bold",
          },
          [_vm._v(_vm._s(_vm.readyMeals))]
        ),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-product-options.vue?vue&type=template&id=4118d893&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-product-options.vue?vue&type=template&id=4118d893& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "ns-box shadow-lg w-2/3-screen md:w-1/3-screen overflow-hidden",
    },
    [
      _c(
        "div",
        {
          staticClass:
            "p-2 border-b ns-box-header flex justify-between items-center",
        },
        [
          _c("span", [_vm._v(_vm._s(_vm.__m("Product Options", "NsGastro")))]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.popupResolver(false)
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "grid grid-cols-2" }, [
        _c(
          "div",
          {
            staticClass:
              "h-32 border ns-numpad-key flex items-center justify-center flex-col",
            class:
              _vm.product.cooking_status === "ready"
                ? "cursor-pointer"
                : "cursor-not-allowed",
            on: {
              click: function ($event) {
                return _vm.serveMeal()
              },
            },
          },
          [
            _c("i", { staticClass: "text-6xl las la-concierge-bell" }),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(_vm.__m("Served", "NsGastro")))]),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "cursor-pointer h-32 border ns-numpad-key flex items-center justify-center flex-col",
            class:
              _vm.product.cooking_status !== "canceled"
                ? "cursor-pointer"
                : "cursor-not-allowed",
            on: {
              click: function ($event) {
                return _vm.cancelMeal()
              },
            },
          },
          [
            _c("i", { staticClass: "text-6xl las la-times" }),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(_vm.__m("Cancel", "NsGastro")))]),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "h-32 border ns-numpad-key flex items-center justify-center flex-col",
            class:
              _vm.product.cooking_status === "pending"
                ? "cursor-pointer"
                : "cursor-not-allowed",
            on: {
              click: function ($event) {
                return _vm.updateNote()
              },
            },
          },
          [
            _c("i", { staticClass: "text-6xl las la-comment-alt" }),
            _vm._v(" "),
            _c("span", [_vm._v(_vm._s(_vm.__m("Note", "NsGastro")))]),
          ]
        ),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-ready-meals.vue?vue&type=template&id=350fdfb9& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "w-95vw h-95vh ns-box flex flex-col shadow-xl md:w-3/5-screen md:h-4/5-screen overflow-hidden",
    },
    [
      _c(
        "div",
        {
          staticClass:
            "border-b ns-box-body p-2 flex justify-between items-center",
        },
        [
          _c("h3", { staticClass: "font-semibold" }, [
            _vm._v(_vm._s(_vm.__m("Ready Meals", "NsGastro"))),
          ]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.popupResolver(false)
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _vm.loaded && _vm.response.data.length === 0
        ? _c(
            "div",
            {
              staticClass:
                "flex flex-auto justify-center items-center flex-col text-primary",
            },
            [
              _c("i", { staticClass: "go-text-9xl las la-laugh-wink" }),
              _vm._v(" "),
              _c("span", [
                _vm._v(
                  _vm._s(
                    _vm.__m(
                      "Looks like there is nothing to worry about.",
                      "NsGastro"
                    )
                  )
                ),
              ]),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.loaded && _vm.response.data.length > 0
        ? _c("div", { staticClass: "overflow-y-auto flex-auto" }, [
            _c("table", { staticClass: "w-full ns-table" }, [
              _c("thead", [
                _c("tr", [
                  _c(
                    "th",
                    {
                      staticClass: "p-2 border text-left",
                      attrs: { width: "300" },
                    },
                    [_vm._v(_vm._s(_vm.__m("Product", "NsGastro")))]
                  ),
                ]),
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.response.data, function (meal) {
                  return _c(
                    "tr",
                    {
                      key: meal.id,
                      on: {
                        click: function ($event) {
                          return _vm.serveMeal(meal)
                        },
                      },
                    },
                    [
                      _c("td", { staticClass: "p-2 cursor-pointer border-b" }, [
                        _c("h3", { staticClass: "font-semibold" }, [
                          _vm._v(
                            _vm._s(meal.name) +
                              " (x" +
                              _vm._s(meal.quantity) +
                              ")"
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "grid grid-cols-2 text-sm" }, [
                          _c("div", [
                            _vm._v(
                              _vm._s(_vm.__m("Placed By", "NsGastro")) +
                                " : " +
                                _vm._s(
                                  meal.meal_placed_by_name ||
                                    _vm.__m("N/A", "NsGastro")
                                )
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", [
                            _vm._v(
                              _vm._s(_vm.__m("Order", "NsGastro")) +
                                " : " +
                                _vm._s(meal.order.code)
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", [
                            _vm._v(
                              _vm._s(_vm.__m("Table", "NsGastro")) +
                                " : " +
                                _vm._s(
                                  meal.order.table_name ||
                                    _vm.__m("N/A", "NsGastro")
                                )
                            ),
                          ]),
                          _vm._v(" "),
                          _c("div", [
                            _vm._v(
                              _vm._s(_vm.__m("Type", "NsGastro")) +
                                " : " +
                                _vm._s(meal.order.type)
                            ),
                          ]),
                        ]),
                      ]),
                    ]
                  )
                }),
                0
              ),
            ]),
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.loaded
        ? _c(
            "div",
            {
              staticClass:
                "overflow-y-auto flex-auto flex items-center justify-center",
            },
            [_c("ns-spinner")],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "p-2 flex justify-between items-center ns-box-footer border-t",
        },
        [
          _c("div", [
            _vm.response !== null
              ? _c(
                  "div",
                  { staticClass: "rounded-lg overflow-hidden flex" },
                  _vm._l(_vm.response.links, function (link, index) {
                    return _c(
                      "div",
                      { key: index, staticClass: "ns-button hover-info" },
                      [
                        !["pagination.previous", "pagination.next"].includes(
                          link.label
                        )
                          ? _c("button", {
                              staticClass:
                                "border rounded-lg text-sm mx-1 px-2 py-1",
                              domProps: { innerHTML: _vm._s(link.label) },
                              on: {
                                click: function ($event) {
                                  return _vm.gotToPage(link)
                                },
                              },
                            })
                          : _vm._e(),
                      ]
                    )
                  }),
                  0
                )
              : _vm._e(),
          ]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c(
                "ns-button",
                {
                  attrs: { type: "info" },
                  on: {
                    click: function ($event) {
                      return _vm.markListedAsServed()
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__m("Listed As Served", "NsGastro")))]
              ),
            ],
            1
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-tables.vue?vue&type=template&id=7c3209e2&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-pos-tables.vue?vue&type=template&id=7c3209e2& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "w-95vw h-95vh md:w-4/5-screen md:h-4/5-screen bg-white shadow-lg ",
    },
    [
      _c(
        "div",
        {
          staticClass:
            "header border-b border-gray-200 p-2 flex justify-between items-center",
        },
        [
          _c("h3", { staticClass: "font-bold" }, [
            _vm._v(_vm._s(_vm.__m("Table Management", "NsGastro"))),
          ]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.closePopup()
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-seats.vue?vue&type=template&id=734998da&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-seats.vue?vue&type=template&id=734998da& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "shadow-lg ns-box w-95vw md:w-3/5-screen" }, [
    _c(
      "div",
      {
        staticClass:
          "border-b ns-box-header p-2 flex justify-between items-center",
      },
      [
        _c("h3", [_vm._v(_vm._s(_vm.__m("Select Seats", "NsGastro")))]),
        _vm._v(" "),
        _c("ns-close-button", {
          on: {
            click: function ($event) {
              return _vm.closePopup()
            },
          },
        }),
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "p-2 border-b ns-box-body" }, [
      _c("div", { staticClass: "bg-gray-100 text-3xl flex justify-end p-2" }, [
        _vm._v(_vm._s(_vm.table.selectedSeats)),
      ]),
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "p-2" },
      [
        _c(_vm.keyboardComponent(), {
          tag: "component",
          attrs: { value: _vm.selectedSeats },
          on: {
            next: function ($event) {
              return _vm.saveQuantity($event)
            },
            changed: function ($event) {
              return _vm.updateModifierQuantity($event)
            },
          },
        }),
      ],
      1
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-order.vue?vue&type=template&id=5035fb27&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-order.vue?vue&type=template&id=5035fb27& ***!
  \**************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "shadow-xl flex flex-col w-95vw h-95vh ns-box" },
    [
      _c(
        "div",
        {
          staticClass:
            "flex justify-between border-b items-center ns-box-header p-2",
        },
        [
          _c("h2", [_vm._v(_vm._s(_vm.__m("Split Orders", "NsGastro")))]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c("ns-close-button", {
                on: {
                  click: function ($event) {
                    return _vm.popupResolver()
                  },
                },
              }),
            ],
            1
          ),
        ]
      ),
      _vm._v(" "),
      _vm.splitResult === null
        ? _c(
            "div",
            {
              staticClass:
                "p-2 ns-box-body flex-auto flex flex-col overflow-hidden",
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "rounded overflow-hidden border-2 flex flex-shrink-0 input-group info w-full",
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.search,
                        expression: "search",
                      },
                    ],
                    ref: "searchField",
                    staticClass: "flex-auto p-2 outline-none",
                    attrs: {
                      placeholder: _vm.__m("Order Code", "NsGastro"),
                      type: "text",
                    },
                    domProps: { value: _vm.search },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.search = $event.target.value
                      },
                    },
                  }),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "px-3 py-2",
                      on: {
                        click: function ($event) {
                          return _vm.searchOrderWithQuery(_vm.search)
                        },
                      },
                    },
                    [_vm._v(_vm._s(_vm.__m("Search", "NsGastro")))]
                  ),
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "h-0 relative" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "shadow elevation-surface w-full absolute z-10",
                  },
                  [
                    _c(
                      "ul",
                      _vm._l(_vm.searchResults, function (order) {
                        return _c(
                          "li",
                          {
                            key: order.id,
                            staticClass:
                              "cursor-pointer p-2 border-b bg-box-elevation-edge flex flex-col justify-between",
                            on: {
                              click: function ($event) {
                                return _vm.selectOrder(order)
                              },
                            },
                          },
                          [
                            _c("div", { staticClass: "flex justify-between" }, [
                              _c(
                                "h2",
                                { staticClass: "font-semibold text-primary" },
                                [_vm._v(_vm._s(order.code))]
                              ),
                              _vm._v(" "),
                              _c("span", { staticClass: "text-primary" }, [
                                _vm._v(_vm._s(_vm._f("currency")(order.total))),
                              ]),
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "flex justify-between" }, [
                              _c("div", [
                                _c(
                                  "span",
                                  { staticClass: "text-sm text-secondary" },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__m("Customer: ", "NsGastro")
                                      ) +
                                        " " +
                                        _vm._s(order.customer.name)
                                    ),
                                  ]
                                ),
                              ]),
                              _vm._v(" "),
                              _c("div", [
                                _c(
                                  "span",
                                  { staticClass: "text-sm text-secondary" },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.__m("Order Type: ", "NsGastro")
                                      ) +
                                        " " +
                                        _vm._s(_vm.getOrderType(order.type))
                                    ),
                                  ]
                                ),
                              ]),
                            ]),
                          ]
                        )
                      }),
                      0
                    ),
                  ]
                ),
              ]),
              _vm._v(" "),
              _vm.selectedOrder === null
                ? _c(
                    "div",
                    {
                      staticClass:
                        "h-full w-full flex items-center justify-center",
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "flex flex-col justify-center items-center text-gray-500",
                        },
                        [
                          _c("i", { staticClass: "las la-smile go-text-8xl" }),
                          _vm._v(" "),
                          _c("p", { staticClass: "text-sm" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__m(
                                  "Search an order to get started.",
                                  "NsGastro"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.selectedOrder !== null
                ? _c(
                    "div",
                    {
                      staticClass:
                        "flex flex-auto go-mt-4 flex-wrap overflow-auto md:overflow-hidden",
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "w-full md:w-1/2 md:h-full p-2 elevation-surface md:flex-auto md:overflow-y-auto",
                        },
                        [
                          _c(
                            "h1",
                            {
                              staticClass:
                                "text-secondary w-full py-2 border-b border-indigo-400 flex justify-between",
                            },
                            [
                              _c("span", [
                                _vm._v(
                                  _vm._s(_vm.__m("Original Order", "NsGastro"))
                                ),
                              ]),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(_vm._s(_vm.selectedOrder.code)),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "py-2" }, [
                            _c("div", { staticClass: "flex mb-2" }, [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "rounded border-2 input-group info flex overflow-hidden flex-auto",
                                },
                                [
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.slices,
                                        expression: "slices",
                                      },
                                    ],
                                    ref: "sliceField",
                                    staticClass: "p-2 flex-auto outline-none",
                                    attrs: { type: "number" },
                                    domProps: { value: _vm.slices },
                                    on: {
                                      input: function ($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.slices = $event.target.value
                                      },
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "button",
                                    {
                                      staticClass: "px-3 py-1",
                                      on: {
                                        click: function ($event) {
                                          return _vm.generatePortions()
                                        },
                                      },
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(_vm.__m("Generate", "NsGastro"))
                                      ),
                                    ]
                                  ),
                                ]
                              ),
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "flex flex-wrap -mx-1" },
                              _vm._l(_vm.orderProducts, function (product) {
                                return _c(
                                  "div",
                                  {
                                    key: product.id,
                                    staticClass: "p-1 w-full lg:w-1/2",
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "bg-info-secondary flex p-2",
                                      },
                                      [
                                        _c(
                                          "div",
                                          { staticClass: "flex flex-auto" },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "flex-auto" },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-primary",
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(product.name) +
                                                        " (x" +
                                                        _vm._s(
                                                          product.displayed_quantity
                                                        ) +
                                                        ")"
                                                    ),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "ul",
                                                  _vm._l(
                                                    product.modifiers,
                                                    function (modifier) {
                                                      return _c(
                                                        "li",
                                                        {
                                                          key: modifier.id,
                                                          staticClass:
                                                            "text-sm text-secondary p-1 border-b border-blue-400 flex justify-between",
                                                        },
                                                        [
                                                          _c("span", [
                                                            _vm._v(
                                                              _vm._s(
                                                                modifier.name
                                                              ) +
                                                                " (x" +
                                                                _vm._s(
                                                                  modifier.quantity
                                                                ) +
                                                                ")"
                                                            ),
                                                          ]),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _vm._v(
                                                              _vm._s(
                                                                _vm._f(
                                                                  "currency"
                                                                )(
                                                                  modifier.total_price
                                                                )
                                                              )
                                                            ),
                                                          ]),
                                                        ]
                                                      )
                                                    }
                                                  ),
                                                  0
                                                ),
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass: "flex justify-end",
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm._f("currency")(
                                                      product.total_price
                                                    )
                                                  )
                                                ),
                                              ]
                                            ),
                                          ]
                                        ),
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "w-full flex" }, [
                                      _vm.sliceOrderSelected
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "flex-auto bg-blue-400 text-white font-bold outline-none p-1",
                                              on: {
                                                click: function ($event) {
                                                  return _vm.addProductToSelectedSlice(
                                                    product
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__m("Add", "NsGastro")
                                                )
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]),
                                  ]
                                )
                              }),
                              0
                            ),
                          ]),
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "w-full md:w-1/2 md:h-full md:flex-auto overflow-y-auto",
                        },
                        _vm._l(_vm.ordersPortions, function (order, index) {
                          return _c(
                            "div",
                            {
                              key: index,
                              staticClass: "p-2",
                              class: order.selected
                                ? "elevation-surface border-t-2 border-b-2 border-box-edge"
                                : "",
                            },
                            [
                              _vm._l(order.fields, function (field, index) {
                                return _c("ns-field", {
                                  key: index,
                                  attrs: { field: field },
                                  on: {
                                    change: function ($event) {
                                      return _vm.detectOrderType($event, order)
                                    },
                                  },
                                })
                              }),
                              _vm._v(" "),
                              order.products.length > 0
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "my-2 border border-box-elevation-edge",
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "head p-2 text-center font-semibold border-b border-box-elevation-edge",
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(
                                              _vm.__m("Products", "NsGastro")
                                            )
                                          ),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "p-2" },
                                        _vm._l(
                                          order.products,
                                          function (product) {
                                            return _c(
                                              "div",
                                              {
                                                key: product.id,
                                                staticClass: "mb-2",
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "flex justify-between text-primary",
                                                  },
                                                  [
                                                    _c("span", [
                                                      _vm._v(
                                                        _vm._s(product.name) +
                                                          " (x" +
                                                          _vm._s(
                                                            product.quantity
                                                          ) +
                                                          ")"
                                                      ),
                                                    ]),
                                                    _vm._v(" "),
                                                    _c("span", [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm._f("currency")(
                                                            product.total_price
                                                          )
                                                        )
                                                      ),
                                                    ]),
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                product.modifiers.length > 0
                                                  ? _c(
                                                      "ul",
                                                      _vm._l(
                                                        product.modifiers,
                                                        function (modifier) {
                                                          return _c(
                                                            "li",
                                                            {
                                                              key: modifier.id,
                                                              staticClass:
                                                                "text-secondary py-1 flex justify-between text-xs",
                                                            },
                                                            [
                                                              _c("span", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    modifier.name
                                                                  ) +
                                                                    " (x" +
                                                                    _vm._s(
                                                                      modifier.quantity
                                                                    ) +
                                                                    ")"
                                                                ),
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("span", [
                                                                _vm._v(
                                                                  _vm._s(
                                                                    _vm._f(
                                                                      "currency"
                                                                    )(
                                                                      modifier.total_price
                                                                    )
                                                                  )
                                                                ),
                                                              ]),
                                                            ]
                                                          )
                                                        }
                                                      ),
                                                      0
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "ns-button hover-error flex",
                                                  },
                                                  [
                                                    _c(
                                                      "button",
                                                      {
                                                        staticClass:
                                                          "cursor-pointer border w-full p-1 font-semibold text-center",
                                                        on: {
                                                          click: function (
                                                            $event
                                                          ) {
                                                            return _vm.reduceProduct(
                                                              product,
                                                              order
                                                            )
                                                          },
                                                        },
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            _vm.__m(
                                                              "Remove",
                                                              "NsGastro"
                                                            )
                                                          )
                                                        ),
                                                      ]
                                                    ),
                                                  ]
                                                ),
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              !order.selected
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "mt-2 text-primary font-semibold p-2 elevation-surface text-center cursor-pointer",
                                      class: order.selected ? "" : "info",
                                      on: {
                                        click: function ($event) {
                                          return _vm.selectOrderslice(order)
                                        },
                                      },
                                    },
                                    [
                                      !order.select
                                        ? _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm.__m("Select", "NsGastro")
                                              )
                                            ),
                                          ])
                                        : _vm._e(),
                                      _vm._v(" "),
                                      order.select
                                        ? _c(
                                            "span",
                                            { staticClass: "opacity-0" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.__m(
                                                    "Selected",
                                                    "NsGastro"
                                                  )
                                                )
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]
                                  )
                                : _vm._e(),
                            ],
                            2
                          )
                        }),
                        0
                      ),
                    ]
                  )
                : _vm._e(),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.splitResult
        ? _c("div", { staticClass: "p-2 flex-auto" }, [
            _c(
              "div",
              { staticClass: "-mx-4 flex flex-wrap" },
              _vm._l(_vm.splitResult, function (result, index) {
                return _c(
                  "div",
                  { key: index, staticClass: "w-full md:w-1/2 lg:w-1/3 px-4" },
                  [
                    _c("div", { staticClass: "shadow elevation-surface" }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "header p-2 font-semibold border-b border-box-edge",
                        },
                        [_vm._v(_vm._s(result.data.order.code))]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "p-2" }, [
                        _c("ul", [
                          _c(
                            "li",
                            {
                              staticClass:
                                "text-sm text-secondary p-2 border-b border-box-edge flex justify-between",
                            },
                            [
                              _c("span", [
                                _vm._v(_vm._s(_vm.__m("Net", "NsGastro"))),
                              ]),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("currency")(
                                      result.data.order.net_total
                                    )
                                  )
                                ),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "li",
                            {
                              staticClass:
                                "text-sm text-secondary p-2 border-b border-box-edge flex justify-between",
                            },
                            [
                              _c("span", [
                                _vm._v(_vm._s(_vm.__m("Total", "NsGastro"))),
                              ]),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(
                                    _vm._f("currency")(
                                      result.data.order.net_total
                                    )
                                  )
                                ),
                              ]),
                            ]
                          ),
                        ]),
                      ]),
                    ]),
                  ]
                )
              }),
              0
            ),
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.splitResult === null
        ? _c(
            "div",
            { staticClass: "p-2 flex justify-end" },
            [
              _c(
                "ns-button",
                {
                  attrs: { type: "info" },
                  on: {
                    click: function ($event) {
                      return _vm.proceedSplit()
                    },
                  },
                },
                [_vm._v(_vm._s(_vm.__m("Proceed", "NsGastro")))]
              ),
            ],
            1
          )
        : _vm._e(),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-orders-button.vue?vue&type=template&id=ee40201a&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-split-orders-button.vue?vue&type=template&id=ee40201a& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ns-button" }, [
    _c("div", { staticClass: "ns-button hover-warning" }, [
      _c(
        "button",
        {
          staticClass:
            "flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm",
          on: {
            click: function ($event) {
              return _vm.openSplitOrderPopup()
            },
          },
        },
        [
          _c("i", { staticClass: "text-xl las la-expand-arrows-alt mr-2" }),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.__m("Split Orders", "NsGastro")))]),
        ]
      ),
    ]),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table-button.vue?vue&type=template&id=76bff116&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table-button.vue?vue&type=template&id=76bff116& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ns-button hover-info" }, [
    _c(
      "button",
      {
        staticClass:
          "flex-shrink-0 h-12 flex items-center shadow rounded px-2 py-1 text-sm",
        on: {
          click: function ($event) {
            return _vm.openTableManagement()
          },
        },
      },
      [
        _c("i", { staticClass: "text-xl las la-utensils" }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.__m("Tables", "NsGastro")))]),
      ]
    ),
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table.vue?vue&type=template&id=e2f8fccc&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-table.vue?vue&type=template&id=e2f8fccc& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "shadow-full ns-box w-95vw h-95vh md:w-4/5-screen lg:w-4/6-screen md:h-4/5-screen overflow-hidden flex flex-col",
    },
    [
      _c(
        "div",
        {
          staticClass:
            "border-b ns-box-header p-2 flex flex-col md:flex-row justify-between items-center",
          class:
            _vm.selectedTable !== null
              ? _vm.selectedTable.busy
                ? "bg-success-tertiary"
                : ""
              : "",
        },
        [
          _c("div", { staticClass: "flex-auto" }, [
            _c(
              "h3",
              { staticClass: "font-semibold mb-1 md:mb-0 text-primary" },
              [
                !_vm.additionalTitle
                  ? _c("span", [
                      _vm._v(_vm._s(_vm.__m("Table Management", "NsGastro"))),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.additionalTitle
                  ? _c("span", [_vm._v(_vm._s(_vm.additionalTitle))])
                  : _vm._e(),
              ]
            ),
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "flex items-center justify-between w-full md:w-auto",
            },
            [
              _c("div", { staticClass: "flex" }, [
                ["orders", "sessions-orders"].includes(_vm.screen)
                  ? _c("div", { staticClass: "px-1" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "outline-none rounded-full px-3 py-1 border ns-inset-button success",
                          class: _vm.hasCustomSettings ? "info" : "",
                          on: {
                            click: function ($event) {
                              return _vm.openSettingsOptions()
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "las la-tools" }),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.__m("Settings", "NsGastro"))),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                ["orders", "sessions-orders", "sessions"].includes(
                  _vm.screen
                ) && _vm.ns_gastro_enable_table_sessions
                  ? _c("div", { staticClass: "px-1" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "outline-none rounded-full px-3 py-1 border ns-inset-button",
                          class: ["sessions", "sessions-orders"].includes(
                            _vm.screen
                          )
                            ? "info"
                            : "",
                          on: {
                            click: function ($event) {
                              return _vm.toggleTableSessionHistory()
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "las la-history" }),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(
                              _vm._s(_vm.__m("Session History", "NsGastro"))
                            ),
                          ]),
                        ]
                      ),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.screen === "tables"
                  ? _c(
                      "div",
                      { staticClass: "px-1 -mx-1 flex flex-col md:flex-row" },
                      [
                        _c("div", { staticClass: "px-1" }, [
                          _c(
                            "button",
                            {
                              staticClass:
                                "outline-none rounded-full px-3 py-1 border border-gray1200 ns-inset-button success",
                              class: _vm.filterMode === "busy" ? "active" : "",
                              on: {
                                click: function ($event) {
                                  return _vm.filterOnlyBusy()
                                },
                              },
                            },
                            [
                              _vm._v(
                                _vm._s(_vm.__m("Only Busy Tables", "NsGastro"))
                              ),
                            ]
                          ),
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "px-1" }, [
                          _c(
                            "button",
                            {
                              staticClass:
                                "outline-none rounded-full px-3 py-1 border border1gray-200 ns-inset-button success",
                              class: _vm.filterMode === "free" ? "active" : "",
                              on: {
                                click: function ($event) {
                                  return _vm.filterOnlyAvailable()
                                },
                              },
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.__m("Only Available Tables", "NsGastro")
                                )
                              ),
                            ]
                          ),
                        ]),
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.ns_gastro_areas_enabled && _vm.screen === "tables"
                  ? _c("div", { staticClass: "px-1 -mx-2 flex" }, [
                      _c("div", { staticClass: "px-2" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "outline-none rounded-full px-3 py-1 ns-inset-button error border",
                            on: {
                              click: function ($event) {
                                return _vm.returnToAreas()
                              },
                            },
                          },
                          [_vm._v(_vm._s(_vm.__m("Return", "NsGastro")))]
                        ),
                      ]),
                    ])
                  : _vm._e(),
                _vm._v(" "),
                ["orders", "sessions-orders"].includes(_vm.screen)
                  ? _c("div", { staticClass: "px-1" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "outline-none rounded-full px-3 py-1 ns-inset-button error border",
                          on: {
                            click: function ($event) {
                              return _vm.returnToTables()
                            },
                          },
                        },
                        [_vm._v(_vm._s(_vm.__m("Return", "NsGastro")))]
                      ),
                    ])
                  : _vm._e(),
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "px-1" },
                [
                  _c("ns-close-button", {
                    on: {
                      click: function ($event) {
                        return _vm.closePopup()
                      },
                    },
                  }),
                ],
                1
              ),
            ]
          ),
        ]
      ),
      _vm._v(" "),
      ["orders", "sessions-orders"].includes(_vm.screen)
        ? _c(
            "div",
            { staticClass: "overflow-hidden flex flex-col flex-auto" },
            [
              _vm.orders.length > 0
                ? _c("div", { staticClass: "flex-auto overflow-y-auto" }, [
                    _c(
                      "div",
                      { staticClass: "flex flex-wrap" },
                      _vm._l(_vm.orders, function (order) {
                        return _c(
                          "div",
                          {
                            key: order.id,
                            staticClass:
                              "border border-box-edge w-full p-2 md:w-1/2",
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "flex justify-between p-2" },
                              [
                                _c("h3", { staticClass: "font-semibold" }, [
                                  _vm._v(_vm._s(order.code)),
                                ]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "-mx-1 flex items-center" },
                                  [
                                    !["canceled", "ready"].includes(
                                      order.gastro_order_status
                                    )
                                      ? _c("div", { staticClass: "px-1" })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "px-1" }, [
                                      !_vm.showDetails[order.code]
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full px-3 ns-inset-button info border",
                                              on: {
                                                click: function ($event) {
                                                  return _vm.toggleDetails(
                                                    order
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass: "las la-eye",
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                { staticClass: "text-sm" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.__m(
                                                        "Show Details",
                                                        "NsGastro"
                                                      )
                                                    )
                                                  ),
                                                ]
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.showDetails[order.code]
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full px-3 ns-inset-button info border",
                                              on: {
                                                click: function ($event) {
                                                  return _vm.toggleDetails(
                                                    order
                                                  )
                                                },
                                              },
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "las la-low-vision",
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                { staticClass: "text-sm" },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.__m(
                                                        "Hide Details",
                                                        "NsGastro"
                                                      )
                                                    )
                                                  ),
                                                ]
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "px-1" }, [
                                      order.gastro_order_status === "ready"
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full ns-inset-button border px-2 success",
                                              attrs: { disabled: true },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.__m("Ready", "NsGastro")
                                                  ) +
                                                  "\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      order.gastro_order_status === "ongoing"
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full ns-inset-button border px-2 info",
                                              attrs: { disabled: true },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.__m(
                                                      "Ongoing",
                                                      "NsGastro"
                                                    )
                                                  ) +
                                                  "\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      order.gastro_order_status === "pending"
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full ns-inset-button border px-2 info",
                                              attrs: { disabled: true },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.__m(
                                                      "Pending",
                                                      "NsGastro"
                                                    )
                                                  ) +
                                                  "\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      order.gastro_order_status === "canceled"
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full ns-inset-button border px-2 error",
                                              attrs: { disabled: true },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.__m(
                                                      "Canceled",
                                                      "NsGastro"
                                                    )
                                                  ) +
                                                  "\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      order.gastro_order_status === "requested"
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full ns-inset-button border px-2 warning",
                                              attrs: { disabled: true },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.__m(
                                                      "Requested",
                                                      "NsGastro"
                                                    )
                                                  ) +
                                                  "\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      order.gastro_order_status === "processed"
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "rounded-full ns-inset-button border px-2 info",
                                              attrs: { disabled: true },
                                            },
                                            [
                                              _vm._v(
                                                "\n                                    " +
                                                  _vm._s(
                                                    _vm.__m(
                                                      "Processed",
                                                      "NsGastro"
                                                    )
                                                  ) +
                                                  "\n                                "
                                              ),
                                            ]
                                          )
                                        : _vm._e(),
                                    ]),
                                  ]
                                ),
                              ]
                            ),
                            _vm._v(" "),
                            _vm.showDetails[order.code]
                              ? _c("div", [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "flex my-1 px-2 text-sm text-primary justify-between",
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(_vm.__m("Total", "NsGastro"))
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            _vm._f("currency")(order.total)
                                          )
                                        ),
                                      ]),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "flex my-1 px-2 text-sm text-primary justify-between",
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(_vm.__m("Name", "NsGastro"))
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            order.title ||
                                              _vm.__m("N/A", "NsGastro")
                                          )
                                        ),
                                      ]),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "flex my-1 px-2 text-sm text-primary justify-between",
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(_vm.__m("Waiter", "NsGastro"))
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            order.user.username ||
                                              _vm.__m("N/A", "NsGastro")
                                          )
                                        ),
                                      ]),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "flex my-1 px-2 text-sm text-primary justify-between",
                                    },
                                    [
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            _vm.__m("Customer", "NsGastro")
                                          )
                                        ),
                                      ]),
                                      _vm._v(" "),
                                      _c("span", [
                                        _vm._v(
                                          _vm._s(
                                            order.customer.name ||
                                              _vm.__m("N/A", "NsGastro")
                                          )
                                        ),
                                      ]),
                                    ]
                                  ),
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _c("div", { staticClass: "bg-gray-100" }, [
                              _c(
                                "div",
                                _vm._l(order.products, function (product) {
                                  return _c(
                                    "div",
                                    {
                                      key: product.id,
                                      staticClass:
                                        "p-2 hover:bg-blue-100 mb-1 cursor-pointer",
                                      class: _vm.getMealBGClass(product),
                                      on: {
                                        click: function ($event) {
                                          return _vm.showProductOptions(product)
                                        },
                                      },
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "flex text-sm justify-between",
                                          class:
                                            _vm.getMealProductTextColor(
                                              product
                                            ),
                                        },
                                        [
                                          _c(
                                            "h4",
                                            { staticClass: "font-semibold" },
                                            [
                                              _vm._v(
                                                _vm._s(product.name) +
                                                  " (x" +
                                                  _vm._s(product.quantity) +
                                                  ")"
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("span", [
                                            _vm._v(
                                              _vm._s(
                                                _vm._f("currency")(
                                                  product.total_price
                                                )
                                              )
                                            ),
                                          ]),
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "ul",
                                        {
                                          staticClass: "text-xs",
                                          class:
                                            _vm.getMealModifierTextColor(
                                              product
                                            ),
                                        },
                                        _vm._l(
                                          product.modifiers,
                                          function (modifier) {
                                            return _c(
                                              "li",
                                              {
                                                key: modifier.id,
                                                staticClass:
                                                  "py-1 border-b border-dashed border-blue-400 flex justify-between",
                                              },
                                              [
                                                _c("span", [
                                                  _vm._v(
                                                    "\n                                            " +
                                                      _vm._s(modifier.name) +
                                                      " (x" +
                                                      _vm._s(
                                                        modifier.quantity
                                                      ) +
                                                      ")\n                                        "
                                                  ),
                                                ]),
                                                _vm._v(" "),
                                                _c("span", [
                                                  _vm._v(
                                                    "\n                                            " +
                                                      _vm._s(
                                                        _vm._f("currency")(
                                                          modifier.total_price
                                                        )
                                                      ) +
                                                      "\n                                        "
                                                  ),
                                                ]),
                                              ]
                                            )
                                          }
                                        ),
                                        0
                                      ),
                                    ]
                                  )
                                }),
                                0
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "flex flex-wrap" }, [
                                order.payment_status !== "paid"
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "w-1/2 lg:w-1/4 flex items-center justify-center py-1 bg-blue-400 text-white font-semibold",
                                        on: {
                                          click: function ($event) {
                                            return _vm.addProduct(order)
                                          },
                                        },
                                      },
                                      [
                                        _c("i", {
                                          staticClass:
                                            "las la-plus text-2xl mr-1",
                                        }),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.__m("Add", "NsGastro"))
                                          ),
                                        ]),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                order.payment_status !== "paid"
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          "w-1/2 lg:w-1/4 flex items-center justify-center py-1 bg-green-400 text-white font-semibold",
                                        on: {
                                          click: function ($event) {
                                            return _vm.payOrder(order)
                                          },
                                        },
                                      },
                                      [
                                        _c("i", {
                                          staticClass:
                                            "las la-money-bill-wave text-2xl mr-1",
                                        }),
                                        _vm._v(" "),
                                        _c("span", [
                                          _vm._v(
                                            _vm._s(_vm.__m("Pay", "NsGastro"))
                                          ),
                                        ]),
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "w-1/2 lg:w-1/4 flex items-center justify-center py-1 elevation-surface border font-semibold",
                                    on: {
                                      click: function ($event) {
                                        return _vm.printOrder(order)
                                      },
                                    },
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "las la-print text-2xl mr-1",
                                    }),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(_vm.__m("Print", "NsGastro"))
                                      ),
                                    ]),
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass:
                                      "w-1/2 lg:w-1/4 flex items-center justify-center py-1 elevation-surface border font-semibold",
                                    on: {
                                      click: function ($event) {
                                        return _vm.openOrderOption(order)
                                      },
                                    },
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "las la-tools text-2xl mr-1",
                                    }),
                                    _vm._v(" "),
                                    _c("span", [
                                      _vm._v(
                                        _vm._s(_vm.__m("Options", "NsGastro"))
                                      ),
                                    ]),
                                  ]
                                ),
                              ]),
                            ]),
                          ]
                        )
                      }),
                      0
                    ),
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.orders.length === 0 && !_vm.ordersLoaded
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex items-center justify-center flex-auto",
                    },
                    [_c("ns-spinner")],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.orders.length === 0 && _vm.ordersLoaded
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex-col text-primary flex items-center justify-center flex-auto",
                    },
                    [
                      _c("i", { staticClass: "text-6xl las la-frown" }),
                      _vm._v(" "),
                      !_vm.ns_gastro_enable_table_sessions
                        ? _c("h3", { staticClass: "font-semibold text-lg" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__m("No orders has been found", "NsGastro")
                              )
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.ns_gastro_enable_table_sessions
                        ? _c(
                            "div",
                            { staticClass: "flex flex-col items-center" },
                            [
                              _c(
                                "h3",
                                { staticClass: "font-semibold text-lg" },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__m(
                                        "No active sessions were found.",
                                        "NsGastro"
                                      )
                                    )
                                  ),
                                ]
                              ),
                              _vm._v(" "),
                              _c("span", { staticClass: "text-sm" }, [
                                _vm._v(
                                  _vm._s(
                                    _vm.__m(
                                      "Please use the Session History to browse previous sessions",
                                      "NsGastro"
                                    )
                                  )
                                ),
                              ]),
                            ]
                          )
                        : _vm._e(),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "p-2 flex items-center flex-col md:flex-row justify-between border-t ns-box-footer",
                },
                [
                  _c("div", { staticClass: "flex -mx-2" }, [
                    _c("div", { staticClass: "px-2" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "rounded-lg shadow hover:shadow-none border px-3 py-1 ns-inset-button",
                          on: {
                            click: function ($event) {
                              return _vm.showTableHistory(_vm.selectedTable)
                            },
                          },
                        },
                        [
                          _c("i", { staticClass: "las la-sync text-xl" }),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.__m("Refresh", "NsGastro"))),
                          ]),
                        ]
                      ),
                    ]),
                    _vm._v(" "),
                    _vm.screen === "orders"
                      ? _c("div", { staticClass: "px-2" }, [
                          _c(
                            "button",
                            {
                              staticClass:
                                "outline-none rounded-lg px-3 py-1 ns-inset-button border",
                              class: _vm.hasCustomSettings ? "info" : "",
                              on: {
                                click: function ($event) {
                                  _vm.setRange("today")
                                  _vm.showTableHistory(_vm.selectedTable)
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "las la-clock text-xl" }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(_vm._s(_vm.__m("Today", "NsGastro"))),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.screen === "orders"
                      ? _c("div", { staticClass: "px-2" }, [
                          _c(
                            "button",
                            {
                              staticClass:
                                "outline-none rounded-lg px-3 py-1 ns-inset-button border",
                              class: _vm.hasCustomSettings ? "info" : "",
                              on: {
                                click: function ($event) {
                                  _vm.setRange("yesterday")
                                  _vm.showTableHistory(_vm.selectedTable)
                                },
                              },
                            },
                            [
                              _c("i", { staticClass: "las la-clock text-xl" }),
                              _vm._v(" "),
                              _c("span", [
                                _vm._v(
                                  _vm._s(_vm.__m("From Yesterday", "NsGastro"))
                                ),
                              ]),
                            ]
                          ),
                        ])
                      : _vm._e(),
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "w-full md:w-auto mt-2 md:mt-0 md:m-0 flex -mx-2",
                    },
                    [
                      _vm.selectedTable.busy
                        ? _c("div", { staticClass: "px-2" }, [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "flex-auto justify-center flex items-center rounded cursor-pointer py-2 px-3 font-semibold shadow bg-green-400 text-white",
                                attrs: { type: "info" },
                                on: {
                                  click: function ($event) {
                                    return _vm.setAvailable(_vm.selectedTable)
                                  },
                                },
                              },
                              [
                                _vm._v(
                                  _vm._s(_vm.__m("Set Available", "NsGastro"))
                                ),
                              ]
                            ),
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "px-2" }, [
                        _c(
                          "span",
                          {
                            staticClass:
                              "flex-auto justify-center flex items-center rounded cursor-pointer py-2 px-3 font-semibold shadow bg-blue-400 text-white",
                            attrs: { type: "info" },
                            on: {
                              click: function ($event) {
                                return _vm.proceedSelect(_vm.selectedTable)
                              },
                            },
                          },
                          [_vm._v(_vm._s(_vm.__m("Select Table", "NsGastro")))]
                        ),
                      ]),
                    ]
                  ),
                ]
              ),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      ["sessions"].includes(_vm.screen)
        ? _c(
            "div",
            {
              staticClass:
                "overflow-y-auto flex flex-col p-4 flex-auto bg-gray-100",
            },
            [
              _c(
                "div",
                { staticClass: "flex -m-2 flex-wrap" },
                _vm._l(_vm.sessions, function (session) {
                  return _c(
                    "div",
                    {
                      key: session.id,
                      staticClass: "w-full mb-2 md:w-1/2 p-2",
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "rounded flex elevation-surface shadow overflow-hidden",
                        },
                        [
                          _vm._m(0, true),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "p-2 flex-auto justify-center flex flex-col",
                            },
                            [
                              _c("h3", { staticClass: "font-semibold" }, [
                                _vm._v(
                                  _vm._s(
                                    session.name ||
                                      _vm.__m("Unnamed Session", "NsGastro")
                                  )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "text-sm" }, [
                                _vm._v(
                                  _vm._s(_vm.__m("Active : ", "NsGastro")) +
                                    " " +
                                    _vm._s(
                                      session.active
                                        ? _vm.__m("Yes", "NsGastro")
                                        : _vm.__m("No", "NsGastro")
                                    )
                                ),
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "text-sm" }, [
                                _vm._v(
                                  _vm._s(_vm.__m("Orders : ", "NsGastro")) +
                                    " " +
                                    _vm._s(session.ordersCount)
                                ),
                              ]),
                            ]
                          ),
                          _vm._v(" "),
                          session.active === 1
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "border-l border-box-edge go-w-14 flex hover:bg-error-primary hover:text-white cursor-pointer items-center justify-center",
                                  on: {
                                    click: function ($event) {
                                      return _vm.closeSession(session)
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "las la-lock" })]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          session.active === 0
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "border-l border-box-edge go-w-14 flex hover:bg-info-primary hover:text-white cursor-pointer items-center justify-center",
                                  on: {
                                    click: function ($event) {
                                      return _vm.openSession(session)
                                    },
                                  },
                                },
                                [_c("i", { staticClass: "las la-unlock" })]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass:
                                "border-l border-box-edge go-w-14 flex hover:bg-blue-400 hover:text-white cursor-pointer items-center justify-center",
                              on: {
                                click: function ($event) {
                                  return _vm.loadSessionOrders(session)
                                },
                              },
                            },
                            [_c("i", { staticClass: "las la-eye" })]
                          ),
                        ]
                      ),
                    ]
                  )
                }),
                0
              ),
              _vm._v(" "),
              _vm.sessions.length === 0
                ? _c(
                    "div",
                    {
                      staticClass:
                        "p-2 flex flex-auto overflow-y-auto flex-wrap",
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "w-full flex-col text-primary flex items-center justify-center flex-auto",
                        },
                        [
                          _c("i", { staticClass: "text-9xl las la-frown" }),
                          _vm._v(" "),
                          _c("h3", { staticClass: "font-semibold text-lg" }, [
                            _vm._v(
                              _vm._s(
                                _vm.__m(
                                  "No sessions have been found",
                                  "NsGastro"
                                )
                              )
                            ),
                          ]),
                        ]
                      ),
                    ]
                  )
                : _vm._e(),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.screen === "tables"
        ? _c(
            "div",
            {
              staticClass: "overflow-y-auto flex",
              class: _vm.tables.length === 0 ? "flex-auto" : "",
            },
            [
              _vm.tables.length > 0
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 anim-duration-500 fade-in-entrance",
                    },
                    _vm._l(_vm.tables, function (table) {
                      return _c(
                        "div",
                        {
                          key: table.id,
                          staticClass:
                            "border cursor-pointer relative flex-col go-h-52 flex items-center justify-center",
                          class: table.selected
                            ? "bg-info-secondary border-info-tertiary"
                            : table.busy
                            ? "border-success-tertiary bg-success-secondary"
                            : "border-box-edge",
                          on: {
                            touchstart: function ($event) {
                              return _vm.debounceForAvailability(table, $event)
                            },
                            touchend: function ($event) {
                              _vm.mouseDown = false
                            },
                            click: function ($event) {
                              return _vm.selectQuantity(table)
                            },
                          },
                        },
                        [
                          !table.busy
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "rounded-full -mb-6 go-h-10 w-10 flex items-center justify-center font-bold fond-bold gastro-pill info",
                                },
                                [_vm._v(_vm._s(table.seats))]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          table.busy
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "rounded-full text-center -mb-6 go-h-10 px-3 flex items-center justify-center font-bold gastro-pill success",
                                },
                                [
                                  _vm._v(
                                    _vm._s(
                                      _vm.__m("Currently Busy", "NsGastro")
                                    )
                                  ),
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("img", { attrs: { src: _vm.icons.chair } }),
                          _vm._v(" "),
                          _c("h1", [_vm._v(_vm._s(table.name))]),
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.tables.length === 0 && _vm.tableLoaded
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex flex-col items-center justify-center flex-auto text-primary",
                    },
                    [
                      _c("i", { staticClass: "text-9xl las la-frown" }),
                      _vm._v(" "),
                      _c("h3", { staticClass: "font-semibold text-lg" }, [
                        _vm._v(
                          _vm._s(
                            _vm.__m("No tables has been found", "NsGastro")
                          )
                        ),
                      ]),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.tables.length === 0 && !_vm.tableLoaded
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex items-center justify-center flex-auto",
                    },
                    [_c("ns-spinner")],
                    1
                  )
                : _vm._e(),
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.screen === "areas"
        ? _c(
            "div",
            {
              staticClass: "overflow-y-auto flex",
              class: _vm.areas.length === 0 ? "flex-auto" : "",
            },
            [
              _vm.areas.length > 0
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 anim-duration-500 fade-in-entrance",
                    },
                    _vm._l(_vm.areas, function (area) {
                      return _c(
                        "div",
                        {
                          key: area.id,
                          staticClass:
                            "cursor-pointer border flex-col border-box-edge go-h-52 flex items-center justify-center",
                          on: {
                            click: function ($event) {
                              return _vm.loadTables(area)
                            },
                          },
                        },
                        [
                          _c("img", { attrs: { src: _vm.icons.menu } }),
                          _vm._v(" "),
                          _c("h1", { staticClass: "my-3" }, [
                            _vm._v(_vm._s(area.name)),
                          ]),
                        ]
                      )
                    }),
                    0
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.areas.length === 0 && _vm.areasLoaded
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex-col flex-auto flex items-center justify-center text-primary",
                    },
                    [
                      _c("i", { staticClass: "text-9xl las la-frown" }),
                      _vm._v(" "),
                      _c("h3", { staticClass: "font-semibold text-lg" }, [
                        _vm._v(
                          _vm._s(_vm.__m("No areas has been found", "NsGastro"))
                        ),
                      ]),
                    ]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.areas.length === 0 && !_vm.areasLoaded
                ? _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex items-center justify-center flex-auto",
                    },
                    [_c("ns-spinner")],
                    1
                  )
                : _vm._e(),
            ]
          )
        : _vm._e(),
    ]
  )
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "p-2 flex items-center justify-center" }, [
      _c(
        "div",
        {
          staticClass:
            "go-w-14 go-h-14 rounded-full bg-blue-400 font-bold text-3xl text-white flex items-center justify-center",
        },
        [_c("i", { staticClass: "las la-stopwatch" })]
      ),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Resources/ts/components/gastro-to-kitchen-button.vue?vue&type=template&id=11f1f359& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass:
        "outline-none flex-shrink-0 w-1/4 flex items-center font-bold cursor-pointer justify-center go-bg-blue-500 text-white border-r hover:go-bg-blue-600 go-border-blue-600 flex-auto",
      attrs: { id: "to-kitchen-button" },
      on: {
        click: function ($event) {
          return _vm.submitToKitchen()
        },
      },
    },
    [
      _c("span", [
        _c("i", { staticClass: "las la-utensils text-2xl lg:text-xl" }),
        _vm._v(" "),
        _c("span", { staticClass: "text-lg hidden md:inline lg:text-2xl" }, [
          _vm._v(_vm._s(_vm.__m("To Kitchen", "NsGastro"))),
        ]),
      ]),
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../../node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!************************************************************************!*\
  !*** ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/Gastro": 0,
/******/ 			"css/gastro": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkNsGastro"] = self["webpackChunkNsGastro"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/gastro"], () => (__webpack_require__("./Resources/ts/Gastro.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/gastro"], () => (__webpack_require__("./Resources/css/gastro.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;