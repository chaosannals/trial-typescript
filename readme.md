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

## 调试模式不会刷新。。 F5 也不行，开发体验奇差。
npm run dev
```

### 目录

- app	App Router  App 模式
- pages	Pages Router  Pages 模式
- public	Static assets to be served 静态文件

这 3 个可选放到 src 目录下，这样可以放多些其他的代码一起管理在 src 下。

### app 模式

app 模式比较健壮，目录名代表路径，page.tsx 代表该目录路径的页。就不会出现 pages 模式二义性的问题。但是路径参数也是体现在目录名上，会出现诡异的目录名（如：[...args]）

- / => app/page.tsx
- /about => app/about/page.tsx
- /some => app/some/page.tsx

#### layout.tsx

布局是一层层嵌套的，而非替代：
app/layout.tsx 会作用于所有页面， app/about/layout.tsx 被当作顶层布局的 children 被加载。

### pages 模式

pages 类似类似 PHP ，文件名 index.tsx 代表目录 其他的是目录名和文件名

- / => pages/index.tsx
- /about => pages/about.tsx 或者 pages/about/index.tsx
- /some/thing => pages/some/thing.tsx 或者 pages/some/thing/index.tsx

注：两种模式只能取绑定的路径一种，例如：
app/page.tsx 和 pages\index.tsx 会冲突，必须删掉一个。

