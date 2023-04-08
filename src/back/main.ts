import { once } from 'node:events';

import { StartBack, StopBack } from './server';

export async function Start() {
    console.log('current path: ', process.cwd());
    await StartBack();

    await Promise.race([once(process, 'SIGINT'), once(process, 'SIGTERM')]);
    //   await NotReady();

    await StopBack();
}

Start().catch(console.error);
