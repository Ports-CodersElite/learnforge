import * as dbq from './db_query.mjs';
// 9KjGwwlF5AYqHIo2OzoV1AGj84x2 (user id for testing)

describe("Creating a dummy user", function(){
    it("Creating a dummy user", async function(){
        const user = await dbq.submitUser('45', 'firstname', 'middlename', 'lastname', 'test@email.com', 'student');
        console.log(user);
        expect(user).toEqual(['45','firstname', 'middlename', 'lastname', 'test@email.com', 'student']);
    });
})

describe("Get Profile Data", function(){
    it("Getting Profile data from user (9KjGwwlF5AYqHIo2OzoV1AGj84x2)", async function(){
        const user = await dbq.getProfileData('9KjGwwlF5AYqHIo2OzoV1AGj84x2');
        expect(user).toEqual();
    });
})