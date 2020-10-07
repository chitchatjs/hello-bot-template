"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let interaction1 = {
    user: {
        trigger: {
            name: "AMAZON.FallbackIntent",
        },
    },
    system: {
        actions: [
            {
                question: "Sorry I don't understand, please try again!",
                reprompt: "Please try again.",
            },
        ],
    },
};
exports.dialog = { interactions: [interaction1] };
//# sourceMappingURL=FallbackDialog.js.map