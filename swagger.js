const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Port Russel",
      version: "1.0.0",
      description: "Documentation de mon API",
    },
  },
  apis: ["./routes/*.js"], // fichiers où sont les commentaires Swagger
};

module.exports = swaggerJSDoc(options);