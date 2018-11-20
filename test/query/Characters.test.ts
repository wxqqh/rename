import * as assert from "assert";

import * as query from "../../src/query";

const LOG = getLogger(__filename);

const name = "伍芷巧";
const sex = "女";
const birthday = new Date(2018, 10, 6, 17, 20);

describe(__filename, () => {
    it("query CharactersWWWName321Net response success", async () => {
        const result = await query.CharactersWWWName321Net(name, sex, birthday);

        assert.notEqual(result, null);
        assert.notEqual(result.length, 0);
    });
});
