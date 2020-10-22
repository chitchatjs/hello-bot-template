import { alexa as ax } from "@chitchatjs/alexa";
import builtins from "./builtins";

let init = ax
  .start()
  .block(
    ax
      .compound()
      .add(ax.info().name("CJS Hello Bot").invocationName("hello bot").build())
      .add(ax.ask("welcome, tell me your name?").build())
      .add(ax.goto("Greet"))
      .build()
  )
  .build();

let greet = ax
  .state("Greet")
  .block(
    ax
      .compound()
      .add(
        ax
          .whenUserSays(["my name is {name}", "{name}", "hello my name is {name}"])
          .withSlotType("name", "AMAZON.FirstName")
          .then(ax.say("It's great to talk to you, {name}, thank you!"))
          .build()
      )
      .add(builtins)
      .build()
  )
  .build();

let skill = ax.skill().addState(init).addState(greet).build();

export = ax.dialogManager(skill).exports();
