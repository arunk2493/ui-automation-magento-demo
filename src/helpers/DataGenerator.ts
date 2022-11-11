export default class DataGenerator{
    async generateName(): Promise<string>{
        const name = "TestUser"+Math.random();
        return name.toString();
    }
    async generatePassword(): Promise<string>{
        const password = Math.random().toString(36).substring(2,12);
        return password.toString();
    }
}