FROM python:3.9-buster

ADD . / backend/
WORKDIR /backend/

RUN pip install pipenv

RUN pipenv install --system --deploy

RUN ["python","manage.py","migrate"]

RUN ["python","manage.py","loaddata", "all_test_data.json"]

CMD ["python","manage.py","runserver"]