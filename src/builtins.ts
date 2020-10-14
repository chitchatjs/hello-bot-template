import { alexa as ax, AlexaDialogContext, AlexaEvent } from "@chitchatjs/alexa";

export default ax
  .compound()
  .add(
    ax
      .when()
      .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
          event.currentRequest.request.type == "IntentRequest" &&
          (event.currentRequest.request.intent.name == "AMAZON.StopIntent" ||
            event.currentRequest.request.intent.name == "AMAZON.CancelIntent")
        );
      })
      .then(ax.say("Good bye."))
      .build()
  )
  .add(
    ax
      .when()
      .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
          event.currentRequest.request.type == "IntentRequest" &&
          event.currentRequest.request.intent.name == "AMAZON.HelpIntent"
        );
      })
      .then(ax.say("tell me your name!"))
      .build()
  )
  .add(
    ax
      .when()
      .true((ctx: AlexaDialogContext, event: AlexaEvent) => {
        return (
          event.currentRequest.request.type == "IntentRequest" &&
          event.currentRequest.request.intent.name == "AMAZON.FallbackIntent"
        );
      })
      .then(ax.ask("Sorry I didn't understand. Please try again.").reprompt("try again").build())
      .build()
  )
  .build();
