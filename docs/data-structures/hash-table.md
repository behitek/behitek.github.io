---
title: Hash Table (Bảng băm)
tags: [data structures, hash table, vietnamese]
description: Bảng băm là một cấu trúc dữ liệu dùng để lưu trữ các cặp key-value. Các key được băm thành các chỉ số trong bảng băm.
image: /img/docs/hash-table.jpeg
---

Trong khoa học máy tính, **Bảng băm** (Tiếng anh: Hash table) là một cấu trúc dữ liệu sử dụng hàm băm để ánh xạ từ giá trị xác định, được gọi là khóa (ví dụ như tên của một người), đến giá trị tương ứng (ví dụ như số điện thoại của họ). Do đó, bảng băm là một mảng kết hợp. Hàm băm được sử dụng để chuyển đổi từ khóa thành chỉ số (giá trị băm) trong mảng lưu trữ các giá trị tìm kiếm.

## Bảng băm là gì?

Khi nói đến "Bảng băm", hay hash table, chúng ta đang nói đến tên một cấu trúc dữ liệu.

"Bảng băm" sử dụng 1 "hàm băm", hay hash function để mã hóa các dữ liệu đầu vào sang miền giá trị mới. Hàm băm không phải phải lúc nào cũng giải mã được.

Thuật ngữ "băm / hash" là một kỹ thuật được sử dụng để định danh một đối tượng cụ thể trong một nhóm các đối tượng tương tự. Một số ví dụ về việc sử dụng bảng băm trên thực tế:
- Trong trường đại học, mỗi sinh viên được chỉ định một mã sinh viên không giống nhau và qua mã sinh viên đó có thể truy xuất các thông tin của sinh viên đó.
- Trong thư viện, mỗi một cuốn sách một mã số riêng và mã số đó có thể được dùng để xác định các thông tin của sách, chẳng hạn như vị trí chính xác của sách trong thư viện hay thể loại của sách đó,…

![Thuật toán mã hóa mật khẩu là một hàm băm / hash function](/img/docs/image-1709647922747.png)

Trong cả 2 ví dụ trên, các sinh viên và các cuốn sách được “băm” thành các mã số duy nhất(không trùng lặp).

Giả sử rằng bạn có một đối tượng và bạn muốn gán cho nó một cái khóa (key) để giúp tìm kiếm dễ dàng hơn. Để lưu giữ cặp `<khóa, giá trị>`(nó thường được gọi là `<key, value>` hơn), bạn có thể sử dụng mảng bình thường để làm việc này; Với chỉ số mảng là khóa và giá trị tại chỉ số đó là giá trị tương ứng của khóa. Tuy nhiên, trong trường hợp phạm vi của khóa lớn và không thể sử dụng chỉ số mảng được, khi đó bạn sẽ cần tới “băm”(hashing).

Quan sát ví dụ dưới đây để hiểu cách hàm băm hoạt động trong thực tế.

```cpp
// Cho chuỗi ký tự S bao gồm các chữ cái a-z, A-Z. Hay đếm số lần xuất hiện của mỗi ký tự trong chuỗi S và in ra màn hình theo thứ tự từ điển.

#include <iostream>
using namespace std;

// Bởi vì các ký tự a-z, A-Z có mã ASCII từ 65-90 và 97-122 nên ta có thể sử dụng mã ASCII của ký tự để làm hàm băm

int hashFunction(char c){
    return (int)c; // Trả về mã ASCII của ký tự
}

int main(){
    string s;
    cin >> s;
    int hash[256] = {0};
    for(int i = 0; i < s.length(); i++){
        hash[hashFunction(s[i])]++;
    }
    for(int i = 0; i < 256; i++){
        if(hash[i] > 0){
            cout << (char)i << " " << hash[i] << endl;
        }
    }
    return 0;
}
```

## Hàm băm là gì?

Hàm băm là bất kỳ hàm nào có thể được sử dụng để ánh xạ tập dữ liệu có kích thước tùy ý thành tập dữ liệu có kích thước cố định và đưa vào bảng băm. Các giá trị được trả về bởi hàm băm được gọi là giá trị băm.

Một hàm băm được đánh giá tốt nếu nó đạt được các yêu cầu cơ bản sau:

- Dễ tính toán: Nó phải dễ tính toán và bản thân nó không phải là một thuật toán
- Phân bố đồng đều: Nó cần phải phân phối đồng đều trên bảng băm, không xảy ra việc tập trung thành các cụm
- Ít va chạm: Va chạm xảy ra khi các cặp phần tử được ánh xạ tới cùng một giá trị băm.

> Chú ý: Bất kể hàm băm có tốt đên đâu, va chạm vẫn có thể xảy ra. Vì vậy, để duy trì hiệu suất của bảng băm, điều quan trọng là phải quản lý va chạm thông qua các kỹ thuật giải quyết va chạm.

### Tại sao phải cần hàm băm đủ tốt?
Hãy đi vào một ví dụ để dễ hình dung nhé. Giả sử rằng bạn cần lưu giữ các string sau đây trong bảng băm: `{“abcdef”, “bcdefa”, “cdefab” , “defabc” }`.

Để tính toán chỉ mục lưu giữ các string này, chúng ta dùng một hàm băm như sau: Chỉ mục của mỗi string sẽ được tính bằng tổng giá trị ASCII của các ký tự trong nó sau đó lấy dư với 5.

Do 5 là số nguyên tố và nó lớn hơn số lượng phần tử, nó có khả năng lập ra các chỉ mục khác nhau(giảm va chạm). Số nguyên tố luôn là lựa chọn tốt nếu bạn muốn dùng phép lấy phần dư. Các giá trị ASCII của a, b, c, d, e và f lần lượt là 97, 98, 99, 100, 101 và 102.

Dễ nhận thấy, các string kia chỉ là các hoán vị của cùng 1 chuỗi, do đó chỉ mục được tạo ra của chúng đều giống nhau và đều bằng 597 % 5 = 2.

Lúc này, hàm băm sẽ tính toán và tất cả các string kia đều có cùng 1 chỉ mục. Khi đó, bạn có thể tạo 1 list tại chỉ số đó để lưu các string trong list đó. Như hình ảnh minh họa này:

![Bảng băm hoạt động ra sao](/img/docs/image-1709649177256.png)

Bạn thấy đó, bạn vẫn sẽ mất `O(n)` để tìm kiếm một string cụ thể. Điều đó có nghĩa hàm băm này chưa thực sự tốt.

Hãy thử với 1 hàm băm khác nhé. Chỉ mục của các string sẽ được tính bằng tổng của các mã ASCII của từng ký tự theo sau là vị trí của ký tự đó trong string. Sau đó đem chia dư cho số nguyên tố 2069.

```
String                                Hash function                               Index
abcdef       (971 + 982 + 993 + 1004 + 1015 + 1026)%2069       38
bcdefa       (981 + 992 + 1003 + 1014 + 1025 + 976)%2069       23
cdefab       (991 + 1002 + 1013 + 1024 + 975 + 986)%2069       14
defabc       (1001 + 1012 + 1023 + 974 + 985 + 996)%2069       11
```

Lúc này, các giá trị sau khi mã hóa (hash) của mỗi chuỗi là không trùng lặp (không va chạm).

![Bảng băm](/img/docs/image-1709649399104.png)

## Kỹ thuật xử lý va chạm 

## Separate chaining (open hashing)

Separate chaining là một kỹ thuật xử lý và chạm phổ biến nhất. Nó thường được cài đặt với danh sách liên kết. Để lưu giữ một phần tử trong bảng băm, bạn phải thêm nó vào một danh sách liên kết ứng với chỉ mục của nó. 

Nếu có sự va chạm xảy ra, các phần tử đó sẽ nằm cùng trong 1 danh sách liên kết (xem ảnh để hiểu hơn).

![file](/img/docs/image-1709649753757.png)

Như vậy, kỹ thuật này sẽ đạt được tốc độ tìm kiếm O(1) trong trường hợp tối ưu và O(N) nếu tất cả các phần tử ở cùng 1 danh sách liên kết duy nhất. Đó là do có điều kiện 3 trong tiêu chí hàm băm tốt.

**Cài đặt:**

Giả định: Hàm băm sẽ trả về số int trong [0, 19].

```cpp
vector <string> hashTable[20];
int hashTableSize=20;
```
Thêm dữ liệu vào bảng băm

```cpp
void insert(string s)
{
    // Compute the index using Hash Function
    int index = hashFunc(s);
    // Insert the element in the linked list at the particular index
    hashTable[index].push_back(s);
}
```

Tìm kiếm

```cpp
void search(string s)
{
    //Compute the index by using the hash function
    int index = hashFunc(s);
    //Search the linked list at that specific index
    for(int i = 0;i < hashTable[index].size();i++)
    {
        if(hashTable[index][i] == s)
        {
            cout << s << " is found!" << endl;
            return;
        }
    }
    cout << s << " is not found!" << endl;
}
```

### Linear probing (open addressing or closed hashing)

Trong kỹ thuật xử lý va chạm này, chúng ta sẽ không dùng danh sách liên kết để lưu trữ mà chỉ có bản thân array đó thôi.

Khi thêm vào bảng băm, nếu chỉ mục đó đã có phần tử rồi; Giá trị chỉ mục sẽ được tính toán lại theo cơ chế tuần tự. Giả sử rằng chỉ mục là chỉ số của mảng, khi đó, việc tính toán chỉ mục cho phần tử được tính theo cách sau:
```
index = index % hashTableSize
index = (index + 1) % hashTableSize
index = (index + 2) % hashTableSize
index = (index + 3) % hashTableSize
```

Và cứ thế theo cách như vậy chừng nào index thu được chưa có phần tử được sử dụng. Tất nhiên, không gian chỉ mục phải được đảm bảo để luôn có chỗ cho phần tử mới.

Như trong ví dụ dưới đây, chuỗi Hashing bị trùng chỉ mục(2) ở lần đầu tính chỉ mục. Do đó, nó được đẩy lên vị trí trống ở phía sau(3).

![Xử lý trùng lặp bảng băm](/img/docs/image-1709650320251.png)

**Cài đặt**

Giả sử rằng:
- Không có nhiều hơn 20 phần tử trong tập dữ liệu
- Hàm băm sẽ trả về một số nguyên từ 0 đến 19

```cpp
string hashTable[21];
int hashTableSize = 21;

// Thêm dữ liệu
void insert(string s)
{
    //Compute the index using the hash function
    int index = hashFunc(s);
    //Search for an unused slot and if the index will exceed the hashTableSize then roll back
    while(hashTable[index] != "")
        index = (index + 1) % hashTableSize;
    hashTable[index] = s;
}

// Tìm kiếm
void search(string s)
{
    //Compute the index using the hash function
    int index = hashFunc(s);
     //Search for an unused slot and if the index will exceed the hashTableSize then roll back
    while(hashTable[index] != s and hashTable[index] != "")
        index = (index + 1) % hashTableSize;
    //Check if the element is present in the hash table
    if(hashTable[index] == s)
        cout << s << " is found!" << endl;
    else
        cout << s << " is not found!" << endl;
}
```

### Quadratic Probing

Ý tưởng cũng khá giống Linear Probing, nhưng cách tính chỉ mục có khác đôi chút:
```
index = index % hashTableSize
index = (index + 12) % hashTableSize
index = (index + 22) % hashTableSize
index = (index + 32) % hashTableSize
```

Và cứ thế cho tới khi tìm được chỉ mục trống.

**Cài đặt bảng băm dùng Quadratic Probing**

Giả sử rằng:
- Không có nhiều hơn 20 phần tử trong tập dữ liệu
- Hàm băm sẽ trả về một số nguyên từ 0 đến 19

```cpp
string hashTable[21];
int hashTableSize = 21;

// Thêm phần tử
void insert(string s)
{
    //Compute the index using the hash function
    int index = hashFunc(s);
    //Search for an unused slot and if the index will exceed the hashTableSize roll back
    int h = 1;
    while(hashTable[index] != "")
    {
        index = (index + h*h) % hashTableSize;
             h++;
    }
    hashTable[index] = s;
}

// Tìm kiếm
void search(string s)
{
    //Compute the index using the Hash Function
    int index = hashFunc(s);
     //Search for an unused slot and if the index will exceed the hashTableSize roll back
   int h = 1;
    while(hashTable[index] != s and hashTable[index] != "")
    {
        index = (index + h*h) % hashTableSize;
             h++;
    }
    //Is the element present in the hash table
    if(hashTable[index] == s)
        cout << s << " is found!" << endl;
    else
        cout << s << " is not found!" << endl;
}
```

### Double hashing

Vẫn giống 2 kỹ thuật ngay phía trên, chỉ khác ở công thức tính khi xảy ra va chạm như sau:
```
index = (index + 1 * indexH) % hashTableSize;
index = (index + 2 * indexH) % hashTableSize;
```

Và cứ tiếp tục cho tới khi tìm được chỉ mục chưa được sử dụng.

**Cài đặt bảng băm dùng Double hashing**

Giả sử rằng:
- Không có nhiều hơn 20 phần tử trong tập dữ liệu
- Hàm băm sẽ trả về một số nguyên từ 0 đến 19

```cpp
string hashTable[21];
int hashTableSize = 21;

// Thêm phần tử
void insert(string s)
{
    //Compute the index using the hash function1
    int index = hashFunc1(s);
    int indexH = hashFunc2(s);
    //Search for an unused slot and if the index exceeds the hashTableSize roll back
    while(hashTable[index] != "")
        index = (index + indexH) % hashTableSize;
    hashTable[index] = s;
}

// Tìm kiếm
void search(string s)
{
    //Compute the index using the hash function
    int index = hashFunc1(s);
    int indexH = hashFunc2(s);
     //Search for an unused slot and if the index exceeds the hashTableSize roll back
    while(hashTable[index] != s and hashTable[index] != "")
        index = (index + indexH) % hashTableSize;
    //Is the element present in the hash table
    if(hashTable[index] == s)
        cout << s << " is found!" << endl;
    else
        cout << s << " is not found!" << endl;
}
```

## Ứng dụng của bảng băm

Trong các bài toán thông thường, các bạn thường chỉ cần sử dụng cấu trúc dữ liệu được cài đặt sẵn ở các ngôn ngữ lập trình: map, set trong C/C++, Java; Dictionary trong C#, Python. Đó chính là các bảng băm cực kỳ hữu dụng mà chúng ta vẫn hay sử dụng.

Nếu các bạn để ý thì `multimap` và `multiset` trong C++ cho phép lưu trữ key trùng nhau với giá trị khác nhau đó. Đó là 2 thanh niên đã được thiết lập cơ chế xử lý va chạm.

Với các bài toán đặc thù, các bạn sẽ phải tự viết cho mình hàm băm và xây dựng cấu trúc dữ liệu bảng băm cho phù hợp. Dưới đây là một số ứng dụng của bảng băm:

- Associative arrays: Bảng băm thường được sử dụng để cài đặt nhiều loại in-memory tables. Chúng được sử dụng để thực hiện các mảng kết hợp (các mảng có chỉ số là các chuỗi tùy ý hoặc các đối tượng phức tạp khác).
- Lập chỉ mục CSDL: Các bảng băm cũng có thể được sử dụng làm cấu trúc dữ liệu để lập chỉ mục dữ liệu trong các CSDL.
- Caches: Bảng băm dùng để thiết lập cơ chế caches, thường được dùng để tăng tốc độ truy xuất dữ liệu.
- Biểu diễn các đối tượng: Một số ngôn ngữ động, chẳng hạn như Perl, Python, JavaScript và Ruby sử dụng bảng băm để triển khai các đối tượng.
- Hàm băm được sử dụng trong các thuật toán khác nhau để tăng tốc độ tính toán.

## Bài tập thực hành

Danh sách bài tâp: https://luyencode.net/problems/?type=6 

![Bài tập thực hành bảng băm](/img/docs/image-1709652201165.png)