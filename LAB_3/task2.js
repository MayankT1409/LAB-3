const http = require('http');
const  fs = require('fs')
const path = require('path')


const port = 1403


const myServer = http.createServer((req,res)=>{

    const filePath = path.join(__dirname,req.url === '/' ? 'index.html' : req.url);

    const ext  = path.extname(filePath)
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
      }[ext] || 'application/octet-stream';
``

      fs.readFile(filePath,(err,data)=>{
        if(err){
            if(err.code === 'ENOENT'){
                res.writeHead(404,{'Content-Type': 'text/html'});
                res.end('<h1> 404 Not Found </h1>')
            }else{
                res.writeHead(500)
                res.end("Server Error")
            }
        }else{
            res.writeHead(200,{'Content-Type' : contentType})
            res.end(data)
        }
      })
})


myServer.listen(port,()=>{
    console.log(`Server starts at port : ${port}`)
})