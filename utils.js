/**
 * Function responsible for masking the email.
 * If your e-mail is: yourname@domain.com it will be masked as:
 * yo******@domain.com.
 * @param {string} email email to be masked.
 */
function maskEmail(email) {
	i = email.indexOf("@");
	if (i == 1) noMasked = email.substr(0, 1);
	else noMasked = email.substr(0, 2);
	masked = email.substr(2, i - 2);
	masked = masked.replace(/\w/g, "*")
	domain = email.substr(i);
	email = [noMasked, masked, domain];
	emailMasked = email.join('');
	return emailMasked;
}

/**
 * Function responsible for prevent letters in an input field
 * where the CPF/CNPJ will be inserted.
 * @param {string} input 
 */
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

/**
 * Function responsible for prevent letters in an input field
 * where the phone will be inserted.
 * @param {string} input 
 */
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

/**
 * Function responsible for validating the CPF or CNPJ (numbers only).
 * @param {string} v Value to be tested.
 */
function testDocument(v) {
    if(v.length === 11) {
        var Soma;
        var Resto;
        Soma = 0;
        if(v == "00000000000") return false;
        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(v.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;
        if((Resto == 10) || (Resto == 11)) Resto = 0;
        if(Resto != parseInt(v.substring(9, 10))) return false;
        Soma = 0;
        for(i = 1; i <= 10; i++) Soma = Soma + parseInt(v.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if((Resto == 10) || (Resto == 11)) Resto = 0;
        if(Resto != parseInt(v.substring(10, 11))) return false;
        return true;
    }
    if(v.length === 14) {
        if(v == "00000000000000" ||
            v == "11111111111111" ||
            v == "22222222222222" ||
            v == "33333333333333" ||
            v == "44444444444444" ||
            v == "55555555555555" ||
            v == "66666666666666" ||
            v == "77777777777777" ||
            v == "88888888888888" ||
            v == "99999999999999")
            return false;
        tamanho = v.length - 2
        numeros = v.substring(0, tamanho);
        digitos = v.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for(i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if(pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if(resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = v.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for(i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if(resultado != digitos.charAt(1))
            return false;
        return true;
    }
    return false;
}

/**
 * Function responsible for validating the email.
 * @param {string} v Value to be tested.
 */
function testEmail(v) {
    var re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
    return re.test(v.toLowerCase());
}

/**
 * Function responsible for validating the phone with 10 or 11 digits.
 * @param {string} v Value to be tested.
 */
function testPhone(v) {
    var regex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;
    if(regex.test(v)) return true;
    else return false;
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