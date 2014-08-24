function getBook(id) {
    var query = book_query.replace("{% URI %}", id);
    qr = sendQuery(endpoint, query);
    qr.fail(
        function (xhr, textStatus, thrownError) {
            alert("Error: A '" + textStatus+ "' occurred.");
        }
    );
    qr.done(
        function (json) {
            var content ="";
            var title = "";
            var thumbnail = "img/book.png";

            for(var i=0;i<json.results.bindings.length;i++) {
                var item = json.results.bindings[i];

                if (item.p.value == labelURI) {
                    var title = item.o.value;
                }else if (typeof thumbnailURI !== 'undefined' && item.p.value == thumbnailURI) {
                    var thumbnail = item.o.value;
                }
                var prop = (item.p.value in prop_labels)?prop_labels[item.p.value]:item.p.value;
                content += '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'
                + prop +'</h3></div><div class="panel-body">'
                + item.o.value +'</div></div>';
            }

            $('.thumbnail').append('<img src="' + thumbnail + '" alt="...">');
            $('.page-header').append("<h1>" + title + "&nbsp;&nbsp;&nbsp;&nbsp;<small>" + "" + "</small></h1>");
            $("#bookinfo").html(content);
        }
    );
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    var id = getParameterByName('id');
    $('#back').click(function (e) {
        e.preventDefault();
        window.history.back(-1);
    });
    getBook(id);
});
