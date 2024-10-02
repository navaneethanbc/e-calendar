import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
  );
};

// export const generateRefreshToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
//   );
// };
