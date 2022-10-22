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


var page = 1,
            moving = false;
        var animationIteration = "animationiteration webkitAnimationIteration mozAnimationIteration oAnimationIteration oanimationiteration",
            transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
        $(".load-more").on("click", function () {
            if (moving == false) {
                moving = true;
                $(".load-more").addClass("active");
                setTimeout(function () {
                    $(".load-more").one(animationIteration, function () {
                        $(".load-more").removeClass("active");
                        $(".load-more").one(transitionEnd, function () {
                            page++;
                            moving = false;
                        });
                    });
                }, 2000);
            }
        });