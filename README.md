# [dev.to](https://dev.to/) clone using T3-app and AWS S3

This is my project to understand fundamental web development using NextJs and Typescript.

## Backgrounds

In [dev.to](https://dev.to/), we can post, delete, hide, and update topics. Moreover, we can leave comments and add bookmarks and likes to topics and comments. This is the main feature of this original app. 
Then, I would like to learn about the mechanism of these structures and processes and how they work. From these points of view, I decided to create a dev to clone a web app with a full-stack development package, t3-app.

## Review

Creating a fully functional authentication using NextAuthJs was challenging since I was unsure how to implement the feature into an app. I referred to the Udemy course called [Build apps using NextJS v14 using App Router, Next Auth, NextUI, and TailwindCSS! Learn the latest version of NextJS!](https://www.udemy.com/course/next-js-the-complete-developers-guide/learn/lecture/40861083?start=525#overview). This was the greatest tool to configure my knowledge of the web fundamentals using NextJs and Typescript. 

## Functionality of my app

I will explain my app in detail since I cannot provide the actual prototype to the public for security purposes. However, I can describe what it looks like with videos so that you can figure out how I did for my project. 

### Overview
https://github.com/user-attachments/assets/40233ee0-2dd7-49a9-b124-854be6017d35

### Authentication
I added Google OAuth, GitHub OAuth, and credentials for the authentication using NextAuthJs. Once you successfully sign up, you can log in with your option. 

https://github.com/user-attachments/assets/6983c331-b769-4d5b-a29d-c9813b1866b8

### Create, Edit, Archive & Hide, & Delete a topic
Once you log in or sign up, you are allowed to create a topic and see it in public. If you would like to hide your topic, edit, or delete, you can also do these actions with no issues. 

https://github.com/user-attachments/assets/6a25f7c0-752c-4d47-b9b9-32fe6fce115f
