const screens=['cover','password','success'];
const inputs=[...document.querySelectorAll('.digits input')];
const error=document.querySelector('#error');
const submit=document.querySelector('#submit');
function show(name){document.activeElement?.blur();screens.forEach(id=>document.getElementById(id).hidden=id!==name);window.scrollTo(0,0)}
function update(){submit.disabled=!inputs.every(input=>/^\d$/.test(input.value))}
function reset(){inputs.forEach(input=>input.value='');update()}
function home(){if(error.open)error.close();reset();show('cover');document.querySelector('#unlock').focus({preventScroll:true})}
document.querySelector('#unlock').onclick=()=>{reset();show('password');inputs[0].focus()};
document.querySelector('#back').onclick=home;
document.querySelector('#restart').onclick=home;
document.querySelector('#dismiss').onclick=home;
error.addEventListener('cancel',event=>{event.preventDefault();home()});
inputs.forEach((input,index)=>{
 input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(-1);update();if(input.value&&index<3)inputs[index+1].focus()});
 input.addEventListener('focus',()=>input.select());
 input.addEventListener('keydown',event=>{if(event.key==='Backspace'&&!input.value&&index>0){inputs[index-1].value='';inputs[index-1].focus();update()}if(event.key==='ArrowLeft'&&index>0)inputs[index-1].focus();if(event.key==='ArrowRight'&&index<3)inputs[index+1].focus()});
 input.addEventListener('paste',event=>{event.preventDefault();const digits=event.clipboardData.getData('text').replace(/\D/g,'').slice(0,4-index);[...digits].forEach((digit,i)=>inputs[index+i].value=digit);update();inputs[Math.min(index+digits.length,3)].focus()});
});
document.querySelector('#form').addEventListener('submit',event=>{event.preventDefault();if(submit.disabled)return;document.activeElement.blur();if(inputs.map(input=>input.value).join('')==='5916'){reset();show('success');document.querySelector('.coordinates').focus({preventScroll:true})}else{error.showModal();document.querySelector('#dismiss').focus()}});
