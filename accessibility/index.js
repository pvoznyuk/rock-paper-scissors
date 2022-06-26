const pa11y = require('pa11y')

pa11y('http://localhost:8081/', {
  actions: [
    'click element #reset',
  ],
  log: {
    debug: console.log.bind(console),
    error: console.error.bind(console),
    info: console.log.bind(console),
  },
}).then((results) => {
  console.log(results)
})
