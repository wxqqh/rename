// import * as iconv from "iconv-lite";

import * as debug from "debug";

const LOG = debug(`${__dirname}${__filename}`);
const ERROR = debug(`${__dirname}${__filename}:ERROR`);

import * as query from "./query";
import { __await } from 'tslib';

const firstName = "伍";
const midName = "芷";
const lastName = "巧";

const sex = "女";

const birthday = new Date(2018, 10, 6, 17, 20);

// const buf = Buffer.from("ZHjO6dzGx8k=", "base64");
// const buf = Buffer.from([0xc5, 0xae]);
// LOG(`buf ${iconv.decode(buf, "GB2312")}`);

const main = async () => {
    try {
        const name = firstName + midName + lastName;
        LOG(`start ${name} ${sex} ${birthday.toUTCString()}`);
        
        const result = await query.CharactersWWWName321Net(name, sex, birthday);
        LOG(`Character finish ${result}`);

        const nameResult =await query.NameWWWName321Net(name);
        LOG(`Name finish ${nameResult}`);
    } catch (e) {
        ERROR(e);
    }
};

main();
