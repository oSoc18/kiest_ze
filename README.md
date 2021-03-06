# kiest_ze
Team Open the box met Emile, Beau, Greet en Sam

This project used to run on http://kiestze.be Meanwhile this domain is used by another party.

yarn development-windows
yarn production-windows

## Backend
We choose Django because:
- Safe and handy access  to database
- Python is a powerful language (Especially compared to some alternatives that we won't mention)
- Digital ocean has good support for it. https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04

### Install Requirements
- Python 3
- PostgreSQL

### Run server (development)
- cd kiestze_django/
- pip install -r requirements.txt # Check this file to get a full list of packages.
- Create a file called `secret.py` in `kiestze_django/kiestze_django/` with the variables `key`, `psql_user` and `psql_password` (you can generate a Django secret key on https://djskgen.herokuapp.com/)
- `python kiestze_django/manage.py runserver` to run the development server

This is only a development server. For setting up a production server (using nginx and gunicorn), see  
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04

## Run server (production)
- ssh kiestze.be
- cd /home/sam/kiest_ze
- git pull
- source env/bin/activate
- python3 manage.py migrate
- `python build_steps.py`
- Create a file called `secret.py` in `kiestze_django/kiestze_django/` with the variables `key`, `psql_user` and `psql_password` (you can generate a Django secret key on https://djskgen.herokuapp.com/)
- Start nginx and gunicorn (follow digitalocean tutorial above for info on how to set it up)
- If already started: sudo systemctl restart gunicorn

## Frontend
All assets go through webpack to go minified. Javascript will also get bundles and be converted to simple javascript to work on all devices.

### Install requirements
- NodeJS
- npm
- yarn


### Run Frontend
- yarn development
- localhost:8080

### Build Frontend
- cd kiestze_yarn
- `yarn production` (`yarn production-windows` on Windows)


## API
To get get all 'politiekers' for a certain 'gemeente', use:  
http://localhost/get_politiekers?gemeente_nis=36012&jaar=0

To get all 'partijen' for a certain 'gemeente', use:  
http://localhost/get_partij?gemeente_nis=36012&jaar=0

To know what 'politiekers' are connected to what 'partijen', use the following call:  
http://localhost/get_all_politieker_partij_link_van_gemeente?gemeente_nis=36012&jaar=0

(Note, that when jaar=0, information of all years will be returned)
