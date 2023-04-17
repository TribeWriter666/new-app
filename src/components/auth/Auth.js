import { Auth as SupabaseAuth, supabase } from "@supabase/ui";
import "@supabase/ui/dist/style.min.css";

function Auth() {
  return (
    <SupabaseAuth.Provider supabaseClient={supabase}>
      <SupabaseAuth.UserContextProvider>
        <SupabaseAuth />
      </SupabaseAuth.UserContextProvider>
    </SupabaseAuth.Provider>
  );
}

export default Auth;
