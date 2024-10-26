import asyncio
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
from flask_cors import CORS
import io
import base64
import cv2
from collections import OrderedDict
import time

app = Flask(__name__)
CORS(app)
executor = ThreadPoolExecutor(max_workers=4)

print("Loading model...")
model = load_model('model.h5')
print("Model loaded!")

INPUT_SHAPE = (64, 64)
ASL_LABELS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'SPACE', 'DELETE', 'NOTHING'
]

def preprocess_image(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, INPUT_SHAPE)
    img = img.astype(np.float32) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

async def predict_async(image_array):
    def predict():
        prediction = model.predict(image_array, verbose=0)
        predicted_idx = np.argmax(prediction[0])
        confidence = float(prediction[0][predicted_idx])
        predicted_class = ASL_LABELS[predicted_idx]
        return {
            'predicted_letter': predicted_class,
            'confidence': confidence
        }
    
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, predict)

class PredictionCache:
    def __init__(self, maxsize=100):
        self.cache = OrderedDict()
        self.maxsize = maxsize
        self.lock = ThreadPoolExecutor(max_workers=1)

    async def get_or_compute(self, image_hash, image_array):
        current_time = time.time()
        
        if image_hash in self.cache:
            prediction, timestamp = self.cache[image_hash]
            if current_time - timestamp < 0.1:
                return prediction

        prediction = await predict_async(image_array)
        
        def update_cache():
            self.cache[image_hash] = (prediction, current_time)
            if len(self.cache) > self.maxsize:
                self.cache.popitem(last=False)
                
        self.lock.submit(update_cache)
        return prediction

prediction_cache = PredictionCache()

@app.route('/predict', methods=['POST'])
async def predict():
    try:
        image_data = request.json['image'].split(',')[1]
        image_hash = hash(image_data[:100])
        image_bytes = base64.b64decode(image_data)
        image_array = preprocess_image(image_bytes)
        
        result = await prediction_cache.get_or_compute(image_hash, image_array)
        return jsonify(result)
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/warmup', methods=['GET'])
def warmup():
    dummy_input = np.zeros((1, 64, 64, 3))
    model.predict(dummy_input, verbose=0)
    return jsonify({'status': 'warmed up'})

if __name__ == '__main__':
    print('running')
    dummy_input = np.zeros((1, 64, 64, 3))
    model.predict(dummy_input, verbose=0)
    
    from waitress import serve
    serve(app, host='0.0.0.0', port=8081, threads=4)