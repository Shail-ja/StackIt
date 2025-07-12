import numpy as np
import pandas as pd

df = pd.read_csv("C:/Users/dipan/QnA project - Odoo Hackathon/train.csv")

df.drop(columns = ['id'], inplace=True)

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('punkt_tab')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))
df['clean_text'] = df['comment_text'].apply(lambda x: ' '.join(
    [word for word in word_tokenize(x) if word.lower() not in stop_words and word.isalpha()]
))

from nltk.stem import LancasterStemmer
stemmer = LancasterStemmer()
df['stemmed_text'] = df['clean_text'].apply(lambda x: ' '.join(
    [stemmer.stem(word) for word in word_tokenize(x) if word.lower() not in stop_words and word.isalpha()]
))

import re
df['plain_text'] = df['clean_text'].apply(lambda x: re.sub(r'[^A-Za-z0-9\s]', '', x))
df['numberless_text'] = df['plain_text'].apply(lambda x: re.sub(r'\w*\d\w*', '', x).strip())

(df['plain_text'] != df['numberless_text']).sum()

import string
df['puncless_lower_text'] = df['numberless_text'].apply(lambda x: re.sub('[%s]' % re.escape(string.punctuation), ' ', x.lower()))

df[['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']].sum()

df['label'] = df['toxic'] + df['severe_toxic'] + df['obscene'] + df['threat'] + df['insult'] + df['identity_hate']
df['label'] = (df['label'] > 0).astype(int)

df.drop(columns=['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate'], inplace=True)

df['label'].value_counts()

label_0 = df[df['label'] == 0].sample(frac=1, random_state=42)
label_1 = df[df['label'] == 1].sample(frac=1, random_state=42)

hf1 = pd.concat([label_0.iloc[:16225], label_1]).reset_index(drop=True)

ff1 = hf1[['puncless_lower_text', 'label']]
from sklearn.feature_extraction.text import TfidfVectorizer
vectorizer = TfidfVectorizer()
x = vectorizer.fit_transform(ff1['puncless_lower_text'])
y = ff1['label']

from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(x_train, y_train)

from sklearn.metrics import accuracy_score
accuracy_score(y_test, model.predict(x_test))

model.predict(vectorizer.transform([label_1['puncless_lower_text'].iloc[1000]]))

