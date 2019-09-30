const express = require("express");
const router = express.Router();

const labels = require("../utils/labels");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/:emailID", (req, res) => {
  const emailID = req.params.emailID;
  if (Object.keys(req.body).length > 0) {
    const body = req.body;

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    if (emailID === "ocredito") {
      const msg = {
        to: [
          // "abarreleiro@gmail.com"
          // "ocredito.pt@gmail.com",
          "slo.motion@gmail.com"
        ],
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
  const lis = keys.map(k => {
    if (k === "goal") {
      const val = labels.goalValue[mail[k]];
      return `<li>${labels[k]}: ${val}</li>`;
    } else if (k === "household1" || k === "household2") {
      const val = labels.household[mail[k]];
      return `<li>${labels[k]}: ${val}</li>`;
    } else if (k === "rent" || k === "credit" || k === "income") {
      return `<li>${labels[k]}: ${mail[k]}€</li>`;
    } else {
      return `<li>${labels[k]}: ${mail[k]}</li>`;
    }
  });
  return `<ul>${lis.join("")}</ul>`;
}
