import * as assert from "assert";

import * as iconv from "iconv-lite";
import * as debug from "debug";

const LOG = debug(`${__dirname}${__filename}`);

const name = "伍芷巧";

describe(__filename, () => {
    it("iconv encode success", () => {
        const buffer = iconv.encode(name, "GB2312");
        assert.notEqual(buffer.length, 0);

        const decode = iconv.decode(buffer, "GB2312");
        assert.equal(decode, name);
    });
    it("Name query param", () => {
        const query = iconv.encode("dx" + name, "GB2312");
        assert.equal(query.toString("base64"), "ZHjO6dzGx8k=");
    });
});
