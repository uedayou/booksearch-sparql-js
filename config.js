// SPARQLエンドポイントURL
var endpoint = "http://lodcu.cs.chubu.ac.jp/SparqlEPCU/api/kyotobook_list";
// SPARQLクエリ（検索用) 
// ※ {% QUERY %} が検索文字列に置き換わります 
// ※ ?uri に書籍URI、?title にタイトル、?description に書籍の内容が入るようにSPARQLクエリを記述してください。（必須）
// ※ ?thumbnail に書籍に関する画像URLを入れるとリスト中で表示できます。（任意）
// ※ limit　と offset はつけないでください
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

// 書籍のタイトルを表すURIに書き換えてください
var labelURI = "http://linkdata.org/property/rdf1s1294i#title";

// 書籍の画像がある場合はここにURIを指定すると表示されるようになります。
//var thumbURI = "http://hogehoge/image";

// 1ページあたりの表示件数
var nlimit = 10;

// SPARQLクエリ(詳細表示用) ※通常変更する必要はありません。
var book_query = (function () {/*
select distinct ?p ?o where {
<{% URI %}> ?p ?o
}
*/}).toString().match(/\n([\s\S]*)\n/)[1];

var prop_labels = {
"http://purl.org/dc/terms/title":"タイトル",
"http://purl.org/dc/elements/1.1/title":"タイトル",
"http://schema.org/name":"タイトル",
"http://purl.org/dc/elements/1.1/creator":"著者",
"http://purl.org/dc/terms/creator":"著者",
"http://xmlns.com/foaf/0.1/name":"名前",

"http://ndl.go.jp/dcndl/terms/transcription":"よみ",
"http://ndl.go.jp/dcndl/terms/publicationName":"誌名",
"http://ndl.go.jp/dcndl/terms/seriesTitle":"特集等",
"http://ndl.go.jp/dcndl/terms/pageRange":"巻号",
"http://purl.org/dc/elements/1.1/subject":"主題",
"http://purl.org/dc/elements/1.1/description":"注記",
"http://purl.org/dc/elements/1.1/source":"フルテキストURI",
"http://purl.org/dc/terms/issued":"出版年",
"http://purl.org/dc/terms/date":"出版月",

"http://linkdata.org/property/rdf1s1294i#title":"タイトル",
"http://linkdata.org/property/rdf1s1294i#Recommend_point":"おすすめ度",
"http://linkdata.org/property/rdf1s1294i#Author":"著者",
"http://linkdata.org/property/rdf1s1294i#Publisher":"出版社",
"http://linkdata.org/property/rdf1s1294i#place":"舞台",
"http://linkdata.org/property/rdf1s1294i#ISBN":"ISBN",
"http://linkdata.org/property/rdf1s1294i#Kyoto_degree":"京都度",
"http://linkdata.org/property/rdf1s1294i#Year":"出版年",
"http://linkdata.org/property/rdf1s1294i#Category":"カテゴリ",
"http://linkdata.org/property/rdf1s1294i#date":"登録日",
"http://linkdata.org/property/rdf1s1294i#Summary":"説明",
"http://www.w3.org/2003/01/geo/wgs84_pos#long":"経度",
"http://linkdata.org/property/rdf1s1294i#state%20of%20mind":"気分",
"http://www.w3.org/2003/01/geo/wgs84_pos#lat":"緯度"
};
