const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('X-Foo', 'bar')
  res.writeHead(200, {'Content-type': 'text/html'})
  res.end(
    `<html lang="en">
<head>
  <style>
  body {
    font-size: 14px;
    color: #333;
  }
  img{
    width: 200px;
    height: 200px;
  }
  </style>
</head>
<body>
  <div>
    <img id="myImg" />
  </div>
</body>
</html>`)
})

server.listen(8088)

console.log('server started! port is 8088')