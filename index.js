console.log("hello");

let memberList = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  submitBtn?.addEventListener("click", handleFormSubmit);
  const editBtn = document.getElementById("edit");
  editBtn?.addEventListener("click", handleFormEdit);
});


function deleteMember(memberId) {
  memberList = memberList.filter((item) => item.id !== memberId);
  renderMemberList();
}

function editMember(memberId) {
  document.getElementById("firstName").focus();

  const memberToBeEdited = memberList.find((item) => item.id == memberId);
  console.log(memberToBeEdited);
  
  document.getElementById("firstName").value = memberToBeEdited.firstName;
  document.getElementById("lastName").value = memberToBeEdited.lastName;

  let idOfEditingMember = memberList.findIndex((member => member.id == memberToBeEdited.id));
  // console.log(idOfEditingMember);
  // console.log(memberList);

  document.getElementById("submit").style.display = "none";
  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";
  saveBtn.addEventListener("click", () => saveMember(idOfEditingMember, saveBtn));
  saveDiv.appendChild(saveBtn); 
  
}

function saveMember(id, btn) {
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  
  if (!firstName || !lastName) return;

  memberList[id].firstName = firstName.value;
  memberList[id].lastName = lastName.value;


  clearFormValue();
  renderMemberList();
  saveDiv.removeChild(btn);
  document.getElementById("submit").style.display = "inline";
}

function createMemberListItem(member) {
  const listItem = document.createElement("li");

  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  

  deleteBtn.innerText = "Delete";
  editBtn.innerText = "Edit";
  

  deleteBtn.addEventListener("click", () => deleteMember(member.id));
  editBtn.addEventListener("click", () => editMember(member.id));
  

  listItem.innerHTML = member.firstName + " " + member.lastName;
  listItem.appendChild(deleteBtn);
  listItem.appendChild(editBtn);
  
  

  return listItem;
}

function clearFormValue(){
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
}

function renderMemberList() {
  const list = document.getElementById("member-list");
  if (!list) return;

  // update list items DOM
  list.innerHTML = "";
  memberList.forEach((member) => {
    const listItem = createMemberListItem(member);
    list.appendChild(listItem);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");

  if (!firstName || !lastName) return;

  const member = {
    id: Math.round(Math.random() * 10000),
    firstName: firstName.value,
    lastName: lastName.value,
  };

  clearFormValue();
  memberList.push(member);
  renderMemberList();
}

