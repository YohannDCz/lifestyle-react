import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wsxlhciigojzxyrclszd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzeGxoY2lpZ29qenh5cmNsc3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MjI3NjQsImV4cCI6MjA1NDQ5ODc2NH0.xAe3gVHZSAbsLbyVxVoSyLqf-kpeM9l-AdRJ9nxGExg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Global locale variable
export let currentLocale = "en";

export const setLocale = (locale: string) => {
  currentLocale = locale;
};

export const getLocale = () => currentLocale;
