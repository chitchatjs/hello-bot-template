import { alexa as ax, AlexaDialogContext, AlexaEvent } from "@chitchatjs/alexa";

// -------------------------------------------------------------------- //
// A Greeting dialog
// -------------------------------------------------------------------- //

let stopIntentBlock = ax
    .when()
    .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            (event.currentRequest.request.intent.name == "AMAZON.StopIntent" ||
                event.currentRequest.request.intent.name == "AMAZON.CancelIntent")
        );
    })
    .then(ax.say("Good bye.").build())
    .build();

let fallbackBlock = ax
    .when()
    .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            event.currentRequest.request.intent.name == "AMAZON.FallbackIntent"
        );
    })
    .then(ax.ask().say("Sorry I didn't understand. Please try again.").reprompt("try again").build())
    .build();

let init = ax
    .state("INIT")
    .block(
        ax
            .compound()
            .add(ax.setStateVar("name", "Kevindra"))
            .add(ax.ask().say("welcome").build())
            .add(
                ax
                    .when()
                    .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
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
            .add(ax.goto("state2"))
            .build()
    )
    .build();

let state2 = ax
    .state("state2")
    .block(
        ax
            .compound()
            .add(
                ax
                    .whenUserSays(["Hello how are you", "hello", "how are you alexa"])
                    .then(ax.say("I'm good, thank you!").build())
                    .build()
            )
            .add(stopIntentBlock)
            .add(fallbackBlock)
            .build()
    )
    .build();

let definition = ax.definition().addState(init).addState(state2).build();

/**
 * Using AlexaDialogManager with underlying DefaultDialogEngine.
 */
let dm = ax.dialogManager(definition);

/**
 * Default export is full skill
 */
export default dm.alexaSkill;

/**
 * handler export is for AWS lambda
 */
export const handler = dm.handler();
