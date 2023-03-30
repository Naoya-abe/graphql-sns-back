# 🗄️ ディレクトリ構造

本PJでは以下のようなディレクトリ構造となります。（随時更新予定）

```
docs                 # Documentsを配置します。

prisma               # Prisma関連のファイル群を配置します。

src                  # アプリケーションのメインディレクトリ(module群)
|
+-- (module name)
       |
       +-- dto
       |
       +-- models
       |
       +-- (module name).module.ts
       |
       +-- (module name).resolver.ts
       |
       +-- (module name).service.ts
       |
       +-- その他moduleに関連するファイル群

test                 # e2eテスト、インテグレーションテスト
```