// formatDormitoryData.ts
import { utilityMapper } from "../../constants/utility-enum";

interface InputData {
    eCardId: string;
    dormitoryName: string;
    roomNumber: string;
}

interface OutputData {
    aid: string;
    account: string;
    room: {
        roomid: string;
        room: string;
    };
    floor: {
        floorid: string;
        floor: string;
    };
    area: {
        area: string;
        areaname: string;
    };
    building: {
        buildingid: string;
        building: string;
    };
}

export function formatDormitoryData(input: InputData, utilityType: 'electricity' | 'water'): OutputData {
    const building = utilityMapper[input.dormitoryName];

    if (!building) {
        throw new Error(`无效的宿舍名称: ${input.dormitoryName}`);
    }

    const aid = building.aid;
    if (!aid) {
        throw new Error(`宿舍没有对应的 aid: ${input.dormitoryName}`);
    }

    let roomid: string;
    let room: string;

    if (aid === "0030000000002503") {
        const suffix = utilityType === 'electricity' ? 'D' : 'S';
        room = `${building.roomStartIndex}${input.roomNumber}${suffix}`;
        roomid = room;
    } else if (aid === "0030000000006701") {
        roomid = input.roomNumber;
        room = input.roomNumber;
    } else {
        const floorNumber = input.roomNumber.charAt(0);
        const floorid = `${building.buildingId}00${floorNumber}`;
        roomid = `${floorid}${input.roomNumber.slice(1)}`;
        room = input.roomNumber;
    }

    return {
        aid: aid,
        account: input.eCardId,
        room: {
            roomid: roomid,
            room: room
        },
        floor: {
            floorid: aid === "0030000000002503" || aid === "0030000000006701" ? "" : `${building.buildingId}00${input.roomNumber.charAt(0)}`,
            floor: aid === "0030000000002503" || aid === "0030000000006701" ? "" : `${parseInt(input.roomNumber.charAt(0))}层`
        },
        area: {
            area: "大学城校区",
            areaname: "大学城校区"
        },
        building: {
            buildingid: building.buildingId,
            building: building.building
        }
    };
}
