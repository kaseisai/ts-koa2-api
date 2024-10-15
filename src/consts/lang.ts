export enum Lang {
    ZhCn = 'zh-cn',
    EnUs = 'en-us',
    ZhTw = 'zh-tw',
}

export const checkLang = (lang: string): boolean => {
    let res: boolean = false;
    Object.keys(Lang).forEach((val: string) => {
        if (Lang[val] === lang) {
            res = true;
        }
    });
    return res;
};
