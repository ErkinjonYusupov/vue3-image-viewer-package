<script setup>
import { ref } from 'vue';
import ImageViewer from './components/ImageViewer.vue';

const showViewer = ref(false);
const imageSrc = ref('https://images.unsplash.com/photo-1682687220208-22d7a2543e88?q=80&w=1975&auto=format&fit=crop');

const openViewer = () => {
  showViewer.value = true;
};
</script>

<template>
  <div class="container">
    <h1>Vue 3 ImageViewer Demo</h1>
    <p>Click the image below to open the viewer.</p>

    <div class="image-wrapper" @click="openViewer">
      <img :src="imageSrc" alt="Sample Logic" class="thumbnail" />
      <div class="overlay">
        <span>Click to View</span>
      </div>
    </div>

    <ImageViewer v-model="showViewer" :src="imageSrc" />
  </div>
</template>

<style scoped>
.container {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  max-width: 800px;
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

.image-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.image-wrapper:hover {
  transform: scale(1.02);
}

.thumbnail {
  display: block;
  max-width: 100%;
  width: 400px;
  height: auto;
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
