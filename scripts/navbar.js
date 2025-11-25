const navbar = document.getElementById('navbarContainer');

navbar.innerHTML = `
        
        <div class="navbar" id="navbar">
            <a href="/">
                <button>
                    <img src="/img/icons/icon.png" alt="">
                    <i class='bx bx-search'></i>
                </button>
                <h2>Search</h2>
            </a>
            <a href="/books">
                <button>
                    <i class="fa-solid fa-book"></i>
                </button>
                <h2>Books</h2>
            </a>
            <a href="/categories">
                <button>
                    <i class='bx bxs-category-alt' ></i>
                </button>
                <h2>Catergories</h2>
            </a>
            <a href="https://fletodesigns.vercel.app">
                <button>
                    <img src="/img/fleto-bl.png" alt="fleto logo" />
                </button>
                <h2>Fleto</h2>
            </a>
            <button id="menuBtn">
                <i class='bx bx-menu-alt-right bx-rotate-180' ></i>
            </button>
        </div>
        <div class="sidebar" id="sidebar">
            <button id="close-btn" class="close-btn">
                <i class='bx bx-x'></i> <!-- Close icon -->
            </button>

            <a href="/about">
                <button class="sidebar-button">
                    <i class="bx bxs-info-circle"></i>
                </button>
                <h2>About</h2>
            </a>
            <a href="/contact">
                <button class="sidebar-button">
                    <i class="bx bxs-contact"></i>
                </button>
                <h2>Contact</h2>
            </a>

        </div>

        `;
// Get references to the elements
const sidebar = document.getElementById('sidebar');
const closeButton = document.getElementById('close-btn');
const menuButton = document.getElementById('menuBtn');

menuButton.addEventListener('click', () => {
    sidebar.classList.add('open'); // Add 'open' class to show sidebar
});

// Close the sidebar when the close (X) button is clicked
closeButton.addEventListener('click', () => {
    sidebar.classList.remove('open'); // Remove 'open' class to hide sidebar
});
// </button>`;


const searchBar = document.getElementById('search-bar');

searchBar.innerHTML = `               
                <input type="text" id="searchInput" placeholder="Search books, authours, category etc.">
                <button id="searchBtn">
                    <i class="bx bx-search"></i>
                </button>`;



