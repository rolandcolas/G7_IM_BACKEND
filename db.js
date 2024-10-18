// backend/src/config/db.js

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'sql211.infinityfree.com', // MySQL Host Name from InfinityFree
  user: 'if0_37534614',            // MySQL User Name from InfinityFree
  password: '2anIxil8MtTF', // Use your vPanel password
  database: 'if0_37534614_school_reservation'  // MySQL DB Name
});

module.exports = pool;
