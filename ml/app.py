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
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize(INPUT_SHAPE) 
    img_array = np.array(img, dtype=np.float32)  
    img_array = np.expand_dims(img_array, axis=0)  
    img_array /= 255.0  
    return img_array


async def predict_async(image_array):
    def predict():
        predictions = model.predict(image_array)
        predicted_class_index = np.argmax(predictions, axis=1)
        predicted_class = ASL_LABELS[predicted_class_index[0]] 
        confidence = predictions[0][predicted_class_index[0]]  
        return {
            'predicted_letter': predicted_class,
            'confidence': float(confidence) 
        }
    
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, predict)

@app.route('/predict', methods=['POST'])
async def predict():
    try:
        image_data = request.json['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)

        # img = Image.open(io.BytesIO(image_bytes))
        # img.show()  
        # print(f"Image size: {img.size}, Mode: {img.mode}")

        image_array = preprocess_image(image_bytes)

        result = await predict_async(image_array)
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
    print('Running server...')
    dummy_input = np.zeros((1, 64, 64, 3))
    model.predict(dummy_input, verbose=0)
    
    from waitress import serve
    serve(app, host='0.0.0.0', port=8081, threads=4)