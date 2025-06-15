import json
import os
from difflib import get_close_matches

qa_file = 'base.json'

if os.path.exists(qa_file):
    with open(qa_file, 'r') as f:
        qa_data = json.load(f)
else:
    qa_data = {}

question = input("Ask your question: ")

matches = get_close_matches(question, qa_data.keys(), n=1, cutoff=0.8)

if matches:
    print(f"Answer: {qa_data[matches[0]]}")
elif question in qa_data:
    print(f"Answer: {qa_data[question]}")
else:
    answer = input("I don't know that. Can you provide the answer? ")
    qa_data[question] = answer
    with open(qa_file, 'w') as f:
        json.dump(qa_data, f, indent=2)
    print("Thanks! I've saved your answer.")
