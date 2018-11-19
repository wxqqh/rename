import * as assert from "assert";
import * as debug from "debug";

import * as query from "../../src/query";
import * as disc from "../../src/disc";
import * as entity from "../../src/entity";
import * as services from "../../src/services";

const LOG = debug(`${__filename}`);
const firstName = "伍";

describe(__filename, () => {
    it("BatchActionService query name batch response success", async () => {
        const start = 0;
        const end = 3;
        const names = disc.GirlsDouble.slice(start, end).map((val) => firstName + val);
        const batchActionService = new services.BatchActionService<entity.Name>();

        const results = await batchActionService.batchActoin(names, query.NameWWWName321Net);

        assert.equal(results.length, end);
        assert.notEqual(results[0], null);
    });
});
