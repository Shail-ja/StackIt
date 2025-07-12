import msvcrt, difflib
import nltk
nltk.download('words')
from nltk.corpus import words

dictionary = words.words()

def suggest(prefix):
    return difflib.get_close_matches(prefix, dictionary, n=5, cutoff=0.6)

def run_autocorrect():
    print("Type a word (Enter to reset, Ctrl+C to quit):")
    word = ""
    while True:
        try:
            if msvcrt.kbhit():
                ch = msvcrt.getwch()

                if ch in ['\r', '\n']:
                    print(f"\nFinal word: {word}")
                    word = ""
                    print("\nStart typing again:")
                    continue
                elif ch in ['\b', '\x08']:
                    word = word[:-1]
                elif ch.isprintable():
                    word += ch

                suggestions = suggest(word)
                print(f"\rYou typed: {word.ljust(20)} Suggestions: {', '.join(suggestions).ljust(50)}", end='', flush=True)
        except KeyboardInterrupt:
            print("\nExiting...")
            break

run_autocorrect()
