# Dockerfile para Flight PHP
FROM php:8.2-cli

WORKDIR /var/www

COPY . .

RUN apt-get update && apt-get install -y unzip \
    && docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli

CMD ["php", "-S", "0.0.0.0:8000", "-t", "."]

EXPOSE 8000
