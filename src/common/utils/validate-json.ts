/**
 * 检查一个输入的文本是否是一个json字符串且这个字符串是否满足对应的格式要求
 * @param input  输入的文本
 * @param format 一个js对象，定义需要的格式
 *
 */

export function validate_json(input, format) {
    try {
        let j = typeof input === 'string' ? JSON.parse(input) : input;

        // 对比format中的字段是否在j中也有，目前只对比一层就够了
        let pass = true;
        for (const i in format) {
            if (!j.hasOwnProperty(i)) {
                pass = false;
                break;
            }
        }

        return pass;
    } catch (error) {
        return false;
    }
}
