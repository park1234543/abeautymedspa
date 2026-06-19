const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILE = path.join(__dirname, 'mobile_download.zip');

const server = http.createServer((req, res) => {
  if (req.url === '/download' || req.url === '/') {
    const stat = fs.statSync(FILE);
    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="mobile_app.zip"',
      'Content-Length': stat.size,
    });
    fs.createReadStream(FILE).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Download server running on port ${PORT}`);
});
