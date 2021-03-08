# allways-q2p-automation

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

Make migrations to enable Django admin site and all our app's models.
```cmd
cd backend
python manage.py migrate
```

Load all test data for the API.
```cmd
python manage.py loaddata all_test_data.json
```

Once you're in the backend directory, set up a superuser for development purposes.
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

Navigate to the `frontend` folder, and run `npm install` to install the project dependencies.

```cmd
cd frontend
npm install
```

Now you're all set on the frontend 😊

## **How to run backend Django development server for the API**
Navigate to mysite directory using `cd backend` if you haven't already, then run the following command.
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

Navigate to `frontend` folder, and run `npm start`. More instructions on specific frontend commands in `frontend/README.md` document.

```cmd
cd frontend
npm start
```

## IMPORTANT NOTES:

1. **DO NOT** do `git push origin master` unless you're Red (this is for our collective sanity).

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
