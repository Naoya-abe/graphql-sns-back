# 💻 Get Started

## 事前にインストールするソフトウェア

- Node 18.15.0

## ソースコードのクローン

以下のコマンドを入力して任意のディレクトリにgraphql-sns-backレポジトリをcloneしてください。

```
$ git clone https://github.com/Naoya-abe/graphql-sns-back.git
```

## アプリケーションの立ち上げ

graphql-sns-backレポジトリのクローンが完了したら以下のコマンドを入力し`http://localhost:8080/graphql`で`GraphQLPlayGround`が立ち上がることを確認してください。

```sh
$ cd graphql-sns-back
$ cp .env.example .env
$ npm i
$ npm run start:dev
```

またDockerDesktopが立ち上がっている状態で、別タブで以下のコマンドを入力してDBを立ち上げてください。

```sh
$ docker compose build
$ docker compose up
```

さらに、別タブで以下のコマンドを入力するとDBの中を覗くことができます。

```sh
$ npx prisma studio
```
