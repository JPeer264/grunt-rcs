# grunt-rcs

[![Build Status](https://travis-ci.org/JPeer264/grunt-rcs.svg)](https://travis-ci.org/JPeer264/grunt-rcs)

> grunt-rcs is the grunt plugin for [rename-css-selectors](https://www.npmjs.com/package/rename-css-selectors)

> [JPeer.at](https://www.jpeer.at) is using this plugin based on Angular.

## Getting Started
This plugin requires Grunt `1.0.0+`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-rcs --save
```

or

```shell
yarn add grunt-rcs
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-rcs');
```

## The "rcs" task

### Overview
In your project's Gruntfile, add a section named `rcs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  rcs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.replaceCss
Type: `Boolean`<br>
Default value: `false`

This option is important, if you want to store new selectors to the selector library. It should just be enabled on `css` files.

#### options.config
Type: `String`<br>
Default value: `.rcsrc` or `package.json` if `.rcsrc` does not exist

A specific path to the config file. It will load the config file from this given path.

#### options.exclude
Type: `Array`<br>
Default value: ` `

An array with own defined excludes. It is better to get them from a config file.

### Usage Examples

#### Default Options
It is really important to differ between `css` files and other files.

```js
grunt.initConfig({
  rcs: {
    options: {},
    css: {
      options: {
        replaceCss: true
      },
      files: [{
        expand: true,
        cwd: './src',
        src: '**/*.css',
        dest: './dist',
      }]
    },
    all: {
      files: [{
        expand: true,
        cwd: './src',
        src: ['**/*.js', '**/*.html'],
        dest: './dist',
      }]
    }
  },
});
```

#### Custom Options
Here a custom config file is loaded, plus custom excludes will also ignore these specified selectors.

```js
grunt.initConfig({
  rcs: {
    options: {
      config: './config/rcs_config.json',
      exclude: [
        'ignore-this-selector',
        'or-this'
      ]
    },
    css: {
      options: {
        replaceCss: true
      },
      files: [{
        expand: true,
        cwd: './src',
        src: '**/*.css',
        dest: './dist',
      }]
    },
    all: {
      files: [{
        expand: true,
        cwd: './src',
        src: ['**/*.js', '**/*.html'],
        dest: './dist',
      }]
    }
  },
});
```

## Release History

You can find the releases [here](https://github.com/JPeer264/grunt-rcs/releases)

## LICENSE

MIT © [Jan Peer Stöcklmair](https://www.jpeer.at)
