
SELECT l.id as lid, b.id as bid, * FROM books b JOIN levels l ON b.level=l.id WHERE l.name='Grade 10';

INSERT INTO books (name,description,level,author,is_verified)
VALUES('TEST BOOK', 'TEST DESCRIPTION', 10, 'TEST AUTHOR', '1');

INSERT INTO books (name,description,level,author,is_verified)
VALUES('Two_TEST BOOK', 'Two_TEST DESCRIPTION', 10, 'Two_TEST AUTHOR', '0');

SELECT * FROM books WHERE name='TEST BOOK' AND id=10;

SELECT * FROM books b WHERE b.name ILIKE 'test book' AND b.id=1;

UPDATE levels  SET sl_name='grade-1' where id=1;
UPDATE levels  SET sl_name='grade-2' where id=2;
UPDATE levels  SET sl_name='grade-3' where id=3;
UPDATE levels  SET sl_name='grade-4' where id=4;
UPDATE levels  SET sl_name='grade-5' where id=5;
UPDATE levels  SET sl_name='grade-6' where id=6;
UPDATE levels  SET sl_name='grade-7' where id=7;
UPDATE levels  SET sl_name='grade-8' where id=8;
UPDATE levels  SET sl_name='grade-9' where id=9;
UPDATE levels  SET sl_name='grade-10' where id=10;
UPDATE levels  SET sl_name='grade-11-science' where id=11;
UPDATE levels  SET sl_name='grade-12-science' where id=12;
UPDATE levels  SET sl_name='grade-11-humanities' where id=13;
UPDATE levels  SET sl_name='grade-12-humanities' where id=14;
UPDATE levels  SET sl_name='grade-11-management' where id=15;
UPDATE levels  SET sl_name='grade-12-management' where id=16;

SELECT b.name as bname, l.name as lname, b.id as bid, l.id as lid, * FROM books b JOIN levels l ON b.level=l.id WHERE l.sl_name='grade-10' AND b.is_verified='1';



INSERT INTO books (name,description,level,author,is_verified,s_name)
VALUES('TEST BOOK 1', 'TEST DESCRIPTION', 1, 'TEST AUTHOR', '1', 'test-book1');
INSERT INTO books (name,description,level,author,is_verified,s_name)
VALUES('TEST BOOK 2', 'TEST DESCRIPTION', 2, 'TEST AUTHOR', '1', 'test-book2');
INSERT INTO books (name,description,level,author,is_verified,s_name)
VALUES('TEST BOOK 3', 'TEST DESCRIPTION', 3, 'TEST AUTHOR', '1', 'test-book3');
INSERT INTO books (name,description,level,author,is_verified,s_name)
VALUES('TEST BOOK 4', 'TEST DESCRIPTION', 5, 'TEST AUTHOR', '1', 'test-book4');
INSERT INTO books (name,description,level,author,is_verified,s_name)
VALUES('TEST BOOK 5', 'TEST DESCRIPTION', 7, 'TEST AUTHOR', '1', 'test-book5');

CREATE TABLE topics (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        st_name VARCHAR(255) NOT NULL,
        book INT,
        CONSTRAINT fk_book
          FOREIGN KEY(book) 
          REFERENCES books(id)
          ON DELETE SET NULL
          ON UPDATE CASCADE
);

INSERT INTO topics (name,st_name)


INSERT INTO books (name,description,level,author,is_verified)


INSERT INTO bookLevel(book_id,level_id)
OUTPUT INSERTED.id
VALUES
(1,1),
(2,2),
(4,3),
(5,4),
(6,5),
(7,5),
(7,6),
(9,7);


O