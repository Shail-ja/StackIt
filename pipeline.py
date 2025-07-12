import pandas as pd
import nltk
import pickle
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import LancasterStemmer
import re
import string
nltk.download('punkt_tab')
nltk.download('stopwords')

stop_words = set(stopwords.words('english'))
stemmer = LancasterStemmer()


def preprocessing(text):
    tokens = word_tokenize(text)
    filtered = [word for word in tokens if word.lower() not in stop_words and word.isalpha()]
    stemmed = [stemmer.stem(word) for word in filtered]
    text = ' '.join(stemmed)
    text = re.sub(r'[^A-Za-z0-9\s]', '', text)
    text = re.sub(r'\w*\d\w*', '', text).strip()
    text = re.sub('[%s]' % re.escape(string.punctuation), ' ', text.lower())

    return text


text = input('Write: ')
processed_text = preprocessing(text)

with open('toxic_content.pkl', 'rb') as f:
    loaded_model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

prediction = loaded_model.predict(vectorizer.transform([processed_text]))
print("Prediction:", prediction)
