import { ActionFunction, Form, useTransition } from "remix";
import { useActionData, MetaFunction, redirect } from "remix";
import { supabaseToken } from "../../cookies";
import { supabase } from "../../lib/supabase/supabase.server";

export let meta: MetaFunction = () => {
  return {
    title: "Bills IO",
    description: "Sign in or sign up.",
  };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();
  console.log("supabase", supabase);
  console.log("email", email);
  console.log("password", password);
  const { session, error } = await supabase.auth.signIn({ email, password });

  if (session) {
    supabase.auth.setAuth(session.access_token);
    return redirect("/profile", {
      headers: {
        "Set-Cookie": await supabaseToken.serialize(session.access_token, {
          expires: new Date(session?.expires_at!),
          maxAge: session.expires_in,
        }),
      },
    });
  }
  return { error };
};

const Login = () => {
  const actionData = useActionData();
  console.log("action.error", actionData?.error);
  const { state } = useTransition();

  return (
    <Form method="post">
      <div>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button type="submit">Login</button>
        </div>
      </div>
    </Form>
  );
};

export default Login;
