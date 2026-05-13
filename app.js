let btn1 = document.querySelector("#thirty");
let btn2 = document.querySelector("#sixty");
let btn3 = document.querySelector("#ninety");
let url = "https://random-word-api.herokuapp.com/word?number=";

async function getText(val){
    try{
        let res = await axios.get(url+val);
        console.log(res.data);
        return res.data;
    }   catch(err){
        console.log("error: ", err);
        return [];
    }
}

btn1.addEventListener("click", async ()=>{
    let text = await getText("30");
    print(text);
})
btn2.addEventListener("click", async ()=>{
    let text = await getText("60");
    print(text);
})
btn3.addEventListener("click", async ()=>{
    let text = await getText("90");
    print(text);
})

function print(text){//to print the text onto the screen and make a char array
    let passText = [];
    let cnt = 0;
    for(let word of text){
        //forming char array to match user input
        cnt++;
        let wordChar = word.split("");
        for(let char of word){
            passText.push(char);
        }
        if(cnt < text.length)  passText.push(" "); 

    }
    console.log(passText);

    //forming paragraph text
    let outer = document.querySelector("#text");
    outer.innerText = "";
    for(let char of passText){
        let span = document.createElement("span");
        span.innerText = char;
        outer.appendChild(span);
    }
    let spanList = document.querySelectorAll("span"); 
    console.log(spanList);
}