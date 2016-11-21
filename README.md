# Parcial-2
En este repositorio se encuentra el aprovisionamiento de un servicio web (Node.JS) conectado con una base de datos (Postgres) a través de contenedores de Docker.
Clone the repository

Clona el repositorio y ve a la carpeta Parcial-2

git clone https://github.com/ICESI/distributed-systems.git
Crea las imagenes

Ve hacia Parcial-2/postgres/ y crea la imagen para postgresql

$ docker build -t postgresql_base .
Ve hacia Parcial-2/node/ y crea la imagen para Node.JS

$ docker build -t docker_node .

Ve hacia Parcial-2/ y ejecuta el siguiente comando

$ docker-compose up
