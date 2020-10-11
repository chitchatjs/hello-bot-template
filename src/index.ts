import { alexa as ax, AlexaDialogManager, AlexaSkill, RuleBasedDialogEngine } from "@chitchatjs/alexa";
import {} from "ask-sdk-core";

import { core, DialogContext, conv, Event, Locale, state } from "@chitchatjs/core";

// -------------------------------------------------------------------- //
// A Greeting dialog
// -------------------------------------------------------------------- //

let stopIntentBlock = core
    .when()
    .true((ctx: DialogContext, event: Event) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            (event.currentRequest.request.intent.name == "AMAZON.StopIntent" ||
                event.currentRequest.request.intent.name == "AMAZON.CancelIntent")
        );
    })
    .then(ax.say("Good bye.").build())
    .build();

let fallbackBlock = core
    .when()
    .true((ctx: DialogContext, event: Event) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            event.currentRequest.request.intent.name == "AMAZON.FallbackIntent"
        );
    })
    .then(ax.ask().say("Sorry I didn't understand. Please try again.").reprompt("try again").build())
    .build();

let init = state("INIT")
    .block(
        core
            .compound()
            .add(
                core
                    .setStateVar()
                    .set((ctx: DialogContext, event: Event) => {
                        return { name: "Kevindra" };
                    })
                    .build()
            )
            .add(
                core
                    .when()
                    .true((ctx: DialogContext, event: Event) => {
                        return ctx.platformState.globalState.name === "Kevindra";
                    })
                    .then(
                        ax
                            .ask()
                            .say("Welcome to this skill, {name}! you can say hello!")
                            .reprompt("you can say hello")
                            .build()
                    )
                    .otherwise(ax.say("I don't know you {name}, bye").build())
                    .build()
            )
            .add(core.goto().stateName("state2").build())
            .build()
    )
    .build();

let state2 = state("state2")
    .block(
        core
            .compound()
            .add(
                ax
                    .when(["Hello how are you", "hello", "how are you alexa"])
                    .then(ax.say("I'm good, thank you!").build())
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
let dm = new AlexaDialogManager(skill, new RuleBasedDialogEngine());

/**
 * Default export is full skill
 */
export default skill;

/**
 * handler export is for AWS lambda
 */
export const handler = dm.handler();
