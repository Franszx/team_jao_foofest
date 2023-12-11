const { create } = require("zustand");

export const useChoicesStore = create((set) => {
    const allChoices = {}
    updateChoices: (choice) => set((state) => {
        const newChoices = state.allChoices
        newChoices[choice.id] = choice
        return { allChoices: newChoices }
    }
    )

});