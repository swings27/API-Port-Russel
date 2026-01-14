const swaggerJSDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API Port Russel",
			version: "1.0.0",
			description: "Documentation de mon API",
		},
		servers: [
			{
				url: "http://localhost:8000",
				description: "Serveur local",
			},
		],
		components: {
			securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      
			schemas: {
				Catway: {
					type: "object",
					required: ["catwayNumber", "catwayType", "catwayState"],
					properties: {
						catwayNumber: {
							type: "integer",
							example: 12,
							description: "Numéro unique du catway",
						},
						catwayType: {
							type: "string",
							enum: ["short", "long"],
							example: "short",
							description: "Type du catway : court ou long",
						},
						catwayState: {
							type: "string",
							example: "available",
							description: "État actuel du catway",
						},
						createdAt: {
							type: "string",
							format: "date-time",
							example: "2026-01-14T12:00:00Z",
							description: "Date de création du catway",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							example: "2026-01-14T12:30:00Z",
							description: "Date de dernière mise à jour du catway",
						},
					},
				},

				Reservation: {
					type: "object",
					required: [
						"catwayNumber",
						"clientName",
						"boatName",
						"startDate",
						"endDate",
					],
					properties: {
						catwayNumber: {
							type: "integer",
							example: 12,
							description: "Numéro du catway réservé",
						},
						clientName: {
							type: "string",
							example: "Jean Dupont",
							description: "Nom complet du client",
						},
						boatName: {
							type: "string",
							example: "Le Vent du Large",
							description: "Nom du bateau",
						},
						startDate: {
							type: "string",
							format: "date-time",
							example: "2026-02-01T08:00:00Z",
							description: "Date de début de la réservation",
						},
						endDate: {
							type: "string",
							format: "date-time",
							example: "2026-02-10T18:00:00Z",
							description: "Date de fin de la réservation",
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "Date de création de la réservation",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							description: "Date de dernière mise à jour",
						},
					},
				},
				User: {
					type: "object",
					required: ["name", "firstname", "email", "password"],
					properties: {
						name: {
							type: "string",
							example: "Dupont",
							description: "Nom de l'utilisateur",
						},
						firstname: {
							type: "string",
							example: "Jean",
							description: "Prénom de l'utilisateur",
						},
						email: {
							type: "string",
							format: "email",
							example: "jean.dupont@email.com",
							description: "Adresse email unique de l'utilisateur",
						},
						password: {
							type: "string",
							format: "password",
							example: "MotDePasse123!",
							description:
								"Mot de passe de l'utilisateur (hashé en base de données)",
						},
					},
				},
				UserResponse: {
					type: "object",
					properties: {
						_id: {
							type: "string",
							example: "65a4b9e3f12c4e2a9d123456",
							description: "Identifiant MongoDB de l'utilisateur",
						},
						name: {
							type: "string",
							example: "Dupont",
						},
						firstname: {
							type: "string",
							example: "Jean",
						},
						email: {
							type: "string",
							format: "email",
							example: "jean.dupont@email.com",
						},
						createdAt: {
							type: "string",
							format: "date-time",
							example: "2026-01-14T10:00:00Z",
						},
						updatedAt: {
							type: "string",
							format: "date-time",
							example: "2026-01-14T12:00:00Z",
						},
					},
				},
			},
		},
	},
	apis: ["./routes/*.js"],
};

module.exports = swaggerJSDoc(options);
