const express = require("express");
const router = express.Router();

const labels = require("../utils/labels");

router.get("/", (req, res) => {
  console.log("<> yep");

  res.send("Hello World");
});

router.post("/:emailID", (req, res) => {
  const emailID = req.params.emailID;
  console.log(req.body);

  if (Object.keys(req.body).length > 0) {
    const body = req.body;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    if (emailID === "ocredito") {
      const msg = {
        to: "slo.motion@gmail.com",
        from: `${body.name} <${body.email}>`,
        subject: "Pedido análide de crédito",
        text: JSON.stringify(body),
        html: buildHtml(body)
      };

      sgMail
        .send(msg)
        .then(() => res.status(201).end())
        .catch(error => {
          console.log(error.message);
          res.status(500).send({
            error:
              "Ocorreu um erro ao submeter o pedido. Por favor entre em contaco connosco."
          });
        });
    }
  }
});

module.exports = router;

function buildHtml(mail) {
  const keys = Object.keys(mail);
  const lis = keys.map(k => `<li>${labels[k]}: ${mail[k]}</li>`);
  return `<ul>${lis.join("")}</ul>`;
}
