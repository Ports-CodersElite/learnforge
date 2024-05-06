import * as UT from './unit-test-funcs.mjs';
import {StudentDropdownFunc, lecturerDropdownFunc} from '../signup.mjs';
import { submitUser } from '../db_query.mjs';

window.addEventListener('load', init);

function init() {
    UT.isEqaul("Testing student dropdown function", StudentDropdownFunc(), 'student');
    UT.isEqaul("Testing lecturer dropdown function", lecturerDropdownFunc(), 'lecturer');
    UT.isEqaul("Checking to see if submitUser data is output as expect", submitUser(['1', 'first', null, 'lastname', 'email', 'student']), ['1', 'first', null, 'lastname', 'email', 'student']);
}
