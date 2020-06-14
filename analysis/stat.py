import json
from allMessages import allMessages
from stickerManager import stickerManager
from util.parseClasses import parseClasses
import numpy as np

matrixLength = stickerManager.categoryLength() * 2 + 1
emptyIndex = matrixLength - 1

stat = np.full((matrixLength, matrixLength), 0)
smallStat = np.full((3, 3), 0)

for name in allMessages:
    messages = allMessages[name]
    for k in range(len(messages) - 1):
        i = messages[k].index
        j = messages[k + 1].index
        if (messages[k + 1].timestamp - messages[k].timestamp < 90 * 1000):
            stat[i][j] += 1
            smallStat[messages[k].senderIndex][messages[k + 1].senderIndex] += 1
        else:
            stat[i][emptyIndex] += 1
            stat[emptyIndex][j] += 1
            smallStat[messages[k].senderIndex][2] += 1
            smallStat[2][messages[k + 1].senderIndex] += 1

if __name__ == '__main__':

    # overview

    print(stat)
    print(smallStat)

    # check if there is empty row

    # for i in range(len(stat)):
    #     if sum(stat[i][:-1]) == 0:
    #         print(i, stat[i])
    #         print(i, stickerManager.categoryNames[i if i < 40 else i - 40])
    
    # find classes
    
    fullClasses = parseClasses(stat)
    print('there are ', len(fullClasses), ' classes')

    realClasses = parseClasses(stat[:-1, :-1])
    print('there are ', len(realClasses), ' classes')

    # export

    # json.dump(stat, open('./data/export/stat.json', "w"))