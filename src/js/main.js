/* =============================================
   OpenPage — Shared JavaScript Utilities
   ============================================= */

/**
 * Fetch book data from Project Gutenberg API
 * @param {number} limit - Number of books to fetch
 * @param {number} offset - Pagination offset
 * @returns {Promise<Array>}
 */
export async function fetchBooks(limit = 24, offset = 0) {
  const url = `https://gutendex.com/books?limit=${limit}&offset=${offset}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.warn('Failed to fetch from Gutendex:', err);
    return getFallbackBooks();
  }
}

/**
 * Search books via Gutendex API
 * @param {string} query - Search term
 * @param {number} limit - Results limit
 * @returns {Promise<Array>}
 */
export async function searchBooks(query, limit = 36) {
  const url = `https://gutendex.com/books?search=${encodeURIComponent(query)}&limit=${limit}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.warn('Search failed:', err);
    return [];
  }
}

/**
 * Fetch a single book by ID
 * @param {number} id - Project Gutenberg book ID
 * @returns {Promise<Object|null>}
 */
export async function fetchBookById(id) {
  const url = `https://gutendex.com/books/${id}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Failed to fetch book:', err);
    return null;
  }
}

/**
 * Get the best available cover image URL for a book
 */
export function getBookCover(book) {
  if (book.formats?.['image/jpeg']) return book.formats['image/jpeg'];
  if (book.formats?.['image/webp']) return book.formats['image/webp'];
  return null;
}

/**
 * Get the plain text URL for reading
 */
export function getBookTextUrl(book) {
  // Prefer plain text UTF-8
  const formats = book.formats || {};
  return formats['text/plain; charset=utf-8']
    || formats['text/plain; charset=us-ascii']
    || formats['text/plain']
    || Object.entries(formats).find(([k]) => k.startsWith('text/plain'))?.[1]
    || null;
}

/**
 * Get author name from book object
 */
export function getAuthorName(book) {
  const authors = book.authors || [];
  if (authors.length === 0) return 'Unknown Author';
  return authors.map(a => a.name).join(', ');
}

/**
 * Get first subject/category from book
 */
export function getBookCategory(book) {
  const subjects = book.subjects || [];
  if (subjects.length === 0) return null;
  // Take the first meaningful subject
  return subjects[0].split('--')[0].trim();
}

/**
 * Render a book card HTML element
 */
export function createBookCard(book) {
  const id = book.id;
  const title = book.title || 'Untitled';
  const author = getAuthorName(book);
  const cover = getBookCover(book);
  const year = book.download_count || 0;
  const initials = title.charAt(0).toUpperCase();

  const card = document.createElement('article');
  card.className = 'book-card';
  card.setAttribute('aria-label', `${title} by ${author}`);

  card.innerHTML = `
    <a href="/book.html?id=${id}" tabindex="0">
      <div class="book-cover">
        ${cover
          ? `<img src="${cover}" alt="${title} cover" loading="lazy" decoding="async" />`
          : `<div class="placeholder-cover" aria-hidden="true">${initials}</div>`
        }
      </div>
      <div class="book-info">
        <h3 class="book-title">${escapeHtml(title)}</h3>
        <span class="book-author">${escapeHtml(author)}</span>
        <span class="book-year">${year.toLocaleString()} downloads</span>
      </div>
    </a>
  `;

  return card;
}

/**
 * Render book grid into a container
 */
export function renderBookGrid(books, container) {
  container.innerHTML = '';
  if (!books || books.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>No books found.</p></div>';
    return;
  }
  const fragment = document.createDocumentFragment();
  books.forEach(book => {
    fragment.appendChild(createBookCard(book));
  });
  container.appendChild(fragment);
}

/**
 * Simple HTML escaping
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Fallback books when API is unavailable
 */
function getFallbackBooks() {
  const fallbacks = [
    { id: 1342, title: 'Pride and Prejudice', authors: [{ name: 'Jane Austen' }], download_count: 75000, formats: {}, subjects: ['Fiction'] },
    { id: 11, title: 'Alice\'s Adventures in Wonderland', authors: [{ name: 'Lewis Carroll' }], download_count: 68000, formats: {}, subjects: ['Fiction'] },
    { id: 84, title: 'Frankenstein', authors: [{ name: 'Mary Shelley' }], download_count: 55000, formats: {}, subjects: ['Fiction'] },
    { id: 1661, title: 'The Adventures of Sherlock Holmes', authors: [{ name: 'Arthur Conan Doyle' }], download_count: 62000, formats: {}, subjects: ['Fiction', 'Mystery'] },
    { id: 2701, title: 'Moby Dick', authors: [{ name: 'Herman Melville' }], download_count: 48000, formats: {}, subjects: ['Fiction'] },
    { id: 74, title: 'The Adventures of Tom Sawyer', authors: [{ name: 'Mark Twain' }], download_count: 51000, formats: {}, subjects: ['Fiction'] },
    { id: 1342, title: 'Sense and Sensibility', authors: [{ name: 'Jane Austen' }], download_count: 35000, formats: {}, subjects: ['Fiction'] },
    { id: 100, title: 'The Complete Works of William Shakespeare', authors: [{ name: 'William Shakespeare' }], download_count: 80000, formats: {}, subjects: ['Drama'] },
    { id: 2554, title: 'Crime and Punishment', authors: [{ name: 'Fyodor Dostoevsky' }], download_count: 42000, formats: {}, subjects: ['Fiction'] },
    { id: 1400, title: 'Great Expectations', authors: [{ name: 'Charles Dickens' }], download_count: 39000, formats: {}, subjects: ['Fiction'] },
    { id: 1952, title: 'The Yellow Wallpaper', authors: [{ name: 'Charlotte Perkins Gilman' }], download_count: 28000, formats: {}, subjects: ['Fiction'] },
    { id: 43, title: 'The Strange Case of Dr Jekyll and Mr Hyde', authors: [{ name: 'Robert Louis Stevenson' }], download_count: 33000, formats: {}, subjects: ['Fiction'] },
  ];
  return fallbacks.sort(() => Math.random() - 0.5).slice(0, 12);
}