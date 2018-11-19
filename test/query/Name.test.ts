import * as assert from "assert";

import * as query from "../../src/query";
import * as debug from "debug";

const LOG = debug(`${__dirname}${__filename}`);
const name = "伍芷巧";

describe(__filename, () => {
    it("query name response success", async () => {
        const result = await query.NameWWWName321Net(name);
        LOG(`Name finish ${JSON.stringify(result)}`);

        assert.notEqual(result, null);

        assert.equal(result.name, name);
        assert.notEqual(result.totalScore, 0);
    });
});
