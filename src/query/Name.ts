import * as iconv from "iconv-lite";
import * as debug from "debug";
const LOG = debug(`${__dirname}${__filename}`);

import { DataLoader } from "../util";

export const NameWWWName321Net = (name: string) => {
    const query = iconv.encode("dx" + name, "GB2312");
    const result = DataLoader({
        url: `http://www.name321.net/xmdf.php?${encodeURIComponent(query.toString("base64"))}`
    });
    // 解析返回结果
    return result;
};
