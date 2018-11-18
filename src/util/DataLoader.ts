import * as request from "request";
import * as iconv from "iconv-lite";
import * as debug from "debug";
const LOG = debug(`${__dirname}${__filename}`);

export const DataLoader = (options: request.Options) => {
    options.encoding = null;
    return new Promise<string>((resolve, reject) => {
        request(options, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                if (body) {
                    const result = iconv.decode(Buffer.from(body || [], "binary"), "gb2312").toString();
                    resolve(result);
                }
            } else {
                reject(err || res.statusCode);
            }
        });
    });
};
