# Line-Notification-for-Trading-Team
Create Line Notification to notify when price reach target profit or drawdown 

Google Sheet for Line Notification: https://docs.google.com/spreadsheets/d/1siAtUUta1nbMmFOXqmIqC40pmx1OAvKDpOPMe_xjB3I/edit?usp=sharing

Google App Script based on this google sheet. First I use importrange function to import data from another trading record sheet, and then write code on top of it to trigger either target profit or drawdown open the next order as per trading plan. The notification will notify since 4:00 AM on Monday till 4:00 AM on Saturday as per forex session open. By writing code create trigger and delete trigger as per forex session. If I use built-in fuction trigger, the system will error due to it cannot pull data during weekend.

The important thing to connection with line notification, you have to generate token from line web browser and then put into the code. After that create line group and invite line notification to your group.
