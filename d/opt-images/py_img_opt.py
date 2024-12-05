from PIL import Image;
import os
import glob
import re
import math


dir_path = "./**/*.webp"

# print(glob.glob(dir_path))

globs = glob.glob(dir_path)

for image_file in globs : 
  # print(image)


  image = Image.open(image_file)

  width, height = image.size

  width = (width * .01) + 1
  height = (height * .01) + 1

  opt_img = image.resize((math.floor(width), math.floor(height)), Image.LANCZOS)

  print(re.sub(".webp","_lri.webp", image_file), 'this is the image OF The Fucking')
  opt_img.save(re.sub(".webp","_lri.webp", image_file), quality=10)