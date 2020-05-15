/**
 * User view [received/return]:
 *	yyyy-MM-dd -> return dd/MM/yyyy
 *	yyyy/MM/dd -> return dd/MM/yyyy
 *	yyyy.MM.dd -> return dd/MM/yyyy
 *	dd.MM.yyyy -> return dd/MM/yyyy
 *	dd/MM/yyyy -> return dd/MM/yyyy
 *	dd-MM-yyyy -> return dd/MM/yyyy
 * Database [received/return]:
 *	dd-MM-yyyy -> return yyyy-MM-dd
 *	dd/MM/yyyy -> return yyyy-MM-dd
 *	dd.MM.yyyy -> return yyyy-MM-dd
 *	yyyy-MM-dd -> return yyyy-MM-dd
 *	yyyy/MM/dd -> return yyyy-MM-dd
 *	yyyy.MM.dd -> return yyyy-MM-dd
 * Returns false if:
 *  date received is null
 *  mode != 'user' || 'database'
 *	1 > dd > 2
 *	1 > MM > 2
 *	2 > yyyy > 4
 * @param {string} date Date received.
 * @param {string} mode View mode, user by default.
 */
function formatDate(date, mode = 'user') {
    if(date != null) {
        let aux = '';
        let tLength = 0;
        let day = '';
        let month = '';
        let year = '';
        if(date.indexOf('/') != -1) aux = date.split('/');
        else if(date.indexOf('-') != -1) aux = date.split('-');
        else aux = date.split('.');
        tLength = aux[0].length + aux[1].length + aux[2].length;
        if(tLength > 8) return false;
        if(mode == 'user') { // format to user view.
            if(validateDate(date, 'db')) {
                if(aux[2].length == 1) day = '0';
                if(aux[1].length == 1) month = '0';
                if(aux[0].length == 2) year = '20';
                day += aux[2];
                month += aux[1];
                year += aux[0];
                return day + '/' + month + '/' + year;
            } else return false;
        } else if(mode == 'database') { // format to database.            
            if(validateDate(date)) {
                if(aux[0].length == 1) day = '0';
                if(aux[1].length == 1) month = '0';
                if(aux[2].length == 2) year = '20';
                day += aux[0];
                month += aux[1];
                year += aux[2];
                return year + '-' + month + '-' + day;
            } else return false;
        } else return false;
    } else return false;
}

/**
 * Function responsible for validating dates.
 * @param {string} date Date received.
 * @param {string} mode 'user' for dd/mm/yyyy or 'db' for yyyy-mm-dd.
 */
function validateDate(date, mode = 'user') {
    let regUser = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    let regDb = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    if(mode == 'user') return regUser.test(date);
    else return regDb.test(date);
}

function dateMask(input) { 
    date = input.value;
    date = date.replace(/\D/g,"");
    date = date.replace(/^(\d{2})(\d{2})/,"$1/$2");
    date = date.replace(/^(\d{2})\.(\d{2})(\d)/,"$1.$2.$3");
    date = date.replace(/\.(\d{2})(\d)/,".$1/$2");
    date = date.replace(/(\d{2})(\d)/,"$1/$2");
    input.value = date;
}

function cpfCnpjMask(input){
    number = input.value;
	if(number.length<15){
		number = number.replace(/\D/g,"");
		number = number.replace(/(\d{3})(\d)/,"$1.$2");
		number = number.replace(/(\d{3})(\d)/,"$1.$2");
		number = number.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
	} else{
		number = number.replace(/\D/g,"");
		number = number.replace(/^(\d{2})(\d)/,"$1.$2");
		number = number.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
		number = number.replace(/\.(\d{3})(\d)/,".$1/$2");
		number = number.replace(/(\d{4})(\d)/,"$1-$2");
	}
	input.value = number;
}

function phoneMask(input) {
    phone = input.value;
    phone = phone.replace(/\D/g,"");
    phone = phone.replace(/^(\d)/,"($1");
    phone = phone.replace(/(.{3})(\d)/,"$1) $2");
    if(phone.length == 9) {
        phone = phone.replace(/(.{1})$/,"-$1");
    } else if (phone.length == 10) {
        phone = phone.replace(/(.{2})$/,"-$1");
    } else if (phone.length == 11) {
        phone = phone.replace(/(.{3})$/,"-$1");
    } else if (phone.length == 12) {
        phone = phone.replace(/(.{4})$/,"-$1");
    } else if (phone.length > 12) {
        phone = phone.replace(/(.{4})$/,"-$1");
    }
    input.value = phone;
}

function preventLetterDoc(input) {
	document.querySelector(input).addEventListener('keydown', function (e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (!([8, 9, 13, 27, 46, 110, 189, 190, 193].indexOf(key) !== -1 ||
			(key == 65 && (e.ctrlKey || e.metaKey)) ||
			(key >= 35 && key <= 40) ||
			(key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
			(key >= 96 && key <= 105)
		)) e.preventDefault();
	});
}
function preventLetterPhone(input) {
	var t = document.querySelector(input);
	t.addEventListener('keydown', function (e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (!([8, 48, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105, 189].indexOf(key) !== -1 ||
			(key == 65 && (e.ctrlKey || e.metaKey)) ||
			(key >= 35 && key <= 40) ||
			(key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
			(key >= 96 && key <= 105)
		)) e.preventDefault();
	});
}