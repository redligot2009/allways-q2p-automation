# allways-q2p-automation

## Installation instructions

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

Make migrations to enable Django admin site.
```cmd
cd backend
python manage.py migrate
```

Once you're in the mysite directory, set up a superuser for development purposes.
```cmd
python manage.py createsuperuser
```
Now you're all set 😊

## How to run backend development server
Navigate to mysite directory using `cd backend` if you haven't already, then run the following command.
```cmd
python manage.py runserver
```
Press `CTRL`+`C` to stop the development server.

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

## How to run frontend React development server

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

# Useful Resources

## Django Resources

**Official Django 3.1 Documentation**
- https://docs.djangoproject.com/en/3.1/

**Official Django 3.1 Tutorial**
- https://docs.djangoproject.com/en/3.1/intro/tutorial01/

**Django Crash Course by TraversyMedia**
- https://www.youtube.com/watch?v=e1IyzVyrLSU
    (**NOTE:** *This is using an older version of Django 2.x, but much of it will still apply in Django 3.x.*)

## Django REST Framework Resources

**Django REST Framework official documentation** 
- https://www.django-rest-framework.org/tutorial/quickstart/

**Official GitHub Tutorial**
- https://guides.github.com/activities/hello-world/
