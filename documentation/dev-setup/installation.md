###

1. Clone the repository from github https://github.com/crater-invoice/crater.

2. Install Yarn using npm install --global yarn

3. Run yarn in cloned folder to restore dependencies.

4. Run yarn dev to generate the public files (do yarn build if you wish to use it on production).

5. Install composer to your system and run composer install inside your cloned folder to install all laravel/php dependencies.

6. Create an .env file by running the following command: cp .env.example .env. Or alternately you can just copy .env.example file to the same folder and re-name it to .env.

7. run command: php artisan key:generate to generate a unique application key.

8. run php artisan serve --port=8080 --no-reload for the initial setup. Serving with reload on will cause the app to restart when changes to the .env file are made during the setup process.

9. Open http://localhost:8080 in your browser and follow the installation process.

10. (optional) Create a separate folder outside of the cloned folder with a docker-compose.yml file copying the db service from the cloned docker-compose.yml file. Then run docker-compose up -d to start the database container.

Ensure the port number, username, etc reflect the db container details.

11. For the verify domain step, enter the url, click verify once. This will set SANCTUM_STATEFUL_DOMAINS and SESSION_DOMAIN in the .env file. Now restart the app to ensure the new .env settings are loaded. Go to http://localhost:8080 again and click verify again. This time it should work.

12. At this point shit just fails for no reason.

13. Delete the database_created file in storage/app

14. Drop database and recreate an empty one with the same name.

15. Reload the app.

16. Everything just works now


### Maybe just having the correct .env was all I needed. Who knows