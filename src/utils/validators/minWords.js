import numberToWords from '../resolvers/numberToWords';

export default (value, min) => {
    if (min === 0) {
        return true;
    }

    if (typeof value !== 'string') {
        return false;
    }

    const words = value.trim().split(/\s+/);

    if (words.length < min || (words.length === 1 && words[0] === '')) {
        return `Por favor, digite ao menos ${numberToWords(min)} ${min == 1 ? 'palavra' : 'palavras'}`;
    }

    return true;
}