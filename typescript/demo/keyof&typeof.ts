enum E1 {
  A = 1,
  B,
  C,
}

type ExtractKeys<T extends Record<string, unknown>> = keyof T;
type ColorKeys = ExtractKeys<typeof E1>;

const keys = Object.keys(E1);