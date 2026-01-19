<script setup>
import { showImage } from 'vue3-image-viewer-package-erkinjon';



const images = [
  'https://www.gstatic.com/webp/gallery/1.webp',
  'https://images.unsplash.com/photo-1682685797769-481b48222adf?q=80&w=1975&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1975&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682685797661-9e0c8c184851?q=80&w=1975&auto=format&fit=crop'
];
</script>

<template>
  <div class="container">
    <h1>Vue 3 ImageViewer Gallery</h1>
    <p>Click any image to open the gallery viewer.</p>

    <div class="gallery-grid">
      <div v-for="(img, index) in images" :key="index" class="image-wrapper" @click="showImage(images, index)">
        <img :src="img" class="thumbnail" />
        <div class="overlay">
          <span>View</span>
        </div>
      </div>
    </div>

    <div style="margin-top: 2rem;">
      <h3>Programmatic Single Image</h3>
      <button @click="showImage('https://www.gstatic.com/webp/gallery/1.webp')">
        Open Single Image
      </button>
    </div>


  </div>
</template>

<style scoped>
.container {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  color: #2c3e50;
}

h1 {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 0.5em;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.image-wrapper {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  aspect-ratio: 16/9;
  transition: transform 0.2s;
}

.image-wrapper:hover {
  transform: translateY(-5px);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.overlay span {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border-radius: 20px;
}
</style>
