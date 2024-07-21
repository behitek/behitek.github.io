---
title: Beam search algorithm
author: Hieu Nguyen
author_url: https://github.com/behitek
author_title: AI Engineer
author_image_url: https://avatars.githubusercontent.com/u/12376486
tags: [beam search, machine learning, natural language processing, vietnamese]
description: Beam search là một thuật toán tìm kiếm heuristic được sử dụng trong nhiều bài toán như dịch máy, nhận dạng giọng nói, tóm tắt văn bản,… Đó là các bài toán NLP có đầu ra liên quan đến việc tạo một chuỗi các từ. Trong bài viết này, Behitek sẽ cùng bạn đi tìm hiểu về thuật toán beam search, các ưu điểm của nó và đi vào thực hành sử dụng beam search trong bài toán khôi phục dấu thanh cho tiếng Việt không dấu.
image: /img/blog/thuat-toan-beam-search.webp
---

Beam search là một thuật toán tìm kiếm heuristic được sử dụng trong nhiều bài toán như dịch máy, nhận dạng giọng nói, tóm tắt văn bản,… Đó là các bài toán NLP có đầu ra liên quan đến việc tạo một chuỗi các từ. Trong bài viết này, Behitek sẽ cùng bạn đi tìm hiểu về thuật toán beam search, các ưu điểm của nó và đi vào thực hành sử dụng beam search trong bài toán khôi phục dấu thanh cho tiếng Việt không dấu.

<!--truncate-->

Sau khi đọc xong bài viết này, bạn sẽ có được những kiến thức nhất định về:

- Khi nào chúng ta nên sử dụng thuật toán beam search
- Hiểu thuật toán tìm kiếm tham lam (greedy search) và cách cài đặt bằng Python
- Hiểu thuật toán beam search và cách cài đặt nó trong Python
- Ứng dụng beam search vào bài toán khôi phục dấu thanh (sắc, hỏi, huyền, ngã, nặng) cho tiếng Việt.

## Tại sao sử dụng beam search?

Trong các bài toán NLP như dịch máy (machine translation), tạo caption ảnh tự động (image caption generation), tóm tắt văn bản (text summarization), tổng hợp tiếng nói (auto speech recognition), … yêu cầu đầu ra của mô hình là chuỗi các từ có trong từ điển.

Thường thì mỗi từ trong chuỗi từ mà mô hình của các bài toán như trên dự đoán (predict) sẽ đi kèm theo một phân phối xác suất tương ứng. Khi đó, bộ Decoder của mô hình sẽ dựa trên phân bố xác suất đó để tìm ra chuỗi từ phù hợp nhất.

Tìm kiếm chuỗi từ phù hợp nhất yêu cầu chúng ta cần duyệt qua tất cả các chuỗi từ có thể có từ dự đoán của mô hình. Thường thì từ điển của chúng ta sẽ có kích thước rất lớn, với các bài toán về tiếng Việt thì khoảng trên dưới 30.000 từ khác nhau (bao gồm các từ tiếng anh phổ biến, tiếng Việt thuần thì ít hơn) hoặc nếu làm với dữ liệu tiếng anh thì kích thước bộ từ điển còn lớn hơn nhiều. 

Khi đó, ước lượng không gian tìm kiếm của chúng ta sẽ là **kích thước từ điển lũy thừa với độ dài của chuỗi cần dự đoán**, O(n!) -  một chi phí rất lớn!
![Độ phức tạp thuật toán](/img/blog/image-1711979010411.png)

Do chi phí tìm kiếm là quá lớn. Trên thực tế , chúng ta thường dùng một thuật toán tìm kiếm heuristic để có được một kết quả tìm kiếm đủ tốt (good enough) cho mỗi dự đoán thay vì phải tìm kiếm toàn cục.

Mỗi chuỗi từ sẽ được gán một số điểm dựa trên xác suất phân bố của chúng, thuật toán tìm kiếm sẽ dựa trên điểm số này để đánh giá các chuỗi từ này. Có 2 thuật toán tìm kiếm phổ biến giúp tìm ra chuỗi từ “đủ tốt” đó là tìm kiếm tham lam (greedy search) và beam search. 

## Greedy search vs Beam search

Trong phần này, mình sẽ cùng các bạn đi làm rõ ý tưởng của 2 thuật toán greedy search và beam search. Từ đó, bạn có thể thấy được ưu điểm, nhược điểm riêng của mỗi thuật toán cũng như lý do tại sao beam search hoạt động hiệu quả hơn.

- Giải thuật tìm kiếm tham lam (greedy search) khởi đầu với chuỗi rỗng. Tại mỗi bước, nó thực hiện tìm kiếm toàn bộ trên không gian của bước đó và chỉ lấy duy nhất 1 kết quả có điểm số cao nhất và bỏ qua tất cả các kết quả khác. Sang bước tiếp theo, nó chỉ mở rộng tìm kiếm từ kết quả duy nhất trước đó.
- Giải thuật toán kiếm beam search cũng khởi đầu với chuỗi rỗng. Tại mỗi bước, nó thực hiện tìm kiếm toàn bộ trên không gian của bước đó và lấy ra k kết quả có điểm số cao nhất thay vì chỉ lấy 1 kết quả cao nhất. Hình ảnh dưới đây sẽ cho bạn thấy rõ nhất cách hoạt động của beam search với k=2.

![Mô phỏng Beam search với k = 2](/img/blog/beam-search.webp)

**Nhận xét:**

- Thuật toán beam search với k = 1 chính là thuật toán greedy search. Dẫn tới đôi khi kết quả cuối cùng của greedy search khác xa so với kết quả mong đợi.
- Thuật toán beam search tại mỗi bước giữ lại k kết quả tốt nhất. Điều đó làm cho phương pháp tìm kiếm này đạt được kết quả tối ưu toàn cục tốt hơn.
- Trên thực tế, giá trị k của beam search thường từ 5 đến 10. Giá trị k lớn hơn cho kết quả có thể tốt hơn nhưng bạn sẽ phải đánh đổi với chi phí tìm kiếm.

## Thực hành với beam search
Trong phần thực hành này, mình sẽ thử dùng beam search vào bài toán khôi phục dấu câu cho tiếng Việt không dấu. Đại loại là bài toán sẽ cố gắng đưa một câu tiếng Việt không dấu (toi yeu viet nam) thành câu tiếng việt có dấu đầy đủ (tôi yêu việt nam).

**Ý tưởng thực hiện**
1. Từ câu tiếng Việt không dấu, mình sẽ sinh ra tất cả các khả năng có thể đánh dấu cho câu đó.
2. Sử dụng mô hình ngôn ngữ (language model) để xác định điểm số (phân bố xác suất) của các từ, chuỗi từ.
3. Áp dụng thuật toán beam search đã trình bày ở trên để tìm kiếm kết chuỗi từ (đã được thêm dấu câu) phù hợp nhất.

Bây giờ chúng ta sẽ bắt tay vào thực hiện từng bước nhé. Tất cả phần hướng dẫn sau đây đều được thực hiện bằng ngôn ngữ Python. 

> Mình sẽ không đề cao hiệu quả (độ chính xác ở đây), mục tiêu là giải thích & cài đặt beam search để bạn dễ hiểu nhất.

### Tìm tất cả các cách đánh dấu câu

Vì việc thêm dấu câu chỉ áp dụng với các từ tiếng Việt (bao gồm các nguyên âm u, e, o, a, i, y và phụ âm d). Do đó, mình sẽ xây dựng bộ từ điển để lưu tất cả các khả năng đánh dấu câu của một từ tiếng Việt bất kỳ theo dạng này:

```
'duoc' = {'được', 'dược', 'dước', 'đuộc', 'duộc', 'duốc', 'đước', 'đuốc'}
```
**Ý tưởng**: Với mỗi từ, xóa dấu của nó để xem nó thuộc về key nào, rồi thêm nó vào đúng chỗ nó thuộc về.

```py
# Tạo bộ từ điển sinh dấu câu cho các từ không dấu
map_accents = {}
for word in open('vn_syllables.txt').read().splitlines():
  word = word.lower()
  no_accent_word = remove_vn_accent(word)
  if no_accent_word not in map_accents:
    map_accents[no_accent_word] = set()
  map_accents[no_accent_word].add(word)
```

Vậy là giờ mình có thể sinh ra tất cả các khả năng đánh dấu câu của một từ tiếng Việt bất kỳ rồi. Vấn đề này đã xong, ta chuyển sang bước tiếp theo.

### Xây dựng mô hình ngôn ngữ

Thành bại của bài toán nằm ở phần này nha các bạn. Mô hình ngôn ngữ sẽ quyết định độ chính xác của bài toán thêm dấu câu này. Do đó, muốn bài toán chính xác cao thì chúng ta cần tập trung làm tốt phần này nhé. Nhưng trong bài này thì mình làm rất đơn giản thôi ^^.

Mô hình ngôn ngữ mà mình sử dụng ở phần này là mô hình 2-gram 1 chiều (chỉ thống kê từ kế tiếp). Nó được xây dựng từ tập dữ liệu 19GB tin tức tiếng Việt được anh [binhvq](https://github.com/binhvq/news-corpus) chia sẻ. Kết quả thống kê này được bạn [Hoàng Đức Hiền](https://www.facebook.com/fsflv) chia sẻ cho mình.

Cách xây dựng: Thống kê số lần xuất hiện của mỗi từ trong tập dữ liệu (corpus), và thống kê xem có các từ nào xuất hiện sau một từ kèm theo số lần xuất hiện. Ví dụ, dưới đây là kết quả thống kê trên từ lập(đã xóa bớt vì dài quá).

Trong đó: “s” là từ đang thống kê, “sum” là số lần từ “s” xuất hiện trong corpus, “next” là thống kê các từ liền sau nó và số lần xuất hiện kèm theo.

```
{
  "s": "lập",
  "sum": 2461684,
  "next": {
    "tức": 297978,
    "công": 93254,
    "một": 68355,
    "biên": 66212,
    "và": 62925,
    "trường": 41511,
    "các": 40176,
    "trình": 39124,
    "ra": 36957,
    "gia": 33068,
    "luận": 31702,
    "dự": 30768,
    "hồ": 30576,
    "nghiệp": 30217,
    "kỷ": 28633,
    "lại": 28430,
    "pháp": 28192,
    "được": 27729,
    "của": 27478,
    "quan": 26738,
    "với": 22868,
    "kế": 21957,
    "hội": 21293,
    "tự": 21167,
    "từ": 20509,
    "năm": 20400,
    "nên": 20115,
    "ban": 19797,
    "tổ": 19152,
    "quỹ": 18333,
    "đoàn": 17237,
    "vào": 16903,
    "ở": 16846,
    "trong": 16546,
    "chính": 15905,
    "cú": 14588,
    "tại": 14292,
    "quy": 13515,
    "cho": 13136,
    "mới": 12697,
    "thành": 12260,
    "để": 12135,
    "đã": 11991,
    "danh": 10789,
    "dân": 10235,
    "có": 10203,
    ...........
  }
}
```

**Vậy tính xác suất cho một từ trong chuỗi từ ra sao?**

Do đây là mô hình ngôn ngữ n-gram với n = 2, nên mình sẽ tính xác suất có điều kiện của 1 từ (w2) chỉ phụ thuộc vào 1 từ trước nó (w1):

$$
P(w1, w2) = \frac{Count(w1w2)}{Count(w1)}
$$

Ví dụ, với chuỗi từ “lập tức”, ta có: P (lập, tức) = Count(“lập tức”) / Count(“lập”) = 297978/2461684 ≈ 0.121.

Ngoài ra, để tránh việc mô hình ngôn ngữ trả về xác suất bằng 0 với các từ out of vocab (OOV) thì chúng ta có thể áp dụng thêm kỹ thuật smoothing. Có rất nhiều kỹ thuật smoothing khác nhau, bạn đọc quan tâm có thể tìm hiểu thêm ở tài liệu tham khảo số [3].

```py
# tính xác suất dùng smoothing
def get_proba(current_word, next_word):
  if current_word not in lm:
    return 1 / total_word;
  if next_word not in lm[current_word]['next']:
    return 1 / (lm[current_word]['sum'] + vocab_size)
  return (lm[current_word]['next'][next_word] + 1) / (lm[current_word]['sum'] + vocab_size)
```

**Nhận xét:**

- Mô hình ngôn ngữ dùng trong bài thực hành này là 2-gram, nếu có thể thì ta nên dùng mô hình 3-gram hoặc 4-gram sẽ cho kết quả tốt hơn. Và dùng thêm kỹ thuật smoothing xịn hơn nữa nhé!
- Mô hình ngôn ngữ này thiếu từ bắt đầu <s> (xác định từ bắt đầu của câu) và từ kết thúc </s> (xác định từ kết thúc câu) câu nên cũng làm ảnh hưởng đáng kể tới độ chính xác của bài toán.
- Bạn có thể sử dụng công cụ xây dựng mô hình ngôn ngữ như KenLM hay SRILM để dễ dàng hơn, và kích thước LM cũng nhỏ hơn nhiều ^^
- Nên dùng mô hình ngôn ngữ được xây dựng từ dữ liệu có cùng miền (tin tức, giải trí, mạng xã hội,…) với bài toán của bạn.

### Tìm cách đánh dấu câu tốt nhất
Chúng ta sẽ xây dựng một hàm tìm kiếm beam search để tìm ra cách đánh dấu câu phù hợp nhất. Hàm sẽ nhận vào chuỗi từ không dấu và tham số k. Tại mỗi bước lặp, từ hiện tại sẽ được ghép cặp với tất cả các khả năng đánh dấu của từ phía sau nó. Ở mỗi bước đó thì điểm số của chuỗi từ sẽ được tính bằng cách nhân các xác suất với nhau và chỉ giữ lại (lấy) k chuỗi từ có điểm số cao nhất. Quá trình tiếp tục cho tới khi kết thúc câu.

Do mô hình ngôn ngữ mình dùng thiếu token bắt đầu, từ đầu tiên sẽ không có phân bố xác suất 2-gram nên bước đầu tiên mình lấy tất cả các khả năng. Nói là tất cả nhưng không nhiều đâu, làm vậy cho chính xác hơn!

Do giá trị xác suất của các cặp từ là các giá trị rất bé, nên nếu ta nhân chúng với nhau liên tục sẽ có thể bị tràn số. Để khắc phục vấn đề này, người ta thường sử dụng hàm log để giữ cho giá trị xác suất đủ lớn.

```py
# hàm beam search
def beam_search(words, k=3):
  sequences = []
  for idx, word in enumerate(words):
    if idx == 0:
      sequences = [([x], 0.0) for x in map_accents.get(word, [word])]
    else:
      all_sequences = []
      for seq in sequences:
        for next_word in map_accents.get(word, [word]):
          current_word = seq[0][-1]
          proba = get_proba(current_word, next_word)
          # print(current_word, next_word, proba, log(proba))
          proba = log(proba)
          new_seq = seq[0].copy()
          new_seq.append(next_word)
          all_sequences.append((new_seq, seq[1] + proba))
      # sắp xếp và lấy k kết quả ngon nhất
      all_sequences = sorted(all_sequences,key=lambda x: x[1], reverse=True)
      sequences = all_sequences[:k]
  return sequences
```

### Thử nghiệm và đánh giá
Việc xây dựng bài toán khôi phục dấu câu sử dụng mô hình ngôn ngữ và thuật toán tìm kiếm beam search đã hoàn thành. Và bây giờ là lúc để chúng ta kiểm tra chất lượng của mô hình.

![Minh họa sử dụng beam search + language model cho khôi phục dấu thanh](/img/blog/image-1711981101023.png)

Đó mới chỉ là một từ, mình đã thử xây dựng bộ test gồm 4983 câu văn trong tập chủ đề tin tức (cùng miền với dữ liệu xây dựng mô hình ngôn ngữ) và đánh giá nó bằng độ chính xác (Accuracy) thì được kết quả như dưới đây:

![Kết quả đánh giá sơ bộ bài toán thêm dấu câu tiếng Việt
](/img/blog/image-1711985331038.png)

Đúng hơn ra bài toán này nên dùng [BLEU score](https://en.wikipedia.org/wiki/BLEU) để đánh giá mới đúng nha các bạn. Bởi vì dùng accuracy thì một từ gán dấu sai là coi như sai rồi (trên thực tế thì vẫn chấp nhận được, vì đôi khi đến người cũng chả biết đúng sai thế nào nêú thiếu ngữ cảnh, “em dam dang lam”).

Source code của bài hướng dẫn này mình cung cấp đầy đủ tại https://github.com/behitek/beam-search-tutorial

Ngoài ra, thay vì sử dụng n-gram truyền thống để giải bài toán thêm dấu tiếng Việt thì bạn có thể sử dụng mô hình dịch máy deep learning sẽ cho kết quả tốt hơn, xem cách đó ở đây.

## Kết luận
Hi vọng qua bài viết này, các bạn đã nắm được cách hoạt động cũng như cách tự cài đặt thuật toán beam search. Cũng như nắm được lý do tại sao beam search lại được sử dụng trong các bài toán NLP sinh chuỗi. 

Nếu có bất kỳ góp ý hoặc thắc mắc nào liên quan tới bài viết này, hãy để lại 1 bình luận phía dưới. Hẹn gặp lại các bạn ở các nlp tutorial tiếp theo.

## Tài liệu tham khảo
Dưới đây là một số tài liệu tham khảo liên quan rất đáng để đọc nếu bạn đang tìm hiểu và muốn tìm hiểu sâu hơn những nội dung mình trình bày trong bài này cũng như kiến thức liên quan:

1. [Dive into deep learning (Beam search)](https://d2l.ai/chapter_recurrent-modern/beam-search.html).
2. [How to Implement a Beam Search Decoder for Natural Language Processing](https://machinelearningmastery.com/beam-search-decoder-natural-language-processing/)
3. [N-gram language models](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
