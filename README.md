# Input Masks

## Changelog
### v1.0:
- Masks:
  - Date, phone and CPF/CNPJ.
- Conversion of dates and validator.
### v1.1:
- Splitted 'date_formatter' file in two:
  - masks.js which contains only the masks functions.
  - utils.js which contains some useful functions as validators.
- Many changes to the README.
### v1.1.1:
- Mask:
  - DateTime.

Feel free to use.

- [x] basic javascript masks
- [ ] vue.js version (WIP)
- [ ] more masks (WIP)

#### Usage in vue.js:
While trying using this functions in vue.js, for some reason if a have two input fields that contains the v-model directive using the same mask (phoneMask for example), when I started typing on the second field, the first field changes the pattern. In addition, the change does not occur only when typing in fields that use the same mask.
So, I solved my problem with something like:
- In the mask function, I return the value, I don't directly change the field value.
- In the instance of vue, I created an auxiliary method that calls the mask function and then I change the value.

#### formatDate function:
```javascript
function formatDate(date, mode = 'user') {
  // process
}
```
Here is how this function works:
- User view [received/return]:
  - yyyy-MM-dd -> return dd/MM/yyyy
  - yyyy/MM/dd -> return dd/MM/yyyy
  - yyyy.MM.dd -> return dd/MM/yyyy
  - dd.MM.yyyy -> return dd/MM/yyyy
  - dd/MM/yyyy -> return dd/MM/yyyy
  - dd-MM-yyyy -> return dd/MM/yyyy
- Database [received/return]:
  - dd-MM-yyyy -> return yyyy-MM-dd
  - dd/MM/yyyy -> return yyyy-MM-dd
  - dd.MM.yyyy -> return yyyy-MM-dd
  - yyyy-MM-dd -> return yyyy-MM-dd
  - yyyy/MM/dd -> return yyyy-MM-dd
  - yyyy.MM.dd -> return yyyy-MM-dd
- Returns false if:
  - date received is null
  - mode != 'user' || 'database'
  - 1 > dd > 2
  - 1 > MM > 2
  - 2 > yyyy > 4

![Preview of the HTML](https://i.imgur.com/3oHeEJv.jpg)