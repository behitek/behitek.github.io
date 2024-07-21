---
title: Capture HTTP request with Selenium like DevTools
author: Hieu Nguyen
author_url: https://github.com/behitek
author_title: AI Engineer
author_image_url: https://avatars.githubusercontent.com/u/12376486
tags: [selenium, web crawler]
description: This tutorial will show you how to use Selenium Wire to capture HTTP requests like the Chrome DevTools (Networks).
image: /img/blog/selenium-wire.png
---

Selenium is a great library for browser automation, this helps us do automation testing for QC and is also a way to crawl web data. For the dynamic content (i.e., loaded by Javascript), Selenium can help us capture the data while using the requests we can not.

<!--truncate-->

This tutorial will show you how to use Selenium Wire to capture HTTP requests like the Chrome DevTools (Networks).

## Why capture requests?

Selenium is the most popular open-source tool for automating web application testing across various platforms and browsers, as is well known. It is capable of running several web browsers and web controllers. However, Selenium can’t always be used when we need to receive the data the API returned to the front end for testing, logging, and debugging.

Most people think of using Fiddler, Wireshark, or Badboy when discussing capturing HTTP requests because these tools let you start up a proxy server and intercept all requests and responses. However, these tools don’t have any API or CLI integration methods.

## Selenium Wire vs Selenium

As previously noted, you must utilize an HTTP proxy and set up your browser to route all traffic through the proxy in order to record HTTP requests and network traffic.

A Python package called Selenium Wire expands the Selenium Webdriver bindings to provide your tests access to the browser’s underlying queries. It is a compact library with few external dependencies that are made for simplicity of usage.

In the same way that you would with Selenium, Selenium Wire allows you to write tests, but it also adds a user-friendly API for accessing request/response headers, status codes, and body content.
By extending Selenium’s Python bindings, Selenium Wire gives you access to the browser’s underlying requests. Similar to Selenium, you write your code in the same manner, but with additional APIs for examining requests and answers and making live modifications to them.

## Using selenium wire

First, you need to install this package with this command:

```bash
pip install selenium-wire
```

After that, you can use this package like you use selenium, everything is the same. So, this section only focuses on the additional feature: Capture HTTP requests.


When the browser visits a webpage, Selenium Wire records all HTTP/HTTPS requests that are made by the browser.


The `driver.requests` return a list of requests captured by the driver. So, you can filter them by looping through them and checking the URL, method, headers, response body, etc.

```py
from seleniumwire import webdriver  # Import seleniumwire
 
# Create the Chrome driver
driver = webdriver.Chrome()
 
# Go to the Github homepage
driver.get('https://www.github.com')
 
# Access requests list via the `requests` attribute
for request in driver.requests:
    if request.response:
        print(
            request.url,
            request.response.status_code,
            request.response.headers['Content-Type']
        )
```

Output:

```
 https://accounts.google.com/ListAccounts?gpsia=1&source=ChromiumBrowser&json=standard 200 application/json; charset=utf-
https://www.github.com/ 301 None
https://github.com/ 200 text/html; charset=utf-8
https://github.githubassets.com/assets/light-719f1193e0c0.css 200 text/css
https://github.githubassets.com/assets/dark-0c343b529849.css 200 text/css
https://github.githubassets.com/assets/github-5d7162839c37.css 200 text/css
https://github.githubassets.com/assets/global-f7b08e35f325.css 200 text/css
https://github.githubassets.com/assets/primer-f9c4f0f1debb.css 200 text/css
https://github.githubassets.com/assets/dashboard-9336d0a99052.css 200 text/css
https://github.githubassets.com/assets/home-9685f6c9dd42.css 200 text/css
https://github.githubassets.com/assets/home-campaign-2d8ef15d1695.css 200 text/css
https://github.githubassets.com/static/fonts/github/mona-sans.woff2 200 binary/octet-stream
https://github.githubassets.com/assets/site-7f9cfaf3fb6a.css 200 text/css
...
```
