var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(req,res)
{
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;

    if(pathname === '/'){
        if(title === undefined){
            {
                fs.readdir('./data', function(err,files)
                {
                    var title = 'Welcome';
                    var data = 'Hello, Node.js';
                   /*
                    var list = `<ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                  </ol>`;
                    */
                    var list = '<ul>';
                    for(i=0;i<files.length;i++)
                    {
                        list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
                    }
                    list = list + '</ul>';

                    var template = `<!doctype html>
                <html>
                <head>
                  <title>WEB1 - ${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  ${list}
                  <h2>${title}</h2>
                  <p>${data}
                  </p>
                </body>
                </html>
                `;
                res.writeHead(200);
                res.end(template);
                });
            }
        }
        else
        {
            fs.readdir('./data', function(err,files){
                fs.readFile(`data/${title}`,'utf8',function(err, data){
                    var list = '<ul>';
                    for(i=0;i<files.length;i++)
                    {
                        list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
                    }
                    list = list + '</ul>';
                    var template = `<!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    ${list}
                <h2>${title}</h2>
                <p>${data}
                </p>
                </body>
                </html>
                `;
                res.writeHead(200);
                res.end(template);
                })
            })
        }
    }
    else{
        res.writeHead(404);
        res.end('Not Found');
    }
});
app.listen(3000);