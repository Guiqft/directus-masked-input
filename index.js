import { inject, ref, computed, onMounted, pushScopeId, popScopeId, resolveComponent, resolveDirective, openBlock, createBlock, withDirectives, createVNode, toDisplayString, createCommentVNode, withScopeId, createTextVNode } from 'vue';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var vueTheMask = {exports: {}};

(function (module, exports) {
(function(e,t){module.exports=t();})(commonjsGlobal,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r});},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=".",t(t.s=10)}([function(e,t){e.exports={"#":{pattern:/\d/},X:{pattern:/[0-9a-zA-Z]/},S:{pattern:/[a-zA-Z]/},A:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleUpperCase()}},a:{pattern:/[a-zA-Z]/,transform:function(e){return e.toLocaleLowerCase()}},"!":{escape:!0}};},function(e,t,n){function r(e){var t=document.createEvent("Event");return t.initEvent(e,!0,!0),t}var a=n(2),o=n(0),i=n.n(o);t.a=function(e,t){var o=t.value;if((Array.isArray(o)||"string"==typeof o)&&(o={mask:o,tokens:i.a}),"INPUT"!==e.tagName.toLocaleUpperCase()){var u=e.getElementsByTagName("input");if(1!==u.length)throw new Error("v-mask directive requires 1 input, found "+u.length);e=u[0];}e.oninput=function(t){if(t.isTrusted){var i=e.selectionEnd,u=e.value[i-1];for(e.value=n.i(a.a)(e.value,o.mask,!0,o.tokens);i<e.value.length&&e.value.charAt(i-1)!==u;)i++;e===document.activeElement&&(e.setSelectionRange(i,i),setTimeout(function(){e.setSelectionRange(i,i);},0)),e.dispatchEvent(r("input"));}};var s=n.i(a.a)(e.value,o.mask,!0,o.tokens);s!==e.value&&(e.value=s,e.dispatchEvent(r("input")));};},function(e,t,n){var r=n(6),a=n(5);t.a=function(e,t){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=arguments[3];return Array.isArray(t)?n.i(a.a)(r.a,t,i)(e,t,o,i):n.i(r.a)(e,t,o,i)};},function(e,t,n){function r(e){e.component(s.a.name,s.a),e.directive("mask",i.a);}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=n.n(a),i=n(1),u=n(7),s=n.n(u);n.d(t,"TheMask",function(){return s.a}),n.d(t,"mask",function(){return i.a}),n.d(t,"tokens",function(){return o.a}),n.d(t,"version",function(){return c});var c="0.11.1";t.default=r,"undefined"!=typeof window&&window.Vue&&window.Vue.use(r);},function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(0),o=n.n(a),i=n(2);t.default={name:"TheMask",props:{value:[String,Number],mask:{type:[String,Array],required:!0},masked:{type:Boolean,default:!1},tokens:{type:Object,default:function(){return o.a}}},directives:{mask:r.a},data:function(){return {lastValue:null,display:this.value}},watch:{value:function(e){e!==this.lastValue&&(this.display=e);},masked:function(){this.refresh(this.display);}},computed:{config:function(){return {mask:this.mask,tokens:this.tokens,masked:this.masked}}},methods:{onInput:function(e){e.isTrusted||this.refresh(e.target.value);},refresh:function(e){this.display=e;var e=n.i(i.a)(e,this.mask,this.masked,this.tokens);e!==this.lastValue&&(this.lastValue=e,this.$emit("input",e));}}};},function(e,t,n){function r(e,t,n){return t=t.sort(function(e,t){return e.length-t.length}),function(r,a){for(var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],i=0;i<t.length;){var u=t[i];i++;var s=t[i];if(!(s&&e(r,s,!0,n).length>u.length))return e(r,u,o,n)}return ""}}t.a=r;},function(e,t,n){function r(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments[3];e=e||"",t=t||"";for(var a=0,o=0,i="";a<t.length&&o<e.length;){var u=t[a],s=r[u],c=e[o];s&&!s.escape?(s.pattern.test(c)&&(i+=s.transform?s.transform(c):c,a++),o++):(s&&s.escape&&(a++,u=t[a]),n&&(i+=u),c===u&&o++,a++);}for(var f="";a<t.length&&n;){var u=t[a];if(r[u]){f="";break}f+=u,a++;}return i+f}t.a=r;},function(e,t,n){var r=n(8)(n(4),n(9),null,null);e.exports=r.exports;},function(e,t){e.exports=function(e,t,n,r){var a,o=e=e||{},i=typeof e.default;"object"!==i&&"function"!==i||(a=e,o=e.default);var u="function"==typeof o?o.options:o;if(t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns),n&&(u._scopeId=n),r){var s=u.computed||(u.computed={});Object.keys(r).forEach(function(e){var t=r[e];s[e]=function(){return t};});}return {esModule:a,exports:o,options:u}};},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return (e._self._c||t)("input",{directives:[{name:"mask",rawName:"v-mask",value:e.config,expression:"config"}],attrs:{type:"text"},domProps:{value:e.display},on:{input:e.onInput}})},staticRenderFns:[]};},function(e,t,n){e.exports=n(3);}])});
}(vueTheMask));

var regex = /[\.\-\/]+/g;

var isCnpj = function(cnpj) {
  cnpj = cnpj.replace(regex, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  var size = cnpj.length - 2;
  var numbers = cnpj.substring(0, size);
  var digits = cnpj.substring(size);
  var sum = 0;
  var pos = size - 7;
  for (var i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  var result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (var i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) return false;

  return true;
};

var isCpf = function(cpf) {
  cpf = cpf.replace(regex, "");

  if (cpf == "") return false;

  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;

  var add = 0;
  for (var i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  var rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;

  add = 0;

  for (var i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
};

var script$1 = {
    emits: ["input"],
    directives: { mask: vueTheMask.exports.mask },
    props: {
        value: { type: String, default: null },
        collection: { type: String, default: null },
        field: { type: String, default: null },
        primaryKey: { type: String, default: null },
        maskPattern: { type: String, default: null },
        maskType: { type: String, default: null },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        var stores = inject("stores");
        var mask = ref("");
        var hasMultipleMasks = ref(false);
        var errorMessage = ref("");
        var disabled = ref(false);
        var value = computed({
            get: function () {
                var _a;
                return (props.value ||
                    ((_a = document.getElementById("inputEl")) === null || _a === void 0 ? void 0 : _a.value));
            },
            set: function (value) {
                switch (props.maskType) {
                    case "cpf_cnpj":
                        if (!isCnpj(value || "") && !isCpf(value || "")) {
                            errorMessage.value = "Insira um valor válido.";
                            emit("input", null);
                        }
                        else {
                            emitInput(value);
                        }
                        break;
                    case "telephone":
                        if (!value || value.length < 14) {
                            errorMessage.value = "Insira um telefone válido.";
                            emit("input", null);
                        }
                        else {
                            emitInput(value);
                        }
                        break;
                    case "inscription_code":
                        if (value.length < 10) {
                            errorMessage.value = "Insira um código válido.";
                            emit("input", null);
                        }
                        else {
                            emitInput(value);
                        }
                        break;
                    case "custom":
                        if (hasMultipleMasks.value) {
                            var masks = mask.value.split(", ");
                            var lengths = masks.map(function (el) { return el.length; });
                            if (!lengths.includes(value === null || value === void 0 ? void 0 : value.length)) {
                                errorMessage.value = "Insira um valor válido";
                                emit("input", null);
                            }
                            else {
                                emitInput(value);
                            }
                        }
                        else {
                            if (!value || value.length < mask.value.length) {
                                errorMessage.value = "Insira um código válido.";
                                emit("input", null);
                            }
                            else {
                                emitInput(value);
                            }
                        }
                }
            },
        });
        onMounted(function () {
            if (props.primaryKey !== "+") {
                var currentField = stores
                    .useFieldsStore()
                    .getField(props.collection, props.field);
                disabled.value = (currentField === null || currentField === void 0 ? void 0 : currentField.meta.readonly) || disabled.value;
            }
            switch (props.maskType) {
                case "cpf_cnpj":
                    mask.value = "###.###.###-##, ##.###.###/####-##";
                    hasMultipleMasks.value = true;
                    break;
                case "telephone":
                    mask.value = "(##) ####-####, (##) #####-####";
                    hasMultipleMasks.value = true;
                    break;
                case "inscription_code":
                    mask.value = "#.#.#.####";
                    break;
                case "custom":
                    if (props.maskPattern.includes(", "))
                        hasMultipleMasks.value = true;
                    mask.value = props.maskPattern;
                    break;
            }
        });
        var emitInput = function (value) {
            errorMessage.value = null;
            emit("input", value);
        };
        return {
            value: value,
            mask: mask,
            hasMultipleMasks: hasMultipleMasks,
            errorMessage: errorMessage,
            disabled: disabled,
        };
    },
};

const _withId$1 = /*#__PURE__*/withScopeId("data-v-63ab1716");

pushScopeId("data-v-63ab1716");
const _hoisted_1$1 = { class: "masked-input" };
const _hoisted_2$1 = { key: 0 };
popScopeId();

const render$1 = /*#__PURE__*/_withId$1((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_v_input = resolveComponent("v-input");
  const _directive_mask = resolveDirective("mask");

  return (openBlock(), createBlock("div", _hoisted_1$1, [
    withDirectives(createVNode(_component_v_input, {
      id: "inputEl",
      modelValue: $setup.value,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($setup.value = $event)),
      disabled: $setup.disabled
    }, null, 8 /* PROPS */, ["modelValue", "disabled"]), [
      [_directive_mask, $setup.hasMultipleMasks ? $setup.mask.split(', ') : $setup.mask]
    ]),
    ($setup.errorMessage)
      ? (openBlock(), createBlock("p", _hoisted_2$1, toDisplayString($setup.errorMessage), 1 /* TEXT */))
      : createCommentVNode("v-if", true)
  ]))
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".masked-input p[data-v-63ab1716] {\n  font-size: 14px;\n  color: var(--orange);\n  margin: 1px 1px;\n}";
styleInject(css_248z$1);

script$1.render = render$1;
script$1.__scopeId = "data-v-63ab1716";
script$1.__file = "src/MaskedInput.vue";

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var script = {
    emits: ["input"],
    props: {
        value: {
            type: Object,
            default: { maskType: null, maskPattern: null },
        },
    },
    setup: function (props, _a) {
        var emit = _a.emit;
        var showMaskInput = ref(false);
        onMounted(function () {
            var _a;
            if (props.value && ((_a = props.value) === null || _a === void 0 ? void 0 : _a.maskPattern))
                showMaskInput.value = true;
        });
        var handleInput = function (editData) {
            var _a, _b;
            if (editData.maskType === "custom" && !((_a = props.value) === null || _a === void 0 ? void 0 : _a.maskPattern)) {
                showMaskInput.value = true;
                emit("input", editData);
            }
            else {
                showMaskInput.value = false;
                (_b = props.value) === null || _b === void 0 ? true : delete _b.maskPattern;
                emit("input", __assign(__assign({}, editData), { maskPattern: null }));
            }
        };
        var setMask = function (mask) {
            if (mask.length > 0) {
                emit("input", __assign(__assign({}, props.value), { maskPattern: mask }));
            }
            else {
                emit("input", __assign(__assign({}, props.value), { maskPattern: null }));
            }
        };
        var formFields = [
            {
                field: "maskType",
                name: "Tipo de Máscara",
                type: "string",
                meta: {
                    interface: "select-dropdown",
                    options: {
                        placeholder: "Selecione uma máscara predefinida",
                        choices: [
                            { text: "CPF/CNPJ", value: "cpf_cnpj" },
                            {
                                text: "Código de Inscrição",
                                value: "inscription_code",
                            },
                            { text: "Telefone", value: "telephone" },
                            { text: "Customizada...", value: "custom" },
                        ],
                    },
                },
            },
        ];
        return { showMaskInput: showMaskInput, handleInput: handleInput, setMask: setMask, formFields: formFields };
    },
};

const _withId = /*#__PURE__*/withScopeId("data-v-aab0e4ae");

pushScopeId("data-v-aab0e4ae");
const _hoisted_1 = { class: "mask-option" };
const _hoisted_2 = {
  key: 0,
  class: "mask-input"
};
const _hoisted_3 = /*#__PURE__*/createVNode("div", { class: "type-label" }, "Mascara", -1 /* HOISTED */);
const _hoisted_4 = /*#__PURE__*/createVNode("p", null, [
  /*#__PURE__*/createTextVNode(" Múltiplas máscaras devem ser separadas por vírgula e espaço. "),
  /*#__PURE__*/createVNode("br"),
  /*#__PURE__*/createTextVNode("Ex: (##) ####-####, (##) #####-#### "),
  /*#__PURE__*/createVNode("br"),
  /*#__PURE__*/createTextVNode("Mais informações em: "),
  /*#__PURE__*/createVNode("a", { href: "https://vuejs-tips.github.io/vue-the-mask/" }, "vue-the-mask")
], -1 /* HOISTED */);
popScopeId();

const render = /*#__PURE__*/_withId((_ctx, _cache, $props, $setup, $data, $options) => {
  const _component_v_form = resolveComponent("v-form");
  const _component_v_input = resolveComponent("v-input");

  return (openBlock(), createBlock("div", _hoisted_1, [
    createVNode(_component_v_form, {
      fields: $setup.formFields,
      "model-value": $props.value,
      "onUpdate:modelValue": $setup.handleInput
    }, null, 8 /* PROPS */, ["fields", "model-value", "onUpdate:modelValue"]),
    ($setup.showMaskInput)
      ? (openBlock(), createBlock("div", _hoisted_2, [
          _hoisted_3,
          createVNode(_component_v_input, {
            "model-value": $props.value.maskPattern,
            "onUpdate:modelValue": $setup.setMask,
            placeholder: "Insira a máscara do valor"
          }, null, 8 /* PROPS */, ["model-value", "onUpdate:modelValue"]),
          _hoisted_4
        ]))
      : createCommentVNode("v-if", true)
  ]))
});

var css_248z = ".mask-option .mask-input .type-label[data-v-aab0e4ae] {\n  margin-top: 20px;\n  margin-bottom: 5px;\n}\n.mask-option .mask-input p[data-v-aab0e4ae] {\n  font-size: 13.5px;\n  color: var(--foreground-subdued);\n  margin: 4px;\n}\n.mask-option .mask-input p a[data-v-aab0e4ae] {\n  font-weight: bold;\n}";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-aab0e4ae";
script.__file = "src/MaskOptions.vue";

var index = {
    id: "masked-input",
    name: "Entrada com Máscara",
    description: "Interface para um texto mascarado com predefinições para: CPNF/CNPJ, Código de Inscriçao e Telefone",
    icon: "box",
    types: ["string"],
    component: script$1,
    options: script,
};

export default index;
