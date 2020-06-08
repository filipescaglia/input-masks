/**
 * Function responsible for converting the received date
 * into the specified format.
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

function dateMask(input) { 
    date = input.value;
    date = date.replace(/\D/g,"");
    date = date.replace(/^(\d{2})(\d{2})/,"$1/$2");
    date = date.replace(/^(\d{2})\.(\d{2})(\d)/,"$1.$2.$3");
    date = date.replace(/\.(\d{2})(\d)/,".$1/$2");
    date = date.replace(/(\d{2})(\d)/,"$1/$2");
    input.value = date;
}

function dateTimeMask(input) {
    date = input.value;
    date = date.replace(/\D/g, "");
    date = date.replace(/^(\d{2})(\d{2})/,"$1/$2");
    date = date.replace(/^(\d{2})\.(\d{2})(\d)/,"$1.$2.$3");
    date = date.replace(/\.(\d{2})(\d)/,".$1/$2");
    date = date.replace(/(\d{2})(\d)/,"$1/$2");
    date = date.replace(/(\d{4})(\d)/, "$1 $2");
    date = date.replace(/(\d{4}) (\d{2})(\d)/, "$1 $2:$3");
    date = date.replace(/(\d{4}) (\d{2}):(\d{2})(\d)/, "$1 $2:$3:$4");
    input.value = date;
}

function cpfCnpjMask(input){
    number = input.value;
	if(number.length < 15){
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