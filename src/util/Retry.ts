const ERROR = getLogger(__filename, "ERROR");
export class ReTry {
    public static doAction<T>(action: () => Promise<T>, time: number = 3) {
        let task = action();

        for (let i = 0; i < time; i++) {
            task = task.catch((reason) => {
                ERROR(`ReTry doAction error ${reason.stack || reason}`);
                return action();
            });
        }

        return task;
    }
}
