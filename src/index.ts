import { AlexaDialogManager, AlexaSkill, DefaultDialogEngine } from "@chitchatjs/alexa";
import {} from "ask-sdk-core";

import { blocks, Context, conv, Event, state } from "@chitchatjs/core";

// -------------------------------------------------------------------- //
// A Greeting dialog
// -------------------------------------------------------------------- //

let stopIntentBlock = blocks
    .when()
    .true((ctx: Context, event: Event) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            (event.currentRequest.request.intent.name == "AMAZON.StopIntent" ||
                event.currentRequest.request.intent.name == "AMAZON.CancelIntent")
        );
    })
    .then(blocks.say("Good bye.").build())
    .build();

let fallbackBlock = blocks
    .when()
    .true((ctx: Context, event: Event) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            event.currentRequest.request.intent.name == "AMAZON.FallbackIntent"
        );
    })
    .then(blocks.ask().say("Sorry I didn't understand. Please try again.").reprompt("try again").build())
    .build();

let init = state("INIT")
    .block(
        blocks
            .compound()
            .add(
                blocks
                    .setStateVar()
                    .set((ctx: Context, event: Event) => {
                        return { name: "Kevindra" };
                    })
                    .build()
            )
            .add(
                blocks
                    .when()
                    .true((ctx: Context, event: Event) => {
                        return ctx.platformState.globalState.name === "Kevindra";
                    })
                    .then(
                        blocks
                            .ask()
                            .say("Welcome to this skill, {name}! you can say hello!")
                            .reprompt("you can say hello")
                            .build()
                    )
                    .otherwise(blocks.say("I don't know you {name}, bye").build())
                    .build()
            )
            .add(blocks.goto().stateName("state2").build())
            .build()
    )
    .build();

let state2 = state("state2")
    .block(
        blocks
            .compound()
            .add(
                blocks
                    .when()
                    .userSays(["Hello how are you", "hello", "how are you alexa"])
                    .then(blocks.say("I'm good, thank you!").build())
                    .build()
            )
            .add(stopIntentBlock)
            .add(fallbackBlock)
            .build()
    )
    .build();

let convr = conv().addState(init).addState(state2).build();

/**
 * Create the skill using conversation
 */
let skill = new AlexaSkill(convr);

/**
 * Using AlexaDialogManager with underlying DefaultDialogEngine.
 */
let dm = new AlexaDialogManager(skill, new DefaultDialogEngine());

/**
 * Default export is full skill
 */
export default skill;

/**
 * handler export is for AWS lambda
 */
export const handler = dm.handler();
