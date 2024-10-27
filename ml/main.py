import numpy as np
from keras.models import load_model
from keras.preprocessing import image
import matplotlib.pyplot as plt


ASL_LABELS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'SPACE', 'DELETE', 'NOTHING'
]

model = load_model('ASL.h5')

def load_and_preprocess_image(img_path, target_size=(64, 64)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  
    img_array /= 255.0  
    return img_array


img_path = 'piecer.jpg' 
img_array = load_and_preprocess_image(img_path)


predictions = model.predict(img_array)


predicted_class = np.argmax(predictions, axis=1)
print(ASL_LABELS[predicted_class[0]])

