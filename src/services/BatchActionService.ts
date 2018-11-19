import * as debug from "debug";

const LOG = debug(`${__dirname}${__filename}`);
const ERROR = debug(`${__dirname}${__filename}:ERROR`);

import { ReTry } from "../util";

export class BatchActionService<T> {
    private batchSize: number;
    constructor(batchSize: number = 10) {
        this.batchSize = batchSize;
    }
    public async BatchActoin(list: string[], action: (...args: any[]) => Promise<T>) {
        LOG("BatchActoin start");
        // tslint:disable-next-line:no-shadowed-variable
        let T: T[] = [];

        let currentList = list.splice(0, this.batchSize);
        while (currentList.length > 0) {

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
        }

        return T;
    }
}
