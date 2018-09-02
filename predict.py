import sys
stderr = sys.stderr
sys.stderr = open('/dev/null', 'w')
from keras.models import load_model
sys.stderr = stderr
import os
import sys

import pandas as pd
dir_name = os.path.dirname(os.path.realpath(__file__))

model = load_model(os.path.join(dir_name, "models/latest.h5"))

array = pd.DataFrame()
for i in range(1, 8):
    array[i] = [float(sys.argv[i])]

print(model.predict(array)[0][0])
