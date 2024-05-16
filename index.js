const fs = require('fs')
const { json } = require('stream/consumers')
const { fileURLToPath } = require('url')
fileStrings = []
function readToArray(){
    fs.readFile("data/text.txt",'utf8',(err,data)=>{
        if (err){
            console.error(err)
            return
        }
        fileStrings = data.split('\r\n')
        console.log(fileStrings)
    })
}
function readToArraySync(){
    fs.readFileSync("data/text.txt",'utf8',(err,data)=>{
        if (err){
            console.error(err)
            return
        }
        fileStrings = data.split('\r\n')
        console.log(fileStrings)
    })
}
function saveSync(){
    fs.writeFileSync('data/text.txt',fileStrings.join('\r\n'))
}
readToArraySync()
fileStrings.push('lastString')
console.log(fileStrings)
saveSync()



// json reading,writing etc
let fileJSON = []
function readjsonSync(){
    let data = fs.readFileSync('data/data.json','utf8')
    fileJSON = JSON.parse(data)
}
console.log(fileJSON)
fileJSON.push(5)
fileJSON.push(55)
fileJSON.push(556)

//save json file
function saveJSONSync(){
    fs.writeFileSync('data/data.json',JSON.stringify(fileJSON,null,2))
}
saveJSONSync()
readjsonSync()
console.log(fileJSON)


