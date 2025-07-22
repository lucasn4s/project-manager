export default function numberToWords(number) {
    const ones = ['', 'uma', 'duas', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const teens = ['onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
    const thousands = ['', 'mil', 'dois mil', 'três mil', 'quatro mil', 'cinco mil', 'seis mil', 'sete mil', 'oito mil', 'nove mil'];

    let result = '';

    if (number < 10) {
        result = ones[number];
    } else if (number < 20) {
        result = teens[number - 11];
    } else if (number < 100) {
        result = tens[Math.floor(number / 10)] + (number % 10 ? (' e ' + ones[number % 10]) : '');
    } else if (number < 1000) {
        result = hundreds[Math.floor(number / 100)] + (number % 100 ? (' e ' + numberToWords(number % 100)) : '');
    } else if (number < 10000) {
        result = thousands[Math.floor(number / 1000)] + (number % 1000 ? (' e ' + numberToWords(number % 1000)) : '');
    }

    return result;
}
