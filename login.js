function login(event) {
      event.preventDefault();

      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const savedUser = JSON.parse(localStorage.getItem(email));

      if (savedUser && savedUser.password === password) {
        localStorage.setItem('loggedInUser', email);
        window.location.href = 'home.html';
      } else {
        alert('Invalid email or password');
      }
    }