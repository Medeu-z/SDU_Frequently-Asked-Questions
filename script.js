const sheetId = '1vg98x1NHGZMsbAsQnljpE0xvcXGPskdMzDnImwfydEA';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Copy of FAQ answers';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
const data = []
let questions = []

document.addEventListener('DOMContentLoaded', init)

function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            const colz = [];
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    
                }
            })
            
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })

                data.push(row);
            });
            processRows(data);
        });
}
function processRows(arr) {
    const body = document.querySelector(".faq-list");
    for( i = 0; i < arr.length; i++ ){
        if(arr[i]["id"] === 1){
            const button = document.createElement('button');
                  button.classList.add('collapsible');
                  button.onclick = openContentFunction;
                  button.innerHTML = arr[i]["Questions"];
            const div = document.createElement('div');
                  div.classList.add('faq-content');
            let k = 1;
            const questionElements = [];
            for( j = i+1; j < arr.length; j++ ){
                if(arr[j]["id"] !== 1){
                    const card = document.createElement("div");

                    const cardQuestion = document.createElement("p");
                          cardQuestion.innerHTML = k +". "+ arr[j]["Questions"];
                          k++;
                          cardQuestion.classList.add('faq-content-question');
                    const cardAnswer = document.createElement("p");
                          cardAnswer.innerHTML = arr[j]["ENG"];
                          cardAnswer.classList.add('faq-content-answer');

                    card.append(cardQuestion, cardAnswer);
                    if(arr[j]["ENG"].length != 0){
                        div.append(card);
                        questionElements.push({ question: arr[j]["Questions"], element: card});   
                    }else{ k--; }
                }else{ break; }
            }
            questions.push({ questionElements: questionElements, button: button, div: div})
            body.append(button,div);
        }                    
    }
}
function onLanguageClick(obj){
    const arr = document.querySelectorAll(".lang");
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] == obj){
            obj.classList.add("activeLanguage");
            obj.classList.remove("notactiveLanguage");

        }else{
            arr[i].classList.add("notactiveLanguage");
            arr[i].classList.remove("activeLanguage");

        }
      }
    //console.log(obj.innerText);
  
}

function openNavBar(){
    document.querySelector('header').style.backgroundColor = "transparent";
    document.querySelector('header').style.backgroundColor = "transparent";
    document.querySelector('.logo').style.visibility = "hidden";
    document.querySelector("#openNav").classList.add("rotate");
    document.querySelector("#closeNav").classList.add("rotate");  
}
function closeNavBar(){
    document.querySelector('header').style.backgroundColor = "#082673";
    document.querySelector('.logo').style.visibility = "visible";  
    document.querySelector("#openNav").classList.remove("rotate");
    document.querySelector("#closeNav").classList.remove("rotate");
}
function openContentFunction() {
    var content = this.nextElementSibling;
        this.classList.toggle("active");
        if (content.style.maxHeight){
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        } 
}

function onInput(){
    const searchInput = document.querySelector("#search");
    let num = 0;
    const value = searchInput.value.toLowerCase();
    questions.forEach(element => {
        element.questionElements.forEach(q => {
            const isVisible = q.question.toLowerCase().includes(value)
            q.element.classList.toggle("hide", !isVisible)
            if(isVisible){num++;}
        })

        if(num === 0){
            element.button.classList.add("hide");
        }else{
            element.button.classList.remove("hide");
        }
        num = 0;

    })
}



