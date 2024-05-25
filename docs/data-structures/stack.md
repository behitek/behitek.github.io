---
title: Stack (Ngăn xếp)
tags: [data structures, stack, vietnamese]
description: Ngăn xếp (Stack) là một cấu trúc dữ liệu khá cơ bản trong lập trình, hoạt động theo nguyên tắc “LIFO” (Last-In-First-Out) - phần tử được thêm vào cuối cùng sẽ bị lấy ra đầu tiên. Vẫn mông lung nhỉ?
image: /img/docs/stack.jpeg
---

**Ngăn xếp (Stack)** là một cấu trúc dữ liệu khá cơ bản trong lập trình, hoạt động theo nguyên tắc “LIFO” (Last-In-First-Out) - phần tử được thêm vào cuối cùng sẽ bị lấy ra đầu tiên. Vẫn mông lung nhỉ?

Quan sát hình phía dưới trong khoanh vùng màu đỏ, bạn chắc không xa lạ với 3 nút này ở góc trên, bên trái của trình duyệt. Trong đó có 2 nút *go back* và *go forward*. Mỗi nút này được cài đặt bằng một ngăn xếp đó, cụ thể (với nút go back):
- Mỗi webpage bạn từng truy cập  sẽ được đưa vào ngăn xếp.
- Khi click *go back*, ngăn xếp sẽ trả ra (và xóa khỏi ngăn xếp) webpage gần nhất bạn từng truy cập.

![Ngăn xếp được ứng dụng trong quản lý lịch sử trình duyệt](/img/docs/image-1708960777450.17.44.png)

## Ngăn xếp (stack) là gì?

Trong khoa học máy tính, một ngăn xếp (còn gọi là bộ xếp chồng, tiếng Anh: Stack) là một cấu trúc dữ liệu trừu tượng hoạt động theo nguyên lý “vào sau ra trước” (Last In First Out (LIFO). Tức là, phần tử cuối cùng được chèn vào ngăn xếp sẽ là phần tử đầu tiên được lấy ra khỏi ngăn xếp.

Một ví dụ trực quan, bạn có một chồng sách và bạn để nó trong một cái hộp như hình phía dưới. Giả sử hộp này vừa khít các cuốn sách. Khi đó, bạn có các thao tác:

- Thêm một cuốn sách vào hộp (push)
- Lấy một cuốn sách khỏi hộp, bạn chỉ lấy được cuốn trên cùng(pop)

![Minh họa ngăn xếp (stack)](/img/docs/image-1708961743652.png)

:::info

Như vậy, có 2 hành động duy nhất có thể thao tác với 1 ngăn xếp:
- Push: Thêm một phần tử vào đỉnh của ngăn xếp, và
- Pop: Lấy ra một phần tử đầu tiên ở đỉnh của ngăn xếp.

:::

Chúng ta có thể có thêm các phương thức để kiểm tra kích thước của ngăn xếp:
- IsEmpty: Kiểm tra ngăn xếp trống hay không. Ngăn xếp trống là ngăn xếp không có phần tử nào.
- IsFull: Kiểm tra ngăn xếp đã đầy hay chưa. Thao tác này không phải lúc nào cũng có.
- Size: Lấy số lượng phần tử stack đang có.

## Cài đặt ngăn xếp (cơ bản)
Tại mục hướng dẫn này, mình sẽ cùng các bạn đi chi tiết từng thao tác của cấu trúc dữ liệu ngăn xếp. Chúng ta sẽ triển khai cài đặt ngăn xếp các số nguyên sử dụng mảng với ngôn ngữ C/C++. Ở mục tiếp theo, tôi sẽ cung cấp cho các bạn một số cách cài đặt khác (nâng cao).

Chúng ta sẽ sử dụng mảng 1 chiều kiểu số nguyên (`int`) làm nơi lưu trữ ngăn xếp, một biến `capacity` để lưu kích thước tối đa của ngăn xếp và một biến `top` để lưu chỉ số của phần tử ở trên cùng của Stack, cũng là số lượng phần tử đang có của ngăn xếp khi cộng thêm 1.

Đầu tiên, hãy khai báo các kiểu dữ liệu cần thiết

```cpp
const int STACK_CAPACITY = 3; // Số phần tử tối đa stack có thể lưu, thực hành nên để số nhỏ
int top = -1; // Khởi tạo chưa có phần tử nào trong stack, nên chỉ số mảng để -1
```

### Các hàm kiểm tra kích thước

Hàm `IsFull()` sẽ kiểm tra xem stack hiện tại đã đầy hay chưa. Nếu chỉ số top của stack đang bằng với capacity - 1, tức stack đã đầy.

```cpp
bool IsFull() {
  if (top >= STACK_CAPACITY - 1) {
    return true;
  } else {
    return false;
  }
}
```

Khởi tạo stack không có phần tử nào, ta sẽ gán chỉ số `top = -1` để đánh dấu. Khi xóa hết phần tử, ta cũng đưa `top` về giá trị `-1`. Như vậy, để kiểm tra stack có đang rỗng hay không rất đơn giản. Ta chỉ cần so sánh giá trị `top` có bằng `-1` hay không mà thôi. 

Dưới đây là cài đặt cho hàm kiểm tra stack rỗng(IsEmpty):

```cpp
bool IsEmpty() {
  if (top == -1) {
    return true;
  } else {
    return false;
  }
}
```

Bạn cũng có thể viết thêm hàm lấy số lượng phần tử đang có trong ngăn xếp.
```cpp
int Size(){
  return top + 1;
}
```

## Thêm phần tử (Push)

Chúng ta sẽ chỉ có thể push(thêm phần tử) vào đỉnh stack khi stack chưa đầy. Nếu stack đầy, chúng ta sẽ đưa ra thông báo và không thực hiện push. Ngược lại, ta sẽ tăng top lên một đơn vị và gán giá trị cho phần tử tại chỉ số top.

```cpp
void Push(int stack[], int value) {
  if (IsFull() == true) {
    printf("\nStack is full. Can not add more!");
  } else {
    ++top;
    stack[top] = value;
  }
}
```

## Lấy phần tử ra (Pop)

Chúng ta sẽ chỉ có thể pop (lấy phần tử ra và xóa) khỏi đỉnh stack khi stack không trống. Nếu stack trống, chúng ta sẽ đưa ra thông báo và không thực hiện pop. Ngược lại, ta sẽ giảm giá trị top đi một đơn vị.

```cpp
 void Pop() {
  if (IsEmpty() == true) {
    printf("\nStack is empty. Nothing to pop!");
  } else {
    --top;
  }
}
```

## Mã nguồn ngăn xếp đầy đủ

Lắp ghép các phần phía trên và thêm chúng vào hàm `main()`, ta có được ví dụ minh họa đầy đủ sau:

```cpp
#include <stdio.h>

const int STACK_CAPACITY = 3;
int top = -1;

bool IsFull() {
  if (top >= STACK_CAPACITY - 1) {
    return true;
  } else {
    return false;
  }
}

bool IsEmpty() {
  if (top == -1) {
    return true;
  } else {
    return false;
  }
}

void Push(int stack[], int value) {
  if (IsFull() == true) {
    printf("\nStack is full. Can not add more!");
  } else {
    ++top;
    stack[top] = value;
  }
}

void Pop() {
  if (IsEmpty() == true) {
    printf("\nStack is empty. Nothing to pop!");
  } else {
    --top;
  }
}

int Top(int stack[]) {
  return stack[top];
}

int Size() {
  return top + 1;
}

int main() {
  int stack[STACK_CAPACITY];

  // pushing element 5 in the stack .
  Push(stack, 5);

  printf("\nCurrent size of stack is %d", Size());

  Push(stack, 10);
  Push(stack, 24);

  printf("\nCurrent size of stack is %d", Size());

  // As the stack is full, further pushing will show an overflow condition.
  Push(stack, 12);

  //Accessing the top element
  printf("\nThe current top element in stack is %d", Top(stack));

  //Removing all the elements from the stack
  for (int i = 0; i < 3; i++)
    Pop();
  printf("\nCurrent size of stack is %d", Size());

  //As the stack is empty , further popping will show an underflow condition.
  Pop();
}
```

Nếu bạn chạy thử code trên, bạn sẽ nhận được kết quả:
```
Current size of stack is 1
Current size of stack is 3
Stack is full. Can not add more!
The current top element in stack is 24
Current size of stack is 0
Stack is empty. Nothing to pop!
```
Hình ảnh dưới đây sẽ giải thích chi tiết hơn về quá trình hoạt động của stack ở chương trình trên theo từng bước đã được đánh số thứ tự.

 ![Giải thích ngăn xếp](/img/docs/image-1708963398048.png)
 
 ## Thực hành với ngăn xếp
 
 Chúng ta sẽ sử dụng stack vào bài toán kiểm tra dãy ngoặc có hợp lệ hay không.

Bạn có một dãy các dấu ngoặc bao gồm ngoặc đóng ‘)’ và ngoặc mở ‘(‘. Bạn phải kiểm tra xem dãy ngoặc đó có hợp lệ hay không.

Một dãy ngoặc hợp lệ thì sẽ không thừa dấu ngoặc hoặc không có dấu ngoặc lẻ loi, chẳng hạn như: (), (()), ((()))() là các dãy ngoặc hợp lệ. Còn ((, ()), (()( là các dãy ngoặc không hợp lệ.

Bạn có thể giải quyết bài toán này với stack. Hãy xem chúng ta làm như thế nào nhé.

**Ý tưởng**: Duyệt qua từng dấu ngoặc trong dãy ngoặc; Sử dụng một stack để push các dấu ngoặc mở vào stack, mỗi khi gặp dấu ngoặc đóng, thực hiện pop một phần tử khỏi stack. Dãy ngoặc sẽ không hợp lệ khi bạn không thể pop hoặc khi kết thúc duyệt mà stack vẫn chưa rỗng.

```cpp
#include <stdio.h>

int top;
void check(char str[], int n, char stack[]) {
    for (int i = 0; i < n; i++) {
        if (str[i] == '(') {
            top = top + 1;
            stack[top] = '(';
        }
        if (str[i] == ')') {
            if (top == -1) {
                top = top - 1;
                break;
            } else {
                top = top - 1;
            }
        }
    }
    if (top == -1)
        printf("String is balanced!\n");
    else
        printf("String is unbalanced!\n");
}

int main() {
    //balanced parenthesis string.
    char str[] = "(())()";

    // unbalanced string . 
    char str1[] = "((()";
    char stack[15];
    top = -1;
    check(str, 9, stack); //Passing balanced string   
    top = -1;
    check(str1, 5, stack); //Passing unbalanced string
    return 0;

}
```

Kết quả:
```
String is balanced!  
String is unbalanced!
```

> :loudspeaker: Ngoài ra, các bạn hãy tự thử sức với các [bài tập về ngăn xếp trên Luyện Code](https://luyencode.net/problems/?type=25) nhé.

## Cài đặt ngăn xếp nâng cao

### Cài đặt ngăn xếp với mảng cấp phát động (con trỏ)

```cpp
#include <stdio.h>
#include <stdlib.h>
#include<limits.h>

typedef struct Stack {
    int top;
    unsigned capacity;
    int * array;
}
Stack;

Stack * createStack(unsigned capacity) {
    struct Stack * stack = (Stack * ) malloc(sizeof(Stack));
    stack -> capacity = capacity;
    stack -> top = -1;
    stack -> array = (int * ) malloc(stack -> capacity * sizeof(int));
    return stack;
}

int Full(Stack * stack) {
    return stack -> top == stack -> capacity - 1;
}

int Empty(Stack * stack) {
    return stack -> top == -1;
}
void push(Stack * stack, int item) {
    if (Full(stack))
        return;
    stack -> array[++stack -> top] = item;
    printf("%d pushed to stack\n", item);
}
int pop(Stack * stack) {
    if (Empty(stack))
        return INT_MIN;
    return stack -> array[stack -> top--];
}
int peek(Stack * stack) {
    if (Empty(stack))
        return INT_MIN;
    return stack -> array[stack -> top];
}
int main() {
    Stack * stack = createStack(100);

    push(stack, 14);
    push(stack, 25);
    push(stack, 38);
    push(stack, 48);

    printf("%d popped from stack\n", pop(stack));

    printf("Top item is %d\n", peek(stack));

    return 0;
}
//output
/*14 pushed to stack
25 pushed to stack
38 pushed to stack
48 pushed to stack
48 popped from stack
Top item is 38*/
```

### Sử dụng hướng đối tượng C++

```cpp
#define Maxsize 10
#include<iostream>

using namespace std;

class stacks {
    public: int Top = -1;
    int s[10];
    void push(int);
    void pop();
    void print();
};
void stacks::push(int x) {
    if (Top == Maxsize) {
        cout << "Error : cannot insert";
    } else {
        Top++;
        s[Top] = x;
    }
}
void stacks::pop() {
    if (Top < 0) {
        cout << "Error : cannot delete";
    } else {
        Top--;
        return;
    }
}
void stacks::print() {
    int i;
    cout << "Stack:";
    for (i = Top; i >= 0; i--) {
        cout << s[i];
    }
}
int main() {
    stacks o;
    int e, i;
    for (i = 0; i < 5; i++) {
        cin >> e;
        o.push(e);
    }
    //o.pop();
    o.print();
}
```
 
 ### Sử dụng [danh sách liên kết](/data-structures/linkedlist)
 
Danh sách liên kết là cấu trúc dữ liệu khá phù hợp để cài đặt ngăn xếp đấy.

```cpp
#include <iostream>

using namespace std;

struct Stack {
    int data;
    Stack * next;
}* TOS = NULL;

void Push(int value) {
    Stack * new_node = new Stack();
    new_node -> data = value;
    new_node -> next = TOS;
    TOS = new_node;
}

void Pop() {
    if (TOS == NULL)
        cout << "Stack is empty" << endl;
    else {
        Stack * temp;
        temp = TOS;
        TOS = TOS -> next;
        temp -> next = NULL;
        delete temp;
    }
}

void Print_Stack() {
    if (TOS == NULL)
        cout << "Stack is empty" << endl;
    else {
        cout << "Top of stack is " << TOS -> data << endl;

        if (TOS -> next != NULL) {
            cout << "Other Elements are : ";
            Stack * current = TOS -> next;

            while (current) {
                cout << current -> data << " ";
                current = current -> next;
            }

            cout << endl;
        }
    }
}

int main() {
    for (int i = 0; i < 5; i++)
        Push(i);

    Print_Stack();

    for (int i = 0; i < 6; i++)
        Pop();

    Print_Stack();

    return 0;
}

/* Output
Top of stack is 4
Other Elements are : 3 2 1 0
Stack is empty
Stack is empty
*/
```

### Sử dụng C++ STL

Cách này code ngắn nhất, bởi vì dùng thư viện `<stack>` của [C++ STL](https://en.cppreference.com/w/cpp/standard_library). Sau khi bạn đã hiểu (tự cài đặt được), thì công việc sau này chỉ cần vài dòng code là xong.

```cpp
#include <iostream>
#include <stack> # thư viện này đó

int main() {
    std::stack < int > mystack;

    for (int i = 0; i < 5; ++i) mystack.push(i);

    std::cout << "Popping out elements...";
    while (!mystack.empty()) {
        std::cout << ' ' << mystack.top();
        mystack.pop();
    }
    std::cout << '\n';

    return 0;
}
```

## Tổng kết

Stack là một trong các cấu trúc dữ liệu căn bản mà mọi lập trình viên cần biết. Lúc mới học mình thắc mắc như này: "Tự nhiên đang lưu mảng chả có ràng buộc gì, tự nhiên đẻ ra thằng ngăn xếp ràng buộc, kiểu make it compilcated ^^". Nhưng thực tế thì cuộc sống cần có "quy tắc" :stuck_out_tongue_closed_eyes:

![Ứng dụng của stack](/img/docs/image-1708964875915.png)

Mình liệt kê thêm một số ứng dụng của ngăn xếp mà mình nghĩ bạn đã từng dùng qua mà không biết:
- Dùng cài đặt [thuật toán tìm kiếm theo chiều sâu - DFS](/algorithms/dfs) trong đồ thị.
- Chức năng undo/redo của các ứng dụng /phần mềm (MS Word chẳng hạn).
- Kiểm tra cú pháp hợp lệ (có thẻ mở đã có thẻ đóng chưa), đại khái giống bài tập thực hành ở trên. HTML là một ngôn ngữ cần thẻ mở / thẻ đóng như thế.
- Truy vết ngược (lưu lại nhật ký, và truy vết lại từ thông tin gần nhất để tìm ra nguyên nhân sâu xa). Xem ảnh phía trên, trackback message của một chương trình Python khi xảy ra lỗi `IndexError`.