const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('mp4', 'mov', 'webm');

const VIDEO_PATH = path.join(__dirname, 'assets/videos/spa-background.mp4');

const _originalEnhance = config.server && config.server.enhanceMiddleware;
if (!config.server) config.server = {};

config.server.enhanceMiddleware = (metroMiddleware, server) => {
  const base = _originalEnhance
    ? _originalEnhance(metroMiddleware, server)
    : metroMiddleware;

  return (req, res, next) => {
    const urlPath = req.url.split('?')[0];

    if (urlPath === '/spa-background.mp4') {
      console.log('[video] range header:', req.headers['range'] || 'none');
      try {
        const stat = fs.statSync(VIDEO_PATH);
        const fileSize = stat.size;
        const range = req.headers['range'];

        if (range) {
          const match = range.match(/bytes=(\d+)-(\d*)/);
          if (!match) {
            res.writeHead(400);
            res.end('Bad range');
            return;
          }
          const start = parseInt(match[1], 10);
          const end = (match[2] && match[2] !== '')
            ? Math.min(parseInt(match[2], 10), fileSize - 1)
            : Math.min(start + 2 * 1024 * 1024 - 1, fileSize - 1);
          const chunkSize = end - start + 1;

          console.log(`[video] range ${start}-${end}/${fileSize} (${chunkSize} bytes)`);
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(chunkSize),
            'Content-Type': 'video/mp4',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(VIDEO_PATH, { start, end }).pipe(res);
        } else {
          console.log(`[video] full response ${fileSize} bytes`);
          res.writeHead(200, {
            'Content-Length': String(fileSize),
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(VIDEO_PATH).pipe(res);
        }
      } catch (e) {
        console.error('[video] error:', e.message);
        res.writeHead(500);
        res.end('Server error');
      }
      return;
    }

    base(req, res, next);
  };
};

module.exports = config;
