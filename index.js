const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

async function run() {
    try{
        await client.connect();

        const database = client.db('userdb');
        const userCollection = database.collection('users');

        app.get('/users', async(req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            console.log('data in the server', req.body);
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })

        await client.db('admin').command({ping: 1})
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}

run().catch(console.dir)

app.use(cors());
app.use(express.json());

app.get('/',(req,res) => {
    res.send('Hello Worldd')
})

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`)
})