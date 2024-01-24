import { SubmitHandler, useForm } from "react-hook-form";

import {
  MESSAGE_INVALID_EMAIL_FORMAT,
  MESSAGE_REQUIRED_EMAIL,
} from "@/helpers/error";
import { REGEX_EMAIL } from "@/lib/constants";
import { useSignup } from "@/queries/user";
import { FormRules } from "@/types/form";
import { SignupFormField } from "@/types/user";

export default function useSignupForm() {
  const form = useForm<SignupFormField>({
    values: { email: "", password: "", passwordConfirm: "", type: "employee" },
  });
  const { mutate } = useSignup();

  const onSubmit: SubmitHandler<SignupFormField> = ({
    email,
    password,
    type,
  }) => {
    mutate({ email, password, type });
  };

  const rules: FormRules<SignupFormField> = {
    email: {
      required: {
        value: true,
        message: MESSAGE_REQUIRED_EMAIL,
      },
      pattern: {
        value: REGEX_EMAIL,
        message: MESSAGE_INVALID_EMAIL_FORMAT,
      },
    },
    password: {
      required: true,
    },
    passwordConfirm: {
      required: true,
    },
    type: {
      required: true,
    },
  };

  const handlers = {
    email: {
      onBlur: () => {
        form.trigger("email");
      },
    },
  };

  return { form, onSubmit, rules, handlers };
}
