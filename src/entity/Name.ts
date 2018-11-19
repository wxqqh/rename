import { ThreeTalentsType, FiveCaseName, Elements } from "./Type";

export class Name {
    /**
     * 姓名
     */
    public name: string = "";
    /**
     * 简体字
     */
    public nameCharacters: ICharacter[] = [];
    /**
     * 五格
     */
    public fiveCase: { [key: string]: IFiveCase } = {};
    /**
     * 总评
     */
    public totalScore: number = 0;
    /**
     * 三才
     */
    public threeTalent: { [key: string]: IFiveCase } = {};
    /**
     * 三才总分
     */
    public threeTalentScore: number = 0;
    /**
     * 三才预意
     */
    public threeTalentIndicate: { [key: string]: string } = {};
    public constructor(name: string) {
        this.name = name;
    }
}

export interface ICharacter {
    /**
     * 字
     */
    char?: string;
    /**
     * 繁体字
     */
    traditionalChar?: string;
    /**
     * 拼音
     */
    pinyin?: string;
    /**
     * 笔画数
     */
    strokes?: number;
    /**
     * 繁体笔画数
     */
    traditionalStrokes?: number;
    /**
     * 五行
     */
    element?: string;
}

export interface IThreeTalent {
    /**
     * 三才
     */
    type?: ThreeTalentsType | string;
    /**
     * 得分
     */
    score?: number;
    /**
     * 五行
     */
    element?: Elements | string;
}

export interface IFiveCase {
    /**
     * 五格
     */
    case?: FiveCaseName | string;
    /**
     * 评分
     */
    score?: number;
    /**
     * 五行
     */
    element?: string;
    /**
     * 吉凶
     * 大吉, 吉, 凶, 大凶
     */
    luck?: string;
    /**
     * 暗示
     */
    indicate?: string;
    /**
     * 暗示描述
     */
    indicateDesc?: string;

}
