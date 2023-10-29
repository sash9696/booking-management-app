
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://xwncjkmfjagnjhfuohpq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3bmNqa21mamFnbmpoZnVvaHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczNDU2NzcsImV4cCI6MjAxMjkyMTY3N30.ESfnJX4fGNWzrGhCiZgNdo0-39mf_zmtAIXWQ29vNHo';
//This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies.
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;