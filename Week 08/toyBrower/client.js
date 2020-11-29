const net = require('net')
const { parse } = require('path')

class Request {
  constructor(options) {
    this.methods = options.method || 'GET'
    this.host = options.host
    this.port = options.port || '80'
    this.path = options.path || '/'
    this.body = options.headers || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencodeed'
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencodeed') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length
  }

  send (connection){
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createServer({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }
      connection.on('data', (data) => {
        console.log(data.toString())
        parser.receive(data.toString())
        if (parser.isFinised) {
          resolve(parse.response)
          connection.end()
        }
      })

      connection.on('error', (err) => {
        reject(err)
        connection.end()
      })
    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
  }
}

class ResponseParser {
  constructor () {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7
  }

  receive(string) {
    for (let i = 0;i < string.lenght;i ++) {
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar(char) {

  }
}

void async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8888',
    path: '/',
    headers: {
      ['X-Foo2']: 'customed'
    },
    body: {
      name: 'liucui'
    }
  })

  let response = await request.send()

  console.log(response)
}()
