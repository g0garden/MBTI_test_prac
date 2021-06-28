const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation="fadeIn 1s";
    result.style.animation ="fadeIn 1s";
    
    setTimeout(()=>{
      qna.style.display = "none";
      result.style.display="block";
    }, 450)})
}


//data에서 q순서에 맞는 answer들 버튼으로 보여주기
function addAnswer(answerText, qIdx){
  let a = document.querySelector('.answerBox');
  let answer = document.createElement('button');
  answer.classList.add('answerList'); //버튼만들면서 클래스명도 같이 넣어주렴 그래야 나중에 이벤트등록하지!
  answer.classList.add('my-5');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    let childrenBtn = document.querySelectorAll('.answerList');
    for(let i = 0; i < childrenBtn.length; i++){
      childrenBtn[i].disabled = true;
      childrenBtn[i].style.animation = "fadeOut";
      childrenBtn[i].style.WebkitAnimation = "fadeOut";
    }
    setTimeout(()=>{
      for(let i = 0; i < childrenBtn.length; i++){
        childrenBtn[i].style.display = "none";
      }
      goNext(++qIdx);//다음질문으로 넘어가야지
    },450)
  },false);
}


function goNext(qIdx){
  if(qIdx+1 === endPoint){
    goResult();
    return;
  }
  let q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);
  }
  let status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';

}

//시작하기 버튼 클릭 후 천천히 Q&A화면으로 넘어가기
function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation="fadeIn 1s";
    qna.style.animation ="fadeIn 1s";
    setTimeout(()=>{
      main.style.display = "none";
      qna.style.display="block";
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}