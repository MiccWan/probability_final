import re
import json
from stickerManager import stickerManager

class Message():
    def __init__(self, rawMessage):
        self.sender = rawMessage['sender']
        self.senderIndex = (0 if self.sender == '林芮吟' else 1)
        self.timestamp = rawMessage['timestamp_ms']
        self.id = re.search('^.*_([0-9]*).png$', rawMessage['stickerUri']).group(1)
        self.category = stickerManager.getCategoryById(self.id)
        self.index = stickerManager.getCategoryIndex(self.category) + (stickerManager.categoryLength() * self.senderIndex)

    def __repr__(self):
        return self.__str__()

    def __str__(self):
        return json.dumps({
            'sender': self.sender,
            'timestamp': self.timestamp,
            'id': self.id,
            'category': self.category,
            'index': self.index
        }, ensure_ascii = False)
