# allways-q2p-automation

## Installation instructions

Install dependencies
```cmd
pipenv install
```

Make migrations to enable Django admin site.
```cmd
cd mysite
python manage.py migrate
```

Once you're in the mysite directory, set up a superuser for development purposes.
```cmd
python manage.py createsuperuser
```
Now you're all set 😊

## How to run development server
Navigate to mysite directory using `cd mysite` if you haven't already, then run the following command.
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

## Useful references
