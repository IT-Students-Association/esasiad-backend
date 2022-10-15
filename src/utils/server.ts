import { appendFile } from 'fs';
import { resolve } from 'path';

function log(text: string): void {

    const currentTimeString = (new Date()).toLocaleTimeString();

    const serverLogString = `[${currentTimeString}]: ${text}\n`

    appendFile(`${resolve('./')}/backend.log`, serverLogString, () => {
        console.log(serverLogString);
    });
}

export default { log }