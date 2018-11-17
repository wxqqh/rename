import * as iconv from "iconv-lite";

import * as debug from "debug";

const LOG = debug(`${__dirname}${__filename}`);
const Error = debug(`${__dirname}${__filename}:ERROR`);

import * as query from "./query";

const firstName = "伍";
const midName = "芷";
const lastName = "巧";

const sex = "男";

const birthday = new Date(2018, 10, 6, 17, 20);

// const buf = Buffer.from("ZHjO6dzGx8k=", "base64");
// const buf = Buffer.from([0xc5, 0xae]);
// LOG(`buf ${iconv.decode(buf, "GB2312")}`);

const main = async () => {
    try {
        const name = firstName + midName + lastName;
        LOG(`start ${name} ${sex} ${birthday.toUTCString()}`);
        const result = await query.CharactersWWWName321Net(name, sex, birthday);
        LOG(`finish ${result}`);
    } catch (e) {
        Error(e);
    }
};

main();
