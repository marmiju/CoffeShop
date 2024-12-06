const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000 ;

// middleware
app.use(cors());
app.use(express.json());


const db_username = process.env.DB_USER;
const db_passkey = process.env.DB_PASS;

//====================================


const uri = `mongodb+srv://${db_username}:${db_passkey}@cluster0.yzj1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

const collection = client.db('CoffeeDb').collection('Coffee');

app.post('/coffee', async(req,res)=>{
    const newcofee = req.body;
    const result = await collection.insertOne(newcofee);
    res.send(result);
    
})
app.get('/coffee',async(req,res)=>{
 const result =  await collection.find().toArray();
 res.send(result);
 console.log(result);

})

app.get('/',(req,res)=>{
    res.send('Hey! Wellcome to Cofee Bhai');
})

app.listen(port ,()=>{
  console.log("server running in port :"+port)
})