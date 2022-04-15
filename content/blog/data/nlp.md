---
title: 'NLP - Natural Language Processing'
date: '2019-11-23'
author: 'André Kovac'
description: 'Concepts of Natural Language Processing (NLP), for example: Word embeddings'
category: 'data'
tags: ['nlp', 'artificial-intelligence', 'machine-learning']
---

## [Tokenization](https://www.analyticsvidhya.com/blog/2020/05/what-is-tokenization-nlp/)

First step in NLP: Tokenize words!

A text (collection/sentences of words) has to be broken down into tokens.

- Word tokens (i.e. splitting sentence by space character)
- Character tokens: `school`: `s` + `c` + `h` + `o` + `o` + `l`
- Subword tokens: `likelihood`: `like` + `li` + `hood`

**Vocabulary** refers to the set of unique tokens in the corpus.

## Word embeddings

### Definition

> Word embeddings are vectors of real numbers which are created by mapping words or phrases from a vocabulary to it (e.g. from a corpus (a large collection of texts)

### Examples

[spacy.io](https://spacy.io/) offers larger or smaller word embeddings.

[Here for example](https://spacy.io/models/de) are small, medium or large word-embeddings. In the small one just some words won't be in it.

[On this colab](https://colab.research.google.com/drive/1BjRLyBKPfxx4iEV1jWAkBvfBbq2bNY8t#scrollTo=YuI-UHVoyTgw) of a workshop I attended of [responsibly.ai](https://learn.responsibly.ai/word-embedding/) in November 2019.

### Different kinds of word embeddings

#### Bag of words

Each word which occurs in a sentence gets a number which stands for the amount at which it occurs in the sentence.

Pro: Slim, simple representation
Con: Order lost

#### 1-time pad

Pro: Order
Con: No relation between words, a lot of vectors, a lot of zeros!

#### Vectors - relating words

Pro: Relation between words is encoded in array of length 300 via the use of a Corpus.

Library: [Word2Vec](https://towardsdatascience.com/introduction-to-word-embedding-and-word2vec-652d0c2060fa) from [GenSim](https://pypi.org/project/gensim/)

- An illustration of [Word2Vec](http://jalammar.github.io/illustrated-word2vec/)


### Gender Bias in word embeddings

#### AI and bias in recruiting applications

Unfortunately on a broad level there's still discrimination of various sorts when it comes to selection of candidates - even if there are some positive examples of recruitment companies which actively work against it.

Because every artificial intelligence system is based on historic data, every AI in the field of recruiting, for example an automated CV screening system, is inherently full of #biases . So AI will only amplify such a discriminatory bias, not diminish it.

There are, however, #machinelearning methods to overcome the gender bias or racial bias of the data the algorithms are trained on. A few months ago I mentioned it in a different discussion here on LinkedIn: https://tinyurl.com/1ilvyktu

Shlomi Hod (he/him) offers a workshop ( https://learn.responsibly.ai/word-embedding/ ) in which he first exemplifies the gender bias inherent in natural language processing (an AI subdivision) systems and then shows how these may be overcome.

Since there are ways to alter the results of a machine learning algorithms to be less #biased the question of whether to implement such an alteration of results now becomes a social and political problem and is not solely a technical one anymore.

---

Genau wie du es sagst, kann die KI bloß so "intelligent" sein, wie es die Daten unserer Vergangenheit und Gegenwart hergeben. Diese Daten sind natürlich geprägt von Neigungen, von denen wir uns als Gesellschaft wegbewegen und nicht noch verstärken wollen.

Ich nahm vor etwa einem Jahr an einem wunderbaren Data Science Workshop "Exploring Gender Bias in Word Embeddings" von Shlomi Hod ( https://learn.responsibly.ai/word-embedding/ ) teil, bei dem man hands-on sieht, wie aktuelle Neigungen der Gesellschaft durch KI bloß noch verstärkt werden, aber es wird auch gezeigt, wie man solch einem Bias entgegenwirkt, um so eine "gute" menschliche Intelligenz zu erzeugen von der du sprichst. Sein Workshop richtet sich an jede*n (ob mit oder ohne technischen Hintergrund) und ich kann dir sein Workshop wärmstens empfehlen, um ein intuitives Verständnis von Gender Bias in Künstlicher Intelligenz zu erhalten. Auf der Homepage kann man seine nächsten Workshop Termine einsehen oder sich selbst durch den interaktiven Code lesen: https://colab.research.google.com/github/ResponsiblyAI/word-embedding/blob/master/tutorial-bias-word-embedding.ipynb


Link to post: https://www.linkedin.com/feed/update/urn:li:activity:6727551191397502976?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6727551191397502976%2C6727559430063325184%29&replyUrn=urn%3Ali%3Acomment%3A%28activity%3A6727551191397502976%2C6727867276386693120%29

---

- Shlomi Hod gives the workshop "Workshop // Exploring Gender Bias in Word Embeddings". This is the corresponding [GitHub repo](https://github.com/ResponsiblyAI/word-embedding), the [colab yupiter notebook](https://colab.research.google.com/github/ResponsiblyAI/word-embedding/blob/master/tutorial-bias-word-embedding.ipynb) and the [workshop homepage](https://learn.responsibly.ai/word-embedding/).
- Here's another [article about gender bias in word embeddings](https://www.kaggle.com/rtatman/gender-bias-in-word-embeddings).


## Sentiment analysis

- [Textblob](https://textblob.readthedocs.io/en/dev/)
