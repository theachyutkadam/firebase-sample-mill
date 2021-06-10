const productList = document.querySelector('#product-list');
const form = document.querySelector('#add-product-form');

// create element & render cafe
function renderUser(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let price = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  price.textContent = doc.data().price;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(price);
  li.appendChild(cross);

  productList.appendChild(li);

  cross.addEventListener('click', (e) => {
    e.stopPropagation
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('products').doc(id).delete();
  })
}

// getting data
// db.collection('users').where('last_name', '==', 'kadam').get().then(snapshot => {
db.collection('products').get().then(snapshot => {
  snapshot.docs.forEach(doc => {
    renderUser(doc);
    console.log(doc.data())
  });
});

// saving data
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('products').add({
    name: form.name.value,
    price: form.price.value,
  });
  form.name.value = '';
  form.price.value = '';
});