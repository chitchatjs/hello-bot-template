"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LaunchRequests_1 = require("./data/LaunchRequests");
const index_1 = require("../index");
require("mocha");
describe("Launch Request", () => {
    it("should return a valid response", () => {
        index_1.handler(LaunchRequests_1.basicLaunchRequest, {}, (err, result) => {
            console.log("Test OUTPUT:");
            console.log(err);
            console.log(result);
        });
    });
});
//# sourceMappingURL=index.test.js.map