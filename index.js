var { Eta } = require("eta")
const path = require("path")
const fs = require("fs")

const express = require("express")
const app = express()
const port = 3000
const axios = require("axios");

// views directory
let viewpath = path.join(__dirname, "templates");

let eta = new Eta({ views: viewpath, cache: false })

app.use(express.static(__dirname + '/output'));

app.engine("eta", eta.render)
app.set("view engine", "eta")

//GET DATA 

// async function getBoredData(){
//     let response  = await fetch("https://www.boredapi.com/api/activity");
//     const data = await response.json();
//     console.log(data)
//     return data;
// }

// async function Output(){
//     const {key,activity,price,accessibility,type} = await getBoredData();

//     const data = eta.render("./simple", { key: key ,price:price, activity:activity, accessibility:accessibility,type:type })
    
//     fs.writeFileSync('./output/index.html',data,(err)=>{
//         if(err)throw err;
//     })
// }
// // Output()



// app.get("/", async (req, res) => {

//     var html = fs.readFileSync('./output/index.html','utf-8');
//     res.send(html)
// })

app.get('/',async (req,res)=>{
    res.send("Welcome to Static Site Generator")
})

app.get('/Home',async (req,res)=>{
    try {
        let response  = await axios.get("https://www.boredapi.com/api/activity");

        const {key,activity,price,accessibility,type} = response.data;
        
        const data = eta.render("./simple", { key: key ,price:price, activity:activity, accessibility:accessibility,type:type })

        
        await fs.writeFileSync('./output/index.html',data,(err)=>{
            if(err)throw err;
        })
        
        res.send(data)

    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})