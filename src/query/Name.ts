import * as iconv from "iconv-lite";
import * as debug from "debug";
import * as cheerio from "cheerio";

import { Name, ICharacter, IFiveCase, IThreeTalent } from "../entity";

const LOG = debug(`${__dirname}${__filename}`);

import { DataLoader } from "../util";

export const NameWWWName321Net = async (queryName: string) => {
    LOG(`start query ${queryName}`);
    const query = iconv.encode("dx" + queryName, "GB2312");
    const result = await DataLoader({
        url: `http://www.name321.net/xmdf.php?${encodeURIComponent(query.toString("base64"))}`
    });
    LOG(`finish query ${queryName}`);

    const $ = cheerio.load(result, { decodeEntities: false });

    const name = new Name(queryName);

    // 解析名字
    const $nameNode = $(".xm");

    // 总评
    name.totalScore = parseInt($nameNode.find(".xm_df").text(), 10) || 0;

    // 名字逐字拆解
    const $pinYinNode = $nameNode.find(".xm_name div p");

    // [繁体, 五行, 简体笔画, 繁体笔画]
    // ["伍  芷  巧", "土  木  木", "6  7  5", "6  10  5"]
    const [traditionalChars = "", charFiveCases = "", strokes = "", traditionalStrokes = ""] = ($nameNode.find(".xm_js").html() || "").replace(/<br>|.*[：:]/g, "").split(/\n/).filter((val) => !!val && !/^\s/.test(val));

    // FIXME: 繁体字解析有异常, 出现乱码
    const traditionalCharsSplit = traditionalChars.split("\s{2}");
    const charFiveCasesSplit = charFiveCases.split("\s{2}");
    const strokesSplit = strokes.split("\s{2}");
    const traditionalStrokesSplit = traditionalStrokes.split("\s{2}");

    $nameNode.find(".xm_name b").each((index, ele) => {
        const char: ICharacter = {};
        char.char = $(ele).text();
        char.traditionalChar = traditionalCharsSplit[index] || "";

        char.strokes = parseInt(strokesSplit[index], 10) || 0;
        char.traditionalStrokes = parseInt(traditionalStrokesSplit[index], 10) || 0;

        char.pinyin = $($pinYinNode[index]).text();
        char.element = charFiveCasesSplit[index] || "";

        name.nameCharacters[index] = char;
    });

    // 五格

    const $fiveCaseInfo = $nameNode.find("ul li");

    const $fiveCaseNode = $(".xm_csjg");
    const $fiveCaseIndicages = $fiveCaseNode.find("ul li").slice(0, 5);

    $fiveCaseInfo.each((index, ele) => {
        const fiveCase: IFiveCase = {};
        fiveCase.case = $(ele.firstChild).text().slice(0, 2) || "";
        fiveCase.luck = $(ele.lastChild).text() || "";

        // 清洗字符串, 当时我和上帝都知道是怎么回事的😂
        // (^.{8})|<\/?b\/?>|&nbsp;|\[[^：]*：
        // ^.{8} => 匹配 开头8个字符
        // <\/?b?> => 匹配 <b>和</b>
        // &nbsp; => 🤣
        // \[[^：]*： => 匹配 [又称主格，是姓名的中心点，主管人一生命运]，暗示：
        // <b>人格数理 16(土）</b>[又称主格，是姓名的中心点，主管人一生命运]，暗示：<br>（厚重）厚重载德，安富尊荣，财官双美，功成名就。 (吉)<br>&nbsp;待人和蔼易处，在外人缘相当好，受人拜托之事能够尽力去帮助，意志格相生时，必能得到发展的运程，即使是薪水阶层，亦能平步青云，财运或大运受克则减福。"
        // =>
        // "16(土）<br>（厚重）厚重载德，安富尊荣，财官双美，功成名就。 (吉)<br>待人和蔼易处，在外人缘相当好，受人拜托之事能够尽力去帮助，意志格相生时，必能得到发展的运程，即使是薪水阶层，亦能平步青云，财运或大运受克则减福。"
        const indicateStr = ($($fiveCaseIndicages[index]).html() || "").replace(/(^.{8})|<\/?b\/?>|&nbsp;|\[[^：]*：/g, "") || "";
        // 拆解意图
        // ["16(土）", "（厚重）厚重载德，安富尊荣，财官双美，功成名就。 (吉)", "待人和蔼易处，在外人缘相当好，受人拜托之事能够尽力去帮助，意志格相生时，必能得到发展的运程，即使是薪水阶层，亦能平步青云，财运或大运受克则减福。"]

        // [分数(五行), 主暗示, 描述暗示]
        // 其中"描述暗示"可能不存在
        const [typeInfo = "", indicate = "", indicateDesc = ""] = indicateStr.split("<br>");

        fiveCase.score = parseInt(typeInfo.split("(")[0], 10) || 0;
        fiveCase.element = typeInfo.slice(-2, -1);
        fiveCase.indicate = indicate || "";
        fiveCase.indicateDesc = indicateDesc || "";

        name.fiveCase[fiveCase.case] = fiveCase;
    });

    // 三才
    const $threeTalentSummayNode = $fiveCaseNode.find("strong").slice(1, 2);
    // $threeTalentSummayNode.text() = 天、人、地三才 7 6 5
    const [threeTalentType = "", threeTalentScoure = ""] = $threeTalentSummayNode.text().split("三才 ");
    const threeTalentTypeSplit = threeTalentType.split("、");
    // <strong>天、人、地三才 7 6 5</strong>（金土土）暗示健康、生活是否顺利为：
    const threeTalentElementNode = $threeTalentSummayNode[0] && $threeTalentSummayNode[0].next || {};
    const threeTalentElement = (((threeTalentElementNode.data || "").match(/（([^）]*)）/) || [])[1] || "").split("");

    threeTalentScoure.split(" ").forEach((score, index) => {
        const threeTalent: IThreeTalent = {};

        threeTalent.type = threeTalentTypeSplit[index];
        threeTalent.score = parseInt(score, 10) || 0;

        threeTalent.element = threeTalentElement[index];

        name.threeTalent[threeTalent.type] = threeTalent;
        name.threeTalentScore += threeTalent.score;
    });
    name.threeTalentIndicate[`总评`] = threeTalentElementNode.next && threeTalentElementNode.next.next && threeTalentElementNode.next.next.data || "";
    name.threeTalentLuck = name.threeTalentIndicate[`总评`].slice(-2, -1);

    const $threeTalentIndicateNode = $fiveCaseNode.find("ul b").slice(5, 17);

    $threeTalentIndicateNode.each((index, ele) => {
        const type = ($(ele).text() || "").split(/、|：/)[1];

        name.threeTalentIndicate[type] = ele.next.data || "";
    });

    // 解析返回结果
    return name;
};
