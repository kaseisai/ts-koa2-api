import { pinyin } from 'pinyin-pro';

export function initialFromName(name: string): string {
  // const [[first]] = pinyin(name, {
  //   style: pinyin.STYLE_FIRST_LETTER,
  // });
  const str = pinyin(name, { toneType: 'none' });

  const initial = str.charAt(0).toUpperCase();

  return initial;
}

const unfilled = '(未填)';

export function fieldToUiString(str?: string | null): string {
  if (str == null) {
    return unfilled;
  }

  str = str.trim();
  if (str.length <= 0) {
    return unfilled;
  }

  return str;
}
