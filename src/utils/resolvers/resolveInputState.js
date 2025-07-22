export default ({ valid, validated }) => {
    if (validated && !valid) {
        return 'error';
    }
    return 'default';
}
