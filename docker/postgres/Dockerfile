FROM postgres:latest

ENV POSTGRES_DB=ev_service_db
ENV POSTGRES_USER=ev_user
ENV POSTGRES_PASSWORD=ev_password

COPY init/ /docker-entrypoint-initdb.d/ 

EXPOSE 5432