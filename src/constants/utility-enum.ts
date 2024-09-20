type BuildingInfo = {
    aid: string;
    building: string;
    buildingId: string;
    roomStartIndex?: string;
    rooms?: { floor: number, count: number }[];
}
export const utilityMapper: Record<string, BuildingInfo> = {
    /**
     * 2503 系统查询字段构成举例：
     * 房间号 = building 的前两位数字号 + 四位房间号 + D（电费）/ S（水费） 组成
     * 房间号需要用户手动输入
     * */
    "嘉风A": {
        aid: "0030000000002503",
        building: "01嘉风苑",
        buildingId: "39",
        roomStartIndex: "01"
    },
    /**
     * 7801 系统查询字段构成举例：
     * 查 1 层 1050 房间的电费
     * floorid = 004001
     * roomid = 004001050
     */
    "嘉风B": {
        aid: "0030000000007801",
        building: "嘉风苑二期",
        buildingId: "004",
        rooms: [
            { floor: 1, count: 80  }, 
            { floor: 2, count: 81  },
            { floor: 3, count: 81  },
            { floor: 4, count: 81  },
            { floor: 5, count: 81  },
            { floor: 6, count: 80  },
        ]
    },


    /**
     * 6701 系统查询字段构成举例：
     * 只需要四位房间号
     * 需要用户手动输入
     */
    "和风B": {
        aid: "0030000000006701",
        building: "和风苑B",
        buildingId: "12"
    },
    "和风C": {
        aid: "0030000000006701",
        building: "和风苑C",
        buildingId: "13"
    },
    "和风D": {
        aid: "0030000000006701",
        building: "和风苑D",
        buildingId: "14"
    },
    "和风E": {
        aid: "0030000000006701",
        building: "和风苑E",
        buildingId: "15"
    },


    "惠风A": {
        aid: "0030000000006701",
        building: "惠风苑A",
        buildingId: "5"
    },
    "惠风B": {
        aid: "0030000000006701",
        building: "惠风苑B",
        buildingId: "6"
    },
    "惠风C": {
        aid: "0030000000006701",
        building: "惠风苑C",
        buildingId: "8"
    },


    "雅风A": {
        aid: "0030000000006701",
        building: "雅风苑A",
        buildingId: "9"
    },
    "雅风B": {
        aid: "0030000000006701",
        building: "雅风苑B",
        buildingId: "10"
    },
    "雅风C": {
        aid: "0030000000006701",
        building: "雅风苑C",
        buildingId: "11"
    },


    "清风A": {
        aid: "0030000000007801",
        building: "清风苑A栋",
        buildingId: "001"
    },
    "清风B": {
        aid: "0030000000007801",
        building: "清风苑B栋",
        buildingId: "002"
    },
    "清风C": {
        aid: "0030000000007801",
        building: "清风苑C栋",
        buildingId: "003"
    },


    "朗风": {
        aid: "0030000000002503",
        building: "02朗风苑",
        buildingId: "26",
        roomStartIndex: "02"
    },
    "畅风": {
        aid: "0030000000002503",
        building: "05畅风苑",
        buildingId: "52",
        roomStartIndex: "05"
    },


    "留学生": {
        aid: "0030000000002503",
        building: "03留学生",
        buildingId: "1",
        roomStartIndex: "03"
    },
    "培训楼": {
        aid: "0030000000002503",
        building: "04培训楼",
        buildingId: "65",
        roomStartIndex: "04"
    },
    "硕博": {
        aid: "0030000000006701",
        building: "硕博楼",
        buildingId: "16"
    },
}