# 3 TAV - Company homepage

This is a static web export from our headless CMS [Wordpress](https://wordpress.org/), using [Staatic plugin](https://staatic.com/) and deployed on [Netlify](https://www.netlify.com/).

## Deployment

Wordpress is hosted on a private cloud with a `.local` domain. Homepage is exported as a `zip` file and uploaded to GitHub. Build and deploy is automated with Netlify.

### 1. Export Wordpress instalation to static files

- Login in [Wordpress admin > Staatic](http://sl_wordpress.dockerserver.3tav.local/wp-admin/admin.php?page=staatic-publications), select **Publish now**, and wait ...
- Download *Active Publication* export and `unzip` it to folder `deploy`
- Copy contents of the `deploy` folder to the `/publication` folder (overwrite existing) 🎈

```sh
cd deploy
rsync -av --ignore-existing --exclude=".*" . ~/3tav.github.io/publication
```

🎈 Default export of `Staatic` plugin is without media files (faster export - The option "Symlink/Copy Uploads" in [Staatic/Deployment](http://sl_wordpress.dockerserver.3tav.local/wp-admin/admin.php?page=staatic-settings&group=staatic-deployment) is selected).

-> Copy all new media files (`wp-content`) manually from the server to `publiaction/wp-content` folder. Use folder compare tool, `rsync` etc.

```sh
cd publication
rsync -av --ignore-existing --exclude=".*" tritav@dockerserver:/shared/docker/company_homepage/sl_wordpress/wp-content/ ./publication/.
```

### 2. Test and post-process exported files (optional)

Examine and fix all the mistakes made by the WordPress plugin.

🧸 Try to automate the fix by writing a script for every plugin mistake and add it to the `package.json`.

> Note: check if a fix is already automated at Netlify [**Build settings**](https://app.netlify.com/sites/3tav-si/configuration/deploys).

#### Testing: run local static server

```sh
cd publication
python -m http.server --bind example.local 8000 # with python installed
npx http-server -p 8080 -o # with node installed
```

Open browser and test this *localhost* version of the homepage.

#### Fix #1: missed `.local` domain name replacement by the Staatic plugin

```sh
yarn # install post-process tools
yarn replace # run replace fix
```

### 3. Upload to GitHub

Commit and push. Netlify should pick up the changes and update static deployment.

## About the company »3 TAV d.o.o.«

We are an established Slovenian company in the area of information solutions development. We have been active since 2001, and our experience in the area of information technologies and business systems management extends a few decades longer than that. Being user-oriented, we know how to listen to their wishes, and for them we developed the comprehensive, technologically-advanced and modular business information system IS21.
