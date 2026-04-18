type StripOpts = { omitZero?: boolean };

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && v.constructor === Object;

const isVoid = (v: unknown, omitZero: boolean): boolean => {
  if (v === null || v === undefined || v === '') return true;
  if (omitZero && v === 0) return true;
  if (Array.isArray(v) && v.length === 0) return true;
  if (isObj(v) && Object.keys(v).length === 0) return true;
  return false;
};

function deep(v: unknown, omitZero: boolean): unknown {
  if (Array.isArray(v)) {
    const c = v.map(i => deep(i, omitZero)).filter(i => !isVoid(i, omitZero));
    return c.length ? c : undefined;
  }
  if (isObj(v)) {
    const r: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v)) {
      const c = deep(val, omitZero);
      if (!isVoid(c, omitZero)) r[k] = c;
    }
    return Object.keys(r).length ? r : undefined;
  }
  return v;
}

export function stripEmpties<T extends Record<string, any>>(
  input: T,
  opts: StripOpts = {}
): Partial<T> {
  const { omitZero = false } = opts;
  const c = deep(input, omitZero);
  if (c === undefined || (isObj(c) && !Object.keys(c).length)) return {} as Partial<T>;
  return c as Partial<T>;
}
