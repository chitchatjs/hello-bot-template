"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let interaction1 = {
    user: {
        trigger: {
            name: "AMAZON.StopIntent",
        },
    },
    system: {
        actions: [
            {
                text: "Good bye!",
            },
        ],
    },
};
exports.dialog = { interactions: [interaction1] };
//# sourceMappingURL=StopDialog.js.map