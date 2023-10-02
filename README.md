## Dronematic

1. Clone the repository:
```
git clone https://github.com/VtWhat/Dronematic.git
```

2. Use `cd` to change into the app's directory:
```
cd Dronematic
```

3. Install the dependencies:
```
npm install
```

4. Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
```

Your project URL and API Anon Key can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. Start the development server:
```
npm run dev
```

Dronematic should now be running on [localhost:3000](http://localhost:3000/).