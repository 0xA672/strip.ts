type StripOpts = {
    omitZero?: boolean;
};
export declare function stripEmpties<T extends Record<string, any>>(input: T, opts?: StripOpts): Partial<T>;
export {};
