const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' });


  alpha.forex.rate('ZIL', 'BTC').then(data => {
    console.log(data)
  })
