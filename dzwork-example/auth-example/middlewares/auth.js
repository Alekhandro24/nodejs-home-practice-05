/*
Витягає токен із заголовка та:
1. Перевіряє валідність токена(що ми його видали та термнін(1h) ще не пройшов)
2. Витягає з токена id, знаходить користувача в базі id та прикрипляє його до запиту (req.user)
*/

/*
1. Витягти з заголовка запиту вміст заголовка Authorization
2. Розділити цого на 2 слова - barer та токен
3. Перевірити чи рівно перше слово "barer"
4. Перевірити валідність другого слова(токен)
5. Якщо токен валідний - вилучити з нього id та знайти користувача в базі з тиким id
6. Якщо кристувача з таким id ми знайшли в базі - його треба добавити до запиту (об*єкт req)
*/

const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
