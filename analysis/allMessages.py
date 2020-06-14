from os import listdir
from os.path import isfile, isdir, join
import json
import re
import numpy as np
from Message import Message

messageRootPath = './data/raw/messages'
allMessages = {}

for fileName in listdir(messageRootPath):
    filePath = join(messageRootPath, fileName)
    if isfile(filePath):
        with open(filePath) as jsonFile:
            name = re.search('^(.*).json$', fileName).group(1)
            allMessages[name] = list(map(lambda m: Message(m), json.load(jsonFile)))[::-1]

if __name__ == '__main__':
    for key in allMessages:
        print(key, allMessages[key])