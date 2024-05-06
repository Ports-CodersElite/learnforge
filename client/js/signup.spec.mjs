import * as signUp from './signup.mjs';

// Test cases
describe("Testing dropdown selection", function(){
    it("Selected Student drop down", function(){
        const res = signUp.StudentDropdownFunc();
        expect(res).toBe("student");
    });
    
    it("Selected Teacher drop down", function(){
        const res = signUp.TeacherDropdownFunc();
        expect(res).toBe("lecturer");
    });
})