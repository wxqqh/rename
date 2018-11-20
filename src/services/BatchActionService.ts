const LOG = getLogger(__filename);
const ERROR = getLogger(__filename, "ERROR");

import { ReTry, Sleep } from "../util";

export class BatchActionService<T> {
    private batchSize: number;
    constructor(batchSize: number = 10) {
        this.batchSize = batchSize;
    }
    public async batchActoin(list: string[], action: (...args: any[]) => Promise<T>) {
        LOG("BatchActoin start");
        // tslint:disable-next-line:no-shadowed-variable
        let T: T[] = [];
        const total = Math.ceil(list.length / this.batchSize);

        let currentList = list.splice(0, this.batchSize);
        let count = 1;
        while (currentList.length > 0) {
            LOG(`BatchActoin current count: ${count} ${(count / total * 100).toFixed(2)}%`);
            const tasks = currentList.map((task) => {
                return ReTry.doAction(() => action(task)).catch<T>((reason) => {
                    ERROR(`${task} ERROR!!! ${reason}`);
                    const errorT: any = null;
                    return errorT;
                });
            });

            const results = await Promise.all(tasks);

            T = T.concat(results);
            currentList = list.splice(0, this.batchSize);
            count++;
            await Sleep.time(500);
        }

        return T;
    }
}
