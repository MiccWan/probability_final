from stats import stat
from stickerManager import stickerManager

stat = stat/(stat.sum(axis=1)[:,None])
print(stat)

# print(stat.sum(axis = 1))

sums = stat.sum(axis = 0)

sums /= sum(sums)

sums = list(enumerate(sums))

sums = sorted(sums, key=lambda x: -x[1])

for t in sums:
    if (t[0] == 80):
        continue
    sender = 'Jueiyin' if t[0] < 40 else 'others'
    categoryId = t[0] if sender == 'Jueiyin' else t[0] - 40
    category = stickerManager.categoryNames[categoryId]

    print(t[0], sender, 'sends', category, round(t[1] * 100, 2), '%')

# print(sums)

for i in range(stat.shape[0]):
    if stat[i][i] == 0:
        print(i, stat[i][i])