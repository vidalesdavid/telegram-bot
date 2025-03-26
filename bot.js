const { Telegraf } = require('telegraf');
const mysql = require('mysql2');


const bot = new Telegraf('7580096925:AAHp7d-hzkg93V6cNz1f4F8pYkFLblMMbwc');

//Conexión con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: '',            
  database: 'base'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Respuesta inicial al comando /start
bot.start((ctx) => ctx.reply('¡Hola, soy David Vidales'));

// Guardar mensajes del usuario
bot.on('text', (ctx) => {
  const userMessage = ctx.message.text;
  const usuarioId = ctx.from.id;

  // Insertar el mensaje en la base de datos
  const query = 'INSERT INTO pruebas(nombre, apellido) VALUES (?, ?)';

  connection.query(query, [usuarioId.toString(), userMessage], (err, result) => {
    if (err) {
      console.error('Error al guardar el mensaje:', err);
    } else {
      console.log('Mensaje guardado con éxito', result.insertId);
    }
  });
});

// Lanzar el bot
bot.launch();
