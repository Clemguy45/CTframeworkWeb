FROM php:7.4-fpm-alpine

# installation bash
RUN apk --no-cache update && apk --no-cache add bash git \
&& git config --global user.email "jean-michel.couvreur@univ-orleans.fr" \
&& git config --global user.name "Jean-Michel Couvreur"

# installation de composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
&& php composer-setup.php --install-dir=/usr/local/bin \
&& php -r "unlink('composer-setup.php');"

# installation de symfony
RUN wget https://get.symfony.com/cli/installer -O - | bash \
&& mv /root/.symfony/bin/symfony /usr/local/bin/symfony

WORKDIR /var/www/html

