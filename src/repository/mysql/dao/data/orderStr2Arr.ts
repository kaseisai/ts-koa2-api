export function orderStr2Arr(orderStr: string) {
  const names = orderStr.split(',').map((name) => name.trim());
  let res = [];
  for (const n of names) {
    let orderByArr = [];
    if (n.startsWith('-')) {
      orderByArr = [n.substring(1), 'DESC'];
    } else {
      orderByArr = [n, 'ASC'];
    }
    res.push(orderByArr);
  }
  return res;
}
