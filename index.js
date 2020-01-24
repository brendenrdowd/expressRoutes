const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

app.get('/sum',(req,res)=>{
  const { a,b } = req.query
  
  if(!a || !b){
    return res.status(400).send('Please provide a number')
  }

  const sum = a + b
  const sentence = `the sum of ${a} and ${b} is ${sum}`
  res.send(sentence) 
})

app.get('/cipher',(req,res)=>{
  const text = req.query.text;
  const shift = Number(req.query.shift);

  if(!text){
    return res.status(400).send('Please provide text to encode')
  }
  if(!shift){
    return res.status(400).send('Please provide number to shift')
  }

  let encodedText = ""
  for(let i = 0; i< text.length;i++){
    let char = text.charCodeAt([i]) + shift
    encodedText+=(String.fromCharCode(char))
  }
  res.send(`${text} becomes ${encodedText}`)
})

app.get('/lotto',(req,res)=>{
  const arr = req.query.arr
  // Validations
  if(arr.length != 6){
    return res.status(400).send('Please enter 6 numbers')
  }
  arr.map((index) =>{
    index = Number(index)
    if(index > 20 || index < 1 ){
      return res.status(400).send('Please provide numbers between 1 and 20')
    }
  })
  let userNumbers = arr.sort((a, b) => a - b).toString()

  //randomizer function here
  let lotto = []
  for(let i = 0;i<6;i++){
    lotto.push(Math.floor(Math.random() * 20))
  }
  let winningNumbers = lotto.sort((a, b) => a - b).toString()
  console.log(userNumbers,winningNumbers)

  // comparing input to lottery numbers
  if(userNumbers == winningNumbers){
      return res.send("Congratulations! You win $10,000,000!")
  }else{
    return res.send("Wow! Unbelievable! You could have won the mega millions!")
  }
})

app.listen(8080,()=>{
  console.log("server is running")
})