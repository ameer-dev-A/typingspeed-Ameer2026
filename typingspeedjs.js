 const type = document.querySelector('.type');
   const level = document.querySelector('.data-level');
   let data={};
    fetch("data.json")
     .then(response => response.json())
     .then(json => {
        data = json;
      });
    
    
    //------------------started-------------------- 
      let started = document.querySelector('.started');
      
      let startedapp = document.querySelector('.startedapp');
      startedapp.onclick=()=>{
         started.style.display='none';
      }

    //------------------beat-------------------- 
       let beat = document.querySelector('.beat');
       let beat3 = document.querySelector('.beat3');
       let beat4 = document.querySelector('.beat4');
       let part002 = document.querySelector('.part022');
       let part003 = document.querySelector('.part033');
       let part004 = document.querySelector('.part044');
       let wpm2 = document.querySelector('.wpm2');
       let acc2 = document.querySelector('.acc2');
       let Charecters = document.querySelector('.charecters');
       let wpm3 = document.querySelector('.wpm3');
       let acc3 = document.querySelector('.acc3');
       let Charecters3 = document.querySelector('.charecters3');
       let wpm4 = document.querySelector('.wpm4');
       let acc4 = document.querySelector('.acc4');
       let Charecters4 = document.querySelector('.charecters4');
       
       beat.onclick=()=>{
        location.reload();
        part002.style.display='none';
       } 
       beat3.onclick=()=>{
        location.reload();
        part003.style.display='none';
       } 
        beat4.onclick=()=>{
        location.reload();
        part004.style.display='none';
       } 
      
    //------------------time-------------------- 
        const timer = document.querySelector('.time');
        const btnmin = document.querySelector('.min');
        const btnpass = document.querySelector('.pass');
        let counter = 60;
        let counter2=0;
        let counter2m = 0;
        let interv = null;
        let tot2 = level.textContent.length;
        
      btnmin.onclick =()=>{  
        btnmin.classList.add('min');
        btnpass.classList.remove('pass');
        type.addEventListener('input',()=>{
            if(interv!==null) return;
             interv = setInterval(function(){
                    counter--;
                    timer.innerHTML = counter;  
           if(counter === 0 ||
              type.textContent.length===level.textContent.length){
                clearInterval(interv);
               type.contentEditable = "false";
                finishTest();
              }
            },1000)  
            })
      }
btnmin.classList.remove('min');

      btnpass.onclick =()=>{  
        btnpass.classList.add('pass');
        btnmin.classList.remove('min');
        type.addEventListener('input',()=>{
            if(interv==null){
             interv =   setInterval(function(){
                    counter2++;
                    if(counter2 == 59){
                      counter2 = 0;
                      counter2m++;
                    }
                    timer.innerHTML =   String(counter2m).padStart(2, "0") +":" +String(counter2).padStart(2, "0");
            },1000)
            }
           if(type.textContent === level.textContent || type.textContent.length===level.textContent.length){
                    clearInterval(interv); 
                    interv = null;  
                    type.contentEditable = "false";
                     finishTest();
                    // part002.style.display="flex";     
                    timer.innerHTML=counter2;
              }
            });
      }
  btnpass.classList.remove('pass');
  
      //------------------level-------------------- 
        const easy = document.querySelector('.easy');
        const mid = document.querySelector('.mid');
        const hard = document.querySelector('.hard');
    
           function showtext(text){
         level.innerHTML = text
       .split('').map(letter=>`<span>${letter}</span>`)
       .join('');
       }

        function randomeasy(){
           const randomItem =data.easy[Math.floor(Math.random() * data.easy.length)];
           showtext(randomItem.text);
        }
       // Charecters.textContent = randomItem.length;
                function randommid(){
           const randomItem =data.medium[Math.floor(Math.random() * data.medium.length)];
           showtext(randomItem.text);
        }
                function randomhard(){
           const randomItem =data.hard[Math.floor(Math.random() * data.hard.length)];
           showtext(randomItem.text);
        }

    easy.onclick = () => {
    randomeasy();
    easy.classList.add('easy');
    mid.classList.remove('mid');
    hard.classList.remove('hard');
};
    easy.classList.remove('easy');

          mid.onclick=()=>{
            randommid();
          mid.classList.add('mid');
          easy.classList.remove('easy');
          hard.classList.remove('hard');
        }
        mid.classList.remove('mid')
        
          hard.onclick=()=>{
            randomhard();
          hard.classList.add('hard');
          mid.classList.remove('mid');
          easy.classList.remove('easy');
        }
        hard.classList.remove('hard')
      // //---------------best-----wpm--------------------------------  
      
      const best = document.querySelector('.best');   
      const wpm = document.querySelector('.wpm');

      let bestwpm =Number(localStorage.getItem('best')) ||0;
      if (!Number.isFinite(bestwpm)) {
            bestwpm = 0;
          }
      best.textContent = bestwpm;

       function finishTest() { 
       
       let currentWpm = Number(wpm.textContent);
          
        //  bestwpm = currentWpm;
        
if ( bestwpm === 0){
    bestwpm = currentWpm;
    part002.style.display = "flex";
      }
 else if (currentWpm > bestwpm && bestwpm>0) {
        bestwpm = currentWpm;
        part003.style.display = "flex"; 
        
    }else if (currentWpm < bestwpm ){
        part004.style.display = "flex"; 
    }
    localStorage.setItem("best", bestwpm);
        best.textContent = bestwpm;
  }

       
    //--------------------accurancy--------------------------------
      const accur = document.querySelector('.acc');   
      let totalmistakes=0;
      type.addEventListener('input',(event)=>{
        const typ = type.textContent;
        const lev = level.textContent;
        let cou = 0;
      //  let hasError = false;
           if (event.inputType !== 'deleteContentBackward' && 
           event.inputType !== 'deleteContentForward') {
        const currentIndex = typ.length - 1; 
        // موقع الحرف الذي كُتب للتو
      
        // إذا كان الحرف المكتوب لا يطابق الحرف المقابل له في النص الأصلي
        if (typ[currentIndex] !== lev[currentIndex]) {
            totalmistakes++; // سجل خطأ تراكمي لا يُمحى بالـ Backspace
        }
    }
      // for(let i=0 ; i < typ.length; i++){
      //  if(typ[i]=== lev[i]){
      //   cou++;
      //  }
      // };

  //=======charecters=======
        const spans= document.querySelectorAll('.data-level span');
        const  typed= type.textContent.split('');
        let correct=document.querySelector('.correct');
        let uncorrect=document.querySelector('.uncorrect');
        let correct3=document.querySelector('.correct3');
        let uncorrect3=document.querySelector('.uncorrect3');
        let correct4=document.querySelector('.correct4');
        let uncorrect4=document.querySelector('.uncorrect4');

        let correcter = 0;
        let uncorrecter = 0;
       
        spans.forEach((span,index)=>{
            span.classList.remove('type-under','type-under2');
          if(typed[index]==null)return;
          if(typed[index]===span.textContent){
            span.classList.add('type-under2');
            correcter++;
          }else{
             span.classList.add('type-under')
             uncorrecter++;
          }
          correct.textContent=correcter+"/";
          uncorrect.textContent=uncorrecter;
          

          correct3.textContent=correcter+"/";
          uncorrect3.textContent=uncorrecter;

          correct4.textContent=correcter+"/";
          uncorrect4.textContent=uncorrecter;

        })
        console.log(typed);
console.log(
  [...document.querySelectorAll('.data-level span')].map(s => s.textContent)
);
                        // -----best--wpm----------

          const wpmlenght = Math.round(correcter/5);
          wpm.innerHTML=wpmlenght;
          wpm2.textContent =wpmlenght ;
          wpm3.textContent =wpmlenght ;
           wpm4.textContent =wpmlenght ;
       
  // -------------------------------------------------
  //     if (hasError) {
  //   type.classList.add('type-under');
  // } else {
  //   type.classList.remove('type-under');
  // }
      
      // إجمالي المحاولات = عدد الحروف الصحيحة الحالية + الأخطاء التراكمية التي حدثت
    const tot = correcter + totalmistakes;
    let acc =0; // الدقة الافتراضية

    if (tot > 0) {
        // الدقة = (الحروف الصحيحة الحالية / إجمالي المحاولات) * 100
        acc = (correcter / tot) * 100;
    }
    // const tot = lev.length;
    //   let acc = 0 ;
    //   if(tot>0){
    //   acc = (cou/tot)*100;
    //   }
      accur.innerHTML = acc.toFixed(0)+"%";
      acc2.innerHTML = acc.toFixed(0)+"%";
      acc3.innerHTML = acc.toFixed(0)+"%";
      acc4.innerHTML = acc.toFixed(0)+"%";
     })

    //--------------------small screen--------------------------------

const select = document.getElementById("select1");

select.addEventListener("change", function () {
    if (this.value === "easy") randomeasy();
    else if (this.value === "mid") randommid();
    else randomhard();
});
              //------------------time-------------------- 
const select2 = document.getElementById("select2");

select2.addEventListener("change", function () {
    if (this.value === "min") btnminf();
    else btnpassf();
});   
      
        function btnminf(){  
    btnmin.classList.add("min");
    btnpass.classList.remove("pass");

    type.oninput = function () {
        if (interv) return;
        interv = setInterval(() => {
            counter--;
            timer.textContent = counter;
            if (
                counter <= 0 ||
                type.textContent.length >= level.textContent.length
            ) {
                clearInterval(interv);
                interv = null;
                type.contentEditable = "false";
                finishTest();
            }

        }, 1000);

    };

}
function btnpassf(){

    btnpass.classList.add('pass');
    btnmin.classList.remove('min');

    type.oninput = function(){
        if(interv === null){
            interv = setInterval(function(){
                counter2++;
                if(counter2 === 60){
                    counter2 = 0;
                    counter2m++;
                }
                timer.innerHTML =
                    String(counter2m).padStart(2,"0") + ":" +
                    String(counter2).padStart(2,"0");
            },1000);
        }
        if(
            type.textContent === level.textContent ||
            type.textContent.length === level.textContent.length
        ){
            clearInterval(interv);
            interv = null;
            type.contentEditable = "false";
            finishTest();
            timer.innerHTML =
                String(counter2m).padStart(2,"0") +
                ":" +
                String(counter2).padStart(2,"0");
        }

    };
}

const pp = document.querySelector(".pp");

function updateBestText() {
    pp.textContent = window.innerWidth < 600
        ? "Best :"
        : "Personal best :";
}

updateBestText(); // عند تحميل الصفحة
window.addEventListener("resize", updateBestText); 