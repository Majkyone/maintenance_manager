/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ks(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Y = {}, xt = [], Ve = () => {
}, Xn = () => !1, us = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), zs = (e) => e.startsWith("onUpdate:"), le = Object.assign, Gs = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, no = Object.prototype.hasOwnProperty, L = (e, t) => no.call(e, t), N = Array.isArray, yt = (e) => fs(e) === "[object Map]", Zn = (e) => fs(e) === "[object Set]", F = (e) => typeof e == "function", ie = (e) => typeof e == "string", tt = (e) => typeof e == "symbol", ee = (e) => e !== null && typeof e == "object", Qn = (e) => (ee(e) || F(e)) && F(e.then) && F(e.catch), er = Object.prototype.toString, fs = (e) => er.call(e), ro = (e) => fs(e).slice(8, -1), ds = (e) => fs(e) === "[object Object]", Js = (e) => ie(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $t = /* @__PURE__ */ Ks(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), ps = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, oo = /-\w/g, ye = ps(
  (e) => e.replace(oo, (t) => t.slice(1).toUpperCase())
), io = /\B([A-Z])/g, Ie = ps(
  (e) => e.replace(io, "-$1").toLowerCase()
), hs = ps((e) => e.charAt(0).toUpperCase() + e.slice(1)), ws = ps(
  (e) => e ? `on${hs(e)}` : ""
), ct = (e, t) => !Object.is(e, t), Ss = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, tr = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, lo = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, _n = (e) => {
  const t = ie(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let vn;
const ms = () => vn || (vn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ys(e) {
  if (N(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = ie(n) ? fo(n) : Ys(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (ie(e) || ee(e))
    return e;
}
const ao = /;(?![^(]*\))/g, co = /:([^]+)/, uo = /\/\*[^]*?\*\//g;
function fo(e) {
  const t = {};
  return e.replace(uo, "").split(ao).forEach((s) => {
    if (s) {
      const n = s.split(co);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Wt(e) {
  let t = "";
  if (ie(e))
    t = e;
  else if (N(e))
    for (let s = 0; s < e.length; s++) {
      const n = Wt(e[s]);
      n && (t += n + " ");
    }
  else if (ee(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const po = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ho = /* @__PURE__ */ Ks(po);
function sr(e) {
  return !!e || e === "";
}
const nr = (e) => !!(e && e.__v_isRef === !0), Z = (e) => ie(e) ? e : e == null ? "" : N(e) || ee(e) && (e.toString === er || !F(e.toString)) ? nr(e) ? Z(e.value) : JSON.stringify(e, rr, 2) : String(e), rr = (e, t) => nr(t) ? rr(e, t.value) : yt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], o) => (s[Ts(n, o) + " =>"] = r, s),
    {}
  )
} : Zn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Ts(s))
} : tt(t) ? Ts(t) : ee(t) && !N(t) && !ds(t) ? String(t) : t, Ts = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    tt(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Te;
class mo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Te, !t && Te && (this.index = (Te.scopes || (Te.scopes = [])).push(
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
      const s = Te;
      try {
        return Te = this, t();
      } finally {
        Te = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Te, Te = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Te = this.prevScope, this.prevScope = void 0);
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
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function go() {
  return Te;
}
let J;
const Cs = /* @__PURE__ */ new WeakSet();
class or {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Te && Te.active && Te.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Cs.has(this) && (Cs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || lr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, bn(this), ar(this);
    const t = J, s = Ne;
    J = this, Ne = !0;
    try {
      return this.fn();
    } finally {
      cr(this), J = t, Ne = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Qs(t);
      this.deps = this.depsTail = void 0, bn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Cs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ns(this) && this.run();
  }
  get dirty() {
    return Ns(this);
  }
}
let ir = 0, Nt, Dt;
function lr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Dt, Dt = e;
    return;
  }
  e.next = Nt, Nt = e;
}
function Xs() {
  ir++;
}
function Zs() {
  if (--ir > 0)
    return;
  if (Dt) {
    let t = Dt;
    for (Dt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Nt; ) {
    let t = Nt;
    for (Nt = void 0; t; ) {
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
function ar(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function cr(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), Qs(n), _o(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function Ns(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ur(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ur(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ht) || (e.globalVersion = Ht, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ns(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = J, n = Ne;
  J = e, Ne = !0;
  try {
    ar(e);
    const r = e.fn(e._value);
    (t.version === 0 || ct(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    J = s, Ne = n, cr(e), e.flags &= -3;
  }
}
function Qs(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep)
      Qs(o, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function _o(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ne = !0;
const fr = [];
function Ze() {
  fr.push(Ne), Ne = !1;
}
function Qe() {
  const e = fr.pop();
  Ne = e === void 0 ? !0 : e;
}
function bn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = J;
    J = void 0;
    try {
      t();
    } finally {
      J = s;
    }
  }
}
let Ht = 0;
class vo {
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
    if (!J || !Ne || J === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== J)
      s = this.activeLink = new vo(J, this), J.deps ? (s.prevDep = J.depsTail, J.depsTail.nextDep = s, J.depsTail = s) : J.deps = J.depsTail = s, dr(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = J.depsTail, s.nextDep = void 0, J.depsTail.nextDep = s, J.depsTail = s, J.deps === s && (J.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Ht++, this.notify(t);
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
function dr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        dr(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Ds = /* @__PURE__ */ new WeakMap(), mt = Symbol(
  ""
), Fs = Symbol(
  ""
), Lt = Symbol(
  ""
);
function pe(e, t, s) {
  if (Ne && J) {
    let n = Ds.get(e);
    n || Ds.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new en()), r.map = n, r.key = s), r.track();
  }
}
function Ye(e, t, s, n, r, o) {
  const i = Ds.get(e);
  if (!i) {
    Ht++;
    return;
  }
  const a = (c) => {
    c && c.trigger();
  };
  if (Xs(), t === "clear")
    i.forEach(a);
  else {
    const c = N(e), d = c && Js(s);
    if (c && s === "length") {
      const u = Number(n);
      i.forEach((p, y) => {
        (y === "length" || y === Lt || !tt(y) && y >= u) && a(p);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && a(i.get(s)), d && a(i.get(Lt)), t) {
        case "add":
          c ? d && a(i.get("length")) : (a(i.get(mt)), yt(e) && a(i.get(Fs)));
          break;
        case "delete":
          c || (a(i.get(mt)), yt(e) && a(i.get(Fs)));
          break;
        case "set":
          yt(e) && a(i.get(mt));
          break;
      }
  }
  Zs();
}
function vt(e) {
  const t = V(e);
  return t === e ? t : (pe(t, "iterate", Lt), Re(e) ? t : t.map(fe));
}
function gs(e) {
  return pe(e = V(e), "iterate", Lt), e;
}
const bo = {
  __proto__: null,
  [Symbol.iterator]() {
    return Es(this, Symbol.iterator, fe);
  },
  concat(...e) {
    return vt(this).concat(
      ...e.map((t) => N(t) ? vt(t) : t)
    );
  },
  entries() {
    return Es(this, "entries", (e) => (e[1] = fe(e[1]), e));
  },
  every(e, t) {
    return Ge(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ge(this, "filter", e, t, (s) => s.map(fe), arguments);
  },
  find(e, t) {
    return Ge(this, "find", e, t, fe, arguments);
  },
  findIndex(e, t) {
    return Ge(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ge(this, "findLast", e, t, fe, arguments);
  },
  findLastIndex(e, t) {
    return Ge(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ge(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return As(this, "includes", e);
  },
  indexOf(...e) {
    return As(this, "indexOf", e);
  },
  join(e) {
    return vt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return As(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ge(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return kt(this, "pop");
  },
  push(...e) {
    return kt(this, "push", e);
  },
  reduce(e, ...t) {
    return xn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return xn(this, "reduceRight", e, t);
  },
  shift() {
    return kt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ge(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return kt(this, "splice", e);
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
    return kt(this, "unshift", e);
  },
  values() {
    return Es(this, "values", fe);
  }
};
function Es(e, t, s) {
  const n = gs(e), r = n[t]();
  return n !== e && !Re(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = s(o.value)), o;
  }), r;
}
const xo = Array.prototype;
function Ge(e, t, s, n, r, o) {
  const i = gs(e), a = i !== e && !Re(e), c = i[t];
  if (c !== xo[t]) {
    const p = c.apply(e, o);
    return a ? fe(p) : p;
  }
  let d = s;
  i !== e && (a ? d = function(p, y) {
    return s.call(this, fe(p), y, e);
  } : s.length > 2 && (d = function(p, y) {
    return s.call(this, p, y, e);
  }));
  const u = c.call(i, d, n);
  return a && r ? r(u) : u;
}
function xn(e, t, s, n) {
  const r = gs(e);
  let o = s;
  return r !== e && (Re(e) ? s.length > 3 && (o = function(i, a, c) {
    return s.call(this, i, a, c, e);
  }) : o = function(i, a, c) {
    return s.call(this, i, fe(a), c, e);
  }), r[t](o, ...n);
}
function As(e, t, s) {
  const n = V(e);
  pe(n, "iterate", Lt);
  const r = n[t](...s);
  return (r === -1 || r === !1) && rn(s[0]) ? (s[0] = V(s[0]), n[t](...s)) : r;
}
function kt(e, t, s = []) {
  Ze(), Xs();
  const n = V(e)[t].apply(e, s);
  return Zs(), Qe(), n;
}
const yo = /* @__PURE__ */ Ks("__proto__,__v_isRef,__isVue"), pr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(tt)
);
function wo(e) {
  tt(e) || (e = String(e));
  const t = V(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
class hr {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (s === "__v_isReactive")
      return !r;
    if (s === "__v_isReadonly")
      return r;
    if (s === "__v_isShallow")
      return o;
    if (s === "__v_raw")
      return n === (r ? o ? Io : vr : o ? _r : gr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = N(t);
    if (!r) {
      let c;
      if (i && (c = bo[s]))
        return c;
      if (s === "hasOwnProperty")
        return wo;
    }
    const a = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      me(t) ? t : n
    );
    if ((tt(s) ? pr.has(s) : yo(s)) || (r || pe(t, "get", s), o))
      return a;
    if (me(a)) {
      const c = i && Js(s) ? a : a.value;
      return r && ee(c) ? qs(c) : c;
    }
    return ee(a) ? r ? qs(a) : sn(a) : a;
  }
}
class mr extends hr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let o = t[s];
    if (!this._isShallow) {
      const c = ut(o);
      if (!Re(n) && !ut(n) && (o = V(o), n = V(n)), !N(t) && me(o) && !me(n))
        return c || (o.value = n), !0;
    }
    const i = N(t) && Js(s) ? Number(s) < t.length : L(t, s), a = Reflect.set(
      t,
      s,
      n,
      me(t) ? t : r
    );
    return t === V(r) && (i ? ct(n, o) && Ye(t, "set", s, n) : Ye(t, "add", s, n)), a;
  }
  deleteProperty(t, s) {
    const n = L(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Ye(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!tt(s) || !pr.has(s)) && pe(t, "has", s), n;
  }
  ownKeys(t) {
    return pe(
      t,
      "iterate",
      N(t) ? "length" : mt
    ), Reflect.ownKeys(t);
  }
}
class So extends hr {
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
const To = /* @__PURE__ */ new mr(), Co = /* @__PURE__ */ new So(), Eo = /* @__PURE__ */ new mr(!0);
const js = (e) => e, Jt = (e) => Reflect.getPrototypeOf(e);
function Ao(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = V(r), i = yt(o), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, d = r[e](...n), u = s ? js : t ? ns : fe;
    return !t && pe(
      o,
      "iterate",
      c ? Fs : mt
    ), {
      // iterator protocol
      next() {
        const { value: p, done: y } = d.next();
        return y ? { value: p, done: y } : {
          value: a ? [u(p[0]), u(p[1])] : u(p),
          done: y
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
function Oo(e, t) {
  const s = {
    get(r) {
      const o = this.__v_raw, i = V(o), a = V(r);
      e || (ct(r, a) && pe(i, "get", r), pe(i, "get", a));
      const { has: c } = Jt(i), d = t ? js : e ? ns : fe;
      if (c.call(i, r))
        return d(o.get(r));
      if (c.call(i, a))
        return d(o.get(a));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && pe(V(r), "iterate", mt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = V(o), a = V(r);
      return e || (ct(r, a) && pe(i, "has", r), pe(i, "has", a)), r === a ? o.has(r) : o.has(r) || o.has(a);
    },
    forEach(r, o) {
      const i = this, a = i.__v_raw, c = V(a), d = t ? js : e ? ns : fe;
      return !e && pe(c, "iterate", mt), a.forEach((u, p) => r.call(o, d(u), d(p), i));
    }
  };
  return le(
    s,
    e ? {
      add: Yt("add"),
      set: Yt("set"),
      delete: Yt("delete"),
      clear: Yt("clear")
    } : {
      add(r) {
        !t && !Re(r) && !ut(r) && (r = V(r));
        const o = V(this);
        return Jt(o).has.call(o, r) || (o.add(r), Ye(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !Re(o) && !ut(o) && (o = V(o));
        const i = V(this), { has: a, get: c } = Jt(i);
        let d = a.call(i, r);
        d || (r = V(r), d = a.call(i, r));
        const u = c.call(i, r);
        return i.set(r, o), d ? ct(o, u) && Ye(i, "set", r, o) : Ye(i, "add", r, o), this;
      },
      delete(r) {
        const o = V(this), { has: i, get: a } = Jt(o);
        let c = i.call(o, r);
        c || (r = V(r), c = i.call(o, r)), a && a.call(o, r);
        const d = o.delete(r);
        return c && Ye(o, "delete", r, void 0), d;
      },
      clear() {
        const r = V(this), o = r.size !== 0, i = r.clear();
        return o && Ye(
          r,
          "clear",
          void 0,
          void 0
        ), i;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    s[r] = Ao(r, e, t);
  }), s;
}
function tn(e, t) {
  const s = Oo(e, t);
  return (n, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    L(s, r) && r in n ? s : n,
    r,
    o
  );
}
const Mo = {
  get: /* @__PURE__ */ tn(!1, !1)
}, ko = {
  get: /* @__PURE__ */ tn(!1, !0)
}, Po = {
  get: /* @__PURE__ */ tn(!0, !1)
};
const gr = /* @__PURE__ */ new WeakMap(), _r = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap();
function Ro(e) {
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
function $o(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Ro(ro(e));
}
function sn(e) {
  return ut(e) ? e : nn(
    e,
    !1,
    To,
    Mo,
    gr
  );
}
function No(e) {
  return nn(
    e,
    !1,
    Eo,
    ko,
    _r
  );
}
function qs(e) {
  return nn(
    e,
    !0,
    Co,
    Po,
    vr
  );
}
function nn(e, t, s, n, r) {
  if (!ee(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = $o(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const a = new Proxy(
    e,
    o === 2 ? n : s
  );
  return r.set(e, a), a;
}
function wt(e) {
  return ut(e) ? wt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ut(e) {
  return !!(e && e.__v_isReadonly);
}
function Re(e) {
  return !!(e && e.__v_isShallow);
}
function rn(e) {
  return e ? !!e.__v_raw : !1;
}
function V(e) {
  const t = e && e.__v_raw;
  return t ? V(t) : e;
}
function Do(e) {
  return !L(e, "__v_skip") && Object.isExtensible(e) && tr(e, "__v_skip", !0), e;
}
const fe = (e) => ee(e) ? sn(e) : e, ns = (e) => ee(e) ? qs(e) : e;
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ne(e) {
  return Fo(e, !1);
}
function Fo(e, t) {
  return me(e) ? e : new jo(e, t);
}
class jo {
  constructor(t, s) {
    this.dep = new en(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : V(t), this._value = s ? t : fe(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Re(t) || ut(t);
    t = n ? t : V(t), ct(t, s) && (this._rawValue = t, this._value = n ? t : fe(t), this.dep.trigger());
  }
}
function rt(e) {
  return me(e) ? e.value : e;
}
const qo = {
  get: (e, t, s) => t === "__v_raw" ? e : rt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return me(r) && !me(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function br(e) {
  return wt(e) ? e : new Proxy(e, qo);
}
class Ho {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new en(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ht - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    J !== this)
      return lr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ur(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Lo(e, t, s = !1) {
  let n, r;
  return F(e) ? n = e : (n = e.get, r = e.set), new Ho(n, r, s);
}
const Xt = {}, rs = /* @__PURE__ */ new WeakMap();
let ht;
function Vo(e, t = !1, s = ht) {
  if (s) {
    let n = rs.get(s);
    n || rs.set(s, n = []), n.push(e);
  }
}
function Bo(e, t, s = Y) {
  const { immediate: n, deep: r, once: o, scheduler: i, augmentJob: a, call: c } = s, d = (I) => r ? I : Re(I) || r === !1 || r === 0 ? lt(I, 1) : lt(I);
  let u, p, y, E, R = !1, j = !1;
  if (me(e) ? (p = () => e.value, R = Re(e)) : wt(e) ? (p = () => d(e), R = !0) : N(e) ? (j = !0, R = e.some((I) => wt(I) || Re(I)), p = () => e.map((I) => {
    if (me(I))
      return I.value;
    if (wt(I))
      return d(I);
    if (F(I))
      return c ? c(I, 2) : I();
  })) : F(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (y) {
      Ze();
      try {
        y();
      } finally {
        Qe();
      }
    }
    const I = ht;
    ht = u;
    try {
      return c ? c(e, 3, [E]) : e(E);
    } finally {
      ht = I;
    }
  } : p = Ve, t && r) {
    const I = p, B = r === !0 ? 1 / 0 : r;
    p = () => lt(I(), B);
  }
  const te = go(), O = () => {
    u.stop(), te && te.active && Gs(te.effects, u);
  };
  if (o && t) {
    const I = t;
    t = (...B) => {
      I(...B), O();
    };
  }
  let W = j ? new Array(e.length).fill(Xt) : Xt;
  const Q = (I) => {
    if (!(!(u.flags & 1) || !u.dirty && !I))
      if (t) {
        const B = u.run();
        if (r || R || (j ? B.some((ge, ue) => ct(ge, W[ue])) : ct(B, W))) {
          y && y();
          const ge = ht;
          ht = u;
          try {
            const ue = [
              B,
              // pass undefined as the old value when it's changed for the first time
              W === Xt ? void 0 : j && W[0] === Xt ? [] : W,
              E
            ];
            W = B, c ? c(t, 3, ue) : (
              // @ts-expect-error
              t(...ue)
            );
          } finally {
            ht = ge;
          }
        }
      } else
        u.run();
  };
  return a && a(Q), u = new or(p), u.scheduler = i ? () => i(Q, !1) : Q, E = (I) => Vo(I, !1, u), y = u.onStop = () => {
    const I = rs.get(u);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const B of I) B();
      rs.delete(u);
    }
  }, t ? n ? Q(!0) : W = u.run() : i ? i(Q.bind(null, !0), !0) : u.run(), O.pause = u.pause.bind(u), O.resume = u.resume.bind(u), O.stop = O, O;
}
function lt(e, t = 1 / 0, s) {
  if (t <= 0 || !ee(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, me(e))
    lt(e.value, t, s);
  else if (N(e))
    for (let n = 0; n < e.length; n++)
      lt(e[n], t, s);
  else if (Zn(e) || yt(e))
    e.forEach((n) => {
      lt(n, t, s);
    });
  else if (ds(e)) {
    for (const n in e)
      lt(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && lt(e[n], t, s);
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
  } catch (r) {
    _s(r, t, s);
  }
}
function Be(e, t, s, n) {
  if (F(e)) {
    const r = Kt(e, t, s, n);
    return r && Qn(r) && r.catch((o) => {
      _s(o, t, s);
    }), r;
  }
  if (N(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Be(e[o], t, s, n));
    return r;
  }
}
function _s(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Y;
  if (t) {
    let a = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; a; ) {
      const u = a.ec;
      if (u) {
        for (let p = 0; p < u.length; p++)
          if (u[p](e, c, d) === !1)
            return;
      }
      a = a.parent;
    }
    if (o) {
      Ze(), Kt(o, null, 10, [
        e,
        c,
        d
      ]), Qe();
      return;
    }
  }
  Uo(e, s, r, n, i);
}
function Uo(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const be = [];
let He = -1;
const St = [];
let ot = null, bt = 0;
const xr = /* @__PURE__ */ Promise.resolve();
let os = null;
function yr(e) {
  const t = os || xr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Wo(e) {
  let t = He + 1, s = be.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = be[n], o = Vt(r);
    o < e || o === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function on(e) {
  if (!(e.flags & 1)) {
    const t = Vt(e), s = be[be.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Vt(s) ? be.push(e) : be.splice(Wo(t), 0, e), e.flags |= 1, wr();
  }
}
function wr() {
  os || (os = xr.then(Tr));
}
function Ko(e) {
  N(e) ? St.push(...e) : ot && e.id === -1 ? ot.splice(bt + 1, 0, e) : e.flags & 1 || (St.push(e), e.flags |= 1), wr();
}
function yn(e, t, s = He + 1) {
  for (; s < be.length; s++) {
    const n = be[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      be.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Sr(e) {
  if (St.length) {
    const t = [...new Set(St)].sort(
      (s, n) => Vt(s) - Vt(n)
    );
    if (St.length = 0, ot) {
      ot.push(...t);
      return;
    }
    for (ot = t, bt = 0; bt < ot.length; bt++) {
      const s = ot[bt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    ot = null, bt = 0;
  }
}
const Vt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Tr(e) {
  try {
    for (He = 0; He < be.length; He++) {
      const t = be[He];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Kt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; He < be.length; He++) {
      const t = be[He];
      t && (t.flags &= -2);
    }
    He = -1, be.length = 0, Sr(), os = null, (be.length || St.length) && Tr();
  }
}
let xe = null, Cr = null;
function is(e) {
  const t = xe;
  return xe = e, Cr = e && e.type.__scopeId || null, t;
}
function D(e, t = xe, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && In(-1);
    const o = is(t);
    let i;
    try {
      i = e(...r);
    } finally {
      is(o), n._d && In(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function dt(e, t, s, n) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    o && (a.oldValue = o[i].value);
    let c = a.dir[n];
    c && (Ze(), Be(c, s, 8, [
      e.el,
      a,
      e,
      t
    ]), Qe());
  }
}
const zo = Symbol("_vte"), Go = (e) => e.__isTeleport, Jo = Symbol("_leaveCb");
function ln(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ln(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Er(e, t) {
  return F(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    le({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ar(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const ls = /* @__PURE__ */ new WeakMap();
function Ft(e, t, s, n, r = !1) {
  if (N(e)) {
    e.forEach(
      (R, j) => Ft(
        R,
        t && (N(t) ? t[j] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (Tt(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Ft(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? dn(n.component) : n.el, i = r ? null : o, { i: a, r: c } = e, d = t && t.r, u = a.refs === Y ? a.refs = {} : a.refs, p = a.setupState, y = V(p), E = p === Y ? Xn : (R) => L(y, R);
  if (d != null && d !== c) {
    if (wn(t), ie(d))
      u[d] = null, E(d) && (p[d] = null);
    else if (me(d)) {
      d.value = null;
      const R = t;
      R.k && (u[R.k] = null);
    }
  }
  if (F(c))
    Kt(c, a, 12, [i, u]);
  else {
    const R = ie(c), j = me(c);
    if (R || j) {
      const te = () => {
        if (e.f) {
          const O = R ? E(c) ? p[c] : u[c] : c.value;
          if (r)
            N(O) && Gs(O, o);
          else if (N(O))
            O.includes(o) || O.push(o);
          else if (R)
            u[c] = [o], E(c) && (p[c] = u[c]);
          else {
            const W = [o];
            c.value = W, e.k && (u[e.k] = W);
          }
        } else R ? (u[c] = i, E(c) && (p[c] = i)) : j && (c.value = i, e.k && (u[e.k] = i));
      };
      if (i) {
        const O = () => {
          te(), ls.delete(e);
        };
        O.id = -1, ls.set(e, O), Ae(O, s);
      } else
        wn(e), te();
    }
  }
}
function wn(e) {
  const t = ls.get(e);
  t && (t.flags |= 8, ls.delete(e));
}
ms().requestIdleCallback;
ms().cancelIdleCallback;
const Tt = (e) => !!e.type.__asyncLoader, Or = (e) => e.type.__isKeepAlive;
function Yo(e, t) {
  Mr(e, "a", t);
}
function Xo(e, t) {
  Mr(e, "da", t);
}
function Mr(e, t, s = he) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (vs(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      Or(r.parent.vnode) && Zo(n, t, s, r), r = r.parent;
  }
}
function Zo(e, t, s, n) {
  const r = vs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  kr(() => {
    Gs(n[t], r);
  }, s);
}
function vs(e, t, s = he, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Ze();
      const a = zt(s), c = Be(t, s, e, i);
      return a(), Qe(), c;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const st = (e) => (t, s = he) => {
  (!Ut || e === "sp") && vs(e, (...n) => t(...n), s);
}, Qo = st("bm"), ei = st("m"), ti = st(
  "bu"
), si = st("u"), ni = st(
  "bum"
), kr = st("um"), ri = st(
  "sp"
), oi = st("rtg"), ii = st("rtc");
function li(e, t = he) {
  vs("ec", e, t);
}
const ai = "components";
function Oe(e, t) {
  return ui(ai, e, !0, t) || e;
}
const ci = Symbol.for("v-ndc");
function ui(e, t, s = !0, n = !1) {
  const r = xe || he;
  if (r) {
    const o = r.type;
    {
      const a = el(
        o,
        !1
      );
      if (a && (a === t || a === ye(t) || a === hs(ye(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Sn(r[e] || o[e], t) || // global registration
      Sn(r.appContext[e], t)
    );
    return !i && n ? o : i;
  }
}
function Sn(e, t) {
  return e && (e[t] || e[ye(t)] || e[hs(ye(t))]);
}
function Zt(e, t, s, n) {
  let r;
  const o = s, i = N(e);
  if (i || ie(e)) {
    const a = i && wt(e);
    let c = !1, d = !1;
    a && (c = !Re(e), d = ut(e), e = gs(e)), r = new Array(e.length);
    for (let u = 0, p = e.length; u < p; u++)
      r[u] = t(
        c ? d ? ns(fe(e[u])) : fe(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let a = 0; a < e; a++)
      r[a] = t(a + 1, a, void 0, o);
  } else if (ee(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (a, c) => t(a, c, void 0, o)
      );
    else {
      const a = Object.keys(e);
      r = new Array(a.length);
      for (let c = 0, d = a.length; c < d; c++) {
        const u = a[c];
        r[c] = t(e[u], u, c, o);
      }
    }
  else
    r = [];
  return r;
}
function fi(e, t, s = {}, n, r) {
  if (xe.ce || xe.parent && Tt(xe.parent) && xe.parent.ce) {
    const d = Object.keys(s).length > 0;
    return G(), ve(
      de,
      null,
      [T("slot", s, n)],
      d ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1), G();
  const i = o && Pr(o(s)), a = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, c = ve(
    de,
    {
      key: (a && !tt(a) ? a : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && n ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function Pr(e) {
  return e.some((t) => un(t) ? !(t.type === et || t.type === de && !Pr(t.children)) : !0) ? e : null;
}
const Hs = (e) => e ? Xr(e) ? dn(e) : Hs(e.parent) : null, jt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ le(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Hs(e.parent),
    $root: (e) => Hs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Rr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      on(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = yr.bind(e.proxy)),
    $watch: (e) => Ri.bind(e)
  })
), Os = (e, t) => e !== Y && !e.__isScriptSetup && L(e, t), di = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: o, accessCache: i, type: a, appContext: c } = e;
    let d;
    if (t[0] !== "$") {
      const E = i[t];
      if (E !== void 0)
        switch (E) {
          case 1:
            return n[t];
          case 2:
            return r[t];
          case 4:
            return s[t];
          case 3:
            return o[t];
        }
      else {
        if (Os(n, t))
          return i[t] = 1, n[t];
        if (r !== Y && L(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && L(d, t)
        )
          return i[t] = 3, o[t];
        if (s !== Y && L(s, t))
          return i[t] = 4, s[t];
        Ls && (i[t] = 0);
      }
    }
    const u = jt[t];
    let p, y;
    if (u)
      return t === "$attrs" && pe(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (p = a.__cssModules) && (p = p[t])
    )
      return p;
    if (s !== Y && L(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      y = c.config.globalProperties, L(y, t)
    )
      return y[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return Os(r, t) ? (r[t] = s, !0) : n !== Y && L(n, t) ? (n[t] = s, !0) : L(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: o, type: i }
  }, a) {
    let c, d;
    return !!(s[a] || e !== Y && a[0] !== "$" && L(e, a) || Os(t, a) || (c = o[0]) && L(c, a) || L(n, a) || L(jt, a) || L(r.config.globalProperties, a) || (d = i.__cssModules) && d[a]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : L(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Tn(e) {
  return N(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Ls = !0;
function pi(e) {
  const t = Rr(e), s = e.proxy, n = e.ctx;
  Ls = !1, t.beforeCreate && Cn(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: a,
    provide: c,
    inject: d,
    // lifecycle
    created: u,
    beforeMount: p,
    mounted: y,
    beforeUpdate: E,
    updated: R,
    activated: j,
    deactivated: te,
    beforeDestroy: O,
    beforeUnmount: W,
    destroyed: Q,
    unmounted: I,
    render: B,
    renderTracked: ge,
    renderTriggered: ue,
    errorCaptured: ae,
    serverPrefetch: Ce,
    // public API
    expose: Ue,
    inheritAttrs: nt,
    // assets
    components: ft,
    directives: gt,
    filters: We
  } = t;
  if (d && hi(d, n, null), i)
    for (const X in i) {
      const K = i[X];
      F(K) && (n[X] = K.bind(s));
    }
  if (r) {
    const X = r.call(s, s);
    ee(X) && (e.data = sn(X));
  }
  if (Ls = !0, o)
    for (const X in o) {
      const K = o[X], Ke = F(K) ? K.bind(s, s) : F(K.get) ? K.get.bind(s, s) : Ve, _t = !F(K) && F(K.set) ? K.set.bind(s) : Ve, ze = Xe({
        get: Ke,
        set: _t
      });
      Object.defineProperty(n, X, {
        enumerable: !0,
        configurable: !0,
        get: () => ze.value,
        set: (ke) => ze.value = ke
      });
    }
  if (a)
    for (const X in a)
      Ir(a[X], n, s, X);
  if (c) {
    const X = F(c) ? c.call(s) : c;
    Reflect.ownKeys(X).forEach((K) => {
      xi(K, X[K]);
    });
  }
  u && Cn(u, e, "c");
  function re(X, K) {
    N(K) ? K.forEach((Ke) => X(Ke.bind(s))) : K && X(K.bind(s));
  }
  if (re(Qo, p), re(ei, y), re(ti, E), re(si, R), re(Yo, j), re(Xo, te), re(li, ae), re(ii, ge), re(oi, ue), re(ni, W), re(kr, I), re(ri, Ce), N(Ue))
    if (Ue.length) {
      const X = e.exposed || (e.exposed = {});
      Ue.forEach((K) => {
        Object.defineProperty(X, K, {
          get: () => s[K],
          set: (Ke) => s[K] = Ke,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Ve && (e.render = B), nt != null && (e.inheritAttrs = nt), ft && (e.components = ft), gt && (e.directives = gt), Ce && Ar(e);
}
function hi(e, t, s = Ve) {
  N(e) && (e = Vs(e));
  for (const n in e) {
    const r = e[n];
    let o;
    ee(r) ? "default" in r ? o = Qt(
      r.from || n,
      r.default,
      !0
    ) : o = Qt(r.from || n) : o = Qt(r), me(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function Cn(e, t, s) {
  Be(
    N(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Ir(e, t, s, n) {
  let r = n.includes(".") ? Kr(s, n) : () => s[n];
  if (ie(e)) {
    const o = t[e];
    F(o) && es(r, o);
  } else if (F(e))
    es(r, e.bind(s));
  else if (ee(e))
    if (N(e))
      e.forEach((o) => Ir(o, t, s, n));
    else {
      const o = F(e.handler) ? e.handler.bind(s) : t[e.handler];
      F(o) && es(r, o, e);
    }
}
function Rr(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, a = o.get(t);
  let c;
  return a ? c = a : !r.length && !s && !n ? c = t : (c = {}, r.length && r.forEach(
    (d) => as(c, d, i, !0)
  ), as(c, t, i)), ee(t) && o.set(t, c), c;
}
function as(e, t, s, n = !1) {
  const { mixins: r, extends: o } = t;
  o && as(e, o, s, !0), r && r.forEach(
    (i) => as(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const a = mi[i] || s && s[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const mi = {
  data: En,
  props: An,
  emits: An,
  // objects
  methods: Rt,
  computed: Rt,
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
  components: Rt,
  directives: Rt,
  // watch
  watch: _i,
  // provide / inject
  provide: En,
  inject: gi
};
function En(e, t) {
  return t ? e ? function() {
    return le(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function gi(e, t) {
  return Rt(Vs(e), Vs(t));
}
function Vs(e) {
  if (N(e)) {
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
function Rt(e, t) {
  return e ? le(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function An(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : le(
    /* @__PURE__ */ Object.create(null),
    Tn(e),
    Tn(t ?? {})
  ) : t;
}
function _i(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = le(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function $r() {
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
let vi = 0;
function bi(e, t) {
  return function(n, r = null) {
    F(n) || (n = le({}, n)), r != null && !ee(r) && (r = null);
    const o = $r(), i = /* @__PURE__ */ new WeakSet(), a = [];
    let c = !1;
    const d = o.app = {
      _uid: vi++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: sl,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...p) {
        return i.has(u) || (u && F(u.install) ? (i.add(u), u.install(d, ...p)) : F(u) && (i.add(u), u(d, ...p))), d;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), d;
      },
      component(u, p) {
        return p ? (o.components[u] = p, d) : o.components[u];
      },
      directive(u, p) {
        return p ? (o.directives[u] = p, d) : o.directives[u];
      },
      mount(u, p, y) {
        if (!c) {
          const E = d._ceVNode || T(n, r);
          return E.appContext = o, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(E, u, y), c = !0, d._container = u, u.__vue_app__ = d, dn(E.component);
        }
      },
      onUnmount(u) {
        a.push(u);
      },
      unmount() {
        c && (Be(
          a,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(u, p) {
        return o.provides[u] = p, d;
      },
      runWithContext(u) {
        const p = Ct;
        Ct = d;
        try {
          return u();
        } finally {
          Ct = p;
        }
      }
    };
    return d;
  };
}
let Ct = null;
function xi(e, t) {
  if (he) {
    let s = he.provides;
    const n = he.parent && he.parent.provides;
    n === s && (s = he.provides = Object.create(n)), s[e] = t;
  }
}
function Qt(e, t, s = !1) {
  const n = Ji();
  if (n || Ct) {
    let r = Ct ? Ct._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && F(t) ? t.call(n && n.proxy) : t;
  }
}
const Nr = {}, Dr = () => Object.create(Nr), Fr = (e) => Object.getPrototypeOf(e) === Nr;
function yi(e, t, s, n = !1) {
  const r = {}, o = Dr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), jr(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  s ? e.props = n ? r : No(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function wi(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, a = V(r), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        let y = u[p];
        if (bs(e.emitsOptions, y))
          continue;
        const E = t[y];
        if (c)
          if (L(o, y))
            E !== o[y] && (o[y] = E, d = !0);
          else {
            const R = ye(y);
            r[R] = Bs(
              c,
              a,
              R,
              E,
              e,
              !1
            );
          }
        else
          E !== o[y] && (o[y] = E, d = !0);
      }
    }
  } else {
    jr(e, t, r, o) && (d = !0);
    let u;
    for (const p in a)
      (!t || // for camelCase
      !L(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Ie(p)) === p || !L(t, u))) && (c ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[u] !== void 0) && (r[p] = Bs(
        c,
        a,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (o !== a)
      for (const p in o)
        (!t || !L(t, p)) && (delete o[p], d = !0);
  }
  d && Ye(e.attrs, "set", "");
}
function jr(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let c in t) {
      if ($t(c))
        continue;
      const d = t[c];
      let u;
      r && L(r, u = ye(c)) ? !o || !o.includes(u) ? s[u] = d : (a || (a = {}))[u] = d : bs(e.emitsOptions, c) || (!(c in n) || d !== n[c]) && (n[c] = d, i = !0);
    }
  if (o) {
    const c = V(s), d = a || Y;
    for (let u = 0; u < o.length; u++) {
      const p = o[u];
      s[p] = Bs(
        r,
        c,
        p,
        d[p],
        e,
        !L(d, p)
      );
    }
  }
  return i;
}
function Bs(e, t, s, n, r, o) {
  const i = e[s];
  if (i != null) {
    const a = L(i, "default");
    if (a && n === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && F(c)) {
        const { propsDefaults: d } = r;
        if (s in d)
          n = d[s];
        else {
          const u = zt(r);
          n = d[s] = c.call(
            null,
            t
          ), u();
        }
      } else
        n = c;
      r.ce && r.ce._setProp(s, n);
    }
    i[
      0
      /* shouldCast */
    ] && (o && !a ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ie(s)) && (n = !0));
  }
  return n;
}
const Si = /* @__PURE__ */ new WeakMap();
function qr(e, t, s = !1) {
  const n = s ? Si : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, a = [];
  let c = !1;
  if (!F(e)) {
    const u = (p) => {
      c = !0;
      const [y, E] = qr(p, t, !0);
      le(i, y), E && a.push(...E);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !c)
    return ee(e) && n.set(e, xt), xt;
  if (N(o))
    for (let u = 0; u < o.length; u++) {
      const p = ye(o[u]);
      On(p) && (i[p] = Y);
    }
  else if (o)
    for (const u in o) {
      const p = ye(u);
      if (On(p)) {
        const y = o[u], E = i[p] = N(y) || F(y) ? { type: y } : le({}, y), R = E.type;
        let j = !1, te = !0;
        if (N(R))
          for (let O = 0; O < R.length; ++O) {
            const W = R[O], Q = F(W) && W.name;
            if (Q === "Boolean") {
              j = !0;
              break;
            } else Q === "String" && (te = !1);
          }
        else
          j = F(R) && R.name === "Boolean";
        E[
          0
          /* shouldCast */
        ] = j, E[
          1
          /* shouldCastTrue */
        ] = te, (j || L(E, "default")) && a.push(p);
      }
    }
  const d = [i, a];
  return ee(e) && n.set(e, d), d;
}
function On(e) {
  return e[0] !== "$" && !$t(e);
}
const an = (e) => e === "_" || e === "_ctx" || e === "$stable", cn = (e) => N(e) ? e.map(Le) : [Le(e)], Ti = (e, t, s) => {
  if (t._n)
    return t;
  const n = D((...r) => cn(t(...r)), s);
  return n._c = !1, n;
}, Hr = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (an(r)) continue;
    const o = e[r];
    if (F(o))
      t[r] = Ti(r, o, n);
    else if (o != null) {
      const i = cn(o);
      t[r] = () => i;
    }
  }
}, Lr = (e, t) => {
  const s = cn(t);
  e.slots.default = () => s;
}, Vr = (e, t, s) => {
  for (const n in t)
    (s || !an(n)) && (e[n] = t[n]);
}, Ci = (e, t, s) => {
  const n = e.slots = Dr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Vr(n, t, s), s && tr(n, "_", r, !0)) : Hr(t, n);
  } else t && Lr(e, t);
}, Ei = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = Y;
  if (n.shapeFlag & 32) {
    const a = t._;
    a ? s && a === 1 ? o = !1 : Vr(r, t, s) : (o = !t.$stable, Hr(t, r)), i = t;
  } else t && (Lr(e, t), i = { default: 1 });
  if (o)
    for (const a in r)
      !an(a) && i[a] == null && delete r[a];
}, Ae = Li;
function Ai(e) {
  return Oi(e);
}
function Oi(e, t) {
  const s = ms();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: a,
    createComment: c,
    setText: d,
    setElementText: u,
    parentNode: p,
    nextSibling: y,
    setScopeId: E = Ve,
    insertStaticContent: R
  } = e, j = (l, f, h, b = null, g = null, v = null, C = void 0, S = null, w = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !Pt(l, f) && (b = m(l), ke(l, g, v, !0), l = null), f.patchFlag === -2 && (w = !1, f.dynamicChildren = null);
    const { type: x, ref: k, shapeFlag: A } = f;
    switch (x) {
      case xs:
        te(l, f, h, b);
        break;
      case et:
        O(l, f, h, b);
        break;
      case ks:
        l == null && W(f, h, b, C);
        break;
      case de:
        ft(
          l,
          f,
          h,
          b,
          g,
          v,
          C,
          S,
          w
        );
        break;
      default:
        A & 1 ? B(
          l,
          f,
          h,
          b,
          g,
          v,
          C,
          S,
          w
        ) : A & 6 ? gt(
          l,
          f,
          h,
          b,
          g,
          v,
          C,
          S,
          w
        ) : (A & 64 || A & 128) && x.process(
          l,
          f,
          h,
          b,
          g,
          v,
          C,
          S,
          w,
          ce
        );
    }
    k != null && g ? Ft(k, l && l.ref, v, f || l, !f) : k == null && l && l.ref != null && Ft(l.ref, null, v, l, !0);
  }, te = (l, f, h, b) => {
    if (l == null)
      n(
        f.el = a(f.children),
        h,
        b
      );
    else {
      const g = f.el = l.el;
      f.children !== l.children && d(g, f.children);
    }
  }, O = (l, f, h, b) => {
    l == null ? n(
      f.el = c(f.children || ""),
      h,
      b
    ) : f.el = l.el;
  }, W = (l, f, h, b) => {
    [l.el, l.anchor] = R(
      l.children,
      f,
      h,
      b,
      l.el,
      l.anchor
    );
  }, Q = ({ el: l, anchor: f }, h, b) => {
    let g;
    for (; l && l !== f; )
      g = y(l), n(l, h, b), l = g;
    n(f, h, b);
  }, I = ({ el: l, anchor: f }) => {
    let h;
    for (; l && l !== f; )
      h = y(l), r(l), l = h;
    r(f);
  }, B = (l, f, h, b, g, v, C, S, w) => {
    f.type === "svg" ? C = "svg" : f.type === "math" && (C = "mathml"), l == null ? ge(
      f,
      h,
      b,
      g,
      v,
      C,
      S,
      w
    ) : Ce(
      l,
      f,
      g,
      v,
      C,
      S,
      w
    );
  }, ge = (l, f, h, b, g, v, C, S) => {
    let w, x;
    const { props: k, shapeFlag: A, transition: M, dirs: $ } = l;
    if (w = l.el = i(
      l.type,
      v,
      k && k.is,
      k
    ), A & 8 ? u(w, l.children) : A & 16 && ae(
      l.children,
      w,
      null,
      b,
      g,
      Ms(l, v),
      C,
      S
    ), $ && dt(l, null, b, "created"), ue(w, l, l.scopeId, C, b), k) {
      for (const z in k)
        z !== "value" && !$t(z) && o(w, z, null, k[z], v, b);
      "value" in k && o(w, "value", null, k.value, v), (x = k.onVnodeBeforeMount) && qe(x, b, l);
    }
    $ && dt(l, null, b, "beforeMount");
    const q = Mi(g, M);
    q && M.beforeEnter(w), n(w, f, h), ((x = k && k.onVnodeMounted) || q || $) && Ae(() => {
      x && qe(x, b, l), q && M.enter(w), $ && dt(l, null, b, "mounted");
    }, g);
  }, ue = (l, f, h, b, g) => {
    if (h && E(l, h), b)
      for (let v = 0; v < b.length; v++)
        E(l, b[v]);
    if (g) {
      let v = g.subTree;
      if (f === v || Gr(v.type) && (v.ssContent === f || v.ssFallback === f)) {
        const C = g.vnode;
        ue(
          l,
          C,
          C.scopeId,
          C.slotScopeIds,
          g.parent
        );
      }
    }
  }, ae = (l, f, h, b, g, v, C, S, w = 0) => {
    for (let x = w; x < l.length; x++) {
      const k = l[x] = S ? it(l[x]) : Le(l[x]);
      j(
        null,
        k,
        f,
        h,
        b,
        g,
        v,
        C,
        S
      );
    }
  }, Ce = (l, f, h, b, g, v, C) => {
    const S = f.el = l.el;
    let { patchFlag: w, dynamicChildren: x, dirs: k } = f;
    w |= l.patchFlag & 16;
    const A = l.props || Y, M = f.props || Y;
    let $;
    if (h && pt(h, !1), ($ = M.onVnodeBeforeUpdate) && qe($, h, f, l), k && dt(f, l, h, "beforeUpdate"), h && pt(h, !0), (A.innerHTML && M.innerHTML == null || A.textContent && M.textContent == null) && u(S, ""), x ? Ue(
      l.dynamicChildren,
      x,
      S,
      h,
      b,
      Ms(f, g),
      v
    ) : C || K(
      l,
      f,
      S,
      null,
      h,
      b,
      Ms(f, g),
      v,
      !1
    ), w > 0) {
      if (w & 16)
        nt(S, A, M, h, g);
      else if (w & 2 && A.class !== M.class && o(S, "class", null, M.class, g), w & 4 && o(S, "style", A.style, M.style, g), w & 8) {
        const q = f.dynamicProps;
        for (let z = 0; z < q.length; z++) {
          const U = q[z], we = A[U], Se = M[U];
          (Se !== we || U === "value") && o(S, U, we, Se, g, h);
        }
      }
      w & 1 && l.children !== f.children && u(S, f.children);
    } else !C && x == null && nt(S, A, M, h, g);
    (($ = M.onVnodeUpdated) || k) && Ae(() => {
      $ && qe($, h, f, l), k && dt(f, l, h, "updated");
    }, b);
  }, Ue = (l, f, h, b, g, v, C) => {
    for (let S = 0; S < f.length; S++) {
      const w = l[S], x = f[S], k = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        w.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (w.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Pt(w, x) || // - In the case of a component, it could contain anything.
        w.shapeFlag & 198) ? p(w.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          h
        )
      );
      j(
        w,
        x,
        k,
        null,
        b,
        g,
        v,
        C,
        !0
      );
    }
  }, nt = (l, f, h, b, g) => {
    if (f !== h) {
      if (f !== Y)
        for (const v in f)
          !$t(v) && !(v in h) && o(
            l,
            v,
            f[v],
            null,
            g,
            b
          );
      for (const v in h) {
        if ($t(v)) continue;
        const C = h[v], S = f[v];
        C !== S && v !== "value" && o(l, v, S, C, g, b);
      }
      "value" in h && o(l, "value", f.value, h.value, g);
    }
  }, ft = (l, f, h, b, g, v, C, S, w) => {
    const x = f.el = l ? l.el : a(""), k = f.anchor = l ? l.anchor : a("");
    let { patchFlag: A, dynamicChildren: M, slotScopeIds: $ } = f;
    $ && (S = S ? S.concat($) : $), l == null ? (n(x, h, b), n(k, h, b), ae(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      h,
      k,
      g,
      v,
      C,
      S,
      w
    )) : A > 0 && A & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Ue(
      l.dynamicChildren,
      M,
      h,
      g,
      v,
      C,
      S
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || g && f === g.subTree) && Br(
      l,
      f,
      !0
      /* shallow */
    )) : K(
      l,
      f,
      h,
      k,
      g,
      v,
      C,
      S,
      w
    );
  }, gt = (l, f, h, b, g, v, C, S, w) => {
    f.slotScopeIds = S, l == null ? f.shapeFlag & 512 ? g.ctx.activate(
      f,
      h,
      b,
      C,
      w
    ) : We(
      f,
      h,
      b,
      g,
      v,
      C,
      w
    ) : At(l, f, w);
  }, We = (l, f, h, b, g, v, C) => {
    const S = l.component = Gi(
      l,
      b,
      g
    );
    if (Or(l) && (S.ctx.renderer = ce), Yi(S, !1, C), S.asyncDep) {
      if (g && g.registerDep(S, re, C), !l.el) {
        const w = S.subTree = T(et);
        O(null, w, f, h), l.placeholder = w.el;
      }
    } else
      re(
        S,
        l,
        f,
        h,
        g,
        v,
        C
      );
  }, At = (l, f, h) => {
    const b = f.component = l.component;
    if (qi(l, f, h))
      if (b.asyncDep && !b.asyncResolved) {
        X(b, f, h);
        return;
      } else
        b.next = f, b.update();
    else
      f.el = l.el, b.vnode = f;
  }, re = (l, f, h, b, g, v, C) => {
    const S = () => {
      if (l.isMounted) {
        let { next: A, bu: M, u: $, parent: q, vnode: z } = l;
        {
          const Fe = Ur(l);
          if (Fe) {
            A && (A.el = z.el, X(l, A, C)), Fe.asyncDep.then(() => {
              l.isUnmounted || S();
            });
            return;
          }
        }
        let U = A, we;
        pt(l, !1), A ? (A.el = z.el, X(l, A, C)) : A = z, M && Ss(M), (we = A.props && A.props.onVnodeBeforeUpdate) && qe(we, q, A, z), pt(l, !0);
        const Se = kn(l), De = l.subTree;
        l.subTree = Se, j(
          De,
          Se,
          // parent may have changed if it's in a teleport
          p(De.el),
          // anchor may have changed if it's in a fragment
          m(De),
          l,
          g,
          v
        ), A.el = Se.el, U === null && Hi(l, Se.el), $ && Ae($, g), (we = A.props && A.props.onVnodeUpdated) && Ae(
          () => qe(we, q, A, z),
          g
        );
      } else {
        let A;
        const { el: M, props: $ } = f, { bm: q, m: z, parent: U, root: we, type: Se } = l, De = Tt(f);
        pt(l, !1), q && Ss(q), !De && (A = $ && $.onVnodeBeforeMount) && qe(A, U, f), pt(l, !0);
        {
          we.ce && // @ts-expect-error _def is private
          we.ce._def.shadowRoot !== !1 && we.ce._injectChildStyle(Se);
          const Fe = l.subTree = kn(l);
          j(
            null,
            Fe,
            h,
            b,
            l,
            g,
            v
          ), f.el = Fe.el;
        }
        if (z && Ae(z, g), !De && (A = $ && $.onVnodeMounted)) {
          const Fe = f;
          Ae(
            () => qe(A, U, Fe),
            g
          );
        }
        (f.shapeFlag & 256 || U && Tt(U.vnode) && U.vnode.shapeFlag & 256) && l.a && Ae(l.a, g), l.isMounted = !0, f = h = b = null;
      }
    };
    l.scope.on();
    const w = l.effect = new or(S);
    l.scope.off();
    const x = l.update = w.run.bind(w), k = l.job = w.runIfDirty.bind(w);
    k.i = l, k.id = l.uid, w.scheduler = () => on(k), pt(l, !0), x();
  }, X = (l, f, h) => {
    f.component = l;
    const b = l.vnode.props;
    l.vnode = f, l.next = null, wi(l, f.props, b, h), Ei(l, f.children, h), Ze(), yn(l), Qe();
  }, K = (l, f, h, b, g, v, C, S, w = !1) => {
    const x = l && l.children, k = l ? l.shapeFlag : 0, A = f.children, { patchFlag: M, shapeFlag: $ } = f;
    if (M > 0) {
      if (M & 128) {
        _t(
          x,
          A,
          h,
          b,
          g,
          v,
          C,
          S,
          w
        );
        return;
      } else if (M & 256) {
        Ke(
          x,
          A,
          h,
          b,
          g,
          v,
          C,
          S,
          w
        );
        return;
      }
    }
    $ & 8 ? (k & 16 && P(x, g, v), A !== x && u(h, A)) : k & 16 ? $ & 16 ? _t(
      x,
      A,
      h,
      b,
      g,
      v,
      C,
      S,
      w
    ) : P(x, g, v, !0) : (k & 8 && u(h, ""), $ & 16 && ae(
      A,
      h,
      b,
      g,
      v,
      C,
      S,
      w
    ));
  }, Ke = (l, f, h, b, g, v, C, S, w) => {
    l = l || xt, f = f || xt;
    const x = l.length, k = f.length, A = Math.min(x, k);
    let M;
    for (M = 0; M < A; M++) {
      const $ = f[M] = w ? it(f[M]) : Le(f[M]);
      j(
        l[M],
        $,
        h,
        null,
        g,
        v,
        C,
        S,
        w
      );
    }
    x > k ? P(
      l,
      g,
      v,
      !0,
      !1,
      A
    ) : ae(
      f,
      h,
      b,
      g,
      v,
      C,
      S,
      w,
      A
    );
  }, _t = (l, f, h, b, g, v, C, S, w) => {
    let x = 0;
    const k = f.length;
    let A = l.length - 1, M = k - 1;
    for (; x <= A && x <= M; ) {
      const $ = l[x], q = f[x] = w ? it(f[x]) : Le(f[x]);
      if (Pt($, q))
        j(
          $,
          q,
          h,
          null,
          g,
          v,
          C,
          S,
          w
        );
      else
        break;
      x++;
    }
    for (; x <= A && x <= M; ) {
      const $ = l[A], q = f[M] = w ? it(f[M]) : Le(f[M]);
      if (Pt($, q))
        j(
          $,
          q,
          h,
          null,
          g,
          v,
          C,
          S,
          w
        );
      else
        break;
      A--, M--;
    }
    if (x > A) {
      if (x <= M) {
        const $ = M + 1, q = $ < k ? f[$].el : b;
        for (; x <= M; )
          j(
            null,
            f[x] = w ? it(f[x]) : Le(f[x]),
            h,
            q,
            g,
            v,
            C,
            S,
            w
          ), x++;
      }
    } else if (x > M)
      for (; x <= A; )
        ke(l[x], g, v, !0), x++;
    else {
      const $ = x, q = x, z = /* @__PURE__ */ new Map();
      for (x = q; x <= M; x++) {
        const Ee = f[x] = w ? it(f[x]) : Le(f[x]);
        Ee.key != null && z.set(Ee.key, x);
      }
      let U, we = 0;
      const Se = M - q + 1;
      let De = !1, Fe = 0;
      const Mt = new Array(Se);
      for (x = 0; x < Se; x++) Mt[x] = 0;
      for (x = $; x <= A; x++) {
        const Ee = l[x];
        if (we >= Se) {
          ke(Ee, g, v, !0);
          continue;
        }
        let je;
        if (Ee.key != null)
          je = z.get(Ee.key);
        else
          for (U = q; U <= M; U++)
            if (Mt[U - q] === 0 && Pt(Ee, f[U])) {
              je = U;
              break;
            }
        je === void 0 ? ke(Ee, g, v, !0) : (Mt[je - q] = x + 1, je >= Fe ? Fe = je : De = !0, j(
          Ee,
          f[je],
          h,
          null,
          g,
          v,
          C,
          S,
          w
        ), we++);
      }
      const hn = De ? ki(Mt) : xt;
      for (U = hn.length - 1, x = Se - 1; x >= 0; x--) {
        const Ee = q + x, je = f[Ee], mn = f[Ee + 1], gn = Ee + 1 < k ? (
          // #13559, fallback to el placeholder for unresolved async component
          mn.el || mn.placeholder
        ) : b;
        Mt[x] === 0 ? j(
          null,
          je,
          h,
          gn,
          g,
          v,
          C,
          S,
          w
        ) : De && (U < 0 || x !== hn[U] ? ze(je, h, gn, 2) : U--);
      }
    }
  }, ze = (l, f, h, b, g = null) => {
    const { el: v, type: C, transition: S, children: w, shapeFlag: x } = l;
    if (x & 6) {
      ze(l.component.subTree, f, h, b);
      return;
    }
    if (x & 128) {
      l.suspense.move(f, h, b);
      return;
    }
    if (x & 64) {
      C.move(l, f, h, ce);
      return;
    }
    if (C === de) {
      n(v, f, h);
      for (let A = 0; A < w.length; A++)
        ze(w[A], f, h, b);
      n(l.anchor, f, h);
      return;
    }
    if (C === ks) {
      Q(l, f, h);
      return;
    }
    if (b !== 2 && x & 1 && S)
      if (b === 0)
        S.beforeEnter(v), n(v, f, h), Ae(() => S.enter(v), g);
      else {
        const { leave: A, delayLeave: M, afterLeave: $ } = S, q = () => {
          l.ctx.isUnmounted ? r(v) : n(v, f, h);
        }, z = () => {
          v._isLeaving && v[Jo](
            !0
            /* cancelled */
          ), A(v, () => {
            q(), $ && $();
          });
        };
        M ? M(v, q, z) : z();
      }
    else
      n(v, f, h);
  }, ke = (l, f, h, b = !1, g = !1) => {
    const {
      type: v,
      props: C,
      ref: S,
      children: w,
      dynamicChildren: x,
      shapeFlag: k,
      patchFlag: A,
      dirs: M,
      cacheIndex: $
    } = l;
    if (A === -2 && (g = !1), S != null && (Ze(), Ft(S, null, h, l, !0), Qe()), $ != null && (f.renderCache[$] = void 0), k & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const q = k & 1 && M, z = !Tt(l);
    let U;
    if (z && (U = C && C.onVnodeBeforeUnmount) && qe(U, f, l), k & 6)
      Gt(l.component, h, b);
    else {
      if (k & 128) {
        l.suspense.unmount(h, b);
        return;
      }
      q && dt(l, null, f, "beforeUnmount"), k & 64 ? l.type.remove(
        l,
        f,
        h,
        ce,
        b
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== de || A > 0 && A & 64) ? P(
        x,
        f,
        h,
        !1,
        !0
      ) : (v === de && A & 384 || !g && k & 16) && P(w, f, h), b && Ot(l);
    }
    (z && (U = C && C.onVnodeUnmounted) || q) && Ae(() => {
      U && qe(U, f, l), q && dt(l, null, f, "unmounted");
    }, h);
  }, Ot = (l) => {
    const { type: f, el: h, anchor: b, transition: g } = l;
    if (f === de) {
      ys(h, b);
      return;
    }
    if (f === ks) {
      I(l);
      return;
    }
    const v = () => {
      r(h), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (l.shapeFlag & 1 && g && !g.persisted) {
      const { leave: C, delayLeave: S } = g, w = () => C(h, v);
      S ? S(l.el, v, w) : w();
    } else
      v();
  }, ys = (l, f) => {
    let h;
    for (; l !== f; )
      h = y(l), r(l), l = h;
    r(f);
  }, Gt = (l, f, h) => {
    const { bum: b, scope: g, job: v, subTree: C, um: S, m: w, a: x } = l;
    Mn(w), Mn(x), b && Ss(b), g.stop(), v && (v.flags |= 8, ke(C, l, f, h)), S && Ae(S, f), Ae(() => {
      l.isUnmounted = !0;
    }, f);
  }, P = (l, f, h, b = !1, g = !1, v = 0) => {
    for (let C = v; C < l.length; C++)
      ke(l[C], f, h, b, g);
  }, m = (l) => {
    if (l.shapeFlag & 6)
      return m(l.component.subTree);
    if (l.shapeFlag & 128)
      return l.suspense.next();
    const f = y(l.anchor || l.el), h = f && f[zo];
    return h ? y(h) : f;
  };
  let se = !1;
  const H = (l, f, h) => {
    l == null ? f._vnode && ke(f._vnode, null, null, !0) : j(
      f._vnode || null,
      l,
      f,
      null,
      null,
      null,
      h
    ), f._vnode = l, se || (se = !0, yn(), Sr(), se = !1);
  }, ce = {
    p: j,
    um: ke,
    m: ze,
    r: Ot,
    mt: We,
    mc: ae,
    pc: K,
    pbc: Ue,
    n: m,
    o: e
  };
  return {
    render: H,
    hydrate: void 0,
    createApp: bi(H)
  };
}
function Ms({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function pt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Mi(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Br(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (N(n) && N(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let a = r[o];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = r[o] = it(r[o]), a.el = i.el), !s && a.patchFlag !== -2 && Br(i, a)), a.type === xs && // avoid cached text nodes retaining detached dom nodes
      a.patchFlag !== -1 && (a.el = i.el), a.type === et && !a.el && (a.el = i.el);
    }
}
function ki(e) {
  const t = e.slice(), s = [0];
  let n, r, o, i, a;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const d = e[n];
    if (d !== 0) {
      if (r = s[s.length - 1], e[r] < d) {
        t[n] = r, s.push(n);
        continue;
      }
      for (o = 0, i = s.length - 1; o < i; )
        a = o + i >> 1, e[s[a]] < d ? o = a + 1 : i = a;
      d < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, i = s[o - 1]; o-- > 0; )
    s[o] = i, i = t[i];
  return s;
}
function Ur(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ur(t);
}
function Mn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Pi = Symbol.for("v-scx"), Ii = () => Qt(Pi);
function es(e, t, s) {
  return Wr(e, t, s);
}
function Wr(e, t, s = Y) {
  const { immediate: n, deep: r, flush: o, once: i } = s, a = le({}, s), c = t && n || !t && o !== "post";
  let d;
  if (Ut) {
    if (o === "sync") {
      const E = Ii();
      d = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!c) {
      const E = () => {
      };
      return E.stop = Ve, E.resume = Ve, E.pause = Ve, E;
    }
  }
  const u = he;
  a.call = (E, R, j) => Be(E, u, R, j);
  let p = !1;
  o === "post" ? a.scheduler = (E) => {
    Ae(E, u && u.suspense);
  } : o !== "sync" && (p = !0, a.scheduler = (E, R) => {
    R ? E() : on(E);
  }), a.augmentJob = (E) => {
    t && (E.flags |= 4), p && (E.flags |= 2, u && (E.id = u.uid, E.i = u));
  };
  const y = Bo(e, t, a);
  return Ut && (d ? d.push(y) : c && y()), y;
}
function Ri(e, t, s) {
  const n = this.proxy, r = ie(e) ? e.includes(".") ? Kr(n, e) : () => n[e] : e.bind(n, n);
  let o;
  F(t) ? o = t : (o = t.handler, s = t);
  const i = zt(this), a = Wr(r, o.bind(n), s);
  return i(), a;
}
function Kr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const $i = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${ye(t)}Modifiers`] || e[`${Ie(t)}Modifiers`];
function Ni(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Y;
  let r = s;
  const o = t.startsWith("update:"), i = o && $i(n, t.slice(7));
  i && (i.trim && (r = s.map((u) => ie(u) ? u.trim() : u)), i.number && (r = s.map(lo)));
  let a, c = n[a = ws(t)] || // also try camelCase event handler (#2249)
  n[a = ws(ye(t))];
  !c && o && (c = n[a = ws(Ie(t))]), c && Be(
    c,
    e,
    6,
    r
  );
  const d = n[a + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, Be(
      d,
      e,
      6,
      r
    );
  }
}
const Di = /* @__PURE__ */ new WeakMap();
function zr(e, t, s = !1) {
  const n = s ? Di : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, a = !1;
  if (!F(e)) {
    const c = (d) => {
      const u = zr(d, t, !0);
      u && (a = !0, le(i, u));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !a ? (ee(e) && n.set(e, null), null) : (N(o) ? o.forEach((c) => i[c] = null) : le(i, o), ee(e) && n.set(e, i), i);
}
function bs(e, t) {
  return !e || !us(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), L(e, t[0].toLowerCase() + t.slice(1)) || L(e, Ie(t)) || L(e, t));
}
function kn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: a,
    emit: c,
    render: d,
    renderCache: u,
    props: p,
    data: y,
    setupState: E,
    ctx: R,
    inheritAttrs: j
  } = e, te = is(e);
  let O, W;
  try {
    if (s.shapeFlag & 4) {
      const I = r || n, B = I;
      O = Le(
        d.call(
          B,
          I,
          u,
          p,
          E,
          y,
          R
        )
      ), W = a;
    } else {
      const I = t;
      O = Le(
        I.length > 1 ? I(
          p,
          { attrs: a, slots: i, emit: c }
        ) : I(
          p,
          null
        )
      ), W = t.props ? a : Fi(a);
    }
  } catch (I) {
    qt.length = 0, _s(I, e, 1), O = T(et);
  }
  let Q = O;
  if (W && j !== !1) {
    const I = Object.keys(W), { shapeFlag: B } = Q;
    I.length && B & 7 && (o && I.some(zs) && (W = ji(
      W,
      o
    )), Q = Et(Q, W, !1, !0));
  }
  return s.dirs && (Q = Et(Q, null, !1, !0), Q.dirs = Q.dirs ? Q.dirs.concat(s.dirs) : s.dirs), s.transition && ln(Q, s.transition), O = Q, is(te), O;
}
const Fi = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || us(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, ji = (e, t) => {
  const s = {};
  for (const n in e)
    (!zs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function qi(e, t, s) {
  const { props: n, children: r, component: o } = e, { props: i, children: a, patchFlag: c } = t, d = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? Pn(n, i, d) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let p = 0; p < u.length; p++) {
        const y = u[p];
        if (i[y] !== n[y] && !bs(d, y))
          return !0;
      }
    }
  } else
    return (r || a) && (!a || !a.$stable) ? !0 : n === i ? !1 : n ? i ? Pn(n, i, d) : !0 : !!i;
  return !1;
}
function Pn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (t[o] !== e[o] && !bs(s, o))
      return !0;
  }
  return !1;
}
function Hi({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Gr = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Ko(e);
}
const de = Symbol.for("v-fgt"), xs = Symbol.for("v-txt"), et = Symbol.for("v-cmt"), ks = Symbol.for("v-stc"), qt = [];
let Me = null;
function G(e = !1) {
  qt.push(Me = e ? null : []);
}
function Vi() {
  qt.pop(), Me = qt[qt.length - 1] || null;
}
let Bt = 1;
function In(e, t = !1) {
  Bt += e, e < 0 && Me && t && (Me.hasOnce = !0);
}
function Jr(e) {
  return e.dynamicChildren = Bt > 0 ? Me || xt : null, Vi(), Bt > 0 && Me && Me.push(e), e;
}
function $e(e, t, s, n, r, o) {
  return Jr(
    _(
      e,
      t,
      s,
      n,
      r,
      o,
      !0
    )
  );
}
function ve(e, t, s, n, r) {
  return Jr(
    T(
      e,
      t,
      s,
      n,
      r,
      !0
    )
  );
}
function un(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Pt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Yr = ({ key: e }) => e ?? null, ts = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ie(e) || me(e) || F(e) ? { i: xe, r: e, k: t, f: !!s } : e : null);
function _(e, t = null, s = null, n = 0, r = null, o = e === de ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yr(t),
    ref: t && ts(t),
    scopeId: Cr,
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
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: xe
  };
  return a ? (fn(c, s), o & 128 && e.normalize(c)) : s && (c.shapeFlag |= ie(s) ? 8 : 16), Bt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Me && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Me.push(c), c;
}
const T = Bi;
function Bi(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === ci) && (e = et), un(e)) {
    const a = Et(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && fn(a, s), Bt > 0 && !o && Me && (a.shapeFlag & 6 ? Me[Me.indexOf(e)] = a : Me.push(a)), a.patchFlag = -2, a;
  }
  if (tl(e) && (e = e.__vccOpts), t) {
    t = Ui(t);
    let { class: a, style: c } = t;
    a && !ie(a) && (t.class = Wt(a)), ee(c) && (rn(c) && !N(c) && (c = le({}, c)), t.style = Ys(c));
  }
  const i = ie(e) ? 1 : Gr(e) ? 128 : Go(e) ? 64 : ee(e) ? 4 : F(e) ? 2 : 0;
  return _(
    e,
    t,
    s,
    n,
    r,
    i,
    o,
    !0
  );
}
function Ui(e) {
  return e ? rn(e) || Fr(e) ? le({}, e) : e : null;
}
function Et(e, t, s = !1, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: a, transition: c } = e, d = t ? Wi(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Yr(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && o ? N(o) ? o.concat(ts(t)) : [o, ts(t)] : ts(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? i === -1 ? 16 : i | 16 : i,
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
    u,
    c.clone(u)
  ), u;
}
function oe(e = " ", t = 0) {
  return T(xs, null, e, t);
}
function at(e = "", t = !1) {
  return t ? (G(), ve(et, null, e)) : T(et, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? T(et) : N(e) ? T(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : un(e) ? it(e) : T(xs, null, String(e));
}
function it(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Et(e);
}
function fn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (N(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), fn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !Fr(t) ? t._ctx = xe : r === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else F(t) ? (t = { default: t, _ctx: xe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [oe(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Wi(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Wt([t.class, n.class]));
      else if (r === "style")
        t.style = Ys([t.style, n.style]);
      else if (us(r)) {
        const o = t[r], i = n[r];
        i && o !== i && !(N(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function qe(e, t, s, n = null) {
  Be(e, t, 7, [
    s,
    n
  ]);
}
const Ki = $r();
let zi = 0;
function Gi(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Ki, o = {
    uid: zi++,
    vnode: e,
    type: n,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new mo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: qr(n, r),
    emitsOptions: zr(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Y,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: Y,
    data: Y,
    props: Y,
    attrs: Y,
    slots: Y,
    refs: Y,
    setupState: Y,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Ni.bind(null, o), e.ce && e.ce(o), o;
}
let he = null;
const Ji = () => he || xe;
let cs, Us;
{
  const e = ms(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  cs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => he = s
  ), Us = t(
    "__VUE_SSR_SETTERS__",
    (s) => Ut = s
  );
}
const zt = (e) => {
  const t = he;
  return cs(e), e.scope.on(), () => {
    e.scope.off(), cs(t);
  };
}, Rn = () => {
  he && he.scope.off(), cs(null);
};
function Xr(e) {
  return e.vnode.shapeFlag & 4;
}
let Ut = !1;
function Yi(e, t = !1, s = !1) {
  t && Us(t);
  const { props: n, children: r } = e.vnode, o = Xr(e);
  yi(e, n, o, t), Ci(e, r, s || t);
  const i = o ? Xi(e, t) : void 0;
  return t && Us(!1), i;
}
function Xi(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, di);
  const { setup: n } = s;
  if (n) {
    Ze();
    const r = e.setupContext = n.length > 1 ? Qi(e) : null, o = zt(e), i = Kt(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), a = Qn(i);
    if (Qe(), o(), (a || e.sp) && !Tt(e) && Ar(e), a) {
      if (i.then(Rn, Rn), t)
        return i.then((c) => {
          $n(e, c);
        }).catch((c) => {
          _s(c, e, 0);
        });
      e.asyncDep = i;
    } else
      $n(e, i);
  } else
    Zr(e);
}
function $n(e, t, s) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ee(t) && (e.setupState = br(t)), Zr(e);
}
function Zr(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Ve);
  {
    const r = zt(e);
    Ze();
    try {
      pi(e);
    } finally {
      Qe(), r();
    }
  }
}
const Zi = {
  get(e, t) {
    return pe(e, "get", ""), e[t];
  }
};
function Qi(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Zi),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function dn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(br(Do(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in jt)
        return jt[s](e);
    },
    has(t, s) {
      return s in t || s in jt;
    }
  })) : e.proxy;
}
function el(e, t = !0) {
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function tl(e) {
  return F(e) && "__vccOpts" in e;
}
const Xe = (e, t) => Lo(e, t, Ut), sl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ws;
const Nn = typeof window < "u" && window.trustedTypes;
if (Nn)
  try {
    Ws = /* @__PURE__ */ Nn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Qr = Ws ? (e) => Ws.createHTML(e) : (e) => e, nl = "http://www.w3.org/2000/svg", rl = "http://www.w3.org/1998/Math/MathML", Je = typeof document < "u" ? document : null, Dn = Je && /* @__PURE__ */ Je.createElement("template"), ol = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Je.createElementNS(nl, e) : t === "mathml" ? Je.createElementNS(rl, e) : s ? Je.createElement(e, { is: s }) : Je.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => Je.createTextNode(e),
  createComment: (e) => Je.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Je.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, r, o) {
    const i = s ? s.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      Dn.innerHTML = Qr(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const a = Dn.content;
      if (n === "svg" || n === "mathml") {
        const c = a.firstChild;
        for (; c.firstChild; )
          a.appendChild(c.firstChild);
        a.removeChild(c);
      }
      t.insertBefore(a, s);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, il = Symbol("_vtc");
function ll(e, t, s) {
  const n = e[il];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Fn = Symbol("_vod"), al = Symbol("_vsh"), cl = Symbol(""), ul = /(?:^|;)\s*display\s*:/;
function fl(e, t, s) {
  const n = e.style, r = ie(s);
  let o = !1;
  if (s && !r) {
    if (t)
      if (ie(t))
        for (const i of t.split(";")) {
          const a = i.slice(0, i.indexOf(":")).trim();
          s[a] == null && ss(n, a, "");
        }
      else
        for (const i in t)
          s[i] == null && ss(n, i, "");
    for (const i in s)
      i === "display" && (o = !0), ss(n, i, s[i]);
  } else if (r) {
    if (t !== s) {
      const i = n[cl];
      i && (s += ";" + i), n.cssText = s, o = ul.test(s);
    }
  } else t && e.removeAttribute("style");
  Fn in e && (e[Fn] = o ? n.display : "", e[al] && (n.display = "none"));
}
const jn = /\s*!important$/;
function ss(e, t, s) {
  if (N(s))
    s.forEach((n) => ss(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = dl(e, t);
    jn.test(s) ? e.setProperty(
      Ie(n),
      s.replace(jn, ""),
      "important"
    ) : e[n] = s;
  }
}
const qn = ["Webkit", "Moz", "ms"], Ps = {};
function dl(e, t) {
  const s = Ps[t];
  if (s)
    return s;
  let n = ye(t);
  if (n !== "filter" && n in e)
    return Ps[t] = n;
  n = hs(n);
  for (let r = 0; r < qn.length; r++) {
    const o = qn[r] + n;
    if (o in e)
      return Ps[t] = o;
  }
  return t;
}
const Hn = "http://www.w3.org/1999/xlink";
function Ln(e, t, s, n, r, o = ho(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Hn, t.slice(6, t.length)) : e.setAttributeNS(Hn, t, s) : s == null || o && !sr(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : tt(s) ? String(s) : s
  );
}
function Vn(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Qr(s) : s);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const a = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (a !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let i = !1;
  if (s === "" || s == null) {
    const a = typeof e[t];
    a === "boolean" ? s = sr(s) : s == null && a === "string" ? (s = "", i = !0) : a === "number" && (s = 0, i = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function pl(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function hl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Bn = Symbol("_vei");
function ml(e, t, s, n, r = null) {
  const o = e[Bn] || (e[Bn] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [a, c] = gl(t);
    if (n) {
      const d = o[t] = bl(
        n,
        r
      );
      pl(e, a, d, c);
    } else i && (hl(e, a, i, c), o[t] = void 0);
  }
}
const Un = /(?:Once|Passive|Capture)$/;
function gl(e) {
  let t;
  if (Un.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Un); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ie(e.slice(2)), t];
}
let Is = 0;
const _l = /* @__PURE__ */ Promise.resolve(), vl = () => Is || (_l.then(() => Is = 0), Is = Date.now());
function bl(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Be(
      xl(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = vl(), s;
}
function xl(e, t) {
  if (N(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (r) => !r._stopped && n && n(r)
    );
  } else
    return t;
}
const Wn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, yl = (e, t, s, n, r, o) => {
  const i = r === "svg";
  t === "class" ? ll(e, n, i) : t === "style" ? fl(e, s, n) : us(t) ? zs(t) || ml(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wl(e, t, n, i)) ? (Vn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Ln(e, t, n, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ie(n)) ? Vn(e, ye(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Ln(e, t, n, i));
};
function wl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Wn(t) && F(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Wn(t) && ie(s) ? !1 : t in e;
}
const Kn = {};
// @__NO_SIDE_EFFECTS__
function Sl(e, t, s) {
  let n = /* @__PURE__ */ Er(e, t);
  ds(n) && (n = le({}, n, t));
  class r extends pn {
    constructor(i) {
      super(n, i, s);
    }
  }
  return r.def = n, r;
}
const Tl = typeof HTMLElement < "u" ? HTMLElement : class {
};
class pn extends Tl {
  constructor(t, s = {}, n = Gn) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== Gn ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      le({}, t.shadowRootOptions, {
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
    this._connected = !1, yr(() => {
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
    const t = (n, r = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: o, styles: i } = n;
      let a;
      if (o && !N(o))
        for (const c in o) {
          const d = o[c];
          (d === Number || d && d.type === Number) && (c in this._props && (this._props[c] = _n(this._props[c])), (a || (a = /* @__PURE__ */ Object.create(null)))[ye(c)] = !0);
        }
      this._numberProps = a, this._resolveProps(n), this.shadowRoot && this._applyStyles(i), this._mount(n);
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
        L(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => rt(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = N(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(ye))
      Object.defineProperty(this, r, {
        get() {
          return this._getProp(r);
        },
        set(o) {
          this._setProp(r, o, !0, !0);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : Kn;
    const r = ye(t);
    s && this._numberProps && this._numberProps[r] && (n = _n(n)), this._setProp(r, n, !1, !0);
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
  _setProp(t, s, n = !0, r = !1) {
    if (s !== this._props[t] && (s === Kn ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Ie(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ie(t), s + "") : s || this.removeAttribute(Ie(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Ol(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = T(this._def, le(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            ds(i[0]) ? le({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      n.emit = (o, ...i) => {
        r(o, i), Ie(o) !== o && r(Ie(o), i);
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
    for (let r = t.length - 1; r >= 0; r--) {
      const o = document.createElement("style");
      n && o.setAttribute("nonce", n), o.textContent = t[r], this.shadowRoot.prepend(o);
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
      const r = t[n], o = r.getAttribute("name") || "default", i = this._slots[o], a = r.parentNode;
      if (i)
        for (const c of i) {
          if (s && c.nodeType === 1) {
            const d = s + "-s", u = document.createTreeWalker(c, 1);
            c.setAttribute(d, "");
            let p;
            for (; p = u.nextNode(); )
              p.setAttribute(d, "");
          }
          a.insertBefore(c, r);
        }
      else
        for (; r.firstChild; ) a.insertBefore(r.firstChild, r);
      a.removeChild(r);
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
const Cl = ["ctrl", "shift", "alt", "meta"], El = {
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
}, eo = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const a = El[t[i]];
      if (a && a(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Al = /* @__PURE__ */ le({ patchProp: yl }, ol);
let zn;
function to() {
  return zn || (zn = Ai(Al));
}
const Ol = ((...e) => {
  to().render(...e);
}), Gn = ((...e) => {
  const t = to().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = kl(n);
    if (!r) return;
    const o = t._component;
    !F(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = s(r, !1, Ml(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Ml(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function kl(e) {
  return ie(e) ? document.querySelector(e) : e;
}
function Pl(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var s = function n() {
      var r = !1;
      try {
        r = this instanceof n;
      } catch {
      }
      return r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    s.prototype = t.prototype;
  } else s = {};
  return Object.defineProperty(s, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var r = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(s, n, r.get ? r : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), s;
}
const Il = {}, Rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Il
}, Symbol.toStringTag, { value: "Module" })), Rs = /* @__PURE__ */ Pl(Rl);
var $s, Jn;
function $l() {
  if (Jn) return $s;
  Jn = 1;
  let { existsSync: e, readFileSync: t } = Rs, { dirname: s, join: n } = Rs, { SourceMapConsumer: r, SourceMapGenerator: o } = Rs;
  function i(c) {
    return Buffer ? Buffer.from(c, "base64").toString() : window.atob(c);
  }
  class a {
    constructor(d, u) {
      if (u.map === !1) return;
      this.loadAnnotation(d), this.inline = this.startWith(this.annotation, "data:");
      let p = u.map ? u.map.prev : void 0, y = this.loadMap(u.from, p);
      !this.mapFile && u.from && (this.mapFile = u.from), this.mapFile && (this.root = s(this.mapFile)), y && (this.text = y);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new r(this.text)), this.consumerCache;
    }
    decodeInline(d) {
      let u = /^data:application\/json;charset=utf-?8;base64,/, p = /^data:application\/json;base64,/, y = /^data:application\/json;charset=utf-?8,/, E = /^data:application\/json,/, R = d.match(y) || d.match(E);
      if (R)
        return decodeURIComponent(d.substr(R[0].length));
      let j = d.match(u) || d.match(p);
      if (j)
        return i(d.substr(j[0].length));
      let te = d.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + te);
    }
    getAnnotationURL(d) {
      return d.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(d) {
      return typeof d != "object" ? !1 : typeof d.mappings == "string" || typeof d._mappings == "string" || Array.isArray(d.sections);
    }
    loadAnnotation(d) {
      let u = d.match(/\/\*\s*# sourceMappingURL=/g);
      if (!u) return;
      let p = d.lastIndexOf(u.pop()), y = d.indexOf("*/", p);
      p > -1 && y > -1 && (this.annotation = this.getAnnotationURL(d.substring(p, y)));
    }
    loadFile(d) {
      if (this.root = s(d), e(d))
        return this.mapFile = d, t(d, "utf-8").toString().trim();
    }
    loadMap(d, u) {
      if (u === !1) return !1;
      if (u) {
        if (typeof u == "string")
          return u;
        if (typeof u == "function") {
          let p = u(d);
          if (p) {
            let y = this.loadFile(p);
            if (!y)
              throw new Error(
                "Unable to load previous source map: " + p.toString()
              );
            return y;
          }
        } else {
          if (u instanceof r)
            return o.fromSourceMap(u).toString();
          if (u instanceof o)
            return u.toString();
          if (this.isMap(u))
            return JSON.stringify(u);
          throw new Error(
            "Unsupported previous source map format: " + u.toString()
          );
        }
      } else {
        if (this.inline)
          return this.decodeInline(this.annotation);
        if (this.annotation) {
          let p = this.annotation;
          return d && (p = n(s(d), p)), this.loadFile(p);
        }
      }
    }
    startWith(d, u) {
      return d ? d.substr(0, u.length) === u : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  return $s = a, a.default = a, $s;
}
$l();
const Nl = { class: "flex gap-8 flex-row" }, Dl = { class: "flex flex-col" }, Fl = { class: "text-2xl" }, jl = { class: "flex-shrink-0" }, ql = { class: "flex flex-col" }, Hl = { class: "text-2xl" }, Ll = { class: "flex-shrink-0" }, Vl = { class: "flex flex-col" }, Bl = { class: "text-2xl" }, Ul = { class: "flex-shrink-0" }, Wl = {
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
      const r = Oe("ha-icon"), o = Oe("ha-card");
      return G(), $e("div", Nl, [
        T(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: D(() => [
            _("div", Dl, [
              n[0] || (n[0] = _("div", { class: "text-2xl" }, "Total tasks", -1)),
              _("div", Fl, Z(t.totalTasks), 1)
            ]),
            _("div", jl, [
              T(r, {
                class: "text-blue-500",
                ".icon": "mdi:calendar-blank"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: D(() => [
            _("div", ql, [
              n[1] || (n[1] = _("div", { class: "text-2xl" }, "Upcoming Tasks", -1)),
              _("div", Hl, Z(t.upcomingTasks), 1)
            ]),
            _("div", Ll, [
              T(r, {
                class: "text-yellow-500",
                ".icon": "mdi:bell"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: D(() => [
            _("div", Vl, [
              n[2] || (n[2] = _("div", { class: "text-2xl" }, "Overdue Tasks", -1)),
              _("div", Bl, Z(t.overdueTasks), 1)
            ]),
            _("div", Ul, [
              T(r, {
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
}, Kl = (e) => e.callWS({
  type: "maintenance_manager/get_tasks"
}), zl = (e, t) => e.callWS({
  type: "maintenance_manager/create_task",
  ...t
}), Gl = (e, t) => e.callWS({
  type: "maintenance_manager/delete_task",
  task_id: t
}), Jl = (e, t, s) => e.callWS({
  type: "maintenance_manager/complete_task",
  task_id: t,
  ...s
}), Yl = (e) => e.callWS({
  type: "maintenance_manager/get_history"
}), Yn = (e, t) => e.callWS({
  type: "maintenance_manager/get_attributes",
  task_sensor: t
}), Xl = (e, t) => e.callWS({
  type: "maintenance_manager/edit_task",
  ...t
}), Zl = ".header[data-v-0681a64f]{background-color:var(--app-header-background-color);color:var(--app-header-text-color, white);border-bottom:var(--app-header-border-bottom, none)}.toolbar[data-v-0681a64f]{height:var(--header-height);display:flex;align-items:center;font-size:20px;padding:0 16px;font-weight:400;box-sizing:border-box}.main-title[data-v-0681a64f]{margin:0 0 0 24px;line-height:20px;flex-grow:1}.version[data-v-0681a64f]{font-size:14px;font-weight:500;color:rgba(var(--rgb-text-primary-color),.9)}", so = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, r] of t)
    s[n] = r;
  return s;
}, Ql = { class: "header" }, ea = { class: "toolbar" }, ta = {
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
      const r = Oe("ha-menu-button");
      return G(), $e("div", Ql, [
        _("div", ea, [
          T(r, {
            ".hass": t.hass,
            ".narrow": t.narrow
          }, null, 40, [".hass", ".narrow"]),
          n[0] || (n[0] = _("div", { class: "main-title" }, " Device Maintenance Manager ", -1)),
          n[1] || (n[1] = _("div", { class: "version" }, " 1.0.0 ", -1))
        ])
      ]);
    };
  }
}, sa = /* @__PURE__ */ so(ta, [["styles", [Zl]], ["__scopeId", "data-v-0681a64f"]]), na = { class: "flex items-start justify-between mb-2" }, ra = { class: "text-2xl font-medium" }, oa = { class: "flex items-center gap-2 mr-5" }, ia = { class: "flex flex-col relative" }, la = { class: "flex flex-col items-start w-full" }, aa = { class: "flex items-center gap-2 justify-start w-full" }, ca = { class: "flex items-center gap-2 justify-start w-full" }, ua = { class: "text-xl font-light mb-6" }, fa = { class: "bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg" }, da = { class: "mb-1" }, pa = { class: "text-blue-600 ml-1" }, ha = { class: "text-blue-600 ml-1" }, ma = {
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
    const s = e, n = ne(!1), r = {
      below: "<",
      equal: "=",
      above: ">"
    }, o = t, i = () => {
      n.value = !1, o("deleteTask");
    }, a = () => {
      o("completeTask");
    }, c = () => {
      n.value = !1, o("editTask");
    }, d = () => {
      n.value = !n.value;
    };
    return (u, p) => {
      const y = Oe("ha-icon"), E = Oe("ha-button"), R = Oe("ha-card");
      return G(), ve(R, {
        class: Wt(["w-full", "p-6", { "border-red-700": s.overdue }])
      }, {
        default: D(() => [
          _("div", na, [
            _("div", ra, Z(s.name), 1),
            _("div", oa, [
              T(E, {
                onClick: a,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: D(() => [
                  T(y, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  p[0] || (p[0] = oe(" Complete ", -1))
                ]),
                _: 1
              }),
              _("div", ia, [
                T(E, {
                  onClick: eo(d, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: D(() => [
                    T(y, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (G(), ve(R, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: D(() => [
                    _("div", la, [
                      T(E, {
                        onClick: c,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          _("div", aa, [
                            T(y, { ".icon": "mdi:pencil" }, null, 32),
                            p[1] || (p[1] = oe(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      T(E, {
                        onClick: i,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          _("div", ca, [
                            T(y, { ".icon": "mdi:delete" }, null, 32),
                            p[2] || (p[2] = oe(" Delete ", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })) : at("", !0)
              ])
            ])
          ]),
          _("div", ua, Z(s.location), 1),
          _("div", fa, [
            _("div", da, [
              p[3] || (p[3] = _("span", { class: "text-blue-600 font-semibold" }, "Condition:", -1)),
              _("span", pa, Z(s.sensor) + " " + Z(r[s.operator] ?? "=") + " " + Z(s.value), 1)
            ]),
            _("div", null, [
              p[4] || (p[4] = _("span", { class: "text-blue-600 font-semibold" }, "Action:", -1)),
              _("span", ha, Z(s.description), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}, ga = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[8] p-4"
}, _a = { class: "flex justify-center w-full max-w-3xl" }, It = {
  __name: "Dialog",
  props: {
    show: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (t, s) => e.show ? (G(), $e("div", ga, [
      _("div", _a, [
        fi(t.$slots, "default")
      ])
    ])) : at("", !0);
  }
}, va = { class: "flex items-start justify-between mb-2" }, ba = { class: "text-2xl font-medium" }, xa = { class: "flex items-center gap-2 mr-5" }, ya = { class: "flex flex-col relative" }, wa = { class: "flex flex-col items-start w-full" }, Sa = { class: "flex items-center gap-2 justify-start w-full" }, Ta = { class: "flex items-center gap-2 justify-start w-full" }, Ca = { class: "text-xl font-light mb-6" }, Ea = { class: "text-lg" }, Aa = { class: "mb-2" }, Oa = { class: "ml-2 mb" }, Ma = { class: "mb-2" }, ka = { class: "ml-2" }, Pa = { class: "mb-2" }, Ia = { class: "ml-2" }, Ra = { class: "ml-2" }, $a = {
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
    const s = e, n = ne(!1), r = t, o = () => {
      n.value = !1, r("deleteTask");
    }, i = () => {
      r("completeTask");
    }, a = () => {
      n.value = !1, r("editTask");
    }, c = () => {
      n.value = !n.value;
    };
    return (d, u) => {
      const p = Oe("ha-icon"), y = Oe("ha-button"), E = Oe("ha-card");
      return G(), ve(E, {
        class: Wt(["w-full", "p-6", {
          "border-red-500": s.overdue,
          "border-yellow-500": s.warning && !s.overdue
        }])
      }, {
        default: D(() => [
          _("div", va, [
            _("div", ba, Z(s.name), 1),
            _("div", xa, [
              T(y, {
                onClick: i,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: D(() => [
                  T(p, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  u[0] || (u[0] = oe(" Complete ", -1))
                ]),
                _: 1
              }),
              _("div", ya, [
                T(y, {
                  onClick: eo(c, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: D(() => [
                    T(p, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (G(), ve(E, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: D(() => [
                    _("div", wa, [
                      T(y, {
                        onClick: a,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          _("div", Sa, [
                            T(p, { ".icon": "mdi:pencil" }, null, 32),
                            u[1] || (u[1] = oe(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      T(y, {
                        onClick: o,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          _("div", Ta, [
                            T(p, { ".icon": "mdi:delete" }, null, 32),
                            u[2] || (u[2] = oe(" Delete ", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })) : at("", !0)
              ])
            ])
          ]),
          _("div", Ca, Z(s.location), 1),
          _("div", Ea, [
            _("div", Aa, [
              u[3] || (u[3] = _("span", { class: "font-semibold" }, "Description:", -1)),
              _("span", Oa, Z(s.description), 1)
            ]),
            _("div", Ma, [
              T(p, { ".icon": "mdi:calendar" }, null, 32),
              _("span", ka, "Every " + Z(s.value) + " " + Z(s.seasonal_type == "runtime" ? "hours" : s.seasonal_type), 1)
            ]),
            _("div", Pa, [
              T(p, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
              _("span", Ia, "Next due: " + Z(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
            ]),
            _("div", null, [
              T(p, { ".icon": "mdi:check-circle-outline" }, null, 32),
              _("span", Ra, "Last completed: " + Z(s.last_completed != "" ? s.last_completed : "Not completed before..."), 1)
            ])
          ])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
};
function Na() {
  return {
    schemaNotes: Xe(
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
function Da(e, t, s, n) {
  return {
    schemaConditional: Xe(
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
            entity: {
              // domain: ["sensor", "binary_sensor"]
            }
          }
        },
        ...e.value && e.value.length > 1 ? [
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
                mode: "dropdown"
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
function Fa(e, t, s) {
  return {
    schemaInterval: Xe(
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
          name: "Last Completed",
          required: !1,
          selector: {
            date: {}
          }
        },
        {
          name: "Repeat Every",
          required: !0,
          selector: {
            number: { min: 1, mode: "box" }
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
                options: e.value.map((r) => r.option),
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
                mode: "dropdown"
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
function ja() {
  return {
    schemaFilter: Xe(
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
const qa = { class: "flex flex-col gap-10 justify-center m-6" }, Ha = { class: "flex items-center justify-between pb-5" }, La = { class: "flex-shrink-0" }, Va = { class: "flex flex-col" }, Ba = { class: "flex gap-5 text-2xl items-center" }, Ua = {
  key: 0,
  class: "text-2xl font-medium"
}, Wa = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, Ka = ["onClick"], za = { class: "truncate" }, Ga = { class: "flex flex-col mb-5" }, Ja = { class: "flex gap-5 text-2xl items-center" }, Ya = { class: "flex flex-row w-full mt-4 gap-3" }, Xa = { class: "flex flex-col mb-5" }, Za = { class: "flex gap-5 text-2xl items-center" }, Qa = { class: "flex flex-row w-full mt-4 gap-3" }, ec = { class: "flex flex-row w-full mt-4 gap-3" }, tc = { class: "flex flex-row w-full mt-4 gap-3" }, sc = { class: "flex flex-col" }, nc = { class: "flex gap-3 text-2xl items-center mb-2" }, rc = { class: "text-2xl font-medium" }, oc = { class: "text-lg font-medium mb-5" }, ic = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, lc = { class: "" }, ac = { class: "break-words" }, cc = /* @__PURE__ */ Er({
  __name: "App",
  props: {
    hass: { type: Object },
    narrow: { type: Boolean }
  },
  setup(e) {
    const t = e, s = ne({}), n = ne({}), r = ne([]), o = ne([]), i = ne(), a = ne([]), c = ne(!1), d = ne(!1), u = ne(!1), p = ne(!1), y = ne("null"), E = ne("null"), R = ne(!1), j = ne(!1), te = ne(!1), O = /* @__PURE__ */ new Set(["Task Name"]), W = Xe(() => r.value.length), Q = Xe(() => r.value.filter((P) => P.notified).length), I = Xe(() => r.value.filter((P) => P.warning && !P.notified).length), B = ne("interval"), ge = ne(""), ue = ne("interval"), ae = ne(null), Ce = ne(null), { schemaFilter: Ue } = ja(), { schemaConditional: nt } = Da(ae, Ce, j, R), { schemaInterval: ft } = Fa(ae, Ce, te), { schemaNotes: gt } = Na();
    es(
      () => t.hass,
      async (P) => {
        if (P)
          try {
            const m = await Kl(P), se = await Yl(P);
            a.value = se, r.value = m.map((H) => {
              if (H.type == "interval") {
                if (H.seasonal_type === "runtime")
                  return { ...H, warning: H.next_due <= 3600 };
                const ce = new Date(H.next_due), Pe = /* @__PURE__ */ new Date(), l = (ce.getTime() - Pe.getTime()) / (1e3 * 60 * 60 * 24);
                return { ...H, warning: l <= 0.5 };
              } else
                return { ...H, warning: !1 };
            }).sort((H, ce) => ce.notified !== H.notified ? ce.notified - H.notified : ce.warning !== H.warning ? Number(ce.warning) - Number(H.warning) : 0), i.value || (o.value = r.value), i.value == "areas" && Gt();
          } catch (m) {
            console.error("Failed to get devices:", m);
          }
      },
      { immediate: !0 }
    );
    const We = () => {
      c.value = !1, p.value = !1, R.value = !1, j.value = !1, te.value = !1, ae.value = [], Ce.value = {}, s.value = {};
    }, At = async () => {
      s.value.Type = ue.value, s.value.Control = Ce.value?.control, s.value["Condition Duration"] === !0 ? (O.add("Duration"), O.add("Duration Type")) : (O.delete("Duration"), O.delete("Duration Type"), s.value.Duration = 0, s.value["Duration Type"] = ""), s.value["Seasonal Task"] === !0 ? (O.add("Seasonal Interval"), O.add("Seasonal Type")) : (O.delete("Seasonal Interval"), O.delete("Seasonal Type"), s.value["Seasonal Interval"] = 0, s.value["Seasonal Type"] = ""), s.value.Type == "conditional" || s.value["Interval Type"] == "runtime" ? (O.add("Sensor"), Ce.value?.control == "number" ? O.add("Operator") : O.delete("Operator"), O.add("Value")) : (O.delete("Sensor"), O.delete("Operator"), O.delete("Value"), s.value.Sensor = "", s.value.Operator = "", s.value.Value = ""), s.value.Type == "interval" ? (O.add("Interval Type"), O.add("Repeat Every")) : (O.delete("Interval Type"), O.delete("Repeat Every"), s.value["Interval Type"] = "", s.value["Repeat Every"] = 0);
      for (const P of O)
        if (s.value[P] === void 0 || s.value[P] === null || s.value[P] === "") {
          alert(`Field '${P}' is required.`);
          return;
        }
      try {
        p.value ? await Xl(t.hass, s.value) : await zl(t.hass, s.value), We();
      } catch (P) {
        console.error("Failed to create maintenance task:", P);
      }
    }, re = async (P) => {
      if (P.detail.value.Sensor != "" && P.detail.value.Sensor != s.value.Sensor)
        try {
          const m = await Yn(t.hass, P.detail.value.Sensor);
          ae.value = m, Ce.value = ae.value.length > 1 ? {} : ae.value[0] ?? null, P.detail.value.Operator = "", P.detail.value.Value = "", P.detail.value.Attribute = "";
        } catch (m) {
          console.error("Failed to get attributes:", m);
        }
      if (u.value) {
        n.value = P.detail.value;
        return;
      }
      P.detail.value.Attribute != s.value.Attribute && (P.detail.value.Value = "", P.detail.value.Operator = ""), s.value = P.detail.value, R.value = s.value["Seasonal Task"] ?? !1, j.value = s.value["Condition Duration"] ?? !1, te.value = s.value["Interval Type"] == "runtime", s.value.Attribute && ae.value.length > 1 && (Ce.value = ae.value?.find((m) => m.option === s.value.Attribute) ?? null);
    }, X = async () => {
      if (t.hass)
        try {
          await Gl(t.hass, E.value), d.value = !1, E.value = "null";
        } catch (P) {
          console.error("Failed to delete task: ", P);
        }
    }, K = async () => {
      if (t.hass)
        try {
          await Jl(t.hass, y.value, n.value), u.value = !1, y.value = "null", n.value = {};
        } catch (P) {
          console.error("Failed to completing task: ", P);
        }
    }, Ke = (P) => {
      ge.value = a.value.find((m) => m.id === P);
    }, _t = Xe(
      () => [...ge.value.completion_dates].reverse()
    ), ze = () => {
      ue.value = "interval", s.value = {}, s.value.Type = "interval";
    }, ke = () => {
      ue.value = "conditional", s.value = {}, s.value.Type = "conditional";
    }, Ot = async (P) => {
      p.value = !0;
      const m = r.value.find((se) => se.id === P);
      if (m.sensor != "")
        try {
          const se = await Yn(t.hass, m.sensor);
          ae.value = se, Ce.value = ae.value?.find((H) => H.option === m.option) ?? se[0] ?? null;
        } catch (se) {
          console.error("Failed to get attributes:", se);
        }
      R.value = m.seasonal, j.value = m.duration_condition, te.value = m.seasonal_type == "runtime", ue.value = m.type, m.duration_type == "minutes" ? m.duration /= 60 : m.duration_type == "hours" && (m.duration /= 3600), s.value = {
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
    }, ys = async (P) => {
      switch (i.value = P.detail.value["Select Filter"], i.value) {
        case "areas":
          Gt();
          break;
        default:
          o.value = r.value;
          break;
      }
    }, Gt = () => {
      const P = {};
      r.value.forEach((m) => {
        P[m.location] || (P[m.location] = []), P[m.location].push(m);
      }), o.value = Object.entries(P).flatMap(([m, se]) => se);
    };
    return (P, m) => {
      const se = Oe("ha-icon"), H = Oe("ha-button"), ce = Oe("ha-form"), Pe = Oe("ha-card");
      return G(), $e(de, null, [
        t.hass ? (G(), ve(sa, {
          key: 0,
          hass: t.hass,
          narrow: t.narrow
        }, null, 8, ["hass", "narrow"])) : at("", !0),
        _("div", qa, [
          T(Wl, {
            totalTasks: W.value,
            upcomingTasks: I.value,
            overdueTasks: Q.value
          }, null, 8, ["totalTasks", "upcomingTasks", "overdueTasks"]),
          T(Pe, { class: "flex flex-col p-6 gap-5" }, {
            default: D(() => [
              _("div", Ha, [
                m[8] || (m[8] = _("div", { class: "flex flex-col" }, [
                  _("div", { class: "text-2xl font-medium" }, "Maintenance Tasks"),
                  _("div", { class: "text-xl" }, "Manage scheduled and conditional maintenance for your smart devices")
                ], -1)),
                _("div", La, [
                  _("div", Va, [
                    _("div", Ba, [
                      T(H, {
                        onClick: m[0] || (m[0] = (l) => c.value = !0)
                      }, {
                        default: D(() => [
                          T(se, {
                            class: "text-white",
                            ".icon": "mdi:plus"
                          }, null, 32),
                          m[7] || (m[7] = oe(" New Task", -1))
                        ]),
                        _: 1
                      }),
                      T(ce, {
                        ".hass": t.hass,
                        ".schema": rt(Ue),
                        onValueChanged: ys
                      }, null, 40, [".hass", ".schema"])
                    ])
                  ])
                ])
              ]),
              T(Pe, { class: "flex w-full p-1 gap-1 rounded-full" }, {
                default: D(() => [
                  T(H, {
                    onClick: m[1] || (m[1] = (l) => B.value = "interval"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: B.value === "interval" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: D(() => [
                      T(se, {
                        variant: "neutral",
                        ".icon": "mdi:calendar-blank"
                      }, null, 32),
                      m[9] || (m[9] = oe(" Interval tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(H, {
                    onClick: m[2] || (m[2] = (l) => B.value = "conditional"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: B.value === "conditional" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: D(() => [
                      T(se, {
                        variant: "neutral",
                        ".icon": "mdi:triangle-wave"
                      }, null, 32),
                      m[10] || (m[10] = oe(" Conditional tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(H, {
                    onClick: m[3] || (m[3] = (l) => B.value = "history"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: B.value === "history" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: D(() => [
                      T(se, {
                        variant: "neutral",
                        ".icon": "mdi:history"
                      }, null, 32),
                      m[11] || (m[11] = oe(" History", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"])
                ]),
                _: 1
              }),
              W.value == 0 ? (G(), $e("div", Ua, "No tasks created yet...")) : at("", !0),
              B.value === "conditional" ? (G(!0), $e(de, { key: 1 }, Zt(o.value.filter((l) => l.type == "conditional"), (l) => (G(), ve(ma, {
                key: l.id,
                id: l.id,
                name: l.name,
                location: l.location_name,
                description: l.description,
                sensor: l.sensor,
                operator: l.operator,
                value: l.value,
                overdue: l.notified,
                onDeleteTask: (f) => {
                  d.value = !0, E.value = l.id;
                },
                onCompleteTask: (f) => {
                  u.value = !0, y.value = l.id;
                },
                onEditTask: (f) => Ot(l.id)
              }, null, 8, ["id", "name", "location", "description", "sensor", "operator", "value", "overdue", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : at("", !0),
              B.value === "interval" ? (G(!0), $e(de, { key: 2 }, Zt(o.value.filter((l) => l.type == "interval"), (l) => (G(), ve($a, {
                key: l.id,
                id: l.id,
                name: l.name,
                location: l.location_name,
                description: l.description,
                value: l.seasonal_interval,
                overdue: l.notified,
                next_due: l.next_due,
                last_completed: l.last_completed,
                seasonal_type: l.seasonal_type,
                warning: l.warning,
                onDeleteTask: (f) => {
                  d.value = !0, E.value = l.id;
                },
                onCompleteTask: (f) => {
                  u.value = !0, y.value = l.id;
                },
                onEditTask: (f) => Ot(l.id)
              }, null, 8, ["id", "name", "location", "description", "value", "overdue", "next_due", "last_completed", "seasonal_type", "warning", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : at("", !0),
              B.value === "history" ? (G(), ve(Pe, {
                key: 3,
                class: "w-full p-4"
              }, {
                default: D(() => [
                  _("table", Wa, [
                    m[12] || (m[12] = _("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      _("tr", null, [
                        _("th", null, "Task Name"),
                        _("th", null, "Location"),
                        _("th", null, "Date"),
                        _("th", null, "Note")
                      ])
                    ], -1)),
                    _("tbody", null, [
                      (G(!0), $e(de, null, Zt(a.value, (l) => (G(), $e("tr", {
                        onClick: (f) => Ke(l.id),
                        class: "cursor-pointer",
                        key: l.id
                      }, [
                        _("td", null, Z(l.name), 1),
                        _("td", null, Z(l.location_name), 1),
                        _("td", null, Z(l.completion_dates.at(-1).date.replace("T", " ")), 1),
                        _("td", za, Z(l.completion_dates.at(-1).note), 1)
                      ], 8, Ka))), 128))
                    ])
                  ])
                ]),
                _: 1
              })) : at("", !0)
            ]),
            _: 1
          }),
          T(It, { show: c.value }, {
            default: D(() => [
              T(Pe, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: D(() => [
                  _("div", Ga, [
                    _("div", Ja, [
                      T(se, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: We
                      }, null, 32),
                      m[13] || (m[13] = _("div", { class: "flex-shrink-0" }, "Create Maintenance Task", -1))
                    ])
                  ]),
                  T(Pe, { class: "mb-2 flex w-full p-1 gap-1 rounded-full" }, {
                    default: D(() => [
                      T(H, {
                        onClick: ze,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ue.value === "interval" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: D(() => [...m[14] || (m[14] = [
                          oe("Interval tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"]),
                      T(H, {
                        onClick: ke,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ue.value === "conditional" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: D(() => [...m[15] || (m[15] = [
                          oe("Conditional tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"])
                    ]),
                    _: 1
                  }),
                  ue.value == "conditional" ? (G(), ve(ce, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": rt(nt),
                    onValueChanged: re
                  }, null, 40, [".hass", ".schema"])) : (G(), ve(ce, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": rt(ft),
                    onValueChanged: re
                  }, null, 40, [".hass", ".schema"])),
                  _("div", Ya, [
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: We
                    }, {
                      default: D(() => [...m[16] || (m[16] = [
                        oe("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      onClick: At
                    }, {
                      default: D(() => [...m[17] || (m[17] = [
                        oe("Create", -1)
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
          T(It, { show: p.value }, {
            default: D(() => [
              T(Pe, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: D(() => [
                  _("div", Xa, [
                    _("div", Za, [
                      T(se, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: We
                      }, null, 32),
                      m[18] || (m[18] = _("div", { class: "flex-shrink-0" }, "Edit Maintenance Task", -1))
                    ])
                  ]),
                  s.value.Type == "conditional" ? (G(), ve(ce, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": rt(nt),
                    ".data": s.value,
                    onValueChanged: re
                  }, null, 40, [".hass", ".schema", ".data"])) : (G(), ve(ce, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": rt(ft),
                    ".data": s.value,
                    onValueChanged: re
                  }, null, 40, [".hass", ".schema", ".data"])),
                  _("div", Qa, [
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: We
                    }, {
                      default: D(() => [...m[19] || (m[19] = [
                        oe("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      onClick: At
                    }, {
                      default: D(() => [...m[20] || (m[20] = [
                        oe("Edit", -1)
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
          T(It, { show: d.value }, {
            default: D(() => [
              T(Pe, { class: "p-6 flex flex-col" }, {
                default: D(() => [
                  m[23] || (m[23] = _("div", { class: "flex flex-col" }, [
                    _("div", { class: "text-2xl font-medium mb-5" }, "Create Maintenance Task"),
                    _("div", { class: "text-lg font-medium mb-5" }, "Are you sure you want to delete this maintenance task? This action cannot be undone.")
                  ], -1)),
                  _("div", ec, [
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[4] || (m[4] = (l) => d.value = !1)
                    }, {
                      default: D(() => [...m[21] || (m[21] = [
                        oe("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "danger",
                      onClick: X
                    }, {
                      default: D(() => [...m[22] || (m[22] = [
                        oe("Delete", -1)
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
          T(It, { show: u.value }, {
            default: D(() => [
              T(Pe, { class: "p-6 flex flex-col" }, {
                default: D(() => [
                  m[26] || (m[26] = _("div", { class: "flex flex-col" }, [
                    _("div", { class: "text-2xl font-medium mb-5" }, "Mark as Complete"),
                    _("div", { class: "text-lg font-medium mb-5" }, "Add any notes about completing this maintenance task (optional).")
                  ], -1)),
                  T(ce, {
                    ".hass": t.hass,
                    ".schema": rt(gt),
                    onValueChanged: re
                  }, null, 40, [".hass", ".schema"]),
                  _("div", tc, [
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[5] || (m[5] = (l) => u.value = !1)
                    }, {
                      default: D(() => [...m[24] || (m[24] = [
                        oe("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(H, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "brand",
                      onClick: K
                    }, {
                      default: D(() => [...m[25] || (m[25] = [
                        oe("Mark Complete", -1)
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
          T(It, {
            show: ge.value !== ""
          }, {
            default: D(() => [
              T(Pe, { class: "p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide" }, {
                default: D(() => [
                  _("div", sc, [
                    _("div", nc, [
                      T(se, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: m[6] || (m[6] = (l) => ge.value = "")
                      }, null, 32),
                      _("div", rc, Z(ge.value.name) + "'s history", 1)
                    ]),
                    _("div", oc, Z(ge.value.location), 1)
                  ]),
                  _("table", ic, [
                    m[27] || (m[27] = _("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      _("tr", null, [
                        _("th", null, "Date"),
                        _("th", null, "Note")
                      ])
                    ], -1)),
                    _("tbody", null, [
                      (G(!0), $e(de, null, Zt(_t.value, (l) => (G(), $e("tr", null, [
                        _("td", lc, Z(l.date.replace("T", " ")), 1),
                        _("td", ac, Z(l.note), 1)
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
}), uc = "*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\\[8\\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-4{margin-top:1rem}.flex{display:flex}.table{display:table}.hidden{display:none}.max-h-\\[80vh\\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5}.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[1\\.1em\\]{font-size:1.1em}.text-\\[1\\.2em\\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}", fc = /* @__PURE__ */ so(cc, [["styles", [uc]]]), dc = /* @__PURE__ */ Sl(fc);

if(!customElements.get("maintenance-manager-panel", dc)){
    customElements.define("maintenance-manager-panel", dc);
}