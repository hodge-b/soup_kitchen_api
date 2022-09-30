const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soupkitchendatabase'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));



// API endpoints
// GET request
app.get('/api/get', (req, res) => {
    const query = "SELECT * FROM soup_kitchen_inventory";
    db.query(query, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// POST request
app.post('/api/insert', (req, res) => {
    const itemName = req.body.itemName;
    const itemImageLocation = req.body.itemImageURL;
    const itemQuantity = req.body.itemQuantity;
    const itemUnits = 'units';

    const query = "INSERT INTO soup_kitchen_inventory (itemName, itemImageLocation, itemQuantity, itemUnits) VALUES (?,?,?,?);";
    db.query(query, [itemName, itemImageLocation, itemQuantity, itemUnits], err => console.error(err ? 'error' : 'posted successfully'));
});

// PUT request
app.put(`/api/put/:id`, (req, res) => {
    const itemName = req.body.itemName;
    const itemImageLocation = req.body.itemImageLocation;
    const itemQuantity = req.body.itemQuantity;
    const itemUnits = req.body.itemUnits;

    const query = `UPDATE soup_kitchen_inventory SET itemName = '${itemName}', itemImageLocation = '${itemImageLocation}', itemQuantity = '${itemQuantity}', itemUnits = '${itemUnits}' WHERE id = '${req.params.id}'`;

    db.query(query, (err, result) => {
        if(err) throw err;
        console.log(result.affectedRows + " record(s) updated")
    });
});

// DELETE request
app.delete(`/api/delete/:id`, (req, res) => {
    const query = `DELETE FROM soup_kitchen_inventory WHERE id = '${req.params.id}'`;
    db.query(query, (err, result) => {
        if(err) throw err;
        console.log(result.affectedRows + ' record(s) deleted.')
    });
});


// set listener for server
app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
})