import { alexa as ax, AlexaDialogContext, AlexaEvent } from "@chitchatjs/alexa";

let stopIntentBlock = ax
    .when()
    .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            (event.currentRequest.request.intent.name == "AMAZON.StopIntent" ||
                event.currentRequest.request.intent.name == "AMAZON.CancelIntent")
        );
    })
    .then(ax.say("Good bye."))
    .build();

let fallbackBlock = ax
    .when()
    .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
            event.currentRequest.request.type == "IntentRequest" &&
            event.currentRequest.request.intent.name == "AMAZON.FallbackIntent"
        );
    })
    .then(ax.ask("Sorry I didn't understand. Please try again.").reprompt("try again").build())
    .build();

export let builtins = [stopIntentBlock, fallbackBlock];
