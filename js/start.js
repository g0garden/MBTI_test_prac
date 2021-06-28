const main = document.querySelector("#main");
const qna = document.querySelector("#qna");

//data에서 q순서에 맞는 answer들 버튼으로 보여주기
function addAnswer(answerText){
  let a = document.querySelector('.answerBox');
  let answer = document.createElement('button');
  a.appendChild(answer)
  answer.innerHTML = answerText;
}

function goNext(qIdx){
  let q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer);
  }
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