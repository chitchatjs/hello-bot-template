import { basicLaunchRequest } from "./data/LaunchRequests";
import e from "../index";
import { expect } from "chai";
import "mocha";

describe("Launch Request", () => {
    it("should return a valid response", () => {
        e.handler(basicLaunchRequest, {}, (err: Error, result: any) => {
            console.log("Test OUTPUT:");
            console.log(err);
            console.log(result);

            // TODO Implement me later
        });
    });
});
