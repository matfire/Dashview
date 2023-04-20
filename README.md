# Dashview

## A dashboard for service status visualization

![Discord](https://img.shields.io/discord/937624611384864809)
![GitHub License](https://img.shields.io/github/license/matfire/Dashview)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/matfire/Dashview?include_prereleases)


## Stack

- Remix
- TailwindCSS (+ daisyui)
- Zod


## Goal

provide a way to see at a glance the status of desired services (i.e. urls)

## Install

- Install [Docker](https://docker.com)
- Get the latest image
```sh
docker pull ghcr.io/matfire/dashview:latest
```
- Create a config file ([schema here](#schema))
- Run the container
```sh
docker run -v <your_config_file>:/app/config.json -e CONFIG=/app/config.json ghcr.io/matfire/dashview:latest
```

## Schema

a config.json schema is as follows


```js
{
    categories: [{
        name: a readable name for the category
        icon: not yet implemented, optional
        color: an hexadecimal color (i.e. #FF00AA), optional
        id: not yet implemented, optional
    }],
    apps: [{
        category: must refer to a category name or id,
        name: a readable name for the app,
        url: the service url,
        icon: not yet implemented, optional
    }]
}
```

a valid config file looks like this:

```js
{
    "categories": [
        {
            "name":"Category2",
            "color":"#FF0000"
        }
    ],
    "apps": [
        {
            "category":"Category2",
            "name":"test2",
            "url":"https://google.com"
        },
        {
            "category":"Category2",
            "name":"test",
            "url":"https://example.com"
        }
    ]
}
```