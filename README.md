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

## Preparing dev environment

1. Install Jekyll on macos: https://jekyllrb.com/docs/installation/macos/
2. Install Jekyll bundler: https://jekyllrb.com/docs/
3. Run the following command to install the dependencies: "bundle install"
4. Build the website running: bundle exec jekyll serve --livereload --config "_config.yml,_config.dev.yml"
