const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// use middleware
app.use(cors());
app.use(express.json());

// user : dbuser1
// password : Tt0ds0BdjdMElyoe




const uri = "mongodb+srv://dbuser1:Tt0ds0BdjdMElyoe@cluster0.zdrmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
    await client.connect();
    const userCollection = client.db("foodExpress").collection("user");
    
    app.get('/user', async(req, res)=>{
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);

    })

    // POST User: add a new user
    app.post('/user', async(req, res) => {
      const newUser = req.body;
      console.log('adding new user', newUser);
      const result = await userCollection.insertOne(newUser);
      res.send(result)
    });
  }
  finally{
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('Running my node curd server')
});

app.listen(port, () =>{
    console.log("crud server is running")
})