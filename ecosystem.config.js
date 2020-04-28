module.exports = {
  apps: [{
    name: 'backlighter',
    script: './app/index.js',
    watch: ['app', 'src'],
    ignore_watch: ['./src/client', './src/esp8266_firmware'],
    node_args: '-r esm',
  }],
}
