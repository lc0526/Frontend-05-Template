const http = require('http')

http.createServer((request, response) => {
  let body = []
  request.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body.push(chunk.toString())
  }).on('end', () => {
    body = body.join('')
    console.log(`body: ${body}`)
    response.writeHead(200, {'Content-type': 'text/html'})
    response.end(' Hello World\n')
  })
}).listen(8088)

console.log('server started! port is 8088')