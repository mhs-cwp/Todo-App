 function loadUsername() {
      const userEmail = localStorage.getItem('loggedInUser');
      if (userEmail) {
        const userData = JSON.parse(localStorage.getItem(userEmail));
        if (userData) {
          document.getElementById('userGreeting').innerText = `Hello, ${userData.username}!`;
        }
      } else {
        window.location.href = 'login.html';
      }
    }
    
    function loadTodos() {
      const userEmail = localStorage.getItem('loggedInUser');
      if (!userEmail) return window.location.href = 'login.html';

      const todos = JSON.parse(localStorage.getItem(userEmail + '_todos') || '[]');
      const todoList = document.getElementById('todoList');
      todoList.innerHTML = '';

      todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center todo-item';

        const span = document.createElement('span');
        span.textContent = todo.task;
        span.style.cursor = 'pointer';
        if (todo.completed) {
          span.classList.add('completed');
        }

        const todoButtons = document.createElement('div');
        todoButtons.className = 'todo-buttons';

        const markDoneBtn = document.createElement('button');
        markDoneBtn.className = 'btn btn-sm btn-success';
        markDoneBtn.textContent = todo.completed ? 'Undo' : 'Mark as Done';
        markDoneBtn.onclick = () => {
          todo.completed = !todo.completed;
          localStorage.setItem(userEmail + '_todos', JSON.stringify(todos));
          loadTodos();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
          todos.splice(index, 1);
          localStorage.setItem(userEmail + '_todos', JSON.stringify(todos));
          loadTodos();
        };

        todoButtons.appendChild(markDoneBtn);
        todoButtons.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(todoButtons);
        todoList.appendChild(li);
      });
    }

  
    window.onload = function() {
      loadUsername();
      loadTodos();
    };

    
    function logout() {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html'; 
    }

   
    function addTodo() {
      const userEmail = localStorage.getItem('loggedInUser');
      if (!userEmail) return alert('Please log in first!');

      const input = document.getElementById('todoInput');
      const task = input.value.trim();
      if (task === '') return;

      const todos = JSON.parse(localStorage.getItem(userEmail + '_todos') || '[]');
      todos.push({ task, completed: false });
      localStorage.setItem(userEmail + '_todos', JSON.stringify(todos));

      input.value = '';
      loadTodos();
    }