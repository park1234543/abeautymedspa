const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const fs = require('fs');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('mp4', 'mov', 'webm');

const VIDEOS = {
  '/spa-background.mp4':                  path.join(__dirname, 'assets/videos/spa-background.mp4'),
  '/spa-background-web.mp4':              path.join(__dirname, 'assets/videos/spa-background-web.mp4'),
  '/assets/videos/spa-background.mp4':    path.join(__dirname, 'assets/videos/spa-background.mp4'),
  '/assets/videos/spa-background-web.mp4': path.join(__dirname, 'assets/videos/spa-background-web.mp4'),
};

const IMAGES = {
  '/hero-spa.jpg':                path.join(__dirname, 'assets/images/hero-spa.jpg'),
  '/assets/images/hero-spa.jpg':  path.join(__dirname, 'assets/images/hero-spa.jpg'),
};

const DEV_DOMAIN = process.env.REPLIT_DEV_DOMAIN || '';

const QR_PAGE = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Expo Go QR</title>
<style>
  body{margin:0;background:#0d0a06;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;color:#fff;padding:24px;box-sizing:border-box}
  h2{color:#D4A574;letter-spacing:2px;font-weight:300;margin:0 0 8px}
  p{color:rgba(255,255,255,0.5);font-size:13px;margin:0 0 28px;text-align:center}
  .qr-box{background:#fff;padding:16px;border-radius:12px;margin-bottom:20px}
  .url{background:rgba(255,255,255,0.07);border:1px solid rgba(212,165,116,0.3);border-radius:8px;padding:12px 16px;font-size:12px;color:#D4A574;word-break:break-all;text-align:center;max-width:340px}
  .note{color:rgba(255,255,255,0.35);font-size:11px;margin-top:16px;text-align:center}
</style>
</head>
<body>
<h2>A Beauty Med Spa</h2>
<p>안드로이드 <strong style="color:#D4A574">Expo Go</strong> 앱으로 스캔하세요</p>
<div class="qr-box">
  <img id="qr" src="" alt="QR Code" width="260" height="260"/>
</div>
<div class="url" id="url-text"></div>
<div class="note">Expo Go 앱 없으면 Play 스토어에서 "Expo Go" 설치 후 스캔</div>
<script>
  var expoUrl = 'exp://kkvbcme-anonymous-5000.exp.direct';
  var url = expoUrl;
  document.getElementById('url-text').textContent = url;
  document.getElementById('qr').src = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=2&color=000000&bgcolor=ffffff&data=' + encodeURIComponent(url);
</script>
</body>
</html>`;

const _originalEnhance = config.server && config.server.enhanceMiddleware;
if (!config.server) config.server = {};

config.server.enhanceMiddleware = (metroMiddleware, server) => {
  const base = _originalEnhance
    ? _originalEnhance(metroMiddleware, server)
    : metroMiddleware;

  return (req, res, next) => {
    const urlPath = req.url.split('?')[0];

    if (urlPath === '/qr') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(QR_PAGE);
      return;
    }
    const videoFile = VIDEOS[urlPath];
    const imageFile = IMAGES[urlPath];

    if (imageFile) {
      try {
        const stat = fs.statSync(imageFile);
        res.writeHead(200, {
          'Content-Length': String(stat.size),
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*',
        });
        fs.createReadStream(imageFile).pipe(res);
      } catch (e) {
        console.error('[image] error:', e.message);
        res.writeHead(404); res.end('Not found');
      }
      return;
    }

    if (videoFile) {
      try {
        const stat = fs.statSync(videoFile);
        const fileSize = stat.size;
        const range = req.headers['range'];

        if (range) {
          const match = range.match(/bytes=(\d+)-(\d*)/);
          if (!match) { res.writeHead(400); res.end('Bad range'); return; }
          const start = parseInt(match[1], 10);
          const end = (match[2] && match[2] !== '')
            ? Math.min(parseInt(match[2], 10), fileSize - 1)
            : Math.min(start + 2 * 1024 * 1024 - 1, fileSize - 1);
          const chunkSize = end - start + 1;
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': String(chunkSize),
            'Content-Type': 'video/mp4',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(videoFile, { start, end }).pipe(res);
        } else {
          res.writeHead(200, {
            'Content-Length': String(fileSize),
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
            'Access-Control-Allow-Origin': '*',
          });
          fs.createReadStream(videoFile).pipe(res);
        }
      } catch (e) {
        console.error('[video] error:', e.message);
        res.writeHead(500); res.end('Server error');
      }
      return;
    }

    base(req, res, next);
  };
};

module.exports = config;
