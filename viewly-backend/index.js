const express = require("express");
const app = express();
const port = 3080;
const cors = require("cors"); // CORS-Modul hinzufügen
var sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');
const secret = "1:7lGpEi?]'864Cll1mMRQY2rq£C^_2y";


// Middleware, um CORS zu aktivieren
app.use(cors());

// Middleware, um JSON-Requests zu verarbeiten
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const pool = require("./db");
const e = require("express");

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/test", async (req, res) => {
  let conn;
  try {
    // here we make a connection to MariaDB
    console.log("Connecting to MariaDB...");
    conn = await pool.getConnection();
    // create a new query to fetch all records from the table
    var query = "select * from users";
    // we run the query and set the result to a new variable
    var rows = await conn.query(query);
    console.log(rows);
    // return the results
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.post("/loginUser", async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();

    var query = `select * from users where (username = '${req.body.username}' or email = '${req.body.username}') and password = '${req.body.password}'`;

    var rows = await conn.query(query);
    if (rows.length > 0 && rows.length < 2) {
      let user = rows[0];
      let expiresIn = req.body.keepLoggedIn ? '30d' : '3h';
      const token = jwt.sign({ userId: user.id, username: user.username }, secret, { expiresIn: expiresIn });
      res.json({ token: token });
    } else {
      res.json({ error: "Either the username, the password or both are incorrect!" });
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.post("/getToken", async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {
      res.json({ success: true, body: decoded });
    }
  });
});


app.post("/register", async (req, res) => {

  let conn;
  try {
    conn = await pool.getConnection();


    var rows = await conn.query(`select * from users where username = '${req.body.username}'`);

    if (rows.length > 0) {
      res.json({ error: "The username is already taken!" });
      return conn.release();
    }
    rows = await conn.query(`select * from users where email = '${req.body.email}'`);
    if (rows.length > 0) {
      res.json({ error: "The email is already in use!" });
      return conn.release();
    }

    var query = `insert into users (username, email, password, firstname, lastname) values ('${req.body.username}', '${req.body.email}', '${req.body.password}' , '${req.body.firstname}', '${req.body.lastname}')`;
    conn.query(query);
    var rows = await conn.query(`select * from users where username = '${req.body.username}'`);
    let expiresIn = req.body.keepLoggedIn ? '30d' : '3h';
    const token = jwt.sign({ userId: rows[0].id, username: req.body.username }, secret, { expiresIn: expiresIn });
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});


app.post('/getUserData', async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {

      let conn;
      if (req.body.columns) {
        sendquery(`select ${req.body.columns} from users where id = ${decoded.userId}`, res);

      } else {
        sendquery(`select * from users where id = ${decoded.userId};`, res);
      }
    }
  });
});

app.post('/getTeams', async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {
      let conn;
      sendquery(`SELECT * FROM teams INNER JOIN isInTeam ON teams.ID = isInTeam.FK_Team_ID WHERE isInTeam.FK_User_ID = ${decoded.userId};`, res);
    }
  });
});


app.post('/createTeam', async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {
      let conn;
      sendquery(`INSERT INTO teams (ID, teamname, description, FK_Admin_ID) VALUES ('${req.body.ID}', '${req.body.teamname}', '${req.body.description}', '${decoded.userId}');`, res);
    }
  });
});


app.post('/joinTeam', async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {
      let conn;
      sendquery(`INSERT INTO isInTeam (FK_User_ID, FK_Team_ID) VALUES ('${decoded.userId}', '${req.body.team_id}');`, res);
    }
  });
});

app.post('/isInTeam', async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {
      let conn;
      sendquery(`SELECT * FROM isInTeam WHERE FK_User_ID = ${decoded.userId} AND FK_Team_ID = '${req.body.team_id}';`, res);
    }
  });

});

app.post('/getTeamMembers', async (req, res) => {
  sendquery(`SELECT id, username, firstname, lastname, email
  FROM users 
  INNER JOIN isInTeam 
  ON users.ID = isInTeam.FK_User_ID 
  WHERE isInTeam.FK_Team_ID = '${req.body.team_id}'
  ORDER BY isInTeam.JoinTime;`, res);
});


app.post('/getTeamData', async (req, res) => {
  sendquery(`SELECT * FROM teams WHERE ID = '${req.body.team_id}';`, res);
});

app.post('/leaveTeam', async (req, res) => {
  jwt.verify(req.body.token, secret, function (err, decoded) {
    if (err) {
      res.json({ success: false });
    } else {
      let conn;
      sendquery(`DELETE FROM isInTeam WHERE FK_User_ID = ${decoded.userId} AND FK_Team_ID = '${req.body.team_id}';`, res);
    }
  });
});

app.post('/changeTeamAdmin', async (req, res) => {
sendquery(`UPDATE teams SET FK_Admin_ID = '${req.body.newAdmin}' WHERE ID = '${req.body.team_id}';`, res);
});

app.post('/deleteTeam', async (req, res) => {
  sendquery(`DELETE FROM teams WHERE ID = '${req.body.team_id}';`, res);
});

async function sendquery(query, res) {
  try {
    conn = await pool.getConnection();

    var rows = await conn.query(query);
    console.log(rows);
    if (query.toLowerCase().includes("select")) {
      res.json({ data: rows, error: false });
    } else {
      res.json({ error: false });
    }

    conn.release();
  } catch (err) {
    console.log(err);
    console.log(query);
    if (conn) conn.release();
    res.json({ error: true, errorMessage: "An Database error occured!" });
  }
}

