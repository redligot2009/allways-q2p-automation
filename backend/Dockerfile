FROM python:3.9-buster

WORKDIR /backend/

# ADD . / backend/
COPY Pipfile Pipfile.lock /backend/

RUN pip install pipenv && pipenv install --system --deploy

COPY . /backend/

RUN ["python","manage.py","migrate"]

RUN ["python","manage.py","loaddata", "all_test_data.json"]

CMD ["python","manage.py","runserver","0.0.0.0:8000"]

EXPOSE 8000