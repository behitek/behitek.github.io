---
title: Fine-tuning BERT for the Sentence Pair Classification Task
sidebar_label: BERT for Sentence Pair Classification
author: Hieu Nguyen
author_url: https://github.com/behitek
author_title: AI Engineer
author_image_url: https://avatars.githubusercontent.com/u/12376486
tags: [bert, fine-tuning, reranking, natural language processing]
description: This tutorial will teach you how to fine-tune BERT for the Sentence Pair Classification task. In this task, each dataset sample contains two sentences and the appropriate target variable (label).
image: /img/blog/sentence-pair-classification.jpeg
---

This tutorial will teach you how to fine-tune BERT for the Sentence Pair Classification task. In this task, each dataset sample contains two sentences and the appropriate target variable (label). The sentence pair classification can use for many tasks such as information retrieval, question-answering, reranking and more.

<!--truncate-->

Look at the fantastic success of BERT and other Transformer models in many NLP tasks, and it should be no surprise that they also succeed at the sentence pair classification task. This tutorial explains how to use HuggingFace to fine-tune sentence pair classification using the power of Transformer models (BERT/RoBERTa).

Environment setup
-----------------

Before we start our tutorial, we need to set up the environment for our project.

1\. First, it’s recommended to install conda for environment management, e.g. Miniconda, anaconda. You can download and install it from [here](https://docs.conda.io/en/latest/miniconda.html).

2\. Create a new environment for the project:

```bash
$ conda create --prefix ./venv python=3.9
$ conda activate ./venv
$ pip install numpy transformers datasets pandas scikit-learn torch matplotlib
```


Here is the requirements.txt of our experiment on the NVIDIA A40 GPU. But you can use Google Colab to train this task by reducing the batch size when training and inference.

```
datasets==2.7.1
numpy==1.23.5
pandas==1.5.2
scikit-learn==1.1.3
scipy==1.9.3
torch==1.13.0
transformers==4.24.0
matplotlib
```


3\. Now, we should import the package we will use in this project.

```
import transformers
import datasets
import json
import numpy as np
import matplotlib
```


Dataset preparation
-------------------

Now we need a dataset to train and test our models after the environment is set up. To simplify, we decided to use the dataset squad to evaluate the effectiveness of the proposed method and fine-tune BERT for sentence pair classification. This dataset can be downloaded automatically by the datasets library, so what we need to do to get the data is quite simple.

```
# Load squad dataset
squad = datasets.load_dataset("squad")
print(squad)
print(squad["train"][0])
```


Output:

```json
DatasetDict({
    train: Dataset({
        features: ['id', 'title', 'context', 'question', 'answers'],
        num_rows: 87599
    })
    validation: Dataset({
        features: ['id', 'title', 'context', 'question', 'answers'],
        num_rows: 10570
    })
})
{'id': '5733be284776f41900661182', 'title': 'University_of_Notre_Dame', 'context': 'Architecturally, the school has a Catholic character. Atop the Main Building\'s gold dome is a golden statue of the Virgin Mary. Immediately in front of the Main Building and facing it, is a copper statue of Christ with arms upraised with the legend "Venite Ad Me Omnes". Next to the Main Building is the Basilica of the Sacred Heart. Immediately behind the basilica is the Grotto, a Marian place of prayer and reflection. It is a replica of the grotto at Lourdes, France where the Virgin Mary reputedly appeared to Saint Bernadette Soubirous in 1858. At the end of the main drive (and in a direct line that connects through 3 statues and the Gold Dome), is a simple, modern stone statue of Mary.', 'question': 'To whom did the Virgin Mary allegedly appear in 1858 in Lourdes France?', 'answers': {'text': ['Saint Bernadette Soubirous'], 'answer_start': [515]}}
```


Each sample in the SQUAD dataset consists of id, title, context, question, and answers. This is a question-answering dataset, but why do we use this for sentence pair classification? Look at the picture below.

For the retrieval-based question-answering system, before you can find the correct answer to the question, you need to find the relevant document related to the question. Find the relevant document can be considered as sentence pair classification where each sample consists of:

*   question
*   context
*   label (related or not)

Create negative sample
----------------------

In this tutorial, we also plan to create a dataset to train the model for the document retrieval task. Specifically, the sentence pair classification dataset will be generated from SQUAD as follows:

*   Each pair of (question, context) is labeled as 1 if relevant, else 0.
*   We already have the relevant pairs because each question in every sample of SQUAD has the correct context attached.
*   So, we only need to create the negative sample: question and context unrelated.

First, we will only need the questions and contexts from SQUAD.

```
# Extract question and context from each item in the squad
questions = [item["question"] for item in squad["train"]]
contexts = [item["context"] for item in squad["train"]]
 questions.extend([item["question"] for item in squad["validation"]])
contexts.extend([item["context"] for item in squad["validation"]])
 print(len(questions), len(contexts))
```


```
98169 98169
```


Because the dataset is quite large for building a tutorial, we decided to use only part of the dataset to reduce the training time.

*   We pick the first 10000 samples as the positive samples (context related to the question)
*   To create the negative, for each question, we find 10 other contexts not related to the question. The create\_non\_relevants() function will do this work.
*   After the dataset preparation, we split to train and test set by the ratio 80:20.
*   Each train and test set is then saved to a separate JSON file in JSON line format.

```py
pair_data = []
 n_samples = 10000
 questions = questions[:n_samples]
contexts = contexts[:n_samples]
 def create_non_relevants(index, n=10):
    other_indexs = [i for i in range(len(questions)) if i != index]
    return [i for i in np.random.choice(other_indexs, n)]
 # For each questions, create 10 non relevant contexts
for index, question in enumerate(questions):
    pair_data.append({"question": question, "context": contexts[index], "label": 1})
    non_relevants_indexs = create_non_relevants(index)
    for non_relevant_index in non_relevants_indexs:
        pair_data.append({"question": question, "context": contexts[non_relevant_index], "label": 0})
 # Shuffle and split train and test
test_size = 0.2
np.random.shuffle(pair_data)
train_size = int(len(pair_data) * (1 - test_size))
train_data = pair_data[:train_size]
test_data = pair_data[train_size:]
 # Save to jsonl
with open("train.jsonl", "w") as f:
    for item in train_data:
        f.write(json.dumps(item) + "\n")
 with open("test.jsonl", "w") as f:
    for item in test_data:
        f.write(json.dumps(item) + "\n")
 print('Train size: ', len(train_data))
print('Test size: ', len(test_data))
```


```
Train size:  88000
Test size:  22000
```


Here is some sample in the train.jsonl and test.jsonl:

```bash
$ head test.jsonl
{"question": "Which country's courts were noted by the ECHR for taking a wider stance on provisions of genocide laws?", "context": "Antibiotics revolutionized medicine in the 20th century, and have together with vaccination led to the near eradication of diseases such as tuberculosis in the developed world. Their effectiveness and easy access led to overuse, especially in livestock raising, prompting bacteria to develop resistance. This has led to widespread problems with antimicrobial and antibiotic resistance, so much as to prompt the World Health Organization to classify antimicrobial resistance as a \"serious threat [that] is no longer a prediction for the future, it is happening right now in every region of the world and has the potential to affect anyone, of any age, in any country\".", "label": 0}
{"question": "Most domestic animals were selected for what traits?", "context": "Office buildings in Shanghai's financial district, including the Jin Mao Tower and the Hong Kong New World Tower, were evacuated. A receptionist at the Tibet Hotel in Chengdu said things were \"calm\" after the hotel evacuated its guests. Meanwhile, workers at a Ford plant in Sichuan were evacuated for about 10 minutes. Chengdu Shuangliu International Airport was shut down, and the control tower and regional radar control evacuated. One SilkAir flight was diverted and landed in Kunming as a result. Cathay Pacific delayed both legs of its quadruple daily Hong Kong to London route due to this disruption in air traffic services. Chengdu Shuangliu Airport reopened later on the evening of May 12, offering limited service as the airport began to be used as a staging area for relief operations.", "label": 0}
{"question": "What does the AAA feel is incompatible with working with the military?", "context": "During installation, an iPod is associated with one host computer. Each time an iPod connects to its host computer, iTunes can synchronize entire music libraries or music playlists either automatically or manually. Song ratings can be set on an iPod and synchronized later to the iTunes library, and vice versa. A user can access, play, and add music on a second computer if an iPod is set to manual and not automatic sync, but anything added or edited will be reversed upon connecting and syncing with the main computer and its library. If a user wishes to automatically sync music with another computer, an iPod's library will be entirely wiped and replaced with the other computer's library.", "label": 0}
{"question": "About how many police were said to have protected the torch in France?", "context": "Formal membership varies between communities, but basic lay adherence is often defined in terms of a traditional formula in which the practitioner takes refuge in The Three Jewels: the Buddha, the Dharma (the teachings of the Buddha), and the Sangha (the Buddhist community). At the present time, the teachings of all three branches of Buddhism have spread throughout the world, and Buddhist texts are increasingly translated into local languages. While in the West Buddhism is often seen as exotic and progressive, in the East it is regarded as familiar and traditional. Buddhists in Asia are frequently well organized and well funded. In countries such as Cambodia and Bhutan, it is recognized as the state religion and receives government support. Modern influences increasingly lead to new forms of Buddhism that significantly depart from traditional beliefs and practices.", "label": 0}
{"question": "In 1833 with whom with Chopin work to get his music published?", "context": "Chopin seldom performed publicly in Paris. In later years he generally gave a single annual concert at the Salle Pleyel, a venue that seated three hundred. He played more frequently at salons, but preferred playing at his own Paris apartment for small groups of friends. The musicologist Arthur Hedley has observed that \"As a pianist Chopin was unique in acquiring a reputation of the highest order on the basis of a minimum of public appearances\u2014few more than thirty in the course of his lifetime.\" The list of musicians who took part in some of his concerts provides an indication of the richness of Parisian artistic life during this period. Examples include a concert on 23 March 1833, in which Chopin, Liszt and Hiller performed (on pianos) a concerto by J.S. Bach for three keyboards; and, on 3 March 1838, a concert in which Chopin, his pupil Adolphe Gutmann, Charles-Valentin Alkan, and Alkan's teacher Joseph Zimmermann performed Alkan's arrangement, for eight hands, of two movements from Beethoven's 7th symphony. Chopin was also involved in the composition of Liszt's Hexameron; he wrote the sixth (and final) variation on Bellini's theme. Chopin's music soon found success with publishers, and in 1833 he contracted with Maurice Schlesinger, who arranged for it to be published not only in France but, through his family connections, also in Germany and England.", "label": 1}
{"question": "During his search for enlightenment, Gautama combined what teachings?", "context": "The two became friends, and for many years lived in close proximity in Paris, Chopin at 38 Rue de la Chauss\u00e9e-d'Antin, and Liszt at the H\u00f4tel de France on the Rue Lafitte, a few blocks away. They performed together on seven occasions between 1833 and 1841. The first, on 2 April 1833, was at a benefit concert organized by Hector Berlioz for his bankrupt Shakespearean actress wife Harriet Smithson, during which they played George Onslow's Sonata in F minor for piano duet. Later joint appearances included a benefit concert for the Benevolent Association of Polish Ladies in Paris. Their last appearance together in public was for a charity concert conducted for the Beethoven Memorial in Bonn, held at the Salle Pleyel and the Paris Conservatory on 25 and 26 April 1841.", "label": 0}
{"question": "What was the name of West's second album?", "context": "Chopin's public popularity as a virtuoso began to wane, as did the number of his pupils, and this, together with the political strife and instability of the time, caused him to struggle financially. In February 1848, with the cellist Auguste Franchomme, he gave his last Paris concert, which included three movements of the Cello Sonata Op. 65.", "label": 0}
```


Dataset visualization
---------------------

Before using the prepared dataset to fine-tune BERT for the sentence pair classification task. We should verify that the length of each sample is fittable in the pre-trained. Most pre-trained BERT use `max_length = 512` tokens.

```py
dataset = datasets.load_dataset("json", data_files={"train": "train.jsonl", "test": "test.jsonl"})
 question_and_context = []
 for item in dataset["train"]:
    question_and_context.append(item["question"] + " " + item["context"])
 # Visualize the distribution of the length (number of words) of the questions and contexts
import matplotlib.pyplot as plt
plt.hist([len(item.split()) for item in question_and_context], bins=100)
plt.show()
```


Output:

Looks like everything is fine. So, we move to the next section.

Train the sentence pair classification model
--------------------------------------------

First, we need to load the tokenizer and model before use. In this tutorial, we use the RoBERTa, a variant of BERT. But actually, you can also use another pre-trained model.

```py
from transformers import AutoTokenizer, AutoModelForSequenceClassification
tokenizer = AutoTokenizer.from_pretrained("roberta-base")
```


Before training
---------------

Also, you may want to see how the tokenizer encodes your data.

```py
encoded = tokenizer("Hello, my dog is cute", "Hello, my cat is amazing", return_tensors="pt")
decoded = tokenizer.decode(encoded["input_ids"][0])
print(decoded)
```


Output:

```
<s>Hello, my dog is cute</s></s>Hello, my cat is amazing</s>
```


The RoBERTa inserts a padding `</s>` between the two sentences. This may differ when you using another pre-trained.

As you know, a tokenizer is required to parse the text, and a padding and truncation mechanism is to manage varied sequence lengths. To treat your dataset in a single step, apply a preprocessing function to the entire dataset using the Datasets’ map method:

```py
def preprocess_function(batch):
    return tokenizer(batch["question"], batch["context"], truncation=True, padding="max_length")
 dataset = datasets.load_dataset("json", data_files={"train": "train.jsonl", "test": "test.jsonl"})
tokenized_data = dataset.map(preprocess_function, batched=True)
print(tokenized_data)
```


Output:

```json
DatasetDict({
    train: Dataset({
        features: ['question', 'context', 'label', 'input_ids', 'attention_mask'],
        num_rows: 88000
    })
    test: Dataset({
        features: ['question', 'context', 'label', 'input_ids', 'attention_mask'],
        num_rows: 22000
    })
})
```


Model configuration
-------------------

The code below shows our model configuration for fine-tuning BERT for sentence pair classification. We use the F1 score as the evaluation metric to evaluate model performance.

Because this sentence pair classification task is a binary classification task, so we pass the `num_labels` is 2.

Make sure to reduce the batch\_size if you get out of memory error.

```py
from transformers import Trainer, TrainingArguments
 def compute_metrics(eval_pred):
    f1_score = datasets.load_metric("f1")
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    f1_score.add_batch(predictions=predictions, references=labels)
    return f1_score.compute()
 model = AutoModelForSequenceClassification.from_pretrained("roberta-base", num_labels=2)
 training_args = TrainingArguments(
    output_dir="./results",  # output directory
    num_train_epochs=3,  # total # of training epochs
    per_device_train_batch_size=32,  # batch size per device during training
    per_device_eval_batch_size=64,  # batch size for evaluation
    warmup_steps=500,  # number of warmup steps for learning rate scheduler
    weight_decay=0.01,  # strength of weight decay
    learning_rate=2e-5,  # learning rate
    save_total_limit=2,  # limit the total amount of checkpoints, delete the older checkpoints
    logging_dir="./logs",  # directory for storing logs
    logging_steps=100,
    evaluation_strategy="steps",
    eval_steps=100,
    save_strategy="steps",
    save_steps=100,
)
 trainer = Trainer(
    model=model,  # the instantiated 🤗 Transformers model to be trained
    args=training_args,  # training arguments, defined above
    train_dataset=tokenized_data["train"],  # training dataset
    eval_dataset=tokenized_data["test"],  # evaluation dataset
    compute_metrics=compute_metrics,  # the callback that computes metrics of interest
```


Model training
--------------

After all, we can start training our sentence pair classification model:

```
trainer.train()
```


And here is some very last line of training logs:

```
Model weights saved in ./results/checkpoint-7900/pytorch_model.bin
Deleting older checkpoint [results/checkpoint-7700] due to args.save_total_limit
{'loss': 0.0066, 'learning_rate': 6.451612903225807e-07, 'epoch': 2.91}
 97%|████████████████████████████████████████████████████████████████████████████████████▎  | 8000/8250 [5:20:04<03:04,  1.36it/s]The following columns in the evaluation set don't have a corresponding argument in `RobertaForSequenceClassification.forward` and have been ignored: question, context. If question, context are not expected by `RobertaForSequenceClassification.forward`,  you can safely ignore this message.
***** Running Evaluation *****
  Num examples = 22000
  Batch size = 64
{'eval_loss': 0.018584178760647774, 'eval_f1': 0.9785344189489267, 'eval_runtime': 164.1653, 'eval_samples_per_second': 134.011, 'eval_steps_per_second': 2.095, 'epoch': 2.91}
 97%|████████████████████████████████████████████████████████████████████████████████████▎  | 8000/8250 [5:22:48<03:04,  1.36it/s]Saving model checkpoint to ./results/checkpoint-8000
Configuration saved in ./results/checkpoint-8000/config.json
Model weights saved in ./results/checkpoint-8000/pytorch_model.bin
Deleting older checkpoint [results/checkpoint-7800] due to args.save_total_limit
{'loss': 0.0042, 'learning_rate': 3.870967741935484e-07, 'epoch': 2.95}
 98%|█████████████████████████████████████████████████████████████████████████████████████▍ | 8100/8250 [5:24:06<01:50,  1.35it/s]The following columns in the evaluation set don't have a corresponding argument in `RobertaForSequenceClassification.forward` and have been ignored: question, context. If question, context are not expected by `RobertaForSequenceClassification.forward`,  you can safely ignore this message.
***** Running Evaluation *****
  Num examples = 22000
  Batch size = 64
{'eval_loss': 0.01884392462670803, 'eval_f1': 0.9783144406111385, 'eval_runtime': 165.3622, 'eval_samples_per_second': 133.041, 'eval_steps_per_second': 2.08, 'epoch': 2.95}
 98%|█████████████████████████████████████████████████████████████████████████████████████▍ | 8100/8250 [5:26:51<01:50,  1.35it/s]Saving model checkpoint to ./results/checkpoint-8100
Configuration saved in ./results/checkpoint-8100/config.json
Model weights saved in ./results/checkpoint-8100/pytorch_model.bin
Deleting older checkpoint [results/checkpoint-7900] due to args.save_total_limit
{'loss': 0.0082, 'learning_rate': 1.2903225806451614e-07, 'epoch': 2.98}
 99%|██████████████████████████████████████████████████████████████████████████████████████▍| 8200/8250 [5:28:09<00:36,  1.35it/s]The following columns in the evaluation set don't have a corresponding argument in `RobertaForSequenceClassification.forward` and have been ignored: question, context. If question, context are not expected by `RobertaForSequenceClassification.forward`,  you can safely ignore this message.
***** Running Evaluation *****
  Num examples = 22000
  Batch size = 64
{'eval_loss': 0.01884007453918457, 'eval_f1': 0.9787759131293189, 'eval_runtime': 164.9596, 'eval_samples_per_second': 133.366, 'eval_steps_per_second': 2.085, 'epoch': 2.98}
 99%|██████████████████████████████████████████████████████████████████████████████████████▍| 8200/8250 [5:30:54<00:36,  1.35it/s]Saving model checkpoint to ./results/checkpoint-8200
Configuration saved in ./results/checkpoint-8200/config.json
Model weights saved in ./results/checkpoint-8200/pytorch_model.bin
Deleting older checkpoint [results/checkpoint-8000] due to args.save_total_limit
100%|███████████████████████████████████████████████████████████████████████████████████████| 8250/8250 [5:31:35<00:00,  1.36it/s]
 Training completed. Do not forget to share your model on huggingface.co/models =)
  {'train_runtime': 19895.0898, 'train_samples_per_second': 13.27, 'train_steps_per_second': 0.415, 'train_loss': 0.027081513957543806, 'epoch': 3.0}
100%|███████████████████████████████████████████████████████████████████████████████████████| 8250/8250 [5:31:35<00:00,  2.41s/it]
The following columns in the evaluation set don't have a corresponding argument in `RobertaForSequenceClassification.forward` and have been ignored: question, context. If question, context are not expected by `RobertaForSequenceClassification.forward`,  you can safely ignore this message.
***** Running Evaluation *****
  Num examples = 22000
  Batch size = 64
{'eval_loss': 0.016812607645988464, 'eval_f1': 0.9798155993022676, 'eval_runtime': 167.2537, 'eval_samples_per_second': 131.537, 'eval_steps_per_second': 2.057}
```


To evaluate the sentence pair classification model after training, you can add this line at the end.

```py
trainer.evaluate()
```


Or load it from the saved checkpoint.

```py
model = AutoModelForSequenceClassification.from_pretrained(
    "results/checkpoint-8200", num_labels=2
)
...
trainer.evaluate()
```


Output:

```
{'eval_loss': 0.016812607645988464, 'eval_f1': 0.9798155993022676, 'eval_runtime': 167.2537, 'eval_samples_per_second': 131.537, 'eval_steps_per_second': 2.057}
```

Conclusion
----------

This tutorial about sentence pair classification’s source code can be accessed from [this repo](https://github.com/pyzone-dev/sentence-pair-classification), and you can also open it in Google Colab by the link in README.
