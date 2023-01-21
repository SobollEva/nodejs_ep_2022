## Home work №2                
**TASK 2.1**   
Write a simple REST service with CRUD operations for User entity.
<ul>
<li> To create REST service,use ExpressJS (https://expressjs.com/).The User should have the following properties(you can use UUIDas a user identifier (id)):    
<code></br>type User = {     </br>
id: string;</br>
login: string;</br>
password: string;</br>
age: number;</br>
isDeleted: boolean;</br>
} </code>
</li>
<li>Service should have the following CRUD operations for User:   
</br>−get user by id;     
</br>−create and update user;        
</br>−get auto-suggest list from limitusers, sorted by login property and filtered by loginSubstringin the login property:getAutoSuggestUsers(loginSubstring, limit)
</br>−remove user (soft delete–user gets marked with isDeletedflag, but not removed from the collection). </li>
<li>Store user’scollection in the service memory (while the service is running).</li>
</ul>
To test the service CRUDmethods,you can use Postman (https://www.getpostman.com/).  

**TASK 2.2**        
Add server-side validation for create/update operations of Userentity:
<ul>
<li>all fields are required;</li>
<li>login validationis required;</li>
<li>password must contain letters and numbers;</li>
<li>user’s age must be between 4 and 130.</li>
</ul>
In case of any property does not meet the validation requirements or the field is absent, return 400 (Bad Request) and detailed error message.

For requests validation use special packages like joi (https://github.com/hapijs/joi,https://www.npmjs.com/package/express-joi-validation)
