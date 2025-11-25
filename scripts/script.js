  // Targeting necessary elements
  const downloadNowBtn = document.getElementById("downloadNowIframe"); // Target the iframe
  const downloadNowPage = document.getElementById("downloadNowPage");

  // Firebase setup
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import {
    getFirestore,
    collection,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

  // Firebase config
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDpNiBfj1WPVputBiSLBsdOnm0MFLjVYlE",
    authDomain: "flebooks.firebaseapp.com",
    projectId: "flebooks",
    storageBucket: "flebooks.firebasestorage.app",
    messagingSenderId: "458785971847",
    appId: "1:458785971847:web:ed6138c7df952c9f3d6222",
    measurementId: "G-XMD1VDPZGT",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);
  
  // Function to create a book card dynamically
function createBookCard(book) {
  // Use readNowUrl and downloadUrl only if both are available, fallback to fileLink otherwise
  const readNowLink = book.readNowLink && book.downloadLink ? book.readNowLink : book.fileLink;
  const downloadLink = book.readNowLink && book.downloadLink ? book.downloadLink : book.fileLink;

  return `
    <div class="book-card">
      <div class="cover">
        <img src="${book.imgSrc}" alt="Book Cover" />
      </div>
      <div class="sec-2">
        <div class="details">
          <h5>${book.bookNo}</h5>
          <h2>${book.title}</h2>
          <h3>${book.authorName}</h3>
          <h4>${book.language}</h4>
          <h4>${book.category}</h4>
          <h6>${book.subtitle}</h6>
        </div>
        <div class="actions">
          <a href="${readNowLink}" target="_blank">
              <button class="read-now-btn">
                  <i class="fa-solid fa-book"></i> Read now
              </button>
          </a>
          <a class="download-btn" href="${downloadLink}">
              <i class='bx bx-download'></i>
          </a>
        </div>
      </div>
      <div class="book-popup">
          <p>${book.bookNo}</p>
          <h2>${book.title}</h2>
          <h3>${book.authorName}</h3>
          <p>${book.language}</p>
          <p>${book.category}</p>
      </div>
    </div>
  `;
}
  // Function to display books from Firestore
  async function displayBooks() {
  const booksCollection = collection(db, "Books");
  const booksContainer = document.getElementById("booksContainer");

  try {
    // Clear existing content to avoid duplicates
    booksContainer.innerHTML = "";

    // Fetch all documents from the "Books" collection
    const snapshot = await getDocs(booksCollection);

    // Loop through the documents and append book cards
    snapshot.forEach((doc) => {
      const bookData = doc.data();
      const bookCard = createBookCard(bookData);
      booksContainer.innerHTML += bookCard; // Append card to container
    });

    // Add click event listeners to all download buttons after rendering
    const downloadButtons = document.querySelectorAll(".download-btn");
    downloadButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const downloadNowLink = document.getElementById("downloadNowLink");
        const downloadLink = e.currentTarget.getAttribute("data-download-link");

        // Show the downloadNowPage
        if (downloadNowPage) {
          downloadNowPage.style.display = "flex"; // Change the display to flex
        }

        // Set the iframe src to the book's downloadLink
        if (downloadNowLink) {
          downloadNowLink.href = downloadLink;
        }
      });
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

  // Search functionality
  // Update the search functionality
// Function to display books from the "Trending" collection
// Function to display books from the "Trending" collection
async function displayTrendingBooks() {
  const trendingCollection = collection(db, "Trending");
  const booksContainer = document.getElementById("booksContainer");

  try {
    // Clear existing content to avoid duplicates
    booksContainer.innerHTML = "";

    // Fetch all documents from the "Trending" collection
    const snapshot = await getDocs(trendingCollection);

    // Loop through the documents and append book cards
    snapshot.forEach((doc) => {
      const bookData = doc.data();
      const bookCard = createBookCard(bookData);
      booksContainer.innerHTML += bookCard; // Append card to container
    });

    // Add click event listeners to all download buttons after rendering
    const downloadButtons = document.querySelectorAll(".download-btn");
    downloadButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const downloadNowLink = document.getElementById("downloadNowLink");
        const downloadLink = e.currentTarget.getAttribute("data-download-link");

        // Show the downloadNowPage
        if (downloadNowPage) {
          downloadNowPage.style.display = "flex"; // Change the display to flex
        }

        // Set the iframe src to the book's downloadLink
        if (downloadNowLink) {
          downloadNowLink.href = downloadLink;
        }
      });
    });
  } catch (error) {
    console.error("Error fetching trending books:", error);
  }
}

// Function to search books dynamically from the "Books" collection
// Function to search books dynamically from the "Books" collection// Function to search books dynamically from the "Books" collection
async function searchBooks() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const booksContainer = document.getElementById("booksContainer");

  // If query is empty, display trending books
  if (!query) {
    displayTrendingBooks();
    return;
  }

  try {
    // Clear existing content
    booksContainer.innerHTML = "";

    // Query all books in the "Books" collection
    const booksCollection = collection(db, "Books");
    const snapshot = await getDocs(booksCollection);

    let found = false; // Flag to check if any results are found
    snapshot.forEach((doc) => {
      const bookData = doc.data();
      console.log("Searching book:", bookData); // Log book data for debugging

      // Normalize data fields to handle potential inconsistencies (trim spaces, etc.)
      function normalize(value) {
        return String(value || "").toLowerCase().trim();
      }
      
      const title = normalize(bookData.title);
      const subtitle = normalize(bookData.subtitle);
      const bookNo = normalize(bookData.bookNo);
      const authorName = normalize(bookData.authorName);
      const language = normalize(bookData.language);
      const category = Array.isArray(bookData.category)
        ? bookData.category.map(normalize).join(", ")
        : normalize(bookData.category);
      


      // Check if the book matches the search query
      if (
        title.includes(query) ||
        subtitle.includes(query) ||
        bookNo.includes(query) ||
        authorName.includes(query) ||
        language.includes(query) ||
        category.includes(query)
      ) {
        const bookCard = createBookCard(bookData);
        booksContainer.innerHTML += bookCard; // Append matching card to container
        found = true;
      }
    });

    if (!found) {
      booksContainer.innerHTML = `<p>No books found for "${query}".</p>`;
    }
  } catch (error) {
    console.error("Error searching books:", error);
  }
}

// Update URL query string when searching
function updateQueryString(query) {
  const url = new URL(window.location.href);
  url.searchParams.set("q", query);
  history.pushState(null, "", url.toString());
}

// Trigger search on pressing Enter
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = event.target.value.trim();
    updateQueryString(query);
    searchBooks();
  }
});

document.getElementById('searchBtn').onclick = () => searchBooks();
// Pre-fill the search bar and trigger the search if a query is present in the URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  if (query) {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = query; // Retain the query in the search bar
    searchBooks();
  } else {
    // Display trending books initially if no query
    displayTrendingBooks();
  }
});

  // Close the "read now" page when the close button is clicked
  const readCloseButton = document.getElementById("readCloseBtn");
  if (readCloseButton) {
    readCloseButton.addEventListener("click", () => {
      // Hide the downloadNowPage when the close button is clicked
      if (downloadNowPage) {
        downloadNowPage.style.display = "none";
        downloadNowIframe.src = ""; // Reset iframe src to prevent showing previous book
      }
    });
  }
