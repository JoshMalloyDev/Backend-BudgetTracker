const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Joshua:%40Whatsmyname1991@cluster0.sfayc.mongodb.net/?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3002, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/createBudget', (req, res) => {
   console.log(req.body, 'post')
    db.collection('messages').insertOne({ 
        budgetName: req.body.budgetName, 
        totalBudget: req.body.totalBudget, 
        moneySpent: req.body.moneySpent, 
        remainingBalance: req.body.remainingBalance,
    }, (err, result) => {
    if (err) return console.log(err)
     console.log(req.body)
     res.redirect('/')
   })
  })
  app.put('/checkItem', (req, res) => {
 console.log(req.body)
 
    db.collection('messages')
    .findOneAndUpdate({ budgetName: req.body.budgetName}, {
      $set: {
        remainingBalance:req.body.remainingBalance
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
  app.delete('/deleteBudget', (req, res) => {
    db.collection('messages').findOneAndDelete({ budgetName: req.body.budgetName}, (err, result) => {
     
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })