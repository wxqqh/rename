import * as debug from "debug";
import * as path from "path";

export const getLogger = (filePath: string, suffix: string = "") => debug("rename:" + path.parse(filePath).name + `:${suffix}`);

const glo: { [key: string]: any } = global;
glo[`getLogger`] = getLogger;
