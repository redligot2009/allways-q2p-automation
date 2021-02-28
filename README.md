# allways-q2p-automation

## Installation Instructions (Django Backend)

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

Now you're all set on the backend 😊

## Installation Instructions (React Frontend)

Navigate to the `frontend` folder, and run `npm install` to install the project dependencies.

```cmd
cd frontend
npm install
```

Now you're all set on the frontend 😊

## How to run backend Django development server
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

## Setting up Visual Studio Code for Django development

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

### How to fix "unresolved import" in VS Code

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

## Useful Resources

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
