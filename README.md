# Vue 3 Image Viewer

A lightweight, feature-rich image viewer component for Vue 3. Supports rotation, zooming, panning, and responsive design with a beautiful dark modal interface. Now with TypeScript support and Gallery Mode!

## Features

- 🖼 **Full-screen Modal**: Dark, blurred backdrop for focus.
- 📸 **Gallery Mode**: Swipe/Click through multiple images.
- 🔄 **Rotation**: Rotate images left and right (90° increments).
- 🔍 **Zoom**: Zoom in/out via buttons or mouse wheel.
- ✋ **Pan**: Drag to move zoomed images.
- ⌨️ **Keyboard Navigation**: Arrow keys for prev/next, Escape to close.
- 🟦 **TypeScript**: Built-in type definitions.

## Installation

```bash
npm install vue3-image-viewer-package-erkinjon
```

## Usage

### Global Installation (Optional)

You can install the plugin globally to use `$showImage` anywhere in your app.

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import Vue3ImageViewer from 'vue3-image-viewer-package-erkinjon';
import 'vue3-image-viewer-package-erkinjon/style.css'; // Don't forget CSS!

const app = createApp(App);
app.use(Vue3ImageViewer);
app.mount('#app');
```

And then in your components:

```javascript
// Composition API
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();
proxy.$showImage('https://example.com/img.jpg');

// Options API
this.$showImage('https://example.com/img.jpg');
```

### Programmatic Usage (Recommended)

Import the `showImage` function in your Vue 3 application.

### Programmatic Usage (Functional API)

Use the `showImage` function to open the viewer without registering the component.

```vue
<script setup>
import { showImage } from 'vue3-image-viewer-package-erkinjon';

const images = [
  'https://example.com/img1.jpg',
  'https://example.com/img2.jpg',
];
</script>

<template>
  <!-- Single Image -->
  <img src="https://example.com/single.jpg" @click="showImage('https://example.com/single.jpg')" />
  
  <!-- Gallery Mode -->
  <button @click="showImage(images, 0)">Open Gallery</button>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Boolean` | `false` | Controls visibility (v-model). |
| `src` | `String` | `''` | Single image URL (for single mode). |
| `images` | `Array<String>` | `[]` | Array of image URLs (for gallery mode). |
| `index` | `Number` | `0` | Index of the current image (v-model:index). |

## Controls

- **Mouse Wheel**: Zoom In/Out
- **Drag**: Pan the image (when zoomed)
- **Buttons**:
    - **Prev/Next**: Navigate images.
    - **Rotate Left/Right**: Rotates image 90 degrees.
    - **Zoom In/Out**: Adjusts image scale.
    - **1:1**: Resets zoom and position.
- **Keyboard**:
    - `ArrowLeft` / `ArrowRight`: Navigate images.
    - `Escape`: Close viewer.

## License

MIT
