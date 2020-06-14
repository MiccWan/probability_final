import numpy as np

def parseClasses(m):
    pij = np.array(m)
    fij = np.full_like(pij, False)
    print('processing ', pij.shape, ' matrix')
    if pij.ndim != 2:
        print('Only accecpt 2 dim array')
        return
    if pij.shape[0] != pij.shape[1]:
        print('m must be a square matrix')
        return

    n = pij.shape[0]

    # find fij from pij
    def dfsFrom(s, ns):
        if fij[s][ns]:
            # skip is already done
            return
        else:
            fij[s][ns] = True
            for nns in range(n):
                if pij[ns][nns]:
                    dfsFrom(s, nns)

    for i in range(n):
        for j in range(n):
            if pij[i][j]:
                dfsFrom(i, j)

    # get classes
    classes = []
    classified = [False] * n
    for i in range(n):
        if not classified[i]:
            clazz = [i]
            for j in range(i + 1, n):
                if fij[i][j] and fij[j][i]:
                    clazz.append(j)
                    classified[j] = True
            classified[i] = True
            classes.append(clazz)

    print(pij)
    # print(fij)
    print(classes)
    return classes


if __name__ == '__main__':
    
    # testing

    # only on class
    m1 = np.array([[0, 0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0.75, 0.25, 0], [0, 0, 0, 0, 0, 0, 1], [0, 1, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0], [0.5, 0.5, 0, 0, 0, 0, 0]])
    parseClasses(m1)

    # two classes: 1, 23
    m2 = np.array([[0.5, 0.5, 0], [0, 1/3, 2/3], [0, 0.5, 0.5]])
    parseClasses(m2)