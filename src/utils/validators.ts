export const isEmailValid = (email: string) => {
  const formattedEmail = email.toLowerCase().trim();
  const emailValidator = /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/;

  return !emailValidator.test(formattedEmail);
};
