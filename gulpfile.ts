import { DBDataContext } from './src/repository/mysql/dbDataContext';
import { dest, series, src } from 'gulp';
import * as processC from 'child_process';
import * as fs from 'fs';

let buildDistDir = 'dist';
let currentVer = '';
let serverIP = '${serverIP}';
let serverUser = 'dev';

function getCurVer() {
  let pacakageJSONBUF = fs.readFileSync('package.json');
  let packageJSON = pacakageJSONBUF.toString();
  let matchResult = packageJSON.match(/version":.*?,/);
  let versionStr = matchResult[0];
  versionStr = versionStr.replace('version":"', '');
  versionStr = versionStr.replace('version": "', '');
  versionStr = versionStr.replace(/\",/g, '');
  let tmp = versionStr.split('.');
  return tmp.join('.');
}

function changeVersion(cb) {
  let pacakageJSONBUF = fs.readFileSync('package.json');
  let packageJSON = pacakageJSONBUF.toString();
  let matchResult = packageJSON.match(/version":.*?,/);
  let versionStr = matchResult[0];
  versionStr = versionStr.replace('version":"', '');
  versionStr = versionStr.replace('version": "', '');
  versionStr = versionStr.replace(/\",/g, '');
  let tmp = versionStr.split('.');

  let last = tmp[tmp.length - 1];
  last = (parseInt(last) + 1).toString();
  tmp[tmp.length - 1] = last;

  let newVersionStr = `version":"${tmp.join('.')}",`;
  currentVer = tmp.join('.');

  packageJSON = packageJSON.replace(/version":.*?,/, newVersionStr);

  fs.writeFileSync('package.json', packageJSON);
  cb();
}

function buildProject(cb) {
  console.log('version:', currentVer);
  cmd('rm -rf ./dist');
  cmd('npx tsc');
  cmd(`cp ./package.json ./dist`);
  cmd(`cp ./config.json ./dist`);
  cmd(`cp -rf ./src/common/locales ./dist/src/common`);

  cmd(`zip dpc_${currentVer}.zip ./dist -qr`);
  cmd(`scp dpc_${currentVer}.zip dev@192.168.0.152:/home/dev/dataPlatform`);
  cmd(`rm -rf dpc_${currentVer}.zip`);
  cmd(`ssh -t dev@192.168.0.152 "unzip -o /home/dev/dataPlatform/dpc_${currentVer}.zip -d /home/dev/dataPlatform"`);
  cmd(`ssh -t dev@192.168.0.152 "rm -rf /home/dev/dataPlatform/dpc_${currentVer}.zip"`);
  cmd(`ssh -t dev@192.168.0.152 "cd /home/dev/dataPlatform/dist && cnpm i"`);
  cmd(`ssh -t dev@192.168.0.152 "cd /home/dev/dataPlatform/dist && pm2 restart ./src/app.js --name dps"`);
  cb();
  process.exit();
}

function cmd(c: string) {
  console.log(c);
  console.log(processC.execSync(c).toString());
}

async function syncDB(cb) {
  process.env.NODE_ENV = 'syncdb';
  const dbDataContext = new DBDataContext('oe1');
  await dbDataContext.TestConnection();
  dbDataContext.SyncDB().then(() => {
    cb();
  });
}

exports.builds = series(changeVersion, buildProject);
exports.syncDB = series(syncDB);
