import { once } from 'node:events';

import { StartBack, StopBack } from './server';

export async function StartGui() {
    console.log('current path: ', process.cwd());
    await StartBack();

    //   await Ready(5001);
    await Promise.race([once(process, 'SIGINT'), once(process, 'SIGTERM')]);
    //   await NotReady();

    await StopBack();
}

StartGui().catch(console.error);
