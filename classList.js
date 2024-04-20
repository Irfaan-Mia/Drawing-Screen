// Private
const list = []
// Public
module.exports = {
add: function (student) {
list.push(student)
},
edit: function (student, index) {
list[index] = student
},
get: function (index) {
return list[index]
},
getList: function()
{
return list; 
},
delete: function (index) {
list.splice(index, 1) // remove one element starting from index
}
}
