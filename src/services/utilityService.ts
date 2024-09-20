import { urls } from "../constants/urls";
import { utilityMapper } from "../constants/utility-enum";
import {
    formatDormitoryData,
    extractQueryResult2503,
    extractQueryResult6701
} from "../libs/utility-sys";


interface IUtilityAPIResponse<T> {
    retcode: string;
    errmsg: string;
    card: T;
}

export interface Card {
    account: string;
    name: string;
    unsettle_amount: string;
    db_balance: string;
    acc_status: string;
    lostflag: string;
    freezeflag: string;
    barflag: string;
    idflag: string;
    expdate: string;
    cardtype: string;
    cardname: string;
    bankacc: string;
    sno: string;
    phone: string;
    certtype: string;
    cert: string;
    createdate: string;
    autotrans_limite: string;
    autotrans_amt: string;
    autotrans_flag: string;
    mscard: string;
    scard_num: string;
    elec_accamt: string;
    merge_accamt: string;
}

export abstract class UtilityService {
    static async getCardInfo(studentId: string): Promise<Card[]> {
        const data = {
            jsondata: JSON.stringify({ "query_card": { "idtype": "sno", "id": studentId } }),
            funname: "synjones.onecard.query.card"
        };

        const res = await fetch(urls.utility, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(data).toString()
        });

        const json = await res.json();
        const cardRes = json["query_card"] as IUtilityAPIResponse<Card[]>;
        if (cardRes.retcode !== "0") {
            console.log(cardRes);

            throw new Error(cardRes.errmsg);
        }

        return cardRes.card;
    }

    static async getUtilityBalance(queries: any): Promise<UtilityData> {
        const building = utilityMapper[queries.dormitoryName];

        let result: UtilityData;

        switch (building.aid) {
            case "0030000000002503":
                result = await handle2503(queries);
                break;
            case "0030000000006701":
                result = await handle6701(queries);
                break;
            default:
                result = await handleDefault(queries);
        }

        return result;
    }
}


interface UtilityData {
    electricity: number | null;
    water: number | null;
}

async function handle2503(queries: any): Promise<UtilityData> {
    const electricityQueries = formatDormitoryData(queries, 'electricity');
    const waterQueries = formatDormitoryData(queries, 'water');

    const [electricityInfo, waterInfo] = await Promise.all([
        getUtilityFee(electricityQueries),
        getUtilityFee(waterQueries)
    ]);

    if (!electricityInfo || electricityInfo.retcode !== "0" ||
        !waterInfo || waterInfo.retcode !== "0") {
        throw new Error("查询参数有误");
    }

    return {
        electricity: extractQueryResult2503(electricityInfo.errmsg),
        water: extractQueryResult2503(waterInfo.errmsg)
    };
}

async function handle6701(queries: any): Promise<UtilityData> {
    const formattedQueries = formatDormitoryData(queries, 'electricity');
    const utilityFeeInfo = await getUtilityFee(formattedQueries);

    if (!utilityFeeInfo || utilityFeeInfo.retcode !== "0") {
        throw new Error(utilityFeeInfo.errmsg || "查询参数有误");
    }

    const result = extractQueryResult6701(utilityFeeInfo.errmsg);
    if (!result) {
        throw new Error("无法解析查询结果");
    }

    return {
        electricity: result.balance,
        water: result.waterSubsidy
    };
}

/**
 * @description 处理除了 2503 和 6701 之外的宿舍剩余费用请求
 * @param queries 
 */
async function handleDefault(queries: any): Promise<UtilityData> {
    const formattedQueries = formatDormitoryData(queries, 'electricity');
    const utilityFeeInfo = await getUtilityFee(formattedQueries);

    if (!utilityFeeInfo || utilityFeeInfo.retcode !== "0") {
        throw new Error(utilityFeeInfo.errmsg || "查询参数有误");
    }

    return {
        electricity: parseFloat(utilityFeeInfo.errmsg.slice(5)),
        water: null
    };
}

interface UtilityFeeQuery {
    aid: string,
    account: string,
    room: {
        roomid: string,
        room: string
    },
    floor: {
        floorid: string,
        floor: string
    },
    area: {
        area: string,
        areaname: string
    },
    building: {
        buildingid: string,
        building: string
    }
}

async function getUtilityFee(query: UtilityFeeQuery): Promise<any> {
    const form = {
        jsondata: JSON.stringify({ "query_elec_roominfo": query }),
        funname: "synjones.onecard.query.elec.roominfo"
    };

    const res = await fetch(urls.utility, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(form).toString()
    });

    const text = await res.text();

    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        const cleanData = text.replace(/[\n\r\t]/g, '');
        data = JSON.parse(cleanData);
    }

    return data["query_elec_roominfo"];
}

