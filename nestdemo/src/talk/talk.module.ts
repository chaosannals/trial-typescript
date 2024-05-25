import { Module } from '@nestjs/common';
import { TalkGateway } from './talk.gateway';

@Module({
  providers: [TalkGateway],
})
export class TalkModule {}

// ================================
// interface 和 type
interface StringMap {
  [key: string | number]: string | undefined;
}

interface A {
  k?: string;
}

type B = {
  k?: string;
};

interface E {
  // 4种都可转换到 StringMap
  // [k: keyof StringMap]: any;
  // [k: keyof StringMap]: string;
  // [k: string]: any;
  [k: string]: string;

  // 这种不行。
  // [k: number]: string;
}

export const typeNinterface = () => {
  const a: A = { k: '1' };
  const b: B = {};
  const c: StringMap = b;
  // const d: StringMap = a; // interface A 和 type B 一样的结构，A 却不能转到 StringMap，难道是编译器 BUG ？
  // console.log('d', d);
  const e: E = {};
  const f: StringMap = e; // 需要 E 这种和 StringMap 一样的声明才行。
  console.log('a', a, 'b', b, 'c', c, 'e', e, 'f', f);
};
