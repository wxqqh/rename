export class Sleep {
    public static time(time: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    }
}
