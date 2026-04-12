/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function zs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const Q = {}, wt = [], Le = () => {
}, Qn = () => !1, fs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Gs = (e) => e.startsWith("onUpdate:"), ie = Object.assign, Js = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, oo = Object.prototype.hasOwnProperty, V = (e, t) => oo.call(e, t), F = Array.isArray, yt = (e) => ds(e) === "[object Map]", er = (e) => ds(e) === "[object Set]", j = (e) => typeof e == "function", oe = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", tr = (e) => (se(e) || j(e)) && j(e.then) && j(e.catch), sr = Object.prototype.toString, ds = (e) => sr.call(e), io = (e) => ds(e).slice(8, -1), ps = (e) => ds(e) === "[object Object]", Ys = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Nt = /* @__PURE__ */ zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), hs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, lo = /-\w/g, we = hs(
  (e) => e.replace(lo, (t) => t.slice(1).toUpperCase())
), ao = /\B([A-Z])/g, Pe = hs(
  (e) => e.replace(ao, "-$1").toLowerCase()
), ms = hs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ts = hs(
  (e) => e ? `on${ms(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Cs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, nr = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, co = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, vn = (e) => {
  const t = oe(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let bn;
const gs = () => bn || (bn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Xs(e) {
  if (F(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = oe(n) ? ho(n) : Xs(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (oe(e) || se(e))
    return e;
}
const uo = /;(?![^(]*\))/g, fo = /:([^]+)/, po = /\/\*[^]*?\*\//g;
function ho(e) {
  const t = {};
  return e.replace(po, "").split(uo).forEach((s) => {
    if (s) {
      const n = s.split(fo);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Ut(e) {
  let t = "";
  if (oe(e))
    t = e;
  else if (F(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ut(e[s]);
      n && (t += n + " ");
    }
  else if (se(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const mo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", go = /* @__PURE__ */ zs(mo);
function rr(e) {
  return !!e || e === "";
}
const or = (e) => !!(e && e.__v_isRef === !0), G = (e) => oe(e) ? e : e == null ? "" : F(e) || se(e) && (e.toString === sr || !j(e.toString)) ? or(e) ? G(e.value) : JSON.stringify(e, ir, 2) : String(e), ir = (e, t) => or(t) ? ir(e, t.value) : yt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], o) => (s[Ss(n, o) + " =>"] = r, s),
    {}
  )
} : er(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Ss(s))
} : Qe(t) ? Ss(t) : se(t) && !F(t) && !ps(t) ? String(t) : t, Ss = (e, t = "") => {
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
class _o {
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
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function vo() {
  return Ce;
}
let Z;
const Es = /* @__PURE__ */ new WeakSet();
class lr {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || cr(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, xn(this), ur(this);
    const t = Z, s = Ne;
    Z = this, Ne = !0;
    try {
      return this.fn();
    } finally {
      fr(this), Z = t, Ne = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        en(t);
      this.deps = this.depsTail = void 0, xn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Es.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ds(this) && this.run();
  }
  get dirty() {
    return Ds(this);
  }
}
let ar = 0, Rt, $t;
function cr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = $t, $t = e;
    return;
  }
  e.next = Rt, Rt = e;
}
function Zs() {
  ar++;
}
function Qs() {
  if (--ar > 0)
    return;
  if ($t) {
    let t = $t;
    for ($t = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Rt; ) {
    let t = Rt;
    for (Rt = void 0; t; ) {
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
function ur(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fr(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const r = n.prevDep;
    n.version === -1 ? (n === s && (s = r), en(n), bo(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = r;
  }
  e.deps = t, e.depsTail = s;
}
function Ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (dr(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function dr(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === qt) || (e.globalVersion = qt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = Z, n = Ne;
  Z = e, Ne = !0;
  try {
    ur(e);
    const r = e.fn(e._value);
    (t.version === 0 || lt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Z = s, Ne = n, fr(e), e.flags &= -3;
  }
}
function en(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: r } = e;
  if (n && (n.nextSub = r, e.prevSub = void 0), r && (r.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep)
      en(o, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function bo(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ne = !0;
const pr = [];
function Ye() {
  pr.push(Ne), Ne = !1;
}
function Xe() {
  const e = pr.pop();
  Ne = e === void 0 ? !0 : e;
}
function xn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Z;
    Z = void 0;
    try {
      t();
    } finally {
      Z = s;
    }
  }
}
let qt = 0;
class xo {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class tn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!Z || !Ne || Z === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Z)
      s = this.activeLink = new xo(Z, this), Z.deps ? (s.prevDep = Z.depsTail, Z.depsTail.nextDep = s, Z.depsTail = s) : Z.deps = Z.depsTail = s, hr(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Z.depsTail, s.nextDep = void 0, Z.depsTail.nextDep = s, Z.depsTail = s, Z.deps === s && (Z.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, qt++, this.notify(t);
  }
  notify(t) {
    Zs();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Qs();
    }
  }
}
function hr(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        hr(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const Fs = /* @__PURE__ */ new WeakMap(), gt = Symbol(
  ""
), js = Symbol(
  ""
), Ht = Symbol(
  ""
);
function pe(e, t, s) {
  if (Ne && Z) {
    let n = Fs.get(e);
    n || Fs.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new tn()), r.map = n, r.key = s), r.track();
  }
}
function Ge(e, t, s, n, r, o) {
  const i = Fs.get(e);
  if (!i) {
    qt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Zs(), t === "clear")
    i.forEach(l);
  else {
    const c = F(e), p = c && Ys(s);
    if (c && s === "length") {
      const u = Number(n);
      i.forEach((h, g) => {
        (g === "length" || g === Ht || !Qe(g) && g >= u) && l(h);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && l(i.get(s)), p && l(i.get(Ht)), t) {
        case "add":
          c ? p && l(i.get("length")) : (l(i.get(gt)), yt(e) && l(i.get(js)));
          break;
        case "delete":
          c || (l(i.get(gt)), yt(e) && l(i.get(js)));
          break;
        case "set":
          yt(e) && l(i.get(gt));
          break;
      }
  }
  Qs();
}
function bt(e) {
  const t = U(e);
  return t === e ? t : (pe(t, "iterate", Ht), Ie(e) ? t : t.map(fe));
}
function _s(e) {
  return pe(e = U(e), "iterate", Ht), e;
}
const wo = {
  __proto__: null,
  [Symbol.iterator]() {
    return Os(this, Symbol.iterator, fe);
  },
  concat(...e) {
    return bt(this).concat(
      ...e.map((t) => F(t) ? bt(t) : t)
    );
  },
  entries() {
    return Os(this, "entries", (e) => (e[1] = fe(e[1]), e));
  },
  every(e, t) {
    return Ke(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ke(this, "filter", e, t, (s) => s.map(fe), arguments);
  },
  find(e, t) {
    return Ke(this, "find", e, t, fe, arguments);
  },
  findIndex(e, t) {
    return Ke(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ke(this, "findLast", e, t, fe, arguments);
  },
  findLastIndex(e, t) {
    return Ke(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ke(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ks(this, "includes", e);
  },
  indexOf(...e) {
    return ks(this, "indexOf", e);
  },
  join(e) {
    return bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ks(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ke(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return At(this, "pop");
  },
  push(...e) {
    return At(this, "push", e);
  },
  reduce(e, ...t) {
    return wn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return wn(this, "reduceRight", e, t);
  },
  shift() {
    return At(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ke(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return At(this, "splice", e);
  },
  toReversed() {
    return bt(this).toReversed();
  },
  toSorted(e) {
    return bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return At(this, "unshift", e);
  },
  values() {
    return Os(this, "values", fe);
  }
};
function Os(e, t, s) {
  const n = _s(e), r = n[t]();
  return n !== e && !Ie(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = s(o.value)), o;
  }), r;
}
const yo = Array.prototype;
function Ke(e, t, s, n, r, o) {
  const i = _s(e), l = i !== e && !Ie(e), c = i[t];
  if (c !== yo[t]) {
    const h = c.apply(e, o);
    return l ? fe(h) : h;
  }
  let p = s;
  i !== e && (l ? p = function(h, g) {
    return s.call(this, fe(h), g, e);
  } : s.length > 2 && (p = function(h, g) {
    return s.call(this, h, g, e);
  }));
  const u = c.call(i, p, n);
  return l && r ? r(u) : u;
}
function wn(e, t, s, n) {
  const r = _s(e);
  let o = s;
  return r !== e && (Ie(e) ? s.length > 3 && (o = function(i, l, c) {
    return s.call(this, i, l, c, e);
  }) : o = function(i, l, c) {
    return s.call(this, i, fe(l), c, e);
  }), r[t](o, ...n);
}
function ks(e, t, s) {
  const n = U(e);
  pe(n, "iterate", Ht);
  const r = n[t](...s);
  return (r === -1 || r === !1) && on(s[0]) ? (s[0] = U(s[0]), n[t](...s)) : r;
}
function At(e, t, s = []) {
  Ye(), Zs();
  const n = U(e)[t].apply(e, s);
  return Qs(), Xe(), n;
}
const To = /* @__PURE__ */ zs("__proto__,__v_isRef,__isVue"), mr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function Co(e) {
  Qe(e) || (e = String(e));
  const t = U(this);
  return pe(t, "has", e), t.hasOwnProperty(e);
}
class gr {
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
      return n === (r ? o ? Ro : xr : o ? br : vr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = F(t);
    if (!r) {
      let c;
      if (i && (c = wo[s]))
        return c;
      if (s === "hasOwnProperty")
        return Co;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      me(t) ? t : n
    );
    if ((Qe(s) ? mr.has(s) : To(s)) || (r || pe(t, "get", s), o))
      return l;
    if (me(l)) {
      const c = i && Ys(s) ? l : l.value;
      return r && se(c) ? Hs(c) : c;
    }
    return se(l) ? r ? Hs(l) : nn(l) : l;
  }
}
class _r extends gr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, r) {
    let o = t[s];
    if (!this._isShallow) {
      const c = at(o);
      if (!Ie(n) && !at(n) && (o = U(o), n = U(n)), !F(t) && me(o) && !me(n))
        return c || (o.value = n), !0;
    }
    const i = F(t) && Ys(s) ? Number(s) < t.length : V(t, s), l = Reflect.set(
      t,
      s,
      n,
      me(t) ? t : r
    );
    return t === U(r) && (i ? lt(n, o) && Ge(t, "set", s, n) : Ge(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = V(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && Ge(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Qe(s) || !mr.has(s)) && pe(t, "has", s), n;
  }
  ownKeys(t) {
    return pe(
      t,
      "iterate",
      F(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class So extends gr {
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
const Eo = /* @__PURE__ */ new _r(), Oo = /* @__PURE__ */ new So(), ko = /* @__PURE__ */ new _r(!0);
const qs = (e) => e, Jt = (e) => Reflect.getPrototypeOf(e);
function Ao(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = U(r), i = yt(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, p = r[e](...n), u = s ? qs : t ? rs : fe;
    return !t && pe(
      o,
      "iterate",
      c ? js : gt
    ), {
      // iterator protocol
      next() {
        const { value: h, done: g } = p.next();
        return g ? { value: h, done: g } : {
          value: l ? [u(h[0]), u(h[1])] : u(h),
          done: g
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
function Mo(e, t) {
  const s = {
    get(r) {
      const o = this.__v_raw, i = U(o), l = U(r);
      e || (lt(r, l) && pe(i, "get", r), pe(i, "get", l));
      const { has: c } = Jt(i), p = t ? qs : e ? rs : fe;
      if (c.call(i, r))
        return p(o.get(r));
      if (c.call(i, l))
        return p(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && pe(U(r), "iterate", gt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = U(o), l = U(r);
      return e || (lt(r, l) && pe(i, "has", r), pe(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, c = U(l), p = t ? qs : e ? rs : fe;
      return !e && pe(c, "iterate", gt), l.forEach((u, h) => r.call(o, p(u), p(h), i));
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
      add(r) {
        !t && !Ie(r) && !at(r) && (r = U(r));
        const o = U(this);
        return Jt(o).has.call(o, r) || (o.add(r), Ge(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !Ie(o) && !at(o) && (o = U(o));
        const i = U(this), { has: l, get: c } = Jt(i);
        let p = l.call(i, r);
        p || (r = U(r), p = l.call(i, r));
        const u = c.call(i, r);
        return i.set(r, o), p ? lt(o, u) && Ge(i, "set", r, o) : Ge(i, "add", r, o), this;
      },
      delete(r) {
        const o = U(this), { has: i, get: l } = Jt(o);
        let c = i.call(o, r);
        c || (r = U(r), c = i.call(o, r)), l && l.call(o, r);
        const p = o.delete(r);
        return c && Ge(o, "delete", r, void 0), p;
      },
      clear() {
        const r = U(this), o = r.size !== 0, i = r.clear();
        return o && Ge(
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
function sn(e, t) {
  const s = Mo(e, t);
  return (n, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? n : Reflect.get(
    V(s, r) && r in n ? s : n,
    r,
    o
  );
}
const Po = {
  get: /* @__PURE__ */ sn(!1, !1)
}, Io = {
  get: /* @__PURE__ */ sn(!1, !0)
}, No = {
  get: /* @__PURE__ */ sn(!0, !1)
};
const vr = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap();
function $o(e) {
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
function Do(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $o(io(e));
}
function nn(e) {
  return at(e) ? e : rn(
    e,
    !1,
    Eo,
    Po,
    vr
  );
}
function Fo(e) {
  return rn(
    e,
    !1,
    ko,
    Io,
    br
  );
}
function Hs(e) {
  return rn(
    e,
    !0,
    Oo,
    No,
    xr
  );
}
function rn(e, t, s, n, r) {
  if (!se(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = Do(e);
  if (o === 0)
    return e;
  const i = r.get(e);
  if (i)
    return i;
  const l = new Proxy(
    e,
    o === 2 ? n : s
  );
  return r.set(e, l), l;
}
function Tt(e) {
  return at(e) ? Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function at(e) {
  return !!(e && e.__v_isReadonly);
}
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
function on(e) {
  return e ? !!e.__v_raw : !1;
}
function U(e) {
  const t = e && e.__v_raw;
  return t ? U(t) : e;
}
function jo(e) {
  return !V(e, "__v_skip") && Object.isExtensible(e) && nr(e, "__v_skip", !0), e;
}
const fe = (e) => se(e) ? nn(e) : e, rs = (e) => se(e) ? Hs(e) : e;
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function te(e) {
  return qo(e, !1);
}
function qo(e, t) {
  return me(e) ? e : new Ho(e, t);
}
class Ho {
  constructor(t, s) {
    this.dep = new tn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : U(t), this._value = s ? t : fe(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Ie(t) || at(t);
    t = n ? t : U(t), lt(t, s) && (this._rawValue = t, this._value = n ? t : fe(t), this.dep.trigger());
  }
}
function nt(e) {
  return me(e) ? e.value : e;
}
const Lo = {
  get: (e, t, s) => t === "__v_raw" ? e : nt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return me(r) && !me(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function wr(e) {
  return Tt(e) ? e : new Proxy(e, Lo);
}
class Vo {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new tn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Z !== this)
      return cr(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return dr(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Bo(e, t, s = !1) {
  let n, r;
  return j(e) ? n = e : (n = e.get, r = e.set), new Vo(n, r, s);
}
const Xt = {}, os = /* @__PURE__ */ new WeakMap();
let mt;
function Uo(e, t = !1, s = mt) {
  if (s) {
    let n = os.get(s);
    n || os.set(s, n = []), n.push(e);
  }
}
function Wo(e, t, s = Q) {
  const { immediate: n, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = s, p = (N) => r ? N : Ie(N) || r === !1 || r === 0 ? it(N, 1) : it(N);
  let u, h, g, E, P = !1, R = !1;
  if (me(e) ? (h = () => e.value, P = Ie(e)) : Tt(e) ? (h = () => p(e), P = !0) : F(e) ? (R = !0, P = e.some((N) => Tt(N) || Ie(N)), h = () => e.map((N) => {
    if (me(N))
      return N.value;
    if (Tt(N))
      return p(N);
    if (j(N))
      return c ? c(N, 2) : N();
  })) : j(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (g) {
      Ye();
      try {
        g();
      } finally {
        Xe();
      }
    }
    const N = mt;
    mt = u;
    try {
      return c ? c(e, 3, [E]) : e(E);
    } finally {
      mt = N;
    }
  } : h = Le, t && r) {
    const N = h, W = r === !0 ? 1 / 0 : r;
    h = () => it(N(), W);
  }
  const J = vo(), k = () => {
    u.stop(), J && J.active && Js(J.effects, u);
  };
  if (o && t) {
    const N = t;
    t = (...W) => {
      N(...W), k();
    };
  }
  let B = R ? new Array(e.length).fill(Xt) : Xt;
  const ee = (N) => {
    if (!(!(u.flags & 1) || !u.dirty && !N))
      if (t) {
        const W = u.run();
        if (r || P || (R ? W.some((ge, ue) => lt(ge, B[ue])) : lt(W, B))) {
          g && g();
          const ge = mt;
          mt = u;
          try {
            const ue = [
              W,
              // pass undefined as the old value when it's changed for the first time
              B === Xt ? void 0 : R && B[0] === Xt ? [] : B,
              E
            ];
            B = W, c ? c(t, 3, ue) : (
              // @ts-expect-error
              t(...ue)
            );
          } finally {
            mt = ge;
          }
        }
      } else
        u.run();
  };
  return l && l(ee), u = new lr(h), u.scheduler = i ? () => i(ee, !1) : ee, E = (N) => Uo(N, !1, u), g = u.onStop = () => {
    const N = os.get(u);
    if (N) {
      if (c)
        c(N, 4);
      else
        for (const W of N) W();
      os.delete(u);
    }
  }, t ? n ? ee(!0) : B = u.run() : i ? i(ee.bind(null, !0), !0) : u.run(), k.pause = u.pause.bind(u), k.resume = u.resume.bind(u), k.stop = k, k;
}
function it(e, t = 1 / 0, s) {
  if (t <= 0 || !se(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, me(e))
    it(e.value, t, s);
  else if (F(e))
    for (let n = 0; n < e.length; n++)
      it(e[n], t, s);
  else if (er(e) || yt(e))
    e.forEach((n) => {
      it(n, t, s);
    });
  else if (ps(e)) {
    for (const n in e)
      it(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && it(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Wt(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (r) {
    vs(r, t, s);
  }
}
function Ve(e, t, s, n) {
  if (j(e)) {
    const r = Wt(e, t, s, n);
    return r && tr(r) && r.catch((o) => {
      vs(o, t, s);
    }), r;
  }
  if (F(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Ve(e[o], t, s, n));
    return r;
  }
}
function vs(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || Q;
  if (t) {
    let l = t.parent;
    const c = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let h = 0; h < u.length; h++)
          if (u[h](e, c, p) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      Ye(), Wt(o, null, 10, [
        e,
        c,
        p
      ]), Xe();
      return;
    }
  }
  Ko(e, s, r, n, i);
}
function Ko(e, t, s, n = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const be = [];
let je = -1;
const Ct = [];
let rt = null, xt = 0;
const yr = /* @__PURE__ */ Promise.resolve();
let is = null;
function Tr(e) {
  const t = is || yr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zo(e) {
  let t = je + 1, s = be.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = be[n], o = Lt(r);
    o < e || o === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function ln(e) {
  if (!(e.flags & 1)) {
    const t = Lt(e), s = be[be.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Lt(s) ? be.push(e) : be.splice(zo(t), 0, e), e.flags |= 1, Cr();
  }
}
function Cr() {
  is || (is = yr.then(Er));
}
function Go(e) {
  F(e) ? Ct.push(...e) : rt && e.id === -1 ? rt.splice(xt + 1, 0, e) : e.flags & 1 || (Ct.push(e), e.flags |= 1), Cr();
}
function yn(e, t, s = je + 1) {
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
  if (Ct.length) {
    const t = [...new Set(Ct)].sort(
      (s, n) => Lt(s) - Lt(n)
    );
    if (Ct.length = 0, rt) {
      rt.push(...t);
      return;
    }
    for (rt = t, xt = 0; xt < rt.length; xt++) {
      const s = rt[xt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    rt = null, xt = 0;
  }
}
const Lt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Er(e) {
  try {
    for (je = 0; je < be.length; je++) {
      const t = be[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Wt(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < be.length; je++) {
      const t = be[je];
      t && (t.flags &= -2);
    }
    je = -1, be.length = 0, Sr(), is = null, (be.length || Ct.length) && Er();
  }
}
let xe = null, Or = null;
function ls(e) {
  const t = xe;
  return xe = e, Or = e && e.type.__scopeId || null, t;
}
function $(e, t = xe, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && Nn(-1);
    const o = ls(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ls(o), n._d && Nn(1);
    }
    return i;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function pt(e, t, s, n) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[n];
    c && (Ye(), Ve(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), Xe());
  }
}
const Jo = Symbol("_vte"), Yo = (e) => e.__isTeleport, Xo = Symbol("_leaveCb");
function an(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, an(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function kr(e, t) {
  return j(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ie({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ar(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const as = /* @__PURE__ */ new WeakMap();
function Dt(e, t, s, n, r = !1) {
  if (F(e)) {
    e.forEach(
      (P, R) => Dt(
        P,
        t && (F(t) ? t[R] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (St(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Dt(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? pn(n.component) : n.el, i = r ? null : o, { i: l, r: c } = e, p = t && t.r, u = l.refs === Q ? l.refs = {} : l.refs, h = l.setupState, g = U(h), E = h === Q ? Qn : (P) => V(g, P);
  if (p != null && p !== c) {
    if (Tn(t), oe(p))
      u[p] = null, E(p) && (h[p] = null);
    else if (me(p)) {
      p.value = null;
      const P = t;
      P.k && (u[P.k] = null);
    }
  }
  if (j(c))
    Wt(c, l, 12, [i, u]);
  else {
    const P = oe(c), R = me(c);
    if (P || R) {
      const J = () => {
        if (e.f) {
          const k = P ? E(c) ? h[c] : u[c] : c.value;
          if (r)
            F(k) && Js(k, o);
          else if (F(k))
            k.includes(o) || k.push(o);
          else if (P)
            u[c] = [o], E(c) && (h[c] = u[c]);
          else {
            const B = [o];
            c.value = B, e.k && (u[e.k] = B);
          }
        } else P ? (u[c] = i, E(c) && (h[c] = i)) : R && (c.value = i, e.k && (u[e.k] = i));
      };
      if (i) {
        const k = () => {
          J(), as.delete(e);
        };
        k.id = -1, as.set(e, k), Oe(k, s);
      } else
        Tn(e), J();
    }
  }
}
function Tn(e) {
  const t = as.get(e);
  t && (t.flags |= 8, as.delete(e));
}
gs().requestIdleCallback;
gs().cancelIdleCallback;
const St = (e) => !!e.type.__asyncLoader, Mr = (e) => e.type.__isKeepAlive;
function Zo(e, t) {
  Pr(e, "a", t);
}
function Qo(e, t) {
  Pr(e, "da", t);
}
function Pr(e, t, s = he) {
  const n = e.__wdc || (e.__wdc = () => {
    let r = s;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (bs(t, n, s), s) {
    let r = s.parent;
    for (; r && r.parent; )
      Mr(r.parent.vnode) && ei(n, t, s, r), r = r.parent;
  }
}
function ei(e, t, s, n) {
  const r = bs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Ir(() => {
    Js(n[t], r);
  }, s);
}
function bs(e, t, s = he, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Ye();
      const l = Kt(s), c = Ve(t, s, e, i);
      return l(), Xe(), c;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const et = (e) => (t, s = he) => {
  (!Bt || e === "sp") && bs(e, (...n) => t(...n), s);
}, ti = et("bm"), si = et("m"), ni = et(
  "bu"
), ri = et("u"), oi = et(
  "bum"
), Ir = et("um"), ii = et(
  "sp"
), li = et("rtg"), ai = et("rtc");
function ci(e, t = he) {
  bs("ec", e, t);
}
const ui = "components";
function ce(e, t) {
  return di(ui, e, !0, t) || e;
}
const fi = Symbol.for("v-ndc");
function di(e, t, s = !0, n = !1) {
  const r = xe || he;
  if (r) {
    const o = r.type;
    {
      const l = sl(
        o,
        !1
      );
      if (l && (l === t || l === we(t) || l === ms(we(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Cn(r[e] || o[e], t) || // global registration
      Cn(r.appContext[e], t)
    );
    return !i && n ? o : i;
  }
}
function Cn(e, t) {
  return e && (e[t] || e[we(t)] || e[ms(we(t))]);
}
function Zt(e, t, s, n) {
  let r;
  const o = s, i = F(e);
  if (i || oe(e)) {
    const l = i && Tt(e);
    let c = !1, p = !1;
    l && (c = !Ie(e), p = at(e), e = _s(e)), r = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      r[u] = t(
        c ? p ? rs(fe(e[u])) : fe(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (se(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, o)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, p = l.length; c < p; c++) {
        const u = l[c];
        r[c] = t(e[u], u, c, o);
      }
    }
  else
    r = [];
  return r;
}
function pi(e, t, s = {}, n, r) {
  if (xe.ce || xe.parent && St(xe.parent) && xe.parent.ce) {
    const p = Object.keys(s).length > 0;
    return z(), ke(
      de,
      null,
      [T("slot", s, n)],
      p ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1), z();
  const i = o && Nr(o(s)), l = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, c = ke(
    de,
    {
      key: (l && !Qe(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && n ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function Nr(e) {
  return e.some((t) => fn(t) ? !(t.type === Ze || t.type === de && !Nr(t.children)) : !0) ? e : null;
}
const Ls = (e) => e ? Qr(e) ? pn(e) : Ls(e.parent) : null, Ft = (
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
    $parent: (e) => Ls(e.parent),
    $root: (e) => Ls(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => $r(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ln(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Tr.bind(e.proxy)),
    $watch: (e) => $i.bind(e)
  })
), As = (e, t) => e !== Q && !e.__isScriptSetup && V(e, t), hi = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: r, props: o, accessCache: i, type: l, appContext: c } = e;
    let p;
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
        if (As(n, t))
          return i[t] = 1, n[t];
        if (r !== Q && V(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && V(p, t)
        )
          return i[t] = 3, o[t];
        if (s !== Q && V(s, t))
          return i[t] = 4, s[t];
        Vs && (i[t] = 0);
      }
    }
    const u = Ft[t];
    let h, g;
    if (u)
      return t === "$attrs" && pe(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (h = l.__cssModules) && (h = h[t])
    )
      return h;
    if (s !== Q && V(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      g = c.config.globalProperties, V(g, t)
    )
      return g[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return As(r, t) ? (r[t] = s, !0) : n !== Q && V(n, t) ? (n[t] = s, !0) : V(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: o, type: i }
  }, l) {
    let c, p;
    return !!(s[l] || e !== Q && l[0] !== "$" && V(e, l) || As(t, l) || (c = o[0]) && V(c, l) || V(n, l) || V(Ft, l) || V(r.config.globalProperties, l) || (p = i.__cssModules) && p[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : V(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Sn(e) {
  return F(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Vs = !0;
function mi(e) {
  const t = $r(e), s = e.proxy, n = e.ctx;
  Vs = !1, t.beforeCreate && En(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: p,
    // lifecycle
    created: u,
    beforeMount: h,
    mounted: g,
    beforeUpdate: E,
    updated: P,
    activated: R,
    deactivated: J,
    beforeDestroy: k,
    beforeUnmount: B,
    destroyed: ee,
    unmounted: N,
    render: W,
    renderTracked: ge,
    renderTriggered: ue,
    errorCaptured: le,
    serverPrefetch: Se,
    // public API
    expose: Be,
    inheritAttrs: tt,
    // assets
    components: ct,
    directives: _t,
    filters: st
  } = t;
  if (p && gi(p, n, null), i)
    for (const Y in i) {
      const H = i[Y];
      j(H) && (n[Y] = H.bind(s));
    }
  if (r) {
    const Y = r.call(s, s);
    se(Y) && (e.data = nn(Y));
  }
  if (Vs = !0, o)
    for (const Y in o) {
      const H = o[Y], Ue = j(H) ? H.bind(s, s) : j(H.get) ? H.get.bind(s, s) : Le, vt = !j(H) && j(H.set) ? H.set.bind(s) : Le, We = Je({
        get: Ue,
        set: vt
      });
      Object.defineProperty(n, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => We.value,
        set: (Me) => We.value = Me
      });
    }
  if (l)
    for (const Y in l)
      Rr(l[Y], n, s, Y);
  if (c) {
    const Y = j(c) ? c.call(s) : c;
    Reflect.ownKeys(Y).forEach((H) => {
      yi(H, Y[H]);
    });
  }
  u && En(u, e, "c");
  function ne(Y, H) {
    F(H) ? H.forEach((Ue) => Y(Ue.bind(s))) : H && Y(H.bind(s));
  }
  if (ne(ti, h), ne(si, g), ne(ni, E), ne(ri, P), ne(Zo, R), ne(Qo, J), ne(ci, le), ne(ai, ge), ne(li, ue), ne(oi, B), ne(Ir, N), ne(ii, Se), F(Be))
    if (Be.length) {
      const Y = e.exposed || (e.exposed = {});
      Be.forEach((H) => {
        Object.defineProperty(Y, H, {
          get: () => s[H],
          set: (Ue) => s[H] = Ue,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  W && e.render === Le && (e.render = W), tt != null && (e.inheritAttrs = tt), ct && (e.components = ct), _t && (e.directives = _t), Se && Ar(e);
}
function gi(e, t, s = Le) {
  F(e) && (e = Bs(e));
  for (const n in e) {
    const r = e[n];
    let o;
    se(r) ? "default" in r ? o = es(
      r.from || n,
      r.default,
      !0
    ) : o = es(r.from || n) : o = es(r), me(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function En(e, t, s) {
  Ve(
    F(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Rr(e, t, s, n) {
  let r = n.includes(".") ? Gr(s, n) : () => s[n];
  if (oe(e)) {
    const o = t[e];
    j(o) && ts(r, o);
  } else if (j(e))
    ts(r, e.bind(s));
  else if (se(e))
    if (F(e))
      e.forEach((o) => Rr(o, t, s, n));
    else {
      const o = j(e.handler) ? e.handler.bind(s) : t[e.handler];
      j(o) && ts(r, o, e);
    }
}
function $r(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let c;
  return l ? c = l : !r.length && !s && !n ? c = t : (c = {}, r.length && r.forEach(
    (p) => cs(c, p, i, !0)
  ), cs(c, t, i)), se(t) && o.set(t, c), c;
}
function cs(e, t, s, n = !1) {
  const { mixins: r, extends: o } = t;
  o && cs(e, o, s, !0), r && r.forEach(
    (i) => cs(e, i, s, !0)
  );
  for (const i in t)
    if (!(n && i === "expose")) {
      const l = _i[i] || s && s[i];
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const _i = {
  data: On,
  props: kn,
  emits: kn,
  // objects
  methods: It,
  computed: It,
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
  components: It,
  directives: It,
  // watch
  watch: bi,
  // provide / inject
  provide: On,
  inject: vi
};
function On(e, t) {
  return t ? e ? function() {
    return ie(
      j(e) ? e.call(this, this) : e,
      j(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function vi(e, t) {
  return It(Bs(e), Bs(t));
}
function Bs(e) {
  if (F(e)) {
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
function It(e, t) {
  return e ? ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function kn(e, t) {
  return e ? F(e) && F(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ie(
    /* @__PURE__ */ Object.create(null),
    Sn(e),
    Sn(t ?? {})
  ) : t;
}
function bi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ie(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function Dr() {
  return {
    app: null,
    config: {
      isNativeTag: Qn,
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
let xi = 0;
function wi(e, t) {
  return function(n, r = null) {
    j(n) || (n = ie({}, n)), r != null && !se(r) && (r = null);
    const o = Dr(), i = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const p = o.app = {
      _uid: xi++,
      _component: n,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: rl,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return i.has(u) || (u && j(u.install) ? (i.add(u), u.install(p, ...h)) : j(u) && (i.add(u), u(p, ...h))), p;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), p;
      },
      component(u, h) {
        return h ? (o.components[u] = h, p) : o.components[u];
      },
      directive(u, h) {
        return h ? (o.directives[u] = h, p) : o.directives[u];
      },
      mount(u, h, g) {
        if (!c) {
          const E = p._ceVNode || T(n, r);
          return E.appContext = o, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(E, u, g), c = !0, p._container = u, u.__vue_app__ = p, pn(E.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (Ve(
          l,
          p._instance,
          16
        ), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(u, h) {
        return o.provides[u] = h, p;
      },
      runWithContext(u) {
        const h = Et;
        Et = p;
        try {
          return u();
        } finally {
          Et = h;
        }
      }
    };
    return p;
  };
}
let Et = null;
function yi(e, t) {
  if (he) {
    let s = he.provides;
    const n = he.parent && he.parent.provides;
    n === s && (s = he.provides = Object.create(n)), s[e] = t;
  }
}
function es(e, t, s = !1) {
  const n = Xi();
  if (n || Et) {
    let r = Et ? Et._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && j(t) ? t.call(n && n.proxy) : t;
  }
}
const Fr = {}, jr = () => Object.create(Fr), qr = (e) => Object.getPrototypeOf(e) === Fr;
function Ti(e, t, s, n = !1) {
  const r = {}, o = jr();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Hr(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  s ? e.props = n ? r : Fo(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function Ci(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = U(r), [c] = e.propsOptions;
  let p = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let g = u[h];
        if (xs(e.emitsOptions, g))
          continue;
        const E = t[g];
        if (c)
          if (V(o, g))
            E !== o[g] && (o[g] = E, p = !0);
          else {
            const P = we(g);
            r[P] = Us(
              c,
              l,
              P,
              E,
              e,
              !1
            );
          }
        else
          E !== o[g] && (o[g] = E, p = !0);
      }
    }
  } else {
    Hr(e, t, r, o) && (p = !0);
    let u;
    for (const h in l)
      (!t || // for camelCase
      !V(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = Pe(h)) === h || !V(t, u))) && (c ? s && // for camelCase
      (s[h] !== void 0 || // for kebab-case
      s[u] !== void 0) && (r[h] = Us(
        c,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete r[h]);
    if (o !== l)
      for (const h in o)
        (!t || !V(t, h)) && (delete o[h], p = !0);
  }
  p && Ge(e.attrs, "set", "");
}
function Hr(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Nt(c))
        continue;
      const p = t[c];
      let u;
      r && V(r, u = we(c)) ? !o || !o.includes(u) ? s[u] = p : (l || (l = {}))[u] = p : xs(e.emitsOptions, c) || (!(c in n) || p !== n[c]) && (n[c] = p, i = !0);
    }
  if (o) {
    const c = U(s), p = l || Q;
    for (let u = 0; u < o.length; u++) {
      const h = o[u];
      s[h] = Us(
        r,
        c,
        h,
        p[h],
        e,
        !V(p, h)
      );
    }
  }
  return i;
}
function Us(e, t, s, n, r, o) {
  const i = e[s];
  if (i != null) {
    const l = V(i, "default");
    if (l && n === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && j(c)) {
        const { propsDefaults: p } = r;
        if (s in p)
          n = p[s];
        else {
          const u = Kt(r);
          n = p[s] = c.call(
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
    ] && (o && !l ? n = !1 : i[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Pe(s)) && (n = !0));
  }
  return n;
}
const Si = /* @__PURE__ */ new WeakMap();
function Lr(e, t, s = !1) {
  const n = s ? Si : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let c = !1;
  if (!j(e)) {
    const u = (h) => {
      c = !0;
      const [g, E] = Lr(h, t, !0);
      ie(i, g), E && l.push(...E);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !c)
    return se(e) && n.set(e, wt), wt;
  if (F(o))
    for (let u = 0; u < o.length; u++) {
      const h = we(o[u]);
      An(h) && (i[h] = Q);
    }
  else if (o)
    for (const u in o) {
      const h = we(u);
      if (An(h)) {
        const g = o[u], E = i[h] = F(g) || j(g) ? { type: g } : ie({}, g), P = E.type;
        let R = !1, J = !0;
        if (F(P))
          for (let k = 0; k < P.length; ++k) {
            const B = P[k], ee = j(B) && B.name;
            if (ee === "Boolean") {
              R = !0;
              break;
            } else ee === "String" && (J = !1);
          }
        else
          R = j(P) && P.name === "Boolean";
        E[
          0
          /* shouldCast */
        ] = R, E[
          1
          /* shouldCastTrue */
        ] = J, (R || V(E, "default")) && l.push(h);
      }
    }
  const p = [i, l];
  return se(e) && n.set(e, p), p;
}
function An(e) {
  return e[0] !== "$" && !Nt(e);
}
const cn = (e) => e === "_" || e === "_ctx" || e === "$stable", un = (e) => F(e) ? e.map(qe) : [qe(e)], Ei = (e, t, s) => {
  if (t._n)
    return t;
  const n = $((...r) => un(t(...r)), s);
  return n._c = !1, n;
}, Vr = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (cn(r)) continue;
    const o = e[r];
    if (j(o))
      t[r] = Ei(r, o, n);
    else if (o != null) {
      const i = un(o);
      t[r] = () => i;
    }
  }
}, Br = (e, t) => {
  const s = un(t);
  e.slots.default = () => s;
}, Ur = (e, t, s) => {
  for (const n in t)
    (s || !cn(n)) && (e[n] = t[n]);
}, Oi = (e, t, s) => {
  const n = e.slots = jr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Ur(n, t, s), s && nr(n, "_", r, !0)) : Vr(t, n);
  } else t && Br(e, t);
}, ki = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = Q;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? o = !1 : Ur(r, t, s) : (o = !t.$stable, Vr(t, r)), i = t;
  } else t && (Br(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !cn(l) && i[l] == null && delete r[l];
}, Oe = Bi;
function Ai(e) {
  return Mi(e);
}
function Mi(e, t) {
  const s = gs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: l,
    createComment: c,
    setText: p,
    setElementText: u,
    parentNode: h,
    nextSibling: g,
    setScopeId: E = Le,
    insertStaticContent: P
  } = e, R = (a, f, d, _ = null, v = null, b = null, S = void 0, C = null, y = !!f.dynamicChildren) => {
    if (a === f)
      return;
    a && !Mt(a, f) && (_ = dt(a), Me(a, v, b, !0), a = null), f.patchFlag === -2 && (y = !1, f.dynamicChildren = null);
    const { type: w, ref: M, shapeFlag: O } = f;
    switch (w) {
      case ws:
        J(a, f, d, _);
        break;
      case Ze:
        k(a, f, d, _);
        break;
      case Ps:
        a == null && B(f, d, _, S);
        break;
      case de:
        ct(
          a,
          f,
          d,
          _,
          v,
          b,
          S,
          C,
          y
        );
        break;
      default:
        O & 1 ? W(
          a,
          f,
          d,
          _,
          v,
          b,
          S,
          C,
          y
        ) : O & 6 ? _t(
          a,
          f,
          d,
          _,
          v,
          b,
          S,
          C,
          y
        ) : (O & 64 || O & 128) && w.process(
          a,
          f,
          d,
          _,
          v,
          b,
          S,
          C,
          y,
          L
        );
    }
    M != null && v ? Dt(M, a && a.ref, b, f || a, !f) : M == null && a && a.ref != null && Dt(a.ref, null, b, a, !0);
  }, J = (a, f, d, _) => {
    if (a == null)
      n(
        f.el = l(f.children),
        d,
        _
      );
    else {
      const v = f.el = a.el;
      f.children !== a.children && p(v, f.children);
    }
  }, k = (a, f, d, _) => {
    a == null ? n(
      f.el = c(f.children || ""),
      d,
      _
    ) : f.el = a.el;
  }, B = (a, f, d, _) => {
    [a.el, a.anchor] = P(
      a.children,
      f,
      d,
      _,
      a.el,
      a.anchor
    );
  }, ee = ({ el: a, anchor: f }, d, _) => {
    let v;
    for (; a && a !== f; )
      v = g(a), n(a, d, _), a = v;
    n(f, d, _);
  }, N = ({ el: a, anchor: f }) => {
    let d;
    for (; a && a !== f; )
      d = g(a), r(a), a = d;
    r(f);
  }, W = (a, f, d, _, v, b, S, C, y) => {
    f.type === "svg" ? S = "svg" : f.type === "math" && (S = "mathml"), a == null ? ge(
      f,
      d,
      _,
      v,
      b,
      S,
      C,
      y
    ) : Se(
      a,
      f,
      v,
      b,
      S,
      C,
      y
    );
  }, ge = (a, f, d, _, v, b, S, C) => {
    let y, w;
    const { props: M, shapeFlag: O, transition: A, dirs: D } = a;
    if (y = a.el = i(
      a.type,
      b,
      M && M.is,
      M
    ), O & 8 ? u(y, a.children) : O & 16 && le(
      a.children,
      y,
      null,
      _,
      v,
      Ms(a, b),
      S,
      C
    ), D && pt(a, null, _, "created"), ue(y, a, a.scopeId, S, _), M) {
      for (const X in M)
        X !== "value" && !Nt(X) && o(y, X, null, M[X], b, _);
      "value" in M && o(y, "value", null, M.value, b), (w = M.onVnodeBeforeMount) && Fe(w, _, a);
    }
    D && pt(a, null, _, "beforeMount");
    const q = Pi(v, A);
    q && A.beforeEnter(y), n(y, f, d), ((w = M && M.onVnodeMounted) || q || D) && Oe(() => {
      w && Fe(w, _, a), q && A.enter(y), D && pt(a, null, _, "mounted");
    }, v);
  }, ue = (a, f, d, _, v) => {
    if (d && E(a, d), _)
      for (let b = 0; b < _.length; b++)
        E(a, _[b]);
    if (v) {
      let b = v.subTree;
      if (f === b || Yr(b.type) && (b.ssContent === f || b.ssFallback === f)) {
        const S = v.vnode;
        ue(
          a,
          S,
          S.scopeId,
          S.slotScopeIds,
          v.parent
        );
      }
    }
  }, le = (a, f, d, _, v, b, S, C, y = 0) => {
    for (let w = y; w < a.length; w++) {
      const M = a[w] = C ? ot(a[w]) : qe(a[w]);
      R(
        null,
        M,
        f,
        d,
        _,
        v,
        b,
        S,
        C
      );
    }
  }, Se = (a, f, d, _, v, b, S) => {
    const C = f.el = a.el;
    let { patchFlag: y, dynamicChildren: w, dirs: M } = f;
    y |= a.patchFlag & 16;
    const O = a.props || Q, A = f.props || Q;
    let D;
    if (d && ht(d, !1), (D = A.onVnodeBeforeUpdate) && Fe(D, d, f, a), M && pt(f, a, d, "beforeUpdate"), d && ht(d, !0), (O.innerHTML && A.innerHTML == null || O.textContent && A.textContent == null) && u(C, ""), w ? Be(
      a.dynamicChildren,
      w,
      C,
      d,
      _,
      Ms(f, v),
      b
    ) : S || H(
      a,
      f,
      C,
      null,
      d,
      _,
      Ms(f, v),
      b,
      !1
    ), y > 0) {
      if (y & 16)
        tt(C, O, A, d, v);
      else if (y & 2 && O.class !== A.class && o(C, "class", null, A.class, v), y & 4 && o(C, "style", O.style, A.style, v), y & 8) {
        const q = f.dynamicProps;
        for (let X = 0; X < q.length; X++) {
          const K = q[X], ye = O[K], Te = A[K];
          (Te !== ye || K === "value") && o(C, K, ye, Te, v, d);
        }
      }
      y & 1 && a.children !== f.children && u(C, f.children);
    } else !S && w == null && tt(C, O, A, d, v);
    ((D = A.onVnodeUpdated) || M) && Oe(() => {
      D && Fe(D, d, f, a), M && pt(f, a, d, "updated");
    }, _);
  }, Be = (a, f, d, _, v, b, S) => {
    for (let C = 0; C < f.length; C++) {
      const y = a[C], w = f[C], M = (
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
          d
        )
      );
      R(
        y,
        w,
        M,
        null,
        _,
        v,
        b,
        S,
        !0
      );
    }
  }, tt = (a, f, d, _, v) => {
    if (f !== d) {
      if (f !== Q)
        for (const b in f)
          !Nt(b) && !(b in d) && o(
            a,
            b,
            f[b],
            null,
            v,
            _
          );
      for (const b in d) {
        if (Nt(b)) continue;
        const S = d[b], C = f[b];
        S !== C && b !== "value" && o(a, b, C, S, v, _);
      }
      "value" in d && o(a, "value", f.value, d.value, v);
    }
  }, ct = (a, f, d, _, v, b, S, C, y) => {
    const w = f.el = a ? a.el : l(""), M = f.anchor = a ? a.anchor : l("");
    let { patchFlag: O, dynamicChildren: A, slotScopeIds: D } = f;
    D && (C = C ? C.concat(D) : D), a == null ? (n(w, d, _), n(M, d, _), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      d,
      M,
      v,
      b,
      S,
      C,
      y
    )) : O > 0 && O & 64 && A && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (Be(
      a.dynamicChildren,
      A,
      d,
      v,
      b,
      S,
      C
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || v && f === v.subTree) && Wr(
      a,
      f,
      !0
      /* shallow */
    )) : H(
      a,
      f,
      d,
      M,
      v,
      b,
      S,
      C,
      y
    );
  }, _t = (a, f, d, _, v, b, S, C, y) => {
    f.slotScopeIds = C, a == null ? f.shapeFlag & 512 ? v.ctx.activate(
      f,
      d,
      _,
      S,
      y
    ) : st(
      f,
      d,
      _,
      v,
      b,
      S,
      y
    ) : ut(a, f, y);
  }, st = (a, f, d, _, v, b, S) => {
    const C = a.component = Yi(
      a,
      _,
      v
    );
    if (Mr(a) && (C.ctx.renderer = L), Zi(C, !1, S), C.asyncDep) {
      if (v && v.registerDep(C, ne, S), !a.el) {
        const y = C.subTree = T(Ze);
        k(null, y, f, d), a.placeholder = y.el;
      }
    } else
      ne(
        C,
        a,
        f,
        d,
        v,
        b,
        S
      );
  }, ut = (a, f, d) => {
    const _ = f.component = a.component;
    if (Li(a, f, d))
      if (_.asyncDep && !_.asyncResolved) {
        Y(_, f, d);
        return;
      } else
        _.next = f, _.update();
    else
      f.el = a.el, _.vnode = f;
  }, ne = (a, f, d, _, v, b, S) => {
    const C = () => {
      if (a.isMounted) {
        let { next: O, bu: A, u: D, parent: q, vnode: X } = a;
        {
          const $e = Kr(a);
          if ($e) {
            O && (O.el = X.el, Y(a, O, S)), $e.asyncDep.then(() => {
              a.isUnmounted || C();
            });
            return;
          }
        }
        let K = O, ye;
        ht(a, !1), O ? (O.el = X.el, Y(a, O, S)) : O = X, A && Cs(A), (ye = O.props && O.props.onVnodeBeforeUpdate) && Fe(ye, q, O, X), ht(a, !0);
        const Te = Pn(a), Re = a.subTree;
        a.subTree = Te, R(
          Re,
          Te,
          // parent may have changed if it's in a teleport
          h(Re.el),
          // anchor may have changed if it's in a fragment
          dt(Re),
          a,
          v,
          b
        ), O.el = Te.el, K === null && Vi(a, Te.el), D && Oe(D, v), (ye = O.props && O.props.onVnodeUpdated) && Oe(
          () => Fe(ye, q, O, X),
          v
        );
      } else {
        let O;
        const { el: A, props: D } = f, { bm: q, m: X, parent: K, root: ye, type: Te } = a, Re = St(f);
        ht(a, !1), q && Cs(q), !Re && (O = D && D.onVnodeBeforeMount) && Fe(O, K, f), ht(a, !0);
        {
          ye.ce && // @ts-expect-error _def is private
          ye.ce._def.shadowRoot !== !1 && ye.ce._injectChildStyle(Te);
          const $e = a.subTree = Pn(a);
          R(
            null,
            $e,
            d,
            _,
            a,
            v,
            b
          ), f.el = $e.el;
        }
        if (X && Oe(X, v), !Re && (O = D && D.onVnodeMounted)) {
          const $e = f;
          Oe(
            () => Fe(O, K, $e),
            v
          );
        }
        (f.shapeFlag & 256 || K && St(K.vnode) && K.vnode.shapeFlag & 256) && a.a && Oe(a.a, v), a.isMounted = !0, f = d = _ = null;
      }
    };
    a.scope.on();
    const y = a.effect = new lr(C);
    a.scope.off();
    const w = a.update = y.run.bind(y), M = a.job = y.runIfDirty.bind(y);
    M.i = a, M.id = a.uid, y.scheduler = () => ln(M), ht(a, !0), w();
  }, Y = (a, f, d) => {
    f.component = a;
    const _ = a.vnode.props;
    a.vnode = f, a.next = null, Ci(a, f.props, _, d), ki(a, f.children, d), Ye(), yn(a), Xe();
  }, H = (a, f, d, _, v, b, S, C, y = !1) => {
    const w = a && a.children, M = a ? a.shapeFlag : 0, O = f.children, { patchFlag: A, shapeFlag: D } = f;
    if (A > 0) {
      if (A & 128) {
        vt(
          w,
          O,
          d,
          _,
          v,
          b,
          S,
          C,
          y
        );
        return;
      } else if (A & 256) {
        Ue(
          w,
          O,
          d,
          _,
          v,
          b,
          S,
          C,
          y
        );
        return;
      }
    }
    D & 8 ? (M & 16 && ft(w, v, b), O !== w && u(d, O)) : M & 16 ? D & 16 ? vt(
      w,
      O,
      d,
      _,
      v,
      b,
      S,
      C,
      y
    ) : ft(w, v, b, !0) : (M & 8 && u(d, ""), D & 16 && le(
      O,
      d,
      _,
      v,
      b,
      S,
      C,
      y
    ));
  }, Ue = (a, f, d, _, v, b, S, C, y) => {
    a = a || wt, f = f || wt;
    const w = a.length, M = f.length, O = Math.min(w, M);
    let A;
    for (A = 0; A < O; A++) {
      const D = f[A] = y ? ot(f[A]) : qe(f[A]);
      R(
        a[A],
        D,
        d,
        null,
        v,
        b,
        S,
        C,
        y
      );
    }
    w > M ? ft(
      a,
      v,
      b,
      !0,
      !1,
      O
    ) : le(
      f,
      d,
      _,
      v,
      b,
      S,
      C,
      y,
      O
    );
  }, vt = (a, f, d, _, v, b, S, C, y) => {
    let w = 0;
    const M = f.length;
    let O = a.length - 1, A = M - 1;
    for (; w <= O && w <= A; ) {
      const D = a[w], q = f[w] = y ? ot(f[w]) : qe(f[w]);
      if (Mt(D, q))
        R(
          D,
          q,
          d,
          null,
          v,
          b,
          S,
          C,
          y
        );
      else
        break;
      w++;
    }
    for (; w <= O && w <= A; ) {
      const D = a[O], q = f[A] = y ? ot(f[A]) : qe(f[A]);
      if (Mt(D, q))
        R(
          D,
          q,
          d,
          null,
          v,
          b,
          S,
          C,
          y
        );
      else
        break;
      O--, A--;
    }
    if (w > O) {
      if (w <= A) {
        const D = A + 1, q = D < M ? f[D].el : _;
        for (; w <= A; )
          R(
            null,
            f[w] = y ? ot(f[w]) : qe(f[w]),
            d,
            q,
            v,
            b,
            S,
            C,
            y
          ), w++;
      }
    } else if (w > A)
      for (; w <= O; )
        Me(a[w], v, b, !0), w++;
    else {
      const D = w, q = w, X = /* @__PURE__ */ new Map();
      for (w = q; w <= A; w++) {
        const Ee = f[w] = y ? ot(f[w]) : qe(f[w]);
        Ee.key != null && X.set(Ee.key, w);
      }
      let K, ye = 0;
      const Te = A - q + 1;
      let Re = !1, $e = 0;
      const kt = new Array(Te);
      for (w = 0; w < Te; w++) kt[w] = 0;
      for (w = D; w <= O; w++) {
        const Ee = a[w];
        if (ye >= Te) {
          Me(Ee, v, b, !0);
          continue;
        }
        let De;
        if (Ee.key != null)
          De = X.get(Ee.key);
        else
          for (K = q; K <= A; K++)
            if (kt[K - q] === 0 && Mt(Ee, f[K])) {
              De = K;
              break;
            }
        De === void 0 ? Me(Ee, v, b, !0) : (kt[De - q] = w + 1, De >= $e ? $e = De : Re = !0, R(
          Ee,
          f[De],
          d,
          null,
          v,
          b,
          S,
          C,
          y
        ), ye++);
      }
      const mn = Re ? Ii(kt) : wt;
      for (K = mn.length - 1, w = Te - 1; w >= 0; w--) {
        const Ee = q + w, De = f[Ee], gn = f[Ee + 1], _n = Ee + 1 < M ? (
          // #13559, fallback to el placeholder for unresolved async component
          gn.el || gn.placeholder
        ) : _;
        kt[w] === 0 ? R(
          null,
          De,
          d,
          _n,
          v,
          b,
          S,
          C,
          y
        ) : Re && (K < 0 || w !== mn[K] ? We(De, d, _n, 2) : K--);
      }
    }
  }, We = (a, f, d, _, v = null) => {
    const { el: b, type: S, transition: C, children: y, shapeFlag: w } = a;
    if (w & 6) {
      We(a.component.subTree, f, d, _);
      return;
    }
    if (w & 128) {
      a.suspense.move(f, d, _);
      return;
    }
    if (w & 64) {
      S.move(a, f, d, L);
      return;
    }
    if (S === de) {
      n(b, f, d);
      for (let O = 0; O < y.length; O++)
        We(y[O], f, d, _);
      n(a.anchor, f, d);
      return;
    }
    if (S === Ps) {
      ee(a, f, d);
      return;
    }
    if (_ !== 2 && w & 1 && C)
      if (_ === 0)
        C.beforeEnter(b), n(b, f, d), Oe(() => C.enter(b), v);
      else {
        const { leave: O, delayLeave: A, afterLeave: D } = C, q = () => {
          a.ctx.isUnmounted ? r(b) : n(b, f, d);
        }, X = () => {
          b._isLeaving && b[Xo](
            !0
            /* cancelled */
          ), O(b, () => {
            q(), D && D();
          });
        };
        A ? A(b, q, X) : X();
      }
    else
      n(b, f, d);
  }, Me = (a, f, d, _ = !1, v = !1) => {
    const {
      type: b,
      props: S,
      ref: C,
      children: y,
      dynamicChildren: w,
      shapeFlag: M,
      patchFlag: O,
      dirs: A,
      cacheIndex: D
    } = a;
    if (O === -2 && (v = !1), C != null && (Ye(), Dt(C, null, d, a, !0), Xe()), D != null && (f.renderCache[D] = void 0), M & 256) {
      f.ctx.deactivate(a);
      return;
    }
    const q = M & 1 && A, X = !St(a);
    let K;
    if (X && (K = S && S.onVnodeBeforeUnmount) && Fe(K, f, a), M & 6)
      Gt(a.component, d, _);
    else {
      if (M & 128) {
        a.suspense.unmount(d, _);
        return;
      }
      q && pt(a, null, f, "beforeUnmount"), M & 64 ? a.type.remove(
        a,
        f,
        d,
        L,
        _
      ) : w && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !w.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== de || O > 0 && O & 64) ? ft(
        w,
        f,
        d,
        !1,
        !0
      ) : (b === de && O & 384 || !v && M & 16) && ft(y, f, d), _ && zt(a);
    }
    (X && (K = S && S.onVnodeUnmounted) || q) && Oe(() => {
      K && Fe(K, f, a), q && pt(a, null, f, "unmounted");
    }, d);
  }, zt = (a) => {
    const { type: f, el: d, anchor: _, transition: v } = a;
    if (f === de) {
      ys(d, _);
      return;
    }
    if (f === Ps) {
      N(a);
      return;
    }
    const b = () => {
      r(d), v && !v.persisted && v.afterLeave && v.afterLeave();
    };
    if (a.shapeFlag & 1 && v && !v.persisted) {
      const { leave: S, delayLeave: C } = v, y = () => S(d, b);
      C ? C(a.el, b, y) : y();
    } else
      b();
  }, ys = (a, f) => {
    let d;
    for (; a !== f; )
      d = g(a), r(a), a = d;
    r(f);
  }, Gt = (a, f, d) => {
    const { bum: _, scope: v, job: b, subTree: S, um: C, m: y, a: w } = a;
    Mn(y), Mn(w), _ && Cs(_), v.stop(), b && (b.flags |= 8, Me(S, a, f, d)), C && Oe(C, f), Oe(() => {
      a.isUnmounted = !0;
    }, f);
  }, ft = (a, f, d, _ = !1, v = !1, b = 0) => {
    for (let S = b; S < a.length; S++)
      Me(a[S], f, d, _, v);
  }, dt = (a) => {
    if (a.shapeFlag & 6)
      return dt(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const f = g(a.anchor || a.el), d = f && f[Jo];
    return d ? g(d) : f;
  };
  let I = !1;
  const m = (a, f, d) => {
    a == null ? f._vnode && Me(f._vnode, null, null, !0) : R(
      f._vnode || null,
      a,
      f,
      null,
      null,
      null,
      d
    ), f._vnode = a, I || (I = !0, yn(), Sr(), I = !1);
  }, L = {
    p: R,
    um: Me,
    m: We,
    r: zt,
    mt: st,
    mc: le,
    pc: H,
    pbc: Be,
    n: dt,
    o: e
  };
  return {
    render: m,
    hydrate: void 0,
    createApp: wi(m)
  };
}
function Ms({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function ht({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Pi(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Wr(e, t, s = !1) {
  const n = e.children, r = t.children;
  if (F(n) && F(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = ot(r[o]), l.el = i.el), !s && l.patchFlag !== -2 && Wr(i, l)), l.type === ws && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = i.el), l.type === Ze && !l.el && (l.el = i.el);
    }
}
function Ii(e) {
  const t = e.slice(), s = [0];
  let n, r, o, i, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const p = e[n];
    if (p !== 0) {
      if (r = s[s.length - 1], e[r] < p) {
        t[n] = r, s.push(n);
        continue;
      }
      for (o = 0, i = s.length - 1; o < i; )
        l = o + i >> 1, e[s[l]] < p ? o = l + 1 : i = l;
      p < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, i = s[o - 1]; o-- > 0; )
    s[o] = i, i = t[i];
  return s;
}
function Kr(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Kr(t);
}
function Mn(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Ni = Symbol.for("v-scx"), Ri = () => es(Ni);
function ts(e, t, s) {
  return zr(e, t, s);
}
function zr(e, t, s = Q) {
  const { immediate: n, deep: r, flush: o, once: i } = s, l = ie({}, s), c = t && n || !t && o !== "post";
  let p;
  if (Bt) {
    if (o === "sync") {
      const E = Ri();
      p = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!c) {
      const E = () => {
      };
      return E.stop = Le, E.resume = Le, E.pause = Le, E;
    }
  }
  const u = he;
  l.call = (E, P, R) => Ve(E, u, P, R);
  let h = !1;
  o === "post" ? l.scheduler = (E) => {
    Oe(E, u && u.suspense);
  } : o !== "sync" && (h = !0, l.scheduler = (E, P) => {
    P ? E() : ln(E);
  }), l.augmentJob = (E) => {
    t && (E.flags |= 4), h && (E.flags |= 2, u && (E.id = u.uid, E.i = u));
  };
  const g = Wo(e, t, l);
  return Bt && (p ? p.push(g) : c && g()), g;
}
function $i(e, t, s) {
  const n = this.proxy, r = oe(e) ? e.includes(".") ? Gr(n, e) : () => n[e] : e.bind(n, n);
  let o;
  j(t) ? o = t : (o = t.handler, s = t);
  const i = Kt(this), l = zr(r, o.bind(n), s);
  return i(), l;
}
function Gr(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let r = 0; r < s.length && n; r++)
      n = n[s[r]];
    return n;
  };
}
const Di = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${we(t)}Modifiers`] || e[`${Pe(t)}Modifiers`];
function Fi(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Q;
  let r = s;
  const o = t.startsWith("update:"), i = o && Di(n, t.slice(7));
  i && (i.trim && (r = s.map((u) => oe(u) ? u.trim() : u)), i.number && (r = s.map(co)));
  let l, c = n[l = Ts(t)] || // also try camelCase event handler (#2249)
  n[l = Ts(we(t))];
  !c && o && (c = n[l = Ts(Pe(t))]), c && Ve(
    c,
    e,
    6,
    r
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
      r
    );
  }
}
const ji = /* @__PURE__ */ new WeakMap();
function Jr(e, t, s = !1) {
  const n = s ? ji : t.emitsCache, r = n.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, l = !1;
  if (!j(e)) {
    const c = (p) => {
      const u = Jr(p, t, !0);
      u && (l = !0, ie(i, u));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (se(e) && n.set(e, null), null) : (F(o) ? o.forEach((c) => i[c] = null) : ie(i, o), se(e) && n.set(e, i), i);
}
function xs(e, t) {
  return !e || !fs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), V(e, t[0].toLowerCase() + t.slice(1)) || V(e, Pe(t)) || V(e, t));
}
function Pn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: r,
    propsOptions: [o],
    slots: i,
    attrs: l,
    emit: c,
    render: p,
    renderCache: u,
    props: h,
    data: g,
    setupState: E,
    ctx: P,
    inheritAttrs: R
  } = e, J = ls(e);
  let k, B;
  try {
    if (s.shapeFlag & 4) {
      const N = r || n, W = N;
      k = qe(
        p.call(
          W,
          N,
          u,
          h,
          E,
          g,
          P
        )
      ), B = l;
    } else {
      const N = t;
      k = qe(
        N.length > 1 ? N(
          h,
          { attrs: l, slots: i, emit: c }
        ) : N(
          h,
          null
        )
      ), B = t.props ? l : qi(l);
    }
  } catch (N) {
    jt.length = 0, vs(N, e, 1), k = T(Ze);
  }
  let ee = k;
  if (B && R !== !1) {
    const N = Object.keys(B), { shapeFlag: W } = ee;
    N.length && W & 7 && (o && N.some(Gs) && (B = Hi(
      B,
      o
    )), ee = Ot(ee, B, !1, !0));
  }
  return s.dirs && (ee = Ot(ee, null, !1, !0), ee.dirs = ee.dirs ? ee.dirs.concat(s.dirs) : s.dirs), s.transition && an(ee, s.transition), k = ee, ls(J), k;
}
const qi = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || fs(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Hi = (e, t) => {
  const s = {};
  for (const n in e)
    (!Gs(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function Li(e, t, s) {
  const { props: n, children: r, component: o } = e, { props: i, children: l, patchFlag: c } = t, p = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? In(n, i, p) : !!i;
    if (c & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const g = u[h];
        if (i[g] !== n[g] && !xs(p, g))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : n === i ? !1 : n ? i ? In(n, i, p) : !0 : !!i;
  return !1;
}
function In(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < n.length; r++) {
    const o = n[r];
    if (t[o] !== e[o] && !xs(s, o))
      return !0;
  }
  return !1;
}
function Vi({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Yr = (e) => e.__isSuspense;
function Bi(e, t) {
  t && t.pendingBranch ? F(e) ? t.effects.push(...e) : t.effects.push(e) : Go(e);
}
const de = Symbol.for("v-fgt"), ws = Symbol.for("v-txt"), Ze = Symbol.for("v-cmt"), Ps = Symbol.for("v-stc"), jt = [];
let Ae = null;
function z(e = !1) {
  jt.push(Ae = e ? null : []);
}
function Ui() {
  jt.pop(), Ae = jt[jt.length - 1] || null;
}
let Vt = 1;
function Nn(e, t = !1) {
  Vt += e, e < 0 && Ae && t && (Ae.hasOnce = !0);
}
function Xr(e) {
  return e.dynamicChildren = Vt > 0 ? Ae || wt : null, Ui(), Vt > 0 && Ae && Ae.push(e), e;
}
function ve(e, t, s, n, r, o) {
  return Xr(
    x(
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
function ke(e, t, s, n, r) {
  return Xr(
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
function fn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Mt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Zr = ({ key: e }) => e ?? null, ss = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || me(e) || j(e) ? { i: xe, r: e, k: t, f: !!s } : e : null);
function x(e, t = null, s = null, n = 0, r = null, o = e === de ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Zr(t),
    ref: t && ss(t),
    scopeId: Or,
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
  return l ? (dn(c, s), o & 128 && e.normalize(c)) : s && (c.shapeFlag |= oe(s) ? 8 : 16), Vt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Ae && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ae.push(c), c;
}
const T = Wi;
function Wi(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === fi) && (e = Ze), fn(e)) {
    const l = Ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && dn(l, s), Vt > 0 && !o && Ae && (l.shapeFlag & 6 ? Ae[Ae.indexOf(e)] = l : Ae.push(l)), l.patchFlag = -2, l;
  }
  if (nl(e) && (e = e.__vccOpts), t) {
    t = Ki(t);
    let { class: l, style: c } = t;
    l && !oe(l) && (t.class = Ut(l)), se(c) && (on(c) && !F(c) && (c = ie({}, c)), t.style = Xs(c));
  }
  const i = oe(e) ? 1 : Yr(e) ? 128 : Yo(e) ? 64 : se(e) ? 4 : j(e) ? 2 : 0;
  return x(
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
function Ki(e) {
  return e ? on(e) || qr(e) ? ie({}, e) : e : null;
}
function Ot(e, t, s = !1, n = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e, p = t ? zi(r || {}, t) : r, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && Zr(p),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && o ? F(o) ? o.concat(ss(t)) : [o, ss(t)] : ss(t)
    ) : o,
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
    ssContent: e.ssContent && Ot(e.ssContent),
    ssFallback: e.ssFallback && Ot(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && an(
    u,
    c.clone(u)
  ), u;
}
function re(e = " ", t = 0) {
  return T(ws, null, e, t);
}
function He(e = "", t = !1) {
  return t ? (z(), ke(Ze, null, e)) : T(Ze, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? T(Ze) : F(e) ? T(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fn(e) ? ot(e) : T(ws, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ot(e);
}
function dn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (F(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), dn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !qr(t) ? t._ctx = xe : r === 3 && xe && (xe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else j(t) ? (t = { default: t, _ctx: xe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [re(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function zi(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const r in n)
      if (r === "class")
        t.class !== n.class && (t.class = Ut([t.class, n.class]));
      else if (r === "style")
        t.style = Xs([t.style, n.style]);
      else if (fs(r)) {
        const o = t[r], i = n[r];
        i && o !== i && !(F(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Fe(e, t, s, n = null) {
  Ve(e, t, 7, [
    s,
    n
  ]);
}
const Gi = Dr();
let Ji = 0;
function Yi(e, t, s) {
  const n = e.type, r = (t ? t.appContext : e.appContext) || Gi, o = {
    uid: Ji++,
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
    scope: new _o(
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
    propsOptions: Lr(n, r),
    emitsOptions: Jr(n, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Q,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: Q,
    data: Q,
    props: Q,
    attrs: Q,
    slots: Q,
    refs: Q,
    setupState: Q,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Fi.bind(null, o), e.ce && e.ce(o), o;
}
let he = null;
const Xi = () => he || xe;
let us, Ws;
{
  const e = gs(), t = (s, n) => {
    let r;
    return (r = e[s]) || (r = e[s] = []), r.push(n), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
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
const Kt = (e) => {
  const t = he;
  return us(e), e.scope.on(), () => {
    e.scope.off(), us(t);
  };
}, Rn = () => {
  he && he.scope.off(), us(null);
};
function Qr(e) {
  return e.vnode.shapeFlag & 4;
}
let Bt = !1;
function Zi(e, t = !1, s = !1) {
  t && Ws(t);
  const { props: n, children: r } = e.vnode, o = Qr(e);
  Ti(e, n, o, t), Oi(e, r, s || t);
  const i = o ? Qi(e, t) : void 0;
  return t && Ws(!1), i;
}
function Qi(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, hi);
  const { setup: n } = s;
  if (n) {
    Ye();
    const r = e.setupContext = n.length > 1 ? tl(e) : null, o = Kt(e), i = Wt(
      n,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = tr(i);
    if (Xe(), o(), (l || e.sp) && !St(e) && Ar(e), l) {
      if (i.then(Rn, Rn), t)
        return i.then((c) => {
          $n(e, c);
        }).catch((c) => {
          vs(c, e, 0);
        });
      e.asyncDep = i;
    } else
      $n(e, i);
  } else
    eo(e);
}
function $n(e, t, s) {
  j(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : se(t) && (e.setupState = wr(t)), eo(e);
}
function eo(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Le);
  {
    const r = Kt(e);
    Ye();
    try {
      mi(e);
    } finally {
      Xe(), r();
    }
  }
}
const el = {
  get(e, t) {
    return pe(e, "get", ""), e[t];
  }
};
function tl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, el),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function pn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(wr(jo(e.exposed)), {
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
function sl(e, t = !0) {
  return j(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function nl(e) {
  return j(e) && "__vccOpts" in e;
}
const Je = (e, t) => Bo(e, t, Bt), rl = "3.5.22";
/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ks;
const Dn = typeof window < "u" && window.trustedTypes;
if (Dn)
  try {
    Ks = /* @__PURE__ */ Dn.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const to = Ks ? (e) => Ks.createHTML(e) : (e) => e, ol = "http://www.w3.org/2000/svg", il = "http://www.w3.org/1998/Math/MathML", ze = typeof document < "u" ? document : null, Fn = ze && /* @__PURE__ */ ze.createElement("template"), ll = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? ze.createElementNS(ol, e) : t === "mathml" ? ze.createElementNS(il, e) : s ? ze.createElement(e, { is: s }) : ze.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
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
  insertStaticContent(e, t, s, n, r, o) {
    const i = s ? s.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), s), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      Fn.innerHTML = to(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Fn.content;
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
      i ? i.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, al = Symbol("_vtc");
function cl(e, t, s) {
  const n = e[al];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const jn = Symbol("_vod"), ul = Symbol("_vsh"), fl = Symbol(""), dl = /(?:^|;)\s*display\s*:/;
function pl(e, t, s) {
  const n = e.style, r = oe(s);
  let o = !1;
  if (s && !r) {
    if (t)
      if (oe(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          s[l] == null && ns(n, l, "");
        }
      else
        for (const i in t)
          s[i] == null && ns(n, i, "");
    for (const i in s)
      i === "display" && (o = !0), ns(n, i, s[i]);
  } else if (r) {
    if (t !== s) {
      const i = n[fl];
      i && (s += ";" + i), n.cssText = s, o = dl.test(s);
    }
  } else t && e.removeAttribute("style");
  jn in e && (e[jn] = o ? n.display : "", e[ul] && (n.display = "none"));
}
const qn = /\s*!important$/;
function ns(e, t, s) {
  if (F(s))
    s.forEach((n) => ns(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = hl(e, t);
    qn.test(s) ? e.setProperty(
      Pe(n),
      s.replace(qn, ""),
      "important"
    ) : e[n] = s;
  }
}
const Hn = ["Webkit", "Moz", "ms"], Is = {};
function hl(e, t) {
  const s = Is[t];
  if (s)
    return s;
  let n = we(t);
  if (n !== "filter" && n in e)
    return Is[t] = n;
  n = ms(n);
  for (let r = 0; r < Hn.length; r++) {
    const o = Hn[r] + n;
    if (o in e)
      return Is[t] = o;
  }
  return t;
}
const Ln = "http://www.w3.org/1999/xlink";
function Vn(e, t, s, n, r, o = go(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(Ln, t.slice(6, t.length)) : e.setAttributeNS(Ln, t, s) : s == null || o && !rr(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Qe(s) ? String(s) : s
  );
}
function Bn(e, t, s, n, r) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? to(s) : s);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let i = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = rr(s) : s == null && l === "string" ? (s = "", i = !0) : l === "number" && (s = 0, i = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  i && e.removeAttribute(r || t);
}
function ml(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function gl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Un = Symbol("_vei");
function _l(e, t, s, n, r = null) {
  const o = e[Un] || (e[Un] = {}), i = o[t];
  if (n && i)
    i.value = n;
  else {
    const [l, c] = vl(t);
    if (n) {
      const p = o[t] = wl(
        n,
        r
      );
      ml(e, l, p, c);
    } else i && (gl(e, l, i, c), o[t] = void 0);
  }
}
const Wn = /(?:Once|Passive|Capture)$/;
function vl(e) {
  let t;
  if (Wn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Wn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Pe(e.slice(2)), t];
}
let Ns = 0;
const bl = /* @__PURE__ */ Promise.resolve(), xl = () => Ns || (bl.then(() => Ns = 0), Ns = Date.now());
function wl(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ve(
      yl(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = xl(), s;
}
function yl(e, t) {
  if (F(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (r) => !r._stopped && n && n(r)
    );
  } else
    return t;
}
const Kn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Tl = (e, t, s, n, r, o) => {
  const i = r === "svg";
  t === "class" ? cl(e, n, i) : t === "style" ? pl(e, s, n) : fs(t) ? Gs(t) || _l(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Cl(e, t, n, i)) ? (Bn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Vn(e, t, n, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !oe(n)) ? Bn(e, we(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Vn(e, t, n, i));
};
function Cl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Kn(t) && j(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Kn(t) && oe(s) ? !1 : t in e;
}
const zn = {};
// @__NO_SIDE_EFFECTS__
function Sl(e, t, s) {
  let n = /* @__PURE__ */ kr(e, t);
  ps(n) && (n = ie({}, n, t));
  class r extends hn {
    constructor(i) {
      super(n, i, s);
    }
  }
  return r.def = n, r;
}
const El = typeof HTMLElement < "u" ? HTMLElement : class {
};
class hn extends El {
  constructor(t, s = {}, n = Jn) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== Jn ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
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
      if (t instanceof hn) {
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
    this._connected = !1, Tr(() => {
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
      let l;
      if (o && !F(o))
        for (const c in o) {
          const p = o[c];
          (p === Number || p && p.type === Number) && (c in this._props && (this._props[c] = vn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[we(c)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(i), this._mount(n);
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
    const { props: s } = t, n = F(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(we))
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
    let n = s ? this.getAttribute(t) : zn;
    const r = we(t);
    s && this._numberProps && this._numberProps[r] && (n = vn(n)), this._setProp(r, n, !1, !0);
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
    if (s !== this._props[t] && (s === zn ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), r && this._instance && this._update(), n)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Pe(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Pe(t), s + "") : s || this.removeAttribute(Pe(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Ml(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = T(this._def, ie(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const r = (o, i) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            ps(i[0]) ? ie({ detail: i }, i[0]) : { detail: i }
          )
        );
      };
      n.emit = (o, ...i) => {
        r(o, i), Pe(o) !== o && r(Pe(o), i);
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
      const r = t[n], o = r.getAttribute("name") || "default", i = this._slots[o], l = r.parentNode;
      if (i)
        for (const c of i) {
          if (s && c.nodeType === 1) {
            const p = s + "-s", u = document.createTreeWalker(c, 1);
            c.setAttribute(p, "");
            let h;
            for (; h = u.nextNode(); )
              h.setAttribute(p, "");
          }
          l.insertBefore(c, r);
        }
      else
        for (; r.firstChild; ) l.insertBefore(r.firstChild, r);
      l.removeChild(r);
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
const Ol = ["ctrl", "shift", "alt", "meta"], kl = {
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
  exact: (e, t) => Ol.some((s) => e[`${s}Key`] && !t.includes(s))
}, so = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const l = kl[t[i]];
      if (l && l(r, t)) return;
    }
    return e(r, ...o);
  }));
}, Al = /* @__PURE__ */ ie({ patchProp: Tl }, ll);
let Gn;
function no() {
  return Gn || (Gn = Ai(Al));
}
const Ml = ((...e) => {
  no().render(...e);
}), Jn = ((...e) => {
  const t = no().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = Il(n);
    if (!r) return;
    const o = t._component;
    !j(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const i = s(r, !1, Pl(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
});
function Pl(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Il(e) {
  return oe(e) ? document.querySelector(e) : e;
}
function Nl(e) {
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
const Rl = {}, $l = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Rl
}, Symbol.toStringTag, { value: "Module" })), Rs = /* @__PURE__ */ Nl($l);
var $s, Yn;
function Dl() {
  if (Yn) return $s;
  Yn = 1;
  let { existsSync: e, readFileSync: t } = Rs, { dirname: s, join: n } = Rs, { SourceMapConsumer: r, SourceMapGenerator: o } = Rs;
  function i(c) {
    return Buffer ? Buffer.from(c, "base64").toString() : window.atob(c);
  }
  class l {
    constructor(p, u) {
      if (u.map === !1) return;
      this.loadAnnotation(p), this.inline = this.startWith(this.annotation, "data:");
      let h = u.map ? u.map.prev : void 0, g = this.loadMap(u.from, h);
      !this.mapFile && u.from && (this.mapFile = u.from), this.mapFile && (this.root = s(this.mapFile)), g && (this.text = g);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new r(this.text)), this.consumerCache;
    }
    decodeInline(p) {
      let u = /^data:application\/json;charset=utf-?8;base64,/, h = /^data:application\/json;base64,/, g = /^data:application\/json;charset=utf-?8,/, E = /^data:application\/json,/, P = p.match(g) || p.match(E);
      if (P)
        return decodeURIComponent(p.substr(P[0].length));
      let R = p.match(u) || p.match(h);
      if (R)
        return i(p.substr(R[0].length));
      let J = p.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + J);
    }
    getAnnotationURL(p) {
      return p.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
    }
    isMap(p) {
      return typeof p != "object" ? !1 : typeof p.mappings == "string" || typeof p._mappings == "string" || Array.isArray(p.sections);
    }
    loadAnnotation(p) {
      let u = p.match(/\/\*\s*# sourceMappingURL=/g);
      if (!u) return;
      let h = p.lastIndexOf(u.pop()), g = p.indexOf("*/", h);
      h > -1 && g > -1 && (this.annotation = this.getAnnotationURL(p.substring(h, g)));
    }
    loadFile(p) {
      if (this.root = s(p), e(p))
        return this.mapFile = p, t(p, "utf-8").toString().trim();
    }
    loadMap(p, u) {
      if (u === !1) return !1;
      if (u) {
        if (typeof u == "string")
          return u;
        if (typeof u == "function") {
          let h = u(p);
          if (h) {
            let g = this.loadFile(h);
            if (!g)
              throw new Error(
                "Unable to load previous source map: " + h.toString()
              );
            return g;
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
          let h = this.annotation;
          return p && (h = n(s(p), h)), this.loadFile(h);
        }
      }
    }
    startWith(p, u) {
      return p ? p.substr(0, u.length) === u : !1;
    }
    withContent() {
      return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    }
  }
  return $s = l, l.default = l, $s;
}
Dl();
const Fl = { class: "flex gap-8 flex-row" }, jl = { class: "flex flex-col" }, ql = { class: "text-2xl" }, Hl = { class: "flex-shrink-0" }, Ll = { class: "flex flex-col" }, Vl = { class: "text-2xl" }, Bl = { class: "flex-shrink-0" }, Ul = { class: "flex flex-col" }, Wl = { class: "text-2xl" }, Kl = { class: "flex-shrink-0" }, zl = {
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
      const r = ce("ha-icon"), o = ce("ha-card");
      return z(), ve("div", Fl, [
        T(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: $(() => [
            x("div", jl, [
              n[0] || (n[0] = x("div", { class: "text-2xl" }, "Total tasks", -1)),
              x("div", ql, G(t.totalTasks), 1)
            ]),
            x("div", Hl, [
              T(r, {
                class: "text-blue-500",
                ".icon": "mdi:calendar-blank"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: $(() => [
            x("div", Ll, [
              n[1] || (n[1] = x("div", { class: "text-2xl" }, "Upcoming Tasks", -1)),
              x("div", Vl, G(t.upcomingTasks), 1)
            ]),
            x("div", Bl, [
              T(r, {
                class: "text-yellow-500",
                ".icon": "mdi:bell"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        T(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: $(() => [
            x("div", Ul, [
              n[2] || (n[2] = x("div", { class: "text-2xl" }, "Overdue Tasks", -1)),
              x("div", Wl, G(t.overdueTasks), 1)
            ]),
            x("div", Kl, [
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
}, Qt = (e) => e.callWS({
  type: "maintenance_manager/get_tasks"
}), Gl = (e, t) => e.callWS({
  type: "maintenance_manager/create_task",
  ...t
}), Jl = (e, t) => e.callWS({
  type: "maintenance_manager/delete_task",
  task_id: t
}), Yl = (e, t, s) => e.callWS({
  type: "maintenance_manager/complete_task",
  task_id: t,
  ...s
}), Xn = (e) => e.callWS({
  type: "maintenance_manager/get_history"
}), Zn = (e, t) => e.callWS({
  type: "maintenance_manager/get_attributes",
  task_sensor: t
}), Xl = (e, t) => e.callWS({
  type: "maintenance_manager/edit_task",
  ...t
}), Zl = ".header[data-v-4dfa2fff]{background-color:var(--app-header-background-color);color:var(--app-header-text-color, white);border-bottom:var(--app-header-border-bottom, none)}.toolbar[data-v-4dfa2fff]{height:var(--header-height);display:flex;align-items:center;font-size:20px;padding:0 16px;font-weight:400;box-sizing:border-box}.main-title[data-v-4dfa2fff]{margin:0 0 0 24px;line-height:20px;flex-grow:1}.version[data-v-4dfa2fff]{font-size:14px;font-weight:500;color:rgba(var(--rgb-text-primary-color),.9)}", ro = (e, t) => {
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
      const r = ce("ha-menu-button");
      return z(), ve("div", Ql, [
        x("div", ea, [
          T(r, {
            ".hass": t.hass,
            ".narrow": t.narrow
          }, null, 40, [".hass", ".narrow"]),
          n[0] || (n[0] = x("div", { class: "main-title" }, " Device Maintenance Manager ", -1)),
          n[1] || (n[1] = x("div", { class: "version" }, " v1.0.2 ", -1))
        ])
      ]);
    };
  }
}, sa = /* @__PURE__ */ ro(ta, [["styles", [Zl]], ["__scopeId", "data-v-4dfa2fff"]]), na = { slot: "header" }, ra = { class: "grid items-center grid-cols-4" }, oa = { class: "text-2xl font-medium" }, ia = { class: "flex items-center" }, la = {
  key: 0,
  class: "text-xl font-light"
}, aa = { class: "flex items-center justify-end gap-2 mr-5" }, ca = { class: "text-xl font-light mt-2 mb-6" }, ua = { class: "bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg" }, fa = { class: "mb-1" }, da = { class: "text-blue-600 ml-1" }, pa = { class: "text-blue-600 ml-1" }, ha = {
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
    const s = e, n = te(!1), r = {
      below: "<",
      equal: "=",
      above: ">"
    }, o = t, i = () => {
      n.value = !1, o("deleteTask");
    }, l = () => {
      o("completeTask");
    }, c = () => {
      n.value = !1, o("editTask");
    }, p = te(!1), u = (h) => {
      p.value = h.detail.expanded;
    };
    return (h, g) => {
      const E = ce("ha-icon"), P = ce("ha-button"), R = ce("ha-dropdown-item"), J = ce("ha-dropdown"), k = ce("ha-expansion-panel"), B = ce("ha-card");
      return z(), ke(B, {
        class: Ut(["w-full", "p-6", { "border-red-700": s.overdue }])
      }, {
        default: $(() => [
          T(k, { onExpandedChanged: u }, {
            default: $(() => [
              x("span", na, [
                x("div", ra, [
                  x("div", oa, G(s.name), 1),
                  x("div", ia, [
                    p.value ? He("", !0) : (z(), ve("div", la, G(s.location), 1))
                  ]),
                  g[4] || (g[4] = x("div", { class: "flex items-center" }, null, -1)),
                  x("div", aa, [
                    T(P, {
                      onClick: l,
                      appearance: "accent",
                      variant: "success",
                      class: "flex items-center gap-2"
                    }, {
                      default: $(() => [
                        T(E, { ".icon": "mdi:check-circle-outline" }, null, 32),
                        g[1] || (g[1] = re(" Complete ", -1))
                      ]),
                      _: 1
                    }),
                    T(J, {
                      onClick: g[0] || (g[0] = so(() => {
                      }, ["stop"]))
                    }, {
                      default: $(() => [
                        T(P, {
                          slot: "trigger",
                          appearance: "plain",
                          variant: "neutral"
                        }, {
                          default: $(() => [
                            T(E, { ".icon": "mdi:dots-vertical" }, null, 32)
                          ]),
                          _: 1
                        }),
                        T(R, {
                          onClick: c,
                          variant: "neutral",
                          appearance: "plain"
                        }, {
                          default: $(() => [
                            T(E, { ".icon": "mdi:pencil" }, null, 32),
                            g[2] || (g[2] = re(" Edit ", -1))
                          ]),
                          _: 1
                        }),
                        T(R, {
                          onClick: i,
                          variant: "danger",
                          appearance: "plain"
                        }, {
                          default: $(() => [
                            T(E, { ".icon": "mdi:delete" }, null, 32),
                            g[3] || (g[3] = re(" Delete ", -1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              x("div", ca, G(s.location), 1),
              x("div", ua, [
                x("div", fa, [
                  g[5] || (g[5] = x("span", { class: "text-blue-600 font-semibold" }, "Condition:", -1)),
                  x("span", da, G(s.sensor) + " " + G(r[s.operator] ?? "=") + " " + G(Array.isArray(s.value) ? s.value.join(" or ") : s.value), 1)
                ]),
                x("div", null, [
                  g[6] || (g[6] = x("span", { class: "text-blue-600 font-semibold" }, "Action:", -1)),
                  x("span", pa, G(s.description != "No description" ? s.description : "-"), 1)
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
}, ma = {
  key: 0,
  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[8] p-4"
}, ga = { class: "flex justify-center w-full max-w-3xl" }, Pt = {
  __name: "Dialog",
  props: {
    show: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (t, s) => e.show ? (z(), ve("div", ma, [
      x("div", ga, [
        pi(t.$slots, "default")
      ])
    ])) : He("", !0);
  }
}, _a = { slot: "header" }, va = { class: "grid items-center grid-cols-4" }, ba = { class: "text-2xl font-medium" }, xa = { class: "flex items-center" }, wa = {
  key: 0,
  class: "text-xl font-light"
}, ya = { class: "flex items-center" }, Ta = { key: 0 }, Ca = { class: "ml-2" }, Sa = { class: "flex items-center justify-end gap-2 mr-5" }, Ea = { class: "text-xl font-light mt-2 mb-6" }, Oa = { class: "text-lg" }, ka = {
  key: 0,
  class: "mb-2"
}, Aa = { class: "ml-2 mb" }, Ma = { class: "mb-2" }, Pa = { class: "ml-2" }, Ia = { class: "mb-2" }, Na = { class: "ml-2" }, Ra = { class: "ml-2" }, $a = {
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
    const s = e, n = te(!1), r = t, o = () => {
      n.value = !1, r("deleteTask");
    }, i = () => {
      r("completeTask");
    }, l = () => {
      n.value = !1, r("editTask");
    }, c = te(!1), p = (u) => {
      c.value = u.detail.expanded;
    };
    return (u, h) => {
      const g = ce("ha-icon"), E = ce("ha-button"), P = ce("ha-dropdown-item"), R = ce("ha-dropdown"), J = ce("ha-expansion-panel"), k = ce("ha-card");
      return z(), ke(k, {
        class: Ut(["w-full", "p-6", {
          "border-red-500": s.overdue,
          "border-yellow-500": s.warning && !s.overdue
        }])
      }, {
        default: $(() => [
          T(J, { onExpandedChanged: p }, {
            default: $(() => [
              x("span", _a, [
                x("div", va, [
                  x("div", ba, G(s.name), 1),
                  x("div", xa, [
                    c.value ? He("", !0) : (z(), ve("div", wa, G(s.location), 1))
                  ]),
                  x("div", ya, [
                    c.value ? He("", !0) : (z(), ve("div", Ta, [
                      T(g, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
                      x("span", Ca, "Next due: " + G(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
                    ]))
                  ]),
                  x("div", Sa, [
                    T(E, {
                      onClick: i,
                      appearance: "accent",
                      variant: "success",
                      class: "flex items-center gap-2"
                    }, {
                      default: $(() => [
                        T(g, { ".icon": "mdi:check-circle-outline" }, null, 32),
                        h[1] || (h[1] = re(" Complete ", -1))
                      ]),
                      _: 1
                    }),
                    T(R, {
                      onClick: h[0] || (h[0] = so(() => {
                      }, ["stop"]))
                    }, {
                      default: $(() => [
                        T(E, {
                          slot: "trigger",
                          appearance: "plain",
                          variant: "neutral"
                        }, {
                          default: $(() => [
                            T(g, { ".icon": "mdi:dots-vertical" }, null, 32)
                          ]),
                          _: 1
                        }),
                        T(P, {
                          onClick: l,
                          variant: "neutral",
                          appearance: "plain"
                        }, {
                          default: $(() => [
                            T(g, { ".icon": "mdi:pencil" }, null, 32),
                            h[2] || (h[2] = re(" Edit ", -1))
                          ]),
                          _: 1
                        }),
                        T(P, {
                          onClick: o,
                          variant: "danger",
                          appearance: "plain"
                        }, {
                          default: $(() => [
                            T(g, { ".icon": "mdi:delete" }, null, 32),
                            h[3] || (h[3] = re(" Delete ", -1))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])
                ])
              ]),
              x("div", Ea, G(s.location), 1),
              x("div", Oa, [
                s.description != "No description" ? (z(), ve("div", ka, [
                  h[4] || (h[4] = x("span", { class: "font-semibold" }, "Description:", -1)),
                  x("span", Aa, G(s.description), 1)
                ])) : He("", !0),
                x("div", Ma, [
                  T(g, { ".icon": "mdi:calendar" }, null, 32),
                  x("span", Pa, "Every " + G(s.value) + " " + G(s.seasonal_type == "runtime" ? "hours" : s.seasonal_type), 1)
                ]),
                x("div", Ia, [
                  T(g, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
                  x("span", Na, "Next due: " + G(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
                ]),
                x("div", null, [
                  T(g, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  x("span", Ra, "Last completed: " + G(s.last_completed != "" ? s.last_completed : "Notcompleted before..."), 1)
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
function Da() {
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
function Fa(e, t, s, n) {
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
function ja(e, t, s) {
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
function qa() {
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
const Ha = { class: "flex flex-col gap-10 justify-center m-6" }, La = { class: "flex items-center justify-between pb-5" }, Va = { class: "flex-shrink-0" }, Ba = { class: "flex flex-col" }, Ua = { class: "flex gap-5 text-2xl items-center" }, Wa = {
  key: 0,
  class: "text-2xl font-medium"
}, Ka = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, za = ["onClick"], Ga = { class: "truncate" }, Ja = { class: "flex flex-col mb-5" }, Ya = { class: "flex gap-5 text-2xl items-center" }, Xa = { class: "flex flex-row w-full mt-4 gap-3" }, Za = { class: "flex flex-col mb-5" }, Qa = { class: "flex gap-5 text-2xl items-center" }, ec = { class: "flex flex-row w-full mt-4 gap-3" }, tc = { class: "flex flex-row w-full mt-4 gap-3" }, sc = { class: "flex flex-row w-full mt-4 gap-3" }, nc = { class: "flex flex-col" }, rc = { class: "flex gap-3 text-2xl items-center mb-2" }, oc = { class: "text-2xl font-medium" }, ic = { class: "text-lg font-medium mb-5" }, lc = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, ac = { class: "" }, cc = { class: "break-words" }, uc = /* @__PURE__ */ kr({
  __name: "App",
  props: {
    hass: { type: Object },
    narrow: { type: Boolean }
  },
  setup(e) {
    const t = e, s = te({}), n = te({}), r = te([]), o = te([]), i = te(), l = te([]), c = te(!1), p = te(!1), u = te(!1), h = te(!1), g = te("null"), E = te("null"), P = te(!1), R = te(!1), J = te(!1), k = /* @__PURE__ */ new Set(["Task Name"]), B = Je(() => r.value.length), ee = Je(() => r.value.filter((I) => I.notified).length), N = Je(() => r.value.filter((I) => I.warning && !I.notified).length), W = te("interval"), ge = te(""), ue = te("interval"), le = te(null), Se = te(null), { schemaFilter: Be } = qa(), { schemaConditional: tt } = Fa(le, Se, R, P), { schemaInterval: ct } = ja(le, Se, J), { schemaNotes: _t } = Da();
    ts(
      () => t.hass,
      async (I) => {
        if (I)
          try {
            const m = await Qt(I), L = await Xn(I);
            l.value = L, r.value = st(m), o.value = r.value, ut();
          } catch (m) {
            console.error("Failed to get devices:", m);
          }
      },
      { immediate: !0 }
    );
    const st = (I) => I.map((m) => {
      if (m.type == "interval") {
        if (m.seasonal_type === "runtime")
          return { ...m, warning: m.next_due <= 3600 };
        const L = new Date(m.next_due), ae = /* @__PURE__ */ new Date(), a = (L.getTime() - ae.getTime()) / (1e3 * 60 * 60 * 24);
        return { ...m, warning: a <= 0.5 };
      } else
        return { ...m, warning: !1 };
    }).sort((m, L) => L.notified !== m.notified ? L.notified - m.notified : L.warning !== m.warning ? Number(L.warning) - Number(m.warning) : 0), ut = () => {
      i.value == "areas" && dt();
    }, ne = () => {
      c.value = !1, h.value = !1, P.value = !1, R.value = !1, J.value = !1, le.value = [], Se.value = {}, s.value = {};
    }, Y = async () => {
      s.value.Type = ue.value, s.value.Control = Se.value?.control, s.value["Condition Duration"] === !0 ? (k.add("Duration"), k.add("Duration Type")) : (k.delete("Duration"), k.delete("Duration Type"), s.value.Duration = 0, s.value["Duration Type"] = ""), s.value["Seasonal Task"] === !0 ? (k.add("Seasonal Interval"), k.add("Seasonal Type")) : (k.delete("Seasonal Interval"), k.delete("Seasonal Type"), s.value["Seasonal Interval"] = 0, s.value["Seasonal Type"] = ""), s.value.Type == "conditional" || s.value["Interval Type"] == "runtime" ? (k.add("Sensor"), Se.value?.control == "number" ? k.add("Operator") : k.delete("Operator"), k.add("Value")) : (k.delete("Sensor"), k.delete("Operator"), k.delete("Value"), s.value.Sensor = "", s.value.Operator = "", s.value.Value = ""), s.value.Type == "interval" ? (k.add("Interval Type"), k.add("Repeat Every")) : (k.delete("Interval Type"), k.delete("Repeat Every"), s.value["Interval Type"] = "", s.value["Repeat Every"] = 0);
      for (const I of k)
        if (s.value[I] === void 0 || s.value[I] === null || s.value[I] === "") {
          alert(`Field '${I}' is required.`);
          return;
        }
      try {
        h.value ? await Xl(t.hass, s.value) : await Gl(t.hass, s.value), r.value = await Qt(t.hass), r.value = st(r.value), o.value = r.value, ut(), ne();
      } catch (I) {
        console.error("Failed to create maintenance task:", I);
      }
    }, H = async (I) => {
      if (I.detail.value.Sensor != "" && I.detail.value.Sensor != s.value.Sensor)
        try {
          const m = await Zn(t.hass, I.detail.value.Sensor);
          le.value = m, Se.value = le.value.length > 1 ? {} : le.value[0] ?? null, I.detail.value.Operator = "", I.detail.value.Value = "", I.detail.value.Attribute = "";
        } catch (m) {
          console.error("Failed to get attributes:", m);
        }
      if (u.value) {
        n.value = I.detail.value;
        return;
      }
      I.detail.value.Attribute != s.value.Attribute && (I.detail.value.Value = "", I.detail.value.Operator = ""), s.value = I.detail.value, P.value = s.value["Seasonal Task"] ?? !1, R.value = s.value["Condition Duration"] ?? !1, J.value = s.value["Interval Type"] == "runtime", s.value.Attribute && le.value.length > 1 && (Se.value = le.value?.find((m) => m.option === s.value.Attribute) ?? null);
    }, Ue = async () => {
      if (t.hass)
        try {
          await Jl(t.hass, E.value), p.value = !1, E.value = "null", r.value = await Qt(t.hass), r.value = st(r.value), o.value = r.value, ut();
        } catch (I) {
          console.error("Failed to delete task: ", I);
        }
    }, vt = async () => {
      if (t.hass)
        try {
          await Yl(t.hass, g.value, n.value), u.value = !1, g.value = "null", n.value = {}, l.value = await Xn(t.hass), r.value = await Qt(t.hass), r.value = st(r.value), o.value = r.value, ut();
        } catch (I) {
          console.error("Failed to completing task: ", I);
        }
    }, We = (I) => {
      ge.value = l.value.find((m) => m.id === I);
    }, Me = Je(
      () => [...ge.value.completion_dates].reverse()
    ), zt = () => {
      ue.value = "interval", s.value = {}, s.value.Type = "interval";
    }, ys = () => {
      ue.value = "conditional", s.value = {}, s.value.Type = "conditional";
    }, Gt = async (I) => {
      h.value = !0;
      const m = r.value.find((L) => L.id === I);
      if (m.sensor != "")
        try {
          const L = await Zn(t.hass, m.sensor);
          le.value = L, Se.value = le.value?.find((ae) => ae.option === m.option) ?? L[0] ?? null;
        } catch (L) {
          console.error("Failed to get attributes:", L);
        }
      P.value = m.seasonal, R.value = m.duration_condition, J.value = m.seasonal_type == "runtime", ue.value = m.type, m.duration_type == "minutes" ? m.duration /= 60 : m.duration_type == "hours" && (m.duration /= 3600), s.value = {
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
    }, ft = async (I) => {
      switch (i.value = I.detail.value["Select Filter"], i.value) {
        case "areas":
          dt();
          break;
        default:
          o.value = r.value;
          break;
      }
    }, dt = () => {
      const I = {};
      r.value.forEach((m) => {
        I[m.location] || (I[m.location] = []), I[m.location].push(m);
      }), o.value = Object.entries(I).flatMap(([m, L]) => L);
    };
    return (I, m) => {
      const L = ce("ha-icon"), ae = ce("ha-button"), a = ce("ha-form"), f = ce("ha-card");
      return z(), ve(de, null, [
        t.hass ? (z(), ke(sa, {
          key: 0,
          hass: t.hass,
          narrow: t.narrow
        }, null, 8, ["hass", "narrow"])) : He("", !0),
        x("div", Ha, [
          T(zl, {
            totalTasks: B.value,
            upcomingTasks: N.value,
            overdueTasks: ee.value
          }, null, 8, ["totalTasks", "upcomingTasks", "overdueTasks"]),
          T(f, { class: "flex flex-col p-6 gap-5" }, {
            default: $(() => [
              x("div", La, [
                m[8] || (m[8] = x("div", { class: "flex flex-col" }, [
                  x("div", { class: "text-2xl font-medium" }, "Maintenance Tasks"),
                  x("div", { class: "text-xl" }, "Manage scheduled and conditional maintenance for your smart devices")
                ], -1)),
                x("div", Va, [
                  x("div", Ba, [
                    x("div", Ua, [
                      T(ae, {
                        onClick: m[0] || (m[0] = (d) => c.value = !0)
                      }, {
                        default: $(() => [
                          T(L, {
                            class: "text-white",
                            ".icon": "mdi:plus"
                          }, null, 32),
                          m[7] || (m[7] = re(" New Task", -1))
                        ]),
                        _: 1
                      }),
                      T(a, {
                        ".hass": t.hass,
                        ".schema": nt(Be),
                        onValueChanged: ft
                      }, null, 40, [".hass", ".schema"])
                    ])
                  ])
                ])
              ]),
              T(f, { class: "flex w-full p-1 gap-1 rounded-full" }, {
                default: $(() => [
                  T(ae, {
                    onClick: m[1] || (m[1] = (d) => W.value = "interval"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: W.value === "interval" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: $(() => [
                      T(L, {
                        variant: "neutral",
                        ".icon": "mdi:calendar-blank"
                      }, null, 32),
                      m[9] || (m[9] = re(" Interval tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(ae, {
                    onClick: m[2] || (m[2] = (d) => W.value = "conditional"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: W.value === "conditional" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: $(() => [
                      T(L, {
                        variant: "neutral",
                        ".icon": "mdi:triangle-wave"
                      }, null, 32),
                      m[10] || (m[10] = re(" Conditional tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  T(ae, {
                    onClick: m[3] || (m[3] = (d) => W.value = "history"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: W.value === "history" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: $(() => [
                      T(L, {
                        variant: "neutral",
                        ".icon": "mdi:history"
                      }, null, 32),
                      m[11] || (m[11] = re(" History", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"])
                ]),
                _: 1
              }),
              B.value == 0 ? (z(), ve("div", Wa, "No tasks created yet...")) : He("", !0),
              W.value === "conditional" ? (z(!0), ve(de, { key: 1 }, Zt(o.value.filter((d) => d.type == "conditional"), (d) => (z(), ke(ha, {
                key: d.id,
                id: d.id,
                name: d.name,
                location: d.location_name,
                description: d.description,
                sensor: d.sensor,
                operator: d.operator,
                value: d.value,
                overdue: d.notified,
                onDeleteTask: (_) => {
                  p.value = !0, E.value = d.id;
                },
                onCompleteTask: (_) => {
                  u.value = !0, g.value = d.id;
                },
                onEditTask: (_) => Gt(d.id)
              }, null, 8, ["id", "name", "location", "description", "sensor", "operator", "value", "overdue", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : He("", !0),
              W.value === "interval" ? (z(!0), ve(de, { key: 2 }, Zt(o.value.filter((d) => d.type == "interval"), (d) => (z(), ke($a, {
                key: d.id,
                id: d.id,
                name: d.name,
                location: d.location_name,
                description: d.description,
                value: d.seasonal_interval,
                overdue: d.notified,
                next_due: d.next_due,
                last_completed: d.last_completed,
                seasonal_type: d.seasonal_type,
                warning: d.warning,
                onDeleteTask: (_) => {
                  p.value = !0, E.value = d.id;
                },
                onCompleteTask: (_) => {
                  u.value = !0, g.value = d.id;
                },
                onEditTask: (_) => Gt(d.id)
              }, null, 8, ["id", "name", "location", "description", "value", "overdue", "next_due", "last_completed", "seasonal_type", "warning", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : He("", !0),
              W.value === "history" ? (z(), ke(f, {
                key: 3,
                class: "w-full p-4"
              }, {
                default: $(() => [
                  x("table", Ka, [
                    m[12] || (m[12] = x("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      x("tr", null, [
                        x("th", null, "Task Name"),
                        x("th", null, "Location"),
                        x("th", null, "Date"),
                        x("th", null, "Note")
                      ])
                    ], -1)),
                    x("tbody", null, [
                      (z(!0), ve(de, null, Zt(l.value, (d) => (z(), ve("tr", {
                        onClick: (_) => We(d.id),
                        class: "cursor-pointer",
                        key: d.id
                      }, [
                        x("td", null, G(d.name), 1),
                        x("td", null, G(d.location_name), 1),
                        x("td", null, G(d.completion_dates.at(-1).date.replace("T", " ")), 1),
                        x("td", Ga, G(d.completion_dates.at(-1).note), 1)
                      ], 8, za))), 128))
                    ])
                  ])
                ]),
                _: 1
              })) : He("", !0)
            ]),
            _: 1
          }),
          T(Pt, { show: c.value }, {
            default: $(() => [
              T(f, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: $(() => [
                  x("div", Ja, [
                    x("div", Ya, [
                      T(L, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: ne
                      }, null, 32),
                      m[13] || (m[13] = x("div", { class: "flex-shrink-0" }, "Create Maintenance Task", -1))
                    ])
                  ]),
                  T(f, { class: "mb-2 flex w-full p-1 gap-1 rounded-full" }, {
                    default: $(() => [
                      T(ae, {
                        onClick: zt,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ue.value === "interval" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: $(() => [...m[14] || (m[14] = [
                          re("Interval tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"]),
                      T(ae, {
                        onClick: ys,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ue.value === "conditional" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: $(() => [...m[15] || (m[15] = [
                          re("Conditional tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"])
                    ]),
                    _: 1
                  }),
                  ue.value == "conditional" ? (z(), ke(a, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": nt(tt),
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema"])) : (z(), ke(a, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": nt(ct),
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema"])),
                  x("div", Xa, [
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: ne
                    }, {
                      default: $(() => [...m[16] || (m[16] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      onClick: Y
                    }, {
                      default: $(() => [...m[17] || (m[17] = [
                        re("Create", -1)
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
            default: $(() => [
              T(f, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: $(() => [
                  x("div", Za, [
                    x("div", Qa, [
                      T(L, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: ne
                      }, null, 32),
                      m[18] || (m[18] = x("div", { class: "flex-shrink-0" }, "Edit Maintenance Task", -1))
                    ])
                  ]),
                  s.value.Type == "conditional" ? (z(), ke(a, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": nt(tt),
                    ".data": s.value,
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema", ".data"])) : (z(), ke(a, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": nt(ct),
                    ".data": s.value,
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema", ".data"])),
                  x("div", ec, [
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: ne
                    }, {
                      default: $(() => [...m[19] || (m[19] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      onClick: Y
                    }, {
                      default: $(() => [...m[20] || (m[20] = [
                        re("Edit", -1)
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
            default: $(() => [
              T(f, { class: "p-6 flex flex-col" }, {
                default: $(() => [
                  m[23] || (m[23] = x("div", { class: "flex flex-col" }, [
                    x("div", { class: "text-2xl font-medium mb-5" }, "Create Maintenance Task"),
                    x("div", { class: "text-lg font-medium mb-5" }, "Are you sure you want to delete this maintenance task? This action cannot be undone.")
                  ], -1)),
                  x("div", tc, [
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[4] || (m[4] = (d) => p.value = !1)
                    }, {
                      default: $(() => [...m[21] || (m[21] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "danger",
                      onClick: Ue
                    }, {
                      default: $(() => [...m[22] || (m[22] = [
                        re("Delete", -1)
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
          T(Pt, { show: u.value }, {
            default: $(() => [
              T(f, { class: "p-6 flex flex-col" }, {
                default: $(() => [
                  m[26] || (m[26] = x("div", { class: "flex flex-col" }, [
                    x("div", { class: "text-2xl font-medium mb-5" }, "Mark as Complete"),
                    x("div", { class: "text-lg font-medium mb-5" }, "Add any notes about completing this maintenance task (optional).")
                  ], -1)),
                  T(a, {
                    ".hass": t.hass,
                    ".schema": nt(_t),
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema"]),
                  x("div", sc, [
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[5] || (m[5] = (d) => u.value = !1)
                    }, {
                      default: $(() => [...m[24] || (m[24] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    T(ae, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "brand",
                      onClick: vt
                    }, {
                      default: $(() => [...m[25] || (m[25] = [
                        re("Mark Complete", -1)
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
            default: $(() => [
              T(f, { class: "p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide" }, {
                default: $(() => [
                  x("div", nc, [
                    x("div", rc, [
                      T(L, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: m[6] || (m[6] = (d) => ge.value = "")
                      }, null, 32),
                      x("div", oc, G(ge.value.name) + "'s history", 1)
                    ]),
                    x("div", ic, G(ge.value.location_name), 1)
                  ]),
                  x("table", lc, [
                    m[27] || (m[27] = x("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      x("tr", null, [
                        x("th", null, "Date"),
                        x("th", null, "Note")
                      ])
                    ], -1)),
                    x("tbody", null, [
                      (z(!0), ve(de, null, Zt(Me.value, (d) => (z(), ve("tr", null, [
                        x("td", ac, G(d.date.replace("T", " ")), 1),
                        x("td", cc, G(d.note), 1)
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
}), fc = "*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\\[8\\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-4{margin-top:1rem}.flex{display:flex}.table{display:table}.grid{display:grid}.hidden{display:none}.max-h-\\[80vh\\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink{flex-shrink:1}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5}.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[1\\.1em\\]{font-size:1.1em}.text-\\[1\\.2em\\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}", dc = /* @__PURE__ */ ro(uc, [["styles", [fc]]]), pc = /* @__PURE__ */ Sl(dc);

if(!customElements.get("maintenance-manager-panel", pc)){
    customElements.define("maintenance-manager-panel", pc);
}