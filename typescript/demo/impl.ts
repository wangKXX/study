interface IA {
  a: number
  b: (params: Array<string>) => string
} 

interface IA {
  a: string // 重新声明类型必须和之前相同字段保持一致
  b: (params: Array<string>) => string
}

class IB implements IA {
  a: number
  b: (strs: string[]) => ''
}