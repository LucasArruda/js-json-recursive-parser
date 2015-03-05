var followKey;

var parseJSON = function (url, key) {
    followKey = key;
    parser(url);
};

var parser = function (url) {
    url = fixURL(url);
    console.log(url);

    $.getJSON(url, function (data) {
        $.each(data, function (key, val) {
            if (key == followKey) {
                parser(val);
            } else {
                $("body").append(val);
                console.log("{'"+ key +"':'"+ val + "'}");
            }
        });
    });
};

var fixURL = function (url) {
    return (url.indexOf(".json") == -1) ? appendJSON(url) : url;
}

var appendJSON = function (url) {
    var urlParser = extractURL(url),
        pathName = urlParser.pathname,
        pathNameSize = pathName.length-1;

    if (pathName.lastIndexOf('/') != pathNameSize) {
        urlParser.pathname = pathName + '.json';
    } else {
        urlParser.pathname = pathName.substring(0, pathNameSize) + '.json' + '/';
    }
    return urlParser.href;
};

var extractURL = function (url) {
    var urlParser = document.createElement('a');
    urlParser.href = url;
    return urlParser;
};

