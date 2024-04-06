# Democratizing Data initiative

Moving website from Django CMS to Github Pages + Jekyll

https://democratizingdata.ai/

## Development Server

To run local server:

```sh
bundle exec jekyll serve --livereload --config "_config.yml,_config.dev.yml"
``` 

This command loads ```_config.dev.yml``` to override Production settings (```_config.yml```).

## Production Package

```sh
bundle exec jekyll build --config _config.yml
```