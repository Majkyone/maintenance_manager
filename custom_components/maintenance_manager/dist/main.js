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
const X = {}, yt = [], He = () => {
}, Qn = () => !1, fs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Gs = (e) => e.startsWith("onUpdate:"), ie = Object.assign, Js = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, oo = Object.prototype.hasOwnProperty, V = (e, t) => oo.call(e, t), N = Array.isArray, wt = (e) => ds(e) === "[object Map]", er = (e) => ds(e) === "[object Set]", F = (e) => typeof e == "function", oe = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", ee = (e) => e !== null && typeof e == "object", tr = (e) => (ee(e) || F(e)) && F(e.then) && F(e.catch), sr = Object.prototype.toString, ds = (e) => sr.call(e), io = (e) => ds(e).slice(8, -1), ps = (e) => ds(e) === "[object Object]", Ys = (e) => oe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Rt = /* @__PURE__ */ zs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), hs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, lo = /-\w/g, xe = hs(
  (e) => e.replace(lo, (t) => t.slice(1).toUpperCase())
), ao = /\B([A-Z])/g, Pe = hs(
  (e) => e.replace(ao, "-$1").toLowerCase()
), ms = hs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ts = hs(
  (e) => e ? `on${ms(e)}` : ""
), lt = (e, t) => !Object.is(e, t), Ss = (e, ...t) => {
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
  if (N(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], r = oe(n) ? ho(n) : Xs(n);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (oe(e) || ee(e))
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
  else if (N(e))
    for (let s = 0; s < e.length; s++) {
      const n = Ut(e[s]);
      n && (t += n + " ");
    }
  else if (ee(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const mo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", go = /* @__PURE__ */ zs(mo);
function rr(e) {
  return !!e || e === "";
}
const or = (e) => !!(e && e.__v_isRef === !0), Z = (e) => oe(e) ? e : e == null ? "" : N(e) || ee(e) && (e.toString === sr || !F(e.toString)) ? or(e) ? Z(e.value) : JSON.stringify(e, ir, 2) : String(e), ir = (e, t) => or(t) ? ir(e, t.value) : wt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, r], o) => (s[Cs(n, o) + " =>"] = r, s),
    {}
  )
} : er(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Cs(s))
} : Qe(t) ? Cs(t) : ee(t) && !N(t) && !ps(t) ? String(t) : t, Cs = (e, t = "") => {
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
let Te;
class _o {
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
function vo() {
  return Te;
}
let Y;
const Es = /* @__PURE__ */ new WeakSet();
class lr {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Te && Te.active && Te.effects.push(this);
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
    const t = Y, s = Re;
    Y = this, Re = !0;
    try {
      return this.fn();
    } finally {
      fr(this), Y = t, Re = s, this.flags &= -3;
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
let ar = 0, $t, Nt;
function cr(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Nt, Nt = e;
    return;
  }
  e.next = $t, $t = e;
}
function Zs() {
  ar++;
}
function Qs() {
  if (--ar > 0)
    return;
  if (Nt) {
    let t = Nt;
    for (Nt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; $t; ) {
    let t = $t;
    for ($t = void 0; t; ) {
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
  const t = e.dep, s = Y, n = Re;
  Y = e, Re = !0;
  try {
    ur(e);
    const r = e.fn(e._value);
    (t.version === 0 || lt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    Y = s, Re = n, fr(e), e.flags &= -3;
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
let Re = !0;
const pr = [];
function Ye() {
  pr.push(Re), Re = !1;
}
function Xe() {
  const e = pr.pop();
  Re = e === void 0 ? !0 : e;
}
function xn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = Y;
    Y = void 0;
    try {
      t();
    } finally {
      Y = s;
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
    if (!Y || !Re || Y === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== Y)
      s = this.activeLink = new xo(Y, this), Y.deps ? (s.prevDep = Y.depsTail, Y.depsTail.nextDep = s, Y.depsTail = s) : Y.deps = Y.depsTail = s, hr(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = Y.depsTail, s.nextDep = void 0, Y.depsTail.nextDep = s, Y.depsTail = s, Y.deps === s && (Y.deps = n);
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
function de(e, t, s) {
  if (Re && Y) {
    let n = Fs.get(e);
    n || Fs.set(e, n = /* @__PURE__ */ new Map());
    let r = n.get(s);
    r || (n.set(s, r = new tn()), r.map = n, r.key = s), r.track();
  }
}
function ze(e, t, s, n, r, o) {
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
    const c = N(e), p = c && Ys(s);
    if (c && s === "length") {
      const u = Number(n);
      i.forEach((h, y) => {
        (y === "length" || y === Ht || !Qe(y) && y >= u) && l(h);
      });
    } else
      switch ((s !== void 0 || i.has(void 0)) && l(i.get(s)), p && l(i.get(Ht)), t) {
        case "add":
          c ? p && l(i.get("length")) : (l(i.get(gt)), wt(e) && l(i.get(js)));
          break;
        case "delete":
          c || (l(i.get(gt)), wt(e) && l(i.get(js)));
          break;
        case "set":
          wt(e) && l(i.get(gt));
          break;
      }
  }
  Qs();
}
function bt(e) {
  const t = B(e);
  return t === e ? t : (de(t, "iterate", Ht), Ie(e) ? t : t.map(ue));
}
function _s(e) {
  return de(e = B(e), "iterate", Ht), e;
}
const yo = {
  __proto__: null,
  [Symbol.iterator]() {
    return As(this, Symbol.iterator, ue);
  },
  concat(...e) {
    return bt(this).concat(
      ...e.map((t) => N(t) ? bt(t) : t)
    );
  },
  entries() {
    return As(this, "entries", (e) => (e[1] = ue(e[1]), e));
  },
  every(e, t) {
    return We(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return We(this, "filter", e, t, (s) => s.map(ue), arguments);
  },
  find(e, t) {
    return We(this, "find", e, t, ue, arguments);
  },
  findIndex(e, t) {
    return We(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return We(this, "findLast", e, t, ue, arguments);
  },
  findLastIndex(e, t) {
    return We(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return We(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Os(this, "includes", e);
  },
  indexOf(...e) {
    return Os(this, "indexOf", e);
  },
  join(e) {
    return bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Os(this, "lastIndexOf", e);
  },
  map(e, t) {
    return We(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return kt(this, "pop");
  },
  push(...e) {
    return kt(this, "push", e);
  },
  reduce(e, ...t) {
    return yn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return yn(this, "reduceRight", e, t);
  },
  shift() {
    return kt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return We(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return kt(this, "splice", e);
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
    return kt(this, "unshift", e);
  },
  values() {
    return As(this, "values", ue);
  }
};
function As(e, t, s) {
  const n = _s(e), r = n[t]();
  return n !== e && !Ie(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.done || (o.value = s(o.value)), o;
  }), r;
}
const wo = Array.prototype;
function We(e, t, s, n, r, o) {
  const i = _s(e), l = i !== e && !Ie(e), c = i[t];
  if (c !== wo[t]) {
    const h = c.apply(e, o);
    return l ? ue(h) : h;
  }
  let p = s;
  i !== e && (l ? p = function(h, y) {
    return s.call(this, ue(h), y, e);
  } : s.length > 2 && (p = function(h, y) {
    return s.call(this, h, y, e);
  }));
  const u = c.call(i, p, n);
  return l && r ? r(u) : u;
}
function yn(e, t, s, n) {
  const r = _s(e);
  let o = s;
  return r !== e && (Ie(e) ? s.length > 3 && (o = function(i, l, c) {
    return s.call(this, i, l, c, e);
  }) : o = function(i, l, c) {
    return s.call(this, i, ue(l), c, e);
  }), r[t](o, ...n);
}
function Os(e, t, s) {
  const n = B(e);
  de(n, "iterate", Ht);
  const r = n[t](...s);
  return (r === -1 || r === !1) && on(s[0]) ? (s[0] = B(s[0]), n[t](...s)) : r;
}
function kt(e, t, s = []) {
  Ye(), Zs();
  const n = B(e)[t].apply(e, s);
  return Qs(), Xe(), n;
}
const To = /* @__PURE__ */ zs("__proto__,__v_isRef,__isVue"), mr = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function So(e) {
  Qe(e) || (e = String(e));
  const t = B(this);
  return de(t, "has", e), t.hasOwnProperty(e);
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
      return n === (r ? o ? $o : xr : o ? br : vr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const i = N(t);
    if (!r) {
      let c;
      if (i && (c = yo[s]))
        return c;
      if (s === "hasOwnProperty")
        return So;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      he(t) ? t : n
    );
    if ((Qe(s) ? mr.has(s) : To(s)) || (r || de(t, "get", s), o))
      return l;
    if (he(l)) {
      const c = i && Ys(s) ? l : l.value;
      return r && ee(c) ? Hs(c) : c;
    }
    return ee(l) ? r ? Hs(l) : nn(l) : l;
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
      if (!Ie(n) && !at(n) && (o = B(o), n = B(n)), !N(t) && he(o) && !he(n))
        return c || (o.value = n), !0;
    }
    const i = N(t) && Ys(s) ? Number(s) < t.length : V(t, s), l = Reflect.set(
      t,
      s,
      n,
      he(t) ? t : r
    );
    return t === B(r) && (i ? lt(n, o) && ze(t, "set", s, n) : ze(t, "add", s, n)), l;
  }
  deleteProperty(t, s) {
    const n = V(t, s);
    t[s];
    const r = Reflect.deleteProperty(t, s);
    return r && n && ze(t, "delete", s, void 0), r;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Qe(s) || !mr.has(s)) && de(t, "has", s), n;
  }
  ownKeys(t) {
    return de(
      t,
      "iterate",
      N(t) ? "length" : gt
    ), Reflect.ownKeys(t);
  }
}
class Co extends gr {
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
const Eo = /* @__PURE__ */ new _r(), Ao = /* @__PURE__ */ new Co(), Oo = /* @__PURE__ */ new _r(!0);
const qs = (e) => e, Jt = (e) => Reflect.getPrototypeOf(e);
function ko(e, t, s) {
  return function(...n) {
    const r = this.__v_raw, o = B(r), i = wt(o), l = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, p = r[e](...n), u = s ? qs : t ? rs : ue;
    return !t && de(
      o,
      "iterate",
      c ? js : gt
    ), {
      // iterator protocol
      next() {
        const { value: h, done: y } = p.next();
        return y ? { value: h, done: y } : {
          value: l ? [u(h[0]), u(h[1])] : u(h),
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
function Mo(e, t) {
  const s = {
    get(r) {
      const o = this.__v_raw, i = B(o), l = B(r);
      e || (lt(r, l) && de(i, "get", r), de(i, "get", l));
      const { has: c } = Jt(i), p = t ? qs : e ? rs : ue;
      if (c.call(i, r))
        return p(o.get(r));
      if (c.call(i, l))
        return p(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && de(B(r), "iterate", gt), r.size;
    },
    has(r) {
      const o = this.__v_raw, i = B(o), l = B(r);
      return e || (lt(r, l) && de(i, "has", r), de(i, "has", l)), r === l ? o.has(r) : o.has(r) || o.has(l);
    },
    forEach(r, o) {
      const i = this, l = i.__v_raw, c = B(l), p = t ? qs : e ? rs : ue;
      return !e && de(c, "iterate", gt), l.forEach((u, h) => r.call(o, p(u), p(h), i));
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
        !t && !Ie(r) && !at(r) && (r = B(r));
        const o = B(this);
        return Jt(o).has.call(o, r) || (o.add(r), ze(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !Ie(o) && !at(o) && (o = B(o));
        const i = B(this), { has: l, get: c } = Jt(i);
        let p = l.call(i, r);
        p || (r = B(r), p = l.call(i, r));
        const u = c.call(i, r);
        return i.set(r, o), p ? lt(o, u) && ze(i, "set", r, o) : ze(i, "add", r, o), this;
      },
      delete(r) {
        const o = B(this), { has: i, get: l } = Jt(o);
        let c = i.call(o, r);
        c || (r = B(r), c = i.call(o, r)), l && l.call(o, r);
        const p = o.delete(r);
        return c && ze(o, "delete", r, void 0), p;
      },
      clear() {
        const r = B(this), o = r.size !== 0, i = r.clear();
        return o && ze(
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
    s[r] = ko(r, e, t);
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
}, Ro = {
  get: /* @__PURE__ */ sn(!0, !1)
};
const vr = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap(), xr = /* @__PURE__ */ new WeakMap(), $o = /* @__PURE__ */ new WeakMap();
function No(e) {
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : No(io(e));
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
    Oo,
    Io,
    br
  );
}
function Hs(e) {
  return rn(
    e,
    !0,
    Ao,
    Ro,
    xr
  );
}
function rn(e, t, s, n, r) {
  if (!ee(e) || e.__v_raw && !(t && e.__v_isReactive))
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
function B(e) {
  const t = e && e.__v_raw;
  return t ? B(t) : e;
}
function jo(e) {
  return !V(e, "__v_skip") && Object.isExtensible(e) && nr(e, "__v_skip", !0), e;
}
const ue = (e) => ee(e) ? nn(e) : e, rs = (e) => ee(e) ? Hs(e) : e;
function he(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function se(e) {
  return qo(e, !1);
}
function qo(e, t) {
  return he(e) ? e : new Ho(e, t);
}
class Ho {
  constructor(t, s) {
    this.dep = new tn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : B(t), this._value = s ? t : ue(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || Ie(t) || at(t);
    t = n ? t : B(t), lt(t, s) && (this._rawValue = t, this._value = n ? t : ue(t), this.dep.trigger());
  }
}
function nt(e) {
  return he(e) ? e.value : e;
}
const Lo = {
  get: (e, t, s) => t === "__v_raw" ? e : nt(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const r = e[t];
    return he(r) && !he(s) ? (r.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function yr(e) {
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
    Y !== this)
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
  return F(e) ? n = e : (n = e.get, r = e.set), new Vo(n, r, s);
}
const Xt = {}, os = /* @__PURE__ */ new WeakMap();
let mt;
function Uo(e, t = !1, s = mt) {
  if (s) {
    let n = os.get(s);
    n || os.set(s, n = []), n.push(e);
  }
}
function Wo(e, t, s = X) {
  const { immediate: n, deep: r, once: o, scheduler: i, augmentJob: l, call: c } = s, p = (I) => r ? I : Ie(I) || r === !1 || r === 0 ? it(I, 1) : it(I);
  let u, h, y, E, R = !1, j = !1;
  if (he(e) ? (h = () => e.value, R = Ie(e)) : Tt(e) ? (h = () => p(e), R = !0) : N(e) ? (j = !0, R = e.some((I) => Tt(I) || Ie(I)), h = () => e.map((I) => {
    if (he(I))
      return I.value;
    if (Tt(I))
      return p(I);
    if (F(I))
      return c ? c(I, 2) : I();
  })) : F(e) ? t ? h = c ? () => c(e, 2) : e : h = () => {
    if (y) {
      Ye();
      try {
        y();
      } finally {
        Xe();
      }
    }
    const I = mt;
    mt = u;
    try {
      return c ? c(e, 3, [E]) : e(E);
    } finally {
      mt = I;
    }
  } : h = He, t && r) {
    const I = h, U = r === !0 ? 1 / 0 : r;
    h = () => it(I(), U);
  }
  const te = vo(), O = () => {
    u.stop(), te && te.active && Js(te.effects, u);
  };
  if (o && t) {
    const I = t;
    t = (...U) => {
      I(...U), O();
    };
  }
  let K = j ? new Array(e.length).fill(Xt) : Xt;
  const Q = (I) => {
    if (!(!(u.flags & 1) || !u.dirty && !I))
      if (t) {
        const U = u.run();
        if (r || R || (j ? U.some((me, ce) => lt(me, K[ce])) : lt(U, K))) {
          y && y();
          const me = mt;
          mt = u;
          try {
            const ce = [
              U,
              // pass undefined as the old value when it's changed for the first time
              K === Xt ? void 0 : j && K[0] === Xt ? [] : K,
              E
            ];
            K = U, c ? c(t, 3, ce) : (
              // @ts-expect-error
              t(...ce)
            );
          } finally {
            mt = me;
          }
        }
      } else
        u.run();
  };
  return l && l(Q), u = new lr(h), u.scheduler = i ? () => i(Q, !1) : Q, E = (I) => Uo(I, !1, u), y = u.onStop = () => {
    const I = os.get(u);
    if (I) {
      if (c)
        c(I, 4);
      else
        for (const U of I) U();
      os.delete(u);
    }
  }, t ? n ? Q(!0) : K = u.run() : i ? i(Q.bind(null, !0), !0) : u.run(), O.pause = u.pause.bind(u), O.resume = u.resume.bind(u), O.stop = O, O;
}
function it(e, t = 1 / 0, s) {
  if (t <= 0 || !ee(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, he(e))
    it(e.value, t, s);
  else if (N(e))
    for (let n = 0; n < e.length; n++)
      it(e[n], t, s);
  else if (er(e) || wt(e))
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
function Le(e, t, s, n) {
  if (F(e)) {
    const r = Wt(e, t, s, n);
    return r && tr(r) && r.catch((o) => {
      vs(o, t, s);
    }), r;
  }
  if (N(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(Le(e[o], t, s, n));
    return r;
  }
}
function vs(e, t, s, n = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || X;
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
const ve = [];
let je = -1;
const St = [];
let rt = null, xt = 0;
const wr = /* @__PURE__ */ Promise.resolve();
let is = null;
function Tr(e) {
  const t = is || wr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function zo(e) {
  let t = je + 1, s = ve.length;
  for (; t < s; ) {
    const n = t + s >>> 1, r = ve[n], o = Lt(r);
    o < e || o === e && r.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function ln(e) {
  if (!(e.flags & 1)) {
    const t = Lt(e), s = ve[ve.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Lt(s) ? ve.push(e) : ve.splice(zo(t), 0, e), e.flags |= 1, Sr();
  }
}
function Sr() {
  is || (is = wr.then(Er));
}
function Go(e) {
  N(e) ? St.push(...e) : rt && e.id === -1 ? rt.splice(xt + 1, 0, e) : e.flags & 1 || (St.push(e), e.flags |= 1), Sr();
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
function Cr(e) {
  if (St.length) {
    const t = [...new Set(St)].sort(
      (s, n) => Lt(s) - Lt(n)
    );
    if (St.length = 0, rt) {
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
    for (je = 0; je < ve.length; je++) {
      const t = ve[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Wt(
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
    je = -1, ve.length = 0, Cr(), is = null, (ve.length || St.length) && Er();
  }
}
let be = null, Ar = null;
function ls(e) {
  const t = be;
  return be = e, Ar = e && e.type.__scopeId || null, t;
}
function D(e, t = be, s) {
  if (!t || e._n)
    return e;
  const n = (...r) => {
    n._d && Rn(-1);
    const o = ls(t);
    let i;
    try {
      i = e(...r);
    } finally {
      ls(o), n._d && Rn(1);
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
    c && (Ye(), Le(c, s, 8, [
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
function Or(e, t) {
  return F(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ie({ name: e.name }, t, { setup: e })
  ) : e;
}
function kr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const as = /* @__PURE__ */ new WeakMap();
function Dt(e, t, s, n, r = !1) {
  if (N(e)) {
    e.forEach(
      (R, j) => Dt(
        R,
        t && (N(t) ? t[j] : t),
        s,
        n,
        r
      )
    );
    return;
  }
  if (Ct(n) && !r) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Dt(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? pn(n.component) : n.el, i = r ? null : o, { i: l, r: c } = e, p = t && t.r, u = l.refs === X ? l.refs = {} : l.refs, h = l.setupState, y = B(h), E = h === X ? Qn : (R) => V(y, R);
  if (p != null && p !== c) {
    if (Tn(t), oe(p))
      u[p] = null, E(p) && (h[p] = null);
    else if (he(p)) {
      p.value = null;
      const R = t;
      R.k && (u[R.k] = null);
    }
  }
  if (F(c))
    Wt(c, l, 12, [i, u]);
  else {
    const R = oe(c), j = he(c);
    if (R || j) {
      const te = () => {
        if (e.f) {
          const O = R ? E(c) ? h[c] : u[c] : c.value;
          if (r)
            N(O) && Js(O, o);
          else if (N(O))
            O.includes(o) || O.push(o);
          else if (R)
            u[c] = [o], E(c) && (h[c] = u[c]);
          else {
            const K = [o];
            c.value = K, e.k && (u[e.k] = K);
          }
        } else R ? (u[c] = i, E(c) && (h[c] = i)) : j && (c.value = i, e.k && (u[e.k] = i));
      };
      if (i) {
        const O = () => {
          te(), as.delete(e);
        };
        O.id = -1, as.set(e, O), Ee(O, s);
      } else
        Tn(e), te();
    }
  }
}
function Tn(e) {
  const t = as.get(e);
  t && (t.flags |= 8, as.delete(e));
}
gs().requestIdleCallback;
gs().cancelIdleCallback;
const Ct = (e) => !!e.type.__asyncLoader, Mr = (e) => e.type.__isKeepAlive;
function Zo(e, t) {
  Pr(e, "a", t);
}
function Qo(e, t) {
  Pr(e, "da", t);
}
function Pr(e, t, s = pe) {
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
function bs(e, t, s = pe, n = !1) {
  if (s) {
    const r = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...i) => {
      Ye();
      const l = Kt(s), c = Le(t, s, e, i);
      return l(), Xe(), c;
    });
    return n ? r.unshift(o) : r.push(o), o;
  }
}
const et = (e) => (t, s = pe) => {
  (!Bt || e === "sp") && bs(e, (...n) => t(...n), s);
}, ti = et("bm"), si = et("m"), ni = et(
  "bu"
), ri = et("u"), oi = et(
  "bum"
), Ir = et("um"), ii = et(
  "sp"
), li = et("rtg"), ai = et("rtc");
function ci(e, t = pe) {
  bs("ec", e, t);
}
const ui = "components";
function Ae(e, t) {
  return di(ui, e, !0, t) || e;
}
const fi = Symbol.for("v-ndc");
function di(e, t, s = !0, n = !1) {
  const r = be || pe;
  if (r) {
    const o = r.type;
    {
      const l = sl(
        o,
        !1
      );
      if (l && (l === t || l === xe(t) || l === ms(xe(t))))
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
  return e && (e[t] || e[xe(t)] || e[ms(xe(t))]);
}
function Zt(e, t, s, n) {
  let r;
  const o = s, i = N(e);
  if (i || oe(e)) {
    const l = i && Tt(e);
    let c = !1, p = !1;
    l && (c = !Ie(e), p = at(e), e = _s(e)), r = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      r[u] = t(
        c ? p ? rs(ue(e[u])) : ue(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, o);
  } else if (ee(e))
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
  if (be.ce || be.parent && Ct(be.parent) && be.parent.ce) {
    const p = Object.keys(s).length > 0;
    return z(), _e(
      fe,
      null,
      [S("slot", s, n)],
      p ? -2 : 64
    );
  }
  let o = e[t];
  o && o._c && (o._d = !1), z();
  const i = o && Rr(o(s)), l = s.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  i && i.key, c = _e(
    fe,
    {
      key: (l && !Qe(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!i && n ? "_fb" : "")
    },
    i || [],
    i && e._ === 1 ? 64 : -2
  );
  return c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), o && o._c && (o._d = !0), c;
}
function Rr(e) {
  return e.some((t) => fn(t) ? !(t.type === Ze || t.type === fe && !Rr(t.children)) : !0) ? e : null;
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
    $options: (e) => Nr(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ln(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Tr.bind(e.proxy)),
    $watch: (e) => Ni.bind(e)
  })
), ks = (e, t) => e !== X && !e.__isScriptSetup && V(e, t), hi = {
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
        if (ks(n, t))
          return i[t] = 1, n[t];
        if (r !== X && V(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (p = e.propsOptions[0]) && V(p, t)
        )
          return i[t] = 3, o[t];
        if (s !== X && V(s, t))
          return i[t] = 4, s[t];
        Vs && (i[t] = 0);
      }
    }
    const u = Ft[t];
    let h, y;
    if (u)
      return t === "$attrs" && de(e.attrs, "get", ""), u(e);
    if (
      // css module (injected by vue-loader)
      (h = l.__cssModules) && (h = h[t])
    )
      return h;
    if (s !== X && V(s, t))
      return i[t] = 4, s[t];
    if (
      // global properties
      y = c.config.globalProperties, V(y, t)
    )
      return y[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: r, ctx: o } = e;
    return ks(r, t) ? (r[t] = s, !0) : n !== X && V(n, t) ? (n[t] = s, !0) : V(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: r, propsOptions: o, type: i }
  }, l) {
    let c, p;
    return !!(s[l] || e !== X && l[0] !== "$" && V(e, l) || ks(t, l) || (c = o[0]) && V(c, l) || V(n, l) || V(Ft, l) || V(r.config.globalProperties, l) || (p = i.__cssModules) && p[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : V(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Cn(e) {
  return N(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let Vs = !0;
function mi(e) {
  const t = Nr(e), s = e.proxy, n = e.ctx;
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
    mounted: y,
    beforeUpdate: E,
    updated: R,
    activated: j,
    deactivated: te,
    beforeDestroy: O,
    beforeUnmount: K,
    destroyed: Q,
    unmounted: I,
    render: U,
    renderTracked: me,
    renderTriggered: ce,
    errorCaptured: le,
    serverPrefetch: Se,
    // public API
    expose: Ve,
    inheritAttrs: tt,
    // assets
    components: ct,
    directives: _t,
    filters: st
  } = t;
  if (p && gi(p, n, null), i)
    for (const G in i) {
      const H = i[G];
      F(H) && (n[G] = H.bind(s));
    }
  if (r) {
    const G = r.call(s, s);
    ee(G) && (e.data = nn(G));
  }
  if (Vs = !0, o)
    for (const G in o) {
      const H = o[G], Be = F(H) ? H.bind(s, s) : F(H.get) ? H.get.bind(s, s) : He, vt = !F(H) && F(H.set) ? H.set.bind(s) : He, Ue = Je({
        get: Be,
        set: vt
      });
      Object.defineProperty(n, G, {
        enumerable: !0,
        configurable: !0,
        get: () => Ue.value,
        set: (ke) => Ue.value = ke
      });
    }
  if (l)
    for (const G in l)
      $r(l[G], n, s, G);
  if (c) {
    const G = F(c) ? c.call(s) : c;
    Reflect.ownKeys(G).forEach((H) => {
      wi(H, G[H]);
    });
  }
  u && En(u, e, "c");
  function ne(G, H) {
    N(H) ? H.forEach((Be) => G(Be.bind(s))) : H && G(H.bind(s));
  }
  if (ne(ti, h), ne(si, y), ne(ni, E), ne(ri, R), ne(Zo, j), ne(Qo, te), ne(ci, le), ne(ai, me), ne(li, ce), ne(oi, K), ne(Ir, I), ne(ii, Se), N(Ve))
    if (Ve.length) {
      const G = e.exposed || (e.exposed = {});
      Ve.forEach((H) => {
        Object.defineProperty(G, H, {
          get: () => s[H],
          set: (Be) => s[H] = Be,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  U && e.render === He && (e.render = U), tt != null && (e.inheritAttrs = tt), ct && (e.components = ct), _t && (e.directives = _t), Se && kr(e);
}
function gi(e, t, s = He) {
  N(e) && (e = Bs(e));
  for (const n in e) {
    const r = e[n];
    let o;
    ee(r) ? "default" in r ? o = es(
      r.from || n,
      r.default,
      !0
    ) : o = es(r.from || n) : o = es(r), he(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[n] = o;
  }
}
function En(e, t, s) {
  Le(
    N(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function $r(e, t, s, n) {
  let r = n.includes(".") ? Gr(s, n) : () => s[n];
  if (oe(e)) {
    const o = t[e];
    F(o) && ts(r, o);
  } else if (F(e))
    ts(r, e.bind(s));
  else if (ee(e))
    if (N(e))
      e.forEach((o) => $r(o, t, s, n));
    else {
      const o = F(e.handler) ? e.handler.bind(s) : t[e.handler];
      F(o) && ts(r, o, e);
    }
}
function Nr(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, l = o.get(t);
  let c;
  return l ? c = l : !r.length && !s && !n ? c = t : (c = {}, r.length && r.forEach(
    (p) => cs(c, p, i, !0)
  ), cs(c, t, i)), ee(t) && o.set(t, c), c;
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
  data: An,
  props: On,
  emits: On,
  // objects
  methods: It,
  computed: It,
  // lifecycle
  beforeCreate: ge,
  created: ge,
  beforeMount: ge,
  mounted: ge,
  beforeUpdate: ge,
  updated: ge,
  beforeDestroy: ge,
  beforeUnmount: ge,
  destroyed: ge,
  unmounted: ge,
  activated: ge,
  deactivated: ge,
  errorCaptured: ge,
  serverPrefetch: ge,
  // assets
  components: It,
  directives: It,
  // watch
  watch: bi,
  // provide / inject
  provide: An,
  inject: vi
};
function An(e, t) {
  return t ? e ? function() {
    return ie(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function vi(e, t) {
  return It(Bs(e), Bs(t));
}
function Bs(e) {
  if (N(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function ge(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function It(e, t) {
  return e ? ie(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function On(e, t) {
  return e ? N(e) && N(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ie(
    /* @__PURE__ */ Object.create(null),
    Cn(e),
    Cn(t ?? {})
  ) : t;
}
function bi(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ie(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = ge(e[n], t[n]);
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
function yi(e, t) {
  return function(n, r = null) {
    F(n) || (n = ie({}, n)), r != null && !ee(r) && (r = null);
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
        return i.has(u) || (u && F(u.install) ? (i.add(u), u.install(p, ...h)) : F(u) && (i.add(u), u(p, ...h))), p;
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
      mount(u, h, y) {
        if (!c) {
          const E = p._ceVNode || S(n, r);
          return E.appContext = o, y === !0 ? y = "svg" : y === !1 && (y = void 0), e(E, u, y), c = !0, p._container = u, u.__vue_app__ = p, pn(E.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        c && (Le(
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
function wi(e, t) {
  if (pe) {
    let s = pe.provides;
    const n = pe.parent && pe.parent.provides;
    n === s && (s = pe.provides = Object.create(n)), s[e] = t;
  }
}
function es(e, t, s = !1) {
  const n = Xi();
  if (n || Et) {
    let r = Et ? Et._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return s && F(t) ? t.call(n && n.proxy) : t;
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
function Si(e, t, s, n) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, l = B(r), [c] = e.propsOptions;
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
        let y = u[h];
        if (xs(e.emitsOptions, y))
          continue;
        const E = t[y];
        if (c)
          if (V(o, y))
            E !== o[y] && (o[y] = E, p = !0);
          else {
            const R = xe(y);
            r[R] = Us(
              c,
              l,
              R,
              E,
              e,
              !1
            );
          }
        else
          E !== o[y] && (o[y] = E, p = !0);
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
  p && ze(e.attrs, "set", "");
}
function Hr(e, t, s, n) {
  const [r, o] = e.propsOptions;
  let i = !1, l;
  if (t)
    for (let c in t) {
      if (Rt(c))
        continue;
      const p = t[c];
      let u;
      r && V(r, u = xe(c)) ? !o || !o.includes(u) ? s[u] = p : (l || (l = {}))[u] = p : xs(e.emitsOptions, c) || (!(c in n) || p !== n[c]) && (n[c] = p, i = !0);
    }
  if (o) {
    const c = B(s), p = l || X;
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
      if (i.type !== Function && !i.skipFactory && F(c)) {
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
const Ci = /* @__PURE__ */ new WeakMap();
function Lr(e, t, s = !1) {
  const n = s ? Ci : t.propsCache, r = n.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, l = [];
  let c = !1;
  if (!F(e)) {
    const u = (h) => {
      c = !0;
      const [y, E] = Lr(h, t, !0);
      ie(i, y), E && l.push(...E);
    };
    !s && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !c)
    return ee(e) && n.set(e, yt), yt;
  if (N(o))
    for (let u = 0; u < o.length; u++) {
      const h = xe(o[u]);
      kn(h) && (i[h] = X);
    }
  else if (o)
    for (const u in o) {
      const h = xe(u);
      if (kn(h)) {
        const y = o[u], E = i[h] = N(y) || F(y) ? { type: y } : ie({}, y), R = E.type;
        let j = !1, te = !0;
        if (N(R))
          for (let O = 0; O < R.length; ++O) {
            const K = R[O], Q = F(K) && K.name;
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
        ] = te, (j || V(E, "default")) && l.push(h);
      }
    }
  const p = [i, l];
  return ee(e) && n.set(e, p), p;
}
function kn(e) {
  return e[0] !== "$" && !Rt(e);
}
const cn = (e) => e === "_" || e === "_ctx" || e === "$stable", un = (e) => N(e) ? e.map(qe) : [qe(e)], Ei = (e, t, s) => {
  if (t._n)
    return t;
  const n = D((...r) => un(t(...r)), s);
  return n._c = !1, n;
}, Vr = (e, t, s) => {
  const n = e._ctx;
  for (const r in e) {
    if (cn(r)) continue;
    const o = e[r];
    if (F(o))
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
}, Ai = (e, t, s) => {
  const n = e.slots = jr();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Ur(n, t, s), s && nr(n, "_", r, !0)) : Vr(t, n);
  } else t && Br(e, t);
}, Oi = (e, t, s) => {
  const { vnode: n, slots: r } = e;
  let o = !0, i = X;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? o = !1 : Ur(r, t, s) : (o = !t.$stable, Vr(t, r)), i = t;
  } else t && (Br(e, t), i = { default: 1 });
  if (o)
    for (const l in r)
      !cn(l) && i[l] == null && delete r[l];
}, Ee = Bi;
function ki(e) {
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
    nextSibling: y,
    setScopeId: E = He,
    insertStaticContent: R
  } = e, j = (a, f, d, g = null, _ = null, v = null, C = void 0, T = null, w = !!f.dynamicChildren) => {
    if (a === f)
      return;
    a && !Mt(a, f) && (g = dt(a), ke(a, _, v, !0), a = null), f.patchFlag === -2 && (w = !1, f.dynamicChildren = null);
    const { type: x, ref: M, shapeFlag: A } = f;
    switch (x) {
      case ys:
        te(a, f, d, g);
        break;
      case Ze:
        O(a, f, d, g);
        break;
      case Ps:
        a == null && K(f, d, g, C);
        break;
      case fe:
        ct(
          a,
          f,
          d,
          g,
          _,
          v,
          C,
          T,
          w
        );
        break;
      default:
        A & 1 ? U(
          a,
          f,
          d,
          g,
          _,
          v,
          C,
          T,
          w
        ) : A & 6 ? _t(
          a,
          f,
          d,
          g,
          _,
          v,
          C,
          T,
          w
        ) : (A & 64 || A & 128) && x.process(
          a,
          f,
          d,
          g,
          _,
          v,
          C,
          T,
          w,
          L
        );
    }
    M != null && _ ? Dt(M, a && a.ref, v, f || a, !f) : M == null && a && a.ref != null && Dt(a.ref, null, v, a, !0);
  }, te = (a, f, d, g) => {
    if (a == null)
      n(
        f.el = l(f.children),
        d,
        g
      );
    else {
      const _ = f.el = a.el;
      f.children !== a.children && p(_, f.children);
    }
  }, O = (a, f, d, g) => {
    a == null ? n(
      f.el = c(f.children || ""),
      d,
      g
    ) : f.el = a.el;
  }, K = (a, f, d, g) => {
    [a.el, a.anchor] = R(
      a.children,
      f,
      d,
      g,
      a.el,
      a.anchor
    );
  }, Q = ({ el: a, anchor: f }, d, g) => {
    let _;
    for (; a && a !== f; )
      _ = y(a), n(a, d, g), a = _;
    n(f, d, g);
  }, I = ({ el: a, anchor: f }) => {
    let d;
    for (; a && a !== f; )
      d = y(a), r(a), a = d;
    r(f);
  }, U = (a, f, d, g, _, v, C, T, w) => {
    f.type === "svg" ? C = "svg" : f.type === "math" && (C = "mathml"), a == null ? me(
      f,
      d,
      g,
      _,
      v,
      C,
      T,
      w
    ) : Se(
      a,
      f,
      _,
      v,
      C,
      T,
      w
    );
  }, me = (a, f, d, g, _, v, C, T) => {
    let w, x;
    const { props: M, shapeFlag: A, transition: k, dirs: $ } = a;
    if (w = a.el = i(
      a.type,
      v,
      M && M.is,
      M
    ), A & 8 ? u(w, a.children) : A & 16 && le(
      a.children,
      w,
      null,
      g,
      _,
      Ms(a, v),
      C,
      T
    ), $ && pt(a, null, g, "created"), ce(w, a, a.scopeId, C, g), M) {
      for (const J in M)
        J !== "value" && !Rt(J) && o(w, J, null, M[J], v, g);
      "value" in M && o(w, "value", null, M.value, v), (x = M.onVnodeBeforeMount) && Fe(x, g, a);
    }
    $ && pt(a, null, g, "beforeMount");
    const q = Pi(_, k);
    q && k.beforeEnter(w), n(w, f, d), ((x = M && M.onVnodeMounted) || q || $) && Ee(() => {
      x && Fe(x, g, a), q && k.enter(w), $ && pt(a, null, g, "mounted");
    }, _);
  }, ce = (a, f, d, g, _) => {
    if (d && E(a, d), g)
      for (let v = 0; v < g.length; v++)
        E(a, g[v]);
    if (_) {
      let v = _.subTree;
      if (f === v || Yr(v.type) && (v.ssContent === f || v.ssFallback === f)) {
        const C = _.vnode;
        ce(
          a,
          C,
          C.scopeId,
          C.slotScopeIds,
          _.parent
        );
      }
    }
  }, le = (a, f, d, g, _, v, C, T, w = 0) => {
    for (let x = w; x < a.length; x++) {
      const M = a[x] = T ? ot(a[x]) : qe(a[x]);
      j(
        null,
        M,
        f,
        d,
        g,
        _,
        v,
        C,
        T
      );
    }
  }, Se = (a, f, d, g, _, v, C) => {
    const T = f.el = a.el;
    let { patchFlag: w, dynamicChildren: x, dirs: M } = f;
    w |= a.patchFlag & 16;
    const A = a.props || X, k = f.props || X;
    let $;
    if (d && ht(d, !1), ($ = k.onVnodeBeforeUpdate) && Fe($, d, f, a), M && pt(f, a, d, "beforeUpdate"), d && ht(d, !0), (A.innerHTML && k.innerHTML == null || A.textContent && k.textContent == null) && u(T, ""), x ? Ve(
      a.dynamicChildren,
      x,
      T,
      d,
      g,
      Ms(f, _),
      v
    ) : C || H(
      a,
      f,
      T,
      null,
      d,
      g,
      Ms(f, _),
      v,
      !1
    ), w > 0) {
      if (w & 16)
        tt(T, A, k, d, _);
      else if (w & 2 && A.class !== k.class && o(T, "class", null, k.class, _), w & 4 && o(T, "style", A.style, k.style, _), w & 8) {
        const q = f.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const W = q[J], ye = A[W], we = k[W];
          (we !== ye || W === "value") && o(T, W, ye, we, _, d);
        }
      }
      w & 1 && a.children !== f.children && u(T, f.children);
    } else !C && x == null && tt(T, A, k, d, _);
    (($ = k.onVnodeUpdated) || M) && Ee(() => {
      $ && Fe($, d, f, a), M && pt(f, a, d, "updated");
    }, g);
  }, Ve = (a, f, d, g, _, v, C) => {
    for (let T = 0; T < f.length; T++) {
      const w = a[T], x = f[T], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        w.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (w.type === fe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Mt(w, x) || // - In the case of a component, it could contain anything.
        w.shapeFlag & 198) ? h(w.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          d
        )
      );
      j(
        w,
        x,
        M,
        null,
        g,
        _,
        v,
        C,
        !0
      );
    }
  }, tt = (a, f, d, g, _) => {
    if (f !== d) {
      if (f !== X)
        for (const v in f)
          !Rt(v) && !(v in d) && o(
            a,
            v,
            f[v],
            null,
            _,
            g
          );
      for (const v in d) {
        if (Rt(v)) continue;
        const C = d[v], T = f[v];
        C !== T && v !== "value" && o(a, v, T, C, _, g);
      }
      "value" in d && o(a, "value", f.value, d.value, _);
    }
  }, ct = (a, f, d, g, _, v, C, T, w) => {
    const x = f.el = a ? a.el : l(""), M = f.anchor = a ? a.anchor : l("");
    let { patchFlag: A, dynamicChildren: k, slotScopeIds: $ } = f;
    $ && (T = T ? T.concat($) : $), a == null ? (n(x, d, g), n(M, d, g), le(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      d,
      M,
      _,
      v,
      C,
      T,
      w
    )) : A > 0 && A & 64 && k && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren ? (Ve(
      a.dynamicChildren,
      k,
      d,
      _,
      v,
      C,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || _ && f === _.subTree) && Wr(
      a,
      f,
      !0
      /* shallow */
    )) : H(
      a,
      f,
      d,
      M,
      _,
      v,
      C,
      T,
      w
    );
  }, _t = (a, f, d, g, _, v, C, T, w) => {
    f.slotScopeIds = T, a == null ? f.shapeFlag & 512 ? _.ctx.activate(
      f,
      d,
      g,
      C,
      w
    ) : st(
      f,
      d,
      g,
      _,
      v,
      C,
      w
    ) : ut(a, f, w);
  }, st = (a, f, d, g, _, v, C) => {
    const T = a.component = Yi(
      a,
      g,
      _
    );
    if (Mr(a) && (T.ctx.renderer = L), Zi(T, !1, C), T.asyncDep) {
      if (_ && _.registerDep(T, ne, C), !a.el) {
        const w = T.subTree = S(Ze);
        O(null, w, f, d), a.placeholder = w.el;
      }
    } else
      ne(
        T,
        a,
        f,
        d,
        _,
        v,
        C
      );
  }, ut = (a, f, d) => {
    const g = f.component = a.component;
    if (Li(a, f, d))
      if (g.asyncDep && !g.asyncResolved) {
        G(g, f, d);
        return;
      } else
        g.next = f, g.update();
    else
      f.el = a.el, g.vnode = f;
  }, ne = (a, f, d, g, _, v, C) => {
    const T = () => {
      if (a.isMounted) {
        let { next: A, bu: k, u: $, parent: q, vnode: J } = a;
        {
          const Ne = Kr(a);
          if (Ne) {
            A && (A.el = J.el, G(a, A, C)), Ne.asyncDep.then(() => {
              a.isUnmounted || T();
            });
            return;
          }
        }
        let W = A, ye;
        ht(a, !1), A ? (A.el = J.el, G(a, A, C)) : A = J, k && Ss(k), (ye = A.props && A.props.onVnodeBeforeUpdate) && Fe(ye, q, A, J), ht(a, !0);
        const we = Pn(a), $e = a.subTree;
        a.subTree = we, j(
          $e,
          we,
          // parent may have changed if it's in a teleport
          h($e.el),
          // anchor may have changed if it's in a fragment
          dt($e),
          a,
          _,
          v
        ), A.el = we.el, W === null && Vi(a, we.el), $ && Ee($, _), (ye = A.props && A.props.onVnodeUpdated) && Ee(
          () => Fe(ye, q, A, J),
          _
        );
      } else {
        let A;
        const { el: k, props: $ } = f, { bm: q, m: J, parent: W, root: ye, type: we } = a, $e = Ct(f);
        ht(a, !1), q && Ss(q), !$e && (A = $ && $.onVnodeBeforeMount) && Fe(A, W, f), ht(a, !0);
        {
          ye.ce && // @ts-expect-error _def is private
          ye.ce._def.shadowRoot !== !1 && ye.ce._injectChildStyle(we);
          const Ne = a.subTree = Pn(a);
          j(
            null,
            Ne,
            d,
            g,
            a,
            _,
            v
          ), f.el = Ne.el;
        }
        if (J && Ee(J, _), !$e && (A = $ && $.onVnodeMounted)) {
          const Ne = f;
          Ee(
            () => Fe(A, W, Ne),
            _
          );
        }
        (f.shapeFlag & 256 || W && Ct(W.vnode) && W.vnode.shapeFlag & 256) && a.a && Ee(a.a, _), a.isMounted = !0, f = d = g = null;
      }
    };
    a.scope.on();
    const w = a.effect = new lr(T);
    a.scope.off();
    const x = a.update = w.run.bind(w), M = a.job = w.runIfDirty.bind(w);
    M.i = a, M.id = a.uid, w.scheduler = () => ln(M), ht(a, !0), x();
  }, G = (a, f, d) => {
    f.component = a;
    const g = a.vnode.props;
    a.vnode = f, a.next = null, Si(a, f.props, g, d), Oi(a, f.children, d), Ye(), wn(a), Xe();
  }, H = (a, f, d, g, _, v, C, T, w = !1) => {
    const x = a && a.children, M = a ? a.shapeFlag : 0, A = f.children, { patchFlag: k, shapeFlag: $ } = f;
    if (k > 0) {
      if (k & 128) {
        vt(
          x,
          A,
          d,
          g,
          _,
          v,
          C,
          T,
          w
        );
        return;
      } else if (k & 256) {
        Be(
          x,
          A,
          d,
          g,
          _,
          v,
          C,
          T,
          w
        );
        return;
      }
    }
    $ & 8 ? (M & 16 && ft(x, _, v), A !== x && u(d, A)) : M & 16 ? $ & 16 ? vt(
      x,
      A,
      d,
      g,
      _,
      v,
      C,
      T,
      w
    ) : ft(x, _, v, !0) : (M & 8 && u(d, ""), $ & 16 && le(
      A,
      d,
      g,
      _,
      v,
      C,
      T,
      w
    ));
  }, Be = (a, f, d, g, _, v, C, T, w) => {
    a = a || yt, f = f || yt;
    const x = a.length, M = f.length, A = Math.min(x, M);
    let k;
    for (k = 0; k < A; k++) {
      const $ = f[k] = w ? ot(f[k]) : qe(f[k]);
      j(
        a[k],
        $,
        d,
        null,
        _,
        v,
        C,
        T,
        w
      );
    }
    x > M ? ft(
      a,
      _,
      v,
      !0,
      !1,
      A
    ) : le(
      f,
      d,
      g,
      _,
      v,
      C,
      T,
      w,
      A
    );
  }, vt = (a, f, d, g, _, v, C, T, w) => {
    let x = 0;
    const M = f.length;
    let A = a.length - 1, k = M - 1;
    for (; x <= A && x <= k; ) {
      const $ = a[x], q = f[x] = w ? ot(f[x]) : qe(f[x]);
      if (Mt($, q))
        j(
          $,
          q,
          d,
          null,
          _,
          v,
          C,
          T,
          w
        );
      else
        break;
      x++;
    }
    for (; x <= A && x <= k; ) {
      const $ = a[A], q = f[k] = w ? ot(f[k]) : qe(f[k]);
      if (Mt($, q))
        j(
          $,
          q,
          d,
          null,
          _,
          v,
          C,
          T,
          w
        );
      else
        break;
      A--, k--;
    }
    if (x > A) {
      if (x <= k) {
        const $ = k + 1, q = $ < M ? f[$].el : g;
        for (; x <= k; )
          j(
            null,
            f[x] = w ? ot(f[x]) : qe(f[x]),
            d,
            q,
            _,
            v,
            C,
            T,
            w
          ), x++;
      }
    } else if (x > k)
      for (; x <= A; )
        ke(a[x], _, v, !0), x++;
    else {
      const $ = x, q = x, J = /* @__PURE__ */ new Map();
      for (x = q; x <= k; x++) {
        const Ce = f[x] = w ? ot(f[x]) : qe(f[x]);
        Ce.key != null && J.set(Ce.key, x);
      }
      let W, ye = 0;
      const we = k - q + 1;
      let $e = !1, Ne = 0;
      const Ot = new Array(we);
      for (x = 0; x < we; x++) Ot[x] = 0;
      for (x = $; x <= A; x++) {
        const Ce = a[x];
        if (ye >= we) {
          ke(Ce, _, v, !0);
          continue;
        }
        let De;
        if (Ce.key != null)
          De = J.get(Ce.key);
        else
          for (W = q; W <= k; W++)
            if (Ot[W - q] === 0 && Mt(Ce, f[W])) {
              De = W;
              break;
            }
        De === void 0 ? ke(Ce, _, v, !0) : (Ot[De - q] = x + 1, De >= Ne ? Ne = De : $e = !0, j(
          Ce,
          f[De],
          d,
          null,
          _,
          v,
          C,
          T,
          w
        ), ye++);
      }
      const mn = $e ? Ii(Ot) : yt;
      for (W = mn.length - 1, x = we - 1; x >= 0; x--) {
        const Ce = q + x, De = f[Ce], gn = f[Ce + 1], _n = Ce + 1 < M ? (
          // #13559, fallback to el placeholder for unresolved async component
          gn.el || gn.placeholder
        ) : g;
        Ot[x] === 0 ? j(
          null,
          De,
          d,
          _n,
          _,
          v,
          C,
          T,
          w
        ) : $e && (W < 0 || x !== mn[W] ? Ue(De, d, _n, 2) : W--);
      }
    }
  }, Ue = (a, f, d, g, _ = null) => {
    const { el: v, type: C, transition: T, children: w, shapeFlag: x } = a;
    if (x & 6) {
      Ue(a.component.subTree, f, d, g);
      return;
    }
    if (x & 128) {
      a.suspense.move(f, d, g);
      return;
    }
    if (x & 64) {
      C.move(a, f, d, L);
      return;
    }
    if (C === fe) {
      n(v, f, d);
      for (let A = 0; A < w.length; A++)
        Ue(w[A], f, d, g);
      n(a.anchor, f, d);
      return;
    }
    if (C === Ps) {
      Q(a, f, d);
      return;
    }
    if (g !== 2 && x & 1 && T)
      if (g === 0)
        T.beforeEnter(v), n(v, f, d), Ee(() => T.enter(v), _);
      else {
        const { leave: A, delayLeave: k, afterLeave: $ } = T, q = () => {
          a.ctx.isUnmounted ? r(v) : n(v, f, d);
        }, J = () => {
          v._isLeaving && v[Xo](
            !0
            /* cancelled */
          ), A(v, () => {
            q(), $ && $();
          });
        };
        k ? k(v, q, J) : J();
      }
    else
      n(v, f, d);
  }, ke = (a, f, d, g = !1, _ = !1) => {
    const {
      type: v,
      props: C,
      ref: T,
      children: w,
      dynamicChildren: x,
      shapeFlag: M,
      patchFlag: A,
      dirs: k,
      cacheIndex: $
    } = a;
    if (A === -2 && (_ = !1), T != null && (Ye(), Dt(T, null, d, a, !0), Xe()), $ != null && (f.renderCache[$] = void 0), M & 256) {
      f.ctx.deactivate(a);
      return;
    }
    const q = M & 1 && k, J = !Ct(a);
    let W;
    if (J && (W = C && C.onVnodeBeforeUnmount) && Fe(W, f, a), M & 6)
      Gt(a.component, d, g);
    else {
      if (M & 128) {
        a.suspense.unmount(d, g);
        return;
      }
      q && pt(a, null, f, "beforeUnmount"), M & 64 ? a.type.remove(
        a,
        f,
        d,
        L,
        g
      ) : x && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !x.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== fe || A > 0 && A & 64) ? ft(
        x,
        f,
        d,
        !1,
        !0
      ) : (v === fe && A & 384 || !_ && M & 16) && ft(w, f, d), g && zt(a);
    }
    (J && (W = C && C.onVnodeUnmounted) || q) && Ee(() => {
      W && Fe(W, f, a), q && pt(a, null, f, "unmounted");
    }, d);
  }, zt = (a) => {
    const { type: f, el: d, anchor: g, transition: _ } = a;
    if (f === fe) {
      ws(d, g);
      return;
    }
    if (f === Ps) {
      I(a);
      return;
    }
    const v = () => {
      r(d), _ && !_.persisted && _.afterLeave && _.afterLeave();
    };
    if (a.shapeFlag & 1 && _ && !_.persisted) {
      const { leave: C, delayLeave: T } = _, w = () => C(d, v);
      T ? T(a.el, v, w) : w();
    } else
      v();
  }, ws = (a, f) => {
    let d;
    for (; a !== f; )
      d = y(a), r(a), a = d;
    r(f);
  }, Gt = (a, f, d) => {
    const { bum: g, scope: _, job: v, subTree: C, um: T, m: w, a: x } = a;
    Mn(w), Mn(x), g && Ss(g), _.stop(), v && (v.flags |= 8, ke(C, a, f, d)), T && Ee(T, f), Ee(() => {
      a.isUnmounted = !0;
    }, f);
  }, ft = (a, f, d, g = !1, _ = !1, v = 0) => {
    for (let C = v; C < a.length; C++)
      ke(a[C], f, d, g, _);
  }, dt = (a) => {
    if (a.shapeFlag & 6)
      return dt(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const f = y(a.anchor || a.el), d = f && f[Jo];
    return d ? y(d) : f;
  };
  let P = !1;
  const m = (a, f, d) => {
    a == null ? f._vnode && ke(f._vnode, null, null, !0) : j(
      f._vnode || null,
      a,
      f,
      null,
      null,
      null,
      d
    ), f._vnode = a, P || (P = !0, wn(), Cr(), P = !1);
  }, L = {
    p: j,
    um: ke,
    m: Ue,
    r: zt,
    mt: st,
    mc: le,
    pc: H,
    pbc: Ve,
    n: dt,
    o: e
  };
  return {
    render: m,
    hydrate: void 0,
    createApp: yi(m)
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
  if (N(n) && N(r))
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      let l = r[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[o] = ot(r[o]), l.el = i.el), !s && l.patchFlag !== -2 && Wr(i, l)), l.type === ys && // avoid cached text nodes retaining detached dom nodes
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
const Ri = Symbol.for("v-scx"), $i = () => es(Ri);
function ts(e, t, s) {
  return zr(e, t, s);
}
function zr(e, t, s = X) {
  const { immediate: n, deep: r, flush: o, once: i } = s, l = ie({}, s), c = t && n || !t && o !== "post";
  let p;
  if (Bt) {
    if (o === "sync") {
      const E = $i();
      p = E.__watcherHandles || (E.__watcherHandles = []);
    } else if (!c) {
      const E = () => {
      };
      return E.stop = He, E.resume = He, E.pause = He, E;
    }
  }
  const u = pe;
  l.call = (E, R, j) => Le(E, u, R, j);
  let h = !1;
  o === "post" ? l.scheduler = (E) => {
    Ee(E, u && u.suspense);
  } : o !== "sync" && (h = !0, l.scheduler = (E, R) => {
    R ? E() : ln(E);
  }), l.augmentJob = (E) => {
    t && (E.flags |= 4), h && (E.flags |= 2, u && (E.id = u.uid, E.i = u));
  };
  const y = Wo(e, t, l);
  return Bt && (p ? p.push(y) : c && y()), y;
}
function Ni(e, t, s) {
  const n = this.proxy, r = oe(e) ? e.includes(".") ? Gr(n, e) : () => n[e] : e.bind(n, n);
  let o;
  F(t) ? o = t : (o = t.handler, s = t);
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
const Di = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${xe(t)}Modifiers`] || e[`${Pe(t)}Modifiers`];
function Fi(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || X;
  let r = s;
  const o = t.startsWith("update:"), i = o && Di(n, t.slice(7));
  i && (i.trim && (r = s.map((u) => oe(u) ? u.trim() : u)), i.number && (r = s.map(co)));
  let l, c = n[l = Ts(t)] || // also try camelCase event handler (#2249)
  n[l = Ts(xe(t))];
  !c && o && (c = n[l = Ts(Pe(t))]), c && Le(
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
    e.emitted[l] = !0, Le(
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
  if (!F(e)) {
    const c = (p) => {
      const u = Jr(p, t, !0);
      u && (l = !0, ie(i, u));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (ee(e) && n.set(e, null), null) : (N(o) ? o.forEach((c) => i[c] = null) : ie(i, o), ee(e) && n.set(e, i), i);
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
    data: y,
    setupState: E,
    ctx: R,
    inheritAttrs: j
  } = e, te = ls(e);
  let O, K;
  try {
    if (s.shapeFlag & 4) {
      const I = r || n, U = I;
      O = qe(
        p.call(
          U,
          I,
          u,
          h,
          E,
          y,
          R
        )
      ), K = l;
    } else {
      const I = t;
      O = qe(
        I.length > 1 ? I(
          h,
          { attrs: l, slots: i, emit: c }
        ) : I(
          h,
          null
        )
      ), K = t.props ? l : qi(l);
    }
  } catch (I) {
    jt.length = 0, vs(I, e, 1), O = S(Ze);
  }
  let Q = O;
  if (K && j !== !1) {
    const I = Object.keys(K), { shapeFlag: U } = Q;
    I.length && U & 7 && (o && I.some(Gs) && (K = Hi(
      K,
      o
    )), Q = At(Q, K, !1, !0));
  }
  return s.dirs && (Q = At(Q, null, !1, !0), Q.dirs = Q.dirs ? Q.dirs.concat(s.dirs) : s.dirs), s.transition && an(Q, s.transition), O = Q, ls(te), O;
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
        const y = u[h];
        if (i[y] !== n[y] && !xs(p, y))
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
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : Go(e);
}
const fe = Symbol.for("v-fgt"), ys = Symbol.for("v-txt"), Ze = Symbol.for("v-cmt"), Ps = Symbol.for("v-stc"), jt = [];
let Oe = null;
function z(e = !1) {
  jt.push(Oe = e ? null : []);
}
function Ui() {
  jt.pop(), Oe = jt[jt.length - 1] || null;
}
let Vt = 1;
function Rn(e, t = !1) {
  Vt += e, e < 0 && Oe && t && (Oe.hasOnce = !0);
}
function Xr(e) {
  return e.dynamicChildren = Vt > 0 ? Oe || yt : null, Ui(), Vt > 0 && Oe && Oe.push(e), e;
}
function Me(e, t, s, n, r, o) {
  return Xr(
    b(
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
function _e(e, t, s, n, r) {
  return Xr(
    S(
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
}) => (typeof e == "number" && (e = "" + e), e != null ? oe(e) || he(e) || F(e) ? { i: be, r: e, k: t, f: !!s } : e : null);
function b(e, t = null, s = null, n = 0, r = null, o = e === fe ? 0 : 1, i = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Zr(t),
    ref: t && ss(t),
    scopeId: Ar,
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
    ctx: be
  };
  return l ? (dn(c, s), o & 128 && e.normalize(c)) : s && (c.shapeFlag |= oe(s) ? 8 : 16), Vt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  Oe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Oe.push(c), c;
}
const S = Wi;
function Wi(e, t = null, s = null, n = 0, r = null, o = !1) {
  if ((!e || e === fi) && (e = Ze), fn(e)) {
    const l = At(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && dn(l, s), Vt > 0 && !o && Oe && (l.shapeFlag & 6 ? Oe[Oe.indexOf(e)] = l : Oe.push(l)), l.patchFlag = -2, l;
  }
  if (nl(e) && (e = e.__vccOpts), t) {
    t = Ki(t);
    let { class: l, style: c } = t;
    l && !oe(l) && (t.class = Ut(l)), ee(c) && (on(c) && !N(c) && (c = ie({}, c)), t.style = Xs(c));
  }
  const i = oe(e) ? 1 : Yr(e) ? 128 : Yo(e) ? 64 : ee(e) ? 4 : F(e) ? 2 : 0;
  return b(
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
function At(e, t, s = !1, n = !1) {
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
      s && o ? N(o) ? o.concat(ss(t)) : [o, ss(t)] : ss(t)
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
    patchFlag: t && e.type !== fe ? i === -1 ? 16 : i | 16 : i,
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
    ssContent: e.ssContent && At(e.ssContent),
    ssFallback: e.ssFallback && At(e.ssFallback),
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
  return S(ys, null, e, t);
}
function Ge(e = "", t = !1) {
  return t ? (z(), _e(Ze, null, e)) : S(Ze, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? S(Ze) : N(e) ? S(
    fe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : fn(e) ? ot(e) : S(ys, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : At(e);
}
function dn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (N(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), dn(e, r()), r._c && (r._d = !0));
      return;
    } else {
      s = 32;
      const r = t._;
      !r && !qr(t) ? t._ctx = be : r === 3 && be && (be.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else F(t) ? (t = { default: t, _ctx: be }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [re(t)]) : s = 8);
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
        i && o !== i && !(N(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = n[r]);
  }
  return t;
}
function Fe(e, t, s, n = null) {
  Le(e, t, 7, [
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
    propsDefaults: X,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: X,
    data: X,
    props: X,
    attrs: X,
    slots: X,
    refs: X,
    setupState: X,
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
let pe = null;
const Xi = () => pe || be;
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
    (s) => pe = s
  ), Ws = t(
    "__VUE_SSR_SETTERS__",
    (s) => Bt = s
  );
}
const Kt = (e) => {
  const t = pe;
  return us(e), e.scope.on(), () => {
    e.scope.off(), us(t);
  };
}, $n = () => {
  pe && pe.scope.off(), us(null);
};
function Qr(e) {
  return e.vnode.shapeFlag & 4;
}
let Bt = !1;
function Zi(e, t = !1, s = !1) {
  t && Ws(t);
  const { props: n, children: r } = e.vnode, o = Qr(e);
  Ti(e, n, o, t), Ai(e, r, s || t);
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
    if (Xe(), o(), (l || e.sp) && !Ct(e) && kr(e), l) {
      if (i.then($n, $n), t)
        return i.then((c) => {
          Nn(e, c);
        }).catch((c) => {
          vs(c, e, 0);
        });
      e.asyncDep = i;
    } else
      Nn(e, i);
  } else
    eo(e);
}
function Nn(e, t, s) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ee(t) && (e.setupState = yr(t)), eo(e);
}
function eo(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || He);
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
    return de(e, "get", ""), e[t];
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
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(yr(jo(e.exposed)), {
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
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function nl(e) {
  return F(e) && "__vccOpts" in e;
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
const to = Ks ? (e) => Ks.createHTML(e) : (e) => e, ol = "http://www.w3.org/2000/svg", il = "http://www.w3.org/1998/Math/MathML", Ke = typeof document < "u" ? document : null, Fn = Ke && /* @__PURE__ */ Ke.createElement("template"), ll = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const r = t === "svg" ? Ke.createElementNS(ol, e) : t === "mathml" ? Ke.createElementNS(il, e) : s ? Ke.createElement(e, { is: s }) : Ke.createElement(e);
    return e === "select" && n && n.multiple != null && r.setAttribute("multiple", n.multiple), r;
  },
  createText: (e) => Ke.createTextNode(e),
  createComment: (e) => Ke.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ke.querySelector(e),
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
  if (N(s))
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
  let n = xe(t);
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
      const p = o[t] = yl(
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
let Rs = 0;
const bl = /* @__PURE__ */ Promise.resolve(), xl = () => Rs || (bl.then(() => Rs = 0), Rs = Date.now());
function yl(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Le(
      wl(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = xl(), s;
}
function wl(e, t) {
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
const Kn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Tl = (e, t, s, n, r, o) => {
  const i = r === "svg";
  t === "class" ? cl(e, n, i) : t === "style" ? pl(e, s, n) : fs(t) ? Gs(t) || _l(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Sl(e, t, n, i)) ? (Bn(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Vn(e, t, n, i, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !oe(n)) ? Bn(e, xe(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Vn(e, t, n, i));
};
function Sl(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Kn(t) && F(s));
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
function Cl(e, t, s) {
  let n = /* @__PURE__ */ Or(e, t);
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
      if (o && !N(o))
        for (const c in o) {
          const p = o[c];
          (p === Number || p && p.type === Number) && (c in this._props && (this._props[c] = vn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[xe(c)] = !0);
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
    const { props: s } = t, n = N(s) ? s : Object.keys(s || {});
    for (const r of Object.keys(this))
      r[0] !== "_" && n.includes(r) && this._setProp(r, this[r]);
    for (const r of n.map(xe))
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
    const r = xe(t);
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
    const s = S(this._def, ie(t, this._props));
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
const Al = ["ctrl", "shift", "alt", "meta"], Ol = {
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
  exact: (e, t) => Al.some((s) => e[`${s}Key`] && !t.includes(s))
}, so = (e, t) => {
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((r, ...o) => {
    for (let i = 0; i < t.length; i++) {
      const l = Ol[t[i]];
      if (l && l(r, t)) return;
    }
    return e(r, ...o);
  }));
}, kl = /* @__PURE__ */ ie({ patchProp: Tl }, ll);
let Gn;
function no() {
  return Gn || (Gn = ki(kl));
}
const Ml = ((...e) => {
  no().render(...e);
}), Jn = ((...e) => {
  const t = no().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const r = Il(n);
    if (!r) return;
    const o = t._component;
    !F(o) && !o.render && !o.template && (o.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
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
function Rl(e) {
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
const $l = {}, Nl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $l
}, Symbol.toStringTag, { value: "Module" })), $s = /* @__PURE__ */ Rl(Nl);
var Ns, Yn;
function Dl() {
  if (Yn) return Ns;
  Yn = 1;
  let { existsSync: e, readFileSync: t } = $s, { dirname: s, join: n } = $s, { SourceMapConsumer: r, SourceMapGenerator: o } = $s;
  function i(c) {
    return Buffer ? Buffer.from(c, "base64").toString() : window.atob(c);
  }
  class l {
    constructor(p, u) {
      if (u.map === !1) return;
      this.loadAnnotation(p), this.inline = this.startWith(this.annotation, "data:");
      let h = u.map ? u.map.prev : void 0, y = this.loadMap(u.from, h);
      !this.mapFile && u.from && (this.mapFile = u.from), this.mapFile && (this.root = s(this.mapFile)), y && (this.text = y);
    }
    consumer() {
      return this.consumerCache || (this.consumerCache = new r(this.text)), this.consumerCache;
    }
    decodeInline(p) {
      let u = /^data:application\/json;charset=utf-?8;base64,/, h = /^data:application\/json;base64,/, y = /^data:application\/json;charset=utf-?8,/, E = /^data:application\/json,/, R = p.match(y) || p.match(E);
      if (R)
        return decodeURIComponent(p.substr(R[0].length));
      let j = p.match(u) || p.match(h);
      if (j)
        return i(p.substr(j[0].length));
      let te = p.match(/data:application\/json;([^,]+),/)[1];
      throw new Error("Unsupported source map encoding " + te);
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
      let h = p.lastIndexOf(u.pop()), y = p.indexOf("*/", h);
      h > -1 && y > -1 && (this.annotation = this.getAnnotationURL(p.substring(h, y)));
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
            let y = this.loadFile(h);
            if (!y)
              throw new Error(
                "Unable to load previous source map: " + h.toString()
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
  return Ns = l, l.default = l, Ns;
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
      const r = Ae("ha-icon"), o = Ae("ha-card");
      return z(), Me("div", Fl, [
        S(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: D(() => [
            b("div", jl, [
              n[0] || (n[0] = b("div", { class: "text-2xl" }, "Total tasks", -1)),
              b("div", ql, Z(t.totalTasks), 1)
            ]),
            b("div", Hl, [
              S(r, {
                class: "text-blue-500",
                ".icon": "mdi:calendar-blank"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        S(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: D(() => [
            b("div", Ll, [
              n[1] || (n[1] = b("div", { class: "text-2xl" }, "Upcoming Tasks", -1)),
              b("div", Vl, Z(t.upcomingTasks), 1)
            ]),
            b("div", Bl, [
              S(r, {
                class: "text-yellow-500",
                ".icon": "mdi:bell"
              }, null, 32)
            ])
          ]),
          _: 1
        }),
        S(o, { class: "flex flex-1 min-w-0 items-center justify-between p-6" }, {
          default: D(() => [
            b("div", Ul, [
              n[2] || (n[2] = b("div", { class: "text-2xl" }, "Overdue Tasks", -1)),
              b("div", Wl, Z(t.overdueTasks), 1)
            ]),
            b("div", Kl, [
              S(r, {
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
}), Zl = ".header[data-v-0681a64f]{background-color:var(--app-header-background-color);color:var(--app-header-text-color, white);border-bottom:var(--app-header-border-bottom, none)}.toolbar[data-v-0681a64f]{height:var(--header-height);display:flex;align-items:center;font-size:20px;padding:0 16px;font-weight:400;box-sizing:border-box}.main-title[data-v-0681a64f]{margin:0 0 0 24px;line-height:20px;flex-grow:1}.version[data-v-0681a64f]{font-size:14px;font-weight:500;color:rgba(var(--rgb-text-primary-color),.9)}", ro = (e, t) => {
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
      const r = Ae("ha-menu-button");
      return z(), Me("div", Ql, [
        b("div", ea, [
          S(r, {
            ".hass": t.hass,
            ".narrow": t.narrow
          }, null, 40, [".hass", ".narrow"]),
          n[0] || (n[0] = b("div", { class: "main-title" }, " Device Maintenance Manager ", -1)),
          n[1] || (n[1] = b("div", { class: "version" }, " 1.0.0 ", -1))
        ])
      ]);
    };
  }
}, sa = /* @__PURE__ */ ro(ta, [["styles", [Zl]], ["__scopeId", "data-v-0681a64f"]]), na = { class: "flex items-start justify-between mb-2" }, ra = { class: "text-2xl font-medium" }, oa = { class: "flex items-center gap-2 mr-5" }, ia = { class: "flex flex-col relative" }, la = { class: "flex flex-col items-start w-full" }, aa = { class: "flex items-center gap-2 justify-start w-full" }, ca = { class: "flex items-center gap-2 justify-start w-full" }, ua = { class: "text-xl font-light mb-6" }, fa = { class: "bg-blue-50 border-2 border-blue-300 rounded-2xl p-4 text-lg" }, da = { class: "mb-1" }, pa = { class: "text-blue-600 ml-1" }, ha = { class: "text-blue-600 ml-1" }, ma = {
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
    const s = e, n = se(!1), r = {
      below: "<",
      equal: "=",
      above: ">"
    }, o = t, i = () => {
      n.value = !1, o("deleteTask");
    }, l = () => {
      o("completeTask");
    }, c = () => {
      n.value = !1, o("editTask");
    }, p = () => {
      n.value = !n.value;
    };
    return (u, h) => {
      const y = Ae("ha-icon"), E = Ae("ha-button"), R = Ae("ha-card");
      return z(), _e(R, {
        class: Ut(["w-full", "p-6", { "border-red-700": s.overdue }])
      }, {
        default: D(() => [
          b("div", na, [
            b("div", ra, Z(s.name), 1),
            b("div", oa, [
              S(E, {
                onClick: l,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: D(() => [
                  S(y, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  h[0] || (h[0] = re(" Complete ", -1))
                ]),
                _: 1
              }),
              b("div", ia, [
                S(E, {
                  onClick: so(p, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: D(() => [
                    S(y, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (z(), _e(R, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: D(() => [
                    b("div", la, [
                      S(E, {
                        onClick: c,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          b("div", aa, [
                            S(y, { ".icon": "mdi:pencil" }, null, 32),
                            h[1] || (h[1] = re(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      S(E, {
                        onClick: i,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          b("div", ca, [
                            S(y, { ".icon": "mdi:delete" }, null, 32),
                            h[2] || (h[2] = re(" Delete ", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })) : Ge("", !0)
              ])
            ])
          ]),
          b("div", ua, Z(s.location), 1),
          b("div", fa, [
            b("div", da, [
              h[3] || (h[3] = b("span", { class: "text-blue-600 font-semibold" }, "Condition:", -1)),
              b("span", pa, Z(s.sensor) + " " + Z(r[s.operator] ?? "=") + " " + Z(Array.isArray(s.value) ? s.value.join(" or ") : s.value), 1)
            ]),
            b("div", null, [
              h[4] || (h[4] = b("span", { class: "text-blue-600 font-semibold" }, "Action:", -1)),
              b("span", ha, Z(s.description != "No description" ? s.description : "-"), 1)
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
}, _a = { class: "flex justify-center w-full max-w-3xl" }, Pt = {
  __name: "Dialog",
  props: {
    show: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return (t, s) => e.show ? (z(), Me("div", ga, [
      b("div", _a, [
        pi(t.$slots, "default")
      ])
    ])) : Ge("", !0);
  }
}, va = { class: "flex items-start justify-between mb-2" }, ba = { class: "text-2xl font-medium" }, xa = { class: "flex items-center gap-2 mr-5" }, ya = { class: "flex flex-col relative" }, wa = { class: "flex flex-col items-start w-full" }, Ta = { class: "flex items-center gap-2 justify-start w-full" }, Sa = { class: "flex items-center gap-2 justify-start w-full" }, Ca = { class: "text-xl font-light mb-6" }, Ea = { class: "text-lg" }, Aa = {
  key: 0,
  class: "mb-2"
}, Oa = { class: "ml-2 mb" }, ka = { class: "mb-2" }, Ma = { class: "ml-2" }, Pa = { class: "mb-2" }, Ia = { class: "ml-2" }, Ra = { class: "ml-2" }, $a = {
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
    const s = e, n = se(!1), r = t, o = () => {
      n.value = !1, r("deleteTask");
    }, i = () => {
      r("completeTask");
    }, l = () => {
      n.value = !1, r("editTask");
    }, c = () => {
      n.value = !n.value;
    };
    return (p, u) => {
      const h = Ae("ha-icon"), y = Ae("ha-button"), E = Ae("ha-card");
      return z(), _e(E, {
        class: Ut(["w-full", "p-6", {
          "border-red-500": s.overdue,
          "border-yellow-500": s.warning && !s.overdue
        }])
      }, {
        default: D(() => [
          b("div", va, [
            b("div", ba, Z(s.name), 1),
            b("div", xa, [
              S(y, {
                onClick: i,
                appearance: "accent",
                variant: "success",
                class: "flex items-center gap-2"
              }, {
                default: D(() => [
                  S(h, { ".icon": "mdi:check-circle-outline" }, null, 32),
                  u[0] || (u[0] = re(" Complete ", -1))
                ]),
                _: 1
              }),
              b("div", ya, [
                S(y, {
                  onClick: so(c, ["stop"]),
                  variant: "neutral",
                  appearance: "plain"
                }, {
                  default: D(() => [
                    S(h, {
                      ".icon": "mdi:dots-vertical",
                      variant: "neutral",
                      appearance: "accent"
                    }, null, 32)
                  ]),
                  _: 1
                }),
                n.value ? (z(), _e(E, {
                  key: 0,
                  class: "p-1 absolute top-full"
                }, {
                  default: D(() => [
                    b("div", wa, [
                      S(y, {
                        onClick: l,
                        variant: "neutral",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          b("div", Ta, [
                            S(h, { ".icon": "mdi:pencil" }, null, 32),
                            u[1] || (u[1] = re(" Edit ", -1))
                          ])
                        ]),
                        _: 1
                      }),
                      S(y, {
                        onClick: o,
                        variant: "danger",
                        appearance: "plain",
                        class: "w-full",
                        style: { "justify-content": "flex-start" }
                      }, {
                        default: D(() => [
                          b("div", Sa, [
                            S(h, { ".icon": "mdi:delete" }, null, 32),
                            u[2] || (u[2] = re(" Delete ", -1))
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                })) : Ge("", !0)
              ])
            ])
          ]),
          b("div", Ca, Z(s.location), 1),
          b("div", Ea, [
            s.description != "No description" ? (z(), Me("div", Aa, [
              u[3] || (u[3] = b("span", { class: "font-semibold" }, "Description:", -1)),
              b("span", Oa, Z(s.description), 1)
            ])) : Ge("", !0),
            b("div", ka, [
              S(h, { ".icon": "mdi:calendar" }, null, 32),
              b("span", Ma, "Every " + Z(s.value) + " " + Z(s.seasonal_type == "runtime" ? "hours" : s.seasonal_type), 1)
            ]),
            b("div", Pa, [
              S(h, { ".icon": "mdi:clock-time-four-outline" }, null, 32),
              b("span", Ia, "Next due: " + Z(s.seasonal_type == "runtime" ? Math.ceil(Number(s.next_due) / 3600) <= 1 ? Math.ceil(Number(s.next_due) / 60) + " minutes remaining" : Math.ceil(Number(s.next_due) / 3600) + " hours remaining" : s.next_due), 1)
            ]),
            b("div", null, [
              S(h, { ".icon": "mdi:check-circle-outline" }, null, 32),
              b("span", Ra, "Last completed: " + Z(s.last_completed != "" ? s.last_completed : "Not completed before..."), 1)
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
function Da(e, t, s, n) {
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
function Fa(e, t, s) {
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
function ja() {
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
const qa = { class: "flex flex-col gap-10 justify-center m-6" }, Ha = { class: "flex items-center justify-between pb-5" }, La = { class: "flex-shrink-0" }, Va = { class: "flex flex-col" }, Ba = { class: "flex gap-5 text-2xl items-center" }, Ua = {
  key: 0,
  class: "text-2xl font-medium"
}, Wa = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, Ka = ["onClick"], za = { class: "truncate" }, Ga = { class: "flex flex-col mb-5" }, Ja = { class: "flex gap-5 text-2xl items-center" }, Ya = { class: "flex flex-row w-full mt-4 gap-3" }, Xa = { class: "flex flex-col mb-5" }, Za = { class: "flex gap-5 text-2xl items-center" }, Qa = { class: "flex flex-row w-full mt-4 gap-3" }, ec = { class: "flex flex-row w-full mt-4 gap-3" }, tc = { class: "flex flex-row w-full mt-4 gap-3" }, sc = { class: "flex flex-col" }, nc = { class: "flex gap-3 text-2xl items-center mb-2" }, rc = { class: "text-2xl font-medium" }, oc = { class: "text-lg font-medium mb-5" }, ic = { class: "w-full table-fixed border-spacing-y-3 text-[1.2em]" }, lc = { class: "" }, ac = { class: "break-words" }, cc = /* @__PURE__ */ Or({
  __name: "App",
  props: {
    hass: { type: Object },
    narrow: { type: Boolean }
  },
  setup(e) {
    const t = e, s = se({}), n = se({}), r = se([]), o = se([]), i = se(), l = se([]), c = se(!1), p = se(!1), u = se(!1), h = se(!1), y = se("null"), E = se("null"), R = se(!1), j = se(!1), te = se(!1), O = /* @__PURE__ */ new Set(["Task Name"]), K = Je(() => r.value.length), Q = Je(() => r.value.filter((P) => P.notified).length), I = Je(() => r.value.filter((P) => P.warning && !P.notified).length), U = se("interval"), me = se(""), ce = se("interval"), le = se(null), Se = se(null), { schemaFilter: Ve } = ja(), { schemaConditional: tt } = Da(le, Se, j, R), { schemaInterval: ct } = Fa(le, Se, te), { schemaNotes: _t } = Na();
    ts(
      () => t.hass,
      async (P) => {
        if (P)
          try {
            const m = await Qt(P), L = await Xn(P);
            l.value = L, r.value = st(m), o.value = r.value, ut();
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
        const L = new Date(m.next_due), ae = /* @__PURE__ */ new Date(), a = (L.getTime() - ae.getTime()) / (1e3 * 60 * 60 * 24);
        return { ...m, warning: a <= 0.5 };
      } else
        return { ...m, warning: !1 };
    }).sort((m, L) => L.notified !== m.notified ? L.notified - m.notified : L.warning !== m.warning ? Number(L.warning) - Number(m.warning) : 0), ut = () => {
      i.value == "areas" && dt();
    }, ne = () => {
      c.value = !1, h.value = !1, R.value = !1, j.value = !1, te.value = !1, le.value = [], Se.value = {}, s.value = {};
    }, G = async () => {
      s.value.Type = ce.value, s.value.Control = Se.value?.control, s.value["Condition Duration"] === !0 ? (O.add("Duration"), O.add("Duration Type")) : (O.delete("Duration"), O.delete("Duration Type"), s.value.Duration = 0, s.value["Duration Type"] = ""), s.value["Seasonal Task"] === !0 ? (O.add("Seasonal Interval"), O.add("Seasonal Type")) : (O.delete("Seasonal Interval"), O.delete("Seasonal Type"), s.value["Seasonal Interval"] = 0, s.value["Seasonal Type"] = ""), s.value.Type == "conditional" || s.value["Interval Type"] == "runtime" ? (O.add("Sensor"), Se.value?.control == "number" ? O.add("Operator") : O.delete("Operator"), O.add("Value")) : (O.delete("Sensor"), O.delete("Operator"), O.delete("Value"), s.value.Sensor = "", s.value.Operator = "", s.value.Value = ""), s.value.Type == "interval" ? (O.add("Interval Type"), O.add("Repeat Every")) : (O.delete("Interval Type"), O.delete("Repeat Every"), s.value["Interval Type"] = "", s.value["Repeat Every"] = 0);
      for (const P of O)
        if (s.value[P] === void 0 || s.value[P] === null || s.value[P] === "") {
          alert(`Field '${P}' is required.`);
          return;
        }
      try {
        h.value ? await Xl(t.hass, s.value) : await Gl(t.hass, s.value), r.value = await Qt(t.hass), r.value = st(r.value), o.value = r.value, ut(), ne();
      } catch (P) {
        console.error("Failed to create maintenance task:", P);
      }
    }, H = async (P) => {
      if (P.detail.value.Sensor != "" && P.detail.value.Sensor != s.value.Sensor)
        try {
          const m = await Zn(t.hass, P.detail.value.Sensor);
          le.value = m, Se.value = le.value.length > 1 ? {} : le.value[0] ?? null, P.detail.value.Operator = "", P.detail.value.Value = "", P.detail.value.Attribute = "";
        } catch (m) {
          console.error("Failed to get attributes:", m);
        }
      if (u.value) {
        n.value = P.detail.value;
        return;
      }
      P.detail.value.Attribute != s.value.Attribute && (P.detail.value.Value = "", P.detail.value.Operator = ""), s.value = P.detail.value, R.value = s.value["Seasonal Task"] ?? !1, j.value = s.value["Condition Duration"] ?? !1, te.value = s.value["Interval Type"] == "runtime", s.value.Attribute && le.value.length > 1 && (Se.value = le.value?.find((m) => m.option === s.value.Attribute) ?? null);
    }, Be = async () => {
      if (t.hass)
        try {
          await Jl(t.hass, E.value), p.value = !1, E.value = "null", r.value = await Qt(t.hass), r.value = st(r.value), o.value = r.value, ut();
        } catch (P) {
          console.error("Failed to delete task: ", P);
        }
    }, vt = async () => {
      if (t.hass)
        try {
          await Yl(t.hass, y.value, n.value), u.value = !1, y.value = "null", n.value = {}, l.value = await Xn(t.hass), r.value = await Qt(t.hass), r.value = st(r.value), o.value = r.value, ut();
        } catch (P) {
          console.error("Failed to completing task: ", P);
        }
    }, Ue = (P) => {
      me.value = l.value.find((m) => m.id === P);
    }, ke = Je(
      () => [...me.value.completion_dates].reverse()
    ), zt = () => {
      ce.value = "interval", s.value = {}, s.value.Type = "interval";
    }, ws = () => {
      ce.value = "conditional", s.value = {}, s.value.Type = "conditional";
    }, Gt = async (P) => {
      h.value = !0;
      const m = r.value.find((L) => L.id === P);
      if (m.sensor != "")
        try {
          const L = await Zn(t.hass, m.sensor);
          le.value = L, Se.value = le.value?.find((ae) => ae.option === m.option) ?? L[0] ?? null;
        } catch (L) {
          console.error("Failed to get attributes:", L);
        }
      R.value = m.seasonal, j.value = m.duration_condition, te.value = m.seasonal_type == "runtime", ce.value = m.type, m.duration_type == "minutes" ? m.duration /= 60 : m.duration_type == "hours" && (m.duration /= 3600), s.value = {
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
      switch (i.value = P.detail.value["Select Filter"], i.value) {
        case "areas":
          dt();
          break;
        default:
          o.value = r.value;
          break;
      }
    }, dt = () => {
      const P = {};
      r.value.forEach((m) => {
        P[m.location] || (P[m.location] = []), P[m.location].push(m);
      }), o.value = Object.entries(P).flatMap(([m, L]) => L);
    };
    return (P, m) => {
      const L = Ae("ha-icon"), ae = Ae("ha-button"), a = Ae("ha-form"), f = Ae("ha-card");
      return z(), Me(fe, null, [
        t.hass ? (z(), _e(sa, {
          key: 0,
          hass: t.hass,
          narrow: t.narrow
        }, null, 8, ["hass", "narrow"])) : Ge("", !0),
        b("div", qa, [
          S(zl, {
            totalTasks: K.value,
            upcomingTasks: I.value,
            overdueTasks: Q.value
          }, null, 8, ["totalTasks", "upcomingTasks", "overdueTasks"]),
          S(f, { class: "flex flex-col p-6 gap-5" }, {
            default: D(() => [
              b("div", Ha, [
                m[8] || (m[8] = b("div", { class: "flex flex-col" }, [
                  b("div", { class: "text-2xl font-medium" }, "Maintenance Tasks"),
                  b("div", { class: "text-xl" }, "Manage scheduled and conditional maintenance for your smart devices")
                ], -1)),
                b("div", La, [
                  b("div", Va, [
                    b("div", Ba, [
                      S(ae, {
                        onClick: m[0] || (m[0] = (d) => c.value = !0)
                      }, {
                        default: D(() => [
                          S(L, {
                            class: "text-white",
                            ".icon": "mdi:plus"
                          }, null, 32),
                          m[7] || (m[7] = re(" New Task", -1))
                        ]),
                        _: 1
                      }),
                      S(a, {
                        ".hass": t.hass,
                        ".schema": nt(Ve),
                        onValueChanged: ft
                      }, null, 40, [".hass", ".schema"])
                    ])
                  ])
                ])
              ]),
              S(f, { class: "flex w-full p-1 gap-1 rounded-full" }, {
                default: D(() => [
                  S(ae, {
                    onClick: m[1] || (m[1] = (d) => U.value = "interval"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: U.value === "interval" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: D(() => [
                      S(L, {
                        variant: "neutral",
                        ".icon": "mdi:calendar-blank"
                      }, null, 32),
                      m[9] || (m[9] = re(" Interval tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  S(ae, {
                    onClick: m[2] || (m[2] = (d) => U.value = "conditional"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: U.value === "conditional" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: D(() => [
                      S(L, {
                        variant: "neutral",
                        ".icon": "mdi:triangle-wave"
                      }, null, 32),
                      m[10] || (m[10] = re(" Conditional tasks", -1))
                    ]),
                    _: 1
                  }, 8, ["appearance"]),
                  S(ae, {
                    onClick: m[3] || (m[3] = (d) => U.value = "history"),
                    class: "flex-1",
                    variant: "neutral",
                    appearance: U.value === "history" ? "accent" : "plain",
                    size: "small"
                  }, {
                    default: D(() => [
                      S(L, {
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
              K.value == 0 ? (z(), Me("div", Ua, "No tasks created yet...")) : Ge("", !0),
              U.value === "conditional" ? (z(!0), Me(fe, { key: 1 }, Zt(o.value.filter((d) => d.type == "conditional"), (d) => (z(), _e(ma, {
                key: d.id,
                id: d.id,
                name: d.name,
                location: d.location_name,
                description: d.description,
                sensor: d.sensor,
                operator: d.operator,
                value: d.value,
                overdue: d.notified,
                onDeleteTask: (g) => {
                  p.value = !0, E.value = d.id;
                },
                onCompleteTask: (g) => {
                  u.value = !0, y.value = d.id;
                },
                onEditTask: (g) => Gt(d.id)
              }, null, 8, ["id", "name", "location", "description", "sensor", "operator", "value", "overdue", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : Ge("", !0),
              U.value === "interval" ? (z(!0), Me(fe, { key: 2 }, Zt(o.value.filter((d) => d.type == "interval"), (d) => (z(), _e($a, {
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
                onDeleteTask: (g) => {
                  p.value = !0, E.value = d.id;
                },
                onCompleteTask: (g) => {
                  u.value = !0, y.value = d.id;
                },
                onEditTask: (g) => Gt(d.id)
              }, null, 8, ["id", "name", "location", "description", "value", "overdue", "next_due", "last_completed", "seasonal_type", "warning", "onDeleteTask", "onCompleteTask", "onEditTask"]))), 128)) : Ge("", !0),
              U.value === "history" ? (z(), _e(f, {
                key: 3,
                class: "w-full p-4"
              }, {
                default: D(() => [
                  b("table", Wa, [
                    m[12] || (m[12] = b("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      b("tr", null, [
                        b("th", null, "Task Name"),
                        b("th", null, "Location"),
                        b("th", null, "Date"),
                        b("th", null, "Note")
                      ])
                    ], -1)),
                    b("tbody", null, [
                      (z(!0), Me(fe, null, Zt(l.value, (d) => (z(), Me("tr", {
                        onClick: (g) => Ue(d.id),
                        class: "cursor-pointer",
                        key: d.id
                      }, [
                        b("td", null, Z(d.name), 1),
                        b("td", null, Z(d.location_name), 1),
                        b("td", null, Z(d.completion_dates.at(-1).date.replace("T", " ")), 1),
                        b("td", za, Z(d.completion_dates.at(-1).note), 1)
                      ], 8, Ka))), 128))
                    ])
                  ])
                ]),
                _: 1
              })) : Ge("", !0)
            ]),
            _: 1
          }),
          S(Pt, { show: c.value }, {
            default: D(() => [
              S(f, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: D(() => [
                  b("div", Ga, [
                    b("div", Ja, [
                      S(L, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: ne
                      }, null, 32),
                      m[13] || (m[13] = b("div", { class: "flex-shrink-0" }, "Create Maintenance Task", -1))
                    ])
                  ]),
                  S(f, { class: "mb-2 flex w-full p-1 gap-1 rounded-full" }, {
                    default: D(() => [
                      S(ae, {
                        onClick: zt,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ce.value === "interval" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: D(() => [...m[14] || (m[14] = [
                          re("Interval tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"]),
                      S(ae, {
                        onClick: ws,
                        class: "flex-1",
                        variant: "neutral",
                        appearance: ce.value === "conditional" ? "accent" : "plain",
                        size: "small"
                      }, {
                        default: D(() => [...m[15] || (m[15] = [
                          re("Conditional tasks", -1)
                        ])]),
                        _: 1
                      }, 8, ["appearance"])
                    ]),
                    _: 1
                  }),
                  ce.value == "conditional" ? (z(), _e(a, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": nt(tt),
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema"])) : (z(), _e(a, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": nt(ct),
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema"])),
                  b("div", Ya, [
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: ne
                    }, {
                      default: D(() => [...m[16] || (m[16] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      onClick: G
                    }, {
                      default: D(() => [...m[17] || (m[17] = [
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
          S(Pt, { show: h.value }, {
            default: D(() => [
              S(f, { class: "p-6 max-h-[80vh] overflow-auto flex flex-col scrollbar-hide" }, {
                default: D(() => [
                  b("div", Xa, [
                    b("div", Za, [
                      S(L, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: ne
                      }, null, 32),
                      m[18] || (m[18] = b("div", { class: "flex-shrink-0" }, "Edit Maintenance Task", -1))
                    ])
                  ]),
                  s.value.Type == "conditional" ? (z(), _e(a, {
                    key: 0,
                    ".hass": t.hass,
                    ".schema": nt(tt),
                    ".data": s.value,
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema", ".data"])) : (z(), _e(a, {
                    key: 1,
                    ".hass": t.hass,
                    ".schema": nt(ct),
                    ".data": s.value,
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema", ".data"])),
                  b("div", Qa, [
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: ne
                    }, {
                      default: D(() => [...m[19] || (m[19] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      onClick: G
                    }, {
                      default: D(() => [...m[20] || (m[20] = [
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
          S(Pt, { show: p.value }, {
            default: D(() => [
              S(f, { class: "p-6 flex flex-col" }, {
                default: D(() => [
                  m[23] || (m[23] = b("div", { class: "flex flex-col" }, [
                    b("div", { class: "text-2xl font-medium mb-5" }, "Create Maintenance Task"),
                    b("div", { class: "text-lg font-medium mb-5" }, "Are you sure you want to delete this maintenance task? This action cannot be undone.")
                  ], -1)),
                  b("div", ec, [
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[4] || (m[4] = (d) => p.value = !1)
                    }, {
                      default: D(() => [...m[21] || (m[21] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "danger",
                      onClick: Be
                    }, {
                      default: D(() => [...m[22] || (m[22] = [
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
          S(Pt, { show: u.value }, {
            default: D(() => [
              S(f, { class: "p-6 flex flex-col" }, {
                default: D(() => [
                  m[26] || (m[26] = b("div", { class: "flex flex-col" }, [
                    b("div", { class: "text-2xl font-medium mb-5" }, "Mark as Complete"),
                    b("div", { class: "text-lg font-medium mb-5" }, "Add any notes about completing this maintenance task (optional).")
                  ], -1)),
                  S(a, {
                    ".hass": t.hass,
                    ".schema": nt(_t),
                    onValueChanged: H
                  }, null, 40, [".hass", ".schema"]),
                  b("div", tc, [
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      appearance: "accent",
                      variant: "neutral",
                      onClick: m[5] || (m[5] = (d) => u.value = !1)
                    }, {
                      default: D(() => [...m[24] || (m[24] = [
                        re("Cancel", -1)
                      ])]),
                      _: 1
                    }),
                    S(ae, {
                      class: "flex flex-1 min-w-0",
                      apperance: "accent",
                      variant: "brand",
                      onClick: vt
                    }, {
                      default: D(() => [...m[25] || (m[25] = [
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
          S(Pt, {
            show: me.value !== ""
          }, {
            default: D(() => [
              S(f, { class: "p-6 flex flex-col max-h-[80vh] overflow-auto scrollbar-hide" }, {
                default: D(() => [
                  b("div", sc, [
                    b("div", nc, [
                      S(L, {
                        class: "cursor-pointer",
                        ".icon": "mdi:close",
                        onClick: m[6] || (m[6] = (d) => me.value = "")
                      }, null, 32),
                      b("div", rc, Z(me.value.name) + "'s history", 1)
                    ]),
                    b("div", oc, Z(me.value.location), 1)
                  ]),
                  b("table", ic, [
                    m[27] || (m[27] = b("thead", { class: "text-left forn-size-lg text-[1.1em]" }, [
                      b("tr", null, [
                        b("th", null, "Date"),
                        b("th", null, "Note")
                      ])
                    ], -1)),
                    b("tbody", null, [
                      (z(!0), Me(fe, null, Zt(ke.value, (d) => (z(), Me("tr", null, [
                        b("td", lc, Z(d.date.replace("T", " ")), 1),
                        b("td", ac, Z(d.note), 1)
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
}), uc = "*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.invisible{visibility:hidden}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.left-0{left:0}.top-full{top:100%}.z-10{z-index:10}.z-50{z-index:50}.z-\\[8\\]{z-index:8}.m-6{margin:1.5rem}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.ml-1{margin-left:.25rem}.ml-2{margin-left:.5rem}.mr-5{margin-right:1.25rem}.mt-1{margin-top:.25rem}.mt-4{margin-top:1rem}.flex{display:flex}.table{display:table}.hidden{display:none}.max-h-\\[80vh\\]{max-height:80vh}.w-full{width:100%}.w-max{width:-moz-max-content;width:max-content}.min-w-0{min-width:0px}.max-w-3xl{max-width:48rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.flex-grow{flex-grow:1}.table-fixed{table-layout:fixed}.border-spacing-y-3{--tw-border-spacing-y: .75rem;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y)}.cursor-help{cursor:help}.cursor-pointer{cursor:pointer}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-10{gap:2.5rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-5{gap:1.25rem}.gap-8{gap:2rem}.overflow-auto{overflow:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-words{overflow-wrap:break-word}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-full{border-radius:9999px}.rounded-sm{border-radius:.125rem}.border-2{border-width:2px}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-red-500{--tw-border-opacity: 1;border-color:rgb(239 68 68 / var(--tw-border-opacity, 1))}.border-red-700{--tw-border-opacity: 1;border-color:rgb(185 28 28 / var(--tw-border-opacity, 1))}.border-yellow-500{--tw-border-opacity: 1;border-color:rgb(234 179 8 / var(--tw-border-opacity, 1))}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-gray-900{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-opacity-50{--tw-bg-opacity: .5 }.p-1{padding:.25rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.pb-5{padding-bottom:1.25rem}.text-left{text-align:left}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[1\\.1em\\]{font-size:1.1em}.text-\\[1\\.2em\\]{font-size:1.2em}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-medium{font-weight:500}.font-semibold{font-weight:600}.text-blue-500{--tw-text-opacity: 1;color:rgb(59 130 246 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-red-500{--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-500{--tw-text-opacity: 1;color:rgb(234 179 8 / var(--tw-text-opacity, 1))}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}.scrollbar-hide::-webkit-scrollbar{display:none}", fc = /* @__PURE__ */ ro(cc, [["styles", [uc]]]), dc = /* @__PURE__ */ Cl(fc);

if(!customElements.get("maintenance-manager-panel", dc)){
    customElements.define("maintenance-manager-panel", dc);
}