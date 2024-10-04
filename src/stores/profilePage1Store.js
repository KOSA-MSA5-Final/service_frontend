// stores/profileStore.js
import { defineStore } from 'pinia';

export const usePetStore = defineStore('profilePage1Store', {
    state: () => ({
        petName: '',
        maleselected: '',
        selectedAnimalType: '',
        birthDate: '',
        neuteredselected: '',
        willneutered: '',
    }),
    actions: {
        setPetProfile(petInfo) {
            this.petName = petInfo.petName;
            this.maleselected = petInfo.maleselected;
            this.selectedAnimalType = petInfo.selectedAnimalType;
            this.birthDate = petInfo.birthDate;
            this.neuteredselected = petInfo.neuteredselected;
            this.willneutered = petInfo.willneutered;
        },
    },
});
