import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "redux-first-history";
import { Link } from "@reach/router";
import { Form, Button } from "react-bootstrap";

import { Store } from "../../../../store";

import { getToken, getError } from "../../selectors";
import { login } from "../../actionsApi";

import { InputField } from '../InputField/InputField';

import styles from "./LoginForm.module.scss";

const mapStateToProps = (state: Store) => ({
  token: getToken(state),
  error: getError(state)
});

const mapDispatchToProps = {
  login,
  push
};

type ModelProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type InjectedProps = ModelProps & DispatchProps;

export const LoginFormUnconnected: React.FC<{}> = props => {
  const [phoneField, setPhoneField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [activeField, setActiveField] = useState<string | undefined>();

  const injected = props as InjectedProps;

  function login(e: React.SyntheticEvent) {
    e.preventDefault();
    injected.login(phoneField, passwordField);
  }

  return (
    <div className={styles.form}>
      <h2>Вход</h2>
      <p className="text-muted">
        в личный кабинет и запись на квалификационные экзамены
      </p>
      <Form.Group controlId="loginForm">
        <InputField
          name="phone"
          label="Мобильный телефон"
          type="phone"
          placeholder="9794426521"
          currentActiveField={activeField}
          setCurrentActiveField={setActiveField}
          onChange={(e: any) => setPhoneField(e.target.value)}
          error={{
            failures: injected.error.failures
              ? injected.error.failures.Phone
              : []
          }}
        />

        <InputField
          className="mt-3"
          name="password"
          label="Пароль"
          type="password"
          placeholder=""
          currentActiveField={activeField}
          setCurrentActiveField={setActiveField}
          onChange={(e: any) => setPasswordField(e.target.value)}
          error={{
            failures: injected.error.failures
              ? injected.error.failures.Password
              : []
          }}
        />

        <Link to="/forgot-password">
          <Form.Text
            className={`mb-3 text-muted text-right ${
              styles["forgot-password"]
            }`}
          >
            Забыли пароль?
          </Form.Text>
        </Link>

        <p className={`${styles.error} text-center`}>
          {injected.error.message}
        </p>

        <Button variant="primary" onClick={login} type="submit" block>
          Войти
        </Button>

        <Form.Group controlId="rememberMe" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Запомнить меня"
            className="text-center text-muted"
          />
        </Form.Group>
      </Form.Group>
    </div>
  );
};

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormUnconnected);