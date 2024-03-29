# UPCIMILE
URL: https://upcimilefrontendv3.herokuapp.com/

## UPCIMILEについて
UPCIMILEは商品を提供したい企業とクリエイター（youtuber）とを結びつけるアプリです。  
  
UPCIMILE上の「商品」とは、一般的には価値が認められておらず、廃棄されたり、倉庫に眠ってしまっているものです。  
  
企業は商品をUPCIMILEに登録、youtuberはUPCIMILE上に登録された商品の中から、動画撮影に利用したい商品を見つけ出し、企業に対し「オファー」（商品の提供を希望すること）をすることができます。  
youtuberは提供された商品にアイディアを加えて活用し、企業、youtuber自身、そして視聴者が笑顔になるような動画を撮影します。  

## 使用技術

 - Ruby 3.1
 - Rails(APIモード) 6.1
 - MySQL 8.0
 - devise
 - RSpec
 - React 17.0
 - TypeScript 4.8
 - MUI
 - Firebase
 - Youtube Data API
 - docker

## 機能一覧
- 企業登録、ログイン機能　（devise)

- 企業一覧、詳細表示機能

- youtuber登録、ログイン機能　（youtubeアカウントはgoogleアカウントでログインするためfirebase、googleアカウントを使用した認証。認証後にYoutube Data Apiよりチャンネル情報を取得します。そのため、youtuberはプロフィール情報をupcimile上で設定、更新する手間が不要です。） 

- youtuber一覧、詳細表示機能　（詳細表示画面ではYoutube Data APIより、最新のアカウント情報を取得します。）. 

- 商品登録機能

- オファー作成機能 （youtuberが企業に向けて商品の提供を希望することをオファーと呼んでいます）
  
## デモ
企業、youtuber、商品それぞれの一覧と詳細を確認できます  
  
![howto](https://user-images.githubusercontent.com/100851463/189907584-71933a24-6f4f-4f0a-b17a-be1c58940652.gif)
  
  
youtuberはgoogleアカウントでログインし、気に入った商品にオファーを送ることができます。  
  
![creator](https://user-images.githubusercontent.com/100851463/189906914-e81be14d-a31c-418b-8532-bf39b33a639f.gif). 
  

## ER図
※テーブル名の背景色がグレーのテーブルは今後実装予定のものです。
![upcimile](https://user-images.githubusercontent.com/100851463/189827729-a4242b23-66ac-4301-9107-50ab16116ed1.jpg)

## 今後実装予定の機能
下記の機能は、実装を考えていましたが、時間が足りず断念したものです。
今後時間があれば追加していきたいと考えています。
* チャット機能
* タグ付け機能
* フォロー機能

## なぜこのアプリケーションを作ったのか

このアプリは「upcicle」という理念を根底に持っています。
upcicleとは本来であれば捨てられる廃棄物などに、新たな付加価値を持たせることアップグレードして生まれ変わらせることです。

持続可能な社会を目指して様々な取り組みが行われていますが、廃棄物を減らそうとしても資金が足りなかったり、方法がわからない、人手がないなどの理由で、廃棄物の削減を実現できていないという企業もあります。

そこで、クリエイティブかつ、影響力の強いyoutuberに着目し、
youtuberと農家、youtuberと伝統工芸を作り出す職人など、価値観や立場が全く違う２者を結びつけることにより、
これまで廃棄されていたものや持て余していたものを生まれ変わらせることができるのではないか、  
また、このような取り組みを動画で配信することによって、持続可能な社会に向けた行動を消費者に促すことができるのではないか、と考えました。

### 商品と使用用途の例
  
例1. 
+ 商品：　台風で傷つき、売り物にならなくなってしまったりんご
+ 用途：　大食い企画で利用
+ 効果：　企業は農作物のアピールすることができる。youtuberは「勿体無い」という批判を回避できるとともにメッセージ性の高い動画を作成できる
  
例２. 
+ 商品：　木材加工の際に生じた端材
+ 用途：　端材を活用したDIY動画
+ 効果：　企業は自社及び廃棄物削減の取り組みをアピールでき、継続的に取り組み可能な端材の活用方法が見つかる可能性がある。youtuberは材料費を削減できるとともにメッセージ性の高い動画を作成できる

### 企業側のメリット
* 廃棄物やデットストックを削減できる。
* youtuberからの提案によっては継続的に取り組み可能な廃棄物の削減方法が発見できる。
* 影響力のあるyoutuberに取り上げられることにより企業の知名度アップが期待できる。

### youtuberのメリット
* 商品の提供を受けることによって動画の準備にかかる費用を抑えられる。
* ユニークな商品の提供を受けることにより、他のyoutuberと被らない動画を撮ることができる。
* 廃棄されるもの、活用されずに眠っているものを利用することにより、持続可能な社会への貢献という付加価値を動画に与えることができる。
* 持続可能な社会へのとり取り組み姿勢を示すことにより視聴者層の幅を広げることができる。
