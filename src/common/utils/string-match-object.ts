export function extractJsonFromString(input) {
    const jsonObjects = [];
    let startIndex = 0;

    while (startIndex < input.length) {
        const start = input.indexOf('{', startIndex);
        const end = findMatchingClosingBraceIndex(input, start);

        if (start !== -1 && end !== -1) {
            const jsonString = input.substring(start, end + 1);

            try {
                const jsonObject = JSON.parse(jsonString);
                jsonObjects.push(jsonObject);
            } catch (error) {
                console.error('Error parsing JSON:', error.message);
            }

            startIndex = end + 1;
        } else {
            break;
        }
    }

    return jsonObjects;
}

function findMatchingClosingBraceIndex(input, startIndex) {
    let count = 0;

    for (let i = startIndex; i < input.length; i++) {
        if (input[i] === '{') {
            count++;
        } else if (input[i] === '}') {
            count--;

            if (count === 0) {
                return i;
            }
        }
    }

    return -1; // 没有找到匹配的右大括号
}
