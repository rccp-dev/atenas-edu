import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function run() {
  const USER_ID = "d49a08e2-0d06-4566-8496-c3d9d86ca223";

  const { data, error } = await supabase.auth.admin.createUser({
    id: USER_ID,
    email: "atenasedu.co@gmail.com",
    password: "admin.atenas-edu.2026",
    email_confirm: true,
    user_metadata: {
      name: "Administrador principal",
    },
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log("USER ID:", data.user?.id);
}

run();