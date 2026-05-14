let btn1 = document.querySelector("#thirty");
let btn2 = document.querySelector("#sixty");
let btn3 = document.querySelector("#ninety");
let url = "https://random-word-api.herokuapp.com/word?number=";

async function getText(val){
    try {
        let res = await axios.get(url+val);
        return res.data;
        // Temporarily bypassing API
        // return ["this", "is", "a", "temporary", "test", "array"];
    } catch(err){
        console.log("error: ", err);
        return [];
    }
}

let typing = false;

btn1.addEventListener("click", async ()=>{
    let text = await getText("30");
    if(!typing){
        typing = true;
        let div1 = document.querySelector("#btn");
        div1.classList.add("hidden");
        let h1 = document.querySelector("h1");
        h1.classList.add("hidden");
        print(text);
    }
})
btn2.addEventListener("click", async ()=>{
    let text = await getText("60");
    if(!typing){
        typing = true;
        let div1 = document.querySelector("#btn");
        div1.classList.add("hidden");
        let h1 = document.querySelector("h1");
        h1.classList.add("hidden");
        print(text);
    }
})
btn3.addEventListener("click", async ()=>{
    let text = await getText("90");
    if(!typing){
        typing = true;
        let div1 = document.querySelector("#btn");
        div1.classList.add("hidden");
        let h1 = document.querySelector("h1");
        h1.classList.add("hidden");
        print(text);
    }
})

let actualArr = [];
let spanList;

function print(text){//to print text onto screen and make a char array
    let passText = [];
    let cnt = 0;
    for(let word of text){
        //forming char array
        cnt++;
        let wordChar = word.split("");
        for(let char of word){
            passText.push(char);
        }
        if(cnt < text.length)  passText.push(" "); 

    }
    console.log(passText);
    actualArr = passText;

    //forming paragraph text
    let outer = document.querySelector("#text");
    outer.innerText = "";
    for(let char of passText){
        let span = document.createElement("span");
        span.innerText = char;
        outer.appendChild(span);
    }
    spanList = document.querySelectorAll("#text span");
    console.log(spanList);
}

let userArr = [];
let firstPress = false;
let startTime, endTime;
let idx = 0;    //char at actualArr[idx] will be matched to user input

addEventListener("keydown", match);

function match(e){

    if(!typing){
        return;
    }

    //detect first key press
    if(!firstPress){
        firstPress = true;
        startTime = Date.now();
    }
    if(e.key.length === 1){//valid char
        userArr.push(e.key);
        if(userArr.at(-1) == actualArr[idx]){//char match
            if(idx < spanList.length){
                spanList[idx].classList.remove("incorrect");
                spanList[idx].classList.remove("pending");
                spanList[idx].classList.add("correct");
            }
        }
        else{
            if(idx < spanList.length){
                spanList[idx].classList.remove("correct");
                spanList[idx].classList.remove("pending");
                spanList[idx].classList.add("incorrect");
            }
        }
        idx++;
        if(idx < spanList.length) spanList[idx].classList.add("pending");
    }
    if(e.keyCode == 8){ //backspace
        if(userArr.length > 0){
            idx--;
            spanList[idx].classList.remove("correct");
            spanList[idx].classList.remove("incorrect");
            spanList[idx].classList.add("pending");
            if(idx+1 < spanList.length){
                spanList[idx+1].classList.remove("pending");
            }
            userArr.pop();
        }
    }
    if(idx == actualArr.length)  gameEnd();
}

function gameEnd(){
    endTime = Date.now();
    typing = false;
    idx = 0;
    let error = 0;
    let div1 = document.querySelector("#btn");
    div1.classList.remove("hidden");
    let h1 = document.querySelector("h1");
    h1.classList.remove("hidden");
    let outer = document.querySelector("#text");
    outer.innerText = "";
    let p = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");

    console.log(actualArr);
    console.log(userArr);
    for(let i = 0; i < userArr.length; i++){
        if(userArr[i] !== actualArr[i]) error++;
    }
    let accur = (actualArr.length-error)/(actualArr.length)*100;
    let accu = accur.toFixed(2);
    let minTaken = (endTime-startTime)/60000;
    let wpmTemp = (userArr.length/5)/minTaken;
    let wpm = (accur === 0) ? 0 : wpmTemp.toFixed(2);
    let actualW = ((actualArr.length-error)/5)/minTaken;
    let actualWpm = actualW.toFixed(2);

    p.innerText = `Accuracy = ${accu}%`;
    outer.appendChild(p);
    console.log(startTime);
    console.log(endTime);
    p2.innerText = `Gross WPM = ${wpm}`;
    outer.appendChild(p2);
    p3.innerText = `Net WPM = ${actualWpm}`;
    outer.appendChild(p3);

    actualArr = [];
    userArr = [];
    spanList = [];
    firstPress = false;
}
