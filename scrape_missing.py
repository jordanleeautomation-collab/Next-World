import urllib.request
import re

url = "https://morningside.ai/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    # We are looking for the section containing "Don’t just take our word for it"
    # Find the index of the string
    idx = html.find("word for it")
    if idx != -1:
        # Find the start of the section tag before this
        start_idx = html.rfind("<section", 0, idx)
        # Find the end of this section
        end_idx = html.find("</section>", idx)
        if start_idx != -1 and end_idx != -1:
            section_html = html[start_idx:end_idx + 10]
            with open("/Users/jordy/JordanLeeAI/apps/morningside-clone/missing_section.html", "w") as f:
                f.write(section_html)
            print("Successfully extracted missing section.")
        else:
            print("Could not find section boundaries.")
    else:
        print("Text not found.")
except Exception as e:
    print(f"Error: {e}")
