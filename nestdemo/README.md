# nest 示例

相关：
trial: js
exert: vue

## 生成指令

```bash
# 生成模块
nest g mo talk

# 生成网关
nest g ga talk
```

## Running the app

```bash
# 开发
$ npm run start

# 监听模式 watch
$ npm run start:dev

# 发布模式
$ npm run start:prod
```

## 数据库 Prisma

primsa 自动读取环境变量 DATABASE_URL , 所以需要 引入 配置模块，启用 .env 。
目前没有看到通过代码配置的示例，默认搞 .env 有点僵化。
文件目录也固定为顶层 prisma 目录。

```bash
# 每次修改模型（schema.primsa 文件）都必须执行一次来更新客户端代码。
prisma generate
# 本项目自定义了 npm run primsa:gen 替代这个命令
npm run primsa:gen
```

```bash
# 初始化迁移脚本 CodeFirst （schema.primsa）
prisma migrate dev --name init
# 本项目自定义了 npm run primsa:init 替代这个命令
npm run primsa:init 
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
