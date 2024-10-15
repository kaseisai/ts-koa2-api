require('../scripts/main');
import * as fs from 'fs';
import { Pdf2Txt } from '../common/yz-utils/main';

const pdfConvert = new Pdf2Txt();

async function convert2TxtFromPath() {
  const pdfPath = '/Users/kaseisai/Documents/光电查/6b649cdc1c95a06f833a03b1e584d9b0.pdf';
  const txt = '/Users/kaseisai/Documents/光电查';
  if (!fs.existsSync(pdfPath)) {
    return;
  }
  if (!fs.existsSync(txt + '/6b649cdc1c95a06f833a03b1e584d9b0.txt')) {
    const res = await pdfConvert.convert(pdfPath);
    if (res.msg == 'success') {
      fs.writeFileSync(txt + '/6b649cdc1c95a06f833a03b1e584d9b0.txt', res.data);
    }
  } else {
  }
}

convert2TxtFromPath();
