/**
 * 图片压缩脚本：使用 sharp 压缩 images 目录下的图片，覆盖原文件前会备份到 images/original
 * 运行：node scripts/compress-images.js  或  npm run compress-images
 */
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'images');
const BACKUP_DIR = path.join(IMAGES_DIR, 'original');

async function compressImages() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('请先安装依赖: npm install');
    process.exit(1);
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('images 目录不存在');
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext) && fs.statSync(path.join(IMAGES_DIR, f)).isFile();
  });

  if (files.length === 0) {
    console.log('未找到可压缩的图片');
    return;
  }

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    console.log('已创建备份目录:', BACKUP_DIR);
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const stat = fs.statSync(inputPath);
    totalBefore += stat.size;

    const backupPath = path.join(BACKUP_DIR, file);
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    try {
      let pipeline = sharp(inputPath);
      const meta = await pipeline.metadata();
      const width = meta.width || 0;

      if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(inputPath)
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(inputPath + '.tmp');
      } else if (ext === '.png') {
        const useLossy = stat.size > 500 * 1024;
        if (useLossy && width > 1920) {
          await sharp(inputPath)
            .resize(1920, null, { withoutEnlargement: true })
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(inputPath + '.tmp');
        } else if (useLossy) {
          await sharp(inputPath)
            .png({ quality: 85, compressionLevel: 9 })
            .toFile(inputPath + '.tmp');
        } else {
          await sharp(inputPath)
            .png({ compressionLevel: 9 })
            .toFile(inputPath + '.tmp');
        }
      }

      if (fs.existsSync(inputPath + '.tmp')) {
        const newStat = fs.statSync(inputPath + '.tmp');
        fs.renameSync(inputPath + '.tmp', inputPath);
        totalAfter += newStat.size;
        const saved = ((1 - newStat.size / stat.size) * 100).toFixed(1);
        console.log(`${file}: ${(stat.size / 1024).toFixed(1)} KB → ${(newStat.size / 1024).toFixed(1)} KB (节省 ${saved}%)`);
      }
    } catch (err) {
      console.error(file, err.message);
      if (fs.existsSync(inputPath + '.tmp')) fs.unlinkSync(inputPath + '.tmp');
    }
  }

  if (totalAfter > 0) {
    const saved = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    console.log('\n总计:', (totalBefore / 1024 / 1024).toFixed(2), 'MB →', (totalAfter / 1024 / 1024).toFixed(2), 'MB (节省 ' + saved + '%)');
    console.log('原图已备份至:', BACKUP_DIR);
  }
}

compressImages().catch(e => { console.error(e); process.exit(1); });
