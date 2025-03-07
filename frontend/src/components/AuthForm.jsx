import { Formik, Form, Field } from "formik";
import useAuth from "../hooks/useAuth";
import useAuthContext from "../auth/authProvider";

const Authform = () => {
  const { authenticate } = useAuth();
  const { token, logIn } = useAuthContext();
  // console.log('useAuthContext', useAuthContext())


  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      //   onSubmit={async (values) => {
      //     await new Promise((r) => setTimeout(r, 500));
      //     alert(JSON.stringify(values, null, 2));
      //   }}

      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        console.log(values);
        // fetch("/api/v1/login", {
        //     method: "POST",
        //     body: JSON.stringify(values),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log("Ответ от сервера:", data);
        //     setSubmitting(false); // Сброс флага после обработки
        // })
        // .catch(error => {
        //     console.error("Ошибка:", error);
        //     setSubmitting(false); // Сброс флага даже в случае ошибки
        // });

        try {
          const result = await authenticate(values);
          console.log("Ответ от сервера:", result);
          if (result) {
            localStorage.setItem("token", result.token);
            // localStorage.removeItem("token", result.token);
            // console.log("Before calling logIn");
            logIn(token, result.username);
            // console.log("After calling logIn");
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          console.error("Ошибка", error);
          setFieldError("username", "Неверные имя пользователя или пароль");
          setFieldError("password", "Неверные имя пользователя или пароль");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className="col-12 col-md-6 mt-3 mt-md-0">
          <h1 className="text-center mb-4">Войти</h1>
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              placeholder="Ваш ник"
              className={`form-control ${
                touched.username && errors.username ? "is-invalid" : ""
              }`}
              required
            />
            <label className="form-label" htmlFor="username">
              Ваш ник
            </label>
          </div>
          <div className="form-floating mb-4">
            <Field
              id="password"
              name="password"
              placeholder="Пароль"
              className={`form-control ${
                touched.password && errors.password ? "is-invalid" : ""
              }`}
              required
              autocomplete="current-password"
              type="password"
            />
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            {touched.password && errors.password && (
              <div className="invalid-tooltip">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
            Войти
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Authform;