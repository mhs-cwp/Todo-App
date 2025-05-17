 function register(event) {
      event.preventDefault(); 

      const username = document.getElementById('regUsername').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      if (!username || !email || !password) return alert("Please fill in all fields!");

  
      localStorage.setItem(email, JSON.stringify({ username, password }));
      alert('Registered successfully!');
      window.location.href = 'login.html';
    }