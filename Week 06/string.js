function UTF8_Encoding(string) {
  let codelist = []
  for (let i = 0; i < string.length;i ++) {
    let c = string.charCodeAt(i)
    if (c <= 0x7F) {
      codelist.push(c)
    } else if (c <= 0x7FF) {
      codelist.push((c >> 6) | 192)
      codelist.push((c & 63) | 128)
    } else if (c <= 0xFFFF) {
      codelist.push((c >> 12) | 124)
      codelist.push(((c >> 6) & 63) | 128)
      codelist.push((c & 63) | 128)
    }
  }
  return Buffer.from(codelist)
}
console.log(UTF8_Encoding('你好'))
