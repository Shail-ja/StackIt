import msvcrt
import difflib
import nltk
nltk.download('words')
from nltk.corpus import words

dictionary = [
    "Artificial Intelligence",
    "Data Analysis",
    "Graphic Design",
    "Public Speaking",
    "Python Programming",
    "Project Management",
    "Conflict Resolution",
    "Search Engine Optimization (SEO)",
    "Digital Marketing",
    "Financial Modeling",
    "User Experience (UX) Design",
    "Cloud Computing (e.g., AWS, Azure)",
    "Photography",
    "Copywriting",
    "SQL & Database Management",
    "Leadership & Team Building",
    "Foreign Language Proficiency (e.g., Spanish, Mandarin)",
    "Video Editing",
    "Agile Methodologies",
    "Cybersecurity Fundamentals",
    "Statistical Modeling",
    "Web Development (HTML, CSS, JavaScript)",
    "Machine Learning",
    "Social Media Strategy",
    "Time Management",
    "UI Prototyping (e.g., Figma, Adobe XD)",
    "Emotional Intelligence",
    "Sales & Negotiation",
    "Robotics & Automation",
    "Technical Writing",
    "Blockchain Fundamentals"
]

def get_acronym(phrase):
    return ''.join(word[0].upper() for word in phrase.split() if word[0].isalpha())

def suggest(prefix):
    prefix_lower = prefix.lower()
    fuzzy_matches = difflib.get_close_matches(prefix, dictionary, n=5, cutoff=0.6)
    substring_matches = [word for word in dictionary if prefix_lower in word.lower()]
    acronym_matches = [word for word in dictionary if get_acronym(word).startswith(prefix.upper())]
    suggestions = list(dict.fromkeys(fuzzy_matches + substring_matches + acronym_matches))
    
    return suggestions[:5]

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
                print(f"\rYou typed: {word.ljust(20)} Suggestions: {', '.join(suggestions).ljust(70)}", end='', flush=True)
        except KeyboardInterrupt:
            print("\nExit")
            break

run_autocorrect()
