# allways-q2p-automation

## What is this?

A very simple prototype of a future quote-to-payment automation process for a printing press named Allways Graphics and Printing Services. This was made in accomplishment of our MSYS 42 A class over the span of a few months.

It uses Django + Django REST Framework on the backend as a RESTful API, which is consumed by a React frontend app, and is deployed live on Heroku using Heroku Postgres as its underlying production database. 

(For those about to read into the source code, be warned that this was made under a lot of stress by a handful of students who are new to development. There are likely many unresolved issues and bugs as of writing, especially given the trickiness of the tech stack.)

## How to use this?

### Using the system as an Account Manager

Log in as the following account as an "Account Manager."

**Username:**
testAccountManager

**Password:**
testpassword123!

Explore the Dashboard, Quote Review, Order Tracking, and Manage Employees pages as you need.

The Quote Review page is for seeing requests for quotations awaiting computation from clients, computing and sending them back to the client, and then awaiting their approval. 

After a quotation's approval, you can then create a job order, and track its progress through production and delivery via the Order Tracking page. Here, if you are an Account Manager, you can trigger changes in the production and delivery statuses of a given job order via the "Finish Production" or "Finish Delivery" buttons on the cards of the page.

### Using the system as a Production Employee or Deliveryman

Apart from account managers, there are also the following types of accounts:

Firstly, the production employee, which can update the production status of a job order from the Order Tracking page by pressing "Finish Production."

**Username:**
testProduction

**Password:**
testpassword123!


And secondly, the delivery employee, which can update the delivery status of a job order from the Order Tracking page by pressing "Finish Delivery."

**Username:**
testDriver

**Password:**
testpassword123!

With both production and delivery employees, any updates they made will be reflected on the end of the account manager upon a page refresh.

### Using the system as a Client

Alternatively, you can also create a new client account by logging out, and then signing up for a new account with your username, email, and first + last names. Afterwards, the user can log in using their username and password as account credentials.

Upon logging in, you can go to the Request Quotation page to make a request for quotation, filling out certain specifications (page length, page width, quantity, project name, number of quotation items (e.g. cover, inner pages), as well as lamination, binding, and paper types for each. 

Afterwards, the client can track the status of their orders via the Order Tracking page which will get updated upon page refresh of any updates made by the employees of Allways (whether Account Manager, Production Employee, or Deliveryman)

## **Installation Instructions for "fresh" copies** (Django Backend)

First make sure that you have Python 3.9 (https://www.python.org/downloads/), pip (comes with Python by default), and pipenv (https://pypi.org/project/pipenv/) installed.

```cmd
pip install pipenv
```

Install dependencies
```cmd
pipenv install
```

Run virtual environment in terminal
```cmd
pipenv shell
```
### NEW STEP (as of May 20, 2021) ###
Add a `.env` file with the following contents:
```
DATABASE_URL=sqlite:///db.sqlite3
```
**Why?** This is in order to let your local copy know that it is supposed to use SQLite as the testing database.

Make migrations at the root directory to enable Django admin site and all our app's models.
```cmd
python manage.py migrate
```

Load all test data for the API.
```cmd
python manage.py loaddata all_test_data.json
```

Afterwards, set up a superuser for development purposes.
```cmd
python manage.py createsuperuser
```

Now you're all set on the backend 😊

## **Re-installation Instructions for non-updated copies** (Django Backend)

**In case a new library is installed on the backend**, it will be necessary to run once more the following commands to install them on your local Python virtual environment:
```cmd
pipenv shell
pipenv install
```

**For non-database related files** such as `views.py`, `serializers.py`, `urls.py`, assorted JSON test data, and others, there are no extra commands which need to be run.

Meanwhile, **to update the database schema in line with changes to the models**, it would normally be sufficient to just run the following command to apply any new database migrations on your local database:
```cmd
python manage.py migrate
```

**However, it is also possible that you will get migration errors.** If you do get such errors, running the following commands which perform a clear of all present data in your local database, a reset of your database schema to its "original" state, and a re-application of all migrations available on the backend API.
```cmd
python manage.py flush
python manage.py migrate api 0001
python manage.py migrate
```

Afterwards simply reload all the needed test data with the following command
```cmd
python manage.py loaddata all_test_data.json
```

And finally, recreate your superuser with the following command for debug purposes.

```cmd
python manage.py createsuperuser
```
**Following the above steps should fix any remaining migration errors on your part** and keep your local database up to date with the latest changes.

## **Installation Instructions** (React Frontend)

At the root directory, run `npm install` to install the project dependencies.

```cmd
npm install
```

Now you're all set on the frontend 😊

## **How to run backend Django development server for the API**
From the root directory, run the following command.
```cmd
python manage.py runserver
```

This will run the backend API on the following URLs: `http://127.0.0.1:8000` or `http://localhost:8000` (either should work just fine.)

You will see an `404 error page not found` kind of message on the home page, but **don't mind this**. 

This is because **there is technically no home page for the backend API** on the default URL. 

The "true" home page of the API lives in the following URL: `http://127.0.0.1:8000/api/`, from which **you will see a summary of the main API routes you can visit** on the backend for testing purposes, and as well as those you can use to `GET` / `POST` / `DELETE` data from the database for the frontend through http requests.

To stop the development server, press `CTRL`+`C` 

## **Handling changes to the models**

Changes made will automatically reload the server, except for those made to the database models.

If you're making changes to the database models, you will have to run the following commands:
```cmd
python manage.py makemigrations [NAME_OF_APP_HERE]
python manage.py migrate
```

And then afterwards, restart the server accordingly.
```cmd
python manage.py runserver
```


## **HOW TO FIX MIGRATION ERRORS**

If you're getting migration errors, it's probably because the database schema of the `db.sqlite3` file is not in sync with the migrations. Try the following to do a "reset" of your local database to keep it up to date with the present state of the migrations:
```cmd
python manage.py flush
python manage.py migrate api 0001
python manage.py migrate
```

Afterwards simply reload all the needed test data with the following command
```cmd
python manage.py loaddata all_test_data.json
```

And finally, recreate your superuser with the following command for debug purposes.

```cmd
python manage.py createsuperuser
```

## **How to run frontend React development server**

From the root directory, run `npm start`. More instructions on specific frontend commands in `frontend/README.md` document.

```cmd
npm start
```

## How to push to the live version of the app on Heroku

**Normally, you will not have to do this yourself** (except if you're Red). But just for the sake of understanding, this is how one would actually push latest changes onto Heroku: 

### Step 1: Setting up Heroku CLI ###
1. **Create an account at Heroku**
2. **Install Heroku CLI** from the Heroku website.
3. **Run** `heroku login`. It will prompt you to log in via a new window on your browser.
4. **Enter your credentials** from your Heroku account, and log in. You can now close this window.
5. **Add the Heroku Git remote** to your Git remote repositories by running the following command: `heroku git:remote -a allways-q2p-automation`

### Step 2: Pushing changes onto the live Heroku app
1. After you have made any changes to the source code, and have merged all changes to the master branch, simply run `git push heroku master` to "replicate" the changes on the live app.

    This process really does take a long time (a few minutes),
2. Once the terminal log has finished, and it has notified you that the app has been successfully deployed, you should be able to see it live on Heroku by going to the URL: https://allways-q2p-automation.herokuapp.com.

### NOTES ABOUT THE LIVE VERSION ###
- It is slower than the local version. API calls can take several seconds longer than when it is run on your local machine.
- There are bugs that are more apparent here as compared to the local version.
- We will fix this all up eventually, but for now please bear with it! :) 
- It uses PostgreSQL as the backend database rather than SQLite.
- Rather than running `python manage.py`, it runs `gunicorn backend.wsgi --log-file -`
  - Gunicorn is an HTTP server that has been set up for serving both the Django REST Framework API only when deployed live. 
  - Static files (particularly, the React frontend build) are served through the `whitenoise` middleware.

## IMPORTANT NOTES:

1. **DO NOT** do `git push origin master` unless you're Red or Camille (this is for our collective sanity).

2. **Create your own branch** if you're working on a particular feature of the project, and keep us updated via Discord or Facebook Messenger.
   
    Read the [useful references](#useful-references) below on Git / GitHub in order to know more.
3. **Keep open communication** with the rest of the team! Don't be embarassed to ask "stupid questions." We're all in this together 😊   

## **Setting up Visual Studio Code for Django development**

Below here, I've compiled some VS Code Extensions that one might consider "essential" for working with Django. Hopefully it makes your life easier just as it is with me! 😃

**Name:** Python  
**Id:** ms-python.python  
**Description:** Linting, Debugging (multi-threaded, remote), Intellisense, Jupyter Notebooks, code formatting, refactoring, unit tests, and more.  
**Version:** 2021.2.582707922  
**Publisher:** Microsoft  
**VS Marketplace Link:** https://marketplace.visualstudio.com/items?itemName=ms-python.python  

**Name:** Pylance  
**Id:** ms-python.vscode-pylance  
**Description:** A performant, feature-rich language server for Python in VS Code  
**Version:** 2021.2.4  
**Publisher:** Microsoft  
**VS Marketplace Link:** https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance  

**Name:** Django  
**Description:** Beautiful syntax and scoped snippets for perfectionists with deadlines  
**Version:** 1.3.0  
**Publisher:** Baptiste Darthenay  
**VS Marketplace Link:** https://marketplace.visualstudio.com/items?itemName=batisteo.vscode-django  

**Name:** Django Template  
**Id:** bibhasdn.django-html  
**Description:** Django template language support for Visual Studio Code  
**Version:** 1.3.0  
**Publisher:** bibhasdn  
**VS Marketplace Link:** https://marketplace.visualstudio.com/items?itemName=bibhasdn.django-html  

**Name:** Django Snippets  
**Id:** bibhasdn.django-snippets  
**Description:** Common Django snippets for everyday use  
**Version:** 1.1.1  
**Publisher:** bibhasdn  
**VS Marketplace Link:** https://marketplace.visualstudio.com/items?itemName=bibhasdn.django-snippets  

### **How to fix "unresolved import" in VS Code**

It may be possible that, even after following the instructions exactly and installing the aforementioned extensions, you get a strange error that goes `unresolved import...` in your IDE when importing from django like so:

```python
from django.db import models
```

In this case, the easiest fix is to open up the command palette in VS Code using `CMD`/`CTRL` + `SHIFT` + `P`, and then searching the following command:

`Python: Select Interpreter`

Afterwards, select the Python 3.9.1 option that looks something like this:

`Python 3.9.1 64-bit ('allways-q2p-automation-oLBwTLiE')`

This sets the interpreter that VS Code uses to lint Python code as the one used by the virtual environment set up through `pipenv` in the prior steps.

After you've done this, the error should be fixed! If it hasn't, don't hesitate to message on Discord and Red will try and help you out. 😃

## **Useful Resources**

### Django Resources

**Official Django 3.1 Documentation**
- https://docs.djangoproject.com/en/3.1/

**Official Django 3.1 Tutorial**
- https://docs.djangoproject.com/en/3.1/intro/tutorial01/

**Django Crash Course by TraversyMedia**
- https://www.youtube.com/watch?v=e1IyzVyrLSU
    (**NOTE:** *This is using an older version of Django 2.x, but much of it will still apply in Django 3.x.*)

### Django REST Framework Resources

**Django REST Framework official documentation** 
- https://www.django-rest-framework.org/tutorial/quickstart/

**Official GitHub Tutorial**
- https://guides.github.com/activities/hello-world/
