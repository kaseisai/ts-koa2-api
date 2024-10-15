export function fillTo2Digits(num: number): string {
  return num.toString().padStart(2, '0');
}

// JSON.stringify converts Date to string in UTC time by default
// So we need this function to convert Date to string in local time
export function toJsonDate(d?: Date): string | null | undefined {
  if (d == null) {
    return null;
  }

  return `${d.getFullYear()}-${fillTo2Digits(d.getMonth() + 1)}-${fillTo2Digits(d.getDate())}T${fillTo2Digits(
    d.getHours(),
  )}:${fillTo2Digits(d.getMinutes())}:${fillTo2Digits(d.getSeconds())}`;
}

export function paramToSimpleArray(param?: string): string[] | undefined {
  if (param == null) {
    return undefined;
  }

  return param
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}
