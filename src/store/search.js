import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('search', () => {
    const searchString = ref('');

    return {
        searchString,
    };
});
