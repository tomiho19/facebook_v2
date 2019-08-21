# facebook_v2

//backend 
cd backend
virtualenv env
source env/bin/activate
pip install requirements.txt 
cd src
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

//frontend
cd frontend
npm i
npm start
