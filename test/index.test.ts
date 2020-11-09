import "mocha";
import skill from "../src/index";
const alexaTest = require("alexa-skill-test-framework");

describe("Hello World Skill", function () {
  alexaTest.initialize(skill, "appId", "userId", "deviceId");

  alexaTest.test([
    {
      request: alexaTest.getLaunchRequest(),
      says: "welcome, tell me your name?",
      shouldEndSession: false,
    },
  ]);
});
