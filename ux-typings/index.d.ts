import * as config from "../src/global/config";

declare global {
    const getLogger: typeof config.getLogger;
}