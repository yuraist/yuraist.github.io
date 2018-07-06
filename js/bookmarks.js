document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  // Get the form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Local storage
  if (localStorage.getItem('bookmarks') === null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark)
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  // Re-set the form 
  document.getElementById('myForm').reset();
  // Re-fetch bookmarks
  fetchBookmarks();
  // Prevent form from submitting
  e.preventDefault();
}

function deleteBookmark(url) {

  console.log(url)

  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }

  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  // Re-fetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks() {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  // Get output id
  var bookmarksResults = document.getElementById('bookmarks')
  // Build output
  bookmarksResults.innerHTML = '';

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="card bg-light text-dark"><div class="card-body">' +
                                  '<h3>' + name + 
                                  '<a class="btn btn-primary" target="_blank" href="' + url + '">Visit</a>' + 
                                  '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' + 
                                  '</h3>' +
                                  '</div></div><br />'
  }
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form')
    return false
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use a valid url')
    return false
  }

  return true
}
