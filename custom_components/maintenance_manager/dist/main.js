/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Us(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Z = {}, wt = [], He = () => {
}, Xn = () => !1, ds = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), zs = (e) => e.startsWith("onUpdate:"), ie = Object.assign, Gs = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, ni = Object.prototype.hasOwnProperty, V = (e, t) => ni.call(e, t), D = Array.isArray, yt = (e) => ps(e) === "[object Map]", Zn = (e) => ps(e) === "[object Set]", j = (e) => typeof e == "function", oe = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", Qn = (e) => (se(e) || j(e)) && j(e.then) && j(e.catch), eo = Object.prototype.toString, ps = (e) => eo.call(e), oi = (e) => ps(e).slice(8, -1), hs = (e) => ps(e) === "[object Object]", Js = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $t = /* @__PURE__ */ Us(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ms = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, ii = /-\w/g, we = ms(
  (e) => e.replace(ii, (t) => t.slice(1).toUpperCase())
), ri = /\B([A-Z])/g, Pe = ms(
  (e) => e.replace(ri, "-$1").toLowerCase()
), gs = ms((e) => e.charAt(0).toUpperCase() + e.slice(1)), Cs = ms(
  (e) => e ? `on${gs(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Ss = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, to = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, li = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, _n = (e) => {
  const t = oe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let bn;
const _s = () => bn || (bn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ys(e) {
  if (D(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = oe(n) ? fi(n) : Ys(n);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (oe(e) || se(e))
    return e;
}
const ai = /;(?![^(]*\))/g, ci = /:([^]+)/, ui = /\/\*[^]*?\*\//g;
function fi(e) {
  const t = {};
  return e.replace(ui, "").split(ai).forEach((s) => {
    if (s) {
      const n = s.split(ci);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Wt(e) {
  let t = "";
  if (oe(e))
    t = e;
  else if (D(e))
    for (let s = 0; s < e.length; s++) {
      const n = Wt(e[s]);
      n && (t += n + " ");
    }
  else if (se(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const di = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", pi = /* @__PURE__ */ Us(di);
function so(e) {
  return !!e || e === "";
}
const no = (e) => !!(e && e.__v_isRef === !0), G = (e) => oe(e) ? e : e == null ? "" : D(e) || se(e) && (e.toString === eo || !j(e.toString)) ? no(e) ? G(e.value) : JSON.stringify(e, oo, 2) : String(e), oo = (e, t) => no(t) ? oo(e, t.value) : yt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], i) => (s[ks(n, i) + " =>"] = o, s),
    {}
  )
} : Zn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => ks(s))
} : Qe(t) ? ks(t) : se(t) && !D(t) && !hs(t) ? String(t) : t, ks = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Qe(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ce;
class hi {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Ce, !t && Ce && (this.index = (Ce.scopes || (Ce.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = Ce;
      try {
        return Ce = this, t();
      } finally {
        Ce = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Ce, Ce = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Ce = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function mi() {
  return Ce;
}
let X;
const Es = /* @__PURE__ */ new WeakSet();
class io {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ce && Ce.active && Ce.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Es.has(this) && (Es.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || lo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, vn(this), ao(this);
    const t = X, s = $e;
    X = this, $e = !0;
    try {
      return this.fn();
    } finally {
      co(this), X = t, $e = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qs(t);
      this.deps = this.depsTail = void 0, vn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Es.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Rs(this) && this.run();
  }
  get dirty() {
    return Rs(this);
  }
}
let ro = 0, It, Rt;
function lo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Rt, Rt = e;
    return;
  }
  e.next = It, It = e;
}
function Xs() {
  ro++;
}
function Zs() {
  if (--ro > 0)
    return;
  if (Rt) {
    let t = Rt;
    for (Rt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; It; ) {
    let t = It;
    for (It = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function ao(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function co(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), Qs(n), gi(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function Rs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (uo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function uo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Lt) || (e.globalVersion = Lt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Rs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = X, n = $e;
  X = e, $e = !0;
  try {
    ao(e);
    const o = e.fn(e._value);
    (t.version === 0 || lt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    X = s, $e = n, co(e), e.flags &= -3;
  }
}
function Qs(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      Qs(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function gi(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let $e = !0;
const fo = [];
function Ye() {
  fo.push($e), $e = !1;
}
function Xe() {
  const e = fo.pop();
  $e = e === void 0 ? !0 : e;
}
function vn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = X;
    X = void 0;
    try {
      t();
    } finally {
      X = s;
    }
  }
}
let Lt = 0;
class _i {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class en {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!X || !$e || X === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== X)
      s = this.activeLink = new _i(X, this), X.deps ? (s.prevDep = X.depsTail, X.depsTail.nextDep = s, X.depsTail = s) : X.deps = X.depsTail = s, po(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = X.depsTail, s.nextDep = void 0, X.depsTail.nextDep = s, X.depsTail = s, X.deps === s && (X.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Lt++, this.notify(t);
  }
  notify(t) {
    Xs();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Zs();
    }
  }
}
function po(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        po(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Ds = /* @__PURE__ */ new WeakMap(), gt = Symbol(
  ""
), Fs = Symbol(
  ""
), qt = Symbol(
  ""
);
function pe(e, t, s) {
  if ($e && X) {
    let n = Ds.get(e);
    n || Ds.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new en()), o.map = n, o.key = s), o.track();
  }
}
function Ge(e, t, s, n, o, i) {
  const r = Ds.get(e);
  if (!r) {
    Lt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Xs(), t === "clear")
    r.forEach(l);
  else {
    const c = D(e), p = c && Js(s);
    if (c && s === "length") {
      const d = Number(n);
      r.forEach((h, x) => {
        (x === "length" || x === qt || !Qe(x) && x >= d) && l(h);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), p && l(r.get(qt)), t) {
        case "add":
          c ? p && l(r.get("length")) : (l(r.get(gt)), yt(e) && l(r.get(Fs)));
          break;
        case "delete":
          c || (l(r.get(gt)), yt(e) && l(r.get(Fs)));
          break;
        case "set":
          yt(e) && l(r.get(gt));
          break;
      }
  }
  Zs();
}
function vt(e) {
  const t = W(e);
  return t === e ? t : (pe(t, "iterate", qt), Ne(e) ? t : t.map(fe));
}
function bs(e) {
  return pe(e = W(e), "iterate", qt), e;
}
const bi = {
  __proto__: null,
  [Symbol.iterator]() {
    return As(this, Symbol.iterator, fe);
  },
  concat(...e) {
    return vt(this).concat(
      ...e.map((t) => D(t) ? vt(t) : t)
    );
  },
  entries() {
    return As(this, "entries", (e) => (e[1] = fe(e[1]), e));
  },
  every(e, t) {
    return Ue(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ue(this, "filter", e, t, (s) => s.map(fe), arguments);
  },
  find(e, t) {
    return Ue(this, "find", e, t, fe, arguments);
  },
  findIndex(e, t) {
    return Ue(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ue(this, "findLast", e, t, fe, arguments);
  },
  findLastIndex(e, t) {
    return Ue(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ue(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Os(this, "includes", e);
  },
  indexOf(...e) {
    return Os(this, "indexOf", e);
  },
  join(e) {
    return vt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Os(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ue(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ot(this, "pop");
  },
  push(...e) {
    return Ot(this, "push", e);
  },
  reduce(e, ...t) {
    return xn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return xn(this, "reduceRight", e, t);
  },
  shift() {
    return Ot(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ue(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ot(this, "splice", e);
  },
  toReversed() {
    return vt(this).toReversed();
  },
  toSorted(e) {
    return vt(this).toSorted(e);
  },
  toSpliced(...e) {
    return vt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ot(this, "unshift", e);
  },
  values() {
    return As(this, "values", fe);
  }
};
function As(e, t, s) {
  const n = bs(e), o = n[t]();
  return n !== e && !Ne(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = s(i.value)), i;
  }), o;
}
const vi = Array.prototype;
function Ue(e, t, s, n, o, i) {
  const r = bs(e), l = r !== e && !Ne(e), c = r[t];
  if (c !== vi[t]) {
    const h = c.apply(e, i);
    return l ? fe(h) : h;
  }
  let p = s;
  r !== e && (l ? p = function(h, x) {
    return s.call(this, fe(h), x, e);
  } : s.length > 2 && (p = function(h, x) {
    return s.call(this, h, x, e);
  }));
  const d = c.call(r, p, n);
  return l && o ? o(d) : d;
}
function xn(e, t, s, n) {
  const o = bs(e);
  let i = s;
  return o !== e && (Ne(e) ? s.length > 3 && (i = function(r, l, c) {
    return s.call(this, r, l, c, e);
  }) : i = function(r, l, c) {
    return s.call(this, r, fe(l), c, e);
  }), o[t](i, ...n);
}
function Os(e, t, s) {
  const n = W(e);
  pe(n, "iterate", qt);
  const o = n[t](...s);
  return (o === -1 || o === !1) && on(s[0]) ? (s[0] = W(s[0]), n[t](...s)) : o;
}
function Ot(e, t, s = []) {
  Ye(), Xs();
  const n = W(e)[t].apply(e, s);
  return Zs(), Xe(), n;
}
const xi = /* @__PURE__ */ Us("__proto__,__v_isRef,__isVue"), ho = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function wi(e) {
  Qe(e) || (e = String(e));
  const t = W(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
class mo {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (o ? i ? Pi : vo : i ? bo : _o).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = D(t);
    if (!o) {
      let c;
      if (r && (c = bi[s]))
        return c;
      if (s === "hasOwnProperty")
        return wi;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      me(t) ? t : n
    );
    if ((Qe(s) ? ho.has(s) : xi(s)) || (o || pe(t, "get", s), i))
      return l;
    if (me(l)) {
      const c = r && Js(s) ? l : l.value;
      return o && se(c) ? Ls(c) : c;
    }
    return se(l) ? o ? Ls(l) : sn(l) : l;
  }
}
class go extends mo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let i = t[s];
    if (!this._isShallow) {
      const c = at(i);
      if (!Ne(n) && !at(n) && (i = W(i), n = W(n)), !D(t) && me(i) && !me(n))
        return c || (i.value = n), !0;
    }
    const r = D(t) && Js(s) ? Number(s) < t.length : V(t, s), l = Reflect.set(
      t,
      s,
      n,
      me(t) ? t : o
    );
    return t === W(o) && (r ? lt(n, i) && Ge(t, "set", s, n) : Ge(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = V(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && Ge(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Qe(s) || !ho.has(s)) && pe(t, "has", s), n;
  }
  ownKeys(t) {
    return pe(
      t,
      "iterate",
      D(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class yi extends mo {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const Ti = /* @__PURE__ */ new go(), Ci = /* @__PURE__ */ new yi(), Si = /* @__PURE__ */ new go(!0);
const js = (e) => e, Jt = (e) => Reflect.getPrototypeOf(e);
function ki(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, i = W(o), r = yt(i), l = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, p = o[e](...n), d = s ? js : t ? os : fe;
    return !t && pe(
      i,
      "iterate",
      c ? Fs : gt
    ), {
      // iterator protocol
      next() {
        const { value: h, done: x } = p.next();
        return x ? { value: h, done: x } : {
          value: l ? [d(h[0]), d(h[1])] : d(h),
          done: x
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Yt(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Ei(e, t) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = W(i), l = W(o);
      e || (lt(o, l) && pe(r, "get", o), pe(r, "get", l));
      const { has: c } = Jt(r), p = t ? js : e ? os : fe;
      if (c.call(r, o))
        return p(i.get(o));
      if (c.call(r, l))
        return p(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && pe(W(o), "iterate", gt), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = W(i), l = W(o);
      return e || (lt(o, l) && pe(r, "has", o), pe(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = W(l), p = t ? js : e ? os : fe;
      return !e && pe(c, "iterate", gt), l.forEach((d, h) => o.call(i, p(d), p(h), r));
    }
  };
  return ie(
    s,
    e ? {
      add: Yt("add"),
      set: Yt("set"),
      delete: Yt("delete"),
      clear: Yt("clear")
    } : {
      add(o) {
        !t && !Ne(o) && !at(o) && (o = W(o));
        const i = W(this);
        return Jt(i).has.call(i, o) || (i.add(o), Ge(i, "add", o, o)), this;
      },
      set(o, i) {
        !t && !Ne(i) && !at(i) && (i = W(i));
        const r = W(this), { has: l, get: c } = Jt(r);
        let p = l.call(r, o);
        p || (o = W(o), p = l.call(r, o));
        const d = c.call(r, o);
        return r.set(o, i), p ? lt(i, d) && Ge(r, "set", o, i) : Ge(r, "add", o, i), this;
      },
      delete(o) {
        const i = W(this), { has: r, get: l } = Jt(i);
        let c = r.call(i, o);
        c || (o = W(o), c = r.call(i, o)), l && l.call(i, o);
        const p = i.delete(o);
        return c && Ge(i, "delete", o, void 0), p;
      },
      clear() {
        const o = W(this), i = o.size !== 0, r = o.clear();
        return i && Ge(
          o,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = ki(o, e, t);
  }), s;
}
function tn(e, t) {
  const s = Ei(e, t);
  return (n, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    V(s, o) && o in n ? s : n,
    o,
    i
  );
}
const Ai = {
  get: /* @__PURE__ */ tn(!1, !1)
}, Oi = {
  get: /* @__PURE__ */ tn(!1, !0)
}, Mi = {
  get: /* @__PURE__ */ tn(!0, !1)
};
const _o = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap(), vo = /* @__PURE__ */ new WeakMap(), Pi = /* @__PURE__ */ new WeakMap();
function Ni(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function $i(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ni(oi(e));
}
function sn(e) {
  return at(e) ? e : nn(
    e,
    !1,
    Ti,
    Ai,
    _o
  );
}
function Ii(e) {
  return nn(
    e,
    !1,
    Si,
    Oi,
    bo
  );
}
function Ls(e) {
  return nn(
    e,
    !0,
    Ci,
    Mi,
    vo
  );
}
function nn(e, t, s, n, o) {
  if (!se(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = $i(e);
  if (i === 0)
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const l = new Proxy(
    e,
    i === 2 ? n : s
  );
  return o.set(e, l), l;
}
function Tt(e) {
  return at(e) ? Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function Ne(e) {
  return !!(e && e.__v_isShallow);
}
function on(e) {
  return e ? !!e.__v_raw : !1;
}
function W(e) {
  const t = e && e.__v_raw;
  return t ? W(t) : e;
}
function Ri(e) {
  return !V(e, "__v_skip") && Object.isExtensible(e) && to(e, "__v_skip", !0), e;
}
const fe = (e) => se(e) ? sn(e) : e, os = (e) => se(e) ? Ls(e) : e;
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function te(e) {
  return Di(e, !1);
}
function Di(e, t) {
  return me(e) ? e : new Fi(e, t);
}
class Fi {
  constructor(t, s) {
    this.dep = new en(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : W(t), this._value = s ? t : fe(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Ne(t) || at(t);
    t = n ? t : W(t), lt(t, s) && (this._rawValue = t, this._value = n ? t : fe(t), this.dep.trigger());
  }
}
function nt(e) {
  return me(e) ? e.value : e;
}
const ji = {
  get: (e, t, s) => t === "__v_raw" ? e : nt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return me(o) && !me(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function xo(e) {
  return Tt(e) ? e : new Proxy(e, ji);
}
class Li {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new en(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Lt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    X !== this)
      return lo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return uo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function qi(e, t, s = !1) {
  let n, o;
  return j(e) ? n = e : (n = e.get, o = e.set), new Li(n, o, s);
}
const Xt = {}, is = /* @__PURE__ */ new WeakMap();
let mt;
function Hi(e, t = !1, s = mt) {
  if (s) {
    let n = is.get(s);
    n || is.set(s, n = []), n.push(e);
  }
}
function Vi(e, t, s = Z) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, p = (N) => o ? N : Ne(N) || o === !1 || o === 0 ? rt(N, 1) : rt(N);
  let d, h, x, k, $ = !1, F = !1;
  if (me(e) ? (h = () => e.value, $ = Ne(e)) : Tt(e) ? (h = () => p(e), $ = !0) : D(e) ? (F = !0, $ = e.some((N) => Tt(N) || Ne(N)), h = () => e.map((N) => {
    if (me(N))
      return N.value;
    if (Tt(N))
      return p(N);
    if (j(N))
      return c ? c(N, 2) : N();
  })) : j(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (x) {
      Ye();
      try {
        x();
      } finally {
        Xe();
      }
    }
    const N = mt;
    mt = d;
    try {
      return c ? c(e, 3, [k]) : e(k);
    } finally {
      mt = N;
    }
  } : h = He, t && o) {
    const N = h, K = o === !0 ? 1 / 0 : o;
    h = () => rt(N(), K);
  }
  const Q = mi(), A = () => {
    d.stop(), Q && Q.active && Gs(Q.effects, d);
  };
  if (i && t) {
    const N = t;
    t = (...K) => {
      N(...K), A();
    };
  }
  let B = F ? new Array(e.length).fill(Xt) : Xt;
  const ee = (N) => {
    if (!(!(d.flags & 1) || !d.dirty && !N))
      if (t) {
        const K = d.run();
        if (o || $ || (F ? K.some((ge, ce) => lt(ge, B[ce])) : lt(K, B))) {
          x && x();
          const ge = mt;
          mt = d;
          try {
            const ce = [
              K,
              // pass undefined as the old value when it's changed for the first time
              B === Xt ? void 0 : F && B[0] === Xt ? [] : B,
              k
            ];
            B = K, c ? c(t, 3, ce) : (
              // @ts-expect-error
              t(...ce)
            );
          } finally {
            mt = ge;
          }
        }
      } else
        d.run();
  };
  return l && l(ee), d = new io(h), d.scheduler = r ? () => r(ee, !1) : ee, k = (N) => Hi(N, !1, d), x = d.onStop = () => {
    const N = is.get(d);
    if (N) {
      if (c)
        c(N, 4);
      else
        for (const K of N) K();
      is.delete(d);
    }
  }, t ? n ? ee(!0) : B = d.run() : r ? r(ee.bind(null, !0), !0) : d.run(), A.pause = d.pause.bind(d), A.resume = d.resume.bind(d), A.stop = A, A;
}
function rt(e, t = 1 / 0, s) {
  if (t <= 0 || !se(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, me(e))
    rt(e.value, t, s);
  else if (D(e))
    for (let n = 0; n < e.length; n++)
      rt(e[n], t, s);
  else if (Zn(e) || yt(e))
    e.forEach((n) => {
      rt(n, t, s);
    });
  else if (hs(e)) {
    for (const n in e)
      rt(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && rt(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Kt(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    vs(o, t, s);
  }
}
function Ve(e, t, s, n) {
  if (j(e)) {
    const o = Kt(e, t, s, n);
    return o && Qn(o) && o.catch((i) => {
      vs(i, t, s);
    }), o;
  }
  if (D(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(Ve(e[i], t, s, n));
    return o;
  }
}
function vs(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || Z;
  if (t) {
    let l = t.parent;
    const c = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let h = 0; h < d.length; h++)
          if (d[h](e, c, p) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Ye(), Kt(i, null, 10, [
        e,
        c,
        p
      ]), Xe();
      return;
    }
  }
  Bi(e, s, o, n, r);
}
function Bi(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const ve = [];
let je = -1;
const Ct = [];
let ot = null, xt = 0;
const wo = /* @__PURE__ */ Promise.resolve();
let rs = null;
function yo(e) {
  const t = rs || wo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Wi(e) {
  let t = je + 1, s = ve.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = ve[n], i = Ht(o);
    i < e || i === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function rn(e) {
  if (!(e.flags & 1)) {
    const t = Ht(e), s = ve[ve.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Ht(s) ? ve.push(e) : ve.splice(Wi(t), 0, e), e.flags |= 1, To();
  }
}
function To() {
  rs || (rs = wo.then(So));
}
function Ki(e) {
  D(e) ? Ct.push(...e) : ot && e.id === -1 ? ot.splice(xt + 1, 0, e) : e.flags & 1 || (Ct.push(e), e.flags |= 1), To();
}
function wn(e, t, s = je + 1) {
  for (; s < ve.length; s++) {
    const n = ve[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      ve.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Co(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)].sort(
      (s, n) => Ht(s) - Ht(n)
    );
    if (Ct.length = 0, ot) {
      ot.push(...t);
      return;
    }
    for (ot = t, xt = 0; xt < ot.length; xt++) {
      const s = ot[xt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    ot = null, xt = 0;
  }
}
const Ht = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function So(e) {
  try {
    for (je = 0; je < ve.length; je++) {
      const t = ve[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < ve.length; je++) {
      const t = ve[je];
      t && (t.flags &= -2);
    }
    je = -1, ve.length = 0, Co(), rs = null, (ve.length || Ct.length) && So();
  }
}
let xe = null, ko = null;
function ls(e) {
  const t = xe;
  return xe = e, ko = e && e.type.__scopeId || null, t;
}
function I(e, t = xe, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && Nn(-1);
    const i = ls(t);
    let r;
    try {
      r = e(...o);
    } finally {
      ls(i), n._d && Nn(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function pt(e, t, s, n) {
  const o = e.dirs, i = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const l = o[r];
    i && (l.oldValue = i[r].value);
    let c = l.dir[n];
    c && (Ye(), Ve(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), Xe());
  }
}
const Ui = Symbol("_vte"), zi = (e) => e.__isTeleport, Gi = Symbol("_leaveCb");
function ln(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ln(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Eo(e, t) {
  return j(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ie({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ao(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const as = /* @__PURE__ */ new WeakMap();
function Dt(e, t, s, n, o = !1) {
  if (D(e)) {
    e.forEach(
      ($, F) => Dt(
        $,
        t && (D(t) ? t[F] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (St(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Dt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? dn(n.component) : n.el, r = o ? null : i, { i: l, r: c } = e, p = t && t.r, d = l.refs === Z ? l.refs = {} : l.refs, h = l.setupState, x = W(h), k = h === Z ? Xn : ($) => V(x, $);
  if (p != null && p !== c) {
    if (yn(t), oe(p))
      d[p] = null, k(p) && (h[p] = null);
    else if (me(p)) {
      p.value = null;
      const $ = t;
      $.k && (d[$.k] = null);
    }
  }
  if (j(c))
    Kt(c, l, 12, [r, d]);
  else {
    const $ = oe(c), F = me(c);
    if ($ || F) {
      const Q = () => {
        if (e.f) {
          const A = $ ? k(c) ? h[c] : d[c] : c.value;
          if (o)
            D(A) && Gs(A, i);
          else if (D(A))
            A.includes(i) || A.push(i);
          else if ($)
            d[c] = [i], k(c) && (h[c] = d[c]);
          else {
            const B = [i];
            c.value = B, e.k && (d[e.k] = B);
          }
        } else $ ? (d[c] = r, k(c) && (h[c] = r)) : F && (c.value = r, e.k && (d[e.k] = r));
      };
      if (r) {
        const A = () => {
          Q(), as.delete(e);
        };
        A.id = -1, as.set(e, A), Ee(A, s);
      } else
        yn(e), Q();
    }
  }
}
function yn(e) {
  const t = as.get(e);
  t && (t.flags |= 8, as.delete(e));
}
_s().requestIdleCallback;
_s().cancelIdleCallback;
const St = (e) => !!e.type.__asyncLoader, Oo = (e) => e.type.__isKeepAlive;
function Ji(e, t) {
  Mo(e, "a", t);
}
function Yi(e, t) {
  Mo(e, "da", t);
}
function Mo(e, t, s = he) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (xs(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      Oo(o.parent.vnode) && Xi(n, t, s, o), o = o.parent;
  }
}
function Xi(e, t, s, n) {
  const o = xs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Po(() => {
    Gs(n[t], o);
  }, s);
}
function xs(e, t, s = he, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...r) => {
      Ye();
      const l = Ut(s), c = Ve(t, s, e, r);
      return l(), Xe(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const et = (e) => (t, s = he) => {
  (!Bt || e === "sp") && xs(e, (...n) => t(...n), s);
}, Zi = et("bm"), Qi = et("m"), er = et(
  "bu"
), tr = et("u"), sr = et(
  "bum"
), Po = et("um"), nr = et(
  "sp"
), or = et("rtg"), ir = et("rtc");
function rr(e, t = he) {
  xs("ec", e, t);
}
const lr = "components";
function ae(e, t) {
  return cr(lr, e, !0, t) || e;
}
const ar = Symbol.for("v-ndc");
function cr(e, t, s = !0, n = !1) {
  const o = xe || he;
  if (o) {
    const i = o.type;
    {
      const l = Qr(
        i,
        !1
      );
      if (l && (l === t || l === we(t) || l === gs(we(t))))
        return i;
    }
    const r = (
      // local registration
      // check instance[type] first which is resolved for options API
      Tn(o[e] || i[e], t) || // global registration
      Tn(o.appContext[e], t)
    );
    return !r && n ? i : r;
  }
}
function Tn(e, t) {
  return e && (e[t] || e[we(t)] || e[gs(we(t))]);
}
function Zt(e, t, s, n) {
  let o;
  const i = s, r = D(e);
  if (r || oe(e)) {
    const l = r && Tt(e);
    let c = !1, p = !1;
    l && (c = !Ne(e), p = at(e), e = bs(e)), o = new Array(e.length);
    for (let d = 0, h = e.length; d < h; d++)
      o[d] = t(
        c ? p ? os(fe(e[d])) : fe(e[d]) : e[d],
        d,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, i);
  } else if (se(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, p = l.length; c < p; c++) {
        const d = l[c];
        o[c] = t(e[d], d, c, i);
      }
    }
  else
    o = [];
  return o;
}
function ur(e, t, s = {}, n, o) {
  if (xe.ce || xe.parent && St(xe.parent) && xe.parent.ce) {
    const p = Object.keys(s).length > 0;
    return z(), Ae(
      de,
      null,
      [T("slot", s, n)],
      p ? -2 : 64
    );
  }
  let i = e[t];
  i && i._c && (i._d = !1), z();
  const r = i && No(i(s)), l = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  r && r.key, c = Ae(
    de,
    {
      key: (l && !Qe(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!r && n ? "_fb" : "")
    },
    r || [],
    r && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), i && i._c && (i._d = !0), c;
}
function No(e) {
  return e.some((t) => un(t) ? !(t.type === Ze || t.type === de && !No(t.children)) : !0) ? e : null;
}
const qs = (e) => e ? Zo(e) ? dn(e) : qs(e.parent) : null, Ft = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ie(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => qs(e.parent),
    $root: (e) => qs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Io(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      rn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = yo.bind(e.proxy)),
    $watch: (e) => Nr.bind(e)
  })
), Ms = (e, t) => e !== Z && !e.__isScriptSetup && V(e, t), fr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: l, appContext: c } = e;
    let p;
    if (t[0] !== "$") {
      const k = r[t];
      if (k !== void 0)
        switch (k) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (Ms(n, t))
          return r[t] = 1, n[t];
        if (o !== Z && V(o, t))
          return r[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && V(p, t)
        )
          return r[t] = 3, i[t];
        if (s !== Z && V(s, t))
          return r[t] = 4, s[t];
        Hs && (r[t] = 0);
      }
    }
    const d = Ft[t];
    let h, x;
    if (d)
      return t === "$attrs" && pe(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (h = l.__cssModules) && (h = h[t])
    )
      return h;
    if (s !== Z && V(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      x = c.config.globalProperties, V(x, t)
    )
      return x[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: i } = e;
    return Ms(o, t) ? (o[t] = s, !0) : n !== Z && V(n, t) ? (n[t] = s, !0) : V(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: i, type: r }
  }, l) {
    let c, p;
    return !!(s[l] || e !== Z && l[0] !== "$" && V(e, l) || Ms(t, l) || (c = i[0]) && V(c, l) || V(n, l) || V(Ft, l) || V(o.config.globalProperties, l) || (p = r.__cssModules) && p[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : V(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Cn(e) {
  return D(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Hs = !0;
function dr(e) {
  const t = Io(e), s = e.proxy, n = e.ctx;
  Hs = !1, t.beforeCreate && Sn(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: c,
    inject: p,
    // lifecycle
    created: d,
    beforeMount: h,
    mounted: x,
    beforeUpdate: k,
    updated: $,
    activated: F,
    deactivated: Q,
    beforeDestroy: A,
    beforeUnmount: B,
    destroyed: ee,
    unmounted: N,
    render: K,
    renderTracked: ge,
    renderTriggered: ce,
    errorCaptured: re,
    serverPrefetch: Se,
    // public API
    expose: Be,
    inheritAttrs: tt,
    // assets
    components: ct,
    directives: _t,
    filters: st
  } = t;
  if (p && pr(p, n, null), r)
    for (const J in r) {
      const q = r[J];
      j(q) && (n[J] = q.bind(s));
    }
  if (o) {
    const J = o.call(s, s);
    se(J) && (e.data = sn(J));
  }
  if (Hs = !0, i)
    for (const J in i) {
      const q = i[J], We = j(q) ? q.bind(s, s) : j(q.get) ? q.get.bind(s, s) : He, bt = !j(q) && j(q.set) ? q.set.bind(s) : He, Ke = Je({
        get: We,
        set: bt
      });
      Object.defineProperty(n, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (Me) => Ke.value = Me
      });
    }
  if (l)
    for (const J in l)
      $o(l[J], n, s, J);
  if (c) {
    const J = j(c) ? c.call(s) : c;
    Reflect.ownKeys(J).forEach((q) => {
      vr(q, J[q]);
    });
  }
  d && Sn(d, e, "c");
  function ne(J, q) {
    D(q) ? q.forEach((We) => J(We.bind(s))) : q && J(q.bind(s));
  }
  if (ne(Zi, h), ne(Qi, x), ne(er, k), ne(tr, $), ne(Ji, F), ne(Yi, Q), ne(rr, re), ne(ir, ge), ne(or, ce), ne(sr, B), ne(Po, N), ne(nr, Se), D(Be))
    if (Be.length) {
      const J = e.exposed || (e.exposed = {});
      Be.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => s[q],
          set: (We) => s[q] = We,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  K && e.render === He && (e.render = K), tt != null && (e.inheritAttrs = tt), ct && (e.components = ct), _t && (e.directives = _t), Se && Ao(e);
}
function pr(e, t, s = He) {
  D(e) && (e = Vs(e));
  for (const n in e) {
    const o = e[n];
    let i;
    se(o) ? "default" in o ? i = es(
      o.from || n,
      o.default,
      !0
    ) : i = es(o.from || n) : i = es(o), me(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[n] = i;
  }
}
function Sn(e, t, s) {
  Ve(
    D(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function $o(e, t, s, n) {
  let o = n.includes(".") ? zo(s, n) : () => s[n];
  if (oe(e)) {
    const i = t[e];
    j(i) && ts(o, i);
  } else if (j(e))
    ts(o, e.bind(s));
  else if (se(e))
    if (D(e))
      e.forEach((i) => $o(i, t, s, n));
    else {
      const i = j(e.handler) ? e.handler.bind(s) : t[e.handler];
      j(i) && ts(o, i, e);
    }
}
function Io(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !o.length && !s && !n ? c = t : (c = {}, o.length && o.forEach(
    (p) => cs(c, p, r, !0)
  ), cs(c, t, r)), se(t) && i.set(t, c), c;
}
function cs(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && cs(e, i, s, !0), o && o.forEach(
    (r) => cs(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const l = hr[r] || s && s[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const hr = {
  data: kn,
  props: En,
  emits: En,
  // objects
  methods: Nt,
  computed: Nt,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: Nt,
  directives: Nt,
  // watch
  watch: gr,
  // provide / inject
  provide: kn,
  inject: mr
};
function kn(e, t) {
  return t ? e ? function() {
    return ie(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function mr(e, t) {
  return Nt(Vs(e), Vs(t));
}
function Vs(e) {
  if (D(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Nt(e, t) {
  return e ? ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function En(e, t) {
  return e ? D(e) && D(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ie(
    /* @__PURE__ */ Object.create(null),
    Cn(e),
    Cn(t ?? {})
  ) : t;
}
function gr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ie(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function Ro() {
  return {
    app: null,
    config: {
      isNativeTag: Xn,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let _r = 0;
function br(e, t) {
  return function(n, o = null) {
    j(n) || (n = ie({}, n)), o != null && !se(o) && (o = null);
    const i = Ro(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const p = i.app = {
      _uid: _r++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: tl,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...h) {
        return r.has(d) || (d && j(d.install) ? (r.add(d), d.install(p, ...h)) : j(d) && (r.add(d), d(p, ...h))), p;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), p;
      },
      component(d, h) {
        return h ? (i.components[d] = h, p) : i.components[d];
      },
      directive(d, h) {
        return h ? (i.directives[d] = h, p) : i.directives[d];
      },
      mount(d, h, x) {
        if (!c) {
          const k = p._ceVNode || T(n, o);
          return k.appContext = i, x === !0 ? x = "svg" : x === !1 && (x = void 0), e(k, d, x), c = !0, p._container = d, d.__vue_app__ = p, dn(k.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        c && (Ve(
          l,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(d, h) {
        return i.provides[d] = h, p;
      },
      runWithContext(d) {
        const h = kt;
        kt = p;
        try {
          return d();
        } finally {
          kt = h;
        }
      }
    };
    return p;
  };
}
let kt = null;
function vr(e, t) {
  if (he) {
    let s = he.provides;
    const n = he.parent && he.parent.provides;
    n === s && (s = he.provides = Object.create(n)), s[e] = t;
  }
}
function es(e, t, s = !1) {
  const n = Gr();
  if (n || kt) {
    let o = kt ? kt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && j(t) ? t.call(n && n.proxy) : t;
  }
}
const Do = {}, Fo = () => Object.create(Do), jo = (e) => Object.getPrototypeOf(e) === Do;
function xr(e, t, s, n = !1) {
  const o = {}, i = Fo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Lo(e, t, o, i);
  for (const r in e.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? e.props = n ? o : Ii(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function wr(e, t, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: r }
  } = e, l = W(o), [c] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        let x = d[h];
        if (ws(e.emitsOptions, x))
          continue;
        const k = t[x];
        if (c)
          if (V(i, x))
            k !== i[x] && (i[x] = k, p = !0);
          else {
            const $ = we(x);
            o[$] = Bs(
              c,
              l,
              $,
              k,
              e,
              !1
            );
          }
        else
          k !== i[x] && (i[x] = k, p = !0);
      }
    }
  } else {
    Lo(e, t, o, i) && (p = !0);
    let d;
    for (const h in l)
      (!t || // for camelCase
      !V(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Pe(h)) === h || !V(t, d))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[d] !== void 0) && (o[h] = Bs(
        c,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete o[h]);
    if (i !== l)
      for (const h in i)
        (!t || !V(t, h)) && (delete i[h], p = !0);
  }
  p && Ge(e.attrs, "set", "");
}
function Lo(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let c in t) {
      if ($t(c))
        continue;
      const p = t[c];
      let d;
      o && V(o, d = we(c)) ? !i || !i.includes(d) ? s[d] = p : (l || (l = {}))[d] = p : ws(e.emitsOptions, c) || (!(c in n) || p !== n[c]) && (n[c] = p, r = !0);
    }
  if (i) {
    const c = W(s), p = l || Z;
    for (let d = 0; d < i.length; d++) {
      const h = i[d];
      s[h] = Bs(
        o,
        c,
        h,
        p[h],
        e,
        !V(p, h)
      );
    }
  }
  return r;
}
function Bs(e, t, s, n, o, i) {
  const r = e[s];
  if (r != null) {
    const l = V(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && j(c)) {
        const { propsDefaults: p } = o;
        if (s in p)
          n = p[s];
        else {
          const d = Ut(o);
          n = p[s] = c.call(
            null,
            t
          ), d();
        }
      } else
        n = c;
      o.ce && o.ce._setProp(s, n);
    }
    r[
      0
      /* shouldCast */
    ] && (i && !l ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Pe(s)) && (n = !0));
  }
  return n;
}
const yr = /* @__PURE__ */ new WeakMap();
function qo(e, t, s = !1) {
  const n = s ? yr : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const i = e.props, r = {}, l = [];
  let c = !1;
  if (!j(e)) {
    const d = (h) => {
      c = !0;
      const [x, k] = qo(h, t, !0);
      ie(r, x), k && l.push(...k);
    };
    !s && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !c)
    return se(e) && n.set(e, wt), wt;
  if (D(i))
    for (let d = 0; d < i.length; d++) {
      const h = we(i[d]);
      An(h) && (r[h] = Z);
    }
  else if (i)
    for (const d in i) {
      const h = we(d);
      if (An(h)) {
        const x = i[d], k = r[h] = D(x) || j(x) ? { type: x } : ie({}, x), $ = k.type;
        let F = !1, Q = !0;
        if (D($))
          for (let A = 0; A < $.length; ++A) {
            const B = $[A], ee = j(B) && B.name;
            if (ee === "Boolean") {
              F = !0;
              break;
            } else ee === "String" && (Q = !1);
          }
        else
          F = j($) && $.name === "Boolean";
        k[
          0
          /* shouldCast */
        ] = F, k[
          1
          /* shouldCastTrue */
        ] = Q, (F || V(k, "default")) && l.push(h);
      }
    }
  const p = [r, l];
  return se(e) && n.set(e, p), p;
}
function An(e) {
  return e[0] !== "$" && !$t(e);
}
const an = (e) => e === "_" || e === "_ctx" || e === "$stable", cn = (e) => D(e) ? e.map(Le) : [Le(e)], Tr = (e, t, s) => {
  if (t._n)
    return t;
  const n = I((...o) => cn(t(...o)), s);
  return n._c = !1, n;
}, Ho = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (an(o)) continue;
    const i = e[o];
    if (j(i))
      t[o] = Tr(o, i, n);
    else if (i != null) {
      const r = cn(i);
      t[o] = () => r;
    }
  }
}, Vo = (e, t) => {
  const s = cn(t);
  e.slots.default = () => s;
}, Bo = (e, t, s) => {
  for (const n in t)
    (s || !an(n)) && (e[n] = t[n]);
}, Cr = (e, t, s) => {
  const n = e.slots = Fo();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Bo(n, t, s), s && to(n, "_", o, !0)) : Ho(t, n);
  } else t && Vo(e, t);
}, Sr = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let i = !0, r = Z;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : Bo(o, t, s) : (i = !t.$stable, Ho(t, o)), r = t;
  } else t && (Vo(e, t), r = { default: 1 });
  if (i)
    for (const l in o)
      !an(l) && r[l] == null && delete o[l];
}, Ee = qr;
function kr(e) {
  return Er(e);
}
function Er(e, t) {
  const s = _s();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: c,
    setText: p,
    setElementText: d,
    parentNode: h,
    nextSibling: x,
    setScopeId: k = He,
    insertStaticContent: $
  } = e, F = (a, u, f, _ = null, b = null, v = null, S = void 0, C = null, y = !!u.dynamicChildren) => {
    if (a === u)
      return;
    a && !Mt(a, u) && (_ = dt(a), Me(a, b, v, !0), a = null), u.patchFlag === -2 && (y = !1, u.dynamicChildren = null);
    const { type: w, ref: M, shapeFlag: E } = u;
    switch (w) {
      case ys:
        Q(a, u, f, _);
        break;
      case Ze:
        A(a, u, f, _);
        break;
      case Ns:
        a == null && B(u, f, _, S);
        break;
      case de:
        ct(
          a,
          u,
          f,
          _,
          b,
          v,
          S,
          C,
          y
        );
        break;
      default:
        E & 1 ? K(
          a,
          u,
          f,
          _,
          b,
          v,
          S,
          C,
          y
        ) : E & 6 ? _t(
          a,
          u,
          f,
          _,
          b,
          v,
          S,
          C,
          y
        ) : (E & 64 || E & 128) && w.process(
          a,
          u,
          f,
          _,
          b,
          v,
          S,
          C,
          y,
          H
        );
    }
    M != null && b ? Dt(M, a && a.ref, v, u || a, !u) : M == null && a && a.ref != null && Dt(a.ref, null, v, a, !0);
  }, Q = (a, u, f, _) => {
    if (a == null)
      n(
        u.el = l(u.children),
        f,
        _
      );
    else {
      const b = u.el = a.el;
      u.children !== a.children && p(b, u.children);
    }
  }, A = (a, u, f, _) => {
    a == null ? n(
      u.el = c(u.children || ""),
      f,
      _
    ) : u.el = a.el;
  }, B = (a, u, f, _) => {
    [a.el, a.anchor] = $(
      a.children,
      u,
      f,
      _,
      a.el,
      a.anchor
    );
  }, ee = ({ el: a, anchor: u }, f, _) => {
    let b;
    for (; a && a !== u; )
      b = x(a), n(a, f, _), a = b;
    n(u, f, _);
  }, N = ({ el: a, anchor: u }) => {
    let f;
    for (; a && a !== u; )
      f = x(a), o(a), a = f;
    o(u);
  }, K = (a, u, f, _, b, v, S, C, y) => {
    u.type === "svg" ? S = "svg" : u.type === "math" && (S = "mathml"), a == null ? ge(
      u,
      f,
      _,
      b,
      v,
      S,
      C,
      y
    ) : Se(
      a,
      u,
      b,
      v,
      S,
      C,
      y
    );
  }, ge = (a, u, f, _, b, v, S, C) => {
    let y, w;
    const { props: M, shapeFlag: E, transition: O, dirs: R } = a;
    if (y = a.el = r(
      a.type,
      v,
      M && M.is,
      M
    ), E & 8 ? d(y, a.children) : E & 16 && re(
      a.children,
      y,
      null,
      _,
      b,
      Ps(a, v),
      S,
      C
    ), R && pt(a, null, _, "created"), ce(y, a, a.scopeId, S, _), M) {
      for (const Y in M)
        Y !== "value" && !$t(Y) && i(y, Y, null, M[Y], v, _);
      "value" in M && i(y, "value", null, M.value, v), (w = M.onVnodeBeforeMount) && Fe(w, _, a);
    }
    R && pt(a, null, _, "beforeMount");
    const L = Ar(b, O);
    L && O.beforeEnter(y), n(y, u, f), ((w = M && M.onVnodeMounted) || L || R) && Ee(() => {
      w && Fe(w, _, a), L && O.enter(y), R && pt(a, null, _, "mounted");
    }, b);
  }, ce = (a, u, f, _, b) => {
    if (f && k(a, f), _)
      for (let v = 0; v < _.length; v++)
        k(a, _[v]);
    if (b) {
      let v = b.subTree;
      if (u === v || Jo(v.type) && (v.ssContent === u || v.ssFallback === u)) {
        const S = b.vnode;
        ce(
          a,
          S,
          S.scopeId,
          S.slotScopeIds,
          b.parent
        );
      }
    }
  }, re = (a, u, f, _, b, v, S, C, y = 0) => {
    for (let w = y; w < a.length; w++) {
      const M = a[w] = C ? it(a[w]) : Le(a[w]);
      F(
        null,
        M,
        u,
        f,
        _,
        b,
        v,
        S,
        C
      );
    }
  }, Se = (a, u, f, _, b, v, S) => {
    const C = u.el = a.el;
    let { patchFlag: y, dynamicChildren: w, dirs: M } = u;
    y |= a.patchFlag & 16;
    const E = a.props || Z, O = u.props || Z;
    let R;
    if (f && ht(f, !1), (R = O.onVnodeBeforeUpdate) && Fe(R, f, u, a), M && pt(u, a, f, "beforeUpdate"), f && ht(f, !0), (E.innerHTML && O.innerHTML == null || E.textContent && O.textContent == null) && d(C, ""), w ? Be(
      a.dynamicChildren,
      w,
      C,
      f,
      _,
      Ps(u, b),
      v
    ) : S || q(
      a,
      u,
      C,
      null,
      f,
      _,
      Ps(u, b),
      v,
      !1
    ), y > 0) {
      if (y & 16)
        tt(C, E, O, f, b);
      else if (y & 2 && E.class !== O.class && i(C, "class", null, O.class, b), y & 4 && i(C, "style", E.style, O.style, b), y & 8) {
        const L = u.dynamicProps;
        for (let Y = 0; Y < L.length; Y++) {
          const U = L[Y], ye = E[U], Te = O[U];
          (Te !== ye || U === "value") && i(C, U, ye, Te, b, f);
        }
      }
      y & 1 && a.children !== u.children && d(C, u.children);
    } else !S && w == null && tt(C, E, O, f, b);
    ((R = O.onVnodeUpdated) || M) && Ee(() => {
      R && Fe(R, f, u, a), M && pt(u, a, f, "updated");
    }, _);
  }, Be = (a, u, f, _, b, v, S) => {
    for (let C = 0; C < u.length; C++) {
      const y = a[C], w = u[C], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        y.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (y.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Mt(y, w) || // - In the case of a component, it could contain anything.
        y.shapeFlag & 198) ? h(y.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          f
        )
      );
      F(
        y,
        w,
        M,
        null,
        _,
        b,
        v,
        S,
        !0
      );
    }
  }, tt = (a, u, f, _, b) => {
    if (u !== f) {
      if (u !== Z)
        for (const v in u)
          !$t(v) && !(v in f) && i(
            a,
            v,
            u[v],
            null,
            b,
            _
          );
      for (const v in f) {
        if ($t(v)) continue;
        const S = f[v], C = u[v];
        S !== C && v !== "value" && i(a, v, C, S, b, _);
      }
      "value" in f && i(a, "value", u.value, f.value, b);
    }
  }, ct = (a, u, f, _, b, v, S, C, y) => {
    const w = u.el = a ? a.el : l(""), M = u.anchor = a ? a.anchor : l("");
    let { patchFlag: E, dynamicChildren: O, slotScopeIds: R } = u;
    R && (C = C ? C.concat(R) : R), a == null ? (n(w, f, _), n(M, f, _), re(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      f,
      M,
      b,
      v,
      S,
      C,
      y
    )) : E > 0 && E & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (Be(
      a.dynamicChildren,
      O,
      f,
      b,
      v,
      S,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || b && u === b.subTree) && Wo(
      a,
      u,
      !0
      /* shallow */
    )) : q(
      a,
      u,
      f,
      M,
      b,
      v,
      S,
      C,
      y
    );
  }, _t = (a, u, f, _, b, v, S, C, y) => {
    u.slotScopeIds = C, a == null ? u.shapeFlag & 512 ? b.ctx.activate(
      u,
      f,
      _,
      S,
      y
    ) : st(
      u,
      f,
      _,
      b,
      v,
      S,
      y
    ) : ut(a, u, y);
  }, st = (a, u, f, _, b, v, S) => {
    const C = a.component = zr(
      a,
      _,
      b
    );
    if (Oo(a) && (C.ctx.renderer = H), Jr(C, !1, S), C.asyncDep) {
      if (b && b.registerDep(C, ne, S), !a.el) {
        const y = C.subTree = T(Ze);
        A(null, y, u, f), a.placeholder = y.el;
      }
    } else
      ne(
        C,
        a,
        u,
        f,
        b,
        v,
        S
      );
  }, ut = (a, u, f) => {
    const _ = u.component = a.component;
    if (jr(a, u, f))
      if (_.asyncDep && !_.asyncResolved) {
        J(_, u, f);
        return;
      } else
        _.next = u, _.update();
    else
      u.el = a.el, _.vnode = u;
  }, ne = (a, u, f, _, b, v, S) => {
    const C = () => {
      if (a.isMounted) {
        let { next: E, bu: O, u: R, parent: L, vnode: Y } = a;
        {
          const Re = Ko(a);
          if (Re) {
            E && (E.el = Y.el, J(a, E, S)), Re.asyncDep.then(() => {
              a.isUnmounted || C();
            });
            return;
          }
        }
        let U = E, ye;
        ht(a, !1), E ? (E.el = Y.el, J(a, E, S)) : E = Y, O && Ss(O), (ye = E.props && E.props.onVnodeBeforeUpdate) && Fe(ye, L, E, Y), ht(a, !0);
        const Te = Mn(a), Ie = a.subTree;
        a.subTree = Te, F(
          Ie,
          Te,
          // parent may have changed if it's in a teleport
          h(Ie.el),
          // anchor may have changed if it's in a fragment
          dt(Ie),
          a,
          b,
          v
        ), E.el = Te.el, U === null && Lr(a, Te.el), R && Ee(R, b), (ye = E.props && E.props.onVnodeUpdated) && Ee(
          () => Fe(ye, L, E, Y),
          b
        );
      } else {
        let E;
        const { el: O, props: R } = u, { bm: L, m: Y, parent: U, root: ye, type: Te } = a, Ie = St(u);
        ht(a, !1), L && Ss(L), !Ie && (E = R && R.onVnodeBeforeMount) && Fe(E, U, u), ht(a, !0);
        {
          ye.ce && // @ts-expect-error _def is private
          ye.ce._def.shadowRoot !== !1 && ye.ce._injectChildStyle(Te);
          const Re = a.subTree = Mn(a);
          F(
            null,
            Re,
            f,
            _,
            a,
            b,
            v
          ), u.el = Re.el;
        }
        if (Y && Ee(Y, b), !Ie && (E = R && R.onVnodeMounted)) {
          const Re = u;
          Ee(
            () => Fe(E, U, Re),
            b
          );
        }
        (u.shapeFlag & 256 || U && St(U.vnode) && U.vnode.shapeFlag & 256) && a.a && Ee(a.a, b), a.isMounted = !0, u = f = _ = null;
      }
    };
    a.scope.on();
    const y = a.effect = new io(C);
    a.scope.off();
    const w = a.update = y.run.bind(y), M = a.job = y.runIfDirty.bind(y);
    M.i = a, M.id = a.uid, y.scheduler = () => rn(M), ht(a, !0), w();
  }, J = (a, u, f) => {
    u.component = a;
    const _ = a.vnode.props;
    a.vnode = u, a.next = null, wr(a, u.props, _, f), Sr(a, u.children, f), Ye(), wn(a), Xe();
  }, q = (a, u, f, _, b, v, S, C, y = !1) => {
    const w = a && a.children, M = a ? a.shapeFlag : 0, E = u.children, { patchFlag: O, shapeFlag: R } = u;
    if (O > 0) {
      if (O & 128) {
        bt(
          w,
          E,
          f,
          _,
          b,
          v,
          S,
          C,
          y
        );
        return;
      } else if (O & 256) {
        We(
          w,
          E,
          f,
          _,
          b,
          v,
          S,
          C,
          y
        );
        return;
      }
    }
    R & 8 ? (M & 16 && ft(w, b, v), E !== w && d(f, E)) : M & 16 ? R & 16 ? bt(
      w,
      E,
      f,
      _,
      b,
      v,
      S,
      C,
      y
    ) : ft(w, b, v, !0) : (M & 8 && d(f, ""), R & 16 && re(
      E,
      f,
      _,
      b,
      v,
      S,
      C,
      y
    ));
  }, We = (a, u, f, _, b, v, S, C, y) => {
    a = a || wt, u = u || wt;
    const w = a.length, M = u.length, E = Math.min(w, M);
    let O;
    for (O = 0; O < E; O++) {
      const R = u[O] = y ? it(u[O]) : Le(u[O]);
      F(
        a[O],
        R,
        f,
        null,
        b,
        v,
        S,
        C,
        y
      );
    }
    w > M ? ft(
      a,
      b,
      v,
      !0,
      !1,
      E
    ) : re(
      u,
      f,
      _,
      b,
      v,
      S,
      C,
      y,
      E
    );
  }, bt = (a, u, f, _, b, v, S, C, y) => {
    let w = 0;
    const M = u.length;
    let E = a.length - 1, O = M - 1;
    for (; w <= E && w <= O; ) {
      const R = a[w], L = u[w] = y ? it(u[w]) : Le(u[w]);
      if (Mt(R, L))
        F(
          R,
          L,
          f,
          null,
          b,
          v,
          S,
          C,
          y
        );
      else
        break;
      w++;
    }
    for (; w <= E && w <= O; ) {
      const R = a[E], L = u[O] = y ? it(u[O]) : Le(u[O]);
      if (Mt(R, L))
        F(
          R,
          L,
          f,
          null,
          b,
          v,
          S,
          C,
          y
        );
      else
        break;
      E--, O--;
    }
    if (w > E) {
      if (w <= O) {
        const R = O + 1, L = R < M ? u[R].el : _;
        for (; w <= O; )
          F(
            null,
            u[w] = y ? it(u[w]) : Le(u[w]),
            f,
            L,
            b,
            v,
            S,
            C,
            y
          ), w++;
      }
    } else if (w > O)
      for (; w <= E; )
        Me(a[w], b, v, !0), w++;
    else {
      const R = w, L = w, Y = /* @__PURE__ */ new Map();
      for (w = L; w <= O; w++) {
        const ke = u[w] = y ? it(u[w]) : Le(u[w]);
        ke.key != null && Y.set(ke.key, w);
      }
      let U, ye = 0;
      const Te = O - L + 1;
      let Ie = !1, Re = 0;
      const At = new Array(Te);
      for (w = 0; w < Te; w++) At[w] = 0;
      for (w = R; w <= E; w++) {
        const ke = a[w];
        if (ye >= Te) {
          Me(ke, b, v, !0);
          continue;
        }
        let De;
        if (ke.key != null)
          De = Y.get(ke.key);
        else
          for (U = L; U <= O; U++)
            if (At[U - L] === 0 && Mt(ke, u[U])) {
              De = U;
              break;
            }
        De === void 0 ? Me(ke, b, v, !0) : (At[De - L] = w + 1, De >= Re ? Re = De : Ie = !0, F(
          ke,
          u[De],
          f,
          null,
          b,
          v,
          S,
          C,
          y
        ), ye++);
      }
      const hn = Ie ? Or(At) : wt;
      for (U = hn.length - 1, w = Te - 1; w >= 0; w--) {
        const ke = L + w, De = u[ke], mn = u[ke + 1], gn = ke + 1 < M ? (
          // #13559, fallback to el placeholder for unresolved async component
          mn.el || mn.placeholder
        ) : _;
        At[w] === 0 ? F(
          null,
          De,
          f,
          gn,
          b,
          v,
          S,
          C,
          y
        ) : Ie && (U < 0 || w !== hn[U] ? Ke(De, f, gn, 2) : U--);
      }
    }
  }, Ke = (a, u, f, _, b = null) => {
    const { el: v, type: S, transition: C, children: y, shapeFlag: w } = a;
    if (w & 6) {
      Ke(a.component.subTree, u, f, _);
      return;
    }
    if (w & 128) {
      a.suspense.move(u, f, _);
      return;
    }
    if (w & 64) {
      S.move(a, u, f, H);
      return;
    }
    if (S === de) {
      n(v, u, f);
      for (let E = 0; E < y.length; E++)
        Ke(y[E], u, f, _);
      n(a.anchor, u, f);
      return;
    }
    if (S === Ns) {
      ee(a, u, f);
      return;
    }
    if (_ !== 2 && w & 1 && C)
      if (_ === 0)
        C.beforeEnter(v), n(v, u, f), Ee(() => C.enter(v), b);
      else {
        const { leave: E, delayLeave: O, afterLeave: R } = C, L = () => {
          a.ctx.isUnmounted ? o(v) : n(v, u, f);
        }, Y = () => {
          v._isLeaving && v[Gi](
            !0
            /* cancelled */
          ), E(v, () => {
            L(), R && R();
          });
        };
        O ? O(v, L, Y) : Y();
      }
    else
      n(v, u, f);
  }, Me = (a, u, f, _ = !1, b = !1) => {
    const {
      type: v,
      props: S,
      ref: C,
      children: y,
      dynamicChildren: w,
      shapeFlag: M,
      patchFlag: E,
      dirs: O,
      cacheIndex: R
    } = a;
    if (E === -2 && (b = !1), C != null && (Ye(), Dt(C, null, f, a, !0), Xe()), R != null && (u.renderCache[R] = void 0), M & 256) {
      u.ctx.deactivate(a);
      return;
    }
    const L = M & 1 && O, Y = !St(a);
    let U;
    if (Y && (U = S && S.onVnodeBeforeUnmount) && Fe(U, u, a), M & 6)
      Gt(a.component, f, _);
    else {
      if (M & 128) {
        a.suspense.unmount(f, _);
        return;
      }
      L && pt(a, null, u, "beforeUnmount"), M & 64 ? a.type.remove(
        a,
        u,
        f,
        H,
        _
      ) : w && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !w.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== de || E > 0 && E & 64) ? ft(
        w,
        u,
        f,
        !1,
        !0
      ) : (v === de && E & 384 || !b && M & 16) && ft(y, u, f), _ && zt(a);
    }
    (Y && (U = S && S.onVnodeUnmounted) || L) && Ee(() => {
      U && Fe(U, u, a), L && pt(a, null, u, "unmounted");
    }, f);
  }, zt = (a) => {
    const { type: u, el: f, anchor: _, transition: b } = a;
    if (u === de) {
      Ts(f, _);
      return;
    }
    if (u === Ns) {
      N(a);
      return;
    }
    const v = () => {
      o(f), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (a.shapeFlag & 1 && b && !b.persisted) {
      const { leave: S, delayLeave: C } = b, y = () => S(f, v);
      C ? C(a.el, v, y) : y();
    } else
      v();
  }, Ts = (a, u) => {
    let f;
    for (; a !== u; )
      f = x(a), o(a), a = f;
    o(u);
  }, Gt = (a, u, f) => {
    const { bum: _, scope: b, job: v, subTree: S, um: C, m: y, a: w } = a;
    On(y), On(w), _ && Ss(_), b.stop(), v && (v.flags |= 8, Me(S, a, u, f)), C && Ee(C, u), Ee(() => {
      a.isUnmounted = !0;
    }, u);
  }, ft = (a, u, f, _ = !1, b = !1, v = 0) => {
    for (let S = v; S < a.length; S++)
      Me(a[S], u, f, _, b);
  }, dt = (a) => {
    if (a.shapeFlag & 6)
      return dt(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const u = x(a.anchor || a.el), f = u && u[Ui];
    return f ? x(f) : u;
  };
  let P = !1;
  const m = (a, u, f) => {
    a == null ? u._vnode && Me(u._vnode, null, null, !0) : F(
      u._vnode || null,
      a,
      u,
      null,
      null,
      null,
      f
    ), u._vnode = a, P || (P = !0, wn(), Co(), P = !1);
  }, H = {
    p: F,
    um: Me,
    m: Ke,
    r: zt,
    mt: st,
    mc: re,
    pc: q,
    pbc: Be,
    n: dt,
    o: e
  };
  return {
    render: m,
    hydrate: void 0,
    createApp: br(m)
  };
}
function Ps({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function ht({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Ar(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Wo(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (D(n) && D(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = it(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && Wo(r, l)), l.type === ys && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = r.el), l.type === Ze && !l.el && (l.el = r.el);
    }
}
function Or(e) {
  const t = e.slice(), s = [0];
  let n, o, i, r, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const p = e[n];
    if (p !== 0) {
      if (o = s[s.length - 1], e[o] < p) {
        t[n] = o, s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; )
        l = i + r >> 1, e[s[l]] < p ? i = l + 1 : r = l;
      p < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, r = s[i - 1]; i-- > 0; )
    s[i] = r, r = t[r];
  return s;
}
function Ko(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ko(t);
}
function On(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Mr = Symbol.for("v-scx"), Pr = () => es(Mr);
function ts(e, t, s) {
  return Uo(e, t, s);
}
function Uo(e, t, s = Z) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = ie({}, s), c = t && n || !t && i !== "post";
  let p;
  if (Bt) {
    if (i === "sync") {
      const k = Pr();
      p = k.__watcherHandles || (k.__watcherHandles = []);
    } else if (!c) {
      const k = () => {
      };
      return k.stop = He, k.resume = He, k.pause = He, k;
    }
  }
  const d = he;
  l.call = (k, $, F) => Ve(k, d, $, F);
  let h = !1;
  i === "post" ? l.scheduler = (k) => {
    Ee(k, d && d.suspense);
  } : i !== "sync" && (h = !0, l.scheduler = (k, $) => {
    $ ? k() : rn(k);
  }), l.augmentJob = (k) => {
    t && (k.flags |= 4), h && (k.flags |= 2, d && (k.id = d.uid, k.i = d));
  };
  const x = Vi(e, t, l);
  return Bt && (p ? p.push(x) : c && x()), x;
}
function Nr(e, t, s) {
  const n = this.proxy, o = oe(e) ? e.includes(".") ? zo(n, e) : () => n[e] : e.bind(n, n);
  let i;
  j(t) ? i = t : (i = t.handler, s = t);
  const r = Ut(this), l = Uo(o, i.bind(n), s);
  return r(), l;
}
function zo(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const $r = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${we(t)}Modifiers`] || e[`${Pe(t)}Modifiers`];
function Ir(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Z;
  let o = s;
  const i = t.startsWith("update:"), r = i && $r(n, t.slice(7));
  r && (r.trim && (o = s.map((d) => oe(d) ? d.trim() : d)), r.number && (o = s.map(li)));
  let l, c = n[l = Cs(t)] || // also try camelCase event handler (#2249)
  n[l = Cs(we(t))];
  !c && i && (c = n[l = Cs(Pe(t))]), c && Ve(
    c,
    e,
    6,
    o
  );
  const p = n[l + "Once"];
  if (p) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ve(
      p,
      e,
      6,
      o
    );
  }
}
const Rr = /* @__PURE__ */ new WeakMap();
function Go(e, t, s = !1) {
  const n = s ? Rr : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let r = {}, l = !1;
  if (!j(e)) {
    const c = (p) => {
      const d = Go(p, t, !0);
      d && (l = !0, ie(r, d));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (se(e) && n.set(e, null), null) : (D(i) ? i.forEach((c) => r[c] = null) : ie(r, i), se(e) && n.set(e, r), r);
}
function ws(e, t) {
  return !e || !ds(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), V(e, t[0].toLowerCase() + t.slice(1)) || V(e, Pe(t)) || V(e, t));
}
function Mn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [i],
    slots: r,
    attrs: l,
    emit: c,
    render: p,
    renderCache: d,
    props: h,
    data: x,
    setupState: k,
    ctx: $,
    inheritAttrs: F
  } = e, Q = ls(e);
  let A, B;
  try {
    if (s.shapeFlag & 4) {
      const N = o || n, K = N;
      A = Le(
        p.call(
          K,
          N,
          d,
          h,
          k,
          x,
          $
        )
      ), B = l;
    } else {
      const N = t;
      A = Le(
        N.length > 1 ? N(
          h,
          { attrs: l, slots: r, emit: c }
        ) : N(
          h,
          null
        )
      ), B = t.props ? l : Dr(l);
    }
  } catch (N) {
    jt.length = 0, vs(N, e, 1), A = T(Ze);
  }
  let ee = A;
  if (B && F !== !1) {
    const N = Object.keys(B), { shapeFlag: K } = ee;
    N.length && K & 7 && (i && N.some(zs) && (B = Fr(
      B,
      i
    )), ee = Et(ee, B, !1, !0));
  }
  return s.dirs && (ee = Et(ee, null, !1, !0), ee.dirs = ee.dirs ? ee.dirs.concat(s.dirs) : s.dirs), s.transition && ln(ee, s.transition), A = ee, ls(Q), A;
}
const Dr = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || ds(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Fr = (e, t) => {
  const s = {};
  for (const n in e)
    (!zs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function jr(e, t, s) {
  const { props: n, children: o, component: i } = e, { props: r, children: l, patchFlag: c } = t, p = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? Pn(n, r, p) : !!r;
    if (c & 8) {
      const d = t.dynamicProps;
      for (let h = 0; h < d.length; h++) {
        const x = d[h];
        if (r[x] !== n[x] && !ws(p, x))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? Pn(n, r, p) : !0 : !!r;
  return !1;
}
function Pn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (t[i] !== e[i] && !ws(s, i))
      return !0;
  }
  return !1;
}
function Lr({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Jo = (e) => e.__isSuspense;
function qr(e, t) {
  t && t.pendingBranch ? D(e) ? t.effects.push(...e) : t.effects.push(e) : Ki(e);
}
const de = Symbol.for("v-fgt"), ys = Symbol.for("v-txt"), Ze = Symbol.for("v-cmt"), Ns = Symbol.for("v-stc"), jt = [];
let Oe = null;
function z(e = !1) {
  jt.push(Oe = e ? null : []);
}
function Hr() {
  jt.pop(), Oe = jt[jt.length - 1] || null;
}
let Vt = 1;
function Nn(e, t = !1) {
  Vt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function Yo(e) {
  return e.dynamicChildren = Vt > 0 ? Oe || wt : null, Hr(), Vt > 0 && Oe && Oe.push(e), e;
}
function be(e, t, s, n, o, i) {
  return Yo(
    g(
      e,
      t,
      s,
      n,
      o,
      i,
      !0
    )
  );
}
function Ae(e, t, s, n, o) {
  return Yo(
    T(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function un(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Mt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Xo = ({ key: e }) => e ?? null, ss = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || me(e) || j(e) ? { i: xe, r: e, k: t, f: !!s } : e : null);
function g(e, t = null, s = null, n = 0, o = null, i = e === de ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xo(t),
    ref: t && ss(t),
    scopeId: ko,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return l ? (fn(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= oe(s) ? 8 : 16), Vt > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Oe.push(c), c;
}
const T = Vr;
function Vr(e, t = null, s = null, n = 0, o = null, i = !1) {
  if ((!e || e === ar) && (e = Ze), un(e)) {
    const l = Et(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && fn(l, s), Vt > 0 && !i && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (el(e) && (e = e.__vccOpts), t) {
    t = Br(t);
    let { class: l, style: c } = t;
    l && !oe(l) && (t.class = Wt(l)), se(c) && (on(c) && !D(c) && (c = ie({}, c)), t.style = Ys(c));
  }
  const r = oe(e) ? 1 : Jo(e) ? 128 : zi(e) ? 64 : se(e) ? 4 : j(e) ? 2 : 0;
  return g(
    e,
    t,
    s,
    n,
    o,
    r,
    i,
    !0
  );
}
function Br(e) {
  return e ? on(e) || jo(e) ? ie({}, e) : e : null;
}
function Et(e, t, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = e, p = t ? Wr(o || {}, t) : o, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Xo(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? D(i) ? i.concat(ss(t)) : [i, ss(t)] : ss(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Et(e.ssContent),
    ssFallback: e.ssFallback && Et(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && ln(
    d,
    c.clone(d)
  ), d;
}
function ue(e = " ", t = 0) {
  return T(ys, null, e, t);
}
function qe(e = "", t = !1) {
  return t ? (z(), Ae(Ze, null, e)) : T(Ze, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? T(Ze) : D(e) ? T(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : un(e) ? it(e) : T(ys, null, String(e));
}
function it(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Et(e);
}
function fn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (D(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), fn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !jo(t) ? t._ctx = xe : o === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else j(t) ? (t = { default: t, _ctx: xe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [ue(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Wr(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = Wt([t.class, n.class]));
      else if (o === "style")
        t.style = Ys([t.style, n.style]);
      else if (ds(o)) {
        const i = t[o], r = n[o];
        r && i !== r && !(D(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Fe(e, t, s, n = null) {
  Ve(e, t, 7, [
    s,
    n
  ]);
}
const Kr = Ro();
let Ur = 0;
function zr(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Kr, i = {
    uid: Ur++,
    vnode: e,
    type: n,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new hi(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: qo(n, o),
    emitsOptions: Go(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Z,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: Z,
    data: Z,
    props: Z,
    attrs: Z,
    slots: Z,
    refs: Z,
    setupState: Z,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Ir.bind(null, i), e.ce && e.ce(i), i;
}
let he = null;
const Gr = () => he || xe;
let us, Ws;
{
  const e = _s(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((r) => r(i)) : o[0](i);
    };
  };
  us = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => he = s
  ), Ws = t(
    "__VUE_SSR_SETTERS__",
    (s) => Bt = s
  );
}
const Ut = (e) => {
  const t = he;
  return us(e), e.scope.on(), () => {
    e.scope.off(), us(t);
  };
}, $n = () => {
  he && he.scope.off(), us(null);
};
function Zo(e) {
  return e.vnode.shapeFlag & 4;
}
let Bt = !1;
function Jr(e, t = !1, s = !1) {
  t && Ws(t);
  const { props: n, children: o } = e.vnode, i = Zo(e);
  xr(e, n, i, t), Cr(e, o, s || t);
  const r = i ? Yr(e, t) : void 0;
  return t && Ws(!1), r;
}
function Yr(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, fr);
  const { setup: n } = s;
  if (n) {
    Ye();
    const o = e.setupContext = n.length > 1 ? Zr(e) : null, i = Ut(e), r = Kt(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Qn(r);
    if (Xe(), i(), (l || e.sp) && !St(e) && Ao(e), l) {
      if (r.then($n, $n), t)
        return r.then((c) => {
          In(e, c);
        }).catch((c) => {
          vs(c, e, 0);
        });
      e.asyncDep = r;
    } else
      In(e, r);
  } else
    Qo(e);
}
function In(e, t, s) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : se(t) && (e.setupState = xo(t)), Qo(e);
}
function Qo(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || He);
  {
    const o = Ut(e);
    Ye();
    try {
      dr(e);
    } finally {
      Xe(), o();
    }
  }
}
const Xr = {
  get(e, t) {
    return pe(e, "get", ""), e[t];
  }
};
function Zr(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xr),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function dn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(xo(Ri(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Ft)
        return Ft[s](e);
    },
    has(t, s) {
      return s in t || s in Ft;
    }
  })) : e.proxy;
}
function Qr(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function el(e) {
  return j(e) && "__vccOpts" in e;
}
const Je = (e, t) => qi(e, t, Bt), tl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ks;
const Rn = typeof window < "u" && window.trustedTypes;
if (Rn)
  try {
    Ks = /* @__PURE__ */ Rn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const ei = Ks ? (e) => Ks.createHTML(e) : (e) => e, sl = "http://www.w3.org/2000/svg", nl = "http://www.w3.org/1998/Math/MathML", ze = typeof document < "u" ? document : null, Dn = ze && /* @__PURE__ */ ze.createElement("template"), ol = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? ze.createElementNS(sl, e) : t === "mathml" ? ze.createElementNS(nl, e) : s ? ze.createElement(e, { is: s }) : ze.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => ze.createTextNode(e),
  createComment: (e) => ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, i) {
    const r = s ? s.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      Dn.innerHTML = ei(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Dn.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, il = Symbol("_vtc");
function rl(e, t, s) {
  const n = e[il];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Fn = Symbol("_vod"), ll = Symbol("_vsh"), al = Symbol(""), cl = /(?:^|;)\s*display\s*:/;
function ul(e, t, s) {
  const n = e.style, o = oe(s);
  let i = !1;
  if (s && !o) {
    if (t)
      if (oe(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && ns(n, l, "");
        }
      else
        for (const r in t)
          s[r] == null && ns(n, r, "");
    for (const r in s)
      r === "display" && (i = !0), ns(n, r, s[r]);
  } else if (o) {
    if (t !== s) {
      const r = n[al];
      r && (s += ";" + r), n.cssText = s, i = cl.test(s);
    }
  } else t && e.removeAttribute("style");
  Fn in e && (e[Fn] = i ? n.display : "", e[ll] && (n.display = "none"));
}
const jn = /\s*!important$/;
function ns(e, t, s) {
  if (D(s))
    s.forEach((n) => ns(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = fl(e, t);
    jn.test(s) ? e.setProperty(
      Pe(n),
      s.replace(jn, ""),
      "important"
    ) : e[n] = s;
  }
}
const Ln = ["Webkit", "Moz", "ms"], $s = {};
function fl(e, t) {
  const s = $s[t];
  if (s)
    return s;
  let n = we(t);
  if (n !== "filter" && n in e)
    return $s[t] = n;
  n = gs(n);
  for (let o = 0; o < Ln.length; o++) {
    const i = Ln[o] + n;
    if (i in e)
      return $s[t] = i;
  }
  return t;
}
const qn = "http://www.w3.org/1999/xlink";
function Hn(e, t, s, n, o, i = pi(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(qn, t.slice(6, t.length)) : e.setAttributeNS(qn, t, s) : s == null || i && !so(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Qe(s) ? String(s) : s
  );
}
function Vn(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? ei(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let r = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = so(s) : s == null && l === "string" ? (s = "", r = !0) : l === "number" && (s = 0, r = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  r && e.removeAttribute(o || t);
}
function dl(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function pl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Bn = Symbol("_vei");
function hl(e, t, s, n, o = null) {
  const i = e[Bn] || (e[Bn] = {}), r = i[t];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = ml(t);
    if (n) {
      const p = i[t] = bl(
        n,
        o
      );
      dl(e, l, p, c);
    } else r && (pl(e, l, r, c), i[t] = void 0);
  }
}
const Wn = /(?:Once|Passive|Capture)$/;
function ml(e) {
  let t;
  if (Wn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Wn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Pe(e.slice(2)), t];
}
let Is = 0;
const gl = /* @__PURE__ */ Promise.resolve(), _l = () => Is || (gl.then(() => Is = 0), Is = Date.now());
function bl(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ve(
      vl(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = _l(), s;
}
function vl(e, t) {
  if (D(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const Kn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, xl = (e, t, s, n, o, i) => {
  const r = o === "svg";
  t === "class" ? rl(e, n, r) : t === "style" ? ul(e, s, n) : ds(t) ? zs(t) || hl(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wl(e, t, n, r)) ? (Vn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Hn(e, t, n, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !oe(n)) ? Vn(e, we(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Hn(e, t, n, r));
};
function wl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Kn(t) && j(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return Kn(t) && oe(s) ? !1 : t in e;
}
const Un = {};
// @__NO_SIDE_EFFECTS__
function yl(e, t, s) {
  let n = /* @__PURE__ */ Eo(e, t);
  hs(n) && (n = ie({}, n, t));
  class o extends pn {
    constructor(r) {
      super(n, r, s);
    }
  }
  return o.def = n, o;
}
const Tl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class pn extends Tl {
  constructor(t, s = {}, n = Gn) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== Gn ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      ie({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof pn) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, yo(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const s of t)
      this._setAttr(s.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (n, o = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: i, styles: r } = n;
      let l;
      if (i && !D(i))
        for (const c in i) {
          const p = i[c];
          (p === Number || p && p.type === Number) && (c in this._props && (this._props[c] = _n(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[we(c)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(r), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, t(this._def = n, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const s = this._instance && this._instance.exposed;
    if (s)
      for (const n in s)
        V(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => nt(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = D(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o]);
    for (const o of n.map(we))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(i) {
          this._setProp(o, i, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : Un;
    const o = we(t);
    s && this._numberProps && this._numberProps[o] && (n = _n(n)), this._setProp(o, n, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, o = !1) {
    if (s !== this._props[t] && (s === Un ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), o && this._instance && this._update(), n)) {
      const i = this._ob;
      i && (this._processMutations(i.takeRecords()), i.disconnect()), s === !0 ? this.setAttribute(Pe(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Pe(t), s + "") : s || this.removeAttribute(Pe(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), El(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = T(this._def, ie(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const o = (i, r) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            hs(r[0]) ? ie({ detail: r }, r[0]) : { detail: r }
          )
        );
      };
      n.emit = (i, ...r) => {
        o(i, r), Pe(i) !== i && o(Pe(i), r);
      }, this._setParent();
    }), s;
  }
  _applyStyles(t, s) {
    if (!t) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s))
        return;
      this._styleChildren.add(s);
    }
    const n = this._nonce;
    for (let o = t.length - 1; o >= 0; o--) {
      const i = document.createElement("style");
      n && i.setAttribute("nonce", n), i.textContent = t[o], this.shadowRoot.prepend(i);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let s;
    for (; s = this.firstChild; ) {
      const n = s.nodeType === 1 && s.getAttribute("slot") || "default";
      (t[n] || (t[n] = [])).push(s), this.removeChild(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), s = this._instance.type.__scopeId;
    for (let n = 0; n < t.length; n++) {
      const o = t[n], i = o.getAttribute("name") || "default", r = this._slots[i], l = o.parentNode;
      if (r)
        for (const c of r) {
          if (s && c.nodeType === 1) {
            const p = s + "-s", d = document.createTreeWalker(c, 1);
            c.setAttribute(p, "");
            let h;
            for (; h = d.nextNode(); )
              h.setAttribute(p, "");
          }
          l.insertBefore(c, o);
        }
      else
        for (; o.firstChild; ) l.insertBefore(o.firstChild, o);
      l.removeChild(o);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    return this._teleportTargets && t.push(...this._teleportTargets), t.reduce((s, n) => (s.push(...Array.from(n.querySelectorAll("slot"))), s), []);
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const Cl = ["ctrl", "shift", "alt", "meta"], Sl = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Cl.some((s) => e[`${s}Key`] && !t.includes(s))
}, fs = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((o, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const l = Sl[t[r]];
      if (l && l(o, t)) return;
    }
    return e(o, ...i);
  }));
}, kl = /* @__PURE__ */ ie({ patchProp: xl }, ol);
let zn;
function ti() {
  return zn || (zn = kr(kl));
}
const El = ((...e) => {
  ti().render(...e);
}), Gn = ((...e) => {
  const t = ti().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = Ol(n);
    if (!o) return;
    const i = t._component;
    !j(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, Al(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, t;
});
function Al(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Ol(e) {
  return oe(e) ? document.querySelector(e) : e;
}
const Ml = { class: "tablet:flex tablet:gap-8 tablet:flex-row grid grid-cols-1 gap-4" }, Pl = { class: "flex flex-col" }, Nl = { class: "text-2xl" }, $l = { class: "flex-shrink-0" }, Il = { class: "flex flex-col" }, Rl = { class: "text-2xl" }, Dl = { class: "flex-shrink-0" }, Fl = { class: "flex flex-col" }, jl = { class: "text-2xl" }, Ll = { class: "flex-shrink-0" }, ql = {
  __name: "InfoCards",
  props: {
    totalTasks: {
      type: Number,
      required: !0
    },
    upcomingTasks: {
      type: Number,
      required: !0
    },
    overdueTasks: {
      type: Number,
      required: !0
    }
  },
  setup(e) {
    const t = e;
    return (s, n) => {
      const o = ae("ha-icon"), i = ae("ha-card");
      return z(), be("div", Ml, [
        T(i, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: I(() => [
            g("div", Pl, [
              n[0] || (n[0] = g("div", { class: "text-2xl" }, "Total tasks", -1)),
              g("div", Nl, G(t.totalTasks), 1)
            ]),
            g("div", $l, [
              T(o, {
                class: "text-blue-500",
                ".icon": "mdi:calendar-blank"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(i, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: I(() => [
            g("div", Il, [
              n[1] || (n[1] = g("div", { class: "text-2xl" }, "Upcoming Tasks", -1)),
              g("div", Rl, G(t.upcomingTasks), 1)
            ]),
            g("div", Dl, [
              T(o, {
                class: "text-yellow-500",
                ".icon": "mdi:bell"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(i, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: I(() => [
            g("div", Fl, [
              n[2] || (n[2] = g("div", { class: "text-2xl" }, "Overdue Tasks", -1)),
              g("div", jl, G(t.overdueTasks), 1)
            ]),
            g("div", Ll, [
              T(o, {
                class: "text-red-500",
                ".icon": "mdi:alert"
              }, null, 32)
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
}, Qt = (e) => e.callWS({
  type: "maintenance_manager/get_tasks"
}), Hl = (e, t) => e.callWS({
  type: "maintenance_manager/create_task",
  ...t
}), Vl = (e, t) => e.callWS({
  type: "maintenance_manager/delete_task",
  task_id: t
}), Bl = (e, t, s) => e.callWS({
  type: "maintenance_manager/complete_task",
  task_id: t,
  ...s
}), Jn = (e) => e.callWS({
  type: "maintenance_manager/get_history"
}), Yn = (e, t) => e.callWS({
  type: "maintenance_manager/get_attributes",
  task_sensor: t
}), Wl = (e, t) => e.callWS({
  type: "maintenance_manager/edit_task",
  ...t
}), Kl = ".header[data-v-d7a521f8]{background-color:var(--app-header-background-color);color:var(--app-header-text-color, white);border-bottom:var(--app-header-border-bottom, none)}.toolbar[data-v-d7a521f8]{height:var(--header-height);display:flex;align-items:center;font-size:20px;padding:0 16px;font-weight:400;box-sizing:border-box}.main-title[data-v-d7a521f8]{line-height:20px;flex-grow:1}.version[data-v-d7a521f8]{font-size:14px;font-weight:500;color:rgba(var(--rgb-text-primary-color),.9)}", si = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Ul = { class: "header" }, zl = { class: "toolbar" }, Gl = {
  __name: "Header",
  props: {
    hass: {
      type: Object,
      required: !1
    },
    narrow: {
      type: Boolean,
      required: !1
    }
  },
  setup(e) {
    const t = e;
    return (s, n) => {
      const o = ae("ha-menu-button");
      return z(), be("div", Ul, [
        g("div", zl, [
          T(o, {
            ".hass": t.hass,
            ".narrow": t.narrow
          }, null, 40, [".hass", ".narrow"]),
          n[0] || (n[0] = g("div", { class: "mobileL:ml-6 main-title" }, " Device Maintenance Manager ", -1)),
          n[1] || (n[1] = g("div", { class: "version" }, " v1.0.4 ", -1))
        ])
      ]);
    };
  }
}, Jl = /* @__PURE__ */ si(Gl, [["styles", [Kl]], ["__scopeId", "data-v-d7a521f8"]]), Yl = { slot: "header" }, Xl = { class: "grid items-center grid-cols-1 gap-1 tablet:grid-cols-4 tablet:gap-0" }, Zl = { class: "text-2xl font-medium" }, Ql = { class: "flex items-center" }, ea = {
  key: 0,
  class: "text-xl font-light"
}, ta = { class: "flex items-center justify-end gap-2 mr-5" }, sa = { class: "flex items-center gap-1" }, na = { class: "text-xl font-light mt-2 mb-6" }, oa = { class: "bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg" }, ia = { class: "hidden tablet:block mb-1" }, ra = { class: "text-blue-600 ml-1" }, la = { class: "text-blue-600 ml-1" }, aa = {
  __name: "ConditionalTaskCard",
  props: {
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    location: {
      type: String,
      required: !0
    },
    description: {
      type: String,
      required: !1
    },
    sensor: {
      type: String,
      required: !0
    },
    operator: {
      type: String,
      required: !0
    },
    value: {
      type: Number,
      required: !0
    },
    overdue: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["deleteTask", "completeTask"],
  setup(e, { emit: t }) {
    const s = e, n = te(!1), o = {
      below: "<",
      equal: "=",
      above: ">"
    }, i = t, r = () => {
      n.value = !1, i("deleteTask");
    }, l = () => {
      i("completeTask");
    }, c = () => {
      n.value = !1, i("editTask");
    }, p = te(!1), d = (h) => {
      p.value = h.detail.expanded;
    };
    return (h, x) => {
      const k = ae("ha-icon"), $ = ae("ha-button"), F = ae("ha-dropdown-item"), Q = ae("ha-dropdown"), A = ae("ha-expansion-panel"), B = ae("ha-card");
      return z(), Ae(B, {
        class: Wt(["w-full", "p-6", { "border-red-700": s.overdue }])
      }, {
        default: I(() => [
          T(A, { onExpandedChanged: d }, {
            default: I(() => [
              g("span", Yl, [
                g("div", Xl, [
                  g("div", Zl, G(s.name), 1),
                  g("div", Ql, [
                    p.value ? qe("", !0) : (z(), be("div", ea, G(s.location), 1))
                  ]),
                  x[5] || (x[5] = g("div", { class: "flex items-center" }, null, -1)),
                  g("div", ta, [
                    T($, {
                      onClick: [
                        x[0] || (x[0] = fs(() => {
                        }, ["stop"])),
                        l
                      ],
                      appearance: "accent",
                      variant: "success",
                      class: "flex items-center gap-2"
                    }, {
                      default: I(() => [
                        g("div", sa, [
                          T(k, { ".icon": "mdi:check-circle-outline" }, null, 32),
                          x[2] || (x[2] = g("span", { class: "hidden mobileL:block tablet:hidden desktop:block" }, " Complete", -1))
                        ])
                      ]),
                      _: 1
                    }),
                    T(Q, {
                      onClick: x[1] || (x[1] = fs(() => {
                      }, ["stop"]))
                    }, {
                      default: I(() => [
                        T($, {
                          slot: "trigger",
                          appearance: "plain",
                          variant: "neutral"
                        }, {
                          default: I(() => [
                            T(k, { ".icon": "mdi:dots-vertical" }, null, 32)
                          ]),
                          _: 1
                        }),
                        T(F, {
                          onClick: c,
                          variant: "neutral",
                          appearance: "plain"
                        }, {
                          default: I(() => [
                            T(k, { ".icon": "mdi:pencil" }, null, 32),
                            x[3] || (x[3] = ue(" Edit ", -1))
                          ]),
                          _: 1
                        }),
                        T(F, {
                          onClick: r,
                          variant: "danger",
                          appearance: "plain"
                        }, {
                          default: I(() => [
                            T(k, { ".icon": "mdi:delete" }, null, 32),
                            x[4] || (x[4] = ue(" Delete ", -1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              g("div", na, G(s.location), 1),
              g("div", oa, [
                g("div", ia, [
                  x[6] || (x[6] = g("span", { class: "text-blue-600 font-semibold" }, "Condition:", -1)),
                  g("span", ra, G(s.sensor) + " " + G(o[s.operator] ?? "=") + " " + G(Array.isArray(s.value) ? s.value.join(" or ") : s.value), 1)
                ]),
                g("div", null, [
                  x[7] || (x[7] = g("span", { class: "text-blue-600 font-semibold" }, "Action:", -1)),
                  g("span", la, G(s.description != "No description" ? s.description : "-"), 1)
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}, ca = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[8] p-4"
}, ua = { class: "flex justify-center w-full max-w-3xl" }, Pt = {
  __name: "Dialog",
  props: {
    show: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (t, s) => e.show ? (z(), be("div", ca, [
      g("div", ua, [
        ur(t.$slots, "default")
      ])
    ])) : qe("", !0);
  }
}, fa = { slot: "header" }, da = { class: "grid items-center grid-cols-1 gap-1 tablet:grid-cols-4 tablet:gap-0" }, pa = { class: "text-2xl font-medium" }, ha = { class: "flex items-center" }, ma = {
  key: 0,
  class: "text-xl font-light"
}, ga = {
  key: 0,
  class: "flex items-center"
}, _a = { class: "ml-2 flex items-center gap-1" }, ba = { class: "flex items-center justify-end gap-2 mr-5" }, va = { class: "flex items-center gap-1" }, xa = { class: "text-xl font-light mt-2 mb-6" }, wa = { class: "text-lg" }, ya = {
  key: 0,
  class: "mb-2 flex items-center"
}, Ta = { class: "ml-2" }, Ca = { class: "mb-2" }, Sa = { class: "ml-2" }, ka = { class: "mb-2 flex items-center" }, Ea = { class: "ml-2 flex items-center gap-1" }, Aa = { class: "flex items-center" }, Oa = { class: "ml-2 flex items-center gap-1" }, Ma = {
  __name: "IntervalTaskCard",
  props: {
    id: {
      type: String,
      required: !0
    },
    name: {
      type: String,
      required: !0
    },
    location: {
      type: String,
      required: !0
    },
    description: {
      type: String,
      required: !1
    },
    value: {
      type: Number,
      required: !0
    },
    overdue: {
      type: Boolean,
      required: !0
    },
    next_due: {
      type: String,
      required: !0
    },
    last_completed: {
      type: String,
      required: !1
    },
    seasonal_type: {
      type: String,
      required: !0
    },
    warning: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["deleteTask", "completeTask"],
  setup(e, { emit: t }) {
    const s = e, n = te(!1), o = t, i = () => {
      n.value = !1, o("deleteTask");
    }, r = () => {
      o("completeTask");
    }, l = () => {
      n.value = !1, o("editTask");
    }, c = te(!1), p = (d) => {
      c.value = d.detail.expanded;
    };
    return (d, h) => {
      const x = ae("ha-icon"), k = ae("ha-button"), $ = ae("ha-dropdown-item"), F = ae("ha-dropdown"), Q = ae("ha-expansion-panel"), A = ae("ha-card");
      return z(), Ae(A, {
        class: Wt(["w-full", "p-6", {
          "border-red-500": s.overdue,
          "border-yellow-500": s.warning && !s.overdue
        }])
      }, {
        default: I(() => [
          T(Q, { onExpandedChanged: p }, {
            default: I(() => [
              g("span", fa, [
                g("div", da, [
                  g("div", pa, G(s.name), 1),
                  g("div", ha, [
                    c.value ? qe("", !0) : (z(), be("div", ma, G(s.location), 1))
                  ]),
                  g("div", null, [
                    c.value ? qe("", !0) : (z(), be("div", ga, [
                      T(x, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
                      g("span", _a, [
                        h[2] || (h[2] = g("div", { class: "hidden desktop:block" }, "Next due:", -1)),
                        ue(" " + G(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
                      ])
                    ]))
                  ]),
                  g("div", ba, [
                    T(k, {
                      onClick: [
                        h[0] || (h[0] = fs(() => {
                        }, ["stop"])),
                        r
                      ],
                      appearance: "accent",
                      variant: "success",
                      class: "flex items-center gap-2"
                    }, {
                      default: I(() => [
                        g("div", va, [
                          T(x, { ".icon": "mdi:check-circle-outline" }, null, 32),
                          h[3] || (h[3] = g("span", { class: "hidden mobileL:block tablet:hidden desktop:block" }, " Complete", -1))
                        ])
                      ]),
                      _: 1
                    }),
                    T(F, {
                      onClick: h[1] || (h[1] = fs(() => {
                      }, ["stop"]))
                    }, {
                      default: I(() => [
                        T(k, {
                          slot: "trigger",
                          appearance: "plain",
                          variant: "neutral"
                        }, {
                          default: I(() => [
                            T(x, { ".icon": "mdi:dots-vertical" }, null, 32)
                          ]),
                          _: 1
                        }),
                        T($, {
                          onClick: l,
                          variant: "neutral",
                          appearance: "plain"
                        }, {
                          default: I(() => [
                            T(x, { ".icon": "mdi:pencil" }, null, 32),
                            h[4] || (h[4] = ue(" Edit ", -1))
                          ]),
                          _: 1
                        }),
                        T($, {
                          onClick: i,
                          variant: "danger",
                          appearance: "plain"
                        }, {
                          default: I(() => [
                            T(x, { ".icon": "mdi:delete" }, null, 32),
                            h[5] || (h[5] = ue(" Delete ", -1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              g("div", xa, G(s.location), 1),
              g("div", wa, [
                s.description != "No description" ? (z(), be("div", ya, [
                  h[6] || (h[6] = g("span", { class: "hidden tablet:block font-semibold" }, "Description:", -1)),
                  T(x, {
                    class: "block tablet:hidden",
                    ".icon": "mdi:book-open-variant-outline"
                  }, null, 32),
                  g("span", Ta, G(s.description), 1)
                ])) : qe("", !0),
                g("div", Ca, [
                  T(x, { ".icon": "mdi:calendar" }, null, 32),
                  g("span", Sa, "Every " + G(s.value) + " " + G(s.seasonal_type == "runtime" ? "hours" : s.seasonal_type), 1)
                ]),
                g("div", ka, [
                  T(x, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
                  g("span", Ea, [
                    h[7] || (h[7] = g("div", { class: "hidden mobileL:block" }, "Next due:", -1)),
                    ue(" " + G(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
                  ])
                ]),
                g("div", Aa, [
                  T(x, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  g("span", Oa, [
                    h[8] || (h[8] = g("div", { class: "hidden mobileL:block" }, "Last completed:", -1)),
                    ue(" " + G(s.last_completed != "" ? s.last_completed : "Notcompleted before..."), 1)
                  ])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
};
function Pa() {
  return {
    schemaNotes: Je(
      () => [
        {
          name: "Completion Notes",
          required: !1,
          selector: {
            text: {
              multiline: !0
            }
          }
        }
      ]
    )
  };
}
function Na(e, t, s, n) {
  return {
    schemaConditional: Je(
      () => [
        {
          name: "Task Name",
          required: !0,
          selector: {
            text: {}
          }
        },
        {
          name: "Location",
          required: !1,
          selector: {
            area: {}
          }
        },
        {
          name: "Description",
          required: !1,
          selector: {
            text: {
              multiline: !0
            }
          }
        },
        {
          name: "Sensor",
          required: !0,
          selector: {
            entity: {}
          }
        },
        ...e.value && e.value.length > 1 ? [
          {
            name: "Attribute",
            required: !0,
            selector: {
              select: {
                options: e.value.map((i) => i.option),
                mode: "dropdown"
              }
            }
          }
        ] : [],
        ...t.value?.control === "number" ? [
          {
            name: "Operator",
            required: !0,
            selector: {
              select: {
                options: [
                  { value: "below", label: "Below" },
                  { value: "above", label: "Above" },
                  { value: "equal", label: "Equal" }
                ],
                mode: "dropdown"
              }
            }
          },
          {
            name: "Value",
            required: !0,
            selector: {
              number: { mode: "box" }
            }
          }
        ] : [],
        ...t.value?.control === "select" ? [
          {
            name: "Value",
            required: !0,
            selector: {
              select: {
                options: t.value?.options,
                mode: "list",
                multiple: !0
              }
            }
          }
        ] : [],
        ...t.value?.control === "text" ? [
          {
            name: "Text",
            required: !1,
            selector: {
              constant: {
                value: "No attributes found",
                label: "No attributes found"
              }
            }
          },
          {
            name: "Value",
            required: !0,
            selector: {
              text: {}
            }
          }
        ] : [],
        ...t.value?.control === "None" ? [
          {
            name: "Value",
            required: !1,
            selector: {
              constant: {
                value: "No sensor found",
                label: "No sensor found"
              }
            }
          }
        ] : [],
        {
          name: "Condition Duration",
          required: !1,
          selector: {
            boolean: {}
          }
        },
        ...s.value ? [
          {
            name: "Duration",
            required: s.value,
            selector: {
              number: { min: 1, mode: "box" }
            }
          },
          {
            name: "Duration Type",
            required: s.value,
            selector: {
              select: {
                options: [
                  { value: "seconds", label: "Seconds" },
                  { value: "minutes", label: "Minutes" },
                  { value: "hours", label: "Hours" }
                ],
                mode: "dropdown"
              }
            }
          }
        ] : [],
        {
          name: "Seasonal Task",
          required: !1,
          selector: {
            boolean: {}
          }
        },
        ...n.value ? [
          {
            name: "Seasonal Interval",
            required: n.value,
            selector: {
              number: { min: 1, mode: "box" }
            }
          },
          {
            name: "Seasonal Type",
            required: n.value,
            selector: {
              select: {
                options: [
                  { value: "minutes", label: "Minutes" },
                  { value: "weeks", label: "Weeks" },
                  { value: "months", label: "Months" },
                  { value: "years", label: "Years" }
                ],
                mode: "dropdown"
              }
            }
          }
        ] : []
      ]
    )
  };
}
function $a(e, t, s) {
  return {
    schemaInterval: Je(
      () => [
        {
          name: "Task Name",
          required: !0,
          selector: {
            text: {}
          },
          label: "Task Name (e.g. Oil Change)"
        },
        {
          name: "Location",
          required: !1,
          selector: {
            area: {}
          }
        },
        {
          name: "Description",
          required: !1,
          selector: {
            text: {
              multiline: !0
            }
          }
        },
        {
          name: "Last Completed",
          required: !1,
          selector: {
            date: {}
          }
        },
        {
          name: "Interval Type",
          required: !0,
          selector: {
            select: {
              options: [
                { value: "days", label: "Days" },
                { value: "weeks", label: "Weeks" },
                { value: "months", label: "Months" },
                { value: "years", label: "Years" },
                { value: "runtime", label: "Runtime Based" }
              ],
              mode: "dropdown"
            }
          }
        },
        {
          name: "Repeat Every",
          required: !0,
          selector: {
            number: { min: 1, mode: "box" }
          },
          hint: "Task Name (e.g. Oil Change)"
        },
        ...s.value ? [] : [
          {
            name: "Fixed Interval",
            required: !1,
            selector: {
              boolean: {}
            }
          }
        ],
        ...s.value ? [
          {
            name: "Sensor",
            required: !0,
            selector: {
              entity: {
                // domain: ["sensor", "binary_sensor"]
              }
            }
          }
        ] : [],
        ...s.value && e.value && e.value.length > 1 ? [
          {
            name: "Attribute",
            required: !0,
            selector: {
              select: {
                options: e.value.map((o) => o.option),
                mode: "dropdown"
              }
            }
          }
        ] : [],
        ...s.value && t.value?.control === "number" ? [
          {
            name: "Operator",
            required: !0,
            selector: {
              select: {
                options: [
                  { value: "below", label: "Below" },
                  { value: "above", label: "Above" },
                  { value: "equal", label: "Equal" }
                ],
                mode: "dropdown"
              }
            }
          },
          {
            name: "Value",
            required: !0,
            selector: {
              number: { mode: "box" }
            }
          }
        ] : [],
        ...s.value && t.value?.control === "select" ? [
          {
            name: "Value",
            required: !0,
            selector: {
              select: {
                options: t.value?.options,
                mode: "list",
                multiple: !0
              }
            }
          }
        ] : [],
        ...s.value && t.value?.control === "None" ? [
          {
            name: "Value",
            required: !1,
            selector: {
              constant: {
                value: "No sensor found",
                label: "No sensor found"
              }
            }
          }
        ] : [],
        ...s.value && t.value?.control === "text" ? [
          {
            name: "Text",
            required: !1,
            selector: {
              constant: {
                value: "No attributes found",
                label: "No attributes found"
              }
            }
          },
          {
            name: "Value",
            required: !0,
            selector: {
              text: {}
            }
          }
        ] : []
      ]
    )
  };
}
function Ia() {
  return {
    schemaFilter: Je(
      () => [
        {
          name: "Select Filter",
          required: !1,
          selector: {
            select: {
              options: [
                { value: "areas", label: "By Areas" }
              ],
              mode: "dropdown"
            }
          }
        }
      ]
    )
  };
}
const Ra = { class: "flex flex-col gap-10 justify-center m-6" }, Da = { class: "flex items-center justify-between pb-5 flex-col tablet:flex-row gap-3 text-center tablet:text-left" }, Fa = { class: "flex flex-col flex-shrink-0 mobileM:flex-row gap-5 text-2xl items-center" }, ja = { class: "flex items-center gap-1" }, La = { class: "flex items-center gap-1" }, qa = { class: "flex items-center gap-1" }, Ha = { class: "flex items-center gap-1" }, Va = {
  key: 0,
  class: "text-2xl font-medium"
}, Ba = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, Wa = ["onClick"], Ka = { class: "truncate" }, Ua = { class: "truncate" }, za = { class: "hidden mobileL:table-cell truncate" }, Ga = { class: "hidden tablet:table-cell truncate" }, Ja = { class: "flex flex-col mb-5" }, Ya = { class: "flex gap-5 text-2xl items-center" }, Xa = { class: "flex flex-row w-full mt-4 gap-3" }, Za = { class: "flex flex-col mb-5" }, Qa = { class: "flex gap-5 text-2xl items-center" }, ec = { class: "flex flex-row w-full mt-4 gap-3" }, tc = { class: "flex flex-row w-full mt-4 gap-3" }, sc = { class: "flex flex-row w-full mt-4 gap-3" }, nc = { class: "flex flex-col" }, oc = { class: "flex gap-3 text-2xl items-center mb-2" }, ic = { class: "text-2xl font-medium" }, rc = { class: "text-lg font-medium mb-5" }, lc = { class: "w-full table-fixed border-spacing-y-3 border-spacing-x-2 text-[1.2em]" }, ac = { class: "" }, cc = { class: "break-words" }, uc = /* @__PURE__ */ Eo({
  __name: "App",
  props: {
    hass: { type: Object },
    narrow: { type: Boolean }
  },
  setup(e) {
    const t = e, s = te({}), n = te({}), o = te([]), i = te([]), r = te(), l = te([]), c = te(!1), p = te(!1), d = te(!1), h = te(!1), x = te("null"), k = te("null"), $ = te(!1), F = te(!1), Q = te(!1), A = /* @__PURE__ */ new Set(["Task Name"]), B = Je(() => o.value.length), ee = Je(() => o.value.filter((P) => P.notified).length), N = Je(() => o.value.filter((P) => P.warning && !P.notified).length), K = te("interval"), ge = te(""), ce = te("interval"), re = te(null), Se = te(null), { schemaFilter: Be } = Ia(), { schemaConditional: tt } = Na(re, Se, F, $), { schemaInterval: ct } = $a(re, Se, Q), { schemaNotes: _t } = Pa();
    ts(
      () => t.hass,
      async (P) => {
        if (P)
          try {
            const m = await Qt(P), H = await Jn(P);
            l.value = H, o.value = st(m), i.value = o.value, ut();
          } catch (m) {
            console.error("Failed to get devices:", m);
          }
      },
      { immediate: !0 }
    );
    const st = (P) => P.map((m) => {
      if (m.type == "interval") {
        if (m.seasonal_type === "runtime")
          return { ...m, warning: m.next_due <= 3600 };
        const H = new Date(m.next_due), le = /* @__PURE__ */ new Date(), a = (H.getTime() - le.getTime()) / (1e3 * 60 * 60 * 24);
        return { ...m, warning: a <= 0.5 };
      } else
        return { ...m, warning: !1 };
    }).sort((m, H) => H.notified !== m.notified ? H.notified - m.notified : H.warning !== m.warning ? Number(H.warning) - Number(m.warning) : 0), ut = () => {
      r.value == "areas" && dt();
    }, ne = () => {
      c.value = !1, h.value = !1, $.value = !1, F.value = !1, Q.value = !1, re.value = [], Se.value = {}, s.value = {};
    }, J = async () => {
      s.value.Type = ce.value, s.value.Control = Se.value?.control, s.value["Condition Duration"] === !0 ? (A.add("Duration"), A.add("Duration Type")) : (A.delete("Duration"), A.delete("Duration Type"), s.value.Duration = 0, s.value["Duration Type"] = ""), s.value["Seasonal Task"] === !0 ? (A.add("Seasonal Interval"), A.add("Seasonal Type")) : (A.delete("Seasonal Interval"), A.delete("Seasonal Type"), s.value["Seasonal Interval"] = 0, s.value["Seasonal Type"] = ""), s.value.Type == "conditional" || s.value["Interval Type"] == "runtime" ? (A.add("Sensor"), Se.value?.control == "number" ? A.add("Operator") : A.delete("Operator"), A.add("Value")) : (A.delete("Sensor"), A.delete("Operator"), A.delete("Value"), s.value.Sensor = "", s.value.Operator = "", s.value.Value = ""), s.value.Type == "interval" ? (A.add("Interval Type"), A.add("Repeat Every")) : (A.delete("Interval Type"), A.delete("Repeat Every"), s.value["Interval Type"] = "", s.value["Repeat Every"] = 0);
      for (const P of A)
        if (s.value[P] === void 0 || s.value[P] === null || s.value[P] === "") {
          alert(`Field '${P}' is required.`);
          return;
        }
      try {
        h.value ? await Wl(t.hass, s.value) : await Hl(t.hass, s.value), o.value = await Qt(t.hass), o.value = st(o.value), i.value = o.value, ut(), ne();
      } catch (P) {
        console.error("Failed to create maintenance task:", P);
      }
    }, q = async (P) => {
      if (P.detail.value.Sensor != "" && P.detail.value.Sensor != s.value.Sensor)
        try {
          const m = await Yn(t.hass, P.detail.value.Sensor);
          re.value = m, Se.value = re.value.length > 1 ? {} : re.value[0] ?? null, P.detail.value.Operator = "", P.detail.value.Value = "", P.detail.value.Attribute = "";
        } catch (m) {
          console.error("Failed to get attributes:", m);
        }
      if (d.value) {
        n.value = P.detail.value;
        return;
      }
      P.detail.value.Attribute != s.value.Attribute && (P.detail.value.Value = "", P.detail.value.Operator = ""), s.value = P.detail.value, $.value = s.value["Seasonal Task"] ?? !1, F.value = s.value["Condition Duration"] ?? !1, Q.value = s.value["Interval Type"] == "runtime", s.value.Attribute && re.value.length > 1 && (Se.value = re.value?.find((m) => m.option === s.value.Attribute) ?? null);
    }, We = async () => {
      if (t.hass)
        try {
          await Vl(t.hass, k.value), p.value = !1, k.value = "null", o.value = await Qt(t.hass), o.value = st(o.value), i.value = o.value, ut();
        } catch (P) {
          console.error("Failed to delete task: ", P);
        }
    }, bt = async () => {
      if (t.hass)
        try {
          await Bl(t.hass, x.value, n.value), d.value = !1, x.value = "null", n.value = {}, l.value = await Jn(t.hass), o.value = await Qt(t.hass), o.value = st(o.value), i.value = o.value, ut();
        } catch (P) {
          console.error("Failed to completing task: ", P);
        }
    }, Ke = (P) => {
      ge.value = l.value.find((m) => m.id === P);
    }, Me = Je(
      () => [...ge.value.completion_dates].reverse()
    ), zt = () => {
      ce.value = "interval", s.value = {}, s.value.Type = "interval";
    }, Ts = () => {
      ce.value = "conditional", s.value = {}, s.value.Type = "conditional";
    }, Gt = async (P) => {
      h.value = !0;
      const m = o.value.find((H) => H.id === P);
      if (m.sensor != "")
        try {
          const H = await Yn(t.hass, m.sensor);
          re.value = H, Se.value = re.value?.find((le) => le.option === m.option) ?? H[0] ?? null;
        } catch (H) {
          console.error("Failed to get attributes:", H);
        }
      $.value = m.seasonal, F.value = m.duration_condition, Q.value = m.seasonal_type == "runtime", ce.value = m.type, m.duration_type == "minutes" ? m.duration /= 60 : m.duration_type == "hours" && (m.duration /= 3600), s.value = {
        task_id: m.id,
        "Task Name": m.name,
        Location: m.location,
        Sensor: m.sensor,
        Value: m.value,
        Operator: m.operator,
        Description: m.description,
        Duration: m.duration,
        "Duration Type": m.duration_type,
        "Seasonal Interval": m.seasonal_interval,
        "Seasonal Type": m.seasonal_type,
        "Condition Duration": m.duration_condition,
        "Seasonal Task": m.seasonal,
        Type: m.type,
        "Fixed Interval": m.fixed,
        "Last Completed": m.last_completed,
        "Repeat Every": m.seasonal_interval,
        "Interval Type": m.seasonal_type,
        Attribute: m.option
      };
    }, ft = async (P) => {
      switch (r.value = P.detail.value["Select Filter"], r.value) {
        case "areas":
          dt();
          break;
        default:
          i.value = o.value;
          break;
      }
    }, dt = () => {
      const P = {};
      o.value.forEach((m) => {
        P[m.location] || (P[m.location] = []), P[m.location].push(m);
      }), i.value = Object.entries(P).flatMap(([m, H]) => H);
    };
    return (P, m) => {
      const H = ae("ha-icon"), le = ae("ha-button"), a = ae("ha-form"), u = ae("ha-card");
      return z(), be(de, null, [
        t.hass ? (z(), Ae(Jl, {
          key: 0,
          hass: t.hass,
          narrow: t.narrow
        }, null, 8, ["hass", "narrow"])) : qe("", !0),
        g("div", Ra, [
          T(ql, {
            totalTasks: B.value,
            upcomingTasks: N.value,
            overdueTasks: ee.value
          }, null, 8, ["totalTasks", "upcomingTasks", "overdueTasks"]),
          T(u, { class: "flex flex-col p-6 gap-5" }, {
            default: I(() => [
              g("div", Da, [
                m[8] || (m[8] = g("div", { class: "flex flex-col" }, [
                  g("div", { class: "text-2xl font-medium tablet:mb-0 mb-3" }, "Maintenance Tasks"),
                  g("div", { class: "hidden mobileM:block text-xl" }, "Manage scheduled and conditional maintenance for your smart devices")
                ], -1)),
                g("div", Fa, [
                  T(le, {
                    onClick: m[0] || (m[0] = (f) => c.value = !0)
                  }, {
                    default: I(() => [
                      g("div", ja, [
                        T(H, {
                          class: "text-white",
                          ".icon": "mdi:plus"
                        }, null, 32),
                        m[7] || (m[7] = g("span", null, "New Task", -1))
                      ])
                    ]),
                    _: 1
                  }),
                  T(a, {
                    ".hass": t.hass,
                    ".schema": nt(Be),
                    onValueChanged: ft
                  }, null, 40, [".hass", ".schema"])
                ])
              ]),
              T(u, { class: "flex w-full p-1 gap-1 rounded-full" }, {
                default: I(() => [
                  T(le, {
                    onClick: m[1] || (m[1] = (f) => K.value = "interval"),
                    class: "flex items-center flex-1",
                    variant: "neutral",
                    appearance: K.value === "interval" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: I(() => [
                      g("div", La, [
                        T(H, {
                          variant: "neutral",
                          ".icon": "mdi:calendar-blank"
                        }, null, 32),
                        m[9] || (m[9] = g("span", { class: "hidden tablet:block" }, " Interval tasks", -1))
                      ])
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(le, {
                    onClick: m[2] || (m[2] = (f) => K.value = "conditional"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: K.value === "conditional" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: I(() => [
                      g("div", qa, [
                        T(H, {
                          variant: "neutral",
                          ".icon": "mdi:triangle-wave"
                        }, null, 32),
                        m[10] || (m[10] = g("span", { class: "hidden tablet:block" }, " Conditional tasks", -1))
                      ])
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(le, {
                    onClick: m[3] || (m[3] = (f) => K.value = "history"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: K.value === "history" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: I(() => [
                      g("div", Ha, [
                        T(H, {
                          variant: "neutral",
                          ".icon": "mdi:history"
                        }, null, 32),
                        m[11] || (m[11] = g("span", { class: "hidden tablet:block" }, " History", -1))
                      ])
                    ]),
                    _: 1
                  }, 8, ["appearance"])
                ]),
                _: 1
              }),
              B.value == 0 ? (z(), be("div", Va, "No tasks created yet...")) : qe("", !0),
              K.value === "conditional" ? (z(!0), be(de, { key: 1 }, Zt(i.value.filter((f) => f.type == "conditional"), (f) => (z(), Ae(aa, {
                key: f.id,
                id: f.id,
                name: f.name,
                location: f.location_name,
                description: f.description,
                sensor: f.sensor,
                operator: f.operator,
                value: f.value,
                overdue: f.notified,
                onDeleteTask: (_) => {
                  p.value = !0, k.value = f.id;
                },
                onCompleteTask: (_) => {
                  d.value = !0, x.value = f.id;
                },
                onEditTask: (_) => Gt(f.id)
              }, null, 8, ["id", "name", "location", "description", "sensor", "operator", "value", "overdue", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : qe("", !0),
              K.value === "interval" ? (z(!0), be(de, { key: 2 }, Zt(i.value.filter((f) => f.type == "interval"), (f) => (z(), Ae(Ma, {
                key: f.id,
                id: f.id,
                name: f.name,
                location: f.location_name,
                description: f.description,
                value: f.seasonal_interval,
                overdue: f.notified,
                next_due: f.next_due,
                last_completed: f.last_completed,
                seasonal_type: f.seasonal_type,
                warning: f.warning,
                onDeleteTask: (_) => {
                  p.value = !0, k.value = f.id;
                },
                onCompleteTask: (_) => {
                  d.value = !0, x.value = f.id;
                },
                onEditTask: (_) => Gt(f.id)
              }, null, 8, ["id", "name", "location", "description", "value", "overdue", "next_due", "last_completed", "seasonal_type", "warning", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : qe("", !0),
              K.value === "history" ? (z(), Ae(u, {
                key: 3,
                class: "w-full p-4"
              }, {
                default: I(() => [
                  g("table", Ba, [
                    m[12] || (m[12] = g("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      g("tr", null, [
                        g("th", null, "Task Name"),
                        g("th", { class: "truncate" }, "Location"),
                        g("th", { class: "hidden mobileL:table-cell" }, "Date"),
                        g("th", { class: "hidden tablet:table-cell" }, "Note")
                      ])
                    ], -1)),
                    g("tbody", null, [
                      (z(!0), be(de, null, Zt(l.value, (f) => (z(), be("tr", {
                        onClick: (_) => Ke(f.id),
                        class: "cursor-pointer",
                        key: f.id
                      }, [
                        g("td", Ka, G(f.name), 1),
                        g("td", Ua, G(f.location_name), 1),
                        g("td", za, G(f.completion_dates.at(-1).date.replace("T", " ")), 1),
                        g("td", Ga, G(f.completion_dates.at(-1).note), 1)
                      ], 8, Wa))), 128))
                    ])
                  ])
                ]),
                _: 1
              })) : qe("", !0)
            ]),
            _: 1
          }),
          T(Pt, { show: c.value }, {
            default: I(() => [
              T(u, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: I(() => [
                  g("div", Ja, [
                    g("div", Ya, [
                      T(H, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: ne
                      }, null, 32),
                      m[13] || (m[13] = g("div", { class: "flex-shrink-0" }, "Create Maintenance Task", -1))
                    ])
                  ]),
                  T(u, { class: "mb-2 flex w-full p-1 gap-1 rounded-full" }, {
                    default: I(() => [
                      T(le, {
                        onClick: zt,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ce.value === "interval" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: I(() => [...m[14] || (m[14] = [
                          ue("Interval tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"]),
                      T(le, {
                        onClick: Ts,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ce.value === "conditional" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: I(() => [...m[15] || (m[15] = [
                          ue("Conditional tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"])
                    ]),
                    _: 1
                  }),
                  ce.value == "conditional" ? (z(), Ae(a, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": nt(tt),
                    onValueChanged: q
                  }, null, 40, [".hass", ".schema"])) : (z(), Ae(a, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": nt(ct),
                    onValueChanged: q
                  }, null, 40, [".hass", ".schema"])),
                  g("div", Xa, [
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: ne
                    }, {
                      default: I(() => [...m[16] || (m[16] = [
                        ue("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      onClick: J
                    }, {
                      default: I(() => [...m[17] || (m[17] = [
                        ue("Create", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, { show: h.value }, {
            default: I(() => [
              T(u, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: I(() => [
                  g("div", Za, [
                    g("div", Qa, [
                      T(H, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: ne
                      }, null, 32),
                      m[18] || (m[18] = g("div", { class: "flex-shrink-0" }, "Edit Maintenance Task", -1))
                    ])
                  ]),
                  s.value.Type == "conditional" ? (z(), Ae(a, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": nt(tt),
                    ".data": s.value,
                    onValueChanged: q
                  }, null, 40, [".hass", ".schema", ".data"])) : (z(), Ae(a, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": nt(ct),
                    ".data": s.value,
                    onValueChanged: q
                  }, null, 40, [".hass", ".schema", ".data"])),
                  g("div", ec, [
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: ne
                    }, {
                      default: I(() => [...m[19] || (m[19] = [
                        ue("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      onClick: J
                    }, {
                      default: I(() => [...m[20] || (m[20] = [
                        ue("Edit", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, { show: p.value }, {
            default: I(() => [
              T(u, { class: "p-6 flex flex-col" }, {
                default: I(() => [
                  m[23] || (m[23] = g("div", { class: "flex flex-col" }, [
                    g("div", { class: "text-2xl font-medium mb-5" }, "Create Maintenance Task"),
                    g("div", { class: "text-lg font-medium mb-5" }, "Are you sure you want to delete this maintenance task? This action cannot be undone.")
                  ], -1)),
                  g("div", tc, [
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[4] || (m[4] = (f) => p.value = !1)
                    }, {
                      default: I(() => [...m[21] || (m[21] = [
                        ue("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "danger",
                      onClick: We
                    }, {
                      default: I(() => [...m[22] || (m[22] = [
                        ue("Delete", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, { show: d.value }, {
            default: I(() => [
              T(u, { class: "p-6 flex flex-col" }, {
                default: I(() => [
                  m[26] || (m[26] = g("div", { class: "flex flex-col" }, [
                    g("div", { class: "text-2xl font-medium mb-5" }, "Mark as Complete"),
                    g("div", { class: "text-lg font-medium mb-5" }, "Add any notes about completing this maintenance task (optional).")
                  ], -1)),
                  T(a, {
                    ".hass": t.hass,
                    ".schema": nt(_t),
                    onValueChanged: q
                  }, null, 40, [".hass", ".schema"]),
                  g("div", sc, [
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[5] || (m[5] = (f) => d.value = !1)
                    }, {
                      default: I(() => [...m[24] || (m[24] = [
                        ue("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(le, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "brand",
                      onClick: bt
                    }, {
                      default: I(() => [...m[25] || (m[25] = [
                        ue("Mark Complete", -1)
                      ])]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"]),
          T(Pt, {
            show: ge.value !== ""
          }, {
            default: I(() => [
              T(u, { class: "p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide" }, {
                default: I(() => [
                  g("div", nc, [
                    g("div", oc, [
                      T(H, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: m[6] || (m[6] = (f) => ge.value = "")
                      }, null, 32),
                      g("div", ic, G(ge.value.name) + "'s history", 1)
                    ]),
                    g("div", rc, G(ge.value.location_name), 1)
                  ]),
                  g("table", lc, [
                    m[27] || (m[27] = g("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      g("tr", null, [
                        g("th", null, "Date"),
                        g("th", null, "Note")
                      ])
                    ], -1)),
                    g("tbody", null, [
                      (z(!0), be(de, null, Zt(Me.value, (f) => (z(), be("tr", null, [
                        g("td", ac, G(f.date.replace("T", " ")), 1),
                        g("td", cc, G(f.note), 1)
                      ]))), 256))
                    ])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["show"])
        ])
      ], 64);
    };
  }
}), fc = "*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\\[8\\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.box-border{box-sizing:border-box}.block{display:block}.flex{display:flex}.table{display:table}.grid{display:grid}.hidden{display:none}.max-h-\\[80vh\\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-x-1{--tw-border-spacing-x: .25rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.border-spacing-x-2{--tw-border-spacing-x: .5rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-ellipsis{text-overflow:ellipsis}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5}.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-center{text-align:center}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[1\\.1em\\]{font-size:1.1em}.text-\\[1\\.2em\\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.leading-5{line-height:1.25rem}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}@media(min-width:375px){.mobileM\\:block{display:block}.mobileM\\:flex-row{flex-direction:row}}@media(min-width:425px){.mobileL\\:ml-6{margin-left:1.5rem}.mobileL\\:block{display:block}.mobileL\\:table-cell{display:table-cell}}@media(min-width:768px){.tablet\\:mb-0{margin-bottom:0}.tablet\\:block{display:block}.tablet\\:flex{display:flex}.tablet\\:table-cell{display:table-cell}.tablet\\:hidden{display:none}.tablet\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.tablet\\:flex-row{flex-direction:row}.tablet\\:gap-0{gap:0px}.tablet\\:gap-8{gap:2rem}.tablet\\:text-left{text-align:left}}@media(min-width:1440px){.desktop\\:block{display:block}}", dc = /* @__PURE__ */ si(uc, [["styles", [fc]]]), pc = /* @__PURE__ */ yl(dc);

if(!customElements.get("maintenance-manager-panel", pc)){
    customElements.define("maintenance-manager-panel", pc);
}