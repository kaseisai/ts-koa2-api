// 如果数字小于10，添加前缀0
function addPrefixZero(number: number) {
    if (number < 10) {
        return `0${number}`;
    }
    return String(number);
}

// 返回时间格式：20230317
export function getDateYmd(date: Date) {
    return `${date.getFullYear()}${addPrefixZero(1 + date.getMonth())}${addPrefixZero(date.getDate())}`;
}
