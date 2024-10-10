---
title: Free Threaded Mode in Python3.13 (GIL disabled)
authors: hieunv
tags: [Python, GIL]
description: Python 3.13 just release recently, with an amazing new feature called "Free threaded mode". This is a great improvement for the performance of your code when you are using threads.
image: /img/blog/python-313.png
comments: true # for Disqus
---

Python 3.13 just release recently, with an amazing new feature called "Free threaded mode". This is a great improvement for the performance of your code when you are using threads. This article shows how to enable this feature (not enabled by default) and shows "free threaded mode" impact on the performance of your code.

<!--truncate-->

## Install Free Threaded Python

### Windows & MacOS users

For Windows and MacOS users, just download the latest installer from [Python website](https://www.python.org/downloads/). When you install Python, there is a checkbox to enable "Free threaded mode" when you select "Customize installation" option.

![](/img/blog/python313-no-gil.png)

### Ubuntu users

For Ubuntu users, you can enable this feature by running the following command in your terminal:

```bash
sudo add-apt-repository ppa:deadsnakes
sudo apt-get update
sudo apt-get install python3.13-nogil
```

### Verify Free Threaded Mode is enabled

After installing the package, you can run your code with `python3.13` (original) and `python3.13-nogil` or `python3.13t` (free threaded Python).

Check out this [article](https://py-free-threading.github.io/installing_cpython/#linux-distros) for more details on how to install Python 3.13 experimental on Linux distros.

To verify your Python has "Free threaded mode" enable, you can use the following command:

```bash
python3.13t -VV
Python 3.13.0 experimental free-threading build (main, Oct  8 2024, 08:51:28) [GCC 11.4.0]
```


## Free Threaded Mode Performance

### Experiment Setup

Let's see the impact of free threaded mode on a simple code below:
- I have a function `worker` that does some computation and returns the sum of numbers from 0 to 10 million.
- I have the "Test 1" to run the `worker` function 5 times, sequentially.
- I have the "Test 2" to run the `worker` function in parallel using multiple threads, with number of threads is 5.
- I do measure the execution time of both tests.

```py
import sys
import threading
import time

print("Python version : ", sys.version)

def worker():
    sum = 0
    for i in range(10000000):
        sum += i


n_worker = 5
# Single thread

start = time.perf_counter()
for i in range(n_worker):
    worker()
print("Single Thread: ", time.perf_counter() - start, "seconds")


# Multi thread
start = time.perf_counter()
threads = []
for i in range(n_worker):
    t = threading.Thread(target=worker)

    threads.append(t)
    t.start()

for t in threads:
    t.join()
print("Multi Thread: ", time.perf_counter() - start, "seconds")

```

Later, I will run this code with normal Python (`python3.13` binary) and free threaded Python (`pypy3.13t` binary).

### Results

First, run the test with `python3.13`:
```
python3.13 gil_test.py 
Python version :  3.13.0 (main, Oct  8 2024, 08:51:28) [GCC 11.4.0]
Single Thread:  1.4370562601834536 seconds
Multi Thread:  1.3681392602156848 seconds
```

Then, run the test with `pypy3.13t`:
```
python3.13t gil_test.py 
Python version :  3.13.0 experimental free-threading build (main, Oct  8 2024, 08:51:28) [GCC 11.4.0]
Single Thread:  1.862126287072897 seconds
Multi Thread:  0.3931183419190347 seconds
```

I also trying with `python3.11`:
```
python3.11 gil_test.py 
Python version :  3.11.3 (main, Apr 25 2023, 16:40:23) [GCC 11.3.0]
Single Thread:  1.753435204969719 seconds
Multi Thread:  1.457715731114149 seconds
```

### Result Analysis

Python default has GIL (Global Interpreter Lock) locking mechanism, making multi-threaded actually not parallel. You can see the time processing of single thread is similar to multi thread.

With `python3.11t` (free threaded mode), multi threaded performance is much faster than single threaded. So, multi threading now actually parallel.

:::info

But, do you see Single Thread test in `python3.13t` a bit slower than `pypy3.13`?

> I don't really understand why, so let me know if you have any explanation.

:::

## Conclusion

I think it is good to use multi threading in python for parallel processing. But, without GIL locking mechanism, it requires developer to be careful about the "thread safety", ie. sharing data between threads.

Also, we need to wait for libraries and packages update to fully support free threaded mode. That's one of the reason why this "free threaded mode" is not enabled by default for now. But, I think it will be a good feature in future.