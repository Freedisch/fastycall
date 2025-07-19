import json

def remove_non_user_or_assistant(file_path):
    # Load the JSON file
    with open(file_path, 'r') as file:
        data = json.load(file)

    for group in data:
        if "messages" in group and group["messages"]:
            # Filter messages, keeping only those with role "user" or "assistant"
            group["messages"] = [msg for msg in group["messages"] if msg["role"] in {"user", "assistant"}]

    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)
    print("Non-user or assistant messages removed successfully from all message groups.")

file_path = 'test.json' 
remove_non_user_or_assistant(file_path)
