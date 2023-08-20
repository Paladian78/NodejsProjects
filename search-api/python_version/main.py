from flask import Flask, request, jsonify
import requests
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/search')
def existing_api():
    URL = "https://app.ylytic.com/ylytic/test"
    response = requests.get(URL)
    content = response.json()
    request.content = content
    return search_api()

def search_api():
    content = request.content['comments']
    query = request.args

    result = []
    for item in content:
        if 'search_author' in query and query['search_author']:
            if query['search_author'].lower() in item['author'].lower():
                result.append(item)
        else:
            result.append(item)

    if 'seach_text' in query and query['seach_text']:
        result = [item for item in result if query['seach_text'].lower() in item['text'].lower()]

    if 'at_from' in query and query['at_from']:
        at_from = datetime.strptime(query['at_from'], '%d-%m-%Y')
        result = [item for item in result if datetime.strptime(item['at'], '%a, %d %b %Y %H:%M:%S %Z').replace(tzinfo=None) >= at_from]

    if 'at_to' in query and query['at_to']:
        at_to = datetime.strptime(query['at_to'], '%d-%m-%Y')
        at_to_gmt = at_to.replace(hour=0, minute=0, second=0, microsecond=0)
        result = [item for item in result if datetime.strptime(item['at'], '%a, %d %b %Y %H:%M:%S %Z').replace(tzinfo=None) <= at_to_gmt + timedelta(days=1)]

    if 'like_from' in query and query['like_from']:
        like_from = int(query['like_from'])
        result = [item for item in result if item['like'] >= like_from]

    if 'like_to' in query and query['like_to']:
        like_to = int(query['like_to'])
        result = [item for item in result if item['like'] <= like_to]

    if 'reply_from' in query and query['reply_from']:
        reply_from = int(query['reply_from'])
        result = [item for item in result if item['reply'] >= reply_from]

    if 'reply_to' in query and query['reply_to']:
        reply_to = int(query['reply_to'])
        result = [item for item in result if item['reply'] <= reply_to]

    return jsonify({'comments': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
