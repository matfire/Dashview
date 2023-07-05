---
title: Getting Started
description: quick setup for dashview
---

This section should give all you need to run your basic instance of Dashview in minutes.

## Install Docker

The first thing you need to setup is Docker. There are other ways of running Dashview, but Docker is by far the easiest to setup for production.
To install Docker, just head over to the [docker website](https://docker.com) and follow their instructions.

:::tip
if you are on Linux, you can also run `curl https://get.docker.com | bash`, though be sure to check if the script is secure before running it on your system.
:::

## Create The Config File

Once you have installed Docker, we need to create a configuration file: for this section we'll create a simple one, but you can find the full reference on each item [here](/reference/structure).

A configuration file usually has two types of items: apps and categories. So a basic configuration file would look something like this:
```js
{
    categories: [
        {
            "name": "Search Engines"
        }
    ],
    apps: [
        {
            "name": "Google",
            "category": "Search Engines",
            "url":"https://google.com"
        }
    ]
}
```

This creates a category containing one app.

## Putting it all together

Now that we have both the configuration file and Docker installed, it is time to run your very first Dashview instance. To do so, just run the followind command:
```bash
docker run -v <your_config_file>:/app/config.json -e CONFIG=/app/config.json -p 3000:3000 ghcr.io/matfire/dashview:latest
```

:::caution
replace <your_config_file> with the path to the configuration file we created earlier
:::

If everything worked correctly, you should be able to visit [localhost:3000](http://localhost:3000) with your browser and see the dashboard running

:::success
Congratulations, you just created your first service dashboard
:::