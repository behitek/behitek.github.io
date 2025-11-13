# Blog Post Migration Status

## ✅ Completed (2/10)
1. ✅ **inverted-hyde.mdx** - Migrated (sample)
2. ✅ **stop-using-requirements.mdx** - Migrated

## 📝 Remaining Blog Posts (8/10)

### Post Details for Migration

#### 1. flux-lora.md
- **Title**: Fine-tuning Flux.1-dev LoRA on yourself
- **Date**: 2024-11-17
- **Category**: AI/ML
- **Language**: en
- **Tags**: ["Flux", "LoRA", "Text to Image"]
- **Image**: /images/blog/flux-lora.png

#### 2. python-313-free-threaded.md
- **Title**: Free Threaded Mode in Python3.13 (GIL disabled)
- **Date**: 2024-10-10
- **Category**: Python
- **Language**: en
- **Tags**: ["Python", "GIL"]
- **Image**: /images/blog/python-313.png

#### 3. opensource-github-copilot.md
- **Title**: Open-source AI code assistant Setup Guide
- **Date**: 2024-10-08
- **Category**: Tutorial
- **Language**: en
- **Tags**: ["Tool", "VSCode", "LLM"]
- **Image**: /images/blog/continue-dev.png

#### 4. rag-in-production.md
- **Title**: RAG In Production - Best Practices Notes
- **Date**: 2024-07-18
- **Category**: AI/ML
- **Language**: en
- **Tags**: ["RAG", "LLM", "production", "best-practices"]
- **Image**: /images/blog/rag-in-production.png

#### 5. beam-search.md
- **Title**: Beam search algorithm
- **Date**: 2024-04-01
- **Category**: AI/ML
- **Language**: en
- **Tags**: ["algorithm", "beam-search", "NLP"]
- **Image**: /images/blog/beam-search.webp

#### 6. python-decorator.md
- **Title**: Python Decorator
- **Date**: 2024-03-09
- **Category**: Python
- **Language**: vi (Vietnamese)
- **Tags**: ["python", "decorator", "tutorial"]
- **Image**: /images/blog/python-decorator.jpeg

#### 7. bert-finetuned.md
- **Title**: Fine-tuning BERT for the Sentence Pair Classification Task
- **Date**: 2022-12-11
- **Category**: AI/ML
- **Language**: en
- **Tags**: ["BERT", "NLP", "fine-tuning", "classification"]
- **Image**: /images/blog/sentence-pair-classification.jpeg

#### 8. selenium-capture-http-request.md
- **Title**: Capture HTTP request with Selenium like DevTools
- **Date**: 2022-11-19
- **Category**: Tutorial
- **Language**: en
- **Tags**: ["Selenium", "HTTP", "DevTools", "testing"]
- **Image**: /images/blog/selenium-wire.png

---

## 🔧 Migration Template

For each post, use this format:

```markdown
---
title: "[TITLE FROM ABOVE]"
description: "[DESCRIPTION FROM OLD POST]"
date: [DATE FROM ABOVE]
author: "Hieu Nguyen"
language: "[en or vi]"
category: "[CATEGORY FROM ABOVE]"
tags: [TAGS FROM ABOVE]
image: "[IMAGE FROM ABOVE]"
draft: false
---

[CONTENT - Remove frontmatter, remove <!--truncate-->, fix image paths]
```

---

## 📋 Quick Migration Steps

### For Each Post:

1. **Read the original post**:
   ```bash
   cat /home/user/behitek.github.io/blog/2024-11-17-flux-lora.md
   ```

2. **Extract content** (skip frontmatter lines 1-8, remove truncate tag):
   ```bash
   sed '1,8d' blog/FILE.md | sed 's|<!--truncate-->||g' | sed 's|/img/blog|/images/blog|g'
   ```

3. **Create new MDX file** in:
   ```
   /home/user/behitek.github.io/new-site/src/content/blog/[slug].mdx
   ```

4. **Add proper frontmatter** using template above

5. **Paste content** below frontmatter

---

## 🚀 Bulk Migration Script

You can also use this command to help with extraction:

```bash
#!/bin/bash
cd /home/user/behitek.github.io

# For each remaining post
for file in \
  "blog/2024-11-17-flux-lora.md:flux-lora:2024-11-17:en:AI/ML" \
  "blog/2024-10-10-python-313-free-threaded.md:python-313-free-threaded:2024-10-10:en:Python" \
  "blog/2024-10-08-opensource-github-copilot.md:opensource-github-copilot:2024-10-08:en:Tutorial" \
  "blog/2024-07-18-rag-in-production.md:rag-in-production:2024-07-18:en:AI/ML" \
  "blog/2024-04-01-beam-search.md:beam-search:2024-04-01:en:AI/ML" \
  "blog/2024-03-09-python-decorator.md:python-decorator:2024-03-09:vi:Python" \
  "blog/2022-12-11-bert-finetuned.md:bert-finetuned:2022-12-11:en:AI/ML" \
  "blog/2022-11-19-selenium-capture-http-request.md:selenium-capture-http-request:2022-11-19:en:Tutorial"
do
  IFS=':' read -r filepath slug date lang category <<< "$file"
  echo "Processing: $filepath"

  # Extract title
  title=$(grep "^title:" "$filepath" | sed 's/title: //' | sed 's/"//g')

  # Extract description
  desc=$(grep "^description:" "$filepath" | sed 's/description: //' | sed 's/"//g')

  # Extract tags
  tags=$(grep "^tags:" "$filepath" | sed 's/tags: \[//' | sed 's/\]//')

  # Extract image
  image=$(grep "^image:" "$filepath" | sed 's/image: //' | sed 's|/img/blog|/images/blog|')

  echo "Title: $title"
  echo "Slug: $slug"
  echo "Date: $date"
  echo "---"
done
```

---

## ⏱️ Estimated Time

- Per post migration: ~3-5 minutes
- Total for 8 posts: ~30-40 minutes
- Testing: ~10 minutes
- **Total: ~50 minutes**

---

## ✅ After Migration Checklist

1. [ ] All 10 blog posts migrated
2. [ ] Test locally: `cd new-site && npm run dev`
3. [ ] Verify all posts show up on /blog
4. [ ] Check language badges (EN/VI) display correctly
5. [ ] Test filtering by language and category
6. [ ] Verify images load correctly
7. [ ] Check Vietnamese post (python-decorator) displays properly
8. [ ] Test dark mode on all posts
9. [ ] Commit and push all changes
10. [ ] Create summary document

---

## 🎯 Next Actions

1. **Complete blog migration** (8 posts remaining)
2. **Optional: Add code copy buttons** (30 min)
3. **Configure Giscus** (10 min - requires GitHub Discussions setup)
4. **Final testing** (20 min)
5. **Deploy!** 🚀

---

**Current Progress: 20% Complete (2/10 posts migrated)**

**Note**: The site is already functional with 1 sample post. The remaining posts are just content migration - no code changes needed!
