# kiest_ze
Team Open the box met Emile, Beau, Greet en Sam

yarn development-windows
yarn production-windows

## Requirements
- Python 3
- Django 2
- NodeJS, npm, yarn
- PostgreSQL
- allauth (social media login)
- psycopg2 (PostgreSQL support for Python)

## Installation
- `yarn production` (`yarn production-windows` on Windows)
- `python build_steps.py`
- Create a file called `secret.py` in `kiestze_django/kiestze_django/` with the variables `key`, `psql_user` and `psql_password` (you can generate a Django secret key on https://djskgen.herokuapp.com/)
- `python kiestze_django/manage.py runserver` to run the development server

This is only a development server. For setting up a production server (using nginx and gunicorn), see https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04
