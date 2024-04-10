const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.text());

app.post('/runpowershell', (req, res) => {
  const command = req.body;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Fehler beim Ausführen des Befehls: ${error}`);
      res.status(500).send('Fehler beim Ausführen des Befehls');
      return;
    }

    console.log(`Ausgabe: ${stdout}`);
    console.error(`Fehlerausgabe: ${stderr}`);

    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
