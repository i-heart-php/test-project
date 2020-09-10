# forked from laravel-api-boilerplate

This demo application is an example RESTful API using Laravel. The backend is an API only. GET
requests to docroot will redirect to the SPA written in Vanilla JS.

```
public/login.html
```

##### Packages:

-   JWT-Auth - [tymondesigns/jwt-auth](https://github.com/tymondesigns/jwt-auth)
-   Laravel-CORS [barryvdh/laravel-cors](http://github.com/barryvdh/laravel-cors)

##### Require:

-   PHP: ^7.2

## Features

-   JWT Authentication
-   Basic Features: Registration, Login, Update Profile & Password
-   JSON API Format response.
-   Unit/Feature Testing

## Installation

#### Install Dependencies

```
$ composer install
```

#### Configure the Environment

Create `.env` file:

```
$ cat .env.example > .env
```

Run `php artisan key:generate` and `php artisan jwt:secret`

#### Migrate and Seed the Database

```
$ php artisan migrate:fresh --seed
```

#### Seeded User Creds

```
    User::create([
        'name'              => 'Admin User',
        'email'             => 'admin@admin.com',
        'password'          => Hash::make('1234'),
    ]);
```

#### Run Tests

```
$ vendor/bin/phpunit
```

## Route API Endpoints

<!-- prettier-ignore -->
```
+--------+----------+------------------------+----------+--------------------------------------------------------------------------+------------------+
| Domain | Method   | URI                    | Name     | Action                                                                   | Middleware       |
+--------+----------+------------------------+----------+--------------------------------------------------------------------------+------------------+
|        | GET|HEAD | /                      |          | Closure                                                                  | web              |
|        | GET|HEAD | api                    |          | Closure                                                                  | api              |
|        | POST     | api/auth/login         | login    | App\Http\Controllers\Auth\AuthController@login                           | api              |
|        | POST     | api/auth/recovery      |          | App\Http\Controllers\Auth\ForgotPasswordController@sendPasswordResetLink | api              |
|        | POST     | api/auth/register      | register | App\Http\Controllers\Auth\RegisterController@register                    | api              |
|        | POST     | api/auth/reset         |          | App\Http\Controllers\Auth\ResetPasswordController@callResetPassword      | api              |
|        | POST     | api/logout             | logout   | App\Http\Controllers\Auth\LogoutController@logout                        | api,jwt,jwt.auth |
|        | GET|HEAD | api/profile            | profile  | App\Http\Controllers\Profile\ProfileController@me                        | api,jwt,jwt.auth |
|        | PUT      | api/profile            | profile  | App\Http\Controllers\Profile\ProfileController@update                    | api,jwt,jwt.auth |
|        | PUT      | api/profile/password   | profile  | App\Http\Controllers\Profile\ProfileController@updatePassword            | api,jwt,jwt.auth |
|        | PATCH    | api/server             |          | App\Http\Controllers\ServerController@update                             | api,jwt,jwt.auth |
|        | POST     | api/server             |          | App\Http\Controllers\ServerController@store                              | api,jwt,jwt.auth |
|        | DELETE   | api/server             |          | App\Http\Controllers\ServerController@destroy                            | api,jwt,jwt.auth |
|        | GET|HEAD | api/servers            |          | App\Http\Controllers\ServerController@index                              | api,jwt,jwt.auth |
|        | POST     | flare/execute-solution |          | Facade\Ignition\Http\Controllers\ExecuteSolutionController               |                  |
|        | GET|HEAD | flare/health-check     |          | Facade\Ignition\Http\Controllers\HealthCheckController                   |                  |
|        | GET|HEAD | flare/scripts/{script} |          | Facade\Ignition\Http\Controllers\ScriptController                        |                  |
|        | POST     | flare/share-report     |          | Facade\Ignition\Http\Controllers\ShareReportController                   |                  |
|        | GET|HEAD | flare/styles/{style}   |          | Facade\Ignition\Http\Controllers\StyleController                         |                  |
+--------+----------+------------------------+----------+--------------------------------------------------------------------------+------------------+
