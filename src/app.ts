// import * as iconv from "iconv-lite";
import * as fs from "fs";

import "./global/config";

import * as entity from "./entity";
import * as query from "./query";
import * as disc from "./disc";
import * as services from "./services";

const LOG = getLogger(__filename);
const ERROR = getLogger(__filename, "ERROR");

const firstName = "伍";

const main = async () => {
    try {

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
