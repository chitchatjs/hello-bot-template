import { ax } from "@chitchatjs/alexa";
import { common } from "@chitchatjs/plugin-ax-common";

let init = ax
  .start()
  .block(
    ax
      .compound()
      .add(ax.info().name("CJS Hello Bot").invocationName("hello bot").build())
      .add(ax.whenLaunch().then(ax.ask("welcome, tell me your name?").build()).build())
      .add(
        ax
          .whenUserSays(["my name is {name}", "{name}", "hello my name is {name}"])
          .withSlotType("name", "AMAZON.FirstName")
          .then(ax.say("It's great to talk to you, {name}, thank you!"))
          .build()
      )
      .add(common.defaultHandlers())
      .build()
  )
  .build();

let skill = ax.skill().addState(init).build();

export = ax.dialogManager(skill).exports();
