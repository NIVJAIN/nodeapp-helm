const express = require('express');

const app = express();
console.log("Picking up from ARGS ", process.argv)
if(process.argv[2]){
    process.env.ENV_FILE_NAME = process.argv[2];
    console.log("Picking up from ARGS ", process.argv[2])
} else if (process.env.ENV_FILE_NAME == null){
    process.env.ENV_FILE_NAME = ".env.dev"
}
console.log("ENV_FILE_NAME", process.env.ENV_FILE_NAME )
// require('dotenv').config({ path: `.env.${ENV_FILE_NAME}` })
require('dotenv').config({ path: `env/${process.env.ENV_FILE_NAME }` })
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// Constants
const PORT = process.env.PORT || 9000;
const HOST = 'localhost';

// const db = `mongodb://${process.env.ME_CONFIG_MONGODB_ADMINUSERNAME}:${process.env.ME_CONFIG_MONGODB_ADMINPASSWORD}@${process.env.ME_CONFIG_MONGODB_SERVER}:27017/${process.env.ME_CONFIG_MONGODB_DATABASE_NAME}?authSource=admin`; 
// const db_url = process.env.MONGODB_URL;
 /* 
    # use below setup for docker mongo
# docker run -d --name mongodbd \
# -p 27017:27017 \
# -e MONGO_INITDB_ROOT_USERNAME=admin \
# -e MONGO_INITDB_ROOT_PASSWORD=password \
# mongo:latest

# docker exec -it <containerid>
# mongo -u "admin" -p "password" --authenticationDatabase  "admin"

# db.counters.insert({_id:"assetid",sequence_value:0})

or below

      Helm charts bitname
      export MONGODB_PASSWORD=$(kubectl get secret --namespace default ee-mongodb -o jsonpath="{.data.mongodb-passwords}" | base64 --decode | awk -F',' '{print $1}')
      To connect to your database from outside the cluster execute the following commands:
      kubectl port-forward --namespace default svc/ee-mongodb 27017:27017 &
      mongo --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD
      */ 
// const db = 'mongodb://root:passw0rd@localhost:27017/blockchain?authSource=admin' // helm chart mongodb make sure port forwarding is done before using below url
// App
// const db = process.env.DB_URL || 'mongodb://root:passw0rd@localhost:27017/blockchain?authSource=admin';
// const db = process.env.DB_URL || 'mongodb://username:password@localhost:27017/pod?authSource=admin';
// docker run -d -p 9990:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
// docker run -p 9900:9000 -e DB_URL="mongodb://admin:password@localhost:9990/pod?authSource=admin" nivjain/test
const db =  process.env.DB_URL || "mongodb://username:password@localhost:27017/pod?authSource=admin"; // docker container from aboce command
// const db = 'mongodb://username:password@localhost:27017/pod?authSource=admin' // mongo container running via 1-k8s
console.log("====================================================")
// console.log("process.env", process.env)
    console.log("GANACHE_URL ", process.env.GANACHE_URL)
console.log("====================================================")
console.log("Database==URL", db)
const options = {
    //   sslCA: ca,
    useNewUrlParser: true,
    //   reconnectTries: Number.MAX_VALUE,
    //   reconnectInterval: 500,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    //   createIndexes: true
};
mongoose.connect(db, options).then( function() {
    console.log("MongoDb Connection succesfull...")
})
.catch( function(err) {
    console.error(err);
});

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))
var server = require('http').createServer(app);
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: "Hello World\n"
//     })
// });

app.get("/", (req,res,next)=>{
    res.status(200).json({
        message: "Hello World\n"
    })
})
server.listen(PORT, async function(){
    console.log(`magik happens on this port => https://localhost:${PORT}`)
})


// mongodb://username:password@mongodb-service:27017/pod?authSource=admin
// docker run -p 9900:9000 -e DB_URL="mongodb://username:password@mongo:9990/pod?authSource=admin" nivjain/test

// helm upgrade aa helm-chart-nodeapp -f helm-chart-nodeapp/k8s-values.yaml