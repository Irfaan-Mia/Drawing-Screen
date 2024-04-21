// Remember, this code runs in the browser and retrieves data from the server
function editStudent(id) {
    const newName = window.prompt('Enter new name for the student:');
    if (newName) {
        console.log('New name entered: ' + newName);
        // You can add code here to send the new name to your server
        fetch(`/class/api/edit/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newName })
        }).then(() => location.reload());
    } else {
        console.log('No new name entered');
    }
}

function deleteStudent(id) {
    const confirmation = window.confirm('Are you sure you want to delete this student?');
    if (confirmation) {
        console.log('Student will be deleted');
        // You can add code here to delete the student from your server
        fetch(`/class/api/delete/${id}`, { method: 'POST' })
            .then(() => location.reload());
    } else {
        console.log('Student will not be deleted');
    }
}

function drawStudent(id) {
    const confirmation = window.confirm('Are you sure you want to draw?');
    if (confirmation) {
        console.log('Student will be draw');
        // You can add code here to delete the student from your server
        fetch(`/class/api/draw/${id}`, { method: 'POST' })
        .then(response => {
            if (response.ok) {
                window.location.href = 'class/drawbyIrfaan';
            } else {
                throw new Error('Error: ' + response.statusText);
            }
        })
        .catch(error => console.error('Error:', error))
    }
}

fetch('/class/api/list') // Returns a Promise for the GET request
.then(function (response) {
// Check if the request returned a valid code
if (response.ok) { return response.json() } // Return the response parse as JSON
else { throw 'Failed to load classlist: response code invalid!' }
})
.then(function (data) { // Display the JSON data appropriately
// Retrieve the classList outer element
const classList = document.getElementById('classList')

//Storing the data locally 
window.localStorage.setItem('students', data);
console.log(window.localStorage.student);

// Iterate through all students
data.forEach(function (student,id) {
// Create a new list entry
const li = document.createElement('LI')
const liText = document.createTextNode(student)
// Append the class to the list element
li.className += 'student'
// Append list text to list item and list item to list
li.appendChild(liText)

// Container for buttons to group them together
const buttonGroup = document.createElement('div');

// Create and style the Edit button
const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.name = "studentID";
editButton.id = "studentID";
editButton.onclick = function () {editStudent(id)};
editButton.className = 'btn btn-warning btn-sm mr-2'; // Added margin-right (mr-2)
buttonGroup.appendChild(editButton);

// Create and style the Delete button
const deleteButton = document.createElement('button');
deleteButton.textContent = 'Delete';
deleteButton.name = "deletestudentID";
deleteButton.id = "deletestudentID";
deleteButton.onclick = function() {deleteStudent(id)};
deleteButton.className = 'btn btn-danger btn-sm'; // Bootstrap button classes
buttonGroup.appendChild(deleteButton);

// Create and style the Delete button
const drawbutton = document.createElement('button');
drawbutton.textContent = 'Draw';
drawbutton.name = "drawingstudentID";
drawbutton.id = "drawingtudentID";
drawbutton.onclick = function() {drawStudent(id)};
drawbutton.className = 'btn btn-danger btn-sm'; // Bootstrap button classes
buttonGroup.appendChild(drawbutton);

li.appendChild(buttonGroup);
classList.appendChild(li)

window.localStorage.setItem('student', student);
console.log(window.localStorage.getItem('student'));
})
})
.catch(function (e) { // Process error for request
alert(e) // Displays a browser alert with the error message.
// This will be the string thrown in line 7 IF the
// response code is the reason for jumping to this
// catch() function.


});
