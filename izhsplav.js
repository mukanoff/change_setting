
let xhr = new XMLHttpRequest();
let method = 'GET';
//let server = 'https://mukanoff-fastapi-64e8.twc1.net/';
let server = 'http://0.0.0.0:8000/';
let url = `${server}Bitrix/productlist?data=''&name=Мувыр `;//`https://mukanoff-fastapi-64e8.twc1.net/Bitrix/productlist?data=''&name=Мувыр`;
xhr.open(method, url, false);
xhr.send()

var dic_events = JSON.parse(xhr.response); 
//console.log(dic_events)
xhr.abort()
var inputDate = document.getElementById('inputDate');
var seats_total

adult_quantity = document.getElementById('adult_quantity');
adult_price = document.getElementById('adult_price');
adult_sum = document.getElementById('adult_sum');
children15_quantity = document.getElementById('children15_quantity');
children15_price = document.getElementById('children15_price');
children15_sum = document.getElementById('children15_sum');
children10_quantity = document.getElementById('children10_quantity');
children10_price = document.getElementById('children10_price');
children10_sum = document.getElementById('children10_sum');
children3_quantity = document.getElementById('children3_quantity');
children3_price = document.getElementById('children3_price');
children3_sum = document.getElementById('children3_sum');
total_sum = document.getElementById('total_sum');
total_quantity = document.getElementById('total_quantity');
button_pay = document.getElementById('pay');
ring = document.getElementById('ring');
agreement = document.getElementById('agreement');
term = document.getElementById('term');
tent3 = document.getElementById('3tent');
tent4 = document.getElementById('4tent');


let option_symbol = document.createElement("option");
option_symbol.value = '';
option_symbol.text = '';
inputDate.appendChild(option_symbol);

for (let item_symbol in dic_events) {
        let option_symbol = document.createElement("option");
        option_symbol.value = dic_events[item_symbol]['NAME'];
        option_symbol.text = dic_events[item_symbol]['NAME'].slice(-11);
        inputDate.appendChild(option_symbol);
    }

async function reset_fields(){
    adult_quantity.value = 0;
    children10_quantity.value = 0;
    children15_quantity.value = 0;
    children3_quantity.value = 0;
    adult_sum.innerHTML = 0;
    children15_sum.innerHTML = 0;
    children10_sum.innerHTML = 0;
    children3_sum.innerHTML = 0;
    total_quantity.innerHTML = 0;
    total_sum.innerHTML = 0;
}

async function get_total(){
    result = Number(adult_quantity.value)+Number(children15_quantity.value)+Number(children10_quantity.value)+Number(children3_quantity.value);
    if (result>seats_total){
        alert('до фига народу!!!!!');
        return false}
    total_quantity.innerHTML = result;
    total_sum.innerHTML = Number(adult_sum.innerHTML)+Number(children15_sum.innerHTML)+Number(children10_sum.innerHTML)+Number(children3_sum.innerHTML);
    return true}

inputDate.onchange = async function (e) {
    e.preventDefault();
    date_event = document.getElementById(e.target.id).value;
    date = date_event.slice(-11);
    seats_total = dic_events[date]['numberofseats']
    label_curent = document.getElementById('seats');
    label_curent.innerHTML = `Свободных мест: ${seats_total}`;
    adult_price.innerHTML = Number(dic_events[date]['PRICE']);
    children15_price.innerHTML = Number(dic_events[date]['PRICE'])* 0.8;
    children10_price.innerHTML = Number(dic_events[date]['PRICE'])* 0.6;
    reset_fields();}

adult_quantity.onchange = async function (e) {
    result = Number(adult_quantity.value);
    tax = result - 1;
    if (tax>17){tax = 15;}  
    adult_sum.innerHTML = result*Number(adult_price.innerHTML)*(1-tax/100);
    result = get_total();
    if (!result){adult_quantity.value =0;adult_sum.innerHTML = 0};}

children15_quantity.onchange = async function (e) {
    result = Number(children15_quantity.value);
    children15_sum.innerHTML = result*Number(children15_price.innerHTML);
    result = get_total();
    if (!result){children15_quantity.value =0;children15_quantity.innerHTML = 0};}

children10_quantity.onchange = async function (e) {
    result = Number(children10_quantity.value);
    children10_sum.innerHTML = result*Number(children10_price.innerHTML);
    result = get_total();
    if (!result){children10_quantity.value =0;children10_quantity.innerHTML = 0};}

children3_quantity.onchange = async function (e) {
    result = Number(children3_quantity.value);
    children3_sum.innerHTML = result*Number(children3_price.innerHTML);
    result = get_total();
    if (!result){children3_quantity.value =0;children3_quantity.innerHTML = 0};
}

button_pay.onclick = async function (e){
    e.preventDefault();
    phone = document.getElementById('phone');
    fio = document.getElementById('fio_input');
    mail = document.getElementById('email');
    trasfersum = document.getElementById('transfer_sum')

    if (agreement.checked && term.checked){
        result = `Заказчик ${fio.value}  телефон ${phone.value}  e-mail ${mail.value}
        Число участников ${total_quantity.innerHTML} Трансфер ${trasfersum.innerHTML} 
        Палатки3 ${tent3.value} Палатки4 ${tent4.value} 
        Итого ${total_sum.innerHTML}`;
        body = JSON.stringify({
            lidinfo: fio.value,
            phone: phone.value,
            mail : mail.value,
            numberofseats : total_quantity.innerHTML,
            transfer: trasfersum.innerHTML,
            tent3 : tent3.value,
            tent4: tent4.value
        })
        let xhr = new XMLHttpRequest();
        let method = 'POST';
        let url = `${server}api/users`;
        xhr.open(method, url, false);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        //xhr.bo
        xhr.send(body)  
        //var response = JSON.parse(xhr.response); 
        var response = xhr.response;
        response = response.replace('"','');
        console.log(response);
        document.location.href = response.slice(0,-1);
    }}
        //}}
        // const response = await fetch(`${server}api/users`, {
        //     method: "POST",
        //     headers: { "Accept": "application/json", "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         lidinfo: fio.value,
        //         phone: phone.value,
        //         mail : mail.value,
        //         numberofseats : total_quantity.innerHTML,
        //         transfer: trasfersum.innerHTML,
        //         tent3 : tent3.value,
        //         tent4: tent4.value
        //     })
        // });
        // console.log(response)
        // alert(result)
//         if (response.ok === true) {
//             const user = await response.json();
//             console.log(user.message)}
//         else {
//             const error = await response.json();
//             console.log(error.message);}
// }}

tent3.onchange = async function(e){
    if ((Number(tent3.value)*3 + Number(tent4.value)*4) >Number(total_quantity.innerHTML)+Number(tent3.value)+Number(tent4.value)){
        alert('ytkmpz!!!!!!!!!!!');
        tent3.value = 0;
    }
}

tent4.onchange = async function(e){
    if ((Number(tent3.value)*3 + Number(tent4.value)*4) >Number(total_quantity.innerHTML)+Number(tent3.value)+Number(tent4.value)){
        tent4.value = 0;
        alert('ytkmpz!!!!!!!!!!!');
    }
}
