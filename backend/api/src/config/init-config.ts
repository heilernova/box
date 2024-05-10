import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as dotenv from 'dotenv';

export const  APP_CONFIG = {
    version: ''
}

export const appInitConfig = () => {
    if (existsSync('package.json')){
        let packageObj = JSON.parse(readFileSync('package.json').toString());
        APP_CONFIG.version = packageObj.version;
    }

    if (existsSync('.env')) dotenv.config({ path: '.env'});

    // Preparamos el directorio de los archivos

    if (!process.env.APP_DIR_FILES){
        throw Error("No se ha definido la variable de entorno APP_DIR_FILES");
        process.exit(1);
    }

    if (!existsSync(process.env.APP_DIR_FILES)){
        mkdirSync(process.env.APP_DIR_FILES);
        mkdirSync(join(process.env.APP_DIR_FILES, 'products'))
    }
}