import subprocess


def getCPUTemp():
    result = subprocess.run(
        ['vcgencmd', 'measure_temp'], stdout=subprocess.PIPE)
    g = result.stdout.decode('utf-8')
    g = g.replace('temp=', '')
    g = g.replace('\'C', '')
    k = float(g)
    gg = 'temp: '+str(k)
    return str(gg)

# print(getCPUTemp())


def getSysInfo():
    result = subprocess.run(['neofetch', 'title', 'os', 'kernel', 'uptime',
                            'shell', 'memory', 'cpu_usage', 'disk', 'users'], stdout=subprocess.PIPE)
    g = result.stdout.decode('utf-8')

    return str(g)


def parsedSystemData():
    m = getCPUTemp()+'\n'
    m = m+getSysInfo()
    return m
# print(getSysInfo())
