
if(!process.env.APP_URL) {
    console.log('APP_URL environment variable not defined');
    process.exit(1);
}

module.exports = {
  src_folders: ['tests/fvt/nightwatch-tests'],
  output_folder: 'reports',

  page_objects_path: [
    'tests/fvt/nightwatch-pages',
  ],

  webdriver : {
    "start_process": true,
    "server_path": "node_modules/.bin/chromedriver",
    "port": 9515
  },

  live_output: true,

  test_settings: {
    default: {
      launch_url: process.env.APP_URL,
      silent: true,
      end_session_on_fail: true,
      skip_testcases_on_fail: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: true,
        path: './screenshots'
      },
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          "args": [
            "--headless",
            "--no-sandbox",
            "--disable-gpu"
          ],
          w3c: false,
          prefs: { 'profile.managed_default_content_settings.notifications': 1 }
        },
        loggingPrefs: {
          browser: 'ALL',
          client: 'ALL',
          driver: 'ALL',
          server: 'ALL'
        },
        extendedDebugging: true
      },
      globals: {
        waitForConditionTimeout: 10000, // Sometimes internet is slow so wait.
        asyncHookTimeout: 10000, // Default is 10000 which often causes a fail on startup.
        abortOnFailure: true
      },

      chrome: {
        desiredCapabilities: {
          browserName: 'chrome',
          platform: 'macOS 10.13',
          version: '65.0',
          chromedriverVersion: '2.36'
        }
      },

      phantomjs: {
        desiredCapabilities: {
          browserName: 'phantomjs',
          javascriptEnabled: true,
          acceptSslCerts: true,
          'phantomjs.binary.path':
          'node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs'
        }
      },

      debug: {
        silent: false
      }
    }
  }
};
