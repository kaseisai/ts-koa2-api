require('../scripts/main');

import { StaticFilesPathBll } from '../consts/website';
import { ExtractImageAttr, PdfExtractImageService } from '../service/common/pdf-extract-image';

async function getPdfImages(pdfNewPath: string): Promise<ExtractImageAttr[]> {
  const imageSaveDir = StaticFilesPathBll.current.uploadPathWithCurrentYearAndMonth();
  // 获取pdf中的图片
  const { uniqueImages, errMsg } = await PdfExtractImageService.current.extractImages(pdfNewPath, imageSaveDir);
  global.logger.info({
    message: '获取pdf中的图片',
    data: {
      uniqueImages,
      errMsg,
    },
  });
  if (errMsg !== 'success') {
    return [];
  }
  console.log('uniqueImage==>', uniqueImages);

  return uniqueImages;
}

getPdfImages('/Users/kaseisai/Documents/光电查/7223598509581479936.pdf');
