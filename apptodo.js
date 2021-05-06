const search= document.getElementById('searchbar');
const todoitem= document.querySelectorAll('.task');
const todos= document.querySelector('.todos');
const tasks = document.querySelectorAll('.todos >li');
const add= document.getElementById('add');

todos.addEventListener('click', e =>{
  if (e.target.classList.contains('delete')){
    e.target.parentNode.parentNode.parentNode.remove();
  }
  var t = document.querySelector('.todos');
  localStorage.setItem('items',t.innerHTML);
});

add.addEventListener('submit', e => {
  e.preventDefault();
  const color = add.addbar.value.substring(0,2).trim();
  const term = add.addbar.value.substring(2,add.addbar.value.length).trim();
  let colorfound= false;
  let html='';
  if (color.includes('r-')){
    html = `<li class="todoitem r">
              <span class="todotext"><i class=" red fas fa-circle"></i> <span class="task"> ${term} </span> <a href="#"><i class="far delete fa-trash-alt"></i></a></span>
            </li>`;
    colorfound=true;
  }
  else if (color.includes('y-')){
    html = `<li class="todoitem y">
              <span class="todotext"><i class=" yellow fas fa-circle"></i> <span class="task"> ${term} </span> <a href="#"><i class="far delete fa-trash-alt"></i></a></span>
            </li>`;
    colorfound=true;
  }
  else if (color.includes('g-')){
    html = `<li class="todoitem g">
              <span class="todotext"><i class=" green fas fa-circle"></i> <span class="task"> ${term} </span> <a href="#"><i class="far delete fa-trash-alt"></i></a></span>
            </li>`;
    colorfound=true;
  }
  if (colorfound && (term.length>0)){
    todos.innerHTML+=html;
  }
  var t = document.querySelector('.todos'),
    items = document.querySelectorAll('.todos > li');

  for (var i = 0, arr = ['r', 'y', 'g']; i < arr.length; i++) {
      for (var j = 0; j < items.length; j++) {
          if (~(" " + items[j].className + " ").indexOf(" " + arr[i] + " "))
              t.appendChild(items[j]);
      }
  }
  localStorage.setItem('items',t.innerHTML);
  
  add.reset();
})
const filteredTodos = (term) =>{
  const todoupdated = document.querySelectorAll('.task');
  Array.from(todoupdated)
  .filter((todo) => !todo.textContent.toLowerCase().includes(term))
  .forEach((todo) =>todo.parentNode.parentNode.classList.add('d-none'))
  Array.from(todoupdated)
  .filter((todo) => todo.textContent.toLowerCase().includes(term))
  .forEach((todo) =>todo.parentNode.parentNode.classList.remove('d-none'))
}

search.addEventListener('keyup', () =>{
  const term= search.value.trim().toLowerCase();
  filteredTodos(term);
})

if (localStorage.getItem('items')){
  let t = document.querySelector('.todos');
  t.innerHTML=localStorage.getItem('items');
}