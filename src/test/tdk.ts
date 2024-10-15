import { pdfTxt2ProductPrompt, promptSystem } from '../consts/prompt/pdf-txt-2-product-prompt';
import { Pdf2Txt } from 'yuzhi-utils';
import { OpenAIService } from '../service/ai/openAI';
import { getAIResponse } from '../service/ai';
const pdfTransform = new Pdf2Txt();

async function run() {
  try {
    const convertRes = await pdfTransform.convert(
      'https://api.oe1.com/static-files/products/datasheet/6983713827882291200.pdf',
    );
    let pdfText = '';
    if (convertRes.msg === 'success') {
      pdfText = Buffer.from(convertRes.data).toString('utf-8');
    }
    if (!pdfText) return;
    console.log('开始请求open ai...');
    console.time('openAI 请求耗时 ===>');
    const openAIService = new OpenAIService();
    // return ;
    const openAiRes = await getAIResponse(
      openAIService,
      pdfTxt2ProductPrompt(pdfText, 'BB-100-11-1300/1550-9/125-S-50-SCUSCU-3-1', '光纤衰减器'),
      promptSystem,
    );
    console.timeEnd('openAI 请求耗时 ===>');
    console.log('返回结果', openAiRes);
  } catch (error) {
    console.log(error);
  }
}

// run();
