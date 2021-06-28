const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0]; //사용자가 어떤 선택(버튼)을 눌렀는지 알아야 결과 계산하지

function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select));
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  let resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  let imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

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
    setResult();

    
}


//data에서 q순서에 맞는 answer들 버튼으로 보여주기
function addAnswer(answerText, qIdx, idx){
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
      let target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
        
      }//몇번째 질문에서 몇번째 답을 선택했는지 select배열에 담긴다.
      for(let i = 0; i < childrenBtn.length; i++){
        childrenBtn[i].style.display = "none";
      }
      goNext(++qIdx);//다음질문으로 넘어가야지
    },450)
  },false);
}


function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }
  let q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
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