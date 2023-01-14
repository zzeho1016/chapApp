/*
<div class="outgoing_msg">
<div class="sent_msg">
  <p>Lorem Ipsum refers to text that the DTP (Desktop Publishing) industry use as replacement text when
    the real text is not </p>
  <span class="time_date"> 11:18 | Today</span>
</div>
</div>
*/

let username = prompt("이름을 입력하세요");
let roomNum = prompt("방번호를 입력하세요");

document.querySelector("#username").innerHTML = username;

const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(data.sender === username){
        //자기 자신일 경우 파란박스
        initMyMessage(data);
    } else{
        // 상대일 경우
        initYourMessage(data);
    }
}

//파란 박스
function getSendMsgBox(data) {

let md = data.createAt.substring(5, 10)
let tm = data.createAt.substring(11, 16)
convertTime = tm + "|" + md

 return `<div class="sent_msg">
 <p>${data.message}</p> 
 <span class="time_date"> ${convertTime}/ ${data.sender}</span>
</div>`;   

}

// 회색 박스
function getReceiveMsgBox(data) {


    let md = data.createAt.substring(5, 10)
    let tm = data.createAt.substring(11, 16)
    convertTime = tm + "|" + md
    
    return `<div class="received_withd_msg">
    <p>${data.message}</p> 
    <span class="time_date"> ${convertTime}/ ${data.receiver}</span>
   </div>`;   
   
   }
   
// 파란박스 초기화
function initMyMessage(data){
    let chatBox = document.querySelector("#chat-box");   // chat-box css선택자를 사용
    

    let sendBox = document.createElement("div"); // 
    sendBox.className = "outgoing_msg";

    sendBox.innerHTML = getSendMsgBox(data); // input의 값
    chatBox.append(sendBox); //     

    document.documentElement.scrollTop = document.body.scrollHeight; // 스크롤 밑으로

}
// 회색박스 초기화
function initYourMessage(data){
    let chatBox =  document.querySelector("#chat-box");   // chat-box css선택자를 사용
    

    let receiveBox = document.createElement("div"); // 
    receiveBox.className = "received_msg";

    receiveBox.innerHTML = getReceiveMsgBox(data); // input의 값
    chatBox.append(receiveBox); //     

    document.documentElement.scrollTop = document.body.scrollHeight;

}

// AJAX 채팅 메시지를 전송
async function addMessage(){
    //let chatBox = document.querySelector("#chat-box");   // chat-box css선택자를 사용
    let msgInput = document.querySelector("#chat-outgoing-msg");
    
    let chat = {
        sender:username,
        roomNum:roomNum,
        message:msgInput.value
    };

   fetch("http://localhost:8080/chat", {
        method:"post",
        body: JSON.stringify(chat), // json문자열로 변경
        headers: {
            "Content-Type":"application/json; charset=utf-8"
        }
    });
 
    msgInput.value = ""; // 공백처리
}

// 버튼 클릭시 메세지 전송
document.querySelector("#chat-send").addEventListener("click",() => {
    addMessage();
});

// 엔터시 메세지 전송
document.querySelector("#chat-outgoing-msg").addEventListener("keydown",(e) => {
    console.log(e.keyCode);
    if(e.keyCode === 13){
         //alert("입력됨");
         addMessage();
    }
});