// stores/profileStore.js
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profilePage1Store', {
    state: () => ({
        petName: '',
        gender: '',
        animalType: '',
        neutered: '',
    }),
    actions: {
        setPetName(name) {
            this.petName = name;
        },
        setGender(gender) {
            this.gender = gender;
        },
        setAnimalType(type) {
            this.animalType = type;
        },
        setNeuteredStatus(status) {
            this.neutered = status;
        },
    },
});
