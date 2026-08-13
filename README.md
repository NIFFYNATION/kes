# Kingdom Entrepreneurs Summit 2026

## Local development

Copy `.env.example` to `.env`, add the required values, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Registration list

Registrations are stored directly in a private Google Sheet through a bound
Google Apps Script web app. The browser never receives the Sheet URL or its
shared security key.

1. Create a Google Sheet and open **Extensions → Apps Script**.
2. Replace the editor contents with `google-apps-script/Code.gs`.
3. Run `initializeRegistrationSheet`, then run
   `configureRegistrationSecret` and enter a random value of at least 32
   characters.
4. Deploy the script as a **Web app**, executing as yourself, with access set to
   **Anyone**. The security key still protects every write.
5. Set `GOOGLE_SHEETS_WEB_APP_URL` to the deployment URL and
   `GOOGLE_SHEETS_SECRET` to the same security key in `.env` and in the hosting
   provider's environment settings.

The **Registrations** tab is the private attendee list and can be filtered,
sorted, shared with organizers, or downloaded as CSV. Redeploy the Apps Script
after future code changes.

When registration fields change, paste the latest `google-apps-script/Code.gs`,
run `initializeRegistrationSheet` again to refresh the columns, then create a
new web-app version from **Deploy → Manage deployments**.

## WhatsApp redirect

When the group is ready, set `WHATSAPP_GROUP_URL` to the full
`https://chat.whatsapp.com/...` invitation link. After a registration is saved,
the browser redirects to that group. If the value is empty or invalid, the
existing success confirmation remains on the site.

## Quality checks

```bash
npm run build
npm run lint
```
