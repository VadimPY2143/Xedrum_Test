#FROM python:3.9-alpine
#
#WORKDIR /app
#
## Системні пакети для psycopg2 і компіляції
#RUN apk add --no-cache \
#    gcc \
#    musl-dev \
#    libffi-dev \
#    postgresql-dev \
#    bash
#
## Копіюємо requirements і встановлюємо Python-залежності
#COPY requirements.txt .
#RUN pip install --upgrade pip
#RUN pip install --no-cache-dir -r requirements.txt
#
## Копіюємо код бекенду
#COPY . .
#
## Збір статичних файлів під час старту контейнера
#CMD ["sh", "-c", "python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8000"]
#
#EXPOSE 8000
