# Holy Hack - repo team PWN Stars

We have decided to create a website / app with React and Typescript in the frontend and using PHP as the backend. To ensure our project works in the same way on different devices we used Docker.

We have developed Finsight, an app providing interactive financial insight targetted at young starters interested in investing. 

When the app is started, the quarterly rewind is shown. Here the user sees a brief entertaining overview of the previous quarter. After clicking through all the pages the user is brought to the home page. 

Here, in a more standard way an overview is given of the user's portfolio. Its performance is shown in a chart and a complete list of the user's stocks is given below.

Using the menu on the bottom the user can go to the daily quiz. Here 5 randomized questions are asked with multiple choise answers. After clicking on one, an explanation to the correct answer is given.

Lastly, there is a stock selector page, which displays a brief overview of a stock. The user can swipe to the left to discard it or wipe to the right to add the stock to their watchlist.

We believe these features will cause more people to engage in their financial future.

## Running it yourself

We have provided you with a dockerfile, which you can use to run the project (the demo below also uses this), provided you point the .env file the a valid database.

If you're familiar with laravel sail, you can use ./vendor/bin/sail up to run the project. You will also need to install packages using: composer install, npm install and npm run build.

## Demo

https://holy-hack.de-1.yendric.be/dashboard
You can create an account. For mobile view, use devtools and set to mobile mode (and refresh).

## Notes

We were experimenting with genAI and left an API key in our project for easy testing, don't worry about it :).