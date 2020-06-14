from os import listdir, path
import json
import re

def transformMessage(obj):
    return {
        'sender': obj['sender_name'].encode('latin1').decode('utf8'),
        'timestamp_ms': obj['timestamp_ms'],
        'stickerUri': re.search('[^/]*$', obj['sticker']['uri']).group()
    }

def extractFromJSON(filepath):
    with open(filepath) as file:
        data = json.load(file)['messages']
        data = filter(lambda x: x.get('sticker', False), data)
        data = map(transformMessage, data)
        return list(data)

def extractFromFolder(dirName = './'):
    stickers = []

    for fileName in listdir(dirName):
        filepath = path.join(dirName, fileName)

        if re.match('^message_[0-9]*.json$', fileName):
            stickers += extractFromJSON(filepath)

    with open('result.json', 'w') as outFile:
        outFile.write(json.dumps(stickers, indent=4))

if __name__ == '__main__':
    extractFromFolder()