FROM python:3.9-buster

COPY . /app/
WORKDIR /app/

RUN pip install pipenv

RUN pipenv install --system --deploy

CMD ["python","manage.py","migrate"]

CMD ["python","manage.py","loaddata", "all_test_data.json"]

CMD ["python","manage.py","runserver"]