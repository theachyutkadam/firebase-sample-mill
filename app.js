const userList = document.querySelector('#user-list');
const form = document.querySelector('#add-user-form');

// create element & render cafe
function renderUser(doc){
  let li = document.createElement('li');
  let first_name = document.createElement('span');
  let last_name = document.createElement('span');
  let contact = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  first_name.textContent = doc.data().first_name;
  last_name.textContent = doc.data().last_name;
  contact.textContent = doc.data().contact;
  cross.textContent = 'x';

  li.appendChild(first_name);
  li.appendChild(last_name);
  li.appendChild(contact);
  li.appendChild(cross);

  userList.appendChild(li);

  cross.addEventListener('click', (e) => {
    e.stopPropagation
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('users').doc(id).delete();
  })
}

// getting data
// db.collection('users').where('last_name', '==', 'kadam').get().then(snapshot => {
db.collection('users').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    renderUser(doc);
    console.log(doc.data())
  });
});

// saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('users').add({
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    contact: form.contact.value
  });
  form.first_name.value = '';
  form.last_name.value = '';
  form.contact.value = '';
});