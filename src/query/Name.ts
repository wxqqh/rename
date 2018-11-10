import * as iconv from "iconv-lite";
import * as debug from "debug";
const LOG = debug(`${__dirname}${__filename}`);

import { DataLoader } from "../util";

export const NameWWWName321Net = (name: string) => {
    const query = "dx" + iconv.encode(name, "GB2312");
    return DataLoader({
        url: `http://www.name321.net/xmdf.php?${encodeURIComponent(new Buffer(query).toString("base64"))}`
    });
};
