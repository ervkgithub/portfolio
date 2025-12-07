# Email Setup Guide

This project uses Nodemailer with Gmail to send emails from the contact form and hire me modal. This approach uses Gmail App Passwords, which is simpler and more reliable than OAuth.

## Step 1: Enable 2-Step Verification on Gmail

1. Go to your [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if it's not already enabled
3. This is required to generate an App Password

## Step 2: Generate Gmail App Password

1. Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter a name like "Portfolio Contact Form"
5. Click **Generate**
6. **Copy the 16-character password** (you'll need this - it won't be shown again!)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the `portfolio` folder (if it doesn't exist)
2. Add the following variables:

```env
EMAIL_USER=vijay10101992@gmail.com
EMAIL_PASSWORD=your_16_character_app_password_here
```

3. Replace `your_16_character_app_password_here` with the App Password you generated in Step 2

**Important:** 
- Use your full Gmail address for `EMAIL_USER`
- Use the 16-character App Password (not your regular Gmail password)
- Never commit `.env.local` to git (it's already in `.gitignore`)

## Step 4: Update Recipient Email (if needed)

The email will be sent to: **vijay10101992@gmail.com**

If you need to change the recipient email, edit `portfolio/pages/api/send-email.js` and update the `to` field in the `mailOptions` object (around line 85).

## Step 5: Test the Setup

1. Start your development server: `npm run dev`
2. Fill out the contact form or hire me modal
3. Submit the form
4. Check your email inbox (vijay10101992@gmail.com) for the message

## Troubleshooting

### "Invalid login" or "Authentication failed"
- Make sure you're using the **App Password**, not your regular Gmail password
- Verify that 2-Step Verification is enabled on your Google account
- Double-check that the App Password is copied correctly (no spaces)

### "Email service not configured"
- Make sure `.env.local` exists in the `portfolio` folder
- Verify that both `EMAIL_USER` and `EMAIL_PASSWORD` are set
- Restart your development server after adding environment variables

### Emails not arriving
- Check your spam/junk folder
- Verify the recipient email address in `send-email.js`
- Check the server console for error messages

## Alternative: Using EmailJS (if you prefer)

If you want to use EmailJS instead, you can:
1. Keep the EmailJS package installed
2. Update `utils/emailService.js` to use EmailJS
3. Follow EmailJS setup instructions (but note: Gmail OAuth can have scope issues)

## Security Notes

- App Passwords are more secure than using your regular password
- Each App Password is unique and can be revoked independently
- Never share your App Password or commit it to version control
- If you suspect your App Password is compromised, revoke it and generate a new one

