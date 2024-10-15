// 计算当前进程应该处理数组中的哪一段数据，返回起止点
// eg: pm2 start xxx.js -i 进程数 -- 分割数
export function calculatePm2ProcessNum(total: number): { start: number; end: number } {
  const args = process.argv.slice(2) || 0;
  const pm2Num = Number((args && args[0]) || 1);
  const pmId = process.env.pm_id || 0;
  const index = Number(pmId) % Number(pm2Num);

  // 总数有N份，分成m份，每m份处理N/m个数据
  const argNum = Math.round(total / Number(pm2Num));
  const start = argNum * index;
  const end = argNum * (index + 1);
  console.log('当前进程: ', args, pm2Num, index, '当前进程应该处理的数据====>', start, end);
  return { start, end };
}
