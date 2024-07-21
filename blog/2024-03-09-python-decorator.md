---
title: Python Decorator
author: Hieu Nguyen
author_url: https://github.com/behitek
author_title: AI Engineer
author_image_url: https://avatars.githubusercontent.com/u/12376486
tags: [python, decorator, vietnamese]
description: Python Decorator là một công cụ mạnh mẽ giúp chúng ta mở rộng chức năng của một hàm mà không cần thay đổi nội dung bên trong hàm đó.
image: /img/blog/python-decorator.jpeg
---

Python decorator là gì? decorator có nghĩa nôm na là "đồ đem đi trang trí". Quả thực vậy, decorator trong Python sinh ra là để đem đi trang trí - phụ họa thêm chức năng cho đối tượng (function, class) mà không can thiệp sửa đổi đối tượng đó.

<!--truncate-->

:::info

TL;DR

Bạn có thể cuộn xuống [mục 4](#các-ứng-dụng-của-python-decorator) để xem ngay và luôn ứng dụng thực thế của python decorator

:::

Quan sát ảnh phía dưới, nếu bạn đã biết về Python thì `@app.route ...` chắc hẳn bạn đã thấy hoặc dùng không ít lần. Nó chính là 1 decorator được dùng để chỉ định `route` cho hàm ngay phía dưới nó.

![Python decorator được sử dụng để routing trong FastAPI / Flask](/img/blog/1709987562856.jpeg)

Mục đích chính của việc sử dụng decorator là để áp dụng các nguyên tắc “DRY” (Don't Repeat Yourself - Không viết lại mã code) và "SoC" (Separation of Concerns - Phân chia trách nhiệm), cho phép chúng ta tách rời các phần mã không thuộc về logic chính của hàm như xác thực, logging, đo thời gian thực thi, xử lý ngoại lệ,... Decorator giúp chúng ta làm được điều này mà không cần sửa đổi nội dung bên trong đối tượng gốc.

## Cú pháp của Python decorator

Cú pháp của Python decorator rất đơn giản và dễ hiểu. Để sử dụng một decorator đã có cho một hàm bất kỳ, chúng ta chỉ cần sử dụng cú pháp `@<decorator_name>` ngay phía trên định nghĩa của một hàm khác. Trong đó, `<decorator_name>` là tên của hàm decorator.

Dưới đây là cú pháp chung của Python decorator:
```py
@decorator
def function():
    # Function body
```

Trong đó:
- `decorator` là tên của decorator, thường là một hàm được định nghĩa trước đó.
- `function` là tên của hàm mà chúng ta muốn áp dụng `decorator` lên.

Khi chúng ta định nghĩa một hàm, chúng ta có thể sử dụng cú pháp decorator để áp dụng các chức năng của decorator lên hàm đó. Python sẽ tự động chuyển hàm đó vào decorator và thực hiện các hoạt động tương ứng.

Đó là cách dùng 1 decorator đã có, còn cách tạo nó thì mình giải thích sau ví dụ này:

```py
def my_decorator(func):
    def wrapper():
        # Code trước khi hàm func được gọi
        # ...
        func()
        # Code sau khi hàm func được gọi
        # ...
    return wrapper

@my_decorator
def my_function():
    # Function body
    # ...

my_function()
```

Trong ví dụ trên, `my_decorator` là một decorator và `my_function` là hàm mà chúng ta muốn áp dụng decorator lên. Khi chạy `my_function`, Python sẽ tự động gọi `my_decorator`, đưa `my_function` vào decorator và thực hiện các hoạt động bổ sung trước và sau khi `my_function` được gọi.

**Rồi, vậy làm sao tạo ra được 1 decorator của riêng mình?**

> Quan sát hàm `my_decorator` phía trên, chúng ta dễ dàng nhận ra là nó cũng chỉ là 1 hàm bình thường, nhưng có hàm con bên trong. Hàm con bên trong sẽ bao bọc "đối tượng" được nó trang trí, thêm thắt mắm muối trước và sau khi thực thi đối tượng đó. Các phần tiếp theo chúng ta sẽ đi vào chi tiết hơn nhé.


**Vậy 1 đối tượng có 2 đồ trang trí được không?**
> Cú pháp decorator cũng cho phép chúng ta áp dụng nhiều decorator lên cùng một hàm, thông qua việc sử dụng nhiều `@<decorator_name>` cạnh nhau.

Ví dụ cho 1 function cho cả 2 method GET và POST:
```py
@app.get('/')
@app.post('/)
def function():
    # function body
```
Trong Python, decorator được dùng cho hàm (function), hoặc class. Các mục dưới đây sẽ đi vào tìm hiểu decorator lần lượt cho hàm và class.

## Function là decorator

Trong ngôn ngữ lập trình Python, một decorator function là một hàm được sử dụng để thay đổi hoặc bổ sung chức năng của một hàm khác mà không cần thay đổi mã nguồn của hàm đó. Decorator function nhận một hàm khác làm đối số và trả về một hàm mới có thể áp dụng các hoạt động bổ sung trước và sau khi hàm gốc được thực thi.

Để định nghĩa một decorator function trong Python, chúng ta sử dụng cú pháp như sau:
```py
def decorator_function(func):
    def wrapper_function(*args, **kwargs):
        # Code trước khi hàm func được gọi
        # ...
        result = func(*args, **kwargs)
        # Code sau khi hàm func được gọi
        # ...
        return result
    return wrapper_function
```

Trong đó:
- `decorator_function` là tên của decorator function, bạn có thể đặt tên theo ý muốn.
- `func` là hàm mà chúng ta muốn áp dụng decorator lên.
- `wrapper_function` là hàm bao ngoài (wrapper function) được tạo bởi decorator, nó thực hiện các hoạt động bổ sung trước và sau khi func được gọi.

Trong decorator function, chúng ta có thể sử dụng đối số `*args` và `**kwargs` để truyền các đối số và tham số keyword của hàm gốc cho wrapper_function. Sau đó, chúng ta gọi `func(*args, **kwargs)` để thực thi hàm gốc và lấy kết quả trả về.

Sau khi định nghĩa decorator function, chúng ta có thể sử dụng cú pháp `@<decorator_name>` để áp dụng decorator lên một hàm cụ thể trước định nghĩa hàm đó.

Trong mục này, có thể chia nhỏ ra 3 trường hợp
- TH1: Cả function và decorator function đều không có tham số
- TH2: Function có tham số, decorator function không có tham số
- TH3: Cả 2 đều có tham số riêng

### Ví dụ đơn giản (TH1)

Dưới đây là một ví dụ minh họa về cách sử dụng decorator function trong Python:
```py
def uppercase_decorator(func):
    def wrapper():
        result = func()
        return result.upper()
    return wrapper

@uppercase_decorator
def say_hello():
    return "Hello, world!"

print(say_hello())  # Output: HELLO, WORLD!
```

Trong ví dụ trên, `uppercase_decorator` là một decorator function, nó cung cấp thêm chức năng chuyển hết các ký tự trong kết quả của `say_hello` thành chữ hoa. Bằng cách gắn decorator `@uppercase_decorator` lên hàm `say_hello`, khi chúng ta gọi `say_hello()`, decorator function sẽ tự động được áp dụng và trả về kết quả đã được chuyển thành chữ hoa.

### Function có tham số (TH2)

Thực tế thì ta nên viết theo cách dưới đây thì function được "trang trí" dù có tham số hay không tham số đều hoạt động tốt.

```py
def uppercase_decorator(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@uppercase_decorator
def say_hello():
    return "Hello, world!"

print(say_hello())  # Output: HELLO, WORLD!
```

So với TH1, chúng ta chỉ bổ sung `*args, **kwargs` vào hàm wrapper và lời gọi hàm `func`. Đây là cách viết tổng quát, decorator đều sẽ hoạt động dù hàm mà nó "trang trí" có tham số hay không.

### Decorator có tham số (TH3)

Bên cạnh tham số của hàm được "trang trí", bản thân decoration function cũng có thể có tham số. Ví dụ quen thuộc:
```py
@app.get("/")
def home():
     pass
```

Giờ thử với một ví dụ đơn giản mà chúng ta tự viết từ A-Z

```py
def greeting_decorator(greeting_message):
    def decorator_function(func):
        def wrapper(*args, **kwargs):
            print(greeting_message)
            result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_function
```
Trong ví dụ trên, `greeting_decorator` là một decorator function có tham số `greeting_message`. Nó trả về một decorator function bổ sung, `decorator_function`, được sử dụng để áp dụng chức năng bổ sung trước và sau khi hàm gốc `func` được gọi.

Sau khi định nghĩa decorator function, bạn có thể sử dụng nó và truyền các đối số tùy chỉnh vào decorator như sau:
```py
@greeting_decorator("Hello, world!")
def say_name(name):
    print("My name is", name)

say_name("John")
```

Kết quả:

```
Hello, world!
My name is John
```


## Class là decorator

Bạn cũng có thể tạo một decorator với class, nó cũng có đáp ứng được các khả năng giống như decorator được tạo với hàm.

Để định nghĩa một decorator class trong Python, bạn cần định nghĩa một lớp có phương thức `__call__`. Phương thức `__call__` sẽ được gọi khi đối tượng của lớp được gọi. Trong phương thức này, bạn có thể thực hiện các hoạt động bổ sung trước và sau khi hàm gốc được gọi.

Dưới đây là một ví dụ minh họa về cách tạo decorator với class và sử dụng nó để "trang trí" một hàm trong Python:
```py
class uppercase_decorator:
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        result = self.func(*args, **kwargs)
        return result.upper()

@uppercase_decorator
def say_hello():
    return "Hello, world!"

print(say_hello())  # Output: HELLO, WORLD!
```

## Các ứng dụng của Python decorator

Mục này mình sẽ đưa ra một số ứng dụng rất thực tiễn mà khi sử dụng decorator sẽ giúp bạn tiết kiệm nhiều thời gian và tối ưu mã nguồn. Rồi từ đó bạn có thể tự rút ra kết luận decorator nên được dùng vào trường hợp nào.
Một số ứng dụng của decorator có thể là:
- Đo thời gian thực thi của 1 loạt các hàm / bước trong dự án
- Kiểm tra ngoại lệ trước khi thực thi
- Xác thực / phần quyền
- Caching
- ...

### Đo thời gian thực thi

Giả sử bạn có 1 luồng xử lý dữ liệu gồm các bước như sau:
- read_data
- preprocess_data
- extract_features
- export_results

Bạn muốn đo thời gian thực hiện của từng bước trong pipeline để kiểm tra bước nào tốn thời gian nhất.

```py
import time

# timer decorator
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'{func.__name__} took {end - start} seconds')
        return result
    return wrapper

# Giả sử bạn có 1 pipeline xử lý dữ liệu như sau:
# - read_data
# - preprocess_data
# - extract_features
# - export_results
# Bạn muốn đo thời gian thực hiện của từng bước trong pipeline.

@timer
def read_data():
    time.sleep(2)
    print('reading data')

@timer
def preprocess_data():
    time.sleep(3)
    print('preprocessing data')

@timer
def extract_features():
    time.sleep(1)
    print('extracting features')

@timer
def export_results():
    time.sleep(1)
    print('exporting results')

if __name__ == '__main__':
    read_data()
    preprocess_data()
    extract_features()
    export_results()
```

Kết quả thực thi:
```
reading data
read_data took 2.005117177963257 seconds
preprocessing data
preprocess_data took 3.0033648014068604 seconds
extracting features
extract_features took 1.0050358772277832 seconds
exporting results
export_results took 1.0050859451293945 seconds
```

### Ghi log / debug

Bạn muốn biết thứ tự các hàm được gọi, hay muốn biến giá trị đầu vào hoặc đầu ra của hàm khi nó thực thi mà không muốn sửa hàm.

```py
def log_decorator(func):
    def wrapper(*args, **kwargs):
        # Ghi log trước khi thực thi hàm
        print(f"Calling function: {func.__name__}")
        print(f"Arguments: {args}")
        print(f"Keyword arguments: {kwargs}")
        result = func(*args, **kwargs)
        # Ghi log sau khi thực thi hàm
        print(f"Function {func.__name__} executed successfully")
        return result
    return wrapper

@log_decorator
def add_numbers(a, b):
    return a + b

result = add_numbers(2, 3)
print(result)
```

Kết quả:
```
Calling function: add_numbers
Arguments: (2, 3)
Keyword arguments: {}
Function add_numbers executed successfully
5
```

### Xác thực / phân quyền

Ví dụ dưới đây sử dụng decorator để kiểm tra liệu 1 hành động nhạy cảm có được phép thực thi không dựa vào xác thực trước khi thực thi hàm, và chỉ thực thi nếu đủ điều kiện.

```py
# This is an example, function body just return False for testing
def is_authenticated():
    # Check if user is authenticated
    return False

def authentication_decorator(func):
    def wrapper(*args, **kwargs):
        if is_authenticated():
            result = func(*args, **kwargs)
            return result
        else:
            print("Authentication failed. Access denied.")
            return None
    return wrapper

@authentication_decorator
def perform_sensitive_operation():
    # Do something sensitive
    pass

perform_sensitive_operation()
# Output: Authentication failed. Access denied.
```

## Câu hỏi thường gặp (FAQ)

### 1. Có thể dùng decorator cho phương thức của class (class methods) hoặc phương thức tĩnh không (static methods)?

> Có, bạn vẫn có thể dùng và cách dùng không khác gì cả.

### 2. Sử dụng decorator làm mất thông tin metadata của hàm gốc?

Khi áp dụng decorator lên một hàm, thông tin metadata như tên hàm, tên module và tài liệu sử dụng của hàm có thể bị mất đi. Sử dụng hàm functools.wraps để bảo toàn các thông tin metadata này. Thêm dòng @wraps(func) trước khai báo của wrapper function trong decorator.

```py
import functools

def uppercase_decorator(func):
    """This decorator turns the result of the function into uppercase."""
    @functools.wraps(func) # Dòng này giúp giữ nguyên metadata của hàm được decorate
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@uppercase_decorator
def say_hello():
    """This function returns a greeting."""
    return "Hello, world!"

print("Function name: ", say_hello.__name__)
print("Help: ", say_hello.__doc__)
```

Kết quả trước và sau khi có `@functools.wraps(func)`:

```
# Trước
Function name:  wrapper
Help:  None

# Sau
Function name:  say_hello
Help:  This function returns a greeting.
```

