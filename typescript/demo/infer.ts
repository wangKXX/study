type T1 = { name: string, age: number }
// 获取类型的属性类型
type GetPropertyType<T> = T extends { [key: string]: infer U } ? U : never;

type T2 = GetPropertyType<T1>;

type GetParamsType<T> = T extends (...args: infer U) => any ? U : never;

type GetReturnType<T> = T extends (...args: any[]) => infer U ? U : never;

function fn(a: string, b: number) {
  return a + b;
}
type T31 = Parameters<typeof fn>
type T3 = GetParamsType<typeof fn>;

type T41 = ReturnType<typeof fn>;
type T4 = GetReturnType<typeof fn>;

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type T5 = Partial<T1>;
type T6 = MyPartial<T1>;

type T7 = Pick<T1, 'name'>;

type MyPcik<T, K extends keyof T> = {
  [P in K]: T[P];
};

type T8 = MyPcik<T1, 'name'>;

type T9 = Omit<T1, 'name'>;

type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
}

type T10 = MyOmit<T1, 'name'>;

type T11 = Exclude<T1, 'name'>;
