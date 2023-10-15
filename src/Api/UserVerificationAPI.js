import Api from "./Api";

async function createVerification() {
  return Api({
    method: "post",
    endpoint: "api/user-verification/create-verification",
  });
}

async function attemptVerify(verificationCode) {
  return Api({
    method: "put",
    endpoint: "api/user-verification/attempt-verify",
    body: { code: verificationCode },
  });
}

const UserVerificationAPI = {
  createVerification,
  attemptVerify,
};

export default UserVerificationAPI;
