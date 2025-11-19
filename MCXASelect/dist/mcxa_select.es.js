if (typeof window < "u") {
	var _window$__svelte, _window$__svelte$v, _window, _window$__svelte2;
	((_window$__svelte$v = (_window$__svelte = (_window$__svelte2 = (_window = window).__svelte) == null ? _window.__svelte = {} : _window$__svelte2).v) == null ? _window$__svelte.v = /* @__PURE__ */ new Set() : _window$__svelte$v).add("5");
}
const HYDRATION_ERROR = {}, UNINITIALIZED = Symbol();
var is_array = Array.isArray, index_of = Array.prototype.indexOf, array_from = Array.from, object_keys = Object.keys, define_property = Object.defineProperty, get_descriptor = Object.getOwnPropertyDescriptor, get_descriptors = Object.getOwnPropertyDescriptors, object_prototype = Object.prototype, array_prototype = Array.prototype, get_prototype_of = Object.getPrototypeOf, is_extensible = Object.isExtensible;
function run_all(e) {
	for (var m = 0; m < e.length; m++) e[m]();
}
function deferred() {
	var e, m;
	return {
		promise: new Promise((h, g) => {
			e = h, m = g;
		}),
		resolve: e,
		reject: m
	};
}
function _typeof(e) {
	"@babel/helpers - typeof";
	return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, _typeof(e);
}
function toPrimitive(e, m) {
	if (_typeof(e) != "object" || !e) return e;
	var h = e[Symbol.toPrimitive];
	if (h !== void 0) {
		var g = h.call(e, m || "default");
		if (_typeof(g) != "object") return g;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (m === "string" ? String : Number)(e);
}
function toPropertyKey(e) {
	var m = toPrimitive(e, "string");
	return _typeof(m) == "symbol" ? m : m + "";
}
function _defineProperty(e, m, h) {
	return (m = toPropertyKey(m)) in e ? Object.defineProperty(e, m, {
		value: h,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[m] = h, e;
}
const CLEAN = 1024, DIRTY = 2048, MAYBE_DIRTY = 4096, INERT = 8192, EFFECT_TRANSPARENT = 65536, EFFECT_PRESERVED = 1 << 19, WAS_MARKED = 32768, REACTION_IS_UPDATING = 1 << 21, ERROR_VALUE = 1 << 23, STATE_SYMBOL = Symbol("$state"), LEGACY_PROPS = Symbol("legacy props"), LOADING_ATTR_SYMBOL = Symbol(""), STALE_REACTION = new class extends Error {
	constructor(...e) {
		super(...e), _defineProperty(this, "name", "StaleReactionError"), _defineProperty(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
	}
}();
function lifecycle_outside_component(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
function async_derived_orphan() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function effect_in_teardown(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function effect_in_unowned_derived() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function effect_orphan(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function effect_update_depth_exceeded() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hydration_failed() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function props_invalid_value(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function state_descriptors_fixed() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function state_prototype_fixed() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function state_unsafe_mutation() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function svelte_boundary_reset_onerror() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function hydration_mismatch(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function svelte_boundary_reset_noop() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let hydrating = !1;
function set_hydrating(e) {
	hydrating = e;
}
let hydrate_node;
function set_hydrate_node(e) {
	if (e === null) throw hydration_mismatch(), HYDRATION_ERROR;
	return hydrate_node = e;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function reset(e) {
	if (hydrating) {
		if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) throw hydration_mismatch(), HYDRATION_ERROR;
		hydrate_node = e;
	}
}
function next(e = 1) {
	if (hydrating) {
		for (var m = e, h = hydrate_node; m--;) h = /* @__PURE__ */ get_next_sibling(h);
		hydrate_node = h;
	}
}
function skip_nodes(e = !0) {
	for (var m = 0, h = hydrate_node;;) {
		if (h.nodeType === 8) {
			var g = h.data;
			if (g === "]") {
				if (m === 0) return h;
				--m;
			} else (g === "[" || g === "[!") && (m += 1);
		}
		var _ = /* @__PURE__ */ get_next_sibling(h);
		e && h.remove(), h = _;
	}
}
function read_hydration_instruction(e) {
	if (!e || e.nodeType !== 8) throw hydration_mismatch(), HYDRATION_ERROR;
	return e.data;
}
function equals(e) {
	return e === this.v;
}
function safe_not_equal(e, m) {
	return e == e ? e !== m || typeof e == "object" && !!e || typeof e == "function" : m == m;
}
function safe_equals(e) {
	return !safe_not_equal(e, this.v);
}
function ownKeys(e, m) {
	var h = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var g = Object.getOwnPropertySymbols(e);
		m && (g = g.filter(function(m) {
			return Object.getOwnPropertyDescriptor(e, m).enumerable;
		})), h.push.apply(h, g);
	}
	return h;
}
function _objectSpread2(e) {
	for (var m = 1; m < arguments.length; m++) {
		var h = arguments[m] == null ? {} : arguments[m];
		m % 2 ? ownKeys(Object(h), !0).forEach(function(m) {
			_defineProperty(e, m, h[m]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(h)) : ownKeys(Object(h)).forEach(function(m) {
			Object.defineProperty(e, m, Object.getOwnPropertyDescriptor(h, m));
		});
	}
	return e;
}
let component_context = null;
function set_component_context(e) {
	component_context = e;
}
function push(e, m = !1, h) {
	component_context = {
		p: component_context,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		l: null
	};
}
function pop(e) {
	var m = component_context, h = m.e;
	if (h !== null) {
		m.e = null;
		for (var g of h) create_user_effect(g);
	}
	return e !== void 0 && (m.x = e), m.i = !0, component_context = m.p, e == null ? {} : e;
}
function is_runes() {
	return !0;
}
var micro_tasks = [];
function run_micro_tasks() {
	var e = micro_tasks;
	micro_tasks = [], run_all(e);
}
function queue_micro_task(e) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var m = micro_tasks;
		queueMicrotask(() => {
			m === micro_tasks && run_micro_tasks();
		});
	}
	micro_tasks.push(e);
}
function flush_tasks() {
	for (; micro_tasks.length > 0;) run_micro_tasks();
}
function handle_error(e) {
	var m = active_effect;
	if (m === null) return active_reaction.f |= ERROR_VALUE, e;
	if (m.f & 32768) invoke_error_boundary(e, m);
	else {
		if (!(m.f & 128)) throw e;
		m.b.error(e);
	}
}
function invoke_error_boundary(e, m) {
	for (; m !== null;) {
		if (m.f & 128) try {
			m.b.error(e);
			return;
		} catch (m) {
			e = m;
		}
		m = m.parent;
	}
	throw e;
}
function _checkPrivateRedeclaration(e, m) {
	if (m.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function _classPrivateMethodInitSpec(e, m) {
	_checkPrivateRedeclaration(e, m), m.add(e);
}
function _classPrivateFieldInitSpec(e, m, h) {
	_checkPrivateRedeclaration(e, m), m.set(e, h);
}
function _assertClassBrand(e, m, h) {
	if (typeof e == "function" ? e === m : e.has(m)) return arguments.length < 3 ? m : h;
	throw TypeError("Private element is not present on this object");
}
function _classPrivateFieldGet2(e, m) {
	return e.get(_assertClassBrand(e, m));
}
function _classPrivateFieldSet2(e, m, h) {
	return e.set(_assertClassBrand(e, m), h), h;
}
function asyncGeneratorStep(e, m, h, g, _, v, y) {
	try {
		var b = e[v](y), x = b.value;
	} catch (e) {
		h(e);
		return;
	}
	b.done ? m(x) : Promise.resolve(x).then(g, _);
}
function _asyncToGenerator(e) {
	return function() {
		var m = this, h = arguments;
		return new Promise(function(g, _) {
			var v = e.apply(m, h);
			function y(e) {
				asyncGeneratorStep(v, g, _, y, b, "next", e);
			}
			function b(e) {
				asyncGeneratorStep(v, g, _, y, b, "throw", e);
			}
			y(void 0);
		});
	};
}
var batches = /* @__PURE__ */ new Set();
let current_batch = null, batch_values = null;
var queued_root_effects = [], last_scheduled_effect = null, is_flushing = !1;
let is_flushing_sync = !1;
var _commit_callbacks = /* @__PURE__ */ new WeakMap(), _discard_callbacks = /* @__PURE__ */ new WeakMap(), _pending$1 = /* @__PURE__ */ new WeakMap(), _blocking_pending = /* @__PURE__ */ new WeakMap(), _deferred = /* @__PURE__ */ new WeakMap(), _dirty_effects = /* @__PURE__ */ new WeakMap(), _maybe_dirty_effects = /* @__PURE__ */ new WeakMap(), _Batch_brand = /* @__PURE__ */ new WeakSet(), Batch = class e {
	constructor() {
		_classPrivateMethodInitSpec(this, _Batch_brand), _defineProperty(this, "committed", !1), _defineProperty(this, "current", /* @__PURE__ */ new Map()), _defineProperty(this, "previous", /* @__PURE__ */ new Map()), _classPrivateFieldInitSpec(this, _commit_callbacks, /* @__PURE__ */ new Set()), _classPrivateFieldInitSpec(this, _discard_callbacks, /* @__PURE__ */ new Set()), _classPrivateFieldInitSpec(this, _pending$1, 0), _classPrivateFieldInitSpec(this, _blocking_pending, 0), _classPrivateFieldInitSpec(this, _deferred, null), _classPrivateFieldInitSpec(this, _dirty_effects, []), _classPrivateFieldInitSpec(this, _maybe_dirty_effects, []), _defineProperty(this, "skipped_effects", /* @__PURE__ */ new Set()), _defineProperty(this, "is_fork", !1);
	}
	process(e) {
		queued_root_effects = [], this.apply();
		var m = {
			parent: null,
			effect: null,
			effects: [],
			render_effects: [],
			block_effects: []
		};
		for (let h of e) _assertClassBrand(_Batch_brand, this, _traverse_effect_tree).call(this, h, m);
		if (this.is_fork || _assertClassBrand(_Batch_brand, this, _resolve).call(this), _classPrivateFieldGet2(_blocking_pending, this) > 0 || this.is_fork) _assertClassBrand(_Batch_brand, this, _defer_effects).call(this, m.effects), _assertClassBrand(_Batch_brand, this, _defer_effects).call(this, m.render_effects), _assertClassBrand(_Batch_brand, this, _defer_effects).call(this, m.block_effects);
		else {
			var h;
			current_batch = null, flush_queued_effects(m.render_effects), flush_queued_effects(m.effects), (h = _classPrivateFieldGet2(_deferred, this)) == null || h.resolve();
		}
		batch_values = null;
	}
	capture(e, m) {
		this.previous.has(e) || this.previous.set(e, m), e.f & 8388608 || (this.current.set(e, e.v), batch_values == null || batch_values.set(e, e.v));
	}
	activate() {
		current_batch = this, this.apply();
	}
	deactivate() {
		current_batch = null, batch_values = null;
	}
	flush() {
		if (this.activate(), queued_root_effects.length > 0) {
			if (flush_effects(), current_batch !== null && current_batch !== this) return;
		} else _classPrivateFieldGet2(_pending$1, this) === 0 && this.process([]);
		this.deactivate();
	}
	discard() {
		for (let e of _classPrivateFieldGet2(_discard_callbacks, this)) e(this);
		_classPrivateFieldGet2(_discard_callbacks, this).clear();
	}
	increment(e) {
		_classPrivateFieldSet2(_pending$1, this, _classPrivateFieldGet2(_pending$1, this) + 1), e && _classPrivateFieldSet2(_blocking_pending, this, _classPrivateFieldGet2(_blocking_pending, this) + 1);
	}
	decrement(e) {
		_classPrivateFieldSet2(_pending$1, this, _classPrivateFieldGet2(_pending$1, this) - 1), e && _classPrivateFieldSet2(_blocking_pending, this, _classPrivateFieldGet2(_blocking_pending, this) - 1), this.revive();
	}
	revive() {
		for (let e of _classPrivateFieldGet2(_dirty_effects, this)) set_signal_status(e, DIRTY), schedule_effect(e);
		for (let e of _classPrivateFieldGet2(_maybe_dirty_effects, this)) set_signal_status(e, MAYBE_DIRTY), schedule_effect(e);
		_classPrivateFieldSet2(_dirty_effects, this, []), _classPrivateFieldSet2(_maybe_dirty_effects, this, []), this.flush();
	}
	oncommit(e) {
		_classPrivateFieldGet2(_commit_callbacks, this).add(e);
	}
	ondiscard(e) {
		_classPrivateFieldGet2(_discard_callbacks, this).add(e);
	}
	settled() {
		var e;
		return ((e = _classPrivateFieldGet2(_deferred, this)) == null ? _classPrivateFieldSet2(_deferred, this, deferred()) : e).promise;
	}
	static ensure() {
		if (current_batch === null) {
			let m = current_batch = new e();
			batches.add(current_batch), is_flushing_sync || e.enqueue(() => {
				current_batch === m && m.flush();
			});
		}
		return current_batch;
	}
	static enqueue(e) {
		queue_micro_task(e);
	}
	apply() {}
};
function _traverse_effect_tree(e, m) {
	e.f ^= CLEAN;
	for (var h = e.first; h !== null;) {
		var g, _ = h.f, v = (_ & 96) != 0, y = v && (_ & 1024) != 0 || (_ & 8192) != 0 || this.skipped_effects.has(h);
		if (h.f & 128 && (g = h.b) != null && g.is_pending() && (m = {
			parent: m,
			effect: h,
			effects: [],
			render_effects: [],
			block_effects: []
		}), !y && h.fn !== null) {
			v ? h.f ^= CLEAN : _ & 4 ? m.effects.push(h) : is_dirty(h) && (h.f & 16 && m.block_effects.push(h), update_effect(h));
			var b = h.first;
			if (b !== null) {
				h = b;
				continue;
			}
		}
		var x = h.parent;
		for (h = h.next; h === null && x !== null;) x === m.effect && (_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, m.effects), _assertClassBrand(_Batch_brand, this, _defer_effects).call(this, m.render_effects), _assertClassBrand(_Batch_brand, this, _defer_effects).call(this, m.block_effects), m = m.parent), h = x.next, x = x.parent;
	}
}
function _defer_effects(e) {
	for (let m of e) (m.f & 2048 ? _classPrivateFieldGet2(_dirty_effects, this) : _classPrivateFieldGet2(_maybe_dirty_effects, this)).push(m), set_signal_status(m, CLEAN);
}
function _resolve() {
	if (_classPrivateFieldGet2(_blocking_pending, this) === 0) {
		for (let e of _classPrivateFieldGet2(_commit_callbacks, this)) e();
		_classPrivateFieldGet2(_commit_callbacks, this).clear();
	}
	_classPrivateFieldGet2(_pending$1, this) === 0 && _assertClassBrand(_Batch_brand, this, _commit$1).call(this);
}
function _commit$1() {
	if (batches.size > 1) {
		this.previous.clear();
		var e = batch_values, m = !0, h = {
			parent: null,
			effect: null,
			effects: [],
			render_effects: [],
			block_effects: []
		};
		for (let e of batches) {
			if (e === this) {
				m = !1;
				continue;
			}
			let g = [];
			for (let [h, _] of this.current) {
				if (e.current.has(h)) if (m && _ !== e.current.get(h)) e.current.set(h, _);
				else continue;
				g.push(h);
			}
			if (g.length === 0) continue;
			let _ = [...e.current.keys()].filter((e) => !this.current.has(e));
			if (_.length > 0) {
				let m = /* @__PURE__ */ new Set(), v = /* @__PURE__ */ new Map();
				for (let e of g) mark_effects(e, _, m, v);
				if (queued_root_effects.length > 0) {
					current_batch = e, e.apply();
					for (let m of queued_root_effects) _assertClassBrand(_Batch_brand, e, _traverse_effect_tree).call(e, m, h);
					queued_root_effects = [], e.deactivate();
				}
			}
		}
		current_batch = null, batch_values = e;
	}
	this.committed = !0, batches.delete(this);
}
function flushSync(e) {
	var m = is_flushing_sync;
	is_flushing_sync = !0;
	try {
		var h;
		for (e && (current_batch !== null && flush_effects(), h = e());;) {
			if (flush_tasks(), queued_root_effects.length === 0 && (current_batch == null || current_batch.flush(), queued_root_effects.length === 0)) return last_scheduled_effect = null, h;
			flush_effects();
		}
	} finally {
		is_flushing_sync = m;
	}
}
function flush_effects() {
	var e = is_updating_effect;
	is_flushing = !0;
	try {
		var m = 0;
		for (set_is_updating_effect(!0); queued_root_effects.length > 0;) {
			var h = Batch.ensure();
			m++ > 1e3 && infinite_loop_guard(), h.process(queued_root_effects), old_values.clear();
		}
	} finally {
		is_flushing = !1, set_is_updating_effect(e), last_scheduled_effect = null;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (e) {
		invoke_error_boundary(e, last_scheduled_effect);
	}
}
let eager_block_effects = null;
function flush_queued_effects(e) {
	var m = e.length;
	if (m !== 0) {
		for (var h = 0; h < m;) {
			var g = e[h++];
			if (!(g.f & 24576) && is_dirty(g) && (eager_block_effects = /* @__PURE__ */ new Set(), update_effect(g), g.deps === null && g.first === null && g.nodes_start === null && (g.teardown === null && g.ac === null ? unlink_effect(g) : g.fn = null), (eager_block_effects == null ? void 0 : eager_block_effects.size) > 0)) {
				old_values.clear();
				for (let e of eager_block_effects) {
					if (e.f & 24576) continue;
					let m = [e], h = e.parent;
					for (; h !== null;) eager_block_effects.has(h) && (eager_block_effects.delete(h), m.push(h)), h = h.parent;
					for (let e = m.length - 1; e >= 0; e--) {
						let h = m[e];
						h.f & 24576 || update_effect(h);
					}
				}
				eager_block_effects.clear();
			}
		}
		eager_block_effects = null;
	}
}
function mark_effects(e, m, h, g) {
	if (!h.has(e) && (h.add(e), e.reactions !== null)) for (let _ of e.reactions) {
		let e = _.f;
		e & 2 ? mark_effects(_, m, h, g) : e & 4194320 && !(e & 2048) && depends_on(_, m, g) && (set_signal_status(_, DIRTY), schedule_effect(_));
	}
}
function depends_on(e, m, h) {
	let g = h.get(e);
	if (g !== void 0) return g;
	if (e.deps !== null) for (let g of e.deps) {
		if (m.includes(g)) return !0;
		if (g.f & 2 && depends_on(g, m, h)) return h.set(g, !0), !0;
	}
	return h.set(e, !1), !1;
}
function schedule_effect(e) {
	for (var m = last_scheduled_effect = e; m.parent !== null;) {
		m = m.parent;
		var h = m.f;
		if (is_flushing && m === active_effect && h & 16 && !(h & 262144)) return;
		if (h & 96) {
			if (!(h & 1024)) return;
			m.f ^= CLEAN;
		}
	}
	queued_root_effects.push(m);
}
function createSubscriber(e) {
	let m = 0, h = source(0), g;
	return () => {
		effect_tracking() && (get(h), render_effect(() => (m === 0 && (g = untrack(() => e(() => increment(h)))), m += 1, () => {
			queue_micro_task(() => {
				--m, m === 0 && (g == null || g(), g = void 0, increment(h));
			});
		})));
	};
}
var flags = EFFECT_PRESERVED | 65664;
function boundary(e, m, h) {
	new Boundary(e, m, h);
}
var _pending = /* @__PURE__ */ new WeakMap(), _anchor = /* @__PURE__ */ new WeakMap(), _hydrate_open = /* @__PURE__ */ new WeakMap(), _props = /* @__PURE__ */ new WeakMap(), _children = /* @__PURE__ */ new WeakMap(), _effect = /* @__PURE__ */ new WeakMap(), _main_effect = /* @__PURE__ */ new WeakMap(), _pending_effect = /* @__PURE__ */ new WeakMap(), _failed_effect = /* @__PURE__ */ new WeakMap(), _offscreen_fragment = /* @__PURE__ */ new WeakMap(), _pending_anchor = /* @__PURE__ */ new WeakMap(), _local_pending_count = /* @__PURE__ */ new WeakMap(), _pending_count = /* @__PURE__ */ new WeakMap(), _is_creating_fallback = /* @__PURE__ */ new WeakMap(), _effect_pending = /* @__PURE__ */ new WeakMap(), _effect_pending_subscriber = /* @__PURE__ */ new WeakMap(), _Boundary_brand = /* @__PURE__ */ new WeakSet(), Boundary = class {
	constructor(e, m, h) {
		_classPrivateMethodInitSpec(this, _Boundary_brand), _defineProperty(this, "parent", void 0), _classPrivateFieldInitSpec(this, _pending, !1), _classPrivateFieldInitSpec(this, _anchor, void 0), _classPrivateFieldInitSpec(this, _hydrate_open, hydrating ? hydrate_node : null), _classPrivateFieldInitSpec(this, _props, void 0), _classPrivateFieldInitSpec(this, _children, void 0), _classPrivateFieldInitSpec(this, _effect, void 0), _classPrivateFieldInitSpec(this, _main_effect, null), _classPrivateFieldInitSpec(this, _pending_effect, null), _classPrivateFieldInitSpec(this, _failed_effect, null), _classPrivateFieldInitSpec(this, _offscreen_fragment, null), _classPrivateFieldInitSpec(this, _pending_anchor, null), _classPrivateFieldInitSpec(this, _local_pending_count, 0), _classPrivateFieldInitSpec(this, _pending_count, 0), _classPrivateFieldInitSpec(this, _is_creating_fallback, !1), _classPrivateFieldInitSpec(this, _effect_pending, null), _classPrivateFieldInitSpec(this, _effect_pending_subscriber, createSubscriber(() => (_classPrivateFieldSet2(_effect_pending, this, source(_classPrivateFieldGet2(_local_pending_count, this))), () => {
			_classPrivateFieldSet2(_effect_pending, this, null);
		}))), _classPrivateFieldSet2(_anchor, this, e), _classPrivateFieldSet2(_props, this, m), _classPrivateFieldSet2(_children, this, h), this.parent = active_effect.b, _classPrivateFieldSet2(_pending, this, !!_classPrivateFieldGet2(_props, this).pending), _classPrivateFieldSet2(_effect, this, block(() => {
			if (active_effect.b = this, hydrating) {
				let e = _classPrivateFieldGet2(_hydrate_open, this);
				hydrate_next(), e.nodeType === 8 && e.data === "[!" ? _assertClassBrand(_Boundary_brand, this, _hydrate_pending_content).call(this) : _assertClassBrand(_Boundary_brand, this, _hydrate_resolved_content).call(this);
			} else {
				var e = _assertClassBrand(_Boundary_brand, this, _get_anchor).call(this);
				try {
					_classPrivateFieldSet2(_main_effect, this, branch(() => h(e)));
				} catch (e) {
					this.error(e);
				}
				_classPrivateFieldGet2(_pending_count, this) > 0 ? _assertClassBrand(_Boundary_brand, this, _show_pending_snippet).call(this) : _classPrivateFieldSet2(_pending, this, !1);
			}
			return () => {
				var e;
				(e = _classPrivateFieldGet2(_pending_anchor, this)) == null || e.remove();
			};
		}, flags)), hydrating && _classPrivateFieldSet2(_anchor, this, hydrate_node);
	}
	is_pending() {
		return _classPrivateFieldGet2(_pending, this) || !!this.parent && this.parent.is_pending();
	}
	has_pending_snippet() {
		return !!_classPrivateFieldGet2(_props, this).pending;
	}
	update_pending_count(e) {
		_assertClassBrand(_Boundary_brand, this, _update_pending_count).call(this, e), _classPrivateFieldSet2(_local_pending_count, this, _classPrivateFieldGet2(_local_pending_count, this) + e), _classPrivateFieldGet2(_effect_pending, this) && internal_set(_classPrivateFieldGet2(_effect_pending, this), _classPrivateFieldGet2(_local_pending_count, this));
	}
	get_effect_pending() {
		return _classPrivateFieldGet2(_effect_pending_subscriber, this).call(this), get(_classPrivateFieldGet2(_effect_pending, this));
	}
	error(e) {
		var m = _classPrivateFieldGet2(_props, this).onerror;
		let h = _classPrivateFieldGet2(_props, this).failed;
		if (_classPrivateFieldGet2(_is_creating_fallback, this) || !m && !h) throw e;
		_classPrivateFieldGet2(_main_effect, this) && (destroy_effect(_classPrivateFieldGet2(_main_effect, this)), _classPrivateFieldSet2(_main_effect, this, null)), _classPrivateFieldGet2(_pending_effect, this) && (destroy_effect(_classPrivateFieldGet2(_pending_effect, this)), _classPrivateFieldSet2(_pending_effect, this, null)), _classPrivateFieldGet2(_failed_effect, this) && (destroy_effect(_classPrivateFieldGet2(_failed_effect, this)), _classPrivateFieldSet2(_failed_effect, this, null)), hydrating && (set_hydrate_node(_classPrivateFieldGet2(_hydrate_open, this)), next(), set_hydrate_node(skip_nodes()));
		var g = !1, _ = !1;
		let v = () => {
			if (g) {
				svelte_boundary_reset_noop();
				return;
			}
			g = !0, _ && svelte_boundary_reset_onerror(), Batch.ensure(), _classPrivateFieldSet2(_local_pending_count, this, 0), _classPrivateFieldGet2(_failed_effect, this) !== null && pause_effect(_classPrivateFieldGet2(_failed_effect, this), () => {
				_classPrivateFieldSet2(_failed_effect, this, null);
			}), _classPrivateFieldSet2(_pending, this, this.has_pending_snippet()), _classPrivateFieldSet2(_main_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => (_classPrivateFieldSet2(_is_creating_fallback, this, !1), branch(() => _classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this)))))), _classPrivateFieldGet2(_pending_count, this) > 0 ? _assertClassBrand(_Boundary_brand, this, _show_pending_snippet).call(this) : _classPrivateFieldSet2(_pending, this, !1);
		};
		var y = active_reaction;
		try {
			set_active_reaction(null), _ = !0, m == null || m(e, v), _ = !1;
		} catch (e) {
			invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
		} finally {
			set_active_reaction(y);
		}
		h && queue_micro_task(() => {
			_classPrivateFieldSet2(_failed_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
				Batch.ensure(), _classPrivateFieldSet2(_is_creating_fallback, this, !0);
				try {
					return branch(() => {
						h(_classPrivateFieldGet2(_anchor, this), () => e, () => v);
					});
				} catch (e) {
					return invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this).parent), null;
				} finally {
					_classPrivateFieldSet2(_is_creating_fallback, this, !1);
				}
			}));
		});
	}
};
function _hydrate_resolved_content() {
	try {
		_classPrivateFieldSet2(_main_effect, this, branch(() => _classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this))));
	} catch (e) {
		this.error(e);
	}
	_classPrivateFieldSet2(_pending, this, !1);
}
function _hydrate_pending_content() {
	let e = _classPrivateFieldGet2(_props, this).pending;
	e && (_classPrivateFieldSet2(_pending_effect, this, branch(() => e(_classPrivateFieldGet2(_anchor, this)))), Batch.enqueue(() => {
		var e = _assertClassBrand(_Boundary_brand, this, _get_anchor).call(this);
		_classPrivateFieldSet2(_main_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => (Batch.ensure(), branch(() => _classPrivateFieldGet2(_children, this).call(this, e))))), _classPrivateFieldGet2(_pending_count, this) > 0 ? _assertClassBrand(_Boundary_brand, this, _show_pending_snippet).call(this) : (pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
			_classPrivateFieldSet2(_pending_effect, this, null);
		}), _classPrivateFieldSet2(_pending, this, !1));
	}));
}
function _get_anchor() {
	var e = _classPrivateFieldGet2(_anchor, this);
	return _classPrivateFieldGet2(_pending, this) && (_classPrivateFieldSet2(_pending_anchor, this, create_text()), _classPrivateFieldGet2(_anchor, this).before(_classPrivateFieldGet2(_pending_anchor, this)), e = _classPrivateFieldGet2(_pending_anchor, this)), e;
}
function _run(e) {
	var m = active_effect, h = active_reaction, g = component_context;
	set_active_effect(_classPrivateFieldGet2(_effect, this)), set_active_reaction(_classPrivateFieldGet2(_effect, this)), set_component_context(_classPrivateFieldGet2(_effect, this).ctx);
	try {
		return e();
	} catch (e) {
		return handle_error(e), null;
	} finally {
		set_active_effect(m), set_active_reaction(h), set_component_context(g);
	}
}
function _show_pending_snippet() {
	let e = _classPrivateFieldGet2(_props, this).pending;
	_classPrivateFieldGet2(_main_effect, this) !== null && (_classPrivateFieldSet2(_offscreen_fragment, this, document.createDocumentFragment()), _classPrivateFieldGet2(_offscreen_fragment, this).append(_classPrivateFieldGet2(_pending_anchor, this)), move_effect(_classPrivateFieldGet2(_main_effect, this), _classPrivateFieldGet2(_offscreen_fragment, this))), _classPrivateFieldGet2(_pending_effect, this) === null && _classPrivateFieldSet2(_pending_effect, this, branch(() => e(_classPrivateFieldGet2(_anchor, this))));
}
function _update_pending_count(e) {
	if (!this.has_pending_snippet()) {
		if (this.parent) {
			var m;
			_assertClassBrand(_Boundary_brand, m = this.parent, _update_pending_count).call(m, e);
		}
		return;
	}
	_classPrivateFieldSet2(_pending_count, this, _classPrivateFieldGet2(_pending_count, this) + e), _classPrivateFieldGet2(_pending_count, this) === 0 && (_classPrivateFieldSet2(_pending, this, !1), _classPrivateFieldGet2(_pending_effect, this) && pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
		_classPrivateFieldSet2(_pending_effect, this, null);
	}), _classPrivateFieldGet2(_offscreen_fragment, this) && (_classPrivateFieldGet2(_anchor, this).before(_classPrivateFieldGet2(_offscreen_fragment, this)), _classPrivateFieldSet2(_offscreen_fragment, this, null)));
}
function _OverloadYield(e, m) {
	this.v = e, this.k = m;
}
function AsyncGenerator(e) {
	var m, h;
	function g(m, h) {
		try {
			var v = e[m](h), y = v.value, b = y instanceof _OverloadYield;
			Promise.resolve(b ? y.v : y).then(function(h) {
				if (b) {
					var x = m === "return" ? "return" : "next";
					if (!y.k || h.done) return g(x, h);
					h = e[x](h).value;
				}
				_(v.done ? "return" : "normal", h);
			}, function(e) {
				g("throw", e);
			});
		} catch (e) {
			_("throw", e);
		}
	}
	function _(e, _) {
		switch (e) {
			case "return":
				m.resolve({
					value: _,
					done: !0
				});
				break;
			case "throw":
				m.reject(_);
				break;
			default: m.resolve({
				value: _,
				done: !1
			});
		}
		(m = m.next) ? g(m.key, m.arg) : h = null;
	}
	this._invoke = function(e, _) {
		return new Promise(function(v, y) {
			var b = {
				key: e,
				arg: _,
				resolve: v,
				reject: y,
				next: null
			};
			h ? h = h.next = b : (m = h = b, g(e, _));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
AsyncGenerator.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, AsyncGenerator.prototype.next = function(e) {
	return this._invoke("next", e);
}, AsyncGenerator.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, AsyncGenerator.prototype.return = function(e) {
	return this._invoke("return", e);
};
function flatten(e, m, h, g) {
	let _ = is_runes() ? derived : derived_safe_equal;
	if (h.length === 0 && e.length === 0) {
		g(m.map(_));
		return;
	}
	var v = current_batch, y = active_effect, b = capture();
	function x() {
		Promise.all(h.map((e) => /* @__PURE__ */ async_derived(e))).then((e) => {
			b();
			try {
				g([...m.map(_), ...e]);
			} catch (e) {
				y.f & 16384 || invoke_error_boundary(e, y);
			}
			v == null || v.deactivate(), unset_context();
		}).catch((e) => {
			invoke_error_boundary(e, y);
		});
	}
	e.length > 0 ? Promise.all(e).then(() => {
		b();
		try {
			return x();
		} finally {
			v == null || v.deactivate(), unset_context();
		}
	}) : x();
}
function capture() {
	var e = active_effect, m = active_reaction, h = component_context, g = current_batch;
	return function(_ = !0) {
		set_active_effect(e), set_active_reaction(m), set_component_context(h), _ && (g == null || g.activate());
	};
}
function unset_context() {
	set_active_effect(null), set_active_reaction(null), set_component_context(null);
}
/* @__NO_SIDE_EFFECTS__ */
function derived(e) {
	var m = 2 | DIRTY, h = active_reaction !== null && active_reaction.f & 2 ? active_reaction : null;
	return active_effect !== null && (active_effect.f |= EFFECT_PRESERVED), {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: m,
		fn: e,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: h == null ? active_effect : h,
		ac: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function async_derived(e, m) {
	let h = active_effect;
	h === null && async_derived_orphan();
	var g = h.b, _ = void 0, y = source(UNINITIALIZED), b = !active_reaction, x = /* @__PURE__ */ new Map();
	return async_effect(() => {
		var m = deferred();
		_ = m.promise;
		try {
			Promise.resolve(e()).then(m.resolve, m.reject).then(() => {
				h === current_batch && h.committed && h.deactivate(), unset_context();
			});
		} catch (e) {
			m.reject(e), unset_context();
		}
		var h = current_batch;
		if (b) {
			var v, S = !g.is_pending();
			g.update_pending_count(1), h.increment(S), (v = x.get(h)) == null || v.reject(STALE_REACTION), x.delete(h), x.set(h, m);
		}
		let C = (e, m = void 0) => {
			if (h.activate(), m) m !== STALE_REACTION && (y.f |= ERROR_VALUE, internal_set(y, m));
			else {
				y.f & 8388608 && (y.f ^= ERROR_VALUE), internal_set(y, e);
				for (let [e, m] of x) {
					if (x.delete(e), e === h) break;
					m.reject(STALE_REACTION);
				}
			}
			b && (g.update_pending_count(-1), h.decrement(S));
		};
		m.promise.then(C, (e) => C(null, e || "unknown"));
	}), teardown(() => {
		for (let e of x.values()) e.reject(STALE_REACTION);
	}), new Promise((e) => {
		function m(h) {
			function g() {
				h === _ ? e(y) : m(_);
			}
			h.then(g, g);
		}
		m(_);
	});
}
/* @__NO_SIDE_EFFECTS__ */
function user_derived(e) {
	let m = /* @__PURE__ */ derived(e);
	return push_reaction_value(m), m;
}
/* @__NO_SIDE_EFFECTS__ */
function derived_safe_equal(e) {
	let m = /* @__PURE__ */ derived(e);
	return m.equals = safe_equals, m;
}
function destroy_derived_effects(e) {
	var m = e.effects;
	if (m !== null) {
		e.effects = null;
		for (var h = 0; h < m.length; h += 1) destroy_effect(m[h]);
	}
}
function get_derived_parent_effect(e) {
	for (var m = e.parent; m !== null;) {
		if (!(m.f & 2)) return m;
		m = m.parent;
	}
	return null;
}
function execute_derived(e) {
	var m, h = active_effect;
	set_active_effect(get_derived_parent_effect(e));
	try {
		e.f &= ~WAS_MARKED, destroy_derived_effects(e), m = update_reaction(e);
	} finally {
		set_active_effect(h);
	}
	return m;
}
function update_derived(e) {
	var m = execute_derived(e);
	e.equals(m) || (e.v = m, e.wv = increment_write_version()), !is_destroying_effect && (batch_values === null ? set_signal_status(e, e.f & 512 ? CLEAN : MAYBE_DIRTY) : effect_tracking() && batch_values.set(e, e.v));
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
var eager_effects_deferred = !1;
function source(e, m) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/* @__NO_SIDE_EFFECTS__ */
function state(e, m) {
	let h = source(e, m);
	return push_reaction_value(h), h;
}
/* @__NO_SIDE_EFFECTS__ */
function mutable_source(e, m = !1, h = !0) {
	let g = source(e);
	return m || (g.equals = safe_equals), g;
}
function set(e, m, h = !1) {
	return active_reaction !== null && (!untracking || active_reaction.f & 131072) && is_runes() && active_reaction.f & 4325394 && !(current_sources != null && current_sources.includes(e)) && state_unsafe_mutation(), internal_set(e, h ? proxy(m) : m);
}
function internal_set(e, m) {
	if (!e.equals(m)) {
		var h = e.v;
		is_destroying_effect ? old_values.set(e, m) : old_values.set(e, h), e.v = m;
		var g = Batch.ensure();
		g.capture(e, h), e.f & 2 && (e.f & 2048 && execute_derived(e), set_signal_status(e, e.f & 512 ? CLEAN : MAYBE_DIRTY)), e.wv = increment_write_version(), mark_reactions(e, DIRTY), is_runes() && active_effect !== null && active_effect.f & 1024 && !(active_effect.f & 96) && (untracked_writes === null ? set_untracked_writes([e]) : untracked_writes.push(e)), !g.is_fork && eager_effects.size > 0 && !eager_effects_deferred && flush_eager_effects();
	}
	return m;
}
function flush_eager_effects() {
	eager_effects_deferred = !1;
	let e = Array.from(eager_effects);
	for (let m of e) m.f & 1024 && set_signal_status(m, MAYBE_DIRTY), is_dirty(m) && update_effect(m);
	eager_effects.clear();
}
function increment(e) {
	set(e, e.v + 1);
}
function mark_reactions(e, m) {
	var h = e.reactions;
	if (h !== null) for (var g = is_runes(), _ = h.length, v = 0; v < _; v++) {
		var y = h[v], b = y.f;
		if (!(!g && y === active_effect)) {
			var x = (b & DIRTY) === 0;
			if (x && set_signal_status(y, m), b & 2) {
				var S = y;
				batch_values == null || batch_values.delete(S), b & 32768 || (b & 512 && (y.f |= WAS_MARKED), mark_reactions(S, MAYBE_DIRTY));
			} else x && (b & 16 && eager_block_effects !== null && eager_block_effects.add(y), schedule_effect(y));
		}
	}
}
function proxy(e) {
	if (typeof e != "object" || !e || STATE_SYMBOL in e) return e;
	let m = get_prototype_of(e);
	if (m !== object_prototype && m !== array_prototype) return e;
	var h = /* @__PURE__ */ new Map(), g = is_array(e), _ = /* @__PURE__ */ state(0), b = null, x = update_version, S = (e) => {
		if (update_version === x) return e();
		var m = active_reaction, h = update_version;
		set_active_reaction(null), set_update_version(x);
		var g = e();
		return set_active_reaction(m), set_update_version(h), g;
	};
	return g && h.set("length", /* @__PURE__ */ state(e.length, b)), new Proxy(e, {
		defineProperty(e, m, g) {
			(!("value" in g) || g.configurable === !1 || g.enumerable === !1 || g.writable === !1) && state_descriptors_fixed();
			var _ = h.get(m);
			return _ === void 0 ? _ = S(() => {
				var e = /* @__PURE__ */ state(g.value, b);
				return h.set(m, e), e;
			}) : set(_, g.value, !0), !0;
		},
		deleteProperty(e, m) {
			var g = h.get(m);
			if (g === void 0) {
				if (m in e) {
					let e = S(() => /* @__PURE__ */ state(UNINITIALIZED, b));
					h.set(m, e), increment(_);
				}
			} else set(g, UNINITIALIZED), increment(_);
			return !0;
		},
		get(m, g, _) {
			var y;
			if (g === STATE_SYMBOL) return e;
			var x = h.get(g), C = g in m;
			if (x === void 0 && (!C || (y = get_descriptor(m, g)) != null && y.writable) && (x = S(() => /* @__PURE__ */ state(proxy(C ? m[g] : UNINITIALIZED), b)), h.set(g, x)), x !== void 0) {
				var T = get(x);
				return T === UNINITIALIZED ? void 0 : T;
			}
			return Reflect.get(m, g, _);
		},
		getOwnPropertyDescriptor(e, m) {
			var g = Reflect.getOwnPropertyDescriptor(e, m);
			if (g && "value" in g) {
				var _ = h.get(m);
				_ && (g.value = get(_));
			} else if (g === void 0) {
				var y = h.get(m), b = y == null ? void 0 : y.v;
				if (y !== void 0 && b !== UNINITIALIZED) return {
					enumerable: !0,
					configurable: !0,
					value: b,
					writable: !0
				};
			}
			return g;
		},
		has(e, m) {
			var g;
			if (m === STATE_SYMBOL) return !0;
			var _ = h.get(m), y = _ !== void 0 && _.v !== UNINITIALIZED || Reflect.has(e, m);
			return (_ !== void 0 || active_effect !== null && (!y || (g = get_descriptor(e, m)) != null && g.writable)) && (_ === void 0 && (_ = S(() => /* @__PURE__ */ state(y ? proxy(e[m]) : UNINITIALIZED, b)), h.set(m, _)), get(_) === UNINITIALIZED) ? !1 : y;
		},
		set(e, m, y, x) {
			var C = h.get(m), T = m in e;
			if (g && m === "length") for (var E = y; E < C.v; E += 1) {
				var D = h.get(E + "");
				D === void 0 ? E in e && (D = S(() => /* @__PURE__ */ state(UNINITIALIZED, b)), h.set(E + "", D)) : set(D, UNINITIALIZED);
			}
			if (C === void 0) {
				var O;
				(!T || (O = get_descriptor(e, m)) != null && O.writable) && (C = S(() => /* @__PURE__ */ state(void 0, b)), set(C, proxy(y)), h.set(m, C));
			} else {
				T = C.v !== UNINITIALIZED;
				var k = S(() => proxy(y));
				set(C, k);
			}
			var A = Reflect.getOwnPropertyDescriptor(e, m);
			if (A != null && A.set && A.set.call(x, y), !T) {
				if (g && typeof m == "string") {
					var j = h.get("length"), M = Number(m);
					Number.isInteger(M) && M >= j.v && set(j, M + 1);
				}
				increment(_);
			}
			return !0;
		},
		ownKeys(e) {
			get(_);
			var m = Reflect.ownKeys(e).filter((e) => {
				var m = h.get(e);
				return m === void 0 || m.v !== UNINITIALIZED;
			});
			for (var [g, y] of h) y.v !== UNINITIALIZED && !(g in e) && m.push(g);
			return m;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
var $window, is_firefox, first_child_getter, next_sibling_getter;
function init_operations() {
	if ($window === void 0) {
		$window = window, document, is_firefox = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, m = Node.prototype, h = Text.prototype;
		first_child_getter = get_descriptor(m, "firstChild").get, next_sibling_getter = get_descriptor(m, "nextSibling").get, is_extensible(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), is_extensible(h) && (h.__t = void 0);
	}
}
function create_text(e = "") {
	return document.createTextNode(e);
}
/* @__NO_SIDE_EFFECTS__ */
function get_first_child(e) {
	return first_child_getter.call(e);
}
/* @__NO_SIDE_EFFECTS__ */
function get_next_sibling(e) {
	return next_sibling_getter.call(e);
}
function child(e, m) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(e);
	var h = /* @__PURE__ */ get_first_child(hydrate_node);
	if (h === null) h = hydrate_node.appendChild(create_text());
	else if (m && h.nodeType !== 3) {
		var g = create_text();
		return h == null || h.before(g), set_hydrate_node(g), g;
	}
	return set_hydrate_node(h), h;
}
function first_child(e, m = !1) {
	if (!hydrating) {
		var h = /* @__PURE__ */ get_first_child(e);
		return h instanceof Comment && h.data === "" ? /* @__PURE__ */ get_next_sibling(h) : h;
	}
	if (m && (hydrate_node == null ? void 0 : hydrate_node.nodeType) !== 3) {
		var g = create_text();
		return hydrate_node == null || hydrate_node.before(g), set_hydrate_node(g), g;
	}
	return hydrate_node;
}
function sibling(e, m = 1, h = !1) {
	let g = hydrating ? hydrate_node : e;
	for (var _; m--;) _ = g, g = /* @__PURE__ */ get_next_sibling(g);
	if (!hydrating) return g;
	if (h && (g == null ? void 0 : g.nodeType) !== 3) {
		var v = create_text();
		return g === null ? _ == null || _.after(v) : g.before(v), set_hydrate_node(v), v;
	}
	return set_hydrate_node(g), g;
}
function clear_text_content(e) {
	e.textContent = "";
}
function should_defer_append() {
	return !1;
}
function without_reactive_context(e) {
	var m = active_reaction, h = active_effect;
	set_active_reaction(null), set_active_effect(null);
	try {
		return e();
	} finally {
		set_active_reaction(m), set_active_effect(h);
	}
}
function validate_effect(e) {
	active_effect === null && (active_reaction === null && effect_orphan(e), effect_in_unowned_derived()), is_destroying_effect && effect_in_teardown(e);
}
function push_effect(e, m) {
	var h = m.last;
	h === null ? m.last = m.first = e : (h.next = e, e.prev = h, m.last = e);
}
function create_effect(e, m, h, g = !0) {
	var _ = active_effect;
	_ !== null && _.f & 8192 && (e |= INERT);
	var v = {
		ctx: component_context,
		deps: null,
		nodes_start: null,
		nodes_end: null,
		f: e | 2560,
		first: null,
		fn: m,
		last: null,
		next: null,
		parent: _,
		b: _ && _.b,
		prev: null,
		teardown: null,
		transitions: null,
		wv: 0,
		ac: null
	};
	if (h) try {
		update_effect(v), v.f |= 32768;
	} catch (e) {
		throw destroy_effect(v), e;
	}
	else m !== null && schedule_effect(v);
	if (g) {
		var y = v;
		if (h && y.deps === null && y.teardown === null && y.nodes_start === null && y.first === y.last && !(y.f & 524288) && (y = y.first, e & 16 && e & 65536 && y !== null && (y.f |= EFFECT_TRANSPARENT)), y !== null && (y.parent = _, _ !== null && push_effect(y, _), active_reaction !== null && active_reaction.f & 2 && !(e & 64))) {
			var b, x = active_reaction;
			((b = x.effects) == null ? x.effects = [] : b).push(y);
		}
	}
	return v;
}
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
function teardown(e) {
	let m = create_effect(8, null, !1);
	return set_signal_status(m, CLEAN), m.teardown = e, m;
}
function user_effect(e) {
	validate_effect("$effect");
	var m = active_effect.f;
	if (!active_reaction && m & 32 && !(m & 32768)) {
		var h, g = component_context;
		((h = g.e) == null ? g.e = [] : h).push(e);
	} else return create_user_effect(e);
}
function create_user_effect(e) {
	return create_effect(1048580, e, !1);
}
function effect_root(e) {
	Batch.ensure();
	let m = create_effect(64 | EFFECT_PRESERVED, e, !0);
	return () => {
		destroy_effect(m);
	};
}
function component_root(e) {
	Batch.ensure();
	let m = create_effect(64 | EFFECT_PRESERVED, e, !0);
	return (e = {}) => new Promise((h) => {
		e.outro ? pause_effect(m, () => {
			destroy_effect(m), h(void 0);
		}) : (destroy_effect(m), h(void 0));
	});
}
function effect(e) {
	return create_effect(4, e, !1);
}
function async_effect(e) {
	return create_effect(4194304 | EFFECT_PRESERVED, e, !0);
}
function render_effect(e, m = 0) {
	return create_effect(8 | m, e, !0);
}
function template_effect(e, m = [], h = [], g = [], _ = !1) {
	flatten(g, m, h, (m) => {
		create_effect(_ ? 4 : 8, () => e(...m.map(get)), !0);
	});
}
function block(e, m = 0) {
	return create_effect(16 | m, e, !0);
}
function branch(e, m = !0) {
	return create_effect(32 | EFFECT_PRESERVED, e, !0, m);
}
function execute_effect_teardown(e) {
	var m = e.teardown;
	if (m !== null) {
		let e = is_destroying_effect, h = active_reaction;
		set_is_destroying_effect(!0), set_active_reaction(null);
		try {
			m.call(null);
		} finally {
			set_is_destroying_effect(e), set_active_reaction(h);
		}
	}
}
function destroy_effect_children(e, m = !1) {
	var h = e.first;
	for (e.first = e.last = null; h !== null;) {
		let e = h.ac;
		e !== null && without_reactive_context(() => {
			e.abort(STALE_REACTION);
		});
		var g = h.next;
		h.f & 64 ? h.parent = null : destroy_effect(h, m), h = g;
	}
}
function destroy_block_effect_children(e) {
	for (var m = e.first; m !== null;) {
		var h = m.next;
		m.f & 32 || destroy_effect(m), m = h;
	}
}
function destroy_effect(e, m = !0) {
	var h = !1;
	(m || e.f & 262144) && e.nodes_start !== null && e.nodes_end !== null && (remove_effect_dom(e.nodes_start, e.nodes_end), h = !0), destroy_effect_children(e, m && !h), remove_reactions(e, 0), set_signal_status(e, 16384);
	var g = e.transitions;
	if (g !== null) for (let e of g) e.stop();
	execute_effect_teardown(e);
	var _ = e.parent;
	_ !== null && _.first !== null && unlink_effect(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes_start = e.nodes_end = e.ac = null;
}
function remove_effect_dom(e, m) {
	for (; e !== null;) {
		var h = e === m ? null : /* @__PURE__ */ get_next_sibling(e);
		e.remove(), e = h;
	}
}
function unlink_effect(e) {
	var m = e.parent, h = e.prev, g = e.next;
	h !== null && (h.next = g), g !== null && (g.prev = h), m !== null && (m.first === e && (m.first = g), m.last === e && (m.last = h));
}
function pause_effect(e, m, h = !0) {
	var g = [];
	pause_children(e, g, !0), run_out_transitions(g, () => {
		h && destroy_effect(e), m && m();
	});
}
function run_out_transitions(e, m) {
	var h = e.length;
	if (h > 0) {
		var g = () => --h || m();
		for (var _ of e) _.out(g);
	} else m();
}
function pause_children(e, m, h) {
	if (!(e.f & 8192)) {
		if (e.f ^= INERT, e.transitions !== null) for (let g of e.transitions) (g.is_global || h) && m.push(g);
		for (var g = e.first; g !== null;) {
			var _ = g.next, v = (g.f & 65536) != 0 || (g.f & 32) != 0 && (e.f & 16) != 0;
			pause_children(g, m, v ? h : !1), g = _;
		}
	}
}
function resume_effect(e) {
	resume_children(e, !0);
}
function resume_children(e, m) {
	if (e.f & 8192) {
		e.f ^= INERT, e.f & 1024 || (set_signal_status(e, DIRTY), schedule_effect(e));
		for (var h = e.first; h !== null;) {
			var g = h.next, _ = (h.f & 65536) != 0 || (h.f & 32) != 0;
			resume_children(h, _ ? m : !1), h = g;
		}
		if (e.transitions !== null) for (let h of e.transitions) (h.is_global || m) && h.in();
	}
}
function move_effect(e, m) {
	for (var h = e.nodes_start, g = e.nodes_end; h !== null;) {
		var _ = h === g ? null : /* @__PURE__ */ get_next_sibling(h);
		m.append(h), h = _;
	}
}
let is_updating_effect = !1;
function set_is_updating_effect(e) {
	is_updating_effect = e;
}
let is_destroying_effect = !1;
function set_is_destroying_effect(e) {
	is_destroying_effect = e;
}
let active_reaction = null, untracking = !1;
function set_active_reaction(e) {
	active_reaction = e;
}
let active_effect = null;
function set_active_effect(e) {
	active_effect = e;
}
let current_sources = null;
function push_reaction_value(e) {
	active_reaction !== null && (current_sources === null ? current_sources = [e] : current_sources.push(e));
}
var new_deps = null, skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(e) {
	untracked_writes = e;
}
let write_version = 1;
var read_version = 0;
let update_version = read_version;
function set_update_version(e) {
	update_version = e;
}
function increment_write_version() {
	return ++write_version;
}
function is_dirty(e) {
	var m = e.f;
	if (m & 2048) return !0;
	if (m & 2 && (e.f &= ~WAS_MARKED), m & 4096) {
		var h = e.deps;
		if (h !== null) for (var g = h.length, _ = 0; _ < g; _++) {
			var v = h[_];
			if (is_dirty(v) && update_derived(v), v.wv > e.wv) return !0;
		}
		m & 512 && batch_values === null && set_signal_status(e, CLEAN);
	}
	return !1;
}
function schedule_possible_effect_self_invalidation(e, m, h = !0) {
	var g = e.reactions;
	if (g !== null && !(current_sources != null && current_sources.includes(e))) for (var _ = 0; _ < g.length; _++) {
		var v = g[_];
		v.f & 2 ? schedule_possible_effect_self_invalidation(v, m, !1) : m === v && (h ? set_signal_status(v, DIRTY) : v.f & 1024 && set_signal_status(v, MAYBE_DIRTY), schedule_effect(v));
	}
}
function update_reaction(e) {
	var m = new_deps, h = skipped_deps, g = untracked_writes, _ = active_reaction, v = current_sources, y = component_context, b = untracking, x = update_version, S = e.f;
	new_deps = null, skipped_deps = 0, untracked_writes = null, active_reaction = S & 96 ? null : e, current_sources = null, set_component_context(e.ctx), untracking = !1, update_version = ++read_version, e.ac !== null && (without_reactive_context(() => {
		e.ac.abort(STALE_REACTION);
	}), e.ac = null);
	try {
		e.f |= REACTION_IS_UPDATING;
		var C = e.fn, w = C(), T = e.deps;
		if (new_deps !== null) {
			var E;
			if (remove_reactions(e, skipped_deps), T !== null && skipped_deps > 0) for (T.length = skipped_deps + new_deps.length, E = 0; E < new_deps.length; E++) T[skipped_deps + E] = new_deps[E];
			else e.deps = T = new_deps;
			if (is_updating_effect && effect_tracking() && e.f & 512) for (E = skipped_deps; E < T.length; E++) {
				var D, O;
				((O = (D = T[E]).reactions) == null ? D.reactions = [] : O).push(e);
			}
		} else T !== null && skipped_deps < T.length && (remove_reactions(e, skipped_deps), T.length = skipped_deps);
		if (is_runes() && untracked_writes !== null && !untracking && T !== null && !(e.f & 6146)) for (E = 0; E < untracked_writes.length; E++) schedule_possible_effect_self_invalidation(untracked_writes[E], e);
		return _ !== null && _ !== e && (read_version++, untracked_writes !== null && (g === null ? g = untracked_writes : g.push(...untracked_writes))), e.f & 8388608 && (e.f ^= ERROR_VALUE), w;
	} catch (e) {
		return handle_error(e);
	} finally {
		e.f ^= REACTION_IS_UPDATING, new_deps = m, skipped_deps = h, untracked_writes = g, active_reaction = _, current_sources = v, set_component_context(y), untracking = b, update_version = x;
	}
}
function remove_reaction(e, m) {
	let h = m.reactions;
	if (h !== null) {
		var g = index_of.call(h, e);
		if (g !== -1) {
			var _ = h.length - 1;
			_ === 0 ? h = m.reactions = null : (h[g] = h[_], h.pop());
		}
	}
	h === null && m.f & 2 && (new_deps === null || !new_deps.includes(m)) && (set_signal_status(m, MAYBE_DIRTY), m.f & 512 && (m.f ^= 512, m.f &= ~WAS_MARKED), destroy_derived_effects(m), remove_reactions(m, 0));
}
function remove_reactions(e, m) {
	var h = e.deps;
	if (h !== null) for (var g = m; g < h.length; g++) remove_reaction(e, h[g]);
}
function update_effect(e) {
	var m = e.f;
	if (!(m & 16384)) {
		set_signal_status(e, CLEAN);
		var h = active_effect, g = is_updating_effect;
		active_effect = e, is_updating_effect = !0;
		try {
			m & 16 ? destroy_block_effect_children(e) : destroy_effect_children(e), execute_effect_teardown(e);
			var _ = update_reaction(e);
			e.teardown = typeof _ == "function" ? _ : null, e.wv = write_version;
		} finally {
			is_updating_effect = g, active_effect = h;
		}
	}
}
function get(e) {
	var m = (e.f & 2) != 0;
	if (active_reaction !== null && !untracking && !(active_effect !== null && active_effect.f & 16384) && !(current_sources != null && current_sources.includes(e))) {
		var h = active_reaction.deps;
		if (active_reaction.f & 2097152) e.rv < read_version && (e.rv = read_version, new_deps === null && h !== null && h[skipped_deps] === e ? skipped_deps++ : new_deps === null ? new_deps = [e] : new_deps.includes(e) || new_deps.push(e));
		else {
			var g, _;
			((_ = (g = active_reaction).deps) == null ? g.deps = [] : _).push(e);
			var v = e.reactions;
			v === null ? e.reactions = [active_reaction] : v.includes(active_reaction) || v.push(active_reaction);
		}
	}
	if (is_destroying_effect) {
		if (old_values.has(e)) return old_values.get(e);
		if (m) {
			var y = e, b = y.v;
			return (!(y.f & 1024) && y.reactions !== null || depends_on_old_values(y)) && (b = execute_derived(y)), old_values.set(y, b), b;
		}
	} else if (m) {
		if (y = e, batch_values != null && batch_values.has(y)) return batch_values.get(y);
		is_dirty(y) && update_derived(y), is_updating_effect && effect_tracking() && !(y.f & 512) && reconnect(y);
	} else if (batch_values != null && batch_values.has(e)) return batch_values.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function reconnect(e) {
	if (e.deps !== null) {
		e.f ^= 512;
		for (let h of e.deps) {
			var m;
			((m = h.reactions) == null ? h.reactions = [] : m).push(e), h.f & 2 && !(h.f & 512) && reconnect(h);
		}
	}
}
function depends_on_old_values(e) {
	if (e.v === UNINITIALIZED) return !0;
	if (e.deps === null) return !1;
	for (let m of e.deps) if (old_values.has(m) || m.f & 2 && depends_on_old_values(m)) return !0;
	return !1;
}
function untrack(e) {
	var m = untracking;
	try {
		return untracking = !0, e();
	} finally {
		untracking = m;
	}
}
var STATUS_MASK = ~(MAYBE_DIRTY | 3072);
function set_signal_status(e, m) {
	e.f = e.f & STATUS_MASK | m;
}
const all_registered_events = /* @__PURE__ */ new Set(), root_event_handles = /* @__PURE__ */ new Set();
function delegate(e) {
	for (var m = 0; m < e.length; m++) all_registered_events.add(e[m]);
	for (var h of root_event_handles) h(e);
}
var last_propagated_event = null;
function handle_event_propagation(e) {
	var m, h = this, g = h.ownerDocument, _ = e.type, v = ((m = e.composedPath) == null ? void 0 : m.call(e)) || [], y = v[0] || e.target;
	last_propagated_event = e;
	var b = 0, x = last_propagated_event === e && e.__root;
	if (x) {
		var S = v.indexOf(x);
		if (S !== -1 && (h === document || h === window)) {
			e.__root = h;
			return;
		}
		var w = v.indexOf(h);
		if (w === -1) return;
		S <= w && (b = S);
	}
	if (y = v[b] || e.target, y !== h) {
		define_property(e, "currentTarget", {
			configurable: !0,
			get() {
				return y || g;
			}
		});
		var T = active_reaction, E = active_effect;
		set_active_reaction(null), set_active_effect(null);
		try {
			for (var D, O = []; y !== null;) {
				var k = y.assignedSlot || y.parentNode || y.host || null;
				try {
					var A = y["__" + _];
					A != null && (!y.disabled || e.target === y) && A.call(y, e);
				} catch (e) {
					D ? O.push(e) : D = e;
				}
				if (e.cancelBubble || k === h || k === null) break;
				y = k;
			}
			if (D) {
				for (let e of O) queueMicrotask(() => {
					throw e;
				});
				throw D;
			}
		} finally {
			e.__root = h, delete e.currentTarget, set_active_reaction(T), set_active_effect(E);
		}
	}
}
function create_fragment_from_html(e) {
	var m = document.createElement("template");
	return m.innerHTML = e.replaceAll("<!>", "<!---->"), m.content;
}
function assign_nodes(e, m) {
	var h = active_effect;
	h.nodes_start === null && (h.nodes_start = e, h.nodes_end = m);
}
/* @__NO_SIDE_EFFECTS__ */
function from_html(e, m) {
	var h = (m & 1) != 0, g = (m & 2) != 0, _, v = !e.startsWith("<!>");
	return () => {
		if (hydrating) return assign_nodes(hydrate_node, null), hydrate_node;
		_ === void 0 && (_ = create_fragment_from_html(v ? e : "<!>" + e), h || (_ = /* @__PURE__ */ get_first_child(_)));
		var m = g || is_firefox ? document.importNode(_, !0) : _.cloneNode(!0);
		if (h) {
			var y = /* @__PURE__ */ get_first_child(m), b = m.lastChild;
			assign_nodes(y, b);
		} else assign_nodes(m, m);
		return m;
	};
}
function append(e, m) {
	if (hydrating) {
		var h = active_effect;
		(!(h.f & 32768) || h.nodes_end === null) && (h.nodes_end = hydrate_node), hydrate_next();
		return;
	}
	e !== null && e.before(m);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(e) {
	return PASSIVE_EVENTS.includes(e);
}
function set_text(e, m) {
	var h, g = m == null ? "" : typeof m == "object" ? m + "" : m;
	g !== ((h = e.__t) == null ? e.__t = e.nodeValue : h) && (e.__t = g, e.nodeValue = g + "");
}
function mount(e, m) {
	return _mount(e, m);
}
function hydrate(e, m) {
	var h;
	init_operations(), m.intro = (h = m.intro) == null ? !1 : h;
	let g = m.target, v = hydrating, y = hydrate_node;
	try {
		for (var b = /* @__PURE__ */ get_first_child(g); b && (b.nodeType !== 8 || b.data !== "[");) b = /* @__PURE__ */ get_next_sibling(b);
		if (!b) throw HYDRATION_ERROR;
		set_hydrating(!0), set_hydrate_node(b);
		let h = _mount(e, _objectSpread2(_objectSpread2({}, m), {}, { anchor: b }));
		return set_hydrating(!1), h;
	} catch (h) {
		if (h instanceof Error && h.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw h;
		return h !== HYDRATION_ERROR && console.warn("Failed to hydrate: ", h), m.recover === !1 && hydration_failed(), init_operations(), clear_text_content(g), set_hydrating(!1), mount(e, m);
	} finally {
		set_hydrating(v), set_hydrate_node(y);
	}
}
var document_listeners = /* @__PURE__ */ new Map();
function _mount(e, { target: m, anchor: h, props: g = {}, events: v, context: y, intro: b = !0 }) {
	init_operations();
	var S = /* @__PURE__ */ new Set(), C = (e) => {
		for (var h = 0; h < e.length; h++) {
			var g = e[h];
			if (!S.has(g)) {
				S.add(g);
				var _ = is_passive_event(g);
				m.addEventListener(g, handle_event_propagation, { passive: _ });
				var v = document_listeners.get(g);
				v === void 0 ? (document.addEventListener(g, handle_event_propagation, { passive: _ }), document_listeners.set(g, 1)) : document_listeners.set(g, v + 1);
			}
		}
	};
	C(array_from(all_registered_events)), root_event_handles.add(C);
	var w = void 0, T = component_root(() => {
		var b = h == null ? m.appendChild(create_text()) : h;
		return boundary(b, { pending: () => {} }, (m) => {
			if (y) {
				push({});
				var h = component_context;
				h.c = y;
			}
			if (v && (g.$$events = v), hydrating && assign_nodes(m, null), w = e(m, g) || {}, hydrating && (active_effect.nodes_end = hydrate_node, hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]")) throw hydration_mismatch(), HYDRATION_ERROR;
			y && pop();
		}), () => {
			for (var e of S) {
				m.removeEventListener(e, handle_event_propagation);
				var g = document_listeners.get(e);
				--g === 0 ? (document.removeEventListener(e, handle_event_propagation), document_listeners.delete(e)) : document_listeners.set(e, g);
			}
			if (root_event_handles.delete(C), b !== h) {
				var _;
				(_ = b.parentNode) == null || _.removeChild(b);
			}
		};
	});
	return mounted_components.set(w, T), w;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(e, m) {
	let h = mounted_components.get(e);
	return h ? (mounted_components.delete(e), h(m)) : Promise.resolve();
}
var _batches = /* @__PURE__ */ new WeakMap(), _onscreen = /* @__PURE__ */ new WeakMap(), _offscreen = /* @__PURE__ */ new WeakMap(), _transition = /* @__PURE__ */ new WeakMap(), _commit = /* @__PURE__ */ new WeakMap(), _discard = /* @__PURE__ */ new WeakMap(), BranchManager = class {
	constructor(e, m = !0) {
		_defineProperty(this, "anchor", void 0), _classPrivateFieldInitSpec(this, _batches, /* @__PURE__ */ new Map()), _classPrivateFieldInitSpec(this, _onscreen, /* @__PURE__ */ new Map()), _classPrivateFieldInitSpec(this, _offscreen, /* @__PURE__ */ new Map()), _classPrivateFieldInitSpec(this, _transition, !0), _classPrivateFieldInitSpec(this, _commit, () => {
			var e = current_batch;
			if (_classPrivateFieldGet2(_batches, this).has(e)) {
				var m = _classPrivateFieldGet2(_batches, this).get(e), h = _classPrivateFieldGet2(_onscreen, this).get(m);
				if (h) resume_effect(h);
				else {
					var g = _classPrivateFieldGet2(_offscreen, this).get(m);
					g && (_classPrivateFieldGet2(_onscreen, this).set(m, g.effect), _classPrivateFieldGet2(_offscreen, this).delete(m), g.fragment.lastChild.remove(), this.anchor.before(g.fragment), h = g.effect);
				}
				for (let [m, h] of _classPrivateFieldGet2(_batches, this)) {
					if (_classPrivateFieldGet2(_batches, this).delete(m), m === e) break;
					let g = _classPrivateFieldGet2(_offscreen, this).get(h);
					g && (destroy_effect(g.effect), _classPrivateFieldGet2(_offscreen, this).delete(h));
				}
				for (let [e, g] of _classPrivateFieldGet2(_onscreen, this)) {
					if (e === m) continue;
					let _ = () => {
						if (Array.from(_classPrivateFieldGet2(_batches, this).values()).includes(e)) {
							var m = document.createDocumentFragment();
							move_effect(g, m), m.append(create_text()), _classPrivateFieldGet2(_offscreen, this).set(e, {
								effect: g,
								fragment: m
							});
						} else destroy_effect(g);
						_classPrivateFieldGet2(_onscreen, this).delete(e);
					};
					_classPrivateFieldGet2(_transition, this) || !h ? pause_effect(g, _, !1) : _();
				}
			}
		}), _classPrivateFieldInitSpec(this, _discard, (e) => {
			_classPrivateFieldGet2(_batches, this).delete(e);
			let m = Array.from(_classPrivateFieldGet2(_batches, this).values());
			for (let [e, h] of _classPrivateFieldGet2(_offscreen, this)) m.includes(e) || (destroy_effect(h.effect), _classPrivateFieldGet2(_offscreen, this).delete(e));
		}), this.anchor = e, _classPrivateFieldSet2(_transition, this, m);
	}
	ensure(e, m) {
		var h = current_batch, g = should_defer_append();
		if (m && !_classPrivateFieldGet2(_onscreen, this).has(e) && !_classPrivateFieldGet2(_offscreen, this).has(e)) if (g) {
			var _ = document.createDocumentFragment(), v = create_text();
			_.append(v), _classPrivateFieldGet2(_offscreen, this).set(e, {
				effect: branch(() => m(v)),
				fragment: _
			});
		} else _classPrivateFieldGet2(_onscreen, this).set(e, branch(() => m(this.anchor)));
		if (_classPrivateFieldGet2(_batches, this).set(h, e), g) {
			for (let [m, g] of _classPrivateFieldGet2(_onscreen, this)) m === e ? h.skipped_effects.delete(g) : h.skipped_effects.add(g);
			for (let [m, g] of _classPrivateFieldGet2(_offscreen, this)) m === e ? h.skipped_effects.delete(g.effect) : h.skipped_effects.add(g.effect);
			h.oncommit(_classPrivateFieldGet2(_commit, this)), h.ondiscard(_classPrivateFieldGet2(_discard, this));
		} else hydrating && (this.anchor = hydrate_node), _classPrivateFieldGet2(_commit, this).call(this);
	}
};
function onMount(e) {
	component_context === null && lifecycle_outside_component("onMount"), user_effect(() => {
		let m = untrack(e);
		if (typeof m == "function") return m;
	});
}
function if_block(e, m, h = !1) {
	hydrating && hydrate_next();
	var g = new BranchManager(e), _ = h ? EFFECT_TRANSPARENT : 0;
	function v(m, h) {
		if (hydrating && m === (read_hydration_instruction(e) === "[!")) {
			var _ = skip_nodes();
			set_hydrate_node(_), g.anchor = _, set_hydrating(!1), g.ensure(m, h), set_hydrating(!0);
			return;
		}
		g.ensure(m, h);
	}
	block(() => {
		var e = !1;
		m((m, h = !0) => {
			e = !0, v(h, m);
		}), e || v(!1, null);
	}, _);
}
let current_each_item = null;
function index(e, m) {
	return m;
}
function pause_effects(e, m, h) {
	for (var g = e.items, _ = [], v = m.length, y = 0; y < v; y++) pause_children(m[y].e, _, !0);
	var b = v > 0 && _.length === 0 && h !== null;
	if (b) {
		var x = h.parentNode;
		clear_text_content(x), x.append(h), g.clear(), link(e, m[0].prev, m[v - 1].next);
	}
	run_out_transitions(_, () => {
		for (var h = 0; h < v; h++) {
			var _ = m[h];
			b || (g.delete(_.k), link(e, _.prev, _.next)), destroy_effect(_.e, !b);
		}
	});
}
function each(e, m, h, g, _, v = null) {
	var b = e, S = {
		flags: m,
		items: /* @__PURE__ */ new Map(),
		first: null
	};
	if (m & 4) {
		var C = e;
		b = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(C)) : C.appendChild(create_text());
	}
	hydrating && hydrate_next();
	var w = null, T = !1, E = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ derived_safe_equal(() => {
		var e = h();
		return is_array(e) ? e : e == null ? [] : array_from(e);
	}), O, k;
	function A() {
		reconcile(k, O, S, E, b, _, m, g, h), v !== null && (O.length === 0 ? w ? resume_effect(w) : w = branch(() => v(b)) : w !== null && pause_effect(w, () => {
			w = null;
		}));
	}
	block(() => {
		k != null || (k = active_effect), O = get(D);
		var e = O.length;
		if (T && e === 0) return;
		T = e === 0;
		let y = !1;
		if (hydrating && read_hydration_instruction(b) === "[!" != (e === 0) && (b = skip_nodes(), set_hydrate_node(b), set_hydrating(!1), y = !0), hydrating) {
			for (var x = null, C, j = 0; j < e; j++) {
				if (hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
					b = hydrate_node, y = !0, set_hydrating(!1);
					break;
				}
				var M = O[j], N = g(M, j);
				C = create_item(hydrate_node, S, x, null, M, N, j, _, m, h), S.items.set(N, C), x = C;
			}
			e > 0 && set_hydrate_node(skip_nodes());
		}
		if (hydrating) e === 0 && v && (w = branch(() => v(b)));
		else if (should_defer_append()) {
			var P = /* @__PURE__ */ new Set(), F = current_batch;
			for (j = 0; j < e; j += 1) {
				var I;
				M = O[j], N = g(M, j);
				var L = (I = S.items.get(N)) == null ? E.get(N) : I;
				L ? m & 3 && update_item(L, M, j, m) : (C = create_item(null, S, null, null, M, N, j, _, m, h, !0), E.set(N, C)), P.add(N);
			}
			for (let [e, m] of S.items) P.has(e) || F.skipped_effects.add(m.e);
			F.oncommit(A);
		} else A();
		y && set_hydrating(!0), get(D);
	}), hydrating && (b = hydrate_node);
}
function reconcile(e, m, h, g, _, v, y, b, S) {
	var C = (y & 8) != 0, w = (y & 3) != 0, T = m.length, E = h.items, D = h.first, O, k = null, A, j = [], M = [], N, P, F, I;
	if (C) {
		for (I = 0; I < T; I += 1) if (N = m[I], P = b(N, I), F = E.get(P), F !== void 0) {
			var L, R;
			(L = F.a) == null || L.measure(), ((R = A) == null ? A = /* @__PURE__ */ new Set() : R).add(F);
		}
	}
	for (I = 0; I < T; I += 1) {
		if (N = m[I], P = b(N, I), F = E.get(P), F === void 0) {
			var z = g.get(P);
			if (z !== void 0) {
				g.delete(P), E.set(P, z);
				var B = k ? k.next : D;
				link(h, k, z), link(h, z, B), move(z, B, _), k = z;
			} else k = create_item(D ? D.e.nodes_start : _, h, k, k === null ? h.first : k.next, N, P, I, v, y, S);
			E.set(P, k), j = [], M = [], D = k.next;
			continue;
		}
		if (w && update_item(F, N, I, y), F.e.f & 8192 && (resume_effect(F.e), C)) {
			var V, H;
			(V = F.a) == null || V.unfix(), ((H = A) == null ? A = /* @__PURE__ */ new Set() : H).delete(F);
		}
		if (F !== D) {
			if (O !== void 0 && O.has(F)) {
				if (j.length < M.length) {
					var U = M[0], W;
					k = U.prev;
					var G = j[0], K = j[j.length - 1];
					for (W = 0; W < j.length; W += 1) move(j[W], U, _);
					for (W = 0; W < M.length; W += 1) O.delete(M[W]);
					link(h, G.prev, K.next), link(h, k, G), link(h, K, U), D = U, k = K, --I, j = [], M = [];
				} else O.delete(F), move(F, D, _), link(h, F.prev, F.next), link(h, F, k === null ? h.first : k.next), link(h, k, F), k = F;
				continue;
			}
			for (j = [], M = []; D !== null && D.k !== P;) {
				if (!(D.e.f & 8192)) {
					var q;
					((q = O) == null ? O = /* @__PURE__ */ new Set() : q).add(D);
				}
				M.push(D), D = D.next;
			}
			if (D === null) continue;
			F = D;
		}
		j.push(F), k = F, D = F.next;
	}
	if (D !== null || O !== void 0) {
		for (var J = O === void 0 ? [] : array_from(O); D !== null;) D.e.f & 8192 || J.push(D), D = D.next;
		var Y = J.length;
		if (Y > 0) {
			var X = y & 4 && T === 0 ? _ : null;
			if (C) {
				for (I = 0; I < Y; I += 1) {
					var Z;
					(Z = J[I].a) == null || Z.measure();
				}
				for (I = 0; I < Y; I += 1) {
					var Q;
					(Q = J[I].a) == null || Q.fix();
				}
			}
			pause_effects(h, J, X);
		}
	}
	C && queue_micro_task(() => {
		if (A !== void 0) for (F of A) {
			var e;
			(e = F.a) == null || e.apply();
		}
	}), e.first = h.first && h.first.e, e.last = k && k.e;
	for (var $ of g.values()) destroy_effect($.e);
	g.clear();
}
function update_item(e, m, h, g) {
	g & 1 && internal_set(e.v, m), g & 2 ? internal_set(e.i, h) : e.i = h;
}
function create_item(e, m, h, g, _, v, y, b, x, S, C) {
	var w = current_each_item, T = (x & 1) != 0, E = (x & 16) == 0, D = T ? E ? /* @__PURE__ */ mutable_source(_, !1, !1) : source(_) : _, O = x & 2 ? source(y) : y, k = {
		i: O,
		v: D,
		k: v,
		a: null,
		e: null,
		prev: h,
		next: g
	};
	current_each_item = k;
	try {
		return e === null && document.createDocumentFragment().append(e = create_text()), k.e = branch(() => b(e, D, O, S), hydrating), k.e.prev = h && h.e, k.e.next = g && g.e, h === null ? C || (m.first = k) : (h.next = k, h.e.next = k.e), g !== null && (g.prev = k, g.e.prev = k.e), k;
	} finally {
		current_each_item = w;
	}
}
function move(e, m, h) {
	for (var g = e.next ? e.next.e.nodes_start : h, _ = m ? m.e.nodes_start : h, v = e.e.nodes_start; v !== null && v !== g;) {
		var y = /* @__PURE__ */ get_next_sibling(v);
		_.before(v), v = y;
	}
}
function link(e, m, h) {
	m === null ? e.first = h : (m.next = h, m.e.next = h && h.e), h !== null && (h.prev = m, h.e.prev = m && m.e);
}
function append_styles(e, m) {
	effect(() => {
		var h, g = e.getRootNode(), _ = g.host ? g : (h = g.head) == null ? g.ownerDocument.head : h;
		if (!_.querySelector("#" + m.hash)) {
			let e = document.createElement("style");
			e.id = m.hash, e.textContent = m.code, _.appendChild(e);
		}
	});
}
var IS_CUSTOM_ELEMENT = Symbol("is custom element"), IS_HTML = Symbol("is html");
function set_attribute(e, m, h, g) {
	var _ = get_attributes(e);
	hydrating && (_[m] = e.getAttribute(m), m === "src" || m === "srcset" || m === "href" && e.nodeName === "LINK") || _[m] !== (_[m] = h) && (m === "loading" && (e[LOADING_ATTR_SYMBOL] = h), h == null ? e.removeAttribute(m) : typeof h != "string" && get_setters(e).includes(m) ? e[m] = h : e.setAttribute(m, h));
}
function get_attributes(e) {
	var m;
	return (m = e.__attributes) == null ? e.__attributes = {
		[IS_CUSTOM_ELEMENT]: e.nodeName.includes("-"),
		[IS_HTML]: e.namespaceURI === "http://www.w3.org/1999/xhtml"
	} : m;
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(e) {
	var m = e.getAttribute("is") || e.nodeName, h = setters_cache.get(m);
	if (h) return h;
	setters_cache.set(m, h = []);
	for (var g, _ = e, v = Element.prototype; v !== _;) {
		for (var y in g = get_descriptors(_), g) g[y].set && h.push(y);
		_ = get_prototype_of(_);
	}
	return h;
}
var _ResizeObserverSingleton, _listeners = /* @__PURE__ */ new WeakMap(), _observer = /* @__PURE__ */ new WeakMap(), _options = /* @__PURE__ */ new WeakMap(), _ResizeObserverSingleton_brand = /* @__PURE__ */ new WeakSet(), ResizeObserverSingleton = class {
	constructor(e) {
		_classPrivateMethodInitSpec(this, _ResizeObserverSingleton_brand), _classPrivateFieldInitSpec(this, _listeners, /* @__PURE__ */ new WeakMap()), _classPrivateFieldInitSpec(this, _observer, void 0), _classPrivateFieldInitSpec(this, _options, void 0), _classPrivateFieldSet2(_options, this, e);
	}
	observe(e, m) {
		var h = _classPrivateFieldGet2(_listeners, this).get(e) || /* @__PURE__ */ new Set();
		return h.add(m), _classPrivateFieldGet2(_listeners, this).set(e, h), _assertClassBrand(_ResizeObserverSingleton_brand, this, _getObserver).call(this).observe(e, _classPrivateFieldGet2(_options, this)), () => {
			var h = _classPrivateFieldGet2(_listeners, this).get(e);
			h.delete(m), h.size === 0 && (_classPrivateFieldGet2(_listeners, this).delete(e), _classPrivateFieldGet2(_observer, this).unobserve(e));
		};
	}
};
_ResizeObserverSingleton = ResizeObserverSingleton;
function _getObserver() {
	var e;
	return (e = _classPrivateFieldGet2(_observer, this)) == null ? _classPrivateFieldSet2(_observer, this, new ResizeObserver((e) => {
		for (var m of e) {
			_ResizeObserverSingleton.entries.set(m.target, m);
			for (var h of _classPrivateFieldGet2(_listeners, this).get(m.target) || []) h(m);
		}
	})) : e;
}
_defineProperty(ResizeObserverSingleton, "entries", /* @__PURE__ */ new WeakMap());
function is_bound_this(e, m) {
	return e === m || (e == null ? void 0 : e[STATE_SYMBOL]) === m;
}
function bind_this(e = {}, m, h, g) {
	return effect(() => {
		var _, v;
		return render_effect(() => {
			_ = v, v = (g == null ? void 0 : g()) || [], untrack(() => {
				e !== h(...v) && (m(e, ...v), _ && is_bound_this(h(..._), e) && m(null, ..._));
			});
		}), () => {
			queue_micro_task(() => {
				v && is_bound_this(h(...v), e) && m(null, ...v);
			});
		};
	}), e;
}
var is_store_binding = !1;
function capture_store_binding(e) {
	var m = is_store_binding;
	try {
		return is_store_binding = !1, [e(), is_store_binding];
	} finally {
		is_store_binding = m;
	}
}
function prop(e, m, h, g) {
	var _ = !0, v = (h & 8) != 0, y = (h & 16) != 0, b = g, x = !0, S = () => (x && (x = !1, b = y ? untrack(g) : g), b), C;
	if (v) {
		var T, E, D = STATE_SYMBOL in e || LEGACY_PROPS in e;
		C = (T = (E = get_descriptor(e, m)) == null ? void 0 : E.set) == null ? D && m in e ? (h) => e[m] = h : void 0 : T;
	}
	var O, k = !1;
	v ? [O, k] = capture_store_binding(() => e[m]) : O = e[m], O === void 0 && g !== void 0 && (O = S(), C && (_ && props_invalid_value(m), C(O)));
	var A = _ ? () => {
		var h = e[m];
		return h === void 0 ? S() : (x = !0, h);
	} : () => {
		var h = e[m];
		return h !== void 0 && (b = void 0), h === void 0 ? b : h;
	};
	if (_ && !(h & 4)) return A;
	if (C) {
		var j = e.$$legacy;
		return (function(e, m) {
			return arguments.length > 0 ? ((!_ || !m || j || k) && C(m ? A() : e), e) : A();
		});
	}
	var M = !1, N = (h & 1 ? derived : derived_safe_equal)(() => (M = !1, A()));
	v && get(N);
	var P = active_effect;
	return (function(e, m) {
		if (arguments.length > 0) {
			let h = m ? get(N) : _ && v ? proxy(e) : e;
			return set(N, h), M = !0, b !== void 0 && (b = h), e;
		}
		return is_destroying_effect && M || P.f & 16384 ? N.v : get(N);
	});
}
function createClassComponent(e) {
	return new Svelte4Component(e);
}
var _events = /* @__PURE__ */ new WeakMap(), _instance = /* @__PURE__ */ new WeakMap(), Svelte4Component = class {
	constructor(e) {
		var m, h;
		_classPrivateFieldInitSpec(this, _events, void 0), _classPrivateFieldInitSpec(this, _instance, void 0);
		var g = /* @__PURE__ */ new Map(), _ = (e, m) => {
			var h = /* @__PURE__ */ mutable_source(m, !1, !1);
			return g.set(e, h), h;
		};
		let v = new Proxy(_objectSpread2(_objectSpread2({}, e.props || {}), {}, { $$events: {} }), {
			get(e, m) {
				var h;
				return get((h = g.get(m)) == null ? _(m, Reflect.get(e, m)) : h);
			},
			has(e, m) {
				var h;
				return m === LEGACY_PROPS ? !0 : (get((h = g.get(m)) == null ? _(m, Reflect.get(e, m)) : h), Reflect.has(e, m));
			},
			set(e, m, h) {
				var v;
				return set((v = g.get(m)) == null ? _(m, h) : v, h), Reflect.set(e, m, h);
			}
		});
		_classPrivateFieldSet2(_instance, this, (e.hydrate ? hydrate : mount)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: v,
			context: e.context,
			intro: (m = e.intro) == null ? !1 : m,
			recover: e.recover
		})), (!(!(e == null || (h = e.props) == null) && h.$$host) || e.sync === !1) && flushSync(), _classPrivateFieldSet2(_events, this, v.$$events);
		for (let e of Object.keys(_classPrivateFieldGet2(_instance, this))) e === "$set" || e === "$destroy" || e === "$on" || define_property(this, e, {
			get() {
				return _classPrivateFieldGet2(_instance, this)[e];
			},
			set(m) {
				_classPrivateFieldGet2(_instance, this)[e] = m;
			},
			enumerable: !0
		});
		_classPrivateFieldGet2(_instance, this).$set = (e) => {
			Object.assign(v, e);
		}, _classPrivateFieldGet2(_instance, this).$destroy = () => {
			unmount(_classPrivateFieldGet2(_instance, this));
		};
	}
	$set(e) {
		_classPrivateFieldGet2(_instance, this).$set(e);
	}
	$on(e, m) {
		_classPrivateFieldGet2(_events, this)[e] = _classPrivateFieldGet2(_events, this)[e] || [];
		let h = (...e) => m.call(this, ...e);
		return _classPrivateFieldGet2(_events, this)[e].push(h), () => {
			_classPrivateFieldGet2(_events, this)[e] = _classPrivateFieldGet2(_events, this)[e].filter((e) => e !== h);
		};
	}
	$destroy() {
		_classPrivateFieldGet2(_instance, this).$destroy();
	}
}, SvelteElement;
typeof HTMLElement == "function" && (SvelteElement = class extends HTMLElement {
	constructor(e, m, h) {
		super(), _defineProperty(this, "$$ctor", void 0), _defineProperty(this, "$$s", void 0), _defineProperty(this, "$$c", void 0), _defineProperty(this, "$$cn", !1), _defineProperty(this, "$$d", {}), _defineProperty(this, "$$r", !1), _defineProperty(this, "$$p_d", {}), _defineProperty(this, "$$l", {}), _defineProperty(this, "$$l_u", /* @__PURE__ */ new Map()), _defineProperty(this, "$$me", void 0), this.$$ctor = e, this.$$s = m, h && this.attachShadow({ mode: "open" });
	}
	addEventListener(e, m, h) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(m), this.$$c) {
			let h = this.$$c.$on(e, m);
			this.$$l_u.set(m, h);
		}
		super.addEventListener(e, m, h);
	}
	removeEventListener(e, m, h) {
		if (super.removeEventListener(e, m, h), this.$$c) {
			let e = this.$$l_u.get(m);
			e && (e(), this.$$l_u.delete(m));
		}
	}
	connectedCallback() {
		var e = this;
		return _asyncToGenerator(function* () {
			if (e.$$cn = !0, !e.$$c) {
				if (yield Promise.resolve(), !e.$$cn || e.$$c) return;
				function m(e) {
					return (m) => {
						let h = document.createElement("slot");
						e !== "default" && (h.name = e), append(m, h);
					};
				}
				let h = {}, g = get_custom_elements_slots(e);
				for (let _ of e.$$s) _ in g && (_ === "default" && !e.$$d.children ? (e.$$d.children = m(_), h.default = !0) : h[_] = m(_));
				for (let m of e.attributes) {
					let h = e.$$g_p(m.name);
					h in e.$$d || (e.$$d[h] = get_custom_element_value(h, m.value, e.$$p_d, "toProp"));
				}
				for (let m in e.$$p_d) !(m in e.$$d) && e[m] !== void 0 && (e.$$d[m] = e[m], delete e[m]);
				for (let m in e.$$c = createClassComponent({
					component: e.$$ctor,
					target: e.shadowRoot || e,
					props: _objectSpread2(_objectSpread2({}, e.$$d), {}, {
						$$slots: h,
						$$host: e
					})
				}), e.$$me = effect_root(() => {
					render_effect(() => {
						e.$$r = !0;
						for (let h of object_keys(e.$$c)) {
							var m;
							if (!((m = e.$$p_d[h]) != null && m.reflect)) continue;
							e.$$d[h] = e.$$c[h];
							let g = get_custom_element_value(h, e.$$d[h], e.$$p_d, "toAttribute");
							g == null ? e.removeAttribute(e.$$p_d[h].attribute || h) : e.setAttribute(e.$$p_d[h].attribute || h, g);
						}
						e.$$r = !1;
					});
				}), e.$$l) for (let h of e.$$l[m]) {
					let g = e.$$c.$on(m, h);
					e.$$l_u.set(h, g);
				}
				e.$$l = {};
			}
		})();
	}
	attributeChangedCallback(e, m, h) {
		var g;
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = get_custom_element_value(e, h, this.$$p_d, "toProp"), (g = this.$$c) == null || g.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return object_keys(this.$$p_d).find((m) => this.$$p_d[m].attribute === e || !this.$$p_d[m].attribute && m.toLowerCase() === e) || e;
	}
});
function get_custom_element_value(e, m, h, g) {
	var _;
	let v = (_ = h[e]) == null ? void 0 : _.type;
	if (m = v === "Boolean" && typeof m != "boolean" ? m != null : m, !g || !h[e]) return m;
	if (g === "toAttribute") switch (v) {
		case "Object":
		case "Array": return m == null ? null : JSON.stringify(m);
		case "Boolean": return m ? "" : null;
		case "Number": return m == null ? null : m;
		default: return m;
	}
	else switch (v) {
		case "Object":
		case "Array": return m && JSON.parse(m);
		case "Boolean": return m;
		case "Number": return m == null ? m : +m;
		default: return m;
	}
}
function get_custom_elements_slots(e) {
	let m = {};
	return e.childNodes.forEach((e) => {
		m[e.slot || "default"] = !0;
	}), m;
}
function create_custom_element(e, m, h, g, _, v) {
	let y = class extends SvelteElement {
		constructor() {
			super(e, h, _), this.$$p_d = m;
		}
		static get observedAttributes() {
			return object_keys(m).map((e) => (m[e].attribute || e).toLowerCase());
		}
	};
	return object_keys(m).forEach((e) => {
		define_property(y.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(h) {
				h = get_custom_element_value(e, h, m), this.$$d[e] = h;
				var g = this.$$c;
				if (g) {
					var _;
					(_ = get_descriptor(g, e)) != null && _.get ? g[e] = h : g.$set({ [e]: h });
				}
			}
		});
	}), g.forEach((e) => {
		define_property(y.prototype, e, { get() {
			var m;
			return (m = this.$$c) == null ? void 0 : m[e];
		} });
	}), v && (y = v(y)), e.element = y, y;
}
var root_2 = /* @__PURE__ */ from_html("<div class=\"select-option svelte-161racf\"> </div>"), root_1 = /* @__PURE__ */ from_html("<div class=\"wrapper-option svelte-161racf\"><div class=\"select-content default-width svelte-161racf\"><div class=\"select-select svelte-161racf\"></div></div></div>"), root = /* @__PURE__ */ from_html("<div class=\"wrapper svelte-161racf\"><button aria-label=\"select value\" class=\"wrapper-value svelte-161racf\"><p class=\"svelte-161racf\"> </p></button></div> <!>", 1), $$css = {
	hash: "svelte-161racf",
	code: ".wrapper.svelte-161racf {width:100%;height:100%;display:flex;justify-content:left;align-items:center;color:var(--font, #ffffff);position:relative;}.wrapper.svelte-161racf .wrapper-value:where(.svelte-161racf) {width:100%;height:100%;box-sizing:border-box;padding:0 5px;padding-right:0;cursor:pointer;display:flex;align-items:center;justify-content:left;flex-direction:row;}.wrapper.svelte-161racf .wrapper-value:where(.svelte-161racf) p:where(.svelte-161racf) {text-align:left;width:100%;height:fit-content;flex:1;overflow:hidden;}.wrapper.svelte-161racf .wrapper-value:where(.svelte-161racf):hover {border-color:var(--border-hover, #1890ff);}.wrapper.svelte-161racf .wrapper-value:where(.svelte-161racf):focus {border-color:var(--border-hover, #1890ff);}.wrapper.svelte-161racf .wrapper-value:where(.svelte-161racf):disabled {border-color:var(--border-hover, #1890ff);}.wrapper.svelte-161racf .wrapper-value:where(.svelte-161racf):active {border-color:var(--border-hover, #1890ff);}.wrapper-option.svelte-161racf {display:flex;justify-content:left;flex-direction:column;width:fit-content;height:fit-content;position:absolute;box-sizing:border-box;padding:3px 3px;background-color:#423f3f;max-height:200px;z-index:99999;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}.wrapper-option.svelte-161racf .select-content:where(.svelte-161racf) {flex:1;box-sizing:border-box;overflow-y:auto;}.wrapper-option.svelte-161racf .select-content:where(.svelte-161racf)::-webkit-scrollbar {background-color:transparent;width:12px;}.wrapper-option.svelte-161racf .select-content:where(.svelte-161racf)::-webkit-scrollbar-thumb {background:#423f3f;border-radius:8px;border:2px solid transparent;background-clip:content-box;}.wrapper-option.svelte-161racf .select-content:where(.svelte-161racf) .select-select:where(.svelte-161racf) {display:flex;justify-content:left;flex-direction:column;}.wrapper-option.svelte-161racf .select-content:where(.svelte-161racf) .select-select:where(.svelte-161racf) .select-option:where(.svelte-161racf) {width:100%;height:100%;padding:0 5px;text-align:left;color:white;cursor:pointer;}.wrapper-option.svelte-161racf .select-content:where(.svelte-161racf) .select-select:where(.svelte-161racf) .select-option:where(.svelte-161racf):hover {background-color:#1677ff;}"
};
function Index(e, m) {
	push(m, !0), append_styles(e, $$css);
	let h = prop(m, "value", 15), g = prop(m, "options", 7), _ = prop(m, "haveSearch", 7), v = prop(m, "changeValue", 7), y = prop(m, "allowSelect", 7), b = /* @__PURE__ */ state(void 0), x = /* @__PURE__ */ state(null), S = /* @__PURE__ */ state(!1), C = /* @__PURE__ */ user_derived(() => g().find((e) => e.value === h())), w = (e) => {
		var m;
		(m = get(x)) != null && m.contains(e.target) ? e.stopPropagation() : set(S, !1);
	};
	onMount(() => {
		window.addEventListener("mousedown", w);
	});
	var T = {
		get value() {
			return h();
		},
		set value(e) {
			h(e), flushSync();
		},
		get options() {
			return g();
		},
		set options(e) {
			g(e), flushSync();
		},
		get haveSearch() {
			return _();
		},
		set haveSearch(e) {
			_(e), flushSync();
		},
		get changeValue() {
			return v();
		},
		set changeValue(e) {
			v(e), flushSync();
		},
		get allowSelect() {
			return y();
		},
		set allowSelect(e) {
			y(e), flushSync();
		}
	}, E = root(), D = first_child(E), O = child(D);
	O.__click = () => {
		set(S, !get(S));
	};
	var k = child(O), A = child(k, !0);
	reset(k), reset(O), reset(D), bind_this(D, (e) => set(b, e), () => get(b));
	var j = sibling(D, 2), M = (e) => {
		var m = root_1(), _ = child(m), v = child(_);
		each(v, 21, g, index, (e, m, g) => {
			var _ = root_2();
			set_attribute(_, "data-value", g), _.__click = () => {
				h(get(m).value);
			};
			var v = child(_, !0);
			reset(_), template_effect(() => set_text(v, get(m).label)), append(e, _);
		}), reset(v), reset(_), reset(m), bind_this(m, (e) => set(x, e), () => get(x)), append(e, m);
	};
	return if_block(j, (e) => {
		get(S) && e(M);
	}), template_effect(() => set_text(A, get(C) ? get(C).label : "未选择")), append(e, E), pop(T);
}
delegate(["click"]), create_custom_element(Index, {
	value: {},
	options: {},
	haveSearch: {},
	changeValue: {},
	allowSelect: {}
}, [], [], !0);
