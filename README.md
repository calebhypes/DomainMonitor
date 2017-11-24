# Domain Monitor

Domain Monitor is a work in progress open-source application for easy monitoring of Domain Whois data for developers. This will allow you to create an account, login and add domains for monitoring on your account. The at a glance data includes the domain name itself, date created, date modified, date of expiration and if the domain has a registered SSL certification.

Currently , SSL certification is just using placeholder text and the domain whois details are rendered in UTC time versus a more human legible format. I'll be resolving this shortly.

My end goal for this application will be to allow users to set reminders either via email or via phone on a per domain basis or in bulk based on a user given timeframe (IE: Remind me 1 month before expiration via text message, etc). Users will be able to easily remove, modify or add new domains and settings per domain as necessary and the domain details will be given based on the users locality (Timezone chosen upon sign up or modified later within profile settings.) Another long-term goal will be to allow teams or groups that maintain or control different domains to share these on team based dashboards.

This project stemmed from a personal need to have a way to easily monitor multiple domain details (for purchase and updating) and I was unable to find a decent one for free at the time, thus this idea was born. I hope once this is fully functional others can get use of it or at the very least learn something from the open source code itself in the same way I've learned while building it.