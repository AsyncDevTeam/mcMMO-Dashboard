!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).skinview3d = {})
}(this, function(e) {
    "use strict";
    let t, i;
    let r = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2
    }
        , a = {
        ROTATE: 0,
        PAN: 1,
        DOLLY_PAN: 2,
        DOLLY_ROTATE: 3
    }
        , n = "srgb"
        , s = "srgb-linear"
        , o = "300 es";
    class l {
        addEventListener(e, t) {
            void 0 === this._listeners && (this._listeners = {});
            let i = this._listeners;
            void 0 === i[e] && (i[e] = []),
            -1 === i[e].indexOf(t) && i[e].push(t)
        }
        hasEventListener(e, t) {
            if (void 0 === this._listeners)
                return !1;
            let i = this._listeners;
            return void 0 !== i[e] && -1 !== i[e].indexOf(t)
        }
        removeEventListener(e, t) {
            if (void 0 === this._listeners)
                return;
            let i = this._listeners
                , r = i[e];
            if (void 0 !== r) {
                let e = r.indexOf(t);
                -1 !== e && r.splice(e, 1)
            }
        }
        dispatchEvent(e) {
            if (void 0 === this._listeners)
                return;
            let t = this._listeners
                , i = t[e.type];
            if (void 0 !== i) {
                e.target = this;
                let t = i.slice(0);
                for (let i = 0, r = t.length; i < r; i++)
                    t[i].call(this, e);
                e.target = null
            }
        }
    }
    let h = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"]
        , c = Math.PI / 180
        , d = 180 / Math.PI;
    function u() {
        let e = 4294967295 * Math.random() | 0
            , t = 4294967295 * Math.random() | 0
            , i = 4294967295 * Math.random() | 0
            , r = 4294967295 * Math.random() | 0
            , a = h[255 & e] + h[e >> 8 & 255] + h[e >> 16 & 255] + h[e >> 24 & 255] + "-" + h[255 & t] + h[t >> 8 & 255] + "-" + h[t >> 16 & 15 | 64] + h[t >> 24 & 255] + "-" + h[63 & i | 128] + h[i >> 8 & 255] + "-" + h[i >> 16 & 255] + h[i >> 24 & 255] + h[255 & r] + h[r >> 8 & 255] + h[r >> 16 & 255] + h[r >> 24 & 255];
        return a.toLowerCase()
    }
    function p(e, t, i) {
        return Math.max(t, Math.min(i, e))
    }
    function f(e) {
        return (e & e - 1) == 0 && 0 !== e
    }
    function m(e) {
        return Math.pow(2, Math.floor(Math.log(e) / Math.LN2))
    }
    class g {
        constructor(e=0, t=0) {
            g.prototype.isVector2 = !0,
                this.x = e,
                this.y = t
        }
        get width() {
            return this.x
        }
        set width(e) {
            this.x = e
        }
        get height() {
            return this.y
        }
        set height(e) {
            this.y = e
        }
        set(e, t) {
            return this.x = e,
                this.y = t,
                this
        }
        setScalar(e) {
            return this.x = e,
                this.y = e,
                this
        }
        setX(e) {
            return this.x = e,
                this
        }
        setY(e) {
            return this.y = e,
                this
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                default:
                    throw Error("index is out of range: " + e)
            }
            return this
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw Error("index is out of range: " + e)
            }
        }
        clone() {
            return new this.constructor(this.x,this.y)
        }
        copy(e) {
            return this.x = e.x,
                this.y = e.y,
                this
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                this.addVectors(e, t)) : (this.x += e.x,
                this.y += e.y,
                this)
        }
        addScalar(e) {
            return this.x += e,
                this.y += e,
                this
        }
        addVectors(e, t) {
            return this.x = e.x + t.x,
                this.y = e.y + t.y,
                this
        }
        addScaledVector(e, t) {
            return this.x += e.x * t,
                this.y += e.y * t,
                this
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                this.subVectors(e, t)) : (this.x -= e.x,
                this.y -= e.y,
                this)
        }
        subScalar(e) {
            return this.x -= e,
                this.y -= e,
                this
        }
        subVectors(e, t) {
            return this.x = e.x - t.x,
                this.y = e.y - t.y,
                this
        }
        multiply(e) {
            return this.x *= e.x,
                this.y *= e.y,
                this
        }
        multiplyScalar(e) {
            return this.x *= e,
                this.y *= e,
                this
        }
        divide(e) {
            return this.x /= e.x,
                this.y /= e.y,
                this
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }
        applyMatrix3(e) {
            let t = this.x
                , i = this.y
                , r = e.elements;
            return this.x = r[0] * t + r[3] * i + r[6],
                this.y = r[1] * t + r[4] * i + r[7],
                this
        }
        min(e) {
            return this.x = Math.min(this.x, e.x),
                this.y = Math.min(this.y, e.y),
                this
        }
        max(e) {
            return this.x = Math.max(this.x, e.x),
                this.y = Math.max(this.y, e.y),
                this
        }
        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)),
                this.y = Math.max(e.y, Math.min(t.y, this.y)),
                this
        }
        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)),
                this.y = Math.max(e, Math.min(t, this.y)),
                this
        }
        clampLength(e, t) {
            let i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }
        floor() {
            return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this
        }
        ceil() {
            return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this
        }
        round() {
            return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
                this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
                this
        }
        negate() {
            return this.x = -this.x,
                this.y = -this.y,
                this
        }
        dot(e) {
            return this.x * e.x + this.y * e.y
        }
        cross(e) {
            return this.x * e.y - this.y * e.x
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        angle() {
            let e = Math.atan2(-this.y, -this.x) + Math.PI;
            return e
        }
        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e))
        }
        distanceToSquared(e) {
            let t = this.x - e.x
                , i = this.y - e.y;
            return t * t + i * i
        }
        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y)
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }
        lerp(e, t) {
            return this.x += (e.x - this.x) * t,
                this.y += (e.y - this.y) * t,
                this
        }
        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i,
                this.y = e.y + (t.y - e.y) * i,
                this
        }
        equals(e) {
            return e.x === this.x && e.y === this.y
        }
        fromArray(e, t=0) {
            return this.x = e[t],
                this.y = e[t + 1],
                this
        }
        toArray(e=[], t=0) {
            return e[t] = this.x,
                e[t + 1] = this.y,
                e
        }
        fromBufferAttribute(e, t, i) {
            return void 0 !== i && console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),
                this.x = e.getX(t),
                this.y = e.getY(t),
                this
        }
        rotateAround(e, t) {
            let i = Math.cos(t)
                , r = Math.sin(t)
                , a = this.x - e.x
                , n = this.y - e.y;
            return this.x = a * i - n * r + e.x,
                this.y = a * r + n * i + e.y,
                this
        }
        random() {
            return this.x = Math.random(),
                this.y = Math.random(),
                this
        }
        *[Symbol.iterator]() {
            yield this.x,
                yield this.y
        }
    }
    class v {
        constructor() {
            v.prototype.isMatrix3 = !0,
                this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1],
            arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
        }
        set(e, t, i, r, a, n, s, o, l) {
            let h = this.elements;
            return h[0] = e,
                h[1] = r,
                h[2] = s,
                h[3] = t,
                h[4] = a,
                h[5] = o,
                h[6] = i,
                h[7] = n,
                h[8] = l,
                this
        }
        identity() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
                this
        }
        copy(e) {
            let t = this.elements
                , i = e.elements;
            return t[0] = i[0],
                t[1] = i[1],
                t[2] = i[2],
                t[3] = i[3],
                t[4] = i[4],
                t[5] = i[5],
                t[6] = i[6],
                t[7] = i[7],
                t[8] = i[8],
                this
        }
        extractBasis(e, t, i) {
            return e.setFromMatrix3Column(this, 0),
                t.setFromMatrix3Column(this, 1),
                i.setFromMatrix3Column(this, 2),
                this
        }
        setFromMatrix4(e) {
            let t = e.elements;
            return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]),
                this
        }
        multiply(e) {
            return this.multiplyMatrices(this, e)
        }
        premultiply(e) {
            return this.multiplyMatrices(e, this)
        }
        multiplyMatrices(e, t) {
            let i = e.elements
                , r = t.elements
                , a = this.elements
                , n = i[0]
                , s = i[3]
                , o = i[6]
                , l = i[1]
                , h = i[4]
                , c = i[7]
                , d = i[2]
                , u = i[5]
                , p = i[8]
                , f = r[0]
                , m = r[3]
                , g = r[6]
                , v = r[1]
                , _ = r[4]
                , x = r[7]
                , y = r[2]
                , M = r[5]
                , b = r[8];
            return a[0] = n * f + s * v + o * y,
                a[3] = n * m + s * _ + o * M,
                a[6] = n * g + s * x + o * b,
                a[1] = l * f + h * v + c * y,
                a[4] = l * m + h * _ + c * M,
                a[7] = l * g + h * x + c * b,
                a[2] = d * f + u * v + p * y,
                a[5] = d * m + u * _ + p * M,
                a[8] = d * g + u * x + p * b,
                this
        }
        multiplyScalar(e) {
            let t = this.elements;
            return t[0] *= e,
                t[3] *= e,
                t[6] *= e,
                t[1] *= e,
                t[4] *= e,
                t[7] *= e,
                t[2] *= e,
                t[5] *= e,
                t[8] *= e,
                this
        }
        determinant() {
            let e = this.elements
                , t = e[0]
                , i = e[1]
                , r = e[2]
                , a = e[3]
                , n = e[4]
                , s = e[5]
                , o = e[6]
                , l = e[7]
                , h = e[8];
            return t * n * h - t * s * l - i * a * h + i * s * o + r * a * l - r * n * o
        }
        invert() {
            let e = this.elements
                , t = e[0]
                , i = e[1]
                , r = e[2]
                , a = e[3]
                , n = e[4]
                , s = e[5]
                , o = e[6]
                , l = e[7]
                , h = e[8]
                , c = h * n - s * l
                , d = s * o - h * a
                , u = l * a - n * o
                , p = t * c + i * d + r * u;
            if (0 === p)
                return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
            let f = 1 / p;
            return e[0] = c * f,
                e[1] = (r * l - h * i) * f,
                e[2] = (s * i - r * n) * f,
                e[3] = d * f,
                e[4] = (h * t - r * o) * f,
                e[5] = (r * a - s * t) * f,
                e[6] = u * f,
                e[7] = (i * o - l * t) * f,
                e[8] = (n * t - i * a) * f,
                this
        }
        transpose() {
            let e;
            let t = this.elements;
            return e = t[1],
                t[1] = t[3],
                t[3] = e,
                e = t[2],
                t[2] = t[6],
                t[6] = e,
                e = t[5],
                t[5] = t[7],
                t[7] = e,
                this
        }
        getNormalMatrix(e) {
            return this.setFromMatrix4(e).invert().transpose()
        }
        transposeIntoArray(e) {
            let t = this.elements;
            return e[0] = t[0],
                e[1] = t[3],
                e[2] = t[6],
                e[3] = t[1],
                e[4] = t[4],
                e[5] = t[7],
                e[6] = t[2],
                e[7] = t[5],
                e[8] = t[8],
                this
        }
        setUvTransform(e, t, i, r, a, n, s) {
            let o = Math.cos(a)
                , l = Math.sin(a);
            return this.set(i * o, i * l, -i * (o * n + l * s) + n + e, -r * l, r * o, -r * (-l * n + o * s) + s + t, 0, 0, 1),
                this
        }
        scale(e, t) {
            let i = this.elements;
            return i[0] *= e,
                i[3] *= e,
                i[6] *= e,
                i[1] *= t,
                i[4] *= t,
                i[7] *= t,
                this
        }
        rotate(e) {
            let t = Math.cos(e)
                , i = Math.sin(e)
                , r = this.elements
                , a = r[0]
                , n = r[3]
                , s = r[6]
                , o = r[1]
                , l = r[4]
                , h = r[7];
            return r[0] = t * a + i * o,
                r[3] = t * n + i * l,
                r[6] = t * s + i * h,
                r[1] = -i * a + t * o,
                r[4] = -i * n + t * l,
                r[7] = -i * s + t * h,
                this
        }
        translate(e, t) {
            let i = this.elements;
            return i[0] += e * i[2],
                i[3] += e * i[5],
                i[6] += e * i[8],
                i[1] += t * i[2],
                i[4] += t * i[5],
                i[7] += t * i[8],
                this
        }
        equals(e) {
            let t = this.elements
                , i = e.elements;
            for (let e = 0; e < 9; e++)
                if (t[e] !== i[e])
                    return !1;
            return !0
        }
        fromArray(e, t=0) {
            for (let i = 0; i < 9; i++)
                this.elements[i] = e[i + t];
            return this
        }
        toArray(e=[], t=0) {
            let i = this.elements;
            return e[t] = i[0],
                e[t + 1] = i[1],
                e[t + 2] = i[2],
                e[t + 3] = i[3],
                e[t + 4] = i[4],
                e[t + 5] = i[5],
                e[t + 6] = i[6],
                e[t + 7] = i[7],
                e[t + 8] = i[8],
                e
        }
        clone() {
            return new this.constructor().fromArray(this.elements)
        }
    }
    function _(e) {
        for (let t = e.length - 1; t >= 0; --t)
            if (e[t] > 65535)
                return !0;
        return !1
    }
    function x(e) {
        return document.createElementNS("http://www.w3.org/1999/xhtml", e)
    }
    function y(e) {
        return e < .04045 ? .0773993808 * e : Math.pow(.9478672986 * e + .0521327014, 2.4)
    }
    function M(e) {
        return e < .0031308 ? 12.92 * e : 1.055 * Math.pow(e, .41666) - .055
    }
    let b = {
        [n]: {
            [s]: y
        },
        [s]: {
            [n]: M
        }
    }
        , S = {
        legacyMode: !0,
        get workingColorSpace() {
            return s
        },
        set workingColorSpace(colorSpace) {
            console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")
        },
        convert: function(e, t, i) {
            if (this.legacyMode || t === i || !t || !i)
                return e;
            if (b[t] && void 0 !== b[t][i]) {
                let r = b[t][i];
                return e.r = r(e.r),
                    e.g = r(e.g),
                    e.b = r(e.b),
                    e
            }
            throw Error("Unsupported color space conversion.")
        },
        fromWorkingColorSpace: function(e, t) {
            return this.convert(e, this.workingColorSpace, t)
        },
        toWorkingColorSpace: function(e, t) {
            return this.convert(e, t, this.workingColorSpace)
        }
    }
        , w = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    }
        , T = {
        r: 0,
        g: 0,
        b: 0
    }
        , E = {
        h: 0,
        s: 0,
        l: 0
    }
        , A = {
        h: 0,
        s: 0,
        l: 0
    };
    function C(e, t, i) {
        return (i < 0 && (i += 1),
        i > 1 && (i -= 1),
        i < 1 / 6) ? e + (t - e) * 6 * i : i < .5 ? t : i < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - i) : e
    }
    function L(e, t) {
        return t.r = e.r,
            t.g = e.g,
            t.b = e.b,
            t
    }
    class P {
        constructor(e, t, i) {
            if (this.isColor = !0,
                this.r = 1,
                this.g = 1,
                this.b = 1,
            void 0 === t && void 0 === i)
                return this.set(e);
            return this.setRGB(e, t, i)
        }
        set(e) {
            return e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e),
                this
        }
        setScalar(e) {
            return this.r = e,
                this.g = e,
                this.b = e,
                this
        }
        setHex(e, t=n) {
            return e = Math.floor(e),
                this.r = (e >> 16 & 255) / 255,
                this.g = (e >> 8 & 255) / 255,
                this.b = (255 & e) / 255,
                S.toWorkingColorSpace(this, t),
                this
        }
        setRGB(e, t, i, r=s) {
            return this.r = e,
                this.g = t,
                this.b = i,
                S.toWorkingColorSpace(this, r),
                this
        }
        setHSL(e, t, i, r=s) {
            if (e = (e % 1 + 1) % 1,
                t = p(t, 0, 1),
                i = p(i, 0, 1),
            0 === t)
                this.r = this.g = this.b = i;
            else {
                let r = i <= .5 ? i * (1 + t) : i + t - i * t
                    , a = 2 * i - r;
                this.r = C(a, r, e + 1 / 3),
                    this.g = C(a, r, e),
                    this.b = C(a, r, e - 1 / 3)
            }
            return S.toWorkingColorSpace(this, r),
                this
        }
        setStyle(e, t=n) {
            let i;
            function r(t) {
                void 0 !== t && 1 > parseFloat(t) && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.")
            }
            if (i = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)) {
                let e;
                let a = i[1]
                    , n = i[2];
                switch (a) {
                    case "rgb":
                    case "rgba":
                        if (e = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(n))
                            return this.r = Math.min(255, parseInt(e[1], 10)) / 255,
                                this.g = Math.min(255, parseInt(e[2], 10)) / 255,
                                this.b = Math.min(255, parseInt(e[3], 10)) / 255,
                                S.toWorkingColorSpace(this, t),
                                r(e[4]),
                                this;
                        if (e = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(n))
                            return this.r = Math.min(100, parseInt(e[1], 10)) / 100,
                                this.g = Math.min(100, parseInt(e[2], 10)) / 100,
                                this.b = Math.min(100, parseInt(e[3], 10)) / 100,
                                S.toWorkingColorSpace(this, t),
                                r(e[4]),
                                this;
                        break;
                    case "hsl":
                    case "hsla":
                        if (e = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(n)) {
                            let i = parseFloat(e[1]) / 360
                                , a = parseInt(e[2], 10) / 100
                                , n = parseInt(e[3], 10) / 100;
                            return r(e[4]),
                                this.setHSL(i, a, n, t)
                        }
                }
            } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
                let e = i[1]
                    , r = e.length;
                if (3 === r)
                    return this.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255,
                        this.g = parseInt(e.charAt(1) + e.charAt(1), 16) / 255,
                        this.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255,
                        S.toWorkingColorSpace(this, t),
                        this;
                if (6 === r)
                    return this.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255,
                        this.g = parseInt(e.charAt(2) + e.charAt(3), 16) / 255,
                        this.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255,
                        S.toWorkingColorSpace(this, t),
                        this
            }
            return e && e.length > 0 ? this.setColorName(e, t) : this
        }
        setColorName(e, t=n) {
            let i = w[e.toLowerCase()];
            return void 0 !== i ? this.setHex(i, t) : console.warn("THREE.Color: Unknown color " + e),
                this
        }
        clone() {
            return new this.constructor(this.r,this.g,this.b)
        }
        copy(e) {
            return this.r = e.r,
                this.g = e.g,
                this.b = e.b,
                this
        }
        copySRGBToLinear(e) {
            return this.r = y(e.r),
                this.g = y(e.g),
                this.b = y(e.b),
                this
        }
        copyLinearToSRGB(e) {
            return this.r = M(e.r),
                this.g = M(e.g),
                this.b = M(e.b),
                this
        }
        convertSRGBToLinear() {
            return this.copySRGBToLinear(this),
                this
        }
        convertLinearToSRGB() {
            return this.copyLinearToSRGB(this),
                this
        }
        getHex(e=n) {
            return S.fromWorkingColorSpace(L(this, T), e),
            p(255 * T.r, 0, 255) << 16 ^ p(255 * T.g, 0, 255) << 8 ^ p(255 * T.b, 0, 255) << 0
        }
        getHexString(e=n) {
            return ("000000" + this.getHex(e).toString(16)).slice(-6)
        }
        getHSL(e, t=s) {
            let i, r;
            S.fromWorkingColorSpace(L(this, T), t);
            let a = T.r
                , n = T.g
                , o = T.b
                , l = Math.max(a, n, o)
                , h = Math.min(a, n, o)
                , c = (h + l) / 2;
            if (h === l)
                i = 0,
                    r = 0;
            else {
                let e = l - h;
                switch (r = c <= .5 ? e / (l + h) : e / (2 - l - h),
                    l) {
                    case a:
                        i = (n - o) / e + (n < o ? 6 : 0);
                        break;
                    case n:
                        i = (o - a) / e + 2;
                        break;
                    case o:
                        i = (a - n) / e + 4
                }
                i /= 6
            }
            return e.h = i,
                e.s = r,
                e.l = c,
                e
        }
        getRGB(e, t=s) {
            return S.fromWorkingColorSpace(L(this, T), t),
                e.r = T.r,
                e.g = T.g,
                e.b = T.b,
                e
        }
        getStyle(e=n) {
            return (S.fromWorkingColorSpace(L(this, T), e),
            e !== n) ? `color(${e} ${T.r} ${T.g} ${T.b})` : `rgb(${255 * T.r | 0},${255 * T.g | 0},${255 * T.b | 0})`
        }
        offsetHSL(e, t, i) {
            return this.getHSL(E),
                E.h += e,
                E.s += t,
                E.l += i,
                this.setHSL(E.h, E.s, E.l),
                this
        }
        add(e) {
            return this.r += e.r,
                this.g += e.g,
                this.b += e.b,
                this
        }
        addColors(e, t) {
            return this.r = e.r + t.r,
                this.g = e.g + t.g,
                this.b = e.b + t.b,
                this
        }
        addScalar(e) {
            return this.r += e,
                this.g += e,
                this.b += e,
                this
        }
        sub(e) {
            return this.r = Math.max(0, this.r - e.r),
                this.g = Math.max(0, this.g - e.g),
                this.b = Math.max(0, this.b - e.b),
                this
        }
        multiply(e) {
            return this.r *= e.r,
                this.g *= e.g,
                this.b *= e.b,
                this
        }
        multiplyScalar(e) {
            return this.r *= e,
                this.g *= e,
                this.b *= e,
                this
        }
        lerp(e, t) {
            return this.r += (e.r - this.r) * t,
                this.g += (e.g - this.g) * t,
                this.b += (e.b - this.b) * t,
                this
        }
        lerpColors(e, t, i) {
            return this.r = e.r + (t.r - e.r) * i,
                this.g = e.g + (t.g - e.g) * i,
                this.b = e.b + (t.b - e.b) * i,
                this
        }
        lerpHSL(e, t) {
            this.getHSL(E),
                e.getHSL(A);
            let i = (1 - t) * E.h + t * A.h
                , r = (1 - t) * E.s + t * A.s
                , a = (1 - t) * E.l + t * A.l;
            return this.setHSL(i, r, a),
                this
        }
        equals(e) {
            return e.r === this.r && e.g === this.g && e.b === this.b
        }
        fromArray(e, t=0) {
            return this.r = e[t],
                this.g = e[t + 1],
                this.b = e[t + 2],
                this
        }
        toArray(e=[], t=0) {
            return e[t] = this.r,
                e[t + 1] = this.g,
                e[t + 2] = this.b,
                e
        }
        fromBufferAttribute(e, t) {
            return this.r = e.getX(t),
                this.g = e.getY(t),
                this.b = e.getZ(t),
            !0 === e.normalized && (this.r /= 255,
                this.g /= 255,
                this.b /= 255),
                this
        }
        toJSON() {
            return this.getHex()
        }
        *[Symbol.iterator]() {
            yield this.r,
                yield this.g,
                yield this.b
        }
    }
    P.NAMES = w;
    class R {
        static getDataURL(e) {
            let i;
            if (/^data:/i.test(e.src) || "undefined" == typeof HTMLCanvasElement)
                return e.src;
            if (e instanceof HTMLCanvasElement)
                i = e;
            else {
                void 0 === t && (t = x("canvas")),
                    t.width = e.width,
                    t.height = e.height;
                let r = t.getContext("2d");
                e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height),
                    i = t
            }
            return i.width > 2048 || i.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e),
                i.toDataURL("image/jpeg", .6)) : i.toDataURL("image/png")
        }
        static sRGBToLinear(e) {
            if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                let t = x("canvas");
                t.width = e.width,
                    t.height = e.height;
                let i = t.getContext("2d");
                i.drawImage(e, 0, 0, e.width, e.height);
                let r = i.getImageData(0, 0, e.width, e.height)
                    , a = r.data;
                for (let e = 0; e < a.length; e++)
                    a[e] = 255 * y(a[e] / 255);
                return i.putImageData(r, 0, 0),
                    t
            }
            if (!e.data)
                return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),
                    e;
            {
                let t = e.data.slice(0);
                for (let e = 0; e < t.length; e++)
                    t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(255 * y(t[e] / 255)) : t[e] = y(t[e]);
                return {
                    data: t,
                    width: e.width,
                    height: e.height
                }
            }
        }
    }
    class D {
        constructor(e=null) {
            this.isSource = !0,
                this.uuid = u(),
                this.data = e,
                this.version = 0
        }
        set needsUpdate(e) {
            !0 === e && this.version++
        }
        toJSON(e) {
            let t = void 0 === e || "string" == typeof e;
            if (!t && void 0 !== e.images[this.uuid])
                return e.images[this.uuid];
            let i = {
                uuid: this.uuid,
                url: ""
            }
                , r = this.data;
            if (null !== r) {
                let e;
                if (Array.isArray(r)) {
                    e = [];
                    for (let t = 0, i = r.length; t < i; t++)
                        r[t].isDataTexture ? e.push(I(r[t].image)) : e.push(I(r[t]))
                } else
                    e = I(r);
                i.url = e
            }
            return t || (e.images[this.uuid] = i),
                i
        }
    }
    function I(e) {
        return "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap ? R.getDataURL(e) : e.data ? {
            data: Array.from(e.data),
            width: e.width,
            height: e.height,
            type: e.data.constructor.name
        } : (console.warn("THREE.Texture: Unable to serialize Texture."),
            {})
    }
    let N = 0;
    class O extends l {
        constructor(e=O.DEFAULT_IMAGE, t=O.DEFAULT_MAPPING, i=1001, r=1001, a=1006, n=1008, s=1023, o=1009, l=1, h=3e3) {
            super(),
                this.isTexture = !0,
                Object.defineProperty(this, "id", {
                    value: N++
                }),
                this.uuid = u(),
                this.name = "",
                this.source = new D(e),
                this.mipmaps = [],
                this.mapping = t,
                this.wrapS = i,
                this.wrapT = r,
                this.magFilter = a,
                this.minFilter = n,
                this.anisotropy = l,
                this.format = s,
                this.internalFormat = null,
                this.type = o,
                this.offset = new g(0,0),
                this.repeat = new g(1,1),
                this.center = new g(0,0),
                this.rotation = 0,
                this.matrixAutoUpdate = !0,
                this.matrix = new v,
                this.generateMipmaps = !0,
                this.premultiplyAlpha = !1,
                this.flipY = !0,
                this.unpackAlignment = 4,
                this.encoding = h,
                this.userData = {},
                this.version = 0,
                this.onUpdate = null,
                this.isRenderTargetTexture = !1,
                this.needsPMREMUpdate = !1
        }
        get image() {
            return this.source.data
        }
        set image(e) {
            this.source.data = e
        }
        updateMatrix() {
            this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
        }
        clone() {
            return new this.constructor().copy(this)
        }
        copy(e) {
            return this.name = e.name,
                this.source = e.source,
                this.mipmaps = e.mipmaps.slice(0),
                this.mapping = e.mapping,
                this.wrapS = e.wrapS,
                this.wrapT = e.wrapT,
                this.magFilter = e.magFilter,
                this.minFilter = e.minFilter,
                this.anisotropy = e.anisotropy,
                this.format = e.format,
                this.internalFormat = e.internalFormat,
                this.type = e.type,
                this.offset.copy(e.offset),
                this.repeat.copy(e.repeat),
                this.center.copy(e.center),
                this.rotation = e.rotation,
                this.matrixAutoUpdate = e.matrixAutoUpdate,
                this.matrix.copy(e.matrix),
                this.generateMipmaps = e.generateMipmaps,
                this.premultiplyAlpha = e.premultiplyAlpha,
                this.flipY = e.flipY,
                this.unpackAlignment = e.unpackAlignment,
                this.encoding = e.encoding,
                this.userData = JSON.parse(JSON.stringify(e.userData)),
                this.needsUpdate = !0,
                this
        }
        toJSON(e) {
            let t = void 0 === e || "string" == typeof e;
            if (!t && void 0 !== e.textures[this.uuid])
                return e.textures[this.uuid];
            let i = {
                metadata: {
                    version: 4.5,
                    type: "Texture",
                    generator: "Texture.toJSON"
                },
                uuid: this.uuid,
                name: this.name,
                image: this.source.toJSON(e).uuid,
                mapping: this.mapping,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                center: [this.center.x, this.center.y],
                rotation: this.rotation,
                wrap: [this.wrapS, this.wrapT],
                format: this.format,
                type: this.type,
                encoding: this.encoding,
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY,
                premultiplyAlpha: this.premultiplyAlpha,
                unpackAlignment: this.unpackAlignment
            };
            return "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData),
            t || (e.textures[this.uuid] = i),
                i
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
        transformUv(e) {
            if (300 !== this.mapping)
                return e;
            if (e.applyMatrix3(this.matrix),
            e.x < 0 || e.x > 1)
                switch (this.wrapS) {
                    case 1e3:
                        e.x = e.x - Math.floor(e.x);
                        break;
                    case 1001:
                        e.x = e.x < 0 ? 0 : 1;
                        break;
                    case 1002:
                        1 === Math.abs(Math.floor(e.x) % 2) ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x)
                }
            if (e.y < 0 || e.y > 1)
                switch (this.wrapT) {
                    case 1e3:
                        e.y = e.y - Math.floor(e.y);
                        break;
                    case 1001:
                        e.y = e.y < 0 ? 0 : 1;
                        break;
                    case 1002:
                        1 === Math.abs(Math.floor(e.y) % 2) ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y)
                }
            return this.flipY && (e.y = 1 - e.y),
                e
        }
        set needsUpdate(e) {
            !0 === e && (this.version++,
                this.source.needsUpdate = !0)
        }
    }
    O.DEFAULT_IMAGE = null,
        O.DEFAULT_MAPPING = 300;
    class z {
        constructor(e=0, t=0, i=0, r=1) {
            z.prototype.isVector4 = !0,
                this.x = e,
                this.y = t,
                this.z = i,
                this.w = r
        }
        get width() {
            return this.z
        }
        set width(e) {
            this.z = e
        }
        get height() {
            return this.w
        }
        set height(e) {
            this.w = e
        }
        set(e, t, i, r) {
            return this.x = e,
                this.y = t,
                this.z = i,
                this.w = r,
                this
        }
        setScalar(e) {
            return this.x = e,
                this.y = e,
                this.z = e,
                this.w = e,
                this
        }
        setX(e) {
            return this.x = e,
                this
        }
        setY(e) {
            return this.y = e,
                this
        }
        setZ(e) {
            return this.z = e,
                this
        }
        setW(e) {
            return this.w = e,
                this
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                case 3:
                    this.w = t;
                    break;
                default:
                    throw Error("index is out of range: " + e)
            }
            return this
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw Error("index is out of range: " + e)
            }
        }
        clone() {
            return new this.constructor(this.x,this.y,this.z,this.w)
        }
        copy(e) {
            return this.x = e.x,
                this.y = e.y,
                this.z = e.z,
                this.w = void 0 !== e.w ? e.w : 1,
                this
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                this.addVectors(e, t)) : (this.x += e.x,
                this.y += e.y,
                this.z += e.z,
                this.w += e.w,
                this)
        }
        addScalar(e) {
            return this.x += e,
                this.y += e,
                this.z += e,
                this.w += e,
                this
        }
        addVectors(e, t) {
            return this.x = e.x + t.x,
                this.y = e.y + t.y,
                this.z = e.z + t.z,
                this.w = e.w + t.w,
                this
        }
        addScaledVector(e, t) {
            return this.x += e.x * t,
                this.y += e.y * t,
                this.z += e.z * t,
                this.w += e.w * t,
                this
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                this.subVectors(e, t)) : (this.x -= e.x,
                this.y -= e.y,
                this.z -= e.z,
                this.w -= e.w,
                this)
        }
        subScalar(e) {
            return this.x -= e,
                this.y -= e,
                this.z -= e,
                this.w -= e,
                this
        }
        subVectors(e, t) {
            return this.x = e.x - t.x,
                this.y = e.y - t.y,
                this.z = e.z - t.z,
                this.w = e.w - t.w,
                this
        }
        multiply(e) {
            return this.x *= e.x,
                this.y *= e.y,
                this.z *= e.z,
                this.w *= e.w,
                this
        }
        multiplyScalar(e) {
            return this.x *= e,
                this.y *= e,
                this.z *= e,
                this.w *= e,
                this
        }
        applyMatrix4(e) {
            let t = this.x
                , i = this.y
                , r = this.z
                , a = this.w
                , n = e.elements;
            return this.x = n[0] * t + n[4] * i + n[8] * r + n[12] * a,
                this.y = n[1] * t + n[5] * i + n[9] * r + n[13] * a,
                this.z = n[2] * t + n[6] * i + n[10] * r + n[14] * a,
                this.w = n[3] * t + n[7] * i + n[11] * r + n[15] * a,
                this
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }
        setAxisAngleFromQuaternion(e) {
            this.w = 2 * Math.acos(e.w);
            let t = Math.sqrt(1 - e.w * e.w);
            return t < 1e-4 ? (this.x = 1,
                this.y = 0,
                this.z = 0) : (this.x = e.x / t,
                this.y = e.y / t,
                this.z = e.z / t),
                this
        }
        setAxisAngleFromRotationMatrix(e) {
            let t, i, r;
            let a = e.elements
                , n = a[0]
                , s = a[4]
                , o = a[8]
                , l = a[1]
                , h = a[5]
                , c = a[9]
                , d = a[2]
                , u = a[6]
                , p = a[10];
            if (.01 > Math.abs(s - l) && .01 > Math.abs(o - d) && .01 > Math.abs(c - u)) {
                if (.1 > Math.abs(s + l) && .1 > Math.abs(o + d) && .1 > Math.abs(c + u) && .1 > Math.abs(n + h + p - 3))
                    return this.set(1, 0, 0, 0),
                        this;
                let e = (n + 1) / 2
                    , a = (h + 1) / 2
                    , f = (p + 1) / 2
                    , m = (s + l) / 4
                    , g = (o + d) / 4
                    , v = (c + u) / 4;
                return e > a && e > f ? e < .01 ? (t = 0,
                    i = .707106781,
                    r = .707106781) : (i = m / (t = Math.sqrt(e)),
                    r = g / t) : a > f ? a < .01 ? (t = .707106781,
                    i = 0,
                    r = .707106781) : (t = m / (i = Math.sqrt(a)),
                    r = v / i) : f < .01 ? (t = .707106781,
                    i = .707106781,
                    r = 0) : (t = g / (r = Math.sqrt(f)),
                    i = v / r),
                    this.set(t, i, r, Math.PI),
                    this
            }
            let f = Math.sqrt((u - c) * (u - c) + (o - d) * (o - d) + (l - s) * (l - s));
            return .001 > Math.abs(f) && (f = 1),
                this.x = (u - c) / f,
                this.y = (o - d) / f,
                this.z = (l - s) / f,
                this.w = Math.acos((n + h + p - 1) / 2),
                this
        }
        min(e) {
            return this.x = Math.min(this.x, e.x),
                this.y = Math.min(this.y, e.y),
                this.z = Math.min(this.z, e.z),
                this.w = Math.min(this.w, e.w),
                this
        }
        max(e) {
            return this.x = Math.max(this.x, e.x),
                this.y = Math.max(this.y, e.y),
                this.z = Math.max(this.z, e.z),
                this.w = Math.max(this.w, e.w),
                this
        }
        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)),
                this.y = Math.max(e.y, Math.min(t.y, this.y)),
                this.z = Math.max(e.z, Math.min(t.z, this.z)),
                this.w = Math.max(e.w, Math.min(t.w, this.w)),
                this
        }
        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)),
                this.y = Math.max(e, Math.min(t, this.y)),
                this.z = Math.max(e, Math.min(t, this.z)),
                this.w = Math.max(e, Math.min(t, this.w)),
                this
        }
        clampLength(e, t) {
            let i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }
        floor() {
            return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this.z = Math.floor(this.z),
                this.w = Math.floor(this.w),
                this
        }
        ceil() {
            return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this.z = Math.ceil(this.z),
                this.w = Math.ceil(this.w),
                this
        }
        round() {
            return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this.z = Math.round(this.z),
                this.w = Math.round(this.w),
                this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
                this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
                this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
                this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w),
                this
        }
        negate() {
            return this.x = -this.x,
                this.y = -this.y,
                this.z = -this.z,
                this.w = -this.w,
                this
        }
        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }
        lerp(e, t) {
            return this.x += (e.x - this.x) * t,
                this.y += (e.y - this.y) * t,
                this.z += (e.z - this.z) * t,
                this.w += (e.w - this.w) * t,
                this
        }
        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i,
                this.y = e.y + (t.y - e.y) * i,
                this.z = e.z + (t.z - e.z) * i,
                this.w = e.w + (t.w - e.w) * i,
                this
        }
        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w
        }
        fromArray(e, t=0) {
            return this.x = e[t],
                this.y = e[t + 1],
                this.z = e[t + 2],
                this.w = e[t + 3],
                this
        }
        toArray(e=[], t=0) {
            return e[t] = this.x,
                e[t + 1] = this.y,
                e[t + 2] = this.z,
                e[t + 3] = this.w,
                e
        }
        fromBufferAttribute(e, t, i) {
            return void 0 !== i && console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),
                this.x = e.getX(t),
                this.y = e.getY(t),
                this.z = e.getZ(t),
                this.w = e.getW(t),
                this
        }
        random() {
            return this.x = Math.random(),
                this.y = Math.random(),
                this.z = Math.random(),
                this.w = Math.random(),
                this
        }
        *[Symbol.iterator]() {
            yield this.x,
                yield this.y,
                yield this.z,
                yield this.w
        }
    }
    class U extends l {
        constructor(e, t, i={}) {
            super(),
                this.isWebGLRenderTarget = !0,
                this.width = e,
                this.height = t,
                this.depth = 1,
                this.scissor = new z(0,0,e,t),
                this.scissorTest = !1,
                this.viewport = new z(0,0,e,t),
                this.texture = new O({
                    width: e,
                    height: t,
                    depth: 1
                },i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),
                this.texture.isRenderTargetTexture = !0,
                this.texture.flipY = !1,
                this.texture.generateMipmaps = void 0 !== i.generateMipmaps && i.generateMipmaps,
                this.texture.internalFormat = void 0 !== i.internalFormat ? i.internalFormat : null,
                this.texture.minFilter = void 0 !== i.minFilter ? i.minFilter : 1006,
                this.depthBuffer = void 0 === i.depthBuffer || i.depthBuffer,
                this.stencilBuffer = void 0 !== i.stencilBuffer && i.stencilBuffer,
                this.depthTexture = void 0 !== i.depthTexture ? i.depthTexture : null,
                this.samples = void 0 !== i.samples ? i.samples : 0
        }
        setSize(e, t, i=1) {
            (this.width !== e || this.height !== t || this.depth !== i) && (this.width = e,
                this.height = t,
                this.depth = i,
                this.texture.image.width = e,
                this.texture.image.height = t,
                this.texture.image.depth = i,
                this.dispose()),
                this.viewport.set(0, 0, e, t),
                this.scissor.set(0, 0, e, t)
        }
        clone() {
            return new this.constructor().copy(this)
        }
        copy(e) {
            this.width = e.width,
                this.height = e.height,
                this.depth = e.depth,
                this.viewport.copy(e.viewport),
                this.texture = e.texture.clone(),
                this.texture.isRenderTargetTexture = !0;
            let t = Object.assign({}, e.texture.image);
            return this.texture.source = new D(t),
                this.depthBuffer = e.depthBuffer,
                this.stencilBuffer = e.stencilBuffer,
            null !== e.depthTexture && (this.depthTexture = e.depthTexture.clone()),
                this.samples = e.samples,
                this
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    }
    class F extends O {
        constructor(e=null, t=1, i=1, r=1) {
            super(null),
                this.isDataArrayTexture = !0,
                this.image = {
                    data: e,
                    width: t,
                    height: i,
                    depth: r
                },
                this.magFilter = 1003,
                this.minFilter = 1003,
                this.wrapR = 1001,
                this.generateMipmaps = !1,
                this.flipY = !1,
                this.unpackAlignment = 1
        }
    }
    class k {
        constructor(e=0, t=0, i=0, r=1) {
            this.isQuaternion = !0,
                this._x = e,
                this._y = t,
                this._z = i,
                this._w = r
        }
        static slerp(e, t, i, r) {
            return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),
                i.slerpQuaternions(e, t, r)
        }
        static slerpFlat(e, t, i, r, a, n, s) {
            let o = i[r + 0]
                , l = i[r + 1]
                , h = i[r + 2]
                , c = i[r + 3]
                , d = a[n + 0]
                , u = a[n + 1]
                , p = a[n + 2]
                , f = a[n + 3];
            if (0 === s) {
                e[t + 0] = o,
                    e[t + 1] = l,
                    e[t + 2] = h,
                    e[t + 3] = c;
                return
            }
            if (1 === s) {
                e[t + 0] = d,
                    e[t + 1] = u,
                    e[t + 2] = p,
                    e[t + 3] = f;
                return
            }
            if (c !== f || o !== d || l !== u || h !== p) {
                let e = 1 - s
                    , t = o * d + l * u + h * p + c * f
                    , i = t >= 0 ? 1 : -1
                    , r = 1 - t * t;
                if (r > Number.EPSILON) {
                    let a = Math.sqrt(r)
                        , n = Math.atan2(a, t * i);
                    e = Math.sin(e * n) / a,
                        s = Math.sin(s * n) / a
                }
                let a = s * i;
                if (o = o * e + d * a,
                    l = l * e + u * a,
                    h = h * e + p * a,
                    c = c * e + f * a,
                e === 1 - s) {
                    let e = 1 / Math.sqrt(o * o + l * l + h * h + c * c);
                    o *= e,
                        l *= e,
                        h *= e,
                        c *= e
                }
            }
            e[t] = o,
                e[t + 1] = l,
                e[t + 2] = h,
                e[t + 3] = c
        }
        static multiplyQuaternionsFlat(e, t, i, r, a, n) {
            let s = i[r]
                , o = i[r + 1]
                , l = i[r + 2]
                , h = i[r + 3]
                , c = a[n]
                , d = a[n + 1]
                , u = a[n + 2]
                , p = a[n + 3];
            return e[t] = s * p + h * c + o * u - l * d,
                e[t + 1] = o * p + h * d + l * c - s * u,
                e[t + 2] = l * p + h * u + s * d - o * c,
                e[t + 3] = h * p - s * c - o * d - l * u,
                e
        }
        get x() {
            return this._x
        }
        set x(e) {
            this._x = e,
                this._onChangeCallback()
        }
        get y() {
            return this._y
        }
        set y(e) {
            this._y = e,
                this._onChangeCallback()
        }
        get z() {
            return this._z
        }
        set z(e) {
            this._z = e,
                this._onChangeCallback()
        }
        get w() {
            return this._w
        }
        set w(e) {
            this._w = e,
                this._onChangeCallback()
        }
        set(e, t, i, r) {
            return this._x = e,
                this._y = t,
                this._z = i,
                this._w = r,
                this._onChangeCallback(),
                this
        }
        clone() {
            return new this.constructor(this._x,this._y,this._z,this._w)
        }
        copy(e) {
            return this._x = e.x,
                this._y = e.y,
                this._z = e.z,
                this._w = e.w,
                this._onChangeCallback(),
                this
        }
        setFromEuler(e, t) {
            if (!(e && e.isEuler))
                throw Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
            let i = e._x
                , r = e._y
                , a = e._z
                , n = e._order
                , s = Math.cos
                , o = Math.sin
                , l = s(i / 2)
                , h = s(r / 2)
                , c = s(a / 2)
                , d = o(i / 2)
                , u = o(r / 2)
                , p = o(a / 2);
            switch (n) {
                case "XYZ":
                    this._x = d * h * c + l * u * p,
                        this._y = l * u * c - d * h * p,
                        this._z = l * h * p + d * u * c,
                        this._w = l * h * c - d * u * p;
                    break;
                case "YXZ":
                    this._x = d * h * c + l * u * p,
                        this._y = l * u * c - d * h * p,
                        this._z = l * h * p - d * u * c,
                        this._w = l * h * c + d * u * p;
                    break;
                case "ZXY":
                    this._x = d * h * c - l * u * p,
                        this._y = l * u * c + d * h * p,
                        this._z = l * h * p + d * u * c,
                        this._w = l * h * c - d * u * p;
                    break;
                case "ZYX":
                    this._x = d * h * c - l * u * p,
                        this._y = l * u * c + d * h * p,
                        this._z = l * h * p - d * u * c,
                        this._w = l * h * c + d * u * p;
                    break;
                case "YZX":
                    this._x = d * h * c + l * u * p,
                        this._y = l * u * c + d * h * p,
                        this._z = l * h * p - d * u * c,
                        this._w = l * h * c - d * u * p;
                    break;
                case "XZY":
                    this._x = d * h * c - l * u * p,
                        this._y = l * u * c - d * h * p,
                        this._z = l * h * p + d * u * c,
                        this._w = l * h * c + d * u * p;
                    break;
                default:
                    console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + n)
            }
            return !1 !== t && this._onChangeCallback(),
                this
        }
        setFromAxisAngle(e, t) {
            let i = t / 2
                , r = Math.sin(i);
            return this._x = e.x * r,
                this._y = e.y * r,
                this._z = e.z * r,
                this._w = Math.cos(i),
                this._onChangeCallback(),
                this
        }
        setFromRotationMatrix(e) {
            let t = e.elements
                , i = t[0]
                , r = t[4]
                , a = t[8]
                , n = t[1]
                , s = t[5]
                , o = t[9]
                , l = t[2]
                , h = t[6]
                , c = t[10]
                , d = i + s + c;
            if (d > 0) {
                let e = .5 / Math.sqrt(d + 1);
                this._w = .25 / e,
                    this._x = (h - o) * e,
                    this._y = (a - l) * e,
                    this._z = (n - r) * e
            } else if (i > s && i > c) {
                let e = 2 * Math.sqrt(1 + i - s - c);
                this._w = (h - o) / e,
                    this._x = .25 * e,
                    this._y = (r + n) / e,
                    this._z = (a + l) / e
            } else if (s > c) {
                let e = 2 * Math.sqrt(1 + s - i - c);
                this._w = (a - l) / e,
                    this._x = (r + n) / e,
                    this._y = .25 * e,
                    this._z = (o + h) / e
            } else {
                let e = 2 * Math.sqrt(1 + c - i - s);
                this._w = (n - r) / e,
                    this._x = (a + l) / e,
                    this._y = (o + h) / e,
                    this._z = .25 * e
            }
            return this._onChangeCallback(),
                this
        }
        setFromUnitVectors(e, t) {
            let i = e.dot(t) + 1;
            return i < Number.EPSILON ? (i = 0,
                Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y,
                    this._y = e.x,
                    this._z = 0,
                    this._w = i) : (this._x = 0,
                    this._y = -e.z,
                    this._z = e.y,
                    this._w = i)) : (this._x = e.y * t.z - e.z * t.y,
                this._y = e.z * t.x - e.x * t.z,
                this._z = e.x * t.y - e.y * t.x,
                this._w = i),
                this.normalize()
        }
        angleTo(e) {
            return 2 * Math.acos(Math.abs(p(this.dot(e), -1, 1)))
        }
        rotateTowards(e, t) {
            let i = this.angleTo(e);
            return 0 === i || this.slerp(e, Math.min(1, t / i)),
                this
        }
        identity() {
            return this.set(0, 0, 0, 1)
        }
        invert() {
            return this.conjugate()
        }
        conjugate() {
            return this._x *= -1,
                this._y *= -1,
                this._z *= -1,
                this._onChangeCallback(),
                this
        }
        dot(e) {
            return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w
        }
        lengthSq() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        }
        length() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
        }
        normalize() {
            let e = this.length();
            return 0 === e ? (this._x = 0,
                this._y = 0,
                this._z = 0,
                this._w = 1) : (e = 1 / e,
                this._x = this._x * e,
                this._y = this._y * e,
                this._z = this._z * e,
                this._w = this._w * e),
                this._onChangeCallback(),
                this
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
                this.multiplyQuaternions(e, t)) : this.multiplyQuaternions(this, e)
        }
        premultiply(e) {
            return this.multiplyQuaternions(e, this)
        }
        multiplyQuaternions(e, t) {
            let i = e._x
                , r = e._y
                , a = e._z
                , n = e._w
                , s = t._x
                , o = t._y
                , l = t._z
                , h = t._w;
            return this._x = i * h + n * s + r * l - a * o,
                this._y = r * h + n * o + a * s - i * l,
                this._z = a * h + n * l + i * o - r * s,
                this._w = n * h - i * s - r * o - a * l,
                this._onChangeCallback(),
                this
        }
        slerp(e, t) {
            if (0 === t)
                return this;
            if (1 === t)
                return this.copy(e);
            let i = this._x
                , r = this._y
                , a = this._z
                , n = this._w
                , s = n * e._w + i * e._x + r * e._y + a * e._z;
            if (s < 0 ? (this._w = -e._w,
                this._x = -e._x,
                this._y = -e._y,
                this._z = -e._z,
                s = -s) : this.copy(e),
            s >= 1)
                return this._w = n,
                    this._x = i,
                    this._y = r,
                    this._z = a,
                    this;
            let o = 1 - s * s;
            if (o <= Number.EPSILON) {
                let e = 1 - t;
                return this._w = e * n + t * this._w,
                    this._x = e * i + t * this._x,
                    this._y = e * r + t * this._y,
                    this._z = e * a + t * this._z,
                    this.normalize(),
                    this._onChangeCallback(),
                    this
            }
            let l = Math.sqrt(o)
                , h = Math.atan2(l, s)
                , c = Math.sin((1 - t) * h) / l
                , d = Math.sin(t * h) / l;
            return this._w = n * c + this._w * d,
                this._x = i * c + this._x * d,
                this._y = r * c + this._y * d,
                this._z = a * c + this._z * d,
                this._onChangeCallback(),
                this
        }
        slerpQuaternions(e, t, i) {
            return this.copy(e).slerp(t, i)
        }
        random() {
            let e = Math.random()
                , t = Math.sqrt(1 - e)
                , i = Math.sqrt(e)
                , r = 2 * Math.PI * Math.random()
                , a = 2 * Math.PI * Math.random();
            return this.set(t * Math.cos(r), i * Math.sin(a), i * Math.cos(a), t * Math.sin(r))
        }
        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w
        }
        fromArray(e, t=0) {
            return this._x = e[t],
                this._y = e[t + 1],
                this._z = e[t + 2],
                this._w = e[t + 3],
                this._onChangeCallback(),
                this
        }
        toArray(e=[], t=0) {
            return e[t] = this._x,
                e[t + 1] = this._y,
                e[t + 2] = this._z,
                e[t + 3] = this._w,
                e
        }
        fromBufferAttribute(e, t) {
            return this._x = e.getX(t),
                this._y = e.getY(t),
                this._z = e.getZ(t),
                this._w = e.getW(t),
                this
        }
        _onChange(e) {
            return this._onChangeCallback = e,
                this
        }
        _onChangeCallback() {}
        *[Symbol.iterator]() {
            yield this._x,
                yield this._y,
                yield this._z,
                yield this._w
        }
    }
    class B {
        constructor(e=0, t=0, i=0) {
            B.prototype.isVector3 = !0,
                this.x = e,
                this.y = t,
                this.z = i
        }
        set(e, t, i) {
            return void 0 === i && (i = this.z),
                this.x = e,
                this.y = t,
                this.z = i,
                this
        }
        setScalar(e) {
            return this.x = e,
                this.y = e,
                this.z = e,
                this
        }
        setX(e) {
            return this.x = e,
                this
        }
        setY(e) {
            return this.y = e,
                this
        }
        setZ(e) {
            return this.z = e,
                this
        }
        setComponent(e, t) {
            switch (e) {
                case 0:
                    this.x = t;
                    break;
                case 1:
                    this.y = t;
                    break;
                case 2:
                    this.z = t;
                    break;
                default:
                    throw Error("index is out of range: " + e)
            }
            return this
        }
        getComponent(e) {
            switch (e) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw Error("index is out of range: " + e)
            }
        }
        clone() {
            return new this.constructor(this.x,this.y,this.z)
        }
        copy(e) {
            return this.x = e.x,
                this.y = e.y,
                this.z = e.z,
                this
        }
        add(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                this.addVectors(e, t)) : (this.x += e.x,
                this.y += e.y,
                this.z += e.z,
                this)
        }
        addScalar(e) {
            return this.x += e,
                this.y += e,
                this.z += e,
                this
        }
        addVectors(e, t) {
            return this.x = e.x + t.x,
                this.y = e.y + t.y,
                this.z = e.z + t.z,
                this
        }
        addScaledVector(e, t) {
            return this.x += e.x * t,
                this.y += e.y * t,
                this.z += e.z * t,
                this
        }
        sub(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                this.subVectors(e, t)) : (this.x -= e.x,
                this.y -= e.y,
                this.z -= e.z,
                this)
        }
        subScalar(e) {
            return this.x -= e,
                this.y -= e,
                this.z -= e,
                this
        }
        subVectors(e, t) {
            return this.x = e.x - t.x,
                this.y = e.y - t.y,
                this.z = e.z - t.z,
                this
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
                this.multiplyVectors(e, t)) : (this.x *= e.x,
                this.y *= e.y,
                this.z *= e.z,
                this)
        }
        multiplyScalar(e) {
            return this.x *= e,
                this.y *= e,
                this.z *= e,
                this
        }
        multiplyVectors(e, t) {
            return this.x = e.x * t.x,
                this.y = e.y * t.y,
                this.z = e.z * t.z,
                this
        }
        applyEuler(e) {
            return e && e.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),
                this.applyQuaternion(G.setFromEuler(e))
        }
        applyAxisAngle(e, t) {
            return this.applyQuaternion(G.setFromAxisAngle(e, t))
        }
        applyMatrix3(e) {
            let t = this.x
                , i = this.y
                , r = this.z
                , a = e.elements;
            return this.x = a[0] * t + a[3] * i + a[6] * r,
                this.y = a[1] * t + a[4] * i + a[7] * r,
                this.z = a[2] * t + a[5] * i + a[8] * r,
                this
        }
        applyNormalMatrix(e) {
            return this.applyMatrix3(e).normalize()
        }
        applyMatrix4(e) {
            let t = this.x
                , i = this.y
                , r = this.z
                , a = e.elements
                , n = 1 / (a[3] * t + a[7] * i + a[11] * r + a[15]);
            return this.x = (a[0] * t + a[4] * i + a[8] * r + a[12]) * n,
                this.y = (a[1] * t + a[5] * i + a[9] * r + a[13]) * n,
                this.z = (a[2] * t + a[6] * i + a[10] * r + a[14]) * n,
                this
        }
        applyQuaternion(e) {
            let t = this.x
                , i = this.y
                , r = this.z
                , a = e.x
                , n = e.y
                , s = e.z
                , o = e.w
                , l = o * t + n * r - s * i
                , h = o * i + s * t - a * r
                , c = o * r + a * i - n * t
                , d = -a * t - n * i - s * r;
            return this.x = l * o + -(d * a) + -(h * s) - -(c * n),
                this.y = h * o + -(d * n) + -(c * a) - -(l * s),
                this.z = c * o + -(d * s) + -(l * n) - -(h * a),
                this
        }
        project(e) {
            return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)
        }
        unproject(e) {
            return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)
        }
        transformDirection(e) {
            let t = this.x
                , i = this.y
                , r = this.z
                , a = e.elements;
            return this.x = a[0] * t + a[4] * i + a[8] * r,
                this.y = a[1] * t + a[5] * i + a[9] * r,
                this.z = a[2] * t + a[6] * i + a[10] * r,
                this.normalize()
        }
        divide(e) {
            return this.x /= e.x,
                this.y /= e.y,
                this.z /= e.z,
                this
        }
        divideScalar(e) {
            return this.multiplyScalar(1 / e)
        }
        min(e) {
            return this.x = Math.min(this.x, e.x),
                this.y = Math.min(this.y, e.y),
                this.z = Math.min(this.z, e.z),
                this
        }
        max(e) {
            return this.x = Math.max(this.x, e.x),
                this.y = Math.max(this.y, e.y),
                this.z = Math.max(this.z, e.z),
                this
        }
        clamp(e, t) {
            return this.x = Math.max(e.x, Math.min(t.x, this.x)),
                this.y = Math.max(e.y, Math.min(t.y, this.y)),
                this.z = Math.max(e.z, Math.min(t.z, this.z)),
                this
        }
        clampScalar(e, t) {
            return this.x = Math.max(e, Math.min(t, this.x)),
                this.y = Math.max(e, Math.min(t, this.y)),
                this.z = Math.max(e, Math.min(t, this.z)),
                this
        }
        clampLength(e, t) {
            let i = this.length();
            return this.divideScalar(i || 1).multiplyScalar(Math.max(e, Math.min(t, i)))
        }
        floor() {
            return this.x = Math.floor(this.x),
                this.y = Math.floor(this.y),
                this.z = Math.floor(this.z),
                this
        }
        ceil() {
            return this.x = Math.ceil(this.x),
                this.y = Math.ceil(this.y),
                this.z = Math.ceil(this.z),
                this
        }
        round() {
            return this.x = Math.round(this.x),
                this.y = Math.round(this.y),
                this.z = Math.round(this.z),
                this
        }
        roundToZero() {
            return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
                this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
                this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
                this
        }
        negate() {
            return this.x = -this.x,
                this.y = -this.y,
                this.z = -this.z,
                this
        }
        dot(e) {
            return this.x * e.x + this.y * e.y + this.z * e.z
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        }
        manhattanLength() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
        }
        normalize() {
            return this.divideScalar(this.length() || 1)
        }
        setLength(e) {
            return this.normalize().multiplyScalar(e)
        }
        lerp(e, t) {
            return this.x += (e.x - this.x) * t,
                this.y += (e.y - this.y) * t,
                this.z += (e.z - this.z) * t,
                this
        }
        lerpVectors(e, t, i) {
            return this.x = e.x + (t.x - e.x) * i,
                this.y = e.y + (t.y - e.y) * i,
                this.z = e.z + (t.z - e.z) * i,
                this
        }
        cross(e, t) {
            return void 0 !== t ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
                this.crossVectors(e, t)) : this.crossVectors(this, e)
        }
        crossVectors(e, t) {
            let i = e.x
                , r = e.y
                , a = e.z
                , n = t.x
                , s = t.y
                , o = t.z;
            return this.x = r * o - a * s,
                this.y = a * n - i * o,
                this.z = i * s - r * n,
                this
        }
        projectOnVector(e) {
            let t = e.lengthSq();
            if (0 === t)
                return this.set(0, 0, 0);
            let i = e.dot(this) / t;
            return this.copy(e).multiplyScalar(i)
        }
        projectOnPlane(e) {
            return H.copy(this).projectOnVector(e),
                this.sub(H)
        }
        reflect(e) {
            return this.sub(H.copy(e).multiplyScalar(2 * this.dot(e)))
        }
        angleTo(e) {
            let t = Math.sqrt(this.lengthSq() * e.lengthSq());
            if (0 === t)
                return Math.PI / 2;
            let i = this.dot(e) / t;
            return Math.acos(p(i, -1, 1))
        }
        distanceTo(e) {
            return Math.sqrt(this.distanceToSquared(e))
        }
        distanceToSquared(e) {
            let t = this.x - e.x
                , i = this.y - e.y
                , r = this.z - e.z;
            return t * t + i * i + r * r
        }
        manhattanDistanceTo(e) {
            return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z)
        }
        setFromSpherical(e) {
            return this.setFromSphericalCoords(e.radius, e.phi, e.theta)
        }
        setFromSphericalCoords(e, t, i) {
            let r = Math.sin(t) * e;
            return this.x = r * Math.sin(i),
                this.y = Math.cos(t) * e,
                this.z = r * Math.cos(i),
                this
        }
        setFromCylindrical(e) {
            return this.setFromCylindricalCoords(e.radius, e.theta, e.y)
        }
        setFromCylindricalCoords(e, t, i) {
            return this.x = e * Math.sin(t),
                this.y = i,
                this.z = e * Math.cos(t),
                this
        }
        setFromMatrixPosition(e) {
            let t = e.elements;
            return this.x = t[12],
                this.y = t[13],
                this.z = t[14],
                this
        }
        setFromMatrixScale(e) {
            let t = this.setFromMatrixColumn(e, 0).length()
                , i = this.setFromMatrixColumn(e, 1).length()
                , r = this.setFromMatrixColumn(e, 2).length();
            return this.x = t,
                this.y = i,
                this.z = r,
                this
        }
        setFromMatrixColumn(e, t) {
            return this.fromArray(e.elements, 4 * t)
        }
        setFromMatrix3Column(e, t) {
            return this.fromArray(e.elements, 3 * t)
        }
        setFromEuler(e) {
            return this.x = e._x,
                this.y = e._y,
                this.z = e._z,
                this
        }
        equals(e) {
            return e.x === this.x && e.y === this.y && e.z === this.z
        }
        fromArray(e, t=0) {
            return this.x = e[t],
                this.y = e[t + 1],
                this.z = e[t + 2],
                this
        }
        toArray(e=[], t=0) {
            return e[t] = this.x,
                e[t + 1] = this.y,
                e[t + 2] = this.z,
                e
        }
        fromBufferAttribute(e, t, i) {
            return void 0 !== i && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),
                this.x = e.getX(t),
                this.y = e.getY(t),
                this.z = e.getZ(t),
                this
        }
        random() {
            return this.x = Math.random(),
                this.y = Math.random(),
                this.z = Math.random(),
                this
        }
        randomDirection() {
            let e = (Math.random() - .5) * 2
                , t = Math.random() * Math.PI * 2
                , i = Math.sqrt(1 - e ** 2);
            return this.x = i * Math.cos(t),
                this.y = i * Math.sin(t),
                this.z = e,
                this
        }
        *[Symbol.iterator]() {
            yield this.x,
                yield this.y,
                yield this.z
        }
    }
    let H = new B
        , G = new k;
    class V {
        constructor(e=new B(Infinity,Infinity,Infinity), t=new B(-1 / 0,-1 / 0,-1 / 0)) {
            this.isBox3 = !0,
                this.min = e,
                this.max = t
        }
        set(e, t) {
            return this.min.copy(e),
                this.max.copy(t),
                this
        }
        setFromArray(e) {
            let t = Infinity
                , i = Infinity
                , r = Infinity
                , a = -1 / 0
                , n = -1 / 0
                , s = -1 / 0;
            for (let o = 0, l = e.length; o < l; o += 3) {
                let l = e[o]
                    , h = e[o + 1]
                    , c = e[o + 2];
                l < t && (t = l),
                h < i && (i = h),
                c < r && (r = c),
                l > a && (a = l),
                h > n && (n = h),
                c > s && (s = c)
            }
            return this.min.set(t, i, r),
                this.max.set(a, n, s),
                this
        }
        setFromBufferAttribute(e) {
            let t = Infinity
                , i = Infinity
                , r = Infinity
                , a = -1 / 0
                , n = -1 / 0
                , s = -1 / 0;
            for (let o = 0, l = e.count; o < l; o++) {
                let l = e.getX(o)
                    , h = e.getY(o)
                    , c = e.getZ(o);
                l < t && (t = l),
                h < i && (i = h),
                c < r && (r = c),
                l > a && (a = l),
                h > n && (n = h),
                c > s && (s = c)
            }
            return this.min.set(t, i, r),
                this.max.set(a, n, s),
                this
        }
        setFromPoints(e) {
            this.makeEmpty();
            for (let t = 0, i = e.length; t < i; t++)
                this.expandByPoint(e[t]);
            return this
        }
        setFromCenterAndSize(e, t) {
            let i = j.copy(t).multiplyScalar(.5);
            return this.min.copy(e).sub(i),
                this.max.copy(e).add(i),
                this
        }
        setFromObject(e, t=!1) {
            return this.makeEmpty(),
                this.expandByObject(e, t)
        }
        clone() {
            return new this.constructor().copy(this)
        }
        copy(e) {
            return this.min.copy(e.min),
                this.max.copy(e.max),
                this
        }
        makeEmpty() {
            return this.min.x = this.min.y = this.min.z = Infinity,
                this.max.x = this.max.y = this.max.z = -1 / 0,
                this
        }
        isEmpty() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        }
        getCenter(e) {
            return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5)
        }
        getSize(e) {
            return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min)
        }
        expandByPoint(e) {
            return this.min.min(e),
                this.max.max(e),
                this
        }
        expandByVector(e) {
            return this.min.sub(e),
                this.max.add(e),
                this
        }
        expandByScalar(e) {
            return this.min.addScalar(-e),
                this.max.addScalar(e),
                this
        }
        expandByObject(e, t=!1) {
            e.updateWorldMatrix(!1, !1);
            let i = e.geometry;
            if (void 0 !== i) {
                if (t && void 0 != i.attributes && void 0 !== i.attributes.position) {
                    let t = i.attributes.position;
                    for (let i = 0, r = t.count; i < r; i++)
                        j.fromBufferAttribute(t, i).applyMatrix4(e.matrixWorld),
                            this.expandByPoint(j)
                } else
                    null === i.boundingBox && i.computeBoundingBox(),
                        q.copy(i.boundingBox),
                        q.applyMatrix4(e.matrixWorld),
                        this.union(q)
            }
            let r = e.children;
            for (let e = 0, i = r.length; e < i; e++)
                this.expandByObject(r[e], t);
            return this
        }
        containsPoint(e) {
            return !(e.x < this.min.x) && !(e.x > this.max.x) && !(e.y < this.min.y) && !(e.y > this.max.y) && !(e.z < this.min.z) && !(e.z > this.max.z)
        }
        containsBox(e) {
            return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z
        }
        getParameter(e, t) {
            return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z))
        }
        intersectsBox(e) {
            return !(e.max.x < this.min.x) && !(e.min.x > this.max.x) && !(e.max.y < this.min.y) && !(e.min.y > this.max.y) && !(e.max.z < this.min.z) && !(e.min.z > this.max.z)
        }
        intersectsSphere(e) {
            return this.clampPoint(e.center, j),
            j.distanceToSquared(e.center) <= e.radius * e.radius
        }
        intersectsPlane(e) {
            let t, i;
            return e.normal.x > 0 ? (t = e.normal.x * this.min.x,
                i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x,
                i = e.normal.x * this.min.x),
                e.normal.y > 0 ? (t += e.normal.y * this.min.y,
                    i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y,
                    i += e.normal.y * this.min.y),
                e.normal.z > 0 ? (t += e.normal.z * this.min.z,
                    i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z,
                    i += e.normal.z * this.min.z),
            t <= -e.constant && i >= -e.constant
        }
        intersectsTriangle(e) {
            if (this.isEmpty())
                return !1;
            this.getCenter($),
                ee.subVectors(this.max, $),
                X.subVectors(e.a, $),
                Y.subVectors(e.b, $),
                Z.subVectors(e.c, $),
                J.subVectors(Y, X),
                K.subVectors(Z, Y),
                Q.subVectors(X, Z);
            let t = [0, -J.z, J.y, 0, -K.z, K.y, 0, -Q.z, Q.y, J.z, 0, -J.x, K.z, 0, -K.x, Q.z, 0, -Q.x, -J.y, J.x, 0, -K.y, K.x, 0, -Q.y, Q.x, 0];
            return !!(er(t, X, Y, Z, ee) && er(t = [1, 0, 0, 0, 1, 0, 0, 0, 1], X, Y, Z, ee)) && (et.crossVectors(J, K),
                er(t = [et.x, et.y, et.z], X, Y, Z, ee))
        }
        clampPoint(e, t) {
            return t.copy(e).clamp(this.min, this.max)
        }
        distanceToPoint(e) {
            let t = j.copy(e).clamp(this.min, this.max);
            return t.sub(e).length()
        }
        getBoundingSphere(e) {
            return this.getCenter(e.center),
                e.radius = .5 * this.getSize(j).length(),
                e
        }
        intersect(e) {
            return this.min.max(e.min),
                this.max.min(e.max),
            this.isEmpty() && this.makeEmpty(),
                this
        }
        union(e) {
            return this.min.min(e.min),
                this.max.max(e.max),
                this
        }
        applyMatrix4(e) {
            return this.isEmpty() || (W[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
                W[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
                W[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
                W[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
                W[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
                W[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
                W[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
                W[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
                this.setFromPoints(W)),
                this
        }
        translate(e) {
            return this.min.add(e),
                this.max.add(e),
                this
        }
        equals(e) {
            return e.min.equals(this.min) && e.max.equals(this.max)
        }
    }
    let W = [new B, new B, new B, new B, new B, new B, new B, new B]
        , j = new B
        , q = new V
        , X = new B
        , Y = new B
        , Z = new B
        , J = new B
        , K = new B
        , Q = new B
        , $ = new B
        , ee = new B
        , et = new B
        , ei = new B;
    function er(e, t, i, r, a) {
        for (let n = 0, s = e.length - 3; n <= s; n += 3) {
            ei.fromArray(e, n);
            let s = a.x * Math.abs(ei.x) + a.y * Math.abs(ei.y) + a.z * Math.abs(ei.z)
                , o = t.dot(ei)
                , l = i.dot(ei)
                , h = r.dot(ei);
            if (Math.max(-Math.max(o, l, h), Math.min(o, l, h)) > s)
                return !1
        }
        return !0
    }
    let ea = new V
        , en = new B
        , es = new B
        , eo = new B;
    class el {
        constructor(e=new B, t=-1) {
            this.center = e,
                this.radius = t
        }
        set(e, t) {
            return this.center.copy(e),
                this.radius = t,
                this
        }
        setFromPoints(e, t) {
            let i = this.center;
            void 0 !== t ? i.copy(t) : ea.setFromPoints(e).getCenter(i);
            let r = 0;
            for (let t = 0, a = e.length; t < a; t++)
                r = Math.max(r, i.distanceToSquared(e[t]));
            return this.radius = Math.sqrt(r),
                this
        }
        copy(e) {
            return this.center.copy(e.center),
                this.radius = e.radius,
                this
        }
        isEmpty() {
            return this.radius < 0
        }
        makeEmpty() {
            return this.center.set(0, 0, 0),
                this.radius = -1,
                this
        }
        containsPoint(e) {
            return e.distanceToSquared(this.center) <= this.radius * this.radius
        }
        distanceToPoint(e) {
            return e.distanceTo(this.center) - this.radius
        }
        intersectsSphere(e) {
            let t = this.radius + e.radius;
            return e.center.distanceToSquared(this.center) <= t * t
        }
        intersectsBox(e) {
            return e.intersectsSphere(this)
        }
        intersectsPlane(e) {
            return Math.abs(e.distanceToPoint(this.center)) <= this.radius
        }
        clampPoint(e, t) {
            let i = this.center.distanceToSquared(e);
            return t.copy(e),
            i > this.radius * this.radius && (t.sub(this.center).normalize(),
                t.multiplyScalar(this.radius).add(this.center)),
                t
        }
        getBoundingBox(e) {
            return this.isEmpty() ? (e.makeEmpty(),
                e) : (e.set(this.center, this.center),
                e.expandByScalar(this.radius),
                e)
        }
        applyMatrix4(e) {
            return this.center.applyMatrix4(e),
                this.radius = this.radius * e.getMaxScaleOnAxis(),
                this
        }
        translate(e) {
            return this.center.add(e),
                this
        }
        expandByPoint(e) {
            eo.subVectors(e, this.center);
            let t = eo.lengthSq();
            if (t > this.radius * this.radius) {
                let e = Math.sqrt(t)
                    , i = (e - this.radius) * .5;
                this.center.add(eo.multiplyScalar(i / e)),
                    this.radius += i
            }
            return this
        }
        union(e) {
            return !0 === this.center.equals(e.center) ? es.set(0, 0, 1).multiplyScalar(e.radius) : es.subVectors(e.center, this.center).normalize().multiplyScalar(e.radius),
                this.expandByPoint(en.copy(e.center).add(es)),
                this.expandByPoint(en.copy(e.center).sub(es)),
                this
        }
        equals(e) {
            return e.center.equals(this.center) && e.radius === this.radius
        }
        clone() {
            return new this.constructor().copy(this)
        }
    }
    let eh = new B
        , ec = new B
        , ed = new B
        , eu = new B
        , ep = new B
        , ef = new B
        , em = new B;
    class eg {
        constructor() {
            eg.prototype.isMatrix4 = !0,
                this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
        }
        set(e, t, i, r, a, n, s, o, l, h, c, d, u, p, f, m) {
            let g = this.elements;
            return g[0] = e,
                g[4] = t,
                g[8] = i,
                g[12] = r,
                g[1] = a,
                g[5] = n,
                g[9] = s,
                g[13] = o,
                g[2] = l,
                g[6] = h,
                g[10] = c,
                g[14] = d,
                g[3] = u,
                g[7] = p,
                g[11] = f,
                g[15] = m,
                this
        }
        identity() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this
        }
        clone() {
            return new eg().fromArray(this.elements)
        }
        copy(e) {
            let t = this.elements
                , i = e.elements;
            return t[0] = i[0],
                t[1] = i[1],
                t[2] = i[2],
                t[3] = i[3],
                t[4] = i[4],
                t[5] = i[5],
                t[6] = i[6],
                t[7] = i[7],
                t[8] = i[8],
                t[9] = i[9],
                t[10] = i[10],
                t[11] = i[11],
                t[12] = i[12],
                t[13] = i[13],
                t[14] = i[14],
                t[15] = i[15],
                this
        }
        copyPosition(e) {
            let t = this.elements
                , i = e.elements;
            return t[12] = i[12],
                t[13] = i[13],
                t[14] = i[14],
                this
        }
        setFromMatrix3(e) {
            let t = e.elements;
            return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1),
                this
        }
        extractBasis(e, t, i) {
            return e.setFromMatrixColumn(this, 0),
                t.setFromMatrixColumn(this, 1),
                i.setFromMatrixColumn(this, 2),
                this
        }
        makeBasis(e, t, i) {
            return this.set(e.x, t.x, i.x, 0, e.y, t.y, i.y, 0, e.z, t.z, i.z, 0, 0, 0, 0, 1),
                this
        }
        extractRotation(e) {
            let t = this.elements
                , i = e.elements
                , r = 1 / ev.setFromMatrixColumn(e, 0).length()
                , a = 1 / ev.setFromMatrixColumn(e, 1).length()
                , n = 1 / ev.setFromMatrixColumn(e, 2).length();
            return t[0] = i[0] * r,
                t[1] = i[1] * r,
                t[2] = i[2] * r,
                t[3] = 0,
                t[4] = i[4] * a,
                t[5] = i[5] * a,
                t[6] = i[6] * a,
                t[7] = 0,
                t[8] = i[8] * n,
                t[9] = i[9] * n,
                t[10] = i[10] * n,
                t[11] = 0,
                t[12] = 0,
                t[13] = 0,
                t[14] = 0,
                t[15] = 1,
                this
        }
        makeRotationFromEuler(e) {
            e && e.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            let t = this.elements
                , i = e.x
                , r = e.y
                , a = e.z
                , n = Math.cos(i)
                , s = Math.sin(i)
                , o = Math.cos(r)
                , l = Math.sin(r)
                , h = Math.cos(a)
                , c = Math.sin(a);
            if ("XYZ" === e.order) {
                let e = n * h
                    , i = n * c
                    , r = s * h
                    , a = s * c;
                t[0] = o * h,
                    t[4] = -o * c,
                    t[8] = l,
                    t[1] = i + r * l,
                    t[5] = e - a * l,
                    t[9] = -s * o,
                    t[2] = a - e * l,
                    t[6] = r + i * l,
                    t[10] = n * o
            } else if ("YXZ" === e.order) {
                let e = o * h
                    , i = o * c
                    , r = l * h
                    , a = l * c;
                t[0] = e + a * s,
                    t[4] = r * s - i,
                    t[8] = n * l,
                    t[1] = n * c,
                    t[5] = n * h,
                    t[9] = -s,
                    t[2] = i * s - r,
                    t[6] = a + e * s,
                    t[10] = n * o
            } else if ("ZXY" === e.order) {
                let e = o * h
                    , i = o * c
                    , r = l * h
                    , a = l * c;
                t[0] = e - a * s,
                    t[4] = -n * c,
                    t[8] = r + i * s,
                    t[1] = i + r * s,
                    t[5] = n * h,
                    t[9] = a - e * s,
                    t[2] = -n * l,
                    t[6] = s,
                    t[10] = n * o
            } else if ("ZYX" === e.order) {
                let e = n * h
                    , i = n * c
                    , r = s * h
                    , a = s * c;
                t[0] = o * h,
                    t[4] = r * l - i,
                    t[8] = e * l + a,
                    t[1] = o * c,
                    t[5] = a * l + e,
                    t[9] = i * l - r,
                    t[2] = -l,
                    t[6] = s * o,
                    t[10] = n * o
            } else if ("YZX" === e.order) {
                let e = n * o
                    , i = n * l
                    , r = s * o
                    , a = s * l;
                t[0] = o * h,
                    t[4] = a - e * c,
                    t[8] = r * c + i,
                    t[1] = c,
                    t[5] = n * h,
                    t[9] = -s * h,
                    t[2] = -l * h,
                    t[6] = i * c + r,
                    t[10] = e - a * c
            } else if ("XZY" === e.order) {
                let e = n * o
                    , i = n * l
                    , r = s * o
                    , a = s * l;
                t[0] = o * h,
                    t[4] = -c,
                    t[8] = l * h,
                    t[1] = e * c + a,
                    t[5] = n * h,
                    t[9] = i * c - r,
                    t[2] = r * c - i,
                    t[6] = s * h,
                    t[10] = a * c + e
            }
            return t[3] = 0,
                t[7] = 0,
                t[11] = 0,
                t[12] = 0,
                t[13] = 0,
                t[14] = 0,
                t[15] = 1,
                this
        }
        makeRotationFromQuaternion(e) {
            return this.compose(ex, e, ey)
        }
        lookAt(e, t, i) {
            let r = this.elements;
            return eS.subVectors(e, t),
            0 === eS.lengthSq() && (eS.z = 1),
                eS.normalize(),
                eM.crossVectors(i, eS),
            0 === eM.lengthSq() && (1 === Math.abs(i.z) ? eS.x += 1e-4 : eS.z += 1e-4,
                eS.normalize(),
                eM.crossVectors(i, eS)),
                eM.normalize(),
                eb.crossVectors(eS, eM),
                r[0] = eM.x,
                r[4] = eb.x,
                r[8] = eS.x,
                r[1] = eM.y,
                r[5] = eb.y,
                r[9] = eS.y,
                r[2] = eM.z,
                r[6] = eb.z,
                r[10] = eS.z,
                this
        }
        multiply(e, t) {
            return void 0 !== t ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
                this.multiplyMatrices(e, t)) : this.multiplyMatrices(this, e)
        }
        premultiply(e) {
            return this.multiplyMatrices(e, this)
        }
        multiplyMatrices(e, t) {
            let i = e.elements
                , r = t.elements
                , a = this.elements
                , n = i[0]
                , s = i[4]
                , o = i[8]
                , l = i[12]
                , h = i[1]
                , c = i[5]
                , d = i[9]
                , u = i[13]
                , p = i[2]
                , f = i[6]
                , m = i[10]
                , g = i[14]
                , v = i[3]
                , _ = i[7]
                , x = i[11]
                , y = i[15]
                , M = r[0]
                , b = r[4]
                , S = r[8]
                , w = r[12]
                , T = r[1]
                , E = r[5]
                , A = r[9]
                , C = r[13]
                , L = r[2]
                , P = r[6]
                , R = r[10]
                , D = r[14]
                , I = r[3]
                , N = r[7]
                , O = r[11]
                , z = r[15];
            return a[0] = n * M + s * T + o * L + l * I,
                a[4] = n * b + s * E + o * P + l * N,
                a[8] = n * S + s * A + o * R + l * O,
                a[12] = n * w + s * C + o * D + l * z,
                a[1] = h * M + c * T + d * L + u * I,
                a[5] = h * b + c * E + d * P + u * N,
                a[9] = h * S + c * A + d * R + u * O,
                a[13] = h * w + c * C + d * D + u * z,
                a[2] = p * M + f * T + m * L + g * I,
                a[6] = p * b + f * E + m * P + g * N,
                a[10] = p * S + f * A + m * R + g * O,
                a[14] = p * w + f * C + m * D + g * z,
                a[3] = v * M + _ * T + x * L + y * I,
                a[7] = v * b + _ * E + x * P + y * N,
                a[11] = v * S + _ * A + x * R + y * O,
                a[15] = v * w + _ * C + x * D + y * z,
                this
        }
        multiplyScalar(e) {
            let t = this.elements;
            return t[0] *= e,
                t[4] *= e,
                t[8] *= e,
                t[12] *= e,
                t[1] *= e,
                t[5] *= e,
                t[9] *= e,
                t[13] *= e,
                t[2] *= e,
                t[6] *= e,
                t[10] *= e,
                t[14] *= e,
                t[3] *= e,
                t[7] *= e,
                t[11] *= e,
                t[15] *= e,
                this
        }
        determinant() {
            let e = this.elements
                , t = e[0]
                , i = e[4]
                , r = e[8]
                , a = e[12]
                , n = e[1]
                , s = e[5]
                , o = e[9]
                , l = e[13]
                , h = e[2]
                , c = e[6]
                , d = e[10]
                , u = e[14]
                , p = e[3]
                , f = e[7]
                , m = e[11]
                , g = e[15];
            return p * (+a * o * c - r * l * c - a * s * d + i * l * d + r * s * u - i * o * u) + f * (+t * o * u - t * l * d + a * n * d - r * n * u + r * l * h - a * o * h) + m * (+t * l * c - t * s * u - a * n * c + i * n * u + a * s * h - i * l * h) + g * (-r * s * h - t * o * c + t * s * d + r * n * c - i * n * d + i * o * h)
        }
        transpose() {
            let e;
            let t = this.elements;
            return e = t[1],
                t[1] = t[4],
                t[4] = e,
                e = t[2],
                t[2] = t[8],
                t[8] = e,
                e = t[6],
                t[6] = t[9],
                t[9] = e,
                e = t[3],
                t[3] = t[12],
                t[12] = e,
                e = t[7],
                t[7] = t[13],
                t[13] = e,
                e = t[11],
                t[11] = t[14],
                t[14] = e,
                this
        }
        setPosition(e, t, i) {
            let r = this.elements;
            return e.isVector3 ? (r[12] = e.x,
                r[13] = e.y,
                r[14] = e.z) : (r[12] = e,
                r[13] = t,
                r[14] = i),
                this
        }
        invert() {
            let e = this.elements
                , t = e[0]
                , i = e[1]
                , r = e[2]
                , a = e[3]
                , n = e[4]
                , s = e[5]
                , o = e[6]
                , l = e[7]
                , h = e[8]
                , c = e[9]
                , d = e[10]
                , u = e[11]
                , p = e[12]
                , f = e[13]
                , m = e[14]
                , g = e[15]
                , v = c * m * l - f * d * l + f * o * u - s * m * u - c * o * g + s * d * g
                , _ = p * d * l - h * m * l - p * o * u + n * m * u + h * o * g - n * d * g
                , x = h * f * l - p * c * l + p * s * u - n * f * u - h * s * g + n * c * g
                , y = p * c * o - h * f * o - p * s * d + n * f * d + h * s * m - n * c * m
                , M = t * v + i * _ + r * x + a * y;
            if (0 === M)
                return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            let b = 1 / M;
            return e[0] = v * b,
                e[1] = (f * d * a - c * m * a - f * r * u + i * m * u + c * r * g - i * d * g) * b,
                e[2] = (s * m * a - f * o * a + f * r * l - i * m * l - s * r * g + i * o * g) * b,
                e[3] = (c * o * a - s * d * a - c * r * l + i * d * l + s * r * u - i * o * u) * b,
                e[4] = _ * b,
                e[5] = (h * m * a - p * d * a + p * r * u - t * m * u - h * r * g + t * d * g) * b,
                e[6] = (p * o * a - n * m * a - p * r * l + t * m * l + n * r * g - t * o * g) * b,
                e[7] = (n * d * a - h * o * a + h * r * l - t * d * l - n * r * u + t * o * u) * b,
                e[8] = x * b,
                e[9] = (p * c * a - h * f * a - p * i * u + t * f * u + h * i * g - t * c * g) * b,
                e[10] = (n * f * a - p * s * a + p * i * l - t * f * l - n * i * g + t * s * g) * b,
                e[11] = (h * s * a - n * c * a - h * i * l + t * c * l + n * i * u - t * s * u) * b,
                e[12] = y * b,
                e[13] = (h * f * r - p * c * r + p * i * d - t * f * d - h * i * m + t * c * m) * b,
                e[14] = (p * s * r - n * f * r - p * i * o + t * f * o + n * i * m - t * s * m) * b,
                e[15] = (n * c * r - h * s * r + h * i * o - t * c * o - n * i * d + t * s * d) * b,
                this
        }
        scale(e) {
            let t = this.elements
                , i = e.x
                , r = e.y
                , a = e.z;
            return t[0] *= i,
                t[4] *= r,
                t[8] *= a,
                t[1] *= i,
                t[5] *= r,
                t[9] *= a,
                t[2] *= i,
                t[6] *= r,
                t[10] *= a,
                t[3] *= i,
                t[7] *= r,
                t[11] *= a,
                this
        }
        getMaxScaleOnAxis() {
            let e = this.elements
                , t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2]
                , i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6]
                , r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
            return Math.sqrt(Math.max(t, i, r))
        }
        makeTranslation(e, t, i) {
            return this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, i, 0, 0, 0, 1),
                this
        }
        makeRotationX(e) {
            let t = Math.cos(e)
                , i = Math.sin(e);
            return this.set(1, 0, 0, 0, 0, t, -i, 0, 0, i, t, 0, 0, 0, 0, 1),
                this
        }
        makeRotationY(e) {
            let t = Math.cos(e)
                , i = Math.sin(e);
            return this.set(t, 0, i, 0, 0, 1, 0, 0, -i, 0, t, 0, 0, 0, 0, 1),
                this
        }
        makeRotationZ(e) {
            let t = Math.cos(e)
                , i = Math.sin(e);
            return this.set(t, -i, 0, 0, i, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                this
        }
        makeRotationAxis(e, t) {
            let i = Math.cos(t)
                , r = Math.sin(t)
                , a = 1 - i
                , n = e.x
                , s = e.y
                , o = e.z
                , l = a * n
                , h = a * s;
            return this.set(l * n + i, l * s - r * o, l * o + r * s, 0, l * s + r * o, h * s + i, h * o - r * n, 0, l * o - r * s, h * o + r * n, a * o * o + i, 0, 0, 0, 0, 1),
                this
        }
        makeScale(e, t, i) {
            return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, i, 0, 0, 0, 0, 1),
                this
        }
        makeShear(e, t, i, r, a, n) {
            return this.set(1, i, a, 0, e, 1, n, 0, t, r, 1, 0, 0, 0, 0, 1),
                this
        }
        compose(e, t, i) {
            let r = this.elements
                , a = t._x
                , n = t._y
                , s = t._z
                , o = t._w
                , l = a + a
                , h = n + n
                , c = s + s
                , d = a * l
                , u = a * h
                , p = a * c
                , f = n * h
                , m = n * c
                , g = s * c
                , v = o * l
                , _ = o * h
                , x = o * c
                , y = i.x
                , M = i.y
                , b = i.z;
            return r[0] = (1 - (f + g)) * y,
                r[1] = (u + x) * y,
                r[2] = (p - _) * y,
                r[3] = 0,
                r[4] = (u - x) * M,
                r[5] = (1 - (d + g)) * M,
                r[6] = (m + v) * M,
                r[7] = 0,
                r[8] = (p + _) * b,
                r[9] = (m - v) * b,
                r[10] = (1 - (d + f)) * b,
                r[11] = 0,
                r[12] = e.x,
                r[13] = e.y,
                r[14] = e.z,
                r[15] = 1,
                this
        }
        decompose(e, t, i) {
            let r = this.elements
                , a = ev.set(r[0], r[1], r[2]).length()
                , n = ev.set(r[4], r[5], r[6]).length()
                , s = ev.set(r[8], r[9], r[10]).length()
                , o = this.determinant();
            o < 0 && (a = -a),
                e.x = r[12],
                e.y = r[13],
                e.z = r[14],
                e_.copy(this);
            let l = 1 / a
                , h = 1 / n
                , c = 1 / s;
            return e_.elements[0] *= l,
                e_.elements[1] *= l,
                e_.elements[2] *= l,
                e_.elements[4] *= h,
                e_.elements[5] *= h,
                e_.elements[6] *= h,
                e_.elements[8] *= c,
                e_.elements[9] *= c,
                e_.elements[10] *= c,
                t.setFromRotationMatrix(e_),
                i.x = a,
                i.y = n,
                i.z = s,
                this
        }
        makePerspective(e, t, i, r, a, n) {
            void 0 === n && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
            let s = this.elements;
            return s[0] = 2 * a / (t - e),
                s[4] = 0,
                s[8] = (t + e) / (t - e),
                s[12] = 0,
                s[1] = 0,
                s[5] = 2 * a / (i - r),
                s[9] = (i + r) / (i - r),
                s[13] = 0,
                s[2] = 0,
                s[6] = 0,
                s[10] = -(n + a) / (n - a),
                s[14] = -2 * n * a / (n - a),
                s[3] = 0,
                s[7] = 0,
                s[11] = -1,
                s[15] = 0,
                this
        }
        makeOrthographic(e, t, i, r, a, n) {
            let s = this.elements
                , o = 1 / (t - e)
                , l = 1 / (i - r)
                , h = 1 / (n - a);
            return s[0] = 2 * o,
                s[4] = 0,
                s[8] = 0,
                s[12] = -((t + e) * o),
                s[1] = 0,
                s[5] = 2 * l,
                s[9] = 0,
                s[13] = -((i + r) * l),
                s[2] = 0,
                s[6] = 0,
                s[10] = -2 * h,
                s[14] = -((n + a) * h),
                s[3] = 0,
                s[7] = 0,
                s[11] = 0,
                s[15] = 1,
                this
        }
        equals(e) {
            let t = this.elements
                , i = e.elements;
            for (let e = 0; e < 16; e++)
                if (t[e] !== i[e])
                    return !1;
            return !0
        }
        fromArray(e, t=0) {
            for (let i = 0; i < 16; i++)
                this.elements[i] = e[i + t];
            return this
        }
        toArray(e=[], t=0) {
            let i = this.elements;
            return e[t] = i[0],
                e[t + 1] = i[1],
                e[t + 2] = i[2],
                e[t + 3] = i[3],
                e[t + 4] = i[4],
                e[t + 5] = i[5],
                e[t + 6] = i[6],
                e[t + 7] = i[7],
                e[t + 8] = i[8],
                e[t + 9] = i[9],
                e[t + 10] = i[10],
                e[t + 11] = i[11],
                e[t + 12] = i[12],
                e[t + 13] = i[13],
                e[t + 14] = i[14],
                e[t + 15] = i[15],
                e
        }
    }
    let ev = new B
        , e_ = new eg
        , ex = new B(0,0,0)
        , ey = new B(1,1,1)
        , eM = new B
        , eb = new B
        , eS = new B
        , ew = new eg
        , eT = new k;
    class eE {
        constructor(e=0, t=0, i=0, r=eE.DefaultOrder) {
            this.isEuler = !0,
                this._x = e,
                this._y = t,
                this._z = i,
                this._order = r
        }
        get x() {
            return this._x
        }
        set x(e) {
            this._x = e,
                this._onChangeCallback()
        }
        get y() {
            return this._y
        }
        set y(e) {
            this._y = e,
                this._onChangeCallback()
        }
        get z() {
            return this._z
        }
        set z(e) {
            this._z = e,
                this._onChangeCallback()
        }
        get order() {
            return this._order
        }
        set order(e) {
            this._order = e,
                this._onChangeCallback()
        }
        set(e, t, i, r=this._order) {
            return this._x = e,
                this._y = t,
                this._z = i,
                this._order = r,
                this._onChangeCallback(),
                this
        }
        clone() {
            return new this.constructor(this._x,this._y,this._z,this._order)
        }
        copy(e) {
            return this._x = e._x,
                this._y = e._y,
                this._z = e._z,
                this._order = e._order,
                this._onChangeCallback(),
                this
        }
        setFromRotationMatrix(e, t=this._order, i=!0) {
            let r = e.elements
                , a = r[0]
                , n = r[4]
                , s = r[8]
                , o = r[1]
                , l = r[5]
                , h = r[9]
                , c = r[2]
                , d = r[6]
                , u = r[10];
            switch (t) {
                case "XYZ":
                    this._y = Math.asin(p(s, -1, 1)),
                        .9999999 > Math.abs(s) ? (this._x = Math.atan2(-h, u),
                            this._z = Math.atan2(-n, a)) : (this._x = Math.atan2(d, l),
                            this._z = 0);
                    break;
                case "YXZ":
                    this._x = Math.asin(-p(h, -1, 1)),
                        .9999999 > Math.abs(h) ? (this._y = Math.atan2(s, u),
                            this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-c, a),
                            this._z = 0);
                    break;
                case "ZXY":
                    this._x = Math.asin(p(d, -1, 1)),
                        .9999999 > Math.abs(d) ? (this._y = Math.atan2(-c, u),
                            this._z = Math.atan2(-n, l)) : (this._y = 0,
                            this._z = Math.atan2(o, a));
                    break;
                case "ZYX":
                    this._y = Math.asin(-p(c, -1, 1)),
                        .9999999 > Math.abs(c) ? (this._x = Math.atan2(d, u),
                            this._z = Math.atan2(o, a)) : (this._x = 0,
                            this._z = Math.atan2(-n, l));
                    break;
                case "YZX":
                    this._z = Math.asin(p(o, -1, 1)),
                        .9999999 > Math.abs(o) ? (this._x = Math.atan2(-h, l),
                            this._y = Math.atan2(-c, a)) : (this._x = 0,
                            this._y = Math.atan2(s, u));
                    break;
                case "XZY":
                    this._z = Math.asin(-p(n, -1, 1)),
                        .9999999 > Math.abs(n) ? (this._x = Math.atan2(d, l),
                            this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-h, u),
                            this._y = 0);
                    break;
                default:
                    console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t)
            }
            return this._order = t,
            !0 === i && this._onChangeCallback(),
                this
        }
        setFromQuaternion(e, t, i) {
            return ew.makeRotationFromQuaternion(e),
                this.setFromRotationMatrix(ew, t, i)
        }
        setFromVector3(e, t=this._order) {
            return this.set(e.x, e.y, e.z, t)
        }
        reorder(e) {
            return eT.setFromEuler(this),
                this.setFromQuaternion(eT, e)
        }
        equals(e) {
            return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order
        }
        fromArray(e) {
            return this._x = e[0],
                this._y = e[1],
                this._z = e[2],
            void 0 !== e[3] && (this._order = e[3]),
                this._onChangeCallback(),
                this
        }
        toArray(e=[], t=0) {
            return e[t] = this._x,
                e[t + 1] = this._y,
                e[t + 2] = this._z,
                e[t + 3] = this._order,
                e
        }
        _onChange(e) {
            return this._onChangeCallback = e,
                this
        }
        _onChangeCallback() {}
        *[Symbol.iterator]() {
            yield this._x,
                yield this._y,
                yield this._z,
                yield this._order
        }
        toVector3() {
            console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")
        }
    }
    eE.DefaultOrder = "XYZ",
        eE.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
    class eA {
        constructor() {
            this.mask = 1
        }
        set(e) {
            this.mask = (1 << e | 0) >>> 0
        }
        enable(e) {
            this.mask |= 1 << e | 0
        }
        enableAll() {
            this.mask = -1
        }
        toggle(e) {
            this.mask ^= 1 << e | 0
        }
        disable(e) {
            this.mask &= ~(1 << e | 0)
        }
        disableAll() {
            this.mask = 0
        }
        test(e) {
            return (this.mask & e.mask) != 0
        }
        isEnabled(e) {
            return (this.mask & (1 << e | 0)) != 0
        }
    }
    let eC = 0
        , eL = new B
        , eP = new k
        , eR = new eg
        , eD = new B
        , eI = new B
        , eN = new B
        , eO = new k
        , ez = new B(1,0,0)
        , eU = new B(0,1,0)
        , eF = new B(0,0,1)
        , ek = {
        type: "added"
    }
        , eB = {
        type: "removed"
    };
    class eH extends l {
        constructor() {
            super(),
                this.isObject3D = !0,
                Object.defineProperty(this, "id", {
                    value: eC++
                }),
                this.uuid = u(),
                this.name = "",
                this.type = "Object3D",
                this.parent = null,
                this.children = [],
                this.up = eH.DefaultUp.clone();
            let e = new B
                , t = new eE
                , i = new k
                , r = new B(1,1,1);
            t._onChange(function() {
                i.setFromEuler(t, !1)
            }),
                i._onChange(function() {
                    t.setFromQuaternion(i, void 0, !1)
                }),
                Object.defineProperties(this, {
                    position: {
                        configurable: !0,
                        enumerable: !0,
                        value: e
                    },
                    rotation: {
                        configurable: !0,
                        enumerable: !0,
                        value: t
                    },
                    quaternion: {
                        configurable: !0,
                        enumerable: !0,
                        value: i
                    },
                    scale: {
                        configurable: !0,
                        enumerable: !0,
                        value: r
                    },
                    modelViewMatrix: {
                        value: new eg
                    },
                    normalMatrix: {
                        value: new v
                    }
                }),
                this.matrix = new eg,
                this.matrixWorld = new eg,
                this.matrixAutoUpdate = eH.DefaultMatrixAutoUpdate,
                this.matrixWorldNeedsUpdate = !1,
                this.layers = new eA,
                this.visible = !0,
                this.castShadow = !1,
                this.receiveShadow = !1,
                this.frustumCulled = !0,
                this.renderOrder = 0,
                this.animations = [],
                this.userData = {}
        }
        onBeforeRender() {}
        onAfterRender() {}
        applyMatrix4(e) {
            this.matrixAutoUpdate && this.updateMatrix(),
                this.matrix.premultiply(e),
                this.matrix.decompose(this.position, this.quaternion, this.scale)
        }
        applyQuaternion(e) {
            return this.quaternion.premultiply(e),
                this
        }
        setRotationFromAxisAngle(e, t) {
            this.quaternion.setFromAxisAngle(e, t)
        }
        setRotationFromEuler(e) {
            this.quaternion.setFromEuler(e, !0)
        }
        setRotationFromMatrix(e) {
            this.quaternion.setFromRotationMatrix(e)
        }
        setRotationFromQuaternion(e) {
            this.quaternion.copy(e)
        }
        rotateOnAxis(e, t) {
            return eP.setFromAxisAngle(e, t),
                this.quaternion.multiply(eP),
                this
        }
        rotateOnWorldAxis(e, t) {
            return eP.setFromAxisAngle(e, t),
                this.quaternion.premultiply(eP),
                this
        }
        rotateX(e) {
            return this.rotateOnAxis(ez, e)
        }
        rotateY(e) {
            return this.rotateOnAxis(eU, e)
        }
        rotateZ(e) {
            return this.rotateOnAxis(eF, e)
        }
        translateOnAxis(e, t) {
            return eL.copy(e).applyQuaternion(this.quaternion),
                this.position.add(eL.multiplyScalar(t)),
                this
        }
        translateX(e) {
            return this.translateOnAxis(ez, e)
        }
        translateY(e) {
            return this.translateOnAxis(eU, e)
        }
        translateZ(e) {
            return this.translateOnAxis(eF, e)
        }
        localToWorld(e) {
            return e.applyMatrix4(this.matrixWorld)
        }
        worldToLocal(e) {
            return e.applyMatrix4(eR.copy(this.matrixWorld).invert())
        }
        lookAt(e, t, i) {
            e.isVector3 ? eD.copy(e) : eD.set(e, t, i);
            let r = this.parent;
            this.updateWorldMatrix(!0, !1),
                eI.setFromMatrixPosition(this.matrixWorld),
                this.isCamera || this.isLight ? eR.lookAt(eI, eD, this.up) : eR.lookAt(eD, eI, this.up),
                this.quaternion.setFromRotationMatrix(eR),
            r && (eR.extractRotation(r.matrixWorld),
                eP.setFromRotationMatrix(eR),
                this.quaternion.premultiply(eP.invert()))
        }
        add(e) {
            if (arguments.length > 1) {
                for (let e = 0; e < arguments.length; e++)
                    this.add(arguments[e]);
                return this
            }
            return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e),
                this) : (e && e.isObject3D ? (null !== e.parent && e.parent.remove(e),
                e.parent = this,
                this.children.push(e),
                e.dispatchEvent(ek)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e),
                this)
        }
        remove(e) {
            if (arguments.length > 1) {
                for (let e = 0; e < arguments.length; e++)
                    this.remove(arguments[e]);
                return this
            }
            let t = this.children.indexOf(e);
            return -1 !== t && (e.parent = null,
                this.children.splice(t, 1),
                e.dispatchEvent(eB)),
                this
        }
        removeFromParent() {
            let e = this.parent;
            return null !== e && e.remove(this),
                this
        }
        clear() {
            for (let e = 0; e < this.children.length; e++) {
                let t = this.children[e];
                t.parent = null,
                    t.dispatchEvent(eB)
            }
            return this.children.length = 0,
                this
        }
        attach(e) {
            return this.updateWorldMatrix(!0, !1),
                eR.copy(this.matrixWorld).invert(),
            null !== e.parent && (e.parent.updateWorldMatrix(!0, !1),
                eR.multiply(e.parent.matrixWorld)),
                e.applyMatrix4(eR),
                this.add(e),
                e.updateWorldMatrix(!1, !0),
                this
        }
        getObjectById(e) {
            return this.getObjectByProperty("id", e)
        }
        getObjectByName(e) {
            return this.getObjectByProperty("name", e)
        }
        getObjectByProperty(e, t) {
            if (this[e] === t)
                return this;
            for (let i = 0, r = this.children.length; i < r; i++) {
                let r = this.children[i]
                    , a = r.getObjectByProperty(e, t);
                if (void 0 !== a)
                    return a
            }
        }
        getWorldPosition(e) {
            return this.updateWorldMatrix(!0, !1),
                e.setFromMatrixPosition(this.matrixWorld)
        }
        getWorldQuaternion(e) {
            return this.updateWorldMatrix(!0, !1),
                this.matrixWorld.decompose(eI, e, eN),
                e
        }
        getWorldScale(e) {
            return this.updateWorldMatrix(!0, !1),
                this.matrixWorld.decompose(eI, eO, e),
                e
        }
        getWorldDirection(e) {
            this.updateWorldMatrix(!0, !1);
            let t = this.matrixWorld.elements;
            return e.set(t[8], t[9], t[10]).normalize()
        }
        raycast() {}
        traverse(e) {
            e(this);
            let t = this.children;
            for (let i = 0, r = t.length; i < r; i++)
                t[i].traverse(e)
        }
        traverseVisible(e) {
            if (!1 === this.visible)
                return;
            e(this);
            let t = this.children;
            for (let i = 0, r = t.length; i < r; i++)
                t[i].traverseVisible(e)
        }
        traverseAncestors(e) {
            let t = this.parent;
            null !== t && (e(t),
                t.traverseAncestors(e))
        }
        updateMatrix() {
            this.matrix.compose(this.position, this.quaternion, this.scale),
                this.matrixWorldNeedsUpdate = !0
        }
        updateMatrixWorld(e) {
            this.matrixAutoUpdate && this.updateMatrix(),
            (this.matrixWorldNeedsUpdate || e) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                this.matrixWorldNeedsUpdate = !1,
                e = !0);
            let t = this.children;
            for (let i = 0, r = t.length; i < r; i++)
                t[i].updateMatrixWorld(e)
        }
        updateWorldMatrix(e, t) {
            let i = this.parent;
            if (!0 === e && null !== i && i.updateWorldMatrix(!0, !1),
            this.matrixAutoUpdate && this.updateMatrix(),
                null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
            !0 === t) {
                let e = this.children;
                for (let t = 0, i = e.length; t < i; t++)
                    e[t].updateWorldMatrix(!1, !0)
            }
        }
        toJSON(e) {
            let t = void 0 === e || "string" == typeof e
                , i = {};
            t && (e = {
                geometries: {},
                materials: {},
                textures: {},
                images: {},
                shapes: {},
                skeletons: {},
                animations: {},
                nodes: {}
            },
                i.metadata = {
                    version: 4.5,
                    type: "Object",
                    generator: "Object3D.toJSON"
                });
            let r = {};
            function a(t, i) {
                return void 0 === t[i.uuid] && (t[i.uuid] = i.toJSON(e)),
                    i.uuid
            }
            if (r.uuid = this.uuid,
                r.type = this.type,
            "" !== this.name && (r.name = this.name),
            !0 === this.castShadow && (r.castShadow = !0),
            !0 === this.receiveShadow && (r.receiveShadow = !0),
            !1 === this.visible && (r.visible = !1),
            !1 === this.frustumCulled && (r.frustumCulled = !1),
            0 !== this.renderOrder && (r.renderOrder = this.renderOrder),
            "{}" !== JSON.stringify(this.userData) && (r.userData = this.userData),
                r.layers = this.layers.mask,
                r.matrix = this.matrix.toArray(),
            !1 === this.matrixAutoUpdate && (r.matrixAutoUpdate = !1),
            this.isInstancedMesh && (r.type = "InstancedMesh",
                r.count = this.count,
                r.instanceMatrix = this.instanceMatrix.toJSON(),
            null !== this.instanceColor && (r.instanceColor = this.instanceColor.toJSON())),
                this.isScene)
                this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)),
                this.environment && this.environment.isTexture && (r.environment = this.environment.toJSON(e).uuid);
            else if (this.isMesh || this.isLine || this.isPoints) {
                r.geometry = a(e.geometries, this.geometry);
                let t = this.geometry.parameters;
                if (void 0 !== t && void 0 !== t.shapes) {
                    let i = t.shapes;
                    if (Array.isArray(i))
                        for (let t = 0, r = i.length; t < r; t++) {
                            let r = i[t];
                            a(e.shapes, r)
                        }
                    else
                        a(e.shapes, i)
                }
            }
            if (this.isSkinnedMesh && (r.bindMode = this.bindMode,
                r.bindMatrix = this.bindMatrix.toArray(),
            void 0 !== this.skeleton && (a(e.skeletons, this.skeleton),
                r.skeleton = this.skeleton.uuid)),
            void 0 !== this.material) {
                if (Array.isArray(this.material)) {
                    let t = [];
                    for (let i = 0, r = this.material.length; i < r; i++)
                        t.push(a(e.materials, this.material[i]));
                    r.material = t
                } else
                    r.material = a(e.materials, this.material)
            }
            if (this.children.length > 0) {
                r.children = [];
                for (let t = 0; t < this.children.length; t++)
                    r.children.push(this.children[t].toJSON(e).object)
            }
            if (this.animations.length > 0) {
                r.animations = [];
                for (let t = 0; t < this.animations.length; t++) {
                    let i = this.animations[t];
                    r.animations.push(a(e.animations, i))
                }
            }
            if (t) {
                let t = n(e.geometries)
                    , r = n(e.materials)
                    , a = n(e.textures)
                    , s = n(e.images)
                    , o = n(e.shapes)
                    , l = n(e.skeletons)
                    , h = n(e.animations)
                    , c = n(e.nodes);
                t.length > 0 && (i.geometries = t),
                r.length > 0 && (i.materials = r),
                a.length > 0 && (i.textures = a),
                s.length > 0 && (i.images = s),
                o.length > 0 && (i.shapes = o),
                l.length > 0 && (i.skeletons = l),
                h.length > 0 && (i.animations = h),
                c.length > 0 && (i.nodes = c)
            }
            return i.object = r,
                i;
            function n(e) {
                let t = [];
                for (let i in e) {
                    let r = e[i];
                    delete r.metadata,
                        t.push(r)
                }
                return t
            }
        }
        clone(e) {
            return new this.constructor().copy(this, e)
        }
        copy(e, t=!0) {
            if (this.name = e.name,
                this.up.copy(e.up),
                this.position.copy(e.position),
                this.rotation.order = e.rotation.order,
                this.quaternion.copy(e.quaternion),
                this.scale.copy(e.scale),
                this.matrix.copy(e.matrix),
                this.matrixWorld.copy(e.matrixWorld),
                this.matrixAutoUpdate = e.matrixAutoUpdate,
                this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate,
                this.layers.mask = e.layers.mask,
                this.visible = e.visible,
                this.castShadow = e.castShadow,
                this.receiveShadow = e.receiveShadow,
                this.frustumCulled = e.frustumCulled,
                this.renderOrder = e.renderOrder,
                this.userData = JSON.parse(JSON.stringify(e.userData)),
            !0 === t)
                for (let t = 0; t < e.children.length; t++) {
                    let i = e.children[t];
                    this.add(i.clone())
                }
            return this
        }
    }
    eH.DefaultUp = new B(0,1,0),
        eH.DefaultMatrixAutoUpdate = !0;
    let eG = new B
        , eV = new B
        , eW = new B
        , ej = new B
        , eq = new B
        , eX = new B
        , eY = new B
        , eZ = new B
        , eJ = new B
        , eK = new B;
    class eQ {
        constructor(e=new B, t=new B, i=new B) {
            this.a = e,
                this.b = t,
                this.c = i
        }
        static getNormal(e, t, i, r) {
            r.subVectors(i, t),
                eG.subVectors(e, t),
                r.cross(eG);
            let a = r.lengthSq();
            return a > 0 ? r.multiplyScalar(1 / Math.sqrt(a)) : r.set(0, 0, 0)
        }
        static getBarycoord(e, t, i, r, a) {
            eG.subVectors(r, t),
                eV.subVectors(i, t),
                eW.subVectors(e, t);
            let n = eG.dot(eG)
                , s = eG.dot(eV)
                , o = eG.dot(eW)
                , l = eV.dot(eV)
                , h = eV.dot(eW)
                , c = n * l - s * s;
            if (0 === c)
                return a.set(-2, -1, -1);
            let d = 1 / c
                , u = (l * o - s * h) * d
                , p = (n * h - s * o) * d;
            return a.set(1 - u - p, p, u)
        }
        static containsPoint(e, t, i, r) {
            return this.getBarycoord(e, t, i, r, ej),
            ej.x >= 0 && ej.y >= 0 && ej.x + ej.y <= 1
        }
        static getUV(e, t, i, r, a, n, s, o) {
            return this.getBarycoord(e, t, i, r, ej),
                o.set(0, 0),
                o.addScaledVector(a, ej.x),
                o.addScaledVector(n, ej.y),
                o.addScaledVector(s, ej.z),
                o
        }
        static isFrontFacing(e, t, i, r) {
            return eG.subVectors(i, t),
                eV.subVectors(e, t),
            0 > eG.cross(eV).dot(r)
        }
        set(e, t, i) {
            return this.a.copy(e),
                this.b.copy(t),
                this.c.copy(i),
                this
        }
        setFromPointsAndIndices(e, t, i, r) {
            return this.a.copy(e[t]),
                this.b.copy(e[i]),
                this.c.copy(e[r]),
                this
        }
        setFromAttributeAndIndices(e, t, i, r) {
            return this.a.fromBufferAttribute(e, t),
                this.b.fromBufferAttribute(e, i),
                this.c.fromBufferAttribute(e, r),
                this
        }
        clone() {
            return new this.constructor().copy(this)
        }
        copy(e) {
            return this.a.copy(e.a),
                this.b.copy(e.b),
                this.c.copy(e.c),
                this
        }
        getArea() {
            return eG.subVectors(this.c, this.b),
                eV.subVectors(this.a, this.b),
            .5 * eG.cross(eV).length()
        }
        getMidpoint(e) {
            return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
        }
        getNormal(e) {
            return eQ.getNormal(this.a, this.b, this.c, e)
        }
        getPlane(e) {
            return e.setFromCoplanarPoints(this.a, this.b, this.c)
        }
        getBarycoord(e, t) {
            return eQ.getBarycoord(e, this.a, this.b, this.c, t)
        }
        getUV(e, t, i, r, a) {
            return eQ.getUV(e, this.a, this.b, this.c, t, i, r, a)
        }
        containsPoint(e) {
            return eQ.containsPoint(e, this.a, this.b, this.c)
        }
        isFrontFacing(e) {
            return eQ.isFrontFacing(this.a, this.b, this.c, e)
        }
        intersectsBox(e) {
            return e.intersectsTriangle(this)
        }
        closestPointToPoint(e, t) {
            let i, r;
            let a = this.a
                , n = this.b
                , s = this.c;
            eq.subVectors(n, a),
                eX.subVectors(s, a),
                eZ.subVectors(e, a);
            let o = eq.dot(eZ)
                , l = eX.dot(eZ);
            if (o <= 0 && l <= 0)
                return t.copy(a);
            eJ.subVectors(e, n);
            let h = eq.dot(eJ)
                , c = eX.dot(eJ);
            if (h >= 0 && c <= h)
                return t.copy(n);
            let d = o * c - h * l;
            if (d <= 0 && o >= 0 && h <= 0)
                return i = o / (o - h),
                    t.copy(a).addScaledVector(eq, i);
            eK.subVectors(e, s);
            let u = eq.dot(eK)
                , p = eX.dot(eK);
            if (p >= 0 && u <= p)
                return t.copy(s);
            let f = u * l - o * p;
            if (f <= 0 && l >= 0 && p <= 0)
                return r = l / (l - p),
                    t.copy(a).addScaledVector(eX, r);
            let m = h * p - u * c;
            if (m <= 0 && c - h >= 0 && u - p >= 0)
                return eY.subVectors(s, n),
                    r = (c - h) / (c - h + (u - p)),
                    t.copy(n).addScaledVector(eY, r);
            let g = 1 / (m + f + d);
            return i = f * g,
                r = d * g,
                t.copy(a).addScaledVector(eq, i).addScaledVector(eX, r)
        }
        equals(e) {
            return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c)
        }
    }
    let e$ = 0;
    class e0 extends l {
        constructor() {
            super(),
                this.isMaterial = !0,
                Object.defineProperty(this, "id", {
                    value: e$++
                }),
                this.uuid = u(),
                this.name = "",
                this.type = "Material",
                this.blending = 1,
                this.side = 0,
                this.vertexColors = !1,
                this.opacity = 1,
                this.transparent = !1,
                this.blendSrc = 204,
                this.blendDst = 205,
                this.blendEquation = 100,
                this.blendSrcAlpha = null,
                this.blendDstAlpha = null,
                this.blendEquationAlpha = null,
                this.depthFunc = 3,
                this.depthTest = !0,
                this.depthWrite = !0,
                this.stencilWriteMask = 255,
                this.stencilFunc = 519,
                this.stencilRef = 0,
                this.stencilFuncMask = 255,
                this.stencilFail = 7680,
                this.stencilZFail = 7680,
                this.stencilZPass = 7680,
                this.stencilWrite = !1,
                this.clippingPlanes = null,
                this.clipIntersection = !1,
                this.clipShadows = !1,
                this.shadowSide = null,
                this.colorWrite = !0,
                this.precision = null,
                this.polygonOffset = !1,
                this.polygonOffsetFactor = 0,
                this.polygonOffsetUnits = 0,
                this.dithering = !1,
                this.alphaToCoverage = !1,
                this.premultipliedAlpha = !1,
                this.visible = !0,
                this.toneMapped = !0,
                this.userData = {},
                this.version = 0,
                this._alphaTest = 0
        }
        get alphaTest() {
            return this._alphaTest
        }
        set alphaTest(e) {
            this._alphaTest > 0 != e > 0 && this.version++,
                this._alphaTest = e
        }
        onBuild() {}
        onBeforeRender() {}
        onBeforeCompile() {}
        customProgramCacheKey() {
            return this.onBeforeCompile.toString()
        }
        setValues(e) {
            if (void 0 !== e)
                for (let t in e) {
                    let i = e[t];
                    if (void 0 === i) {
                        console.warn("THREE.Material: '" + t + "' parameter is undefined.");
                        continue
                    }
                    if ("shading" === t) {
                        console.warn("THREE." + this.type + ": .shading has been removed. Use the boolean .flatShading instead."),
                            this.flatShading = 1 === i;
                        continue
                    }
                    let r = this[t];
                    if (void 0 === r) {
                        console.warn("THREE." + this.type + ": '" + t + "' is not a property of this material.");
                        continue
                    }
                    r && r.isColor ? r.set(i) : r && r.isVector3 && i && i.isVector3 ? r.copy(i) : this[t] = i
                }
        }
        toJSON(e) {
            let t = void 0 === e || "string" == typeof e;
            t && (e = {
                textures: {},
                images: {}
            });
            let i = {
                metadata: {
                    version: 4.5,
                    type: "Material",
                    generator: "Material.toJSON"
                }
            };
            function r(e) {
                let t = [];
                for (let i in e) {
                    let r = e[i];
                    delete r.metadata,
                        t.push(r)
                }
                return t
            }
            if (i.uuid = this.uuid,
                i.type = this.type,
            "" !== this.name && (i.name = this.name),
            this.color && this.color.isColor && (i.color = this.color.getHex()),
            void 0 !== this.roughness && (i.roughness = this.roughness),
            void 0 !== this.metalness && (i.metalness = this.metalness),
            void 0 !== this.sheen && (i.sheen = this.sheen),
            this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()),
            void 0 !== this.sheenRoughness && (i.sheenRoughness = this.sheenRoughness),
            this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()),
            this.emissiveIntensity && 1 !== this.emissiveIntensity && (i.emissiveIntensity = this.emissiveIntensity),
            this.specular && this.specular.isColor && (i.specular = this.specular.getHex()),
            void 0 !== this.specularIntensity && (i.specularIntensity = this.specularIntensity),
            this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()),
            void 0 !== this.shininess && (i.shininess = this.shininess),
            void 0 !== this.clearcoat && (i.clearcoat = this.clearcoat),
            void 0 !== this.clearcoatRoughness && (i.clearcoatRoughness = this.clearcoatRoughness),
            this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid),
            this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid),
            this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid,
                i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()),
            void 0 !== this.iridescence && (i.iridescence = this.iridescence),
            void 0 !== this.iridescenceIOR && (i.iridescenceIOR = this.iridescenceIOR),
            void 0 !== this.iridescenceThicknessRange && (i.iridescenceThicknessRange = this.iridescenceThicknessRange),
            this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid),
            this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid),
            this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid),
            this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid),
            this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid),
            this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid,
                i.lightMapIntensity = this.lightMapIntensity),
            this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid,
                i.aoMapIntensity = this.aoMapIntensity),
            this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid,
                i.bumpScale = this.bumpScale),
            this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid,
                i.normalMapType = this.normalMapType,
                i.normalScale = this.normalScale.toArray()),
            this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid,
                i.displacementScale = this.displacementScale,
                i.displacementBias = this.displacementBias),
            this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid),
            this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid),
            this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid),
            this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid),
            this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid),
            this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid),
            this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid,
            void 0 !== this.combine && (i.combine = this.combine)),
            void 0 !== this.envMapIntensity && (i.envMapIntensity = this.envMapIntensity),
            void 0 !== this.reflectivity && (i.reflectivity = this.reflectivity),
            void 0 !== this.refractionRatio && (i.refractionRatio = this.refractionRatio),
            this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid),
            void 0 !== this.transmission && (i.transmission = this.transmission),
            this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid),
            void 0 !== this.thickness && (i.thickness = this.thickness),
            this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid),
            void 0 !== this.attenuationDistance && (i.attenuationDistance = this.attenuationDistance),
            void 0 !== this.attenuationColor && (i.attenuationColor = this.attenuationColor.getHex()),
            void 0 !== this.size && (i.size = this.size),
            null !== this.shadowSide && (i.shadowSide = this.shadowSide),
            void 0 !== this.sizeAttenuation && (i.sizeAttenuation = this.sizeAttenuation),
            1 !== this.blending && (i.blending = this.blending),
            0 !== this.side && (i.side = this.side),
            this.vertexColors && (i.vertexColors = !0),
            this.opacity < 1 && (i.opacity = this.opacity),
            !0 === this.transparent && (i.transparent = this.transparent),
                i.depthFunc = this.depthFunc,
                i.depthTest = this.depthTest,
                i.depthWrite = this.depthWrite,
                i.colorWrite = this.colorWrite,
                i.stencilWrite = this.stencilWrite,
                i.stencilWriteMask = this.stencilWriteMask,
                i.stencilFunc = this.stencilFunc,
                i.stencilRef = this.stencilRef,
                i.stencilFuncMask = this.stencilFuncMask,
                i.stencilFail = this.stencilFail,
                i.stencilZFail = this.stencilZFail,
                i.stencilZPass = this.stencilZPass,
            void 0 !== this.rotation && 0 !== this.rotation && (i.rotation = this.rotation),
            !0 === this.polygonOffset && (i.polygonOffset = !0),
            0 !== this.polygonOffsetFactor && (i.polygonOffsetFactor = this.polygonOffsetFactor),
            0 !== this.polygonOffsetUnits && (i.polygonOffsetUnits = this.polygonOffsetUnits),
            void 0 !== this.linewidth && 1 !== this.linewidth && (i.linewidth = this.linewidth),
            void 0 !== this.dashSize && (i.dashSize = this.dashSize),
            void 0 !== this.gapSize && (i.gapSize = this.gapSize),
            void 0 !== this.scale && (i.scale = this.scale),
            !0 === this.dithering && (i.dithering = !0),
            this.alphaTest > 0 && (i.alphaTest = this.alphaTest),
            !0 === this.alphaToCoverage && (i.alphaToCoverage = this.alphaToCoverage),
            !0 === this.premultipliedAlpha && (i.premultipliedAlpha = this.premultipliedAlpha),
            !0 === this.wireframe && (i.wireframe = this.wireframe),
            this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth),
            "round" !== this.wireframeLinecap && (i.wireframeLinecap = this.wireframeLinecap),
            "round" !== this.wireframeLinejoin && (i.wireframeLinejoin = this.wireframeLinejoin),
            !0 === this.flatShading && (i.flatShading = this.flatShading),
            !1 === this.visible && (i.visible = !1),
            !1 === this.toneMapped && (i.toneMapped = !1),
            !1 === this.fog && (i.fog = !1),
            "{}" !== JSON.stringify(this.userData) && (i.userData = this.userData),
                t) {
                let t = r(e.textures)
                    , a = r(e.images);
                t.length > 0 && (i.textures = t),
                a.length > 0 && (i.images = a)
            }
            return i
        }
        clone() {
            return new this.constructor().copy(this)
        }
        copy(e) {
            this.name = e.name,
                this.blending = e.blending,
                this.side = e.side,
                this.vertexColors = e.vertexColors,
                this.opacity = e.opacity,
                this.transparent = e.transparent,
                this.blendSrc = e.blendSrc,
                this.blendDst = e.blendDst,
                this.blendEquation = e.blendEquation,
                this.blendSrcAlpha = e.blendSrcAlpha,
                this.blendDstAlpha = e.blendDstAlpha,
                this.blendEquationAlpha = e.blendEquationAlpha,
                this.depthFunc = e.depthFunc,
                this.depthTest = e.depthTest,
                this.depthWrite = e.depthWrite,
                this.stencilWriteMask = e.stencilWriteMask,
                this.stencilFunc = e.stencilFunc,
                this.stencilRef = e.stencilRef,
                this.stencilFuncMask = e.stencilFuncMask,
                this.stencilFail = e.stencilFail,
                this.stencilZFail = e.stencilZFail,
                this.stencilZPass = e.stencilZPass,
                this.stencilWrite = e.stencilWrite;
            let t = e.clippingPlanes
                , i = null;
            if (null !== t) {
                let e = t.length;
                i = Array(e);
                for (let r = 0; r !== e; ++r)
                    i[r] = t[r].clone()
            }
            return this.clippingPlanes = i,
                this.clipIntersection = e.clipIntersection,
                this.clipShadows = e.clipShadows,
                this.shadowSide = e.shadowSide,
                this.colorWrite = e.colorWrite,
                this.precision = e.precision,
                this.polygonOffset = e.polygonOffset,
                this.polygonOffsetFactor = e.polygonOffsetFactor,
                this.polygonOffsetUnits = e.polygonOffsetUnits,
                this.dithering = e.dithering,
                this.alphaTest = e.alphaTest,
                this.alphaToCoverage = e.alphaToCoverage,
                this.premultipliedAlpha = e.premultipliedAlpha,
                this.visible = e.visible,
                this.toneMapped = e.toneMapped,
                this.userData = JSON.parse(JSON.stringify(e.userData)),
                this
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
        set needsUpdate(e) {
            !0 === e && this.version++
        }
    }
    class e1 extends e0 {
        constructor(e) {
            super(),
                this.isMeshBasicMaterial = !0,
                this.type = "MeshBasicMaterial",
                this.color = new P(16777215),
                this.map = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.specularMap = null,
                this.alphaMap = null,
                this.envMap = null,
                this.combine = 0,
                this.reflectivity = 1,
                this.refractionRatio = .98,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.fog = !0,
                this.setValues(e)
        }
        copy(e) {
            return super.copy(e),
                this.color.copy(e.color),
                this.map = e.map,
                this.lightMap = e.lightMap,
                this.lightMapIntensity = e.lightMapIntensity,
                this.aoMap = e.aoMap,
                this.aoMapIntensity = e.aoMapIntensity,
                this.specularMap = e.specularMap,
                this.alphaMap = e.alphaMap,
                this.envMap = e.envMap,
                this.combine = e.combine,
                this.reflectivity = e.reflectivity,
                this.refractionRatio = e.refractionRatio,
                this.wireframe = e.wireframe,
                this.wireframeLinewidth = e.wireframeLinewidth,
                this.wireframeLinecap = e.wireframeLinecap,
                this.wireframeLinejoin = e.wireframeLinejoin,
                this.fog = e.fog,
                this
        }
    }
    let e3 = new B
        , e2 = new g;
    class e4 {
        constructor(e, t, i) {
            if (Array.isArray(e))
                throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
            this.isBufferAttribute = !0,
                this.name = "",
                this.array = e,
                this.itemSize = t,
                this.count = void 0 !== e ? e.length / t : 0,
                this.normalized = !0 === i,
                this.usage = 35044,
                this.updateRange = {
                    offset: 0,
                    count: -1
                },
                this.version = 0
        }
        onUploadCallback() {}
        set needsUpdate(e) {
            !0 === e && this.version++
        }
        setUsage(e) {
            return this.usage = e,
                this
        }
        copy(e) {
            return this.name = e.name,
                this.array = new e.array.constructor(e.array),
                this.itemSize = e.itemSize,
                this.count = e.count,
                this.normalized = e.normalized,
                this.usage = e.usage,
                this
        }
        copyAt(e, t, i) {
            e *= this.itemSize,
                i *= t.itemSize;
            for (let r = 0, a = this.itemSize; r < a; r++)
                this.array[e + r] = t.array[i + r];
            return this
        }
        copyArray(e) {
            return this.array.set(e),
                this
        }
        copyColorsArray(e) {
            let t = this.array
                , i = 0;
            for (let r = 0, a = e.length; r < a; r++) {
                let a = e[r];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", r),
                    a = new P),
                    t[i++] = a.r,
                    t[i++] = a.g,
                    t[i++] = a.b
            }
            return this
        }
        copyVector2sArray(e) {
            let t = this.array
                , i = 0;
            for (let r = 0, a = e.length; r < a; r++) {
                let a = e[r];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", r),
                    a = new g),
                    t[i++] = a.x,
                    t[i++] = a.y
            }
            return this
        }
        copyVector3sArray(e) {
            let t = this.array
                , i = 0;
            for (let r = 0, a = e.length; r < a; r++) {
                let a = e[r];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined", r),
                    a = new B),
                    t[i++] = a.x,
                    t[i++] = a.y,
                    t[i++] = a.z
            }
            return this
        }
        copyVector4sArray(e) {
            let t = this.array
                , i = 0;
            for (let r = 0, a = e.length; r < a; r++) {
                let a = e[r];
                void 0 === a && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", r),
                    a = new z),
                    t[i++] = a.x,
                    t[i++] = a.y,
                    t[i++] = a.z,
                    t[i++] = a.w
            }
            return this
        }
        applyMatrix3(e) {
            if (2 === this.itemSize)
                for (let t = 0, i = this.count; t < i; t++)
                    e2.fromBufferAttribute(this, t),
                        e2.applyMatrix3(e),
                        this.setXY(t, e2.x, e2.y);
            else if (3 === this.itemSize)
                for (let t = 0, i = this.count; t < i; t++)
                    e3.fromBufferAttribute(this, t),
                        e3.applyMatrix3(e),
                        this.setXYZ(t, e3.x, e3.y, e3.z);
            return this
        }
        applyMatrix4(e) {
            for (let t = 0, i = this.count; t < i; t++)
                e3.fromBufferAttribute(this, t),
                    e3.applyMatrix4(e),
                    this.setXYZ(t, e3.x, e3.y, e3.z);
            return this
        }
        applyNormalMatrix(e) {
            for (let t = 0, i = this.count; t < i; t++)
                e3.fromBufferAttribute(this, t),
                    e3.applyNormalMatrix(e),
                    this.setXYZ(t, e3.x, e3.y, e3.z);
            return this
        }
        transformDirection(e) {
            for (let t = 0, i = this.count; t < i; t++)
                e3.fromBufferAttribute(this, t),
                    e3.transformDirection(e),
                    this.setXYZ(t, e3.x, e3.y, e3.z);
            return this
        }
        set(e, t=0) {
            return this.array.set(e, t),
                this
        }
        getX(e) {
            return this.array[e * this.itemSize]
        }
        setX(e, t) {
            return this.array[e * this.itemSize] = t,
                this
        }
        getY(e) {
            return this.array[e * this.itemSize + 1]
        }
        setY(e, t) {
            return this.array[e * this.itemSize + 1] = t,
                this
        }
        getZ(e) {
            return this.array[e * this.itemSize + 2]
        }
        setZ(e, t) {
            return this.array[e * this.itemSize + 2] = t,
                this
        }
        getW(e) {
            return this.array[e * this.itemSize + 3]
        }
        setW(e, t) {
            return this.array[e * this.itemSize + 3] = t,
                this
        }
        setXY(e, t, i) {
            return e *= this.itemSize,
                this.array[e + 0] = t,
                this.array[e + 1] = i,
                this
        }
        setXYZ(e, t, i, r) {
            return e *= this.itemSize,
                this.array[e + 0] = t,
                this.array[e + 1] = i,
                this.array[e + 2] = r,
                this
        }
        setXYZW(e, t, i, r, a) {
            return e *= this.itemSize,
                this.array[e + 0] = t,
                this.array[e + 1] = i,
                this.array[e + 2] = r,
                this.array[e + 3] = a,
                this
        }
        onUpload(e) {
            return this.onUploadCallback = e,
                this
        }
        clone() {
            return new this.constructor(this.array,this.itemSize).copy(this)
        }
        toJSON() {
            let e = {
                itemSize: this.itemSize,
                type: this.array.constructor.name,
                array: Array.from(this.array),
                normalized: this.normalized
            };
            return "" !== this.name && (e.name = this.name),
            35044 !== this.usage && (e.usage = this.usage),
            (0 !== this.updateRange.offset || -1 !== this.updateRange.count) && (e.updateRange = this.updateRange),
                e
        }
    }
    class e5 extends e4 {
        constructor(e, t, i) {
            super(new Uint16Array(e), t, i)
        }
    }
    class e6 extends e4 {
        constructor(e, t, i) {
            super(new Uint32Array(e), t, i)
        }
    }
    class e8 extends e4 {
        constructor(e, t, i) {
            super(new Float32Array(e), t, i)
        }
    }
    let e7 = 0
        , e9 = new eg
        , te = new eH
        , tt = new B
        , ti = new V
        , tr = new V
        , ta = new B;
    class tn extends l {
        constructor() {
            super(),
                this.isBufferGeometry = !0,
                Object.defineProperty(this, "id", {
                    value: e7++
                }),
                this.uuid = u(),
                this.name = "",
                this.type = "BufferGeometry",
                this.index = null,
                this.attributes = {},
                this.morphAttributes = {},
                this.morphTargetsRelative = !1,
                this.groups = [],
                this.boundingBox = null,
                this.boundingSphere = null,
                this.drawRange = {
                    start: 0,
                    count: 1 / 0
                },
                this.userData = {}
        }
        getIndex() {
            return this.index
        }
        setIndex(e) {
            return Array.isArray(e) ? this.index = new (_(e) ? e6 : e5)(e,1) : this.index = e,
                this
        }
        getAttribute(e) {
            return this.attributes[e]
        }
        setAttribute(e, t) {
            return this.attributes[e] = t,
                this
        }
        deleteAttribute(e) {
            return delete this.attributes[e],
                this
        }
        hasAttribute(e) {
            return void 0 !== this.attributes[e]
        }
        addGroup(e, t, i=0) {
            this.groups.push({
                start: e,
                count: t,
                materialIndex: i
            })
        }
        clearGroups() {
            this.groups = []
        }
        setDrawRange(e, t) {
            this.drawRange.start = e,
                this.drawRange.count = t
        }
        applyMatrix4(e) {
            let t = this.attributes.position;
            void 0 !== t && (t.applyMatrix4(e),
                t.needsUpdate = !0);
            let i = this.attributes.normal;
            if (void 0 !== i) {
                let t = new v().getNormalMatrix(e);
                i.applyNormalMatrix(t),
                    i.needsUpdate = !0
            }
            let r = this.attributes.tangent;
            return void 0 !== r && (r.transformDirection(e),
                r.needsUpdate = !0),
            null !== this.boundingBox && this.computeBoundingBox(),
            null !== this.boundingSphere && this.computeBoundingSphere(),
                this
        }
        applyQuaternion(e) {
            return e9.makeRotationFromQuaternion(e),
                this.applyMatrix4(e9),
                this
        }
        rotateX(e) {
            return e9.makeRotationX(e),
                this.applyMatrix4(e9),
                this
        }
        rotateY(e) {
            return e9.makeRotationY(e),
                this.applyMatrix4(e9),
                this
        }
        rotateZ(e) {
            return e9.makeRotationZ(e),
                this.applyMatrix4(e9),
                this
        }
        translate(e, t, i) {
            return e9.makeTranslation(e, t, i),
                this.applyMatrix4(e9),
                this
        }
        scale(e, t, i) {
            return e9.makeScale(e, t, i),
                this.applyMatrix4(e9),
                this
        }
        lookAt(e) {
            return te.lookAt(e),
                te.updateMatrix(),
                this.applyMatrix4(te.matrix),
                this
        }
        center() {
            return this.computeBoundingBox(),
                this.boundingBox.getCenter(tt).negate(),
                this.translate(tt.x, tt.y, tt.z),
                this
        }
        setFromPoints(e) {
            let t = [];
            for (let i = 0, r = e.length; i < r; i++) {
                let r = e[i];
                t.push(r.x, r.y, r.z || 0)
            }
            return this.setAttribute("position", new e8(t,3)),
                this
        }
        computeBoundingBox() {
            null === this.boundingBox && (this.boundingBox = new V);
            let e = this.attributes.position
                , t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute) {
                console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this),
                    this.boundingBox.set(new B(-1 / 0,-1 / 0,-1 / 0), new B(Infinity,Infinity,Infinity));
                return
            }
            if (void 0 !== e) {
                if (this.boundingBox.setFromBufferAttribute(e),
                    t)
                    for (let e = 0, i = t.length; e < i; e++) {
                        let i = t[e];
                        ti.setFromBufferAttribute(i),
                            this.morphTargetsRelative ? (ta.addVectors(this.boundingBox.min, ti.min),
                                this.boundingBox.expandByPoint(ta),
                                ta.addVectors(this.boundingBox.max, ti.max),
                                this.boundingBox.expandByPoint(ta)) : (this.boundingBox.expandByPoint(ti.min),
                                this.boundingBox.expandByPoint(ti.max))
                    }
            } else
                this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        }
        computeBoundingSphere() {
            null === this.boundingSphere && (this.boundingSphere = new el);
            let e = this.attributes.position
                , t = this.morphAttributes.position;
            if (e && e.isGLBufferAttribute) {
                console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this),
                    this.boundingSphere.set(new B, 1 / 0);
                return
            }
            if (e) {
                let i = this.boundingSphere.center;
                if (ti.setFromBufferAttribute(e),
                    t)
                    for (let e = 0, i = t.length; e < i; e++) {
                        let i = t[e];
                        tr.setFromBufferAttribute(i),
                            this.morphTargetsRelative ? (ta.addVectors(ti.min, tr.min),
                                ti.expandByPoint(ta),
                                ta.addVectors(ti.max, tr.max),
                                ti.expandByPoint(ta)) : (ti.expandByPoint(tr.min),
                                ti.expandByPoint(tr.max))
                    }
                ti.getCenter(i);
                let r = 0;
                for (let t = 0, a = e.count; t < a; t++)
                    ta.fromBufferAttribute(e, t),
                        r = Math.max(r, i.distanceToSquared(ta));
                if (t)
                    for (let a = 0, n = t.length; a < n; a++) {
                        let n = t[a]
                            , s = this.morphTargetsRelative;
                        for (let t = 0, a = n.count; t < a; t++)
                            ta.fromBufferAttribute(n, t),
                            s && (tt.fromBufferAttribute(e, t),
                                ta.add(tt)),
                                r = Math.max(r, i.distanceToSquared(ta))
                    }
                this.boundingSphere.radius = Math.sqrt(r),
                isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
            }
        }
        computeTangents() {
            let e = this.index
                , t = this.attributes;
            if (null === e || void 0 === t.position || void 0 === t.normal || void 0 === t.uv) {
                console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
                return
            }
            let i = e.array
                , r = t.position.array
                , a = t.normal.array
                , n = t.uv.array
                , s = r.length / 3;
            !1 === this.hasAttribute("tangent") && this.setAttribute("tangent", new e4(new Float32Array(4 * s),4));
            let o = this.getAttribute("tangent").array
                , l = []
                , h = [];
            for (let e = 0; e < s; e++)
                l[e] = new B,
                    h[e] = new B;
            let c = new B
                , d = new B
                , u = new B
                , p = new g
                , f = new g
                , m = new g
                , v = new B
                , _ = new B
                , x = this.groups;
            0 === x.length && (x = [{
                start: 0,
                count: i.length
            }]);
            for (let e = 0, t = x.length; e < t; ++e) {
                let t = x[e]
                    , a = t.start
                    , s = t.count;
                for (let e = a, t = a + s; e < t; e += 3)
                    !function(e, t, i) {
                        c.fromArray(r, 3 * e),
                            d.fromArray(r, 3 * t),
                            u.fromArray(r, 3 * i),
                            p.fromArray(n, 2 * e),
                            f.fromArray(n, 2 * t),
                            m.fromArray(n, 2 * i),
                            d.sub(c),
                            u.sub(c),
                            f.sub(p),
                            m.sub(p);
                        let a = 1 / (f.x * m.y - m.x * f.y);
                        isFinite(a) && (v.copy(d).multiplyScalar(m.y).addScaledVector(u, -f.y).multiplyScalar(a),
                            _.copy(u).multiplyScalar(f.x).addScaledVector(d, -m.x).multiplyScalar(a),
                            l[e].add(v),
                            l[t].add(v),
                            l[i].add(v),
                            h[e].add(_),
                            h[t].add(_),
                            h[i].add(_))
                    }(i[e + 0], i[e + 1], i[e + 2])
            }
            let y = new B
                , M = new B
                , b = new B
                , S = new B;
            function w(e) {
                b.fromArray(a, 3 * e),
                    S.copy(b);
                let t = l[e];
                y.copy(t),
                    y.sub(b.multiplyScalar(b.dot(t))).normalize(),
                    M.crossVectors(S, t);
                let i = M.dot(h[e]);
                o[4 * e] = y.x,
                    o[4 * e + 1] = y.y,
                    o[4 * e + 2] = y.z,
                    o[4 * e + 3] = i < 0 ? -1 : 1
            }
            for (let e = 0, t = x.length; e < t; ++e) {
                let t = x[e]
                    , r = t.start
                    , a = t.count;
                for (let e = r, t = r + a; e < t; e += 3)
                    w(i[e + 0]),
                        w(i[e + 1]),
                        w(i[e + 2])
            }
        }
        computeVertexNormals() {
            let e = this.index
                , t = this.getAttribute("position");
            if (void 0 !== t) {
                let i = this.getAttribute("normal");
                if (void 0 === i)
                    i = new e4(new Float32Array(3 * t.count),3),
                        this.setAttribute("normal", i);
                else
                    for (let e = 0, t = i.count; e < t; e++)
                        i.setXYZ(e, 0, 0, 0);
                let r = new B
                    , a = new B
                    , n = new B
                    , s = new B
                    , o = new B
                    , l = new B
                    , h = new B
                    , c = new B;
                if (e)
                    for (let d = 0, u = e.count; d < u; d += 3) {
                        let u = e.getX(d + 0)
                            , p = e.getX(d + 1)
                            , f = e.getX(d + 2);
                        r.fromBufferAttribute(t, u),
                            a.fromBufferAttribute(t, p),
                            n.fromBufferAttribute(t, f),
                            h.subVectors(n, a),
                            c.subVectors(r, a),
                            h.cross(c),
                            s.fromBufferAttribute(i, u),
                            o.fromBufferAttribute(i, p),
                            l.fromBufferAttribute(i, f),
                            s.add(h),
                            o.add(h),
                            l.add(h),
                            i.setXYZ(u, s.x, s.y, s.z),
                            i.setXYZ(p, o.x, o.y, o.z),
                            i.setXYZ(f, l.x, l.y, l.z)
                    }
                else
                    for (let e = 0, s = t.count; e < s; e += 3)
                        r.fromBufferAttribute(t, e + 0),
                            a.fromBufferAttribute(t, e + 1),
                            n.fromBufferAttribute(t, e + 2),
                            h.subVectors(n, a),
                            c.subVectors(r, a),
                            h.cross(c),
                            i.setXYZ(e + 0, h.x, h.y, h.z),
                            i.setXYZ(e + 1, h.x, h.y, h.z),
                            i.setXYZ(e + 2, h.x, h.y, h.z);
                this.normalizeNormals(),
                    i.needsUpdate = !0
            }
        }
        merge(e, t) {
            if (!(e && e.isBufferGeometry)) {
                console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", e);
                return
            }
            void 0 === t && (t = 0,
                console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));
            let i = this.attributes;
            for (let r in i) {
                if (void 0 === e.attributes[r])
                    continue;
                let a = i[r]
                    , n = a.array
                    , s = e.attributes[r]
                    , o = s.array
                    , l = s.itemSize * t
                    , h = Math.min(o.length, n.length - l);
                for (let e = 0, t = l; e < h; e++,
                    t++)
                    n[t] = o[e]
            }
            return this
        }
        normalizeNormals() {
            let e = this.attributes.normal;
            for (let t = 0, i = e.count; t < i; t++)
                ta.fromBufferAttribute(e, t),
                    ta.normalize(),
                    e.setXYZ(t, ta.x, ta.y, ta.z)
        }
        toNonIndexed() {
            function e(e, t) {
                let i = e.array
                    , r = e.itemSize
                    , a = e.normalized
                    , n = new i.constructor(t.length * r)
                    , s = 0
                    , o = 0;
                for (let a = 0, l = t.length; a < l; a++) {
                    s = e.isInterleavedBufferAttribute ? t[a] * e.data.stride + e.offset : t[a] * r;
                    for (let e = 0; e < r; e++)
                        n[o++] = i[s++]
                }
                return new e4(n,r,a)
            }
            if (null === this.index)
                return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),
                    this;
            let t = new tn
                , i = this.index.array
                , r = this.attributes;
            for (let a in r) {
                let n = r[a]
                    , s = e(n, i);
                t.setAttribute(a, s)
            }
            let a = this.morphAttributes;
            for (let r in a) {
                let n = []
                    , s = a[r];
                for (let t = 0, r = s.length; t < r; t++) {
                    let r = s[t]
                        , a = e(r, i);
                    n.push(a)
                }
                t.morphAttributes[r] = n
            }
            t.morphTargetsRelative = this.morphTargetsRelative;
            let n = this.groups;
            for (let e = 0, i = n.length; e < i; e++) {
                let i = n[e];
                t.addGroup(i.start, i.count, i.materialIndex)
            }
            return t
        }
        toJSON() {
            let e = {
                metadata: {
                    version: 4.5,
                    type: "BufferGeometry",
                    generator: "BufferGeometry.toJSON"
                }
            };
            if (e.uuid = this.uuid,
                e.type = this.type,
            "" !== this.name && (e.name = this.name),
            Object.keys(this.userData).length > 0 && (e.userData = this.userData),
            void 0 !== this.parameters) {
                let t = this.parameters;
                for (let i in t)
                    void 0 !== t[i] && (e[i] = t[i]);
                return e
            }
            e.data = {
                attributes: {}
            };
            let t = this.index;
            null !== t && (e.data.index = {
                type: t.array.constructor.name,
                array: Array.prototype.slice.call(t.array)
            });
            let i = this.attributes;
            for (let t in i) {
                let r = i[t];
                e.data.attributes[t] = r.toJSON(e.data)
            }
            let r = {}
                , a = !1;
            for (let t in this.morphAttributes) {
                let i = this.morphAttributes[t]
                    , n = [];
                for (let t = 0, r = i.length; t < r; t++) {
                    let r = i[t];
                    n.push(r.toJSON(e.data))
                }
                n.length > 0 && (r[t] = n,
                    a = !0)
            }
            a && (e.data.morphAttributes = r,
                e.data.morphTargetsRelative = this.morphTargetsRelative);
            let n = this.groups;
            n.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(n)));
            let s = this.boundingSphere;
            return null !== s && (e.data.boundingSphere = {
                center: s.center.toArray(),
                radius: s.radius
            }),
                e
        }
        clone() {
            return new this.constructor().copy(this)
        }
        copy(e) {
            this.index = null,
                this.attributes = {},
                this.morphAttributes = {},
                this.groups = [],
                this.boundingBox = null,
                this.boundingSphere = null;
            let t = {};
            this.name = e.name;
            let i = e.index;
            null !== i && this.setIndex(i.clone(t));
            let r = e.attributes;
            for (let e in r) {
                let i = r[e];
                this.setAttribute(e, i.clone(t))
            }
            let a = e.morphAttributes;
            for (let e in a) {
                let i = []
                    , r = a[e];
                for (let e = 0, a = r.length; e < a; e++)
                    i.push(r[e].clone(t));
                this.morphAttributes[e] = i
            }
            this.morphTargetsRelative = e.morphTargetsRelative;
            let n = e.groups;
            for (let e = 0, t = n.length; e < t; e++) {
                let t = n[e];
                this.addGroup(t.start, t.count, t.materialIndex)
            }
            let s = e.boundingBox;
            null !== s && (this.boundingBox = s.clone());
            let o = e.boundingSphere;
            return null !== o && (this.boundingSphere = o.clone()),
                this.drawRange.start = e.drawRange.start,
                this.drawRange.count = e.drawRange.count,
                this.userData = e.userData,
            void 0 !== e.parameters && (this.parameters = Object.assign({}, e.parameters)),
                this
        }
        dispose() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    }
    let ts = new eg
        , to = new class {
        constructor(e=new B, t=new B(0,0,-1)) {
            this.origin = e,
                this.direction = t
        }
        set(e, t) {
            return this.origin.copy(e),
                this.direction.copy(t),
                this
        }
        copy(e) {
            return this.origin.copy(e.origin),
                this.direction.copy(e.direction),
                this
        }
        at(e, t) {
            return t.copy(this.direction).multiplyScalar(e).add(this.origin)
        }
        lookAt(e) {
            return this.direction.copy(e).sub(this.origin).normalize(),
                this
        }
        recast(e) {
            return this.origin.copy(this.at(e, eh)),
                this
        }
        closestPointToPoint(e, t) {
            t.subVectors(e, this.origin);
            let i = t.dot(this.direction);
            return i < 0 ? t.copy(this.origin) : t.copy(this.direction).multiplyScalar(i).add(this.origin)
        }
        distanceToPoint(e) {
            return Math.sqrt(this.distanceSqToPoint(e))
        }
        distanceSqToPoint(e) {
            let t = eh.subVectors(e, this.origin).dot(this.direction);
            return t < 0 ? this.origin.distanceToSquared(e) : (eh.copy(this.direction).multiplyScalar(t).add(this.origin),
                eh.distanceToSquared(e))
        }
        distanceSqToSegment(e, t, i, r) {
            let a, n, s, o;
            ec.copy(e).add(t).multiplyScalar(.5),
                ed.copy(t).sub(e).normalize(),
                eu.copy(this.origin).sub(ec);
            let l = .5 * e.distanceTo(t)
                , h = -this.direction.dot(ed)
                , c = eu.dot(this.direction)
                , d = -eu.dot(ed)
                , u = eu.lengthSq()
                , p = Math.abs(1 - h * h);
            if (p > 0) {
                if (a = h * d - c,
                    n = h * c - d,
                    o = l * p,
                a >= 0) {
                    if (n >= -o) {
                        if (n <= o) {
                            let e = 1 / p;
                            a *= e,
                                n *= e,
                                s = a * (a + h * n + 2 * c) + n * (h * a + n + 2 * d) + u
                        } else
                            s = -(a = Math.max(0, -(h * (n = l) + c))) * a + n * (n + 2 * d) + u
                    } else
                        s = -(a = Math.max(0, -(h * (n = -l) + c))) * a + n * (n + 2 * d) + u
                } else
                    n <= -o ? (n = (a = Math.max(0, -(-h * l + c))) > 0 ? -l : Math.min(Math.max(-l, -d), l),
                        s = -a * a + n * (n + 2 * d) + u) : n <= o ? (a = 0,
                        s = (n = Math.min(Math.max(-l, -d), l)) * (n + 2 * d) + u) : (n = (a = Math.max(0, -(h * l + c))) > 0 ? l : Math.min(Math.max(-l, -d), l),
                        s = -a * a + n * (n + 2 * d) + u)
            } else
                n = h > 0 ? -l : l,
                    s = -(a = Math.max(0, -(h * n + c))) * a + n * (n + 2 * d) + u;
            return i && i.copy(this.direction).multiplyScalar(a).add(this.origin),
            r && r.copy(ed).multiplyScalar(n).add(ec),
                s
        }
        intersectSphere(e, t) {
            eh.subVectors(e.center, this.origin);
            let i = eh.dot(this.direction)
                , r = eh.dot(eh) - i * i
                , a = e.radius * e.radius;
            if (r > a)
                return null;
            let n = Math.sqrt(a - r)
                , s = i - n
                , o = i + n;
            return s < 0 && o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t)
        }
        intersectsSphere(e) {
            return this.distanceSqToPoint(e.center) <= e.radius * e.radius
        }
        distanceToPlane(e) {
            let t = e.normal.dot(this.direction);
            if (0 === t)
                return 0 === e.distanceToPoint(this.origin) ? 0 : null;
            let i = -(this.origin.dot(e.normal) + e.constant) / t;
            return i >= 0 ? i : null
        }
        intersectPlane(e, t) {
            let i = this.distanceToPlane(e);
            return null === i ? null : this.at(i, t)
        }
        intersectsPlane(e) {
            let t = e.distanceToPoint(this.origin);
            if (0 === t)
                return !0;
            let i = e.normal.dot(this.direction);
            return i * t < 0
        }
        intersectBox(e, t) {
            let i, r, a, n, s, o;
            let l = 1 / this.direction.x
                , h = 1 / this.direction.y
                , c = 1 / this.direction.z
                , d = this.origin;
            return (l >= 0 ? (i = (e.min.x - d.x) * l,
                r = (e.max.x - d.x) * l) : (i = (e.max.x - d.x) * l,
                r = (e.min.x - d.x) * l),
                h >= 0 ? (a = (e.min.y - d.y) * h,
                    n = (e.max.y - d.y) * h) : (a = (e.max.y - d.y) * h,
                    n = (e.min.y - d.y) * h),
            i > n || a > r) ? null : ((a > i || i != i) && (i = a),
            (n < r || r != r) && (r = n),
                c >= 0 ? (s = (e.min.z - d.z) * c,
                    o = (e.max.z - d.z) * c) : (s = (e.max.z - d.z) * c,
                    o = (e.min.z - d.z) * c),
            i > o || s > r) ? null : ((s > i || i != i) && (i = s),
            (o < r || r != r) && (r = o),
            r < 0) ? null : this.at(i >= 0 ? i : r, t)
        }
        intersectsBox(e) {
            return null !== this.intersectBox(e, eh)
        }
        intersectTriangle(e, t, i, r, a) {
            let n;
            ep.subVectors(t, e),
                ef.subVectors(i, e),
                em.crossVectors(ep, ef);
            let s = this.direction.dot(em);
            if (s > 0) {
                if (r)
                    return null;
                n = 1
            } else {
                if (!(s < 0))
                    return null;
                n = -1,
                    s = -s
            }
            eu.subVectors(this.origin, e);
            let o = n * this.direction.dot(ef.crossVectors(eu, ef));
            if (o < 0)
                return null;
            let l = n * this.direction.dot(ep.cross(eu));
            if (l < 0 || o + l > s)
                return null;
            let h = -n * eu.dot(em);
            return h < 0 ? null : this.at(h / s, a)
        }
        applyMatrix4(e) {
            return this.origin.applyMatrix4(e),
                this.direction.transformDirection(e),
                this
        }
        equals(e) {
            return e.origin.equals(this.origin) && e.direction.equals(this.direction)
        }
        clone() {
            return new this.constructor().copy(this)
        }
    }
        , tl = new el
        , th = new B
        , tc = new B
        , td = new B
        , tu = new B
        , tp = new B
        , tf = new B
        , tm = new B
        , tg = new B
        , tv = new B
        , t_ = new g
        , tx = new g
        , ty = new g
        , tM = new B
        , tb = new B;
    class tS extends eH {
        constructor(e=new tn, t=new e1) {
            super(),
                this.isMesh = !0,
                this.type = "Mesh",
                this.geometry = e,
                this.material = t,
                this.updateMorphTargets()
        }
        copy(e, t) {
            return super.copy(e, t),
            void 0 !== e.morphTargetInfluences && (this.morphTargetInfluences = e.morphTargetInfluences.slice()),
            void 0 !== e.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)),
                this.material = e.material,
                this.geometry = e.geometry,
                this
        }
        updateMorphTargets() {
            let e = this.geometry
                , t = e.morphAttributes
                , i = Object.keys(t);
            if (i.length > 0) {
                let e = t[i[0]];
                if (void 0 !== e) {
                    this.morphTargetInfluences = [],
                        this.morphTargetDictionary = {};
                    for (let t = 0, i = e.length; t < i; t++) {
                        let i = e[t].name || String(t);
                        this.morphTargetInfluences.push(0),
                            this.morphTargetDictionary[i] = t
                    }
                }
            }
        }
        raycast(e, t) {
            let i;
            let r = this.geometry
                , a = this.material
                , n = this.matrixWorld;
            if (void 0 === a || (null === r.boundingSphere && r.computeBoundingSphere(),
                tl.copy(r.boundingSphere),
                tl.applyMatrix4(n),
            !1 === e.ray.intersectsSphere(tl)) || (ts.copy(n).invert(),
                to.copy(e.ray).applyMatrix4(ts),
            null !== r.boundingBox && !1 === to.intersectsBox(r.boundingBox)))
                return;
            let s = r.index
                , o = r.attributes.position
                , l = r.morphAttributes.position
                , h = r.morphTargetsRelative
                , c = r.attributes.uv
                , d = r.attributes.uv2
                , u = r.groups
                , p = r.drawRange;
            if (null !== s) {
                if (Array.isArray(a))
                    for (let r = 0, n = u.length; r < n; r++) {
                        let n = u[r]
                            , f = a[n.materialIndex]
                            , m = Math.max(n.start, p.start)
                            , g = Math.min(s.count, Math.min(n.start + n.count, p.start + p.count));
                        for (let r = m; r < g; r += 3) {
                            let a = s.getX(r)
                                , u = s.getX(r + 1)
                                , p = s.getX(r + 2);
                            (i = tw(this, f, e, to, o, l, h, c, d, a, u, p)) && (i.faceIndex = Math.floor(r / 3),
                                i.face.materialIndex = n.materialIndex,
                                t.push(i))
                        }
                    }
                else {
                    let r = Math.max(0, p.start)
                        , n = Math.min(s.count, p.start + p.count);
                    for (let u = r; u < n; u += 3) {
                        let r = s.getX(u)
                            , n = s.getX(u + 1)
                            , p = s.getX(u + 2);
                        (i = tw(this, a, e, to, o, l, h, c, d, r, n, p)) && (i.faceIndex = Math.floor(u / 3),
                            t.push(i))
                    }
                }
            } else if (void 0 !== o) {
                if (Array.isArray(a))
                    for (let r = 0, n = u.length; r < n; r++) {
                        let n = u[r]
                            , s = a[n.materialIndex]
                            , f = Math.max(n.start, p.start)
                            , m = Math.min(o.count, Math.min(n.start + n.count, p.start + p.count));
                        for (let r = f; r < m; r += 3) {
                            let a = r
                                , u = r + 1
                                , p = r + 2;
                            (i = tw(this, s, e, to, o, l, h, c, d, a, u, p)) && (i.faceIndex = Math.floor(r / 3),
                                i.face.materialIndex = n.materialIndex,
                                t.push(i))
                        }
                    }
                else {
                    let r = Math.max(0, p.start)
                        , n = Math.min(o.count, p.start + p.count);
                    for (let s = r; s < n; s += 3) {
                        let r = s
                            , n = s + 1
                            , u = s + 2;
                        (i = tw(this, a, e, to, o, l, h, c, d, r, n, u)) && (i.faceIndex = Math.floor(s / 3),
                            t.push(i))
                    }
                }
            }
        }
    }
    function tw(e, t, i, r, a, n, s, o, l, h, c, d) {
        th.fromBufferAttribute(a, h),
            tc.fromBufferAttribute(a, c),
            td.fromBufferAttribute(a, d);
        let u = e.morphTargetInfluences;
        if (n && u) {
            tm.set(0, 0, 0),
                tg.set(0, 0, 0),
                tv.set(0, 0, 0);
            for (let e = 0, t = n.length; e < t; e++) {
                let t = u[e]
                    , i = n[e];
                0 !== t && (tu.fromBufferAttribute(i, h),
                    tp.fromBufferAttribute(i, c),
                    tf.fromBufferAttribute(i, d),
                    s ? (tm.addScaledVector(tu, t),
                        tg.addScaledVector(tp, t),
                        tv.addScaledVector(tf, t)) : (tm.addScaledVector(tu.sub(th), t),
                        tg.addScaledVector(tp.sub(tc), t),
                        tv.addScaledVector(tf.sub(td), t)))
            }
            th.add(tm),
                tc.add(tg),
                td.add(tv)
        }
        e.isSkinnedMesh && (e.boneTransform(h, th),
            e.boneTransform(c, tc),
            e.boneTransform(d, td));
        let p = function(e, t, i, r, a, n, s, o) {
            if (null === (1 === t.side ? r.intersectTriangle(s, n, a, !0, o) : r.intersectTriangle(a, n, s, 2 !== t.side, o)))
                return null;
            tb.copy(o),
                tb.applyMatrix4(e.matrixWorld);
            let l = i.ray.origin.distanceTo(tb);
            return l < i.near || l > i.far ? null : {
                distance: l,
                point: tb.clone(),
                object: e
            }
        }(e, t, i, r, th, tc, td, tM);
        if (p) {
            o && (t_.fromBufferAttribute(o, h),
                tx.fromBufferAttribute(o, c),
                ty.fromBufferAttribute(o, d),
                p.uv = eQ.getUV(tM, th, tc, td, t_, tx, ty, new g)),
            l && (t_.fromBufferAttribute(l, h),
                tx.fromBufferAttribute(l, c),
                ty.fromBufferAttribute(l, d),
                p.uv2 = eQ.getUV(tM, th, tc, td, t_, tx, ty, new g));
            let e = {
                a: h,
                b: c,
                c: d,
                normal: new B,
                materialIndex: 0
            };
            eQ.getNormal(th, tc, td, e.normal),
                p.face = e
        }
        return p
    }
    class tT extends tn {
        constructor(e=1, t=1, i=1, r=1, a=1, n=1) {
            super(),
                this.type = "BoxGeometry",
                this.parameters = {
                    width: e,
                    height: t,
                    depth: i,
                    widthSegments: r,
                    heightSegments: a,
                    depthSegments: n
                };
            let s = this;
            r = Math.floor(r),
                a = Math.floor(a),
                n = Math.floor(n);
            let o = []
                , l = []
                , h = []
                , c = []
                , d = 0
                , u = 0;
            function p(e, t, i, r, a, n, p, f, m, g, v) {
                let _ = n / m
                    , x = p / g
                    , y = n / 2
                    , M = p / 2
                    , b = f / 2
                    , S = m + 1
                    , w = g + 1
                    , T = 0
                    , E = 0
                    , A = new B;
                for (let n = 0; n < w; n++) {
                    let s = n * x - M;
                    for (let o = 0; o < S; o++) {
                        let d = o * _ - y;
                        A[e] = d * r,
                            A[t] = s * a,
                            A[i] = b,
                            l.push(A.x, A.y, A.z),
                            A[e] = 0,
                            A[t] = 0,
                            A[i] = f > 0 ? 1 : -1,
                            h.push(A.x, A.y, A.z),
                            c.push(o / m),
                            c.push(1 - n / g),
                            T += 1
                    }
                }
                for (let e = 0; e < g; e++)
                    for (let t = 0; t < m; t++) {
                        let i = d + t + S * e
                            , r = d + t + S * (e + 1)
                            , a = d + (t + 1) + S * (e + 1)
                            , n = d + (t + 1) + S * e;
                        o.push(i, r, n),
                            o.push(r, a, n),
                            E += 6
                    }
                s.addGroup(u, E, v),
                    u += E,
                    d += T
            }
            p("z", "y", "x", -1, -1, i, t, e, n, a, 0),
                p("z", "y", "x", 1, -1, i, t, -e, n, a, 1),
                p("x", "z", "y", 1, 1, e, i, t, r, n, 2),
                p("x", "z", "y", 1, -1, e, i, -t, r, n, 3),
                p("x", "y", "z", 1, -1, e, t, i, r, a, 4),
                p("x", "y", "z", -1, -1, e, t, -i, r, a, 5),
                this.setIndex(o),
                this.setAttribute("position", new e8(l,3)),
                this.setAttribute("normal", new e8(h,3)),
                this.setAttribute("uv", new e8(c,2))
        }
        static fromJSON(e) {
            return new tT(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)
        }
    }
    function tE(e) {
        let t = {};
        for (let i in e)
            for (let r in t[i] = {},
                e[i]) {
                let a = e[i][r];
                a && (a.isColor || a.isMatrix3 || a.isMatrix4 || a.isVector2 || a.isVector3 || a.isVector4 || a.isTexture || a.isQuaternion) ? t[i][r] = a.clone() : Array.isArray(a) ? t[i][r] = a.slice() : t[i][r] = a
            }
        return t
    }
    function tA(e) {
        let t = {};
        for (let i = 0; i < e.length; i++) {
            let r = tE(e[i]);
            for (let e in r)
                t[e] = r[e]
        }
        return t
    }
    let tC = {
        clone: tE,
        merge: tA
    };
    class tL extends e0 {
        constructor(e) {
            super(),
                this.isShaderMaterial = !0,
                this.type = "ShaderMaterial",
                this.defines = {},
                this.uniforms = {},
                this.vertexShader = "void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
                this.fragmentShader = "void main(){gl_FragColor=vec4(1.0,0.0,0.0,1.0);}",
                this.linewidth = 1,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.fog = !1,
                this.lights = !1,
                this.clipping = !1,
                this.extensions = {
                    derivatives: !1,
                    fragDepth: !1,
                    drawBuffers: !1,
                    shaderTextureLOD: !1
                },
                this.defaultAttributeValues = {
                    color: [1, 1, 1],
                    uv: [0, 0],
                    uv2: [0, 0]
                },
                this.index0AttributeName = void 0,
                this.uniformsNeedUpdate = !1,
                this.glslVersion = null,
            void 0 !== e && (void 0 !== e.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),
                this.setValues(e))
        }
        copy(e) {
            return super.copy(e),
                this.fragmentShader = e.fragmentShader,
                this.vertexShader = e.vertexShader,
                this.uniforms = tE(e.uniforms),
                this.defines = Object.assign({}, e.defines),
                this.wireframe = e.wireframe,
                this.wireframeLinewidth = e.wireframeLinewidth,
                this.fog = e.fog,
                this.lights = e.lights,
                this.clipping = e.clipping,
                this.extensions = Object.assign({}, e.extensions),
                this.glslVersion = e.glslVersion,
                this
        }
        toJSON(e) {
            let t = super.toJSON(e);
            for (let i in t.glslVersion = this.glslVersion,
                t.uniforms = {},
                this.uniforms) {
                let r = this.uniforms[i]
                    , a = r.value;
                a && a.isTexture ? t.uniforms[i] = {
                    type: "t",
                    value: a.toJSON(e).uuid
                } : a && a.isColor ? t.uniforms[i] = {
                    type: "c",
                    value: a.getHex()
                } : a && a.isVector2 ? t.uniforms[i] = {
                    type: "v2",
                    value: a.toArray()
                } : a && a.isVector3 ? t.uniforms[i] = {
                    type: "v3",
                    value: a.toArray()
                } : a && a.isVector4 ? t.uniforms[i] = {
                    type: "v4",
                    value: a.toArray()
                } : a && a.isMatrix3 ? t.uniforms[i] = {
                    type: "m3",
                    value: a.toArray()
                } : a && a.isMatrix4 ? t.uniforms[i] = {
                    type: "m4",
                    value: a.toArray()
                } : t.uniforms[i] = {
                    value: a
                }
            }
            Object.keys(this.defines).length > 0 && (t.defines = this.defines),
                t.vertexShader = this.vertexShader,
                t.fragmentShader = this.fragmentShader;
            let i = {};
            for (let e in this.extensions)
                !0 === this.extensions[e] && (i[e] = !0);
            return Object.keys(i).length > 0 && (t.extensions = i),
                t
        }
    }
    class tP extends eH {
        constructor() {
            super(),
                this.isCamera = !0,
                this.type = "Camera",
                this.matrixWorldInverse = new eg,
                this.projectionMatrix = new eg,
                this.projectionMatrixInverse = new eg
        }
        copy(e, t) {
            return super.copy(e, t),
                this.matrixWorldInverse.copy(e.matrixWorldInverse),
                this.projectionMatrix.copy(e.projectionMatrix),
                this.projectionMatrixInverse.copy(e.projectionMatrixInverse),
                this
        }
        getWorldDirection(e) {
            this.updateWorldMatrix(!0, !1);
            let t = this.matrixWorld.elements;
            return e.set(-t[8], -t[9], -t[10]).normalize()
        }
        updateMatrixWorld(e) {
            super.updateMatrixWorld(e),
                this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }
        updateWorldMatrix(e, t) {
            super.updateWorldMatrix(e, t),
                this.matrixWorldInverse.copy(this.matrixWorld).invert()
        }
        clone() {
            return new this.constructor().copy(this)
        }
    }
    class tR extends tP {
        constructor(e=50, t=1, i=.1, r=2e3) {
            super(),
                this.isPerspectiveCamera = !0,
                this.type = "PerspectiveCamera",
                this.fov = e,
                this.zoom = 1,
                this.near = i,
                this.far = r,
                this.focus = 10,
                this.aspect = t,
                this.view = null,
                this.filmGauge = 35,
                this.filmOffset = 0,
                this.updateProjectionMatrix()
        }
        copy(e, t) {
            return super.copy(e, t),
                this.fov = e.fov,
                this.zoom = e.zoom,
                this.near = e.near,
                this.far = e.far,
                this.focus = e.focus,
                this.aspect = e.aspect,
                this.view = null === e.view ? null : Object.assign({}, e.view),
                this.filmGauge = e.filmGauge,
                this.filmOffset = e.filmOffset,
                this
        }
        setFocalLength(e) {
            let t = .5 * this.getFilmHeight() / e;
            this.fov = 2 * d * Math.atan(t),
                this.updateProjectionMatrix()
        }
        getFocalLength() {
            let e = Math.tan(.5 * c * this.fov);
            return .5 * this.getFilmHeight() / e
        }
        getEffectiveFOV() {
            return 2 * d * Math.atan(Math.tan(.5 * c * this.fov) / this.zoom)
        }
        getFilmWidth() {
            return this.filmGauge * Math.min(this.aspect, 1)
        }
        getFilmHeight() {
            return this.filmGauge / Math.max(this.aspect, 1)
        }
        setViewOffset(e, t, i, r, a, n) {
            this.aspect = e / t,
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }),
                this.view.enabled = !0,
                this.view.fullWidth = e,
                this.view.fullHeight = t,
                this.view.offsetX = i,
                this.view.offsetY = r,
                this.view.width = a,
                this.view.height = n,
                this.updateProjectionMatrix()
        }
        clearViewOffset() {
            null !== this.view && (this.view.enabled = !1),
                this.updateProjectionMatrix()
        }
        updateProjectionMatrix() {
            let e = this.near
                , t = e * Math.tan(.5 * c * this.fov) / this.zoom
                , i = 2 * t
                , r = this.aspect * i
                , a = -.5 * r
                , n = this.view;
            if (null !== this.view && this.view.enabled) {
                let e = n.fullWidth
                    , s = n.fullHeight;
                a += n.offsetX * r / e,
                    t -= n.offsetY * i / s,
                    r *= n.width / e,
                    i *= n.height / s
            }
            let s = this.filmOffset;
            0 !== s && (a += e * s / this.getFilmWidth()),
                this.projectionMatrix.makePerspective(a, a + r, t, t - i, e, this.far),
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }
        toJSON(e) {
            let t = super.toJSON(e);
            return t.object.fov = this.fov,
                t.object.zoom = this.zoom,
                t.object.near = this.near,
                t.object.far = this.far,
                t.object.focus = this.focus,
                t.object.aspect = this.aspect,
            null !== this.view && (t.object.view = Object.assign({}, this.view)),
                t.object.filmGauge = this.filmGauge,
                t.object.filmOffset = this.filmOffset,
                t
        }
    }
    class tD extends eH {
        constructor(e, t, i) {
            if (super(),
                this.type = "CubeCamera",
            !0 !== i.isWebGLCubeRenderTarget) {
                console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");
                return
            }
            this.renderTarget = i;
            let r = new tR(90,1,e,t);
            r.layers = this.layers,
                r.up.set(0, -1, 0),
                r.lookAt(new B(1,0,0)),
                this.add(r);
            let a = new tR(90,1,e,t);
            a.layers = this.layers,
                a.up.set(0, -1, 0),
                a.lookAt(new B(-1,0,0)),
                this.add(a);
            let n = new tR(90,1,e,t);
            n.layers = this.layers,
                n.up.set(0, 0, 1),
                n.lookAt(new B(0,1,0)),
                this.add(n);
            let s = new tR(90,1,e,t);
            s.layers = this.layers,
                s.up.set(0, 0, -1),
                s.lookAt(new B(0,-1,0)),
                this.add(s);
            let o = new tR(90,1,e,t);
            o.layers = this.layers,
                o.up.set(0, -1, 0),
                o.lookAt(new B(0,0,1)),
                this.add(o);
            let l = new tR(90,1,e,t);
            l.layers = this.layers,
                l.up.set(0, -1, 0),
                l.lookAt(new B(0,0,-1)),
                this.add(l)
        }
        update(e, t) {
            null === this.parent && this.updateMatrixWorld();
            let i = this.renderTarget
                , [r,a,n,s,o,l] = this.children
                , h = e.getRenderTarget()
                , c = e.toneMapping
                , d = e.xr.enabled;
            e.toneMapping = 0,
                e.xr.enabled = !1;
            let u = i.texture.generateMipmaps;
            i.texture.generateMipmaps = !1,
                e.setRenderTarget(i, 0),
                e.render(t, r),
                e.setRenderTarget(i, 1),
                e.render(t, a),
                e.setRenderTarget(i, 2),
                e.render(t, n),
                e.setRenderTarget(i, 3),
                e.render(t, s),
                e.setRenderTarget(i, 4),
                e.render(t, o),
                i.texture.generateMipmaps = u,
                e.setRenderTarget(i, 5),
                e.render(t, l),
                e.setRenderTarget(h),
                e.toneMapping = c,
                e.xr.enabled = d,
                i.texture.needsPMREMUpdate = !0
        }
    }
    class tI extends O {
        constructor(e, t, i, r, a, n, s, o, l, h) {
            super(e = void 0 !== e ? e : [], t = void 0 !== t ? t : 301, i, r, a, n, s, o, l, h),
                this.isCubeTexture = !0,
                this.flipY = !1
        }
        get images() {
            return this.image
        }
        set images(e) {
            this.image = e
        }
    }
    class tN extends U {
        constructor(e, t={}) {
            super(e, e, t),
                this.isWebGLCubeRenderTarget = !0;
            let i = {
                width: e,
                height: e,
                depth: 1
            };
            this.texture = new tI([i, i, i, i, i, i],t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),
                this.texture.isRenderTargetTexture = !0,
                this.texture.generateMipmaps = void 0 !== t.generateMipmaps && t.generateMipmaps,
                this.texture.minFilter = void 0 !== t.minFilter ? t.minFilter : 1006
        }
        fromEquirectangularTexture(e, t) {
            this.texture.type = t.type,
                this.texture.encoding = t.encoding,
                this.texture.generateMipmaps = t.generateMipmaps,
                this.texture.minFilter = t.minFilter,
                this.texture.magFilter = t.magFilter;
            let i = {
                uniforms: {
                    tEquirect: {
                        value: null
                    }
                },
                vertexShader: `varying vec3 vWorldDirection;vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
}`,
                fragmentShader: `uniform sampler2D tEquirect;varying vec3 vWorldDirection;
#include <common>
void main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);}`
            }
                , r = new tT(5,5,5)
                , a = new tL({
                name: "CubemapFromEquirect",
                uniforms: tE(i.uniforms),
                vertexShader: i.vertexShader,
                fragmentShader: i.fragmentShader,
                side: 1,
                blending: 0
            });
            a.uniforms.tEquirect.value = t;
            let n = new tS(r,a)
                , s = t.minFilter;
            1008 === t.minFilter && (t.minFilter = 1006);
            let o = new tD(1,10,this);
            return o.update(e, n),
                t.minFilter = s,
                n.geometry.dispose(),
                n.material.dispose(),
                this
        }
        clear(e, t, i, r) {
            let a = e.getRenderTarget();
            for (let a = 0; a < 6; a++)
                e.setRenderTarget(this, a),
                    e.clear(t, i, r);
            e.setRenderTarget(a)
        }
    }
    let tO = new B
        , tz = new B
        , tU = new v;
    class tF {
        constructor(e=new B(1,0,0), t=0) {
            this.isPlane = !0,
                this.normal = e,
                this.constant = t
        }
        set(e, t) {
            return this.normal.copy(e),
                this.constant = t,
                this
        }
        setComponents(e, t, i, r) {
            return this.normal.set(e, t, i),
                this.constant = r,
                this
        }
        setFromNormalAndCoplanarPoint(e, t) {
            return this.normal.copy(e),
                this.constant = -t.dot(this.normal),
                this
        }
        setFromCoplanarPoints(e, t, i) {
            let r = tO.subVectors(i, t).cross(tz.subVectors(e, t)).normalize();
            return this.setFromNormalAndCoplanarPoint(r, e),
                this
        }
        copy(e) {
            return this.normal.copy(e.normal),
                this.constant = e.constant,
                this
        }
        normalize() {
            let e = 1 / this.normal.length();
            return this.normal.multiplyScalar(e),
                this.constant *= e,
                this
        }
        negate() {
            return this.constant *= -1,
                this.normal.negate(),
                this
        }
        distanceToPoint(e) {
            return this.normal.dot(e) + this.constant
        }
        distanceToSphere(e) {
            return this.distanceToPoint(e.center) - e.radius
        }
        projectPoint(e, t) {
            return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)
        }
        intersectLine(e, t) {
            let i = e.delta(tO)
                , r = this.normal.dot(i);
            if (0 === r)
                return 0 === this.distanceToPoint(e.start) ? t.copy(e.start) : null;
            let a = -(e.start.dot(this.normal) + this.constant) / r;
            return a < 0 || a > 1 ? null : t.copy(i).multiplyScalar(a).add(e.start)
        }
        intersectsLine(e) {
            let t = this.distanceToPoint(e.start)
                , i = this.distanceToPoint(e.end);
            return t < 0 && i > 0 || i < 0 && t > 0
        }
        intersectsBox(e) {
            return e.intersectsPlane(this)
        }
        intersectsSphere(e) {
            return e.intersectsPlane(this)
        }
        coplanarPoint(e) {
            return e.copy(this.normal).multiplyScalar(-this.constant)
        }
        applyMatrix4(e, t) {
            let i = t || tU.getNormalMatrix(e)
                , r = this.coplanarPoint(tO).applyMatrix4(e)
                , a = this.normal.applyMatrix3(i).normalize();
            return this.constant = -r.dot(a),
                this
        }
        translate(e) {
            return this.constant -= e.dot(this.normal),
                this
        }
        equals(e) {
            return e.normal.equals(this.normal) && e.constant === this.constant
        }
        clone() {
            return new this.constructor().copy(this)
        }
    }
    let tk = new el
        , tB = new B;
    class tH {
        constructor(e=new tF, t=new tF, i=new tF, r=new tF, a=new tF, n=new tF) {
            this.planes = [e, t, i, r, a, n]
        }
        set(e, t, i, r, a, n) {
            let s = this.planes;
            return s[0].copy(e),
                s[1].copy(t),
                s[2].copy(i),
                s[3].copy(r),
                s[4].copy(a),
                s[5].copy(n),
                this
        }
        copy(e) {
            let t = this.planes;
            for (let i = 0; i < 6; i++)
                t[i].copy(e.planes[i]);
            return this
        }
        setFromProjectionMatrix(e) {
            let t = this.planes
                , i = e.elements
                , r = i[0]
                , a = i[1]
                , n = i[2]
                , s = i[3]
                , o = i[4]
                , l = i[5]
                , h = i[6]
                , c = i[7]
                , d = i[8]
                , u = i[9]
                , p = i[10]
                , f = i[11]
                , m = i[12]
                , g = i[13]
                , v = i[14]
                , _ = i[15];
            return t[0].setComponents(s - r, c - o, f - d, _ - m).normalize(),
                t[1].setComponents(s + r, c + o, f + d, _ + m).normalize(),
                t[2].setComponents(s + a, c + l, f + u, _ + g).normalize(),
                t[3].setComponents(s - a, c - l, f - u, _ - g).normalize(),
                t[4].setComponents(s - n, c - h, f - p, _ - v).normalize(),
                t[5].setComponents(s + n, c + h, f + p, _ + v).normalize(),
                this
        }
        intersectsObject(e) {
            let t = e.geometry;
            return null === t.boundingSphere && t.computeBoundingSphere(),
                tk.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),
                this.intersectsSphere(tk)
        }
        intersectsSprite(e) {
            return tk.center.set(0, 0, 0),
                tk.radius = .7071067811865476,
                tk.applyMatrix4(e.matrixWorld),
                this.intersectsSphere(tk)
        }
        intersectsSphere(e) {
            let t = this.planes
                , i = e.center
                , r = -e.radius;
            for (let e = 0; e < 6; e++) {
                let a = t[e].distanceToPoint(i);
                if (a < r)
                    return !1
            }
            return !0
        }
        intersectsBox(e) {
            let t = this.planes;
            for (let i = 0; i < 6; i++) {
                let r = t[i];
                if (tB.x = r.normal.x > 0 ? e.max.x : e.min.x,
                    tB.y = r.normal.y > 0 ? e.max.y : e.min.y,
                    tB.z = r.normal.z > 0 ? e.max.z : e.min.z,
                0 > r.distanceToPoint(tB))
                    return !1
            }
            return !0
        }
        containsPoint(e) {
            let t = this.planes;
            for (let i = 0; i < 6; i++)
                if (0 > t[i].distanceToPoint(e))
                    return !1;
            return !0
        }
        clone() {
            return new this.constructor().copy(this)
        }
    }
    function tG() {
        let e = null
            , t = !1
            , i = null
            , r = null;
        function a(t, n) {
            i(t, n),
                r = e.requestAnimationFrame(a)
        }
        return {
            start: function() {
                !0 !== t && null !== i && (r = e.requestAnimationFrame(a),
                    t = !0)
            },
            stop: function() {
                e.cancelAnimationFrame(r),
                    t = !1
            },
            setAnimationLoop: function(e) {
                i = e
            },
            setContext: function(t) {
                e = t
            }
        }
    }
    function tV(e, t) {
        let i = t.isWebGL2
            , r = new WeakMap;
        return {
            get: function(e) {
                return e.isInterleavedBufferAttribute && (e = e.data),
                    r.get(e)
            },
            remove: function(t) {
                t.isInterleavedBufferAttribute && (t = t.data);
                let i = r.get(t);
                i && (e.deleteBuffer(i.buffer),
                    r.delete(t))
            },
            update: function(t, a) {
                if (t.isGLBufferAttribute) {
                    let e = r.get(t);
                    (!e || e.version < t.version) && r.set(t, {
                        buffer: t.buffer,
                        type: t.type,
                        bytesPerElement: t.elementSize,
                        version: t.version
                    });
                    return
                }
                t.isInterleavedBufferAttribute && (t = t.data);
                let n = r.get(t);
                void 0 === n ? r.set(t, function(t, r) {
                    let a;
                    let n = t.array
                        , s = t.usage
                        , o = e.createBuffer();
                    if (e.bindBuffer(r, o),
                        e.bufferData(r, n, s),
                        t.onUploadCallback(),
                    n instanceof Float32Array)
                        a = 5126;
                    else if (n instanceof Uint16Array) {
                        if (t.isFloat16BufferAttribute) {
                            if (i)
                                a = 5131;
                            else
                                throw Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.")
                        } else
                            a = 5123
                    } else if (n instanceof Int16Array)
                        a = 5122;
                    else if (n instanceof Uint32Array)
                        a = 5125;
                    else if (n instanceof Int32Array)
                        a = 5124;
                    else if (n instanceof Int8Array)
                        a = 5120;
                    else if (n instanceof Uint8Array)
                        a = 5121;
                    else if (n instanceof Uint8ClampedArray)
                        a = 5121;
                    else
                        throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + n);
                    return {
                        buffer: o,
                        type: a,
                        bytesPerElement: n.BYTES_PER_ELEMENT,
                        version: t.version
                    }
                }(t, a)) : n.version < t.version && (!function(t, r, a) {
                    let n = r.array
                        , s = r.updateRange;
                    e.bindBuffer(a, t),
                        -1 === s.count ? e.bufferSubData(a, 0, n) : (i ? e.bufferSubData(a, s.offset * n.BYTES_PER_ELEMENT, n, s.offset, s.count) : e.bufferSubData(a, s.offset * n.BYTES_PER_ELEMENT, n.subarray(s.offset, s.offset + s.count)),
                            s.count = -1)
                }(n.buffer, t, a),
                    n.version = t.version)
            }
        }
    }
    class tW extends tn {
        constructor(e=1, t=1, i=1, r=1) {
            super(),
                this.type = "PlaneGeometry",
                this.parameters = {
                    width: e,
                    height: t,
                    widthSegments: i,
                    heightSegments: r
                };
            let a = e / 2
                , n = t / 2
                , s = Math.floor(i)
                , o = Math.floor(r)
                , l = s + 1
                , h = o + 1
                , c = e / s
                , d = t / o
                , u = []
                , p = []
                , f = []
                , m = [];
            for (let e = 0; e < h; e++) {
                let t = e * d - n;
                for (let i = 0; i < l; i++) {
                    let r = i * c - a;
                    p.push(r, -t, 0),
                        f.push(0, 0, 1),
                        m.push(i / s),
                        m.push(1 - e / o)
                }
            }
            for (let e = 0; e < o; e++)
                for (let t = 0; t < s; t++) {
                    let i = t + l * e
                        , r = t + l * (e + 1)
                        , a = t + 1 + l * (e + 1)
                        , n = t + 1 + l * e;
                    u.push(i, r, n),
                        u.push(r, a, n)
                }
            this.setIndex(u),
                this.setAttribute("position", new e8(p,3)),
                this.setAttribute("normal", new e8(f,3)),
                this.setAttribute("uv", new e8(m,2))
        }
        static fromJSON(e) {
            return new tW(e.width,e.height,e.widthSegments,e.heightSegments)
        }
    }
    var tj = `#ifdef USE_ALPHAMAP
diffuseColor.a*=texture2D(alphaMap,vUv).g;
#endif`
        , tq = `#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`
        , tX = `#ifdef USE_ALPHATEST
if(diffuseColor.a<alphaTest)discard;
#endif`
        , tY = `#ifdef USE_ALPHATEST
uniform float alphaTest;
#endif`
        , tZ = `#ifdef USE_AOMAP
float ambientOcclusion=(texture2D(aoMap,vUv2).r-1.0)*aoMapIntensity+1.0;reflectedLight.indirectDiffuse*=ambientOcclusion;
#if defined(USE_ENVMAP)&&defined(STANDARD)
float dotNV=saturate(dot(geometry.normal,geometry.viewDir));reflectedLight.indirectSpecular*=computeSpecularOcclusion(dotNV,ambientOcclusion,material.roughness);
#endif
#endif`
        , tJ = `#ifdef USE_AOMAP
uniform sampler2D aoMap;uniform float aoMapIntensity;
#endif`
        , tK = `vec3 objectNormal=vec3(normal);
#ifdef USE_TANGENT
vec3 objectTangent=vec3(tangent.xyz);
#endif`
        , tQ = `vec3 BRDF_Lambert(const in vec3 diffuseColor){return RECIPROCAL_PI*diffuseColor;}vec3 F_Schlick(const in vec3 f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}float F_Schlick(const in float f0,const in float f90,const in float dotVH){float fresnel=exp2((-5.55473*dotVH-6.98316)*dotVH);return f0*(1.0-fresnel)+(f90*fresnel);}vec3 Schlick_to_F0(const in vec3 f,const in float f90,const in float dotVH){float x=clamp(1.0-dotVH,0.0,1.0);float x2=x*x;float x5=clamp(x*x2*x2,0.0,0.9999);return(f-vec3(f90)*x5)/(1.0-x5);}float V_GGX_SmithCorrelated(const in float alpha,const in float dotNL,const in float dotNV){float a2=pow2(alpha);float gv=dotNL*sqrt(a2+(1.0-a2)*pow2(dotNV));float gl=dotNV*sqrt(a2+(1.0-a2)*pow2(dotNL));return 0.5/max(gv+gl,EPSILON);}float D_GGX(const in float alpha,const in float dotNH){float a2=pow2(alpha);float denom=pow2(dotNH)*(a2-1.0)+1.0;return RECIPROCAL_PI*a2/pow2(denom);}vec3 BRDF_GGX(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 f0,const in float f90,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(f0,f90,dotVH);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}
#ifdef USE_IRIDESCENCE
vec3 BRDF_GGX_Iridescence(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 f0,const in float f90,const in float iridescence,const in vec3 iridescenceFresnel,const in float roughness){float alpha=pow2(roughness);vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=mix(F_Schlick(f0,f90,dotVH),iridescenceFresnel,iridescence);float V=V_GGX_SmithCorrelated(alpha,dotNL,dotNV);float D=D_GGX(alpha,dotNH);return F*(V*D);}
#endif
vec2 LTC_Uv(const in vec3 N,const in vec3 V,const in float roughness){const float LUT_SIZE=64.0;const float LUT_SCALE=(LUT_SIZE-1.0)/LUT_SIZE;const float LUT_BIAS=0.5/LUT_SIZE;float dotNV=saturate(dot(N,V));vec2 uv=vec2(roughness,sqrt(1.0-dotNV));uv=uv*LUT_SCALE+LUT_BIAS;return uv;}float LTC_ClippedSphereFormFactor(const in vec3 f){float l=length(f);return max((l*l+f.z)/(l+1.0),0.0);}vec3 LTC_EdgeVectorFormFactor(const in vec3 v1,const in vec3 v2){float x=dot(v1,v2);float y=abs(x);float a=0.8543985+(0.4965155+0.0145206*y)*y;float b=3.4175940+(4.1616724+y)*y;float v=a/b;float theta_sintheta=(x>0.0)?v:0.5*inversesqrt(max(1.0-x*x,1e-7))-v;return cross(v1,v2)*theta_sintheta;}vec3 LTC_Evaluate(const in vec3 N,const in vec3 V,const in vec3 P,const in mat3 mInv,const in vec3 rectCoords[4]){vec3 v1=rectCoords[1]-rectCoords[0];vec3 v2=rectCoords[3]-rectCoords[0];vec3 lightNormal=cross(v1,v2);if(dot(lightNormal,P-rectCoords[0])<0.0)return vec3(0.0);vec3 T1,T2;T1=normalize(V-N*dot(V,N));T2=-cross(N,T1);mat3 mat=mInv*transposeMat3(mat3(T1,T2,N));vec3 coords[4];coords[0]=mat*(rectCoords[0]-P);coords[1]=mat*(rectCoords[1]-P);coords[2]=mat*(rectCoords[2]-P);coords[3]=mat*(rectCoords[3]-P);coords[0]=normalize(coords[0]);coords[1]=normalize(coords[1]);coords[2]=normalize(coords[2]);coords[3]=normalize(coords[3]);vec3 vectorFormFactor=vec3(0.0);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[0],coords[1]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[1],coords[2]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[2],coords[3]);vectorFormFactor+=LTC_EdgeVectorFormFactor(coords[3],coords[0]);float result=LTC_ClippedSphereFormFactor(vectorFormFactor);return vec3(result);}float G_BlinnPhong_Implicit(){return 0.25;}float D_BlinnPhong(const in float shininess,const in float dotNH){return RECIPROCAL_PI*(shininess*0.5+1.0)*pow(dotNH,shininess);}vec3 BRDF_BlinnPhong(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,const in vec3 specularColor,const in float shininess){vec3 halfDir=normalize(lightDir+viewDir);float dotNH=saturate(dot(normal,halfDir));float dotVH=saturate(dot(viewDir,halfDir));vec3 F=F_Schlick(specularColor,1.0,dotVH);float G=G_BlinnPhong_Implicit();float D=D_BlinnPhong(shininess,dotNH);return F*(G*D);}
#if defined(USE_SHEEN)
float D_Charlie(float roughness,float dotNH){float alpha=pow2(roughness);float invAlpha=1.0/alpha;float cos2h=dotNH*dotNH;float sin2h=max(1.0-cos2h,0.0078125);return(2.0+invAlpha)*pow(sin2h,invAlpha*0.5)/(2.0*PI);}float V_Neubelt(float dotNV,float dotNL){return saturate(1.0/(4.0*(dotNL+dotNV-dotNL*dotNV)));}vec3 BRDF_Sheen(const in vec3 lightDir,const in vec3 viewDir,const in vec3 normal,vec3 sheenColor,const in float sheenRoughness){vec3 halfDir=normalize(lightDir+viewDir);float dotNL=saturate(dot(normal,lightDir));float dotNV=saturate(dot(normal,viewDir));float dotNH=saturate(dot(normal,halfDir));float D=D_Charlie(sheenRoughness,dotNH);float V=V_Neubelt(dotNV,dotNL);return sheenColor*(D*V);}
#endif`
        , t$ = `#ifdef USE_IRIDESCENCE
const mat3 XYZ_TO_REC709=mat3(3.2404542,-0.9692660,0.0556434,-1.5371385,1.8760108,-0.2040259,-0.4985314,0.0415560,1.0572252);vec3 Fresnel0ToIor(vec3 fresnel0){vec3 sqrtF0=sqrt(fresnel0);return(vec3(1.0)+sqrtF0)/(vec3(1.0)-sqrtF0);}vec3 IorToFresnel0(vec3 transmittedIor,float incidentIor){return pow2((transmittedIor-vec3(incidentIor))/(transmittedIor+vec3(incidentIor)));}float IorToFresnel0(float transmittedIor,float incidentIor){return pow2((transmittedIor-incidentIor)/(transmittedIor+incidentIor));}vec3 evalSensitivity(float OPD,vec3 shift){float phase=2.0*PI*OPD*1.0e-9;vec3 val=vec3(5.4856e-13,4.4201e-13,5.2481e-13);vec3 pos=vec3(1.6810e+06,1.7953e+06,2.2084e+06);vec3 var=vec3(4.3278e+09,9.3046e+09,6.6121e+09);vec3 xyz=val*sqrt(2.0*PI*var)*cos(pos*phase+shift)*exp(-pow2(phase)*var);xyz.x+=9.7470e-14*sqrt(2.0*PI*4.5282e+09)*cos(2.2399e+06*phase+shift[0])*exp(-4.5282e+09*pow2(phase));xyz/=1.0685e-7;vec3 srgb=XYZ_TO_REC709*xyz;return srgb;}vec3 evalIridescence(float outsideIOR,float eta2,float cosTheta1,float thinFilmThickness,vec3 baseF0){vec3 I;float iridescenceIOR=mix(outsideIOR,eta2,smoothstep(0.0,0.03,thinFilmThickness));float sinTheta2Sq=pow2(outsideIOR/iridescenceIOR)*(1.0-pow2(cosTheta1));float cosTheta2Sq=1.0-sinTheta2Sq;if(cosTheta2Sq<0.0){return vec3(1.0);}float cosTheta2=sqrt(cosTheta2Sq);float R0=IorToFresnel0(iridescenceIOR,outsideIOR);float R12=F_Schlick(R0,1.0,cosTheta1);float R21=R12;float T121=1.0-R12;float phi12=0.0;if(iridescenceIOR<outsideIOR)phi12=PI;float phi21=PI-phi12;vec3 baseIOR=Fresnel0ToIor(clamp(baseF0,0.0,0.9999));vec3 R1=IorToFresnel0(baseIOR,iridescenceIOR);vec3 R23=F_Schlick(R1,1.0,cosTheta2);vec3 phi23=vec3(0.0);if(baseIOR[0]<iridescenceIOR)phi23[0]=PI;if(baseIOR[1]<iridescenceIOR)phi23[1]=PI;if(baseIOR[2]<iridescenceIOR)phi23[2]=PI;float OPD=2.0*iridescenceIOR*thinFilmThickness*cosTheta2;vec3 phi=vec3(phi21)+phi23;vec3 R123=clamp(R12*R23,1e-5,0.9999);vec3 r123=sqrt(R123);vec3 Rs=pow2(T121)*R23/(vec3(1.0)-R123);vec3 C0=R12+Rs;I=C0;vec3 Cm=Rs-T121;for(int m=1;m<=2;++m){Cm*=r123;vec3 Sm=2.0*evalSensitivity(float(m)*OPD,float(m)*phi);I+=Cm*Sm;}return max(I,vec3(0.0));}
#endif`
        , t0 = `#ifdef USE_BUMPMAP
uniform sampler2D bumpMap;uniform float bumpScale;vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(vUv);vec2 dSTdy=dFdy(vUv);float Hll=bumpScale*texture2D(bumpMap,vUv).x;float dBx=bumpScale*texture2D(bumpMap,vUv+dSTdx).x-Hll;float dBy=bumpScale*texture2D(bumpMap,vUv+dSTdy).x-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=vec3(dFdx(surf_pos.x),dFdx(surf_pos.y),dFdx(surf_pos.z));vec3 vSigmaY=vec3(dFdy(surf_pos.x),dFdy(surf_pos.y),dFdy(surf_pos.z));vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}
#endif`
        , t1 = `#if NUM_CLIPPING_PLANES>0
vec4 plane;
#pragma unroll_loop_start
for(int i=0;i<UNION_CLIPPING_PLANES;i++){plane=clippingPlanes[i];if(dot(vClipPosition,plane.xyz)>plane.w)discard;}
#pragma unroll_loop_end
#if UNION_CLIPPING_PLANES<NUM_CLIPPING_PLANES
bool clipped=true;
#pragma unroll_loop_start
for(int i=UNION_CLIPPING_PLANES;i<NUM_CLIPPING_PLANES;i++){plane=clippingPlanes[i];clipped=(dot(vClipPosition,plane.xyz)>plane.w)&&clipped;}
#pragma unroll_loop_end
if(clipped)discard;
#endif
#endif`
        , t3 = `#if NUM_CLIPPING_PLANES>0
varying vec3 vClipPosition;uniform vec4 clippingPlanes[NUM_CLIPPING_PLANES];
#endif`
        , t2 = `#if NUM_CLIPPING_PLANES>0
varying vec3 vClipPosition;
#endif`
        , t4 = `#if NUM_CLIPPING_PLANES>0
vClipPosition=-mvPosition.xyz;
#endif`
        , t5 = `#if defined(USE_COLOR_ALPHA)
diffuseColor*=vColor;
#elif defined(USE_COLOR)
diffuseColor.rgb*=vColor;
#endif`
        , t6 = `#if defined(USE_COLOR_ALPHA)
varying vec4 vColor;
#elif defined(USE_COLOR)
varying vec3 vColor;
#endif`
        , t8 = `#if defined(USE_COLOR_ALPHA)
varying vec4 vColor;
#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)
varying vec3 vColor;
#endif`
        , t7 = `#if defined(USE_COLOR_ALPHA)
vColor=vec4(1.0);
#elif defined(USE_COLOR)||defined(USE_INSTANCING_COLOR)
vColor=vec3(1.0);
#endif
#ifdef USE_COLOR
vColor*=color;
#endif
#ifdef USE_INSTANCING_COLOR
vColor.xyz*=instanceColor.xyz;
#endif`
        , t9 = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a)clamp(a,0.0,1.0)
#endif
#define whiteComplement(a)(1.0-saturate(a))
float pow2(const in float x){return x*x;}vec3 pow2(const in vec3 x){return x*x;}float pow3(const in float x){return x*x*x;}float pow4(const in float x){float x2=x*x;return x2*x2;}float max3(const in vec3 v){return max(max(v.x,v.y),v.z);}float average(const in vec3 color){return dot(color,vec3(0.3333));}highp float rand(const in vec2 uv){const highp float a=12.9898,b=78.233,c=43758.5453;highp float dt=dot(uv.xy,vec2(a,b)),sn=mod(dt,PI);return fract(sin(sn)*c);}
#ifdef HIGH_PRECISION
float precisionSafeLength(vec3 v){return length(v);}
#else
float precisionSafeLength(vec3 v){float maxComponent=max3(abs(v));return length(v/maxComponent)*maxComponent;}
#endif
struct IncidentLight{vec3 color;vec3 direction;bool visible;};struct ReflectedLight{vec3 directDiffuse;vec3 directSpecular;vec3 indirectDiffuse;vec3 indirectSpecular;};struct GeometricContext{vec3 position;vec3 normal;vec3 viewDir;
#ifdef USE_CLEARCOAT
vec3 clearcoatNormal;
#endif
};vec3 transformDirection(in vec3 dir,in mat4 matrix){return normalize((matrix*vec4(dir,0.0)).xyz);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}mat3 transposeMat3(const in mat3 m){mat3 tmp;tmp[0]=vec3(m[0].x,m[1].x,m[2].x);tmp[1]=vec3(m[0].y,m[1].y,m[2].y);tmp[2]=vec3(m[0].z,m[1].z,m[2].z);return tmp;}float linearToRelativeLuminance(const in vec3 color){vec3 weights=vec3(0.2126,0.7152,0.0722);return dot(weights,color.rgb);}bool isPerspectiveMatrix(mat4 m){return m[2][3]==-1.0;}vec2 equirectUv(in vec3 dir){float u=atan(dir.z,dir.x)*RECIPROCAL_PI2+0.5;float v=asin(clamp(dir.y,-1.0,1.0))*RECIPROCAL_PI+0.5;return vec2(u,v);}`
        , ie = `#ifdef ENVMAP_TYPE_CUBE_UV
#define cubeUV_minMipLevel 4.0
#define cubeUV_minTileSize 16.0
float getFace(vec3 direction){vec3 absDirection=abs(direction);float face=-1.0;if(absDirection.x>absDirection.z){if(absDirection.x>absDirection.y)face=direction.x>0.0?0.0:3.0;else face=direction.y>0.0?1.0:4.0;}else{if(absDirection.z>absDirection.y)face=direction.z>0.0?2.0:5.0;else face=direction.y>0.0?1.0:4.0;}return face;}vec2 getUV(vec3 direction,float face){vec2 uv;if(face==0.0){uv=vec2(direction.z,direction.y)/abs(direction.x);}else if(face==1.0){uv=vec2(-direction.x,-direction.z)/abs(direction.y);}else if(face==2.0){uv=vec2(-direction.x,direction.y)/abs(direction.z);}else if(face==3.0){uv=vec2(-direction.z,direction.y)/abs(direction.x);}else if(face==4.0){uv=vec2(-direction.x,direction.z)/abs(direction.y);}else{uv=vec2(direction.x,direction.y)/abs(direction.z);}return 0.5*(uv+1.0);}vec3 bilinearCubeUV(sampler2D envMap,vec3 direction,float mipInt){float face=getFace(direction);float filterInt=max(cubeUV_minMipLevel-mipInt,0.0);mipInt=max(mipInt,cubeUV_minMipLevel);float faceSize=exp2(mipInt);vec2 uv=getUV(direction,face)*(faceSize-2.0)+1.0;if(face>2.0){uv.y+=faceSize;face-=3.0;}uv.x+=face*faceSize;uv.x+=filterInt*3.0*cubeUV_minTileSize;uv.y+=4.0*(exp2(CUBEUV_MAX_MIP)-faceSize);uv.x*=CUBEUV_TEXEL_WIDTH;uv.y*=CUBEUV_TEXEL_HEIGHT;
#ifdef texture2DGradEXT
return texture2DGradEXT(envMap,uv,vec2(0.0),vec2(0.0)).rgb;
#else
return texture2D(envMap,uv).rgb;
#endif
}
#define r0 1.0
#define v0 0.339
#define m0-2.0
#define r1 0.8
#define v1 0.276
#define m1-1.0
#define r4 0.4
#define v4 0.046
#define m4 2.0
#define r5 0.305
#define v5 0.016
#define m5 3.0
#define r6 0.21
#define v6 0.0038
#define m6 4.0
float roughnessToMip(float roughness){float mip=0.0;if(roughness>=r1){mip=(r0-roughness)*(m1-m0)/(r0-r1)+m0;}else if(roughness>=r4){mip=(r1-roughness)*(m4-m1)/(r1-r4)+m1;}else if(roughness>=r5){mip=(r4-roughness)*(m5-m4)/(r4-r5)+m4;}else if(roughness>=r6){mip=(r5-roughness)*(m6-m5)/(r5-r6)+m5;}else{mip=-2.0*log2(1.16*roughness);}return mip;}vec4 textureCubeUV(sampler2D envMap,vec3 sampleDir,float roughness){float mip=clamp(roughnessToMip(roughness),m0,CUBEUV_MAX_MIP);float mipF=fract(mip);float mipInt=floor(mip);vec3 color0=bilinearCubeUV(envMap,sampleDir,mipInt);if(mipF==0.0){return vec4(color0,1.0);}else{vec3 color1=bilinearCubeUV(envMap,sampleDir,mipInt+1.0);return vec4(mix(color0,color1,mipF),1.0);}}
#endif`
        , it = `vec3 transformedNormal=objectNormal;
#ifdef USE_INSTANCING
mat3 m=mat3(instanceMatrix);transformedNormal/=vec3(dot(m[0],m[0]),dot(m[1],m[1]),dot(m[2],m[2]));transformedNormal=m*transformedNormal;
#endif
transformedNormal=normalMatrix*transformedNormal;
#ifdef FLIP_SIDED
transformedNormal=-transformedNormal;
#endif
#ifdef USE_TANGENT
vec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.0)).xyz;
#ifdef FLIP_SIDED
transformedTangent=-transformedTangent;
#endif
#endif`
        , ii = `#ifdef USE_DISPLACEMENTMAP
uniform sampler2D displacementMap;uniform float displacementScale;uniform float displacementBias;
#endif`
        , ir = `#ifdef USE_DISPLACEMENTMAP
transformed+=normalize(objectNormal)*(texture2D(displacementMap,vUv).x*displacementScale+displacementBias);
#endif`
        , ia = `#ifdef USE_EMISSIVEMAP
vec4 emissiveColor=texture2D(emissiveMap,vUv);totalEmissiveRadiance*=emissiveColor.rgb;
#endif`
        , is = `#ifdef USE_EMISSIVEMAP
uniform sampler2D emissiveMap;
#endif`
        , io = `#ifdef USE_ENVMAP
#ifdef ENV_WORLDPOS
vec3 cameraToFrag;if(isOrthographic){cameraToFrag=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToFrag=normalize(vWorldPosition-cameraPosition);}vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);
#ifdef ENVMAP_MODE_REFLECTION
vec3 reflectVec=reflect(cameraToFrag,worldNormal);
#else
vec3 reflectVec=refract(cameraToFrag,worldNormal,refractionRatio);
#endif
#else
vec3 reflectVec=vReflect;
#endif
#ifdef ENVMAP_TYPE_CUBE
vec4 envColor=textureCube(envMap,vec3(flipEnvMap*reflectVec.x,reflectVec.yz));
#elif defined(ENVMAP_TYPE_CUBE_UV)
vec4 envColor=textureCubeUV(envMap,reflectVec,0.0);
#else
vec4 envColor=vec4(0.0);
#endif
#ifdef ENVMAP_BLENDING_MULTIPLY
outgoingLight=mix(outgoingLight,outgoingLight*envColor.xyz,specularStrength*reflectivity);
#elif defined(ENVMAP_BLENDING_MIX)
outgoingLight=mix(outgoingLight,envColor.xyz,specularStrength*reflectivity);
#elif defined(ENVMAP_BLENDING_ADD)
outgoingLight+=envColor.xyz*specularStrength*reflectivity;
#endif
#endif`
        , il = `#ifdef USE_ENVMAP
uniform float envMapIntensity;uniform float flipEnvMap;
#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#else
uniform sampler2D envMap;
#endif
#endif`
        , ih = `#ifdef USE_ENVMAP
uniform float reflectivity;
#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;uniform float refractionRatio;
#else
varying vec3 vReflect;
#endif
#endif`
        , ic = `#ifdef USE_ENVMAP
#if defined(USE_BUMPMAP)||defined(USE_NORMALMAP)||defined(PHONG)
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;
#else
varying vec3 vReflect;uniform float refractionRatio;
#endif
#endif`
        , id = `#ifdef USE_ENVMAP
#ifdef ENV_WORLDPOS
vWorldPosition=worldPosition.xyz;
#else
vec3 cameraToVertex;if(isOrthographic){cameraToVertex=normalize(vec3(-viewMatrix[0][2],-viewMatrix[1][2],-viewMatrix[2][2]));}else{cameraToVertex=normalize(worldPosition.xyz-cameraPosition);}vec3 worldNormal=inverseTransformDirection(transformedNormal,viewMatrix);
#ifdef ENVMAP_MODE_REFLECTION
vReflect=reflect(cameraToVertex,worldNormal);
#else
vReflect=refract(cameraToVertex,worldNormal,refractionRatio);
#endif
#endif
#endif`
        , iu = `#ifdef USE_FOG
vFogDepth=-mvPosition.z;
#endif`
        , ip = `#ifdef USE_FOG
varying float vFogDepth;
#endif`
        , im = `#ifdef USE_FOG
#ifdef FOG_EXP2
float fogFactor=1.0-exp(-fogDensity*fogDensity*vFogDepth*vFogDepth);
#else
float fogFactor=smoothstep(fogNear,fogFar,vFogDepth);
#endif
gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);
#endif`
        , ig = `#ifdef USE_FOG
uniform vec3 fogColor;varying float vFogDepth;
#ifdef FOG_EXP2
uniform float fogDensity;
#else
uniform float fogNear;uniform float fogFar;
#endif
#endif`
        , iv = `#ifdef USE_GRADIENTMAP
uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance(vec3 normal,vec3 lightDirection){float dotNL=dot(normal,lightDirection);vec2 coord=vec2(dotNL*0.5+0.5,0.0);
#ifdef USE_GRADIENTMAP
return vec3(texture2D(gradientMap,coord).r);
#else
return(coord.x<0.7)?vec3(0.7):vec3(1.0);
#endif
}`
        , i_ = `#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;reflectedLight.indirectDiffuse+=lightMapIrradiance;
#endif`
        , ix = `#ifdef USE_LIGHTMAP
uniform sampler2D lightMap;uniform float lightMapIntensity;
#endif`
        , iy = `vec3 diffuse=vec3(1.0);GeometricContext geometry;geometry.position=mvPosition.xyz;geometry.normal=normalize(transformedNormal);geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(-mvPosition.xyz);GeometricContext backGeometry;backGeometry.position=geometry.position;backGeometry.normal=-geometry.normal;backGeometry.viewDir=geometry.viewDir;vLightFront=vec3(0.0);vIndirectFront=vec3(0.0);
#ifdef DOUBLE_SIDED
vLightBack=vec3(0.0);vIndirectBack=vec3(0.0);
#endif
IncidentLight directLight;float dotNL;vec3 directLightColor_Diffuse;vIndirectFront+=getAmbientLightIrradiance(ambientLightColor);vIndirectFront+=getLightProbeIrradiance(lightProbe,geometry.normal);
#ifdef DOUBLE_SIDED
vIndirectBack+=getAmbientLightIrradiance(ambientLightColor);vIndirectBack+=getLightProbeIrradiance(lightProbe,backGeometry.normal);
#endif
#if NUM_POINT_LIGHTS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHTS;i++){getPointLightInfo(pointLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;
#ifdef DOUBLE_SIDED
vLightBack+=saturate(-dotNL)*directLightColor_Diffuse;
#endif
}
#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHTS;i++){getSpotLightInfo(spotLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;
#ifdef DOUBLE_SIDED
vLightBack+=saturate(-dotNL)*directLightColor_Diffuse;
#endif
}
#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHTS;i++){getDirectionalLightInfo(directionalLights[i],geometry,directLight);dotNL=dot(geometry.normal,directLight.direction);directLightColor_Diffuse=directLight.color;vLightFront+=saturate(dotNL)*directLightColor_Diffuse;
#ifdef DOUBLE_SIDED
vLightBack+=saturate(-dotNL)*directLightColor_Diffuse;
#endif
}
#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_HEMI_LIGHTS;i++){vIndirectFront+=getHemisphereLightIrradiance(hemisphereLights[i],geometry.normal);
#ifdef DOUBLE_SIDED
vIndirectBack+=getHemisphereLightIrradiance(hemisphereLights[i],backGeometry.normal);
#endif
}
#pragma unroll_loop_end
#endif`
        , iM = `uniform bool receiveShadow;uniform vec3 ambientLightColor;uniform vec3 lightProbe[9];vec3 shGetIrradianceAt(in vec3 normal,in vec3 shCoefficients[9]){float x=normal.x,y=normal.y,z=normal.z;vec3 result=shCoefficients[0]*0.886227;result+=shCoefficients[1]*2.0*0.511664*y;result+=shCoefficients[2]*2.0*0.511664*z;result+=shCoefficients[3]*2.0*0.511664*x;result+=shCoefficients[4]*2.0*0.429043*x*y;result+=shCoefficients[5]*2.0*0.429043*y*z;result+=shCoefficients[6]*(0.743125*z*z-0.247708);result+=shCoefficients[7]*2.0*0.429043*x*z;result+=shCoefficients[8]*0.429043*(x*x-y*y);return result;}vec3 getLightProbeIrradiance(const in vec3 lightProbe[9],const in vec3 normal){vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec3 irradiance=shGetIrradianceAt(worldNormal,lightProbe);return irradiance;}vec3 getAmbientLightIrradiance(const in vec3 ambientLightColor){vec3 irradiance=ambientLightColor;return irradiance;}float getDistanceAttenuation(const in float lightDistance,const in float cutoffDistance,const in float decayExponent){
#if defined(PHYSICALLY_CORRECT_LIGHTS)
float distanceFalloff=1.0/max(pow(lightDistance,decayExponent),0.01);if(cutoffDistance>0.0){distanceFalloff*=pow2(saturate(1.0-pow4(lightDistance/cutoffDistance)));}return distanceFalloff;
#else
if(cutoffDistance>0.0&&decayExponent>0.0){return pow(saturate(-lightDistance/cutoffDistance+1.0),decayExponent);}return 1.0;
#endif
}float getSpotAttenuation(const in float coneCosine,const in float penumbraCosine,const in float angleCosine){return smoothstep(coneCosine,penumbraCosine,angleCosine);}
#if NUM_DIR_LIGHTS>0
struct DirectionalLight{vec3 direction;vec3 color;};uniform DirectionalLight directionalLights[NUM_DIR_LIGHTS];void getDirectionalLightInfo(const in DirectionalLight directionalLight,const in GeometricContext geometry,out IncidentLight light){light.color=directionalLight.color;light.direction=directionalLight.direction;light.visible=true;}
#endif
#if NUM_POINT_LIGHTS>0
struct PointLight{vec3 position;vec3 color;float distance;float decay;};uniform PointLight pointLights[NUM_POINT_LIGHTS];void getPointLightInfo(const in PointLight pointLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=pointLight.position-geometry.position;light.direction=normalize(lVector);float lightDistance=length(lVector);light.color=pointLight.color;light.color*=getDistanceAttenuation(lightDistance,pointLight.distance,pointLight.decay);light.visible=(light.color!=vec3(0.0));}
#endif
#if NUM_SPOT_LIGHTS>0
struct SpotLight{vec3 position;vec3 direction;vec3 color;float distance;float decay;float coneCos;float penumbraCos;};uniform SpotLight spotLights[NUM_SPOT_LIGHTS];void getSpotLightInfo(const in SpotLight spotLight,const in GeometricContext geometry,out IncidentLight light){vec3 lVector=spotLight.position-geometry.position;light.direction=normalize(lVector);float angleCos=dot(light.direction,spotLight.direction);float spotAttenuation=getSpotAttenuation(spotLight.coneCos,spotLight.penumbraCos,angleCos);if(spotAttenuation>0.0){float lightDistance=length(lVector);light.color=spotLight.color*spotAttenuation;light.color*=getDistanceAttenuation(lightDistance,spotLight.distance,spotLight.decay);light.visible=(light.color!=vec3(0.0));}else{light.color=vec3(0.0);light.visible=false;}}
#endif
#if NUM_RECT_AREA_LIGHTS>0
struct RectAreaLight{vec3 color;vec3 position;vec3 halfWidth;vec3 halfHeight;};uniform sampler2D ltc_1;uniform sampler2D ltc_2;uniform RectAreaLight rectAreaLights[NUM_RECT_AREA_LIGHTS];
#endif
#if NUM_HEMI_LIGHTS>0
struct HemisphereLight{vec3 direction;vec3 skyColor;vec3 groundColor;};uniform HemisphereLight hemisphereLights[NUM_HEMI_LIGHTS];vec3 getHemisphereLightIrradiance(const in HemisphereLight hemiLight,const in vec3 normal){float dotNL=dot(normal,hemiLight.direction);float hemiDiffuseWeight=0.5*dotNL+0.5;vec3 irradiance=mix(hemiLight.groundColor,hemiLight.skyColor,hemiDiffuseWeight);return irradiance;}
#endif`
        , ib = `#if defined(USE_ENVMAP)
vec3 getIBLIrradiance(const in vec3 normal){
#if defined(ENVMAP_TYPE_CUBE_UV)
vec3 worldNormal=inverseTransformDirection(normal,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,worldNormal,1.0);return PI*envMapColor.rgb*envMapIntensity;
#else
return vec3(0.0);
#endif
}vec3 getIBLRadiance(const in vec3 viewDir,const in vec3 normal,const in float roughness){
#if defined(ENVMAP_TYPE_CUBE_UV)
vec3 reflectVec=reflect(-viewDir,normal);reflectVec=normalize(mix(reflectVec,normal,roughness*roughness));reflectVec=inverseTransformDirection(reflectVec,viewMatrix);vec4 envMapColor=textureCubeUV(envMap,reflectVec,roughness);return envMapColor.rgb*envMapIntensity;
#else
return vec3(0.0);
#endif
}
#endif`
        , iS = `varying vec3 vViewPosition;struct ToonMaterial{vec3 diffuseColor;};void RE_Direct_Toon(const in IncidentLight directLight,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){vec3 irradiance=getGradientIrradiance(geometry.normal,directLight.direction)*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Toon(const in vec3 irradiance,const in GeometricContext geometry,const in ToonMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_Toon
#define RE_IndirectDiffuse RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD(material)(0)`
        , iw = `varying vec3 vViewPosition;struct BlinnPhongMaterial{vec3 diffuseColor;vec3 specularColor;float specularShininess;float specularStrength;};void RE_Direct_BlinnPhong(const in IncidentLight directLight,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);reflectedLight.directSpecular+=irradiance*BRDF_BlinnPhong(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularShininess)*material.specularStrength;}void RE_IndirectDiffuse_BlinnPhong(const in vec3 irradiance,const in GeometricContext geometry,const in BlinnPhongMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}
#define RE_Direct RE_Direct_BlinnPhong
#define RE_IndirectDiffuse RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD(material)(0)`
        , iT = `PhysicalMaterial material;material.diffuseColor=diffuseColor.rgb*(1.0-metalnessFactor);vec3 dxy=max(abs(dFdx(geometryNormal)),abs(dFdy(geometryNormal)));float geometryRoughness=max(max(dxy.x,dxy.y),dxy.z);material.roughness=max(roughnessFactor,0.0525);material.roughness+=geometryRoughness;material.roughness=min(material.roughness,1.0);
#ifdef IOR
#ifdef SPECULAR
float specularIntensityFactor=specularIntensity;vec3 specularColorFactor=specularColor;
#ifdef USE_SPECULARINTENSITYMAP
specularIntensityFactor*=texture2D(specularIntensityMap,vUv).a;
#endif
#ifdef USE_SPECULARCOLORMAP
specularColorFactor*=texture2D(specularColorMap,vUv).rgb;
#endif
material.specularF90=mix(specularIntensityFactor,1.0,metalnessFactor);
#else
float specularIntensityFactor=1.0;vec3 specularColorFactor=vec3(1.0);material.specularF90=1.0;
#endif
material.specularColor=mix(min(pow2((ior-1.0)/(ior+1.0))*specularColorFactor,vec3(1.0))*specularIntensityFactor,diffuseColor.rgb,metalnessFactor);
#else
material.specularColor=mix(vec3(0.04),diffuseColor.rgb,metalnessFactor);material.specularF90=1.0;
#endif
#ifdef USE_CLEARCOAT
material.clearcoat=clearcoat;material.clearcoatRoughness=clearcoatRoughness;material.clearcoatF0=vec3(0.04);material.clearcoatF90=1.0;
#ifdef USE_CLEARCOATMAP
material.clearcoat*=texture2D(clearcoatMap,vUv).x;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
material.clearcoatRoughness*=texture2D(clearcoatRoughnessMap,vUv).y;
#endif
material.clearcoat=saturate(material.clearcoat);material.clearcoatRoughness=max(material.clearcoatRoughness,0.0525);material.clearcoatRoughness+=geometryRoughness;material.clearcoatRoughness=min(material.clearcoatRoughness,1.0);
#endif
#ifdef USE_IRIDESCENCE
material.iridescence=iridescence;material.iridescenceIOR=iridescenceIOR;
#ifdef USE_IRIDESCENCEMAP
material.iridescence*=texture2D(iridescenceMap,vUv).r;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
material.iridescenceThickness=(iridescenceThicknessMaximum-iridescenceThicknessMinimum)*texture2D(iridescenceThicknessMap,vUv).g+iridescenceThicknessMinimum;
#else
material.iridescenceThickness=iridescenceThicknessMaximum;
#endif
#endif
#ifdef USE_SHEEN
material.sheenColor=sheenColor;
#ifdef USE_SHEENCOLORMAP
material.sheenColor*=texture2D(sheenColorMap,vUv).rgb;
#endif
material.sheenRoughness=clamp(sheenRoughness,0.07,1.0);
#ifdef USE_SHEENROUGHNESSMAP
material.sheenRoughness*=texture2D(sheenRoughnessMap,vUv).a;
#endif
#endif`
        , iE = `struct PhysicalMaterial{vec3 diffuseColor;float roughness;vec3 specularColor;float specularF90;
#ifdef USE_CLEARCOAT
float clearcoat;float clearcoatRoughness;vec3 clearcoatF0;float clearcoatF90;
#endif
#ifdef USE_IRIDESCENCE
float iridescence;float iridescenceIOR;float iridescenceThickness;vec3 iridescenceFresnel;vec3 iridescenceF0;
#endif
#ifdef USE_SHEEN
vec3 sheenColor;float sheenRoughness;
#endif
};vec3 clearcoatSpecular=vec3(0.0);vec3 sheenSpecular=vec3(0.0);float IBLSheenBRDF(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));float r2=roughness*roughness;float a=roughness<0.25?-339.2*r2+161.4*roughness-25.9:-8.48*r2+14.3*roughness-9.95;float b=roughness<0.25?44.0*r2-23.7*roughness+3.26:1.97*r2-3.27*roughness+0.72;float DG=exp(a*dotNV+b)+(roughness<0.25?0.0:0.1*(roughness-0.25));return saturate(DG*RECIPROCAL_PI);}vec2 DFGApprox(const in vec3 normal,const in vec3 viewDir,const in float roughness){float dotNV=saturate(dot(normal,viewDir));const vec4 c0=vec4(-1,-0.0275,-0.572,0.022);const vec4 c1=vec4(1,0.0425,1.04,-0.04);vec4 r=roughness*c0+c1;float a004=min(r.x*r.x,exp2(-9.28*dotNV))*r.x+r.y;vec2 fab=vec2(-1.04,1.04)*a004+r.zw;return fab;}vec3 EnvironmentBRDF(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness){vec2 fab=DFGApprox(normal,viewDir,roughness);return specularColor*fab.x+specularF90*fab.y;}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float iridescence,const in vec3 iridescenceF0,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){
#else
void computeMultiscattering(const in vec3 normal,const in vec3 viewDir,const in vec3 specularColor,const in float specularF90,const in float roughness,inout vec3 singleScatter,inout vec3 multiScatter){
#endif
vec2 fab=DFGApprox(normal,viewDir,roughness);
#ifdef USE_IRIDESCENCE
vec3 Fr=mix(specularColor,iridescenceF0,iridescence);
#else
vec3 Fr=specularColor;
#endif
vec3 FssEss=Fr*fab.x+specularF90*fab.y;float Ess=fab.x+fab.y;float Ems=1.0-Ess;vec3 Favg=Fr+(1.0-Fr)*0.047619;vec3 Fms=FssEss*Favg/(1.0-Ems*Favg);singleScatter+=FssEss;multiScatter+=Fms*Ems;}
#if NUM_RECT_AREA_LIGHTS>0
void RE_Direct_RectArea_Physical(const in RectAreaLight rectAreaLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){vec3 normal=geometry.normal;vec3 viewDir=geometry.viewDir;vec3 position=geometry.position;vec3 lightPos=rectAreaLight.position;vec3 halfWidth=rectAreaLight.halfWidth;vec3 halfHeight=rectAreaLight.halfHeight;vec3 lightColor=rectAreaLight.color;float roughness=material.roughness;vec3 rectCoords[4];rectCoords[0]=lightPos+halfWidth-halfHeight;rectCoords[1]=lightPos-halfWidth-halfHeight;rectCoords[2]=lightPos-halfWidth+halfHeight;rectCoords[3]=lightPos+halfWidth+halfHeight;vec2 uv=LTC_Uv(normal,viewDir,roughness);vec4 t1=texture2D(ltc_1,uv);vec4 t2=texture2D(ltc_2,uv);mat3 mInv=mat3(vec3(t1.x,0,t1.y),vec3(0,1,0),vec3(t1.z,0,t1.w));vec3 fresnel=(material.specularColor*t2.x+(vec3(1.0)-material.specularColor)*t2.y);reflectedLight.directSpecular+=lightColor*fresnel*LTC_Evaluate(normal,viewDir,position,mInv,rectCoords);reflectedLight.directDiffuse+=lightColor*material.diffuseColor*LTC_Evaluate(normal,viewDir,position,mat3(1.0),rectCoords);}
#endif
void RE_Direct_Physical(const in IncidentLight directLight,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){float dotNL=saturate(dot(geometry.normal,directLight.direction));vec3 irradiance=dotNL*directLight.color;
#ifdef USE_CLEARCOAT
float dotNLcc=saturate(dot(geometry.clearcoatNormal,directLight.direction));vec3 ccIrradiance=dotNLcc*directLight.color;clearcoatSpecular+=ccIrradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.clearcoatNormal,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);
#endif
#ifdef USE_SHEEN
sheenSpecular+=irradiance*BRDF_Sheen(directLight.direction,geometry.viewDir,geometry.normal,material.sheenColor,material.sheenRoughness);
#endif
#ifdef USE_IRIDESCENCE
reflectedLight.directSpecular+=irradiance*BRDF_GGX_Iridescence(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularF90,material.iridescence,material.iridescenceFresnel,material.roughness);
#else
reflectedLight.directSpecular+=irradiance*BRDF_GGX(directLight.direction,geometry.viewDir,geometry.normal,material.specularColor,material.specularF90,material.roughness);
#endif
reflectedLight.directDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectDiffuse_Physical(const in vec3 irradiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){reflectedLight.indirectDiffuse+=irradiance*BRDF_Lambert(material.diffuseColor);}void RE_IndirectSpecular_Physical(const in vec3 radiance,const in vec3 irradiance,const in vec3 clearcoatRadiance,const in GeometricContext geometry,const in PhysicalMaterial material,inout ReflectedLight reflectedLight){
#ifdef USE_CLEARCOAT
clearcoatSpecular+=clearcoatRadiance*EnvironmentBRDF(geometry.clearcoatNormal,geometry.viewDir,material.clearcoatF0,material.clearcoatF90,material.clearcoatRoughness);
#endif
#ifdef USE_SHEEN
sheenSpecular+=irradiance*material.sheenColor*IBLSheenBRDF(geometry.normal,geometry.viewDir,material.sheenRoughness);
#endif
vec3 singleScattering=vec3(0.0);vec3 multiScattering=vec3(0.0);vec3 cosineWeightedIrradiance=irradiance*RECIPROCAL_PI;
#ifdef USE_IRIDESCENCE
computeMultiscatteringIridescence(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.iridescence,material.iridescenceFresnel,material.roughness,singleScattering,multiScattering);
#else
computeMultiscattering(geometry.normal,geometry.viewDir,material.specularColor,material.specularF90,material.roughness,singleScattering,multiScattering);
#endif
vec3 totalScattering=singleScattering+multiScattering;vec3 diffuse=material.diffuseColor*(1.0-max(max(totalScattering.r,totalScattering.g),totalScattering.b));reflectedLight.indirectSpecular+=radiance*singleScattering;reflectedLight.indirectSpecular+=multiScattering*cosineWeightedIrradiance;reflectedLight.indirectDiffuse+=diffuse*cosineWeightedIrradiance;}
#define RE_Direct RE_Direct_Physical
#define RE_Direct_RectArea RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular RE_IndirectSpecular_Physical
float computeSpecularOcclusion(const in float dotNV,const in float ambientOcclusion,const in float roughness){return saturate(pow(dotNV+ambientOcclusion,exp2(-16.0*roughness-1.0))-1.0+ambientOcclusion);}`
        , iA = `GeometricContext geometry;geometry.position=-vViewPosition;geometry.normal=normal;geometry.viewDir=(isOrthographic)?vec3(0,0,1):normalize(vViewPosition);
#ifdef USE_CLEARCOAT
geometry.clearcoatNormal=clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
float dotNVi=saturate(dot(normal,geometry.viewDir));if(material.iridescenceThickness==0.0){material.iridescence=0.0;}else{material.iridescence=saturate(material.iridescence);}if(material.iridescence>0.0){material.iridescenceFresnel=evalIridescence(1.0,material.iridescenceIOR,dotNVi,material.iridescenceThickness,material.specularColor);material.iridescenceF0=Schlick_to_F0(material.iridescenceFresnel,1.0,dotNVi);}
#endif
IncidentLight directLight;
#if (NUM_POINT_LIGHTS>0)&&defined(RE_Direct)
PointLight pointLight;
#if defined(USE_SHADOWMAP)&&NUM_POINT_LIGHT_SHADOWS>0
PointLightShadow pointLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHTS;i++){pointLight=pointLights[i];getPointLightInfo(pointLight,geometry,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_POINT_LIGHT_SHADOWS)
pointLightShadow=pointLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getPointShadow(pointShadowMap[i],pointLightShadow.shadowMapSize,pointLightShadow.shadowBias,pointLightShadow.shadowRadius,vPointShadowCoord[i],pointLightShadow.shadowCameraNear,pointLightShadow.shadowCameraFar):1.0;
#endif
RE_Direct(directLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_SPOT_LIGHTS>0)&&defined(RE_Direct)
SpotLight spotLight;
#if defined(USE_SHADOWMAP)&&NUM_SPOT_LIGHT_SHADOWS>0
SpotLightShadow spotLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHTS;i++){spotLight=spotLights[i];getSpotLightInfo(spotLight,geometry,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_SPOT_LIGHT_SHADOWS)
spotLightShadow=spotLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(spotShadowMap[i],spotLightShadow.shadowMapSize,spotLightShadow.shadowBias,spotLightShadow.shadowRadius,vSpotShadowCoord[i]):1.0;
#endif
RE_Direct(directLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_DIR_LIGHTS>0)&&defined(RE_Direct)
DirectionalLight directionalLight;
#if defined(USE_SHADOWMAP)&&NUM_DIR_LIGHT_SHADOWS>0
DirectionalLightShadow directionalLightShadow;
#endif
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHTS;i++){directionalLight=directionalLights[i];getDirectionalLightInfo(directionalLight,geometry,directLight);
#if defined(USE_SHADOWMAP)&&(UNROLLED_LOOP_INDEX<NUM_DIR_LIGHT_SHADOWS)
directionalLightShadow=directionalLightShadows[i];directLight.color*=all(bvec2(directLight.visible,receiveShadow))?getShadow(directionalShadowMap[i],directionalLightShadow.shadowMapSize,directionalLightShadow.shadowBias,directionalLightShadow.shadowRadius,vDirectionalShadowCoord[i]):1.0;
#endif
RE_Direct(directLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if (NUM_RECT_AREA_LIGHTS>0)&&defined(RE_Direct_RectArea)
RectAreaLight rectAreaLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_RECT_AREA_LIGHTS;i++){rectAreaLight=rectAreaLights[i];RE_Direct_RectArea(rectAreaLight,geometry,material,reflectedLight);}
#pragma unroll_loop_end
#endif
#if defined(RE_IndirectDiffuse)
vec3 iblIrradiance=vec3(0.0);vec3 irradiance=getAmbientLightIrradiance(ambientLightColor);irradiance+=getLightProbeIrradiance(lightProbe,geometry.normal);
#if (NUM_HEMI_LIGHTS>0)
#pragma unroll_loop_start
for(int i=0;i<NUM_HEMI_LIGHTS;i++){irradiance+=getHemisphereLightIrradiance(hemisphereLights[i],geometry.normal);}
#pragma unroll_loop_end
#endif
#endif
#if defined(RE_IndirectSpecular)
vec3 radiance=vec3(0.0);vec3 clearcoatRadiance=vec3(0.0);
#endif`
        , iC = `#if defined(RE_IndirectDiffuse)
#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vUv2);vec3 lightMapIrradiance=lightMapTexel.rgb*lightMapIntensity;irradiance+=lightMapIrradiance;
#endif
#if defined(USE_ENVMAP)&&defined(STANDARD)&&defined(ENVMAP_TYPE_CUBE_UV)
iblIrradiance+=getIBLIrradiance(geometry.normal);
#endif
#endif
#if defined(USE_ENVMAP)&&defined(RE_IndirectSpecular)
radiance+=getIBLRadiance(geometry.viewDir,geometry.normal,material.roughness);
#ifdef USE_CLEARCOAT
clearcoatRadiance+=getIBLRadiance(geometry.viewDir,geometry.clearcoatNormal,material.clearcoatRoughness);
#endif
#endif`
        , iL = `#if defined(RE_IndirectDiffuse)
RE_IndirectDiffuse(irradiance,geometry,material,reflectedLight);
#endif
#if defined(RE_IndirectSpecular)
RE_IndirectSpecular(radiance,iblIrradiance,clearcoatRadiance,geometry,material,reflectedLight);
#endif`
        , iP = `#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)
gl_FragDepthEXT=vIsPerspective==0.0?gl_FragCoord.z:log2(vFragDepth)*logDepthBufFC*0.5;
#endif`
        , iR = `#if defined(USE_LOGDEPTHBUF)&&defined(USE_LOGDEPTHBUF_EXT)
uniform float logDepthBufFC;varying float vFragDepth;varying float vIsPerspective;
#endif`
        , iD = `#ifdef USE_LOGDEPTHBUF
#ifdef USE_LOGDEPTHBUF_EXT
varying float vFragDepth;varying float vIsPerspective;
#else
uniform float logDepthBufFC;
#endif
#endif`
        , iI = `#ifdef USE_LOGDEPTHBUF
#ifdef USE_LOGDEPTHBUF_EXT
vFragDepth=1.0+gl_Position.w;vIsPerspective=float(isPerspectiveMatrix(projectionMatrix));
#else
if(isPerspectiveMatrix(projectionMatrix)){gl_Position.z=log2(max(EPSILON,gl_Position.w+1.0))*logDepthBufFC-1.0;gl_Position.z*=gl_Position.w;}
#endif
#endif`
        , iN = `#ifdef USE_MAP
vec4 sampledDiffuseColor=texture2D(map,vUv);
#ifdef DECODE_VIDEO_TEXTURE
sampledDiffuseColor=vec4(mix(pow(sampledDiffuseColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),sampledDiffuseColor.rgb*0.0773993808,vec3(lessThanEqual(sampledDiffuseColor.rgb,vec3(0.04045)))),sampledDiffuseColor.w);
#endif
diffuseColor*=sampledDiffuseColor;
#endif`
        , iO = `#ifdef USE_MAP
uniform sampler2D map;
#endif`
        , iz = `#if defined(USE_MAP)||defined(USE_ALPHAMAP)
vec2 uv=(uvTransform*vec3(gl_PointCoord.x,1.0-gl_PointCoord.y,1)).xy;
#endif
#ifdef USE_MAP
diffuseColor*=texture2D(map,uv);
#endif
#ifdef USE_ALPHAMAP
diffuseColor.a*=texture2D(alphaMap,uv).g;
#endif`
        , iU = `#if defined(USE_MAP)||defined(USE_ALPHAMAP)
uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`
        , iF = `float metalnessFactor=metalness;
#ifdef USE_METALNESSMAP
vec4 texelMetalness=texture2D(metalnessMap,vUv);metalnessFactor*=texelMetalness.b;
#endif`
        , ik = `#ifdef USE_METALNESSMAP
uniform sampler2D metalnessMap;
#endif`
        , iB = `#if defined(USE_MORPHCOLORS)&&defined(MORPHTARGETS_TEXTURE)
vColor*=morphTargetBaseInfluence;for(int i=0;i<MORPHTARGETS_COUNT;i++){
#if defined(USE_COLOR_ALPHA)
if(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2)*morphTargetInfluences[i];
#elif defined(USE_COLOR)
if(morphTargetInfluences[i]!=0.0)vColor+=getMorph(gl_VertexID,i,2).rgb*morphTargetInfluences[i];
#endif
}
#endif`
        , iH = `#ifdef USE_MORPHNORMALS
objectNormal*=morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
for(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)objectNormal+=getMorph(gl_VertexID,i,1).xyz*morphTargetInfluences[i];}
#else
objectNormal+=morphNormal0*morphTargetInfluences[0];objectNormal+=morphNormal1*morphTargetInfluences[1];objectNormal+=morphNormal2*morphTargetInfluences[2];objectNormal+=morphNormal3*morphTargetInfluences[3];
#endif
#endif`
        , iG = `#ifdef USE_MORPHTARGETS
uniform float morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
uniform float morphTargetInfluences[MORPHTARGETS_COUNT];uniform sampler2DArray morphTargetsTexture;uniform ivec2 morphTargetsTextureSize;vec4 getMorph(const in int vertexIndex,const in int morphTargetIndex,const in int offset){int texelIndex=vertexIndex*MORPHTARGETS_TEXTURE_STRIDE+offset;int y=texelIndex/morphTargetsTextureSize.x;int x=texelIndex-y*morphTargetsTextureSize.x;ivec3 morphUV=ivec3(x,y,morphTargetIndex);return texelFetch(morphTargetsTexture,morphUV,0);}
#else
#ifndef USE_MORPHNORMALS
uniform float morphTargetInfluences[8];
#else
uniform float morphTargetInfluences[4];
#endif
#endif
#endif`
        , iV = `#ifdef USE_MORPHTARGETS
transformed*=morphTargetBaseInfluence;
#ifdef MORPHTARGETS_TEXTURE
for(int i=0;i<MORPHTARGETS_COUNT;i++){if(morphTargetInfluences[i]!=0.0)transformed+=getMorph(gl_VertexID,i,0).xyz*morphTargetInfluences[i];}
#else
transformed+=morphTarget0*morphTargetInfluences[0];transformed+=morphTarget1*morphTargetInfluences[1];transformed+=morphTarget2*morphTargetInfluences[2];transformed+=morphTarget3*morphTargetInfluences[3];
#ifndef USE_MORPHNORMALS
transformed+=morphTarget4*morphTargetInfluences[4];transformed+=morphTarget5*morphTargetInfluences[5];transformed+=morphTarget6*morphTargetInfluences[6];transformed+=morphTarget7*morphTargetInfluences[7];
#endif
#endif
#endif`
        , iW = `float faceDirection=gl_FrontFacing?1.0:-1.0;
#ifdef FLAT_SHADED
vec3 fdx=vec3(dFdx(vViewPosition.x),dFdx(vViewPosition.y),dFdx(vViewPosition.z));vec3 fdy=vec3(dFdy(vViewPosition.x),dFdy(vViewPosition.y),dFdy(vViewPosition.z));vec3 normal=normalize(cross(fdx,fdy));
#else
vec3 normal=normalize(vNormal);
#ifdef DOUBLE_SIDED
normal=normal*faceDirection;
#endif
#ifdef USE_TANGENT
vec3 tangent=normalize(vTangent);vec3 bitangent=normalize(vBitangent);
#ifdef DOUBLE_SIDED
tangent=tangent*faceDirection;bitangent=bitangent*faceDirection;
#endif
#if defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP)
mat3 vTBN=mat3(tangent,bitangent,normal);
#endif
#endif
#endif
vec3 geometryNormal=normal;`
        , ij = `#ifdef OBJECTSPACE_NORMALMAP
normal=texture2D(normalMap,vUv).xyz*2.0-1.0;
#ifdef FLIP_SIDED
normal=-normal;
#endif
#ifdef DOUBLE_SIDED
normal=normal*faceDirection;
#endif
normal=normalize(normalMatrix*normal);
#elif defined(TANGENTSPACE_NORMALMAP)
vec3 mapN=texture2D(normalMap,vUv).xyz*2.0-1.0;mapN.xy*=normalScale;
#ifdef USE_TANGENT
normal=normalize(vTBN*mapN);
#else
normal=perturbNormal2Arb(-vViewPosition,normal,mapN,faceDirection);
#endif
#elif defined(USE_BUMPMAP)
normal=perturbNormalArb(-vViewPosition,normal,dHdxy_fwd(),faceDirection);
#endif`
        , iq = `#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;varying vec3 vBitangent;
#endif
#endif`
        , iX = `#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;varying vec3 vBitangent;
#endif
#endif`
        , iY = `#ifndef FLAT_SHADED
vNormal=normalize(transformedNormal);
#ifdef USE_TANGENT
vTangent=normalize(transformedTangent);vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);
#endif
#endif`
        , iZ = `#ifdef USE_NORMALMAP
uniform sampler2D normalMap;uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
uniform mat3 normalMatrix;
#endif
#if !defined(USE_TANGENT)&&(defined(TANGENTSPACE_NORMALMAP)||defined(USE_CLEARCOAT_NORMALMAP))
vec3 perturbNormal2Arb(vec3 eye_pos,vec3 surf_norm,vec3 mapN,float faceDirection){vec3 q0=vec3(dFdx(eye_pos.x),dFdx(eye_pos.y),dFdx(eye_pos.z));vec3 q1=vec3(dFdy(eye_pos.x),dFdy(eye_pos.y),dFdy(eye_pos.z));vec2 st0=dFdx(vUv.st);vec2 st1=dFdy(vUv.st);vec3 N=surf_norm;vec3 q1perp=cross(q1,N);vec3 q0perp=cross(N,q0);vec3 T=q1perp*st0.x+q0perp*st1.x;vec3 B=q1perp*st0.y+q0perp*st1.y;float det=max(dot(T,T),dot(B,B));float scale=(det==0.0)?0.0:faceDirection*inversesqrt(det);return normalize(T*(mapN.x*scale)+B*(mapN.y*scale)+N*mapN.z);}
#endif`
        , iJ = `#ifdef USE_CLEARCOAT
vec3 clearcoatNormal=geometryNormal;
#endif`
        , iK = `#ifdef USE_CLEARCOAT_NORMALMAP
vec3 clearcoatMapN=texture2D(clearcoatNormalMap,vUv).xyz*2.0-1.0;clearcoatMapN.xy*=clearcoatNormalScale;
#ifdef USE_TANGENT
clearcoatNormal=normalize(vTBN*clearcoatMapN);
#else
clearcoatNormal=perturbNormal2Arb(-vViewPosition,clearcoatNormal,clearcoatMapN,faceDirection);
#endif
#endif`
        , iQ = `#ifdef USE_CLEARCOATMAP
uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform sampler2D clearcoatNormalMap;uniform vec2 clearcoatNormalScale;
#endif`
        , i$ = `#ifdef USE_IRIDESCENCEMAP
uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform sampler2D iridescenceThicknessMap;
#endif`
        , i0 = `#ifdef OPAQUE
diffuseColor.a=1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a*=transmissionAlpha+0.1;
#endif
gl_FragColor=vec4(outgoingLight,diffuseColor.a);`
        , i1 = `#ifdef PREMULTIPLIED_ALPHA
gl_FragColor.rgb*=gl_FragColor.a;
#endif`
        , i3 = `vec4 mvPosition=vec4(transformed,1.0);
#ifdef USE_INSTANCING
mvPosition=instanceMatrix*mvPosition;
#endif
mvPosition=modelViewMatrix*mvPosition;gl_Position=projectionMatrix*mvPosition;`
        , i2 = `#ifdef DITHERING
gl_FragColor.rgb=dithering(gl_FragColor.rgb);
#endif`
        , i4 = `#ifdef DITHERING
vec3 dithering(vec3 color){float grid_position=rand(gl_FragCoord.xy);vec3 dither_shift_RGB=vec3(0.25/255.0,-0.25/255.0,0.25/255.0);dither_shift_RGB=mix(2.0*dither_shift_RGB,-2.0*dither_shift_RGB,grid_position);return color+dither_shift_RGB;}
#endif`
        , i5 = `float roughnessFactor=roughness;
#ifdef USE_ROUGHNESSMAP
vec4 texelRoughness=texture2D(roughnessMap,vUv);roughnessFactor*=texelRoughness.g;
#endif`
        , i6 = `#ifdef USE_ROUGHNESSMAP
uniform sampler2D roughnessMap;
#endif`
        , i8 = `#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
uniform sampler2D directionalShadowMap[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
uniform sampler2D spotShadowMap[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
uniform sampler2D pointShadowMap[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];
#endif
float texture2DCompare(sampler2D depths,vec2 uv,float compare){return step(compare,unpackRGBAToDepth(texture2D(depths,uv)));}vec2 texture2DDistribution(sampler2D shadow,vec2 uv){return unpackRGBATo2Half(texture2D(shadow,uv));}float VSMShadow(sampler2D shadow,vec2 uv,float compare){float occlusion=1.0;vec2 distribution=texture2DDistribution(shadow,uv);float hard_shadow=step(compare,distribution.x);if(hard_shadow!=1.0){float distance=compare-distribution.x;float variance=max(0.00000,distribution.y*distribution.y);float softness_probability=variance/(variance+distance*distance);softness_probability=clamp((softness_probability-0.3)/(0.95-0.3),0.0,1.0);occlusion=clamp(max(hard_shadow,softness_probability),0.0,1.0);}return occlusion;}float getShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord){float shadow=1.0;shadowCoord.xyz/=shadowCoord.w;shadowCoord.z+=shadowBias;bvec4 inFrustumVec=bvec4(shadowCoord.x>=0.0,shadowCoord.x<=1.0,shadowCoord.y>=0.0,shadowCoord.y<=1.0);bool inFrustum=all(inFrustumVec);bvec2 frustumTestVec=bvec2(inFrustum,shadowCoord.z<=1.0);bool frustumTest=all(frustumTestVec);if(frustumTest){
#if defined(SHADOWMAP_TYPE_PCF)
vec2 texelSize=vec2(1.0)/shadowMapSize;float dx0=-texelSize.x*shadowRadius;float dy0=-texelSize.y*shadowRadius;float dx1=+texelSize.x*shadowRadius;float dy1=+texelSize.y*shadowRadius;float dx2=dx0/2.0;float dy2=dy0/2.0;float dx3=dx1/2.0;float dy3=dy1/2.0;shadow=(texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy2),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,0.0),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx2,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx3,dy3),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(0.0,dy1),shadowCoord.z)+texture2DCompare(shadowMap,shadowCoord.xy+vec2(dx1,dy1),shadowCoord.z))*(1.0/17.0);
#elif defined(SHADOWMAP_TYPE_PCF_SOFT)
vec2 texelSize=vec2(1.0)/shadowMapSize;float dx=texelSize.x;float dy=texelSize.y;vec2 uv=shadowCoord.xy;vec2 f=fract(uv*shadowMapSize+0.5);uv-=f*texelSize;shadow=(texture2DCompare(shadowMap,uv,shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(dx,0.0),shadowCoord.z)+texture2DCompare(shadowMap,uv+vec2(0.0,dy),shadowCoord.z)+texture2DCompare(shadowMap,uv+texelSize,shadowCoord.z)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,0.0),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,0.0),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(-dx,dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,dy),shadowCoord.z),f.x)+mix(texture2DCompare(shadowMap,uv+vec2(0.0,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(0.0,2.0*dy),shadowCoord.z),f.y)+mix(texture2DCompare(shadowMap,uv+vec2(dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(dx,2.0*dy),shadowCoord.z),f.y)+mix(mix(texture2DCompare(shadowMap,uv+vec2(-dx,-dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,-dy),shadowCoord.z),f.x),mix(texture2DCompare(shadowMap,uv+vec2(-dx,2.0*dy),shadowCoord.z),texture2DCompare(shadowMap,uv+vec2(2.0*dx,2.0*dy),shadowCoord.z),f.x),f.y))*(1.0/9.0);
#elif defined(SHADOWMAP_TYPE_VSM)
shadow=VSMShadow(shadowMap,shadowCoord.xy,shadowCoord.z);
#else
shadow=texture2DCompare(shadowMap,shadowCoord.xy,shadowCoord.z);
#endif
}return shadow;}vec2 cubeToUV(vec3 v,float texelSizeY){vec3 absV=abs(v);float scaleToCube=1.0/max(absV.x,max(absV.y,absV.z));absV*=scaleToCube;v*=scaleToCube*(1.0-2.0*texelSizeY);vec2 planar=v.xy;float almostATexel=1.5*texelSizeY;float almostOne=1.0-almostATexel;if(absV.z>=almostOne){if(v.z>0.0)planar.x=4.0-v.x;}else if(absV.x>=almostOne){float signX=sign(v.x);planar.x=v.z*signX+2.0*signX;}else if(absV.y>=almostOne){float signY=sign(v.y);planar.x=v.x+2.0*signY+2.0;planar.y=v.z*signY-2.0;}return vec2(0.125,0.25)*planar+vec2(0.375,0.75);}float getPointShadow(sampler2D shadowMap,vec2 shadowMapSize,float shadowBias,float shadowRadius,vec4 shadowCoord,float shadowCameraNear,float shadowCameraFar){vec2 texelSize=vec2(1.0)/(shadowMapSize*vec2(4.0,2.0));vec3 lightToPosition=shadowCoord.xyz;float dp=(length(lightToPosition)-shadowCameraNear)/(shadowCameraFar-shadowCameraNear);dp+=shadowBias;vec3 bd3D=normalize(lightToPosition);
#if defined(SHADOWMAP_TYPE_PCF)||defined(SHADOWMAP_TYPE_PCF_SOFT)||defined(SHADOWMAP_TYPE_VSM)
vec2 offset=vec2(-1,1)*shadowRadius*texelSize.y;return(texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yyx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxy,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.xxx,texelSize.y),dp)+texture2DCompare(shadowMap,cubeToUV(bd3D+offset.yxx,texelSize.y),dp))*(1.0/9.0);
#else
return texture2DCompare(shadowMap,cubeToUV(bd3D,texelSize.y),dp);
#endif
}
#endif`
        , i7 = `#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
uniform mat4 directionalShadowMatrix[NUM_DIR_LIGHT_SHADOWS];varying vec4 vDirectionalShadowCoord[NUM_DIR_LIGHT_SHADOWS];struct DirectionalLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform DirectionalLightShadow directionalLightShadows[NUM_DIR_LIGHT_SHADOWS];
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
uniform mat4 spotShadowMatrix[NUM_SPOT_LIGHT_SHADOWS];varying vec4 vSpotShadowCoord[NUM_SPOT_LIGHT_SHADOWS];struct SpotLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;};uniform SpotLightShadow spotLightShadows[NUM_SPOT_LIGHT_SHADOWS];
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
uniform mat4 pointShadowMatrix[NUM_POINT_LIGHT_SHADOWS];varying vec4 vPointShadowCoord[NUM_POINT_LIGHT_SHADOWS];struct PointLightShadow{float shadowBias;float shadowNormalBias;float shadowRadius;vec2 shadowMapSize;float shadowCameraNear;float shadowCameraFar;};uniform PointLightShadow pointLightShadows[NUM_POINT_LIGHT_SHADOWS];
#endif
#endif`
        , i9 = `#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0||NUM_SPOT_LIGHT_SHADOWS>0||NUM_POINT_LIGHT_SHADOWS>0
vec3 shadowWorldNormal=inverseTransformDirection(transformedNormal,viewMatrix);vec4 shadowWorldPosition;
#endif
#if NUM_DIR_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*directionalLightShadows[i].shadowNormalBias,0);vDirectionalShadowCoord[i]=directionalShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*spotLightShadows[i].shadowNormalBias,0);vSpotShadowCoord[i]=spotShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){shadowWorldPosition=worldPosition+vec4(shadowWorldNormal*pointLightShadows[i].shadowNormalBias,0);vPointShadowCoord[i]=pointShadowMatrix[i]*shadowWorldPosition;}
#pragma unroll_loop_end
#endif
#endif`
        , re = `float getShadowMask(){float shadow=1.0;
#ifdef USE_SHADOWMAP
#if NUM_DIR_LIGHT_SHADOWS>0
DirectionalLightShadow directionalLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_DIR_LIGHT_SHADOWS;i++){directionalLight=directionalLightShadows[i];shadow*=receiveShadow?getShadow(directionalShadowMap[i],directionalLight.shadowMapSize,directionalLight.shadowBias,directionalLight.shadowRadius,vDirectionalShadowCoord[i]):1.0;}
#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHT_SHADOWS>0
SpotLightShadow spotLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_SPOT_LIGHT_SHADOWS;i++){spotLight=spotLightShadows[i];shadow*=receiveShadow?getShadow(spotShadowMap[i],spotLight.shadowMapSize,spotLight.shadowBias,spotLight.shadowRadius,vSpotShadowCoord[i]):1.0;}
#pragma unroll_loop_end
#endif
#if NUM_POINT_LIGHT_SHADOWS>0
PointLightShadow pointLight;
#pragma unroll_loop_start
for(int i=0;i<NUM_POINT_LIGHT_SHADOWS;i++){pointLight=pointLightShadows[i];shadow*=receiveShadow?getPointShadow(pointShadowMap[i],pointLight.shadowMapSize,pointLight.shadowBias,pointLight.shadowRadius,vPointShadowCoord[i],pointLight.shadowCameraNear,pointLight.shadowCameraFar):1.0;}
#pragma unroll_loop_end
#endif
#endif
return shadow;}`
        , rt = `#ifdef USE_SKINNING
mat4 boneMatX=getBoneMatrix(skinIndex.x);mat4 boneMatY=getBoneMatrix(skinIndex.y);mat4 boneMatZ=getBoneMatrix(skinIndex.z);mat4 boneMatW=getBoneMatrix(skinIndex.w);
#endif`
        , ri = `#ifdef USE_SKINNING
uniform mat4 bindMatrix;uniform mat4 bindMatrixInverse;uniform highp sampler2D boneTexture;uniform int boneTextureSize;mat4 getBoneMatrix(const in float i){float j=i*4.0;float x=mod(j,float(boneTextureSize));float y=floor(j/float(boneTextureSize));float dx=1.0/float(boneTextureSize);float dy=1.0/float(boneTextureSize);y=dy*(y+0.5);vec4 v1=texture2D(boneTexture,vec2(dx*(x+0.5),y));vec4 v2=texture2D(boneTexture,vec2(dx*(x+1.5),y));vec4 v3=texture2D(boneTexture,vec2(dx*(x+2.5),y));vec4 v4=texture2D(boneTexture,vec2(dx*(x+3.5),y));mat4 bone=mat4(v1,v2,v3,v4);return bone;}
#endif`
        , rr = `#ifdef USE_SKINNING
vec4 skinVertex=bindMatrix*vec4(transformed,1.0);vec4 skinned=vec4(0.0);skinned+=boneMatX*skinVertex*skinWeight.x;skinned+=boneMatY*skinVertex*skinWeight.y;skinned+=boneMatZ*skinVertex*skinWeight.z;skinned+=boneMatW*skinVertex*skinWeight.w;transformed=(bindMatrixInverse*skinned).xyz;
#endif`
        , ra = `#ifdef USE_SKINNING
mat4 skinMatrix=mat4(0.0);skinMatrix+=skinWeight.x*boneMatX;skinMatrix+=skinWeight.y*boneMatY;skinMatrix+=skinWeight.z*boneMatZ;skinMatrix+=skinWeight.w*boneMatW;skinMatrix=bindMatrixInverse*skinMatrix*bindMatrix;objectNormal=vec4(skinMatrix*vec4(objectNormal,0.0)).xyz;
#ifdef USE_TANGENT
objectTangent=vec4(skinMatrix*vec4(objectTangent,0.0)).xyz;
#endif
#endif`
        , rn = `float specularStrength;
#ifdef USE_SPECULARMAP
vec4 texelSpecular=texture2D(specularMap,vUv);specularStrength=texelSpecular.r;
#else
specularStrength=1.0;
#endif`
        , rs = `#ifdef USE_SPECULARMAP
uniform sampler2D specularMap;
#endif`
        , ro = `#if defined(TONE_MAPPING)
gl_FragColor.rgb=toneMapping(gl_FragColor.rgb);
#endif`
        , rl = `#ifndef saturate
#define saturate(a)clamp(a,0.0,1.0)
#endif
uniform float toneMappingExposure;vec3 LinearToneMapping(vec3 color){return toneMappingExposure*color;}vec3 ReinhardToneMapping(vec3 color){color*=toneMappingExposure;return saturate(color/(vec3(1.0)+color));}vec3 OptimizedCineonToneMapping(vec3 color){color*=toneMappingExposure;color=max(vec3(0.0),color-0.004);return pow((color*(6.2*color+0.5))/(color*(6.2*color+1.7)+0.06),vec3(2.2));}vec3 RRTAndODTFit(vec3 v){vec3 a=v*(v+0.0245786)-0.000090537;vec3 b=v*(0.983729*v+0.4329510)+0.238081;return a/b;}vec3 ACESFilmicToneMapping(vec3 color){const mat3 ACESInputMat=mat3(vec3(0.59719,0.07600,0.02840),vec3(0.35458,0.90834,0.13383),vec3(0.04823,0.01566,0.83777));const mat3 ACESOutputMat=mat3(vec3(1.60475,-0.10208,-0.00327),vec3(-0.53108,1.10813,-0.07276),vec3(-0.07367,-0.00605,1.07602));color*=toneMappingExposure/0.6;color=ACESInputMat*color;color=RRTAndODTFit(color);color=ACESOutputMat*color;return saturate(color);}vec3 CustomToneMapping(vec3 color){return color;}`
        , rh = `#ifdef USE_TRANSMISSION
float transmissionAlpha=1.0;float transmissionFactor=transmission;float thicknessFactor=thickness;
#ifdef USE_TRANSMISSIONMAP
transmissionFactor*=texture2D(transmissionMap,vUv).r;
#endif
#ifdef USE_THICKNESSMAP
thicknessFactor*=texture2D(thicknessMap,vUv).g;
#endif
vec3 pos=vWorldPosition;vec3 v=normalize(cameraPosition-pos);vec3 n=inverseTransformDirection(normal,viewMatrix);vec4 transmission=getIBLVolumeRefraction(n,v,roughnessFactor,material.diffuseColor,material.specularColor,material.specularF90,pos,modelMatrix,viewMatrix,projectionMatrix,ior,thicknessFactor,attenuationColor,attenuationDistance);totalDiffuse=mix(totalDiffuse,transmission.rgb,transmissionFactor);transmissionAlpha=mix(transmissionAlpha,transmission.a,transmissionFactor);
#endif`
        , rc = `#ifdef USE_TRANSMISSION
uniform float transmission;uniform float thickness;uniform float attenuationDistance;uniform vec3 attenuationColor;
#ifdef USE_TRANSMISSIONMAP
uniform sampler2D transmissionMap;
#endif
#ifdef USE_THICKNESSMAP
uniform sampler2D thicknessMap;
#endif
uniform vec2 transmissionSamplerSize;uniform sampler2D transmissionSamplerMap;uniform mat4 modelMatrix;uniform mat4 projectionMatrix;varying vec3 vWorldPosition;vec3 getVolumeTransmissionRay(const in vec3 n,const in vec3 v,const in float thickness,const in float ior,const in mat4 modelMatrix){vec3 refractionVector=refract(-v,normalize(n),1.0/ior);vec3 modelScale;modelScale.x=length(vec3(modelMatrix[0].xyz));modelScale.y=length(vec3(modelMatrix[1].xyz));modelScale.z=length(vec3(modelMatrix[2].xyz));return normalize(refractionVector)*thickness*modelScale;}float applyIorToRoughness(const in float roughness,const in float ior){return roughness*clamp(ior*2.0-2.0,0.0,1.0);}vec4 getTransmissionSample(const in vec2 fragCoord,const in float roughness,const in float ior){float framebufferLod=log2(transmissionSamplerSize.x)*applyIorToRoughness(roughness,ior);
#ifdef texture2DLodEXT
return texture2DLodEXT(transmissionSamplerMap,fragCoord.xy,framebufferLod);
#else
return texture2D(transmissionSamplerMap,fragCoord.xy,framebufferLod);
#endif
}vec3 applyVolumeAttenuation(const in vec3 radiance,const in float transmissionDistance,const in vec3 attenuationColor,const in float attenuationDistance){if(attenuationDistance==0.0){return radiance;}else{vec3 attenuationCoefficient=-log(attenuationColor)/attenuationDistance;vec3 transmittance=exp(-attenuationCoefficient*transmissionDistance);return transmittance*radiance;}}vec4 getIBLVolumeRefraction(const in vec3 n,const in vec3 v,const in float roughness,const in vec3 diffuseColor,const in vec3 specularColor,const in float specularF90,const in vec3 position,const in mat4 modelMatrix,const in mat4 viewMatrix,const in mat4 projMatrix,const in float ior,const in float thickness,const in vec3 attenuationColor,const in float attenuationDistance){vec3 transmissionRay=getVolumeTransmissionRay(n,v,thickness,ior,modelMatrix);vec3 refractedRayExit=position+transmissionRay;vec4 ndcPos=projMatrix*viewMatrix*vec4(refractedRayExit,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;vec4 transmittedLight=getTransmissionSample(refractionCoords,roughness,ior);vec3 attenuatedColor=applyVolumeAttenuation(transmittedLight.rgb,length(transmissionRay),attenuationColor,attenuationDistance);vec3 F=EnvironmentBRDF(n,v,specularColor,specularF90,roughness);return vec4((1.0-F)*attenuatedColor*diffuseColor,transmittedLight.a);}
#endif`
        , rd = `#if (defined(USE_UV)&&!defined(UVS_VERTEX_ONLY))
varying vec2 vUv;
#endif`
        , ru = `#ifdef USE_UV
#ifdef UVS_VERTEX_ONLY
vec2 vUv;
#else
varying vec2 vUv;
#endif
uniform mat3 uvTransform;
#endif`
        , rp = `#ifdef USE_UV
vUv=(uvTransform*vec3(uv,1)).xy;
#endif`
        , rf = `#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)
varying vec2 vUv2;
#endif`
        , rm = `#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)
attribute vec2 uv2;varying vec2 vUv2;uniform mat3 uv2Transform;
#endif`
        , rg = `#if defined(USE_LIGHTMAP)||defined(USE_AOMAP)
vUv2=(uv2Transform*vec3(uv2,1)).xy;
#endif`
        , rv = `#if defined(USE_ENVMAP)||defined(DISTANCE)||defined(USE_SHADOWMAP)||defined(USE_TRANSMISSION)
vec4 worldPosition=vec4(transformed,1.0);
#ifdef USE_INSTANCING
worldPosition=instanceMatrix*worldPosition;
#endif
worldPosition=modelMatrix*worldPosition;
#endif`;
    let r_ = `uniform sampler2D t2D;varying vec2 vUv;void main(){gl_FragColor=texture2D(t2D,vUv);
#ifdef DECODE_VIDEO_TEXTURE
gl_FragColor=vec4(mix(pow(gl_FragColor.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),gl_FragColor.rgb*0.0773993808,vec3(lessThanEqual(gl_FragColor.rgb,vec3(0.04045)))),gl_FragColor.w);
#endif
#include <tonemapping_fragment>
#include <encodings_fragment>
}`
        , rx = `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
gl_Position.z=gl_Position.w;}`
        , ry = `#include <envmap_common_pars_fragment>
uniform float opacity;varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main(){vec3 vReflect=vWorldDirection;
#include <envmap_fragment>
gl_FragColor=envColor;gl_FragColor.a*=opacity;
#include <tonemapping_fragment>
#include <encodings_fragment>
}`
        , rM = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;void main(){
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vHighPrecisionZW=gl_Position.zw;}`
        , rb = `#if DEPTH_PACKING==3200
uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(1.0);
#if DEPTH_PACKING==3200
diffuseColor.a=opacity;
#endif
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <logdepthbuf_fragment>
float fragCoordZ=0.5*vHighPrecisionZW[0]/vHighPrecisionZW[1]+0.5;
#if DEPTH_PACKING==3200
gl_FragColor=vec4(vec3(1.0-fragCoordZ),opacity);
#elif DEPTH_PACKING==3201
gl_FragColor=packDepthToRGBA(fragCoordZ);
#endif
}`
        , rS = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <skinbase_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <worldpos_vertex>
#include <clipping_planes_vertex>
vWorldPosition=worldPosition.xyz;}`
        , rw = `#define DISTANCE
uniform vec3 referencePosition;uniform float nearDistance;uniform float farDistance;varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(1.0);
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
float dist=length(vWorldPosition-referencePosition);dist=(dist-nearDistance)/(farDistance-nearDistance);dist=saturate(dist);gl_FragColor=packDepthToRGBA(dist);}`
        , rT = `varying vec3 vWorldDirection;
#include <common>
void main(){vWorldDirection=transformDirection(position,modelMatrix);
#include <begin_vertex>
#include <project_vertex>
}`
        , rE = `uniform sampler2D tEquirect;varying vec3 vWorldDirection;
#include <common>
void main(){vec3 direction=normalize(vWorldDirection);vec2 sampleUV=equirectUv(direction);gl_FragColor=texture2D(tEquirect,sampleUV);
#include <tonemapping_fragment>
#include <encodings_fragment>
}`
        , rA = `uniform float scale;attribute float lineDistance;varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){vLineDistance=scale*lineDistance;
#include <color_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`
        , rC = `uniform vec3 diffuse;uniform float opacity;uniform float dashSize;uniform float totalSize;varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
if(mod(vLineDistance,totalSize)>dashSize){discard;}vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <color_fragment>
outgoingLight=diffuseColor.rgb;
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`
        , rL = `#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <uv2_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#if defined(USE_ENVMAP)||defined(USE_SKINNING)
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <envmap_vertex>
#include <fog_vertex>
}`
        , rP = `uniform vec3 diffuse;uniform float opacity;
#ifndef FLAT_SHADED
varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <specularmap_fragment>
ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));
#ifdef USE_LIGHTMAP
vec4 lightMapTexel=texture2D(lightMap,vUv2);reflectedLight.indirectDiffuse+=lightMapTexel.rgb*lightMapIntensity*RECIPROCAL_PI;
#else
reflectedLight.indirectDiffuse+=vec3(1.0);
#endif
#include <aomap_fragment>
reflectedLight.indirectDiffuse*=diffuseColor.rgb;vec3 outgoingLight=reflectedLight.indirectDiffuse;
#include <envmap_fragment>
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
        , rR = `#define LAMBERT
varying vec3 vLightFront;varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
varying vec3 vLightBack;varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <uv2_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <envmap_vertex>
#include <lights_lambert_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
        , rD = `uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;varying vec3 vLightFront;varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
varying vec3 vLightBack;varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <specularmap_fragment>
#include <emissivemap_fragment>
#ifdef DOUBLE_SIDED
reflectedLight.indirectDiffuse+=(gl_FrontFacing)?vIndirectFront:vIndirectBack;
#else
reflectedLight.indirectDiffuse+=vIndirectFront;
#endif
#include <lightmap_fragment>
reflectedLight.indirectDiffuse*=BRDF_Lambert(diffuseColor.rgb);
#ifdef DOUBLE_SIDED
reflectedLight.directDiffuse=(gl_FrontFacing)?vLightFront:vLightBack;
#else
reflectedLight.directDiffuse=vLightFront;
#endif
reflectedLight.directDiffuse*=BRDF_Lambert(diffuseColor.rgb)*getShadowMask();
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;
#include <envmap_fragment>
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
        , rI = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
vViewPosition=-mvPosition.xyz;}`
        , rN = `#define MATCAP
uniform vec3 diffuse;uniform float opacity;uniform sampler2D matcap;varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
vec3 viewDir=normalize(vViewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,normal),dot(y,normal))*0.495+0.5;
#ifdef USE_MATCAP
vec4 matcapColor=texture2D(matcap,uv);
#else
vec4 matcapColor=vec4(vec3(mix(0.2,0.8,uv.y)),1.0);
#endif
vec3 outgoingLight=diffuseColor.rgb*matcapColor.rgb;
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
        , rO = `#define NORMAL
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)
varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)
vViewPosition=-mvPosition.xyz;
#endif
}`
        , rz = `#define NORMAL
uniform float opacity;
#if defined(FLAT_SHADED)||defined(USE_BUMPMAP)||defined(TANGENTSPACE_NORMALMAP)
varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
gl_FragColor=vec4(packNormalToRGB(normal),opacity);
#ifdef OPAQUE
gl_FragColor.a=1.0;
#endif
}`
        , rU = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <uv2_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
        , rF = `#define PHONG
uniform vec3 diffuse;uniform vec3 emissive;uniform vec3 specular;uniform float shininess;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_phong_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+reflectedLight.directSpecular+reflectedLight.indirectSpecular+totalEmissiveRadiance;
#include <envmap_fragment>
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
        , rk = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <uv2_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition=worldPosition.xyz;
#endif
}`
        , rB = `#define STANDARD
#ifdef PHYSICAL
#define IOR
#define SPECULAR
#endif
uniform vec3 diffuse;uniform vec3 emissive;uniform float roughness;uniform float metalness;uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef SPECULAR
uniform float specularIntensity;uniform vec3 specularColor;
#ifdef USE_SPECULARINTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#ifdef USE_SPECULARCOLORMAP
uniform sampler2D specularColorMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;uniform float iridescenceIOR;uniform float iridescenceThicknessMinimum;uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;uniform float sheenRoughness;
#ifdef USE_SHEENCOLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEENROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 totalDiffuse=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse;vec3 totalSpecular=reflectedLight.directSpecular+reflectedLight.indirectSpecular;
#include <transmission_fragment>
vec3 outgoingLight=totalDiffuse+totalSpecular+totalEmissiveRadiance;
#ifdef USE_SHEEN
float sheenEnergyComp=1.0-0.157*max3(material.sheenColor);outgoingLight=outgoingLight*sheenEnergyComp+sheenSpecular;
#endif
#ifdef USE_CLEARCOAT
float dotNVcc=saturate(dot(geometry.clearcoatNormal,geometry.viewDir));vec3 Fcc=F_Schlick(material.clearcoatF0,material.clearcoatF90,dotNVcc);outgoingLight=outgoingLight*(1.0-material.clearcoat*Fcc)+clearcoatSpecular*material.clearcoat;
#endif
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
        , rH = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
#include <uv2_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition=-mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
        , rG = `#define TOON
uniform vec3 diffuse;uniform vec3 emissive;uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec4 diffuseColor=vec4(diffuse,opacity);ReflectedLight reflectedLight=ReflectedLight(vec3(0.0),vec3(0.0),vec3(0.0),vec3(0.0));vec3 totalEmissiveRadiance=emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_toon_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight=reflectedLight.directDiffuse+reflectedLight.indirectDiffuse+totalEmissiveRadiance;
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`
        , rV = `uniform float size;uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <color_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
gl_PointSize=size;
#ifdef USE_SIZEATTENUATION
bool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)gl_PointSize*=(scale/-mvPosition.z);
#endif
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <fog_vertex>
}`
        , rW = `uniform vec3 diffuse;uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_particle_fragment>
#include <color_fragment>
#include <alphatest_fragment>
outgoingLight=diffuseColor.rgb;
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`
        , rj = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main(){
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`
        , rq = `uniform vec3 color;uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main(){gl_FragColor=vec4(color,opacity*(1.0-getShadowMask()));
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
}`
        , rX = `uniform float rotation;uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main(){
#include <uv_vertex>
vec4 mvPosition=modelViewMatrix*vec4(0.0,0.0,0.0,1.0);vec2 scale;scale.x=length(vec3(modelMatrix[0].x,modelMatrix[0].y,modelMatrix[0].z));scale.y=length(vec3(modelMatrix[1].x,modelMatrix[1].y,modelMatrix[1].z));
#ifndef USE_SIZEATTENUATION
bool isPerspective=isPerspectiveMatrix(projectionMatrix);if(isPerspective)scale*=-mvPosition.z;
#endif
vec2 alignedPosition=(position.xy-(center-vec2(0.5)))*scale;vec2 rotatedPosition;rotatedPosition.x=cos(rotation)*alignedPosition.x-sin(rotation)*alignedPosition.y;rotatedPosition.y=sin(rotation)*alignedPosition.x+cos(rotation)*alignedPosition.y;mvPosition.xy+=rotatedPosition;gl_Position=projectionMatrix*mvPosition;
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`
        , rY = `uniform vec3 diffuse;uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main(){
#include <clipping_planes_fragment>
vec3 outgoingLight=vec3(0.0);vec4 diffuseColor=vec4(diffuse,opacity);
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
outgoingLight=diffuseColor.rgb;
#include <output_fragment>
#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
}`
        , rZ = {
        alphamap_fragment: tj,
        alphamap_pars_fragment: tq,
        alphatest_fragment: tX,
        alphatest_pars_fragment: tY,
        aomap_fragment: tZ,
        aomap_pars_fragment: tJ,
        begin_vertex: "vec3 transformed=vec3(position);",
        beginnormal_vertex: tK,
        bsdfs: tQ,
        iridescence_fragment: t$,
        bumpmap_pars_fragment: t0,
        clipping_planes_fragment: t1,
        clipping_planes_pars_fragment: t3,
        clipping_planes_pars_vertex: t2,
        clipping_planes_vertex: t4,
        color_fragment: t5,
        color_pars_fragment: t6,
        color_pars_vertex: t8,
        color_vertex: t7,
        common: t9,
        cube_uv_reflection_fragment: ie,
        defaultnormal_vertex: it,
        displacementmap_pars_vertex: ii,
        displacementmap_vertex: ir,
        emissivemap_fragment: ia,
        emissivemap_pars_fragment: is,
        encodings_fragment: "gl_FragColor=linearToOutputTexel(gl_FragColor);",
        encodings_pars_fragment: "vec4 LinearToLinear(in vec4 value){return value;}vec4 LinearTosRGB(in vec4 value){return vec4(mix(pow(value.rgb,vec3(0.41666))*1.055-vec3(0.055),value.rgb*12.92,vec3(lessThanEqual(value.rgb,vec3(0.0031308)))),value.a);}",
        envmap_fragment: io,
        envmap_common_pars_fragment: il,
        envmap_pars_fragment: ih,
        envmap_pars_vertex: ic,
        envmap_physical_pars_fragment: ib,
        envmap_vertex: id,
        fog_vertex: iu,
        fog_pars_vertex: ip,
        fog_fragment: im,
        fog_pars_fragment: ig,
        gradientmap_pars_fragment: iv,
        lightmap_fragment: i_,
        lightmap_pars_fragment: ix,
        lights_lambert_vertex: iy,
        lights_pars_begin: iM,
        lights_toon_fragment: "ToonMaterial material;material.diffuseColor=diffuseColor.rgb;",
        lights_toon_pars_fragment: iS,
        lights_phong_fragment: "BlinnPhongMaterial material;material.diffuseColor=diffuseColor.rgb;material.specularColor=specular;material.specularShininess=shininess;material.specularStrength=specularStrength;",
        lights_phong_pars_fragment: iw,
        lights_physical_fragment: iT,
        lights_physical_pars_fragment: iE,
        lights_fragment_begin: iA,
        lights_fragment_maps: iC,
        lights_fragment_end: iL,
        logdepthbuf_fragment: iP,
        logdepthbuf_pars_fragment: iR,
        logdepthbuf_pars_vertex: iD,
        logdepthbuf_vertex: iI,
        map_fragment: iN,
        map_pars_fragment: iO,
        map_particle_fragment: iz,
        map_particle_pars_fragment: iU,
        metalnessmap_fragment: iF,
        metalnessmap_pars_fragment: ik,
        morphcolor_vertex: iB,
        morphnormal_vertex: iH,
        morphtarget_pars_vertex: iG,
        morphtarget_vertex: iV,
        normal_fragment_begin: iW,
        normal_fragment_maps: ij,
        normal_pars_fragment: iq,
        normal_pars_vertex: iX,
        normal_vertex: iY,
        normalmap_pars_fragment: iZ,
        clearcoat_normal_fragment_begin: iJ,
        clearcoat_normal_fragment_maps: iK,
        clearcoat_pars_fragment: iQ,
        iridescence_pars_fragment: i$,
        output_fragment: i0,
        packing: "vec3 packNormalToRGB(const in vec3 normal){return normalize(normal)*0.5+0.5;}vec3 unpackRGBToNormal(const in vec3 rgb){return 2.0*rgb.xyz-1.0;}const float PackUpscale=256./255.;const float UnpackDownscale=255./256.;const vec3 PackFactors=vec3(256.*256.*256.,256.*256.,256.);const vec4 UnpackFactors=UnpackDownscale/vec4(PackFactors,1.);const float ShiftRight8=1./256.;vec4 packDepthToRGBA(const in float v){vec4 r=vec4(fract(v*PackFactors),v);r.yzw-=r.xyz*ShiftRight8;return r*PackUpscale;}float unpackRGBAToDepth(const in vec4 v){return dot(v,UnpackFactors);}vec4 pack2HalfToRGBA(vec2 v){vec4 r=vec4(v.x,fract(v.x*255.0),v.y,fract(v.y*255.0));return vec4(r.x-r.y/255.0,r.y,r.z-r.w/255.0,r.w);}vec2 unpackRGBATo2Half(vec4 v){return vec2(v.x+(v.y/255.0),v.z+(v.w/255.0));}float viewZToOrthographicDepth(const in float viewZ,const in float near,const in float far){return(viewZ+near)/(near-far);}float orthographicDepthToViewZ(const in float linearClipZ,const in float near,const in float far){return linearClipZ*(near-far)-near;}float viewZToPerspectiveDepth(const in float viewZ,const in float near,const in float far){return((near+viewZ)*far)/((far-near)*viewZ);}float perspectiveDepthToViewZ(const in float invClipZ,const in float near,const in float far){return(near*far)/((far-near)*invClipZ-far);}",
        premultiplied_alpha_fragment: i1,
        project_vertex: i3,
        dithering_fragment: i2,
        dithering_pars_fragment: i4,
        roughnessmap_fragment: i5,
        roughnessmap_pars_fragment: i6,
        shadowmap_pars_fragment: i8,
        shadowmap_pars_vertex: i7,
        shadowmap_vertex: i9,
        shadowmask_pars_fragment: re,
        skinbase_vertex: rt,
        skinning_pars_vertex: ri,
        skinning_vertex: rr,
        skinnormal_vertex: ra,
        specularmap_fragment: rn,
        specularmap_pars_fragment: rs,
        tonemapping_fragment: ro,
        tonemapping_pars_fragment: rl,
        transmission_fragment: rh,
        transmission_pars_fragment: rc,
        uv_pars_fragment: rd,
        uv_pars_vertex: ru,
        uv_vertex: rp,
        uv2_pars_fragment: rf,
        uv2_pars_vertex: rm,
        uv2_vertex: rg,
        worldpos_vertex: rv,
        background_vert: "varying vec2 vUv;uniform mat3 uvTransform;void main(){vUv=(uvTransform*vec3(uv,1)).xy;gl_Position=vec4(position.xy,1.0,1.0);}",
        background_frag: r_,
        cube_vert: rx,
        cube_frag: ry,
        depth_vert: rM,
        depth_frag: rb,
        distanceRGBA_vert: rS,
        distanceRGBA_frag: rw,
        equirect_vert: rT,
        equirect_frag: rE,
        linedashed_vert: rA,
        linedashed_frag: rC,
        meshbasic_vert: rL,
        meshbasic_frag: rP,
        meshlambert_vert: rR,
        meshlambert_frag: rD,
        meshmatcap_vert: rI,
        meshmatcap_frag: rN,
        meshnormal_vert: rO,
        meshnormal_frag: rz,
        meshphong_vert: rU,
        meshphong_frag: rF,
        meshphysical_vert: rk,
        meshphysical_frag: rB,
        meshtoon_vert: rH,
        meshtoon_frag: rG,
        points_vert: rV,
        points_frag: rW,
        shadow_vert: rj,
        shadow_frag: rq,
        sprite_vert: rX,
        sprite_frag: rY
    }
        , rJ = {
        common: {
            diffuse: {
                value: new P(16777215)
            },
            opacity: {
                value: 1
            },
            map: {
                value: null
            },
            uvTransform: {
                value: new v
            },
            uv2Transform: {
                value: new v
            },
            alphaMap: {
                value: null
            },
            alphaTest: {
                value: 0
            }
        },
        specularmap: {
            specularMap: {
                value: null
            }
        },
        envmap: {
            envMap: {
                value: null
            },
            flipEnvMap: {
                value: -1
            },
            reflectivity: {
                value: 1
            },
            ior: {
                value: 1.5
            },
            refractionRatio: {
                value: .98
            }
        },
        aomap: {
            aoMap: {
                value: null
            },
            aoMapIntensity: {
                value: 1
            }
        },
        lightmap: {
            lightMap: {
                value: null
            },
            lightMapIntensity: {
                value: 1
            }
        },
        emissivemap: {
            emissiveMap: {
                value: null
            }
        },
        bumpmap: {
            bumpMap: {
                value: null
            },
            bumpScale: {
                value: 1
            }
        },
        normalmap: {
            normalMap: {
                value: null
            },
            normalScale: {
                value: new g(1,1)
            }
        },
        displacementmap: {
            displacementMap: {
                value: null
            },
            displacementScale: {
                value: 1
            },
            displacementBias: {
                value: 0
            }
        },
        roughnessmap: {
            roughnessMap: {
                value: null
            }
        },
        metalnessmap: {
            metalnessMap: {
                value: null
            }
        },
        gradientmap: {
            gradientMap: {
                value: null
            }
        },
        fog: {
            fogDensity: {
                value: 25e-5
            },
            fogNear: {
                value: 1
            },
            fogFar: {
                value: 2e3
            },
            fogColor: {
                value: new P(16777215)
            }
        },
        lights: {
            ambientLightColor: {
                value: []
            },
            lightProbe: {
                value: []
            },
            directionalLights: {
                value: [],
                properties: {
                    direction: {},
                    color: {}
                }
            },
            directionalLightShadows: {
                value: [],
                properties: {
                    shadowBias: {},
                    shadowNormalBias: {},
                    shadowRadius: {},
                    shadowMapSize: {}
                }
            },
            directionalShadowMap: {
                value: []
            },
            directionalShadowMatrix: {
                value: []
            },
            spotLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    direction: {},
                    distance: {},
                    coneCos: {},
                    penumbraCos: {},
                    decay: {}
                }
            },
            spotLightShadows: {
                value: [],
                properties: {
                    shadowBias: {},
                    shadowNormalBias: {},
                    shadowRadius: {},
                    shadowMapSize: {}
                }
            },
            spotShadowMap: {
                value: []
            },
            spotShadowMatrix: {
                value: []
            },
            pointLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    decay: {},
                    distance: {}
                }
            },
            pointLightShadows: {
                value: [],
                properties: {
                    shadowBias: {},
                    shadowNormalBias: {},
                    shadowRadius: {},
                    shadowMapSize: {},
                    shadowCameraNear: {},
                    shadowCameraFar: {}
                }
            },
            pointShadowMap: {
                value: []
            },
            pointShadowMatrix: {
                value: []
            },
            hemisphereLights: {
                value: [],
                properties: {
                    direction: {},
                    skyColor: {},
                    groundColor: {}
                }
            },
            rectAreaLights: {
                value: [],
                properties: {
                    color: {},
                    position: {},
                    width: {},
                    height: {}
                }
            },
            ltc_1: {
                value: null
            },
            ltc_2: {
                value: null
            }
        },
        points: {
            diffuse: {
                value: new P(16777215)
            },
            opacity: {
                value: 1
            },
            size: {
                value: 1
            },
            scale: {
                value: 1
            },
            map: {
                value: null
            },
            alphaMap: {
                value: null
            },
            alphaTest: {
                value: 0
            },
            uvTransform: {
                value: new v
            }
        },
        sprite: {
            diffuse: {
                value: new P(16777215)
            },
            opacity: {
                value: 1
            },
            center: {
                value: new g(.5,.5)
            },
            rotation: {
                value: 0
            },
            map: {
                value: null
            },
            alphaMap: {
                value: null
            },
            alphaTest: {
                value: 0
            },
            uvTransform: {
                value: new v
            }
        }
    }
        , rK = {
        basic: {
            uniforms: tA([rJ.common, rJ.specularmap, rJ.envmap, rJ.aomap, rJ.lightmap, rJ.fog]),
            vertexShader: rZ.meshbasic_vert,
            fragmentShader: rZ.meshbasic_frag
        },
        lambert: {
            uniforms: tA([rJ.common, rJ.specularmap, rJ.envmap, rJ.aomap, rJ.lightmap, rJ.emissivemap, rJ.fog, rJ.lights, {
                emissive: {
                    value: new P(0)
                }
            }]),
            vertexShader: rZ.meshlambert_vert,
            fragmentShader: rZ.meshlambert_frag
        },
        phong: {
            uniforms: tA([rJ.common, rJ.specularmap, rJ.envmap, rJ.aomap, rJ.lightmap, rJ.emissivemap, rJ.bumpmap, rJ.normalmap, rJ.displacementmap, rJ.fog, rJ.lights, {
                emissive: {
                    value: new P(0)
                },
                specular: {
                    value: new P(1118481)
                },
                shininess: {
                    value: 30
                }
            }]),
            vertexShader: rZ.meshphong_vert,
            fragmentShader: rZ.meshphong_frag
        },
        standard: {
            uniforms: tA([rJ.common, rJ.envmap, rJ.aomap, rJ.lightmap, rJ.emissivemap, rJ.bumpmap, rJ.normalmap, rJ.displacementmap, rJ.roughnessmap, rJ.metalnessmap, rJ.fog, rJ.lights, {
                emissive: {
                    value: new P(0)
                },
                roughness: {
                    value: 1
                },
                metalness: {
                    value: 0
                },
                envMapIntensity: {
                    value: 1
                }
            }]),
            vertexShader: rZ.meshphysical_vert,
            fragmentShader: rZ.meshphysical_frag
        },
        toon: {
            uniforms: tA([rJ.common, rJ.aomap, rJ.lightmap, rJ.emissivemap, rJ.bumpmap, rJ.normalmap, rJ.displacementmap, rJ.gradientmap, rJ.fog, rJ.lights, {
                emissive: {
                    value: new P(0)
                }
            }]),
            vertexShader: rZ.meshtoon_vert,
            fragmentShader: rZ.meshtoon_frag
        },
        matcap: {
            uniforms: tA([rJ.common, rJ.bumpmap, rJ.normalmap, rJ.displacementmap, rJ.fog, {
                matcap: {
                    value: null
                }
            }]),
            vertexShader: rZ.meshmatcap_vert,
            fragmentShader: rZ.meshmatcap_frag
        },
        points: {
            uniforms: tA([rJ.points, rJ.fog]),
            vertexShader: rZ.points_vert,
            fragmentShader: rZ.points_frag
        },
        dashed: {
            uniforms: tA([rJ.common, rJ.fog, {
                scale: {
                    value: 1
                },
                dashSize: {
                    value: 1
                },
                totalSize: {
                    value: 2
                }
            }]),
            vertexShader: rZ.linedashed_vert,
            fragmentShader: rZ.linedashed_frag
        },
        depth: {
            uniforms: tA([rJ.common, rJ.displacementmap]),
            vertexShader: rZ.depth_vert,
            fragmentShader: rZ.depth_frag
        },
        normal: {
            uniforms: tA([rJ.common, rJ.bumpmap, rJ.normalmap, rJ.displacementmap, {
                opacity: {
                    value: 1
                }
            }]),
            vertexShader: rZ.meshnormal_vert,
            fragmentShader: rZ.meshnormal_frag
        },
        sprite: {
            uniforms: tA([rJ.sprite, rJ.fog]),
            vertexShader: rZ.sprite_vert,
            fragmentShader: rZ.sprite_frag
        },
        background: {
            uniforms: {
                uvTransform: {
                    value: new v
                },
                t2D: {
                    value: null
                }
            },
            vertexShader: rZ.background_vert,
            fragmentShader: rZ.background_frag
        },
        cube: {
            uniforms: tA([rJ.envmap, {
                opacity: {
                    value: 1
                }
            }]),
            vertexShader: rZ.cube_vert,
            fragmentShader: rZ.cube_frag
        },
        equirect: {
            uniforms: {
                tEquirect: {
                    value: null
                }
            },
            vertexShader: rZ.equirect_vert,
            fragmentShader: rZ.equirect_frag
        },
        distanceRGBA: {
            uniforms: tA([rJ.common, rJ.displacementmap, {
                referencePosition: {
                    value: new B
                },
                nearDistance: {
                    value: 1
                },
                farDistance: {
                    value: 1e3
                }
            }]),
            vertexShader: rZ.distanceRGBA_vert,
            fragmentShader: rZ.distanceRGBA_frag
        },
        shadow: {
            uniforms: tA([rJ.lights, rJ.fog, {
                color: {
                    value: new P(0)
                },
                opacity: {
                    value: 1
                }
            }]),
            vertexShader: rZ.shadow_vert,
            fragmentShader: rZ.shadow_frag
        }
    };
    function rQ(e, t, i, r, a, n) {
        let s, o;
        let l = new P(0)
            , h = !0 === a ? 0 : 1
            , c = null
            , d = 0
            , u = null;
        function p(e, t) {
            i.buffers.color.setClear(e.r, e.g, e.b, t, n)
        }
        return {
            getClearColor: function() {
                return l
            },
            setClearColor: function(e, t=1) {
                l.set(e),
                    p(l, h = t)
            },
            getClearAlpha: function() {
                return h
            },
            setClearAlpha: function(e) {
                p(l, h = e)
            },
            render: function(i, a) {
                let n = !1
                    , f = !0 === a.isScene ? a.background : null;
                f && f.isTexture && (f = t.get(f));
                let m = e.xr
                    , g = m.getSession && m.getSession();
                g && "additive" === g.environmentBlendMode && (f = null),
                    null === f ? p(l, h) : f && f.isColor && (p(f, 1),
                        n = !0),
                (e.autoClear || n) && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
                    f && (f.isCubeTexture || 306 === f.mapping) ? (void 0 === o && ((o = new tS(new tT(1,1,1),new tL({
                        name: "BackgroundCubeMaterial",
                        uniforms: tE(rK.cube.uniforms),
                        vertexShader: rK.cube.vertexShader,
                        fragmentShader: rK.cube.fragmentShader,
                        side: 1,
                        depthTest: !1,
                        depthWrite: !1,
                        fog: !1
                    }))).geometry.deleteAttribute("normal"),
                        o.geometry.deleteAttribute("uv"),
                        o.onBeforeRender = function(e, t, i) {
                            this.matrixWorld.copyPosition(i.matrixWorld)
                        }
                        ,
                        Object.defineProperty(o.material, "envMap", {
                            get: function() {
                                return this.uniforms.envMap.value
                            }
                        }),
                        r.update(o)),
                        o.material.uniforms.envMap.value = f,
                        o.material.uniforms.flipEnvMap.value = f.isCubeTexture && !1 === f.isRenderTargetTexture ? -1 : 1,
                    (c !== f || d !== f.version || u !== e.toneMapping) && (o.material.needsUpdate = !0,
                        c = f,
                        d = f.version,
                        u = e.toneMapping),
                        o.layers.enableAll(),
                        i.unshift(o, o.geometry, o.material, 0, 0, null)) : f && f.isTexture && (void 0 === s && ((s = new tS(new tW(2,2),new tL({
                        name: "BackgroundMaterial",
                        uniforms: tE(rK.background.uniforms),
                        vertexShader: rK.background.vertexShader,
                        fragmentShader: rK.background.fragmentShader,
                        side: 0,
                        depthTest: !1,
                        depthWrite: !1,
                        fog: !1
                    }))).geometry.deleteAttribute("normal"),
                        Object.defineProperty(s.material, "map", {
                            get: function() {
                                return this.uniforms.t2D.value
                            }
                        }),
                        r.update(s)),
                        s.material.uniforms.t2D.value = f,
                    !0 === f.matrixAutoUpdate && f.updateMatrix(),
                        s.material.uniforms.uvTransform.value.copy(f.matrix),
                    (c !== f || d !== f.version || u !== e.toneMapping) && (s.material.needsUpdate = !0,
                        c = f,
                        d = f.version,
                        u = e.toneMapping),
                        s.layers.enableAll(),
                        i.unshift(s, s.geometry, s.material, 0, 0, null))
            }
        }
    }
    function r$(e, t, i, r) {
        let a = e.getParameter(34921)
            , n = r.isWebGL2 ? null : t.get("OES_vertex_array_object")
            , s = r.isWebGL2 || null !== n
            , o = {}
            , l = p(null)
            , h = l
            , c = !1;
        function d(t) {
            return r.isWebGL2 ? e.bindVertexArray(t) : n.bindVertexArrayOES(t)
        }
        function u(t) {
            return r.isWebGL2 ? e.deleteVertexArray(t) : n.deleteVertexArrayOES(t)
        }
        function p(e) {
            let t = []
                , i = []
                , r = [];
            for (let e = 0; e < a; e++)
                t[e] = 0,
                    i[e] = 0,
                    r[e] = 0;
            return {
                geometry: null,
                program: null,
                wireframe: !1,
                newAttributes: t,
                enabledAttributes: i,
                attributeDivisors: r,
                object: e,
                attributes: {},
                index: null
            }
        }
        function f() {
            let e = h.newAttributes;
            for (let t = 0, i = e.length; t < i; t++)
                e[t] = 0
        }
        function m(e) {
            g(e, 0)
        }
        function g(i, a) {
            let n = h.newAttributes
                , s = h.enabledAttributes
                , o = h.attributeDivisors;
            if (n[i] = 1,
            0 === s[i] && (e.enableVertexAttribArray(i),
                s[i] = 1),
            o[i] !== a) {
                let n = r.isWebGL2 ? e : t.get("ANGLE_instanced_arrays");
                n[r.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](i, a),
                    o[i] = a
            }
        }
        function v() {
            let t = h.newAttributes
                , i = h.enabledAttributes;
            for (let r = 0, a = i.length; r < a; r++)
                i[r] !== t[r] && (e.disableVertexAttribArray(r),
                    i[r] = 0)
        }
        function _(t, i, a, n, s, o) {
            !0 === r.isWebGL2 && (5124 === a || 5125 === a) ? e.vertexAttribIPointer(t, i, a, s, o) : e.vertexAttribPointer(t, i, a, n, s, o)
        }
        function x() {
            y(),
                c = !0,
            h !== l && d((h = l).object)
        }
        function y() {
            l.geometry = null,
                l.program = null,
                l.wireframe = !1
        }
        return {
            setup: function(a, l, u, x, y) {
                let M = !1;
                if (s) {
                    let t = function(t, i, a) {
                        let s = !0 === a.wireframe
                            , l = o[t.id];
                        void 0 === l && (l = {},
                            o[t.id] = l);
                        let h = l[i.id];
                        void 0 === h && (h = {},
                            l[i.id] = h);
                        let c = h[s];
                        return void 0 === c && (c = p(r.isWebGL2 ? e.createVertexArray() : n.createVertexArrayOES()),
                            h[s] = c),
                            c
                    }(x, u, l);
                    h !== t && d((h = t).object),
                    (M = function(e, t, i, r) {
                        let a = h.attributes
                            , n = t.attributes
                            , s = 0
                            , o = i.getAttributes();
                        for (let t in o) {
                            let i = o[t];
                            if (i.location >= 0) {
                                let i = a[t]
                                    , r = n[t];
                                if (void 0 === r && ("instanceMatrix" === t && e.instanceMatrix && (r = e.instanceMatrix),
                                "instanceColor" === t && e.instanceColor && (r = e.instanceColor)),
                                void 0 === i || i.attribute !== r || r && i.data !== r.data)
                                    return !0;
                                s++
                            }
                        }
                        return h.attributesNum !== s || h.index !== r
                    }(a, x, u, y)) && function(e, t, i, r) {
                        let a = {}
                            , n = t.attributes
                            , s = 0
                            , o = i.getAttributes();
                        for (let t in o) {
                            let i = o[t];
                            if (i.location >= 0) {
                                let i = n[t];
                                void 0 === i && ("instanceMatrix" === t && e.instanceMatrix && (i = e.instanceMatrix),
                                "instanceColor" === t && e.instanceColor && (i = e.instanceColor));
                                let r = {};
                                r.attribute = i,
                                i && i.data && (r.data = i.data),
                                    a[t] = r,
                                    s++
                            }
                        }
                        h.attributes = a,
                            h.attributesNum = s,
                            h.index = r
                    }(a, x, u, y)
                } else {
                    let e = !0 === l.wireframe;
                    (h.geometry !== x.id || h.program !== u.id || h.wireframe !== e) && (h.geometry = x.id,
                        h.program = u.id,
                        h.wireframe = e,
                        M = !0)
                }
                null !== y && i.update(y, 34963),
                (M || c) && (c = !1,
                    function(a, n, s, o) {
                        if (!1 === r.isWebGL2 && (a.isInstancedMesh || o.isInstancedBufferGeometry) && null === t.get("ANGLE_instanced_arrays"))
                            return;
                        f();
                        let l = o.attributes
                            , h = s.getAttributes()
                            , c = n.defaultAttributeValues;
                        for (let t in h) {
                            let r = h[t];
                            if (r.location >= 0) {
                                let n = l[t];
                                if (void 0 === n && ("instanceMatrix" === t && a.instanceMatrix && (n = a.instanceMatrix),
                                "instanceColor" === t && a.instanceColor && (n = a.instanceColor)),
                                void 0 !== n) {
                                    let t = n.normalized
                                        , s = n.itemSize
                                        , l = i.get(n);
                                    if (void 0 === l)
                                        continue;
                                    let h = l.buffer
                                        , c = l.type
                                        , d = l.bytesPerElement;
                                    if (n.isInterleavedBufferAttribute) {
                                        let i = n.data
                                            , l = i.stride
                                            , u = n.offset;
                                        if (i.isInstancedInterleavedBuffer) {
                                            for (let e = 0; e < r.locationSize; e++)
                                                g(r.location + e, i.meshPerAttribute);
                                            !0 !== a.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = i.meshPerAttribute * i.count)
                                        } else
                                            for (let e = 0; e < r.locationSize; e++)
                                                m(r.location + e);
                                        e.bindBuffer(34962, h);
                                        for (let e = 0; e < r.locationSize; e++)
                                            _(r.location + e, s / r.locationSize, c, t, l * d, (u + s / r.locationSize * e) * d)
                                    } else {
                                        if (n.isInstancedBufferAttribute) {
                                            for (let e = 0; e < r.locationSize; e++)
                                                g(r.location + e, n.meshPerAttribute);
                                            !0 !== a.isInstancedMesh && void 0 === o._maxInstanceCount && (o._maxInstanceCount = n.meshPerAttribute * n.count)
                                        } else
                                            for (let e = 0; e < r.locationSize; e++)
                                                m(r.location + e);
                                        e.bindBuffer(34962, h);
                                        for (let e = 0; e < r.locationSize; e++)
                                            _(r.location + e, s / r.locationSize, c, t, s * d, s / r.locationSize * e * d)
                                    }
                                } else if (void 0 !== c) {
                                    let i = c[t];
                                    if (void 0 !== i)
                                        switch (i.length) {
                                            case 2:
                                                e.vertexAttrib2fv(r.location, i);
                                                break;
                                            case 3:
                                                e.vertexAttrib3fv(r.location, i);
                                                break;
                                            case 4:
                                                e.vertexAttrib4fv(r.location, i);
                                                break;
                                            default:
                                                e.vertexAttrib1fv(r.location, i)
                                        }
                                }
                            }
                        }
                        v()
                    }(a, l, u, x),
                null !== y && e.bindBuffer(34963, i.get(y).buffer))
            },
            reset: x,
            resetDefaultState: y,
            dispose: function() {
                for (let e in x(),
                    o) {
                    let t = o[e];
                    for (let e in t) {
                        let i = t[e];
                        for (let e in i)
                            u(i[e].object),
                                delete i[e];
                        delete t[e]
                    }
                    delete o[e]
                }
            },
            releaseStatesOfGeometry: function(e) {
                if (void 0 === o[e.id])
                    return;
                let t = o[e.id];
                for (let e in t) {
                    let i = t[e];
                    for (let e in i)
                        u(i[e].object),
                            delete i[e];
                    delete t[e]
                }
                delete o[e.id]
            },
            releaseStatesOfProgram: function(e) {
                for (let t in o) {
                    let i = o[t];
                    if (void 0 === i[e.id])
                        continue;
                    let r = i[e.id];
                    for (let e in r)
                        u(r[e].object),
                            delete r[e];
                    delete i[e.id]
                }
            },
            initAttributes: f,
            enableAttribute: m,
            disableUnusedAttributes: v
        }
    }
    function r0(e, t, i, r) {
        let a;
        let n = r.isWebGL2;
        this.setMode = function(e) {
            a = e
        }
            ,
            this.render = function(t, r) {
                e.drawArrays(a, t, r),
                    i.update(r, a, 1)
            }
            ,
            this.renderInstances = function(r, s, o) {
                let l, h;
                if (0 !== o) {
                    if (n)
                        l = e,
                            h = "drawArraysInstanced";
                    else if (l = t.get("ANGLE_instanced_arrays"),
                        h = "drawArraysInstancedANGLE",
                    null === l) {
                        console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                        return
                    }
                    l[h](a, r, s, o),
                        i.update(s, a, o)
                }
            }
    }
    function r1(e, t, i) {
        let r;
        function a(t) {
            if ("highp" === t) {
                if (e.getShaderPrecisionFormat(35633, 36338).precision > 0 && e.getShaderPrecisionFormat(35632, 36338).precision > 0)
                    return "highp";
                t = "mediump"
            }
            return "mediump" === t && e.getShaderPrecisionFormat(35633, 36337).precision > 0 && e.getShaderPrecisionFormat(35632, 36337).precision > 0 ? "mediump" : "lowp"
        }
        let n = "undefined" != typeof WebGL2RenderingContext && e instanceof WebGL2RenderingContext || "undefined" != typeof WebGL2ComputeRenderingContext && e instanceof WebGL2ComputeRenderingContext
            , s = void 0 !== i.precision ? i.precision : "highp"
            , o = a(s);
        o !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", o, "instead."),
            s = o);
        let l = n || t.has("WEBGL_draw_buffers")
            , h = !0 === i.logarithmicDepthBuffer
            , c = e.getParameter(34930)
            , d = e.getParameter(35660)
            , u = e.getParameter(3379)
            , p = e.getParameter(34076)
            , f = e.getParameter(34921)
            , m = e.getParameter(36347)
            , g = e.getParameter(36348)
            , v = e.getParameter(36349)
            , _ = d > 0
            , x = n || t.has("OES_texture_float")
            , y = n ? e.getParameter(36183) : 0;
        return {
            isWebGL2: n,
            drawBuffers: l,
            getMaxAnisotropy: function() {
                if (void 0 !== r)
                    return r;
                if (!0 === t.has("EXT_texture_filter_anisotropic")) {
                    let i = t.get("EXT_texture_filter_anisotropic");
                    r = e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                } else
                    r = 0;
                return r
            },
            getMaxPrecision: a,
            precision: s,
            logarithmicDepthBuffer: h,
            maxTextures: c,
            maxVertexTextures: d,
            maxTextureSize: u,
            maxCubemapSize: p,
            maxAttributes: f,
            maxVertexUniforms: m,
            maxVaryings: g,
            maxFragmentUniforms: v,
            vertexTextures: _,
            floatFragmentTextures: x,
            floatVertexTextures: _ && x,
            maxSamples: y
        }
    }
    function r3(e) {
        let t = this
            , i = null
            , r = 0
            , a = !1
            , n = !1
            , s = new tF
            , o = new v
            , l = {
            value: null,
            needsUpdate: !1
        };
        function h() {
            l.value !== i && (l.value = i,
                l.needsUpdate = r > 0),
                t.numPlanes = r,
                t.numIntersection = 0
        }
        function c(e, i, r, a) {
            let n = null !== e ? e.length : 0
                , h = null;
            if (0 !== n) {
                if (h = l.value,
                !0 !== a || null === h) {
                    let t = r + 4 * n
                        , a = i.matrixWorldInverse;
                    o.getNormalMatrix(a),
                    (null === h || h.length < t) && (h = new Float32Array(t));
                    for (let t = 0, i = r; t !== n; ++t,
                        i += 4)
                        s.copy(e[t]).applyMatrix4(a, o),
                            s.normal.toArray(h, i),
                            h[i + 3] = s.constant
                }
                l.value = h,
                    l.needsUpdate = !0
            }
            return t.numPlanes = n,
                t.numIntersection = 0,
                h
        }
        this.uniform = l,
            this.numPlanes = 0,
            this.numIntersection = 0,
            this.init = function(e, t, n) {
                let s = 0 !== e.length || t || 0 !== r || a;
                return a = t,
                    i = c(e, n, 0),
                    r = e.length,
                    s
            }
            ,
            this.beginShadows = function() {
                n = !0,
                    c(null)
            }
            ,
            this.endShadows = function() {
                n = !1,
                    h()
            }
            ,
            this.setState = function(t, s, o) {
                let d = t.clippingPlanes
                    , u = t.clipIntersection
                    , p = t.clipShadows
                    , f = e.get(t);
                if (a && null !== d && 0 !== d.length && (!n || p)) {
                    let e = n ? 0 : r
                        , t = 4 * e
                        , a = f.clippingState || null;
                    l.value = a,
                        a = c(d, s, t, o);
                    for (let e = 0; e !== t; ++e)
                        a[e] = i[e];
                    f.clippingState = a,
                        this.numIntersection = u ? this.numPlanes : 0,
                        this.numPlanes += e
                } else
                    n ? c(null) : h()
            }
    }
    function r2(e) {
        let t = new WeakMap;
        function i(e, t) {
            return 303 === t ? e.mapping = 301 : 304 === t && (e.mapping = 302),
                e
        }
        function r(e) {
            let i = e.target;
            i.removeEventListener("dispose", r);
            let a = t.get(i);
            void 0 !== a && (t.delete(i),
                a.dispose())
        }
        return {
            get: function(a) {
                if (a && a.isTexture && !1 === a.isRenderTargetTexture) {
                    let n = a.mapping;
                    if (303 === n || 304 === n) {
                        if (t.has(a)) {
                            let e = t.get(a).texture;
                            return i(e, a.mapping)
                        }
                        {
                            let n = a.image;
                            if (!n || !(n.height > 0))
                                return null;
                            {
                                let s = new tN(n.height / 2);
                                return s.fromEquirectangularTexture(e, a),
                                    t.set(a, s),
                                    a.addEventListener("dispose", r),
                                    i(s.texture, a.mapping)
                            }
                        }
                    }
                }
                return a
            },
            dispose: function() {
                t = new WeakMap
            }
        }
    }
    rK.physical = {
        uniforms: tA([rK.standard.uniforms, {
            clearcoat: {
                value: 0
            },
            clearcoatMap: {
                value: null
            },
            clearcoatRoughness: {
                value: 0
            },
            clearcoatRoughnessMap: {
                value: null
            },
            clearcoatNormalScale: {
                value: new g(1,1)
            },
            clearcoatNormalMap: {
                value: null
            },
            iridescence: {
                value: 0
            },
            iridescenceMap: {
                value: null
            },
            iridescenceIOR: {
                value: 1.3
            },
            iridescenceThicknessMinimum: {
                value: 100
            },
            iridescenceThicknessMaximum: {
                value: 400
            },
            iridescenceThicknessMap: {
                value: null
            },
            sheen: {
                value: 0
            },
            sheenColor: {
                value: new P(0)
            },
            sheenColorMap: {
                value: null
            },
            sheenRoughness: {
                value: 1
            },
            sheenRoughnessMap: {
                value: null
            },
            transmission: {
                value: 0
            },
            transmissionMap: {
                value: null
            },
            transmissionSamplerSize: {
                value: new g
            },
            transmissionSamplerMap: {
                value: null
            },
            thickness: {
                value: 0
            },
            thicknessMap: {
                value: null
            },
            attenuationDistance: {
                value: 0
            },
            attenuationColor: {
                value: new P(0)
            },
            specularIntensity: {
                value: 1
            },
            specularIntensityMap: {
                value: null
            },
            specularColor: {
                value: new P(1,1,1)
            },
            specularColorMap: {
                value: null
            }
        }]),
        vertexShader: rZ.meshphysical_vert,
        fragmentShader: rZ.meshphysical_frag
    };
    class r4 extends tP {
        constructor(e=-1, t=1, i=1, r=-1, a=.1, n=2e3) {
            super(),
                this.isOrthographicCamera = !0,
                this.type = "OrthographicCamera",
                this.zoom = 1,
                this.view = null,
                this.left = e,
                this.right = t,
                this.top = i,
                this.bottom = r,
                this.near = a,
                this.far = n,
                this.updateProjectionMatrix()
        }
        copy(e, t) {
            return super.copy(e, t),
                this.left = e.left,
                this.right = e.right,
                this.top = e.top,
                this.bottom = e.bottom,
                this.near = e.near,
                this.far = e.far,
                this.zoom = e.zoom,
                this.view = null === e.view ? null : Object.assign({}, e.view),
                this
        }
        setViewOffset(e, t, i, r, a, n) {
            null === this.view && (this.view = {
                enabled: !0,
                fullWidth: 1,
                fullHeight: 1,
                offsetX: 0,
                offsetY: 0,
                width: 1,
                height: 1
            }),
                this.view.enabled = !0,
                this.view.fullWidth = e,
                this.view.fullHeight = t,
                this.view.offsetX = i,
                this.view.offsetY = r,
                this.view.width = a,
                this.view.height = n,
                this.updateProjectionMatrix()
        }
        clearViewOffset() {
            null !== this.view && (this.view.enabled = !1),
                this.updateProjectionMatrix()
        }
        updateProjectionMatrix() {
            let e = (this.right - this.left) / (2 * this.zoom)
                , t = (this.top - this.bottom) / (2 * this.zoom)
                , i = (this.right + this.left) / 2
                , r = (this.top + this.bottom) / 2
                , a = i - e
                , n = i + e
                , s = r + t
                , o = r - t;
            if (null !== this.view && this.view.enabled) {
                let e = (this.right - this.left) / this.view.fullWidth / this.zoom
                    , t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                a += e * this.view.offsetX,
                    n = a + e * this.view.width,
                    s -= t * this.view.offsetY,
                    o = s - t * this.view.height
            }
            this.projectionMatrix.makeOrthographic(a, n, s, o, this.near, this.far),
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
        }
        toJSON(e) {
            let t = super.toJSON(e);
            return t.object.zoom = this.zoom,
                t.object.left = this.left,
                t.object.right = this.right,
                t.object.top = this.top,
                t.object.bottom = this.bottom,
                t.object.near = this.near,
                t.object.far = this.far,
            null !== this.view && (t.object.view = Object.assign({}, this.view)),
                t
        }
    }
    let r5 = [.125, .215, .35, .446, .526, .582]
        , r6 = new r4
        , r8 = new P
        , r7 = null
        , r9 = (1 + Math.sqrt(5)) / 2
        , ae = 1 / r9
        , at = [new B(1,1,1), new B(-1,1,1), new B(1,1,-1), new B(-1,1,-1), new B(0,r9,ae), new B(0,r9,-ae), new B(ae,0,r9), new B(-ae,0,r9), new B(r9,ae,0), new B(-r9,ae,0)];
    class ai {
        constructor(e) {
            this._renderer = e,
                this._pingPongRenderTarget = null,
                this._lodMax = 0,
                this._cubeSize = 0,
                this._lodPlanes = [],
                this._sizeLods = [],
                this._sigmas = [],
                this._blurMaterial = null,
                this._cubemapMaterial = null,
                this._equirectMaterial = null,
                this._compileMaterial(this._blurMaterial)
        }
        fromScene(e, t=0, i=.1, r=100) {
            r7 = this._renderer.getRenderTarget(),
                this._setSize(256);
            let a = this._allocateTargets();
            return a.depthBuffer = !0,
                this._sceneToCubeUV(e, i, r, a),
            t > 0 && this._blur(a, 0, 0, t),
                this._applyPMREM(a),
                this._cleanup(a),
                a
        }
        fromEquirectangular(e, t=null) {
            return this._fromTexture(e, t)
        }
        fromCubemap(e, t=null) {
            return this._fromTexture(e, t)
        }
        compileCubemapShader() {
            null === this._cubemapMaterial && (this._cubemapMaterial = as(),
                this._compileMaterial(this._cubemapMaterial))
        }
        compileEquirectangularShader() {
            null === this._equirectMaterial && (this._equirectMaterial = an(),
                this._compileMaterial(this._equirectMaterial))
        }
        dispose() {
            this._dispose(),
            null !== this._cubemapMaterial && this._cubemapMaterial.dispose(),
            null !== this._equirectMaterial && this._equirectMaterial.dispose()
        }
        _setSize(e) {
            this._lodMax = Math.floor(Math.log2(e)),
                this._cubeSize = Math.pow(2, this._lodMax)
        }
        _dispose() {
            null !== this._blurMaterial && this._blurMaterial.dispose(),
            null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
            for (let e = 0; e < this._lodPlanes.length; e++)
                this._lodPlanes[e].dispose()
        }
        _cleanup(e) {
            this._renderer.setRenderTarget(r7),
                e.scissorTest = !1,
                aa(e, 0, 0, e.width, e.height)
        }
        _fromTexture(e, t) {
            301 === e.mapping || 302 === e.mapping ? this._setSize(0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4),
                r7 = this._renderer.getRenderTarget();
            let i = t || this._allocateTargets();
            return this._textureToCubeUV(e, i),
                this._applyPMREM(i),
                this._cleanup(i),
                i
        }
        _allocateTargets() {
            let e = 3 * Math.max(this._cubeSize, 112)
                , t = 4 * this._cubeSize
                , i = {
                magFilter: 1006,
                minFilter: 1006,
                generateMipmaps: !1,
                type: 1016,
                format: 1023,
                encoding: 3e3,
                depthBuffer: !1
            }
                , r = ar(e, t, i);
            if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== e) {
                null !== this._pingPongRenderTarget && this._dispose(),
                    this._pingPongRenderTarget = ar(e, t, i);
                let {_lodMax: r} = this;
                ({sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas} = function(e) {
                    let t = []
                        , i = []
                        , r = []
                        , a = e
                        , n = e - 4 + 1 + r5.length;
                    for (let s = 0; s < n; s++) {
                        let n = Math.pow(2, a);
                        i.push(n);
                        let o = 1 / n;
                        s > e - 4 ? o = r5[s - e + 4 - 1] : 0 === s && (o = 0),
                            r.push(o);
                        let l = 1 / (n - 2)
                            , h = -l
                            , c = 1 + l
                            , d = [h, h, c, h, c, c, h, h, c, c, h, c]
                            , u = new Float32Array(108)
                            , p = new Float32Array(72)
                            , f = new Float32Array(36);
                        for (let e = 0; e < 6; e++) {
                            let t = e % 3 * 2 / 3 - 1
                                , i = e > 2 ? 0 : -1
                                , r = [t, i, 0, t + 2 / 3, i, 0, t + 2 / 3, i + 1, 0, t, i, 0, t + 2 / 3, i + 1, 0, t, i + 1, 0];
                            u.set(r, 18 * e),
                                p.set(d, 12 * e);
                            let a = [e, e, e, e, e, e];
                            f.set(a, 6 * e)
                        }
                        let m = new tn;
                        m.setAttribute("position", new e4(u,3)),
                            m.setAttribute("uv", new e4(p,2)),
                            m.setAttribute("faceIndex", new e4(f,1)),
                            t.push(m),
                        a > 4 && a--
                    }
                    return {
                        lodPlanes: t,
                        sizeLods: i,
                        sigmas: r
                    }
                }(r)),
                    this._blurMaterial = function(e, t, i) {
                        let r = new Float32Array(20)
                            , a = new B(0,1,0)
                            , n = new tL({
                            name: "SphericalGaussianBlur",
                            defines: {
                                n: 20,
                                CUBEUV_TEXEL_WIDTH: 1 / t,
                                CUBEUV_TEXEL_HEIGHT: 1 / i,
                                CUBEUV_MAX_MIP: `${e}.0`
                            },
                            uniforms: {
                                envMap: {
                                    value: null
                                },
                                samples: {
                                    value: 1
                                },
                                weights: {
                                    value: r
                                },
                                latitudinal: {
                                    value: !1
                                },
                                dTheta: {
                                    value: 0
                                },
                                mipInt: {
                                    value: 0
                                },
                                poleAxis: {
                                    value: a
                                }
                            },
                            vertexShader: ao(),
                            fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;uniform int samples;uniform float weights[n];uniform bool latitudinal;uniform float dTheta;uniform float mipInt;uniform vec3 poleAxis;
#define ENVMAP_TYPE_CUBE_UV
#include <cube_uv_reflection_fragment>
vec3 getSample(float theta,vec3 axis){float cosTheta=cos(theta);vec3 sampleDirection=vOutputDirection*cosTheta+cross(axis,vOutputDirection)*sin(theta)+axis*dot(axis,vOutputDirection)*(1.0-cosTheta);return bilinearCubeUV(envMap,sampleDirection,mipInt);}void main(){vec3 axis=latitudinal?poleAxis:cross(poleAxis,vOutputDirection);if(all(equal(axis,vec3(0.0)))){axis=vec3(vOutputDirection.z,0.0,-vOutputDirection.x);}axis=normalize(axis);gl_FragColor=vec4(0.0,0.0,0.0,1.0);gl_FragColor.rgb+=weights[0]*getSample(0.0,axis);for(int i=1;i<n;i++){if(i>=samples){break;}float theta=dTheta*float(i);gl_FragColor.rgb+=weights[i]*getSample(-1.0*theta,axis);gl_FragColor.rgb+=weights[i]*getSample(theta,axis);}}`,
                            blending: 0,
                            depthTest: !1,
                            depthWrite: !1
                        });
                        return n
                    }(r, e, t)
            }
            return r
        }
        _compileMaterial(e) {
            let t = new tS(this._lodPlanes[0],e);
            this._renderer.compile(t, r6)
        }
        _sceneToCubeUV(e, t, i, r) {
            let a = new tR(90,1,t,i)
                , n = [1, -1, 1, 1, 1, 1]
                , s = [1, 1, 1, -1, -1, -1]
                , o = this._renderer
                , l = o.autoClear
                , h = o.toneMapping;
            o.getClearColor(r8),
                o.toneMapping = 0,
                o.autoClear = !1;
            let c = new e1({
                name: "PMREM.Background",
                side: 1,
                depthWrite: !1,
                depthTest: !1
            })
                , d = new tS(new tT,c)
                , u = !1
                , p = e.background;
            p ? p.isColor && (c.color.copy(p),
                e.background = null,
                u = !0) : (c.color.copy(r8),
                u = !0);
            for (let t = 0; t < 6; t++) {
                let i = t % 3;
                0 === i ? (a.up.set(0, n[t], 0),
                    a.lookAt(s[t], 0, 0)) : 1 === i ? (a.up.set(0, 0, n[t]),
                    a.lookAt(0, s[t], 0)) : (a.up.set(0, n[t], 0),
                    a.lookAt(0, 0, s[t]));
                let l = this._cubeSize;
                aa(r, i * l, t > 2 ? l : 0, l, l),
                    o.setRenderTarget(r),
                u && o.render(d, a),
                    o.render(e, a)
            }
            d.geometry.dispose(),
                d.material.dispose(),
                o.toneMapping = h,
                o.autoClear = l,
                e.background = p
        }
        _textureToCubeUV(e, t) {
            let i = this._renderer
                , r = 301 === e.mapping || 302 === e.mapping;
            r ? (null === this._cubemapMaterial && (this._cubemapMaterial = as()),
                this._cubemapMaterial.uniforms.flipEnvMap.value = !1 === e.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = an());
            let a = r ? this._cubemapMaterial : this._equirectMaterial
                , n = new tS(this._lodPlanes[0],a)
                , s = a.uniforms;
            s.envMap.value = e;
            let o = this._cubeSize;
            aa(t, 0, 0, 3 * o, 2 * o),
                i.setRenderTarget(t),
                i.render(n, r6)
        }
        _applyPMREM(e) {
            let t = this._renderer
                , i = t.autoClear;
            t.autoClear = !1;
            for (let t = 1; t < this._lodPlanes.length; t++) {
                let i = Math.sqrt(this._sigmas[t] * this._sigmas[t] - this._sigmas[t - 1] * this._sigmas[t - 1])
                    , r = at[(t - 1) % at.length];
                this._blur(e, t - 1, t, i, r)
            }
            t.autoClear = i
        }
        _blur(e, t, i, r, a) {
            let n = this._pingPongRenderTarget;
            this._halfBlur(e, n, t, i, r, "latitudinal", a),
                this._halfBlur(n, e, i, i, r, "longitudinal", a)
        }
        _halfBlur(e, t, i, r, a, n, s) {
            let o = this._renderer
                , l = this._blurMaterial;
            "latitudinal" !== n && "longitudinal" !== n && console.error("blur direction must be either latitudinal or longitudinal!");
            let h = new tS(this._lodPlanes[r],l)
                , c = l.uniforms
                , d = this._sizeLods[i] - 1
                , u = isFinite(a) ? Math.PI / (2 * d) : 2 * Math.PI / 39
                , p = a / u
                , f = isFinite(a) ? 1 + Math.floor(3 * p) : 20;
            f > 20 && console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`);
            let m = []
                , g = 0;
            for (let e = 0; e < 20; ++e) {
                let t = e / p
                    , i = Math.exp(-t * t / 2);
                m.push(i),
                    0 === e ? g += i : e < f && (g += 2 * i)
            }
            for (let e = 0; e < m.length; e++)
                m[e] = m[e] / g;
            c.envMap.value = e.texture,
                c.samples.value = f,
                c.weights.value = m,
                c.latitudinal.value = "latitudinal" === n,
            s && (c.poleAxis.value = s);
            let {_lodMax: v} = this;
            c.dTheta.value = u,
                c.mipInt.value = v - i;
            let _ = this._sizeLods[r]
                , x = 4 * (this._cubeSize - _);
            aa(t, 3 * _ * (r > v - 4 ? r - v + 4 : 0), x, 3 * _, 2 * _),
                o.setRenderTarget(t),
                o.render(h, r6)
        }
    }
    function ar(e, t, i) {
        let r = new U(e,t,i);
        return r.texture.mapping = 306,
            r.texture.name = "PMREM.cubeUv",
            r.scissorTest = !0,
            r
    }
    function aa(e, t, i, r, a) {
        e.viewport.set(t, i, r, a),
            e.scissor.set(t, i, r, a)
    }
    function an() {
        return new tL({
            name: "EquirectangularToCubeUV",
            uniforms: {
                envMap: {
                    value: null
                }
            },
            vertexShader: ao(),
            fragmentShader: `precision mediump float;precision mediump int;varying vec3 vOutputDirection;uniform sampler2D envMap;
#include <common>
void main(){vec3 outputDirection=normalize(vOutputDirection);vec2 uv=equirectUv(outputDirection);gl_FragColor=vec4(texture2D(envMap,uv).rgb,1.0);}`,
            blending: 0,
            depthTest: !1,
            depthWrite: !1
        })
    }
    function as() {
        return new tL({
            name: "CubemapToCubeUV",
            uniforms: {
                envMap: {
                    value: null
                },
                flipEnvMap: {
                    value: -1
                }
            },
            vertexShader: ao(),
            fragmentShader: "precision mediump float;precision mediump int;uniform float flipEnvMap;varying vec3 vOutputDirection;uniform samplerCube envMap;void main(){gl_FragColor=textureCube(envMap,vec3(flipEnvMap*vOutputDirection.x,vOutputDirection.yz));}",
            blending: 0,
            depthTest: !1,
            depthWrite: !1
        })
    }
    function ao() {
        return "precision mediump float;precision mediump int;attribute float faceIndex;varying vec3 vOutputDirection;vec3 getDirection(vec2 uv,float face){uv=2.0*uv-1.0;vec3 direction=vec3(uv,1.0);if(face==0.0){direction=direction.zyx;}else if(face==1.0){direction=direction.xzy;direction.xz*=-1.0;}else if(face==2.0){direction.x*=-1.0;}else if(face==3.0){direction=direction.zyx;direction.xz*=-1.0;}else if(face==4.0){direction=direction.xzy;direction.xy*=-1.0;}else if(face==5.0){direction.z*=-1.0;}return direction;}void main(){vOutputDirection=getDirection(uv,faceIndex);gl_Position=vec4(position,1.0);}"
    }
    function al(e) {
        let t = new WeakMap
            , i = null;
        function r(e) {
            let i = e.target;
            i.removeEventListener("dispose", r);
            let a = t.get(i);
            void 0 !== a && (t.delete(i),
                a.dispose())
        }
        return {
            get: function(a) {
                if (a && a.isTexture) {
                    let n = a.mapping
                        , s = 303 === n || 304 === n
                        , o = 301 === n || 302 === n;
                    if (s || o) {
                        if (a.isRenderTargetTexture && !0 === a.needsPMREMUpdate) {
                            a.needsPMREMUpdate = !1;
                            let r = t.get(a);
                            return null === i && (i = new ai(e)),
                                r = s ? i.fromEquirectangular(a, r) : i.fromCubemap(a, r),
                                t.set(a, r),
                                r.texture
                        }
                        if (t.has(a))
                            return t.get(a).texture;
                        {
                            let n = a.image;
                            if (!(s && n && n.height > 0 || o && n && function(e) {
                                let t = 0;
                                for (let i = 0; i < 6; i++)
                                    void 0 !== e[i] && t++;
                                return 6 === t
                            }(n)))
                                return null;
                            {
                                null === i && (i = new ai(e));
                                let n = s ? i.fromEquirectangular(a) : i.fromCubemap(a);
                                return t.set(a, n),
                                    a.addEventListener("dispose", r),
                                    n.texture
                            }
                        }
                    }
                }
                return a
            },
            dispose: function() {
                t = new WeakMap,
                null !== i && (i.dispose(),
                    i = null)
            }
        }
    }
    function ah(e) {
        let t = {};
        function i(i) {
            let r;
            if (void 0 !== t[i])
                return t[i];
            switch (i) {
                case "WEBGL_depth_texture":
                    r = e.getExtension("WEBGL_depth_texture") || e.getExtension("MOZ_WEBGL_depth_texture") || e.getExtension("WEBKIT_WEBGL_depth_texture");
                    break;
                case "EXT_texture_filter_anisotropic":
                    r = e.getExtension("EXT_texture_filter_anisotropic") || e.getExtension("MOZ_EXT_texture_filter_anisotropic") || e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                    break;
                case "WEBGL_compressed_texture_s3tc":
                    r = e.getExtension("WEBGL_compressed_texture_s3tc") || e.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                    break;
                case "WEBGL_compressed_texture_pvrtc":
                    r = e.getExtension("WEBGL_compressed_texture_pvrtc") || e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                    break;
                default:
                    r = e.getExtension(i)
            }
            return t[i] = r,
                r
        }
        return {
            has: function(e) {
                return null !== i(e)
            },
            init: function(e) {
                e.isWebGL2 ? i("EXT_color_buffer_float") : (i("WEBGL_depth_texture"),
                    i("OES_texture_float"),
                    i("OES_texture_half_float"),
                    i("OES_texture_half_float_linear"),
                    i("OES_standard_derivatives"),
                    i("OES_element_index_uint"),
                    i("OES_vertex_array_object"),
                    i("ANGLE_instanced_arrays")),
                    i("OES_texture_float_linear"),
                    i("EXT_color_buffer_half_float"),
                    i("WEBGL_multisampled_render_to_texture")
            },
            get: function(e) {
                let t = i(e);
                return null === t && console.warn("THREE.WebGLRenderer: " + e + " extension not supported."),
                    t
            }
        }
    }
    function ac(e, t, i, r) {
        let a = {}
            , n = new WeakMap;
        function s(e) {
            let o = e.target;
            for (let e in null !== o.index && t.remove(o.index),
                o.attributes)
                t.remove(o.attributes[e]);
            o.removeEventListener("dispose", s),
                delete a[o.id];
            let l = n.get(o);
            l && (t.remove(l),
                n.delete(o)),
                r.releaseStatesOfGeometry(o),
            !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount,
                i.memory.geometries--
        }
        function o(e) {
            let i = []
                , r = e.index
                , a = e.attributes.position
                , s = 0;
            if (null !== r) {
                let e = r.array;
                s = r.version;
                for (let t = 0, r = e.length; t < r; t += 3) {
                    let r = e[t + 0]
                        , a = e[t + 1]
                        , n = e[t + 2];
                    i.push(r, a, a, n, n, r)
                }
            } else {
                let e = a.array;
                s = a.version;
                for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) {
                    let e = t + 0
                        , r = t + 1
                        , a = t + 2;
                    i.push(e, r, r, a, a, e)
                }
            }
            let o = new (_(i) ? e6 : e5)(i,1);
            o.version = s;
            let l = n.get(e);
            l && t.remove(l),
                n.set(e, o)
        }
        return {
            get: function(e, t) {
                return !0 === a[t.id] || (t.addEventListener("dispose", s),
                    a[t.id] = !0,
                    i.memory.geometries++),
                    t
            },
            update: function(e) {
                let i = e.attributes;
                for (let e in i)
                    t.update(i[e], 34962);
                let r = e.morphAttributes;
                for (let e in r) {
                    let i = r[e];
                    for (let e = 0, r = i.length; e < r; e++)
                        t.update(i[e], 34962)
                }
            },
            getWireframeAttribute: function(e) {
                let t = n.get(e);
                if (t) {
                    let i = e.index;
                    null !== i && t.version < i.version && o(e)
                } else
                    o(e);
                return n.get(e)
            }
        }
    }
    function ad(e, t, i, r) {
        let a, n, s;
        let o = r.isWebGL2;
        this.setMode = function(e) {
            a = e
        }
            ,
            this.setIndex = function(e) {
                n = e.type,
                    s = e.bytesPerElement
            }
            ,
            this.render = function(t, r) {
                e.drawElements(a, r, n, t * s),
                    i.update(r, a, 1)
            }
            ,
            this.renderInstances = function(r, l, h) {
                let c, d;
                if (0 !== h) {
                    if (o)
                        c = e,
                            d = "drawElementsInstanced";
                    else if (c = t.get("ANGLE_instanced_arrays"),
                        d = "drawElementsInstancedANGLE",
                    null === c) {
                        console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                        return
                    }
                    c[d](a, l, n, r * s, h),
                        i.update(l, a, h)
                }
            }
    }
    function au(e) {
        let t = {
            frame: 0,
            calls: 0,
            triangles: 0,
            points: 0,
            lines: 0
        };
        return {
            memory: {
                geometries: 0,
                textures: 0
            },
            render: t,
            programs: null,
            autoReset: !0,
            reset: function() {
                t.frame++,
                    t.calls = 0,
                    t.triangles = 0,
                    t.points = 0,
                    t.lines = 0
            },
            update: function(e, i, r) {
                switch (t.calls++,
                    i) {
                    case 4:
                        t.triangles += r * (e / 3);
                        break;
                    case 1:
                        t.lines += r * (e / 2);
                        break;
                    case 3:
                        t.lines += r * (e - 1);
                        break;
                    case 2:
                        t.lines += r * e;
                        break;
                    case 0:
                        t.points += r * e;
                        break;
                    default:
                        console.error("THREE.WebGLInfo: Unknown draw mode:", i)
                }
            }
        }
    }
    function ap(e, t) {
        return e[0] - t[0]
    }
    function af(e, t) {
        return Math.abs(t[1]) - Math.abs(e[1])
    }
    function am(e, t) {
        let i = 1
            , r = t.isInterleavedBufferAttribute ? t.data.array : t.array;
        r instanceof Int8Array ? i = 127 : r instanceof Uint8Array ? i = 255 : r instanceof Uint16Array ? i = 65535 : r instanceof Int16Array ? i = 32767 : r instanceof Int32Array ? i = 2147483647 : console.error("THREE.WebGLMorphtargets: Unsupported morph attribute data type: ", r),
            e.divideScalar(i)
    }
    function ag(e, t, i) {
        let r = {}
            , a = new Float32Array(8)
            , n = new WeakMap
            , s = new z
            , o = [];
        for (let e = 0; e < 8; e++)
            o[e] = [e, 0];
        return {
            update: function(l, h, c, d) {
                let u = l.morphTargetInfluences;
                if (!0 === t.isWebGL2) {
                    let r = h.morphAttributes.position || h.morphAttributes.normal || h.morphAttributes.color
                        , a = void 0 !== r ? r.length : 0
                        , o = n.get(h);
                    if (void 0 === o || o.count !== a) {
                        void 0 !== o && o.texture.dispose();
                        let e = void 0 !== h.morphAttributes.position
                            , i = void 0 !== h.morphAttributes.normal
                            , r = void 0 !== h.morphAttributes.color
                            , l = h.morphAttributes.position || []
                            , c = h.morphAttributes.normal || []
                            , d = h.morphAttributes.color || []
                            , u = 0;
                        !0 === e && (u = 1),
                        !0 === i && (u = 2),
                        !0 === r && (u = 3);
                        let p = h.attributes.position.count * u
                            , f = 1;
                        p > t.maxTextureSize && (f = Math.ceil(p / t.maxTextureSize),
                            p = t.maxTextureSize);
                        let m = new Float32Array(p * f * 4 * a)
                            , v = new F(m,p,f,a);
                        v.type = 1015,
                            v.needsUpdate = !0;
                        let _ = 4 * u;
                        for (let t = 0; t < a; t++) {
                            let a = l[t]
                                , n = c[t]
                                , o = d[t]
                                , h = p * f * 4 * t;
                            for (let t = 0; t < a.count; t++) {
                                let l = t * _;
                                !0 === e && (s.fromBufferAttribute(a, t),
                                !0 === a.normalized && am(s, a),
                                    m[h + l + 0] = s.x,
                                    m[h + l + 1] = s.y,
                                    m[h + l + 2] = s.z,
                                    m[h + l + 3] = 0),
                                !0 === i && (s.fromBufferAttribute(n, t),
                                !0 === n.normalized && am(s, n),
                                    m[h + l + 4] = s.x,
                                    m[h + l + 5] = s.y,
                                    m[h + l + 6] = s.z,
                                    m[h + l + 7] = 0),
                                !0 === r && (s.fromBufferAttribute(o, t),
                                !0 === o.normalized && am(s, o),
                                    m[h + l + 8] = s.x,
                                    m[h + l + 9] = s.y,
                                    m[h + l + 10] = s.z,
                                    m[h + l + 11] = 4 === o.itemSize ? s.w : 1)
                            }
                        }
                        o = {
                            count: a,
                            texture: v,
                            size: new g(p,f)
                        },
                            n.set(h, o),
                            h.addEventListener("dispose", function e() {
                                v.dispose(),
                                    n.delete(h),
                                    h.removeEventListener("dispose", e)
                            })
                    }
                    let l = 0;
                    for (let e = 0; e < u.length; e++)
                        l += u[e];
                    let c = h.morphTargetsRelative ? 1 : 1 - l;
                    d.getUniforms().setValue(e, "morphTargetBaseInfluence", c),
                        d.getUniforms().setValue(e, "morphTargetInfluences", u),
                        d.getUniforms().setValue(e, "morphTargetsTexture", o.texture, i),
                        d.getUniforms().setValue(e, "morphTargetsTextureSize", o.size)
                } else {
                    let t = void 0 === u ? 0 : u.length
                        , i = r[h.id];
                    if (void 0 === i || i.length !== t) {
                        i = [];
                        for (let e = 0; e < t; e++)
                            i[e] = [e, 0];
                        r[h.id] = i
                    }
                    for (let e = 0; e < t; e++) {
                        let t = i[e];
                        t[0] = e,
                            t[1] = u[e]
                    }
                    i.sort(af);
                    for (let e = 0; e < 8; e++)
                        e < t && i[e][1] ? (o[e][0] = i[e][0],
                            o[e][1] = i[e][1]) : (o[e][0] = Number.MAX_SAFE_INTEGER,
                            o[e][1] = 0);
                    o.sort(ap);
                    let n = h.morphAttributes.position
                        , s = h.morphAttributes.normal
                        , l = 0;
                    for (let e = 0; e < 8; e++) {
                        let t = o[e]
                            , i = t[0]
                            , r = t[1];
                        i !== Number.MAX_SAFE_INTEGER && r ? (n && h.getAttribute("morphTarget" + e) !== n[i] && h.setAttribute("morphTarget" + e, n[i]),
                        s && h.getAttribute("morphNormal" + e) !== s[i] && h.setAttribute("morphNormal" + e, s[i]),
                            a[e] = r,
                            l += r) : (n && !0 === h.hasAttribute("morphTarget" + e) && h.deleteAttribute("morphTarget" + e),
                        s && !0 === h.hasAttribute("morphNormal" + e) && h.deleteAttribute("morphNormal" + e),
                            a[e] = 0)
                    }
                    let c = h.morphTargetsRelative ? 1 : 1 - l;
                    d.getUniforms().setValue(e, "morphTargetBaseInfluence", c),
                        d.getUniforms().setValue(e, "morphTargetInfluences", a)
                }
            }
        }
    }
    function av(e, t, i, r) {
        let a = new WeakMap;
        function n(e) {
            let t = e.target;
            t.removeEventListener("dispose", n),
                i.remove(t.instanceMatrix),
            null !== t.instanceColor && i.remove(t.instanceColor)
        }
        return {
            update: function(e) {
                let s = r.render.frame
                    , o = e.geometry
                    , l = t.get(e, o);
                return a.get(l) !== s && (t.update(l),
                    a.set(l, s)),
                e.isInstancedMesh && (!1 === e.hasEventListener("dispose", n) && e.addEventListener("dispose", n),
                    i.update(e.instanceMatrix, 34962),
                null !== e.instanceColor && i.update(e.instanceColor, 34962)),
                    l
            },
            dispose: function() {
                a = new WeakMap
            }
        }
    }
    let a_ = new O
        , ax = new F
        , ay = new class extends O {
        constructor(e=null, t=1, i=1, r=1) {
            super(null),
                this.isData3DTexture = !0,
                this.image = {
                    data: e,
                    width: t,
                    height: i,
                    depth: r
                },
                this.magFilter = 1003,
                this.minFilter = 1003,
                this.wrapR = 1001,
                this.generateMipmaps = !1,
                this.flipY = !1,
                this.unpackAlignment = 1
        }
    }
        , aM = new tI
        , ab = []
        , aS = []
        , aw = new Float32Array(16)
        , aT = new Float32Array(9)
        , aE = new Float32Array(4);
    function aA(e, t, i) {
        let r = e[0];
        if (r <= 0 || r > 0)
            return e;
        let a = t * i
            , n = ab[a];
        if (void 0 === n && (n = new Float32Array(a),
            ab[a] = n),
        0 !== t) {
            r.toArray(n, 0);
            for (let r = 1, a = 0; r !== t; ++r)
                a += i,
                    e[r].toArray(n, a)
        }
        return n
    }
    function aC(e, t) {
        if (e.length !== t.length)
            return !1;
        for (let i = 0, r = e.length; i < r; i++)
            if (e[i] !== t[i])
                return !1;
        return !0
    }
    function aL(e, t) {
        for (let i = 0, r = t.length; i < r; i++)
            e[i] = t[i]
    }
    function aP(e, t) {
        let i = aS[t];
        void 0 === i && (i = new Int32Array(t),
            aS[t] = i);
        for (let r = 0; r !== t; ++r)
            i[r] = e.allocateTextureUnit();
        return i
    }
    function aR(e, t) {
        let i = this.cache;
        i[0] !== t && (e.uniform1f(this.addr, t),
            i[0] = t)
    }
    function aD(e, t) {
        let i = this.cache;
        if (void 0 !== t.x)
            (i[0] !== t.x || i[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y),
                i[0] = t.x,
                i[1] = t.y);
        else {
            if (aC(i, t))
                return;
            e.uniform2fv(this.addr, t),
                aL(i, t)
        }
    }
    function aI(e, t) {
        let i = this.cache;
        if (void 0 !== t.x)
            (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z),
                i[0] = t.x,
                i[1] = t.y,
                i[2] = t.z);
        else if (void 0 !== t.r)
            (i[0] !== t.r || i[1] !== t.g || i[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b),
                i[0] = t.r,
                i[1] = t.g,
                i[2] = t.b);
        else {
            if (aC(i, t))
                return;
            e.uniform3fv(this.addr, t),
                aL(i, t)
        }
    }
    function aN(e, t) {
        let i = this.cache;
        if (void 0 !== t.x)
            (i[0] !== t.x || i[1] !== t.y || i[2] !== t.z || i[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w),
                i[0] = t.x,
                i[1] = t.y,
                i[2] = t.z,
                i[3] = t.w);
        else {
            if (aC(i, t))
                return;
            e.uniform4fv(this.addr, t),
                aL(i, t)
        }
    }
    function aO(e, t) {
        let i = this.cache
            , r = t.elements;
        if (void 0 === r) {
            if (aC(i, t))
                return;
            e.uniformMatrix2fv(this.addr, !1, t),
                aL(i, t)
        } else {
            if (aC(i, r))
                return;
            aE.set(r),
                e.uniformMatrix2fv(this.addr, !1, aE),
                aL(i, r)
        }
    }
    function az(e, t) {
        let i = this.cache
            , r = t.elements;
        if (void 0 === r) {
            if (aC(i, t))
                return;
            e.uniformMatrix3fv(this.addr, !1, t),
                aL(i, t)
        } else {
            if (aC(i, r))
                return;
            aT.set(r),
                e.uniformMatrix3fv(this.addr, !1, aT),
                aL(i, r)
        }
    }
    function aU(e, t) {
        let i = this.cache
            , r = t.elements;
        if (void 0 === r) {
            if (aC(i, t))
                return;
            e.uniformMatrix4fv(this.addr, !1, t),
                aL(i, t)
        } else {
            if (aC(i, r))
                return;
            aw.set(r),
                e.uniformMatrix4fv(this.addr, !1, aw),
                aL(i, r)
        }
    }
    function aF(e, t) {
        let i = this.cache;
        i[0] !== t && (e.uniform1i(this.addr, t),
            i[0] = t)
    }
    function ak(e, t) {
        let i = this.cache;
        aC(i, t) || (e.uniform2iv(this.addr, t),
            aL(i, t))
    }
    function aB(e, t) {
        let i = this.cache;
        aC(i, t) || (e.uniform3iv(this.addr, t),
            aL(i, t))
    }
    function aH(e, t) {
        let i = this.cache;
        aC(i, t) || (e.uniform4iv(this.addr, t),
            aL(i, t))
    }
    function aG(e, t) {
        let i = this.cache;
        i[0] !== t && (e.uniform1ui(this.addr, t),
            i[0] = t)
    }
    function aV(e, t) {
        let i = this.cache;
        aC(i, t) || (e.uniform2uiv(this.addr, t),
            aL(i, t))
    }
    function aW(e, t) {
        let i = this.cache;
        aC(i, t) || (e.uniform3uiv(this.addr, t),
            aL(i, t))
    }
    function aj(e, t) {
        let i = this.cache;
        aC(i, t) || (e.uniform4uiv(this.addr, t),
            aL(i, t))
    }
    function aq(e, t, i) {
        let r = this.cache
            , a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a),
            r[0] = a),
            i.setTexture2D(t || a_, a)
    }
    function aX(e, t, i) {
        let r = this.cache
            , a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a),
            r[0] = a),
            i.setTexture3D(t || ay, a)
    }
    function aY(e, t, i) {
        let r = this.cache
            , a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a),
            r[0] = a),
            i.setTextureCube(t || aM, a)
    }
    function aZ(e, t, i) {
        let r = this.cache
            , a = i.allocateTextureUnit();
        r[0] !== a && (e.uniform1i(this.addr, a),
            r[0] = a),
            i.setTexture2DArray(t || ax, a)
    }
    function aJ(e, t) {
        e.uniform1fv(this.addr, t)
    }
    function aK(e, t) {
        let i = aA(t, this.size, 2);
        e.uniform2fv(this.addr, i)
    }
    function aQ(e, t) {
        let i = aA(t, this.size, 3);
        e.uniform3fv(this.addr, i)
    }
    function a$(e, t) {
        let i = aA(t, this.size, 4);
        e.uniform4fv(this.addr, i)
    }
    function a0(e, t) {
        let i = aA(t, this.size, 4);
        e.uniformMatrix2fv(this.addr, !1, i)
    }
    function a1(e, t) {
        let i = aA(t, this.size, 9);
        e.uniformMatrix3fv(this.addr, !1, i)
    }
    function a3(e, t) {
        let i = aA(t, this.size, 16);
        e.uniformMatrix4fv(this.addr, !1, i)
    }
    function a2(e, t) {
        e.uniform1iv(this.addr, t)
    }
    function a4(e, t) {
        e.uniform2iv(this.addr, t)
    }
    function a5(e, t) {
        e.uniform3iv(this.addr, t)
    }
    function a6(e, t) {
        e.uniform4iv(this.addr, t)
    }
    function a8(e, t) {
        e.uniform1uiv(this.addr, t)
    }
    function a7(e, t) {
        e.uniform2uiv(this.addr, t)
    }
    function a9(e, t) {
        e.uniform3uiv(this.addr, t)
    }
    function ne(e, t) {
        e.uniform4uiv(this.addr, t)
    }
    function nt(e, t, i) {
        let r = t.length
            , a = aP(i, r);
        e.uniform1iv(this.addr, a);
        for (let e = 0; e !== r; ++e)
            i.setTexture2D(t[e] || a_, a[e])
    }
    function ni(e, t, i) {
        let r = t.length
            , a = aP(i, r);
        e.uniform1iv(this.addr, a);
        for (let e = 0; e !== r; ++e)
            i.setTexture3D(t[e] || ay, a[e])
    }
    function nr(e, t, i) {
        let r = t.length
            , a = aP(i, r);
        e.uniform1iv(this.addr, a);
        for (let e = 0; e !== r; ++e)
            i.setTextureCube(t[e] || aM, a[e])
    }
    function na(e, t, i) {
        let r = t.length
            , a = aP(i, r);
        e.uniform1iv(this.addr, a);
        for (let e = 0; e !== r; ++e)
            i.setTexture2DArray(t[e] || ax, a[e])
    }
    class nn {
        constructor(e, t, i) {
            this.id = e,
                this.addr = i,
                this.cache = [],
                this.setValue = function(e) {
                    switch (e) {
                        case 5126:
                            return aR;
                        case 35664:
                            return aD;
                        case 35665:
                            return aI;
                        case 35666:
                            return aN;
                        case 35674:
                            return aO;
                        case 35675:
                            return az;
                        case 35676:
                            return aU;
                        case 5124:
                        case 35670:
                            return aF;
                        case 35667:
                        case 35671:
                            return ak;
                        case 35668:
                        case 35672:
                            return aB;
                        case 35669:
                        case 35673:
                            return aH;
                        case 5125:
                            return aG;
                        case 36294:
                            return aV;
                        case 36295:
                            return aW;
                        case 36296:
                            return aj;
                        case 35678:
                        case 36198:
                        case 36298:
                        case 36306:
                        case 35682:
                            return aq;
                        case 35679:
                        case 36299:
                        case 36307:
                            return aX;
                        case 35680:
                        case 36300:
                        case 36308:
                        case 36293:
                            return aY;
                        case 36289:
                        case 36303:
                        case 36311:
                        case 36292:
                            return aZ
                    }
                }(t.type)
        }
    }
    class ns {
        constructor(e, t, i) {
            this.id = e,
                this.addr = i,
                this.cache = [],
                this.size = t.size,
                this.setValue = function(e) {
                    switch (e) {
                        case 5126:
                            return aJ;
                        case 35664:
                            return aK;
                        case 35665:
                            return aQ;
                        case 35666:
                            return a$;
                        case 35674:
                            return a0;
                        case 35675:
                            return a1;
                        case 35676:
                            return a3;
                        case 5124:
                        case 35670:
                            return a2;
                        case 35667:
                        case 35671:
                            return a4;
                        case 35668:
                        case 35672:
                            return a5;
                        case 35669:
                        case 35673:
                            return a6;
                        case 5125:
                            return a8;
                        case 36294:
                            return a7;
                        case 36295:
                            return a9;
                        case 36296:
                            return ne;
                        case 35678:
                        case 36198:
                        case 36298:
                        case 36306:
                        case 35682:
                            return nt;
                        case 35679:
                        case 36299:
                        case 36307:
                            return ni;
                        case 35680:
                        case 36300:
                        case 36308:
                        case 36293:
                            return nr;
                        case 36289:
                        case 36303:
                        case 36311:
                        case 36292:
                            return na
                    }
                }(t.type)
        }
    }
    class no {
        constructor(e) {
            this.id = e,
                this.seq = [],
                this.map = {}
        }
        setValue(e, t, i) {
            let r = this.seq;
            for (let a = 0, n = r.length; a !== n; ++a) {
                let n = r[a];
                n.setValue(e, t[n.id], i)
            }
        }
    }
    let nl = /(\w+)(\])?(\[|\.)?/g;
    function nh(e, t) {
        e.seq.push(t),
            e.map[t.id] = t
    }
    class nc {
        constructor(e, t) {
            this.seq = [],
                this.map = {};
            let i = e.getProgramParameter(t, 35718);
            for (let r = 0; r < i; ++r) {
                let i = e.getActiveUniform(t, r)
                    , a = e.getUniformLocation(t, i.name);
                !function(e, t, i) {
                    let r = e.name
                        , a = r.length;
                    for (nl.lastIndex = 0; ; ) {
                        let n = nl.exec(r)
                            , s = nl.lastIndex
                            , o = n[1]
                            , l = "]" === n[2]
                            , h = n[3];
                        if (l && (o |= 0),
                        void 0 === h || "[" === h && s + 2 === a) {
                            nh(i, void 0 === h ? new nn(o,e,t) : new ns(o,e,t));
                            break
                        }
                        {
                            let e = i.map
                                , t = e[o];
                            void 0 === t && nh(i, t = new no(o)),
                                i = t
                        }
                    }
                }(i, a, this)
            }
        }
        setValue(e, t, i, r) {
            let a = this.map[t];
            void 0 !== a && a.setValue(e, i, r)
        }
        setOptional(e, t, i) {
            let r = t[i];
            void 0 !== r && this.setValue(e, i, r)
        }
        static upload(e, t, i, r) {
            for (let a = 0, n = t.length; a !== n; ++a) {
                let n = t[a]
                    , s = i[n.id];
                !1 !== s.needsUpdate && n.setValue(e, s.value, r)
            }
        }
        static seqWithValue(e, t) {
            let i = [];
            for (let r = 0, a = e.length; r !== a; ++r) {
                let a = e[r];
                a.id in t && i.push(a)
            }
            return i
        }
    }
    function nd(e, t, i) {
        let r = e.createShader(t);
        return e.shaderSource(r, i),
            e.compileShader(r),
            r
    }
    let nu = 0;
    function np(e, t, i) {
        let r = e.getShaderParameter(t, 35713)
            , a = e.getShaderInfoLog(t).trim();
        if (r && "" === a)
            return "";
        let n = /ERROR: 0:(\d+)/.exec(a);
        if (!n)
            return a;
        {
            let r = parseInt(n[1]);
            return i.toUpperCase() + "\n\n" + a + "\n\n" + function(e, t) {
                let i = e.split("\n")
                    , r = []
                    , a = Math.max(t - 6, 0)
                    , n = Math.min(t + 6, i.length);
                for (let e = a; e < n; e++) {
                    let a = e + 1;
                    r.push(`${a === t ? ">" : " "} ${a}: ${i[e]}`)
                }
                return r.join("\n")
            }(e.getShaderSource(t), r)
        }
    }
    function nf(e) {
        return "" !== e
    }
    function nm(e, t) {
        return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows)
    }
    function ng(e, t) {
        return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection)
    }
    let nv = /^[ \t]*#include +<([\w\d./]+)>/gm;
    function n_(e) {
        return e.replace(nv, nx)
    }
    function nx(e, t) {
        let i = rZ[t];
        if (void 0 === i)
            throw Error("Can not resolve #include <" + t + ">");
        return n_(i)
    }
    let ny = /#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g
        , nM = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
    function nb(e) {
        return e.replace(nM, nw).replace(ny, nS)
    }
    function nS(e, t, i, r) {
        return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),
            nw(e, t, i, r)
    }
    function nw(e, t, i, r) {
        let a = "";
        for (let e = parseInt(t); e < parseInt(i); e++)
            a += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
        return a
    }
    function nT(e) {
        let t = "precision " + e.precision + " float;\nprecision " + e.precision + " int;";
        return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"),
            t
    }
    function nE(e, t, i, r) {
        let a, n, s, l, h, c;
        let d = e.getContext()
            , u = i.defines
            , p = i.vertexShader
            , f = i.fragmentShader
            , m = (h = "SHADOWMAP_TYPE_BASIC",
            1 === i.shadowMapType ? h = "SHADOWMAP_TYPE_PCF" : 2 === i.shadowMapType ? h = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === i.shadowMapType && (h = "SHADOWMAP_TYPE_VSM"),
            h)
            , g = function(e) {
            let t = "ENVMAP_TYPE_CUBE";
            if (e.envMap)
                switch (e.envMapMode) {
                    case 301:
                    case 302:
                        t = "ENVMAP_TYPE_CUBE";
                        break;
                    case 306:
                        t = "ENVMAP_TYPE_CUBE_UV"
                }
            return t
        }(i)
            , v = (c = "ENVMAP_MODE_REFLECTION",
        i.envMap && 302 === i.envMapMode && (c = "ENVMAP_MODE_REFRACTION"),
            c)
            , _ = function(e) {
            let t = "ENVMAP_BLENDING_NONE";
            if (e.envMap)
                switch (e.combine) {
                    case 0:
                        t = "ENVMAP_BLENDING_MULTIPLY";
                        break;
                    case 1:
                        t = "ENVMAP_BLENDING_MIX";
                        break;
                    case 2:
                        t = "ENVMAP_BLENDING_ADD"
                }
            return t
        }(i)
            , x = function(e) {
            let t = e.envMapCubeUVHeight;
            if (null === t)
                return null;
            let i = Math.log2(t) - 2;
            return {
                texelWidth: 1 / (3 * Math.max(Math.pow(2, i), 112)),
                texelHeight: 1 / t,
                maxMip: i
            }
        }(i)
            , y = i.isWebGL2 ? "" : function(e) {
            let t = [e.extensionDerivatives || e.envMapCubeUVHeight || e.bumpMap || e.tangentSpaceNormalMap || e.clearcoatNormalMap || e.flatShading || "physical" === e.shaderID ? "#extension GL_OES_standard_derivatives : enable" : "", (e.extensionFragDepth || e.logarithmicDepthBuffer) && e.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", e.extensionDrawBuffers && e.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (e.extensionShaderTextureLOD || e.envMap || e.transmission) && e.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""];
            return t.filter(nf).join("\n")
        }(i)
            , M = function(e) {
            let t = [];
            for (let i in e) {
                let r = e[i];
                !1 !== r && t.push("#define " + i + " " + r)
            }
            return t.join("\n")
        }(u)
            , b = d.createProgram()
            , S = i.glslVersion ? "#version " + i.glslVersion + "\n" : "";
        i.isRawShaderMaterial ? ((a = [M].filter(nf).join("\n")).length > 0 && (a += "\n"),
        (n = [y, M].filter(nf).join("\n")).length > 0 && (n += "\n")) : (a = [nT(i), "#define SHADER_NAME " + i.shaderName, M, i.instancing ? "#define USE_INSTANCING" : "", i.instancingColor ? "#define USE_INSTANCING_COLOR" : "", i.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + v : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMap && i.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", i.normalMap && i.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i.displacementMap && i.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", i.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.transmission ? "#define USE_TRANSMISSION" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.thicknessMap ? "#define USE_THICKNESSMAP" : "", i.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", i.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", i.vertexTangents ? "#define USE_TANGENT" : "", i.vertexColors ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUvs ? "#define USE_UV" : "", i.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.skinning ? "#define USE_SKINNING" : "", i.morphTargets ? "#define USE_MORPHTARGETS" : "", i.morphNormals && !1 === i.flatShading ? "#define USE_MORPHNORMALS" : "", i.morphColors && i.isWebGL2 ? "#define USE_MORPHCOLORS" : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + i.morphTextureStride : "", i.morphTargetsCount > 0 && i.isWebGL2 ? "#define MORPHTARGETS_COUNT " + i.morphTargetsCount : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + m : "", i.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "	attribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "	attribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_TANGENT", "	attribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "	attribute vec4 color;", "#elif defined( USE_COLOR )", "	attribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "	attribute vec3 morphTarget0;", "	attribute vec3 morphTarget1;", "	attribute vec3 morphTarget2;", "	attribute vec3 morphTarget3;", "	#ifdef USE_MORPHNORMALS", "		attribute vec3 morphNormal0;", "		attribute vec3 morphNormal1;", "		attribute vec3 morphNormal2;", "		attribute vec3 morphNormal3;", "	#else", "		attribute vec3 morphTarget4;", "		attribute vec3 morphTarget5;", "		attribute vec3 morphTarget6;", "		attribute vec3 morphTarget7;", "	#endif", "#endif", "#ifdef USE_SKINNING", "	attribute vec4 skinIndex;", "	attribute vec4 skinWeight;", "#endif", "\n"].filter(nf).join("\n"),
            n = [y, nT(i), "#define SHADER_NAME " + i.shaderName, M, i.useFog && i.fog ? "#define USE_FOG" : "", i.useFog && i.fogExp2 ? "#define FOG_EXP2" : "", i.map ? "#define USE_MAP" : "", i.matcap ? "#define USE_MATCAP" : "", i.envMap ? "#define USE_ENVMAP" : "", i.envMap ? "#define " + g : "", i.envMap ? "#define " + v : "", i.envMap ? "#define " + _ : "", x ? "#define CUBEUV_TEXEL_WIDTH " + x.texelWidth : "", x ? "#define CUBEUV_TEXEL_HEIGHT " + x.texelHeight : "", x ? "#define CUBEUV_MAX_MIP " + x.maxMip + ".0" : "", i.lightMap ? "#define USE_LIGHTMAP" : "", i.aoMap ? "#define USE_AOMAP" : "", i.emissiveMap ? "#define USE_EMISSIVEMAP" : "", i.bumpMap ? "#define USE_BUMPMAP" : "", i.normalMap ? "#define USE_NORMALMAP" : "", i.normalMap && i.objectSpaceNormalMap ? "#define OBJECTSPACE_NORMALMAP" : "", i.normalMap && i.tangentSpaceNormalMap ? "#define TANGENTSPACE_NORMALMAP" : "", i.clearcoat ? "#define USE_CLEARCOAT" : "", i.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", i.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", i.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", i.iridescence ? "#define USE_IRIDESCENCE" : "", i.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", i.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", i.specularMap ? "#define USE_SPECULARMAP" : "", i.specularIntensityMap ? "#define USE_SPECULARINTENSITYMAP" : "", i.specularColorMap ? "#define USE_SPECULARCOLORMAP" : "", i.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", i.metalnessMap ? "#define USE_METALNESSMAP" : "", i.alphaMap ? "#define USE_ALPHAMAP" : "", i.alphaTest ? "#define USE_ALPHATEST" : "", i.sheen ? "#define USE_SHEEN" : "", i.sheenColorMap ? "#define USE_SHEENCOLORMAP" : "", i.sheenRoughnessMap ? "#define USE_SHEENROUGHNESSMAP" : "", i.transmission ? "#define USE_TRANSMISSION" : "", i.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", i.thicknessMap ? "#define USE_THICKNESSMAP" : "", i.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", i.vertexTangents ? "#define USE_TANGENT" : "", i.vertexColors || i.instancingColor ? "#define USE_COLOR" : "", i.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", i.vertexUvs ? "#define USE_UV" : "", i.uvsVertexOnly ? "#define UVS_VERTEX_ONLY" : "", i.gradientMap ? "#define USE_GRADIENTMAP" : "", i.flatShading ? "#define FLAT_SHADED" : "", i.doubleSided ? "#define DOUBLE_SIDED" : "", i.flipSided ? "#define FLIP_SIDED" : "", i.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", i.shadowMapEnabled ? "#define " + m : "", i.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", i.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", i.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", i.logarithmicDepthBuffer && i.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== i.toneMapping ? "#define TONE_MAPPING" : "", 0 !== i.toneMapping ? rZ.tonemapping_pars_fragment : "", 0 !== i.toneMapping ? function(e, t) {
                let i;
                switch (t) {
                    case 1:
                        i = "Linear";
                        break;
                    case 2:
                        i = "Reinhard";
                        break;
                    case 3:
                        i = "OptimizedCineon";
                        break;
                    case 4:
                        i = "ACESFilmic";
                        break;
                    case 5:
                        i = "Custom";
                        break;
                    default:
                        console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t),
                            i = "Linear"
                }
                return "vec3 " + e + "( vec3 color ) { return " + i + "ToneMapping( color ); }"
            }("toneMapping", i.toneMapping) : "", i.dithering ? "#define DITHERING" : "", i.opaque ? "#define OPAQUE" : "", rZ.encodings_pars_fragment, function(e, t) {
                let i = function(e) {
                    switch (e) {
                        case 3e3:
                            return ["Linear", "( value )"];
                        case 3001:
                            return ["sRGB", "( value )"];
                        default:
                            return console.warn("THREE.WebGLProgram: Unsupported encoding:", e),
                                ["Linear", "( value )"]
                    }
                }(t);
                return "vec4 " + e + "( vec4 value ) { return LinearTo" + i[0] + i[1] + "; }"
            }("linearToOutputTexel", i.outputEncoding), i.useDepthPacking ? "#define DEPTH_PACKING " + i.depthPacking : "", "\n"].filter(nf).join("\n")),
            p = ng(p = nm(p = n_(p), i), i),
            f = ng(f = nm(f = n_(f), i), i),
            p = nb(p),
            f = nb(f),
        i.isWebGL2 && !0 !== i.isRawShaderMaterial && (S = "#version 300 es\n",
            a = "precision mediump sampler2DArray;\n#define attribute in\n#define varying out\n#define texture2D texture\n" + a,
            n = ["#define varying in", i.glslVersion === o ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", i.glslVersion === o ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + n);
        let w = S + a + p
            , T = S + n + f
            , E = nd(d, 35633, w)
            , A = nd(d, 35632, T);
        if (d.attachShader(b, E),
            d.attachShader(b, A),
            void 0 !== i.index0AttributeName ? d.bindAttribLocation(b, 0, i.index0AttributeName) : !0 === i.morphTargets && d.bindAttribLocation(b, 0, "position"),
            d.linkProgram(b),
            e.debug.checkShaderErrors) {
            let e = d.getProgramInfoLog(b).trim()
                , t = d.getShaderInfoLog(E).trim()
                , i = d.getShaderInfoLog(A).trim()
                , r = !0
                , s = !0;
            if (!1 === d.getProgramParameter(b, 35714)) {
                r = !1;
                let t = np(d, E, "vertex")
                    , i = np(d, A, "fragment");
                console.error("THREE.WebGLProgram: Shader Error " + d.getError() + " - VALIDATE_STATUS " + d.getProgramParameter(b, 35715) + "\n\nProgram Info Log: " + e + "\n" + t + "\n" + i)
            } else
                "" !== e ? console.warn("THREE.WebGLProgram: Program Info Log:", e) : ("" === t || "" === i) && (s = !1);
            s && (this.diagnostics = {
                runnable: r,
                programLog: e,
                vertexShader: {
                    log: t,
                    prefix: a
                },
                fragmentShader: {
                    log: i,
                    prefix: n
                }
            })
        }
        return d.deleteShader(E),
            d.deleteShader(A),
            this.getUniforms = function() {
                return void 0 === s && (s = new nc(d,b)),
                    s
            }
            ,
            this.getAttributes = function() {
                return void 0 === l && (l = function(e, t) {
                    let i = {}
                        , r = e.getProgramParameter(t, 35721);
                    for (let a = 0; a < r; a++) {
                        let r = e.getActiveAttrib(t, a)
                            , n = r.name
                            , s = 1;
                        35674 === r.type && (s = 2),
                        35675 === r.type && (s = 3),
                        35676 === r.type && (s = 4),
                            i[n] = {
                                type: r.type,
                                location: e.getAttribLocation(t, n),
                                locationSize: s
                            }
                    }
                    return i
                }(d, b)),
                    l
            }
            ,
            this.destroy = function() {
                r.releaseStatesOfProgram(this),
                    d.deleteProgram(b),
                    this.program = void 0
            }
            ,
            this.name = i.shaderName,
            this.id = nu++,
            this.cacheKey = t,
            this.usedTimes = 1,
            this.program = b,
            this.vertexShader = E,
            this.fragmentShader = A,
            this
    }
    let nA = 0;
    class nC {
        constructor() {
            this.shaderCache = new Map,
                this.materialCache = new Map
        }
        update(e) {
            let t = e.vertexShader
                , i = e.fragmentShader
                , r = this._getShaderStage(t)
                , a = this._getShaderStage(i)
                , n = this._getShaderCacheForMaterial(e);
            return !1 === n.has(r) && (n.add(r),
                r.usedTimes++),
            !1 === n.has(a) && (n.add(a),
                a.usedTimes++),
                this
        }
        remove(e) {
            let t = this.materialCache.get(e);
            for (let e of t)
                e.usedTimes--,
                0 === e.usedTimes && this.shaderCache.delete(e.code);
            return this.materialCache.delete(e),
                this
        }
        getVertexShaderID(e) {
            return this._getShaderStage(e.vertexShader).id
        }
        getFragmentShaderID(e) {
            return this._getShaderStage(e.fragmentShader).id
        }
        dispose() {
            this.shaderCache.clear(),
                this.materialCache.clear()
        }
        _getShaderCacheForMaterial(e) {
            let t = this.materialCache;
            return !1 === t.has(e) && t.set(e, new Set),
                t.get(e)
        }
        _getShaderStage(e) {
            let t = this.shaderCache;
            if (!1 === t.has(e)) {
                let i = new nL(e);
                t.set(e, i)
            }
            return t.get(e)
        }
    }
    class nL {
        constructor(e) {
            this.id = nA++,
                this.code = e,
                this.usedTimes = 0
        }
    }
    function nP(e, t, i, r, a, n, s) {
        let o = new eA
            , l = new nC
            , h = []
            , c = a.isWebGL2
            , d = a.logarithmicDepthBuffer
            , u = a.vertexTextures
            , p = a.precision
            , f = {
            MeshDepthMaterial: "depth",
            MeshDistanceMaterial: "distanceRGBA",
            MeshNormalMaterial: "normal",
            MeshBasicMaterial: "basic",
            MeshLambertMaterial: "lambert",
            MeshPhongMaterial: "phong",
            MeshToonMaterial: "toon",
            MeshStandardMaterial: "physical",
            MeshPhysicalMaterial: "physical",
            MeshMatcapMaterial: "matcap",
            LineBasicMaterial: "basic",
            LineDashedMaterial: "dashed",
            PointsMaterial: "points",
            ShadowMaterial: "shadow",
            SpriteMaterial: "sprite"
        };
        return {
            getParameters: function(n, o, h, m, g) {
                let v, _, x, y;
                let M = m.fog
                    , b = g.geometry
                    , S = n.isMeshStandardMaterial ? m.environment : null
                    , w = (n.isMeshStandardMaterial ? i : t).get(n.envMap || S)
                    , T = w && 306 === w.mapping ? w.image.height : null
                    , E = f[n.type];
                null !== n.precision && (p = a.getMaxPrecision(n.precision)) !== n.precision && console.warn("THREE.WebGLProgram.getParameters:", n.precision, "not supported, using", p, "instead.");
                let A = b.morphAttributes.position || b.morphAttributes.normal || b.morphAttributes.color
                    , C = void 0 !== A ? A.length : 0
                    , L = 0;
                if (void 0 !== b.morphAttributes.position && (L = 1),
                void 0 !== b.morphAttributes.normal && (L = 2),
                void 0 !== b.morphAttributes.color && (L = 3),
                    E) {
                    let e = rK[E];
                    v = e.vertexShader,
                        _ = e.fragmentShader
                } else
                    v = n.vertexShader,
                        _ = n.fragmentShader,
                        l.update(n),
                        x = l.getVertexShaderID(n),
                        y = l.getFragmentShaderID(n);
                let P = e.getRenderTarget()
                    , R = n.alphaTest > 0
                    , D = n.clearcoat > 0
                    , I = n.iridescence > 0
                    , N = {
                    isWebGL2: c,
                    shaderID: E,
                    shaderName: n.type,
                    vertexShader: v,
                    fragmentShader: _,
                    defines: n.defines,
                    customVertexShaderID: x,
                    customFragmentShaderID: y,
                    isRawShaderMaterial: !0 === n.isRawShaderMaterial,
                    glslVersion: n.glslVersion,
                    precision: p,
                    instancing: !0 === g.isInstancedMesh,
                    instancingColor: !0 === g.isInstancedMesh && null !== g.instanceColor,
                    supportsVertexTextures: u,
                    outputEncoding: null === P ? e.outputEncoding : !0 === P.isXRRenderTarget ? P.texture.encoding : 3e3,
                    map: !!n.map,
                    matcap: !!n.matcap,
                    envMap: !!w,
                    envMapMode: w && w.mapping,
                    envMapCubeUVHeight: T,
                    lightMap: !!n.lightMap,
                    aoMap: !!n.aoMap,
                    emissiveMap: !!n.emissiveMap,
                    bumpMap: !!n.bumpMap,
                    normalMap: !!n.normalMap,
                    objectSpaceNormalMap: 1 === n.normalMapType,
                    tangentSpaceNormalMap: 0 === n.normalMapType,
                    decodeVideoTexture: !!n.map && !0 === n.map.isVideoTexture && 3001 === n.map.encoding,
                    clearcoat: D,
                    clearcoatMap: D && !!n.clearcoatMap,
                    clearcoatRoughnessMap: D && !!n.clearcoatRoughnessMap,
                    clearcoatNormalMap: D && !!n.clearcoatNormalMap,
                    iridescence: I,
                    iridescenceMap: I && !!n.iridescenceMap,
                    iridescenceThicknessMap: I && !!n.iridescenceThicknessMap,
                    displacementMap: !!n.displacementMap,
                    roughnessMap: !!n.roughnessMap,
                    metalnessMap: !!n.metalnessMap,
                    specularMap: !!n.specularMap,
                    specularIntensityMap: !!n.specularIntensityMap,
                    specularColorMap: !!n.specularColorMap,
                    opaque: !1 === n.transparent && 1 === n.blending,
                    alphaMap: !!n.alphaMap,
                    alphaTest: R,
                    gradientMap: !!n.gradientMap,
                    sheen: n.sheen > 0,
                    sheenColorMap: !!n.sheenColorMap,
                    sheenRoughnessMap: !!n.sheenRoughnessMap,
                    transmission: n.transmission > 0,
                    transmissionMap: !!n.transmissionMap,
                    thicknessMap: !!n.thicknessMap,
                    combine: n.combine,
                    vertexTangents: !!n.normalMap && !!b.attributes.tangent,
                    vertexColors: n.vertexColors,
                    vertexAlphas: !0 === n.vertexColors && !!b.attributes.color && 4 === b.attributes.color.itemSize,
                    vertexUvs: !!n.map || !!n.bumpMap || !!n.normalMap || !!n.specularMap || !!n.alphaMap || !!n.emissiveMap || !!n.roughnessMap || !!n.metalnessMap || !!n.clearcoatMap || !!n.clearcoatRoughnessMap || !!n.clearcoatNormalMap || !!n.iridescenceMap || !!n.iridescenceThicknessMap || !!n.displacementMap || !!n.transmissionMap || !!n.thicknessMap || !!n.specularIntensityMap || !!n.specularColorMap || !!n.sheenColorMap || !!n.sheenRoughnessMap,
                    uvsVertexOnly: !(n.map || n.bumpMap || n.normalMap || n.specularMap || n.alphaMap || n.emissiveMap || n.roughnessMap || n.metalnessMap || n.clearcoatNormalMap || n.iridescenceMap || n.iridescenceThicknessMap || n.transmission > 0 || n.transmissionMap || n.thicknessMap || n.specularIntensityMap || n.specularColorMap || n.sheen > 0 || n.sheenColorMap || n.sheenRoughnessMap) && !!n.displacementMap,
                    fog: !!M,
                    useFog: !0 === n.fog,
                    fogExp2: M && M.isFogExp2,
                    flatShading: !!n.flatShading,
                    sizeAttenuation: n.sizeAttenuation,
                    logarithmicDepthBuffer: d,
                    skinning: !0 === g.isSkinnedMesh,
                    morphTargets: void 0 !== b.morphAttributes.position,
                    morphNormals: void 0 !== b.morphAttributes.normal,
                    morphColors: void 0 !== b.morphAttributes.color,
                    morphTargetsCount: C,
                    morphTextureStride: L,
                    numDirLights: o.directional.length,
                    numPointLights: o.point.length,
                    numSpotLights: o.spot.length,
                    numRectAreaLights: o.rectArea.length,
                    numHemiLights: o.hemi.length,
                    numDirLightShadows: o.directionalShadowMap.length,
                    numPointLightShadows: o.pointShadowMap.length,
                    numSpotLightShadows: o.spotShadowMap.length,
                    numClippingPlanes: s.numPlanes,
                    numClipIntersection: s.numIntersection,
                    dithering: n.dithering,
                    shadowMapEnabled: e.shadowMap.enabled && h.length > 0,
                    shadowMapType: e.shadowMap.type,
                    toneMapping: n.toneMapped ? e.toneMapping : 0,
                    physicallyCorrectLights: e.physicallyCorrectLights,
                    premultipliedAlpha: n.premultipliedAlpha,
                    doubleSided: 2 === n.side,
                    flipSided: 1 === n.side,
                    useDepthPacking: !!n.depthPacking,
                    depthPacking: n.depthPacking || 0,
                    index0AttributeName: n.index0AttributeName,
                    extensionDerivatives: n.extensions && n.extensions.derivatives,
                    extensionFragDepth: n.extensions && n.extensions.fragDepth,
                    extensionDrawBuffers: n.extensions && n.extensions.drawBuffers,
                    extensionShaderTextureLOD: n.extensions && n.extensions.shaderTextureLOD,
                    rendererExtensionFragDepth: c || r.has("EXT_frag_depth"),
                    rendererExtensionDrawBuffers: c || r.has("WEBGL_draw_buffers"),
                    rendererExtensionShaderTextureLod: c || r.has("EXT_shader_texture_lod"),
                    customProgramCacheKey: n.customProgramCacheKey()
                };
                return N
            },
            getProgramCacheKey: function(t) {
                let i = [];
                if (t.shaderID ? i.push(t.shaderID) : (i.push(t.customVertexShaderID),
                    i.push(t.customFragmentShaderID)),
                void 0 !== t.defines)
                    for (let e in t.defines)
                        i.push(e),
                            i.push(t.defines[e]);
                return !1 === t.isRawShaderMaterial && (i.push(t.precision),
                    i.push(t.outputEncoding),
                    i.push(t.envMapMode),
                    i.push(t.envMapCubeUVHeight),
                    i.push(t.combine),
                    i.push(t.vertexUvs),
                    i.push(t.fogExp2),
                    i.push(t.sizeAttenuation),
                    i.push(t.morphTargetsCount),
                    i.push(t.morphAttributeCount),
                    i.push(t.numDirLights),
                    i.push(t.numPointLights),
                    i.push(t.numSpotLights),
                    i.push(t.numHemiLights),
                    i.push(t.numRectAreaLights),
                    i.push(t.numDirLightShadows),
                    i.push(t.numPointLightShadows),
                    i.push(t.numSpotLightShadows),
                    i.push(t.shadowMapType),
                    i.push(t.toneMapping),
                    i.push(t.numClippingPlanes),
                    i.push(t.numClipIntersection),
                    i.push(t.depthPacking),
                    o.disableAll(),
                t.isWebGL2 && o.enable(0),
                t.supportsVertexTextures && o.enable(1),
                t.instancing && o.enable(2),
                t.instancingColor && o.enable(3),
                t.map && o.enable(4),
                t.matcap && o.enable(5),
                t.envMap && o.enable(6),
                t.lightMap && o.enable(7),
                t.aoMap && o.enable(8),
                t.emissiveMap && o.enable(9),
                t.bumpMap && o.enable(10),
                t.normalMap && o.enable(11),
                t.objectSpaceNormalMap && o.enable(12),
                t.tangentSpaceNormalMap && o.enable(13),
                t.clearcoat && o.enable(14),
                t.clearcoatMap && o.enable(15),
                t.clearcoatRoughnessMap && o.enable(16),
                t.clearcoatNormalMap && o.enable(17),
                t.iridescence && o.enable(18),
                t.iridescenceMap && o.enable(19),
                t.iridescenceThicknessMap && o.enable(20),
                t.displacementMap && o.enable(21),
                t.specularMap && o.enable(22),
                t.roughnessMap && o.enable(23),
                t.metalnessMap && o.enable(24),
                t.gradientMap && o.enable(25),
                t.alphaMap && o.enable(26),
                t.alphaTest && o.enable(27),
                t.vertexColors && o.enable(28),
                t.vertexAlphas && o.enable(29),
                t.vertexUvs && o.enable(30),
                t.vertexTangents && o.enable(31),
                t.uvsVertexOnly && o.enable(32),
                t.fog && o.enable(33),
                    i.push(o.mask),
                    o.disableAll(),
                t.useFog && o.enable(0),
                t.flatShading && o.enable(1),
                t.logarithmicDepthBuffer && o.enable(2),
                t.skinning && o.enable(3),
                t.morphTargets && o.enable(4),
                t.morphNormals && o.enable(5),
                t.morphColors && o.enable(6),
                t.premultipliedAlpha && o.enable(7),
                t.shadowMapEnabled && o.enable(8),
                t.physicallyCorrectLights && o.enable(9),
                t.doubleSided && o.enable(10),
                t.flipSided && o.enable(11),
                t.useDepthPacking && o.enable(12),
                t.dithering && o.enable(13),
                t.specularIntensityMap && o.enable(14),
                t.specularColorMap && o.enable(15),
                t.transmission && o.enable(16),
                t.transmissionMap && o.enable(17),
                t.thicknessMap && o.enable(18),
                t.sheen && o.enable(19),
                t.sheenColorMap && o.enable(20),
                t.sheenRoughnessMap && o.enable(21),
                t.decodeVideoTexture && o.enable(22),
                t.opaque && o.enable(23),
                    i.push(o.mask),
                    i.push(e.outputEncoding)),
                    i.push(t.customProgramCacheKey),
                    i.join()
            },
            getUniforms: function(e) {
                let t;
                let i = f[e.type];
                if (i) {
                    let e = rK[i];
                    t = tC.clone(e.uniforms)
                } else
                    t = e.uniforms;
                return t
            },
            acquireProgram: function(t, i) {
                let r;
                for (let e = 0, t = h.length; e < t; e++) {
                    let t = h[e];
                    if (t.cacheKey === i) {
                        r = t,
                            ++r.usedTimes;
                        break
                    }
                }
                return void 0 === r && (r = new nE(e,i,t,n),
                    h.push(r)),
                    r
            },
            releaseProgram: function(e) {
                if (0 == --e.usedTimes) {
                    let t = h.indexOf(e);
                    h[t] = h[h.length - 1],
                        h.pop(),
                        e.destroy()
                }
            },
            releaseShaderCache: function(e) {
                l.remove(e)
            },
            programs: h,
            dispose: function() {
                l.dispose()
            }
        }
    }
    function nR() {
        let e = new WeakMap;
        return {
            get: function(t) {
                let i = e.get(t);
                return void 0 === i && (i = {},
                    e.set(t, i)),
                    i
            },
            remove: function(t) {
                e.delete(t)
            },
            update: function(t, i, r) {
                e.get(t)[i] = r
            },
            dispose: function() {
                e = new WeakMap
            }
        }
    }
    function nD(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.z !== t.z ? e.z - t.z : e.id - t.id
    }
    function nI(e, t) {
        return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id
    }
    function nN() {
        let e = []
            , t = 0
            , i = []
            , r = []
            , a = [];
        function n(i, r, a, n, s, o) {
            let l = e[t];
            return void 0 === l ? (l = {
                id: i.id,
                object: i,
                geometry: r,
                material: a,
                groupOrder: n,
                renderOrder: i.renderOrder,
                z: s,
                group: o
            },
                e[t] = l) : (l.id = i.id,
                l.object = i,
                l.geometry = r,
                l.material = a,
                l.groupOrder = n,
                l.renderOrder = i.renderOrder,
                l.z = s,
                l.group = o),
                t++,
                l
        }
        return {
            opaque: i,
            transmissive: r,
            transparent: a,
            init: function() {
                t = 0,
                    i.length = 0,
                    r.length = 0,
                    a.length = 0
            },
            push: function(e, t, s, o, l, h) {
                let c = n(e, t, s, o, l, h);
                s.transmission > 0 ? r.push(c) : !0 === s.transparent ? a.push(c) : i.push(c)
            },
            unshift: function(e, t, s, o, l, h) {
                let c = n(e, t, s, o, l, h);
                s.transmission > 0 ? r.unshift(c) : !0 === s.transparent ? a.unshift(c) : i.unshift(c)
            },
            finish: function() {
                for (let i = t, r = e.length; i < r; i++) {
                    let t = e[i];
                    if (null === t.id)
                        break;
                    t.id = null,
                        t.object = null,
                        t.geometry = null,
                        t.material = null,
                        t.group = null
                }
            },
            sort: function(e, t) {
                i.length > 1 && i.sort(e || nD),
                r.length > 1 && r.sort(t || nI),
                a.length > 1 && a.sort(t || nI)
            }
        }
    }
    function nO() {
        let e = new WeakMap;
        return {
            get: function(t, i) {
                let r;
                return !1 === e.has(t) ? (r = new nN,
                    e.set(t, [r])) : i >= e.get(t).length ? (r = new nN,
                    e.get(t).push(r)) : r = e.get(t)[i],
                    r
            },
            dispose: function() {
                e = new WeakMap
            }
        }
    }
    function nz() {
        let e = {};
        return {
            get: function(t) {
                let i;
                if (void 0 !== e[t.id])
                    return e[t.id];
                switch (t.type) {
                    case "DirectionalLight":
                        i = {
                            direction: new B,
                            color: new P
                        };
                        break;
                    case "SpotLight":
                        i = {
                            position: new B,
                            direction: new B,
                            color: new P,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0
                        };
                        break;
                    case "PointLight":
                        i = {
                            position: new B,
                            color: new P,
                            distance: 0,
                            decay: 0
                        };
                        break;
                    case "HemisphereLight":
                        i = {
                            direction: new B,
                            skyColor: new P,
                            groundColor: new P
                        };
                        break;
                    case "RectAreaLight":
                        i = {
                            color: new P,
                            position: new B,
                            halfWidth: new B,
                            halfHeight: new B
                        }
                }
                return e[t.id] = i,
                    i
            }
        }
    }
    let nU = 0;
    function nF(e, t) {
        return (t.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0)
    }
    function nk(e, t) {
        let i = new nz
            , r = function() {
            let e = {};
            return {
                get: function(t) {
                    let i;
                    if (void 0 !== e[t.id])
                        return e[t.id];
                    switch (t.type) {
                        case "DirectionalLight":
                        case "SpotLight":
                            i = {
                                shadowBias: 0,
                                shadowNormalBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new g
                            };
                            break;
                        case "PointLight":
                            i = {
                                shadowBias: 0,
                                shadowNormalBias: 0,
                                shadowRadius: 1,
                                shadowMapSize: new g,
                                shadowCameraNear: 1,
                                shadowCameraFar: 1e3
                            }
                    }
                    return e[t.id] = i,
                        i
                }
            }
        }()
            , a = {
            version: 0,
            hash: {
                directionalLength: -1,
                pointLength: -1,
                spotLength: -1,
                rectAreaLength: -1,
                hemiLength: -1,
                numDirectionalShadows: -1,
                numPointShadows: -1,
                numSpotShadows: -1
            },
            ambient: [0, 0, 0],
            probe: [],
            directional: [],
            directionalShadow: [],
            directionalShadowMap: [],
            directionalShadowMatrix: [],
            spot: [],
            spotShadow: [],
            spotShadowMap: [],
            spotShadowMatrix: [],
            rectArea: [],
            rectAreaLTC1: null,
            rectAreaLTC2: null,
            point: [],
            pointShadow: [],
            pointShadowMap: [],
            pointShadowMatrix: [],
            hemi: []
        };
        for (let e = 0; e < 9; e++)
            a.probe.push(new B);
        let n = new B
            , s = new eg
            , o = new eg;
        return {
            setup: function(n, s) {
                let o = 0
                    , l = 0
                    , h = 0;
                for (let e = 0; e < 9; e++)
                    a.probe[e].set(0, 0, 0);
                let c = 0
                    , d = 0
                    , u = 0
                    , p = 0
                    , f = 0
                    , m = 0
                    , g = 0
                    , v = 0;
                n.sort(nF);
                let _ = !0 !== s ? Math.PI : 1;
                for (let e = 0, t = n.length; e < t; e++) {
                    let t = n[e]
                        , s = t.color
                        , x = t.intensity
                        , y = t.distance
                        , M = t.shadow && t.shadow.map ? t.shadow.map.texture : null;
                    if (t.isAmbientLight)
                        o += s.r * x * _,
                            l += s.g * x * _,
                            h += s.b * x * _;
                    else if (t.isLightProbe)
                        for (let e = 0; e < 9; e++)
                            a.probe[e].addScaledVector(t.sh.coefficients[e], x);
                    else if (t.isDirectionalLight) {
                        let e = i.get(t);
                        if (e.color.copy(t.color).multiplyScalar(t.intensity * _),
                            t.castShadow) {
                            let e = t.shadow
                                , i = r.get(t);
                            i.shadowBias = e.bias,
                                i.shadowNormalBias = e.normalBias,
                                i.shadowRadius = e.radius,
                                i.shadowMapSize = e.mapSize,
                                a.directionalShadow[c] = i,
                                a.directionalShadowMap[c] = M,
                                a.directionalShadowMatrix[c] = t.shadow.matrix,
                                m++
                        }
                        a.directional[c] = e,
                            c++
                    } else if (t.isSpotLight) {
                        let e = i.get(t);
                        if (e.position.setFromMatrixPosition(t.matrixWorld),
                            e.color.copy(s).multiplyScalar(x * _),
                            e.distance = y,
                            e.coneCos = Math.cos(t.angle),
                            e.penumbraCos = Math.cos(t.angle * (1 - t.penumbra)),
                            e.decay = t.decay,
                            t.castShadow) {
                            let e = t.shadow
                                , i = r.get(t);
                            i.shadowBias = e.bias,
                                i.shadowNormalBias = e.normalBias,
                                i.shadowRadius = e.radius,
                                i.shadowMapSize = e.mapSize,
                                a.spotShadow[u] = i,
                                a.spotShadowMap[u] = M,
                                a.spotShadowMatrix[u] = t.shadow.matrix,
                                v++
                        }
                        a.spot[u] = e,
                            u++
                    } else if (t.isRectAreaLight) {
                        let e = i.get(t);
                        e.color.copy(s).multiplyScalar(x),
                            e.halfWidth.set(.5 * t.width, 0, 0),
                            e.halfHeight.set(0, .5 * t.height, 0),
                            a.rectArea[p] = e,
                            p++
                    } else if (t.isPointLight) {
                        let e = i.get(t);
                        if (e.color.copy(t.color).multiplyScalar(t.intensity * _),
                            e.distance = t.distance,
                            e.decay = t.decay,
                            t.castShadow) {
                            let e = t.shadow
                                , i = r.get(t);
                            i.shadowBias = e.bias,
                                i.shadowNormalBias = e.normalBias,
                                i.shadowRadius = e.radius,
                                i.shadowMapSize = e.mapSize,
                                i.shadowCameraNear = e.camera.near,
                                i.shadowCameraFar = e.camera.far,
                                a.pointShadow[d] = i,
                                a.pointShadowMap[d] = M,
                                a.pointShadowMatrix[d] = t.shadow.matrix,
                                g++
                        }
                        a.point[d] = e,
                            d++
                    } else if (t.isHemisphereLight) {
                        let e = i.get(t);
                        e.skyColor.copy(t.color).multiplyScalar(x * _),
                            e.groundColor.copy(t.groundColor).multiplyScalar(x * _),
                            a.hemi[f] = e,
                            f++
                    }
                }
                p > 0 && (t.isWebGL2 ? (a.rectAreaLTC1 = rJ.LTC_FLOAT_1,
                    a.rectAreaLTC2 = rJ.LTC_FLOAT_2) : !0 === e.has("OES_texture_float_linear") ? (a.rectAreaLTC1 = rJ.LTC_FLOAT_1,
                    a.rectAreaLTC2 = rJ.LTC_FLOAT_2) : !0 === e.has("OES_texture_half_float_linear") ? (a.rectAreaLTC1 = rJ.LTC_HALF_1,
                    a.rectAreaLTC2 = rJ.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),
                    a.ambient[0] = o,
                    a.ambient[1] = l,
                    a.ambient[2] = h;
                let x = a.hash;
                (x.directionalLength !== c || x.pointLength !== d || x.spotLength !== u || x.rectAreaLength !== p || x.hemiLength !== f || x.numDirectionalShadows !== m || x.numPointShadows !== g || x.numSpotShadows !== v) && (a.directional.length = c,
                    a.spot.length = u,
                    a.rectArea.length = p,
                    a.point.length = d,
                    a.hemi.length = f,
                    a.directionalShadow.length = m,
                    a.directionalShadowMap.length = m,
                    a.pointShadow.length = g,
                    a.pointShadowMap.length = g,
                    a.spotShadow.length = v,
                    a.spotShadowMap.length = v,
                    a.directionalShadowMatrix.length = m,
                    a.pointShadowMatrix.length = g,
                    a.spotShadowMatrix.length = v,
                    x.directionalLength = c,
                    x.pointLength = d,
                    x.spotLength = u,
                    x.rectAreaLength = p,
                    x.hemiLength = f,
                    x.numDirectionalShadows = m,
                    x.numPointShadows = g,
                    x.numSpotShadows = v,
                    a.version = nU++)
            },
            setupView: function(e, t) {
                let i = 0
                    , r = 0
                    , l = 0
                    , h = 0
                    , c = 0
                    , d = t.matrixWorldInverse;
                for (let t = 0, u = e.length; t < u; t++) {
                    let u = e[t];
                    if (u.isDirectionalLight) {
                        let e = a.directional[i];
                        e.direction.setFromMatrixPosition(u.matrixWorld),
                            n.setFromMatrixPosition(u.target.matrixWorld),
                            e.direction.sub(n),
                            e.direction.transformDirection(d),
                            i++
                    } else if (u.isSpotLight) {
                        let e = a.spot[l];
                        e.position.setFromMatrixPosition(u.matrixWorld),
                            e.position.applyMatrix4(d),
                            e.direction.setFromMatrixPosition(u.matrixWorld),
                            n.setFromMatrixPosition(u.target.matrixWorld),
                            e.direction.sub(n),
                            e.direction.transformDirection(d),
                            l++
                    } else if (u.isRectAreaLight) {
                        let e = a.rectArea[h];
                        e.position.setFromMatrixPosition(u.matrixWorld),
                            e.position.applyMatrix4(d),
                            o.identity(),
                            s.copy(u.matrixWorld),
                            s.premultiply(d),
                            o.extractRotation(s),
                            e.halfWidth.set(.5 * u.width, 0, 0),
                            e.halfHeight.set(0, .5 * u.height, 0),
                            e.halfWidth.applyMatrix4(o),
                            e.halfHeight.applyMatrix4(o),
                            h++
                    } else if (u.isPointLight) {
                        let e = a.point[r];
                        e.position.setFromMatrixPosition(u.matrixWorld),
                            e.position.applyMatrix4(d),
                            r++
                    } else if (u.isHemisphereLight) {
                        let e = a.hemi[c];
                        e.direction.setFromMatrixPosition(u.matrixWorld),
                            e.direction.transformDirection(d),
                            c++
                    }
                }
            },
            state: a
        }
    }
    function nB(e, t) {
        let i = new nk(e,t)
            , r = []
            , a = [];
        return {
            init: function() {
                r.length = 0,
                    a.length = 0
            },
            state: {
                lightsArray: r,
                shadowsArray: a,
                lights: i
            },
            setupLights: function(e) {
                i.setup(r, e)
            },
            setupLightsView: function(e) {
                i.setupView(r, e)
            },
            pushLight: function(e) {
                r.push(e)
            },
            pushShadow: function(e) {
                a.push(e)
            }
        }
    }
    function nH(e, t) {
        let i = new WeakMap;
        return {
            get: function(r, a=0) {
                let n;
                return !1 === i.has(r) ? (n = new nB(e,t),
                    i.set(r, [n])) : a >= i.get(r).length ? (n = new nB(e,t),
                    i.get(r).push(n)) : n = i.get(r)[a],
                    n
            },
            dispose: function() {
                i = new WeakMap
            }
        }
    }
    class nG extends e0 {
        constructor(e) {
            super(),
                this.isMeshDepthMaterial = !0,
                this.type = "MeshDepthMaterial",
                this.depthPacking = 3200,
                this.map = null,
                this.alphaMap = null,
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.setValues(e)
        }
        copy(e) {
            return super.copy(e),
                this.depthPacking = e.depthPacking,
                this.map = e.map,
                this.alphaMap = e.alphaMap,
                this.displacementMap = e.displacementMap,
                this.displacementScale = e.displacementScale,
                this.displacementBias = e.displacementBias,
                this.wireframe = e.wireframe,
                this.wireframeLinewidth = e.wireframeLinewidth,
                this
        }
    }
    class nV extends e0 {
        constructor(e) {
            super(),
                this.isMeshDistanceMaterial = !0,
                this.type = "MeshDistanceMaterial",
                this.referencePosition = new B,
                this.nearDistance = 1,
                this.farDistance = 1e3,
                this.map = null,
                this.alphaMap = null,
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.setValues(e)
        }
        copy(e) {
            return super.copy(e),
                this.referencePosition.copy(e.referencePosition),
                this.nearDistance = e.nearDistance,
                this.farDistance = e.farDistance,
                this.map = e.map,
                this.alphaMap = e.alphaMap,
                this.displacementMap = e.displacementMap,
                this.displacementScale = e.displacementScale,
                this.displacementBias = e.displacementBias,
                this
        }
    }
    let nW = `uniform sampler2D shadow_pass;uniform vec2 resolution;uniform float radius;
#include <packing>
void main(){const float samples=float(VSM_SAMPLES);float mean=0.0;float squared_mean=0.0;float uvStride=samples<=1.0?0.0:2.0/(samples-1.0);float uvStart=samples<=1.0?0.0:-1.0;for(float i=0.0;i<samples;i++){float uvOffset=uvStart+i*uvStride;
#ifdef HORIZONTAL_PASS
vec2 distribution=unpackRGBATo2Half(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(uvOffset,0.0)*radius)/resolution));mean+=distribution.x;squared_mean+=distribution.y*distribution.y+distribution.x*distribution.x;
#else
float depth=unpackRGBAToDepth(texture2D(shadow_pass,(gl_FragCoord.xy+vec2(0.0,uvOffset)*radius)/resolution));mean+=depth;squared_mean+=depth*depth;
#endif
}mean=mean/samples;squared_mean=squared_mean/samples;float std_dev=sqrt(squared_mean-mean*mean);gl_FragColor=pack2HalfToRGBA(vec2(mean,std_dev));}`;
    function nj(e, t, i) {
        let r = new tH
            , a = new g
            , n = new g
            , s = new z
            , o = new nG({
            depthPacking: 3201
        })
            , l = new nV
            , h = {}
            , c = i.maxTextureSize
            , d = {
            0: 1,
            1: 0,
            2: 2
        }
            , u = new tL({
            defines: {
                VSM_SAMPLES: 8
            },
            uniforms: {
                shadow_pass: {
                    value: null
                },
                resolution: {
                    value: new g
                },
                radius: {
                    value: 4
                }
            },
            vertexShader: "void main(){gl_Position=vec4(position,1.0);}",
            fragmentShader: nW
        })
            , p = u.clone();
        p.defines.HORIZONTAL_PASS = 1;
        let f = new tn;
        f.setAttribute("position", new e4(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]),3));
        let m = new tS(f,u)
            , v = this;
        function _(t, i, r, a, n, s) {
            let c = null
                , u = !0 === r.isPointLight ? t.customDistanceMaterial : t.customDepthMaterial;
            if (c = void 0 !== u ? u : !0 === r.isPointLight ? l : o,
            e.localClippingEnabled && !0 === i.clipShadows && Array.isArray(i.clippingPlanes) && 0 !== i.clippingPlanes.length || i.displacementMap && 0 !== i.displacementScale || i.alphaMap && i.alphaTest > 0) {
                let e = c.uuid
                    , t = i.uuid
                    , r = h[e];
                void 0 === r && (r = {},
                    h[e] = r);
                let a = r[t];
                void 0 === a && (a = c.clone(),
                    r[t] = a),
                    c = a
            }
            return c.visible = i.visible,
                c.wireframe = i.wireframe,
                3 === s ? c.side = null !== i.shadowSide ? i.shadowSide : i.side : c.side = null !== i.shadowSide ? i.shadowSide : d[i.side],
                c.alphaMap = i.alphaMap,
                c.alphaTest = i.alphaTest,
                c.clipShadows = i.clipShadows,
                c.clippingPlanes = i.clippingPlanes,
                c.clipIntersection = i.clipIntersection,
                c.displacementMap = i.displacementMap,
                c.displacementScale = i.displacementScale,
                c.displacementBias = i.displacementBias,
                c.wireframeLinewidth = i.wireframeLinewidth,
                c.linewidth = i.linewidth,
            !0 === r.isPointLight && !0 === c.isMeshDistanceMaterial && (c.referencePosition.setFromMatrixPosition(r.matrixWorld),
                c.nearDistance = a,
                c.farDistance = n),
                c
        }
        this.enabled = !1,
            this.autoUpdate = !0,
            this.needsUpdate = !1,
            this.type = 1,
            this.render = function(i, o, l) {
                if (!1 === v.enabled || !1 === v.autoUpdate && !1 === v.needsUpdate || 0 === i.length)
                    return;
                let h = e.getRenderTarget()
                    , d = e.getActiveCubeFace()
                    , f = e.getActiveMipmapLevel()
                    , g = e.state;
                g.setBlending(0),
                    g.buffers.color.setClear(1, 1, 1, 1),
                    g.buffers.depth.setTest(!0),
                    g.setScissorTest(!1);
                for (let h = 0, d = i.length; h < d; h++) {
                    let d = i[h]
                        , f = d.shadow;
                    if (void 0 === f) {
                        console.warn("THREE.WebGLShadowMap:", d, "has no shadow.");
                        continue
                    }
                    if (!1 === f.autoUpdate && !1 === f.needsUpdate)
                        continue;
                    a.copy(f.mapSize);
                    let v = f.getFrameExtents();
                    if (a.multiply(v),
                        n.copy(f.mapSize),
                    (a.x > c || a.y > c) && (a.x > c && (n.x = Math.floor(c / v.x),
                        a.x = n.x * v.x,
                        f.mapSize.x = n.x),
                    a.y > c && (n.y = Math.floor(c / v.y),
                        a.y = n.y * v.y,
                        f.mapSize.y = n.y)),
                    null === f.map) {
                        let e = 3 !== this.type ? {
                            minFilter: 1003,
                            magFilter: 1003
                        } : {};
                        f.map = new U(a.x,a.y,e),
                            f.map.texture.name = d.name + ".shadowMap",
                            f.camera.updateProjectionMatrix()
                    }
                    e.setRenderTarget(f.map),
                        e.clear();
                    let x = f.getViewportCount();
                    for (let i = 0; i < x; i++) {
                        let a = f.getViewport(i);
                        s.set(n.x * a.x, n.y * a.y, n.x * a.z, n.y * a.w),
                            g.viewport(s),
                            f.updateMatrices(d, i),
                            r = f.getFrustum(),
                            function i(a, n, s, o, l) {
                                if (!1 === a.visible)
                                    return;
                                let h = a.layers.test(n.layers);
                                if (h && (a.isMesh || a.isLine || a.isPoints) && (a.castShadow || a.receiveShadow && 3 === l) && (!a.frustumCulled || r.intersectsObject(a))) {
                                    a.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, a.matrixWorld);
                                    let i = t.update(a)
                                        , r = a.material;
                                    if (Array.isArray(r)) {
                                        let t = i.groups;
                                        for (let n = 0, h = t.length; n < h; n++) {
                                            let h = t[n]
                                                , c = r[h.materialIndex];
                                            if (c && c.visible) {
                                                let t = _(a, c, o, s.near, s.far, l);
                                                e.renderBufferDirect(s, null, i, t, a, h)
                                            }
                                        }
                                    } else if (r.visible) {
                                        let t = _(a, r, o, s.near, s.far, l);
                                        e.renderBufferDirect(s, null, i, t, a, null)
                                    }
                                }
                                let c = a.children;
                                for (let e = 0, t = c.length; e < t; e++)
                                    i(c[e], n, s, o, l)
                            }(o, l, f.camera, d, this.type)
                    }
                    !0 !== f.isPointLightShadow && 3 === this.type && function(i, r) {
                        let n = t.update(m);
                        u.defines.VSM_SAMPLES !== i.blurSamples && (u.defines.VSM_SAMPLES = i.blurSamples,
                            p.defines.VSM_SAMPLES = i.blurSamples,
                            u.needsUpdate = !0,
                            p.needsUpdate = !0),
                        null === i.mapPass && (i.mapPass = new U(a.x,a.y)),
                            u.uniforms.shadow_pass.value = i.map.texture,
                            u.uniforms.resolution.value = i.mapSize,
                            u.uniforms.radius.value = i.radius,
                            e.setRenderTarget(i.mapPass),
                            e.clear(),
                            e.renderBufferDirect(r, null, n, u, m, null),
                            p.uniforms.shadow_pass.value = i.mapPass.texture,
                            p.uniforms.resolution.value = i.mapSize,
                            p.uniforms.radius.value = i.radius,
                            e.setRenderTarget(i.map),
                            e.clear(),
                            e.renderBufferDirect(r, null, n, p, m, null)
                    }(f, l),
                        f.needsUpdate = !1
                }
                v.needsUpdate = !1,
                    e.setRenderTarget(h, d, f)
            }
    }
    function nq(e, t, i) {
        let r = i.isWebGL2
            , a = new function() {
            let t = !1
                , i = new z
                , r = null
                , a = new z(0,0,0,0);
            return {
                setMask: function(i) {
                    r === i || t || (e.colorMask(i, i, i, i),
                        r = i)
                },
                setLocked: function(e) {
                    t = e
                },
                setClear: function(t, r, n, s, o) {
                    !0 === o && (t *= s,
                        r *= s,
                        n *= s),
                        i.set(t, r, n, s),
                    !1 === a.equals(i) && (e.clearColor(t, r, n, s),
                        a.copy(i))
                },
                reset: function() {
                    t = !1,
                        r = null,
                        a.set(-1, 0, 0, 0)
                }
            }
        }
            , n = new function() {
            let t = !1
                , i = null
                , r = null
                , a = null;
            return {
                setTest: function(e) {
                    e ? F(2929) : k(2929)
                },
                setMask: function(r) {
                    i === r || t || (e.depthMask(r),
                        i = r)
                },
                setFunc: function(t) {
                    if (r !== t) {
                        if (t)
                            switch (t) {
                                case 0:
                                    e.depthFunc(512);
                                    break;
                                case 1:
                                    e.depthFunc(519);
                                    break;
                                case 2:
                                    e.depthFunc(513);
                                    break;
                                case 3:
                                default:
                                    e.depthFunc(515);
                                    break;
                                case 4:
                                    e.depthFunc(514);
                                    break;
                                case 5:
                                    e.depthFunc(518);
                                    break;
                                case 6:
                                    e.depthFunc(516);
                                    break;
                                case 7:
                                    e.depthFunc(517)
                            }
                        else
                            e.depthFunc(515);
                        r = t
                    }
                },
                setLocked: function(e) {
                    t = e
                },
                setClear: function(t) {
                    a !== t && (e.clearDepth(t),
                        a = t)
                },
                reset: function() {
                    t = !1,
                        i = null,
                        r = null,
                        a = null
                }
            }
        }
            , s = new function() {
            let t = !1
                , i = null
                , r = null
                , a = null
                , n = null
                , s = null
                , o = null
                , l = null
                , h = null;
            return {
                setTest: function(e) {
                    t || (e ? F(2960) : k(2960))
                },
                setMask: function(r) {
                    i === r || t || (e.stencilMask(r),
                        i = r)
                },
                setFunc: function(t, i, s) {
                    (r !== t || a !== i || n !== s) && (e.stencilFunc(t, i, s),
                        r = t,
                        a = i,
                        n = s)
                },
                setOp: function(t, i, r) {
                    (s !== t || o !== i || l !== r) && (e.stencilOp(t, i, r),
                        s = t,
                        o = i,
                        l = r)
                },
                setLocked: function(e) {
                    t = e
                },
                setClear: function(t) {
                    h !== t && (e.clearStencil(t),
                        h = t)
                },
                reset: function() {
                    t = !1,
                        i = null,
                        r = null,
                        a = null,
                        n = null,
                        s = null,
                        o = null,
                        l = null,
                        h = null
                }
            }
        }
            , o = {}
            , l = {}
            , h = new WeakMap
            , c = []
            , d = null
            , u = !1
            , p = null
            , f = null
            , m = null
            , g = null
            , v = null
            , _ = null
            , x = null
            , y = !1
            , M = null
            , b = null
            , S = null
            , w = null
            , T = null
            , E = e.getParameter(35661)
            , A = !1
            , C = e.getParameter(7938);
        -1 !== C.indexOf("WebGL") ? A = parseFloat(/^WebGL (\d)/.exec(C)[1]) >= 1 : -1 !== C.indexOf("OpenGL ES") && (A = parseFloat(/^OpenGL ES (\d)/.exec(C)[1]) >= 2);
        let L = null
            , P = {}
            , R = e.getParameter(3088)
            , D = e.getParameter(2978)
            , I = new z().fromArray(R)
            , N = new z().fromArray(D);
        function O(t, i, r) {
            let a = new Uint8Array(4)
                , n = e.createTexture();
            e.bindTexture(t, n),
                e.texParameteri(t, 10241, 9728),
                e.texParameteri(t, 10240, 9728);
            for (let t = 0; t < r; t++)
                e.texImage2D(i + t, 0, 6408, 1, 1, 0, 6408, 5121, a);
            return n
        }
        let U = {};
        function F(t) {
            !0 !== o[t] && (e.enable(t),
                o[t] = !0)
        }
        function k(t) {
            !1 !== o[t] && (e.disable(t),
                o[t] = !1)
        }
        U[3553] = O(3553, 3553, 1),
            U[34067] = O(34067, 34069, 6),
            a.setClear(0, 0, 0, 1),
            n.setClear(1),
            s.setClear(0),
            F(2929),
            n.setFunc(3),
            V(!1),
            W(1),
            F(2884),
            G(0);
        let B = {
            100: 32774,
            101: 32778,
            102: 32779
        };
        if (r)
            B[103] = 32775,
                B[104] = 32776;
        else {
            let e = t.get("EXT_blend_minmax");
            null !== e && (B[103] = e.MIN_EXT,
                B[104] = e.MAX_EXT)
        }
        let H = {
            200: 0,
            201: 1,
            202: 768,
            204: 770,
            210: 776,
            208: 774,
            206: 772,
            203: 769,
            205: 771,
            209: 775,
            207: 773
        };
        function G(t, i, r, a, n, s, o, l) {
            if (0 === t) {
                !0 === u && (k(3042),
                    u = !1);
                return
            }
            if (!1 === u && (F(3042),
                u = !0),
            5 !== t) {
                if (t !== p || l !== y) {
                    if ((100 !== f || 100 !== v) && (e.blendEquation(32774),
                        f = 100,
                        v = 100),
                        l)
                        switch (t) {
                            case 1:
                                e.blendFuncSeparate(1, 771, 1, 771);
                                break;
                            case 2:
                                e.blendFunc(1, 1);
                                break;
                            case 3:
                                e.blendFuncSeparate(0, 769, 0, 1);
                                break;
                            case 4:
                                e.blendFuncSeparate(0, 768, 0, 770);
                                break;
                            default:
                                console.error("THREE.WebGLState: Invalid blending: ", t)
                        }
                    else
                        switch (t) {
                            case 1:
                                e.blendFuncSeparate(770, 771, 1, 771);
                                break;
                            case 2:
                                e.blendFunc(770, 1);
                                break;
                            case 3:
                                e.blendFuncSeparate(0, 769, 0, 1);
                                break;
                            case 4:
                                e.blendFunc(0, 768);
                                break;
                            default:
                                console.error("THREE.WebGLState: Invalid blending: ", t)
                        }
                    m = null,
                        g = null,
                        _ = null,
                        x = null,
                        p = t,
                        y = l
                }
                return
            }
            n = n || i,
                s = s || r,
                o = o || a,
            (i !== f || n !== v) && (e.blendEquationSeparate(B[i], B[n]),
                f = i,
                v = n),
            (r !== m || a !== g || s !== _ || o !== x) && (e.blendFuncSeparate(H[r], H[a], H[s], H[o]),
                m = r,
                g = a,
                _ = s,
                x = o),
                p = t,
                y = null
        }
        function V(t) {
            M !== t && (t ? e.frontFace(2304) : e.frontFace(2305),
                M = t)
        }
        function W(t) {
            0 !== t ? (F(2884),
            t !== b && (1 === t ? e.cullFace(1029) : 2 === t ? e.cullFace(1028) : e.cullFace(1032))) : k(2884),
                b = t
        }
        function j(t, i, r) {
            t ? (F(32823),
            (w !== i || T !== r) && (e.polygonOffset(i, r),
                w = i,
                T = r)) : k(32823)
        }
        function q(t) {
            void 0 === t && (t = 33984 + E - 1),
            L !== t && (e.activeTexture(t),
                L = t)
        }
        return {
            buffers: {
                color: a,
                depth: n,
                stencil: s
            },
            enable: F,
            disable: k,
            bindFramebuffer: function(t, i) {
                return l[t] !== i && (e.bindFramebuffer(t, i),
                    l[t] = i,
                r && (36009 === t && (l[36160] = i),
                36160 === t && (l[36009] = i)),
                    !0)
            },
            drawBuffers: function(r, a) {
                let n = c
                    , s = !1;
                if (r) {
                    if (void 0 === (n = h.get(a)) && (n = [],
                        h.set(a, n)),
                        r.isWebGLMultipleRenderTargets) {
                        let e = r.texture;
                        if (n.length !== e.length || 36064 !== n[0]) {
                            for (let t = 0, i = e.length; t < i; t++)
                                n[t] = 36064 + t;
                            n.length = e.length,
                                s = !0
                        }
                    } else
                        36064 !== n[0] && (n[0] = 36064,
                            s = !0)
                } else
                    1029 !== n[0] && (n[0] = 1029,
                        s = !0);
                s && (i.isWebGL2 ? e.drawBuffers(n) : t.get("WEBGL_draw_buffers").drawBuffersWEBGL(n))
            },
            useProgram: function(t) {
                return d !== t && (e.useProgram(t),
                    d = t,
                    !0)
            },
            setBlending: G,
            setMaterial: function(e, t) {
                2 === e.side ? k(2884) : F(2884);
                let i = 1 === e.side;
                t && (i = !i),
                    V(i),
                    1 === e.blending && !1 === e.transparent ? G(0) : G(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.premultipliedAlpha),
                    n.setFunc(e.depthFunc),
                    n.setTest(e.depthTest),
                    n.setMask(e.depthWrite),
                    a.setMask(e.colorWrite);
                let r = e.stencilWrite;
                s.setTest(r),
                r && (s.setMask(e.stencilWriteMask),
                    s.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask),
                    s.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)),
                    j(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits),
                    !0 === e.alphaToCoverage ? F(32926) : k(32926)
            },
            setFlipSided: V,
            setCullFace: W,
            setLineWidth: function(t) {
                t !== S && (A && e.lineWidth(t),
                    S = t)
            },
            setPolygonOffset: j,
            setScissorTest: function(e) {
                e ? F(3089) : k(3089)
            },
            activeTexture: q,
            bindTexture: function(t, i) {
                null === L && q();
                let r = P[L];
                void 0 === r && (r = {
                    type: void 0,
                    texture: void 0
                },
                    P[L] = r),
                (r.type !== t || r.texture !== i) && (e.bindTexture(t, i || U[t]),
                    r.type = t,
                    r.texture = i)
            },
            unbindTexture: function() {
                let t = P[L];
                void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null),
                    t.type = void 0,
                    t.texture = void 0)
            },
            compressedTexImage2D: function() {
                try {
                    e.compressedTexImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texImage2D: function() {
                try {
                    e.texImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texImage3D: function() {
                try {
                    e.texImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texStorage2D: function() {
                try {
                    e.texStorage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texStorage3D: function() {
                try {
                    e.texStorage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texSubImage2D: function() {
                try {
                    e.texSubImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            texSubImage3D: function() {
                try {
                    e.texSubImage3D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            compressedTexSubImage2D: function() {
                try {
                    e.compressedTexSubImage2D.apply(e, arguments)
                } catch (e) {
                    console.error("THREE.WebGLState:", e)
                }
            },
            scissor: function(t) {
                !1 === I.equals(t) && (e.scissor(t.x, t.y, t.z, t.w),
                    I.copy(t))
            },
            viewport: function(t) {
                !1 === N.equals(t) && (e.viewport(t.x, t.y, t.z, t.w),
                    N.copy(t))
            },
            reset: function() {
                e.disable(3042),
                    e.disable(2884),
                    e.disable(2929),
                    e.disable(32823),
                    e.disable(3089),
                    e.disable(2960),
                    e.disable(32926),
                    e.blendEquation(32774),
                    e.blendFunc(1, 0),
                    e.blendFuncSeparate(1, 0, 1, 0),
                    e.colorMask(!0, !0, !0, !0),
                    e.clearColor(0, 0, 0, 0),
                    e.depthMask(!0),
                    e.depthFunc(513),
                    e.clearDepth(1),
                    e.stencilMask(4294967295),
                    e.stencilFunc(519, 0, 4294967295),
                    e.stencilOp(7680, 7680, 7680),
                    e.clearStencil(0),
                    e.cullFace(1029),
                    e.frontFace(2305),
                    e.polygonOffset(0, 0),
                    e.activeTexture(33984),
                    e.bindFramebuffer(36160, null),
                !0 === r && (e.bindFramebuffer(36009, null),
                    e.bindFramebuffer(36008, null)),
                    e.useProgram(null),
                    e.lineWidth(1),
                    e.scissor(0, 0, e.canvas.width, e.canvas.height),
                    e.viewport(0, 0, e.canvas.width, e.canvas.height),
                    o = {},
                    L = null,
                    P = {},
                    l = {},
                    h = new WeakMap,
                    c = [],
                    d = null,
                    u = !1,
                    p = null,
                    f = null,
                    m = null,
                    g = null,
                    v = null,
                    _ = null,
                    x = null,
                    y = !1,
                    M = null,
                    b = null,
                    S = null,
                    w = null,
                    T = null,
                    I.set(0, 0, e.canvas.width, e.canvas.height),
                    N.set(0, 0, e.canvas.width, e.canvas.height),
                    a.reset(),
                    n.reset(),
                    s.reset()
            }
        }
    }
    function nX(e, t, i, r, a, n, s) {
        let o;
        let l = a.isWebGL2
            , h = a.maxTextures
            , c = a.maxCubemapSize
            , d = a.maxTextureSize
            , u = a.maxSamples
            , p = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null
            , g = /OculusBrowser/g.test(navigator.userAgent)
            , v = new WeakMap
            , _ = new WeakMap
            , y = !1;
        try {
            y = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1,1).getContext("2d")
        } catch (e) {}
        function M(e, t) {
            return y ? new OffscreenCanvas(e,t) : x("canvas")
        }
        function b(e, t, i, r) {
            let a = 1;
            if ((e.width > r || e.height > r) && (a = r / Math.max(e.width, e.height)),
            a < 1 || !0 === t) {
                if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap) {
                    let r = t ? m : Math.floor
                        , n = r(a * e.width)
                        , s = r(a * e.height);
                    void 0 === o && (o = M(n, s));
                    let l = i ? M(n, s) : o;
                    l.width = n,
                        l.height = s;
                    let h = l.getContext("2d");
                    return h.drawImage(e, 0, 0, n, s),
                        console.warn("THREE.WebGLRenderer: Texture has been resized from (" + e.width + "x" + e.height + ") to (" + n + "x" + s + ")."),
                        l
                }
                "data"in e && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + e.width + "x" + e.height + ").")
            }
            return e
        }
        function S(e) {
            return f(e.width) && f(e.height)
        }
        function w(e, t) {
            return e.generateMipmaps && t && 1003 !== e.minFilter && 1006 !== e.minFilter
        }
        function T(t) {
            e.generateMipmap(t)
        }
        function E(i, r, a, n, s=!1) {
            if (!1 === l)
                return r;
            if (null !== i) {
                if (void 0 !== e[i])
                    return e[i];
                console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + i + "'")
            }
            let o = r;
            return 6403 === r && (5126 === a && (o = 33326),
            5131 === a && (o = 33325),
            5121 === a && (o = 33321)),
            33319 === r && (5126 === a && (o = 33328),
            5131 === a && (o = 33327),
            5121 === a && (o = 33323)),
            6408 === r && (5126 === a && (o = 34836),
            5131 === a && (o = 34842),
            5121 === a && (o = 3001 === n && !1 === s ? 35907 : 32856),
            32819 === a && (o = 32854),
            32820 === a && (o = 32855)),
            (33325 === o || 33326 === o || 33327 === o || 33328 === o || 34842 === o || 34836 === o) && t.get("EXT_color_buffer_float"),
                o
        }
        function A(e, t, i) {
            return !0 === w(e, i) || e.isFramebufferTexture && 1003 !== e.minFilter && 1006 !== e.minFilter ? Math.log2(Math.max(t.width, t.height)) + 1 : void 0 !== e.mipmaps && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1
        }
        function C(e) {
            return 1003 === e || 1004 === e || 1005 === e ? 9728 : 9729
        }
        function L(e) {
            let t = e.target;
            t.removeEventListener("dispose", L),
                function(e) {
                    let t = r.get(e);
                    if (void 0 === t.__webglInit)
                        return;
                    let i = e.source
                        , a = _.get(i);
                    if (a) {
                        let r = a[t.__cacheKey];
                        r.usedTimes--,
                        0 === r.usedTimes && D(e),
                        0 === Object.keys(a).length && _.delete(i)
                    }
                    r.remove(e)
                }(t),
            t.isVideoTexture && v.delete(t)
        }
        function P(t) {
            let i = t.target;
            i.removeEventListener("dispose", P),
                function(t) {
                    let i = t.texture
                        , a = r.get(t)
                        , n = r.get(i);
                    if (void 0 !== n.__webglTexture && (e.deleteTexture(n.__webglTexture),
                        s.memory.textures--),
                    t.depthTexture && t.depthTexture.dispose(),
                        t.isWebGLCubeRenderTarget)
                        for (let t = 0; t < 6; t++)
                            e.deleteFramebuffer(a.__webglFramebuffer[t]),
                            a.__webglDepthbuffer && e.deleteRenderbuffer(a.__webglDepthbuffer[t]);
                    else {
                        if (e.deleteFramebuffer(a.__webglFramebuffer),
                        a.__webglDepthbuffer && e.deleteRenderbuffer(a.__webglDepthbuffer),
                        a.__webglMultisampledFramebuffer && e.deleteFramebuffer(a.__webglMultisampledFramebuffer),
                            a.__webglColorRenderbuffer)
                            for (let t = 0; t < a.__webglColorRenderbuffer.length; t++)
                                a.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(a.__webglColorRenderbuffer[t]);
                        a.__webglDepthRenderbuffer && e.deleteRenderbuffer(a.__webglDepthRenderbuffer)
                    }
                    if (t.isWebGLMultipleRenderTargets)
                        for (let t = 0, a = i.length; t < a; t++) {
                            let a = r.get(i[t]);
                            a.__webglTexture && (e.deleteTexture(a.__webglTexture),
                                s.memory.textures--),
                                r.remove(i[t])
                        }
                    r.remove(i),
                        r.remove(t)
                }(i)
        }
        function D(t) {
            let i = r.get(t);
            e.deleteTexture(i.__webglTexture);
            let a = t.source
                , n = _.get(a);
            delete n[i.__cacheKey],
                s.memory.textures--
        }
        let I = 0;
        function N(e, t) {
            let a = r.get(e);
            if (e.isVideoTexture && function(e) {
                let t = s.render.frame;
                v.get(e) !== t && (v.set(e, t),
                    e.update())
            }(e),
            !1 === e.isRenderTargetTexture && e.version > 0 && a.__version !== e.version) {
                let i = e.image;
                if (null === i)
                    console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
                else if (!1 === i.complete)
                    console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
                else {
                    k(a, e, t);
                    return
                }
            }
            i.activeTexture(33984 + t),
                i.bindTexture(3553, a.__webglTexture)
        }
        let O = {
            1e3: 10497,
            1001: 33071,
            1002: 33648
        }
            , z = {
            1003: 9728,
            1004: 9984,
            1005: 9986,
            1006: 9729,
            1007: 9985,
            1008: 9987
        };
        function U(i, n, s) {
            if (s ? (e.texParameteri(i, 10242, O[n.wrapS]),
                e.texParameteri(i, 10243, O[n.wrapT]),
            (32879 === i || 35866 === i) && e.texParameteri(i, 32882, O[n.wrapR]),
                e.texParameteri(i, 10240, z[n.magFilter]),
                e.texParameteri(i, 10241, z[n.minFilter])) : (e.texParameteri(i, 10242, 33071),
                e.texParameteri(i, 10243, 33071),
            (32879 === i || 35866 === i) && e.texParameteri(i, 32882, 33071),
            (1001 !== n.wrapS || 1001 !== n.wrapT) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),
                e.texParameteri(i, 10240, C(n.magFilter)),
                e.texParameteri(i, 10241, C(n.minFilter)),
            1003 !== n.minFilter && 1006 !== n.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),
            !0 === t.has("EXT_texture_filter_anisotropic")) {
                let s = t.get("EXT_texture_filter_anisotropic");
                (1015 !== n.type || !1 !== t.has("OES_texture_float_linear")) && (!1 !== l || 1016 !== n.type || !1 !== t.has("OES_texture_half_float_linear")) && (n.anisotropy > 1 || r.get(n).__currentAnisotropy) && (e.texParameterf(i, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(n.anisotropy, a.getMaxAnisotropy())),
                    r.get(n).__currentAnisotropy = n.anisotropy)
            }
        }
        function F(t, i) {
            let r = !1;
            void 0 === t.__webglInit && (t.__webglInit = !0,
                i.addEventListener("dispose", L));
            let a = i.source
                , n = _.get(a);
            void 0 === n && (n = {},
                _.set(a, n));
            let o = function(e) {
                let t = [];
                return t.push(e.wrapS),
                    t.push(e.wrapT),
                    t.push(e.magFilter),
                    t.push(e.minFilter),
                    t.push(e.anisotropy),
                    t.push(e.internalFormat),
                    t.push(e.format),
                    t.push(e.type),
                    t.push(e.generateMipmaps),
                    t.push(e.premultiplyAlpha),
                    t.push(e.flipY),
                    t.push(e.unpackAlignment),
                    t.push(e.encoding),
                    t.join()
            }(i);
            if (o !== t.__cacheKey) {
                void 0 === n[o] && (n[o] = {
                    texture: e.createTexture(),
                    usedTimes: 0
                },
                    s.memory.textures++,
                    r = !0),
                    n[o].usedTimes++;
                let a = n[t.__cacheKey];
                void 0 !== a && (n[t.__cacheKey].usedTimes--,
                0 === a.usedTimes && D(i)),
                    t.__cacheKey = o,
                    t.__webglTexture = n[o].texture
            }
            return r
        }
        function k(t, r, a) {
            let s = 3553;
            r.isDataArrayTexture && (s = 35866),
            r.isData3DTexture && (s = 32879);
            let o = F(t, r)
                , h = r.source;
            if (i.activeTexture(33984 + a),
                i.bindTexture(s, t.__webglTexture),
            h.version !== h.__currentVersion || !0 === o) {
                let t;
                e.pixelStorei(37440, r.flipY),
                    e.pixelStorei(37441, r.premultiplyAlpha),
                    e.pixelStorei(3317, r.unpackAlignment),
                    e.pixelStorei(37443, 0);
                let a = !l && (1001 !== r.wrapS || 1001 !== r.wrapT || 1003 !== r.minFilter && 1006 !== r.minFilter) && !1 === S(r.image)
                    , c = b(r.image, a, !1, d);
                c = j(r, c);
                let u = S(c) || l
                    , p = n.convert(r.format, r.encoding)
                    , f = n.convert(r.type)
                    , m = E(r.internalFormat, p, f, r.encoding, r.isVideoTexture);
                U(s, r, u);
                let g = r.mipmaps
                    , v = l && !0 !== r.isVideoTexture
                    , _ = void 0 === h.__currentVersion || !0 === o
                    , x = A(r, c, u);
                if (r.isDepthTexture)
                    m = 6402,
                        l ? m = 1015 === r.type ? 36012 : 1014 === r.type ? 33190 : 1020 === r.type ? 35056 : 33189 : 1015 === r.type && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),
                    1026 === r.format && 6402 === m && 1012 !== r.type && 1014 !== r.type && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),
                        r.type = 1014,
                        f = n.convert(r.type)),
                    1027 === r.format && 6402 === m && (m = 34041,
                    1020 !== r.type && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),
                        r.type = 1020,
                        f = n.convert(r.type))),
                    _ && (v ? i.texStorage2D(3553, 1, m, c.width, c.height) : i.texImage2D(3553, 0, m, c.width, c.height, 0, p, f, null));
                else if (r.isDataTexture) {
                    if (g.length > 0 && u) {
                        v && _ && i.texStorage2D(3553, x, m, g[0].width, g[0].height);
                        for (let e = 0, r = g.length; e < r; e++)
                            t = g[e],
                                v ? i.texSubImage2D(3553, e, 0, 0, t.width, t.height, p, f, t.data) : i.texImage2D(3553, e, m, t.width, t.height, 0, p, f, t.data);
                        r.generateMipmaps = !1
                    } else
                        v ? (_ && i.texStorage2D(3553, x, m, c.width, c.height),
                            i.texSubImage2D(3553, 0, 0, 0, c.width, c.height, p, f, c.data)) : i.texImage2D(3553, 0, m, c.width, c.height, 0, p, f, c.data)
                } else if (r.isCompressedTexture) {
                    v && _ && i.texStorage2D(3553, x, m, g[0].width, g[0].height);
                    for (let e = 0, a = g.length; e < a; e++)
                        t = g[e],
                            1023 !== r.format ? null !== p ? v ? i.compressedTexSubImage2D(3553, e, 0, 0, t.width, t.height, p, t.data) : i.compressedTexImage2D(3553, e, m, t.width, t.height, 0, t.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : v ? i.texSubImage2D(3553, e, 0, 0, t.width, t.height, p, f, t.data) : i.texImage2D(3553, e, m, t.width, t.height, 0, p, f, t.data)
                } else if (r.isDataArrayTexture)
                    v ? (_ && i.texStorage3D(35866, x, m, c.width, c.height, c.depth),
                        i.texSubImage3D(35866, 0, 0, 0, 0, c.width, c.height, c.depth, p, f, c.data)) : i.texImage3D(35866, 0, m, c.width, c.height, c.depth, 0, p, f, c.data);
                else if (r.isData3DTexture)
                    v ? (_ && i.texStorage3D(32879, x, m, c.width, c.height, c.depth),
                        i.texSubImage3D(32879, 0, 0, 0, 0, c.width, c.height, c.depth, p, f, c.data)) : i.texImage3D(32879, 0, m, c.width, c.height, c.depth, 0, p, f, c.data);
                else if (r.isFramebufferTexture) {
                    if (_) {
                        if (v)
                            i.texStorage2D(3553, x, m, c.width, c.height);
                        else {
                            let e = c.width
                                , t = c.height;
                            for (let r = 0; r < x; r++)
                                i.texImage2D(3553, r, m, e, t, 0, p, f, null),
                                    e >>= 1,
                                    t >>= 1
                        }
                    }
                } else if (g.length > 0 && u) {
                    v && _ && i.texStorage2D(3553, x, m, g[0].width, g[0].height);
                    for (let e = 0, r = g.length; e < r; e++)
                        t = g[e],
                            v ? i.texSubImage2D(3553, e, 0, 0, p, f, t) : i.texImage2D(3553, e, m, p, f, t);
                    r.generateMipmaps = !1
                } else
                    v ? (_ && i.texStorage2D(3553, x, m, c.width, c.height),
                        i.texSubImage2D(3553, 0, 0, 0, p, f, c)) : i.texImage2D(3553, 0, m, p, f, c);
                w(r, u) && T(s),
                    h.__currentVersion = h.version,
                r.onUpdate && r.onUpdate(r)
            }
            t.__version = r.version
        }
        function B(t, a, s, o, l) {
            let h = n.convert(s.format, s.encoding)
                , c = n.convert(s.type)
                , d = E(s.internalFormat, h, c, s.encoding)
                , u = r.get(a);
            u.__hasExternalTextures || (32879 === l || 35866 === l ? i.texImage3D(l, 0, d, a.width, a.height, a.depth, 0, h, c, null) : i.texImage2D(l, 0, d, a.width, a.height, 0, h, c, null)),
                i.bindFramebuffer(36160, t),
                W(a) ? p.framebufferTexture2DMultisampleEXT(36160, o, l, r.get(s).__webglTexture, 0, V(a)) : e.framebufferTexture2D(36160, o, l, r.get(s).__webglTexture, 0),
                i.bindFramebuffer(36160, null)
        }
        function H(t, i, r) {
            if (e.bindRenderbuffer(36161, t),
            i.depthBuffer && !i.stencilBuffer) {
                let a = 33189;
                if (r || W(i)) {
                    let t = i.depthTexture;
                    t && t.isDepthTexture && (1015 === t.type ? a = 36012 : 1014 === t.type && (a = 33190));
                    let r = V(i);
                    W(i) ? p.renderbufferStorageMultisampleEXT(36161, r, a, i.width, i.height) : e.renderbufferStorageMultisample(36161, r, a, i.width, i.height)
                } else
                    e.renderbufferStorage(36161, a, i.width, i.height);
                e.framebufferRenderbuffer(36160, 36096, 36161, t)
            } else if (i.depthBuffer && i.stencilBuffer) {
                let a = V(i);
                r && !1 === W(i) ? e.renderbufferStorageMultisample(36161, a, 35056, i.width, i.height) : W(i) ? p.renderbufferStorageMultisampleEXT(36161, a, 35056, i.width, i.height) : e.renderbufferStorage(36161, 34041, i.width, i.height),
                    e.framebufferRenderbuffer(36160, 33306, 36161, t)
            } else {
                let t = !0 === i.isWebGLMultipleRenderTargets ? i.texture : [i.texture];
                for (let a = 0; a < t.length; a++) {
                    let s = t[a]
                        , o = n.convert(s.format, s.encoding)
                        , l = n.convert(s.type)
                        , h = E(s.internalFormat, o, l, s.encoding)
                        , c = V(i);
                    r && !1 === W(i) ? e.renderbufferStorageMultisample(36161, c, h, i.width, i.height) : W(i) ? p.renderbufferStorageMultisampleEXT(36161, c, h, i.width, i.height) : e.renderbufferStorage(36161, h, i.width, i.height)
                }
            }
            e.bindRenderbuffer(36161, null)
        }
        function G(t) {
            let a = r.get(t)
                , n = !0 === t.isWebGLCubeRenderTarget;
            if (t.depthTexture && !a.__autoAllocateDepthBuffer) {
                if (n)
                    throw Error("target.depthTexture not supported in Cube render targets");
                !function(t, a) {
                    let n = a && a.isWebGLCubeRenderTarget;
                    if (n)
                        throw Error("Depth Texture with cube render targets is not supported");
                    if (i.bindFramebuffer(36160, t),
                        !(a.depthTexture && a.depthTexture.isDepthTexture))
                        throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    r.get(a.depthTexture).__webglTexture && a.depthTexture.image.width === a.width && a.depthTexture.image.height === a.height || (a.depthTexture.image.width = a.width,
                        a.depthTexture.image.height = a.height,
                        a.depthTexture.needsUpdate = !0),
                        N(a.depthTexture, 0);
                    let s = r.get(a.depthTexture).__webglTexture
                        , o = V(a);
                    if (1026 === a.depthTexture.format)
                        W(a) ? p.framebufferTexture2DMultisampleEXT(36160, 36096, 3553, s, 0, o) : e.framebufferTexture2D(36160, 36096, 3553, s, 0);
                    else if (1027 === a.depthTexture.format)
                        W(a) ? p.framebufferTexture2DMultisampleEXT(36160, 33306, 3553, s, 0, o) : e.framebufferTexture2D(36160, 33306, 3553, s, 0);
                    else
                        throw Error("Unknown depthTexture format")
                }(a.__webglFramebuffer, t)
            } else if (n) {
                a.__webglDepthbuffer = [];
                for (let r = 0; r < 6; r++)
                    i.bindFramebuffer(36160, a.__webglFramebuffer[r]),
                        a.__webglDepthbuffer[r] = e.createRenderbuffer(),
                        H(a.__webglDepthbuffer[r], t, !1)
            } else
                i.bindFramebuffer(36160, a.__webglFramebuffer),
                    a.__webglDepthbuffer = e.createRenderbuffer(),
                    H(a.__webglDepthbuffer, t, !1);
            i.bindFramebuffer(36160, null)
        }
        function V(e) {
            return Math.min(u, e.samples)
        }
        function W(e) {
            let i = r.get(e);
            return l && e.samples > 0 && !0 === t.has("WEBGL_multisampled_render_to_texture") && !1 !== i.__useRenderToTexture
        }
        function j(e, i) {
            let r = e.encoding
                , a = e.format
                , n = e.type;
            return !0 === e.isCompressedTexture || !0 === e.isVideoTexture || 1035 === e.format || 3e3 !== r && (3001 === r ? !1 === l ? !0 === t.has("EXT_sRGB") && 1023 === a ? (e.format = 1035,
                e.minFilter = 1006,
                e.generateMipmaps = !1) : i = R.sRGBToLinear(i) : (1023 !== a || 1009 !== n) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture encoding:", r)),
                i
        }
        this.allocateTextureUnit = function() {
            let e = I;
            return e >= h && console.warn("THREE.WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + h),
                I += 1,
                e
        }
            ,
            this.resetTextureUnits = function() {
                I = 0
            }
            ,
            this.setTexture2D = N,
            this.setTexture2DArray = function(e, t) {
                let a = r.get(e);
                if (e.version > 0 && a.__version !== e.version) {
                    k(a, e, t);
                    return
                }
                i.activeTexture(33984 + t),
                    i.bindTexture(35866, a.__webglTexture)
            }
            ,
            this.setTexture3D = function(e, t) {
                let a = r.get(e);
                if (e.version > 0 && a.__version !== e.version) {
                    k(a, e, t);
                    return
                }
                i.activeTexture(33984 + t),
                    i.bindTexture(32879, a.__webglTexture)
            }
            ,
            this.setTextureCube = function(t, a) {
                let s = r.get(t);
                if (t.version > 0 && s.__version !== t.version) {
                    (function(t, r, a) {
                            if (6 !== r.image.length)
                                return;
                            let s = F(t, r)
                                , o = r.source;
                            if (i.activeTexture(33984 + a),
                                i.bindTexture(34067, t.__webglTexture),
                            o.version !== o.__currentVersion || !0 === s) {
                                let t;
                                e.pixelStorei(37440, r.flipY),
                                    e.pixelStorei(37441, r.premultiplyAlpha),
                                    e.pixelStorei(3317, r.unpackAlignment),
                                    e.pixelStorei(37443, 0);
                                let a = r.isCompressedTexture || r.image[0].isCompressedTexture
                                    , h = r.image[0] && r.image[0].isDataTexture
                                    , d = [];
                                for (let e = 0; e < 6; e++)
                                    a || h ? d[e] = h ? r.image[e].image : r.image[e] : d[e] = b(r.image[e], !1, !0, c),
                                        d[e] = j(r, d[e]);
                                let u = d[0]
                                    , p = S(u) || l
                                    , f = n.convert(r.format, r.encoding)
                                    , m = n.convert(r.type)
                                    , g = E(r.internalFormat, f, m, r.encoding)
                                    , v = l && !0 !== r.isVideoTexture
                                    , _ = void 0 === o.__currentVersion || !0 === s
                                    , x = A(r, u, p);
                                if (U(34067, r, p),
                                    a) {
                                    v && _ && i.texStorage2D(34067, x, g, u.width, u.height);
                                    for (let e = 0; e < 6; e++) {
                                        t = d[e].mipmaps;
                                        for (let a = 0; a < t.length; a++) {
                                            let n = t[a];
                                            1023 !== r.format ? null !== f ? v ? i.compressedTexSubImage2D(34069 + e, a, 0, 0, n.width, n.height, f, n.data) : i.compressedTexImage2D(34069 + e, a, g, n.width, n.height, 0, n.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : v ? i.texSubImage2D(34069 + e, a, 0, 0, n.width, n.height, f, m, n.data) : i.texImage2D(34069 + e, a, g, n.width, n.height, 0, f, m, n.data)
                                        }
                                    }
                                } else {
                                    t = r.mipmaps,
                                    v && _ && (t.length > 0 && x++,
                                        i.texStorage2D(34067, x, g, d[0].width, d[0].height));
                                    for (let e = 0; e < 6; e++)
                                        if (h) {
                                            v ? i.texSubImage2D(34069 + e, 0, 0, 0, d[e].width, d[e].height, f, m, d[e].data) : i.texImage2D(34069 + e, 0, g, d[e].width, d[e].height, 0, f, m, d[e].data);
                                            for (let r = 0; r < t.length; r++) {
                                                let a = t[r]
                                                    , n = a.image[e].image;
                                                v ? i.texSubImage2D(34069 + e, r + 1, 0, 0, n.width, n.height, f, m, n.data) : i.texImage2D(34069 + e, r + 1, g, n.width, n.height, 0, f, m, n.data)
                                            }
                                        } else {
                                            v ? i.texSubImage2D(34069 + e, 0, 0, 0, f, m, d[e]) : i.texImage2D(34069 + e, 0, g, f, m, d[e]);
                                            for (let r = 0; r < t.length; r++) {
                                                let a = t[r];
                                                v ? i.texSubImage2D(34069 + e, r + 1, 0, 0, f, m, a.image[e]) : i.texImage2D(34069 + e, r + 1, g, f, m, a.image[e])
                                            }
                                        }
                                }
                                w(r, p) && T(34067),
                                    o.__currentVersion = o.version,
                                r.onUpdate && r.onUpdate(r)
                            }
                            t.__version = r.version
                        }
                    )(s, t, a);
                    return
                }
                i.activeTexture(33984 + a),
                    i.bindTexture(34067, s.__webglTexture)
            }
            ,
            this.rebindTextures = function(e, t, i) {
                let a = r.get(e);
                void 0 !== t && B(a.__webglFramebuffer, e, e.texture, 36064, 3553),
                void 0 !== i && G(e)
            }
            ,
            this.setupRenderTarget = function(t) {
                let o = t.texture
                    , h = r.get(t)
                    , c = r.get(o);
                t.addEventListener("dispose", P),
                !0 !== t.isWebGLMultipleRenderTargets && (void 0 === c.__webglTexture && (c.__webglTexture = e.createTexture()),
                    c.__version = o.version,
                    s.memory.textures++);
                let d = !0 === t.isWebGLCubeRenderTarget
                    , u = !0 === t.isWebGLMultipleRenderTargets
                    , p = S(t) || l;
                if (d) {
                    h.__webglFramebuffer = [];
                    for (let t = 0; t < 6; t++)
                        h.__webglFramebuffer[t] = e.createFramebuffer()
                } else {
                    if (h.__webglFramebuffer = e.createFramebuffer(),
                        u) {
                        if (a.drawBuffers) {
                            let i = t.texture;
                            for (let t = 0, a = i.length; t < a; t++) {
                                let a = r.get(i[t]);
                                void 0 === a.__webglTexture && (a.__webglTexture = e.createTexture(),
                                    s.memory.textures++)
                            }
                        } else
                            console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.")
                    }
                    if (l && t.samples > 0 && !1 === W(t)) {
                        let r = u ? o : [o];
                        h.__webglMultisampledFramebuffer = e.createFramebuffer(),
                            h.__webglColorRenderbuffer = [],
                            i.bindFramebuffer(36160, h.__webglMultisampledFramebuffer);
                        for (let i = 0; i < r.length; i++) {
                            let a = r[i];
                            h.__webglColorRenderbuffer[i] = e.createRenderbuffer(),
                                e.bindRenderbuffer(36161, h.__webglColorRenderbuffer[i]);
                            let s = n.convert(a.format, a.encoding)
                                , o = n.convert(a.type)
                                , l = E(a.internalFormat, s, o, a.encoding)
                                , c = V(t);
                            e.renderbufferStorageMultisample(36161, c, l, t.width, t.height),
                                e.framebufferRenderbuffer(36160, 36064 + i, 36161, h.__webglColorRenderbuffer[i])
                        }
                        e.bindRenderbuffer(36161, null),
                        t.depthBuffer && (h.__webglDepthRenderbuffer = e.createRenderbuffer(),
                            H(h.__webglDepthRenderbuffer, t, !0)),
                            i.bindFramebuffer(36160, null)
                    }
                }
                if (d) {
                    i.bindTexture(34067, c.__webglTexture),
                        U(34067, o, p);
                    for (let e = 0; e < 6; e++)
                        B(h.__webglFramebuffer[e], t, o, 36064, 34069 + e);
                    w(o, p) && T(34067),
                        i.unbindTexture()
                } else if (u) {
                    let e = t.texture;
                    for (let a = 0, n = e.length; a < n; a++) {
                        let n = e[a]
                            , s = r.get(n);
                        i.bindTexture(3553, s.__webglTexture),
                            U(3553, n, p),
                            B(h.__webglFramebuffer, t, n, 36064 + a, 3553),
                        w(n, p) && T(3553)
                    }
                    i.unbindTexture()
                } else {
                    let e = 3553;
                    (t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (l ? e = t.isWebGL3DRenderTarget ? 32879 : 35866 : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),
                        i.bindTexture(e, c.__webglTexture),
                        U(e, o, p),
                        B(h.__webglFramebuffer, t, o, 36064, e),
                    w(o, p) && T(e),
                        i.unbindTexture()
                }
                t.depthBuffer && G(t)
            }
            ,
            this.updateRenderTargetMipmap = function(e) {
                let t = S(e) || l
                    , a = !0 === e.isWebGLMultipleRenderTargets ? e.texture : [e.texture];
                for (let n = 0, s = a.length; n < s; n++) {
                    let s = a[n];
                    if (w(s, t)) {
                        let t = e.isWebGLCubeRenderTarget ? 34067 : 3553
                            , a = r.get(s).__webglTexture;
                        i.bindTexture(t, a),
                            T(t),
                            i.unbindTexture()
                    }
                }
            }
            ,
            this.updateMultisampleRenderTarget = function(t) {
                if (l && t.samples > 0 && !1 === W(t)) {
                    let a = t.isWebGLMultipleRenderTargets ? t.texture : [t.texture]
                        , n = t.width
                        , s = t.height
                        , o = 16384
                        , l = []
                        , h = t.stencilBuffer ? 33306 : 36096
                        , c = r.get(t)
                        , d = !0 === t.isWebGLMultipleRenderTargets;
                    if (d)
                        for (let t = 0; t < a.length; t++)
                            i.bindFramebuffer(36160, c.__webglMultisampledFramebuffer),
                                e.framebufferRenderbuffer(36160, 36064 + t, 36161, null),
                                i.bindFramebuffer(36160, c.__webglFramebuffer),
                                e.framebufferTexture2D(36009, 36064 + t, 3553, null, 0);
                    i.bindFramebuffer(36008, c.__webglMultisampledFramebuffer),
                        i.bindFramebuffer(36009, c.__webglFramebuffer);
                    for (let i = 0; i < a.length; i++) {
                        l.push(36064 + i),
                        t.depthBuffer && l.push(h);
                        let u = void 0 !== c.__ignoreDepthValues && c.__ignoreDepthValues;
                        if (!1 === u && (t.depthBuffer && (o |= 256),
                        t.stencilBuffer && (o |= 1024)),
                        d && e.framebufferRenderbuffer(36008, 36064, 36161, c.__webglColorRenderbuffer[i]),
                        !0 === u && (e.invalidateFramebuffer(36008, [h]),
                            e.invalidateFramebuffer(36009, [h])),
                            d) {
                            let t = r.get(a[i]).__webglTexture;
                            e.framebufferTexture2D(36009, 36064, 3553, t, 0)
                        }
                        e.blitFramebuffer(0, 0, n, s, 0, 0, n, s, o, 9728),
                        g && e.invalidateFramebuffer(36008, l)
                    }
                    if (i.bindFramebuffer(36008, null),
                        i.bindFramebuffer(36009, null),
                        d)
                        for (let t = 0; t < a.length; t++) {
                            i.bindFramebuffer(36160, c.__webglMultisampledFramebuffer),
                                e.framebufferRenderbuffer(36160, 36064 + t, 36161, c.__webglColorRenderbuffer[t]);
                            let n = r.get(a[t]).__webglTexture;
                            i.bindFramebuffer(36160, c.__webglFramebuffer),
                                e.framebufferTexture2D(36009, 36064 + t, 3553, n, 0)
                        }
                    i.bindFramebuffer(36009, c.__webglMultisampledFramebuffer)
                }
            }
            ,
            this.setupDepthRenderbuffer = G,
            this.setupFrameBufferTexture = B,
            this.useMultisampledRTT = W
    }
    function nY(e, t, i) {
        let r = i.isWebGL2;
        return {
            convert: function(i, a=null) {
                let n;
                if (1009 === i)
                    return 5121;
                if (1017 === i)
                    return 32819;
                if (1018 === i)
                    return 32820;
                if (1010 === i)
                    return 5120;
                if (1011 === i)
                    return 5122;
                if (1012 === i)
                    return 5123;
                if (1013 === i)
                    return 5124;
                if (1014 === i)
                    return 5125;
                if (1015 === i)
                    return 5126;
                if (1016 === i)
                    return r ? 5131 : null !== (n = t.get("OES_texture_half_float")) ? n.HALF_FLOAT_OES : null;
                if (1021 === i)
                    return 6406;
                if (1023 === i)
                    return 6408;
                if (1024 === i)
                    return 6409;
                if (1025 === i)
                    return 6410;
                if (1026 === i)
                    return 6402;
                if (1027 === i)
                    return 34041;
                if (1028 === i)
                    return 6403;
                if (1022 === i)
                    return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),
                        6408;
                if (1035 === i)
                    return null !== (n = t.get("EXT_sRGB")) ? n.SRGB_ALPHA_EXT : null;
                if (1029 === i)
                    return 36244;
                if (1030 === i)
                    return 33319;
                if (1031 === i)
                    return 33320;
                if (1033 === i)
                    return 36249;
                if (33776 === i || 33777 === i || 33778 === i || 33779 === i) {
                    if (3001 === a) {
                        if (null === (n = t.get("WEBGL_compressed_texture_s3tc_srgb")))
                            return null;
                        if (33776 === i)
                            return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;
                        if (33777 === i)
                            return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
                        if (33778 === i)
                            return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
                        if (33779 === i)
                            return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
                    } else {
                        if (null === (n = t.get("WEBGL_compressed_texture_s3tc")))
                            return null;
                        if (33776 === i)
                            return n.COMPRESSED_RGB_S3TC_DXT1_EXT;
                        if (33777 === i)
                            return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                        if (33778 === i)
                            return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                        if (33779 === i)
                            return n.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    }
                }
                if (35840 === i || 35841 === i || 35842 === i || 35843 === i) {
                    if (null === (n = t.get("WEBGL_compressed_texture_pvrtc")))
                        return null;
                    if (35840 === i)
                        return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    if (35841 === i)
                        return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    if (35842 === i)
                        return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    if (35843 === i)
                        return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
                }
                if (36196 === i)
                    return null !== (n = t.get("WEBGL_compressed_texture_etc1")) ? n.COMPRESSED_RGB_ETC1_WEBGL : null;
                if (37492 === i || 37496 === i) {
                    if (null === (n = t.get("WEBGL_compressed_texture_etc")))
                        return null;
                    if (37492 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ETC2 : n.COMPRESSED_RGB8_ETC2;
                    if (37496 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : n.COMPRESSED_RGBA8_ETC2_EAC
                }
                if (37808 === i || 37809 === i || 37810 === i || 37811 === i || 37812 === i || 37813 === i || 37814 === i || 37815 === i || 37816 === i || 37817 === i || 37818 === i || 37819 === i || 37820 === i || 37821 === i) {
                    if (null === (n = t.get("WEBGL_compressed_texture_astc")))
                        return null;
                    if (37808 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : n.COMPRESSED_RGBA_ASTC_4x4_KHR;
                    if (37809 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : n.COMPRESSED_RGBA_ASTC_5x4_KHR;
                    if (37810 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : n.COMPRESSED_RGBA_ASTC_5x5_KHR;
                    if (37811 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : n.COMPRESSED_RGBA_ASTC_6x5_KHR;
                    if (37812 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : n.COMPRESSED_RGBA_ASTC_6x6_KHR;
                    if (37813 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : n.COMPRESSED_RGBA_ASTC_8x5_KHR;
                    if (37814 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : n.COMPRESSED_RGBA_ASTC_8x6_KHR;
                    if (37815 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : n.COMPRESSED_RGBA_ASTC_8x8_KHR;
                    if (37816 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : n.COMPRESSED_RGBA_ASTC_10x5_KHR;
                    if (37817 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : n.COMPRESSED_RGBA_ASTC_10x6_KHR;
                    if (37818 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : n.COMPRESSED_RGBA_ASTC_10x8_KHR;
                    if (37819 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : n.COMPRESSED_RGBA_ASTC_10x10_KHR;
                    if (37820 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : n.COMPRESSED_RGBA_ASTC_12x10_KHR;
                    if (37821 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : n.COMPRESSED_RGBA_ASTC_12x12_KHR
                }
                if (36492 === i) {
                    if (null === (n = t.get("EXT_texture_compression_bptc")))
                        return null;
                    if (36492 === i)
                        return 3001 === a ? n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : n.COMPRESSED_RGBA_BPTC_UNORM_EXT
                }
                return 1020 === i ? r ? 34042 : null !== (n = t.get("WEBGL_depth_texture")) ? n.UNSIGNED_INT_24_8_WEBGL : null : void 0 !== e[i] ? e[i] : null
            }
        }
    }
    class nZ extends tR {
        constructor(e=[]) {
            super(),
                this.isArrayCamera = !0,
                this.cameras = e
        }
    }
    class nJ extends eH {
        constructor() {
            super(),
                this.isGroup = !0,
                this.type = "Group"
        }
    }
    let nK = {
        type: "move"
    };
    class nQ {
        constructor() {
            this._targetRay = null,
                this._grip = null,
                this._hand = null
        }
        getHandSpace() {
            return null === this._hand && (this._hand = new nJ,
                this._hand.matrixAutoUpdate = !1,
                this._hand.visible = !1,
                this._hand.joints = {},
                this._hand.inputState = {
                    pinching: !1
                }),
                this._hand
        }
        getTargetRaySpace() {
            return null === this._targetRay && (this._targetRay = new nJ,
                this._targetRay.matrixAutoUpdate = !1,
                this._targetRay.visible = !1,
                this._targetRay.hasLinearVelocity = !1,
                this._targetRay.linearVelocity = new B,
                this._targetRay.hasAngularVelocity = !1,
                this._targetRay.angularVelocity = new B),
                this._targetRay
        }
        getGripSpace() {
            return null === this._grip && (this._grip = new nJ,
                this._grip.matrixAutoUpdate = !1,
                this._grip.visible = !1,
                this._grip.hasLinearVelocity = !1,
                this._grip.linearVelocity = new B,
                this._grip.hasAngularVelocity = !1,
                this._grip.angularVelocity = new B),
                this._grip
        }
        dispatchEvent(e) {
            return null !== this._targetRay && this._targetRay.dispatchEvent(e),
            null !== this._grip && this._grip.dispatchEvent(e),
            null !== this._hand && this._hand.dispatchEvent(e),
                this
        }
        disconnect(e) {
            return this.dispatchEvent({
                type: "disconnected",
                data: e
            }),
            null !== this._targetRay && (this._targetRay.visible = !1),
            null !== this._grip && (this._grip.visible = !1),
            null !== this._hand && (this._hand.visible = !1),
                this
        }
        update(e, t, i) {
            let r = null
                , a = null
                , n = null
                , s = this._targetRay
                , o = this._grip
                , l = this._hand;
            if (e && "visible-blurred" !== t.session.visibilityState) {
                if (l && e.hand) {
                    for (let r of (n = !0,
                        e.hand.values())) {
                        let e = t.getJointPose(r, i);
                        if (void 0 === l.joints[r.jointName]) {
                            let e = new nJ;
                            e.matrixAutoUpdate = !1,
                                e.visible = !1,
                                l.joints[r.jointName] = e,
                                l.add(e)
                        }
                        let a = l.joints[r.jointName];
                        null !== e && (a.matrix.fromArray(e.transform.matrix),
                            a.matrix.decompose(a.position, a.rotation, a.scale),
                            a.jointRadius = e.radius),
                            a.visible = null !== e
                    }
                    let r = l.joints["index-finger-tip"]
                        , a = l.joints["thumb-tip"]
                        , s = r.position.distanceTo(a.position);
                    l.inputState.pinching && s > .025 ? (l.inputState.pinching = !1,
                        this.dispatchEvent({
                            type: "pinchend",
                            handedness: e.handedness,
                            target: this
                        })) : !l.inputState.pinching && s <= .015 && (l.inputState.pinching = !0,
                        this.dispatchEvent({
                            type: "pinchstart",
                            handedness: e.handedness,
                            target: this
                        }))
                } else
                    null !== o && e.gripSpace && null !== (a = t.getPose(e.gripSpace, i)) && (o.matrix.fromArray(a.transform.matrix),
                        o.matrix.decompose(o.position, o.rotation, o.scale),
                        a.linearVelocity ? (o.hasLinearVelocity = !0,
                            o.linearVelocity.copy(a.linearVelocity)) : o.hasLinearVelocity = !1,
                        a.angularVelocity ? (o.hasAngularVelocity = !0,
                            o.angularVelocity.copy(a.angularVelocity)) : o.hasAngularVelocity = !1);
                null !== s && (null === (r = t.getPose(e.targetRaySpace, i)) && null !== a && (r = a),
                null !== r && (s.matrix.fromArray(r.transform.matrix),
                    s.matrix.decompose(s.position, s.rotation, s.scale),
                    r.linearVelocity ? (s.hasLinearVelocity = !0,
                        s.linearVelocity.copy(r.linearVelocity)) : s.hasLinearVelocity = !1,
                    r.angularVelocity ? (s.hasAngularVelocity = !0,
                        s.angularVelocity.copy(r.angularVelocity)) : s.hasAngularVelocity = !1,
                    this.dispatchEvent(nK)))
            }
            return null !== s && (s.visible = null !== r),
            null !== o && (o.visible = null !== a),
            null !== l && (l.visible = null !== n),
                this
        }
    }
    class n$ extends O {
        constructor(e, t, i, r, a, n, s, o, l, h) {
            if (1026 !== (h = void 0 !== h ? h : 1026) && 1027 !== h)
                throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
            void 0 === i && 1026 === h && (i = 1014),
            void 0 === i && 1027 === h && (i = 1020),
                super(null, r, a, n, s, o, h, i, l),
                this.isDepthTexture = !0,
                this.image = {
                    width: e,
                    height: t
                },
                this.magFilter = void 0 !== s ? s : 1003,
                this.minFilter = void 0 !== o ? o : 1003,
                this.flipY = !1,
                this.generateMipmaps = !1
        }
    }
    class n0 extends l {
        constructor(e, t) {
            super();
            let i = this
                , r = null
                , a = 1
                , n = null
                , s = "local-floor"
                , o = null
                , l = null
                , h = null
                , c = null
                , d = null
                , u = null
                , p = t.getContextAttributes()
                , f = null
                , m = null
                , g = []
                , v = []
                , _ = new tR;
            _.layers.enable(1),
                _.viewport = new z;
            let x = new tR;
            x.layers.enable(2),
                x.viewport = new z;
            let y = [_, x]
                , M = new nZ;
            M.layers.enable(1),
                M.layers.enable(2);
            let b = null
                , S = null;
            function w(e) {
                let t = v.indexOf(e.inputSource);
                if (-1 === t)
                    return;
                let i = g[t];
                void 0 !== i && i.dispatchEvent({
                    type: e.type,
                    data: e.inputSource
                })
            }
            function T() {
                r.removeEventListener("select", w),
                    r.removeEventListener("selectstart", w),
                    r.removeEventListener("selectend", w),
                    r.removeEventListener("squeeze", w),
                    r.removeEventListener("squeezestart", w),
                    r.removeEventListener("squeezeend", w),
                    r.removeEventListener("end", T),
                    r.removeEventListener("inputsourceschange", E);
                for (let e = 0; e < g.length; e++) {
                    let t = v[e];
                    null !== t && (v[e] = null,
                        g[e].disconnect(t))
                }
                b = null,
                    S = null,
                    e.setRenderTarget(f),
                    d = null,
                    c = null,
                    h = null,
                    r = null,
                    m = null,
                    R.stop(),
                    i.isPresenting = !1,
                    i.dispatchEvent({
                        type: "sessionend"
                    })
            }
            function E(e) {
                for (let t = 0; t < e.removed.length; t++) {
                    let i = e.removed[t]
                        , r = v.indexOf(i);
                    r >= 0 && (v[r] = null,
                        g[r].dispatchEvent({
                            type: "disconnected",
                            data: i
                        }))
                }
                for (let t = 0; t < e.added.length; t++) {
                    let i = e.added[t]
                        , r = v.indexOf(i);
                    if (-1 === r) {
                        for (let e = 0; e < g.length; e++) {
                            if (e >= v.length) {
                                v.push(i),
                                    r = e;
                                break
                            }
                            if (null === v[e]) {
                                v[e] = i,
                                    r = e;
                                break
                            }
                        }
                        if (-1 === r)
                            break
                    }
                    let a = g[r];
                    a && a.dispatchEvent({
                        type: "connected",
                        data: i
                    })
                }
            }
            this.cameraAutoUpdate = !0,
                this.enabled = !1,
                this.isPresenting = !1,
                this.getController = function(e) {
                    let t = g[e];
                    return void 0 === t && (t = new nQ,
                        g[e] = t),
                        t.getTargetRaySpace()
                }
                ,
                this.getControllerGrip = function(e) {
                    let t = g[e];
                    return void 0 === t && (t = new nQ,
                        g[e] = t),
                        t.getGripSpace()
                }
                ,
                this.getHand = function(e) {
                    let t = g[e];
                    return void 0 === t && (t = new nQ,
                        g[e] = t),
                        t.getHandSpace()
                }
                ,
                this.setFramebufferScaleFactor = function(e) {
                    a = e,
                    !0 === i.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
                }
                ,
                this.setReferenceSpaceType = function(e) {
                    s = e,
                    !0 === i.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
                }
                ,
                this.getReferenceSpace = function() {
                    return o || n
                }
                ,
                this.setReferenceSpace = function(e) {
                    o = e
                }
                ,
                this.getBaseLayer = function() {
                    return null !== c ? c : d
                }
                ,
                this.getBinding = function() {
                    return h
                }
                ,
                this.getFrame = function() {
                    return u
                }
                ,
                this.getSession = function() {
                    return r
                }
                ,
                this.setSession = async function(l) {
                    if (null !== (r = l)) {
                        if (f = e.getRenderTarget(),
                            r.addEventListener("select", w),
                            r.addEventListener("selectstart", w),
                            r.addEventListener("selectend", w),
                            r.addEventListener("squeeze", w),
                            r.addEventListener("squeezestart", w),
                            r.addEventListener("squeezeend", w),
                            r.addEventListener("end", T),
                            r.addEventListener("inputsourceschange", E),
                        !0 !== p.xrCompatible && await t.makeXRCompatible(),
                        void 0 === r.renderState.layers || !1 === e.capabilities.isWebGL2) {
                            let i = {
                                antialias: void 0 !== r.renderState.layers || p.antialias,
                                alpha: p.alpha,
                                depth: p.depth,
                                stencil: p.stencil,
                                framebufferScaleFactor: a
                            };
                            d = new XRWebGLLayer(r,t,i),
                                r.updateRenderState({
                                    baseLayer: d
                                }),
                                m = new U(d.framebufferWidth,d.framebufferHeight,{
                                    format: 1023,
                                    type: 1009,
                                    encoding: e.outputEncoding
                                })
                        } else {
                            let i = null
                                , n = null
                                , s = null;
                            p.depth && (s = p.stencil ? 35056 : 33190,
                                i = p.stencil ? 1027 : 1026,
                                n = p.stencil ? 1020 : 1014);
                            let o = {
                                colorFormat: 32856,
                                depthFormat: s,
                                scaleFactor: a
                            };
                            c = (h = new XRWebGLBinding(r,t)).createProjectionLayer(o),
                                r.updateRenderState({
                                    layers: [c]
                                }),
                                m = new U(c.textureWidth,c.textureHeight,{
                                    format: 1023,
                                    type: 1009,
                                    depthTexture: new n$(c.textureWidth,c.textureHeight,n,void 0,void 0,void 0,void 0,void 0,void 0,i),
                                    stencilBuffer: p.stencil,
                                    encoding: e.outputEncoding,
                                    samples: p.antialias ? 4 : 0
                                });
                            let l = e.properties.get(m);
                            l.__ignoreDepthValues = c.ignoreDepthValues
                        }
                        m.isXRRenderTarget = !0,
                            this.setFoveation(1),
                            o = null,
                            n = await r.requestReferenceSpace(s),
                            R.setContext(r),
                            R.start(),
                            i.isPresenting = !0,
                            i.dispatchEvent({
                                type: "sessionstart"
                            })
                    }
                }
            ;
            let A = new B
                , C = new B;
            function L(e, t) {
                null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix),
                    e.matrixWorldInverse.copy(e.matrixWorld).invert()
            }
            this.updateCamera = function(e) {
                if (null === r)
                    return;
                M.near = x.near = _.near = e.near,
                    M.far = x.far = _.far = e.far,
                (b !== M.near || S !== M.far) && (r.updateRenderState({
                    depthNear: M.near,
                    depthFar: M.far
                }),
                    b = M.near,
                    S = M.far);
                let t = e.parent
                    , i = M.cameras;
                L(M, t);
                for (let e = 0; e < i.length; e++)
                    L(i[e], t);
                M.matrixWorld.decompose(M.position, M.quaternion, M.scale),
                    e.position.copy(M.position),
                    e.quaternion.copy(M.quaternion),
                    e.scale.copy(M.scale),
                    e.matrix.copy(M.matrix),
                    e.matrixWorld.copy(M.matrixWorld);
                let a = e.children;
                for (let e = 0, t = a.length; e < t; e++)
                    a[e].updateMatrixWorld(!0);
                2 === i.length ? function(e, t, i) {
                    A.setFromMatrixPosition(t.matrixWorld),
                        C.setFromMatrixPosition(i.matrixWorld);
                    let r = A.distanceTo(C)
                        , a = t.projectionMatrix.elements
                        , n = i.projectionMatrix.elements
                        , s = a[14] / (a[10] - 1)
                        , o = a[14] / (a[10] + 1)
                        , l = (a[9] + 1) / a[5]
                        , h = (a[9] - 1) / a[5]
                        , c = (a[8] - 1) / a[0]
                        , d = (n[8] + 1) / n[0]
                        , u = r / (-c + d)
                        , p = -(u * c);
                    t.matrixWorld.decompose(e.position, e.quaternion, e.scale),
                        e.translateX(p),
                        e.translateZ(u),
                        e.matrixWorld.compose(e.position, e.quaternion, e.scale),
                        e.matrixWorldInverse.copy(e.matrixWorld).invert();
                    let f = s + u
                        , m = o + u;
                    e.projectionMatrix.makePerspective(s * c - p, s * d + (r - p), l * o / m * f, h * o / m * f, f, m)
                }(M, _, x) : M.projectionMatrix.copy(_.projectionMatrix)
            }
                ,
                this.getCamera = function() {
                    return M
                }
                ,
                this.getFoveation = function() {
                    return null !== c ? c.fixedFoveation : null !== d ? d.fixedFoveation : void 0
                }
                ,
                this.setFoveation = function(e) {
                    null !== c && (c.fixedFoveation = e),
                    null !== d && void 0 !== d.fixedFoveation && (d.fixedFoveation = e)
                }
            ;
            let P = null
                , R = new tG;
            R.setAnimationLoop(function(t, i) {
                if (l = i.getViewerPose(o || n),
                    u = i,
                null !== l) {
                    let t = l.views;
                    null !== d && (e.setRenderTargetFramebuffer(m, d.framebuffer),
                        e.setRenderTarget(m));
                    let i = !1;
                    t.length !== M.cameras.length && (M.cameras.length = 0,
                        i = !0);
                    for (let r = 0; r < t.length; r++) {
                        let a = t[r]
                            , n = null;
                        if (null !== d)
                            n = d.getViewport(a);
                        else {
                            let t = h.getViewSubImage(c, a);
                            n = t.viewport,
                            0 === r && (e.setRenderTargetTextures(m, t.colorTexture, c.ignoreDepthValues ? void 0 : t.depthStencilTexture),
                                e.setRenderTarget(m))
                        }
                        let s = y[r];
                        void 0 === s && ((s = new tR).layers.enable(r),
                            s.viewport = new z,
                            y[r] = s),
                            s.matrix.fromArray(a.transform.matrix),
                            s.projectionMatrix.fromArray(a.projectionMatrix),
                            s.viewport.set(n.x, n.y, n.width, n.height),
                        0 === r && M.matrix.copy(s.matrix),
                        !0 === i && M.cameras.push(s)
                    }
                }
                for (let e = 0; e < g.length; e++) {
                    let t = v[e]
                        , r = g[e];
                    null !== t && void 0 !== r && r.update(t, i, o || n)
                }
                P && P(t, i),
                    u = null
            }),
                this.setAnimationLoop = function(e) {
                    P = e
                }
                ,
                this.dispose = function() {}
        }
    }
    function n1(e, t) {
        function i(i, r) {
            let a, n;
            i.opacity.value = r.opacity,
            r.color && i.diffuse.value.copy(r.color),
            r.emissive && i.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),
            r.map && (i.map.value = r.map),
            r.alphaMap && (i.alphaMap.value = r.alphaMap),
            r.bumpMap && (i.bumpMap.value = r.bumpMap,
                i.bumpScale.value = r.bumpScale,
            1 === r.side && (i.bumpScale.value *= -1)),
            r.displacementMap && (i.displacementMap.value = r.displacementMap,
                i.displacementScale.value = r.displacementScale,
                i.displacementBias.value = r.displacementBias),
            r.emissiveMap && (i.emissiveMap.value = r.emissiveMap),
            r.normalMap && (i.normalMap.value = r.normalMap,
                i.normalScale.value.copy(r.normalScale),
            1 === r.side && i.normalScale.value.negate()),
            r.specularMap && (i.specularMap.value = r.specularMap),
            r.alphaTest > 0 && (i.alphaTest.value = r.alphaTest);
            let s = t.get(r).envMap;
            if (s && (i.envMap.value = s,
                i.flipEnvMap.value = s.isCubeTexture && !1 === s.isRenderTargetTexture ? -1 : 1,
                i.reflectivity.value = r.reflectivity,
                i.ior.value = r.ior,
                i.refractionRatio.value = r.refractionRatio),
                r.lightMap) {
                i.lightMap.value = r.lightMap;
                let t = !0 !== e.physicallyCorrectLights ? Math.PI : 1;
                i.lightMapIntensity.value = r.lightMapIntensity * t
            }
            r.aoMap && (i.aoMap.value = r.aoMap,
                i.aoMapIntensity.value = r.aoMapIntensity),
                r.map ? a = r.map : r.specularMap ? a = r.specularMap : r.displacementMap ? a = r.displacementMap : r.normalMap ? a = r.normalMap : r.bumpMap ? a = r.bumpMap : r.roughnessMap ? a = r.roughnessMap : r.metalnessMap ? a = r.metalnessMap : r.alphaMap ? a = r.alphaMap : r.emissiveMap ? a = r.emissiveMap : r.clearcoatMap ? a = r.clearcoatMap : r.clearcoatNormalMap ? a = r.clearcoatNormalMap : r.clearcoatRoughnessMap ? a = r.clearcoatRoughnessMap : r.iridescenceMap ? a = r.iridescenceMap : r.iridescenceThicknessMap ? a = r.iridescenceThicknessMap : r.specularIntensityMap ? a = r.specularIntensityMap : r.specularColorMap ? a = r.specularColorMap : r.transmissionMap ? a = r.transmissionMap : r.thicknessMap ? a = r.thicknessMap : r.sheenColorMap ? a = r.sheenColorMap : r.sheenRoughnessMap && (a = r.sheenRoughnessMap),
            void 0 !== a && (a.isWebGLRenderTarget && (a = a.texture),
            !0 === a.matrixAutoUpdate && a.updateMatrix(),
                i.uvTransform.value.copy(a.matrix)),
                r.aoMap ? n = r.aoMap : r.lightMap && (n = r.lightMap),
            void 0 !== n && (n.isWebGLRenderTarget && (n = n.texture),
            !0 === n.matrixAutoUpdate && n.updateMatrix(),
                i.uv2Transform.value.copy(n.matrix))
        }
        return {
            refreshFogUniforms: function(e, t) {
                e.fogColor.value.copy(t.color),
                    t.isFog ? (e.fogNear.value = t.near,
                        e.fogFar.value = t.far) : t.isFogExp2 && (e.fogDensity.value = t.density)
            },
            refreshMaterialUniforms: function(e, r, a, n, s) {
                var o, l, h, c, d, u, p, f, m;
                let g, v;
                r.isMeshBasicMaterial ? i(e, r) : r.isMeshLambertMaterial ? i(e, r) : r.isMeshToonMaterial ? (i(e, r),
                    o = e,
                r.gradientMap && (o.gradientMap.value = r.gradientMap)) : r.isMeshPhongMaterial ? (i(e, r),
                    (l = e).specular.value.copy(r.specular),
                    l.shininess.value = Math.max(r.shininess, 1e-4)) : r.isMeshStandardMaterial ? (i(e, r),
                    function(e, i) {
                        e.roughness.value = i.roughness,
                            e.metalness.value = i.metalness,
                        i.roughnessMap && (e.roughnessMap.value = i.roughnessMap),
                        i.metalnessMap && (e.metalnessMap.value = i.metalnessMap);
                        let r = t.get(i).envMap;
                        r && (e.envMapIntensity.value = i.envMapIntensity)
                    }(e, r),
                r.isMeshPhysicalMaterial && ((h = e).ior.value = r.ior,
                r.sheen > 0 && (h.sheenColor.value.copy(r.sheenColor).multiplyScalar(r.sheen),
                    h.sheenRoughness.value = r.sheenRoughness,
                r.sheenColorMap && (h.sheenColorMap.value = r.sheenColorMap),
                r.sheenRoughnessMap && (h.sheenRoughnessMap.value = r.sheenRoughnessMap)),
                r.clearcoat > 0 && (h.clearcoat.value = r.clearcoat,
                    h.clearcoatRoughness.value = r.clearcoatRoughness,
                r.clearcoatMap && (h.clearcoatMap.value = r.clearcoatMap),
                r.clearcoatRoughnessMap && (h.clearcoatRoughnessMap.value = r.clearcoatRoughnessMap),
                r.clearcoatNormalMap && (h.clearcoatNormalScale.value.copy(r.clearcoatNormalScale),
                    h.clearcoatNormalMap.value = r.clearcoatNormalMap,
                1 === r.side && h.clearcoatNormalScale.value.negate())),
                r.iridescence > 0 && (h.iridescence.value = r.iridescence,
                    h.iridescenceIOR.value = r.iridescenceIOR,
                    h.iridescenceThicknessMinimum.value = r.iridescenceThicknessRange[0],
                    h.iridescenceThicknessMaximum.value = r.iridescenceThicknessRange[1],
                r.iridescenceMap && (h.iridescenceMap.value = r.iridescenceMap),
                r.iridescenceThicknessMap && (h.iridescenceThicknessMap.value = r.iridescenceThicknessMap)),
                r.transmission > 0 && (h.transmission.value = r.transmission,
                    h.transmissionSamplerMap.value = s.texture,
                    h.transmissionSamplerSize.value.set(s.width, s.height),
                r.transmissionMap && (h.transmissionMap.value = r.transmissionMap),
                    h.thickness.value = r.thickness,
                r.thicknessMap && (h.thicknessMap.value = r.thicknessMap),
                    h.attenuationDistance.value = r.attenuationDistance,
                    h.attenuationColor.value.copy(r.attenuationColor)),
                    h.specularIntensity.value = r.specularIntensity,
                    h.specularColor.value.copy(r.specularColor),
                r.specularIntensityMap && (h.specularIntensityMap.value = r.specularIntensityMap),
                r.specularColorMap && (h.specularColorMap.value = r.specularColorMap))) : r.isMeshMatcapMaterial ? (i(e, r),
                    c = e,
                r.matcap && (c.matcap.value = r.matcap)) : r.isMeshDepthMaterial ? i(e, r) : r.isMeshDistanceMaterial ? (i(e, r),
                    (d = e).referencePosition.value.copy(r.referencePosition),
                    d.nearDistance.value = r.nearDistance,
                    d.farDistance.value = r.farDistance) : r.isMeshNormalMaterial ? i(e, r) : r.isLineBasicMaterial ? ((u = e).diffuse.value.copy(r.color),
                    u.opacity.value = r.opacity,
                r.isLineDashedMaterial && ((p = e).dashSize.value = r.dashSize,
                    p.totalSize.value = r.dashSize + r.gapSize,
                    p.scale.value = r.scale)) : r.isPointsMaterial ? ((f = e).diffuse.value.copy(r.color),
                    f.opacity.value = r.opacity,
                    f.size.value = r.size * a,
                    f.scale.value = .5 * n,
                r.map && (f.map.value = r.map),
                r.alphaMap && (f.alphaMap.value = r.alphaMap),
                r.alphaTest > 0 && (f.alphaTest.value = r.alphaTest),
                    r.map ? g = r.map : r.alphaMap && (g = r.alphaMap),
                void 0 !== g && (!0 === g.matrixAutoUpdate && g.updateMatrix(),
                    f.uvTransform.value.copy(g.matrix))) : r.isSpriteMaterial ? ((m = e).diffuse.value.copy(r.color),
                    m.opacity.value = r.opacity,
                    m.rotation.value = r.rotation,
                r.map && (m.map.value = r.map),
                r.alphaMap && (m.alphaMap.value = r.alphaMap),
                r.alphaTest > 0 && (m.alphaTest.value = r.alphaTest),
                    r.map ? v = r.map : r.alphaMap && (v = r.alphaMap),
                void 0 !== v && (!0 === v.matrixAutoUpdate && v.updateMatrix(),
                    m.uvTransform.value.copy(v.matrix))) : r.isShadowMaterial ? (e.color.value.copy(r.color),
                    e.opacity.value = r.opacity) : r.isShaderMaterial && (r.uniformsNeedUpdate = !1)
            }
        }
    }
    function n3(e={}) {
        let t, i, r, a, n, s, o, l, h, c, d, u, p, f, v, _, y, M, b, S, w, T, E, A;
        this.isWebGLRenderer = !0;
        let C = void 0 !== e.canvas ? e.canvas : function() {
            let e = x("canvas");
            return e.style.display = "block",
                e
        }()
            , L = void 0 !== e.context ? e.context : null
            , P = void 0 === e.depth || e.depth
            , R = void 0 === e.stencil || e.stencil
            , D = void 0 !== e.antialias && e.antialias
            , I = void 0 === e.premultipliedAlpha || e.premultipliedAlpha
            , N = void 0 !== e.preserveDrawingBuffer && e.preserveDrawingBuffer
            , O = void 0 !== e.powerPreference ? e.powerPreference : "default"
            , F = void 0 !== e.failIfMajorPerformanceCaveat && e.failIfMajorPerformanceCaveat;
        t = null !== L ? L.getContextAttributes().alpha : void 0 !== e.alpha && e.alpha;
        let k = null
            , H = null
            , G = []
            , V = [];
        this.domElement = C,
            this.debug = {
                checkShaderErrors: !0
            },
            this.autoClear = !0,
            this.autoClearColor = !0,
            this.autoClearDepth = !0,
            this.autoClearStencil = !0,
            this.sortObjects = !0,
            this.clippingPlanes = [],
            this.localClippingEnabled = !1,
            this.outputEncoding = 3e3,
            this.physicallyCorrectLights = !1,
            this.toneMapping = 0,
            this.toneMappingExposure = 1,
            Object.defineProperties(this, {
                gammaFactor: {
                    get: function() {
                        return console.warn("THREE.WebGLRenderer: .gammaFactor has been removed."),
                            2
                    },
                    set: function() {
                        console.warn("THREE.WebGLRenderer: .gammaFactor has been removed.")
                    }
                }
            });
        let W = this
            , j = !1
            , q = 0
            , X = 0
            , Y = null
            , Z = -1
            , J = null
            , K = new z
            , Q = new z
            , $ = null
            , ee = C.width
            , et = C.height
            , ei = 1
            , er = null
            , ea = null
            , en = new z(0,0,ee,et)
            , es = new z(0,0,ee,et)
            , eo = !1
            , el = new tH
            , eh = !1
            , ec = !1
            , ed = null
            , eu = new eg
            , ep = new g
            , ef = new B
            , em = {
            background: null,
            fog: null,
            environment: null,
            overrideMaterial: null,
            isScene: !0
        };
        function ev() {
            return null === Y ? ei : 1
        }
        let e_ = L;
        function ex(e, t) {
            for (let i = 0; i < e.length; i++) {
                let r = e[i]
                    , a = C.getContext(r, t);
                if (null !== a)
                    return a
            }
            return null
        }
        try {
            if ("setAttribute"in C && C.setAttribute("data-engine", "three.js r142"),
                C.addEventListener("webglcontextlost", eb, !1),
                C.addEventListener("webglcontextrestored", eS, !1),
                C.addEventListener("webglcontextcreationerror", ew, !1),
            null === e_) {
                let e = ["webgl2", "webgl", "experimental-webgl"];
                if (!0 === W.isWebGL1Renderer && e.shift(),
                    e_ = ex(e, {
                        alpha: !0,
                        depth: P,
                        stencil: R,
                        antialias: D,
                        premultipliedAlpha: I,
                        preserveDrawingBuffer: N,
                        powerPreference: O,
                        failIfMajorPerformanceCaveat: F
                    }),
                null === e_) {
                    if (ex(e))
                        throw Error("Error creating WebGL context with your selected attributes.");
                    throw Error("Error creating WebGL context.")
                }
            }
            void 0 === e_.getShaderPrecisionFormat && (e_.getShaderPrecisionFormat = function() {
                    return {
                        rangeMin: 1,
                        rangeMax: 1,
                        precision: 1
                    }
                }
            )
        } catch (e) {
            throw console.error("THREE.WebGLRenderer: " + e.message),
                e
        }
        function ey() {
            i = new ah(e_),
                r = new r1(e_,i,e),
                i.init(r),
                E = new nY(e_,i,r),
                a = new nq(e_,i,r),
                n = new au,
                s = new nR,
                o = new nX(e_,i,a,s,r,E,n),
                l = new r2(W),
                h = new al(W),
                c = new tV(e_,r),
                A = new r$(e_,i,c,r),
                d = new ac(e_,c,n,A),
                u = new av(e_,d,c,n),
                S = new ag(e_,r,o),
                y = new r3(s),
                p = new nP(W,l,h,i,r,A,y),
                f = new n1(W,s),
                v = new nO,
                _ = new nH(i,r),
                b = new rQ(W,l,a,u,t,I),
                M = new nj(W,u,r),
                w = new r0(e_,i,n,r),
                T = new ad(e_,i,n,r),
                n.programs = p.programs,
                W.capabilities = r,
                W.extensions = i,
                W.properties = s,
                W.renderLists = v,
                W.shadowMap = M,
                W.state = a,
                W.info = n
        }
        ey();
        let eM = new n0(W,e_);
        function eb(e) {
            e.preventDefault(),
                console.log("THREE.WebGLRenderer: Context Lost."),
                j = !0
        }
        function eS() {
            console.log("THREE.WebGLRenderer: Context Restored."),
                j = !1;
            let e = n.autoReset
                , t = M.enabled
                , i = M.autoUpdate
                , r = M.needsUpdate
                , a = M.type;
            ey(),
                n.autoReset = e,
                M.enabled = t,
                M.autoUpdate = i,
                M.needsUpdate = r,
                M.type = a
        }
        function ew(e) {
            console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage)
        }
        function eT(e) {
            let t = e.target;
            t.removeEventListener("dispose", eT),
                function(e) {
                    let t = s.get(e).programs;
                    void 0 !== t && (t.forEach(function(e) {
                        p.releaseProgram(e)
                    }),
                    e.isShaderMaterial && p.releaseShaderCache(e))
                }(t),
                s.remove(t)
        }
        this.xr = eM,
            this.getContext = function() {
                return e_
            }
            ,
            this.getContextAttributes = function() {
                return e_.getContextAttributes()
            }
            ,
            this.forceContextLoss = function() {
                let e = i.get("WEBGL_lose_context");
                e && e.loseContext()
            }
            ,
            this.forceContextRestore = function() {
                let e = i.get("WEBGL_lose_context");
                e && e.restoreContext()
            }
            ,
            this.getPixelRatio = function() {
                return ei
            }
            ,
            this.setPixelRatio = function(e) {
                void 0 !== e && (ei = e,
                    this.setSize(ee, et, !1))
            }
            ,
            this.getSize = function(e) {
                return e.set(ee, et)
            }
            ,
            this.setSize = function(e, t, i) {
                if (eM.isPresenting) {
                    console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
                    return
                }
                ee = e,
                    et = t,
                    C.width = Math.floor(e * ei),
                    C.height = Math.floor(t * ei),
                !1 !== i && (C.style.width = e + "px",
                    C.style.height = t + "px"),
                    this.setViewport(0, 0, e, t)
            }
            ,
            this.getDrawingBufferSize = function(e) {
                return e.set(ee * ei, et * ei).floor()
            }
            ,
            this.setDrawingBufferSize = function(e, t, i) {
                ee = e,
                    et = t,
                    ei = i,
                    C.width = Math.floor(e * i),
                    C.height = Math.floor(t * i),
                    this.setViewport(0, 0, e, t)
            }
            ,
            this.getCurrentViewport = function(e) {
                return e.copy(K)
            }
            ,
            this.getViewport = function(e) {
                return e.copy(en)
            }
            ,
            this.setViewport = function(e, t, i, r) {
                e.isVector4 ? en.set(e.x, e.y, e.z, e.w) : en.set(e, t, i, r),
                    a.viewport(K.copy(en).multiplyScalar(ei).floor())
            }
            ,
            this.getScissor = function(e) {
                return e.copy(es)
            }
            ,
            this.setScissor = function(e, t, i, r) {
                e.isVector4 ? es.set(e.x, e.y, e.z, e.w) : es.set(e, t, i, r),
                    a.scissor(Q.copy(es).multiplyScalar(ei).floor())
            }
            ,
            this.getScissorTest = function() {
                return eo
            }
            ,
            this.setScissorTest = function(e) {
                a.setScissorTest(eo = e)
            }
            ,
            this.setOpaqueSort = function(e) {
                er = e
            }
            ,
            this.setTransparentSort = function(e) {
                ea = e
            }
            ,
            this.getClearColor = function(e) {
                return e.copy(b.getClearColor())
            }
            ,
            this.setClearColor = function() {
                b.setClearColor.apply(b, arguments)
            }
            ,
            this.getClearAlpha = function() {
                return b.getClearAlpha()
            }
            ,
            this.setClearAlpha = function() {
                b.setClearAlpha.apply(b, arguments)
            }
            ,
            this.clear = function(e=!0, t=!0, i=!0) {
                let r = 0;
                e && (r |= 16384),
                t && (r |= 256),
                i && (r |= 1024),
                    e_.clear(r)
            }
            ,
            this.clearColor = function() {
                this.clear(!0, !1, !1)
            }
            ,
            this.clearDepth = function() {
                this.clear(!1, !0, !1)
            }
            ,
            this.clearStencil = function() {
                this.clear(!1, !1, !0)
            }
            ,
            this.dispose = function() {
                C.removeEventListener("webglcontextlost", eb, !1),
                    C.removeEventListener("webglcontextrestored", eS, !1),
                    C.removeEventListener("webglcontextcreationerror", ew, !1),
                    v.dispose(),
                    _.dispose(),
                    s.dispose(),
                    l.dispose(),
                    h.dispose(),
                    u.dispose(),
                    A.dispose(),
                    p.dispose(),
                    eM.dispose(),
                    eM.removeEventListener("sessionstart", eA),
                    eM.removeEventListener("sessionend", eC),
                ed && (ed.dispose(),
                    ed = null),
                    eL.stop()
            }
            ,
            this.renderBufferDirect = function(e, t, i, n, u, p) {
                let m;
                null === t && (t = em);
                let g = u.isMesh && 0 > u.matrixWorld.determinant()
                    , v = function(e, t, i, n, c) {
                    var d, u;
                    !0 !== t.isScene && (t = em),
                        o.resetTextureUnits();
                    let p = t.fog
                        , m = n.isMeshStandardMaterial ? t.environment : null
                        , g = null === Y ? W.outputEncoding : !0 === Y.isXRRenderTarget ? Y.texture.encoding : 3e3
                        , v = (n.isMeshStandardMaterial ? h : l).get(n.envMap || m)
                        , _ = !0 === n.vertexColors && !!i.attributes.color && 4 === i.attributes.color.itemSize
                        , x = !!n.normalMap && !!i.attributes.tangent
                        , M = !!i.morphAttributes.position
                        , b = !!i.morphAttributes.normal
                        , w = !!i.morphAttributes.color
                        , T = n.toneMapped ? W.toneMapping : 0
                        , E = i.morphAttributes.position || i.morphAttributes.normal || i.morphAttributes.color
                        , A = void 0 !== E ? E.length : 0
                        , C = s.get(n)
                        , L = H.state.lights;
                    if (!0 === eh && (!0 === ec || e !== J)) {
                        let t = e === J && n.id === Z;
                        y.setState(n, e, t)
                    }
                    let P = !1;
                    n.version === C.__version ? C.needsLights && C.lightsStateVersion !== L.state.version ? P = !0 : C.outputEncoding !== g ? P = !0 : c.isInstancedMesh && !1 === C.instancing ? P = !0 : c.isInstancedMesh || !0 !== C.instancing ? c.isSkinnedMesh && !1 === C.skinning ? P = !0 : c.isSkinnedMesh || !0 !== C.skinning ? C.envMap !== v ? P = !0 : !0 === n.fog && C.fog !== p ? P = !0 : void 0 !== C.numClippingPlanes && (C.numClippingPlanes !== y.numPlanes || C.numIntersection !== y.numIntersection) ? P = !0 : C.vertexAlphas !== _ ? P = !0 : C.vertexTangents !== x ? P = !0 : C.morphTargets !== M ? P = !0 : C.morphNormals !== b ? P = !0 : C.morphColors !== w ? P = !0 : C.toneMapping !== T ? P = !0 : !0 === r.isWebGL2 && C.morphTargetsCount !== A && (P = !0) : P = !0 : P = !0 : (P = !0,
                        C.__version = n.version);
                    let R = C.currentProgram;
                    !0 === P && (R = eD(n, t, c));
                    let D = !1
                        , I = !1
                        , N = !1
                        , O = R.getUniforms()
                        , z = C.uniforms;
                    if (a.useProgram(R.program) && (D = !0,
                        I = !0,
                        N = !0),
                    n.id !== Z && (Z = n.id,
                        I = !0),
                    D || J !== e) {
                        if (O.setValue(e_, "projectionMatrix", e.projectionMatrix),
                        r.logarithmicDepthBuffer && O.setValue(e_, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)),
                        J !== e && (J = e,
                            I = !0,
                            N = !0),
                        n.isShaderMaterial || n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshStandardMaterial || n.envMap) {
                            let t = O.map.cameraPosition;
                            void 0 !== t && t.setValue(e_, ef.setFromMatrixPosition(e.matrixWorld))
                        }
                        (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial) && O.setValue(e_, "isOrthographic", !0 === e.isOrthographicCamera),
                        (n.isMeshPhongMaterial || n.isMeshToonMaterial || n.isMeshLambertMaterial || n.isMeshBasicMaterial || n.isMeshStandardMaterial || n.isShaderMaterial || n.isShadowMaterial || c.isSkinnedMesh) && O.setValue(e_, "viewMatrix", e.matrixWorldInverse)
                    }
                    if (c.isSkinnedMesh) {
                        O.setOptional(e_, c, "bindMatrix"),
                            O.setOptional(e_, c, "bindMatrixInverse");
                        let e = c.skeleton;
                        e && (r.floatVertexTextures ? (null === e.boneTexture && e.computeBoneTexture(),
                            O.setValue(e_, "boneTexture", e.boneTexture, o),
                            O.setValue(e_, "boneTextureSize", e.boneTextureSize)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))
                    }
                    let U = i.morphAttributes;
                    return (void 0 !== U.position || void 0 !== U.normal || void 0 !== U.color && !0 === r.isWebGL2) && S.update(c, i, n, R),
                    (I || C.receiveShadow !== c.receiveShadow) && (C.receiveShadow = c.receiveShadow,
                        O.setValue(e_, "receiveShadow", c.receiveShadow)),
                    I && (O.setValue(e_, "toneMappingExposure", W.toneMappingExposure),
                    C.needsLights && (d = z,
                        u = N,
                        d.ambientLightColor.needsUpdate = u,
                        d.lightProbe.needsUpdate = u,
                        d.directionalLights.needsUpdate = u,
                        d.directionalLightShadows.needsUpdate = u,
                        d.pointLights.needsUpdate = u,
                        d.pointLightShadows.needsUpdate = u,
                        d.spotLights.needsUpdate = u,
                        d.spotLightShadows.needsUpdate = u,
                        d.rectAreaLights.needsUpdate = u,
                        d.hemisphereLights.needsUpdate = u),
                    p && !0 === n.fog && f.refreshFogUniforms(z, p),
                        f.refreshMaterialUniforms(z, n, ei, et, ed),
                        nc.upload(e_, C.uniformsList, z, o)),
                    n.isShaderMaterial && !0 === n.uniformsNeedUpdate && (nc.upload(e_, C.uniformsList, z, o),
                        n.uniformsNeedUpdate = !1),
                    n.isSpriteMaterial && O.setValue(e_, "center", c.center),
                        O.setValue(e_, "modelViewMatrix", c.modelViewMatrix),
                        O.setValue(e_, "normalMatrix", c.normalMatrix),
                        O.setValue(e_, "modelMatrix", c.matrixWorld),
                        R
                }(e, t, i, n, u);
                a.setMaterial(n, g);
                let _ = i.index
                    , x = i.attributes.position;
                if (null === _) {
                    if (void 0 === x || 0 === x.count)
                        return
                } else if (0 === _.count)
                    return;
                let M = 1;
                !0 === n.wireframe && (_ = d.getWireframeAttribute(i),
                    M = 2),
                    A.setup(u, n, v, i, _);
                let b = w;
                null !== _ && (m = c.get(_),
                    (b = T).setIndex(m));
                let E = null !== _ ? _.count : x.count
                    , C = i.drawRange.start * M
                    , L = i.drawRange.count * M
                    , P = null !== p ? p.start * M : 0
                    , R = null !== p ? p.count * M : 1 / 0
                    , D = Math.max(C, P)
                    , I = Math.max(0, Math.min(E, C + L, P + R) - 1 - D + 1);
                if (0 !== I) {
                    if (u.isMesh)
                        !0 === n.wireframe ? (a.setLineWidth(n.wireframeLinewidth * ev()),
                            b.setMode(1)) : b.setMode(4);
                    else if (u.isLine) {
                        let e = n.linewidth;
                        void 0 === e && (e = 1),
                            a.setLineWidth(e * ev()),
                            u.isLineSegments ? b.setMode(1) : u.isLineLoop ? b.setMode(2) : b.setMode(3)
                    } else
                        u.isPoints ? b.setMode(0) : u.isSprite && b.setMode(4);
                    if (u.isInstancedMesh)
                        b.renderInstances(D, I, u.count);
                    else if (i.isInstancedBufferGeometry) {
                        let e = Math.min(i.instanceCount, i._maxInstanceCount);
                        b.renderInstances(D, I, e)
                    } else
                        b.render(D, I)
                }
            }
            ,
            this.compile = function(e, t) {
                (H = _.get(e)).init(),
                    V.push(H),
                    e.traverseVisible(function(e) {
                        e.isLight && e.layers.test(t.layers) && (H.pushLight(e),
                        e.castShadow && H.pushShadow(e))
                    }),
                    H.setupLights(W.physicallyCorrectLights),
                    e.traverse(function(t) {
                        let i = t.material;
                        if (i) {
                            if (Array.isArray(i))
                                for (let r = 0; r < i.length; r++) {
                                    let a = i[r];
                                    eD(a, e, t)
                                }
                            else
                                eD(i, e, t)
                        }
                    }),
                    V.pop(),
                    H = null
            }
        ;
        let eE = null;
        function eA() {
            eL.stop()
        }
        function eC() {
            eL.start()
        }
        let eL = new tG;
        function eP(e, t, n, s) {
            let l = e.opaque
                , h = e.transmissive
                , c = e.transparent;
            H.setupLightsView(n),
            h.length > 0 && function(e, t, a) {
                let n = r.isWebGL2;
                null === ed && (ed = new U(1,1,{
                    generateMipmaps: !0,
                    type: i.has("EXT_color_buffer_half_float") ? 1016 : 1009,
                    minFilter: 1008,
                    samples: n && !0 === D ? 4 : 0
                })),
                    W.getDrawingBufferSize(ep),
                    n ? ed.setSize(ep.x, ep.y) : ed.setSize(m(ep.x), m(ep.y));
                let s = W.getRenderTarget();
                W.setRenderTarget(ed),
                    W.clear();
                let l = W.toneMapping;
                W.toneMapping = 0,
                    eR(e, t, a),
                    W.toneMapping = l,
                    o.updateMultisampleRenderTarget(ed),
                    o.updateRenderTargetMipmap(ed),
                    W.setRenderTarget(s)
            }(l, t, n),
            s && a.viewport(K.copy(s)),
            l.length > 0 && eR(l, t, n),
            h.length > 0 && eR(h, t, n),
            c.length > 0 && eR(c, t, n),
                a.buffers.depth.setTest(!0),
                a.buffers.depth.setMask(!0),
                a.buffers.color.setMask(!0),
                a.setPolygonOffset(!1)
        }
        function eR(e, t, i) {
            let r = !0 === t.isScene ? t.overrideMaterial : null;
            for (let n = 0, s = e.length; n < s; n++) {
                var a;
                let s = e[n]
                    , o = s.object
                    , l = s.geometry
                    , h = null === r ? s.material : r
                    , c = s.group;
                o.layers.test(i.layers) && (a = h,
                    o.onBeforeRender(W, t, i, l, a, c),
                    o.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, o.matrixWorld),
                    o.normalMatrix.getNormalMatrix(o.modelViewMatrix),
                    a.onBeforeRender(W, t, i, l, o, c),
                    !0 === a.transparent && 2 === a.side ? (a.side = 1,
                        a.needsUpdate = !0,
                        W.renderBufferDirect(i, t, l, a, o, c),
                        a.side = 0,
                        a.needsUpdate = !0,
                        W.renderBufferDirect(i, t, l, a, o, c),
                        a.side = 2) : W.renderBufferDirect(i, t, l, a, o, c),
                    o.onAfterRender(W, t, i, l, a, c))
            }
        }
        function eD(e, t, i) {
            !0 !== t.isScene && (t = em);
            let r = s.get(e)
                , a = H.state.lights
                , n = H.state.shadowsArray
                , o = a.state.version
                , c = p.getParameters(e, a.state, n, t, i)
                , d = p.getProgramCacheKey(c)
                , u = r.programs;
            r.environment = e.isMeshStandardMaterial ? t.environment : null,
                r.fog = t.fog,
                r.envMap = (e.isMeshStandardMaterial ? h : l).get(e.envMap || r.environment),
            void 0 === u && (e.addEventListener("dispose", eT),
                u = new Map,
                r.programs = u);
            let f = u.get(d);
            if (void 0 !== f) {
                if (r.currentProgram === f && r.lightsStateVersion === o)
                    return eI(e, c),
                        f
            } else
                c.uniforms = p.getUniforms(e),
                    e.onBuild(i, c, W),
                    e.onBeforeCompile(c, W),
                    f = p.acquireProgram(c, d),
                    u.set(d, f),
                    r.uniforms = c.uniforms;
            let m = r.uniforms;
            (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (m.clippingPlanes = y.uniform),
                eI(e, c),
                r.needsLights = e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights,
                r.lightsStateVersion = o,
            r.needsLights && (m.ambientLightColor.value = a.state.ambient,
                m.lightProbe.value = a.state.probe,
                m.directionalLights.value = a.state.directional,
                m.directionalLightShadows.value = a.state.directionalShadow,
                m.spotLights.value = a.state.spot,
                m.spotLightShadows.value = a.state.spotShadow,
                m.rectAreaLights.value = a.state.rectArea,
                m.ltc_1.value = a.state.rectAreaLTC1,
                m.ltc_2.value = a.state.rectAreaLTC2,
                m.pointLights.value = a.state.point,
                m.pointLightShadows.value = a.state.pointShadow,
                m.hemisphereLights.value = a.state.hemi,
                m.directionalShadowMap.value = a.state.directionalShadowMap,
                m.directionalShadowMatrix.value = a.state.directionalShadowMatrix,
                m.spotShadowMap.value = a.state.spotShadowMap,
                m.spotShadowMatrix.value = a.state.spotShadowMatrix,
                m.pointShadowMap.value = a.state.pointShadowMap,
                m.pointShadowMatrix.value = a.state.pointShadowMatrix);
            let g = f.getUniforms()
                , v = nc.seqWithValue(g.seq, m);
            return r.currentProgram = f,
                r.uniformsList = v,
                f
        }
        function eI(e, t) {
            let i = s.get(e);
            i.outputEncoding = t.outputEncoding,
                i.instancing = t.instancing,
                i.skinning = t.skinning,
                i.morphTargets = t.morphTargets,
                i.morphNormals = t.morphNormals,
                i.morphColors = t.morphColors,
                i.morphTargetsCount = t.morphTargetsCount,
                i.numClippingPlanes = t.numClippingPlanes,
                i.numIntersection = t.numClipIntersection,
                i.vertexAlphas = t.vertexAlphas,
                i.vertexTangents = t.vertexTangents,
                i.toneMapping = t.toneMapping
        }
        eL.setAnimationLoop(function(e) {
            eE && eE(e)
        }),
        "undefined" != typeof self && eL.setContext(self),
            this.setAnimationLoop = function(e) {
                eE = e,
                    eM.setAnimationLoop(e),
                    null === e ? eL.stop() : eL.start()
            }
            ,
            eM.addEventListener("sessionstart", eA),
            eM.addEventListener("sessionend", eC),
            this.render = function(e, t) {
                if (void 0 !== t && !0 !== t.isCamera) {
                    console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
                    return
                }
                if (!0 === j)
                    return;
                !0 === e.autoUpdate && e.updateMatrixWorld(),
                null === t.parent && t.updateMatrixWorld(),
                !0 === eM.enabled && !0 === eM.isPresenting && (!0 === eM.cameraAutoUpdate && eM.updateCamera(t),
                    t = eM.getCamera()),
                !0 === e.isScene && e.onBeforeRender(W, e, t, Y),
                    (H = _.get(e, V.length)).init(),
                    V.push(H),
                    eu.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
                    el.setFromProjectionMatrix(eu),
                    ec = this.localClippingEnabled,
                    eh = y.init(this.clippingPlanes, ec, t),
                    (k = v.get(e, G.length)).init(),
                    G.push(k),
                    function e(t, i, r, a) {
                        if (!1 === t.visible)
                            return;
                        let s = t.layers.test(i.layers);
                        if (s) {
                            if (t.isGroup)
                                r = t.renderOrder;
                            else if (t.isLOD)
                                !0 === t.autoUpdate && t.update(i);
                            else if (t.isLight)
                                H.pushLight(t),
                                t.castShadow && H.pushShadow(t);
                            else if (t.isSprite) {
                                if (!t.frustumCulled || el.intersectsSprite(t)) {
                                    a && ef.setFromMatrixPosition(t.matrixWorld).applyMatrix4(eu);
                                    let e = u.update(t)
                                        , i = t.material;
                                    i.visible && k.push(t, e, i, r, ef.z, null)
                                }
                            } else if ((t.isMesh || t.isLine || t.isPoints) && (t.isSkinnedMesh && t.skeleton.frame !== n.render.frame && (t.skeleton.update(),
                                t.skeleton.frame = n.render.frame),
                            !t.frustumCulled || el.intersectsObject(t))) {
                                a && ef.setFromMatrixPosition(t.matrixWorld).applyMatrix4(eu);
                                let e = u.update(t)
                                    , i = t.material;
                                if (Array.isArray(i)) {
                                    let a = e.groups;
                                    for (let n = 0, s = a.length; n < s; n++) {
                                        let s = a[n]
                                            , o = i[s.materialIndex];
                                        o && o.visible && k.push(t, e, o, r, ef.z, s)
                                    }
                                } else
                                    i.visible && k.push(t, e, i, r, ef.z, null)
                            }
                        }
                        let o = t.children;
                        for (let t = 0, n = o.length; t < n; t++)
                            e(o[t], i, r, a)
                    }(e, t, 0, W.sortObjects),
                    k.finish(),
                !0 === W.sortObjects && k.sort(er, ea),
                !0 === eh && y.beginShadows();
                let i = H.state.shadowsArray;
                if (M.render(i, e, t),
                !0 === eh && y.endShadows(),
                !0 === this.info.autoReset && this.info.reset(),
                    b.render(k, e),
                    H.setupLights(W.physicallyCorrectLights),
                    t.isArrayCamera) {
                    let i = t.cameras;
                    for (let t = 0, r = i.length; t < r; t++) {
                        let r = i[t];
                        eP(k, e, r, r.viewport)
                    }
                } else
                    eP(k, e, t);
                null !== Y && (o.updateMultisampleRenderTarget(Y),
                    o.updateRenderTargetMipmap(Y)),
                !0 === e.isScene && e.onAfterRender(W, e, t),
                    A.resetDefaultState(),
                    Z = -1,
                    J = null,
                    V.pop(),
                    H = V.length > 0 ? V[V.length - 1] : null,
                    G.pop(),
                    k = G.length > 0 ? G[G.length - 1] : null
            }
            ,
            this.getActiveCubeFace = function() {
                return q
            }
            ,
            this.getActiveMipmapLevel = function() {
                return X
            }
            ,
            this.getRenderTarget = function() {
                return Y
            }
            ,
            this.setRenderTargetTextures = function(e, t, r) {
                s.get(e.texture).__webglTexture = t,
                    s.get(e.depthTexture).__webglTexture = r;
                let a = s.get(e);
                a.__hasExternalTextures = !0,
                a.__hasExternalTextures && (a.__autoAllocateDepthBuffer = void 0 === r,
                a.__autoAllocateDepthBuffer || !0 !== i.has("WEBGL_multisampled_render_to_texture") || (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),
                    a.__useRenderToTexture = !1))
            }
            ,
            this.setRenderTargetFramebuffer = function(e, t) {
                let i = s.get(e);
                i.__webglFramebuffer = t,
                    i.__useDefaultFramebuffer = void 0 === t
            }
            ,
            this.setRenderTarget = function(e, t=0, i=0) {
                Y = e,
                    q = t,
                    X = i;
                let n = !0;
                if (e) {
                    let t = s.get(e);
                    void 0 !== t.__useDefaultFramebuffer ? (a.bindFramebuffer(36160, null),
                        n = !1) : void 0 === t.__webglFramebuffer ? o.setupRenderTarget(e) : t.__hasExternalTextures && o.rebindTextures(e, s.get(e.texture).__webglTexture, s.get(e.depthTexture).__webglTexture)
                }
                let l = null
                    , h = !1
                    , c = !1;
                if (e) {
                    let i = e.texture;
                    (i.isData3DTexture || i.isDataArrayTexture) && (c = !0);
                    let a = s.get(e).__webglFramebuffer;
                    e.isWebGLCubeRenderTarget ? (l = a[t],
                        h = !0) : l = r.isWebGL2 && e.samples > 0 && !1 === o.useMultisampledRTT(e) ? s.get(e).__webglMultisampledFramebuffer : a,
                        K.copy(e.viewport),
                        Q.copy(e.scissor),
                        $ = e.scissorTest
                } else
                    K.copy(en).multiplyScalar(ei).floor(),
                        Q.copy(es).multiplyScalar(ei).floor(),
                        $ = eo;
                let d = a.bindFramebuffer(36160, l);
                if (d && r.drawBuffers && n && a.drawBuffers(e, l),
                    a.viewport(K),
                    a.scissor(Q),
                    a.setScissorTest($),
                    h) {
                    let r = s.get(e.texture);
                    e_.framebufferTexture2D(36160, 36064, 34069 + t, r.__webglTexture, i)
                } else if (c) {
                    let r = s.get(e.texture);
                    e_.framebufferTextureLayer(36160, 36064, r.__webglTexture, i || 0, t || 0)
                }
                Z = -1
            }
            ,
            this.readRenderTargetPixels = function(e, t, n, o, l, h, c) {
                if (!(e && e.isWebGLRenderTarget)) {
                    console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                    return
                }
                let d = s.get(e).__webglFramebuffer;
                if (e.isWebGLCubeRenderTarget && void 0 !== c && (d = d[c]),
                    d) {
                    a.bindFramebuffer(36160, d);
                    try {
                        let a = e.texture
                            , s = a.format
                            , c = a.type;
                        if (1023 !== s && E.convert(s) !== e_.getParameter(35739)) {
                            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
                            return
                        }
                        let d = 1016 === c && (i.has("EXT_color_buffer_half_float") || r.isWebGL2 && i.has("EXT_color_buffer_float"));
                        if (1009 !== c && E.convert(c) !== e_.getParameter(35738) && !(1015 === c && (r.isWebGL2 || i.has("OES_texture_float") || i.has("WEBGL_color_buffer_float"))) && !d) {
                            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
                            return
                        }
                        t >= 0 && t <= e.width - o && n >= 0 && n <= e.height - l && e_.readPixels(t, n, o, l, E.convert(s), E.convert(c), h)
                    } finally {
                        let e = null !== Y ? s.get(Y).__webglFramebuffer : null;
                        a.bindFramebuffer(36160, e)
                    }
                }
            }
            ,
            this.copyFramebufferToTexture = function(e, t, i=0) {
                let r = Math.pow(2, -i)
                    , n = Math.floor(t.image.width * r)
                    , s = Math.floor(t.image.height * r);
                o.setTexture2D(t, 0),
                    e_.copyTexSubImage2D(3553, i, 0, 0, e.x, e.y, n, s),
                    a.unbindTexture()
            }
            ,
            this.copyTextureToTexture = function(e, t, i, r=0) {
                let n = t.image.width
                    , s = t.image.height
                    , l = E.convert(i.format)
                    , h = E.convert(i.type);
                o.setTexture2D(i, 0),
                    e_.pixelStorei(37440, i.flipY),
                    e_.pixelStorei(37441, i.premultiplyAlpha),
                    e_.pixelStorei(3317, i.unpackAlignment),
                    t.isDataTexture ? e_.texSubImage2D(3553, r, e.x, e.y, n, s, l, h, t.image.data) : t.isCompressedTexture ? e_.compressedTexSubImage2D(3553, r, e.x, e.y, t.mipmaps[0].width, t.mipmaps[0].height, l, t.mipmaps[0].data) : e_.texSubImage2D(3553, r, e.x, e.y, l, h, t.image),
                0 === r && i.generateMipmaps && e_.generateMipmap(3553),
                    a.unbindTexture()
            }
            ,
            this.copyTextureToTexture3D = function(e, t, i, r, n=0) {
                let s;
                if (W.isWebGL1Renderer) {
                    console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
                    return
                }
                let l = e.max.x - e.min.x + 1
                    , h = e.max.y - e.min.y + 1
                    , c = e.max.z - e.min.z + 1
                    , d = E.convert(r.format)
                    , u = E.convert(r.type);
                if (r.isData3DTexture)
                    o.setTexture3D(r, 0),
                        s = 32879;
                else if (r.isDataArrayTexture)
                    o.setTexture2DArray(r, 0),
                        s = 35866;
                else {
                    console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
                    return
                }
                e_.pixelStorei(37440, r.flipY),
                    e_.pixelStorei(37441, r.premultiplyAlpha),
                    e_.pixelStorei(3317, r.unpackAlignment);
                let p = e_.getParameter(3314)
                    , f = e_.getParameter(32878)
                    , m = e_.getParameter(3316)
                    , g = e_.getParameter(3315)
                    , v = e_.getParameter(32877)
                    , _ = i.isCompressedTexture ? i.mipmaps[0] : i.image;
                e_.pixelStorei(3314, _.width),
                    e_.pixelStorei(32878, _.height),
                    e_.pixelStorei(3316, e.min.x),
                    e_.pixelStorei(3315, e.min.y),
                    e_.pixelStorei(32877, e.min.z),
                    i.isDataTexture || i.isData3DTexture ? e_.texSubImage3D(s, n, t.x, t.y, t.z, l, h, c, d, u, _.data) : i.isCompressedTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),
                        e_.compressedTexSubImage3D(s, n, t.x, t.y, t.z, l, h, c, d, _.data)) : e_.texSubImage3D(s, n, t.x, t.y, t.z, l, h, c, d, u, _),
                    e_.pixelStorei(3314, p),
                    e_.pixelStorei(32878, f),
                    e_.pixelStorei(3316, m),
                    e_.pixelStorei(3315, g),
                    e_.pixelStorei(32877, v),
                0 === n && r.generateMipmaps && e_.generateMipmap(s),
                    a.unbindTexture()
            }
            ,
            this.initTexture = function(e) {
                e.isCubeTexture ? o.setTextureCube(e, 0) : e.isData3DTexture ? o.setTexture3D(e, 0) : e.isDataArrayTexture ? o.setTexture2DArray(e, 0) : o.setTexture2D(e, 0),
                    a.unbindTexture()
            }
            ,
            this.resetState = function() {
                q = 0,
                    X = 0,
                    Y = null,
                    a.reset(),
                    A.reset()
            }
            ,
        "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
            detail: this
        }))
    }
    class n2 extends eH {
        constructor() {
            super(),
                this.isScene = !0,
                this.type = "Scene",
                this.background = null,
                this.environment = null,
                this.fog = null,
                this.overrideMaterial = null,
                this.autoUpdate = !0,
            "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{
                detail: this
            }))
        }
        copy(e, t) {
            return super.copy(e, t),
            null !== e.background && (this.background = e.background.clone()),
            null !== e.environment && (this.environment = e.environment.clone()),
            null !== e.fog && (this.fog = e.fog.clone()),
            null !== e.overrideMaterial && (this.overrideMaterial = e.overrideMaterial.clone()),
                this.autoUpdate = e.autoUpdate,
                this.matrixAutoUpdate = e.matrixAutoUpdate,
                this
        }
        toJSON(e) {
            let t = super.toJSON(e);
            return null !== this.fog && (t.object.fog = this.fog.toJSON()),
                t
        }
    }
    class n4 {
        constructor(e, t) {
            this.isInterleavedBuffer = !0,
                this.array = e,
                this.stride = t,
                this.count = void 0 !== e ? e.length / t : 0,
                this.usage = 35044,
                this.updateRange = {
                    offset: 0,
                    count: -1
                },
                this.version = 0,
                this.uuid = u()
        }
        onUploadCallback() {}
        set needsUpdate(e) {
            !0 === e && this.version++
        }
        setUsage(e) {
            return this.usage = e,
                this
        }
        copy(e) {
            return this.array = new e.array.constructor(e.array),
                this.count = e.count,
                this.stride = e.stride,
                this.usage = e.usage,
                this
        }
        copyAt(e, t, i) {
            e *= this.stride,
                i *= t.stride;
            for (let r = 0, a = this.stride; r < a; r++)
                this.array[e + r] = t.array[i + r];
            return this
        }
        set(e, t=0) {
            return this.array.set(e, t),
                this
        }
        clone(e) {
            void 0 === e.arrayBuffers && (e.arrayBuffers = {}),
            void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = u()),
            void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
            let t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid])
                , i = new this.constructor(t,this.stride);
            return i.setUsage(this.usage),
                i
        }
        onUpload(e) {
            return this.onUploadCallback = e,
                this
        }
        toJSON(e) {
            return void 0 === e.arrayBuffers && (e.arrayBuffers = {}),
            void 0 === this.array.buffer._uuid && (this.array.buffer._uuid = u()),
            void 0 === e.arrayBuffers[this.array.buffer._uuid] && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))),
                {
                    uuid: this.uuid,
                    buffer: this.array.buffer._uuid,
                    type: this.array.constructor.name,
                    stride: this.stride
                }
        }
    }
    let n5 = new B;
    class n6 {
        constructor(e, t, i, r=!1) {
            this.isInterleavedBufferAttribute = !0,
                this.name = "",
                this.data = e,
                this.itemSize = t,
                this.offset = i,
                this.normalized = !0 === r
        }
        get count() {
            return this.data.count
        }
        get array() {
            return this.data.array
        }
        set needsUpdate(e) {
            this.data.needsUpdate = e
        }
        applyMatrix4(e) {
            for (let t = 0, i = this.data.count; t < i; t++)
                n5.fromBufferAttribute(this, t),
                    n5.applyMatrix4(e),
                    this.setXYZ(t, n5.x, n5.y, n5.z);
            return this
        }
        applyNormalMatrix(e) {
            for (let t = 0, i = this.count; t < i; t++)
                n5.fromBufferAttribute(this, t),
                    n5.applyNormalMatrix(e),
                    this.setXYZ(t, n5.x, n5.y, n5.z);
            return this
        }
        transformDirection(e) {
            for (let t = 0, i = this.count; t < i; t++)
                n5.fromBufferAttribute(this, t),
                    n5.transformDirection(e),
                    this.setXYZ(t, n5.x, n5.y, n5.z);
            return this
        }
        setX(e, t) {
            return this.data.array[e * this.data.stride + this.offset] = t,
                this
        }
        setY(e, t) {
            return this.data.array[e * this.data.stride + this.offset + 1] = t,
                this
        }
        setZ(e, t) {
            return this.data.array[e * this.data.stride + this.offset + 2] = t,
                this
        }
        setW(e, t) {
            return this.data.array[e * this.data.stride + this.offset + 3] = t,
                this
        }
        getX(e) {
            return this.data.array[e * this.data.stride + this.offset]
        }
        getY(e) {
            return this.data.array[e * this.data.stride + this.offset + 1]
        }
        getZ(e) {
            return this.data.array[e * this.data.stride + this.offset + 2]
        }
        getW(e) {
            return this.data.array[e * this.data.stride + this.offset + 3]
        }
        setXY(e, t, i) {
            return e = e * this.data.stride + this.offset,
                this.data.array[e + 0] = t,
                this.data.array[e + 1] = i,
                this
        }
        setXYZ(e, t, i, r) {
            return e = e * this.data.stride + this.offset,
                this.data.array[e + 0] = t,
                this.data.array[e + 1] = i,
                this.data.array[e + 2] = r,
                this
        }
        setXYZW(e, t, i, r, a) {
            return e = e * this.data.stride + this.offset,
                this.data.array[e + 0] = t,
                this.data.array[e + 1] = i,
                this.data.array[e + 2] = r,
                this.data.array[e + 3] = a,
                this
        }
        clone(e) {
            if (void 0 !== e)
                return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}),
                void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)),
                    new n6(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized);
            {
                console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will deinterleave buffer data.");
                let e = [];
                for (let t = 0; t < this.count; t++) {
                    let i = t * this.data.stride + this.offset;
                    for (let t = 0; t < this.itemSize; t++)
                        e.push(this.data.array[i + t])
                }
                return new e4(new this.array.constructor(e),this.itemSize,this.normalized)
            }
        }
        toJSON(e) {
            if (void 0 !== e)
                return void 0 === e.interleavedBuffers && (e.interleavedBuffers = {}),
                void 0 === e.interleavedBuffers[this.data.uuid] && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)),
                    {
                        isInterleavedBufferAttribute: !0,
                        itemSize: this.itemSize,
                        data: this.data.uuid,
                        offset: this.offset,
                        normalized: this.normalized
                    };
            {
                console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will deinterleave buffer data.");
                let e = [];
                for (let t = 0; t < this.count; t++) {
                    let i = t * this.data.stride + this.offset;
                    for (let t = 0; t < this.itemSize; t++)
                        e.push(this.data.array[i + t])
                }
                return {
                    itemSize: this.itemSize,
                    type: this.array.constructor.name,
                    array: e,
                    normalized: this.normalized
                }
            }
        }
    }
    class n8 extends e0 {
        constructor(e) {
            super(),
                this.isSpriteMaterial = !0,
                this.type = "SpriteMaterial",
                this.color = new P(16777215),
                this.map = null,
                this.alphaMap = null,
                this.rotation = 0,
                this.sizeAttenuation = !0,
                this.transparent = !0,
                this.fog = !0,
                this.setValues(e)
        }
        copy(e) {
            return super.copy(e),
                this.color.copy(e.color),
                this.map = e.map,
                this.alphaMap = e.alphaMap,
                this.rotation = e.rotation,
                this.sizeAttenuation = e.sizeAttenuation,
                this.fog = e.fog,
                this
        }
    }
    let n7 = new B
        , n9 = new B
        , se = new B
        , st = new g
        , si = new g
        , sr = new eg
        , sa = new B
        , sn = new B
        , ss = new B
        , so = new g
        , sl = new g
        , sh = new g;
    class sc extends eH {
        constructor(e) {
            if (super(),
                this.isSprite = !0,
                this.type = "Sprite",
            void 0 === i) {
                i = new tn;
                let e = new Float32Array([-.5, -.5, 0, 0, 0, .5, -.5, 0, 1, 0, .5, .5, 0, 1, 1, -.5, .5, 0, 0, 1])
                    , t = new n4(e,5);
                i.setIndex([0, 1, 2, 0, 2, 3]),
                    i.setAttribute("position", new n6(t,3,0,!1)),
                    i.setAttribute("uv", new n6(t,2,3,!1))
            }
            this.geometry = i,
                this.material = void 0 !== e ? e : new n8,
                this.center = new g(.5,.5)
        }
        raycast(e, t) {
            let i, r;
            null === e.camera && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),
                n9.setFromMatrixScale(this.matrixWorld),
                sr.copy(e.camera.matrixWorld),
                this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld),
                se.setFromMatrixPosition(this.modelViewMatrix),
            e.camera.isPerspectiveCamera && !1 === this.material.sizeAttenuation && n9.multiplyScalar(-se.z);
            let a = this.material.rotation;
            0 !== a && (r = Math.cos(a),
                i = Math.sin(a));
            let n = this.center;
            sd(sa.set(-.5, -.5, 0), se, n, n9, i, r),
                sd(sn.set(.5, -.5, 0), se, n, n9, i, r),
                sd(ss.set(.5, .5, 0), se, n, n9, i, r),
                so.set(0, 0),
                sl.set(1, 0),
                sh.set(1, 1);
            let s = e.ray.intersectTriangle(sa, sn, ss, !1, n7);
            if (null === s && (sd(sn.set(-.5, .5, 0), se, n, n9, i, r),
                sl.set(0, 1),
            null === (s = e.ray.intersectTriangle(sa, ss, sn, !1, n7))))
                return;
            let o = e.ray.origin.distanceTo(n7);
            o < e.near || o > e.far || t.push({
                distance: o,
                point: n7.clone(),
                uv: eQ.getUV(n7, sa, sn, ss, so, sl, sh, new g),
                face: null,
                object: this
            })
        }
        copy(e, t) {
            return super.copy(e, t),
            void 0 !== e.center && this.center.copy(e.center),
                this.material = e.material,
                this
        }
    }
    function sd(e, t, i, r, a, n) {
        st.subVectors(e, i).addScalar(.5).multiply(r),
            void 0 !== a ? (si.x = n * st.x - a * st.y,
                si.y = a * st.x + n * st.y) : si.copy(st),
            e.copy(t),
            e.x += si.x,
            e.y += si.y,
            e.applyMatrix4(sr)
    }
    class su extends O {
        constructor(e, t, i, r, a, n, s, o, l) {
            super(e, t, i, r, a, n, s, o, l),
                this.isCanvasTexture = !0,
                this.needsUpdate = !0
        }
    }
    class sp extends e0 {
        constructor(e) {
            super(),
                this.isMeshStandardMaterial = !0,
                this.defines = {
                    STANDARD: ""
                },
                this.type = "MeshStandardMaterial",
                this.color = new P(16777215),
                this.roughness = 1,
                this.metalness = 0,
                this.map = null,
                this.lightMap = null,
                this.lightMapIntensity = 1,
                this.aoMap = null,
                this.aoMapIntensity = 1,
                this.emissive = new P(0),
                this.emissiveIntensity = 1,
                this.emissiveMap = null,
                this.bumpMap = null,
                this.bumpScale = 1,
                this.normalMap = null,
                this.normalMapType = 0,
                this.normalScale = new g(1,1),
                this.displacementMap = null,
                this.displacementScale = 1,
                this.displacementBias = 0,
                this.roughnessMap = null,
                this.metalnessMap = null,
                this.alphaMap = null,
                this.envMap = null,
                this.envMapIntensity = 1,
                this.wireframe = !1,
                this.wireframeLinewidth = 1,
                this.wireframeLinecap = "round",
                this.wireframeLinejoin = "round",
                this.flatShading = !1,
                this.fog = !0,
                this.setValues(e)
        }
        copy(e) {
            return super.copy(e),
                this.defines = {
                    STANDARD: ""
                },
                this.color.copy(e.color),
                this.roughness = e.roughness,
                this.metalness = e.metalness,
                this.map = e.map,
                this.lightMap = e.lightMap,
                this.lightMapIntensity = e.lightMapIntensity,
                this.aoMap = e.aoMap,
                this.aoMapIntensity = e.aoMapIntensity,
                this.emissive.copy(e.emissive),
                this.emissiveMap = e.emissiveMap,
                this.emissiveIntensity = e.emissiveIntensity,
                this.bumpMap = e.bumpMap,
                this.bumpScale = e.bumpScale,
                this.normalMap = e.normalMap,
                this.normalMapType = e.normalMapType,
                this.normalScale.copy(e.normalScale),
                this.displacementMap = e.displacementMap,
                this.displacementScale = e.displacementScale,
                this.displacementBias = e.displacementBias,
                this.roughnessMap = e.roughnessMap,
                this.metalnessMap = e.metalnessMap,
                this.alphaMap = e.alphaMap,
                this.envMap = e.envMap,
                this.envMapIntensity = e.envMapIntensity,
                this.wireframe = e.wireframe,
                this.wireframeLinewidth = e.wireframeLinewidth,
                this.wireframeLinecap = e.wireframeLinecap,
                this.wireframeLinejoin = e.wireframeLinejoin,
                this.flatShading = e.flatShading,
                this.fog = e.fog,
                this
        }
    }
    class sf extends eH {
        constructor(e, t=1) {
            super(),
                this.isLight = !0,
                this.type = "Light",
                this.color = new P(e),
                this.intensity = t
        }
        dispose() {}
        copy(e, t) {
            return super.copy(e, t),
                this.color.copy(e.color),
                this.intensity = e.intensity,
                this
        }
        toJSON(e) {
            let t = super.toJSON(e);
            return t.object.color = this.color.getHex(),
                t.object.intensity = this.intensity,
            void 0 !== this.groundColor && (t.object.groundColor = this.groundColor.getHex()),
            void 0 !== this.distance && (t.object.distance = this.distance),
            void 0 !== this.angle && (t.object.angle = this.angle),
            void 0 !== this.decay && (t.object.decay = this.decay),
            void 0 !== this.penumbra && (t.object.penumbra = this.penumbra),
            void 0 !== this.shadow && (t.object.shadow = this.shadow.toJSON()),
                t
        }
    }
    let sm = new eg
        , sg = new B
        , sv = new B;
    class s_ {
        constructor(e) {
            this.camera = e,
                this.bias = 0,
                this.normalBias = 0,
                this.radius = 1,
                this.blurSamples = 8,
                this.mapSize = new g(512,512),
                this.map = null,
                this.mapPass = null,
                this.matrix = new eg,
                this.autoUpdate = !0,
                this.needsUpdate = !1,
                this._frustum = new tH,
                this._frameExtents = new g(1,1),
                this._viewportCount = 1,
                this._viewports = [new z(0,0,1,1)]
        }
        getViewportCount() {
            return this._viewportCount
        }
        getFrustum() {
            return this._frustum
        }
        updateMatrices(e) {
            let t = this.camera
                , i = this.matrix;
            sg.setFromMatrixPosition(e.matrixWorld),
                t.position.copy(sg),
                sv.setFromMatrixPosition(e.target.matrixWorld),
                t.lookAt(sv),
                t.updateMatrixWorld(),
                sm.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse),
                this._frustum.setFromProjectionMatrix(sm),
                i.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
                i.multiply(t.projectionMatrix),
                i.multiply(t.matrixWorldInverse)
        }
        getViewport(e) {
            return this._viewports[e]
        }
        getFrameExtents() {
            return this._frameExtents
        }
        dispose() {
            this.map && this.map.dispose(),
            this.mapPass && this.mapPass.dispose()
        }
        copy(e) {
            return this.camera = e.camera.clone(),
                this.bias = e.bias,
                this.radius = e.radius,
                this.mapSize.copy(e.mapSize),
                this
        }
        clone() {
            return new this.constructor().copy(this)
        }
        toJSON() {
            let e = {};
            return 0 !== this.bias && (e.bias = this.bias),
            0 !== this.normalBias && (e.normalBias = this.normalBias),
            1 !== this.radius && (e.radius = this.radius),
            (512 !== this.mapSize.x || 512 !== this.mapSize.y) && (e.mapSize = this.mapSize.toArray()),
                e.camera = this.camera.toJSON(!1).object,
                delete e.camera.matrix,
                e
        }
    }
    let sx = new eg
        , sy = new B
        , sM = new B;
    class sb extends s_ {
        constructor() {
            super(new tR(90,1,.5,500)),
                this.isPointLightShadow = !0,
                this._frameExtents = new g(4,2),
                this._viewportCount = 6,
                this._viewports = [new z(2,1,1,1), new z(0,1,1,1), new z(3,1,1,1), new z(1,1,1,1), new z(3,0,1,1), new z(1,0,1,1)],
                this._cubeDirections = [new B(1,0,0), new B(-1,0,0), new B(0,0,1), new B(0,0,-1), new B(0,1,0), new B(0,-1,0)],
                this._cubeUps = [new B(0,1,0), new B(0,1,0), new B(0,1,0), new B(0,1,0), new B(0,0,1), new B(0,0,-1)]
        }
        updateMatrices(e, t=0) {
            let i = this.camera
                , r = this.matrix
                , a = e.distance || i.far;
            a !== i.far && (i.far = a,
                i.updateProjectionMatrix()),
                sy.setFromMatrixPosition(e.matrixWorld),
                i.position.copy(sy),
                sM.copy(i.position),
                sM.add(this._cubeDirections[t]),
                i.up.copy(this._cubeUps[t]),
                i.lookAt(sM),
                i.updateMatrixWorld(),
                r.makeTranslation(-sy.x, -sy.y, -sy.z),
                sx.multiplyMatrices(i.projectionMatrix, i.matrixWorldInverse),
                this._frustum.setFromProjectionMatrix(sx)
        }
    }
    class sS extends sf {
        constructor(e, t, i=0, r=1) {
            super(e, t),
                this.isPointLight = !0,
                this.type = "PointLight",
                this.distance = i,
                this.decay = r,
                this.shadow = new sb
        }
        get power() {
            return 4 * this.intensity * Math.PI
        }
        set power(e) {
            this.intensity = e / (4 * Math.PI)
        }
        dispose() {
            this.shadow.dispose()
        }
        copy(e, t) {
            return super.copy(e, t),
                this.distance = e.distance,
                this.decay = e.decay,
                this.shadow = e.shadow.clone(),
                this
        }
    }
    class sw extends sf {
        constructor(e, t) {
            super(e, t),
                this.isAmbientLight = !0,
                this.type = "AmbientLight"
        }
    }
    class sT {
        constructor(e=!0) {
            this.autoStart = e,
                this.startTime = 0,
                this.oldTime = 0,
                this.elapsedTime = 0,
                this.running = !1
        }
        start() {
            this.startTime = sE(),
                this.oldTime = this.startTime,
                this.elapsedTime = 0,
                this.running = !0
        }
        stop() {
            this.getElapsedTime(),
                this.running = !1,
                this.autoStart = !1
        }
        getElapsedTime() {
            return this.getDelta(),
                this.elapsedTime
        }
        getDelta() {
            let e = 0;
            if (this.autoStart && !this.running)
                return this.start(),
                    0;
            if (this.running) {
                let t = sE();
                e = (t - this.oldTime) / 1e3,
                    this.oldTime = t,
                    this.elapsedTime += e
            }
            return e
        }
    }
    function sE() {
        return ("undefined" == typeof performance ? Date : performance).now()
    }
    class sA {
        constructor(e=1, t=0, i=0) {
            return this.radius = e,
                this.phi = t,
                this.theta = i,
                this
        }
        set(e, t, i) {
            return this.radius = e,
                this.phi = t,
                this.theta = i,
                this
        }
        copy(e) {
            return this.radius = e.radius,
                this.phi = e.phi,
                this.theta = e.theta,
                this
        }
        makeSafe() {
            return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)),
                this
        }
        setFromVector3(e) {
            return this.setFromCartesianCoords(e.x, e.y, e.z)
        }
        setFromCartesianCoords(e, t, i) {
            return this.radius = Math.sqrt(e * e + t * t + i * i),
                0 === this.radius ? (this.theta = 0,
                    this.phi = 0) : (this.theta = Math.atan2(e, i),
                    this.phi = Math.acos(p(t / this.radius, -1, 1))),
                this
        }
        clone() {
            return new this.constructor().copy(this)
        }
    }
    function sC(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i,
            e
    }
    function sL(e, t, i, r, a, n, s, o) {
        let l = (e,t,i,r)=>[new g(e / s,1 - r / o), new g(i / s,1 - r / o), new g(i / s,1 - t / o), new g(e / s,1 - t / o)]
            , h = l(t + n, i, t + r + n, i + n)
            , c = l(t + r + n, i, t + 2 * r + n, i + n)
            , d = l(t, i + n, t + n, i + n + a)
            , u = l(t + n, i + n, t + r + n, i + n + a)
            , p = l(t + r + n, i + n, t + r + 2 * n, i + a + n)
            , f = l(t + r + 2 * n, i + n, t + 2 * r + 2 * n, i + a + n)
            , m = e.attributes.uv;
        m.copyVector2sArray([p[3], p[2], p[0], p[1], d[3], d[2], d[0], d[1], h[3], h[2], h[0], h[1], c[0], c[1], c[3], c[2], u[3], u[2], u[0], u[1], f[3], f[2], f[0], f[1]]),
            m.needsUpdate = !0
    }
    function sP(e, t, i, r, a, n) {
        sL(e, t, i, r, a, n, 64, 64)
    }
    function sR(e, t, i, r, a, n) {
        sL(e, t, i, r, a, n, 64, 32)
    }
    class sD extends nJ {
        constructor(e, t) {
            super(),
                sC(this, "innerLayer", void 0),
                sC(this, "outerLayer", void 0),
                this.innerLayer = e,
                this.outerLayer = t,
                e.name = "inner",
                t.name = "outer"
        }
    }
    class sI extends nJ {
        get map() {
            return this._map
        }
        set map(e) {
            this._map = e,
                this.layer1Material.map = e,
                this.layer1Material.needsUpdate = !0,
                this.layer1MaterialBiased.map = e,
                this.layer1MaterialBiased.needsUpdate = !0,
                this.layer2Material.map = e,
                this.layer2Material.needsUpdate = !0,
                this.layer2MaterialBiased.map = e,
                this.layer2MaterialBiased.needsUpdate = !0
        }
        get modelType() {
            return this.slim ? "slim" : "default"
        }
        set modelType(e) {
            this.slim = "slim" === e,
                this.modelListeners.forEach(e=>e())
        }
        getBodyParts() {
            return this.children.filter(e=>e instanceof sD)
        }
        setInnerLayerVisible(e) {
            this.getBodyParts().forEach(t=>t.innerLayer.visible = e)
        }
        setOuterLayerVisible(e) {
            this.getBodyParts().forEach(t=>t.outerLayer.visible = e)
        }
        resetJoints() {
            this.head.rotation.set(0, 0, 0),
                this.leftArm.rotation.set(0, 0, 0),
                this.rightArm.rotation.set(0, 0, 0),
                this.leftLeg.rotation.set(0, 0, 0),
                this.rightLeg.rotation.set(0, 0, 0)
        }
        constructor() {
            super(),
                sC(this, "head", void 0),
                sC(this, "body", void 0),
                sC(this, "rightArm", void 0),
                sC(this, "leftArm", void 0),
                sC(this, "rightLeg", void 0),
                sC(this, "leftLeg", void 0),
                sC(this, "modelListeners", []),
                sC(this, "slim", !1),
                sC(this, "_map", null),
                sC(this, "layer1Material", void 0),
                sC(this, "layer1MaterialBiased", void 0),
                sC(this, "layer2Material", void 0),
                sC(this, "layer2MaterialBiased", void 0),
                this.layer1Material = new sp({
                    side: 0
                }),
                this.layer2Material = new sp({
                    side: 2,
                    transparent: !0,
                    alphaTest: 1e-5
                }),
                this.layer1MaterialBiased = this.layer1Material.clone(),
                this.layer1MaterialBiased.polygonOffset = !0,
                this.layer1MaterialBiased.polygonOffsetFactor = 1,
                this.layer1MaterialBiased.polygonOffsetUnits = 1,
                this.layer2MaterialBiased = this.layer2Material.clone(),
                this.layer2MaterialBiased.polygonOffset = !0,
                this.layer2MaterialBiased.polygonOffsetFactor = 1,
                this.layer2MaterialBiased.polygonOffsetUnits = 1;
            let e = new tT(8,8,8);
            sP(e, 0, 0, 8, 8, 8);
            let t = new tS(e,this.layer1Material)
                , i = new tT(9,9,9);
            sP(i, 32, 0, 8, 8, 8);
            let r = new tS(i,this.layer2Material);
            this.head = new sD(t,r),
                this.head.name = "head",
                this.head.add(t, r),
                t.position.y = 4,
                r.position.y = 4,
                this.add(this.head);
            let a = new tT(8,12,4);
            sP(a, 16, 16, 8, 12, 4);
            let n = new tS(a,this.layer1Material)
                , s = new tT(8.5,12.5,4.5);
            sP(s, 16, 32, 8, 12, 4);
            let o = new tS(s,this.layer2Material);
            this.body = new sD(n,o),
                this.body.name = "body",
                this.body.add(n, o),
                this.body.position.y = -6,
                this.add(this.body);
            let l = new tT
                , h = new tS(l,this.layer1MaterialBiased);
            this.modelListeners.push(()=>{
                    h.scale.x = this.slim ? 3 : 4,
                        h.scale.y = 12,
                        h.scale.z = 4,
                        sP(l, 40, 16, this.slim ? 3 : 4, 12, 4)
                }
            );
            let c = new tT
                , d = new tS(c,this.layer2MaterialBiased);
            this.modelListeners.push(()=>{
                    d.scale.x = this.slim ? 3.5 : 4.5,
                        d.scale.y = 12.5,
                        d.scale.z = 4.5,
                        sP(c, 40, 32, this.slim ? 3 : 4, 12, 4)
                }
            );
            let u = new nJ;
            u.add(h, d),
                this.modelListeners.push(()=>{
                        u.position.x = this.slim ? -.5 : -1
                    }
                ),
                u.position.y = -4,
                this.rightArm = new sD(h,d),
                this.rightArm.name = "rightArm",
                this.rightArm.add(u),
                this.rightArm.position.x = -5,
                this.rightArm.position.y = -2,
                this.add(this.rightArm);
            let p = new tT
                , f = new tS(p,this.layer1MaterialBiased);
            this.modelListeners.push(()=>{
                    f.scale.x = this.slim ? 3 : 4,
                        f.scale.y = 12,
                        f.scale.z = 4,
                        sP(p, 32, 48, this.slim ? 3 : 4, 12, 4)
                }
            );
            let m = new tT
                , g = new tS(m,this.layer2MaterialBiased);
            this.modelListeners.push(()=>{
                    g.scale.x = this.slim ? 3.5 : 4.5,
                        g.scale.y = 12.5,
                        g.scale.z = 4.5,
                        sP(m, 48, 48, this.slim ? 3 : 4, 12, 4)
                }
            );
            let v = new nJ;
            v.add(f, g),
                this.modelListeners.push(()=>{
                        v.position.x = this.slim ? .5 : 1
                    }
                ),
                v.position.y = -4,
                this.leftArm = new sD(f,g),
                this.leftArm.name = "leftArm",
                this.leftArm.add(v),
                this.leftArm.position.x = 5,
                this.leftArm.position.y = -2,
                this.add(this.leftArm);
            let _ = new tT(4,12,4);
            sP(_, 0, 16, 4, 12, 4);
            let x = new tS(_,this.layer1MaterialBiased)
                , y = new tT(4.5,12.5,4.5);
            sP(y, 0, 32, 4, 12, 4);
            let M = new tS(y,this.layer2MaterialBiased)
                , b = new nJ;
            b.add(x, M),
                b.position.y = -6,
                this.rightLeg = new sD(x,M),
                this.rightLeg.name = "rightLeg",
                this.rightLeg.add(b),
                this.rightLeg.position.x = -1.9,
                this.rightLeg.position.y = -12,
                this.rightLeg.position.z = -.1,
                this.add(this.rightLeg);
            let S = new tT(4,12,4);
            sP(S, 16, 48, 4, 12, 4);
            let w = new tS(S,this.layer1MaterialBiased)
                , T = new tT(4.5,12.5,4.5);
            sP(T, 0, 48, 4, 12, 4);
            let E = new tS(T,this.layer2MaterialBiased)
                , A = new nJ;
            A.add(w, E),
                A.position.y = -6,
                this.leftLeg = new sD(w,E),
                this.leftLeg.name = "leftLeg",
                this.leftLeg.add(A),
                this.leftLeg.position.x = 1.9,
                this.leftLeg.position.y = -12,
                this.leftLeg.position.z = -.1,
                this.add(this.leftLeg),
                this.modelType = "default"
        }
    }
    class sN extends nJ {
        get map() {
            return this.material.map
        }
        set map(e) {
            this.material.map = e,
                this.material.needsUpdate = !0
        }
        constructor() {
            super(),
                sC(this, "cape", void 0),
                sC(this, "material", void 0),
                this.material = new sp({
                    side: 2,
                    transparent: !0,
                    alphaTest: 1e-5
                });
            let e = new tT(10,16,1);
            sR(e, 0, 0, 10, 16, 1),
                this.cape = new tS(e,this.material),
                this.cape.position.y = -8,
                this.cape.position.z = .5,
                this.add(this.cape)
        }
    }
    class sO extends nJ {
        resetJoints() {
            this.leftWing.rotation.y = .01,
                this.leftWing.rotation.z = .2617994,
                this.updateRightWing()
        }
        updateRightWing() {
            this.rightWing.position.x = -this.leftWing.position.x,
                this.rightWing.position.y = this.leftWing.position.y,
                this.rightWing.rotation.x = this.leftWing.rotation.x,
                this.rightWing.rotation.y = -this.leftWing.rotation.y,
                this.rightWing.rotation.z = -this.leftWing.rotation.z
        }
        get map() {
            return this.material.map
        }
        set map(e) {
            this.material.map = e,
                this.material.needsUpdate = !0
        }
        constructor() {
            super(),
                sC(this, "leftWing", void 0),
                sC(this, "rightWing", void 0),
                sC(this, "material", void 0),
                this.material = new sp({
                    side: 2,
                    transparent: !0,
                    alphaTest: 1e-5
                });
            let e = new tT(12,22,4);
            sR(e, 22, 0, 10, 20, 2);
            let t = new tS(e,this.material);
            t.position.x = -5,
                t.position.y = -10,
                t.position.z = -1,
                this.leftWing = new nJ,
                this.leftWing.add(t),
                this.add(this.leftWing);
            let i = new tT(12,22,4);
            sR(i, 22, 0, 10, 20, 2);
            let r = new tS(i,this.material);
            r.scale.x = -1,
                r.position.x = 5,
                r.position.y = -10,
                r.position.z = -1,
                this.rightWing = new nJ,
                this.rightWing.add(r),
                this.add(this.rightWing),
                this.leftWing.position.x = 5,
                this.leftWing.rotation.x = .2617994,
                this.resetJoints()
        }
    }
    class sz extends nJ {
        get map() {
            return this.material.map
        }
        set map(e) {
            this.material.map = e,
                this.material.needsUpdate = !0
        }
        constructor() {
            super(),
                sC(this, "rightEar", void 0),
                sC(this, "leftEar", void 0),
                sC(this, "material", void 0),
                this.material = new sp({
                    side: 0
                });
            let e = new tT(8,8,4 / 3);
            sL(e, 0, 0, 6, 6, 1, 14, 7),
                this.rightEar = new tS(e,this.material),
                this.rightEar.name = "rightEar",
                this.rightEar.position.x = -6,
                this.add(this.rightEar),
                this.leftEar = new tS(e,this.material),
                this.leftEar.name = "leftEar",
                this.leftEar.position.x = 6,
                this.add(this.leftEar)
        }
    }
    let sU = 10.8 * Math.PI / 180;
    class sF extends nJ {
        get backEquipment() {
            return this.cape.visible ? "cape" : this.elytra.visible ? "elytra" : null
        }
        set backEquipment(e) {
            this.cape.visible = "cape" === e,
                this.elytra.visible = "elytra" === e
        }
        resetJoints() {
            this.skin.resetJoints(),
                this.cape.rotation.x = sU,
                this.elytra.resetJoints()
        }
        constructor() {
            super(),
                sC(this, "skin", void 0),
                sC(this, "cape", void 0),
                sC(this, "elytra", void 0),
                sC(this, "ears", void 0),
                this.skin = new sI,
                this.skin.name = "skin",
                this.skin.position.y = 8,
                this.add(this.skin),
                this.cape = new sN,
                this.cape.name = "cape",
                this.cape.position.y = 8,
                this.cape.position.z = -2,
                this.cape.rotation.x = sU,
                this.cape.rotation.y = Math.PI,
                this.add(this.cape),
                this.elytra = new sO,
                this.elytra.name = "elytra",
                this.elytra.position.y = 8,
                this.elytra.position.z = -2,
                this.elytra.visible = !1,
                this.add(this.elytra),
                this.ears = new sz,
                this.ears.name = "ears",
                this.ears.position.y = 10,
                this.ears.position.z = 2 / 3,
                this.ears.visible = !1,
                this.skin.head.add(this.ears)
        }
    }
    function sk(e) {
        return e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap || "undefined" != typeof OffscreenCanvas && e instanceof OffscreenCanvas
    }
    function sB(e, t, i, r, a) {
        let n = e.getImageData(t, i, r, a);
        for (let e = 0; e < r; e++)
            for (let t = 0; t < a; t++) {
                let i = (e + t * r) * 4;
                if (255 !== n.data[i + 3])
                    return !0
            }
        return !1
    }
    function sH(e, t, i) {
        if (i) {
            if (sB(e, 0, 0, t, t))
                return
        } else if (sB(e, 0, 0, t, t / 2))
            return;
        let r = t / 64
            , a = (t,i,a,n)=>e.clearRect(t * r, i * r, a * r, n * r);
        a(40, 0, 8, 8),
            a(48, 0, 8, 8),
            a(32, 8, 8, 8),
            a(40, 8, 8, 8),
            a(48, 8, 8, 8),
            a(56, 8, 8, 8),
        i && (a(4, 32, 4, 4),
            a(8, 32, 4, 4),
            a(0, 36, 4, 12),
            a(4, 36, 4, 12),
            a(8, 36, 4, 12),
            a(12, 36, 4, 12),
            a(20, 32, 8, 4),
            a(28, 32, 8, 4),
            a(16, 36, 4, 12),
            a(20, 36, 8, 12),
            a(28, 36, 4, 12),
            a(32, 36, 8, 12),
            a(44, 32, 4, 4),
            a(48, 32, 4, 4),
            a(40, 36, 4, 12),
            a(44, 36, 4, 12),
            a(48, 36, 4, 12),
            a(52, 36, 12, 12),
            a(4, 48, 4, 4),
            a(8, 48, 4, 4),
            a(0, 52, 4, 12),
            a(4, 52, 4, 12),
            a(8, 52, 4, 12),
            a(12, 52, 4, 12),
            a(52, 48, 4, 4),
            a(56, 48, 4, 4),
            a(48, 52, 4, 12),
            a(52, 52, 4, 12),
            a(56, 52, 4, 12),
            a(60, 52, 4, 12))
    }
    function sG(e, t) {
        if (t.width !== t.height && t.width !== 2 * t.height)
            throw Error(`Bad skin size: ${t.width}x ${t.height}`);
        let i = t.width / 64
            , r = 14 * i
            , a = 7 * i;
        e.width = r,
            e.height = a;
        let n = e.getContext("2d");
        n.clearRect(0, 0, r, a),
            n.drawImage(t, 24 * i, 0, r, a, 0, 0, r, a)
    }
    async function sV(e) {
        let t = document.createElement("img");
        return new Promise((i,r)=>{
                t.onload = ()=>i(t),
                    t.onerror = r,
                    t.crossOrigin = "anonymous",
                    "string" == typeof e ? t.src = e : (void 0 !== e.crossOrigin && (t.crossOrigin = e.crossOrigin),
                    void 0 !== e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
                        t.src = e.src)
            }
        )
    }
    let sW = {
        type: "change"
    }
        , sj = {
        type: "start"
    }
        , sq = {
        type: "end"
    };
    class sX extends l {
        constructor(e, t) {
            super(),
            void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),
            t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),
                this.object = e,
                this.domElement = t,
                this.domElement.style.touchAction = "none",
                this.enabled = !0,
                this.target = new B,
                this.minDistance = 0,
                this.maxDistance = 1 / 0,
                this.minZoom = 0,
                this.maxZoom = 1 / 0,
                this.minPolarAngle = 0,
                this.maxPolarAngle = Math.PI,
                this.minAzimuthAngle = -1 / 0,
                this.maxAzimuthAngle = 1 / 0,
                this.enableDamping = !1,
                this.dampingFactor = .05,
                this.enableZoom = !0,
                this.zoomSpeed = 1,
                this.enableRotate = !0,
                this.rotateSpeed = 1,
                this.enablePan = !0,
                this.panSpeed = 1,
                this.screenSpacePanning = !0,
                this.keyPanSpeed = 7,
                this.autoRotate = !1,
                this.autoRotateSpeed = 2,
                this.keys = {
                    LEFT: "ArrowLeft",
                    UP: "ArrowUp",
                    RIGHT: "ArrowRight",
                    BOTTOM: "ArrowDown"
                },
                this.mouseButtons = {
                    LEFT: r.ROTATE,
                    MIDDLE: r.DOLLY,
                    RIGHT: r.PAN
                },
                this.touches = {
                    ONE: a.ROTATE,
                    TWO: a.DOLLY_PAN
                },
                this.target0 = this.target.clone(),
                this.position0 = this.object.position.clone(),
                this.zoom0 = this.object.zoom,
                this._domElementKeyEvents = null,
                this.getPolarAngle = function() {
                    return l.phi
                }
                ,
                this.getAzimuthalAngle = function() {
                    return l.theta
                }
                ,
                this.getDistance = function() {
                    return this.object.position.distanceTo(this.target)
                }
                ,
                this.listenToKeyEvents = function(e) {
                    e.addEventListener("keydown", X),
                        this._domElementKeyEvents = e
                }
                ,
                this.saveState = function() {
                    i.target0.copy(i.target),
                        i.position0.copy(i.object.position),
                        i.zoom0 = i.object.zoom
                }
                ,
                this.reset = function() {
                    i.target.copy(i.target0),
                        i.object.position.copy(i.position0),
                        i.object.zoom = i.zoom0,
                        i.object.updateProjectionMatrix(),
                        i.dispatchEvent(sW),
                        i.update(),
                        s = n.NONE
                }
                ,
                this.update = function() {
                    let t = new B
                        , r = new k().setFromUnitVectors(e.up, new B(0,1,0))
                        , a = r.clone().invert()
                        , p = new B
                        , f = new k
                        , m = 2 * Math.PI;
                    return function() {
                        let e = i.object.position;
                        t.copy(e).sub(i.target),
                            t.applyQuaternion(r),
                            l.setFromVector3(t),
                        i.autoRotate && s === n.NONE && E(2 * Math.PI / 60 / 60 * i.autoRotateSpeed),
                            i.enableDamping ? (l.theta += h.theta * i.dampingFactor,
                                l.phi += h.phi * i.dampingFactor) : (l.theta += h.theta,
                                l.phi += h.phi);
                        let g = i.minAzimuthAngle
                            , v = i.maxAzimuthAngle;
                        return isFinite(g) && isFinite(v) && (g < -Math.PI ? g += m : g > Math.PI && (g -= m),
                            v < -Math.PI ? v += m : v > Math.PI && (v -= m),
                            g <= v ? l.theta = Math.max(g, Math.min(v, l.theta)) : l.theta = l.theta > (g + v) / 2 ? Math.max(g, l.theta) : Math.min(v, l.theta)),
                            l.phi = Math.max(i.minPolarAngle, Math.min(i.maxPolarAngle, l.phi)),
                            l.makeSafe(),
                            l.radius *= c,
                            l.radius = Math.max(i.minDistance, Math.min(i.maxDistance, l.radius)),
                            !0 === i.enableDamping ? i.target.addScaledVector(d, i.dampingFactor) : i.target.add(d),
                            t.setFromSpherical(l),
                            t.applyQuaternion(a),
                            e.copy(i.target).add(t),
                            i.object.lookAt(i.target),
                            !0 === i.enableDamping ? (h.theta *= 1 - i.dampingFactor,
                                h.phi *= 1 - i.dampingFactor,
                                d.multiplyScalar(1 - i.dampingFactor)) : (h.set(0, 0, 0),
                                d.set(0, 0, 0)),
                            c = 1,
                        !!(u || p.distanceToSquared(i.object.position) > o || 8 * (1 - f.dot(i.object.quaternion)) > o) && (i.dispatchEvent(sW),
                            p.copy(i.object.position),
                            f.copy(i.object.quaternion),
                            u = !1,
                            !0)
                    }
                }(),
                this.dispose = function() {
                    i.domElement.removeEventListener("contextmenu", Y),
                        i.domElement.removeEventListener("pointerdown", G),
                        i.domElement.removeEventListener("pointercancel", j),
                        i.domElement.removeEventListener("wheel", q),
                        i.domElement.removeEventListener("pointermove", V),
                        i.domElement.removeEventListener("pointerup", W),
                    null !== i._domElementKeyEvents && i._domElementKeyEvents.removeEventListener("keydown", X)
                }
            ;
            let i = this
                , n = {
                NONE: -1,
                ROTATE: 0,
                DOLLY: 1,
                PAN: 2,
                TOUCH_ROTATE: 3,
                TOUCH_PAN: 4,
                TOUCH_DOLLY_PAN: 5,
                TOUCH_DOLLY_ROTATE: 6
            }
                , s = n.NONE
                , o = 1e-6
                , l = new sA
                , h = new sA
                , c = 1
                , d = new B
                , u = !1
                , p = new g
                , f = new g
                , m = new g
                , v = new g
                , _ = new g
                , x = new g
                , y = new g
                , M = new g
                , b = new g
                , S = []
                , w = {};
            function T() {
                return Math.pow(.95, i.zoomSpeed)
            }
            function E(e) {
                h.theta -= e
            }
            let A = function() {
                let e = new B;
                return function(t, i) {
                    e.setFromMatrixColumn(i, 0),
                        e.multiplyScalar(-t),
                        d.add(e)
                }
            }()
                , C = function() {
                let e = new B;
                return function(t, r) {
                    !0 === i.screenSpacePanning ? e.setFromMatrixColumn(r, 1) : (e.setFromMatrixColumn(r, 0),
                        e.crossVectors(i.object.up, e)),
                        e.multiplyScalar(t),
                        d.add(e)
                }
            }()
                , L = function() {
                let e = new B;
                return function(t, r) {
                    let a = i.domElement;
                    if (i.object.isPerspectiveCamera) {
                        let n = i.object.position;
                        e.copy(n).sub(i.target);
                        let s = e.length();
                        A(2 * t * (s *= Math.tan(i.object.fov / 2 * Math.PI / 180)) / a.clientHeight, i.object.matrix),
                            C(2 * r * s / a.clientHeight, i.object.matrix)
                    } else
                        i.object.isOrthographicCamera ? (A(t * (i.object.right - i.object.left) / i.object.zoom / a.clientWidth, i.object.matrix),
                            C(r * (i.object.top - i.object.bottom) / i.object.zoom / a.clientHeight, i.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),
                            i.enablePan = !1)
                }
            }();
            function P(e) {
                i.object.isPerspectiveCamera ? c /= e : i.object.isOrthographicCamera ? (i.object.zoom = Math.max(i.minZoom, Math.min(i.maxZoom, i.object.zoom * e)),
                    i.object.updateProjectionMatrix(),
                    u = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
                    i.enableZoom = !1)
            }
            function R(e) {
                i.object.isPerspectiveCamera ? c *= e : i.object.isOrthographicCamera ? (i.object.zoom = Math.max(i.minZoom, Math.min(i.maxZoom, i.object.zoom / e)),
                    i.object.updateProjectionMatrix(),
                    u = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),
                    i.enableZoom = !1)
            }
            function D(e) {
                p.set(e.clientX, e.clientY)
            }
            function I(e) {
                v.set(e.clientX, e.clientY)
            }
            function N() {
                if (1 === S.length)
                    p.set(S[0].pageX, S[0].pageY);
                else {
                    let e = .5 * (S[0].pageX + S[1].pageX)
                        , t = .5 * (S[0].pageY + S[1].pageY);
                    p.set(e, t)
                }
            }
            function O() {
                if (1 === S.length)
                    v.set(S[0].pageX, S[0].pageY);
                else {
                    let e = .5 * (S[0].pageX + S[1].pageX)
                        , t = .5 * (S[0].pageY + S[1].pageY);
                    v.set(e, t)
                }
            }
            function z() {
                let e = S[0].pageX - S[1].pageX
                    , t = S[0].pageY - S[1].pageY;
                y.set(0, Math.sqrt(e * e + t * t))
            }
            function U(e) {
                var t;
                if (1 == S.length)
                    f.set(e.pageX, e.pageY);
                else {
                    let t = K(e)
                        , i = .5 * (e.pageX + t.x)
                        , r = .5 * (e.pageY + t.y);
                    f.set(i, r)
                }
                m.subVectors(f, p).multiplyScalar(i.rotateSpeed);
                let r = i.domElement;
                E(2 * Math.PI * m.x / r.clientHeight),
                    t = 2 * Math.PI * m.y / r.clientHeight,
                    h.phi -= t,
                    p.copy(f)
            }
            function F(e) {
                if (1 === S.length)
                    _.set(e.pageX, e.pageY);
                else {
                    let t = K(e)
                        , i = .5 * (e.pageX + t.x)
                        , r = .5 * (e.pageY + t.y);
                    _.set(i, r)
                }
                x.subVectors(_, v).multiplyScalar(i.panSpeed),
                    L(x.x, x.y),
                    v.copy(_)
            }
            function H(e) {
                let t = K(e)
                    , r = e.pageX - t.x
                    , a = e.pageY - t.y;
                M.set(0, Math.sqrt(r * r + a * a)),
                    b.set(0, Math.pow(M.y / y.y, i.zoomSpeed)),
                    P(b.y),
                    y.copy(M)
            }
            function G(e) {
                !1 !== i.enabled && (0 === S.length && (i.domElement.setPointerCapture(e.pointerId),
                    i.domElement.addEventListener("pointermove", V),
                    i.domElement.addEventListener("pointerup", W)),
                    S.push(e),
                    "touch" === e.pointerType ? function(e) {
                        switch (J(e),
                            S.length) {
                            case 1:
                                switch (i.touches.ONE) {
                                    case a.ROTATE:
                                        if (!1 === i.enableRotate)
                                            return;
                                        N(),
                                            s = n.TOUCH_ROTATE;
                                        break;
                                    case a.PAN:
                                        if (!1 === i.enablePan)
                                            return;
                                        O(),
                                            s = n.TOUCH_PAN;
                                        break;
                                    default:
                                        s = n.NONE
                                }
                                break;
                            case 2:
                                switch (i.touches.TWO) {
                                    case a.DOLLY_PAN:
                                        if (!1 === i.enableZoom && !1 === i.enablePan)
                                            return;
                                        i.enableZoom && z(),
                                        i.enablePan && O(),
                                            s = n.TOUCH_DOLLY_PAN;
                                        break;
                                    case a.DOLLY_ROTATE:
                                        if (!1 === i.enableZoom && !1 === i.enableRotate)
                                            return;
                                        i.enableZoom && z(),
                                        i.enableRotate && N(),
                                            s = n.TOUCH_DOLLY_ROTATE;
                                        break;
                                    default:
                                        s = n.NONE
                                }
                                break;
                            default:
                                s = n.NONE
                        }
                        s !== n.NONE && i.dispatchEvent(sj)
                    }(e) : function(e) {
                        let t;
                        switch (e.button) {
                            case 0:
                                t = i.mouseButtons.LEFT;
                                break;
                            case 1:
                                t = i.mouseButtons.MIDDLE;
                                break;
                            case 2:
                                t = i.mouseButtons.RIGHT;
                                break;
                            default:
                                t = -1
                        }
                        switch (t) {
                            case r.DOLLY:
                                if (!1 === i.enableZoom)
                                    return;
                                y.set(e.clientX, e.clientY),
                                    s = n.DOLLY;
                                break;
                            case r.ROTATE:
                                if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                    if (!1 === i.enablePan)
                                        return;
                                    I(e),
                                        s = n.PAN
                                } else {
                                    if (!1 === i.enableRotate)
                                        return;
                                    D(e),
                                        s = n.ROTATE
                                }
                                break;
                            case r.PAN:
                                if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                    if (!1 === i.enableRotate)
                                        return;
                                    D(e),
                                        s = n.ROTATE
                                } else {
                                    if (!1 === i.enablePan)
                                        return;
                                    I(e),
                                        s = n.PAN
                                }
                                break;
                            default:
                                s = n.NONE
                        }
                        s !== n.NONE && i.dispatchEvent(sj)
                    }(e))
            }
            function V(e) {
                !1 !== i.enabled && ("touch" === e.pointerType ? function(e) {
                    switch (J(e),
                        s) {
                        case n.TOUCH_ROTATE:
                            if (!1 === i.enableRotate)
                                return;
                            U(e),
                                i.update();
                            break;
                        case n.TOUCH_PAN:
                            if (!1 === i.enablePan)
                                return;
                            F(e),
                                i.update();
                            break;
                        case n.TOUCH_DOLLY_PAN:
                            if (!1 === i.enableZoom && !1 === i.enablePan)
                                return;
                            i.enableZoom && H(e),
                            i.enablePan && F(e),
                                i.update();
                            break;
                        case n.TOUCH_DOLLY_ROTATE:
                            if (!1 === i.enableZoom && !1 === i.enableRotate)
                                return;
                            i.enableZoom && H(e),
                            i.enableRotate && U(e),
                                i.update();
                            break;
                        default:
                            s = n.NONE
                    }
                }(e) : function(e) {
                    if (!1 !== i.enabled)
                        switch (s) {
                            case n.ROTATE:
                                if (!1 === i.enableRotate)
                                    return;
                                !function(e) {
                                    var t;
                                    f.set(e.clientX, e.clientY),
                                        m.subVectors(f, p).multiplyScalar(i.rotateSpeed);
                                    let r = i.domElement;
                                    E(2 * Math.PI * m.x / r.clientHeight),
                                        t = 2 * Math.PI * m.y / r.clientHeight,
                                        h.phi -= t,
                                        p.copy(f),
                                        i.update()
                                }(e);
                                break;
                            case n.DOLLY:
                                if (!1 === i.enableZoom)
                                    return;
                                M.set(e.clientX, e.clientY),
                                    b.subVectors(M, y),
                                    b.y > 0 ? P(T()) : b.y < 0 && R(T()),
                                    y.copy(M),
                                    i.update();
                                break;
                            case n.PAN:
                                if (!1 === i.enablePan)
                                    return;
                                _.set(e.clientX, e.clientY),
                                    x.subVectors(_, v).multiplyScalar(i.panSpeed),
                                    L(x.x, x.y),
                                    v.copy(_),
                                    i.update()
                        }
                }(e))
            }
            function W(e) {
                Z(e),
                0 === S.length && (i.domElement.releasePointerCapture(e.pointerId),
                    i.domElement.removeEventListener("pointermove", V),
                    i.domElement.removeEventListener("pointerup", W)),
                    i.dispatchEvent(sq),
                    s = n.NONE
            }
            function j(e) {
                Z(e)
            }
            function q(e) {
                !1 !== i.enabled && !1 !== i.enableZoom && s === n.NONE && (e.preventDefault(),
                    i.dispatchEvent(sj),
                    e.deltaY < 0 ? R(T()) : e.deltaY > 0 && P(T()),
                    i.update(),
                    i.dispatchEvent(sq))
            }
            function X(e) {
                !1 !== i.enabled && !1 !== i.enablePan && function(e) {
                    let t = !1;
                    switch (e.code) {
                        case i.keys.UP:
                            L(0, i.keyPanSpeed),
                                t = !0;
                            break;
                        case i.keys.BOTTOM:
                            L(0, -i.keyPanSpeed),
                                t = !0;
                            break;
                        case i.keys.LEFT:
                            L(i.keyPanSpeed, 0),
                                t = !0;
                            break;
                        case i.keys.RIGHT:
                            L(-i.keyPanSpeed, 0),
                                t = !0
                    }
                    t && (e.preventDefault(),
                        i.update())
                }(e)
            }
            function Y(e) {
                !1 !== i.enabled && e.preventDefault()
            }
            function Z(e) {
                delete w[e.pointerId];
                for (let t = 0; t < S.length; t++)
                    if (S[t].pointerId == e.pointerId) {
                        S.splice(t, 1);
                        return
                    }
            }
            function J(e) {
                let t = w[e.pointerId];
                void 0 === t && (t = new g,
                    w[e.pointerId] = t),
                    t.set(e.pageX, e.pageY)
            }
            function K(e) {
                let t = e.pointerId === S[0].pointerId ? S[1] : S[0];
                return w[t.pointerId]
            }
            i.domElement.addEventListener("contextmenu", Y),
                i.domElement.addEventListener("pointerdown", G),
                i.domElement.addEventListener("pointercancel", j),
                i.domElement.addEventListener("wheel", q, {
                    passive: !1
                }),
                this.update()
        }
    }
    let sY = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            opacity: {
                value: 1
            }
        },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: "uniform float opacity;uniform sampler2D tDiffuse;varying vec2 vUv;void main(){gl_FragColor=texture2D(tDiffuse,vUv);gl_FragColor.a*=opacity;}"
    };
    class sZ {
        constructor() {
            this.enabled = !0,
                this.needsSwap = !0,
                this.clear = !1,
                this.renderToScreen = !1
        }
        setSize() {}
        render() {
            console.error("THREE.Pass: .render() must be implemented in derived pass.")
        }
    }
    let sJ = new r4(-1,1,1,-1,0,1)
        , sK = new tn;
    sK.setAttribute("position", new e8([-1, 3, 0, -1, -1, 0, 3, -1, 0],3)),
        sK.setAttribute("uv", new e8([0, 2, 0, 0, 2, 0],2));
    class sQ {
        constructor(e) {
            this._mesh = new tS(sK,e)
        }
        dispose() {
            this._mesh.geometry.dispose()
        }
        render(e) {
            e.render(this._mesh, sJ)
        }
        get material() {
            return this._mesh.material
        }
        set material(e) {
            this._mesh.material = e
        }
    }
    class s$ extends sZ {
        constructor(e, t) {
            super(),
                this.textureID = void 0 !== t ? t : "tDiffuse",
                e instanceof tL ? (this.uniforms = e.uniforms,
                    this.material = e) : e && (this.uniforms = tC.clone(e.uniforms),
                    this.material = new tL({
                        defines: Object.assign({}, e.defines),
                        uniforms: this.uniforms,
                        vertexShader: e.vertexShader,
                        fragmentShader: e.fragmentShader
                    })),
                this.fsQuad = new sQ(this.material)
        }
        render(e, t, i) {
            this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = i.texture),
                this.fsQuad.material = this.material,
                this.renderToScreen ? (e.setRenderTarget(null),
                    this.fsQuad.render(e)) : (e.setRenderTarget(t),
                this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
                    this.fsQuad.render(e))
        }
    }
    class s0 extends sZ {
        constructor(e, t) {
            super(),
                this.scene = e,
                this.camera = t,
                this.clear = !0,
                this.needsSwap = !1,
                this.inverse = !1
        }
        render(e, t, i) {
            let r, a;
            let n = e.getContext()
                , s = e.state;
            s.buffers.color.setMask(!1),
                s.buffers.depth.setMask(!1),
                s.buffers.color.setLocked(!0),
                s.buffers.depth.setLocked(!0),
                this.inverse ? (r = 0,
                    a = 1) : (r = 1,
                    a = 0),
                s.buffers.stencil.setTest(!0),
                s.buffers.stencil.setOp(n.REPLACE, n.REPLACE, n.REPLACE),
                s.buffers.stencil.setFunc(n.ALWAYS, r, 4294967295),
                s.buffers.stencil.setClear(a),
                s.buffers.stencil.setLocked(!0),
                e.setRenderTarget(i),
            this.clear && e.clear(),
                e.render(this.scene, this.camera),
                e.setRenderTarget(t),
            this.clear && e.clear(),
                e.render(this.scene, this.camera),
                s.buffers.color.setLocked(!1),
                s.buffers.depth.setLocked(!1),
                s.buffers.stencil.setLocked(!1),
                s.buffers.stencil.setFunc(n.EQUAL, 1, 4294967295),
                s.buffers.stencil.setOp(n.KEEP, n.KEEP, n.KEEP),
                s.buffers.stencil.setLocked(!0)
        }
    }
    class s1 extends sZ {
        constructor() {
            super(),
                this.needsSwap = !1
        }
        render(e) {
            e.state.buffers.stencil.setLocked(!1),
                e.state.buffers.stencil.setTest(!1)
        }
    }
    class s3 {
        constructor(e, t) {
            if (this.renderer = e,
            void 0 === t) {
                let i = e.getSize(new g);
                this._pixelRatio = e.getPixelRatio(),
                    this._width = i.width,
                    this._height = i.height,
                    (t = new U(this._width * this._pixelRatio,this._height * this._pixelRatio)).texture.name = "EffectComposer.rt1"
            } else
                this._pixelRatio = 1,
                    this._width = t.width,
                    this._height = t.height;
            this.renderTarget1 = t,
                this.renderTarget2 = t.clone(),
                this.renderTarget2.texture.name = "EffectComposer.rt2",
                this.writeBuffer = this.renderTarget1,
                this.readBuffer = this.renderTarget2,
                this.renderToScreen = !0,
                this.passes = [],
            void 0 === sY && console.error("THREE.EffectComposer relies on CopyShader"),
            void 0 === s$ && console.error("THREE.EffectComposer relies on ShaderPass"),
                this.copyPass = new s$(sY),
                this.clock = new sT
        }
        swapBuffers() {
            let e = this.readBuffer;
            this.readBuffer = this.writeBuffer,
                this.writeBuffer = e
        }
        addPass(e) {
            this.passes.push(e),
                e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }
        insertPass(e, t) {
            this.passes.splice(t, 0, e),
                e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }
        removePass(e) {
            let t = this.passes.indexOf(e);
            -1 !== t && this.passes.splice(t, 1)
        }
        isLastEnabledPass(e) {
            for (let t = e + 1; t < this.passes.length; t++)
                if (this.passes[t].enabled)
                    return !1;
            return !0
        }
        render(e) {
            void 0 === e && (e = this.clock.getDelta());
            let t = this.renderer.getRenderTarget()
                , i = !1;
            for (let t = 0, r = this.passes.length; t < r; t++) {
                let r = this.passes[t];
                if (!1 !== r.enabled) {
                    if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t),
                        r.render(this.renderer, this.writeBuffer, this.readBuffer, e, i),
                        r.needsSwap) {
                        if (i) {
                            let t = this.renderer.getContext()
                                , i = this.renderer.state.buffers.stencil;
                            i.setFunc(t.NOTEQUAL, 1, 4294967295),
                                this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e),
                                i.setFunc(t.EQUAL, 1, 4294967295)
                        }
                        this.swapBuffers()
                    }
                    void 0 !== s0 && (r instanceof s0 ? i = !0 : r instanceof s1 && (i = !1))
                }
            }
            this.renderer.setRenderTarget(t)
        }
        reset(e) {
            if (void 0 === e) {
                let t = this.renderer.getSize(new g);
                this._pixelRatio = this.renderer.getPixelRatio(),
                    this._width = t.width,
                    this._height = t.height,
                    (e = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
            }
            this.renderTarget1.dispose(),
                this.renderTarget2.dispose(),
                this.renderTarget1 = e,
                this.renderTarget2 = e.clone(),
                this.writeBuffer = this.renderTarget1,
                this.readBuffer = this.renderTarget2
        }
        setSize(e, t) {
            this._width = e,
                this._height = t;
            let i = this._width * this._pixelRatio
                , r = this._height * this._pixelRatio;
            this.renderTarget1.setSize(i, r),
                this.renderTarget2.setSize(i, r);
            for (let e = 0; e < this.passes.length; e++)
                this.passes[e].setSize(i, r)
        }
        setPixelRatio(e) {
            this._pixelRatio = e,
                this.setSize(this._width, this._height)
        }
    }
    new r4(-1,1,1,-1,0,1);
    let s2 = new tn;
    s2.setAttribute("position", new e8([-1, 3, 0, -1, -1, 0, 3, -1, 0],3)),
        s2.setAttribute("uv", new e8([0, 2, 0, 0, 2, 0],2));
    class s4 extends sZ {
        constructor(e, t, i, r, a) {
            super(),
                this.scene = e,
                this.camera = t,
                this.overrideMaterial = i,
                this.clearColor = r,
                this.clearAlpha = void 0 !== a ? a : 0,
                this.clear = !0,
                this.clearDepth = !1,
                this.needsSwap = !1,
                this._oldClearColor = new P
        }
        render(e, t, i) {
            let r, a;
            let n = e.autoClear;
            e.autoClear = !1,
            void 0 !== this.overrideMaterial && (a = this.scene.overrideMaterial,
                this.scene.overrideMaterial = this.overrideMaterial),
            this.clearColor && (e.getClearColor(this._oldClearColor),
                r = e.getClearAlpha(),
                e.setClearColor(this.clearColor, this.clearAlpha)),
            this.clearDepth && e.clearDepth(),
                e.setRenderTarget(this.renderToScreen ? null : i),
            this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil),
                e.render(this.scene, this.camera),
            this.clearColor && e.setClearColor(this._oldClearColor, r),
            void 0 !== this.overrideMaterial && (this.scene.overrideMaterial = a),
                e.autoClear = n
        }
    }
    let s5 = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            resolution: {
                value: new g(1 / 1024,1 / 512)
            }
        },
        vertexShader: "varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
        fragmentShader: `precision highp float;uniform sampler2D tDiffuse;uniform vec2 resolution;varying vec2 vUv;
#ifndef FXAA_DISCARD
#define FXAA_DISCARD 0
#endif
#define FxaaTexTop(t,p)texture2D(t,p,-100.0)
#define FxaaTexOff(t,p,o,r)texture2D(t,p+(o*r),-100.0)
#define NUM_SAMPLES 5
float contrast(vec4 a,vec4 b){vec4 diff=abs(a-b);return max(max(max(diff.r,diff.g),diff.b),diff.a);}vec4 FxaaPixelShader(vec2 posM,sampler2D tex,vec2 fxaaQualityRcpFrame,float fxaaQualityEdgeThreshold,float fxaaQualityinvEdgeThreshold){vec4 rgbaM=FxaaTexTop(tex,posM);vec4 rgbaS=FxaaTexOff(tex,posM,vec2(0.0,1.0),fxaaQualityRcpFrame.xy);vec4 rgbaE=FxaaTexOff(tex,posM,vec2(1.0,0.0),fxaaQualityRcpFrame.xy);vec4 rgbaN=FxaaTexOff(tex,posM,vec2(0.0,-1.0),fxaaQualityRcpFrame.xy);vec4 rgbaW=FxaaTexOff(tex,posM,vec2(-1.0,0.0),fxaaQualityRcpFrame.xy);bool earlyExit=max(max(max(contrast(rgbaM,rgbaN),contrast(rgbaM,rgbaS)),contrast(rgbaM,rgbaE)),contrast(rgbaM,rgbaW))<fxaaQualityEdgeThreshold;
#if (FXAA_DISCARD==1)
if(earlyExit)FxaaDiscard;
#else
if(earlyExit)return rgbaM;
#endif
float contrastN=contrast(rgbaM,rgbaN);float contrastS=contrast(rgbaM,rgbaS);float contrastE=contrast(rgbaM,rgbaE);float contrastW=contrast(rgbaM,rgbaW);float relativeVContrast=(contrastN+contrastS)-(contrastE+contrastW);relativeVContrast*=fxaaQualityinvEdgeThreshold;bool horzSpan=relativeVContrast>0.;if(abs(relativeVContrast)<.3){vec2 dirToEdge;dirToEdge.x=contrastE>contrastW?1.:-1.;dirToEdge.y=contrastS>contrastN?1.:-1.;vec4 rgbaAlongH=FxaaTexOff(tex,posM,vec2(dirToEdge.x,-dirToEdge.y),fxaaQualityRcpFrame.xy);float matchAlongH=contrast(rgbaM,rgbaAlongH);vec4 rgbaAlongV=FxaaTexOff(tex,posM,vec2(-dirToEdge.x,dirToEdge.y),fxaaQualityRcpFrame.xy);float matchAlongV=contrast(rgbaM,rgbaAlongV);relativeVContrast=matchAlongV-matchAlongH;relativeVContrast*=fxaaQualityinvEdgeThreshold;if(abs(relativeVContrast)<.3){return mix(rgbaM,(rgbaN+rgbaS+rgbaE+rgbaW)*.25,.4);}horzSpan=relativeVContrast>0.;}if(!horzSpan)rgbaN=rgbaW;if(!horzSpan)rgbaS=rgbaE;bool pairN=contrast(rgbaM,rgbaN)>contrast(rgbaM,rgbaS);if(!pairN)rgbaN=rgbaS;vec2 offNP;offNP.x=(!horzSpan)?0.0:fxaaQualityRcpFrame.x;offNP.y=(horzSpan)?0.0:fxaaQualityRcpFrame.y;bool doneN=false;bool doneP=false;float nDist=0.;float pDist=0.;vec2 posN=posM;vec2 posP=posM;int iterationsUsed=0;int iterationsUsedN=0;int iterationsUsedP=0;for(int i=0;i<NUM_SAMPLES;i++){iterationsUsed=i;float increment=float(i+1);if(!doneN){nDist+=increment;posN=posM+offNP*nDist;vec4 rgbaEndN=FxaaTexTop(tex,posN.xy);doneN=contrast(rgbaEndN,rgbaM)>contrast(rgbaEndN,rgbaN);iterationsUsedN=i;}if(!doneP){pDist+=increment;posP=posM-offNP*pDist;vec4 rgbaEndP=FxaaTexTop(tex,posP.xy);doneP=contrast(rgbaEndP,rgbaM)>contrast(rgbaEndP,rgbaN);iterationsUsedP=i;}if(doneN||doneP)break;}if(!doneP&&!doneN)return rgbaM;float dist=min(doneN?float(iterationsUsedN)/float(NUM_SAMPLES-1):1.,doneP?float(iterationsUsedP)/float(NUM_SAMPLES-1):1.);dist=pow(dist,.5);dist=1.-dist;return mix(rgbaM,rgbaN,dist*.5);}void main(){const float edgeDetectionQuality=.2;const float invEdgeDetectionQuality=1./edgeDetectionQuality;gl_FragColor=FxaaPixelShader(vUv,tDiffuse,resolution,edgeDetectionQuality,invEdgeDetectionQuality);}`
    };
    function s6(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i,
            e
    }
    class s8 extends sc {
        async loadAndPaint() {
            await document.fonts.load(this.font, this.text),
                this.paint()
        }
        paint() {
            let e = document.createElement("canvas")
                , t = e.getContext("2d");
            t.font = this.font;
            let i = t.measureText(this.text);
            e.width = this.margin[3] + i.actualBoundingBoxLeft + i.actualBoundingBoxRight + this.margin[1],
                e.height = this.margin[0] + i.actualBoundingBoxAscent + i.actualBoundingBoxDescent + this.margin[2],
                (t = e.getContext("2d")).font = this.font,
                t.fillStyle = this.backgroundStyle,
                t.fillRect(0, 0, e.width, e.height),
                t.fillStyle = this.textStyle,
                t.fillText(this.text, this.margin[3] + i.actualBoundingBoxLeft, this.margin[0] + i.actualBoundingBoxAscent);
            let r = new su(e);
            r.magFilter = 1003,
                r.minFilter = 1003,
                this.textMaterial.map = r,
                this.textMaterial.needsUpdate = !0,
                this.scale.x = e.width / e.height * this.height,
                this.scale.y = this.height
        }
        constructor(e="", t={}) {
            let i = new n8({
                transparent: !0,
                alphaTest: 1e-5
            });
            super(i),
                s6(this, "painted", void 0),
                s6(this, "text", void 0),
                s6(this, "font", void 0),
                s6(this, "margin", void 0),
                s6(this, "textStyle", void 0),
                s6(this, "backgroundStyle", void 0),
                s6(this, "height", void 0),
                s6(this, "textMaterial", void 0),
                this.textMaterial = i,
                this.text = e,
                this.font = void 0 === t.font ? "48px Minecraft" : t.font,
                this.margin = void 0 === t.margin ? [5, 10, 5, 10] : t.margin,
                this.textStyle = void 0 === t.textStyle ? "white" : t.textStyle,
                this.backgroundStyle = void 0 === t.backgroundStyle ? "rgba(0,0,0,.25)" : t.backgroundStyle,
                this.height = void 0 === t.height ? 4 : t.height;
            let r = void 0 === t.repaintAfterLoaded || t.repaintAfterLoaded;
            r && !document.fonts.check(this.font, this.text) ? (this.paint(),
                this.painted = this.loadAndPaint()) : (this.paint(),
                this.painted = Promise.resolve())
        }
    }
    function s7(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i,
            e
    }
    function s9(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i,
            e
    }
    class oe {
        update(e, t) {
            if (this.paused)
                return;
            let i = t * this.speed;
            this.animate(e, i),
                this.progress += i
        }
        constructor() {
            s9(this, "speed", 1),
                s9(this, "paused", !1),
                s9(this, "progress", 0)
        }
    }
    e.BodyPart = sD,
        e.CapeObject = sN,
        e.EarsObject = sz,
        e.ElytraObject = sO,
        e.FlyingAnimation = class extends oe {
            animate(e) {
                var t;
                let i = this.progress > 0 ? 20 * this.progress : 0
                    , r = (t = i * i / 100) <= 0 ? 0 : t >= 1 ? 1 : t;
                e.rotation.x = r * Math.PI / 2,
                    e.skin.head.rotation.x = r > .5 ? Math.PI / 4 - e.rotation.x : 0;
                let a = .25 * Math.PI * r;
                e.skin.leftArm.rotation.z = a,
                    e.skin.rightArm.rotation.z = -a;
                let n = Math.PI / 2
                    , s = Math.pow(.9, i);
                e.elytra.leftWing.rotation.x = .34906584 + -.08726644 * s,
                    e.elytra.leftWing.rotation.z = n + s * (.2617994 - n),
                    e.elytra.updateRightWing()
            }
        }
        ,
        e.FunctionAnimation = class extends oe {
            animate(e, t) {
                this.fn(e, this.progress, t)
            }
            constructor(e) {
                super(),
                    s9(this, "fn", void 0),
                    this.fn = e
            }
        }
        ,
        e.IdleAnimation = class extends oe {
            animate(e) {
                let t = 2 * this.progress
                    , i = .02 * Math.PI;
                e.skin.leftArm.rotation.z = .03 * Math.cos(t) + i,
                    e.skin.rightArm.rotation.z = .03 * Math.cos(t + Math.PI) - i,
                    e.cape.rotation.x = .01 * Math.sin(t) + .06 * Math.PI
            }
        }
        ,
        e.NameTagObject = s8,
        e.PlayerAnimation = oe,
        e.PlayerObject = sF,
        e.RunningAnimation = class extends oe {
            animate(e) {
                let t = 15 * this.progress + .5 * Math.PI;
                e.skin.leftLeg.rotation.x = 1.3 * Math.cos(t + Math.PI),
                    e.skin.rightLeg.rotation.x = 1.3 * Math.cos(t),
                    e.skin.leftArm.rotation.x = 1.5 * Math.cos(t),
                    e.skin.rightArm.rotation.x = 1.5 * Math.cos(t + Math.PI);
                let i = .1 * Math.PI;
                e.skin.leftArm.rotation.z = .1 * Math.cos(t) + i,
                    e.skin.rightArm.rotation.z = .1 * Math.cos(t + Math.PI) - i,
                    e.position.y = Math.cos(2 * t),
                    e.position.x = .15 * Math.cos(t),
                    e.rotation.z = .01 * Math.cos(t + Math.PI),
                    e.cape.rotation.x = .1 * Math.sin(2 * t) + .3 * Math.PI
            }
        }
        ,
        e.SkinObject = sI,
        e.SkinViewer = class {
            updateComposerSize() {
                this.composer.setSize(this.width, this.height);
                let e = this.renderer.getPixelRatio();
                this.composer.setPixelRatio(e),
                    this.fxaaPass.material.uniforms.resolution.value.x = 1 / (this.width * e),
                    this.fxaaPass.material.uniforms.resolution.value.y = 1 / (this.height * e)
            }
            recreateSkinTexture() {
                null !== this.skinTexture && this.skinTexture.dispose(),
                    this.skinTexture = new su(this.skinCanvas),
                    this.skinTexture.magFilter = 1003,
                    this.skinTexture.minFilter = 1003,
                    this.playerObject.skin.map = this.skinTexture
            }
            recreateCapeTexture() {
                null !== this.capeTexture && this.capeTexture.dispose(),
                    this.capeTexture = new su(this.capeCanvas),
                    this.capeTexture.magFilter = 1003,
                    this.capeTexture.minFilter = 1003,
                    this.playerObject.cape.map = this.capeTexture,
                    this.playerObject.elytra.map = this.capeTexture
            }
            recreateEarsTexture() {
                null !== this.earsTexture && this.earsTexture.dispose(),
                    this.earsTexture = new su(this.earsCanvas),
                    this.earsTexture.magFilter = 1003,
                    this.earsTexture.minFilter = 1003,
                    this.playerObject.ears.map = this.earsTexture
            }
            loadSkin(e, t={}) {
                if (null === e)
                    this.resetSkin();
                else {
                    if (!sk(e))
                        return sV(e).then(e=>this.loadSkin(e, t));
                    (function(e, t) {
                            let i = !1;
                            if (t.width !== t.height) {
                                if (t.width === 2 * t.height)
                                    i = !0;
                                else
                                    throw Error(`Bad skin size: ${t.width}x ${t.height}`)
                            }
                            let r = e.getContext("2d");
                            if (i) {
                                let i = t.width;
                                e.width = i,
                                    e.height = i,
                                    r.clearRect(0, 0, i, i),
                                    r.drawImage(t, 0, 0, i, i / 2),
                                    function(e, t) {
                                        let i = t / 64
                                            , r = (t,r,a,n,s,o,l)=>(function(e, t, i, r, a, n, s, o) {
                                                let l = e.getImageData(t, i, r, a);
                                                if (o)
                                                    for (let e = 0; e < a; e++)
                                                        for (let t = 0; t < r / 2; t++) {
                                                            let i = (t + e * r) * 4
                                                                , a = (r - t - 1 + e * r) * 4
                                                                , n = l.data[i]
                                                                , s = l.data[i + 1]
                                                                , o = l.data[i + 2]
                                                                , h = l.data[i + 3]
                                                                , c = l.data[a]
                                                                , d = l.data[a + 1]
                                                                , u = l.data[a + 2]
                                                                , p = l.data[a + 3];
                                                            l.data[i] = c,
                                                                l.data[i + 1] = d,
                                                                l.data[i + 2] = u,
                                                                l.data[i + 3] = p,
                                                                l.data[a] = n,
                                                                l.data[a + 1] = s,
                                                                l.data[a + 2] = o,
                                                                l.data[a + 3] = h
                                                        }
                                                e.putImageData(l, n, s)
                                            }
                                        )(e, t * i, r * i, a * i, n * i, s * i, o * i, l);
                                        r(4, 16, 4, 4, 20, 48, !0),
                                            r(8, 16, 4, 4, 24, 48, !0),
                                            r(0, 20, 4, 12, 24, 52, !0),
                                            r(4, 20, 4, 12, 20, 52, !0),
                                            r(8, 20, 4, 12, 16, 52, !0),
                                            r(12, 20, 4, 12, 28, 52, !0),
                                            r(44, 16, 4, 4, 36, 48, !0),
                                            r(48, 16, 4, 4, 40, 48, !0),
                                            r(40, 20, 4, 12, 40, 52, !0),
                                            r(44, 20, 4, 12, 36, 52, !0),
                                            r(48, 20, 4, 12, 32, 52, !0),
                                            r(52, 20, 4, 12, 44, 52, !0)
                                    }(r, i),
                                    sH(r, e.width, !1)
                            } else
                                e.width = t.width,
                                    e.height = t.height,
                                    r.clearRect(0, 0, t.width, t.height),
                                    r.drawImage(t, 0, 0, e.width, e.height),
                                    sH(r, e.width, !0)
                        }
                    )(this.skinCanvas, e),
                        this.recreateSkinTexture(),
                        void 0 === t.model || "auto-detect" === t.model ? this.playerObject.skin.modelType = function(e) {
                            let t = e.width / 64
                                , i = e.getContext("2d")
                                , r = (e,r,a,n)=>sB(i, e * t, r * t, a * t, n * t)
                                , a = (e,r,a,n)=>(function(e, t, i, r, a) {
                                    let n = e.getImageData(t, i, r, a);
                                    for (let e = 0; e < r; e++)
                                        for (let t = 0; t < a; t++) {
                                            let i = (e + t * r) * 4;
                                            if (!(0 === n.data[i + 0] && 0 === n.data[i + 1] && 0 === n.data[i + 2] && 255 === n.data[i + 3]))
                                                return !1
                                        }
                                    return !0
                                }
                            )(i, e * t, r * t, a * t, n * t)
                                , n = (e,r,a,n)=>(function(e, t, i, r, a) {
                                    let n = e.getImageData(t, i, r, a);
                                    for (let e = 0; e < r; e++)
                                        for (let t = 0; t < a; t++) {
                                            let i = (e + t * r) * 4;
                                            if (!(255 === n.data[i + 0] && 255 === n.data[i + 1] && 255 === n.data[i + 2] && 255 === n.data[i + 3]))
                                                return !1
                                        }
                                    return !0
                                }
                            )(i, e * t, r * t, a * t, n * t)
                                , s = r(50, 16, 2, 4) || r(54, 20, 2, 12) || r(42, 48, 2, 4) || r(46, 52, 2, 12) || a(50, 16, 2, 4) && a(54, 20, 2, 12) && a(42, 48, 2, 4) && a(46, 52, 2, 12) || n(50, 16, 2, 4) && n(54, 20, 2, 12) && n(42, 48, 2, 4) && n(46, 52, 2, 12);
                            return s ? "slim" : "default"
                        }(this.skinCanvas) : this.playerObject.skin.modelType = t.model,
                    !1 !== t.makeVisible && (this.playerObject.skin.visible = !0),
                    (!0 === t.ears || "load-only" == t.ears) && (sG(this.earsCanvas, e),
                        this.recreateEarsTexture(),
                    !0 === t.ears && (this.playerObject.ears.visible = !0))
                }
            }
            resetSkin() {
                this.playerObject.skin.visible = !1,
                    this.playerObject.skin.map = null,
                null !== this.skinTexture && (this.skinTexture.dispose(),
                    this.skinTexture = null)
            }
            loadCape(e, t={}) {
                if (null === e)
                    this.resetCape();
                else {
                    if (!sk(e))
                        return sV(e).then(e=>this.loadCape(e, t));
                    (function(e, t) {
                            let i = function(e) {
                                if (e.width === 2 * e.height)
                                    return e.width / 64;
                                if (17 * e.width == 22 * e.height)
                                    return e.width / 22;
                                if (11 * e.width == 23 * e.height)
                                    return e.width / 46;
                                throw Error(`Bad cape size: ${e.width}x ${e.height}`)
                            }(t);
                            e.width = 64 * i,
                                e.height = 32 * i;
                            let r = e.getContext("2d");
                            r.clearRect(0, 0, e.width, e.height),
                                r.drawImage(t, 0, 0, t.width, t.height)
                        }
                    )(this.capeCanvas, e),
                        this.recreateCapeTexture(),
                    !1 !== t.makeVisible && (this.playerObject.backEquipment = void 0 === t.backEquipment ? "cape" : t.backEquipment)
                }
            }
            resetCape() {
                this.playerObject.backEquipment = null,
                    this.playerObject.cape.map = null,
                    this.playerObject.elytra.map = null,
                null !== this.capeTexture && (this.capeTexture.dispose(),
                    this.capeTexture = null)
            }
            loadEars(e, t={}) {
                if (null === e)
                    this.resetEars();
                else {
                    if (!sk(e))
                        return sV(e).then(e=>this.loadEars(e, t));
                    "skin" === t.textureType ? sG(this.earsCanvas, e) : function(e, t) {
                        let i = function(e) {
                            if (e.width === 2 * e.height && e.height % 7 == 0)
                                return e.height / 7;
                            throw Error(`Bad ears size: ${e.width}x ${e.height}`)
                        }(t);
                        e.width = 14 * i,
                            e.height = 7 * i;
                        let r = e.getContext("2d");
                        r.clearRect(0, 0, e.width, e.height),
                            r.drawImage(t, 0, 0, t.width, t.height)
                    }(this.earsCanvas, e),
                        this.recreateEarsTexture(),
                    !1 !== t.makeVisible && (this.playerObject.ears.visible = !0)
                }
            }
            resetEars() {
                this.playerObject.ears.visible = !1,
                    this.playerObject.ears.map = null,
                null !== this.earsTexture && (this.earsTexture.dispose(),
                    this.earsTexture = null)
            }
            loadPanorama(e) {
                return this.loadBackground(e, 303)
            }
            loadBackground(e, t) {
                if (!sk(e))
                    return sV(e).then(e=>this.loadBackground(e, t));
                null !== this.backgroundTexture && this.backgroundTexture.dispose(),
                    this.backgroundTexture = new O,
                    this.backgroundTexture.image = e,
                void 0 !== t && (this.backgroundTexture.mapping = t),
                    this.backgroundTexture.needsUpdate = !0,
                    this.scene.background = this.backgroundTexture
            }
            draw() {
                let e = this.clock.getDelta();
                null !== this._animation && this._animation.update(this.playerObject, e),
                this.autoRotate && (this.playerWrapper.rotation.y += e * this.autoRotateSpeed),
                    this.controls.update(),
                    this.render(),
                    this.animationID = window.requestAnimationFrame(()=>this.draw())
            }
            render() {
                this.composer.render()
            }
            setSize(e, t) {
                this.camera.aspect = e / t,
                    this.camera.updateProjectionMatrix(),
                    this.renderer.setSize(e, t),
                    this.updateComposerSize()
            }
            dispose() {
                this._disposed = !0,
                    this.canvas.removeEventListener("webglcontextlost", this.onContextLost, !1),
                    this.canvas.removeEventListener("webglcontextrestored", this.onContextRestored, !1),
                null !== this.devicePixelRatioQuery && (this.devicePixelRatioQuery.removeEventListener("change", this.onDevicePixelRatioChange),
                    this.devicePixelRatioQuery = null),
                null !== this.animationID && (window.cancelAnimationFrame(this.animationID),
                    this.animationID = null),
                    this.controls.dispose(),
                    this.renderer.dispose(),
                    this.resetSkin(),
                    this.resetCape(),
                    this.resetEars(),
                    this.background = null,
                    this.fxaaPass.fsQuad.dispose()
            }
            get disposed() {
                return this._disposed
            }
            get renderPaused() {
                return this._renderPaused
            }
            set renderPaused(e) {
                this._renderPaused = e,
                    this._renderPaused && null !== this.animationID ? (window.cancelAnimationFrame(this.animationID),
                        this.animationID = null,
                        this.clock.stop(),
                        this.clock.autoStart = !0) : this._renderPaused || this._disposed || this.renderer.getContext().isContextLost() || null != this.animationID || (this.animationID = window.requestAnimationFrame(()=>this.draw()))
            }
            get width() {
                return this.renderer.getSize(new g).width
            }
            set width(e) {
                this.setSize(e, this.height)
            }
            get height() {
                return this.renderer.getSize(new g).height
            }
            set height(e) {
                this.setSize(this.width, e)
            }
            get background() {
                return this.scene.background
            }
            set background(e) {
                null === e || e instanceof P || e instanceof O ? this.scene.background = e : this.scene.background = new P(e),
                null !== this.backgroundTexture && e !== this.backgroundTexture && (this.backgroundTexture.dispose(),
                    this.backgroundTexture = null)
            }
            adjustCameraDistance() {
                let e = 4.5 + 16.5 / Math.tan(this.fov / 180 * Math.PI / 2) / this.zoom;
                e < 10 ? e = 10 : e > 256 && (e = 256),
                    this.camera.position.multiplyScalar(e / this.camera.position.length()),
                    this.camera.updateProjectionMatrix()
            }
            resetCameraPose() {
                this.camera.position.set(0, 0, 1),
                    this.camera.rotation.set(0, 0, 0),
                    this.adjustCameraDistance()
            }
            get fov() {
                return this.camera.fov
            }
            set fov(e) {
                this.camera.fov = e,
                    this.adjustCameraDistance()
            }
            get zoom() {
                return this._zoom
            }
            set zoom(e) {
                this._zoom = e,
                    this.adjustCameraDistance()
            }
            get pixelRatio() {
                return this._pixelRatio
            }
            set pixelRatio(e) {
                "match-device" === e ? "match-device" !== this._pixelRatio && (this._pixelRatio = e,
                    this.onDevicePixelRatioChange()) : ("match-device" === this._pixelRatio && null !== this.devicePixelRatioQuery && (this.devicePixelRatioQuery.removeEventListener("change", this.onDevicePixelRatioChange),
                    this.devicePixelRatioQuery = null),
                    this._pixelRatio = e,
                    this.renderer.setPixelRatio(e),
                    this.updateComposerSize())
            }
            get animation() {
                return this._animation
            }
            set animation(e) {
                this._animation !== e && (this.playerObject.resetJoints(),
                    this.playerObject.position.set(0, 0, 0),
                    this.playerObject.rotation.set(0, 0, 0),
                    this.clock.stop(),
                    this.clock.autoStart = !0),
                null !== e && (e.progress = 0),
                    this._animation = e
            }
            get nameTag() {
                return this._nameTag
            }
            set nameTag(e) {
                null !== this._nameTag && this.playerWrapper.remove(this._nameTag),
                null !== e && (e instanceof eH || (e = new s8(e)),
                    this.playerWrapper.add(e),
                    e.position.y = 20),
                    this._nameTag = e
            }
            constructor(e={}) {
                let t;
                s7(this, "canvas", void 0),
                    s7(this, "scene", void 0),
                    s7(this, "camera", void 0),
                    s7(this, "renderer", void 0),
                    s7(this, "controls", void 0),
                    s7(this, "playerObject", void 0),
                    s7(this, "playerWrapper", void 0),
                    s7(this, "globalLight", new sw(16777215,.4)),
                    s7(this, "cameraLight", new sS(16777215,.6)),
                    s7(this, "composer", void 0),
                    s7(this, "renderPass", void 0),
                    s7(this, "fxaaPass", void 0),
                    s7(this, "skinCanvas", void 0),
                    s7(this, "capeCanvas", void 0),
                    s7(this, "earsCanvas", void 0),
                    s7(this, "skinTexture", null),
                    s7(this, "capeTexture", null),
                    s7(this, "earsTexture", null),
                    s7(this, "backgroundTexture", null),
                    s7(this, "_disposed", !1),
                    s7(this, "_renderPaused", !1),
                    s7(this, "_zoom", void 0),
                    s7(this, "autoRotate", !1),
                    s7(this, "autoRotateSpeed", 1),
                    s7(this, "_animation", void 0),
                    s7(this, "clock", void 0),
                    s7(this, "animationID", void 0),
                    s7(this, "onContextLost", void 0),
                    s7(this, "onContextRestored", void 0),
                    s7(this, "_pixelRatio", void 0),
                    s7(this, "devicePixelRatioQuery", void 0),
                    s7(this, "onDevicePixelRatioChange", void 0),
                    s7(this, "_nameTag", null),
                    this.canvas = void 0 === e.canvas ? document.createElement("canvas") : e.canvas,
                    this.skinCanvas = document.createElement("canvas"),
                    this.capeCanvas = document.createElement("canvas"),
                    this.earsCanvas = document.createElement("canvas"),
                    this.scene = new n2,
                    this.camera = new tR,
                    this.camera.add(this.cameraLight),
                    this.scene.add(this.camera),
                    this.scene.add(this.globalLight),
                    this.renderer = new n3({
                        canvas: this.canvas,
                        preserveDrawingBuffer: !0 === e.preserveDrawingBuffer
                    }),
                    this.onDevicePixelRatioChange = ()=>{
                        this.renderer.setPixelRatio(window.devicePixelRatio),
                            this.updateComposerSize(),
                        "match-device" === this._pixelRatio && (this.devicePixelRatioQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),
                            this.devicePixelRatioQuery.addEventListener("change", this.onDevicePixelRatioChange, {
                                once: !0
                            }))
                    }
                    ,
                    void 0 === e.pixelRatio || "match-device" === e.pixelRatio ? (this._pixelRatio = "match-device",
                        this.devicePixelRatioQuery = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`),
                        this.devicePixelRatioQuery.addEventListener("change", this.onDevicePixelRatioChange, {
                            once: !0
                        }),
                        this.renderer.setPixelRatio(window.devicePixelRatio)) : (this._pixelRatio = e.pixelRatio,
                        this.devicePixelRatioQuery = null,
                        this.renderer.setPixelRatio(e.pixelRatio)),
                    this.renderer.setClearColor(0, 0),
                this.renderer.capabilities.isWebGL2 && (t = new U(0,0,{
                    depthTexture: new n$(0,0,1015)
                })),
                    this.composer = new s3(this.renderer,t),
                    this.renderPass = new s4(this.scene,this.camera),
                    this.fxaaPass = new s$(s5),
                    this.composer.addPass(this.renderPass),
                    this.composer.addPass(this.fxaaPass),
                    this.playerObject = new sF,
                    this.playerObject.name = "player",
                    this.playerObject.skin.visible = !1,
                    this.playerObject.cape.visible = !1,
                    this.playerWrapper = new nJ,
                    this.playerWrapper.add(this.playerObject),
                    this.scene.add(this.playerWrapper),
                    this.controls = new sX(this.camera,this.canvas),
                    this.controls.enablePan = !1,
                    this.controls.minDistance = 10,
                    this.controls.maxDistance = 256,
                !1 === e.enableControls && (this.controls.enabled = !1),
                void 0 !== e.skin && this.loadSkin(e.skin, {
                    model: e.model,
                    ears: "current-skin" === e.ears
                }),
                void 0 !== e.cape && this.loadCape(e.cape),
                void 0 !== e.ears && "current-skin" !== e.ears && this.loadEars(e.ears.source, {
                    textureType: e.ears.textureType
                }),
                void 0 !== e.width && (this.width = e.width),
                void 0 !== e.height && (this.height = e.height),
                void 0 !== e.background && (this.background = e.background),
                void 0 !== e.panorama && this.loadPanorama(e.panorama),
                void 0 !== e.nameTag && (this.nameTag = e.nameTag),
                    this.camera.position.z = 1,
                    this._zoom = void 0 === e.zoom ? .9 : e.zoom,
                    this.fov = void 0 === e.fov ? 50 : e.fov,
                    this._animation = void 0 === e.animation ? null : e.animation,
                    this.clock = new sT,
                    !0 === e.renderPaused ? (this._renderPaused = !0,
                        this.animationID = null) : this.animationID = window.requestAnimationFrame(()=>this.draw()),
                    this.onContextLost = e=>{
                        e.preventDefault(),
                        null !== this.animationID && (window.cancelAnimationFrame(this.animationID),
                            this.animationID = null)
                    }
                    ,
                    this.onContextRestored = ()=>{
                        this.renderer.setClearColor(0, 0),
                        this._renderPaused || this._disposed || null !== this.animationID || (this.animationID = window.requestAnimationFrame(()=>this.draw()))
                    }
                    ,
                    this.canvas.addEventListener("webglcontextlost", this.onContextLost, !1),
                    this.canvas.addEventListener("webglcontextrestored", this.onContextRestored, !1)
            }
        }
        ,
        e.WalkingAnimation = class extends oe {
            animate(e) {
                let t = 8 * this.progress;
                e.skin.leftLeg.rotation.x = .5 * Math.sin(t),
                    e.skin.rightLeg.rotation.x = .5 * Math.sin(t + Math.PI),
                    e.skin.leftArm.rotation.x = .5 * Math.sin(t + Math.PI),
                    e.skin.rightArm.rotation.x = .5 * Math.sin(t);
                let i = .02 * Math.PI;
                e.skin.leftArm.rotation.z = .03 * Math.cos(t) + i,
                    e.skin.rightArm.rotation.z = .03 * Math.cos(t + Math.PI) - i,
                    this.headBobbing ? (e.skin.head.rotation.y = .2 * Math.sin(t / 4),
                        e.skin.head.rotation.x = .1 * Math.sin(t / 5)) : (e.skin.head.rotation.y = 0,
                        e.skin.head.rotation.x = 0),
                    e.cape.rotation.x = .06 * Math.sin(t / 1.5) + .06 * Math.PI
            }
            constructor(...e) {
                super(...e),
                    s9(this, "headBobbing", !0)
            }
        }
});