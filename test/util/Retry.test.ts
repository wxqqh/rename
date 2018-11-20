import * as assert from "assert";

import * as debug from "debug";
import { ReTry, Sleep } from "../../src/util";

const LOG = debug(`${__filename}`);

const name = "伍芷巧";

describe(__filename, () => {
    it("Retry must run success", async () => {
        const result = await ReTry.doAction(() => Sleep.time(10));
        assert.equal(result, true);
    });

    it("action faild must retry and run success", async () => {
        let count = 0;
        const result = await ReTry.doAction(() => {
            count++;
            if (count === 3) {
                return Promise.resolve(true);
            }
            return Promise.reject(false);
        });
        assert.equal(result, true);

    });

    it("action faild must retry 3 times throw error", async () => {
        let count = 0;
        try {
            await ReTry.doAction(() => {
                count++;
                return Promise.reject(false);
            });
            assert.equal(false, true); // 强制验证不通过
        } catch (e) {
            assert.notEqual(e, null);
            assert.equal(count, 4);
        }
    });

});
