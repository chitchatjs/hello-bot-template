"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alexa_1 = require("@chitchatjs/alexa");
const core_1 = require("@chitchatjs/core");
let stopIntentBlock = core_1.blocks
    .when()
    .true((ctx, event) => {
    return (event.currentRequest.request.type == "IntentRequest" &&
        (event.currentRequest.request.intent.name == "AMAZON.StopIntent" ||
            event.currentRequest.request.intent.name == "AMAZON.CancelIntent"));
})
    .then(core_1.blocks.say("Good bye.").build())
    .build();
let fallbackBlock = core_1.blocks
    .when()
    .true((ctx, event) => {
    return (event.currentRequest.request.type == "IntentRequest" &&
        event.currentRequest.request.intent.name == "AMAZON.FallbackIntent");
})
    .then(core_1.blocks.ask().say("Sorry I didn't understand. Please try again.").reprompt("try again").build())
    .build();
let init = core_1.state("INIT")
    .block(core_1.blocks
    .compound()
    .add(core_1.blocks
    .setStateVar()
    .set((ctx, event) => {
    return { name: "Kevindra" };
})
    .build())
    .add(core_1.blocks
    .when()
    .true((ctx, event) => {
    return ctx.platformState.globalState.name === "Kevindra";
})
    .then(core_1.blocks
    .ask()
    .say("Welcome to this skill, {name}! you can say hello!")
    .reprompt("you can say hello")
    .build())
    .otherwise(core_1.blocks.say("I don't know you {name}, bye").build())
    .build())
    .add(core_1.blocks.goto().stateName("state2").build())
    .build())
    .build();
let state2 = core_1.state("state2")
    .block(core_1.blocks
    .compound()
    .add(core_1.blocks
    .when()
    .userSays(["Hello how are you", "hello", "how are you alexa"])
    .then(core_1.blocks.say("I'm good, thank you!").build())
    .build())
    .add(stopIntentBlock)
    .add(fallbackBlock)
    .build())
    .build();
let convr = core_1.conv().addState(init).addState(state2).build();
let skill = new alexa_1.AlexaSkill(convr);
let dm = new alexa_1.AlexaDialogManager(skill, new alexa_1.DefaultDialogEngine());
exports.default = skill;
exports.handler = dm.handler();
//# sourceMappingURL=index.js.map