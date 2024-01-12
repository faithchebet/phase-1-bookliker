document.addEventListener("DOMContentLoaded", function() {});

    const listPanel = document.getElementById('list');
    const showPanel = document.getElementById('show-panel');
  
    
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        
        books.forEach(book => {
          const li = document.createElement('li');
          li.textContent = book.title;
          li.addEventListener('click', () => showBookDetails(book));
          listPanel.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching books:', error));
  
    
    function showBookDetails(book) {
      
      showPanel.innerHTML = '';
  
      
      const img = document.createElement('img');
      img.src = book.img_url;
      img.alt = book.title;
  
      const title = document.createElement('h2');
      title.textContent = book.title;
  
      const subtitle = document.createElement('p');
      subtitle.textContent = book.subtitle || '';
  
      const description = document.createElement('p');
      description.textContent = book.description || '';
  
      const likeButton = document.createElement('button');
      likeButton.textContent = 'LIKE';
      likeButton.addEventListener('click', () => likeBook(book));
  
      const usersList = document.createElement('ul');
      book.users.forEach(user => {
        const userLi = document.createElement('li');
        userLi.textContent = user.username;
        usersList.appendChild(userLi);
      });
  
      
      showPanel.appendChild(img);
      showPanel.appendChild(title);
      showPanel.appendChild(subtitle);
      showPanel.appendChild(description);
      showPanel.appendChild(likeButton);
      showPanel.appendChild(usersList);
    }
  
    
    function likeBook(book) {
      const userId = 1; 
      const username = 'pouros'; 
  
      
      const hasLiked = book.users.some(user => user.id === userId);
  
      if (!hasLiked) {
        
        book.users.push({ id: userId, username });
  
        
        fetch(`http://localhost:3000/books/${book.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ users: book.users }),
        })
          .then(response => response.json())
          .then(updatedBook => {
            
            const usersList = document.querySelector('#show-panel ul');
            const userLi = document.createElement('li');
            userLi.textContent = username;
            usersList.appendChild(userLi);
          })
          .catch(error => console.error('Error updating book:', error));
      } else {
        console.log('User has already liked this book.');
    
      }
    }
  
  