const fs = require('fs')

let f = fs.readFileSync('./src/esp8266_firmware/connect_page.html', 'utf-8')
f = f.replace(/\s+/gm, ' ')
f = f.replace(/"/gm, '\\"')
let strings = f.split('\n')
strings = strings.map(s => s.trim())
const hfile = `#define connectPage "${strings.join('')}"`
fs.writeFileSync('./src/esp8266_firmware/connect_page.h', hfile, 'utf-8')
