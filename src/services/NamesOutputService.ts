import * as debug from "debug";

import * as json2csv from "json2csv";

const LOG = debug(`${__dirname}${__filename}`);
const ERROR = debug(`${__dirname}${__filename}:ERROR`);

export class NamesOutputService {
    public static output(): string {
        return "";
    }
}
