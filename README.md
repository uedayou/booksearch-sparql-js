# BookSearch SPARQL js

SPARQLエンドポイントを使用する書籍検索アプリです。
SPARQLクエリを書き換えるだけでアプリを作ることができます。

## デモ

<http://uedayou.net/booksearch-sparql-js/>

## 使い方

config.js の endpoint に SPARQLエンドポイントを、list_query に SPARQLクエリを入力してください。
queryは、/* ... */ の中に記述してください。

	var list_query = (function () {/*
	select distinct ?uri ?title ?description where 
	{
		?uri <http://linkdata.org/property/rdf1s1294i#title> ?title;
		<http://linkdata.org/property/rdf1s1294i#Summary> ?description.
		filter( 
			regex(str(?title), '.*?{% QUERY %}.*?')
		)
	} 
	*/}).toString().match(/\n([\s\S]*)\n/)[1];

SPARQLクエリは、?uriに書籍URI、?titleに書籍タイトル、?descriptionに書籍の内容が入力されるように記述してください。

SPARQLエンドポイントは、CORS(Cross-Origin Resource Sharing)に対応したもののみ利用できます。

## 動作環境

- Windows 7 + Internet Explorer 11
- Windows 7 + Google Chrome 36.0
- Windows 7 + Mozilla Firefox 30.0

## 利用ライブラリ

- [BookSearchApplication](https://github.com/theofilis/BookSearchApplication)
- [jQuery](http://jquery.com/)
- [Bootstrap](http://getbootstrap.com/)
- [moment.js](http://momentjs.com/)
- [Succinct](http://micjamking.github.io/succinct/)
- [SPARQL Timeliner](http://uedayou.net/SPARQLTimeliner/)

## ライセンス

Copyright &copy; 2014 Hiroshi Ueda([@uedayou](https://twitter.com/uedayou)). Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

