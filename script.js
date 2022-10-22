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
    document.querySelector('body').style.backgroundColor = "rgba(0,0,0,0.4)";
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