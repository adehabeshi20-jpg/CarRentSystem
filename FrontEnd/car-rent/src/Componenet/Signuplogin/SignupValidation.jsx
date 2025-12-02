function validation(values) {
  const errors = {};
  const email_pattern = /^\S+@\S+\.\S+$/;
  const name_pattern = /^[A-Za-z]+$/;
  const phone_pattern = /^[0-9]{6,15}$/;

  if (!values.Fname) {
    errors.Fname = "First name is required";
  } else if (!name_pattern.test(values.Fname)) {
    errors.Fname = "First name is invalid";
  }

  if (!values.Lname) {
    errors.Lname = "Last name is required";
  } else if (!name_pattern.test(values.Lname)) {
    errors.Lname = "Last name is invalid";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Email is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (!phone_pattern.test(values.phone)) {
    errors.phone = "Phone must be 6-15 digits";
  }

  return errors;
}

export default validation;
