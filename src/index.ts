import { alexa as ax, AlexaDialogContext, AlexaEvent, Locale } from "@chitchatjs/alexa";
import * as builtins from "./builtins";
import { IntentRequest } from "ask-sdk-model";

// -------------------------------------------------------------------- //
// A Greeting dialog
// -------------------------------------------------------------------- //

let init = ax
    .state("INIT")
    .block(
        ax
            .compound()
            .add(ax.info().name("CJS Hello Bot").invocationName("chitchat hello bot").build())
            .add(ax.ask("welcome, tell me your name?").build())
            .add(ax.goto("Name"))
            .build()
    )
    .build();

let state2 = ax
    .state("Name")
    .block(
        ax
            .compound()
            .add(
                ax
                    .whenUserSays(["my name is {name}", "{name}", "hello my name is {name}"])
                    .withSlotType("name", "AMAZON.FirstName")
                    .then(
                        ax
                            .compound()
                            .add(
                                ax.setStateVar((c: AlexaDialogContext, e: AlexaEvent) => {
                                    let slots = (<IntentRequest>e.currentRequest.request).intent.slots || {};
                                    return { name: slots["name"].value };
                                })
                            )
                            .add(ax.say("It's great to talk to you, {name}, thank you!"))
                            .build()
                    )
                    .build()
            )
            .add(builtins.builtins[0])
            .add(builtins.builtins[1])
            .build()
    )
    .build();

let definition = ax.skill().addState(init).addState(state2).build();

export = ax.dialogManager(definition).exports();
