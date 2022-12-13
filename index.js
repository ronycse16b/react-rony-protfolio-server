const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
 require('dotenv').config();


// midelware.config
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qnzupqp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const projectsCollection = client.db('protfolio').collection('projects');
        


        app.get('/banner_services', async (req, res) => {
            const query = {}
            const cursor =projectsCollection.find(query);
            const services = await cursor.limit(3).toArray();
         
            res.send(services);
        });

        
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
         
            res.send(projects);
        });
        

        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(query);
            res.send(project);
        });
       

    }
    finally {

    }

}

run().catch(err => console.error(err));




 
 
app.get('/', (req, res) => {
 
    res.send('hello protfolio');
})
 
app.listen(port,()=>{
 
    console.log(`Listening on port ${port}`);
})
