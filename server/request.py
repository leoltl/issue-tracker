import requests
import multiprocessing

# time = 0
def bench():
  for i in range(0, 250):
    r = requests.get('http://192.168.0.36:3000/benchmark')
    # time = time + r.elapsed.total_seconds() * 1000
  print(time)

if __name__ == '__main__':
  for i in range(4):
    p = multiprocessing.Process(target=bench)
    p.start()