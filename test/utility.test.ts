// import { describe, expect, it } from "bun:test";
// import { app } from "../src";


// const onTestDormitoryAndRooms = [
//     { dormitoryName: "嘉风A", roomNumber: "1050" },
//     { dormitoryName: "嘉风B", roomNumber: "1051" },

//     { dormitoryName: "和风B", roomNumber: "3016" },
//     { dormitoryName: "和风C", roomNumber: "3013" },
//     { dormitoryName: "和风D", roomNumber: "3066" },
//     { dormitoryName: "和风E", roomNumber: "3015" },

//     { dormitoryName: "惠风A", roomNumber: "3017" },
//     { dormitoryName: "惠风B", roomNumber: "2018" },
//     { dormitoryName: "惠风C", roomNumber: "1052" },

//     { dormitoryName: "雅风A", roomNumber: "3018" },
//     { dormitoryName: "雅风B", roomNumber: "2017" },
//     { dormitoryName: "雅风C", roomNumber: "1053" },

//     { dormitoryName: "清风A", roomNumber: "4017" },
//     { dormitoryName: "清风B", roomNumber: "3015" },
//     { dormitoryName: "清风C", roomNumber: "1052" },

//     { dormitoryName: "朗风", roomNumber: "4017" },
//     { dormitoryName: "畅风", roomNumber: "2021" },

//     { dormitoryName: "留学生", roomNumber: "213" },
//     { dormitoryName: "培训楼", roomNumber: "214" },
//     { dormitoryName: "硕博", roomNumber: "2013" },

// ]

// describe('getUtilityBalance api', () => {
//     onTestDormitoryAndRooms.forEach(({ dormitoryName, roomNumber }) => {
//         it(`should get electricity and water fees for dormitory ${dormitoryName} room ${roomNumber}`, async () => {
//             const response = await app.handle(new Request('http://localhost:3000/api/utility/getUtilityBalance', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     eCardId: "123456",
//                     dormitoryName,
//                     roomNumber
//                 })
//             }));

//             expect(response.status).toBe(200);

//             const json = await response.json();
//             expect(json.success).toBe(true);
//             expect(json.code).toBe("0");
//             expect(json.data).toBeDefined();

//             const { electricity, water } = json.data;
//             expect(typeof electricity === 'number' || electricity === null).toBe(true);
//             expect(typeof water === 'number' || water === null).toBe(true);
//         });
//     });
// });
