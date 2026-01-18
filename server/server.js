require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 👇 SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "public")));

app.post("/enviar-form", async (req, res) => {
  const { nombre, email, tipoProceso, volumen, detalle } = req.body;

  if (!nombre || !email || !tipoProceso || !volumen || !detalle) {
    return res.status(400).json({ ok: false, msg: "Faltan datos" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "Nueva solicitud de automatización",
      text: `
        Nombre/Empresa: ${nombre}
        Email: ${email}
        Tipo de proceso: ${tipoProceso}
        Volumen: ${volumen}
        Detalle: ${detalle}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ ok: true, msg: "Correo enviado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: "Error al enviar" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
