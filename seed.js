const mysql = require('mysql2/promise');

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bookhub',
    socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
  });

  console.log('✅ Connected to database');

  // Insert authors into "auteur" table
  const authors = [
    { prenom: 'George', nom: 'Orwell' },
    { prenom: 'Harper', nom: 'Lee' },
    { prenom: 'Paulo', nom: 'Coelho' },
    { prenom: 'F. Scott', nom: 'Fitzgerald' },
    { prenom: 'J.K.', nom: 'Rowling' },
    { prenom: 'Ernest', nom: 'Hemingway' },
    { prenom: 'Leo', nom: 'Tolstoy' },
    { prenom: 'Jane', nom: 'Austen' },
  ];

  console.log('\n📝 Inserting authors into `auteur`...');
  const authorIds = [];
  for (const author of authors) {
    const [result] = await connection.execute(
      'INSERT INTO `auteur` (prenom, nom) VALUES (?, ?)',
      [author.prenom, author.nom]
    );
    authorIds.push(result.insertId);
    console.log(`  ✔ ${author.prenom} ${author.nom}`);
  }

  // Insert books into "livre" table
  const books = [
    { title: '1984', editor: 'Secker & Warburg', year: 1949, image: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg', authorIndex: 0 },
    { title: 'Animal Farm', editor: 'Secker & Warburg', year: 1945, image: 'https://covers.openlibrary.org/b/isbn/9780451526342-L.jpg', authorIndex: 0 },
    { title: 'To Kill a Mockingbird', editor: 'J.B. Lippincott', year: 1960, image: 'https://covers.openlibrary.org/b/isbn/9780061743528-L.jpg', authorIndex: 1 },
    { title: 'The Alchemist', editor: 'HarperCollins', year: 1988, image: 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg', authorIndex: 2 },
    { title: 'The Great Gatsby', editor: 'Scribner', year: 1925, image: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg', authorIndex: 3 },
    { title: 'Harry Potter and the Philosopher Stone', editor: 'Bloomsbury', year: 1997, image: 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg', authorIndex: 4 },
    { title: 'Harry Potter and the Chamber of Secrets', editor: 'Bloomsbury', year: 1998, image: 'https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg', authorIndex: 4 },
    { title: 'The Old Man and the Sea', editor: 'Scribner', year: 1952, image: 'https://covers.openlibrary.org/b/isbn/9780684801223-L.jpg', authorIndex: 5 },
    { title: 'A Farewell to Arms', editor: 'Scribner', year: 1929, image: 'https://covers.openlibrary.org/b/isbn/9780684801469-L.jpg', authorIndex: 5 },
    { title: 'War and Peace', editor: 'The Russian Messenger', year: 1869, image: 'https://covers.openlibrary.org/b/isbn/9780199232765-L.jpg', authorIndex: 6 },
    { title: 'Anna Karenina', editor: 'The Russian Messenger', year: 1878, image: 'https://covers.openlibrary.org/b/isbn/9780143035008-L.jpg', authorIndex: 6 },
    { title: 'Pride and Prejudice', editor: 'T. Egerton', year: 1813, image: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg', authorIndex: 7 },
    { title: 'Sense and Sensibility', editor: 'T. Egerton', year: 1811, image: 'https://covers.openlibrary.org/b/isbn/9780141439662-L.jpg', authorIndex: 7 },
  ];

  console.log('\n📚 Inserting books into `livre`...');
  for (const book of books) {
    await connection.execute(
      'INSERT INTO `livre` (title, editor, year, image, authorId) VALUES (?, ?, ?, ?, ?)',
      [book.title, book.editor, book.year, book.image, authorIds[book.authorIndex]]
    );
    console.log(`  ✔ ${book.title} (${book.year})`);
  }

  console.log(`\n🎉 Done! ${authors.length} authors and ${books.length} books inserted.`);
  await connection.end();
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});