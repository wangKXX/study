type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

type ObjA = {
    a: string;
    b: number;
    getSex(): string;
};

class ObjAImpl implements ObjA {
    a: string;
    b: number;
    getSex(){
      return ''
    }
}

const objA = {
    a: 'a',
    b: 1,
    getSex(){
      return ''
    },
    c: true
} as ObjA;

type ObjB = {
    a: string;
    b: number;
    c: boolean;
};



interface InterA {
    a: string;
    b: number;
}



interface InterB extends InterA {
    c: boolean;
}

type A = string & number; // naver

type test1 = Expand<ObjA & ObjB & InterA>;

interface InterA {
  a: string;
  b: number;
  d: string;
}

interface InterA extends ObjB{
  e: boolean
}

type test2 = Expand<InterA>;

const interAObj = {
  a: 'a',
  b: 1,
  c: true,
  d: 'd',
  e: false,
  f: 'f'
} as InterA;


class ClassA {
  a: string;
  b: number;
  c: boolean;
  d: string;
  e: boolean;
  f: string;

  constructor(a: string, b: number, c: boolean, d: string, e: boolean, f: string) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
   this.f = f;
  }
  getName(): string {
    return this.a;
  }
}
type typeObjA = Expand<ObjA & ClassA>;
interface IextendClassA extends ClassA {
  g: string;

  getAge(): number;
}

type ExpandIExtendClassA = Expand<IextendClassA>;

class IextendClassAImpl implements IextendClassA {
  a: string;
  b: number;
  c: boolean;
  d: string;
  e: boolean;
  f: string;
  g: string;

  getName(): string {
    return this.a;
  }
  getAge(): number {
    return this.b;
  }
}