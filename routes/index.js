let express = require('express');
let fs = require('fs');
let csvtojson = require('csvtojson');
let multer = require('multer');
let pg = require('pg');
let transaction = require('pg-transaction');
let router = express.Router();

const sqlInsert = 'INSERT INTO TEST (KEY,ADD_DATE,UPD_DATE,DATA1,DATA2,DATA3) VALUES (${key},${addDate},${uptDate},${data1},${data2},${data3}';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'csv.csv')
    }
})

let upload = multer({ storage: storage });

router.get('/', function (req, res, next) {
    res.render('index', {title:'Express'});
});

router.post('/csv', upload.single('csvFile'), function (req, res) {
    console.log('/csv POST');
    let stream = fs.createReadStream('uploads/csv.csv');
    let connectionString = "tcp://:postgres@localhost:5432/postgres";
    csvtojson()
        .fromStream(stream)
        .on('json', (jsonObj) => {
            console.log(jsonObj);
            pg.connect(connectionString, function(error, client) {
                if(error){
                    console.log('connect failed');

                } else {
                    console.log('connect pg');
                    client.query(sqlInsert, jsonObj );

                }

            });

        })
        .on('done', () => {
            console.log('end');
        });
    res.send('load complete');

});

module.exports = router;






