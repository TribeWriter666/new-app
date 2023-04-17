import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hniadnqrphzpdpkiovib.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuaWFkbnFycGh6cGRwa2lvdmliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2OTQyODksImV4cCI6MTk5NzI3MDI4OX0.jIeOPact9aPGn7x4q1GjQj_0gwm7ippkddnOGcbo4gE";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
