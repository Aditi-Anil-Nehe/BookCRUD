const express = require('express')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 5000




app.get('/' , (req , res)=>res.send("Hello World! we are doing CRUD opration on books"))

const books = [{
  id:1,
  title:"NodeJS",
  author:"WisdomSprouts",
  price:354000,
  gen:"V1.1"

}]

app.get('/AllBooks',(req , res)=>{
    res.status(200).send({books : books})
})


app.get('/getBookById/:ID',(req , res)=>{
    console.log(req.params.ID)
    const ID = req.params.ID;
    const index = books.findIndex((b)=>b.id == ID)

    if(index == 1){
        res.status(400).send({msg:"BookNot Found", sucess: false})
    }else{
        const book = books.find((b)=>b.id == ID)
        res.status(200).send({book:books, status:true})
    }
})

app.post('/createBook',(req , res )=>{
    console.log(req.body)
    newBook = {
        id:Date.now(),
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        gen:req.body.gen
    }

    books.push(newBook)
    res.status(200).send({msg:"Book Added Successfully"})
})

app.delete('/deleteBook/:ID', (req, res)=>{

const ID = req.params.ID

const index = books.findIndex((b)=>b.id == ID)

if(index == -1){

res.status(400).send({mig: "Book not found", success:false})
}else{

books.splice(index, 1)
res.status(200).sand({mag: 'Book deleted successfully'})
}})



app.put("/updatslook/:ID",(req, res)=>{
ID = req.params.ID

const index = books.findIndex((b)=>b.id == ID)

if(index == -1){
  res.status(400).send({msg: "Book not found", success:false})

}else{

books[index].price = req.body.price || books[index].price
res.status(200).send({msg:"Book updated successfully"})
}

})


app.listen(port , ()=>console.log(`Example app listing on port ${port}!`))

//http://localhost:7777/AllBooks