import jwt, { decode } from "jsonwebtoken";

function auth(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  console.log(authorizationHeader);

  if (typeof authorizationHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const [bearer, token] = authorizationHeader.split(" ", 2);

  console.log({ bearer, token });

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }

    console.log({ decode });

    req.user = {
      id: decode.id,
      name: decode.name,
    };

    next();
  });
}

export default auth;
