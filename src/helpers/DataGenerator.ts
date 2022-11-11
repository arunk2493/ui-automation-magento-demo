export default class DataGenerator{
    async generateName(): Promise<string>{
        const name = "TestUser"+Math.random().toString(36).substring(2,10);
        return name.toString();
    }
    async generatePassword(): Promise<string>{
        const password = "Welcome@"+Math.random().toString(36).substring(2,12);
        return password.toString();
    }
    async generateWeakPassword(): Promise<string>{
        const password = "Wel"+Math.random().toString(36).substring(2,3);
        return password.toString();
    }
}