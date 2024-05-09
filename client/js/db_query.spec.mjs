import * as dbq from './db_query.mjs';
// 9KjGwwlF5AYqHIo2OzoV1AGj84x2 (user id for testing)



describe("Testing database Upload Data", function(){
    it("Creating a dummy user", async function(){
        const user = dbq.submitUser('45', 'firstname', 'middlename', 'lastname', 'test@email.com', 'student')
        expect(user).toEqual(['45', 'firstname', 'middlename', 'lastname', 'test@email.com', 'student'])
    });

    it("Getting profile data", function(){
        const data = dbq.getProfileData('45', (res) => {});
        expect(data).toEqual(['45'])
    });

    it("Updating user first name", function(){
        const update = dbq.updateUserProfile('45', 'first_name', 'michael');
        expect(update).toEqual(['45', 'first_name', 'michael']);
    })

    it("Creating lecturer", function(){
        const lect = dbq.submitUser('100', "fnameLect", "", "lnameLect", "testEmail", "lecturer");
        expect(lect).toEqual(['100', "fnameLect", "", "lnameLect", "testEmail", "lecturer"]);
    })

    it("Create Class", function(){
        const res = dbq.createClass('100', 'testClass', 'joinCode111');
        expect(res).toEqual(['100', 'testClass', 'joinCode111']);
    })

    it("Creating quiz", function() {
        const quiz = dbq.uploadQuiz('100', 'testQuiz', '"questions": [{"question": "1+1", "options": ["2", "3"]}]');
        expect(quiz).toEqual(['100', 'testQuiz', '"questions": [{"question": "1+1", "options": ["2", "3"]}]']);
    })

    it("Get Classes", function(){
        const classes = dbq.getClass('100', ()=>{});
        expect(classes).toEqual('success');
    })

    it("Get Quizzes", function() {
        
    })
});

