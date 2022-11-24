import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aaxzlvyhfqnxraqbdibd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheHpsdnloZnFueHJhcWJkaWJkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2OTIyNTI3NSwiZXhwIjoxOTg0ODAxMjc1fQ.ts51yLHq7rNgOL24w3YzEwEZm--0HYeU4X0WA9Atz5g";
export const supabase = createClient(supabaseUrl, supabaseKey);
