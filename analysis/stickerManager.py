from os import listdir
from os.path import isfile, isdir, join
import json
import re
import numpy as np

class StickerManager():
    def __init__(self, rootPath = './data/raw/stickers_class'):
        self.stickers = {}
        self.categoryByStickerId = {}
        self.categoryNames = []
        self.categoryIds = {}
        self.stats = []

        for category in listdir(rootPath):
            folderPath = join(rootPath, category)
            if isdir(folderPath):
                self.categoryNames.append(category)
                self.stickers[category] = []
                for stickerFileName in listdir(folderPath):
                    stickerId = re.search('^.*_([0-9]*).png$', stickerFileName).group(1)
                    self.stickers[category].append(stickerId)
                    self.categoryByStickerId[stickerId] = category
        
        self.categoryNames.sort()

        for id, categoryName in enumerate(self.categoryNames):
            self.categoryIds[categoryName] = id

    def categoryLength(self):
        return len(self.categoryIds)
    
    def getCategoryById(self, id):
        return self.categoryByStickerId[id]

    def getCategoryIndex(self, name):
        return self.categoryIds.get(name, None)

    def getStickersIdByCategory(self, category):
        return self.stickers.get(category, [])

stickerManager = StickerManager()

if __name__ == '__main__':
    json.dump(stickerManager.stickers, open('./data/export/stickerIdsByName.json', "w"))
    json.dump(stickerManager.categoryNames, open('./data/export/categoryNames.json', "w"))