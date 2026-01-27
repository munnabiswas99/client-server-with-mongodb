const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express();
const port = 3000;

// User: sampleDBuser
// Pass: sVRaQHj4eOhvKSHI

const uri = "mongodb+srv://sampleDBuser:sVRaQHj4eOhvKSHI@cluster0.etxtqbz.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Hello Worldd')
})

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`)
})