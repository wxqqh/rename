import * as iconv from "iconv-lite";

const LOG = getLogger(__filename);

import { DataLoader } from "../util";

export const CharactersWWWName321Net = async (name: string, sex: string, date: Date) => {

    const result = await DataLoader({
        url: "http://www.name321.net/baidu/cm.php",
        // proxy: "http://127.0.0.1:8888",
        method: "POST",
        form: {
            name: iconv.encode(name, "GB2312"),
            sex: iconv.encode(sex, "GB2312"),
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            submit: "submit"
        },
        qsStringifyOptions: {
            encoder: (obj: string | Buffer) => Buffer.isBuffer(obj) ? [].map.call(obj, ((char: number) => "%" + ("0" + char.toString(16).toUpperCase()).slice(-2))).join("") : obj
        }
    });

    return result;
};
