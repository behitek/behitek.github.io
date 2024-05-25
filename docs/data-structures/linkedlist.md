---
title: Singly Linked List (Danh sách liên kết đơn)
sidebar_label: Singly Linked List (DSLK)
tags: [data structures, linkedlist, vietnamese]
description: Danh sách liên kết đơn là một cấu trúc dữ liệu động, sử dụng con trỏ để quản lý các phần tử. Bài viết này sẽ giúp bạn hiểu rõ hơn về danh sách liên kết đơn và cách triển khai nó bằng ngôn ngữ lập trình C.
image: /img/docs/danh-sach-lien-ket-don.webp
---

Danh sách liên kết đơn (Singly Linked List) là một ví dụ đơn giản và hiệu quả về cấu trúc dữ liệu động, sử dụng con trỏ để quản lý các phần tử. Hiểu biết về con trỏ và cấp phát bộ nhớ động là rất quan trọng để nắm bắt cách thức hoạt động của danh sách liên kết.

Bài viết này sẽ tập trung vào danh sách liên kết đơn để giúp bạn dễ dàng tiếp cận và hiểu rõ hơn.

## Lý thuyết về danh sách liên kết

Danh sách liên kết có chức năng tương tự như mảng, cho phép thêm và xóa các phần tử ở bất kỳ vị trí nào. Tuy nhiên, có một số điểm khác biệt chính giữa hai cấu trúc dữ liệu này:

| Tính năng | Mảng | Danh sách liên kết |
|---|---|---|
| Kích thước | Cố định, cần khai báo trước | Thay đổi linh hoạt khi thêm/xóa phần tử |
| Cấp phát bộ nhớ | Tĩnh, cấp phát trong quá trình biên dịch | Động, cấp phát trong quá trình chạy |
| Thứ tự & sắp xếp | Lưu trữ liên tục trên các ô nhớ | Lưu trữ trên các ô nhớ ngẫu nhiên |
| Truy cập | Truy cập trực tiếp bằng chỉ số: O(1) | Duyệt từ đầu/cuối đến phần tử cần truy cập: O(n) |
| Tìm kiếm | Tuyến tính hoặc nhị phân | Chỉ có thể tìm kiếm tuyến tính |

## Danh sách liên kết là gì?

Danh sách liên kết đơn là một tập hợp các Node được phân bố động. Mỗi Node chứa hai thành phần:

* **Data:** Lưu trữ giá trị của phần tử
* **Next:** Con trỏ trỏ đến Node tiếp theo trong danh sách

Nếu con trỏ `next` trỏ tới `NULL`, nghĩa là đó là phần tử cuối cùng của danh sách.

**Hình ảnh minh họa:**

* **Cấu trúc của một Node:**

![Cấu trúc của một Node](/img/docs/image-1712068257104.png)

* **Ví dụ về danh sách liên kết đơn đầy đủ:**

![Ví dụ về danh sách liên kết đơn đầy đủ](/img/docs/image-1712068326158.png)

## Cài đặt danh sách liên kết đơn

### Khai báo linked list

```c
struct LinkedList {
  int data;
  struct LinkedList *next;
};

typedef struct LinkedList *node; // Dùng node thay cho struct LinkedList để code ngắn gọn hơn
```

Trong ví dụ này, `data` lưu trữ giá trị nguyên (int). Bạn có thể sử dụng các kiểu dữ liệu khác như `float`, `char`, hoặc thậm chí là struct do bạn tự định nghĩa.

### Tạo mới một Node

```c
node CreateNode(int value) {
  node temp; // Khai báo một node tạm thời
  temp = (node)malloc(sizeof(struct LinkedList)); // Cấp phát bộ nhớ cho node
  temp->next = NULL; // Cho next trỏ tới NULL (ban đầu node chưa liên kết với node nào)
  temp->data = value; // Gán giá trị cho node
  return temp; // Trả về node mới đã được khởi tạo
}
```

### Thêm Node vào danh sách liên kết

#### Thêm vào đầu

```c
node AddHead(node head, int value) {
  node temp = CreateNode(value); // Tạo node mới với giá trị value
  if (head == NULL) {
    head = temp; // Nếu danh sách rỗng, node mới trở thành head
  } else {
    temp->next = head; // Trỏ next của node mới tới head hiện tại
    head = temp; // Cập nhật head là node mới
  }
  return head; // Trả về head mới
}
```

#### Thêm vào cuối

```c
node AddTail(node head, int value) {
  node temp = CreateNode(value); // Tạo node mới
  if (head == NULL) {
    head = temp; // Nếu danh sách rỗng, node mới trở thành head
  } else {
    node p = head; // Duyệt danh sách từ đầu
    while (p->next != NULL) {
      p = p->next; // Di chuyển đến node cuối cùng (next trỏ tới NULL)
    }
    p->next = temp; // Gán next của node cuối cùng trỏ tới node mới
  }
  return head; // Trả về head
}
```

#### Thêm vào vị trí bất kỳ

```c
node AddAt(node head, int value, int position) {
  if (position == 0 || head == NULL) {
    head = AddHead(head, value); // Thêm vào đầu nếu vị trí là 0 hoặc danh sách rỗng
  } else {
    int k = 1; // Biến đếm vị trí
    node p = head;
    while (p != NULL && k != position) {
      p = p->next; // Duyệt đến vị trí cần chèn
      ++k;
    }
    if (k != position) {
      head = AddTail(head, value); // Thêm vào cuối nếu vị trí vượt quá danh sách
    } else {
      node temp = CreateNode(value); // Tạo node mới
      temp->next = p->next; // Liên kết node mới với node tiếp theo
      p->next = temp; // Liên kết node hiện tại với node mới
    }
  }
  return head; // Trả về head
}
```

**Lưu ý:**

* Vị trí chèn được tính từ 0.
* Thứ tự các thao tác trong hàm `AddAt` rất quan trọng. Nếu bạn gán `p->next = temp` trước, bạn sẽ mất liên kết đến phần sau của danh sách.

### Xóa Node khỏi danh sách liên kết

#### Xóa đầu

```c
node DelHead(node head) {
  if (head == NULL) {
    printf("\nDanh sách rỗng, không có gì để xóa!");
  } else {
    head = head->next; // Cập nhật head là node tiếp theo
  }
  return head; // Trả về head mới
}
```

#### Xóa cuối

```c
node DelTail(node head) {
  if (head == NULL || head->next == NULL) {
    return DelHead(head); // Xóa đầu nếu danh sách rỗng hoặc chỉ có 1 phần tử
  }
  node p = head;
  while (p->next->next != NULL) {
    p = p->next; // Duyệt đến node kế cuối (node có next trỏ tới node cuối cùng)
  }
  p->next = NULL; // Cho next của node kế cuối trỏ tới NULL
  return head; // Trả về head
}
```

#### Xóa ở vị trí bất kỳ

```c
node DelAt(node head, int position) {
  if (position == 0 || head == NULL || head->next == NULL) {
    head = DelHead(head); // Xóa đầu nếu vị trí là 0 hoặc danh sách rỗng/chỉ có 1 phần tử
  } else {
    int k = 1; // Biến đếm vị trí
    node p = head;
    while (p->next->next != NULL && k != position) {
      p = p->next; // Duyệt đến node trước vị trí cần xóa
      ++k;
    }
    if (k != position) {
      head = DelTail(head); // Xóa cuối nếu vị trí vượt quá danh sách
    } else {
      p->next = p->next->next; // Bỏ qua node cần xóa
    }
  }
  return head; // Trả về head
}
```

**Lưu ý:**

* Vị trí xóa được tính từ 0.
* Hàm chỉ duyệt đến node gần cuối (cuối - 1) để đảm bảo liên kết sau khi xóa.

### Lấy giá trị ở vị trí bất kỳ

```c
int Get(node head, int index) {
  int k = 0; // Biến đếm vị trí
  node p = head;
  while (p != NULL && k != index) {
    p = p->next; // Duyệt đến vị trí cần lấy giá trị
    ++k;
  }
  return p->data; // Trả về giá trị của node
}
```

**Lưu ý:**

* Hàm trả về giá trị ở vị trí cuối cùng nếu `index` vượt quá chiều dài danh sách.
* Hàm mặc định `index` là số nguyên không âm. Bạn nên kiểm tra `index` trước khi gọi hàm.

### Tìm kiếm trong danh sách liên kết

```c
int Search(node head, int value) {
  int position = 0; // Biến lưu vị trí
  for (node p = head; p != NULL; p = p->next) {
    if (p->data == value) {
      return position; // Trả về vị trí tìm thấy
    }
    ++position; // Tăng vị trí nếu chưa tìm thấy
  }
  return -1; // Trả về -1 nếu không tìm thấy
}
```

### Duyệt danh sách liên kết

```c
void Traverser(node head) {
  printf("\n");
  for (node p = head; p != NULL; p = p->next) {
    printf("%5d", p->data); // In giá trị của mỗi node
  }
}
```

### Một số hàm bổ trợ khác

#### Hàm khởi tạo Node head

```c
node InitHead() {
  node head = NULL; // Khởi tạo head trỏ tới NULL (danh sách rỗng)
  return head;
}
```

#### Hàm lấy số phần tử của DSLK

```c
int Length(node head) {
  int length = 0; // Biến đếm số phần tử
  for (node p = head; p != NULL; p = p->next) {
    ++length; // Tăng biến đếm cho mỗi node
  }
  return length; // Trả về số phần tử
}
```

#### Hàm nhập danh sách liên kết

```c
node Input() {
  node head = InitHead(); // Khởi tạo danh sách rỗng
  int n, value;
  do {
    printf("\nNhập số lượng phần tử n = ");
    scanf("%d", &n);
  } while (n <= 0); // Nhập số lượng phần tử cho đến khi hợp lệ

  for (int i = 0; i < n; ++i) {
    printf("\nNhập giá trị cần thêm: ");
    scanf("%d", &value);
    head = AddTail(head, value); // Thêm phần tử vào cuối danh sách
  }
  return head; // Trả về head của danh sách đã nhập
}
```

## Code hoàn chỉnh của danh sách liên kết đơn
Bạn có thể tham khảo code đầy đủ của danh sách liên kết đơn tại đây.

```c
#include<stdio.h>
#include<stdlib.h>

struct LinkedList{
    int data;
    struct LinkedList *next;
 };

typedef struct LinkedList *node; //Từ giờ dùng kiểu dữ liệu LinkedList có thể thay bằng node cho ngắn gọn

node CreateNode(int value){
    node temp; // declare a node
    temp = (node)malloc(sizeof(struct LinkedList)); // Cấp phát vùng nhớ dùng malloc()
    temp->next = NULL;// Cho next trỏ tới NULL
    temp->data = value; // Gán giá trị cho Node
    return temp;//Trả về node mới đã có giá trị
}

node AddTail(node head, int value){
    node temp,p;// Khai báo 2 node tạm temp và p
    temp = CreateNode(value);//Gọi hàm createNode để khởi tạo node temp có next trỏ tới NULL và giá trị là value
    if(head == NULL){
        head = temp;     //Nếu linked list đang trống thì Node temp là head luôn
    }
    else{
        p  = head;// Khởi tạo p trỏ tới head
        while(p->next != NULL){
            p = p->next;//Duyệt danh sách liên kết đến cuối. Node cuối là node có next = NULL
        }
        p->next = temp;//Gán next của thằng cuối = temp. Khi đó temp sẽ là thằng cuối(temp->next = NULL mà)
    }
    return head;
}


node AddHead(node head, int value){
    node temp = CreateNode(value); // Khởi tạo node temp với data = value
    if(head == NULL){
        head = temp; // //Nếu linked list đang trống thì Node temp là head luôn
    }else{
        temp->next = head; // Trỏ next của temp = head hiện tại
        head = temp; // Đổi head hiện tại = temp(Vì temp bây giờ là head mới mà)
    }
    return head;
}

node AddAt(node head, int value, int position){
    if(position == 0 || head == NULL){
        head = AddHead(head, value); // Nếu vị trí chèn là 0, tức là thêm vào đầu
    }else{
        // Bắt đầu tìm vị trí cần chèn. Ta sẽ dùng k để đếm cho vị trí
        int k = 1;
        node p = head;
        while(p != NULL && k != position){
            p = p->next;
            ++k;
        }

        if(k != position){
            // Nếu duyệt hết danh sách lk rồi mà vẫn chưa đến vị trí cần chèn, ta sẽ mặc định chèn cuối
            // Nếu bạn không muốn chèn, hãy thông báo vị trí chèn không hợp lệ
            head = AddTail(head, value);
            // printf("Vi tri chen vuot qua vi tri cuoi cung!\n");
        }else{
            node temp = CreateNode(value);
            temp->next = p->next;
            p->next = temp;
        }
    }
    return head;
}

node DelHead(node head){
    if(head == NULL){
        printf("\nCha co gi de xoa het!");
    }else{
        head = head->next;
    }
    return head;
}

node DelTail(node head){
    if (head == NULL || head->next == NULL){
         return DelHead(head);
    }
    node p = head;
    while(p->next->next != NULL){
        p = p->next;
    }
    p->next = p->next->next; // Cho next bằng NULL
    // Hoặc viết p->next = NULL cũng được
    return head;
}

node DelAt(node head, int position){
    if(position == 0 || head == NULL || head->next == NULL){
        head = DelHead(head); // Nếu vị trí chèn là 0, tức là thêm vào đầu
    }else{
        // Bắt đầu tìm vị trí cần chèn. Ta sẽ dùng k để đếm cho vị trí
        int k = 1;
        node p = head;
        while(p->next->next != NULL && k != position){
            p = p->next;
            ++k;
        }

        if(k != position){
            // Nếu duyệt hết danh sách lk rồi mà vẫn chưa đến vị trí cần chèn, ta sẽ mặc định xóa cuối
            // Nếu bạn không muốn xóa, hãy thông báo vị trí xóa không hợp lệ
            head = DelTail(head);
            // printf("Vi tri xoa vuot qua vi tri cuoi cung!\n");
        }else{
            p->next = p->next->next;
        }
    }
    return head;
}

int Get(node head, int index){
    int k = 0;
    node p = head;
    while(p != NULL && k != index){
        p = p->next;
    }
    return p->data;
}

int Search(node head, int value){
    int position = 0;
    for(node p = head; p != NULL; p = p->next){
        if(p->data == value){
            return position;
        }
        ++position;
    }
    return -1;
}

node DelByVal(node head, int value){
    int position = Search(head, value);
    while(position != -1){
        DelAt(head, position);
        position = Search(head, value);
    }
    return head;
}

void Traverser(node head){
    printf("\n");
    for(node p = head; p != NULL; p = p->next){
        printf("%5d", p->data);
    }
}

node InitHead(){
    node head;
    head = NULL;
    return head;
}

int Length(node head){
    int length = 0;
    for(node p = head; p != NULL; p = p->next){
        ++length;
    }
    return length;
}

node Input(){
    node head = InitHead();
    int n, value;
    do{
        printf("\nNhap so luong phan tu n = ");
        scanf("%d", &n);
    }while(n <= 0);

    for(int i = 0; i < n; ++i){
        printf("\nNhap gia tri can them: ");
        scanf("%d", &value);
        head = AddTail(head, value);
    }
    return head;
}



int main(){
    printf("\n==Tao 1 danh sach lien ket==");
    node head = Input();
    Traverser(head);

    printf("\n==Thu them 1 phan tu vao linked list==");
    head = AddAt(head, 100, 2);
    Traverser(head);

    printf("\n==Thu xoa 1 phan tu khoi linked list==");
    head = DelAt(head, 1);
    Traverser(head);

    printf("\n==Thu tim kiem 1 phan tu trong linked list==");
    int index = Search(head, 5);
    printf("\nTim thay tai chi so %d", index);

    printf("\nBan co the thu them nhe!");

}
```

Kết quả chạy:

```
==Tao 1 danh sach lien ket==
Nhap so luong phan tu n = 5

Nhap gia tri can them: 1

Nhap gia tri can them: 2

Nhap gia tri can them: 3

Nhap gia tri can them: 4

Nhap gia tri can them: 5

    1    2    3    4    5
==Thu them 1 phan tu vao linked list==
    1    2  100    3    4    5
==Thu xoa 1 phan tu khoi linked list==
    1  100    3    4    5
==Thu tim kiem 1 phan tu trong linked list==
Tim thay tai chi so 4
Ban co the thu them nhe!
Process returned 0 (0x0)   execution time : 4.166 s
Press any key to continue.
```

**Lưu ý:**
- Code ví dụ sử dụng ngôn ngữ C.
- Bạn có thể bổ sung thêm các chức năng khác cho danh sách liên kết đơn tùy theo nhu cầu của bạn.

## Câu hỏi thường gặp về Danh sách liên kết đơn

**1. Danh sách liên kết đơn là gì?**

- Danh sách liên kết đơn là một cấu trúc dữ liệu tuyến tính, trong đó mỗi phần tử (gọi là nút) chứa dữ liệu và một liên kết (con trỏ) trỏ đến phần tử tiếp theo trong danh sách.
- Nút đầu tiên được gọi là "đầu" của danh sách, và nút cuối cùng có liên kết trỏ đến NULL, đánh dấu kết thúc của danh sách.

**2. Ưu điểm và nhược điểm của danh sách liên kết đơn so với mảng?**

**Ưu điểm:**

* **Kích thước động:** Danh sách liên kết đơn có thể phát triển hoặc thu nhỏ kích thước một cách linh hoạt trong thời gian chạy, không cần khai báo kích thước cố định như mảng.
* **Chèn và xóa hiệu quả:** Việc chèn hoặc xóa phần tử ở đầu hoặc giữa danh sách liên kết đơn có thể được thực hiện hiệu quả hơn so với mảng, vì không cần phải dịch chuyển các phần tử khác.

**Nhược điểm:**

* **Truy cập ngẫu nhiên kém:** Không thể truy cập trực tiếp vào phần tử bất kỳ trong danh sách liên kết đơn như mảng. Để truy cập một phần tử cụ thể, cần phải duyệt qua các phần tử từ đầu danh sách cho đến khi tìm thấy phần tử mong muốn.
* **Sử dụng nhiều bộ nhớ hơn:** Danh sách liên kết đơn cần thêm bộ nhớ để lưu trữ các liên kết (con trỏ) giữa các nút, trong khi mảng chỉ lưu trữ dữ liệu.

**3. Các thao tác cơ bản trên danh sách liên kết đơn?**

* **Tạo danh sách:** Khởi tạo một danh sách liên kết đơn rỗng.
* **Chèn phần tử:** Thêm một phần tử mới vào đầu, cuối hoặc vị trí bất kỳ trong danh sách.
* **Xóa phần tử:** Loại bỏ một phần tử khỏi danh sách dựa vào vị trí hoặc giá trị của nó.
* **Tìm kiếm phần tử:** Tìm kiếm một phần tử trong danh sách dựa vào giá trị của nó.
* **Duyệt danh sách:** Truy cập và xử lý từng phần tử trong danh sách theo thứ tự.

**4. Ứng dụng của danh sách liên kết đơn?**

* **Quản lý bộ nhớ động:** Danh sách liên kết đơn có thể được sử dụng để quản lý các khối bộ nhớ khả dụng, cho phép phân bổ và giải phóng bộ nhớ hiệu quả.
* **Triển khai ngăn xếp và hàng đợi:** Danh sách liên kết đơn có thể được sử dụng để triển khai các cấu trúc dữ liệu ngăn xếp (Stack) và hàng đợi (Queue).
* **Xử lý danh sách các đối tượng:** Danh sách liên kết đơn có thể được sử dụng để lưu trữ và quản lý danh sách các đối tượng trong các ứng dụng phần mềm.

**5. Làm thế nào để đảo ngược một danh sách liên kết đơn?**

Có nhiều cách để đảo ngược một danh sách liên kết đơn, bao gồm:

* **Đệ quy:** Sử dụng đệ quy để duyệt qua danh sách và đảo ngược các liên kết giữa các nút.
* **Vòng lặp:** Sử dụng vòng lặp để duyệt qua danh sách và thay đổi các liên kết giữa các nút.
* **Sử dụng ba con trỏ:** Sử dụng ba con trỏ để theo dõi các nút trước đó, hiện tại và tiếp theo trong danh sách và thay đổi liên kết của chúng.

**6. Danh sách liên kết đơn có thể được sử dụng để triển khai cấu trúc dữ liệu nào khác?**

Danh sách liên kết đơn có thể được sử dụng để triển khai các cấu trúc dữ liệu khác như:

* [**Ngăn xếp (Stack):**](/data-structures/stack/) Chèn và xóa phần tử ở đầu danh sách.
* [**Hàng đợi (Queue):**](/data-structures/queue/) Chèn phần tử ở cuối danh sách và xóa phần tử ở đầu danh sách.
* **Danh sách liên kết kép (Doubly Linked List):** Mỗi nút có thêm một liên kết trỏ đến nút trước đó.
* **Danh sách liên kết vòng (Circular Linked List):** Nút cuối cùng trỏ đến nút đầu tiên, tạo thành một vòng tròn.

**7. Làm cách nào để phát hiện chu kỳ trong danh sách liên kết đơn?**

Có thể sử dụng thuật toán Floyd's Cycle Finding Algorithm (hay còn gọi là thuật toán "rùa và thỏ") để phát hiện chu kỳ trong danh sách liên kết đơn.

**8. Độ phức tạp thời gian của các thao tác cơ bản trên danh sách liên kết đơn là gì?**

* **Truy cập phần tử:** O(n) - cần duyệt qua các phần tử từ đầu danh sách.
* **Chèn/Xóa phần tử ở đầu:** O(1) - thao tác trực tiếp trên nút đầu.
* **Chèn/Xóa phần tử ở cuối:** O(n) - cần duyệt qua toàn bộ danh sách để tìm nút cuối.
* **Tìm kiếm phần tử:** O(n) - cần duyệt qua các phần tử cho đến khi tìm thấy phần tử mong muốn.

**9. Khi nào nên sử dụng danh sách liên kết đơn thay vì mảng?**

Nên sử dụng danh sách liên kết đơn khi:

* **Kích thước dữ liệu không xác định trước:** Danh sách liên kết đơn có thể phát triển hoặc thu nhỏ linh hoạt.
* **Thường xuyên chèn hoặc xóa phần tử ở đầu hoặc giữa danh sách:** Thao tác này hiệu quả hơn so với mảng.
* **Không cần truy cập ngẫu nhiên vào các phần tử:** Danh sách liên kết đơn không hỗ trợ truy cập ngẫu nhiên hiệu quả.

**10. Làm cách nào để so sánh hai danh sách liên kết đơn?**

Có thể so sánh hai danh sách liên kết đơn bằng cách duyệt qua từng phần tử của mỗi danh sách và so sánh giá trị của chúng cho đến khi tìm thấy sự khác biệt hoặc đến cuối danh sách.

**11. Thực hành cấu trúc dữ liệu và giải thuật ở đâu?**
- https://luyencode.net/
- https://leetcode.com/tag/linked-list/

Hi vọng bài viết này đã giúp bạn hiểu rõ hơn về danh sách liên kết đơn. Chúc bạn thành công!
 