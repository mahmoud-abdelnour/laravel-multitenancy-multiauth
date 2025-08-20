# Multi-Tenancy & Multi-Auth Laravel Demo

This is a demonstration project showcasing how to implement multi-tenancy and multi-authentication in a Laravel application using the Laravel 12 Starter Kit with:

*  Inertia.js
*  React.js
*  TailwindCSS
*  TypeScript


The application supports two authentication guards:
*  Users (default web guard) – Manage tenants and oversee the system.
*  Members (member guard) – Belong to a tenant and manage their own posts.

---

##  Features

### Authentication & Guards
*  User (default guard)
   *  Can create, update, and delete tenants.
   *  Assigns a plan to each tenant at creation:
      *  Basic → 10 Members
      *  Premium → 50 Members
      *  Enterprise → Unlimited Members

*  Member (member guard)
   *  Login via /member/login.
   *  Belongs to a specific tenant.
   *  Can create, edit, and delete posts.
   *  Each member can only manage their own posts (isolated by tenant).

## Project Structure

*  Laravel (Backend) – Authentication, tenancy logic, guards.
*  Inertia + React (Frontend) – UI with TypeScript + TailwindCSS.

Guards:
   *  web → Users (Tenant managers)
   *  member → Members (Post managers)


## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mahmoud-abdelnour/laravel-multitenancy-multiauth.git

   cd laravel-multitenancy-multiauth
   ```

2. **Install dependencies:**
   ```sh
   composer install
   npm install 
   ```

3. **Set up your environment:**
   - Copy `.env.example` to `.env`
   - Edit `.env` and set your database credentials:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=your_database
     DB_USERNAME=your_user
     DB_PASSWORD=your_password

     
     TENANCY_DATABASE_AUTO_DELETE=true
     TENANCY_DATABASE_AUTO_DELETE_USER=true
     CENTRAL_DOMAIN=yourdomain.com

     ```

4. **Generate application key:**
   ```sh
   php artisan key:generate
   ```

5. **Run migrations:**
   ```sh
   php artisan migrate
   ```

6. **Run Build:**
   ```sh
   npm run build
   ``` 
    

6. **Serve the application:**
   ```sh
   composer run dev
   ```

7. **Visit in your browser:**
   - Open [http://localhost:8000](http://localhost:8000)

---

##  Authentication Routes
*  User Login → /login
*  Member Login → /member/login


## Usage
*  Users (default guard):
   *  Can create tenants and assign them a plan.
   *  Can update or delete tenants.
   *  Manage tenant lifecycle.
*  Members (tenant users):
   *  Can only log in through /member/login.
   *  Belong to a tenant.
   *  Can create, update, and delete their own posts only.

---



## Notes

1. You need to configure you development environment to handle tenants domains access to your application .
2. Ensure your local development environment meets the requirements for Laravel and Node.js.



##  Tenant Domain Configuration
Here simple guide to configure your environment (it may different).
### 1. DNS Configuration


1. Log in to your domain registrar's DNS management panel
2. Create a wildcard DNS record (usually an A record or CNAME):

   - Type: A (for IP address) or CNAME (for alias)
   - Name: * (represents wildcard)
   - Value: Your server IP (for A record) or domain (for CNAME)
   - TTL: Default or your preference

Example:
```sh
   *.yourdomain.com.   3600    IN    A    123.123.123.123
```
### 2. Web Server Configuration
#### Apache Configuration

1. Edit your virtual host file (typically in /etc/apache2/sites-available/yourdomain.conf)
```sh
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias *.yourdomain.com
    DocumentRoot /var/www/yourproject/public
    
    <Directory /var/www/yourproject/public>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Other configurations...
</VirtualHost>
```

#### Nginx Configuration
1. Edit your Nginx configuration (typically in /etc/nginx/sites-available/yourdomain)
```sh
server {
    listen 80;
    server_name yourdomain.com *.yourdomain.com;
    root /var/www/yourproject/public;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

#### Laravel Configuration
1. In your config/tenancy.php file, ensure the domain configuration is set up:
```sh
'central_domains' => [
    'yourdomain.com',
    // Add other central domains if needed
],
```

## Tech Stack

- [Laravel ](https://laravel.com/)
- [Inertia](https://inertiajs.com/)
- [React JS](https://react.dev/)
- [MySQL](https://www.mysql.com/)
- [Tenancy For Laravel](https://tenancyforlaravel.com/)
- [TailwindCSS](https://tailwindcss.com/)

---

## Learning Goals
This project demonstrates how to:
*  Configure multiple guards in Laravel.
*  Extend Laravel  + Inertia for multiple authentication flows.
*  Implement tenant-based data isolation.
*  Set up plans & tenant management.

---

## Future Enhancements
Planned improvements for making this demo closer to production-ready:
*  Tenant Plan Enforcement
*  Implement middleware to enforce tenant plan limits:
   *  Basic → Max 10 members
   *  Premium → Max 50 members
   *  Enterprise → Unlimited members
*  Restrict new member creation if the limit is exceeded.




---

## License

MIT
