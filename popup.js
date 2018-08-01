let butSend = document.getElementById('but_send_form');

//=====  GET IF-MES BLOCKS
let mesSuc = document.getElementById('mes-suc');
let mesEror = document.getElementById('mes-error');

let masData = {
	'name': '',
	'group': '',
	'links': '',
	'background': '',
	'choise': '',
	'title': ''
};


ajaxTake();  //=====  FULL SELECT

getDataPage();  //=====  TAKE DATA-PAGE

// sendData();

function choice(color) {
	document.getElementById('background').value = color;
}


let colorInp = document.querySelectorAll('.js-back-cont__item');

//=====  GET COLOR
for (let i = 0; i < colorInp.length; i++ ) {
	let colorInpOne = colorInp[i];
	colorInpOne.addEventListener('click', function (event) {
		document.getElementById('background').value = this.getAttribute('data-color');
		event.preventDefault();
	});
}


//=====  SENT DATA
if (butSend) {
	
	butSend.addEventListener('click', function () {
		
		masData['name'] = document.getElementById('name').value;
		masData['group'] = document.getElementById('select').value;
		masData['links'] = document.getElementById('link').value;
		masData['background'] = document.getElementById('background').value;
		
		masData['choise'] = document.getElementById('choise_back').checked ? 1 : 0;
		
		masData['title'] = document.getElementById('title_text').value;
		
		ajaxSend();
	});
}


function getXhrObject(){
	if(typeof XMLHttpRequest === 'undefined'){
		XMLHttpRequest = function() {
			try { return new window.ActiveXObject( "Microsoft.XMLHTTP" ); }
			catch(e) {}
		};
	}
	return new XMLHttpRequest();
}

//=====  FILL THE SELECT
function fillSel (data) {
	let select = document.getElementById('select');
	
	data.forEach(function (n) {
		let selOpot = document.createElement('option');
		selOpot.innerHTML = n;
		if (selOpot && select) select.appendChild(selOpot);
	});
}


//=====  TAKE CATEGORIES
function ajaxTake() {
	var params = [];
	params.push('directories=true');
	
	// var url = 'http://localhost/ajax-ex/add_del_group.php';
	// var url = 'https://ron17.h19.ru/ex/ajax-ex/add_del_group.php';
	var url = 'http://ruraeghw.beget.tech/ajax-ex/add_del_group.php';
	var xhr = getXhrObject();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200){
			let con = JSON.parse(xhr.responseText);
			fillSel(con['name']);
		}
	}
	xhr.send(params.join('&'));
}


//=====  SEND DATA
function ajaxSend() {
	
	let params = [];
	
	for (let key in masData) {
		params.push(key + '=' + masData[key]);
	}
	
	// let url = 'http://localhost/ajax-ex/creatLink.php';
    // let url = 'http://localhost/ajax-ex/add_del_group.php';
    // let url = 'http://ron17.h19.ru/ex/ajax-ex/creatLink.php';
    let url = 'http://ruraeghw.beget.tech/ajax-ex/creatLink.php';
	
	let xhr = getXhrObject();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200){
			let con = JSON.parse(xhr.responseText);
			if (con == 1) {
				mesEror.style.display = 'block';
				setTimeout( () => { mesEror.style.display = 'none'; }, 2000);
			} else {
				takeScreen();
				mesSuc.style.display = 'block';
				setTimeout( () => { mesSuc.style.display = 'none'; }, 2000);
			}
		}
	}
	xhr.send(params.join('&'));
}


//=====  TAKE SCREEN
function takeScreen() {
	
	let params = [];
	
	for (let key in masData) {
		params.push(key + '=' + masData[key]);
	}
	
	// let urlScreen = 'http://localhost/ajax-ex/screenIcon.php.php';
	// let urlScreen = 'http://ron17.h19.ru/ex/ajax-ex/screenIcon.php.php';
	let urlScreen = 'http://ruraeghw.beget.tech/ajax-ex/screenIcon.php.php';
	
	let xhr = getXhrObject();
	xhr.open('POST', urlScreen, true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4 && xhr.status === 200){
			let con = JSON.parse(xhr.responseText);
		}
	}
	xhr.send(params.join('&'));
}


//=====  GET DATA-PAGE
function getDataPage() {
	
	if (chrome && chrome.tabs && chrome.tabs.executeScript) {
		
		chrome.tabs.executeScript({
			code: '(' + function() {
				return {title: window.document.title, url: window.location.href};
			} + ')();'
		}, function(results) {
			document.getElementById('name').value = results[0]['title'];
			document.getElementById('name').select();
			document.getElementById('link').value = results[0]['url'];
		});
		
	}
	
}