function getBooksList(q, page) {
    var startIndex= page ? page * nlimit : 0 ;
    $('#q').val(q);
    $('#content a').remove();           
    //var query = list_query.replace("{% QUERY %}", q)+" LIMIT "+nlimit+" offset "+startIndex;
    var query = list_query.split("{% QUERY %}").join(q)+" LIMIT "+nlimit+" offset "+startIndex;
    qr = sendQuery(endpoint, query);
    qr.fail(
        function (xhr, textStatus, thrownError) {
            alert("Error: A '" + textStatus+ "' occurred.");
        }
    );
    qr.done(
        function (json) {
            if(!json.results.bindings) {return;}
            if(json.results.bindings.length==10){
                $(".next").css("visibility","visible");
            }else{
                $(".next").css("visibility","hidden");
            }

            for (var i = 0; i < json.results.bindings.length; i++) {
                var item = json.results.bindings[i];
                var book_title = '<h4 class="list-group-item-heading">' + item.title.value + '</h4>';
                var book_img   = '<div class="col-lg-2"><img style="height: 204px; width:128px;" src="' + ((item.thumbnail) ? item.thumbnail.value : 'img/book.png') + '"/></div>';
                var book_desc  = '<p class="trunc">' + ((item.description.value) ? item.description.value : '') + '</p>';
                var list_body = '<div class="col-lg-10">' + book_title + book_desc + '</div>';
                var list_item = '<a href="book.html?id=' + encodeURIComponent(item.uri.value) + '" class="list-group-item"><div class="row">' + book_img + list_body + '</div></a>';
                document.getElementById("content").innerHTML += list_item;
                $('.trunc').succinct({size: 350});
            }
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
    var page = Number(getParameterByName('page'));
    var q = getParameterByName('q');
    $('.next').click(function (e) {
        e.preventDefault();
        $('#data').remove();
        page = page + 1;
        if(page > 0){
            $(".previous").css("visibility","visible");
        }
        getBooksList(q, page);
    });
    $('.previous').click(function (e) {
        e.preventDefault();
        $('#data').remove();
        if (page > 0) {
            page = page - 1;
            if(page == 0){
                $(".previous").css("visibility","hidden");
            }
        }
        getBooksList(q, page);
    });
    if(q.length>0) {getBooksList(q, page)};
});