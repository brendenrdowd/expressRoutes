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
  if(arr.length != 6){
    return res.status(400).send('Please enter 6 numbers')
  }
  for(let i = 0; i < arr.length; i++){
    arr[i] = Number(arr[i])
    if(arr[i] > 20 || arr[i] < 1 ){
      return res.status(400).send('Please provide numbers between 1 and 20')
    }
  }
  arr.sort((a, b) => a - b)
  //randomizer function here
  let lotto = []
  for(let i = 0;i<6;i++){
    lotto.push(Math.floor(Math.random() * 20))
  }
  lotto.sort((a, b) => a - b)
  console.log(lotto)

  for(let i = 0; i<arr.length; i++){
    if (arr[i] != lotto[i]){
      return res.send("Wow! Unbelievable! You could have won the mega millions!")
    }
  }
  return res.send("Congratulations! You win $10,000,000!")
})

app.listen(8080,()=>{
  console.log("server is running")
})