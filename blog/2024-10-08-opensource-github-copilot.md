---
title: Open-source AI code assistant Setup Guide
authors: hieunv
tags: [Tool, VSCode, LLM]
description: Setup your local AI Code Assistant with just a few steps to replace Github Copilot - Help you save money and better data privacy.
image: /img/blog/continue-dev.png
comments: true # for Disqus
---

Looking for a good alternative to Github Copilot? The answer is [Continue.dev](https://continue.dev) - An open source AI code assistant that can help you write better code faster. Again, I want to emphasize that it is an open source project, and it give you more control over your data by hosting them on your own computer, including its model.

<!--truncate-->

## Introduction

An AI coding assistant often have two main functions (including Github Copilot):
- Code autocomplete (to suggest next lines of code based on the current context).
- Chatbot (to interact with your code).

The two functions are depend on the large language model (LLM), which is trained by massive data - I guess the training data for this kind of LLM contains a lot of stackoverflow and Github data.

This article will guide you how to setup a local AI code assistant with Continue (for AI code assistant functions) and Ollama (for self-hosted LLM).

## Prerequisites

Because we are self-hosted our AI code assistant, so we need some resources to run it.

- For minimum, your machine must able to hosted at least a 3B LLM model, i.e. 6GB VRAM or more.
- For better performance, you can use a GPU with 8GB VRAM or more.
- Or you have a macbook air M1 or above

**Note:**
- Continue support both VSCode and JetBrains IDEs (PyCharm, IntelliJ, WebStorm,...). I will use VSCode as an example in this article.
- This article is for Ubuntu/Debian users, but you can follow the same steps to setup on other OS.

## Installation

### Step 1 - Install Ollama

To install (or upgrade) Ollama, run the following command:

```sh
curl -fsSL https://ollama.com/install.sh | sh
```

This will download and install the latest version of Ollama on your machine. Later you can use `ollama` to manage your LLM models.

### Step 2 - Download LLMs

Because two functions (autocomplete and chatbot) are very different, so it is better if we have two separate LLMs for each function. But if your machine is not powerful enough, you can use a single model for both functions.

**For autocomplete**:
- Try `deepseek-coder:1.3b-base` if you don't have much resources.
- Try `deepseek-coder:6.7b-base` if your machine is powerful enough.

To download a model, run the following command (eg: `deepseek-coder:6.7b-base`):

```sh
ollama pull deepseek-coder:6.7b-base
```

**For chatbot (Optional):**

You have many option for this function, you can pick one of bellow:
- Qwen2.5 Coder 7B(`qwen2.5-coder`)
- Llama3.1 8B (`llama3.1`)
- DeepSeek Coder 2 16B (`deepseek-coder-v2`)
- ...

To download a model, run the following command (eg: `Qwen2.5 Coder`):

```
ollama run qwen2.5-coder
```

The recommended models above is not by me, its from Model Setup documentation of Continue.dev, you can check it out at:
- [Autocomplete Model Setup](https://docs.continue.dev/autocomplete/model-setup)
- [Chatbot Model Setup](https://docs.continue.dev/chat/model-setup)

They said that the models they recommended are tested and work best with their platform (i.e. the prompting) to do the tasks. You should check their documentation for an up-to-date information.

### Step 3. Keep your LLM loaded in memory

By default, Ollama will unload the model after 5 minutes of inactivity. If you want to keep it loaded in memory, run this command:

```sh
curl http://localhost:11434/api/generate -d '{"model": "deepseek-coder:6.7b-base", "keep_alive": -1}'
```

The `keep_alive = -1` means that the model will be kept loaded in memory forever. You can unload it by setting `keep_alive = 0`. 

For more information, check out [Ollama FAQ](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-do-i-keep-a-model-loaded-in-memory-or-make-it-unload-immediately).

### Step 4. Install Continue.dev extension

You can easy install Continue.dev extension from Visual Studio Code Marketplace: [Continue.dev](https://marketplace.visualstudio.com/items?itemName=Continue.continue) or from VSCode Sidebar (Ctrl+Shift+X).

![](/img/blog/continue-ext.png)

### Step 5. Configure your Continue.dev extension

Open the `config.json` file in the Continue.dev extension and take a look at two keys: `models` and `tabAutocompleteModel`, following the example below.

```json
{
  "models": [
      {
        "model": "AUTODETECT",
        "title": "Ollama",
        "completionOptions": {},
        "apiBase": "http://localhost:11434",
        "provider": "ollama"
    }
  ],
  "tabAutocompleteModel": {
        "model": "deepseek-coder:6.7b-base",
        "title": "deepseek-coder",
        "completionOptions": {},
        "apiBase": "http://localhost:11434",
        "provider": "ollama"
    },
    ...
}
```

Now, you can start using your own AI coding assistant. If you having issues with the extension, please check out [Continue.dev Troubleshooting](https://docs.continue.dev/troubleshooting) page.

Here's an improved version of your conclusion with a more polished and engaging tone:

---

## Conclusion

In this article, we've walked through the steps to install and configure the **Continue.dev** extension for VSCode, enabling you to integrate your own AI coding assistant seamlessly into your workflow. I hope this guide helps enhance your development experience.

If you have any questions or feedback, feel free to drop a comment below—I'll do my best to respond promptly.

For further details and updates, be sure to explore the [Continue.dev documentation](https://docs.continue.dev/).

Finally, a special thanks to the **Ollama**, the **Continue.dev team**, and the entire open-source community for their valuable contributions in making this tool available to all.
