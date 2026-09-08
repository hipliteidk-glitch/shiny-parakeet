const http = require('http'), fs = require('fs'), path = require('path');
http.createServer((req, res) => {
  let name;
  try { name = decodeURIComponent(req.url.split('?')[0]); } catch { res.writeHead(400); return res.end(); }
  if (name === '/') name = '/index.html';
  const file = path.resolve(__dirname, '.' + name);
  if (!file.startsWith(__dirname + path.sep) || name.split('/').some(p => p.startsWith('.'))) {
    res.writeHead(403); return res.end();
  }
  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const headers = { 'Content-Type': ({html:'text/html', js:'text/javascript', css:'text/css', mp4:'video/mp4'})[path.extname(file).slice(1)] || 'application/octet-stream', 'Accept-Ranges':'bytes' };
    let start = 0, end = stat.size - 1, status = 200;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (match && (match[1] || match[2])) {
        start = match[1] ? Number(match[1]) : Math.max(0, stat.size - Number(match[2]));
        end = match[1] && match[2] ? Math.min(Number(match[2]), end) : end;
      } else { start = -1; }
      if (start < 0 || start > end || start >= stat.size) { res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}); return res.end(); }
      status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length'] = end - start + 1;
    res.writeHead(status, headers);
    if (req.method === 'HEAD') return res.end();
    const stream = fs.createReadStream(file, {start, end});
    stream.on('error', () => res.destroy());
    res.on('close', () => stream.destroy());
    stream.pipe(res);
  });
}).listen(3000, '0.0.0.0');
