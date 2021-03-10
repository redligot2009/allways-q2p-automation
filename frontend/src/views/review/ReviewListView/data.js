import { v4 as uuid } from 'uuid';

// export default [
//   {
//     id: uuid(),
//     totalPrice: 'P3000.00',
//     name: 'Jonathan Reyes',
//     orderID: '#29JKFSPSE',
//     productType: 'Book',
//     quantity: '500 copies',
//     totalPages: '225 pages',
//     length: '8.5 inches',
//     width: '11 inches',
//     numberColors: '4 colors (CMYK)',
//     orderPrice: 'P3000.00',
//     unitCost: 'P1000.00',
//     status: 'JOB ORDER'
//   },
//   {
//     id: uuid(),
//     totalPrice: 'P3000.00',
//     name: 'Jonathan Reyes',
//     orderID: '#29JKFSPSE',
//     productType: 'Book',
//     quantity: '500 copies',
//     totalPages: '225 pages',
//     length: '8.5 inches',
//     width: '11 inches',
//     numberColors: '4 colors (CMYK)',
//     orderPrice: 'P3000.00',
//     unitCost: 'P1000.00',
//     status: 'JOB ORDER'
//   },
//   {
//     id: uuid(),
//     totalPrice: 'P3000.00',
//     name: 'Jonathan Reyes',
//     orderID: '#29JKFSPSE',
//     productType: 'Book',
//     quantity: '500 copies',
//     totalPages: '225 pages',
//     length: '8.5 inches',
//     width: '11 inches',
//     numberColors: '4 colors (CMYK)',
//     orderPrice: 'P3000.00',
//     unitCost: 'P1000.00',
//     status: 'JOB ORDER'
//   },
// ];

const axios = require('axios');
axios.defaults.baseURL = "http://127.0.0.1:8000/";

let data = [];
axios.get('api/quotations/')
    .then( (result) => {
        // console.log(result.data);
        data = result.data;
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

 export default data;