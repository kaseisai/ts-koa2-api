import * as Koa from 'koa';
import path from 'path';

import { route, HttpMethod } from '../../common';
import { calculateImageHash, getImageAttributes, ImageExt } from '../../common/utils/image';
import { renameSync } from 'fs';
import { StaticFilesPathBll } from '../../consts/website';
import { StaticFilesDao } from '../../repository/mysql/dao/staticFiles';

export class StaticFileController {
  @route(HttpMethod.POST, '/static-file/upload')
  async staticFileUpload(ctx: Koa.Context) {
    const { file } = ctx.request.files as any;
    let { type, uniqueId = null } = ctx.request.body as any;
    type = Number(type);
    const { name } = file;
    const ext = path.extname(name);
    const hash = calculateImageHash(file.path);
    let width = null;
    let height = null;
    // 如果是图片，需要计算图片的hash, width, height
    if (ImageExt.includes(ext)) {
      const imageAttributes = getImageAttributes(file.path);
      width = imageAttributes.width;
      height = imageAttributes.height;
    }

    let filePath = StaticFilesPathBll.current.uploadPathWithCurrentYearAndMonth() + '/' + name;
    renameSync(file.path, filePath);

    const staticFileUrl = StaticFilesPathBll.current.uploadPath2BaseApiUrl(filePath);
    await StaticFilesDao.current.findOrCreate(
      { hash, name, ext, path: filePath, type, uniqueId },
      {
        hash,
        name,
        ext,
        width,
        height,
        path: filePath,
        url: staticFileUrl,
        type,
        uniqueId,
      },
    );
    ctx.sendApiRes({ name, hash, url: staticFileUrl });
  }
}
