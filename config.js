// Supabase project: couple-sync-listen (isolated — separate from any other project)
const SUPABASE_URL = "https://eargwtmhsfnulnuglnle.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhcmd3dG1oc2ZudWxudWdsbmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzMyODIsImV4cCI6MjEwMTc0OTI4Mn0.mS2s9IegXyTTPYMrF_6h8z-DOzz1g8UGZJrroYfM1aI";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
