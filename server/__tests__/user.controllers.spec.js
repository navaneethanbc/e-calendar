// const { registerUser } = require("../../controllers/user.controllers");
// const User = require;
// const hashPasword

// jest.mock(path,()=>({
//     hashPassword :jest.fn((x)=>x)
// }))
// jest.mock(user path)

// const request = {
//   body: {
//     email: "",
//     password: "",
//   },
// };

// const response={
//     status : jest.fn((x)=>x),
//     send : jest.fn((x)=>x)

// }

// // if block

// it("should send a status code of 400 when user exists", async () => {
//     User.findOne.mockImplemetationOnce(()=>({
//         id:1,
//         email:"email",
//         password:"password"
//     }))
//   await registerUser(request,response);
//   expect(response.status).toHaveBeenCalledWith(401)
//   expect(response.send).toHaveBeenCalledTimes(1)
// });

// // else block

// it("should send a status code of 201 when new user created",async()=>{

// User.findOne.mockResolvedValueOnce(undefined)
// User.create.mockREsolvedValueOnce({
//     id:1,
//     email:"email",
//     password:"password"
// })
// await registerUser(request,response);
// expect(hashPassword).toHaveBeenCalledWith("fake_password")
// expect(User.create).toHaveBeenCalledWith({
//     email:"fake_email",
//     password:"hash password",
// })
// expect(response.send).toHaveBeenCalledWith(201)
// })
