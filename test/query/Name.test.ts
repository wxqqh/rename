import * as assert from "assert";

import * as query from "../../src/query";

const LOG = getLogger(__filename);
const name = "伍芷巧";

describe(__filename, () => {
    it("query NameWWWName321Net response success", async () => {
        const result = await query.NameWWWName321Net(name);
        LOG(`Name finish ${JSON.stringify(result)}`);

        assert.notEqual(result, null);

        assert.equal(result.name, name);
        assert.notEqual(result.totalScore, 0);
    });
});
