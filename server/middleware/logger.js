import colors from "colors";

const logger = (req, res, next) => {
  const mothedColors = {
    GET: "green",
    POST: "blue",
    PUT: "yellow",
    DELETE: "red",
  };
  const color = mothedColors[req.method] || "white";
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color
    ],
  );
  next();
};

export default logger;
