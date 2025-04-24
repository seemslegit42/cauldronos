import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync } from 'fs';
import { join } from 'path';
import { renderToString } from 'react-dom/server';
import { matchRoutes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderServer } from './dist/umi.server';

const root = join(__dirname, 'dist');
const template = readFileSync(join(root, 'index.html'), 'utf-8');
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;

createServer(async (req, res) => {
  try {
    const { pathname } = parse(req.url || '/', true);
    
    // Static files
    if (/\.(js|css|map|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/.test(pathname || '')) {
      res.setHeader('Content-Type', getContentType(pathname || ''));
      try {
        const content = readFileSync(join(root, pathname || ''), 'utf-8');
        res.end(content);
      } catch (e) {
        res.statusCode = 404;
        res.end('Not found');
      }
      return;
    }
    
    // SSR
    const context: any = {};
    const { html, error } = await renderServer({
      path: pathname || '/',
      context,
      htmlTemplate: template,
      mountElementId: 'root',
    });
    
    if (error) {
      console.error('SSR Error:', error);
      res.statusCode = 500;
      res.end('Server Error');
      return;
    }
    
    if (context.url) {
      res.statusCode = 302;
      res.setHeader('Location', context.url);
      res.end();
      return;
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  } catch (error) {
    console.error('Server Error:', error);
    res.statusCode = 500;
    res.end('Server Error');
  }
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function getContentType(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  const contentTypeMap: Record<string, string> = {
    js: 'application/javascript',
    css: 'text/css',
    map: 'application/json',
    ico: 'image/x-icon',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    woff: 'font/woff',
    woff2: 'font/woff2',
    ttf: 'font/ttf',
    eot: 'application/vnd.ms-fontobject',
  };
  
  return contentTypeMap[ext || ''] || 'text/plain';
}
