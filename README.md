# Lukupäiväkirja (Reading Diary)

Web application made with React, Node, Express and Prisma as a practical work for my university.

Properties:
- Logging in and out
- Adding books, ratings and written reviews to the diary
- Deleting books
- Arranging books by title, author or rating
- Searching books by title or author

Prerequisites:
- Install Node
- Install MySQL
- Install phpMyAdmin
- Install Xampp
- (Use Xampp to start MySQL database)

Using your terminal:
1. Clone the repository to your machine
2. Go to where you cloned the repository
3. Run phpMyAdmin and import lukupaivakirja.sql to setup your database
4. Setup your appUser into user table in the database
5. For this you need to generate password hash for your user:
6. Change the password 'yourpassword' in the file luoSalasana.js to the password you want to use
7. Run node luoSalasana.js
8. Copy the password hash to the phpMyAdmin user tables field pass
9. Copy the env.sample to .env and edit the fields to suit your install settings 
10. Then you need the apikey for signing and checking the token that is used in communication between backend and frontend.
11. Run node luoAvain.js and copy the string from command line and add it into your .env file 
12. run npm install
13. run npm start

