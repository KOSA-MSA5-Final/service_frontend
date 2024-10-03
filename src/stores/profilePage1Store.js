// stores/profileStore.js
import { defineStore } from 'pinia';

export const usePetStore = defineStore('pet', {
    state: () => ({
        petName: '',
        imageFile: null,
        gender: '',
        animalType: '',
        birthDate: '',
        neuteredStatus: '',
        willNeutered: '',
    }),
    actions: {
        setPetData(data) {
            this.petName = data.petName;
            this.imageFile = data.imageFile;
            this.gender = data.gender;
            this.animalType = data.animalType;
            this.birthDate = data.birthDate;
            this.neuteredStatus = data.neuteredStatus;
            this.willNeutered = data.willNeutered;
        },
    },
});
