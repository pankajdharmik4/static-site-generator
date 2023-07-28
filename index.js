var { Eta } = require("eta")
const path = require("path")
const fs = require("fs")
// views directory
let viewpath = path.join(__dirname, "templates")

let eta = new Eta({ views: viewpath, cache: true })

//GET DATA 

async function getBoredData(){
    let response  = await fetch("https://www.boredapi.com/api/activity");
    const data = await response.json();
    console.log(data)
    return data;
}

async function Output(){
    const {key,activity,price,accessibility,type} = await getBoredData();

    const res = eta.render("./simple", { key: key ,price:price, activity:activity, accessibility:accessibility,type:type })
    
    fs.writeFileSync('./output/index.html',res,(err)=>{
    if(err)throw err;
})
}
Output()

