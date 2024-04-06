# trial typescript

## 类型系统

### keyof

```typescript
// keyof 得到的是个枚举类型
type A = keyof any; // string | number | symbol ; 这点很诡异，是个“类型枚举”，而具体类得到的是个“字符串枚举”，为什么这样？约定俗成吧。而且这也影响到了泛型的 T ，因为默认泛型 T 就是 any。
class C {
    a: string;
    b: number;
}
type B = keyof C; // "a" | "b" ; 得到的是一个字符串枚举。

type B2 = keyof C & string; // 这么写好像完全没有意义，因为具体类型的枚举就是 string 的。
//但是在泛型里配置拼接语法就可以限定类型。
```

## 应急方式

```ts
// 单行忽略(添加到特定行的行前来忽略这一行的错误)
// @ts-ignore
aaa= 123

// 跳过对某些文件的检查 (添加到该文件的首行才起作用)
// @ts-nocheck

// 对某些文件的检查
// @ts-check
```


## next

```bash
# 创建项目
npx create-next-app@latest
```

### app 模式和 pages 模式

这 两种模式只能取一种。
app/page.tsx 和 pages\index.tsx 会冲突，必须删掉一个。
