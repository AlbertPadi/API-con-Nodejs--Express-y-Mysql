const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json())

//MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodebd'
})

//Check connect
connection.connect(err => {
    if (err) throw err;
    console.log('Server running...')
    
})

app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
})

//Route's
/*app.get('/', (req, res)=> {
    res.send('Welcome to my API')
})*/

//Get all customers
app.get('/customers', (req, res)=> {
    const sql = 'SELECT *  FROM customers'
    connection.query(sql, (err, result)=> {
        if(err) throw err;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Not result')
        }
    })
})
//Get customer by Id
app.get('/customers/:id', (req, res)=>{
    const{id} = req.params
    const sql = `SELECT * FROM customers WHERE id = ${id}`
    connection.query(sql, (err, result)=>{
        if(err)throw err;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Error in data')
        }
    })
})
//Add customer
app.post('/add', (req, res)=> {
    const sql = 'INSERT INTO customers SET ?'
    const customerObj = {
        name: req.body.name,
        city: req.body.city
    }

    connection.query(sql, customerObj, err=>{
        if(err)throw err;
        res.send('Customer created successfully!')
    })
    
})
//Update some customer by Id
app.put('/update/:id', (req, res)=> {
    const {id} = req.params
    const{ name, city} = req.body
    const sql = `UPDATE customers SET name = '${name}', city = '${city}' WHERE id = '${id}'`

    connection.query(sql,  err=>{
        if(err)throw err;
        res.send('Customer updated successfully!')
    })
})
//Delete customer with Id
app.delete('/delete/:id', (req, res)=> {
    const {id} = req.params
    const sql = `DELETE FROM customers WHERE id = ${id}`
    connection.query(sql, err=> {
        if(err) throw err;
        res.send('Customer deleted successfully');
    })
})





