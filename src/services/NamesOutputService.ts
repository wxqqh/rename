import * as debug from "debug";
import * as entity from "../entity";

import * as json2csv from "json2csv";

const LOG = debug(`${__dirname}${__filename}`);

const options: json2csv.json2csv.Options<entity.Name> = {
    fields: [
        { label: "姓名", value: "name" },
        { label: "总分", value: "totalScore" },
        { label: "五行(姓)", value: "nameCharacters[0].element" },
        { label: "五行(名1)", value: "nameCharacters[1].element" },
        { label: "五行(名2)", value: "nameCharacters[2].element" },
        { label: "繁体笔画(姓)", value: "nameCharacters[0].traditionalStrokes" },
        { label: "繁体笔画(名1)", value: "nameCharacters[1].traditionalStrokes" },
        { label: "繁体笔画(名2)", value: "nameCharacters[2].traditionalStrokes" },
        { label: "五格吉运(总格)", value: "fiveCase.总格.luck" },
        { label: "五格吉运(人格)", value: "fiveCase.人格.luck" },
        { label: "五格吉运(地格)", value: "fiveCase.地格.luck" },
        { label: "五格吉运(外格)", value: "fiveCase.外格.luck" },
        { label: "五格吉运(天格)", value: "fiveCase.天格.luck" },
        { label: "五格五行(总格)", value: "fiveCase.总格.element" },
        { label: "五格五行(人格)", value: "fiveCase.人格.element" },
        { label: "五格五行(地格)", value: "fiveCase.地格.element" },
        { label: "五格五行(外格)", value: "fiveCase.外格.element" },
        { label: "五格五行(天格)", value: "fiveCase.天格.element" },
        { label: "三才五行(天)", value: "threeTalent.天.element" },
        { label: "三才五行(人)", value: "threeTalent.人.element" },
        { label: "三才五行(地)", value: "threeTalent.地.element" },
        { label: "三才吉运", value: "threeTalentLuck" },
        { label: "三才分值(天)", value: "threeTalent.天.score" },
        { label: "三才分值(人)", value: "threeTalent.人.score" },
        { label: "三才分值(地)", value: "threeTalent.地.score" },
        { label: "三才暗示(总评)", value: "threeTalentIndicate.总评" },
        { label: "五格暗示(总格)", value: "fiveCase.总格.indicate" },
        { label: "五格暗示(人格)", value: "fiveCase.人格.indicate" },
        { label: "五格暗示(地格)", value: "fiveCase.地格.indicate" },
        { label: "五格暗示(外格)", value: "fiveCase.外格.indicate" },
        { label: "五格暗示(天格)", value: "fiveCase.天格.indicate" }
    ]
};
export class NamesOutputService {
    public static output(json: entity.Name[] = []): string {
        const Json2csvParser = json2csv.Parser;
        const json2csvParser = new Json2csvParser(options);
        LOG(`parse Names to csv start ${json.length}`);
        const csv = json2csvParser.parse(json);
        LOG(`parse Names to csv finish ${json.length}`);
        return csv;
    }
}
