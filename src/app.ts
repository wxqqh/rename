// import * as iconv from "iconv-lite";
import * as fs from "fs";
import * as debug from "debug";

const LOG = debug(`${__dirname}${__filename}`);
const ERROR = debug(`${__dirname}${__filename}:ERROR`);

import * as entity from "./entity";
import * as query from "./query";
import * as disc from "./disc";
import * as services from "./services";

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

        // const result = await query.CharactersWWWName321Net(name, sex, birthday);
        // LOG(`Character finish ${result}`);

        // const nameResult = await query.NameWWWName321Net(name);
        // LOG(`Name finish ${JSON.stringify(nameResult)}`);

        const start = 0;
        const end = 30; // disc.GirlsDouble.length;
        const names = disc.GirlsDouble.slice(start, end).map((val) => firstName + val);
        const batchActionService = new services.BatchActionService<entity.Name>();

        const results = await batchActionService.batchActoin(names, query.NameWWWName321Net);
        LOG(`Name finish ${JSON.stringify(results[0])}`);
        fs.writeFile(`./dist/result_${start}_${end}.json`, JSON.stringify(results), (err) => {
            if (err) {
                ERROR(`write file json error ${err.stack}`);
                return;
            }
            LOG(`Write Name json finish ${results.length}`);
        });

        const csv = services.NamesOutputService.output(results);

        fs.writeFile(`./dist/result_${start}_${end}.csv`, csv, (err) => {
            if (err) {
                ERROR(`write file csv error ${err.stack}`);
                return;
            }
            LOG(`Write Name csv finish ${results.length}`);
        });

    } catch (e) {
        ERROR(e);
    }
};

main();
