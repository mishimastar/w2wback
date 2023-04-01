import { readFileSync } from 'node:fs';
import { createServer, IncomingMessage } from 'node:http';

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

const processGet = async (
    req: IncomingMessage
): Promise<[data: string, status: number, content: string, location: string | undefined]> => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    switch (url.pathname) {
        case '/':
            return [readFileSync('./front/index.html', { encoding: 'utf-8' }), 200, mime.html, undefined];
        case '/index.css':
            return [readFileSync('./front/index.css', { encoding: 'utf-8' }), 200, mime.css, undefined];
        case '/built/index.js':
            return [readFileSync('./front/index.js', { encoding: 'utf-8' }), 200, mime.js, undefined];
        case '/built/tree.js':
            return [readFileSync('./front/dict.js', { encoding: 'utf-8' }), 200, mime.js, undefined];
        case '/built/dict.js':
            return [readFileSync('./front/tree.js', { encoding: 'utf-8' }), 200, mime.js, undefined];

        case '/built/index.js.map':
            return [readFileSync('./front/index.js.map', { encoding: 'utf-8' }), 200, mime.js, undefined];
        case '/built/tree.js.map':
            return [readFileSync('./front/dict.js.map', { encoding: 'utf-8' }), 200, mime.js, undefined];
        case '/built/dict.js.map':
            return [readFileSync('./front/tree.js.map', { encoding: 'utf-8' }), 200, mime.js, undefined];

        default:
            return ['', 302, '', `http://${url.host}`];
    }
};

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(async (req, res) => {
    console.log('Request:', new URL(req.url!, `http://${req.headers.host}`));
    switch (req.method) {
        case 'GET':
            try {
                const [data, status, content, location] = await processGet(req);
                if (location) {
                    res.writeHead(status, { location });
                    res.end();
                } else {
                    res.writeHead(status, { 'Content-Type': content });
                    res.end(data);
                }
                // res.statusCode = status;
                // res.setHeader('Content-Type', 'text/html; charset=utf-8');
                // res.end(response);
            } catch (error) {
                console.error('Error: ', error);
                res.statusCode = 500;
                res.end();
            }
            // console.log(response);
            break;

        default:
            res.statusCode = 400;
            res.end();
            break;
    }
});

export const StartBack = async () => {
    await new Promise<void>((res) => server.listen(8080, res));
    console.log('web gui started on 8080');
};
export async function StopBack() {
    await new Promise<void>((res, rej) => server.close((e) => (e ? rej(e) : res())));
    console.log('web gui finished');
}
