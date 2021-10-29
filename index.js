
//Creating Random sentence using api.quotable.io
const Random_quote = 'https://api.quotable.io/random';
const displayQuote = document.getElementById('text-disp');
const inputquote = document.getElementById('typearea');
const timer = document.getElementById('timer')
const text = document.getElementById('txt')
const btn = document.getElementById('btn')
const avg = document.getElementById('avg')

//Check if the sentence is correct or not
inputquote.addEventListener('input',() => {
    const arrayQuote = displayQuote.querySelectorAll('span')
    const arrayValue = inputquote.value.split('')
    let ok = true;
    arrayQuote.forEach((characterspan,index) =>{
        const character = arrayValue[index]
        if(character == null){
            characterspan.classList.remove('correct')
            characterspan.classList.remove('incorrect')
            ok = false;
        }else if(character === characterspan.innerHTML){
            characterspan.classList.add('correct')
            characterspan.classList.remove('incorrect')
        }else{
            characterspan.classList.remove('correct')
            characterspan.classList.add('incorrect')
            ok = false;
        }
    }) 
    if(ok) {
        renderQuote();
        addrecord()
    }
})
//random quote genetrater
function getRandomQuote(){
    return fetch(Random_quote)
    .then(Response => Response.json())
    .then(data => data.content)
}
var quote = '';
async function renderQuote(){
    quote = await getRandomQuote()
    displayQuote.innerHTML = ''
    quote.split('').forEach(char => {
        const characterspan = document.createElement('span')
        characterspan.innerText = char;
        displayQuote.appendChild(characterspan)
    });
    inputquote.value = null;
    starttimer()
}
//timer function
let start
function starttimer(){
    timer.innerHTML = 0;
    start = new Date()
    setInterval(() =>{
        timer.innerText = getTimertime();
    },1000)

}
function getTimertime(){
    return Math.floor((new Date() - start)/1000)
}
//elements adding to record list and calculating average 
listadd()
function addrecord(){
    var wordlength = quote.length;
    var time = timer.innerHTML;
    if(time < 9){
        time = "0" + time
    }
    if(localStorage.getItem('items') == null){
        var arr = [];
        arr.push([wordlength.length,time]);
        localStorage.setItem('items',JSON.stringify(arr));
    }
    else{
        var prev = localStorage.getItem('items');
        arr = JSON.parse(prev);
        arr.push([wordlength,time]);
        localStorage.setItem('items',JSON.stringify(arr));
    }
    listadd();
}
function listadd(){
    let idx = 0;
    if(localStorage.getItem('items') == null){
        var arr = [];
        localStorage.setItem('items',JSON.stringify(arr));
    }
    else{
        prev = localStorage.getItem('items');
        arr = JSON.parse(prev)
    }
    let tablebody = document.getElementById('TableBody');
    let str = "";
    arr.forEach((element,index)=>{
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        </tr>        
        `
        idx++;
    });
    console.log(idx);
    if(idx >= 5){
        prev = localStorage.getItem('items');
        arr = JSON.parse(prev);
        arr.splice(0,1)
        localStorage.setItem('items',JSON.stringify(arr));
        listadd()
    }
    tablebody.innerHTML = str;
    let average = 0;
    let Atime = 0;
    let word = 0;
    arr.forEach((element) =>{
        Atime = Atime + Math.floor(element[1]);
        word = word + Math.floor(element[0]);
    })
    console.log(Atime)
    average = word/Atime;
    avg.innerHTML = Math.round(average);
    erasearea();
}
//erase function to delete all the data from record
function erasearea(){
    time = document.getElementById('timer').value = "";
}
function clearall(){
    alert("This will Clear all your Data")
    localStorage.clear();
    location.reload();
}
//display message if opened on mobile device
if(screen.width <= 700){
    alert("Use DeskTop for better experience")
}