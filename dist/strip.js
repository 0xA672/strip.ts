"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripEmpties = stripEmpties;
const isObj = (v) => typeof v === 'object' && v !== null && v.constructor === Object;
const isVoid = (v, omitZero) => {
    if (v === null || v === undefined || v === '')
        return true;
    if (omitZero && v === 0)
        return true;
    if (Array.isArray(v) && v.length === 0)
        return true;
    if (isObj(v) && Object.keys(v).length === 0)
        return true;
    return false;
};
function deep(v, omitZero) {
    if (Array.isArray(v)) {
        const c = v.map(i => deep(i, omitZero)).filter(i => !isVoid(i, omitZero));
        return c.length ? c : undefined;
    }
    if (isObj(v)) {
        const r = {};
        for (const [k, val] of Object.entries(v)) {
            const c = deep(val, omitZero);
            if (!isVoid(c, omitZero))
                r[k] = c;
        }
        return Object.keys(r).length ? r : undefined;
    }
    return v;
}
function stripEmpties(input, opts = {}) {
    const { omitZero = false } = opts;
    const c = deep(input, omitZero);
    if (c === undefined || (isObj(c) && !Object.keys(c).length))
        return {};
    return c;
}
