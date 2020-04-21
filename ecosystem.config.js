module.exports = {
  apps : [{
    name: "backlighter",
    script: "./app/index.js",
    watch: ["app", "src"],
    watch_delay: 1000,
    ignore_watch : ["src/client", "src/esp8266_firmware"],
  }]
}
