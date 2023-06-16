const express = require('express');
const app = express();
const port = 5001;

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});


app.get('/syncDatabase', async (req, res) => {
  const database = require('./database/db');
  try {
    await database.sync();
    res.send('Database synchronized successfully');
  } catch (error) {
    res.send(error);
  }
});

app.post('/createProgrammer', async (req, res) => {
  try {
    const params = req.body;

    const requiredProperties = ['name', 'python', 'java', 'javascript'];

    const check = requiredProperties.every(property => property in params);

    if (!check) {
      const propStr = requiredProperties.join(', ');
      throw new Error(`All parameters needed to create a programmer must be sent: ${propStr}`);
    }

    const newProgrammer = await programmer.create(params);

    res.send(newProgrammer);
  } catch (error) {
    res.send(error.message);
  }
});

app.get('/retrieveProgrammer', async (req, res) => {
  try {
    const params = req.body;

    if ('id' in params) {
      const record = await programmer.findByPk(params.id);

      if (record) {
        res.send(record);
      } else {
        res.send('No programmer found using the received ID');
      }

      return;
    }

    const records = await programmer.findAll();

    res.send(records);
  } catch (error) {
    res.send(error.message);
  }
});

app.put('/updateProgrammer', async (req, res) => {
  try {
    const params = req.body;

    if (!('id' in params)) {
      throw new Error("Missing 'id' in request body");
    }

    const record = await programmer.findByPk(params.id);

    if (!record) {
      throw new Error('Programmer ID not found.');
    }

    const properties = ['name', 'python', 'java', 'javascript', 'access', 'C', 'CPlusPlus', 'CSharp'];

    const check = properties.some(property => property in params);

    if (!check) {
      const propStr = properties.join(', ');
      throw new Error(`Request body doesn't have any of the following properties: ${propStr}`);
    }

    Object.assign(record, params);

    await record.save();

    res.send(`${record.id} ${record.name} - Updated successfully`);
  } catch (error) {
    res.send(error.message);
  }
});

app.delete('/deleteProgrammer', async (req, res) => {
  try {
    const params = req.body;

    if (!('id' in params)) {
      throw new Error("Missing 'id' in request body");
    }

    const record = await programmer.findByPk(params.id);

    if (!record) {
      throw new Error('Programmer ID not found.');
    }

    await record.destroy();

    res.send(`${record.id} ${record.name} - Deleted successfully`);
  } catch (error) {
    res.send(error.message);
  }
});



