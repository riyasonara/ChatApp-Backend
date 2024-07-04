const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

const ChatnestToken = "chatnest-token";

export { corsOptions, ChatnestToken };
